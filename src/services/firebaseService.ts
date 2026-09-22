import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User as FirebaseUser,
  signInAnonymously
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
import { MOCK_STUDENTS } from '../data/teacherData';

// 1. KHỞI TẠO FIREBASE SDK
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Kiểm tra kết nối Firestore lúc khởi động (theo hướng dẫn chuẩn Firebase skill)
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline. Vui lòng kiểm tra cấu hình mạng.');
    }
  }
}
testFirestoreConnection();

// 2. ERROR HANDLER CHUẨN FIREBASE SKILL
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

// 3. ĐỊNH NGHĨA DỮ LIỆU HỌC SINH TRONG CLOUD FIRESTORE
export interface FirestoreStudent {
  uid: string;
  displayName: string;
  email: string;
  classId: string;
  role: 'STUDENT';
  createdAt: string;
  lastLoginAt: string;
  progressPercent: number;
  completedLessons: number[];
  scores: Array<{
    lessonId: number;
    score: number;
    total: number;
    date: string;
    type?: 'practice' | 'test';
    details?: any;
  }>;
  assessmentCount: number;

  // Trường theo dõi tiến trình 5 mục bài học SGK (1. Khởi động, 2. Hình thành kiến thức, 3. Luyện tập, 4. Kiểm tra, 5. Hoàn thành)
  currentLessonId?: number;
  currentStepId?: string;
  currentStepTitle?: string;
  completedSteps?: string[];
  lastActiveAt?: string;
  practiceScore?: number | null; // Điểm phần Luyện tập (10 câu)
  testScore?: number | null; // Điểm phần Kiểm tra (thang 10đ)
  status?: 'completed' | 'in_progress' | 'not_started';
}

// 4. CHỨC NĂNG ĐĂNG NHẬP / ĐĂNG XUẤT BẰNG GOOGLE QUA FIREBASE AUTH THẬT
export async function ensureAuthSession(): Promise<boolean> {
  if (auth.currentUser) return true;
  try {
    await auth.authStateReady();
    if (auth.currentUser) return true;
  } catch {
    // continue
  }
  try {
    await signInAnonymously(auth);
    return true;
  } catch (e) {
    console.warn('[Firebase] signInAnonymously:', e);
    return false;
  }
}

export async function signInWithGoogle(): Promise<FirebaseUser> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error('Lỗi signInWithPopup Google:', error);
    if (error.code === 'auth/popup-blocked') {
      throw new Error('Trình duyệt đã chặn cửa sổ Popup đăng nhập. Vui lòng cho phép mở popup và thử lại.');
    }
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Cửa sổ đăng nhập đã bị đóng trước khi hoàn tất.');
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

// 5. CÁC HÀM THAO TÁC FIRESTORE VỚI COLLECTION "students"

/**
 * Đọc hồ sơ học sinh theo Firebase UID
 */
export async function getStudentFromFirestore(uid: string): Promise<FirestoreStudent | null> {
  const path = `students/${uid}`;
  try {
    const docRef = doc(db, 'students', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as FirestoreStudent;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

/**
 * Ghi hồ sơ học sinh vào Cloud Firestore và kiểm tra xác nhận lại document
 * Áp dụng nghiêm ngặt Yêu cầu 4, 5, 6, 7:
 * - Document ID: Firebase Auth UID
 * - Xác nhận ghi thành công và đọc lại để kiểm tra: UID, displayName, email, classId, role
 */
export async function saveAndVerifyStudentInFirestore(params: {
  uid: string;
  displayName: string;
  email: string;
  classId: string;
}): Promise<{ success: boolean; student?: FirestoreStudent; message?: string }> {
  await ensureAuthSession();
  const path = `students/${params.uid}`;
  const nowIso = new Date().toISOString();

  // Đọc document hiện tại nếu có để bảo toàn dữ liệu tiến độ bài học
  let existingStudent: FirestoreStudent | null = null;
  try {
    existingStudent = await getStudentFromFirestore(params.uid);
  } catch (err) {
    console.warn('Lỗi đọc existing document (có thể chưa tồn tại):', err);
  }

  const studentData: FirestoreStudent = {
    uid: params.uid,
    displayName: params.displayName.trim() || params.email.split('@')[0],
    email: params.email.trim().toLowerCase(),
    classId: params.classId,
    role: 'STUDENT',
    createdAt: existingStudent?.createdAt || nowIso,
    lastLoginAt: nowIso,
    progressPercent: existingStudent?.progressPercent ?? 0,
    completedLessons: existingStudent?.completedLessons ?? [],
    scores: existingStudent?.scores ?? [],
    assessmentCount: existingStudent?.assessmentCount ?? 0
  };

  try {
    // 1. Ghi document thật vào Cloud Firestore
    const docRef = doc(db, 'students', params.uid);
    await setDoc(docRef, studentData);

    // 2. Đọc lại document vừa tạo để xác nhận (Yêu cầu 6)
    const verifySnap = await getDoc(docRef);
    if (!verifySnap.exists()) {
      return {
        success: false,
        message: 'Không thể lưu thông tin học sinh. Vui lòng thử lại.'
      };
    }

    const verified = verifySnap.data() as FirestoreStudent;

    // Xác nhận chi tiết các trường bắt buộc
    const isUidMatch = verified.uid === params.uid;
    const isEmailMatch = verified.email.toLowerCase() === params.email.toLowerCase();
    const isClassMatch = verified.classId === params.classId;
    const isRoleMatch = verified.role === 'STUDENT';
    const isNameMatch = Boolean(verified.displayName);

    if (!isUidMatch || !isEmailMatch || !isClassMatch || !isRoleMatch || !isNameMatch) {
      console.error('Xác nhận document không khớp:', {
        verified,
        params,
        checks: { isUidMatch, isEmailMatch, isClassMatch, isRoleMatch, isNameMatch }
      });
      return {
        success: false,
        message: 'Xác nhận thông tin hồ sơ trên máy chủ không khớp. Vui lòng thử lại.'
      };
    }

    return {
      success: true,
      student: verified
    };
  } catch (error) {
    console.error('Lỗi khi lưu/xác nhận học sinh trên Firestore:', error);
    return {
      success: false,
      message: 'Không thể lưu thông tin học sinh. Vui lòng thử lại.'
    };
  }
}

/**
 * Cập nhật lastLoginAt và đồng bộ displayName/email khi học sinh đăng nhập lại (Yêu cầu 8)
 * Giữ nguyên: classId, progress, completedLessons, scores, assessmentCount
 */
export async function updateExistingStudentLogin(
  uid: string, 
  displayName: string, 
  email: string
): Promise<FirestoreStudent | null> {
  const path = `students/${uid}`;
  try {
    const docRef = doc(db, 'students', uid);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return null;

    const existing = snap.data() as FirestoreStudent;
    const updates: Partial<FirestoreStudent> = {
      lastLoginAt: new Date().toISOString()
    };
    if (displayName && displayName !== existing.displayName) {
      updates.displayName = displayName;
    }
    if (email && email.toLowerCase() !== existing.email.toLowerCase()) {
      updates.email = email.toLowerCase();
    }

    await updateDoc(docRef, updates);
    return { ...existing, ...updates };
  } catch (error) {
    console.warn('Lỗi cập nhật lastLoginAt trên Firestore:', error);
    return null;
  }
}

/**
 * Đọc trực tiếp danh sách học sinh từ Cloud Firestore cho Dashboard Giáo viên (Yêu cầu 9, 10, 11, 12, XVI, XVII)
 * Đọc từ collection 'students' thật, kiểm tra session Firebase Auth an toàn
 */
export async function fetchStudentsFromFirestore(classFilter?: string): Promise<StudentProgressItem[]> {
  const path = 'students';
  
  // Đảm bảo phiên Firebase Auth sẵn sàng
  await ensureAuthSession();

  try {
    const studentsCol = collection(db, 'students');
    let snapshot = await getDocs(studentsCol);

    // NẾU CLOUD FIRESTORE CHƯA CÓ DỮ LIỆU: Tự động khởi tạo dữ liệu danh sách học sinh 8 lớp (9A1 -> 9A8)
    if (snapshot.empty && MOCK_STUDENTS.length > 0) {
      console.log('[Firestore] Khởi tạo đồng bộ danh sách học sinh 8 lớp vào Cloud Firestore...');
      for (const mStudent of MOCK_STUDENTS) {
        const docRef = doc(db, 'students', mStudent.id);
        const fStudent: FirestoreStudent = {
          uid: mStudent.id,
          displayName: mStudent.studentName,
          email: mStudent.email,
          classId: mStudent.className,
          role: 'STUDENT',
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          progressPercent: mStudent.overallProgress,
          completedLessons: mStudent.completedLessonIds,
          scores: mStudent.lastQuizScore !== null ? [{
            lessonId: 1,
            score: mStudent.lastQuizScore,
            total: 10,
            date: new Date().toLocaleDateString('vi-VN')
          }] : [],
          assessmentCount: mStudent.completedTests,
          currentLessonId: mStudent.currentLessonId || 1,
          currentStepId: mStudent.completedLessonIds.length > 0 ? 'b1_s8' : 'b1_s1',
          currentStepTitle: mStudent.completedLessonIds.length > 0 ? 'Luyện tập cuối bài' : 'Mục I.1 Dụng cụ quang học',
          completedSteps: mStudent.completedLessonIds.length > 0 
            ? ['b1_s0', 'b1_s1', 'b1_s2', 'b1_s3', 'b1_s4', 'b1_s5', 'b1_s6', 'b1_s7', 'b1_s8'] 
            : ['b1_s0'],
          lastActiveAt: new Date().toISOString()
        };
        await setDoc(docRef, fStudent);
      }
      snapshot = await getDocs(studentsCol);
    }

    const items: StudentProgressItem[] = [];
    const mainSectionKeys = ['sec_1', 'sec_2', 'sec_3', 'sec_4', 'sec_5'];

    snapshot.forEach(docSnap => {
      const data = docSnap.data() as FirestoreStudent;
      if (!data) return;

      // Lọc theo lớp nếu được chọn (9A1 -> 9A8)
      if (classFilter && classFilter !== 'all') {
        if (data.classId !== classFilter) return;
      }

      const completedStepsList = Array.isArray(data.completedSteps) ? data.completedSteps : [];
      const hasCompletedLessons = Array.isArray(data.completedLessons) && data.completedLessons.length > 0;
      const isFinished = hasCompletedLessons || 
                         data.progressPercent === 100 || 
                         completedStepsList.includes('sec_5') || 
                         completedStepsList.includes('sec_4') ||
                         (data.testScore !== null && data.testScore !== undefined);

      // Xác định điểm số: ưu tiên testScore (kiểm tra chính thức) -> điểm bài thi gần nhất -> practiceScore
      let lastScore: number | null = null;
      if (data.testScore !== null && data.testScore !== undefined) {
        lastScore = data.testScore;
      } else if (Array.isArray(data.scores) && data.scores.length > 0) {
        lastScore = data.scores[data.scores.length - 1].score;
      } else if (data.practiceScore !== null && data.practiceScore !== undefined) {
        lastScore = data.practiceScore;
      }

      // Đếm số mục chính đã hoàn thành (trong 5 mục chính)
      let completedMainCount = mainSectionKeys.filter(k => completedStepsList.includes(k)).length;
      if (isFinished && completedMainCount === 0) completedMainCount = 5;
      else if (completedStepsList.length > 0 && completedMainCount === 0) completedMainCount = 1;

      let status: 'completed' | 'in_progress' | 'not_started' = 'not_started';
      if (isFinished) {
        status = 'completed';
      } else if (lastScore !== null || (data.progressPercent && data.progressPercent > 0) || completedStepsList.length > 0) {
        status = 'in_progress';
      }

      // Tiến độ % chuẩn 5 mục
      let progressVal = isFinished ? 100 : (data.progressPercent || Math.min(100, completedMainCount * 20));

      // Tính thời gian hoạt động gần nhất
      let lastActiveStr = 'Chưa hoạt động';
      const activeTimestamp = data.lastActiveAt || data.lastLoginAt;
      if (activeTimestamp) {
        try {
          lastActiveStr = new Date(activeTimestamp).toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit'
          });
        } catch {
          lastActiveStr = 'Vừa mới đây';
        }
      }

      items.push({
        id: data.uid || docSnap.id,
        studentName: data.displayName || data.email?.split('@')[0] || 'Học sinh',
        className: data.classId || 'Chưa chọn lớp',
        currentLessonId: data.currentLessonId || 1,
        currentStepId: data.currentStepId || 'sec_1',
        currentStepTitle: data.currentStepTitle || '1. Khởi động',
        completedSteps: completedStepsList,
        totalStepsInLesson: 5,
        completedStepCount: completedMainCount,
        unlockedLessonIds: isFinished ? [1, 2] : [1],
        completedLessonIds: data.completedLessons || (isFinished ? [1] : []),
        overallProgress: progressVal,
        status: status,
        completedTests: isFinished ? 1 : (data.assessmentCount || 0),
        completedExercises: completedStepsList.length,
        lastQuizScore: lastScore, // null nếu chưa làm bài -> Hiển thị "Chưa có điểm"
        practiceScore: data.practiceScore,
        testScore: data.testScore,
        lastActive: lastActiveStr,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        email: data.email,
        scoresHistory: data.scores || [],
        competency: lastScore !== null ? {
          nhanBietRate: Math.min(100, Math.round(lastScore * 10)),
          thongHieuRate: Math.min(100, Math.round(lastScore * 9)),
          vanDungRate: Math.min(100, Math.round(lastScore * 8))
        } : {
          nhanBietRate: 0,
          thongHieuRate: 0,
          vanDungRate: 0
        },
        recentMistakes: []
      } as StudentProgressItem);
    });

    return items;
  } catch (error) {
    console.error('Lỗi khi fetchStudentsFromFirestore:', error);
    return [];
  }
}

/**
 * Lắng nghe thời gian thực (Real-time onSnapshot) danh sách học sinh từ Cloud Firestore
 * Giúp Dashboard giáo viên tự động nhận dữ liệu sau < 1 giây khi học sinh nộp bài
 */
export function subscribeToStudentsFromFirestore(
  classFilter: string | undefined,
  callback: (students: StudentProgressItem[]) => void
): () => void {
  const studentsCol = collection(db, 'students');
  const mainSectionKeys = ['sec_1', 'sec_2', 'sec_3', 'sec_4', 'sec_5'];

  return onSnapshot(studentsCol, (snapshot) => {
    const items: StudentProgressItem[] = [];

    snapshot.forEach(docSnap => {
      const data = docSnap.data() as FirestoreStudent;
      if (!data) return;

      if (classFilter && classFilter !== 'all') {
        if (data.classId !== classFilter) return;
      }

      const completedStepsList = Array.isArray(data.completedSteps) ? data.completedSteps : [];
      const hasCompletedLessons = Array.isArray(data.completedLessons) && data.completedLessons.length > 0;
      const isFinished = hasCompletedLessons || 
                         data.progressPercent === 100 || 
                         completedStepsList.includes('sec_5') || 
                         completedStepsList.includes('sec_4') ||
                         (data.testScore !== null && data.testScore !== undefined);

      let lastScore: number | null = null;
      if (data.testScore !== null && data.testScore !== undefined) {
        lastScore = data.testScore;
      } else if (Array.isArray(data.scores) && data.scores.length > 0) {
        lastScore = data.scores[data.scores.length - 1].score;
      } else if (data.practiceScore !== null && data.practiceScore !== undefined) {
        lastScore = data.practiceScore;
      }

      let completedMainCount = mainSectionKeys.filter(k => completedStepsList.includes(k)).length;
      if (isFinished && completedMainCount === 0) completedMainCount = 5;
      else if (completedStepsList.length > 0 && completedMainCount === 0) completedMainCount = 1;

      let status: 'completed' | 'in_progress' | 'not_started' = 'not_started';
      if (isFinished) {
        status = 'completed';
      } else if (lastScore !== null || (data.progressPercent && data.progressPercent > 0) || completedStepsList.length > 0) {
        status = 'in_progress';
      }

      let progressVal = isFinished ? 100 : (data.progressPercent || Math.min(100, completedMainCount * 20));

      let lastActiveStr = 'Chưa hoạt động';
      const activeTimestamp = data.lastActiveAt || data.lastLoginAt;
      if (activeTimestamp) {
        try {
          lastActiveStr = new Date(activeTimestamp).toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit'
          });
        } catch {
          lastActiveStr = 'Vừa mới đây';
        }
      }

      items.push({
        id: data.uid || docSnap.id,
        studentName: data.displayName || data.email?.split('@')[0] || 'Học sinh',
        className: data.classId || 'Chưa chọn lớp',
        currentLessonId: data.currentLessonId || 1,
        currentStepId: data.currentStepId || 'sec_1',
        currentStepTitle: data.currentStepTitle || '1. Khởi động',
        completedSteps: completedStepsList,
        totalStepsInLesson: 5,
        completedStepCount: completedMainCount,
        unlockedLessonIds: isFinished ? [1, 2] : [1],
        completedLessonIds: data.completedLessons || (isFinished ? [1] : []),
        overallProgress: progressVal,
        status: status,
        completedTests: isFinished ? 1 : (data.assessmentCount || 0),
        completedExercises: completedStepsList.length,
        lastQuizScore: lastScore,
        practiceScore: data.practiceScore,
        testScore: data.testScore,
        lastActive: lastActiveStr,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        email: data.email,
        scoresHistory: data.scores || [],
        competency: lastScore !== null ? {
          nhanBietRate: Math.min(100, Math.round(lastScore * 10)),
          thongHieuRate: Math.min(100, Math.round(lastScore * 9)),
          vanDungRate: Math.min(100, Math.round(lastScore * 8))
        } : {
          nhanBietRate: 0,
          thongHieuRate: 0,
          vanDungRate: 0
        },
        recentMistakes: []
      } as StudentProgressItem);
    });

    callback(items);
  }, (err) => {
    console.warn('[subscribeToStudentsFromFirestore] Lỗi snapshot:', err);
  });
}

/**
 * Đồng bộ tiến trình bước học SGK vào Cloud Firestore (Yêu cầu XIV, XV, XVI, XVII)
 * Lưu: completedSteps, currentStepId, currentLessonId, progressPercent, lastActiveAt
 * Sử dụng setDoc merge để ĐẢM BẢO KHÔNG BAO GIỜ BỊ MẤT DỮ LIỆU kể cả khi tài khoản mới tạo
 */
export async function updateStudentStepProgressInFirestore(params: {
  uid: string;
  lessonId: number;
  stepId: string;
  stepTitle?: string;
  completedStepId?: string;
  totalStepsInLesson?: number;
}): Promise<{ success: boolean; progressPercent: number; completedCount: number }> {
  try {
    const docRef = doc(db, 'students', params.uid);
    const snap = await getDoc(docRef);
    const current = snap.exists() ? (snap.data() as FirestoreStudent) : ({} as Partial<FirestoreStudent>);
    const completedSteps = Array.isArray(current.completedSteps) ? [...current.completedSteps] : [];
    
    if (params.completedStepId && !completedSteps.includes(params.completedStepId)) {
      completedSteps.push(params.completedStepId);
    }

    const mainKeys = ['sec_1', 'sec_2', 'sec_3', 'sec_4', 'sec_5'];
    const completedMainCount = mainKeys.filter(k => completedSteps.includes(k)).length;
    const progressPercent = Math.min(100, completedMainCount * 20);

    const updates: Partial<FirestoreStudent> = {
      uid: params.uid,
      completedSteps,
      currentLessonId: params.lessonId,
      currentStepId: params.stepId,
      currentStepTitle: params.stepTitle || params.stepId,
      progressPercent,
      lastActiveAt: new Date().toISOString(),
      status: progressPercent === 100 ? 'completed' : 'in_progress'
    };

    await setDoc(docRef, updates, { merge: true });
    return { success: true, progressPercent, completedCount: completedSteps.length };
  } catch (error) {
    console.warn('Lỗi cập nhật tiến trình bước học vào Firestore:', error);
    return { success: false, progressPercent: 0, completedCount: 0 };
  }
}

/**
 * Cập nhật điểm kiểm tra / luyện tập vào Cloud Firestore
 * Lưu điểm (chuẩn hoá 10), completedLessons, completedSteps, testScore/practiceScore
 */
export async function recordStudentQuizScoreInFirestore(params: {
  uid: string;
  lessonId: number;
  score: number; // Thang điểm 10 (0 đến 10)
  total: number; // 10
  completedStepId?: string;
  testType?: 'practice' | 'test'; // Phân biệt luyện tập vs kiểm tra
  details?: any;
}): Promise<void> {
  try {
    const docRef = doc(db, 'students', params.uid);
    const snap = await getDoc(docRef);
    const current = snap.exists() ? (snap.data() as FirestoreStudent) : ({} as Partial<FirestoreStudent>);
    const scores = Array.isArray(current.scores) ? [...current.scores] : [];
    const completedLessons = Array.isArray(current.completedLessons) ? [...current.completedLessons] : [];
    const completedSteps = Array.isArray(current.completedSteps) ? [...current.completedSteps] : [];

    scores.push({
      lessonId: params.lessonId,
      score: params.score,
      total: params.total,
      date: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      type: params.testType || 'test',
      details: params.details
    });

    if (params.completedStepId && !completedSteps.includes(params.completedStepId)) {
      completedSteps.push(params.completedStepId);
    }

    const isOfficialTest = params.testType === 'test' || !params.testType;

    if (isOfficialTest) {
      if (!completedLessons.includes(params.lessonId)) {
        completedLessons.push(params.lessonId);
      }
      if (!completedSteps.includes('sec_4')) completedSteps.push('sec_4');
      if (!completedSteps.includes('sec_5')) completedSteps.push('sec_5');
    } else {
      if (!completedSteps.includes('sec_3')) completedSteps.push('sec_3');
    }

    const updates: Partial<FirestoreStudent> = {
      uid: params.uid,
      scores,
      completedSteps,
      assessmentCount: scores.length,
      lastActiveAt: new Date().toISOString()
    };

    if (isOfficialTest) {
      updates.testScore = params.score;
      updates.completedLessons = completedLessons;
      updates.progressPercent = 100;
      updates.status = 'completed';
      updates.currentStepId = 'sec_5';
      updates.currentStepTitle = '5. Hoàn thành & Kết quả';
    } else {
      updates.practiceScore = params.score;
      if ((current.progressPercent || 0) < 60) {
        updates.progressPercent = 60;
      }
    }

    await setDoc(docRef, updates, { merge: true });
  } catch (error) {
    console.warn('Lỗi ghi điểm vào Firestore:', error);
  }
}

/**
 * Tải hồ sơ học sinh trực tiếp từ Cloud Firestore
 */
export async function getStudentProfileFromFirestore(uid: string): Promise<FirestoreStudent | null> {
  try {
    const docRef = doc(db, 'students', uid);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as FirestoreStudent;
    }
    return null;
  } catch (error) {
    console.warn('Lỗi lấy thông tin học sinh từ Firestore:', error);
    return null;
  }
}
