import React, { useState, useMemo } from 'react';
import { 
  Gamepad2, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Trophy, 
  ArrowRight, 
  ArrowLeft,
  RotateCcw, 
  Sparkles,
  Search,
  MoveUp,
  MoveDown,
  Zap,
  Target
} from 'lucide-react';
import { shuffleQuestionsWithBalancedAnswers, ShuffledQuestion } from '../services/quizShuffleService';
import { getLessonModule } from '../services/lessonRegistry';

interface InteractiveGamesProps {
  onAddXP?: (amount: number) => void;
  onProceedToPractice?: () => void;
  onBackToSummary?: () => void;
  activeLessonId?: number;
}

const DETECTIVE_MISSIONS_LESSON_1 = [
  {
    id: 'det_1',
    scenario: 'Nhiệm vụ 1: Nhóm bạn Nam cần làm thí nghiệm "Khảo sát hiện tượng phản xạ toàn phần của tia sáng".',
    question: 'Dụng cụ nào KHÔNG THỂ THIẾU để đo góc tới và góc phản xạ toàn phần?',
    options: [
      'Bản bán trụ thuỷ tinh & Bảng chia độ tròn',
      'Phễu chiết có khoá van',
      'Lưới tản nhiệt và bát sứ',
      'Cuộn dây có hai đèn LED',
    ],
    correctIndex: 0,
    explanation: 'Bản bán trụ thuỷ tinh đặt trên bảng chia độ tròn giúp chiếu chùm sáng hẹp vào tâm và đọc chính xác góc tới, góc khúc xạ và phản xạ toàn phần.',
  },
  {
    id: 'det_2',
    scenario: 'Nhiệm vụ 2: Thầy giáo yêu cầu tách riêng lớp dầu hoả nổi trên mặt nước trong một bình chứa.',
    question: 'Em hãy chọn dụng cụ phòng lab chuẩn nhất để thực hiện:',
    options: [
      'Phễu chiết có khoá vặn ở cuống',
      'Bát sứ và đèn cồn để đun sôi',
      'Đồng hồ vạn năng đo điện',
      'Lưới tản nhiệt bằng kim loại',
    ],
    correctIndex: 0,
    explanation: 'Phễu chiết dùng để chiết tách 2 chất lỏng không hoà tan vào nhau nhờ khoá van điều khiển lớp chất lỏng chìm dưới chảy ra.',
  },
  {
    id: 'det_3',
    scenario: 'Nhiệm vụ 3: Bạn Hoa đang chuẩn bị dung dịch AgNO3 và thuốc tím KMnO4 để tuần sau thực hành.',
    question: 'Em hãy chọn loại chai lọ bảo quản đúng quy chuẩn an toàn:',
    options: [
      'Lọ thuỷ tinh màu nâu sẫm để chỗ tối hoặc bọc kín giấy đen phía ngoài',
      'Cốc thuỷ tinh trong suốt không đậy nắp đặt gần cửa sổ',
      'Chai nhựa trong suốt mở nắp để nơi có ánh nắng',
      'Đổ chung cả 2 hoá chất vào một bát sứ lớn',
    ],
    correctIndex: 0,
    explanation: 'KMnO4 và AgNO3 rất dễ bị phân huỷ quang hoá bởi ánh sáng, do đó phải đựng trong lọ tối màu hoặc bọc giấy đen phía ngoài.',
  },
  {
    id: 'det_4',
    scenario: 'Nhiệm vụ 4: Bạn Minh muốn quan sát rõ các cặp nhiễm sắc thể rễ hành ở vật kính 100x.',
    question: 'Vật phẩm nào bổ trợ bắt buộc phải nhỏ lên tiêu bản trước khi hạ vật kính 100x xuống?',
    options: [
      'Dầu soi kính hiển vi (chiết suất cao)',
      'Nước muối sinh lý',
      'Dung dịch acid H2SO4 đặc',
      'Cồn 96 độ để sát trùng',
    ],
    correctIndex: 0,
    explanation: 'Dầu soi kính hiển vi có chiết suất tương đương thuỷ tinh giúp gom toàn bộ tia sáng vào vật kính 100x, giúp mẫu vật hiện rõ nét.',
  },
];

const DETECTIVE_MISSIONS_LESSON_2 = [
  {
    id: 'det_l2_1',
    scenario: 'Nhiệm vụ 1: Quan sát búa máy đóng cọc bê tông sâu vào lòng đất khi xây dựng cầu vượt.',
    question: 'Năng lượng nào của búa đóng vai trò quyết định giúp cọc lún sâu vào đất cát?',
    options: [
      'Thế năng trọng trường ở trên cao chuyển hoá thành động năng cực lớn khi đập vào cọc',
      'Nhiệt năng do ma sát với không khí khi búa rơi',
      'Điện năng tích luỹ trong khối kim loại của búa',
      'Hoá năng từ lớp sơn chống gỉ phủ ngoài búa',
    ],
    correctIndex: 0,
    explanation: 'Khi được kéo lên cao, búa tích luỹ thế năng Wt = mgh. Khi thả rơi, thế năng chuyển thành động năng Wđ = 1/2mv² sinh công cực lớn đóng cọc xuống.',
  },
  {
    id: 'det_l2_2',
    scenario: 'Nhiệm vụ 2: Một xe tải chở hàng và một xe máy cùng đang chạy với vận tốc 50 km/h trên đường quốc lộ.',
    question: 'So sánh động năng của chiếc xe tải chở hàng so với xe máy:',
    options: [
      'Động năng xe tải lớn hơn rất nhiều vì khối lượng xe tải lớn hơn xe máy nhiều lần',
      'Động năng hai xe bằng nhau vì cùng chạy 50 km/h',
      'Động năng xe máy lớn hơn vì xe máy nhỏ nhẹ chạy linh hoạt hơn',
      'Cả hai xe đều không có động năng',
    ],
    correctIndex: 0,
    explanation: 'Theo công thức Wđ = 1/2 m v², khi v bằng nhau, vật có khối lượng m lớn hơn thì động năng lớn hơn tỉ lệ thuận.',
  },
  {
    id: 'det_l2_3',
    scenario: 'Nhiệm vụ 3: Ô tô tăng tốc độ từ 30 km/h lên 90 km/h (tăng gấp 3 lần).',
    question: 'Động năng của ô tô đã tăng lên bao nhiêu lần?',
    options: [
      'Tăng lên gấp 9 lần (3² = 9)',
      'Tăng lên gấp 3 lần',
      'Tăng lên gấp 6 lần',
      'Không thay đổi',
    ],
    correctIndex: 0,
    explanation: 'Động năng tỉ lệ với bình phương vận tốc: (3v)² = 9v² → Động năng tăng 9 lần!',
  },
  {
    id: 'det_l2_4',
    scenario: 'Nhiệm vụ 4: Một vật nằm yên trên sàn tầng 3 của ngôi trường cao 10 mét so với mặt sân trường.',
    question: 'Nếu chọn mặt sàn tầng 3 làm mốc thế năng thì thế năng của vật bằng bao nhiêu?',
    options: [
      'Bằng 0 J',
      'Luôn bằng trọng lượng P nhân với 10 m',
      'Bằng vô cùng lớn',
      'Không thể xác định được',
    ],
    correctIndex: 0,
    explanation: 'Thế năng phụ thuộc vào mốc quy ước. Nếu chọn mặt sàn tầng 3 làm mốc (h = 0) thì Wt = mgh = 0 J.',
  },
];

export const InteractiveGames: React.FC<InteractiveGamesProps> = ({ 
  onAddXP,
  onProceedToPractice,
  onBackToSummary,
  activeLessonId = 1 
}) => {
  const [activeGame, setActiveGame] = useState<'detective' | 'report_master'>('detective');
  const lessonModule = getLessonModule(activeLessonId);
  const missionsSource = lessonModule.games && lessonModule.games.length > 0 ? lessonModule.games : (activeLessonId === 2 ? DETECTIVE_MISSIONS_LESSON_2 : DETECTIVE_MISSIONS_LESSON_1);

  // Xáo trộn đáp án cân bằng A, B, C, D cho bộ câu hỏi thám tử
  const [attemptCount, setAttemptCount] = useState(0);
  const shuffledMissionsMap = useMemo<Record<string, ShuffledQuestion>>(() => {
    return shuffleQuestionsWithBalancedAnswers(missionsSource);
  }, [activeLessonId, attemptCount]);

  const [detectiveStep, setDetectiveStep] = useState(0);
  const [detectiveSelectedOptId, setDetectiveSelectedOptId] = useState<string | null>(null);
  const [detectiveDone, setDetectiveDone] = useState(false);
  const [detectiveScore, setDetectiveScore] = useState(0);

  const currentMission = missionsSource[detectiveStep] || missionsSource[0];
  const shuffledMission = shuffledMissionsMap[currentMission.id];

  const handleDetectiveAnswer = (optionId: string) => {
    if (detectiveSelectedOptId !== null) return;
    setDetectiveSelectedOptId(optionId);
    const isCorrect = shuffledMission && optionId === shuffledMission.correctOptionId;
    if (isCorrect) {
      setDetectiveScore(prev => prev + 1);
      if (onAddXP) onAddXP(25);
    }
  };

  const nextDetectiveStep = () => {
    if (detectiveStep < missionsSource.length - 1) {
      setDetectiveStep(prev => prev + 1);
      setDetectiveSelectedOptId(null);
    } else {
      setDetectiveDone(true);
      if (onAddXP) onAddXP(50);
    }
  };

  const resetDetective = () => {
    setDetectiveStep(0);
    setDetectiveSelectedOptId(null);
    setDetectiveDone(false);
    setDetectiveScore(0);
    setAttemptCount(prev => prev + 1); // Fresh shuffle on retry
  };

  // Game 2: Report Master - Sắp xếp 8 phần báo cáo khoa học
  const initialSteps = [
    { id: 4, title: '4. Phương pháp' },
    { id: 1, title: '1. Tiêu đề' },
    { id: 6, title: '6. Thảo luận' },
    { id: 2, title: '2. Tóm tắt' },
    { id: 5, title: '5. Kết quả' },
    { id: 3, title: '3. Giới thiệu' },
    { id: 8, title: '8. Tài liệu tham khảo' },
    { id: 7, title: '7. Kết luận' },
  ];

  const [orderedSteps, setOrderedSteps] = useState(initialSteps);
  const [orderChecked, setOrderChecked] = useState(false);
  const [isOrderCorrect, setIsOrderCorrect] = useState(false);

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newSteps = [...orderedSteps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSteps.length) return;
    const temp = newSteps[index];
    newSteps[index] = newSteps[targetIndex];
    newSteps[targetIndex] = temp;
    setOrderedSteps(newSteps);
    setOrderChecked(false);
  };

  const checkOrder = () => {
    const correct = orderedSteps.every((step, idx) => step.id === idx + 1);
    setIsOrderCorrect(correct);
    setOrderChecked(true);
    if (correct && onAddXP) {
      onAddXP(80);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header & Game Switcher */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
              Chặng 4: Trò Chơi Tương Tác KHTN 9
            </span>
            <span className="text-xs text-slate-500">Học mà chơi, chơi mà học</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            {activeLessonId === 2 ? 'Đấu Trí Cơ Học & Thử Thách Năng Lượng' : 'Thám Tử Khoa Học & Sắp Xếp Báo Cáo'}
          </h2>
        </div>

        {/* Game Tabs */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveGame('detective')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer min-h-[40px] ${
              activeGame === 'detective'
                ? 'bg-white text-purple-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Game 1: Thám Tử Phòng Lab</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveGame('report_master')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer min-h-[40px] ${
              activeGame === 'report_master'
                ? 'bg-white text-purple-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Game 2: Cấu Trúc Báo Cáo</span>
          </button>
        </div>
      </div>

      {/* Game 1: Detective */}
      {activeGame === 'detective' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6">
          {!detectiveDone ? (
            <>
              {/* Mission Progress */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="text-xs font-bold text-purple-700 uppercase tracking-wider flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  <span>Nhiệm vụ {detectiveStep + 1} / {missionsSource.length}</span>
                </div>
                <div className="text-xs text-slate-500 font-bold">
                  Điểm: <span className="text-emerald-600 font-black">{detectiveScore}</span> / {missionsSource.length}
                </div>
              </div>

              {/* Scenario Context */}
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 text-sm text-purple-950 font-medium">
                {currentMission.scenario}
              </div>

              {/* Question */}
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-base md:text-lg">
                  {currentMission.question}
                </h3>
                <p className="text-xs text-slate-500">
                  (Đáp án đúng được phân bố ngẫu nhiên A/B/C/D. Chọn 1 đáp án để giải quyết tình huống:)
                </p>
              </div>

              {/* Shuffled Options */}
              <div className="space-y-3">
                {shuffledMission && shuffledMission.options.map((opt, optIdx) => {
                  const isSelected = detectiveSelectedOptId === opt.id;
                  const hasAnswered = detectiveSelectedOptId !== null;
                  const isCorrect = opt.isCorrect;
                  const letter = String.fromCharCode(65 + optIdx);

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleDetectiveAnswer(opt.id)}
                      disabled={hasAnswered}
                      className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-start gap-3 min-h-[52px] cursor-pointer ${
                        !hasAnswered
                          ? 'border-slate-200 bg-white hover:border-purple-400 hover:bg-purple-50/40 text-slate-800 active:scale-[0.99]'
                          : isSelected
                            ? isCorrect
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-xs ring-2 ring-emerald-400'
                              : 'border-red-400 bg-red-50 text-red-950 shadow-xs ring-2 ring-red-300'
                            : isCorrect
                              ? 'border-emerald-300 bg-emerald-50/60 text-slate-800'
                              : 'border-slate-200 opacity-60 text-slate-500 bg-white'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {hasAnswered && isSelected ? (
                          isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )
                        ) : (
                          <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${
                            hasAnswered && isCorrect ? 'border-emerald-500 bg-emerald-100 text-emerald-800' : 'border-slate-300 bg-slate-50 text-slate-600'
                          }`}>
                            {letter}
                          </span>
                        )}
                      </div>
                      <div className="space-y-1">
                        <div>{opt.text}</div>
                        {hasAnswered && isSelected && (
                          <p className={`text-xs mt-2 pt-2 border-t font-normal ${
                            isCorrect ? 'border-emerald-200 text-emerald-800' : 'border-red-200 text-red-800'
                          }`}>
                            {currentMission.explanation}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Next Step Button */}
              {detectiveSelectedOptId !== null && (
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={nextDetectiveStep}
                    className="bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold text-xs md:text-sm px-6 py-3 rounded-xl shadow-xs transition-all flex items-center gap-2 min-h-[48px] cursor-pointer"
                  >
                    <span>{detectiveStep < missionsSource.length - 1 ? 'Nhiệm vụ tiếp theo' : 'Xem kết quả thám tử'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Chúc mừng em đã hoàn thành thử thách Thám Tử Phòng Lab!
              </h3>
              <p className="text-sm text-slate-600">
                Em đã giải mã chính xác <strong>{detectiveScore} / {missionsSource.length}</strong> tình huống khoa học.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={resetDetective}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold flex items-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Chơi lại (Xáo trộn mới)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveGame('report_master')}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 text-white hover:bg-purple-700 text-xs font-bold shadow-xs flex items-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <span>Chuyển sang Game 2: Cấu trúc báo cáo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Game 2: Report Master */}
      {activeGame === 'report_master' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base md:text-lg flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Sắp xếp thứ tự chuẩn 8 phần của Báo cáo khoa học (SGK Trang 9)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Bấm nút mũi tên <strong>Lên</strong> hoặc <strong>Xuống</strong> để di chuyển các phần về đúng thứ tự chuẩn:
            </p>
          </div>

          <div className="space-y-2">
            {orderedSteps.map((step, idx) => (
              <div
                key={step.id}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs md:text-sm font-semibold text-slate-800"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span>{step.title}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => moveStep(idx, 'up')}
                    disabled={idx === 0}
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
                    title="Di chuyển lên"
                  >
                    <MoveUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveStep(idx, 'down')}
                    disabled={idx === orderedSteps.length - 1}
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
                    title="Di chuyển xuống"
                  >
                    <MoveDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Check */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={checkOrder}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs md:text-sm px-6 py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Kiểm tra kết quả sắp xếp</span>
            </button>

            {orderChecked && (
              <div className={`text-xs font-bold p-3 rounded-xl ${isOrderCorrect ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                {isOrderCorrect 
                  ? '🎉 CHÍNH XÁC 100%! Cấu trúc 8 phần hoàn hảo theo SGK (+80 XP)' 
                  : '❌ Thứ tự chưa chính xác! Em hãy xem lại bảng thứ tự trang 9 SGK nhé.'}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToSummary}
          className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 min-h-[48px] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Chặng 3: Kiến Thức</span>
        </button>

        <button
          type="button"
          onClick={onProceedToPractice}
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs md:text-sm font-bold shadow-xs transition-all flex items-center gap-2 min-h-[48px] cursor-pointer"
        >
          <span>Vào Chặng 5: Luyện Tập (3 Mức Độ)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
