import React, { useState, useEffect, useMemo } from 'react';
import { getLessonModule } from '../services/lessonRegistry';
import { Sparkles, CheckCircle2, XCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { shuffleScenarioQuestion } from '../services/quizShuffleService';
import { MathText } from './MathRenderer';

interface HookStageProps {
  onComplete?: () => void;
  onProceedToExplore?: () => void;
  onAddXP?: (amount: number) => void;
  activeLessonId?: number;
  lessonInfo?: any;
}

export const HookStage: React.FC<HookStageProps> = ({ 
  onComplete, 
  onProceedToExplore, 
  onAddXP, 
  activeLessonId = 1 
}) => {
  const lessonModule = getLessonModule(activeLessonId);
  const scenario = lessonModule.hook;

  // Xáo trộn đáp án cố định trong suốt attempt của bài học hiện tại (không đổi khi re-render)
  const shuffledData = useMemo(() => {
    return shuffleScenarioQuestion(`hook_lesson_${activeLessonId}`, scenario.options);
  }, [activeLessonId, scenario]);

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  // Reset state khi đổi bài học
  useEffect(() => {
    setSelectedOptionId(null);
    setHasAnswered(false);
  }, [activeLessonId]);

  const handleSelect = (optionId: string, isCorrect: boolean) => {
    if (hasAnswered) return;
    setSelectedOptionId(optionId);
    setHasAnswered(true);
    if (onAddXP) {
      if (isCorrect) {
        onAddXP(30);
      } else {
        onAddXP(10);
      }
    }
  };

  const handleProceed = () => {
    if (onProceedToExplore) {
      onProceedToExplore();
    } else if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Intro Hook Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-xs border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/15 text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Chặng 1: Khởi Động (Tình Huống Thực Tế)</span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            <MathText text={scenario.title} />
          </h3>

          <div className="text-sm md:text-base text-slate-300 leading-relaxed">
            <MathText text={scenario.description} />
          </div>

          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 text-sm text-amber-200/90 leading-relaxed">
            <MathText text={scenario.challengePrompt} />
          </div>
        </div>
      </div>

      {/* Interactive Curiosity Question */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xs border border-slate-200 space-y-5">
        <div className="flex items-start gap-3">
          <span className="p-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">
            <HelpCircle className="w-5 h-5" />
          </span>
          <div>
            <div className="font-bold text-slate-900 text-base md:text-lg">
              <MathText text={scenario.question} />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Hãy suy luận và chọn câu trả lời em cho là chính xác nhất (Vị trí đáp án đúng đã được xáo trộn):
            </p>
          </div>
        </div>

        {/* Shuffled Options */}
        <div className="space-y-3">
          {shuffledData.options.map((opt, idx) => {
            const isSelected = selectedOptionId === opt.id;
            const letter = String.fromCharCode(65 + idx); // A, B, C, D
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelect(opt.id, opt.correct)}
                disabled={hasAnswered}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 text-sm font-medium min-h-[56px] cursor-pointer ${
                  !hasAnswered
                    ? 'border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 text-slate-800 bg-white active:scale-[0.99]'
                    : isSelected
                      ? opt.correct
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-xs ring-2 ring-emerald-400'
                        : 'border-red-400 bg-red-50 text-red-900 shadow-xs ring-2 ring-red-300'
                      : opt.correct
                        ? 'border-emerald-300 bg-emerald-50/40 text-slate-700'
                        : 'border-slate-200 opacity-60 text-slate-500 bg-white'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {hasAnswered && isSelected ? (
                    opt.correct ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )
                  ) : (
                    <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${
                      hasAnswered && opt.correct 
                        ? 'border-emerald-500 bg-emerald-100 text-emerald-800' 
                        : 'border-slate-300 bg-slate-50 text-slate-600'
                    }`}>
                      {letter}
                    </span>
                  )}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="leading-snug"><MathText text={opt.text} /></div>
                  {hasAnswered && isSelected && (
                    <div className={`text-xs mt-2 pt-2 border-t font-normal ${
                      opt.correct ? 'border-emerald-200 text-emerald-800' : 'border-red-200 text-red-800'
                    }`}>
                      <MathText text={opt.feedback} />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Action button to proceed to Stage 2 */}
        <div className="pt-4 flex justify-between items-center border-t border-slate-100">
          <span className="text-xs text-slate-500">
            {hasAnswered ? '✅ Đã hoàn thành Chặng 1' : '💡 Chọn 1 đáp án để tiếp tục'}
          </span>
          <button
            type="button"
            onClick={handleProceed}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold px-6 py-3 rounded-xl shadow-xs transition-all flex items-center gap-2 text-sm min-h-[48px] cursor-pointer"
          >
            <span>Vào Chặng 2: Khám Phá Kiến Thức</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
