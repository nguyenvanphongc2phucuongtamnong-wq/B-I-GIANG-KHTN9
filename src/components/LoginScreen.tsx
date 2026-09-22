import React, { useState } from 'react';
import { UserAccount, VALID_CLASSES, ClassId } from '../types';
import { isAuthorizedTeacherEmail } from '../config/authConfig';
import { 
  signInWithGoogle, 
  getStudentFromFirestore, 
  updateExistingStudentLogin 
} from '../services/firebaseService';
import { 
  GraduationCap, 
  Mail, 
  User, 
  ArrowRight, 
  ShieldCheck, 
  School, 
  BookOpen, 
  Lock, 
  RefreshCw,
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface LoginScreenProps {
  onLogin: (user: UserAccount) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showAlternativeLogin, setShowAlternativeLogin] = useState(false);

  // 1. XỬ LÝ ĐĂNG NHẬP GOOGLE AUTH QUA FIREBASE THẬT (Yêu cầu 1)
  const handleGoogleSignIn = async () => {
    if (isAuthenticating) return;
    setIsAuthenticating(true);
    setErrorMsg('');

    try {
      // Gọi Firebase Authentication signInWithPopup thật
      const firebaseUser = await signInWithGoogle();
      const email = (firebaseUser.email || '').trim().toLowerCase();
      // displayName phải lấy từ thông tin thật của tài khoản Google đã đăng nhập (Yêu cầu 5)
      const displayName = firebaseUser.displayName?.trim() || email.split('@')[0] || 'Học sinh KHTN 9';
      const avatar = firebaseUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80';

      // 2. PHÂN QUYỀN NGAY SAU KHI ĐĂNG NHẬP (Yêu cầu 2):
      // - Nếu email là nvphong.thcsphuninh@gmail.com -> role = TEACHER
      // - Tất cả tài khoản Google khác -> role = STUDENT (tuyệt đối không cho tự chuyển role)
      const isTeacher = isAuthorizedTeacherEmail(email);

      if (isTeacher) {
        const teacherAccount: UserAccount = {
          id: firebaseUser.uid,
          email,
          name: displayName.startsWith('Thầy') || displayName.startsWith('Cô') ? displayName : `Thầy ${displayName}`,
          avatar: firebaseUser.photoURL || 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=120&auto=format&fit=crop&q=80',
          role: 'teacher',
          gradeClass: 'Tổ Tự Nhiên - Khối 9',
          school: 'Trường THCS Phú Ninh',
          joinDate: '01/09/2026',
          xp: 500,
          streakDays: 7,
          unlockedLessonIds: [1, 2],
          currentLessonId: 1,
          completedLessonIds: [1],
          quizRecords: {},
          badges: ['teacher_mentor', 'lab_master']
        };

        localStorage.setItem(`khtn9_teacher_${email}`, JSON.stringify(teacherAccount));
        localStorage.setItem('khtn9_user_profile', JSON.stringify(teacherAccount));
        setIsAuthenticating(false);
        onLogin(teacherAccount);
        return;
      }

      // 3. HỌC SINH: KIỂM TRA HỒ SƠ CLOUD FIRESTORE BẰNG FIREBASE UID THẬT (Yêu cầu 3 & 8)
      const existingStudent = await getStudentFromFirestore(firebaseUser.uid);

      if (existingStudent && existingStudent.classId && VALID_CLASSES.includes(existingStudent.classId as ClassId)) {
        // Học sinh cũ đã có hồ sơ và đã chọn lớp: Cập nhật lastLoginAt (Yêu cầu 8)
        await updateExistingStudentLogin(firebaseUser.uid, displayName, email);

        const studentAccount: UserAccount = {
          id: firebaseUser.uid,
          email,
          name: existingStudent.displayName || displayName,
          avatar,
          role: 'student',
          gradeClass: existingStudent.classId,
          school: 'Trường THCS Phú Ninh',
          joinDate: existingStudent.createdAt ? new Date(existingStudent.createdAt).toLocaleDateString('vi-VN') : new Date().toLocaleDateString('vi-VN'),
          xp: 0,
          streakDays: 1,
          unlockedLessonIds: existingStudent.completedLessons && existingStudent.completedLessons.length > 0 ? [1, 2] : [1],
          currentLessonId: 1,
          completedLessonIds: existingStudent.completedLessons || [],
          quizRecords: {},
          badges: ['learner_bronze']
        };

        localStorage.setItem(`khtn9_student_${email}`, JSON.stringify(studentAccount));
        localStorage.setItem('khtn9_user_profile', JSON.stringify(studentAccount));
        setIsAuthenticating(false);
        onLogin(studentAccount);
      } else {
        // HỌC SINH MỚI LẦN ĐẦU HOẶC CHƯA CHỌN LỚP (Yêu cầu 3):
        // gradeClass = '' để kích hoạt màn hình chọn lớp bắt buộc (9A1-9A8)
        const newStudentAccount: UserAccount = {
          id: firebaseUser.uid,
          email,
          name: displayName,
          avatar,
          role: 'student',
          gradeClass: '', // Rỗng -> App.tsx hiển thị ClassSelectorModal
          school: 'Trường THCS Phú Ninh',
          joinDate: new Date().toLocaleDateString('vi-VN'),
          xp: 0,
          streakDays: 1,
          unlockedLessonIds: [1],
          currentLessonId: 1,
          completedLessonIds: [],
          quizRecords: {},
          badges: ['learner_bronze']
        };

        setIsAuthenticating(false);
        onLogin(newStudentAccount);
      }
    } catch (err: any) {
      console.error('[handleGoogleSignIn] Lỗi:', err);
      setErrorMsg(err.message || 'Không thể đăng nhập bằng tài khoản Google. Vui lòng thử lại.');
      setIsAuthenticating(false);
    }
  };

  // 2. XỬ LÝ ĐĂNG NHẬP BẰNG EMAIL / MẪU DÀNH CHO THỬ NGHIỆM NHANH TRONG TRÌNH DUYỆT
  const handleDirectEmailLogin = async (emailToUse?: string, nameToUse?: string) => {
    if (isAuthenticating) return;

    const finalEmail = (emailToUse || emailInput).trim().toLowerCase();
    if (!finalEmail) {
      setErrorMsg('Vui lòng nhập địa chỉ Email');
      return;
    }

    if (!finalEmail.includes('@')) {
      setErrorMsg('Địa chỉ Email không hợp lệ');
      return;
    }

    const finalName = (nameToUse || nameInput).trim() || finalEmail.split('@')[0];
    setIsAuthenticating(true);
    setErrorMsg('');

    try {
      const isTeacher = isAuthorizedTeacherEmail(finalEmail);

      if (isTeacher) {
        const teacherAccount: UserAccount = {
          id: `teacher_nvphong_phuninh`,
          email: finalEmail,
          name: finalName.startsWith('Thầy') || finalName.startsWith('Cô') ? finalName : `Thầy ${finalName}`,
          avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=120&auto=format&fit=crop&q=80',
          role: 'teacher',
          gradeClass: 'Tổ Tự Nhiên - Khối 9',
          school: 'Trường THCS Phú Ninh',
          joinDate: '01/09/2026',
          xp: 500,
          streakDays: 7,
          unlockedLessonIds: [1, 2],
          currentLessonId: 1,
          completedLessonIds: [1],
          quizRecords: {},
          badges: ['teacher_mentor', 'lab_master']
        };

        localStorage.setItem(`khtn9_teacher_${finalEmail}`, JSON.stringify(teacherAccount));
        localStorage.setItem('khtn9_user_profile', JSON.stringify(teacherAccount));
        setIsAuthenticating(false);
        onLogin(teacherAccount);
        return;
      }

      // Học sinh qua Email:
      const stableUid = `std_${finalEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
      const existingStudent = await getStudentFromFirestore(stableUid);

      if (existingStudent && existingStudent.classId && VALID_CLASSES.includes(existingStudent.classId as ClassId)) {
        await updateExistingStudentLogin(stableUid, finalName, finalEmail);

        const studentAccount: UserAccount = {
          id: stableUid,
          email: finalEmail,
          name: existingStudent.displayName || finalName,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
          role: 'student',
          gradeClass: existingStudent.classId,
          school: 'Trường THCS Phú Ninh',
          joinDate: existingStudent.createdAt ? new Date(existingStudent.createdAt).toLocaleDateString('vi-VN') : new Date().toLocaleDateString('vi-VN'),
          xp: 0,
          streakDays: 1,
          unlockedLessonIds: existingStudent.completedLessons && existingStudent.completedLessons.length > 0 ? [1, 2] : [1],
          currentLessonId: 1,
          completedLessonIds: existingStudent.completedLessons || [],
          quizRecords: {},
          badges: ['learner_bronze']
        };

        localStorage.setItem(`khtn9_student_${finalEmail}`, JSON.stringify(studentAccount));
        localStorage.setItem('khtn9_user_profile', JSON.stringify(studentAccount));
        setIsAuthenticating(false);
        onLogin(studentAccount);
      } else {
        const newStudentAccount: UserAccount = {
          id: stableUid,
          email: finalEmail,
          name: finalName,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
          role: 'student',
          gradeClass: '',
          school: 'Trường THCS Phú Ninh',
          joinDate: new Date().toLocaleDateString('vi-VN'),
          xp: 0,
          streakDays: 1,
          unlockedLessonIds: [1],
          currentLessonId: 1,
          completedLessonIds: [],
          quizRecords: {},
          badges: ['learner_bronze']
        };

        setIsAuthenticating(false);
        onLogin(newStudentAccount);
      }
    } catch (err: any) {
      console.error('[handleDirectEmailLogin] Lỗi:', err);
      setErrorMsg('Không thể hoàn tất đăng nhập. Vui lòng thử lại.');
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
              Giáo viên duy nhất: <strong className="text-purple-700 font-mono">nvphong.thcsphuninh@gmail.com</strong>
            </li>
            <li>Tất cả tài khoản Google khác tự động phân quyền là <strong>HỌC SINH</strong>.</li>
            <li>Học sinh mới bắt buộc chọn lớp (9A1 → 9A8) trước khi vào học.</li>
          </ul>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 flex items-start gap-2 text-xs font-bold text-rose-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* PRIMARY ACTION: SIGN IN WITH GOOGLE VIA FIREBASE AUTH */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isAuthenticating}
            className="w-full py-3.5 px-5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border-2 border-slate-200 hover:border-blue-400 shadow-sm transition-all flex items-center justify-center gap-3 cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed"
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
                <span className="text-slate-800 group-hover:text-blue-600 transition-colors">
                  Đăng Nhập Bằng Google (Firebase Auth)
                </span>
              </>
            )}
          </button>
          <p className="text-[11px] text-center text-slate-400">
            Sử dụng Google Sign-In chính thức để lưu hồ sơ thật vào Cloud Firestore
          </p>
        </div>

        {/* ALTERNATIVE / TESTING SECTION TOGGLE */}
        <div className="pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowAlternativeLogin(!showAlternativeLogin)}
            className="w-full text-center text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors py-1 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{showAlternativeLogin ? '▲ Thu gọn tuỳ chọn thử nghiệm' : '▼ Thử nghiệm nhanh bằng Email / Chọn sẵn mẫu'}</span>
          </button>

          {showAlternativeLogin && (
            <div className="mt-4 space-y-4 pt-3 border-t border-slate-100 animate-fadeIn">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleDirectEmailLogin();
                }}
                className="space-y-3"
              >
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-slate-400" />
                    <span>Email đăng nhập thử nghiệm</span>
                  </label>
                  <input
                    type="email"
                    placeholder="vidu: hocsinh.9a2@gmail.com"
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                      setErrorMsg('');
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-400" />
                    <span>Họ và tên</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Tiếp Tục Với Email Này</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Sample Quick Fills */}
              <div className="space-y-2 pt-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">
                  Tài khoản kiểm thử sẵn có:
                </div>
                
                {/* Teacher Sample */}
                <button
                  type="button"
                  onClick={() => handleDirectEmailLogin('nvphong.thcsphuninh@gmail.com', 'Thầy Nguyễn Văn Phong')}
                  className="w-full p-2.5 rounded-xl border border-purple-200 bg-purple-50/70 hover:bg-purple-100 transition-colors text-left flex items-center justify-between text-xs cursor-pointer"
                >
                  <div>
                    <div className="font-bold text-purple-900 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                      <span>Giáo viên phụ trách khối 9</span>
                    </div>
                    <div className="text-[10px] text-purple-700 font-mono">nvphong.thcsphuninh@gmail.com</div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-200 text-purple-800">
                    TEACHER
                  </span>
                </button>

                {/* New Student Sample */}
                <button
                  type="button"
                  onClick={() => handleDirectEmailLogin('hocsinh.moi@gmail.com', 'Lê Hoàng Nam')}
                  className="w-full p-2.5 rounded-xl border border-amber-200 bg-amber-50/70 hover:bg-amber-100 transition-colors text-left flex items-center justify-between text-xs cursor-pointer"
                >
                  <div>
                    <div className="font-bold text-slate-800 flex items-center gap-1">
                      <School className="w-3.5 h-3.5 text-amber-600" />
                      <span>Học sinh mới (chưa có lớp)</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">hocsinh.moi@gmail.com</div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-200 text-amber-900">
                    SẼ CHỌN LỚP
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
