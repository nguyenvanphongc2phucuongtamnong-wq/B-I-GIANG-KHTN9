import React from 'react';
import { 
  Bookmark, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  AlertTriangle, 
  ShieldCheck, 
  Flame, 
  Layers,
  ArrowRight,
  ArrowLeft,
  Zap,
  Info
} from 'lucide-react';

interface CoreKnowledgeSummaryProps {
  activeLessonId: number;
  onProceedToGames?: () => void;
  onNextStage?: () => void;
  onBackToExplore?: () => void;
}

export const CoreKnowledgeSummary: React.FC<CoreKnowledgeSummaryProps> = ({
  activeLessonId,
  onProceedToGames,
  onNextStage,
  onBackToExplore
}) => {
  const handleProceed = () => {
    if (onProceedToGames) onProceedToGames();
    else if (onNextStage) onNextStage();
  };

  if (activeLessonId === 2) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              Bài 2: Động Năng. Thế Năng
            </span>
            <span className="text-xs text-slate-500">Chương I: Năng Lượng Cơ Học</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Kiến Thức Trọng Tâm & Bảng Công Thức Cốt Lõi
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Hệ thống hóa toàn bộ định luật, công thức và hiện tượng theo chuẩn SGK KHTN 9.
          </p>
        </div>

        {/* 2 Core Columns: Động Năng vs Thế Năng */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Box 1: Động năng */}
          <div className="bg-white p-5 rounded-xl border border-blue-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-blue-100">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                Wđ
              </div>
              <h3 className="font-bold text-slate-900 text-base">1. Động Năng (Kinetic Energy)</h3>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Định nghĩa:</strong> Năng lượng mà một vật có được do nó đang <em>chuyển động</em>.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Công thức:</strong> <code className="px-2 py-0.5 bg-blue-50 text-blue-800 rounded font-bold">Wđ = 1/2 · m · v²</code></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Đơn vị:</strong> m (kg), v (m/s) → Wđ tính bằng Jun (J). (1 kJ = 1000 J).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Quy luật đặc biệt:</strong> Wđ tỉ lệ thuận với khối lượng m và tỉ lệ thuận với <strong>bình phương vận tốc v²</strong>. (v tăng 2 lần → Wđ tăng 4 lần).</span>
              </li>
            </ul>
          </div>

          {/* Box 2: Thế năng trọng trường */}
          <div className="bg-white p-5 rounded-xl border border-amber-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-amber-100">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                Wt
              </div>
              <h3 className="font-bold text-slate-900 text-base">2. Thế Năng Trọng Trường (Potential Energy)</h3>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Định nghĩa:</strong> Năng lượng của vật khi ở một độ cao h nhất định so với mốc chọn.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Công thức:</strong> <code className="px-2 py-0.5 bg-amber-50 text-amber-800 rounded font-bold">Wt = P · h = m · g · h</code></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Đơn vị:</strong> P (N), h (m) hoặc m (kg), g (≈ 9.8 hoặc 10 m/s²) → Wt (J).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Mốc thế năng:</strong> Thế năng phụ thuộc vào việc <em>chọn mốc</em> tính độ cao (thường chọn mặt đất là mốc h = 0 → Wt = 0).</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 📌 EM CẦN NHỚ Box */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-5 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <Bookmark className="w-5 h-5 text-amber-600" />
            <span>📌 EM CẦN NHỚ (SGK KHTN 9 Trang 19)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-amber-950 font-medium">
            <div className="p-3 bg-white/80 rounded-xl border border-amber-200">
              <strong>1. Động năng:</strong> Phụ thuộc vào khối lượng m và vận tốc v. Vật đứng yên thì động năng bằng không.
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-amber-200">
              <strong>2. Thế năng:</strong> Phụ thuộc vào trọng lượng P (hoặc khối lượng m) và độ cao h của vật so với vị trí chọn làm mốc thế năng.
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-amber-200">
              <strong>3. Năng lượng cơ học:</strong> Một vật có thể đồng thời vừa có động năng vừa có thế năng (máy bay đang bay, quả táo rơi).
            </div>
          </div>
        </div>

        {/* Action navigation buttons */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackToExplore}
            className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 min-h-[48px] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại Chặng 2: Khám Phá</span>
          </button>

          <button
            type="button"
            onClick={handleProceed}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs md:text-sm font-bold shadow-xs transition-all flex items-center gap-2 min-h-[48px] cursor-pointer"
          >
            <span>Vào Chặng 4: Tương Tác & Trò Chơi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Bài 3: Cơ Năng (Hoặc các bài cơ học kế tiếp)
  if (activeLessonId === 3) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Bài 3: Cơ Năng
            </span>
            <span className="text-xs text-slate-500">Chương I: Năng Lượng Cơ Học • Trang 18 SGK</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Kiến Thức Trọng Tâm: Định Luật Bảo Toàn Cơ Năng
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Tổng hợp công thức cơ năng, quy luật chuyển hoá qua lại giữa động năng & thế năng, và hiện tượng hao phí cơ năng.
          </p>
        </div>

        {/* 2 Core Columns: Khái niệm vs Định luật */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Box 1: Khái niệm & Công thức */}
          <div className="bg-white p-5 rounded-xl border border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-emerald-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                W
              </div>
              <h3 className="font-bold text-slate-900 text-base">1. Khái Niệm & Công Thức Cơ Năng</h3>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Định nghĩa:</strong> Tổng động năng và thế năng của vật gọi là cơ năng.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Công thức:</strong> W = Wđ + Wt = 1/2 · m · v² + m · g · h.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Đơn vị chuẩn:</strong> Jun (kí hiệu J). 1 kJ = 1 000 J.</span>
              </li>
            </ul>

            <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-mono text-center font-bold">
              W = 1/2 m v² + m g h (Jun - J)
            </div>
          </div>

          {/* Box 2: Định luật bảo toàn & Hao phí */}
          <div className="bg-white p-5 rounded-xl border border-blue-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-blue-100">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                const
              </div>
              <h3 className="font-bold text-slate-900 text-base">2. Định Luật Bảo Toàn Cơ Năng</h3>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Nội dung:</strong> Vật chuyển động chỉ chịu trọng lực thì cơ năng bảo toàn: W = Wđ + Wt = hằng số.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Chuyển hoá:</strong> Khi Wt giảm thì Wđ tăng và ngược lại: ΔWt = -ΔWđ.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Hao phí thực tế:</strong> Ma sát biến cơ năng thành nhiệt năng và âm thanh: ΔW = A_ms.</span>
              </li>
            </ul>

            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-blue-950 font-mono text-center font-bold">
              Wđ₁ + Wt₁ = Wđ₂ + Wt₂ (Khi F_cản = 0)
            </div>
          </div>
        </div>

        {/* 📌 EM CẦN NHỚ Box */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-2xl p-5 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
            <Bookmark className="w-5 h-5 text-emerald-600" />
            <span>📌 EM CẦN NHỚ: BÀI 3 - CƠ NĂNG (SGK KHTN 9)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-emerald-950 font-medium">
            <div className="p-3 bg-white/80 rounded-xl border border-emerald-200">
              <strong>1. Đỉnh dốc cao nhất:</strong> Vận tốc v = 0 nên cơ năng hoàn toàn bằng thế năng: W = Wt_max = m·g·h.
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-emerald-200">
              <strong>2. Sát mặt đất (h = 0):</strong> Thế năng bằng 0, động năng cực đại bằng toàn bộ cơ năng: W = Wđ_max = 1/2 m v².
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-emerald-200">
              <strong>3. Ứng dụng công nghệ:</strong> Đập thuỷ điện tích trữ thế năng nước để phát điện; búa máy chuyển thế năng thành công đóng cọc.
            </div>
          </div>
        </div>

        {/* Action navigation buttons */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackToExplore}
            className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 min-h-[48px] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại Chặng 2: Khám Phá</span>
          </button>

          <button
            type="button"
            onClick={handleProceed}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs md:text-sm font-bold shadow-xs transition-all flex items-center gap-2 min-h-[48px] cursor-pointer"
          >
            <span>Vào Chặng 4: Tương Tác & Trò Chơi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Bài 1 Summary
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
            Bài 1: Dụng Cụ, Hoá Chất & Thuyết Trình
          </span>
          <span className="text-xs text-slate-500">Mở đầu môn Khoa Học Tự Nhiên 9</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Hệ Thống Hoá Kiến Thức & Quy Tắc Thực Hành Chuẩn SGK
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Học sinh cần nắm chắc 3 nhóm nội dung cốt lõi để đảm bảo an toàn tuyệt đối trong phòng thí nghiệm.
        </p>
      </div>

      {/* 3 Core Summaries */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Block 1 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="font-bold text-sm text-blue-700 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Zap className="w-4 h-4 text-blue-600" />
            1. Dụng Cụ Thí Nghiệm Mới
          </div>
          <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
            <li><strong>Điện kế:</strong> Vạch 0 nằm ở giữa thang đo, phát hiện dòng điện cảm ứng và xác định cả 2 chiều dòng điện.</li>
            <li><strong>Laser thí nghiệm:</strong> Tuyệt đối không chiếu thẳng vào mắt người.</li>
            <li><strong>Phễu chiết:</strong> Tách 2 chất lỏng không tan vào nhau nhờ khoá vặn ở cuống.</li>
            <li><strong>Lưới tản nhiệt:</strong> Phân tán đều nhiệt lượng khi đun bình thuỷ tinh đáy bằng.</li>
          </ul>
        </div>

        {/* Block 2 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="font-bold text-sm text-emerald-700 flex items-center gap-2 border-b border-slate-100 pb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            2. Quy Tắc Hoá Chất An Toàn
          </div>
          <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
            <li><strong>Hoá chất nhạy sáng:</strong> Đựng trong lọ tối màu hoặc bọc giấy đen (KMnO4, AgNO3).</li>
            <li><strong>Pha loãng H2SO4 đặc:</strong> Luôn rót từ từ acid vào cốc nước, khuấy nhẹ đều tay. Tuyệt đối không rót nước vào acid.</li>
            <li><strong>Không đổ thừa:</strong> Không bao giờ đổ hoá chất dùng thừa ngược lại lọ ban đầu.</li>
            <li><strong>Không chạm tay:</strong> Không ngửi trực tiếp hoặc nếm bất kì hoá chất nào.</li>
          </ul>
        </div>

        {/* Block 3 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="font-bold text-sm text-purple-700 flex items-center gap-2 border-b border-slate-100 pb-2">
            <FileText className="w-4 h-4 text-purple-600" />
            3. Poster & Thuyết Trình
          </div>
          <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
            <li><strong>Bố cục 8 phần:</strong> Tiêu đề, tác giả, tóm tắt, mục tiêu, phương pháp, kết quả, thảo luận, kết luận.</li>
            <li><strong>Nguyên tắc trực quan:</strong> Ít chữ, nhiều hình ảnh và biểu đồ trực quan.</li>
            <li><strong>Cỡ chữ tối thiểu:</strong> Đọc rõ ràng từ khoảng cách 1 - 2 mét.</li>
            <li><strong>Thời gian báo cáo:</strong> Phân bổ hợp lý giữa thuyết trình và giải đáp phản biện.</li>
          </ul>
        </div>
      </div>

      {/* 📌 EM CẦN NHỚ Box */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-5 space-y-3 shadow-xs">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <Bookmark className="w-5 h-5 text-amber-600" />
          <span>📌 EM CẦN NHỚ (Trang 14 SGK KHTN 9)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-amber-950 font-medium">
          <div className="p-3 bg-white/80 rounded-xl border border-amber-200">
            <strong>1. Sử dụng an toàn:</strong> Nắm chắc cấu tạo và hướng dẫn vận hành của từng dụng cụ thí nghiệm trước khi cấp điện hoặc châm lửa.
          </div>
          <div className="p-3 bg-white/80 rounded-xl border border-amber-200">
            <strong>2. Đọc nhãn hoá chất:</strong> Luôn đọc kĩ nhãn cảnh báo nguy hiểm (dễ cháy, ăn mòn, độc sinh thái) trước khi mở nắp hoá chất.
          </div>
          <div className="p-3 bg-white/80 rounded-xl border border-amber-200">
            <strong>3. Báo cáo khoa học:</strong> Trình bày rõ ràng mục đích, phương pháp, số liệu thực nghiệm và kết luận dựa trên bằng chứng khoa học.
          </div>
        </div>
      </div>

      {/* Action navigation buttons */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToExplore}
          className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 min-h-[48px] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Chặng 2: Khám Phá</span>
        </button>

        <button
          type="button"
          onClick={handleProceed}
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs md:text-sm font-bold shadow-xs transition-all flex items-center gap-2 min-h-[48px] cursor-pointer"
        >
          <span>Vào Chặng 4: Tương Tác & Trò Chơi</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
