import React, { useState, useMemo } from 'react';
import { getLessonModule } from '../services/lessonRegistry';
import { DifficultyLevel, PracticeQuestion } from '../types';
import { 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  RotateCcw, 
  BookOpen, 
  Award, 
  Filter, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  HelpCircle 
} from 'lucide-react';
import { shuffleQuestionsWithBalancedAnswers, ShuffledQuestion } from '../services/quizShuffleService';

interface PracticeStageProps {
  onAddXP: (amount: number) => void;
  onGoToRealWorld?: () => void;
  onProceedToRealWorld?: () => void;
  onBackToGames?: () => void;
  activeLessonId?: number;
}

export const PracticeStage: React.FC<PracticeStageProps> = ({ 
  onAddXP, 
  onGoToRealWorld, 
  onProceedToRealWorld,
  onBackToGames,
  activeLessonId = 1 
}) => {
  const [activeTab, setActiveTab] = useState<'all' | DifficultyLevel>('all');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({}); // questionId -> optionId
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});
  const [attemptsCount, setAttemptsCount] = useState<Record<string, number>>({});
  const [sessionAttemptId, setSessionAttemptId] = useState(0);

  const lessonModule = getLessonModule(activeLessonId);
  const questionsList = lessonModule.practice;

  // Xáo trộn 14 câu hỏi với phân bố cân bằng giữa A, B, C, D
  // Lưu trữ ổn định trong suốt session attempt hiện tại
  const shuffledQuestionsMap = useMemo<Record<string, ShuffledQuestion>>(() => {
    return shuffleQuestionsWithBalancedAnswers(questionsList);
  }, [activeLessonId, sessionAttemptId]);

  const countNB = questionsList.filter(q => q.level === 'nhan_biet').length;
  const countTH = questionsList.filter(q => q.level === 'thong_hieu').length;
  const countVD = questionsList.filter(q => q.level === 'van_dung').length;

  const filteredQuestions = questionsList.filter(q => 
    activeTab === 'all' ? true : q.level === activeTab
  );

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (submittedQuestions[questionId]) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmitAnswer = (q: PracticeQuestion) => {
    const selectedOptId = selectedAnswers[q.id];
    if (!selectedOptId) return;

    const currentAttempts = (attemptsCount[q.id] || 0) + 1;
    setAttemptsCount(prev => ({ ...prev, [q.id]: currentAttempts }));
    setSubmittedQuestions(prev => ({ ...prev, [q.id]: true }));

    const shuffled = shuffledQuestionsMap[q.id];
    const isCorrect = shuffled && selectedOptId === shuffled.correctOptionId;
    if (isCorrect) {
      const reward = q.level === 'van_dung' ? 40 : q.level === 'thong_hieu' ? 30 : 20;
      onAddXP(reward);
    }
  };

  const handleRetryQuestion = (questionId: string) => {
    setSelectedAnswers(prev => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
    setSubmittedQuestions(prev => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  const toggleHint = (questionId: string) => {
    setShowHints(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleProceed = () => {
    if (onProceedToRealWorld) onProceedToRealWorld();
    else if (onGoToRealWorld) onGoToRealWorld();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header & Filter System */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Chặng 5: Luyện Tập (3 Mức Độ Nhận Thức)
              </span>
              <span className="text-xs text-slate-500 font-medium">14 Câu Hỏi Trọng Tâm SGK</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
              Luyện Tập Toàn Diện Theo Chuẩn Đánh Giá Năng Lực
            </h2>
          </div>

          <div className="text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl self-start md:self-auto flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Đáp án đã xáo trộn đều A - B - C - D</span>
          </div>
        </div>

        {/* 3-Level Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer min-h-[40px] ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Tất cả (14)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('nhan_biet')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer min-h-[40px] ${
              activeTab === 'nhan_biet'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60'
            }`}
          >
            <span>1. Nhận biết ({countNB})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('thong_hieu')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer min-h-[40px] ${
              activeTab === 'thong_hieu'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60'
            }`}
          >
            <span>2. Thông hiểu ({countTH})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('van_dung')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer min-h-[40px] ${
              activeTab === 'van_dung'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60'
            }`}
          >
            <span>3. Vận dụng ({countVD})</span>
          </button>
        </div>
      </div>

      {/* Question Cards List */}
      <div className="space-y-5">
        {filteredQuestions.map((q, idx) => {
          const shuffled = shuffledQuestionsMap[q.id];
          const options = shuffled ? shuffled.options : [];
          const selectedOptId = selectedAnswers[q.id];
          const isSubmitted = submittedQuestions[q.id];
          const isCorrect = shuffled && selectedOptId === shuffled.correctOptionId;
          const isHintOpen = showHints[q.id];
          const attempts = attemptsCount[q.id] || 0;

          return (
            <div 
              key={q.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 transition-all"
            >
              {/* Question Header Badge */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs">
                    {idx + 1}
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    q.level === 'van_dung'
                      ? 'bg-emerald-100 text-emerald-800'
                      : q.level === 'thong_hieu'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                  }`}>
                    {q.levelName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {attempts > 0 && (
                    <span className="text-[11px] text-slate-400">
                      Lần thử: {attempts}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleHint(q.id)}
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1 transition-all cursor-pointer min-h-[32px] ${
                      isHintOpen 
                        ? 'bg-amber-50 text-amber-800 border-amber-300' 
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    <span>{isHintOpen ? 'Ẩn gợi ý' : 'Gợi ý tư duy'}</span>
                  </button>
                </div>
              </div>

              {/* Question Content */}
              <div>
                <p className="font-bold text-slate-900 text-sm md:text-base leading-relaxed">
                  {q.question}
                </p>
                {q.subText && (
                  <p className="text-xs text-slate-500 mt-1 italic">
                    {q.subText}
                  </p>
                )}
              </div>

              {/* Shuffled Options (A, B, C, D) */}
              <div className="space-y-2.5">
                {options.map((opt, optIdx) => {
                  const isSelected = selectedOptId === opt.id;
                  const letter = String.fromCharCode(65 + optIdx);

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(q.id, opt.id)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm font-medium transition-all flex items-start gap-3 min-h-[48px] cursor-pointer ${
                        !isSubmitted
                          ? isSelected
                            ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-xs ring-2 ring-blue-300'
                            : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50 text-slate-800 active:scale-[0.99]'
                          : isSelected
                            ? isCorrect
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-xs ring-2 ring-emerald-400'
                              : 'border-red-400 bg-red-50 text-red-900 shadow-xs ring-2 ring-red-300'
                            : opt.isCorrect
                              ? 'border-emerald-300 bg-emerald-50/60 text-slate-800 font-semibold'
                              : 'border-slate-200 opacity-60 text-slate-500 bg-white'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isSubmitted && isSelected ? (
                          isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )
                        ) : (
                          <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                            isSubmitted && opt.isCorrect
                              ? 'border-emerald-500 bg-emerald-100 text-emerald-800'
                              : isSelected
                                ? 'border-blue-600 bg-blue-600 text-white'
                                : 'border-slate-300 bg-slate-50 text-slate-600'
                          }`}>
                            {letter}
                          </span>
                        )}
                      </div>
                      <span className="leading-snug">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons: Submit / Retry */}
              <div className="pt-2 flex items-center justify-between">
                {isSubmitted ? (
                  <button
                    type="button"
                    onClick={() => handleRetryQuestion(q.id)}
                    className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-all cursor-pointer min-h-[40px]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Làm lại câu này</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSubmitAnswer(q)}
                    disabled={!selectedOptId}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-xs flex items-center gap-1.5 transition-all cursor-pointer min-h-[40px]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Kiểm tra đáp án</span>
                  </button>
                )}
              </div>

              {/* Hint Container */}
              {isHintOpen && (
                <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1 animate-in fade-in duration-150">
                  <div className="font-bold flex items-center gap-1 text-amber-900">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>Gợi ý tư duy:</span>
                  </div>
                  <p className="leading-relaxed">{q.hint}</p>
                </div>
              )}

              {/* Feedback upon submission */}
              {isSubmitted && (
                <div className={`p-4 rounded-xl text-xs space-y-2 border ${
                  isCorrect 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
                    : 'bg-red-50 border-red-200 text-red-950'
                }`}>
                  <div className="flex items-center gap-1.5 font-bold text-sm">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-800">Chính xác! Em đã hiểu đúng bản chất câu hỏi.</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span className="text-red-800">Chưa đúng. Em hãy xem giải thích khoa học dưới đây:</span>
                      </>
                    )}
                  </div>
                  <div className="leading-relaxed text-slate-800">
                    <strong>Giải thích khoa học: </strong>
                    {q.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Global Bottom Navigation Footer */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToGames}
          className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 min-h-[48px] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Chặng 4: Trò Chơi</span>
        </button>

        <button
          type="button"
          onClick={handleProceed}
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs md:text-sm font-bold shadow-xs transition-all flex items-center gap-2 min-h-[48px] cursor-pointer"
        >
          <span>Vào Chặng 6: Vận Dụng Thực Tế</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
