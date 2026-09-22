import React, { useState } from 'react';
import { UserAccount, ClassId, VALID_CLASSES, ClassTransferRequest } from '../types';
import { 
  User, 
  Mail, 
  School, 
  Calendar, 
  BookOpen, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Award, 
  Flame, 
  Zap, 
  BarChart2, 
  Clock, 
  Send, 
  X, 
  AlertCircle,
  FileSpreadsheet,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount;
  onSubmitTransferRequest: (request: ClassTransferRequest) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSubmitTransferRequest
}) => {
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [targetClass, setTargetClass] = useState<ClassId>('9A2');
  const [reason, setReason] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSendTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    const newReq: ClassTransferRequest = {
      id: `req-${Date.now()}`,
      studentId: currentUser.id,
      studentName: currentUser.name,
      currentClass: currentUser.gradeClass,
      requestedClass: targetClass,
      reason: reason.trim(),
      date: new Date().toLocaleDateString('vi-VN'),
      status: 'pending'
    };

    onSubmitTransferRequest(newReq);
    setRequestSubmitted(true);
    setShowTransferForm(false);
  };

  const lastQuiz = currentUser.quizRecords[currentUser.currentLessonId] || Object.values(currentUser.quizRecords)[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 space-y-6 my-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-4 border-b border-slate-100">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-2xl border-2 border-blue-500 object-cover shadow-sm"
            />
            <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white shadow-xs">
              {currentUser.gradeClass}
            </span>
          </div>

          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">{currentUser.name}</h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                👨🎓 Học sinh THCS
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>{currentUser.email}</span>
            </p>
            <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1.5">
              <School className="w-3.5 h-3.5" />
              <span>{currentUser.school} • Lớp: <strong className="text-blue-700 font-bold">{currentUser.gradeClass}</strong></span>
            </p>
            <p className="text-[11px] text-slate-400 flex items-center justify-center sm:justify-start gap-1">
              <Calendar className="w-3 h-3" />
              <span>Ngày tham gia: {currentUser.joinDate || '05/09/2026'}</span>
            </p>
          </div>
        </div>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-center">
            <div className="text-[11px] text-amber-700 font-medium">Điểm XP</div>
            <div className="text-xl font-extrabold text-amber-600 flex items-center justify-center gap-1">
              <Zap className="w-4 h-4 fill-amber-500" />
              <span>{currentUser.xp || 0}</span>
            </div>
          </div>

          <div className="p-3 bg-orange-50/70 border border-orange-200/80 rounded-xl text-center">
            <div className="text-[11px] text-orange-700 font-medium">Chuỗi ngày học</div>
            <div className="text-xl font-extrabold text-orange-600 flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 fill-orange-500" />
              <span>{currentUser.streakDays || 1} ngày</span>
            </div>
          </div>

          <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl text-center">
            <div className="text-[11px] text-blue-700 font-medium">Bài đã mở khoá</div>
            <div className="text-xl font-extrabold text-blue-600">
              {currentUser.unlockedLessonIds?.length || 1} / 51
            </div>
          </div>

          <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-center">
            <div className="text-[11px] text-emerald-700 font-medium">Đã hoàn thành</div>
            <div className="text-xl font-extrabold text-emerald-600">
              {currentUser.completedLessonIds?.length || 0} bài
            </div>
          </div>
        </div>

        {/* Learning History & Competency Breakdown */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <BarChart2 className="w-4 h-4 text-blue-600" />
            <span>Kết Quả Đánh Giá Năng Lực 3 Mức Độ (Chuẩn 10 Điểm)</span>
          </h3>

          {lastQuiz ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200">
                <div>
                  <div className="font-bold text-sm text-slate-900">Bài kiểm tra gần nhất: {lastQuiz.score.toFixed(1)} / 10.0</div>
                  <div className="text-[11px] text-slate-500">Ngày làm: {lastQuiz.date}</div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800">
                  {lastQuiz.score >= 8 ? 'Xuất Sắc' : lastQuiz.score >= 6.5 ? 'Đạt Chuẩn' : 'Cần Cố Gắng'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <div className="text-emerald-700 font-bold">🟢 Mức 1: Biết</div>
                  <div className="text-sm font-extrabold text-slate-800 mt-0.5">{lastQuiz.breakdown?.nhanBiet || 2.5} / 2.5đ</div>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <div className="text-blue-700 font-bold">🟡 Mức 2: Hiểu</div>
                  <div className="text-sm font-extrabold text-slate-800 mt-0.5">{lastQuiz.breakdown?.thongHieu || 2.5} / 2.5đ</div>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <div className="text-purple-700 font-bold">🔴 Mức 3: Vận Dụng</div>
                  <div className="text-sm font-extrabold text-slate-800 mt-0.5">{lastQuiz.breakdown?.vanDung || 4.5} / 5.0đ</div>
                </div>
              </div>

              {lastQuiz.feedback && (
                <div className="text-xs bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                  <div className="text-emerald-700 font-bold">💪 Em làm tốt: <span className="font-normal text-slate-700">{lastQuiz.feedback.strengths}</span></div>
                  <div className="text-amber-700 font-bold">📚 Em cần ôn lại: <span className="font-normal text-slate-700">{lastQuiz.feedback.reviewNeeded}</span></div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic bg-white p-3 rounded-xl border border-slate-200">
              Em đang học Bài 1. Hoàn thành bài kiểm tra 10 điểm để ghi nhận năng lực Biết – Hiểu – Vận dụng tại đây!
            </p>
          )}
        </div>

        {/* Badges Section */}
        <div className="space-y-2">
          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Huy Hiệu Đã Đạt Được</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
              <span>🥉</span> Học viên chăm chỉ
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">
              <span>🔬</span> Nhà khám phá dụng cụ & hoá chất
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-xs font-semibold text-purple-700">
              <span>🎯</span> Thử thách trắc nghiệm 10đ
            </span>
          </div>
        </div>

        {/* Section IX: Class Change Management */}
        <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                Thông tin Lớp học: {currentUser.gradeClass}
              </h4>
              <p className="text-xs text-slate-500">
                Học sinh không được tự ý sửa lớp. Nếu cần chuyển lớp, hãy gửi yêu cầu để Thầy/Cô phê duyệt.
              </p>
            </div>

            {!showTransferForm && !currentUser.pendingClassChange && !requestSubmitted && (
              <button
                type="button"
                onClick={() => setShowTransferForm(true)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-blue-700 border border-slate-200 shadow-2xs transition-colors flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" /> 📨 Yêu cầu đổi lớp
              </button>
            )}
          </div>

          {(currentUser.pendingClassChange || requestSubmitted) && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2.5 text-xs text-amber-800">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Đang chờ phê duyệt:</strong> Yêu cầu chuyển từ <strong>{currentUser.gradeClass}</strong> sang <strong>{currentUser.pendingClassChange?.requestedClass || targetClass}</strong> đã được gửi đến Thầy/Cô. Tiến độ học tập và điểm số vẫn được bảo toàn nguyên vẹn.
              </span>
            </div>
          )}

          {showTransferForm && (
            <form onSubmit={handleSendTransfer} className="p-4 bg-white rounded-xl border border-blue-200 space-y-3 animate-in fade-in duration-150">
              <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-blue-600" />
                <span>Gửi Yêu Cầu Đổi Lớp Học (Gửi Giáo Viên Phê Duyệt)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Chọn lớp muốn chuyển đến (Khối 9):
                  </label>
                  <select
                    value={targetClass}
                    onChange={(e) => setTargetClass(e.target.value as ClassId)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  >
                    {VALID_CLASSES.filter(c => c !== currentUser.gradeClass).map(c => (
                      <option key={c} value={c}>Lớp {c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Lý do chuyển lớp:
                  </label>
                  <input
                    type="text"
                    required
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Ví dụ: Đổi ca học, nhà trường xếp lại lớp..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowTransferForm(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-2xs"
                >
                  Gửi Yêu Cầu
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
