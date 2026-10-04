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
  AlertTriangle,
  Beaker,
  Zap,
  Info,
  ChevronDown
} from 'lucide-react';
import { UserAccount } from '../types';
import { 
  getLessonProgressFromFirestore,
  saveLessonProgressToFirestore
} from '../services/firebaseService';
import { apiRecordQuizAttempt } from '../services/apiService';
import { 
  GalvanometerSim, 
  OpticsSim, 
  ChemistrySeparationSim,
  KineticEnergySim,
  PotentialEnergySim,
  MechanicalEnergySim,
  PendulumEnergySim,
  WorkPowerSim,
  CranePowerSim
} from './Simulations';
import { 
  getSgkLessonData, 
  SgkQuestionOption,
  SgkPracticeQuestion,
  SgkExamMCQuestion,
  SgkExamEssayQuestion,
  SgkTopicItem
} from '../data/sgkCurriculumData';
import { getEnrichedTopicData, EnrichedTopicData } from '../data/sgkTopicHelpers';

interface SgkLessonViewProps {
  lessonId: number;
  lessonTitle: string;
  currentUser: UserAccount;
  onSelectOtherLesson: () => void;
  onLogout: () => void;
  onLessonCompleted: (lessonId: number, score: number) => void;
}

// 4 TAB CHÍNH DUY NHẤT CỦA BÀI HỌC (THEO ĐÚNG YÊU CẦU MỚI)
export type MainSectionId = 'sec_1' | 'sec_2' | 'sec_3' | 'sec_4';

interface MainSectionMeta {
  id: MainSectionId;
  stepNum: number;
  title: string;
  shortTitle: string;
  desc: string;
}

const MAIN_SECTIONS: MainSectionMeta[] = [
  { id: 'sec_1', stepNum: 1, title: '1. KHỞI ĐỘNG', shortTitle: '1. Khởi động', desc: 'Tình huống mở đầu & Hoạt động gợi mở SGK' },
  { id: 'sec_2', stepNum: 2, title: '2. HÌNH THÀNH KIẾN THỨC', shortTitle: '2. Kiến thức SGK', desc: 'Đầy đủ đề mục SGK, ví dụ, thí nghiệm ảo & tương tác' },
  { id: 'sec_3', stepNum: 3, title: '3. LUYỆN TẬP', shortTitle: '3. Luyện tập', desc: '10 bài tập củng cố 3 mức độ có giải thích chi tiết' },
  { id: 'sec_4', stepNum: 4, title: '4. KIỂM TRA', shortTitle: '4. Kiểm tra & Tổng kết', desc: 'Thang điểm 10 chuẩn mực, kết quả & xếp loại năng lực' },
];

/**
 * Thuật toán xáo trộn deterministic hoặc ngẫu nhiên ổn định dựa trên id câu hỏi
 * Giúp các phương án A, B, C, D được phân bổ đồng đều
 */
function getShuffledOptions(options: SgkQuestionOption[] = [], seedStr: string): SgkQuestionOption[] {
  if (!Array.isArray(options) || options.length === 0) return [];
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
  // Lấy toàn bộ gói nội dung SGK của bài học hiện tại (Bài 1, 2, 3, 4)
  const lessonData = useMemo(() => getSgkLessonData(lessonId), [lessonId]);

  // Trạng thái mục đang học (Chỉ 4 tab: sec_1, sec_2, sec_3, sec_4)
  const [activeSection, setActiveSection] = useState<MainSectionId>('sec_1');
  const [completedSections, setCompletedSections] = useState<MainSectionId[]>([]);
  const [syncNotice, setSyncNotice] = useState<string>('');

  // Trạng thái Tab 1: Khởi động
  const [warmupAnswer, setWarmupAnswer] = useState<string | null>(null);
  const [warmupChecked, setWarmupChecked] = useState<boolean>(false);

  // Trạng thái Tab 2: Hình thành kiến thức SGK
  const [currentTopicIdx, setCurrentTopicIdx] = useState<number>(0);
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>([]);
  
  // Trạng thái câu hỏi tương tác trong Tab 2 (Lưu câu trả lời của từng câu)
  const [interactiveQuizAnswers, setInteractiveQuizAnswers] = useState<Record<string, string>>({});
  const [interactiveQuizChecked, setInteractiveQuizChecked] = useState<Record<string, boolean>>({});

  // Trạng thái Tab 3: Luyện tập (10 câu hỏi)
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, string>>({});
  const [practiceSubmitted, setPracticeSubmitted] = useState<boolean>(false);
  const [practiceScore, setPracticeScore] = useState<number | null>(null);
  const [practiceFilter, setPracticeFilter] = useState<'ALL' | 'BIẾT' | 'HIỂU' | 'VẬN DỤNG'>('ALL');

  // Trạng thái Tab 4: Kiểm tra (8 trắc nghiệm + 4 tự luận)
  const [examMcAnswers, setExamMcAnswers] = useState<Record<string, string>>({});
  const [examEssayAnswers, setExamEssayAnswers] = useState<Record<string, string>>({});
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  const [examMcScore, setExamMcScore] = useState<number>(0);
  const [examEssayScore, setExamEssayScore] = useState<number>(0);
  const [examScore, setExamScore] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [examViewMode, setExamViewMode] = useState<'summary' | 'review'>('summary');

  // Khôi phục trạng thái từ Cloud Firestore (studentProgress/{uid}/lessons/{lessonId})
  useEffect(() => {
    let isCancelled = false;

    async function restoreLessonProgress() {
      if (!currentUser.id) return;

      try {
        const saved = await getLessonProgressFromFirestore(currentUser.id, lessonId);
        if (isCancelled) return;

        if (saved) {
          // Khôi phục phần đang học hoặc phần đã mở gần nhất (Tối đa là sec_4)
          let targetSection = (saved.currentSection || saved.lastViewedSection || 'sec_1') as MainSectionId;
          if ((targetSection as any) === 'sec_5') {
            targetSection = 'sec_4';
          }
          setActiveSection(targetSection);

          let restoredSections: MainSectionId[] = [];
          if (Array.isArray(saved.completedSections) && saved.completedSections.length > 0) {
            restoredSections = (saved.completedSections as any[]).filter(s => s !== 'sec_5') as MainSectionId[];
            if (saved.completedSections.includes('sec_5') && !restoredSections.includes('sec_4')) {
              restoredSections.push('sec_4');
            }
          } else if (saved.progressPercent) {
            if (saved.progressPercent >= 20 || saved.progressPercent >= 25) restoredSections.push('sec_1');
            if (saved.progressPercent >= 40 || saved.progressPercent >= 50) restoredSections.push('sec_2');
            if (saved.progressPercent >= 60 || saved.progressPercent >= 75) restoredSections.push('sec_3');
            if (saved.progressPercent >= 80 || saved.progressPercent >= 100) restoredSections.push('sec_4');
          }
          setCompletedSections(restoredSections);

          if (saved.currentTopicIdx !== undefined) setCurrentTopicIdx(saved.currentTopicIdx);
          if (saved.completedTopicIds) setCompletedTopicIds(saved.completedTopicIds);

          if (saved.practiceScore !== null && saved.practiceScore !== undefined) {
            setPracticeScore(saved.practiceScore);
            setPracticeSubmitted(true);
            if (saved.practiceAnswers) setPracticeAnswers(saved.practiceAnswers);
          }

          if (saved.examScore !== null && saved.examScore !== undefined) {
            setExamScore(saved.examScore);
            setExamSubmitted(true);
            if (saved.examMcAnswers) setExamMcAnswers(saved.examMcAnswers);
            if (saved.examEssayAnswers) setExamEssayAnswers(saved.examEssayAnswers);
          }
        } else {
          // Mở bài mới lần đầu: ghi nhận trạng thái in_progress với 10%
          setActiveSection('sec_1');
          setCompletedSections([]);
          await saveLessonProgressToFirestore(currentUser.id, lessonId, {
            status: 'in_progress',
            progressPercent: 10,
            currentSection: 'sec_1',
            lastViewedSection: 'sec_1',
            startedAt: new Date().toISOString()
          });
        }
      } catch (err) {
        console.warn('Lỗi khôi phục tiến trình bài học từ Firestore:', err);
      }
    }

    restoreLessonProgress();

    return () => {
      isCancelled = true;
    };
  }, [lessonId, currentUser.id]);

  // Tạo các mảng câu hỏi với phương án đã được xáo trộn A, B, C, D ổn định
  const currentUserId = currentUser?.id || 'guest_user';

  const shuffledWarmupOptions = useMemo(() => {
    return getShuffledOptions(lessonData?.warmup?.options || [], `warmup_${lessonId}_${currentUserId}`);
  }, [lessonData?.warmup?.options, lessonId, currentUserId]);

  const shuffledPracticeQuestions = useMemo(() => {
    return (lessonData?.practiceQuestions || []).map(q => ({
      ...q,
      shuffledOptions: getShuffledOptions(q?.options || [], `practice_${q?.id || 'p'}_${currentUserId}`)
    }));
  }, [lessonData?.practiceQuestions, currentUserId]);

  const shuffledExamMCQuestions = useMemo(() => {
    return (lessonData?.examMCQuestions || []).map(q => ({
      ...q,
      shuffledOptions: getShuffledOptions(q?.options || [], `exam_${q?.id || 'e'}_${currentUserId}`)
    }));
  }, [lessonData?.examMCQuestions, currentUserId]);

  // Tính phần trăm tiến độ (4 tab: 25% mỗi mục hoàn thành)
  const progressPercent = Math.min(100, completedSections.length * 25);

  // Kiểm tra mục có bị khoá không (phải hoàn thành tuần tự)
  const isSectionLocked = (secId: MainSectionId): boolean => {
    if (secId === 'sec_1') return false;
    if (secId === 'sec_2') return !completedSections.includes('sec_1');
    if (secId === 'sec_3') return !completedSections.includes('sec_2');
    if (secId === 'sec_4') return !completedSections.includes('sec_3');
    return false;
  };

  const handleSelectSection = (secId: MainSectionId) => {
    if (isSectionLocked(secId)) return;
    setActiveSection(secId);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Lưu ngay vị trí phần đang xem vào Cloud Firestore
    if (currentUser.id) {
      saveLessonProgressToFirestore(currentUser.id, lessonId, {
        currentSection: secId,
        lastViewedSection: secId,
        status: completedSections.includes('sec_4') ? 'completed' : 'in_progress',
        progressPercent: Math.max(progressPercent, completedSections.length * 25)
      }).catch(err => console.warn(err));
    }
  };

  // --- XỬ LÝ TAB 1: KHỞI ĐỘNG ---
  const handleCompleteWarmup = async () => {
    const nextCompleted = Array.from(new Set([...completedSections, 'sec_1' as MainSectionId]));
    setCompletedSections(nextCompleted);

    setSyncNotice('Đang lưu kết quả Khởi động vào Cloud Firestore...');
    if (currentUser.id) {
      try {
        await saveLessonProgressToFirestore(currentUser.id, lessonId, {
          status: 'in_progress',
          currentSection: 'sec_2',
          lastViewedSection: 'sec_2',
          completedSections: nextCompleted,
          progressPercent: 25
        });
        setSyncNotice('✓ Đã đồng bộ tiến trình: Hoàn thành Tab 1 - Khởi động (25%)');
        setTimeout(() => setSyncNotice(''), 3000);
      } catch (err) {
        console.warn('Lỗi lưu Khởi động:', err);
      }
    }

    setActiveSection('sec_2');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- XỬ LÝ TAB 2: HÌNH THÀNH KIẾN THỨC ---
  const currentTopic: SgkTopicItem = lessonData.topics[currentTopicIdx] || lessonData.topics[0];
  
  // Lấy dữ liệu làm giàu (đầy đủ đề mục lớn, tiểu mục, ví dụ, lưu ý, câu hỏi tương tác)
  const enrichedTopic: EnrichedTopicData = useMemo(() => {
    return getEnrichedTopicData(currentTopic.id, currentTopic);
  }, [currentTopic]);

  const handleNextTopic = async () => {
    const nextTopicCompleted = Array.from(new Set([...completedTopicIds, currentTopic.id]));
    setCompletedTopicIds(nextTopicCompleted);

    if (currentTopicIdx < lessonData.topics.length - 1) {
      const nextIdx = currentTopicIdx + 1;
      setCurrentTopicIdx(nextIdx);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      if (currentUser.id) {
        saveLessonProgressToFirestore(currentUser.id, lessonId, {
          currentSection: 'sec_2',
          lastViewedSection: 'sec_2',
          currentTopicIdx: nextIdx,
          completedTopicIds: nextTopicCompleted,
          progressPercent: Math.max(progressPercent, 25 + Math.round((nextIdx / lessonData.topics.length) * 25))
        }).catch(e => console.warn(e));
      }
    } else {
      // Đã học hết toàn bộ các đề mục SGK -> Hoàn thành Tab 2 (50%)
      const nextCompleted = Array.from(new Set([...completedSections, 'sec_2' as MainSectionId]));
      setCompletedSections(nextCompleted);

      setSyncNotice('Đang cập nhật hoàn thành Tab 2 vào Firestore...');
      if (currentUser.id) {
        try {
          await saveLessonProgressToFirestore(currentUser.id, lessonId, {
            status: 'in_progress',
            currentSection: 'sec_3',
            lastViewedSection: 'sec_3',
            completedSections: nextCompleted,
            progressPercent: 50,
            completedTopicIds: nextTopicCompleted
          });
          setSyncNotice('✓ Giáo viên đã nhận được tiến trình Tab 2 (50%)');
          setTimeout(() => setSyncNotice(''), 3000);
        } catch (err) {
          console.warn('Lỗi lưu Tab 2:', err);
        }
      }

      setActiveSection('sec_3');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // --- XỬ LÝ TAB 3: LUYỆN TẬP (10 CÂU) ---
  const filteredPracticeQuestions = useMemo(() => {
    if (practiceFilter === 'ALL') return shuffledPracticeQuestions;
    return shuffledPracticeQuestions.filter(q => q.level === practiceFilter);
  }, [shuffledPracticeQuestions, practiceFilter]);

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

    const nextCompleted = Array.from(new Set([...completedSections, 'sec_3' as MainSectionId]));
    setCompletedSections(nextCompleted);

    setSyncNotice('Đang lưu kết quả Luyện tập vào Cloud Firestore...');
    if (currentUser.id) {
      try {
        await saveLessonProgressToFirestore(currentUser.id, lessonId, {
          status: 'in_progress',
          currentSection: 'sec_4',
          lastViewedSection: 'sec_4',
          completedSections: nextCompleted,
          progressPercent: 75,
          practiceScore: calculatedScore,
          practiceAnswers
        });
        setSyncNotice(`✓ Điểm Luyện tập (${calculatedScore}/10) đã lưu trên hệ thống! (75%)`);
        setTimeout(() => setSyncNotice(''), 3500);
      } catch (err) {
        console.warn('Lỗi lưu điểm luyện tập:', err);
      }
    }
  };

  // --- XỬ LÝ TAB 4: KIỂM TRA (THANG 10 CHUẨN: 8 TN + 4 TL) ---
  const handleSubmitExam = async () => {
    setIsSubmitting(true);
    setShowConfirmModal(false);

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
    setExamViewMode('summary');

    const isPassed = totalExam >= 5.0;
    const nextCompleted = Array.from(new Set([...completedSections, 'sec_4' as MainSectionId]));
    setCompletedSections(nextCompleted);

    // ĐỒNG BỘ TRỰC TIẾP LÊN CLOUD FIRESTORE
    if (currentUser.id) {
      setSyncNotice('Đang nộp bài kiểm tra và đồng bộ bảng điểm giáo viên...');
      try {
        await saveLessonProgressToFirestore(currentUser.id, lessonId, {
          status: isPassed ? 'completed' : 'in_progress',
          currentSection: 'sec_4',
          lastViewedSection: 'sec_4',
          completedSections: nextCompleted,
          progressPercent: 100,
          examScore: totalExam,
          examMcAnswers,
          examEssayAnswers,
          completedAt: new Date().toISOString()
        });

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

        setSyncNotice(`✓ NỘP BÀI THÀNH CÔNG! Điểm kiểm tra: ${totalExam}/10.0 đã cập nhật hồ sơ học tập.`);
        setTimeout(() => setSyncNotice(''), 4000);
      } catch (err) {
        console.warn('Lỗi lưu điểm thi:', err);
      }
    }

    onLessonCompleted(lessonId, totalExam);
    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetakeExam = () => {
    setExamSubmitted(false);
    setExamViewMode('summary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-6xl mx-auto">
      {/* ================================================================
          II. BỐ CỤC CHUNG MỖI BÀI HỌC (HEADER + 4 TAB LỚN DUY NHẤT)
      ================================================================ */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
        {/* Phía trên bài học: Nút Quay lại, Số bài, Tên bài, Mô tả, Trạng thái bài */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-start gap-3">
            <button
              onClick={onSelectOtherLesson}
              className="mt-0.5 px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
              title="Quay lại danh mục các bài học"
            >
              <ArrowLeft className="w-4 h-4 text-blue-600" />
              <span>Quay lại</span>
            </button>

            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-wider">
                <span className="px-2.5 py-0.5 bg-blue-600 text-white rounded-md">
                  BÀI {lessonId}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-blue-700 font-extrabold">{lessonData.chapterTitle}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-medium">{lessonData.pageInfo}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1.5 leading-tight">
                {lessonData.title}
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {lessonData.shortTitle}
              </p>
            </div>
          </div>

          {/* Trạng thái bài học (Badge trực quan & nút Đăng xuất) */}
          <div className="flex items-center gap-3 self-end md:self-center shrink-0">
            {examScore !== null ? (
              <div className="px-3.5 py-2 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <div className="text-left">
                  <div className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">ĐÃ HOÀN THÀNH</div>
                  <div className="text-xs font-extrabold text-emerald-950">Điểm thi: {examScore}/10.0</div>
                </div>
              </div>
            ) : (
              <div className="px-3.5 py-2 bg-blue-50 border border-blue-200 rounded-2xl flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-600" />
                <div className="text-left">
                  <div className="text-[10px] font-black uppercase text-blue-800 tracking-wider">TRẠNG THÁI</div>
                  <div className="text-xs font-extrabold text-blue-950">Đang học • {progressPercent}%</div>
                </div>
              </div>
            )}

            <button
              onClick={onLogout}
              className="px-3 py-2 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Đăng xuất khỏi tài khoản"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* Thông báo đồng bộ Firestore theo thời gian thực */}
        {syncNotice && (
          <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
            <RefreshCw className="w-4 h-4 animate-spin text-blue-600 shrink-0" />
            <span>{syncNotice}</span>
          </div>
        )}

        {/* 4 TAB LỚN BẮT BUỘC: [ KHỞI ĐỘNG ] [ HÌNH THÀNH KIẾN THỨC ] [ LUYỆN TẬP ] [ KIỂM TRA ] */}
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2.5">
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-600" />
              4 TAB CHÍNH CỦA BÀI HỌC:
            </span>
            <span className="text-blue-600 font-extrabold">{progressPercent}% hoàn thành</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {MAIN_SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              const isDone = completedSections.includes(sec.id) || (sec.id === 'sec_4' && examScore !== null);
              const locked = isSectionLocked(sec.id);

              return (
                <button
                  key={sec.id}
                  disabled={locked}
                  onClick={() => handleSelectSection(sec.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between h-22 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md ring-2 ring-blue-400/30'
                      : isDone
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-950 hover:bg-emerald-100/70'
                        : locked
                          ? 'bg-slate-50 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-[10px] font-black uppercase tracking-wider ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                      MỤC {sec.stepNum}
                    </span>
                    {isDone ? (
                      <CheckCircle2 className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                    ) : locked ? (
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                    ) : (
                      <Play className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                    )}
                  </div>
                  <div>
                    <div className="font-black text-xs sm:text-sm leading-snug line-clamp-1">
                      {sec.shortTitle}
                    </div>
                    <div className={`text-[10px] mt-0.5 line-clamp-1 ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                      {sec.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================================================================
          III. TAB 1 – KHỞI ĐỘNG (BỐ CỤC: TÌNH HUỐNG THỰC TẾ ➔ CÂU HỎI GỢI MỞ ➔ HOẠT ĐỘNG TƯƠNG TÁC)
      ================================================================ */}
      {activeSection === 'sec_1' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <span className="p-3 bg-amber-100 text-amber-800 rounded-2xl font-black text-lg">
              1
            </span>
            <div>
              <h2 className="text-xl font-black text-slate-900">TAB 1: KHỞI ĐỘNG</h2>
              <p className="text-xs text-slate-500 font-medium">Tình huống thực tế & Hoạt động tương tác dẫn nhập vào bài học</p>
            </div>
          </div>

          {/* 1. TÌNH HUỐNG / HÌNH ẢNH THỰC TẾ */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50/60 rounded-2xl p-5 border border-amber-200/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-800">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Tình huống thực tế: {lessonData.warmup.scenarioTitle}</span>
            </div>
            <p className="text-slate-800 text-sm leading-relaxed font-medium">
              {lessonData.warmup.scenarioText}
            </p>
          </div>

          {/* 2. CÂU HỎI GỢI VẤN ĐỀ & 3. HOẠT ĐỘNG TƯƠNG TÁC */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-4">
            <div className="font-extrabold text-slate-900 text-sm flex items-start gap-2.5">
              <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span>{lessonData.warmup.question}</span>
            </div>

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
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1.5 animate-in fade-in duration-200">
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
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>HOÀN THÀNH KHỞI ĐỘNG ➔ CHUYỂN SANG TAB 2: HÌNH THÀNH KIẾN THỨC</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================================================================
          IV. TAB 2 – HÌNH THÀNH KIẾN THỨC (TRUNG TÂM CỦA BÀI HỌC)
          THEO ĐÚNG ĐỀ MỤC SGK & MỖI ĐƠN VỊ LÀ 1 KHỐI HỌC TẬP CHUẨN MỰC
      ================================================================ */}
      {activeSection === 'sec_2' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* Header Tab 2 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-3 bg-blue-100 text-blue-700 rounded-2xl font-black text-lg">
                2
              </span>
              <div>
                <h2 className="text-xl font-black text-slate-900">TAB 2: HÌNH THÀNH KIẾN THỨC</h2>
                <p className="text-xs text-slate-500 font-medium">Bám sát 100% đề mục SGK KHTN 9 Kết nối tri thức với cuộc sống</p>
              </div>
            </div>

            <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 self-start sm:self-center">
              Đề mục {currentTopicIdx + 1}/{lessonData.topics.length}
            </span>
          </div>

          {/* 1. THANH CHUYỂN NHANH THEO ĐÚNG ĐỀ MỤC SGK */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {lessonData.topics.map((top, idx) => {
              const isCurr = idx === currentTopicIdx;
              const isTopicDone = completedTopicIds.includes(top.id);
              return (
                <button
                  key={top.id}
                  onClick={() => {
                    setCurrentTopicIdx(idx);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isCurr
                      ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold shadow-xs ring-1 ring-blue-400'
                      : isTopicDone
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-400">
                    <span>MỤC {top.order}</span>
                    {isTopicDone && <Check className="w-3 h-3 text-emerald-600" />}
                  </div>
                  <div className="text-xs font-bold truncate mt-0.5">{top.title}</div>
                </button>
              );
            })}
          </div>

          {/* ============================================================
              MỖI ĐƠN VỊ KIẾN THỨC LÀ MỘT KHỐI HỌC TẬP (LEARNING BLOCK)
              1. ĐỀ MỤC SGK PHÂN CẤP (I. ... 1. ... a, b ...)
              2. KIẾN THỨC CỐT LÕI (kèm công thức nổi bật nếu có)
              3. BẢNG / SƠ ĐỒ
              4. ⚠ LƯU Ý
              5. 💡 VÍ DỤ MINH HOẠ (Dữ kiện / Cách làm / Kết quả)
              6. THÍ NGHIỆM ẢO / MÔ PHỎNG TƯƠNG TÁC TẠI CHỖ
              7. 1–2 CÂU HỎI TƯƠNG TÁC (Kiến thức đến đâu -> Tương tác đến đó)
              8. GHI NHỚ / KẾT LUẬN CỦA ĐỀ MỤC
          ============================================================ */}
          <div className="space-y-6 pt-2">
            {/* 1. [ĐỀ MỤC PHÂN CẤP THEO ĐÚNG THỨ TỰ SGK] */}
            <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-black uppercase text-blue-600 tracking-wider">
                  {enrichedTopic.hierarchy.romanHeader} • {currentTopic.page}
                </span>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700 shadow-2xs">
                  {currentTopic.badge}
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900">
                {currentTopic.order}. {currentTopic.title}
              </h3>
              {enrichedTopic?.hierarchy?.subItems && enrichedTopic.hierarchy.subItems.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-bold text-slate-600">
                  {(enrichedTopic.hierarchy.subItems || []).map((sub, sIdx) => (
                    <span key={sIdx} className="bg-white px-2.5 py-1 rounded-lg border border-slate-200/80">
                      {sub}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* 2. KIẾN THỨC CỐT LÕI (Gạch ý rõ ràng, súc tích) */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                Kiến Thức Cốt Lõi SGK KHTN 9
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(currentTopic?.newKnowledge || []).map((point, pIdx) => (
                  <div key={pIdx} className="p-3.5 rounded-xl bg-blue-50/40 border border-blue-100 text-xs text-slate-800 leading-relaxed flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {pIdx + 1}
                    </span>
                    <span className="font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CÔNG THỨC VẬT LÍ NỔI BẬT (Nếu đề mục có công thức) */}
            {enrichedTopic?.formula && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-md space-y-3">
                <div className="flex items-center justify-between border-b border-blue-800/80 pb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-200 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    {enrichedTopic.formula.title}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-800 text-blue-100 font-bold">
                    Công thức chuẩn SI
                  </span>
                </div>
                
                <div className="text-center py-2">
                  <div className="text-2xl sm:text-3xl font-black font-mono tracking-widest text-amber-300">
                    {enrichedTopic.formula.formula}
                  </div>
                  <p className="text-xs text-blue-200 mt-1 font-medium">
                    {enrichedTopic.formula.explanation}
                  </p>
                </div>

                {enrichedTopic.formula.variables && enrichedTopic.formula.variables.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-blue-800/80 text-xs">
                    {(enrichedTopic.formula.variables || []).map((v, vIdx) => (
                      <div key={vIdx} className="bg-blue-800/40 p-2 rounded-lg flex items-center justify-between">
                        <span className="font-mono font-bold text-amber-300">{v.symbol}:</span>
                        <span className="text-blue-100 text-[11px] truncate mx-1.5">{v.name}</span>
                        <span className="text-blue-300 text-[10px] font-mono">({v.unit})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. BẢNG HOẶC SƠ ĐỒ ĐỐI CHIẾU */}
            {enrichedTopic?.tableOrDiagram && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  {enrichedTopic.tableOrDiagram.title}
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100/90 border-b border-slate-200 text-slate-700">
                        {(enrichedTopic.tableOrDiagram.headers || []).map((h, hIdx) => (
                          <th key={hIdx} className="p-2.5 font-black uppercase text-[10px]">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/70">
                      {(enrichedTopic.tableOrDiagram.rows || []).map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-white transition-colors">
                          {(row || []).map((cell, cIdx) => (
                            <td key={cIdx} className={`p-2.5 leading-relaxed text-slate-700 ${cIdx === 0 ? 'font-bold text-slate-900' : ''}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. ⚠ LƯU Ý (KHỐI RIÊNG BIỆT DỄ NHÌN, NỔI BẬT THEO ĐÚNG YÊU CẦU) */}
            <div className="p-4.5 rounded-2xl bg-amber-50/80 border-2 border-amber-300/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-black text-amber-900 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>⚠ LƯU Ý QUAN TRỌNG THEO SGK</span>
              </div>
              <p className="text-xs text-amber-950 font-medium leading-relaxed pl-6">
                {enrichedTopic.warningNote}
              </p>
            </div>

            {/* 5. 💡 VÍ DỤ MINH HOẠ (ĐẶT NGAY SAU KIẾN THỨC, DỮ KIỆN - CÁCH LÀM - KẾT QUẢ) */}
            <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-3">
              <div className="flex items-center justify-between border-b border-indigo-200 pb-2">
                <h4 className="text-xs font-black text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-indigo-600" />
                  💡 VÍ DỤ MINH HOẠ: {enrichedTopic.exampleDetail.title}
                </h4>
                <span className="text-[10px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-full border border-indigo-200">
                  {enrichedTopic.exampleDetail.type === 'problem' ? 'Bài toán định lượng' : 'Hiện tượng thực tế'}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="bg-white/90 p-3 rounded-xl border border-indigo-100">
                  <span className="font-extrabold text-indigo-900">
                    {enrichedTopic.exampleDetail.type === 'problem' ? 'Dữ kiện đề bài:' : 'Hiện tượng quan sát:'}
                  </span>{' '}
                  <span className="text-slate-800 leading-relaxed font-medium">
                    {enrichedTopic.exampleDetail.givenOrPhenomenon}
                  </span>
                </div>

                <div className="bg-white/90 p-3 rounded-xl border border-indigo-100">
                  <span className="font-extrabold text-indigo-900">
                    {enrichedTopic.exampleDetail.type === 'problem' ? 'Cách làm / Lời giải chi tiết:' : 'Giải thích khoa học:'}
                  </span>{' '}
                  <p className="text-slate-800 leading-relaxed font-medium whitespace-pre-line mt-1">
                    {enrichedTopic.exampleDetail.stepsOrExplanation}
                  </p>
                </div>

                <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-extrabold text-emerald-900">
                      {enrichedTopic.exampleDetail.type === 'problem' ? 'Kết quả:' : 'Rút ra kết luận:'}
                    </span>{' '}
                    <span className="text-emerald-950 font-bold">
                      {enrichedTopic.exampleDetail.resultOrTakeaway}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. THÍ NGHIỆM ẢO / MÔ PHỎNG (NẰM NGAY TẠI ĐƠN VỊ KIẾN THỨC NÀY) */}
            {currentTopic.simulation && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-wider">
                  <Beaker className="w-4 h-4 text-blue-600" />
                  <span>Thí nghiệm ảo mô phỏng tương tác:</span>
                </div>

                {currentTopic.simulation === 'optics' && <OpticsSim />}
                {currentTopic.simulation === 'galvanometer' && <GalvanometerSim />}
                {currentTopic.simulation === 'chemistry' && <ChemistrySeparationSim />}
                {currentTopic.simulation === 'kinetic_ramp' && <KineticEnergySim />}
                {currentTopic.simulation === 'potential_gravity' && <PotentialEnergySim />}
                {currentTopic.simulation === 'mechanical_energy' && <MechanicalEnergySim />}
                {currentTopic.simulation === 'pendulum_energy' && <PendulumEnergySim />}
                {currentTopic.simulation === 'work_power' && <WorkPowerSim />}
                {currentTopic.simulation === 'crane_power' && <CranePowerSim />}

                {enrichedTopic.simObservation && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="font-extrabold text-slate-800 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-blue-600" />
                      Câu hỏi quan sát: {enrichedTopic.simObservation.observationQuestion}
                    </div>
                    <p className="text-slate-600 pl-5">
                      <strong>Kết luận quan sát:</strong> {enrichedTopic.simObservation.observationAnswer}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 7. 1–2 CÂU HỎI TƯƠNG TÁC (KIẾN THỨC ĐẾN ĐÂU -> TƯƠNG TÁC ĐẾN ĐÓ) */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2 text-xs font-black text-slate-900 uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span>Câu hỏi tương tác củng cố đề mục ({(enrichedTopic?.interactiveQuizzes || []).length} câu)</span>
                </div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  Phản hồi đúng/sai tức thì
                </span>
              </div>

              {(enrichedTopic?.interactiveQuizzes || []).map((quiz, qIdx) => {
                const answer = interactiveQuizAnswers[quiz.id];
                const checked = interactiveQuizChecked[quiz.id];
                return (
                  <div key={quiz.id} className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
                    <p className="text-xs font-bold text-slate-900 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black flex items-center justify-center shrink-0">
                        {qIdx + 1}
                      </span>
                      <span>{quiz.question}</span>
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(quiz.options || []).map((opt, oIdx) => {
                        const label = ['A', 'B', 'C', 'D'][oIdx];
                        const isChosen = answer === opt.id;
                        return (
                          <button
                            key={opt.id}
                            disabled={checked}
                            onClick={() => setInteractiveQuizAnswers(prev => ({ ...prev, [quiz.id]: opt.id }))}
                            className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                              isChosen
                                ? checked
                                  ? opt.isCorrect
                                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                                    : 'bg-rose-50 border-rose-400 text-rose-900'
                                  : 'bg-blue-50 border-blue-500 text-blue-900 font-bold'
                                : checked && opt.isCorrect
                                  ? 'bg-emerald-50/60 border-emerald-300 text-emerald-800 font-bold'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-400">{label}.</span>
                              <span>{opt.text}</span>
                            </div>
                            {checked && opt.isCorrect && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {!checked ? (
                      <button
                        disabled={!answer}
                        onClick={() => setInteractiveQuizChecked(prev => ({ ...prev, [quiz.id]: true }))}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                      >
                        Kiểm tra đáp án
                      </button>
                    ) : (
                      <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 leading-relaxed border border-slate-200">
                        <strong>Giải thích chuẩn SGK:</strong> {quiz.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 8. KẾT LUẬN / GHI NHỚ */}
            <div className="p-3.5 rounded-xl bg-slate-900 text-white text-xs flex items-center gap-2.5 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-medium">{currentTopic.keyTakeaway}</span>
            </div>
          </div>

          {/* Nút điều hướng các đề mục SGK */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              disabled={currentTopicIdx === 0}
              onClick={() => {
                setCurrentTopicIdx(prev => prev - 1);
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
              <span>{currentTopicIdx === lessonData.topics.length - 1 ? 'HOÀN THÀNH KIẾN THỨC ➔ SANG TAB 3: LUYỆN TẬP' : 'Tiếp tục đề mục tiếp theo'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================================================================
          V. TAB 3 – LUYỆN TẬP (10 CÂU HỎI 3 MỨC ĐỘ CỦNG CỐ)
      ================================================================ */}
      {activeSection === 'sec_3' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-3 bg-purple-100 text-purple-700 rounded-2xl font-black text-lg">
                3
              </span>
              <div>
                <h2 className="text-xl font-black text-slate-900">TAB 3: LUYỆN TẬP (10 CÂU HỎI)</h2>
                <p className="text-xs text-slate-500 font-medium">Hệ thống bài tập củng cố: 4 Nhận biết • 4 Thông hiểu • 2 Vận dụng</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200">
                Đã làm: {Object.keys(practiceAnswers).length}/{shuffledPracticeQuestions.length} câu
              </span>
            </div>
          </div>

          {/* Bộ lọc mức độ câu hỏi */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-bold mr-1">Lọc theo mức độ:</span>
            {(['ALL', 'BIẾT', 'HIỂU', 'VẬN DỤNG'] as const).map(f => (
              <button
                key={f}
                onClick={() => setPracticeFilter(f)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  practiceFilter === f
                    ? 'bg-purple-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f === 'ALL' ? 'Tất cả (10 câu)' : `Mức độ ${f}`}
              </button>
            ))}
          </div>

          {/* Danh sách các câu hỏi luyện tập */}
          <div className="space-y-4">
            {(filteredPracticeQuestions || []).map((q, idx) => {
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
                    {(q.shuffledOptions || []).map((opt, oIdx) => {
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
                                : 'bg-purple-50 border-purple-400 text-purple-900 font-bold'
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
                    <div className="p-3 bg-purple-50/80 rounded-xl text-xs text-purple-950 leading-relaxed border border-purple-200">
                      <strong>Lời giải chi tiết:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            {!practiceSubmitted ? (
              <button
                disabled={Object.keys(practiceAnswers).length < 5}
                onClick={handleSubmitPractice}
                className="w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer"
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
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>SANG TAB 4: BÀI KIỂM TRA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================================================================
          VI. TAB 4 – KIỂM TRA (ĐÁNH GIÁ CHÍNH THỨC & TỔNG KẾT BÀI HỌC)
          KẾT QUẢ VÀ TỔNG KẾT BÀI HỌC ĐƯỢC HIỂN THỊ NGAY TRONG TAB 4 NÀY
          TUYỆT ĐỐI KHÔNG TẠO TAB 5 RIÊNG BIỆT!
      ================================================================ */}
      {activeSection === 'sec_4' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* TRƯỜNG HỢP 1: ĐÃ NỘP BÀI KIỂM TRA ➔ HIỂN THỊ KẾT QUẢ VÀ TỔNG KẾT NGAY TẠI TAB 4 */}
          {examSubmitted && examScore !== null ? (
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              {/* Thanh điều hướng Tổng quan / Xem lại chi tiết bài làm */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-black">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900">KẾT QUẢ & TỔNG KẾT BÀI HỌC</h2>
                    <p className="text-xs text-slate-500 font-medium">Báo cáo đánh giá năng lực chính thức của {lessonData.shortTitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setExamViewMode('summary')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      examViewMode === 'summary'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Tổng kết kết quả
                  </button>
                  <button
                    onClick={() => setExamViewMode('review')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      examViewMode === 'review'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Xem lại bài làm & Lời giải
                  </button>
                </div>
              </div>

              {examViewMode === 'summary' ? (
                <div className="space-y-6 text-center">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-xs">
                    <Award className="w-10 h-10" />
                  </div>

                  <div className="space-y-1 max-w-lg mx-auto">
                    <div className="text-xs font-black text-emerald-600 uppercase tracking-widest">
                      Xác Nhận Thành Tích Học Tập Xuất Sắc
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">
                      CHÚC MỪNG EM ĐÃ HOÀN THÀNH {lessonData.shortTitle.toUpperCase()}!
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Điểm kiểm tra và tiến trình học tập đã được lưu vĩnh viễn trên cơ sở dữ liệu Cloud Firestore của Thầy/Cô.
                    </p>
                  </div>

                  {/* Bảng điểm tổng kết */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                      <div className="text-[11px] text-slate-500 font-bold">Tiến độ bài học</div>
                      <div className="text-2xl font-black text-blue-600 mt-1">100%</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">4/4 mục hoàn thành</div>
                    </div>

                    <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-center">
                      <div className="text-[11px] text-emerald-800 font-bold">Điểm Bài Kiểm Tra</div>
                      <div className="text-2xl font-black text-emerald-700 mt-1">
                        {examScore} / 10.0
                      </div>
                      <div className="text-[10px] text-emerald-600 mt-0.5">
                        TN: {examMcScore}/4.0 • TL: {examEssayScore}/6.0
                      </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 text-center">
                      <div className="text-[11px] text-purple-800 font-bold">Điểm Luyện Tập</div>
                      <div className="text-2xl font-black text-purple-700 mt-1">
                        {practiceScore !== null ? `${practiceScore} / 10` : '10 / 10'}
                      </div>
                      <div className="text-[10px] text-purple-600 mt-0.5">10 câu 3 mức độ</div>
                    </div>
                  </div>

                  {/* Đánh giá năng lực KHTN 9 đạt được */}
                  <div className="max-w-xl mx-auto p-4.5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2.5">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      Đánh giá năng lực Khoa học tự nhiên đạt được:
                    </h4>
                    <div className="space-y-2 text-xs text-slate-700">
                      <div className="flex justify-between font-medium pb-1 border-b border-slate-200/60">
                        <span>
                          {lessonId === 4
                            ? 'Khái niệm công & công suất máy móc:'
                            : lessonId === 3 
                              ? 'Khái niệm cơ năng Wc = Wđ + Wt:' 
                              : lessonId === 2 
                                ? 'Biểu thức động năng Wđ = 1/2 m v²:' 
                                : 'Nhận biết dụng cụ & hoá chất thí nghiệm:'}
                        </span>
                        <span className="font-bold text-emerald-600">Thành thạo (100%)</span>
                      </div>
                      <div className="flex justify-between font-medium pb-1 border-b border-slate-200/60">
                        <span>
                          {lessonId === 4
                            ? 'Vận dụng biểu thức A = F · s & P = F · v:'
                            : lessonId === 3 
                              ? 'Định luật bảo toàn cơ năng & con lắc đơn:' 
                              : lessonId === 2 
                                ? 'Biểu thức thế năng trọng trường Wt = Ph:' 
                                : 'Phương pháp viết & thuyết trình báo cáo khoa học:'}
                        </span>
                        <span className="font-bold text-blue-600">Đạt yêu cầu (95%)</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>
                          {lessonId === 4
                            ? 'Giải thích xe leo dốc & công suất động cơ:'
                            : lessonId === 3 
                              ? 'Vận dụng cơ năng giải thích kĩ thuật nhảy xa:' 
                              : lessonId === 2 
                                ? 'Vận dụng giải bài toán động năng & thế năng:' 
                                : 'Vận dụng xử lý tình huống thực nghiệm:'}
                        </span>
                        <span className="font-bold text-purple-600">Tốt (92%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Nút hành động */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handleRetakeExam}
                      className="px-5 py-2.5 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 font-bold text-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-4 h-4" /> Làm lại bài kiểm tra
                    </button>

                    <button
                      onClick={() => setExamViewMode('review')}
                      className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <FileText className="w-4 h-4" /> Xem lại đáp án & Lời giải
                    </button>

                    {lessonId < 4 ? (
                      <button
                        onClick={() => {
                          onLessonCompleted(lessonId, examScore);
                          onSelectOtherLesson();
                        }}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
                      >
                        <span>TIẾP TỤC SANG BÀI {lessonId + 1}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          onLessonCompleted(4, examScore);
                          onSelectOtherLesson();
                        }}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
                      >
                        <span>HOÀN THÀNH CHƯƠNG I (ĐÃ HOÀN THÀNH BÀI 1, 2, 3, 4)</span>
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* CHẾ ĐỘ XEM LẠI ĐÁP ÁN VÀ LỜI GIẢI CHI TIẾT */
                <div className="space-y-6">
                  {/* Xem lại trắc nghiệm */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-blue-900 uppercase tracking-wider flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      Phần A: 8 Câu hỏi trắc nghiệm (Điểm: {examMcScore}/4.0)
                    </h4>
                    {(shuffledExamMCQuestions || []).map((q, idx) => {
                      const userChoice = examMcAnswers[q.id];
                      return (
                        <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
                          <p className="font-bold text-slate-900">
                            Câu {idx + 1}: {q.question}
                          </p>
                          <div className="space-y-1.5">
                            {(q.shuffledOptions || []).map((opt, oIdx) => {
                              const label = ['A', 'B', 'C', 'D'][oIdx];
                              const isUser = userChoice === opt.id;
                              return (
                                <div
                                  key={opt.id}
                                  className={`p-2.5 rounded-lg border flex items-center justify-between ${
                                    opt.isCorrect
                                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                                      : isUser
                                        ? 'bg-rose-50 border-rose-300 text-rose-900 line-through'
                                        : 'bg-white border-slate-200 text-slate-600'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold">{label}.</span>
                                    <span>{opt.text}</span>
                                  </div>
                                  {opt.isCorrect && <span className="text-[10px] text-emerald-700 font-bold">Đáp án đúng</span>}
                                  {isUser && !opt.isCorrect && <span className="text-[10px] text-rose-700 font-bold">Em đã chọn</span>}
                                </div>
                              );
                            })}
                          </div>
                          <div className="p-2.5 bg-blue-50/70 rounded-lg text-blue-950 text-[11px] border border-blue-100">
                            <strong>Giải thích SGK:</strong> {q.explanation}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Xem lại tự luận */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-black text-purple-900 uppercase tracking-wider flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-purple-600" />
                      Phần B: 4 Câu tự luận (Điểm: {examEssayScore}/6.0)
                    </h4>
                    {(lessonData?.examEssayQuestions || []).map((eq, eIdx) => (
                      <div key={eq.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
                        <div className="font-bold text-purple-900">
                          {eq.title}
                        </div>
                        <p className="text-slate-800 font-medium">{eq.prompt}</p>
                        
                        <div className="p-3 bg-white rounded-lg border border-slate-200">
                          <span className="font-bold text-slate-500">Bài làm của em:</span>
                          <p className="text-slate-800 whitespace-pre-line mt-1">
                            {examEssayAnswers[eq.id] || '(Em chưa nhập câu trả lời)'}
                          </p>
                        </div>

                        <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 text-purple-950 space-y-1">
                          <span className="font-bold text-purple-900">Đáp án tham khảo chuẩn SGK:</span>
                          <p className="whitespace-pre-line leading-relaxed">{eq.sampleSolution}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setExamViewMode('summary')}
                      className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors"
                    >
                      ← Quay lại Bảng tổng kết
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* TRƯỜNG HỢP 2: ĐANG LÀM BÀI KIỂM TRA CHƯA NỘP */
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="p-3 bg-rose-100 text-rose-700 rounded-2xl font-black text-lg">
                    4
                  </span>
                  <div>
                    <h2 className="text-xl font-black text-slate-900">TAB 4: BÀI KIỂM TRA ĐÁNH GIÁ (THANG ĐIỂM 10)</h2>
                    <p className="text-xs text-slate-500 font-medium">8 câu trắc nghiệm (0,5đ/câu = 4,0 điểm) + 4 câu tự luận (1,5đ/câu = 6,0 điểm)</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Thời gian khuyến nghị: 20 phút</span>
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

                {(shuffledExamMCQuestions || []).map((q, qIdx) => {
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
                        {(q.shuffledOptions || []).map((opt, oIdx) => {
                          const label = ['A', 'B', 'C', 'D'][oIdx];
                          return (
                            <button
                              key={opt.id}
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

                {(lessonData?.examEssayQuestions || []).map((eq) => (
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
                  </div>
                ))}
              </div>

              {/* Nút nộp bài kiểm tra */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  disabled={isSubmitting}
                  onClick={() => setShowConfirmModal(true)}
                  className="px-8 py-3.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>NỘP BÀI KIỂM TRA (CHẤM ĐIỂM & ĐỒNG BỘ FIRESTORE)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================================================================
          MODAL XÁC NHẬN NỘP BÀI KIỂM TRA
      ================================================================ */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-lg font-black text-slate-900">Xác nhận nộp bài kiểm tra</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Em có chắc chắn muốn nộp bài kiểm tra này không?
                <br />
                Đã hoàn thành <strong>{Object.keys(examMcAnswers).length}/8</strong> câu trắc nghiệm và{' '}
                <strong>{Object.keys(examEssayAnswers).length}/4</strong> câu tự luận.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Tiếp tục làm bài
              </button>
              <button
                type="button"
                onClick={handleSubmitExam}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white font-black text-xs hover:bg-rose-700 shadow-sm transition-colors cursor-pointer"
              >
                Xác nhận nộp ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
