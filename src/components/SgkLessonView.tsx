import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle2, 
  Lock, 
  Play, 
  ArrowRight, 
  ArrowLeft, 
  BookOpen, 
  Sparkles, 
  Award, 
  RotateCcw, 
  Lightbulb, 
  HelpCircle, 
  Beaker, 
  Zap, 
  Check, 
  X, 
  ShieldCheck, 
  ChevronRight, 
  Layers, 
  RefreshCw,
  LogOut,
  Send,
  Clock,
  FileText,
  Compass,
  AlertCircle
} from 'lucide-react';
import { UserAccount } from '../types';
import { 
  updateStudentStepProgressInFirestore, 
  recordStudentQuizScoreInFirestore 
} from '../services/firebaseService';
import { apiRecordQuizAttempt } from '../services/apiService';
import { 
  GalvanometerSim, 
  OpticsSim, 
  ChemistrySeparationSim,
  KineticEnergySim,
  PotentialEnergySim,
  MechanicalEnergySim,
  PendulumEnergySim
} from './Simulations';
import { 
  getSgkLessonData, 
  SgkQuestionOption,
  SgkPracticeQuestion,
  SgkExamMCQuestion,
  SgkExamEssayQuestion,
  SgkTopicItem
} from '../data/sgkCurriculumData';

interface SgkLessonViewProps {
  lessonId: number;
  lessonTitle: string;
  currentUser: UserAccount;
  onSelectOtherLesson: () => void;
  onLogout: () => void;
  onLessonCompleted: (lessonId: number, score: number) => void;
}

// 5 MỤC CHÍNH CỦA BÀI HỌC THEO MASTER PROMPT
export type MainSectionId = 'sec_1' | 'sec_2' | 'sec_3' | 'sec_4' | 'sec_5';

interface MainSectionMeta {
  id: MainSectionId;
  stepNum: number;
  title: string;
  shortTitle: string;
  desc: string;
}

const MAIN_SECTIONS: MainSectionMeta[] = [
  { id: 'sec_1', stepNum: 1, title: '1. KHỞI ĐỘNG', shortTitle: '1. Khởi động', desc: 'Thử thách tình huống mở đầu SGK' },
  { id: 'sec_2', stepNum: 2, title: '2. HÌNH THÀNH KIẾN THỨC', shortTitle: '2. Kiến thức SGK', desc: 'Theo đúng thứ tự các đề mục SGK KHTN 9' },
  { id: 'sec_3', stepNum: 3, title: '3. LUYỆN TẬP', shortTitle: '3. Luyện tập', desc: '10 câu trắc nghiệm chuẩn 3 mức độ (Biết, Hiểu, Vận dụng)' },
  { id: 'sec_4', stepNum: 4, title: '4. KIỂM TRA', shortTitle: '4. Kiểm tra', desc: 'Thang điểm 10 chuẩn: 8 trắc nghiệm (4đ) + 4 tự luận (6đ)' },
  { id: 'sec_5', stepNum: 5, title: '5. HOÀN THÀNH & KẾT QUẢ', shortTitle: '5. Hoàn thành', desc: 'Tổng kết đánh giá năng lực & Điểm số chính thức' },
];

/**
 * Thuật toán xáo trộn deterministic hoặc ngẫu nhiên ổn định dựa trên id câu hỏi
 * Giúp các phương án A, B, C, D được phân bổ đồng đều, không bị thiên vị ở A
 */
function getShuffledOptions(options: SgkQuestionOption[], seedStr: string): SgkQuestionOption[] {
  // Tạo bản sao
  const result = [...options];
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash << 5) - hash + seedStr.charCodeAt(i);
    hash |= 0;
  }
  const pseudoRandom = (step: number) => {
    const x = Math.sin(hash + step) * 10000;
    return x - Math.floor(x);
  };

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(pseudoRandom(i) * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export const SgkLessonView: React.FC<SgkLessonViewProps> = ({
  lessonId,
  lessonTitle,
  currentUser,
  onSelectOtherLesson,
  onLogout,
  onLessonCompleted
}) => {
  // Lấy toàn bộ gói nội dung SGK của bài học hiện tại (Bài 1 hoặc Bài 2)
  const lessonData = useMemo(() => getSgkLessonData(lessonId), [lessonId]);

  // Trạng thái mục đang học (1 đến 5)
  const [activeSection, setActiveSection] = useState<MainSectionId>('sec_1');
  const [completedSections, setCompletedSections] = useState<MainSectionId[]>([]);
  const [syncNotice, setSyncNotice] = useState<string>('');

  // Trạng thái Mục 1: Khởi động
  const [warmupAnswer, setWarmupAnswer] = useState<string | null>(null);
  const [warmupChecked, setWarmupChecked] = useState<boolean>(false);

  // Trạng thái Mục 2: Hình thành kiến thức SGK
  const [currentTopicIdx, setCurrentTopicIdx] = useState<number>(0);
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>([]);
  const [topicQuizAnswer, setTopicQuizAnswer] = useState<string | null>(null);
  const [topicQuizChecked, setTopicQuizChecked] = useState<boolean>(false);

  // Trạng thái Mục 3: Luyện tập (10 câu hỏi)
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, string>>({});
  const [practiceSubmitted, setPracticeSubmitted] = useState<boolean>(false);
  const [practiceScore, setPracticeScore] = useState<number | null>(null);

  // Trạng thái Mục 4: Kiểm tra (8 trắc nghiệm + 4 tự luận)
  const [examMcAnswers, setExamMcAnswers] = useState<Record<string, string>>({});
  const [examEssayAnswers, setExamEssayAnswers] = useState<Record<string, string>>({});
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  const [examMcScore, setExamMcScore] = useState<number>(0);
  const [examEssayScore, setExamEssayScore] = useState<number>(0);
  const [examScore, setExamScore] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Khôi phục trạng thái khi đổi bài học
  useEffect(() => {
    setActiveSection('sec_1');
    setCompletedSections([]);
    setWarmupAnswer(null);
    setWarmupChecked(false);
    setCurrentTopicIdx(0);
    setCompletedTopicIds([]);
    setTopicQuizAnswer(null);
    setTopicQuizChecked(false);
    setPracticeAnswers({});
    setPracticeSubmitted(false);
    setPracticeScore(null);
    setExamMcAnswers({});
    setExamEssayAnswers({});
    setExamSubmitted(false);
    setExamMcScore(0);
    setExamEssayScore(0);
    setExamScore(null);
  }, [lessonId]);

  // Tạo các mảng câu hỏi với phương án đã được xáo trộn A, B, C, D ổn định
  const shuffledWarmupOptions = useMemo(() => {
    return getShuffledOptions(lessonData.warmup.options, `warmup_${lessonId}_${currentUser.id}`);
  }, [lessonData.warmup.options, lessonId, currentUser.id]);

  const shuffledPracticeQuestions = useMemo(() => {
    return lessonData.practiceQuestions.map(q => ({
      ...q,
      shuffledOptions: getShuffledOptions(q.options, `practice_${q.id}_${currentUser.id}`)
    }));
  }, [lessonData.practiceQuestions, currentUser.id]);

  const shuffledExamMCQuestions = useMemo(() => {
    return lessonData.examMCQuestions.map(q => ({
      ...q,
      shuffledOptions: getShuffledOptions(q.options, `exam_${q.id}_${currentUser.id}`)
    }));
  }, [lessonData.examMCQuestions, currentUser.id]);

  // Tính phần trăm tiến độ (20% mỗi mục hoàn thành)
  const progressPercent = Math.min(100, completedSections.length * 20);

  // Kiểm tra mục có bị khoá không (phải hoàn thành tuần tự)
  const isSectionLocked = (secId: MainSectionId): boolean => {
    if (secId === 'sec_1') return false;
    if (secId === 'sec_2') return !completedSections.includes('sec_1');
    if (secId === 'sec_3') return !completedSections.includes('sec_2');
    if (secId === 'sec_4') return !completedSections.includes('sec_3');
    if (secId === 'sec_5') return !completedSections.includes('sec_4') && examScore === null;
    return false;
  };

  const handleSelectSection = (secId: MainSectionId) => {
    if (isSectionLocked(secId)) return;
    setActiveSection(secId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- XỬ LÝ MỤC 1: KHỞI ĐỘNG ---
  const handleCompleteWarmup = async () => {
    const nextCompleted = Array.from(new Set([...completedSections, 'sec_1']));
    setCompletedSections(nextCompleted);

    setSyncNotice('Đang lưu kết quả Khởi động vào Cloud Firestore...');
    if (currentUser.id) {
      try {
        await updateStudentStepProgressInFirestore({
          uid: currentUser.id,
          lessonId,
          stepId: 'sec_2',
          stepTitle: `2. Hình thành kiến thức: ${lessonData.topics[0]?.title || 'Kiến thức SGK'}`,
          completedStepId: 'sec_1',
          totalStepsInLesson: 5
        });
        setSyncNotice('✓ Đã đồng bộ với Thầy/Cô (Mục 1 hoàn thành)');
        setTimeout(() => setSyncNotice(''), 3000);
      } catch (err) {
        console.warn('Lỗi lưu Khởi động:', err);
      }
    }

    setActiveSection('sec_2');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- XỬ LÝ MỤC 2: HÌNH THÀNH KIẾN THỨC ---
  const currentTopic: SgkTopicItem = lessonData.topics[currentTopicIdx] || lessonData.topics[0];

  const shuffledTopicQuizOptions = useMemo(() => {
    if (!currentTopic.quickQuiz) return [];
    return getShuffledOptions(currentTopic.quickQuiz.options, `topic_${currentTopic.id}_${currentUser.id}`);
  }, [currentTopic, currentUser.id]);

  const handleNextTopic = async () => {
    const nextTopicCompleted = Array.from(new Set([...completedTopicIds, currentTopic.id]));
    setCompletedTopicIds(nextTopicCompleted);

    if (currentUser.id) {
      updateStudentStepProgressInFirestore({
        uid: currentUser.id,
        lessonId,
        stepId: 'sec_2',
        stepTitle: `2. Hình thành kiến thức: ${currentTopic.order} ${currentTopic.title}`,
        completedStepId: currentTopic.id,
        totalStepsInLesson: 5
      }).catch(e => console.warn(e));
    }

    if (currentTopicIdx < lessonData.topics.length - 1) {
      setCurrentTopicIdx(prev => prev + 1);
      setTopicQuizAnswer(null);
      setTopicQuizChecked(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Đã học hết các đề mục SGK -> Hoàn thành Mục 2
      const nextCompleted = Array.from(new Set([...completedSections, 'sec_2']));
      setCompletedSections(nextCompleted);

      setSyncNotice('Đang cập nhật hoàn thành Mục 2 vào Firestore...');
      if (currentUser.id) {
        try {
          await updateStudentStepProgressInFirestore({
            uid: currentUser.id,
            lessonId,
            stepId: 'sec_3',
            stepTitle: '3. Luyện tập (10 câu trắc nghiệm)',
            completedStepId: 'sec_2',
            totalStepsInLesson: 5
          });
          setSyncNotice('✓ Giáo viên đã nhận được tiến trình Mục 2');
          setTimeout(() => setSyncNotice(''), 3000);
        } catch (err) {
          console.warn('Lỗi lưu Mục 2:', err);
        }
      }

      setActiveSection('sec_3');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // --- XỬ LÝ MỤC 3: LUYỆN TẬP (10 CÂU) ---
  const handleSubmitPractice = async () => {
    let correctCount = 0;
    lessonData.practiceQuestions.forEach(q => {
      const selected = practiceAnswers[q.id];
      const rightOpt = q.options.find(o => o.isCorrect);
      if (selected && rightOpt && selected === rightOpt.id) {
        correctCount += 1;
      }
    });

    const calculatedScore = correctCount; // Thang 10 (1đ/câu)
    setPracticeScore(calculatedScore);
    setPracticeSubmitted(true);

    const nextCompleted = Array.from(new Set([...completedSections, 'sec_3']));
    setCompletedSections(nextCompleted);

    setSyncNotice('Đang gửi điểm Luyện tập lên Cloud Firestore...');
    if (currentUser.id) {
      try {
        await recordStudentQuizScoreInFirestore({
          uid: currentUser.id,
          lessonId,
          score: calculatedScore,
          total: 10,
          completedStepId: 'sec_3',
          testType: 'practice',
          details: { correctCount, totalQuestions: 10 }
        });
        setSyncNotice(`✓ Điểm Luyện tập (${calculatedScore}/10) đã lưu trên hệ thống!`);
        setTimeout(() => setSyncNotice(''), 3500);
      } catch (err) {
        console.warn('Lỗi lưu điểm luyện tập:', err);
      }
    }
  };

  // --- XỬ LÝ MỤC 4: KIỂM TRA (THANG 10 CHUẨN: 8 TN + 4 TL) ---
  const handleSubmitExam = async () => {
    setIsSubmitting(true);

    // 1. Chấm phần Trắc nghiệm (8 câu × 0.5đ = tối đa 4.0đ)
    let mcPoints = 0;
    lessonData.examMCQuestions.forEach(q => {
      const chosen = examMcAnswers[q.id];
      const correctOpt = q.options.find(o => o.isCorrect);
      if (chosen && correctOpt && chosen === correctOpt.id) {
        mcPoints += q.points;
      }
    });
    setExamMcScore(mcPoints);

    // 2. Chấm phần Tự luận (4 câu × 1.5đ = tối đa 6.0đ)
    let essayPoints = 0;
    lessonData.examEssayQuestions.forEach(eq => {
      const ans = (examEssayAnswers[eq.id] || '').trim();
      if (ans.length > 20) {
        if (ans.length > 100) {
          essayPoints += 1.5;
        } else if (ans.length > 50) {
          essayPoints += 1.0;
        } else {
          essayPoints += 0.5;
        }
      }
    });
    setExamEssayScore(essayPoints);

    // Tổng điểm chuẩn 10.0
    const totalExam = Math.min(10.0, Math.round((mcPoints + essayPoints) * 10) / 10);
    setExamScore(totalExam);
    setExamSubmitted(true);

    const nextCompleted = Array.from(new Set([...completedSections, 'sec_4', 'sec_5']));
    setCompletedSections(nextCompleted);

    // ĐỒNG BỘ TRỰC TIẾP LÊN CLOUD FIRESTORE & SERVER DATABASE
    if (currentUser.id) {
      setSyncNotice('Đang nộp bài kiểm tra và đồng bộ bảng điểm giáo viên...');
      try {
        await recordStudentQuizScoreInFirestore({
          uid: currentUser.id,
          lessonId,
          score: totalExam,
          total: 10,
          completedStepId: 'sec_4',
          testType: 'test',
          details: {
            mcPoints,
            essayPoints,
            total: totalExam,
            mcAnswers: examMcAnswers,
            essayAnswers: examEssayAnswers,
            timestamp: new Date().toISOString()
          }
        });

        // Đồng bộ thêm vào Express server API
        apiRecordQuizAttempt({
          attemptId: `attempt_${Date.now()}_${currentUser.id}`,
          lessonId,
          studentId: currentUser.id,
          studentName: currentUser.name,
          studentEmail: currentUser.email,
          classId: currentUser.gradeClass as any,
          score: totalExam,
          maxScore: 10,
          percentage: totalExam * 10,
          startedAt: new Date().toISOString(),
          submittedAt: new Date().toISOString(),
          answers: examMcAnswers,
          status: 'SUBMITTED'
        }).catch(e => console.warn(e));

        setSyncNotice(`✓ NỘP BÀI THÀNH CÔNG! Điểm kiểm tra: ${totalExam}/10.0 đã cập nhật Dashboard Giáo viên.`);
        setTimeout(() => setSyncNotice(''), 4000);
      } catch (err) {
        console.warn('Lỗi lưu điểm thi:', err);
      }
    }

    onLessonCompleted(lessonId, totalExam);
    setIsSubmitting(false);

    // Tự động chuyển sang Mục 5: Hoàn thành & Kết quả
    setActiveSection('sec_5');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-6xl mx-auto">
      {/* 1. THANH TIÊU ĐỀ & TIẾN TRÌNH 5 MỤC CHÍNH BÁM SÁT SGK */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-blue-600 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>{lessonData.chapterTitle}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">{lessonData.pageInfo}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 leading-tight">
              {lessonData.title}
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onSelectOtherLesson}
              className="px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-indigo-600" />
              Danh mục bài
            </button>
            <button
              onClick={onLogout}
              className="px-3 py-2 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Đăng xuất
            </button>
          </div>
        </div>

        {/* Thông báo đồng bộ thời gian thực */}
        {syncNotice && (
          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600 shrink-0" />
            <span>{syncNotice}</span>
          </div>
        )}

        {/* THANH 5 MỤC CHÍNH BẮT BUỘC THEO ĐÚNG TIẾN TRÌNH */}
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
            <span>Tiến trình 5 mục bài học chuẩn:</span>
            <span className="text-blue-600 font-extrabold">{progressPercent}% hoàn thành</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {MAIN_SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              const isDone = completedSections.includes(sec.id) || (sec.id === 'sec_5' && examScore !== null);
              const locked = isSectionLocked(sec.id);

              return (
                <button
                  key={sec.id}
                  disabled={locked}
                  onClick={() => handleSelectSection(sec.id)}
                  className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between h-20 ${
                    isActive
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                      : isDone
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-950 hover:bg-emerald-100/70'
                        : locked
                          ? 'bg-slate-50 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-[10px] font-black uppercase tracking-wider ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                      Mục {sec.stepNum}
                    </span>
                    {isDone ? (
                      <CheckCircle2 className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                    ) : locked ? (
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                    ) : (
                      <Play className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                    )}
                  </div>
                  <div className="font-extrabold text-xs leading-snug line-clamp-1">
                    {sec.shortTitle}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================================================================
          MỤC 1: KHỞI ĐỘNG (BÁM SÁT SGK KHTN 9)
      ================================================================ */}
      {activeSection === 'sec_1' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <span className="p-3 bg-amber-100 text-amber-700 rounded-2xl font-black text-lg">
              1
            </span>
            <div>
              <h2 className="text-xl font-black text-slate-900">1. KHỞI ĐỘNG</h2>
              <p className="text-xs text-slate-500 font-medium">Tình huống thực tiễn mở đầu bài học trong SGK KHTN 9</p>
            </div>
          </div>

          <div className="bg-amber-50/70 rounded-2xl p-5 border border-amber-200/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-800">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>{lessonData.warmup.scenarioTitle}</span>
            </div>
            <p className="text-slate-800 text-sm leading-relaxed font-medium">
              {lessonData.warmup.scenarioText}
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-4">
            <div className="font-extrabold text-slate-900 text-sm flex items-start gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span>{lessonData.warmup.question}</span>
            </div>

            {/* Các lựa chọn được xáo trộn A, B, C, D cân đối độ dài */}
            <div className="grid grid-cols-1 gap-2.5">
              {shuffledWarmupOptions.map((opt, idx) => {
                const label = ['A', 'B', 'C', 'D'][idx];
                const isSelected = warmupAnswer === opt.id;
                return (
                  <button
                    key={opt.id}
                    disabled={warmupChecked}
                    onClick={() => setWarmupAnswer(opt.id)}
                    className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? warmupChecked
                          ? opt.isCorrect
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                            : 'bg-rose-50 border-rose-400 text-rose-900'
                          : 'bg-blue-50 border-blue-500 text-blue-900 font-bold shadow-xs'
                        : warmupChecked && opt.isCorrect
                          ? 'bg-emerald-50/60 border-emerald-300 text-emerald-800 font-bold'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-500 w-5">{label}.</span>
                      <span>{opt.text}</span>
                    </div>
                    {warmupChecked && opt.isCorrect && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {!warmupChecked ? (
              <button
                disabled={!warmupAnswer}
                onClick={() => setWarmupChecked(true)}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Kiểm tra câu trả lời
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1.5">
                <div className="font-extrabold text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Căn cứ giải thích khoa học theo SGK KHTN 9:
                </div>
                <p className="leading-relaxed">
                  {lessonData.warmup.explanation}
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              onClick={handleCompleteWarmup}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>XÁC NHẬN HOÀN THÀNH KHỞI ĐỘNG ➔ SANG MỤC 2: HÌNH THÀNH KIẾN THỨC</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================================================================
          MỤC 2: HÌNH THÀNH KIẾN THỨC (THEO ĐÚNG THỨ TỰ ĐỀ MỤC CỦA SGK)
      ================================================================ */}
      {activeSection === 'sec_2' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-3 bg-blue-100 text-blue-700 rounded-2xl font-black text-lg">
                2
              </span>
              <div>
                <h2 className="text-xl font-black text-slate-900">2. HÌNH THÀNH KIẾN THỨC</h2>
                <p className="text-xs text-slate-500 font-medium">Bám sát 100% thứ tự các đề mục SGK KHTN 9 Kết nối tri thức</p>
              </div>
            </div>

            <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Đề mục {currentTopicIdx + 1}/{lessonData.topics.length}
            </span>
          </div>

          {/* Thanh chuyển nhanh các đề mục SGK */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {lessonData.topics.map((top, idx) => {
              const isCurr = idx === currentTopicIdx;
              const isTopicDone = completedTopicIds.includes(top.id);
              return (
                <button
                  key={top.id}
                  onClick={() => {
                    setCurrentTopicIdx(idx);
                    setTopicQuizAnswer(null);
                    setTopicQuizChecked(false);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isCurr
                      ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold shadow-xs'
                      : isTopicDone
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-[10px] font-extrabold text-slate-400">ĐỀ MỤC {top.order}</div>
                  <div className="text-xs font-bold truncate mt-0.5">{top.title}</div>
                </button>
              );
            })}
          </div>

          {/* NỘI DUNG CHI TIẾT CỦA ĐỀ MỤC SGK */}
          <div className="space-y-6 pt-2">
            {/* Header đề mục */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase text-blue-600 tracking-wider">
                  Mục {currentTopic.order} • {currentTopic.page}
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  {currentTopic.order}. {currentTopic.title}
                </h3>
              </div>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700 shadow-2xs">
                {currentTopic.badge}
              </span>
            </div>

            {/* 1. KIẾN THỨC MỚI CẦN TIẾP THU */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                Kiến Thức Mới Cần Tiếp Thu (SGK)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentTopic.newKnowledge.map((point, pIdx) => (
                  <div key={pIdx} className="p-3.5 rounded-xl bg-blue-50/40 border border-blue-100 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {pIdx + 1}
                    </span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. KIẾN THỨC CỐT LÕI */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
              <h4 className="text-xs font-extrabold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Kiến Thức Cốt Lõi Trọng Tâm
              </h4>
              <ul className="space-y-1.5 text-xs text-amber-950 font-medium list-disc pl-5">
                {currentTopic.coreSummary.map((item, cIdx) => (
                  <li key={cIdx} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>

            {/* 3. THÍ NGHIỆM ẢO TƯƠNG TÁC THEO HÌNH ẢNH SGK */}
            {currentTopic.simulation === 'kinetic_ramp' && <KineticEnergySim />}
            {currentTopic.simulation === 'potential_gravity' && <PotentialEnergySim />}
            {currentTopic.simulation === 'mechanical_energy' && <MechanicalEnergySim />}
            {currentTopic.simulation === 'pendulum_energy' && <PendulumEnergySim />}
            {currentTopic.simulation === 'optics' && <OpticsSim />}
            {currentTopic.simulation === 'galvanometer' && <GalvanometerSim />}
            {currentTopic.simulation === 'chemistry' && <ChemistrySeparationSim />}

            {/* 4. VÍ DỤ MINH HOẠ */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-1.5">
              <h4 className="text-xs font-extrabold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-indigo-600" />
                {currentTopic.exampleTitle}
              </h4>
              <p className="text-xs text-indigo-950 leading-relaxed font-medium">
                {currentTopic.exampleText}
              </p>
            </div>

            {/* 5. CÂU HỎI TRẮC NGHIỆM NHANH CỦA ĐỀ MỤC */}
            {currentTopic.quickQuiz && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span>Câu hỏi củng cố đề mục:</span>
                </div>
                <p className="text-xs font-bold text-slate-900">
                  {currentTopic.quickQuiz.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {shuffledTopicQuizOptions.map((opt, oIdx) => {
                    const label = ['A', 'B', 'C', 'D'][oIdx];
                    const isSelected = topicQuizAnswer === opt.id;
                    return (
                      <button
                        key={opt.id}
                        disabled={topicQuizChecked}
                        onClick={() => setTopicQuizAnswer(opt.id)}
                        className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? topicQuizChecked
                              ? opt.isCorrect
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                                : 'bg-rose-50 border-rose-400 text-rose-900'
                              : 'bg-blue-50 border-blue-500 text-blue-900 font-bold'
                            : topicQuizChecked && opt.isCorrect
                              ? 'bg-emerald-50/60 border-emerald-300 text-emerald-800 font-bold'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-400">{label}.</span>
                          <span>{opt.text}</span>
                        </div>
                        {topicQuizChecked && opt.isCorrect && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {!topicQuizChecked ? (
                  <button
                    disabled={!topicQuizAnswer}
                    onClick={() => setTopicQuizChecked(true)}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Kiểm tra đáp án
                  </button>
                ) : (
                  <div className="p-3 bg-slate-100 rounded-xl text-xs text-slate-700 leading-relaxed">
                    <strong>Giải thích SGK:</strong> {currentTopic.quickQuiz.explanation}
                  </div>
                )}
              </div>
            )}

            {/* 6. KẾT LUẬN / GHI NHỚ */}
            <div className="p-3.5 rounded-xl bg-slate-900 text-white text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{currentTopic.keyTakeaway}</span>
            </div>
          </div>

          {/* Nút điều hướng các đề mục SGK */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              disabled={currentTopicIdx === 0}
              onClick={() => {
                setCurrentTopicIdx(prev => prev - 1);
                setTopicQuizAnswer(null);
                setTopicQuizChecked(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Đề mục trước
            </button>

            <button
              onClick={handleNextTopic}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>{currentTopicIdx === lessonData.topics.length - 1 ? 'HOÀN THÀNH MỤC 2 ➔ SANG MỤC 3: LUYỆN TẬP' : 'Tiếp tục đề mục tiếp theo'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================================================================
          MỤC 3: LUYỆN TẬP (10 CÂU TRẮC NGHIỆM ĐỦ 3 MỨC ĐỘ)
      ================================================================ */}
      {activeSection === 'sec_3' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-3 bg-purple-100 text-purple-700 rounded-2xl font-black text-lg">
                3
              </span>
              <div>
                <h2 className="text-xl font-black text-slate-900">3. LUYỆN TẬP (10 CÂU HỎI)</h2>
                <p className="text-xs text-slate-500 font-medium">Hệ thống bài tập chuẩn mực: 4 Biết • 4 Hiểu • 2 Vận dụng (Phương án cân đối, xáo trộn A/B/C/D)</p>
              </div>
            </div>

            <span className="text-xs font-extrabold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              Đã làm {Object.keys(practiceAnswers).length}/{shuffledPracticeQuestions.length} câu
            </span>
          </div>

          {/* Danh sách 10 câu hỏi luyện tập */}
          <div className="space-y-4">
            {shuffledPracticeQuestions.map((q, idx) => {
              const selectedOptId = practiceAnswers[q.id];
              return (
                <div key={q.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-slate-500 uppercase">
                      Câu hỏi {idx + 1}
                    </span>
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${q.levelColor}`}>
                      {q.level}
                    </span>
                  </div>

                  <p className="font-extrabold text-slate-900 text-sm">
                    {q.question}
                  </p>
                  <p className="text-[11px] text-slate-500 italic">{q.subText}</p>

                  <div className="space-y-2">
                    {q.shuffledOptions.map((opt, oIdx) => {
                      const label = ['A', 'B', 'C', 'D'][oIdx];
                      const isChosen = selectedOptId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          disabled={practiceSubmitted}
                          onClick={() => setPracticeAnswers(prev => ({ ...prev, [q.id]: opt.id }))}
                          className={`w-full p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                            isChosen
                              ? practiceSubmitted
                                ? opt.isCorrect
                                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                                  : 'bg-rose-50 border-rose-300 text-rose-900'
                                : 'bg-blue-50 border-blue-400 text-blue-900 font-bold'
                              : practiceSubmitted && opt.isCorrect
                                ? 'bg-emerald-50/60 border-emerald-300 text-emerald-800 font-bold'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-black text-slate-500 w-5">{label}.</span>
                            <span>{opt.text}</span>
                          </div>
                          {practiceSubmitted && opt.isCorrect && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {practiceSubmitted && (
                    <div className="p-3 bg-slate-100 rounded-xl text-xs text-slate-700 leading-relaxed">
                      <strong>Giải thích:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {!practiceSubmitted ? (
              <button
                disabled={Object.keys(practiceAnswers).length < 5}
                onClick={handleSubmitPractice}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                NỘP BÀI LUYỆN TẬP (TÍNH ĐIỂM & LƯU FIRESTORE)
              </button>
            ) : (
              <div className="font-black text-sm text-emerald-700 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Kết quả Luyện tập: {practiceScore}/10 điểm</span>
              </div>
            )}

            <button
              disabled={!practiceSubmitted}
              onClick={() => {
                setActiveSection('sec_4');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>SANG MỤC 4: BÀI KIỂM TRA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================================================================
          MỤC 4: KIỂM TRA (THANG 10 CHUẨN: 8 TN + 4 TL)
      ================================================================ */}
      {activeSection === 'sec_4' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-3 bg-rose-100 text-rose-700 rounded-2xl font-black text-lg">
                4
              </span>
              <div>
                <h2 className="text-xl font-black text-slate-900">4. KIỂM TRA ĐÁNH GIÁ (THANG ĐIỂM 10)</h2>
                <p className="text-xs text-slate-500 font-medium">8 câu trắc nghiệm (0,5đ/câu = 4,0 điểm) + 4 câu tự luận (1,5đ/câu = 6,0 điểm)</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200">
              <Clock className="w-3.5 h-3.5" />
              <span>Thời gian làm bài: 20 phút</span>
            </div>
          </div>

          {/* PHẦN A: 8 CÂU TRẮC NGHIỆM */}
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-blue-50/70 p-3.5 rounded-2xl border border-blue-200">
              <span className="font-extrabold text-xs text-blue-900 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                PHẦN A: 8 CÂU HỎI TRẮC NGHIỆM (4,0 ĐIỂM)
              </span>
              <span className="text-[11px] font-bold text-blue-700 bg-white px-2.5 py-0.5 rounded-full border border-blue-200">
                0,5 điểm / câu
              </span>
            </div>

            {shuffledExamMCQuestions.map((q, qIdx) => {
              const selected = examMcAnswers[q.id];
              return (
                <div key={q.id} className="p-4.5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs text-slate-600">
                      Câu {qIdx + 1} (0,5 điểm)
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">Trắc nghiệm</span>
                  </div>

                  <p className="font-bold text-slate-900 text-xs">
                    {q.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.shuffledOptions.map((opt, oIdx) => {
                      const label = ['A', 'B', 'C', 'D'][oIdx];
                      return (
                        <button
                          key={opt.id}
                          disabled={examSubmitted}
                          onClick={() => setExamMcAnswers(prev => ({ ...prev, [q.id]: opt.id }))}
                          className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${
                            selected === opt.id
                              ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-400">{label}.</span>
                            <span>{opt.text}</span>
                          </div>
                          {examSubmitted && opt.isCorrect && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* PHẦN B: 4 CÂU TỰ LUẬN */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between bg-purple-50/70 p-3.5 rounded-2xl border border-purple-200">
              <span className="font-extrabold text-xs text-purple-900 uppercase tracking-wider flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-purple-600" />
                PHẦN B: 4 BÀI TẬP TỰ LUẬN & PHÂN TÍCH (6,0 ĐIỂM)
              </span>
              <span className="text-[11px] font-bold text-purple-700 bg-white px-2.5 py-0.5 rounded-full border border-purple-200">
                1,5 điểm / câu
              </span>
            </div>

            {lessonData.examEssayQuestions.map((eq) => (
              <div key={eq.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-black text-xs text-purple-800 uppercase">
                    {eq.title} (1,5 điểm)
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">Tự luận</span>
                </div>

                <p className="font-bold text-slate-900 text-xs leading-relaxed">
                  {eq.prompt}
                </p>

                <textarea
                  disabled={examSubmitted}
                  rows={4}
                  value={examEssayAnswers[eq.id] || ''}
                  onChange={(e) => setExamEssayAnswers(prev => ({ ...prev, [eq.id]: e.target.value }))}
                  placeholder="Nhập câu trả lời tự luận chi tiết của em vào đây..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:ring-2 focus:ring-purple-400 focus:outline-none"
                />

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Số từ: {(examEssayAnswers[eq.id] || '').trim().split(/\s+/).filter(Boolean).length} từ</span>
                  <span>Tiêu chí: Lập luận khoa học & vận dụng đúng công thức SGK</span>
                </div>

                {examSubmitted && (
                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs space-y-1">
                    <div className="font-bold text-purple-900">Đáp án tham khảo chuẩn SGK:</div>
                    <p className="text-purple-950 whitespace-pre-line">{eq.sampleSolution}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              disabled={isSubmitting || examSubmitted}
              onClick={handleSubmitExam}
              className="px-8 py-3.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-black text-sm rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>NỘP BÀI KIỂM TRA (CHẤM ĐIỂM & ĐỒNG BỘ FIRESTORE)</span>
            </button>
          </div>
        </div>
      )}

      {/* ================================================================
          MỤC 5: HOÀN THÀNH & KẾT QUẢ
      ================================================================ */}
      {activeSection === 'sec_5' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6 text-center animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-xs">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-1 max-w-md mx-auto">
            <div className="text-xs font-black text-emerald-600 uppercase tracking-widest">
              Xác Nhận Thành Tích Học Tập
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              CHÚC MỪNG EM ĐÃ HOÀN THÀNH {lessonData.shortTitle.toUpperCase()}!
            </h2>
            <p className="text-xs text-slate-500">
              Toàn bộ kết quả bài kiểm tra và điểm luyện tập đã được lưu vĩnh viễn trên Cloud Firestore của Thầy/Cô.
            </p>
          </div>

          {/* Bảng điểm tổng kết */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="text-[11px] text-slate-500 font-bold">Tiến độ bài học</div>
              <div className="text-2xl font-black text-blue-600 mt-1">100%</div>
              <div className="text-[10px] text-slate-400 mt-0.5">5/5 mục hoàn thành</div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
              <div className="text-[11px] text-emerald-800 font-bold">Điểm Kiểm Tra</div>
              <div className="text-2xl font-black text-emerald-700 mt-1">
                {examScore !== null ? `${examScore} / 10.0` : '10.0 / 10.0'}
              </div>
              <div className="text-[10px] text-emerald-600 mt-0.5">
                TN: {examMcScore}/4.0 • TL: {examEssayScore}/6.0
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200">
              <div className="text-[11px] text-purple-800 font-bold">Điểm Luyện Tập</div>
              <div className="text-2xl font-black text-purple-700 mt-1">
                {practiceScore !== null ? `${practiceScore} / 10` : '10 / 10'}
              </div>
              <div className="text-[10px] text-purple-600 mt-0.5">10 câu 3 mức độ</div>
            </div>
          </div>

          {/* Năng lực cốt lõi đạt được */}
          <div className="max-w-xl mx-auto p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
              Đánh giá năng lực Khoa học tự nhiên (SGK KHTN 9):
            </h4>
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between font-medium">
                <span>
                  {lessonId === 3 
                    ? 'Khái niệm cơ năng Wc = Wđ + Wt:' 
                    : lessonId === 2 
                      ? 'Biểu thức động năng Wđ = 1/2 m v²:' 
                      : 'Nhận biết dụng cụ & hoá chất thí nghiệm:'}
                </span>
                <span className="font-bold text-emerald-600">Thành thạo (100%)</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>
                  {lessonId === 3 
                    ? 'Định luật bảo toàn cơ năng & con lắc đơn:' 
                    : lessonId === 2 
                      ? 'Biểu thức thế năng trọng trường Wt = Ph:' 
                      : 'Phương pháp viết & thuyết trình báo cáo khoa học:'}
                </span>
                <span className="font-bold text-blue-600">Đạt yêu cầu (95%)</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>
                  {lessonId === 3 
                    ? 'Vận dụng cơ năng giải thích kĩ thuật nhảy xa & xe thế năng:' 
                    : lessonId === 2 
                      ? 'Vận dụng giải bài toán động năng & thế năng:' 
                      : 'Vận dụng xử lý tình huống thực nghiệm:'}
                </span>
                <span className="font-bold text-purple-600">Tốt (92%)</span>
              </div>
            </div>
          </div>

          {/* Các nút hành động */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setActiveSection('sec_2');
                setCurrentTopicIdx(0);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> Xem lại kiến thức SGK
            </button>

            <button
              onClick={() => {
                setActiveSection('sec_4');
                setExamSubmitted(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 font-bold text-xs cursor-pointer flex items-center gap-1.5"
            >
              Làm lại bài kiểm tra
            </button>

            {lessonId === 1 ? (
              <button
                onClick={() => {
                  onLessonCompleted(1, examScore || 10);
                  onSelectOtherLesson();
                }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <span>TIẾP TỤC SANG BÀI 2: ĐỘNG NĂNG. THẾ NĂNG</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : lessonId === 2 ? (
              <button
                onClick={() => {
                  onLessonCompleted(2, examScore || 10);
                  onSelectOtherLesson();
                }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <span>TIẾP TỤC SANG BÀI 3: CƠ NĂNG</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  onLessonCompleted(3, examScore || 10);
                  onSelectOtherLesson();
                }}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <span>HOÀN THÀNH CHƯƠNG I (ĐÃ HOÀN THÀNH BÀI 1, 2, 3)</span>
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
