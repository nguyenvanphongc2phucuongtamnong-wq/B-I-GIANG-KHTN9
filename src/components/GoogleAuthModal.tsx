import React, { useState } from 'react';
import { UserAccount, VALID_CLASSES, ClassId } from '../types';
import { isAuthorizedTeacherEmail } from '../config/authConfig';
import { getAllRegisteredLessons } from '../services/lessonRegistry';
import { signInWithGoogle, syncUserProfile } from '../services/firebaseService';
import { 
  X, 
  LogOut, 
  ShieldCheck, 
  Sparkles,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

interface GoogleAuthModalProps {
  currentUser: UserAccount | null;
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserAccount) => void;
  onLogout: () => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  currentUser,
  isOpen,
  onClose,
  onLogin,
  onLogout
}) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    if (isAuthenticating) return;
    setIsAuthenticating(true);
    setErrorMsg('');

    try {
      const firebaseUser = await signInWithGoogle();
      const email = (firebaseUser.email || '').trim().toLowerCase();
      const displayName = firebaseUser.displayName?.trim() || email.split('@')[0] || 'Học sinh KHTN 9';
      const avatar = firebaseUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80';

      const isTeacher = isAuthorizedTeacherEmail(email);

      const userProfile = await syncUserProfile({
        uid: firebaseUser.uid,
        email,
        displayName,
        photoURL: avatar
      });

      if (isTeacher) {
        const allLessonIds = getAllRegisteredLessons().map(l => l.id);
        const teacherAccount: UserAccount = {
          id: firebaseUser.uid,
          email,
          name: displayName.startsWith('Thầy') || displayName.startsWith('Cô') ? displayName : `Thầy ${displayName}`,
          avatar,
          role: 'teacher',
          gradeClass: 'Tổ Tự Nhiên - Khối 9',
          school: 'Trường THCS Phú Ninh',
          joinDate: userProfile.createdAt ? new Date(userProfile.createdAt).toLocaleDateString('vi-VN') : '01/09/2026',
          xp: 500,
          streakDays: 7,
          unlockedLessonIds: allLessonIds,
          currentLessonId: 1,
          completedLessonIds: allLessonIds,
          quizRecords: {},
          badges: ['teacher_mentor', 'lab_master']
        };

        setIsAuthenticating(false);
        onLogin(teacherAccount);
        onClose();
        return;
      }

      const hasClass = userProfile.classId && VALID_CLASSES.includes(userProfile.classId as ClassId);

      const studentAccount: UserAccount = {
        id: firebaseUser.uid,
        email,
        name: userProfile.displayName || displayName,
        avatar,
        role: 'student',
        gradeClass: hasClass ? (userProfile.classId as string) : '',
        school: 'Trường THCS Phú Ninh',
        joinDate: userProfile.createdAt ? new Date(userProfile.createdAt).toLocaleDateString('vi-VN') : new Date().toLocaleDateString('vi-VN'),
        xp: 0,
        streakDays: 1,
        unlockedLessonIds: [1],
        currentLessonId: 1,
        completedLessonIds: [],
        quizRecords: {},
        badges: ['learner_bronze']
      };

      setIsAuthenticating(false);
      onLogin(studentAccount);
      onClose();
    } catch (err: any) {
      console.error('[GoogleAuthModal] Lỗi:', err);
      setErrorMsg(err.message || 'Không thể đăng nhập bằng Google. Vui lòng thử lại.');
      setIsAuthenticating(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-slate-200 relative space-y-5">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-11 h-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-xs">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.02 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg">Tài Khoản Google</h3>
            <p className="text-xs text-slate-500">Xác thực Firebase Authentication chính thức</p>
          </div>
        </div>

        {/* Current Active Account Display */}
        {currentUser && (
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-10 h-10 rounded-full border border-slate-300 object-cover" 
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-800 text-sm">{currentUser.name}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${
                    currentUser.role === 'teacher' 
                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                      : 'bg-blue-100 text-blue-700 border border-blue-200'
                  }`}>
                    {currentUser.role === 'teacher' ? '👨🏫 Giáo viên' : `👨🎓 ${currentUser.gradeClass || 'Chưa chọn lớp'}`}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate max-w-[200px]">{currentUser.email}</p>
              </div>
            </div>
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg border border-rose-200 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Đăng xuất
            </button>
          </div>
        )}

        {errorMsg && (
          <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs font-bold text-rose-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Google Sign In Button */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isAuthenticating}
            className="w-full py-3.5 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
          >
            {isAuthenticating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Đang kết nối Google...</span>
              </>
            ) : (
              <span>Đăng Nhập Tài Khoản Google Khác</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
