import React, { useState } from 'react';
import { ClassId, VALID_CLASSES } from '../types';
import { School, CheckCircle2, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

interface ClassSelectorModalProps {
  isOpen: boolean;
  studentName: string;
  studentEmail: string;
  onConfirmClass: (selectedClass: ClassId) => Promise<{ success: boolean; message?: string }>;
}

export const ClassSelectorModal: React.FC<ClassSelectorModalProps> = ({
  isOpen,
  studentName,
  studentEmail,
  onConfirmClass,
}) => {
  const [selectedClass, setSelectedClass] = useState<ClassId | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleStartLearning = async () => {
    if (!selectedClass || isSaving) return;

    setIsSaving(true);
    setErrorMessage(null);

    try {
      // BƯỚC 1 & 2: Gọi lưu classId vào database chung và kiểm tra kết quả (QUY TẮC VI & VII)
      const result = await onConfirmClass(selectedClass);

      if (result && !result.success) {
        // NẾU THẤT BẠI: Thông báo lỗi, ở lại modal chọn lớp, KHÔNG cho vào trang học (QUY TẮC VII)
        setErrorMessage(result.message || 'Không thể lưu thông tin học sinh vào hệ thống. Vui lòng thử lại.');
        setIsSaving(false);
        return;
      }

      // NẾU THÀNH CÔNG: Hiển thị xác nhận và hoàn tất (QUY TẮC VIII)
      setSaveSuccess(true);
      setIsSaving(false);
    } catch (err: any) {
      setErrorMessage('Không thể lưu thông tin học sinh vào hệ thống. Vui lòng thử lại.');
      setIsSaving(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-200 space-y-6">
        {/* Banner Tag */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <School className="w-3.5 h-3.5 text-blue-600" />
            <span>Khoa Học Tự Nhiên 9 • Khối 9 THCS</span>
          </span>
        </div>

        {/* Header Section: Exact Match to Prompt Specification */}
        <div className="text-center space-y-1.5">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            👋 CHÀO MỪNG EM!
          </h1>
          <p className="text-sm font-semibold text-slate-600">
            Vui lòng hoàn thành thông tin để bắt đầu học.
          </p>
          <div className="pt-2 text-xs text-slate-500">
            Tài khoản: <strong className="text-slate-800">{studentName || 'Học sinh'}</strong> ({studentEmail})
          </div>
        </div>

        {/* Section: 🏫 EM ĐANG HỌC LỚP NÀO? */}
        <div className="space-y-3 pt-2">
          <div className="text-center">
            <h2 className="text-base md:text-lg font-black text-blue-900 tracking-tight flex items-center justify-center gap-2">
              <span>🏫 EM ĐANG HỌC LỚP NÀO?</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Bắt buộc chọn đúng 1 trong 8 lớp để hệ thống lưu hồ sơ và giáo viên quản lý điểm:
            </p>
          </div>

          {/* 8 Class Buttons (9A1 -> 9A8) */}
          <div className="grid grid-cols-4 gap-2.5 pt-1">
            {VALID_CLASSES.map((cls) => {
              const isSelected = selectedClass === cls;

              return (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setSelectedClass(cls)}
                  className={`py-3.5 px-2 rounded-2xl border-2 font-black text-sm transition-all flex flex-col items-center justify-center gap-1 relative ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm scale-102 ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 bg-white'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute top-1.5 right-1.5 text-blue-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                  )}
                  <span className="text-lg">🏫</span>
                  <span className="text-sm font-extrabold">{cls}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Notice on Role and Class Persistence */}
        <div className="p-3 bg-amber-50/90 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            Hệ thống xác định vai trò <strong>Học sinh (Student)</strong>. Điểm số, bài tập và huy hiệu sẽ được ghi nhận cho lớp em chọn.
          </div>
        </div>

        {/* Error message banner if database save fails (Section VIII) */}
        {errorMessage && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 flex items-center justify-between gap-2 animate-in fade-in">
            <div className="flex items-center gap-2 font-semibold">
              <span className="text-base">❌</span>
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={handleStartLearning}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shrink-0 transition-colors cursor-pointer uppercase"
            >
              THỬ LẠI
            </button>
          </div>
        )}

        {/* Success feedback */}
        {saveSuccess && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center gap-2 font-bold animate-in fade-in">
            <span className="text-base">✅</span>
            <span>Đăng ký lớp thành công! Đang chuyển vào trang học...</span>
          </div>
        )}

        {/* Button: ➡️ BẮT ĐẦU HỌC (Locked until a class is selected) */}
        <div>
          <button
            type="button"
            disabled={!selectedClass || isSaving || saveSuccess}
            onClick={handleStartLearning}
            className={`w-full py-3.5 px-6 rounded-2xl font-extrabold text-sm md:text-base flex items-center justify-center gap-2 transition-all shadow-sm ${
              isSaving
                ? 'bg-blue-400 text-white cursor-wait'
                : selectedClass && !saveSuccess
                ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-blue-500/20 active:scale-98'
                : saveSuccess
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
            }`}
          >
            {isSaving ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Đang lưu thông tin học sinh...</span>
              </>
            ) : saveSuccess ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Đăng ký lớp thành công!</span>
              </>
            ) : (
              <>
                <span>
                  {selectedClass ? `➡️ BẮT ĐẦU HỌC (${selectedClass})` : '➡️ BẮT ĐẦU HỌC'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {!selectedClass && !isSaving && (
            <p className="text-[11px] text-center text-rose-500 font-medium mt-2">
              * Vui lòng chọn 1 lớp để kích hoạt nút Bắt đầu học
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
