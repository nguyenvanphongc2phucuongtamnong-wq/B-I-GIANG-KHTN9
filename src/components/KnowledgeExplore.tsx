import React, { useState, useMemo } from 'react';
import { getLessonModule } from '../services/lessonRegistry';
import { 
  GalvanometerSim, 
  SeparatoryFunnelSim, 
  ThermalMeshSim, 
  AmberBottleSim, 
  ImmersionOilSim 
} from './Simulations';
import { 
  BookOpen, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  Cpu, 
  Beaker, 
  Dna, 
  FileText, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  Award, 
  Zap, 
  Gauge, 
  Layers 
} from 'lucide-react';
import { shuffleSingleQuestion, ShuffledQuestion } from '../services/quizShuffleService';
import { MathText } from './MathRenderer';

interface KnowledgeExploreProps {
  onCardComplete?: (cardId: string) => void;
  completedCards?: string[];
  onAddXP?: (amount: number) => void;
  onProceedToSummary?: () => void;
  onGoToPractice?: () => void;
  onBackToHook?: () => void;
  activeLessonId?: number;
}

export const KnowledgeExplore: React.FC<KnowledgeExploreProps> = ({
  onCardComplete,
  completedCards = [],
  onAddXP,
  onProceedToSummary,
  onGoToPractice,
  onBackToHook,
  activeLessonId = 1,
}) => {
  const lessonModule = getLessonModule(activeLessonId);
  const cards = lessonModule.knowledgeCards;
  const matchingPairs = lessonModule.matchingPairs;

  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [selectedQuickAnswers, setSelectedQuickAnswers] = useState<Record<string, string>>({});
  const [quickAnswersSubmitted, setQuickAnswersSubmitted] = useState<Record<string, boolean>>({});

  // Matching game states
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [matchingError, setMatchingError] = useState<string | null>(null);

  // Xáo trộn các câu quickCheck của từng card để đáp án đúng phân bố A, B, C, D ngẫu nhiên và cố định trong attempt
  const shuffledQuickChecks = useMemo<Record<string, ShuffledQuestion>>(() => {
    const dict: Record<string, ShuffledQuestion> = {};
    cards.forEach(card => {
      dict[card.id] = shuffleSingleQuestion(
        `quickcheck_${card.id}`,
        card.quickCheck.options,
        card.quickCheck.correctIndex
      );
    });
    return dict;
  }, [activeLessonId, cards]);

  const currentCard = cards[activeCardIndex] || cards[0];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'quang_hoc': return <Cpu className="w-4 h-4 text-blue-500" />;
      case 'dien_tu': return <Zap className="w-4 h-4 text-amber-500" />;
      case 'hoa_hoc': return <Beaker className="w-4 h-4 text-emerald-500" />;
      case 'dung_cu_chinh': return <Gauge className="w-4 h-4 text-purple-500" />;
      case 'dong_nang': return <Zap className="w-4 h-4 text-blue-500" />;
      case 'the_nang': return <Gauge className="w-4 h-4 text-amber-500" />;
      case 'bao_cao': return <FileText className="w-4 h-4 text-indigo-500" />;
      default: return <BookOpen className="w-4 h-4 text-slate-500" />;
    }
  };

  const handleSelectQuickAnswer = (cardId: string, optionId: string) => {
    if (quickAnswersSubmitted[cardId]) return;
    
    setSelectedQuickAnswers(prev => ({ ...prev, [cardId]: optionId }));
    setQuickAnswersSubmitted(prev => ({ ...prev, [cardId]: true }));
    
    const shuffled = shuffledQuickChecks[cardId];
    const isCorrect = shuffled && optionId === shuffled.correctOptionId;
    
    if (isCorrect && onAddXP) {
      onAddXP(25);
    }
    if (onCardComplete) {
      onCardComplete(cardId);
    }
  };

  // Interactive matching game handlers
  const handleToolClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    setMatchingError(null);
    if (selectedRole) {
      if (selectedRole === id) {
        setMatchedIds(prev => [...prev, id]);
        setSelectedTool(null);
        setSelectedRole(null);
        if (onAddXP) onAddXP(20);
      } else {
        setMatchingError('Ghép chưa chính xác, em hãy thử lại nhé!');
        setSelectedTool(null);
        setSelectedRole(null);
      }
    } else {
      setSelectedTool(id);
    }
  };

  const handleRoleClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    setMatchingError(null);
    if (selectedTool) {
      if (selectedTool === id) {
        setMatchedIds(prev => [...prev, id]);
        setSelectedTool(null);
        setSelectedRole(null);
        if (onAddXP) onAddXP(20);
      } else {
        setMatchingError('Ghép chưa chính xác, em hãy thử lại nhé!');
        setSelectedTool(null);
        setSelectedRole(null);
      }
    } else {
      setSelectedRole(id);
    }
  };

  const renderSim = (simId?: string) => {
    switch (simId) {
      case 'galvanometer-sim': return <GalvanometerSim />;
      case 'separatory-funnel-sim': return <SeparatoryFunnelSim />;
      case 'thermal-mesh-sim': return <ThermalMeshSim />;
      case 'amber-bottle-sim': return <AmberBottleSim />;
      case 'immersion-oil-sim': return <ImmersionOilSim />;
      default: return null;
    }
  };

  const handleGoNext = () => {
    if (onProceedToSummary) {
      onProceedToSummary();
    } else if (onGoToPractice) {
      onGoToPractice();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Stage Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              Chặng 2: Khám Phá Kiến Thức
            </span>
            <span className="text-xs text-slate-500">
              {cards.length} Thẻ Kiến Thức Trọng Tâm SGK
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Khám Phá: {lessonModule.title}
          </h2>
        </div>

        {/* Card Switcher Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
          {cards.map((card, idx) => {
            const isCompleted = completedCards.includes(card.id) || quickAnswersSubmitted[card.id];
            const isActive = activeCardIndex === idx;

            return (
              <button
                key={card.id}
                type="button"
                onClick={() => setActiveCardIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer min-h-[36px] ${
                  isActive
                    ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                    : isCompleted
                      ? 'text-emerald-700 hover:bg-white/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                }`}
              >
                <span>{idx + 1}</span>
                {isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Knowledge Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            {getCategoryIcon(currentCard.category)}
            <span>{currentCard.categoryName}</span>
          </div>
          <div className="text-xs text-slate-400 font-medium">
            Thẻ {activeCardIndex + 1} / {cards.length}
          </div>
        </div>

        <div>
          <h3 className="text-lg md:text-xl font-bold text-slate-900">
            <MathText text={currentCard.title} />
          </h3>
          <div className="mt-3 p-4 bg-blue-50/60 rounded-xl border border-blue-100 text-sm text-blue-900 font-medium flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-blue-950">Vấn đề khám phá: </strong>
              <MathText text={currentCard.explorationQuestion} />
            </div>
          </div>
        </div>

        {/* 1. Observation */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            1. Quan sát thực tế & SGK:
          </div>
          <div className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
            <MathText text={currentCard.observation} />
          </div>
        </div>

        {/* 2. Scientific Explanation */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            2. Bản chất khoa học:
          </div>
          <div className="text-sm text-slate-800 leading-relaxed">
            <MathText text={currentCard.scientificExplanation} />
          </div>
        </div>

        {/* 3. Key Formulas / Rules */}
        {currentCard.keyFormulasOrRules && (
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              3. Quy tắc & Công thức cốt lõi:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {currentCard.keyFormulasOrRules.map((rule, idx) => (
                <div key={idx} className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl text-xs text-indigo-950 font-medium flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-indigo-200 text-indigo-800 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span><MathText text={rule} /></span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Sim if available */}
        {currentCard.interactiveSimId && (
          <div className="pt-2">
            {renderSim(currentCard.interactiveSimId)}
          </div>
        )}

        {/* 4. Practical Examples */}
        {currentCard.examples && currentCard.examples.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              4. Ví dụ thực hành:
            </div>
            <div className="space-y-2">
              {currentCard.examples.map((ex, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50/80 p-3 rounded-lg border border-slate-200">
                  <span className="text-blue-600 font-bold">
                    ✓
                  </span>
                  <span><MathText text={ex} /></span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Quick Check with Shuffled Options A/B/C/D */}
        <div className="p-5 bg-slate-50/80 rounded-xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>5. Kiểm tra nhanh (Quick Check):</span>
            </div>
            <span className="text-xs bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full font-bold">
              +25 XP
            </span>
          </div>

          <div className="text-sm font-semibold text-slate-900">
            <MathText text={currentCard.quickCheck.question} />
          </div>

          <div className="space-y-2">
            {(() => {
              const cardId = currentCard.id;
              const shuffled = shuffledQuickChecks[cardId];
              const options = shuffled ? shuffled.options : [];
              const hasAnswered = quickAnswersSubmitted[cardId];
              const selectedOptId = selectedQuickAnswers[cardId];

              return options.map((opt, optIdx) => {
                const isSelected = selectedOptId === opt.id;
                const isCorrect = opt.isCorrect;
                const letter = String.fromCharCode(65 + optIdx);

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectQuickAnswer(cardId, opt.id)}
                    disabled={hasAnswered}
                    className={`w-full text-left p-3 rounded-xl border text-xs md:text-sm font-medium transition-all flex items-start gap-2.5 min-h-[44px] cursor-pointer ${
                      !hasAnswered
                        ? 'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/40 text-slate-800'
                        : isSelected
                          ? isCorrect
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-xs ring-1 ring-emerald-400'
                            : 'border-red-400 bg-red-50 text-red-900 shadow-xs ring-1 ring-red-300'
                          : isCorrect
                            ? 'border-emerald-300 bg-emerald-50/50 text-slate-700'
                            : 'border-slate-200 opacity-60 text-slate-500 bg-white'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {hasAnswered && isSelected ? (
                        isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )
                      ) : (
                        <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                          hasAnswered && isCorrect ? 'border-emerald-500 bg-emerald-100 text-emerald-800' : 'border-slate-300 text-slate-600'
                        }`}>
                          {letter}
                        </span>
                      )}
                    </div>
                    <span><MathText text={opt.text} /></span>
                  </button>
                );
              });
            })()}
          </div>

          {quickAnswersSubmitted[currentCard.id] && (
            <div className="p-3 bg-white rounded-lg text-xs border border-slate-200 text-slate-700 space-y-1">
              <span className="font-bold text-slate-900">Giải thích chi tiết: </span>
              <span><MathText text={currentCard.quickCheck.explanation} /></span>
            </div>
          )}
        </div>

        {/* Card Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setActiveCardIndex(prev => Math.max(prev - 1, 0))}
            disabled={activeCardIndex === 0}
            className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px]"
          >
            ← Thẻ trước
          </button>

          {activeCardIndex < cards.length - 1 ? (
            <button
              type="button"
              onClick={() => setActiveCardIndex(prev => prev + 1)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex items-center gap-1.5 min-h-[44px] cursor-pointer"
            >
              <span>Thẻ tiếp theo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Đã hoàn thành tất cả các thẻ!
            </span>
          )}
        </div>
      </div>

      {/* Interactive Matching Challenge */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h4 className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600" />
              <span>Thử thách Ghép Nối Khái Niệm & Dụng Cụ (Tap to Match)</span>
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Chạm vào một mục ở cột trái, rồi chạm vào mục tương ứng ở cột phải để hoàn thành cặp ghép:
            </p>
          </div>
          <span className="text-xs bg-purple-100 text-purple-800 font-bold px-2.5 py-1 rounded-full">
            {matchedIds.length} / {matchingPairs.length} cặp
          </span>
        </div>

        {matchingError && (
          <div className="p-3 bg-red-50 text-red-800 text-xs rounded-lg border border-red-200 flex items-center justify-between">
            <span>{matchingError}</span>
            <button onClick={() => setMatchingError(null)} className="font-bold text-red-600">✕</button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Left Column */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {activeLessonId === 2 ? 'Cột Đại lượng / Khái niệm:' : 'Cột Dụng cụ:'}
            </div>
            {matchingPairs.map(pair => {
              const isMatched = matchedIds.includes(pair.id);
              const isSelected = selectedTool === pair.id;

              return (
                <button
                  key={`tool-${pair.id}`}
                  type="button"
                  onClick={() => handleToolClick(pair.id)}
                  disabled={isMatched}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between min-h-[48px] cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800 opacity-70 line-through'
                      : isSelected
                        ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-xs ring-2 ring-blue-300'
                        : 'bg-slate-50 border-slate-200 hover:border-blue-300 text-slate-800 active:scale-[0.99]'
                  }`}
                >
                  <span>{pair.tool}</span>
                  {isMatched ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <span className="text-[10px] text-slate-400 font-mono">[{pair.category}]</span>}
                </button>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {activeLessonId === 2 ? 'Cột Định nghĩa / Công thức:' : 'Cột Chức năng:'}
            </div>
            {[...matchingPairs].reverse().map(pair => {
              const isMatched = matchedIds.includes(pair.id);
              const isSelected = selectedRole === pair.id;
              return (
                <button
                  key={`role-${pair.id}`}
                  type="button"
                  onClick={() => handleRoleClick(pair.id)}
                  disabled={isMatched}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-between min-h-[48px] cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800 opacity-70 line-through'
                      : isSelected
                        ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-xs ring-2 ring-blue-300'
                        : 'bg-slate-50 border-slate-200 hover:border-blue-300 text-slate-800 active:scale-[0.99]'
                  }`}
                >
                  <span>{pair.role}</span>
                  {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>

        {matchedIds.length === matchingPairs.length && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900 font-semibold">
            <span>
              {activeLessonId === 2 
                ? '🎉 Tuyệt vời! Em đã ghép đúng 100% tất cả khái niệm Động năng & Thế năng!'
                : '🎉 Tuyệt vời! Em đã ghép đúng 100% tất cả các dụng cụ thí nghiệm Bài 1!'}
            </span>
            <span className="text-emerald-700 bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-full">+120 XP</span>
          </div>
        )}
      </div>

      {/* Global Stage Transitions Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToHook}
          className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 min-h-[48px] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Chặng 1: Khởi Động</span>
        </button>

        <button
          type="button"
          onClick={handleGoNext}
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs md:text-sm font-bold shadow-xs transition-all flex items-center gap-2 min-h-[48px] cursor-pointer"
        >
          <span>Vào Chặng 3: Kiến Thức Trọng Tâm</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
