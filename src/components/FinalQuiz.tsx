import React, { useState, useMemo } from 'react';
import { getLessonModule } from '../services/lessonRegistry';
import { 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft,
  Clock, 
  BarChart3,
  Lightbulb,
  Check,
  FileEdit,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  BookOpen,
  Send,
  Sparkles
} from 'lucide-react';
import { shuffleQuestionsWithBalancedAnswers, ShuffledQuestion } from '../services/quizShuffleService';
import { MathText } from './MathRenderer';

interface FinalQuizProps {
  onFinishQuiz: (score: number, total: number, breakdown: { nhanBiet: number; thongHieu: number; vanDung: number }) => void;
  onAddXP: (amount: number) => void;
  activeLessonId?: number;
  onReviewSection?: (section: string) => void;
  onNextLesson?: () => void;
  onBackToExtension?: () => void;
}

export const FinalQuiz: React.FC<FinalQuizProps> = ({ 
  onFinishQuiz, 
  onAddXP, 
  activeLessonId = 1,
  onReviewSection,
  onNextLesson,
  onBackToExtension
}) => {
  const [currentStep, setCurrentStep] = useState<'mcq' | 'essay' | 'result'>('mcq');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({}); // questionId -> optionId
  const [essayText, setEssayText] = useState('');
  const [essayEvaluated, setEssayEvaluated] = useState(false);
  const [essayScore, setEssayScore] = useState(0);
  const [attemptSessionId, setAttemptSessionId] = useState(0);

  // Result state
  const [finalTotalScore, setFinalTotalScore] = useState(0);
  const [breakdownStats, setBreakdownStats] = useState({
    nhanBiet: 0,
    thongHieu: 0,
    vanDung: 0,
  });

  const lessonModule = getLessonModule(activeLessonId);
  const quizQuestions = lessonModule.finalQuiz;
  const essayQuestion = lessonModule.essay;

  // Xáo trộn 14 câu hỏi với phân bố cân bằng đều giữa A, B, C, D
  // Cố định trong attempt hiện tại, không shuffle lại khi chuyển câu
  const shuffledQuestionsMap = useMemo<Record<string, ShuffledQuestion>>(() => {
    return shuffleQuestionsWithBalancedAnswers(quizQuestions);
  }, [activeLessonId, attemptSessionId]);

  // Validate Total Points = 10.0
  const mcqPointPerQuestion = 0.5;
  const totalMcqPoints = quizQuestions.length * mcqPointPerQuestion; // 14 * 0.5 = 7.0
  const totalEssayPoints = essayQuestion.points; // 3.0
  const examTotalPoints = totalMcqPoints + totalEssayPoints; // 7.0 + 3.0 = 10.0

  const currentQ = quizQuestions[currentQuestionIdx];
  const totalQuestions = quizQuestions.length;
  const currentShuffled = currentQ ? shuffledQuestionsMap[currentQ.id] : null;

  const handleSelectOption = (questionId: string, optionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNextMcq = () => {
    if (currentQuestionIdx < totalQuestions - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setCurrentStep('essay');
    }
  };

  const handlePrevMcq = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    }
  };

  // Evaluate Essay using smart rubric keywords
  const handleEvaluateEssay = () => {
    let earned = 0;
    const lower = essayText.toLowerCase();

    essayQuestion.rubric.forEach(criterion => {
      const matched = criterion.keywords.filter(kw => lower.includes(kw.toLowerCase()));
      if (matched.length >= 2 || (criterion.keywords.length <= 2 && matched.length >= 1)) {
        earned += criterion.maxPoints;
      } else if (matched.length === 1) {
        earned += criterion.maxPoints * 0.5;
      }
    });

    if (earned === 0 && essayText.trim().length > 40) {
      earned = 1.0;
    }

    earned = Math.min(essayQuestion.points, Math.max(0, earned));
    setEssayScore(earned);
    setEssayEvaluated(true);
  };

  // Finalize full assessment (10.0 points)
  const handleCompleteAssessment = () => {
    let mcqScore = 0;
    let nbEarned = 0; // max 5 * 0.5 = 2.5
    let thEarned = 0; // max 5 * 0.5 = 2.5
    let vdMcqEarned = 0; // max 4 * 0.5 = 2.0

    quizQuestions.forEach((q) => {
      const shuffled = shuffledQuestionsMap[q.id];
      const selectedOptId = selectedAnswers[q.id];
      if (shuffled && selectedOptId === shuffled.correctOptionId) {
        mcqScore += 0.5;
        if (q.level === 'nhan_biet') nbEarned += 0.5;
        if (q.level === 'thong_hieu') thEarned += 0.5;
        if (q.level === 'van_dung') vdMcqEarned += 0.5;
      }
    });

    const totalScore = Number((mcqScore + essayScore).toFixed(1));
    const totalVd = Number((vdMcqEarned + essayScore).toFixed(1));

    setFinalTotalScore(totalScore);
    const breakdown = {
      nhanBiet: Number(nbEarned.toFixed(1)),
      thongHieu: Number(thEarned.toFixed(1)),
      vanDung: totalVd,
    };
    setBreakdownStats(breakdown);

    // XP Reward
    const xpBonus = Math.round(totalScore * 20);
    onAddXP(xpBonus);

    // Notify parent & save record
    onFinishQuiz(totalScore, 10, breakdown);
    setCurrentStep('result');
  };

  const handleRestart = () => {
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setEssayText('');
    setEssayEvaluated(false);
    setEssayScore(0);
    setAttemptSessionId(prev => prev + 1); // Fresh Fisher-Yates shuffle!
    setCurrentStep('mcq');
  };

  // Level Badge Helper
  const renderLevelBadge = (level: string, points: number) => {
    if (level === 'nhan_biet') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          🟢 MỨC 1: BIẾT ({points.toFixed(1)} điểm)
        </span>
      );
    }
    if (level === 'thong_hieu') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
          🟡 MỨC 2: HIỂU ({points.toFixed(1)} điểm)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
        🔴 MỨC 3: VẬN DỤNG ({points.toFixed(1)} điểm)
      </span>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner: Verification of 10.0 Total Points */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
              Chặng 8: Kiểm Tra Đánh Giá (Chuẩn Năng Lực 10 Điểm)
            </span>
            <span className="text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full border border-slate-200">
              Bài {activeLessonId}
            </span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900">
            {activeLessonId === 2 
              ? 'Đánh Giá Năng Lực Học Sinh: Động Năng & Thế Năng'
              : 'Đánh Giá Năng Lực Học Sinh: Dụng Cụ, Hoá Chất & Báo Cáo'}
          </h2>
        </div>

        {/* Verification Check Badge */}
        <div className="flex items-center gap-2 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>TỔNG ĐIỂM: <strong>{examTotalPoints.toFixed(1)} / 10,0 ĐIỂM</strong></span>
          <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">
            (14 TN × 0,5đ + 1 TL × 3,0đ)
          </span>
        </div>
      </div>

      {/* PART 1: MULTIPLE CHOICE QUESTIONS */}
      {currentStep === 'mcq' && currentQ && currentShuffled && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Progress Header */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 uppercase">
                Phần I: Trắc Nghiệm Khách Quan
              </span>
              <span className="text-xs font-semibold text-slate-400">
                (Câu {currentQuestionIdx + 1} / {totalQuestions})
              </span>
            </div>
            {renderLevelBadge(currentQ.level, 0.5)}
          </div>

          <div className="p-6 md:p-8 space-y-6">
            {/* Question Text */}
            <div className="space-y-2">
              <div className="text-base md:text-lg font-bold text-slate-900 leading-relaxed">
                <span className="text-blue-600 font-bold mr-2">Câu {currentQuestionIdx + 1}:</span>
                <MathText text={currentQ.question} />
              </div>
              {(currentQ as any).subText && (
                <div className="text-xs text-slate-500 italic"><MathText text={(currentQ as any).subText} /></div>
              )}
            </div>

            {/* Shuffled Options */}
            <div className="space-y-3">
              {(currentShuffled?.options || []).map((opt, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === opt.id;
                const optLetter = String.fromCharCode(65 + idx);

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(currentQ.id, opt.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 text-sm min-h-[52px] cursor-pointer ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/80 text-blue-950 font-semibold shadow-xs ring-2 ring-blue-400'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 text-slate-700 active:scale-[0.99]'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {optLetter}
                    </span>
                    <span className="leading-relaxed"><MathText text={opt.text} /></span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Strip */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handlePrevMcq}
                disabled={currentQuestionIdx === 0}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-slate-200 rounded-xl min-h-[44px]"
              >
                ← Câu trước
              </button>

              {/* Number Buttons Strip */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-full px-2 py-1">
                {quizQuestions.map((q, i) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentQuestionIdx(i)}
                    className={`w-7 h-7 rounded-lg text-[11px] font-bold transition-colors cursor-pointer shrink-0 ${
                      i === currentQuestionIdx
                        ? 'bg-blue-600 text-white shadow-xs'
                        : selectedAnswers[q.id] !== undefined
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleNextMcq}
                className="w-full sm:w-auto px-5 py-2.5 text-xs md:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer"
              >
                {currentQuestionIdx === totalQuestions - 1 ? (
                  <>Sang Phần Tự Luận (3,0đ) →</>
                ) : (
                  <>Câu tiếp theo →</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PART 2: ESSAY QUESTION (3.0 POINTS) */}
      {currentStep === 'essay' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-6">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase">
                Phần II: Tự Luận / Tình Huống Vận Dụng Thực Tế
              </span>
              <p className="text-xs text-slate-500 mt-0.5">Bám sát câu hỏi thực hành & vận dụng trong SGK</p>
            </div>
            {renderLevelBadge('van_dung', 3.0)}
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100 space-y-2">
              <div className="text-base font-bold text-purple-950">
                <MathText text={essayQuestion.title} />
              </div>
              {essayQuestion.context && (
                <div className="text-xs text-purple-900/80 leading-relaxed">
                  <strong>Tình huống:</strong> <MathText text={essayQuestion.context} />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Nội dung yêu cầu giải quyết (3,0 điểm):
              </label>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-800 whitespace-pre-line leading-relaxed font-medium">
                <MathText text={essayQuestion.question} />
              </div>
            </div>

            <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200/80 space-y-2">
              <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                Tiêu chí chấm điểm tự luận chuẩn (Rubric 3,0 điểm):
              </div>
              <ul className="text-xs text-blue-800/90 space-y-1.5 list-disc list-inside">
                {essayQuestion.rubric.map((r) => (
                  <li key={r.id}>
                    <strong>{r.criterion} ({r.maxPoints.toFixed(1)}đ):</strong> {r.description}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-800 uppercase tracking-wider">
                  Bài làm của em:
                </label>
                <span className="text-slate-400">Tối thiểu 3 ý tương ứng các câu hỏi</span>
              </div>
              <textarea
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
                placeholder="Nhập câu trả lời chi tiết của em vào đây..."
                rows={7}
                className="w-full p-4 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-hidden leading-relaxed font-normal"
              />
            </div>

            {!essayEvaluated ? (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep('mcq')}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors border border-slate-200 rounded-xl min-h-[44px]"
                >
                  ← Quay lại trắc nghiệm
                </button>
                <button
                  type="button"
                  onClick={handleEvaluateEssay}
                  disabled={essayText.trim().length < 15}
                  className="w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs md:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Chấm Điểm Tự Luận & Xem Kết Quả</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4 pt-2 animate-in fade-in">
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold text-purple-700">Điểm tự luận đạt được:</div>
                    <div className="text-2xl font-bold text-purple-900">{essayScore.toFixed(1)} / 3.0 điểm</div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCompleteAssessment}
                    className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Hoàn Tất Toàn Bộ Bài Kiểm Tra (10,0đ)</span>
                  </button>
                </div>

                <details className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                  <summary className="font-bold text-slate-700 cursor-pointer hover:text-blue-600">
                    📖 Xem bài giải mẫu chuẩn SGK
                  </summary>
                  <pre className="mt-3 text-slate-700 font-sans whitespace-pre-line leading-relaxed bg-white p-3.5 rounded-lg border border-slate-200">
                    {essayQuestion.sampleAnswer}
                  </pre>
                </details>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PART 3: FINAL REPORT & PEDAGOGICAL FEEDBACK */}
      {currentStep === 'result' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-8 animate-in fade-in duration-200">
          <div className="text-center space-y-3">
            <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center ${
              finalTotalScore >= 8.0 ? 'bg-emerald-100 text-emerald-600' :
              finalTotalScore >= 6.5 ? 'bg-blue-100 text-blue-600' :
              'bg-amber-100 text-amber-600'
            }`}>
              <Award className="w-8 h-8" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              📊 KẾT QUẢ ĐÁNH GIÁ CỦA EM
            </h2>
            <div className="inline-block px-5 py-2 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-sm font-semibold text-slate-500">Tổng điểm đạt được: </span>
              <span className="text-3xl font-extrabold text-blue-600 ml-1">
                {finalTotalScore.toFixed(1)}
              </span>
              <span className="text-lg font-bold text-slate-400"> / 10,0</span>
            </div>
            <p className="text-xs text-slate-500">
              {finalTotalScore >= 8.0
                ? 'Xuất sắc! Em đã hoàn thành toàn diện mục tiêu bài học và sẵn sàng bước tiếp.'
                : 'Em đã nỗ lực hoàn thành bài kiểm tra. Hãy xem lại giải thích chi tiết dưới đây để củng cố kiến thức!'}
            </p>
          </div>

          {/* 3-Level Breakdown */}
          <div className="space-y-3 bg-slate-50/80 p-5 rounded-xl border border-slate-200">
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              Kết quả theo 3 mức độ nhận thức
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-emerald-700">🟢 BIẾT (Nhận biết)</span>
                  <span className="font-bold text-slate-900">{breakdownStats.nhanBiet.toFixed(1)} / 2.5đ</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full" 
                    style={{ width: `${(breakdownStats.nhanBiet / 2.5) * 100}%` }}
                  ></div>
                </div>
                <div className="text-[10px] text-slate-500">5 câu trắc nghiệm nhận diện</div>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-blue-700">🟡 HIỂU (Thông hiểu)</span>
                  <span className="font-bold text-slate-900">{breakdownStats.thongHieu.toFixed(1)} / 2.5đ</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-500 h-full rounded-full" 
                    style={{ width: `${(breakdownStats.thongHieu / 2.5) * 100}%` }}
                  ></div>
                </div>
                <div className="text-[10px] text-slate-500">5 câu phân tích & giải thích</div>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-purple-700">🔴 VẬN DỤNG</span>
                  <span className="font-bold text-slate-900">{breakdownStats.vanDung.toFixed(1)} / 5.0đ</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-purple-500 h-full rounded-full" 
                    style={{ width: `${(breakdownStats.vanDung / 5.0) * 100}%` }}
                  ></div>
                </div>
                <div className="text-[10px] text-slate-500">4 câu TN (2.0đ) + 1 câu TL (3.0đ)</div>
              </div>
            </div>
          </div>

          {/* Detailed Question-by-Question Review */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Xem lại chi tiết từng câu trắc nghiệm:</span>
            </h3>

            <div className="space-y-3">
              {quizQuestions.map((q, idx) => {
                const shuffled = shuffledQuestionsMap[q.id];
                const selectedOptId = selectedAnswers[q.id];
                const isCorrect = shuffled && selectedOptId === shuffled.correctOptionId;
                const selectedOpt = shuffled?.options.find(o => o.id === selectedOptId);
                const correctOpt = shuffled?.options.find(o => o.isCorrect);

                return (
                  <div 
                    key={q.id}
                    className={`p-4 rounded-xl border text-xs space-y-2 ${
                      isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-red-50/50 border-red-200'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <div className={isCorrect ? 'text-emerald-800' : 'text-red-800'}>
                        Câu {idx + 1}: <MathText text={q.question} />
                      </div>
                      {isCorrect ? (
                        <span className="text-emerald-600 flex items-center gap-1 shrink-0 ml-2">
                          <CheckCircle2 className="w-4 h-4" /> +0.5đ
                        </span>
                      ) : (
                        <span className="text-red-600 flex items-center gap-1 shrink-0 ml-2">
                          <XCircle className="w-4 h-4" /> 0.0đ
                        </span>
                      )}
                    </div>

                    <div className="text-slate-700 space-y-1">
                      <div>
                        <strong>Đáp án em chọn: </strong>
                        <span className={isCorrect ? 'text-emerald-700 font-semibold' : 'text-red-700 font-semibold'}>
                          {selectedOpt ? <MathText text={selectedOpt.text} /> : '(Chưa chọn)'}
                        </span>
                      </div>
                      {!isCorrect && correctOpt && (
                        <div>
                          <strong>Đáp án đúng: </strong>
                          <span className="text-emerald-800 font-semibold"><MathText text={correctOpt.text} /></span>
                        </div>
                      )}
                      <div className="pt-1 text-slate-600">
                        <strong>Giải thích: </strong>
                        <MathText text={q.explanation} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleRestart}
              className="px-5 py-3 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-2 min-h-[48px] cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại bài kiểm tra (Xáo trộn mới)</span>
            </button>

            {onReviewSection && (
              <button
                type="button"
                onClick={() => onReviewSection('summary')}
                className="px-5 py-3 text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded-xl border border-indigo-200 transition-colors flex items-center gap-2 min-h-[48px] cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Ôn lại lý thuyết trọng tâm</span>
              </button>
            )}

            {onNextLesson && (
              <button
                type="button"
                onClick={onNextLesson}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 min-h-[48px] cursor-pointer"
              >
                <span>Học Bài Tiếp Theo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
