import React, { useState } from 'react';
import { UserAccount, VALID_CLASSES, ClassId } from '../types';
import { isAuthorizedTeacherEmail } from '../config/authConfig';
import { getAllRegisteredLessons } from '../services/lessonRegistry';
import { 
  signInWithGoogle, 
  syncUserProfile,
  getUserProfileFromFirestore
} from '../services/firebaseService';
import { 
  GraduationCap, 
  ShieldCheck, 
  School, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';

interface LoginScreenProps {
  onLogin: (user: UserAccount) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // CHỈ DÙNG DUY NHẤT: Firebase Authentication + Google Provider thật
  const handleGoogleSignIn = async () => {
    if (isAuthenticating) return;
    setIsAuthenticating(true);
    setErrorMsg('');

    try {
      // 1. Gọi Firebase Authentication signInWithPopup thật
      const firebaseUser = await signInWithGoogle();
      const email = (firebaseUser.email || '').trim().toLowerCase();
      const displayName = firebaseUser.displayName?.trim() || email.split('@')[0] || 'Học sinh KHTN 9';
      const avatar = firebaseUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80';

      // 2. Phân quyền tự động theo email chính thức:
      // - Duy nhất 'nvphong.thcsphuninh@gmail.com' -> teacher
      // - Mọi tài khoản khác -> student
      const isTeacher = isAuthorizedTeacherEmail(email);

      // 3. Đồng bộ User Profile vào collection "users/{uid}" thật (1 UID = 1 document)
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
        return;
      }

      // 4. Học sinh: Kiểm tra xem đã chọn lớp (9A1 -> 9A8) chưa
      const hasClass = userProfile.classId && VALID_CLASSES.includes(userProfile.classId as ClassId);

      const studentAccount: UserAccount = {
        id: firebaseUser.uid,
        email,
        name: userProfile.displayName || displayName,
        avatar,
        role: 'student',
        gradeClass: hasClass ? (userProfile.classId as string) : '', // Nếu chưa có -> ClassSelectorModal hiển thị
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
    } catch (err: any) {
      console.error('[handleGoogleSignIn] Lỗi:', err);
      setErrorMsg(err.message || 'Không thể đăng nhập bằng tài khoản Google. Vui lòng thử lại.');
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4 selection:bg-blue-600 selection:text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 relative z-10 space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
            <School className="w-3.5 h-3.5" />
            <span>GDPT 2018 • Kết Nối Tri Thức</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            KHOA HỌC TỰ NHIÊN 9
          </h1>
          <p className="text-xs text-slate-500">
            Hệ thống học tập, mô phỏng thí nghiệm & đồng bộ Cloud Firestore
          </p>
        </div>

        {/* Security & Role Policy Banner */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
          <div className="font-bold text-slate-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Xác thực Firebase & Phân quyền chuẩn:</span>
          </div>
          <ul className="text-[11px] leading-relaxed text-slate-500 list-disc list-inside space-y-0.5">
            <li>
              Tài khoản giáo viên: <strong className="text-purple-700 font-mono">nvphong.thcsphuninh@gmail.com</strong> / <strong className="text-purple-700 font-mono">nvphong.thcsphusninh@gmail.com</strong> (Tự động mở khóa 100% tất cả các bài học).
            </li>
            <li>Tất cả tài khoản Google khác tự động phân quyền là <strong>HỌC SINH</strong>.</li>
            <li>Học sinh mới chọn lớp (9A1 → 9A8) ở lần đăng nhập đầu tiên và được lưu cố định.</li>
          </ul>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 flex items-start gap-2 text-xs font-bold text-rose-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* DUY NHẤT: ĐĂNG NHẬP BẰNG GOOGLE AUTH THẬT */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isAuthenticating}
            className="w-full py-4 px-5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border-2 border-slate-200 hover:border-blue-500 shadow-sm transition-all flex items-center justify-center gap-3 cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAuthenticating ? (
              <>
                <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                <span>Đang kết nối Firebase Auth...</span>
              </>
            ) : (
              <>
                {/* Official Google 'G' Icon */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="text-slate-800 group-hover:text-blue-600 transition-colors font-extrabold">
                  Đăng Nhập Bằng Google (Firebase Auth)
                </span>
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-slate-400">
            Chỉ sử dụng xác thực Google chính thống • Duy trì phiên đăng nhập tự động
          </p>
        </div>
      </div>
    </div>
  );
};
