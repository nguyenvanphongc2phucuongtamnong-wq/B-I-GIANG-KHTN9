import React from 'react';
import { getLessonModule } from '../services/lessonRegistry';
import { Rocket, AlertTriangle, Sparkles, ArrowRight, ArrowLeft, Award } from 'lucide-react';

interface ExtensionStageProps {
  activeLessonId?: number;
  onProceedToFinalQuiz?: () => void;
  onBackToRealWorld?: () => void;
}

export const ExtensionStage: React.FC<ExtensionStageProps> = ({ 
  activeLessonId = 1,
  onProceedToFinalQuiz,
  onBackToRealWorld
}) => {
  const lessonModule = getLessonModule(activeLessonId);
  const extension = lessonModule.extension;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-xs border border-slate-800 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/15 border border-purple-500/30 rounded-full text-xs font-bold uppercase tracking-wider text-purple-300">
          <Rocket className="w-3.5 h-3.5 text-purple-400" />
          <span>{extension.badgeLabel}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          Khám Phá Mở Rộng: {lessonModule.title}
        </h3>
        
        {/* Warning Label */}
        <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs md:text-sm text-amber-200 font-medium flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{extension.disclaimer}</span>
        </div>
      </div>

      {/* Extension Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {extension.topics.map((topic, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between hover:border-slate-300 transition-colors"
          >
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm md:text-base">
                {topic.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {topic.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-blue-600 font-bold">
              <span>Khoa học mở rộng</span>
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Footer */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToRealWorld}
          className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 min-h-[48px] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Chặng 6: Vận Dụng</span>
        </button>

        <button
          type="button"
          onClick={onProceedToFinalQuiz}
          className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs md:text-sm font-bold shadow-xs transition-all flex items-center gap-2 min-h-[48px] cursor-pointer"
        >
          <Award className="w-4 h-4" />
          <span>Vào Chặng 8: Kiểm Tra Đánh Giá (10 Điểm)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
