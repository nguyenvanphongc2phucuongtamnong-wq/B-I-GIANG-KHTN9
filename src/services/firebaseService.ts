import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User as FirebaseUser,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  getDocs, 
  collection, 
  getDocFromServer,
  onSnapshot
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { StudentProgressItem } from '../types';

// ==========================================
// 1. KHỞI TẠO FIREBASE SDK & AUTH PERSISTENCE
// ==========================================
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// BẮT BUỘC (Lỗi 3): Thiết lập browserLocalPersistence để duy trì phiên đăng nhập sau khi đóng trình duyệt
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.warn('[Firebase Auth] Cảnh báo thiết lập persistence:', err);
});

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Kiểm tra kết nối Firestore lúc khởi động
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline. Vui lòng kiểm tra kết nối mạng.');
    }
  }
}
testFirestoreConnection();

// ==========================================
// 2. ERROR HANDLER CHUẨN FIREBASE SKILL
// ==========================================
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// ==========================================
// 3. ĐỊNH NGHĨA MODEL THEO ĐÚNG YÊU CẦU
// ==========================================

/**
 * Hồ sơ người dùng chuẩn trong collection "users/{uid}" (Lỗi 2)
 * 1 Firebase UID = 1 User = 1 Hồ sơ
 */
export interface FirestoreUserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: 'student' | 'teacher';
  classId: string; // 9A1..9A8, rỗng nếu chưa chọn, hoặc 'Tổ Tự Nhiên' cho giáo viên
  createdAt: string;
  lastLoginAt: string;
}

/**
 * Tiến trình từng bài học trong subcollection "studentProgress/{uid}/lessons/{lessonId}" (Lỗi 1)
 */
export interface FirestoreLessonProgress {
  lessonId: number;
  status: 'not_started' | 'in_progress' | 'completed';
  progressPercent: number; // 0 .. 100
  currentSection: string; // 'sec_1' .. 'sec_5'
  lastViewedSection: string;
  startedAt: string;
  lastUpdatedAt: string;
  completedAt: string | null;
  // Chi tiết trạng thái phục hồi
  completedSections?: string[];
  currentTopicIdx?: number;
  completedTopicIds?: string[];
  practiceScore?: number | null;
  practiceAnswers?: Record<string, string>;
  examScore?: number | null;
  examMcAnswers?: Record<string, string>;
  examEssayAnswers?: Record<string, string>;
}

// ==========================================
// 4. FIREBASE AUTH & SESSION MANAGEMENT
// ==========================================

export async function signInWithGoogle(): Promise<FirebaseUser> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error('Lỗi signInWithPopup Google:', error);
    if (error.code === 'auth/popup-blocked') {
      throw new Error('Trình duyệt đã chặn cửa sổ Popup đăng nhập. Vui lòng cho phép popup và thử lại.');
    }
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Cửa sổ đăng nhập Google đã bị đóng trước khi hoàn tất.');
    }
    throw new Error(error.message || 'Đăng nhập Google thất bại. Vui lòng thử lại.');
  }
}

export async function signOutFirebase(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Lỗi đăng xuất Firebase:', error);
  }
}

export function subscribeToAuthChanges(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// ==========================================
// 5. USER PROFILE (users/{uid}) - SỬA TẬN GỐC LỖI 2
// ==========================================

/**
 * Đồng bộ hoặc khởi tạo User Profile theo Firebase Auth UID trong collection "users/{uid}"
 * - Login lần đầu: tạo users/{uid}
 * - Login lần sau: cùng UID -> KHÔNG tạo mới, chỉ cập nhật lastLoginAt, giữ nguyên classId, progress, role
 * - Tuyệt đối KHÔNG dùng addDoc(), Math.random(), timestamp ID
 */
export async function syncUserProfile(params: {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  classId?: string;
}): Promise<FirestoreUserProfile> {
  const cleanEmail = params.email.trim().toLowerCase();
  const isTeacher = cleanEmail === 'nvphong.thcsphuninh@gmail.com';
  const userDocRef = doc(db, 'users', params.uid);
  const now = new Date().toISOString();

  try {
    const snap = await getDoc(userDocRef);

    if (snap.exists()) {
      // LOGIN LẦN SAU: User đã tồn tại, KHÔNG tạo bản ghi mới!
      const existing = snap.data() as FirestoreUserProfile;
      const updates: Partial<FirestoreUserProfile> = {
        lastLoginAt: now,
        displayName: params.displayName || existing.displayName,
        photoURL: params.photoURL || existing.photoURL || '',
        email: cleanEmail
      };

      // Giữ nguyên role & classId nếu đã có
      if (params.classId && !existing.classId) {
        updates.classId = params.classId;
      }

      await setDoc(userDocRef, updates, { merge: true });
      return { ...existing, ...updates };
    } else {
      // LOGIN LẦN ĐẦU: Tạo users/{uid}
      const newProfile: FirestoreUserProfile = {
        uid: params.uid,
        email: cleanEmail,
        displayName: params.displayName || cleanEmail.split('@')[0],
        photoURL: params.photoURL || '',
        role: isTeacher ? 'teacher' : 'student',
        classId: params.classId || (isTeacher ? 'Tổ Tự Nhiên' : ''),
        createdAt: now,
        lastLoginAt: now
      };

      await setDoc(userDocRef, newProfile);

      // Đồng bộ bản sao tương thích legacy vào students/{uid} (với đúng UID, không tạo mới)
      try {
        await setDoc(doc(db, 'students', params.uid), {
          uid: params.uid,
          displayName: newProfile.displayName,
          email: cleanEmail,
          classId: newProfile.classId,
          role: 'STUDENT',
          createdAt: now,
          lastLoginAt: now,
          progressPercent: 0,
          completedLessons: [],
          scores: [],
          assessmentCount: 0
        }, { merge: true });
      } catch {
        // bỏ qua nếu có lỗi ghi legacy
      }

      return newProfile;
    }
  } catch (error) {
    console.error('Lỗi khi syncUserProfile:', error);
    handleFirestoreError(error, OperationType.WRITE, `users/${params.uid}`);
  }
}

/**
 * Đọc User Profile theo Firebase UID
 */
export async function getUserProfileFromFirestore(uid: string): Promise<FirestoreUserProfile | null> {
  const path = `users/${uid}`;
  try {
    const docRef = doc(db, 'users', uid);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as FirestoreUserProfile;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

/**
 * Cập nhật lớp học cho học sinh vào users/{uid}
 */
export async function updateUserClassInFirestore(uid: string, classId: string): Promise<boolean> {
  try {
    const userDocRef = doc(db, 'users', uid);
    await setDoc(userDocRef, { classId, lastLoginAt: new Date().toISOString() }, { merge: true });

    // Đồng bộ legacy students/{uid}
    try {
      await setDoc(doc(db, 'students', uid), { classId }, { merge: true });
    } catch {
      // ignore
    }
    return true;
  } catch (error) {
    console.error('Lỗi updateUserClassInFirestore:', error);
    return false;
  }
}

// ==========================================
// 6. TIẾN TRÌNH HỌC TẬP (studentProgress/{uid}/lessons/{lessonId}) - SỬA TẬN GỐC LỖI 1
// ==========================================

/**
 * Đọc tiến trình của một bài học từ "studentProgress/{uid}/lessons/{lessonId}"
 */
export async function getLessonProgressFromFirestore(
  uid: string, 
  lessonId: number
): Promise<FirestoreLessonProgress | null> {
  try {
    // Kiểm tra định dạng ID số (ví dụ: '2')
    const primaryRef = doc(db, 'studentProgress', uid, 'lessons', String(lessonId));
    let snap = await getDoc(primaryRef);
    if (snap.exists()) {
      return snap.data() as FirestoreLessonProgress;
    }

    // Dự phòng kiểm tra định dạng 'lesson2'
    const fallbackRef = doc(db, 'studentProgress', uid, 'lessons', `lesson${lessonId}`);
    snap = await getDoc(fallbackRef);
    if (snap.exists()) {
      return snap.data() as FirestoreLessonProgress;
    }

    return null;
  } catch (error) {
    console.warn(`Lỗi đọc studentProgress/${uid}/lessons/${lessonId}:`, error);
    return null;
  }
}

/**
 * Lưu tiến trình bài học vào "studentProgress/{uid}/lessons/{lessonId}"
 * Ghi đồng thời cả 2 key 'lessonId' (số và chuỗi) để đảm bảo 100% tương thích
 */
export async function saveLessonProgressToFirestore(
  uid: string,
  lessonId: number,
  data: Partial<FirestoreLessonProgress>
): Promise<void> {
  const now = new Date().toISOString();
  const docRefNum = doc(db, 'studentProgress', uid, 'lessons', String(lessonId));
  const docRefStr = doc(db, 'studentProgress', uid, 'lessons', `lesson${lessonId}`);
  const parentRef = doc(db, 'studentProgress', uid);

  const payload: Partial<FirestoreLessonProgress> = {
    ...data,
    lessonId,
    lastUpdatedAt: now
  };

  try {
    await Promise.all([
      setDoc(docRefNum, payload, { merge: true }),
      setDoc(docRefStr, payload, { merge: true }),
      setDoc(parentRef, {
        uid,
        currentLessonId: lessonId,
        lastActiveAt: now
      }, { merge: true })
    ]);

    // Đồng bộ nhanh vào legacy students/{uid} để các module cũ tiếp tục hoạt động trơn tru
    try {
      const studentDocRef = doc(db, 'students', uid);
      const updates: any = {
        currentLessonId: lessonId,
        lastActiveAt: now
      };
      if (data.progressPercent !== undefined) updates.progressPercent = data.progressPercent;
      if (data.currentSection) updates.currentStepId = data.currentSection;
      if (data.status) updates.status = data.status;
      if (data.completedSections) updates.completedSteps = data.completedSections;
      if (data.practiceScore !== undefined) updates.practiceScore = data.practiceScore;
      if (data.examScore !== undefined) updates.testScore = data.examScore;
      await setDoc(studentDocRef, updates, { merge: true });
    } catch {
      // ignore legacy error
    }
  } catch (error) {
    console.error(`Lỗi ghi studentProgress/${uid}/lessons/${lessonId}:`, error);
  }
}

/**
 * Đọc toàn bộ tiến trình các bài học của học sinh từ subcollection "studentProgress/{uid}/lessons"
 */
export async function getStudentAllLessonsProgress(
  uid: string
): Promise<Record<number, FirestoreLessonProgress>> {
  const result: Record<number, FirestoreLessonProgress> = {};
  try {
    const colRef = collection(db, 'studentProgress', uid, 'lessons');
    const snapshot = await getDocs(colRef);

    snapshot.forEach(docSnap => {
      const data = docSnap.data() as FirestoreLessonProgress;
      if (data && data.lessonId) {
        const idNum = Number(data.lessonId);
        // Ưu tiên bản ghi có progress cao hơn nếu có trùng lặp giữa '2' và 'lesson2'
        if (!result[idNum] || (data.progressPercent || 0) >= (result[idNum].progressPercent || 0)) {
          result[idNum] = data;
        }
      }
    });
  } catch (error) {
    console.warn(`Lỗi getStudentAllLessonsProgress cho uid ${uid}:`, error);
  }
  return result;
}

// ==========================================
// 7. DASHBOARD GIÁO VIÊN (ĐỌC THẬT TỪ USERS & STUDENTPROGRESS)
// ==========================================

/**
 * Đọc danh sách học sinh THẬT cho Teacher Dashboard
 * - Nguồn chính: collection "users" với role = "student"
 * - Tiến trình: đọc từ subcollection "studentProgress/{uid}/lessons"
 * - Số lượng học sinh = COUNT user profile duy nhất có role = student
 * - TUYỆT ĐỐI KHÔNG dùng mock data, KHÔNG tự động tạo user khi render
 */
export async function fetchStudentsFromFirestore(classFilter?: string): Promise<StudentProgressItem[]> {
  try {
    const usersCol = collection(db, 'users');
    const usersSnap = await getDocs(usersCol);

    const items: StudentProgressItem[] = [];
    const processedUids = new Set<string>();

    for (const docSnap of usersSnap.docs) {
      const userData = docSnap.data() as FirestoreUserProfile;
      if (!userData) continue;

      // 1. Chỉ lấy học sinh (role === 'student')
      if (userData.role !== 'student') continue;

      const uid = userData.uid || docSnap.id;
      if (!uid || processedUids.has(uid)) continue;
      // Bỏ qua các ID kiểm thử/mock cũ nếu có
      if (uid.startsWith('hs-') || uid.startsWith('mock_')) continue;

      processedUids.add(uid);

      // Lọc theo lớp
      if (classFilter && classFilter !== 'all') {
        if (userData.classId !== classFilter) continue;
      }

      // 2. Lấy dữ liệu tiến trình thật từ subcollection studentProgress/{uid}/lessons
      const lessonsProgress = await getStudentAllLessonsProgress(uid);
      const lessonEntries = Object.values(lessonsProgress);

      // Xác định các bài đã hoàn thành
      const completedLessonIds: number[] = [];
      let latestActiveLessonId = 1;
      let latestActiveLessonProgress = 0;
      let latestActiveSection = 'sec_1';
      let latestActiveStatus: 'completed' | 'in_progress' | 'not_started' = 'not_started';
      let latestScore: number | null = null;
      let latestPracticeScore: number | null = null;
      let completedStepsList: string[] = [];

      for (const lp of lessonEntries) {
        if (lp.status === 'completed' || (lp.examScore !== null && lp.examScore !== undefined && lp.examScore >= 5.0)) {
          if (!completedLessonIds.includes(lp.lessonId)) {
            completedLessonIds.push(lp.lessonId);
          }
        }
        if (lp.examScore !== null && lp.examScore !== undefined) {
          latestScore = lp.examScore;
        }
        if (lp.practiceScore !== null && lp.practiceScore !== undefined) {
          latestPracticeScore = lp.practiceScore;
        }
        if (lp.completedSections && Array.isArray(lp.completedSections)) {
          completedStepsList = Array.from(new Set([...completedStepsList, ...lp.completedSections]));
        }

        // Chọn bài có tiến trình gần nhất
        if (lp.status === 'in_progress' || lp.lessonId >= latestActiveLessonId) {
          latestActiveLessonId = lp.lessonId;
          latestActiveLessonProgress = lp.progressPercent || 0;
          latestActiveSection = lp.currentSection || 'sec_1';
          latestActiveStatus = lp.status || 'in_progress';
        }
      }

      // Mở khóa bài học: Bài 1 luôn mở, bài N mở nếu bài N-1 completed
      const unlockedLessonIds = [1];
      for (let i = 1; i <= 51; i++) {
        if (completedLessonIds.includes(i) && !unlockedLessonIds.includes(i + 1)) {
          unlockedLessonIds.push(i + 1);
        }
      }

      // Tính overallProgress
      let overallProgress = latestActiveLessonProgress;
      if (completedLessonIds.length > 0 && overallProgress === 0) {
        overallProgress = 100;
      }

      let finalStatus: 'completed' | 'in_progress' | 'not_started' = 'not_started';
      if (completedLessonIds.length > 0) {
        finalStatus = 'completed';
      } else if (latestActiveStatus === 'in_progress' || overallProgress > 0) {
        finalStatus = 'in_progress';
      }

      // Tính thời gian hoạt động gần nhất
      let lastActiveStr = 'Vừa mới đây';
      if (userData.lastLoginAt) {
        try {
          lastActiveStr = new Date(userData.lastLoginAt).toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit'
          });
        } catch {
          lastActiveStr = 'Hôm nay';
        }
      }

      items.push({
        id: uid,
        studentName: userData.displayName || userData.email.split('@')[0] || 'Học sinh',
        className: userData.classId || 'Chưa chọn lớp',
        currentLessonId: latestActiveLessonId,
        currentStepId: latestActiveSection,
        currentStepTitle: `Bài ${latestActiveLessonId} (${latestActiveSection})`,
        completedSteps: completedStepsList,
        totalStepsInLesson: 5,
        completedStepCount: completedStepsList.length,
        unlockedLessonIds,
        completedLessonIds,
        overallProgress,
        status: finalStatus,
        completedTests: completedLessonIds.length,
        completedExercises: completedStepsList.length,
        lastQuizScore: latestScore,
        practiceScore: latestPracticeScore,
        testScore: latestScore,
        lastActive: lastActiveStr,
        avatar: userData.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        email: userData.email,
        scoresHistory: latestScore !== null ? [{
          lessonId: latestActiveLessonId,
          score: latestScore,
          total: 10,
          date: 'Hôm nay'
        }] : [],
        competency: latestScore !== null ? {
          nhanBietRate: Math.min(100, Math.round(latestScore * 10)),
          thongHieuRate: Math.min(100, Math.round(latestScore * 9)),
          vanDungRate: Math.min(100, Math.round(latestScore * 8))
        } : {
          nhanBietRate: 0,
          thongHieuRate: 0,
          vanDungRate: 0
        },
        recentMistakes: []
      });
    }

    return items;
  } catch (error) {
    console.error('Lỗi khi fetchStudentsFromFirestore:', error);
    return [];
  }
}

/**
 * Lắng nghe thời gian thực (Real-time snapshot) cho Teacher Dashboard
 */
export function subscribeToStudentsFromFirestore(
  classFilter: string | undefined,
  callback: (students: StudentProgressItem[]) => void
): () => void {
  const usersCol = collection(db, 'users');

  return onSnapshot(usersCol, async () => {
    try {
      const items = await fetchStudentsFromFirestore(classFilter);
      callback(items);
    } catch (err) {
      console.warn('[subscribeToStudentsFromFirestore] Lỗi snapshot:', err);
    }
  }, (err) => {
    console.warn('[subscribeToStudentsFromFirestore] Lỗi:', err);
  });
}

// ==========================================
// 8. CÁC HÀM HỖ TRỢ ĐỒNG BỘ TIẾN ĐỘ SGK & TƯƠNG THÍCH CŨ
// ==========================================

export async function saveAndVerifyStudentInFirestore(params: {
  uid: string;
  displayName: string;
  email: string;
  classId: string;
}): Promise<{ success: boolean; student?: any; message?: string }> {
  try {
    const profile = await syncUserProfile({
      uid: params.uid,
      displayName: params.displayName,
      email: params.email,
      classId: params.classId
    });
    return { success: true, student: profile };
  } catch (err: any) {
    return { success: false, message: 'Không thể lưu thông tin học sinh. Vui lòng thử lại.' };
  }
}

export async function updateStudentStepProgressInFirestore(params: {
  uid: string;
  lessonId: number;
  stepId: string;
  stepTitle?: string;
  completedStepId?: string;
  totalStepsInLesson?: number;
}): Promise<{ success: boolean; progressPercent: number; completedCount: number }> {
  try {
    const existing = await getLessonProgressFromFirestore(params.uid, params.lessonId);
    const completedSections = existing?.completedSections ? [...existing.completedSections] : [];
    if (params.completedStepId && !completedSections.includes(params.completedStepId)) {
      completedSections.push(params.completedStepId);
    }

    const mainKeys = ['sec_1', 'sec_2', 'sec_3', 'sec_4', 'sec_5'];
    const completedMainCount = mainKeys.filter(k => completedSections.includes(k)).length;
    const progressPercent = Math.min(100, completedMainCount * 20);

    await saveLessonProgressToFirestore(params.uid, params.lessonId, {
      currentSection: params.stepId,
      lastViewedSection: params.stepId,
      progressPercent,
      completedSections,
      status: progressPercent === 100 ? 'completed' : 'in_progress'
    });

    return { success: true, progressPercent, completedCount: completedSections.length };
  } catch (error) {
    console.warn('Lỗi updateStudentStepProgressInFirestore:', error);
    return { success: false, progressPercent: 0, completedCount: 0 };
  }
}

export async function recordStudentQuizScoreInFirestore(params: {
  uid: string;
  lessonId: number;
  score: number;
  total: number;
  completedStepId?: string;
  testType?: 'practice' | 'test';
  details?: any;
}): Promise<void> {
  try {
    const existing = await getLessonProgressFromFirestore(params.uid, params.lessonId);
    const completedSections = existing?.completedSections ? [...existing.completedSections] : [];
    if (params.completedStepId && !completedSections.includes(params.completedStepId)) {
      completedSections.push(params.completedStepId);
    }

    const isOfficialTest = params.testType === 'test' || !params.testType;
    const updates: Partial<FirestoreLessonProgress> = {
      completedSections
    };

    if (isOfficialTest) {
      updates.examScore = params.score;
      updates.completedAt = new Date().toISOString();
      if (params.score >= 5.0) {
        updates.status = 'completed';
        updates.progressPercent = 100;
        if (!completedSections.includes('sec_4')) completedSections.push('sec_4');
        if (!completedSections.includes('sec_5')) completedSections.push('sec_5');
        updates.currentSection = 'sec_5';
        updates.lastViewedSection = 'sec_5';
      }
    } else {
      updates.practiceScore = params.score;
      if (!completedSections.includes('sec_3')) completedSections.push('sec_3');
      updates.currentSection = 'sec_4';
      updates.lastViewedSection = 'sec_4';
      updates.progressPercent = Math.max(existing?.progressPercent || 0, 60);
    }

    await saveLessonProgressToFirestore(params.uid, params.lessonId, updates);
  } catch (error) {
    console.warn('Lỗi recordStudentQuizScoreInFirestore:', error);
  }
}

export async function getStudentFromFirestore(uid: string): Promise<any | null> {
  const profile = await getUserProfileFromFirestore(uid);
  return profile;
}

export async function updateExistingStudentLogin(
  uid: string,
  displayName: string,
  email: string
): Promise<any | null> {
  return syncUserProfile({ uid, displayName, email });
}
