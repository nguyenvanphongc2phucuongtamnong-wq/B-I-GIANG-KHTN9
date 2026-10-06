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
  Info,
  Gauge
} from 'lucide-react';
import { MathFormula, MathText } from './MathRenderer';

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

  // ==========================================
  // BÀI 2: ĐỘNG NĂNG & THẾ NĂNG
  // ==========================================
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
                <MathText text="\(W_đ\)" />
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
                <span className="flex items-center gap-2">
                  <strong>Công thức:</strong> 
                  <MathFormula formula="W_đ = \frac{1}{2} m v^2" className="!my-0 !py-1 px-3 bg-blue-50 text-blue-900 rounded-lg border border-blue-200" />
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><MathText text="**Đơn vị:** \(m\) (kg), \(v\) (m/s) \(\rightarrow W_đ\) tính bằng Jun (J). (\(1\text{ kJ} = 1\,000\text{ J}\))." /></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><MathText text="**Quy luật đặc biệt:** \(W_đ\) tỉ lệ thuận với khối lượng \(m\) và tỉ lệ với **bình phương vận tốc \(v^2\)** (khi \(v\) tăng 2 lần \(\rightarrow W_đ\) tăng \(2^2 = 4\) lần)." /></span>
              </li>
            </ul>

            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-center font-bold">
              <MathFormula formula="W_đ = \frac{1}{2} m v^2 \quad (\text{J})" block={true} className="!my-0 !py-0 !bg-transparent !border-0 text-blue-900" />
            </div>
          </div>

          {/* Box 2: Thế năng trọng trường */}
          <div className="bg-white p-5 rounded-xl border border-amber-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-amber-100">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <MathText text="\(W_t\)" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">2. Thế Năng Trọng Trường (Potential Energy)</h3>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Định nghĩa:</strong> Năng lượng của vật khi ở một độ cao \(h\) nhất định so với mốc chọn.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="flex items-center gap-2">
                  <strong>Công thức:</strong> 
                  <MathFormula formula="W_t = P \cdot h = m \cdot g \cdot h" className="!my-0 !py-1 px-3 bg-amber-50 text-amber-900 rounded-lg border border-amber-200" />
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><MathText text="**Đơn vị:** \(P\) (N), \(h\) (m) hoặc \(m\) (kg), \(g \approx 9,8\) hoặc \(10\text{ m/s}^2 \rightarrow W_t\) (J)." /></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><MathText text="**Mốc thế năng:** Thế năng phụ thuộc vào việc *chọn mốc* tính độ cao (thường chọn mặt đất là mốc \(h = 0 \rightarrow W_t = 0\))." /></span>
              </li>
            </ul>

            <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-center font-bold">
              <MathFormula formula="W_t = P \cdot h = m \cdot g \cdot h \quad (\text{J})" block={true} className="!my-0 !py-0 !bg-transparent !border-0 text-amber-950" />
            </div>
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
              <MathText text="**1. Động năng:** Phụ thuộc vào khối lượng \(m\) và vận tốc \(v\). Vật đứng yên (\(v = 0\)) thì động năng bằng 0." />
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-amber-200">
              <MathText text="**2. Thế năng:** Phụ thuộc vào trọng lượng \(P\) (hoặc khối lượng \(m\)) và độ cao \(h\) của vật so với vị trí chọn làm mốc thế năng." />
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-amber-200">
              <MathText text="**3. Năng lượng cơ học:** Một vật có thể đồng thời vừa có động năng vừa có thế năng (máy bay đang bay, quả táo rơi)." />
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

  // ==========================================
  // BÀI 3: CƠ NĂNG
  // ==========================================
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
                <MathText text="\(W_c\)" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">1. Khái Niệm & Công Thức Cơ Năng</h3>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><MathText text="**Định nghĩa:** Tổng động năng và thế năng của vật gọi là cơ năng: \(W_c = W_đ + W_t\)." /></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="flex items-center gap-2">
                  <strong>Công thức:</strong> 
                  <MathFormula formula="W_c = W_đ + W_t = \frac{1}{2} m v^2 + m g h" className="!my-0 !py-1 px-3 bg-emerald-50 text-emerald-900 rounded-lg border border-emerald-200" />
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><MathText text="**Đơn vị chuẩn:** Jun (kí hiệu J). \(1\text{ kJ} = 1\,000\text{ J}\)." /></span>
              </li>
            </ul>

            <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 text-center font-bold">
              <MathFormula formula="W_c = \frac{1}{2} m v^2 + m g h \quad (\text{Jun - J})" block={true} className="!my-0 !py-0 !bg-transparent !border-0 text-emerald-950" />
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
                <span><MathText text="**Nội dung:** Vật chuyển động chỉ chịu trọng lực thì cơ năng bảo toàn: \(W_c = W_đ + W_t = \text{const}\)." /></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><MathText text="**Chuyển hoá:** Khi \(W_t\) giảm thì \(W_đ\) tăng và ngược lại: \(\Delta W_t = -\Delta W_đ\)." /></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><MathText text="**Hao phí thực tế:** Ma sát biến cơ năng thành nhiệt năng và âm thanh: \(\Delta W = A_{\text{ms}}\)." /></span>
              </li>
            </ul>

            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-center font-bold">
              <MathFormula formula="W_{đ1} + W_{t1} = W_{đ2} + W_{t2} \quad (\text{Khi } F_{\text{cản}} = 0)" block={true} className="!my-0 !py-0 !bg-transparent !border-0 text-blue-950" />
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
              <MathText text="**1. Đỉnh dốc cao nhất:** Vận tốc \(v = 0\) nên cơ năng hoàn toàn bằng thế năng: \(W_c = W_{t\max} = m \cdot g \cdot h\)." />
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-emerald-200">
              <MathText text="**2. Sát mặt đất (\(h = 0\)):** Thế năng bằng 0, động năng cực đại bằng toàn bộ cơ năng: \(W_c = W_{đ\max} = \frac{1}{2} m v^2\)." />
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

  // ==========================================
  // BÀI 4: CÔNG VÀ CÔNG SUẤT
  // ==========================================
  if (activeLessonId === 4) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
              Bài 4: Công và Công Suất
            </span>
            <span className="text-xs text-slate-500">Chương I: Năng Lượng Cơ Học • Trang 21 SGK</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Kiến Thức Trọng Tâm: Công Cơ Học & Công Suất Máy Móc
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Tổng hợp biểu thức tính công, điều kiện sinh công, công suất định mức và mối liên hệ giữa lực kéo và vận tốc.
          </p>
        </div>

        {/* 2 Core Columns: Công vs Công Suất */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Box 1: Công cơ học */}
          <div className="bg-white p-5 rounded-xl border border-purple-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-purple-100">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                A
              </div>
              <h3 className="font-bold text-slate-900 text-base">1. Công Cơ Học (Mechanical Work)</h3>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span><strong>Điều kiện sinh công:</strong> Có lực tác dụng vào vật và vật dịch chuyển theo phương không vuông góc với lực.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span className="flex items-center gap-2">
                  <strong>Công thức:</strong> 
                  <MathFormula formula="A = F \cdot s" className="!my-0 !py-1 px-3 bg-purple-50 text-purple-900 rounded-lg border border-purple-200" />
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span><MathText text="**Đơn vị:** \(F\) (N), \(s\) (m) \(\rightarrow A\) (Jun - J). \(1\text{ J} = 1\text{ N} \cdot 1\text{ m}\). \(1\text{ kJ} = 1\,000\text{ J}\)." /></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span><MathText text="**Trường hợp \(A = 0\):** Khi vật không dịch chuyển (\(s = 0\)) hoặc lực vuông góc hướng chuyển dời (\(\alpha = 90^\circ\))." /></span>
              </li>
            </ul>

            <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-200 text-center font-bold">
              <MathFormula formula="A = F \cdot s \quad (\text{Jun - J})" block={true} className="!my-0 !py-0 !bg-transparent !border-0 text-purple-950" />
            </div>
          </div>

          {/* Box 2: Công suất */}
          <div className="bg-white p-5 rounded-xl border border-blue-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-blue-100">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                P
              </div>
              <h3 className="font-bold text-slate-900 text-base">2. Công Suất (Power)</h3>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Định nghĩa:</strong> Đại lượng đặc trưng cho tốc độ thực hiện công trong một đơn vị thời gian.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span className="flex items-center gap-2">
                  <strong>Công thức:</strong> 
                  <MathFormula formula="P = \frac{A}{t} = F \cdot v" className="!my-0 !py-1 px-3 bg-blue-50 text-blue-900 rounded-lg border border-blue-200" />
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><MathText text="**Đơn vị:** Oát (W). \(1\text{ W} = 1\text{ J/s}\). Bội số: \(1\text{ kW} = 1\,000\text{ W}\); \(1\text{ MW} = 1\,000\,000\text{ W}\)." /></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><MathText text="**Mối liên hệ \(P = F \cdot v\):** Khi leo dốc, công suất \(P\) cực đại giữ nguyên, muốn tăng lực kéo \(F\) cần giảm vận tốc \(v\) (về số thấp)." /></span>
              </li>
            </ul>

            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-center font-bold">
              <MathFormula formula="P = \frac{A}{t} = F \cdot v \quad (\text{Oát - W})" block={true} className="!my-0 !py-0 !bg-transparent !border-0 text-blue-950" />
            </div>
          </div>
        </div>

        {/* 📌 EM CẦN NHỚ Box */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-2xl p-5 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
            <Bookmark className="w-5 h-5 text-purple-600" />
            <span>📌 EM CẦN NHỚ: BÀI 4 - CÔNG & CÔNG SUẤT (SGK KHTN 9)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-purple-950 font-medium">
            <div className="p-3 bg-white/80 rounded-xl border border-purple-200">
              <MathText text="**1. Công cơ học:** Chỉ có khi lực làm vật dịch chuyển. Lực vuông góc phương dời không sinh công (\(A = 0\))." />
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-purple-200">
              <MathText text="**2. Công suất:** Xác định bằng công sinh ra trong 1 giây (\(P = \frac{A}{t}\)). Máy có công suất càng lớn làm việc càng nhanh." />
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-purple-200">
              <MathText text="**3. Vận hành xe cộ:** Từ \(F = \frac{P}{v}\), khi leo dốc cần giảm tốc độ \(v\) để đạt lực kéo \(F\) lớn nhất." />
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
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white text-xs md:text-sm font-bold shadow-xs transition-all flex items-center gap-2 min-h-[48px] cursor-pointer"
          >
            <span>Vào Chặng 4: Tương Tác & Trò Chơi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // BÀI 1: DỤNG CỤ, HOÁ CHẤT & THUYẾT TRÌNH
  // ==========================================
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
