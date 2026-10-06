import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Sparkles, 
  BookOpen, 
  Gamepad2, 
  FileEdit, 
  Globe2, 
  Rocket, 
  Award, 
  Flame, 
  Zap, 
  CheckCircle2, 
  Layers,
  ChevronRight,
  Menu,
  X,
  GraduationCap,
  Lock,
  BrainCircuit,
  ShieldCheck,
  User,
  LogIn,
  LogOut,
  School
} from 'lucide-react';

import { ContentMapView } from './components/ContentMapView';
import { SgkLessonView } from './components/SgkLessonView';
import { HookStage } from './components/HookStage';
import { KnowledgeExplore } from './components/KnowledgeExplore';
import { CoreKnowledgeSummary } from './components/CoreKnowledgeSummary';
import { InteractiveGames } from './components/InteractiveGames';
import { InteractivePhysicsSims } from './components/InteractivePhysicsSims';
import { PracticeStage } from './components/PracticeStage';
import { RealWorldStage } from './components/RealWorldStage';
import { ExtensionStage } from './components/ExtensionStage';
import { FinalQuiz } from './components/FinalQuiz';
import { CompletionModal } from './components/CompletionModal';
import { SidebarNav } from './components/SidebarNav';
import { GoogleAuthModal } from './components/GoogleAuthModal';
import { ClassSelectorModal } from './components/ClassSelectorModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import { TeacherDashboard } from './components/TeacherDashboard';
import { LoginScreen } from './components/LoginScreen';
import { LessonStage, UserAccount, ClassId, VALID_CLASSES, ClassTransferRequest, QuizRecord, QuizAttempt } from './types';
import { isAuthorizedTeacherEmail } from './config/authConfig';
import { recordQuizAttempt, registerStudentInDirectory } from './services/studentService';
import { apiSyncLegacyStudents, apiGetStudentDetails } from './services/apiService';
import { 
  signOutFirebase, 
  subscribeToAuthChanges,
  syncUserProfile,
  updateUserClassInFirestore,
  getStudentAllLessonsProgress
} from './services/firebaseService';
import { 
  getAllRegisteredLessons, 
  getLessonModule, 
  isLessonRegistered, 
  computeUnlockedLessonIds, 
  isLessonUnlocked,
  getNewLessonsToNotify, 
  markLessonAsNotified, 
  RegisteredLesson 
} from './services/lessonRegistry';

export default function App() {
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);

  // Tự động khôi phục phiên Firebase Authentication & tiến trình học tập (Lỗi 1, 2, 3)
  useEffect(() => {
    let isMounted = true;

    const unsubscribe = subscribeToAuthChanges(async (firebaseUser) => {
      if (!firebaseUser) {
        if (isMounted) {
          setCurrentUser(null);
          setAuthLoading(false);
        }
        return;
      }

      try {
        const email = (firebaseUser.email || '').trim().toLowerCase();
        const isTeacher = isAuthorizedTeacherEmail(email);

        // 1. Đồng bộ / Khôi phục User Profile từ collection "users/{uid}" (1 UID = 1 document)
        const profile = await syncUserProfile({
          uid: firebaseUser.uid,
          email,
          displayName: firebaseUser.displayName || '',
          photoURL: firebaseUser.photoURL || ''
        });

        // 2. Khôi phục toàn bộ tiến trình các bài học từ subcollection "studentProgress/{uid}/lessons"
        const lessonsProgress = await getStudentAllLessonsProgress(firebaseUser.uid);

        const completedLessonIds: number[] = [];
        let latestActiveLessonId = 1;
        let latestTimestamp = 0;

        Object.values(lessonsProgress).forEach((lp) => {
          if (lp.status === 'completed' || (lp.examScore !== null && lp.examScore !== undefined && lp.examScore >= 5.0)) {
            if (!completedLessonIds.includes(lp.lessonId)) {
              completedLessonIds.push(lp.lessonId);
            }
          }
          const t = lp.lastUpdatedAt ? new Date(lp.lastUpdatedAt).getTime() : 0;
          if (t >= latestTimestamp) {
            latestTimestamp = t;
            latestActiveLessonId = lp.lessonId;
          }
        });

        const allRegisteredLessonIds = getAllRegisteredLessons().map(l => l.id);
        const autoUnlocked = isTeacher ? allRegisteredLessonIds : computeUnlockedLessonIds(completedLessonIds);

        // Đảm bảo activeLessonId thuộc danh sách mở khóa
        if (!autoUnlocked.includes(latestActiveLessonId)) {
          latestActiveLessonId = Math.max(...autoUnlocked, 1);
        }

        const userAccount: UserAccount = {
          id: firebaseUser.uid,
          email,
          name: profile.displayName || firebaseUser.displayName || email.split('@')[0],
          avatar: profile.photoURL || firebaseUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
          role: isTeacher ? 'teacher' : 'student',
          gradeClass: isTeacher ? 'Tổ Tự Nhiên - Khối 9' : (profile.classId || ''),
          school: 'Trường THCS Phú Ninh',
          joinDate: profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('vi-VN') : new Date().toLocaleDateString('vi-VN'),
          xp: isTeacher ? 500 : 0,
          streakDays: 1,
          unlockedLessonIds: autoUnlocked,
          completedLessonIds: isTeacher ? allRegisteredLessonIds : completedLessonIds,
          currentLessonId: latestActiveLessonId,
          quizRecords: {},
          badges: isTeacher ? ['teacher_mentor', 'lab_master'] : ['learner_bronze']
        };

        if (isMounted) {
          setCurrentUser(userAccount);
          setActiveLessonId(latestActiveLessonId);
          setUnlockedLessonIds(autoUnlocked);
          if (isTeacher) {
            setCurrentTab('teacher_dashboard');
          }
          setAuthLoading(false);
        }
      } catch (err) {
        console.error('Lỗi khi khôi phục session Firebase:', err);
        if (isMounted) {
          setAuthLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Save to localStorage whenever user changes (or remove on logout)
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('khtn9_user_profile', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('khtn9_user_profile');
    }
  }, [currentUser]);

  // Navigation & View State
  const [currentTab, setCurrentTab] = useState<'content_map' | 'teacher_dashboard' | LessonStage>(() => {
    if (!currentUser) return 'sgk_learning';
    return currentUser.role === 'teacher' ? 'teacher_dashboard' : 'sgk_learning';
  });

  // Bảo vệ phân quyền: Nếu học sinh cố truy cập teacher_dashboard, tự động đưa về trang học
  useEffect(() => {
    if (currentUser && currentUser.role === 'student' && currentTab === 'teacher_dashboard') {
      setCurrentTab('sgk_learning');
    }
  }, [currentUser, currentTab]);

  const [activeLessonId, setActiveLessonId] = useState<number>(currentUser?.currentLessonId || 1);
  const [unlockedLessonIds, setUnlockedLessonIds] = useState<number[]>(() => {
    const isTeacher = currentUser?.role === 'teacher' || isAuthorizedTeacherEmail(currentUser?.email);
    if (isTeacher) {
      return getAllRegisteredLessons().map(l => l.id);
    }
    return computeUnlockedLessonIds(currentUser?.completedLessonIds || []);
  });

  // Tự động đảm bảo tất cả bài học được mở khóa khi tài khoản là Giáo viên
  useEffect(() => {
    if (currentUser) {
      const isTeacher = currentUser.role === 'teacher' || isAuthorizedTeacherEmail(currentUser.email);
      if (isTeacher) {
        const allIds = getAllRegisteredLessons().map(l => l.id);
        setUnlockedLessonIds(allIds);
      }
    }
  }, [currentUser?.email, currentUser?.role]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [teacherViewMode, setTeacherViewMode] = useState<'dashboard' | 'preview_lesson'>('dashboard');

  // Thông báo bài học mới (QUY TẮC: Hiện đúng 1 lần khi có bài mới)
  const [newLessonAlert, setNewLessonAlert] = useState<RegisteredLesson | null>(null);

  useEffect(() => {
    if (currentUser && currentUser.role === 'student') {
      const pendingAlerts = getNewLessonsToNotify(currentUser.completedLessonIds || []);
      if (pendingAlerts.length > 0) {
        setNewLessonAlert(pendingAlerts[0]);
      }
    }
  }, [currentUser?.email, currentUser?.completedLessonIds]);

  // Gamification State
  const [completedCards, setCompletedCards] = useState<string[]>([]);

  // Assessment & Completion State
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizTotal, setQuizTotal] = useState<number>(10);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const addXP = (amount: number) => {
    if (!currentUser) return;
    setCurrentUser(prev => prev ? ({
      ...prev,
      xp: (prev.xp || 0) + amount
    }) : null);
  };

  const handleCardComplete = (cardId: string) => {
    if (!completedCards.includes(cardId)) {
      setCompletedCards(prev => [...prev, cardId]);
    }
  };

  const handleFinishQuiz = (
    score: number, 
    total: number, 
    breakdown?: { nhanBiet: number; thongHieu: number; vanDung: number }
  ) => {
    if (!currentUser) return;

    setQuizScore(score);
    setQuizTotal(total);
    setIsQuizCompleted(true);

    // Ghi nhận Attempt làm bài kiểm tra hợp lệ
    const attempt: QuizAttempt = {
      attemptId: `attempt-${Date.now()}`,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      classId: currentUser.gradeClass,
      lessonId: activeLessonId,
      startedAt: new Date(Date.now() - 15 * 60000).toISOString(),
      submittedAt: new Date().toISOString(),
      score,
      maxScore: total,
      percentage: Math.round((score / total) * 100),
      status: 'SUBMITTED'
    };
    recordQuizAttempt(attempt);

    const record: QuizRecord = {
      lessonId: activeLessonId,
      date: new Date().toLocaleDateString('vi-VN'),
      score,
      total,
      breakdown: breakdown || { 
        nhanBiet: 2.5, 
        thongHieu: 2.5, 
        vanDung: Math.max(0, +(score - 5.0).toFixed(1)) 
      },
      feedback: {
        strengths: score >= 8 
          ? 'Nắm vững kiến thức khoa học, đạt chuẩn năng lực KHTN 9' 
          : 'Nhận biết tốt nội dung và dụng cụ thí nghiệm cơ bản',
        reviewNeeded: score < 8 
          ? 'Cần rèn luyện thêm kỹ năng phân tích định lượng và vận dụng thực tiễn' 
          : 'Tiếp tục phát huy phong độ học tập xuất sắc!'
      }
    };

    // QUY TẮC MỞ KHOÁ TỰ ĐỘNG THEO CHUẨN:
    // Khi học sinh đạt >= 5.0 ở bài hiện tại, ghi nhận hoàn thành bài học
    const isPassed = score >= 5.0;
    const updatedCompletedLessonIds = isPassed
      ? Array.from(new Set([...(currentUser.completedLessonIds || []), activeLessonId]))
      : (currentUser.completedLessonIds || []);

    // Tự động tính toán các bài học được mở khoá theo chuỗi sư phạm
    const updatedUnlockedLessonIds = computeUnlockedLessonIds(updatedCompletedLessonIds);
    setUnlockedLessonIds(updatedUnlockedLessonIds);

    const updatedStudent: UserAccount = {
      ...currentUser,
      completedLessonIds: updatedCompletedLessonIds,
      unlockedLessonIds: updatedUnlockedLessonIds,
      quizRecords: {
        ...(currentUser.quizRecords || {}),
        [activeLessonId]: record
      }
    };

    setCurrentUser(updatedStudent);
    localStorage.setItem('khtn9_user_profile', JSON.stringify(updatedStudent));
    if (updatedStudent.email) {
      localStorage.setItem(`khtn9_student_${updatedStudent.email.trim().toLowerCase()}`, JSON.stringify(updatedStudent));
    }
    registerStudentInDirectory(updatedStudent);
    setShowCompletionModal(true);
  };

  const handleReviewLesson = () => {
    setShowCompletionModal(false);
    setCurrentTab('summary');
  };

  const handleRequestNextLesson = () => {
    setShowCompletionModal(false);
    const nextLessonId = activeLessonId + 1;
    // Kiểm tra xem bài kế tiếp có tồn tại trong chương trình không
    if (isLessonRegistered(nextLessonId)) {
      setActiveLessonId(nextLessonId);
      setCurrentTab('hook');
    } else {
      // Đã hoàn thành bài học mới nhất hiện có, mở khung chương trình
      setCurrentTab('content_map');
    }
  };

  const handleLogin = (newUser: UserAccount) => {
    const isTeacher = newUser.role === 'teacher' || isAuthorizedTeacherEmail(newUser.email);
    const allLessonIds = getAllRegisteredLessons().map(l => l.id);
    const computedUnlocked = isTeacher
      ? allLessonIds
      : computeUnlockedLessonIds(newUser.completedLessonIds || []);
    const mergedUnlocked = isTeacher
      ? allLessonIds
      : Array.from(new Set([...(newUser.unlockedLessonIds || [1]), ...computedUnlocked]));
    const synchronizedUser: UserAccount = {
      ...newUser,
      unlockedLessonIds: mergedUnlocked,
      completedLessonIds: isTeacher ? allLessonIds : (newUser.completedLessonIds || [])
    };
    setCurrentUser(synchronizedUser);
    setUnlockedLessonIds(mergedUnlocked);
    localStorage.setItem('khtn9_user_profile', JSON.stringify(synchronizedUser));
    if (synchronizedUser.role === 'teacher') {
      setCurrentTab('teacher_dashboard');
    } else {
      setCurrentTab('sgk_learning');
      if (synchronizedUser.gradeClass) {
        registerStudentInDirectory(newUser);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOutFirebase();
    } catch (e) {
      console.warn('Lỗi đăng xuất Firebase:', e);
    }
    localStorage.removeItem('khtn9_user_profile');
    setCurrentUser(null);
    setCurrentTab('sgk_learning');
  };

  const handleConfirmInitialClass = async (selectedClass: ClassId): Promise<{ success: boolean; message?: string }> => {
    if (!currentUser) {
      return { success: false, message: 'Chưa có thông tin tài khoản đăng nhập' };
    }

    try {
      // Ghi classId trực tiếp vào users/{uid} trên Cloud Firestore
      const ok = await updateUserClassInFirestore(currentUser.id, selectedClass);
      if (!ok) {
        return { 
          success: false, 
          message: 'Không thể lưu thông tin học sinh. Vui lòng thử lại.' 
        };
      }

      const updatedUser: UserAccount = {
        ...currentUser,
        gradeClass: selectedClass
      };

      if (updatedUser.email) {
        localStorage.setItem(`khtn9_student_${updatedUser.email.trim().toLowerCase()}`, JSON.stringify(updatedUser));
      }
      localStorage.setItem('khtn9_user_profile', JSON.stringify(updatedUser));

      // Đợi 400ms để học sinh thấy thông báo thành công
      await new Promise((r) => setTimeout(r, 400));

      setCurrentUser(updatedUser);
      return { success: true };
    } catch (err: any) {
      console.error('[handleConfirmInitialClass] Lỗi:', err);
      return { 
        success: false, 
        message: 'Không thể lưu thông tin học sinh. Vui lòng thử lại.' 
      };
    }
  };

  const handleSubmitTransferRequest = (req: ClassTransferRequest) => {
    setCurrentUser(prev => prev ? ({
      ...prev,
      pendingClassChange: req
    }) : null);
  };

  const handleApproveTransferRequest = (req: ClassTransferRequest) => {
    if (currentUser && currentUser.id === req.studentId) {
      setCurrentUser(prev => prev ? ({
        ...prev,
        gradeClass: req.requestedClass,
        pendingClassChange: undefined
      }) : null);
    }
  };

  // 🚨 QUY TẮC BẮT BUỘC (Lỗi 3): Khi app vừa mở, chờ Firebase xác định session
  // authLoading = true -> hiển thị loading, không kết luận vội là đã đăng xuất
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30 animate-pulse">
            <GraduationCap className="w-9 h-9" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white tracking-tight">KHOA HỌC TỰ NHIÊN 9</h2>
            <p className="text-sm text-slate-400">Đang khôi phục phiên đăng nhập...</p>
          </div>
          <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  // 🚨 QUY TẮC 1: NẾU CHƯA ĐĂNG NHẬP (authenticated === false sau khi Firebase xác định)
  // Chỉ hiển thị màn hình Đăng nhập bằng Google
  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // 🚨 QUY TẮC 3: GIÁO VIÊN ĐĂNG NHẬP (nvphong.thcsphuninh@gmail.com)
  // Chuyển thẳng đến TRANG QUẢN LÝ GIÁO VIÊN, không yêu cầu chọn lớp hay hiển thị giao diện học sinh
  if (currentUser.role === 'teacher' && isAuthorizedTeacherEmail(currentUser.email) && teacherViewMode === 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
        {/* Header Giáo Viên */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-700 flex items-center justify-center text-white font-bold shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-black tracking-tight text-slate-900">
                    KHOA HỌC TỰ NHIÊN 9
                  </span>
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-800 border border-purple-200 text-[11px] font-extrabold rounded-md">
                    BẢNG QUẢN TRỊ GIÁO VIÊN
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Quản lý 8 Lớp: 9A1 → 9A8 • Trường THCS Phú Ninh
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setTeacherViewMode('preview_lesson')}
                className="px-3.5 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Xem giao diện học sinh và làm thử bài học"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Xem Giao Diện Bài Học</span>
              </button>

              <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-7 h-7 rounded-full object-cover border border-purple-300"
                />
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800 leading-tight">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-purple-700 font-medium">
                    {currentUser.email}
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Đăng xuất khỏi tài khoản giáo viên"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Đăng Xuất</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Giáo Viên Quản Lý 8 Lớp */}
        <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6">
          <TeacherDashboard
            currentUser={currentUser}
            onBackToStudy={() => setTeacherViewMode('preview_lesson')}
            onSelectLesson={(lessonId) => {
              setActiveLessonId(lessonId);
              setTeacherViewMode('preview_lesson');
              setCurrentTab('sgk_learning');
            }}
            onApproveTransferRequest={handleApproveTransferRequest}
          />
        </main>
      </div>
    );
  }

  // 🚨 QUY TẮC 4: HỌC SINH ĐĂNG NHẬP NHƯNG CHƯA CHỌN LỚP
  const isClassSelectionRequired = 
    currentUser.role === 'student' && 
    (!currentUser.gradeClass || !VALID_CLASSES.includes(currentUser.gradeClass as ClassId));

  if (isClassSelectionRequired) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <ClassSelectorModal
          isOpen={true}
          studentName={currentUser.name}
          studentEmail={currentUser.email}
          onConfirmClass={handleConfirmInitialClass}
        />
      </div>
    );
  }

  // 🚨 QUY TẮC 5: HỌC SINH ĐÃ XÁC THỰC VÀ ĐÃ CÓ LỚP HỢP LỆ
  const currentLessonInfo = getLessonModule(activeLessonId);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      {/* Top Application Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
        <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo & Textbook Badge */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentTab('content_map')}
              className="flex items-center gap-3 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-xs group-hover:bg-blue-700 transition-colors">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                    KHOA HỌC TỰ NHIÊN 9
                  </span>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold rounded-md">
                    GDPT 2018
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-normal hidden sm:block">
                  Kết nối tri thức với cuộc sống • Lớp {currentUser.gradeClass}
                </div>
              </div>
            </button>
          </div>

          {/* Quick Lesson Switcher (Tabs) */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
              {getAllRegisteredLessons().map((lesson) => {
                const isTeacher = currentUser.role === 'teacher' || isAuthorizedTeacherEmail(currentUser.email);
                const isUnlocked = isTeacher || unlockedLessonIds.includes(lesson.id);
                const isActive = activeLessonId === lesson.id && currentTab !== 'content_map' && currentTab !== 'teacher_dashboard';
                return (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      if (isUnlocked) {
                        setActiveLessonId(lesson.id);
                        if (currentTab === 'content_map' || currentTab === 'teacher_dashboard') {
                          setCurrentTab('sgk_learning');
                        }
                      }
                    }}
                    disabled={!isUnlocked}
                    title={
                      isTeacher 
                        ? `[Giáo viên] Xem Bài ${lesson.lessonNumber}: ${lesson.shortTitle}`
                        : !isUnlocked 
                        ? `Hoàn thành Bài ${lesson.lessonNumber - 1} để mở khoá` 
                        : `Chuyển sang Bài ${lesson.lessonNumber}: ${lesson.shortTitle}`
                    }
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-white text-blue-600 shadow-xs border border-slate-200/80'
                        : isUnlocked
                        ? 'text-slate-700 hover:text-slate-900 cursor-pointer'
                        : 'text-slate-400 cursor-not-allowed opacity-60'
                    }`}
                  >
                    {!isUnlocked && <Lock className="w-3 h-3" />}
                    {isTeacher && <Sparkles className="w-3 h-3 text-purple-600" />}
                    <span>Bài {lesson.lessonNumber}: {lesson.shortTitle}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* User Gamification & Account Center */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Teacher Dashboard Return Button if Teacher is previewing */}
            {currentUser.role === 'teacher' && (
              <button
                type="button"
                onClick={() => setTeacherViewMode('dashboard')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-800 rounded-xl border border-purple-200 font-bold text-xs transition-colors shadow-2xs cursor-pointer"
                title="Quay lại Bảng Quản Trị Giáo Viên"
              >
                <GraduationCap className="w-4 h-4 text-purple-600" />
                <span className="hidden sm:inline">Về Bảng Quản Trị</span>
              </button>
            )}

            {/* Student Class Indicator (Only for students) */}
            {currentUser.role === 'student' && (
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full border border-blue-200 font-bold text-xs transition-colors shadow-2xs"
                title="Bấm để xem Hồ sơ học sinh và kết quả kiểm tra"
              >
                <School className="w-3.5 h-3.5" />
                <span>{currentUser.gradeClass}</span>
              </button>
            )}

            {/* Streak */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 text-orange-700 rounded-full border border-orange-200 font-bold text-xs">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>{currentUser.streakDays || 1} ngày</span>
            </div>

            {/* XP */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200 font-bold text-xs">
              <Zap className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
              <span>{currentUser.xp || 0} XP</span>
            </div>

            {/* Student Profile Info */}
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-2 p-1 pl-2 pr-2.5 bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors"
              title="Xem hồ sơ học sinh"
            >
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-7 h-7 rounded-full object-cover border border-slate-300" 
              />
              <span className="text-xs font-bold text-slate-800 hidden md:inline max-w-[120px] truncate">
                {currentUser.name}
              </span>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Đăng xuất"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Banner thông báo bài học mới cập nhật (chỉ hiển thị đúng 1 lần cho học sinh) */}
      {newLessonAlert && currentUser.role === 'student' && (
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white px-4 py-3 shadow-md flex items-center justify-between gap-3 text-xs sm:text-sm animate-in slide-in-from-top duration-300 z-30">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">📚</span>
            <div>
              <span className="font-extrabold">Bài học mới đã được cập nhật!</span>{' '}
              <span className="opacity-95 font-medium">
                (Bài {newLessonAlert.lessonNumber}: {newLessonAlert.title})
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setActiveLessonId(newLessonAlert.id);
                if (!unlockedLessonIds.includes(newLessonAlert.id)) {
                  setUnlockedLessonIds(prev => [...prev, newLessonAlert.id]);
                }
                setCurrentTab('hook');
                markLessonAsNotified(newLessonAlert.id);
                setNewLessonAlert(null);
              }}
              className="px-3 py-1.5 bg-white text-blue-700 hover:bg-blue-50 font-bold rounded-lg shadow-xs transition-colors text-xs flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Khám phá ngay
            </button>
            <button
              onClick={() => {
                markLessonAsNotified(newLessonAlert.id);
                setNewLessonAlert(null);
              }}
              className="p-1.5 rounded-md text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
              title="Đóng thông báo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Body with Collapsible Sidebar + Content Area */}
      <div className="flex flex-1 w-full min-h-[calc(100vh-4rem)]">
        {/* Sidebar Navigation */}
        <SidebarNav
          currentTab={currentTab}
          onSelectTab={(tab) => {
            if (tab === 'teacher_dashboard') {
              if (currentUser.role === 'teacher') {
                setTeacherViewMode('dashboard');
              }
              return;
            }
            setCurrentTab(tab);
          }}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          currentUser={currentUser}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
          activeLessonId={activeLessonId}
        />

        {/* Main Learning Space */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto w-full pb-20 md:pb-8">
          {/* Book Content Map View */}
          {currentTab === 'content_map' && (
            <ContentMapView
              activeLessonId={activeLessonId}
              unlockedLessonIds={unlockedLessonIds}
              isTeacher={currentUser.role === 'teacher' || isAuthorizedTeacherEmail(currentUser.email)}
              onSelectLesson={(id) => {
                setActiveLessonId(id);
                setCurrentTab('sgk_learning');
              }}
            />
          )}

          {/* TIẾN TRÌNH BÀI HỌC BÁM SÁT CHUẨN SGK KHTN 9 KẾT NỐI TRI THỨC VỚI CUỘC SỐNG */}
          {currentTab === 'sgk_learning' && (
            <SgkLessonView
              lessonId={activeLessonId}
              lessonTitle={currentLessonInfo.title}
              currentUser={currentUser}
              onSelectOtherLesson={() => setCurrentTab('content_map')}
              onLogout={handleLogout}
              onLessonCompleted={(lessonId, score) => {
                handleFinishQuiz(score, 10);
              }}
            />
          )}

          {/* Stage 1: Hook / Khởi động */}
          {currentTab === 'hook' && (
            <HookStage
              lessonInfo={currentLessonInfo}
              onProceedToExplore={() => setCurrentTab('explore')}
              activeLessonId={activeLessonId}
            />
          )}

          {/* Stage 2: Knowledge Explore / Khám phá */}
          {currentTab === 'explore' && (
            <KnowledgeExplore
              onProceedToSummary={() => setCurrentTab('summary')}
              onBackToHook={() => setCurrentTab('hook')}
              onCardComplete={handleCardComplete}
              completedCards={completedCards}
              activeLessonId={activeLessonId}
            />
          )}

          {/* Stage 3: Core Knowledge Summary / Kiến thức trọng tâm */}
          {currentTab === 'summary' && (
            <CoreKnowledgeSummary
              onProceedToGames={() => setCurrentTab('games')}
              onBackToExplore={() => setCurrentTab('explore')}
              activeLessonId={activeLessonId}
            />
          )}

          {/* Stage 4: Interactive Games / Trò chơi tương tác */}
          {currentTab === 'games' && (
            <InteractiveGames
              onProceedToPractice={() => setCurrentTab('practice')}
              onBackToSummary={() => setCurrentTab('summary')}
              onAddXP={addXP}
              activeLessonId={activeLessonId}
            />
          )}

          {/* Stage 5: Practice (3 levels) / Luyện tập */}
          {currentTab === 'practice' && (
            <PracticeStage
              onProceedToRealWorld={() => setCurrentTab('real_world')}
              onBackToGames={() => setCurrentTab('games')}
              onAddXP={addXP}
              activeLessonId={activeLessonId}
            />
          )}

          {/* Stage 6: Real World Application / Vận dụng thực tế */}
          {currentTab === 'real_world' && (
            <RealWorldStage
              onProceedToExtension={() => setCurrentTab('extension')}
              onGoToFinalQuiz={() => setCurrentTab('final_quiz')}
              onBackToPractice={() => setCurrentTab('practice')}
              activeLessonId={activeLessonId}
            />
          )}

          {/* Stage 7: Extension & Safety Simulation / Khám phá thêm */}
          {currentTab === 'extension' && (
            <ExtensionStage
              onProceedToFinalQuiz={() => setCurrentTab('final_quiz')}
              onBackToRealWorld={() => setCurrentTab('real_world')}
              activeLessonId={activeLessonId}
            />
          )}

          {/* Stage 8: Standardized Assessment / Kiểm tra đánh giá 10 điểm */}
          {currentTab === 'final_quiz' && (
            <FinalQuiz
              activeLessonId={activeLessonId}
              onFinishQuiz={handleFinishQuiz}
              onAddXP={addXP}
              onReviewSection={(section) => setCurrentTab(section as any)}
              onNextLesson={() => {
                const nextLessonId = activeLessonId + 1;
                if (isLessonRegistered(nextLessonId) && unlockedLessonIds.includes(nextLessonId)) {
                  setActiveLessonId(nextLessonId);
                  setCurrentTab('hook');
                } else {
                  setCurrentTab('content_map');
                }
              }}
              onBackToExtension={() => setCurrentTab('extension')}
            />
          )}
        </main>
      </div>

      {/* Student Profile Modal (Hồ Sơ Học Sinh & Yêu Cầu Đổi Lớp) */}
      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        onSubmitTransferRequest={handleSubmitTransferRequest}
      />

      {/* Google Authentication Modal */}
      <GoogleAuthModal
        currentUser={currentUser}
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Completion Modal Popup (10.0 scale & next lesson unlock) */}
      {showCompletionModal && (
        <CompletionModal
          score={quizScore}
          total={quizTotal}
          xpEarned={Math.round(quizScore * 20 + 100)}
          currentLessonNumber={activeLessonId}
          currentLessonTitle={getLessonModule(activeLessonId).title}
          onReviewLesson={handleReviewLesson}
          onRequestNextLesson={handleRequestNextLesson}
          nextLessonTitle={
            isLessonRegistered(activeLessonId + 1)
              ? getLessonModule(activeLessonId + 1).title
              : "Khung chương trình 51 bài SGK KHTN 9"
          }
          nextLessonNumber={activeLessonId + 1}
        />
      )}
    </div>
  );
}
