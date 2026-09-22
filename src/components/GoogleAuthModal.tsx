import React, { useState } from 'react';
import { UserAccount, VALID_CLASSES, ClassId } from '../types';
import { isAuthorizedTeacherEmail, AUTHORIZED_TEACHER_EMAILS } from '../config/authConfig';
import { 
  X, 
  Mail, 
  ArrowRight,
  School,
  CheckCircle2,
  AlertCircle,
  LogOut,
  ShieldCheck,
  GraduationCap,
  Sparkles
} from 'lucide-react';

interface GoogleAuthModalProps {
  currentUser: UserAccount;
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
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  if (!isOpen) return null;

  // Preset quick fill helpers (only fills email and name - NO role selection!)
  const handleQuickFill = (email: string, name: string) => {
    setEmailInput(email);
    setNameInput(name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalEmail = emailInput.trim().toLowerCase();
    if (!finalEmail) return;

    const finalName = nameInput.trim() || finalEmail.split('@')[0];

    // Check system authorization: Is this email in AUTHORIZED_TEACHER_EMAILS?
    const isTeacher = isAuthorizedTeacherEmail(finalEmail);

    if (isTeacher) {
      // 👨🏫 VAI TRÒ: GIÁO VIÊN (Tự động cấp quyền theo AUTHORIZED_TEACHER_EMAILS)
      const existingTeacherStr = localStorage.getItem(`khtn9_teacher_${finalEmail}`);
      let savedTeacher: Partial<UserAccount> = {};
      if (existingTeacherStr) {
        try {
          savedTeacher = JSON.parse(existingTeacherStr);
        } catch {
          // ignore
        }
      }

      const teacherAccount: UserAccount = {
        id: savedTeacher.id || `teacher-${Date.now()}`,
        email: finalEmail,
        name: finalName.startsWith('Thầy') || finalName.startsWith('Cô') ? finalName : `Thầy/Cô ${finalName}`,
        avatar: savedTeacher.avatar || 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=120&auto=format&fit=crop&q=80',
        role: 'teacher',
        gradeClass: 'Tổ Tự Nhiên - Khối 9',
        school: savedTeacher.school || 'Trường THCS Phú Ninh',
        joinDate: savedTeacher.joinDate || '01/09/2026',
        xp: savedTeacher.xp || 400,
        streakDays: savedTeacher.streakDays || 7,
        unlockedLessonIds: [1, 2],
        currentLessonId: 1,
        completedLessonIds: [1],
        quizRecords: {},
        badges: ['teacher_mentor', 'lab_master']
      };

      localStorage.setItem(`khtn9_teacher_${finalEmail}`, JSON.stringify(teacherAccount));
      onLogin(teacherAccount);
      onClose();
      return;
    }

    // 👨🎓 VAI TRÒ: HỌC SINH (Mọi tài khoản không thuộc danh sách giáo viên)
    const existingStudentStr = localStorage.getItem(`khtn9_student_${finalEmail}`);
    let existingStudent: Partial<UserAccount> = {};
    if (existingStudentStr) {
      try {
        existingStudent = JSON.parse(existingStudentStr);
      } catch {
        // ignore
      }
    }

    const hasValidClass = existingStudent.gradeClass && VALID_CLASSES.includes(existingStudent.gradeClass as ClassId);

    const studentAccount: UserAccount = {
      id: existingStudent.id || `student-${Date.now()}`,
      email: finalEmail,
      name: finalName,
      avatar: existingStudent.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      role: 'student',
      gradeClass: hasValidClass ? (existingStudent.gradeClass as string) : '',
      school: existingStudent.school || 'Trường THCS Phú Ninh',
      joinDate: existingStudent.joinDate || new Date().toLocaleDateString('vi-VN'),
      xp: existingStudent.xp || 0,
      streakDays: existingStudent.streakDays || 1,
      unlockedLessonIds: existingStudent.unlockedLessonIds || [1],
      currentLessonId: existingStudent.currentLessonId || 1,
      completedLessonIds: existingStudent.completedLessonIds || [],
      quizRecords: existingStudent.quizRecords || {},
      badges: existingStudent.badges || ['learner_bronze']
    };

    if (hasValidClass) {
      // Học sinh đã có hồ sơ lớp -> lưu và vào học ngay
      localStorage.setItem(`khtn9_student_${finalEmail}`, JSON.stringify(studentAccount));
    }

    onLogin(studentAccount);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-200 relative space-y-5 max-h-[90vh] overflow-y-auto">
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
            <h3 className="font-extrabold text-slate-900 text-lg">Đăng Nhập Google / Gmail</h3>
            <p className="text-xs text-slate-500">Hệ thống tự động xác thực vai trò và lưu tiến độ</p>
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
              onClick={onLogout}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg border border-rose-200 transition-colors flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" /> Đăng xuất
            </button>
          </div>
        )}

        {/* Google Sign In Form (NO role selector allowed!) */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Địa chỉ Gmail của bạn:
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="vidu: hocsinh@gmail.com"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Họ và tên hiển thị:
            </label>
            <input
              type="text"
              required
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Nguyễn Văn A"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          {/* Tiện ích điền nhanh Gmail mẫu để kiểm thử phân quyền */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Chọn nhanh Gmail để kiểm thử hệ thống tự động nhận diện:
            </div>
            <div className="grid grid-cols-1 gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => handleQuickFill('nvphong.thcsphuninh@gmail.com', 'Nguyễn Văn Phong')}
                className="text-left p-2 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-slate-800">nvphong.thcsphuninh@gmail.com</div>
                  <div className="text-[10px] text-slate-500">Nguyễn Văn Phong (Đã đăng ký lớp 9A1 trước đó)</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-mono">Điền email</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('hocsinh.moi@gmail.com', 'Lê Hoàng Nam')}
                className="text-left p-2 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-slate-800">hocsinh.moi@gmail.com</div>
                  <div className="text-[10px] text-slate-500">Lê Hoàng Nam (Tài khoản mới chưa chọn lớp)</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-mono">Điền email</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('thcs.giaovien@gmail.com', 'Thầy Trần Hữu Minh')}
                className="text-left p-2 rounded-xl bg-white border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-slate-800">thcs.giaovien@gmail.com</div>
                  <div className="text-[10px] text-slate-500">Thầy Trần Hữu Minh (Có trong AUTHORIZED_TEACHER_EMAILS)</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-purple-50 text-purple-700 rounded-md font-mono">Điền email</span>
              </button>
            </div>
          </div>

          {/* Role Policy Explanation Banner */}
          <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 text-[11px] text-blue-900 leading-relaxed">
            <strong>Quy tắc xác thực hệ thống:</strong>
            <ul className="list-disc list-inside mt-1 space-y-0.5 text-blue-800">
              <li>Email thuộc <code>AUTHORIZED_TEACHER_EMAILS</code> ➔ Tự động phân quyền <strong>Giáo viên</strong> & vào Teacher Dashboard.</li>
              <li>Mọi Email khác ➔ Tự động phân quyền <strong>Học sinh</strong> & bắt buộc chọn 1 trong 8 lớp (9A1 → 9A8).</li>
            </ul>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <span>Đăng Nhập Với Google</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
