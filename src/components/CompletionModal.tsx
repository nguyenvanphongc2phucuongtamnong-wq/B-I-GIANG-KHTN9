import React, { useState } from 'react';
import { 
  Trophy, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Zap,
  Award
} from 'lucide-react';

interface CompletionModalProps {
  score: number;
  total: number;
  xpEarned: number;
  currentLessonNumber?: number;
  currentLessonTitle?: string;
  onReviewLesson: () => void;
  onRequestNextLesson: () => void;
  nextLessonTitle: string;
  nextLessonNumber: number;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  score,
  total,
  xpEarned,
  currentLessonNumber = 1,
  currentLessonTitle = "Nhận biết một số dụng cụ, hoá chất. Thuyết trình một vấn đề khoa học",
  onReviewLesson,
  onRequestNextLesson,
  nextLessonTitle,
  nextLessonNumber,
}) => {
  const [showNextConfirm, setShowNextConfirm] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-xl border border-slate-200 space-y-6 animate-in fade-in zoom-in duration-200 my-8">
        {/* Celebration Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-amber-50 border border-amber-200 text-amber-600 rounded-xl flex items-center justify-center mx-auto shadow-xs">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Hoàn thành 100% mục tiêu SGK</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            🎉 Chúc Mừng! Em Đã Hoàn Thành Bài {currentLessonNumber}
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            {currentLessonTitle}
          </p>
        </div>

        {/* Results Summary Box (10.0-point Scale) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-1">
            <div className="text-xs text-slate-500 font-medium">Điểm đánh giá chuẩn</div>
            <div className="text-2xl font-bold text-blue-600">
              {score.toFixed(1)} / {total.toFixed(1)}
            </div>
            <div className="text-[10px] text-slate-400">Thang điểm 10.0 SGK</div>
          </div>

          <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl text-center space-y-1">
            <div className="text-xs text-amber-700 font-medium">Kinh nghiệm</div>
            <div className="text-2xl font-bold text-amber-600">+{xpEarned} XP</div>
            <div className="text-[10px] text-amber-600/80">Tích luỹ thành tích</div>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl text-center space-y-1">
            <div className="text-xs text-emerald-700 font-medium">Huy hiệu đạt được</div>
            <div className="text-sm font-bold text-emerald-800 flex items-center justify-center gap-1 mt-1">
              <span>{currentLessonNumber === 1 ? '🔬' : '⚡'}</span>
              <span>{currentLessonNumber === 1 ? 'Nhà Khám Phá Trẻ' : 'Chuyên Gia Động Lực'}</span>
            </div>
            <div className="text-[10px] text-emerald-600">Đã mở khoá</div>
          </div>
        </div>

        {/* Competency Summary */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
          <div className="font-bold text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Năng lực KHTN 9 đã đạt được theo chương trình GDPT 2018:</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-600 leading-relaxed">
            {currentLessonNumber === 1 ? (
              <>
                <li>Nhận diện chính xác và giải thích nguyên lý hoạt động của dụng cụ quang học, điện từ, hoá học và sinh học.</li>
                <li>Nắm vững quy tắc an toàn bảo quản hoá chất nhạy quang (AgNO3, KMnO4) và acid đặc nguy hiểm.</li>
                <li>Thành thạo cấu trúc 8 phần chuẩn của một báo cáo nghiên cứu và 8 slide thuyết trình khoa học.</li>
              </>
            ) : (
              <>
                <li>Nắm vững bản chất động năng ($W_đ = \frac{1}{2}mv^2$) và thế năng trọng trường ($W_t = P \cdot h$).</li>
                <li>Giải thích được hiện tượng chuyển hoá cơ năng trong đời sống (thuỷ điện, búa máy, chuyển động con lắc).</li>
                <li>Tính toán thành thạo các đại lượng công, vận tốc và lực cản trong các bài toán cơ học thực tế.</li>
              </>
            )}
          </ul>
        </div>

        {/* Confirmation or Choice Buttons */}
        {!showNextConfirm ? (
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onReviewLesson}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-colors bg-white shadow-xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ôn tập lại bài {currentLessonNumber}</span>
              </button>

              <button
                onClick={() => setShowNextConfirm(true)}
                className="flex-1 py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs md:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <span>➡️ TIẾP TỤC BÀI TIẾP THEO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-center text-slate-500 italic">
              Theo đúng nguyên tắc Master Prompt: Hệ thống chỉ mở khoá và biên soạn chi tiết bài tiếp theo khi em chủ động nhấn tiếp tục.
            </p>
          </div>
        ) : (
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-start gap-3">
              <span className="p-2 bg-blue-600 text-white rounded-lg">
                <BookOpen className="w-5 h-5" />
              </span>
              <div>
                <h4 className="font-bold text-slate-900 text-sm md:text-base">
                  Xác nhận mở khoá & chuyển sang Bài {nextLessonNumber}: {nextLessonTitle}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Quy trình 5 bước theo SGK KHTN 9:
                  <br />1. Bám sát SGK Kết nối tri thức với cuộc sống.
                  <br />2. Thiết lập mục tiêu năng lực và tình huống khởi động thực tiễn.
                  <br />3. Xây dựng đầy đủ: Khám phá → Trò chơi tương tác → Mô phỏng vật lý → Luyện tập 3 mức độ → Đánh giá 10 điểm.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 justify-end pt-2">
              <button
                onClick={() => setShowNextConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-200/60 border border-slate-200 bg-white"
              >
                Quay lại ôn tập thêm
              </button>
              <button
                onClick={onRequestNextLesson}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs md:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Zap className="w-4 h-4" />
                <span>🔓 XÁC NHẬN: MỞ KHÓA BÀI {nextLessonNumber} NGAY</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
