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
import { isAuthorizedTeacherEmail } from '../config/authConfig';

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
  const isTeacher = isAuthorizedTeacherEmail(cleanEmail);
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

      // Tự động nâng cấp quyền Teacher nếu email thuộc danh sách Giáo viên
      if (isTeacher && existing.role !== 'teacher') {
        updates.role = 'teacher';
        updates.classId = 'Tổ Tự Nhiên - Khối 9';
      } else if (params.classId && !existing.classId) {
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
        classId: isTeacher ? 'Tổ Tự Nhiên - Khối 9' : (params.classId || ''),
        createdAt: now,
        lastLoginAt: now
      };

      await setDoc(userDocRef, newProfile);

      // Chỉ đồng bộ bản sao legacy vào collection "students/{uid}" khi KHÔNG PHẢI giáo viên (isTeacher === false)
      // Tuyệt đối không tạo document trong "students" cho tài khoản giáo viên
      if (!isTeacher) {
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
 * Logic so sánh ưu tiên bản ghi có dữ liệu học tập thực tế khi hai document có cùng email
 * (Ví dụ: 1 document legacy 'std_<slug_email>' có điểm thi/tiến độ thực và 1 document 'Firebase Auth UID' mới tạo 0%).
 * 
 * NGUYÊN TẮC:
 * - TUYỆT ĐỐI KHÔNG gộp điểm bằng Math.max() máy móc.
 * - Ưu tiên bản ghi có dữ liệu học tập thực tế, có điểm thi thực tế (lastQuizScore != null).
 * - Ưu tiên bản ghi có tiến độ học tập thực tế (overallProgress > 0).
 * - Ưu tiên bản ghi có danh sách bài học và bước học đã làm thực tế.
 * - Ưu tiên bản ghi có classId hợp lệ (9A1 -> 9A8).
 * - Không tự ý thay đổi, cộng điểm hay ghi ngược vào Firestore.
 */
function isBetterStudentRecord(candidate: StudentProgressItem, existing: StudentProgressItem): boolean {
  // 1. Ưu tiên số 1: Có điểm thi thực tế (khác null và undefined)
  const candidateHasScore = candidate.lastQuizScore !== null && candidate.lastQuizScore !== undefined;
  const existingHasScore = existing.lastQuizScore !== null && existing.lastQuizScore !== undefined;
  if (candidateHasScore && !existingHasScore) return true;
  if (!candidateHasScore && existingHasScore) return false;

  // 2. Ưu tiên số 2: Có lịch sử bài kiểm tra nhiều hơn
  const candidateHistoryCount = candidate.scoresHistory ? candidate.scoresHistory.length : 0;
  const existingHistoryCount = existing.scoresHistory ? existing.scoresHistory.length : 0;
  if (candidateHistoryCount > existingHistoryCount) return true;
  if (candidateHistoryCount < existingHistoryCount) return false;

  // 3. Ưu tiên số 3: Có tiến độ học tập thực tế (overallProgress > 0)
  const candidateHasProgress = candidate.overallProgress > 0;
  const existingHasProgress = existing.overallProgress > 0;
  if (candidateHasProgress && !existingHasProgress) return true;
  if (!candidateHasProgress && existingHasProgress) return false;
  if (candidate.overallProgress > existing.overallProgress) return true;
  if (candidate.overallProgress < existing.overallProgress) return false;

  // 4. Ưu tiên số 4: Có danh sách bài học đã hoàn thành
  const candidateLessonsCount = candidate.completedLessonIds ? candidate.completedLessonIds.length : 0;
  const existingLessonsCount = existing.completedLessonIds ? existing.completedLessonIds.length : 0;
  if (candidateLessonsCount > existingLessonsCount) return true;
  if (candidateLessonsCount < existingLessonsCount) return false;

  // 5. Ưu tiên số 5: Có số mục chính hoàn thành nhiều hơn
  const candidateStepCount = candidate.completedStepCount || 0;
  const existingStepCount = existing.completedStepCount || 0;
  if (candidateStepCount > existingStepCount) return true;
  if (candidateStepCount < existingStepCount) return false;

  // 6. Ưu tiên số 6: Có classId hợp lệ thuộc 8 lớp khối 9 (9A1 -> 9A8)
  const isCandidateClassValid = /^9A[1-8]$/i.test(candidate.className || '');
  const isExistingClassValid = /^9A[1-8]$/i.test(existing.className || '');
  if (isCandidateClassValid && !isExistingClassValid) return true;
  if (!isCandidateClassValid && isExistingClassValid) return false;

  // 7. Ưu tiên số 7: Trạng thái học tập thực tế
  if (candidate.status === 'completed' && existing.status !== 'completed') return true;
  if (candidate.status === 'in_progress' && existing.status === 'not_started') return true;

  return false;
}

/**
 * Chuẩn hóa email key để deduplicate an toàn:
 * - Loại bỏ dấu chấm thừa ngay trước ký tự @ (ví dụ "kienduc.@gmail.com" -> "kienduc@gmail.com")
 * - Riêng tên miền gmail.com và googlemail.com: bỏ toàn bộ dấu chấm ở phần username (ví dụ "kien.duc@gmail.com" -> "kienduc@gmail.com")
 * - CHỈ dùng làm khóa so sánh (dedupKey). KHÔNG thay đổi email hiển thị hay dữ liệu lưu.
 */
export function normalizeEmailKey(rawEmail?: string | null): string {
  if (!rawEmail) return '';
  let email = String(rawEmail).trim().toLowerCase();
  if (!email.includes('@')) return email;

  // Bỏ dấu chấm ngay trước @ (ví dụ: "kienduc.@gmail.com" -> "kienduc@gmail.com")
  email = email.replace(/\.+@/g, '@');

  const parts = email.split('@');
  if (parts.length !== 2) return email;
  const username = parts[0];
  const domain = parts[1];

  // Riêng gmail.com/googlemail.com bỏ mọi dấu chấm ở phần username
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    const cleanUsername = username.replace(/\./g, '');
    return `${cleanUsername}@${domain}`;
  }

  return email;
}

/**
 * Đọc danh sách học sinh THẬT cho Teacher Dashboard từ Firestore collection "students"
 * - Nguồn chính: collection "students"
 * - Loại bỏ tài khoản giáo viên (không hiển thị trong danh sách học sinh)
 * - Xử lý role an toàn: chấp nhận 'STUDENT', 'student' (không phân biệt chữ hoa/thường)
 * - Chống trùng lặp theo email chuẩn hóa (coi các document cùng email là 1 học sinh duy nhất)
 * - Ưu tiên bản ghi có dữ liệu học tập thực tế mà KHÔNG dùng Math.max() máy móc
 * - TUYỆT ĐỐI KHÔNG dùng mock data, đọc 100% dữ liệu thật từ Firestore
 */
export async function fetchStudentsFromFirestore(classFilter?: string): Promise<StudentProgressItem[]> {
  try {
    const studentsCol = collection(db, 'students');
    const studentsSnap = await getDocs(studentsCol);

    const studentMap = new Map<string, StudentProgressItem>();

    for (const docSnap of studentsSnap.docs) {
      const studentData = docSnap.data() as any;
      if (!studentData) continue;

      // 1. Loại bỏ tài khoản giáo viên (bỏ qua khi hiển thị, không xóa dữ liệu Firestore)
      const emailClean = String(studentData.email || '').trim().toLowerCase();
      if (isAuthorizedTeacherEmail(emailClean)) continue;

      // 2. Xử lý role an toàn: chấp nhận 'STUDENT' và 'student', bỏ qua tài khoản có role khác nếu có
      const roleStr = String(studentData.role || '').trim().toUpperCase();
      if (roleStr && roleStr !== 'STUDENT') continue;

      const uid = studentData.uid || docSnap.id;
      if (!uid) continue;
      // Bỏ qua các ID mock test nếu có
      if (uid.startsWith('mock_')) continue;

      // 3. Lấy dữ liệu tiến trình thật từ subcollection studentProgress/{uid}/lessons (nếu có)
      const lessonsProgress = await getStudentAllLessonsProgress(uid);
      const lessonEntries = Object.values(lessonsProgress);

      // Xác định các bài đã hoàn thành từ subcollection
      const completedLessonIdsFromSubcol: number[] = [];
      let latestActiveLessonId = Number(studentData.currentLessonId) || 1;
      let latestActiveLessonProgress = typeof studentData.progressPercent === 'number' ? studentData.progressPercent : 0;
      let latestActiveSection = studentData.currentStepId || 'sec_1';
      let latestActiveStatus: 'completed' | 'in_progress' | 'needs_help' | 'not_started' = 
        studentData.status || (latestActiveLessonProgress > 0 ? 'in_progress' : 'not_started');
      let latestScore: number | null = null;
      let latestPracticeScore: number | null = null;
      let completedStepsList: string[] = Array.isArray(studentData.completedSteps) ? [...studentData.completedSteps] : [];

      for (const lp of lessonEntries) {
        if (lp.status === 'completed' || (lp.examScore !== null && lp.examScore !== undefined && lp.examScore >= 5.0)) {
          if (!completedLessonIdsFromSubcol.includes(lp.lessonId)) {
            completedLessonIdsFromSubcol.push(lp.lessonId);
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

        // Ưu tiên bài có tiến trình gần nhất nếu subcol mới hơn
        if (lp.status === 'in_progress' || lp.lessonId >= latestActiveLessonId) {
          latestActiveLessonId = lp.lessonId;
          latestActiveLessonProgress = Math.max(latestActiveLessonProgress, lp.progressPercent || 0);
          latestActiveSection = lp.currentSection || latestActiveSection;
          latestActiveStatus = (lp.status as any) || latestActiveStatus;
        }
      }

      // Hợp nhất danh sách bài học đã hoàn thành từ doc data và subcollection
      let completedLessonIds: number[] = [];
      if (Array.isArray(studentData.completedLessons)) {
        completedLessonIds = studentData.completedLessons.map((n: any) => Number(n)).filter((n: number) => !isNaN(n));
      } else if (Array.isArray(studentData.completedLessonIds)) {
        completedLessonIds = studentData.completedLessonIds.map((n: any) => Number(n)).filter((n: number) => !isNaN(n));
      }
      completedLessonIds = Array.from(new Set([...completedLessonIds, ...completedLessonIdsFromSubcol]));

      // Mở khóa bài học: Bài 1 luôn mở, bài N mở nếu bài N-1 completed
      const unlockedLessonIds = [1];
      for (let i = 1; i <= 51; i++) {
        if (completedLessonIds.includes(i) && !unlockedLessonIds.includes(i + 1)) {
          unlockedLessonIds.push(i + 1);
        }
      }

      // Xử lý điểm số từ trường scores của document (hỗ trợ array hoặc object hoặc field trực tiếp)
      let scoresHistory: Array<{ lessonId: number; score: number; total: number; date: string }> = [];
      if (Array.isArray(studentData.scores)) {
        for (const sc of studentData.scores) {
          if (typeof sc === 'number') {
            latestScore = sc;
            scoresHistory.push({ lessonId: latestActiveLessonId, score: sc, total: 10, date: 'Đã nộp' });
          } else if (sc && typeof sc === 'object') {
            const val = typeof sc.score === 'number' ? sc.score : (typeof sc.point === 'number' ? sc.point : null);
            if (val !== null) {
              latestScore = val;
              scoresHistory.push({
                lessonId: Number(sc.lessonId) || latestActiveLessonId,
                score: val,
                total: Number(sc.maxScore || sc.total) || 10,
                date: sc.submittedAt || sc.date || 'Đã nộp'
              });
            }
          }
        }
      } else if (studentData.scores && typeof studentData.scores === 'object') {
        for (const [k, v] of Object.entries(studentData.scores)) {
          const lId = parseInt(k.replace(/\D/g, ''), 10) || latestActiveLessonId;
          if (typeof v === 'number') {
            latestScore = v;
            scoresHistory.push({ lessonId: lId, score: v, total: 10, date: 'Đã nộp' });
          } else if (v && typeof (v as any).score === 'number') {
            latestScore = (v as any).score;
            scoresHistory.push({ lessonId: lId, score: (v as any).score, total: (v as any).total || 10, date: 'Đã nộp' });
          }
        }
      }

      // Điểm trực tiếp từ các trường đơn nếu có
      if (typeof studentData.testScore === 'number') latestScore = studentData.testScore;
      if (typeof studentData.lastQuizScore === 'number') latestScore = studentData.lastQuizScore;
      if (typeof studentData.practiceScore === 'number') latestPracticeScore = studentData.practiceScore;

      // Tính overallProgress
      let overallProgress = latestActiveLessonProgress;
      if (completedLessonIds.length > 0 && overallProgress === 0) {
        overallProgress = 100;
      }

      // Trạng thái học tập
      let finalStatus: 'completed' | 'in_progress' | 'needs_help' | 'not_started' = 'not_started';
      if (studentData.status && ['completed', 'in_progress', 'needs_help', 'not_started'].includes(studentData.status)) {
        finalStatus = studentData.status;
      } else if (completedLessonIds.length > 0) {
        finalStatus = 'completed';
      } else if (latestActiveStatus === 'in_progress' || overallProgress > 0) {
        finalStatus = 'in_progress';
      }

      // Tính thời gian hoạt động gần nhất
      let lastActiveStr = 'Vừa mới đây';
      const rawActive = studentData.lastActiveAt || studentData.lastLoginAt || studentData.createdAt;
      if (rawActive) {
        try {
          lastActiveStr = new Date(rawActive).toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit'
          });
        } catch {
          lastActiveStr = 'Hôm nay';
        }
      }

      const currentItem: StudentProgressItem = {
        id: uid,
        studentName: studentData.displayName || (studentData.email ? studentData.email.split('@')[0] : 'Học sinh'),
        className: studentData.classId || 'Chưa chọn lớp',
        currentLessonId: latestActiveLessonId,
        currentStepId: latestActiveSection,
        currentStepTitle: studentData.currentStepTitle || `Bài ${latestActiveLessonId} (${latestActiveSection})`,
        completedSteps: completedStepsList,
        totalStepsInLesson: 5,
        completedStepCount: Math.min(5, finalStatus === 'completed' ? 5 : Array.from(new Set(completedStepsList.filter(s => ['sec_1', 'sec_2', 'sec_3', 'sec_4', 'sec_5'].includes(s)))).length),
        unlockedLessonIds,
        completedLessonIds,
        overallProgress,
        status: finalStatus,
        completedTests: completedLessonIds.length,
        completedExercises: Math.min(5, finalStatus === 'completed' ? 5 : Array.from(new Set(completedStepsList.filter(s => ['sec_1', 'sec_2', 'sec_3', 'sec_4', 'sec_5'].includes(s)))).length),
        lastQuizScore: latestScore,
        practiceScore: latestPracticeScore,
        testScore: latestScore,
        lastActive: lastActiveStr,
        avatar: studentData.photoURL || studentData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        email: studentData.email || '',
        scoresHistory: scoresHistory.length > 0 ? scoresHistory : (latestScore !== null ? [{
          lessonId: latestActiveLessonId,
          score: latestScore,
          total: 10,
          date: 'Hôm nay'
        }] : []),
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
      };

      // 4. Nhận diện học sinh duy nhất theo email chuẩn hóa (chống trùng lặp giữa std_<slug> và Auth UID)
      const dedupKey = normalizeEmailKey(emailClean) || uid;
      if (!studentMap.has(dedupKey)) {
        studentMap.set(dedupKey, currentItem);
      } else {
        const existing = studentMap.get(dedupKey)!;
        // So sánh để ưu tiên bản ghi có dữ liệu học tập thực tế (KHÔNG gộp điểm bằng Math.max)
        if (isBetterStudentRecord(currentItem, existing)) {
          // currentItem đầy đủ hơn: chọn currentItem, bổ sung lớp học/tên từ existing nếu currentItem thiếu
          if (!/^9A[1-8]$/i.test(currentItem.className || '') && /^9A[1-8]$/i.test(existing.className || '')) {
            currentItem.className = existing.className;
          }
          if ((!currentItem.studentName || currentItem.studentName === 'Học sinh') && existing.studentName && existing.studentName !== 'Học sinh') {
            currentItem.studentName = existing.studentName;
          }
          studentMap.set(dedupKey, currentItem);
        } else {
          // existing đầy đủ hơn: giữ existing, bổ sung lớp học/tên từ currentItem nếu existing thiếu
          if (!/^9A[1-8]$/i.test(existing.className || '') && /^9A[1-8]$/i.test(currentItem.className || '')) {
            existing.className = currentItem.className;
          }
          if ((!existing.studentName || existing.studentName === 'Học sinh') && currentItem.studentName && currentItem.studentName !== 'Học sinh') {
            existing.studentName = currentItem.studentName;
          }
          studentMap.set(dedupKey, existing);
        }
      }
    }

    // 5. Lọc theo lớp học sau khi đã gộp bản ghi đầy đủ nhất
    const items: StudentProgressItem[] = [];
    for (const student of studentMap.values()) {
      if (classFilter && classFilter !== 'all') {
        const studentClass = String(student.className || '').trim().toLowerCase();
        if (studentClass !== classFilter.trim().toLowerCase()) continue;
      }
      items.push(student);
    }

    return items;
  } catch (error) {
    console.error('Lỗi khi fetchStudentsFromFirestore:', error);
    return [];
  }
}

/**
 * Lắng nghe thời gian thực (Real-time snapshot) cho Teacher Dashboard từ collection "students"
 */
export function subscribeToStudentsFromFirestore(
  classFilter: string | undefined,
  callback: (students: StudentProgressItem[]) => void
): () => void {
  const studentsCol = collection(db, 'students');

  return onSnapshot(studentsCol, async () => {
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
