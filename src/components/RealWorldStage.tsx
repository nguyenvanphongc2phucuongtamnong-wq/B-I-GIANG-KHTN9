import React, { useState } from 'react';
import { getLessonModule } from '../services/lessonRegistry';
import { 
  Globe2, 
  CheckCircle2, 
  HelpCircle, 
  Lightbulb, 
  Send, 
  FileSpreadsheet, 
  Layout, 
  Presentation, 
  ArrowRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

interface RealWorldStageProps {
  onAddXP?: (amount: number) => void;
  onProceedToExtension?: () => void;
  onGoToFinalQuiz?: () => void;
  onBackToPractice?: () => void;
  activeLessonId?: number;
}

export const RealWorldStage: React.FC<RealWorldStageProps> = ({ 
  onAddXP, 
  onProceedToExtension, 
  onGoToFinalQuiz,
  onBackToPractice,
  activeLessonId = 1 
}) => {
  const [studentNote, setStudentNote] = useState('');
  const [submittedNote, setSubmittedNote] = useState(false);
  const [activeStepTab, setActiveStepTab] = useState(0);

  const lessonModule = getLessonModule(activeLessonId);
  const rawData = lessonModule.realWorld;

  // Chuẩn hoá steps cho mọi bài học (Bài 1, 2, 3, 4...)
  const rawSteps = rawData?.steps || rawData?.guideSteps || [];
  const steps = rawSteps.map((s: any) => ({
    title: s.title || s.stepTitle || 'Bước thực hiện',
    content: s.content || s.instruction || ''
  }));

  const deliverables: string[] = rawData?.deliverables || rawData?.deliverableRequirements || [
    'Báo cáo phân tích hiện tượng và số liệu khoa học',
    'Giải pháp sáng tạo bảo vệ môi trường và tối ưu năng lượng',
    'Bản trình chiếu thuyết trình nhóm trước lớp'
  ];

  const handleSubmitNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentNote.trim() || submittedNote) return;
    setSubmittedNote(true);
    if (onAddXP) onAddXP(60);
  };

  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0: return <HelpCircle className="w-4 h-4 text-blue-600" />;
      case 1: return <FileSpreadsheet className="w-4 h-4 text-emerald-600" />;
      case 2: return <Layout className="w-4 h-4 text-amber-600" />;
      case 3: return <Presentation className="w-4 h-4 text-purple-600" />;
      default: return <CheckCircle2 className="w-4 h-4 text-blue-600" />;
    }
  };

  const handleProceed = () => {
    if (onProceedToExtension) onProceedToExtension();
    else if (onGoToFinalQuiz) onGoToFinalQuiz();
  };

  const currentStepData = steps[activeStepTab] || steps[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-xs border border-slate-800 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-300">
          <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Chặng 6: Khoa Học Quanh Ta (Vận Dụng Thực Tế)</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          {rawData.title}
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-3xl">
          {rawData.scenario}
        </p>
      </div>

      {/* Guide Steps */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
          {steps.map((step, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveStepTab(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer min-h-[40px] ${
                activeStepTab === idx
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {getStepIcon(idx)}
              <span>{step.title.length > 25 ? `${step.title.slice(0, 25)}...` : step.title}</span>
            </button>
          ))}
        </div>

        {/* Step Details */}
        {currentStepData && (
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs shrink-0">
                {activeStepTab + 1}
              </span>
              <span>{currentStepData.title}</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {currentStepData.content}
            </p>
          </div>
        )}

        {/* Deliverables Checklist */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Sản phẩm nhóm học sinh cần hoàn thành:</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {deliverables.map((req, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 font-medium flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Student Note / Reflection Box */}
        <form onSubmit={handleSubmitNote} className="space-y-3 pt-2">
          <label className="block text-xs font-bold text-slate-700">
            ✍️ Ghi chú phương án hoặc ý tưởng của em cho tình huống này:
          </label>
          <textarea
            value={studentNote}
            onChange={(e) => setStudentNote(e.target.value)}
            disabled={submittedNote}
            placeholder="Viết tóm tắt ý tưởng hoặc giải pháp khoa học của nhóm em..."
            className="w-full p-4 border border-slate-200 rounded-xl text-xs md:text-sm focus:outline-hidden focus:border-blue-500 min-h-[90px]"
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400">
              {submittedNote ? '✅ Đã lưu ý tưởng (+60 XP)' : 'Chia sẻ phương án để nhận điểm thưởng'}
            </span>
            <button
              type="submit"
              disabled={!studentNote.trim() || submittedNote}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 min-h-[40px] cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submittedNote ? 'Đã gửi' : 'Lưu phương án'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Navigation Footer */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToPractice}
          className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 min-h-[48px] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Chặng 5: Luyện Tập</span>
        </button>

        <button
          type="button"
          onClick={handleProceed}
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs md:text-sm font-bold shadow-xs transition-all flex items-center gap-2 min-h-[48px] cursor-pointer"
        >
          <span>Vào Chặng 7: Khám Phá Thêm</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
