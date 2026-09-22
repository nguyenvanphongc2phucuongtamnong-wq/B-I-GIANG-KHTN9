export type DifficultyLevel = 'nhan_biet' | 'thong_hieu' | 'van_dung';

export type UserRole = 'student' | 'teacher';

export type LessonStage = 
  | 'sgk_learning'
  | 'hook' 
  | 'explore' 
  | 'summary'
  | 'games' 
  | 'practice' 
  | 'real_world' 
  | 'extension' 
  | 'final_quiz';

export type ClassId = '9A1' | '9A2' | '9A3' | '9A4' | '9A5' | '9A6' | '9A7' | '9A8';

export const VALID_CLASSES: ClassId[] = ['9A1', '9A2', '9A3', '9A4', '9A5', '9A6', '9A7', '9A8'];

export interface ClassTransferRequest {
  id: string;
  studentId: string;
  studentName: string;
  currentClass: string;
  requestedClass: ClassId;
  reason: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: UserRole;
  gradeClass: string; // '9A1'..'9A8' or 'Tổ Tự Nhiên - Khối 9'
  school: string;
  joinDate?: string;
  xp: number;
  streakDays: number;
  unlockedLessonIds: number[];
  currentLessonId: number;
  completedLessons?: number[];
  completedLessonIds: number[];
  quizRecords: Record<number, QuizResultRecord>;
  badges: string[];
  pendingClassChange?: ClassTransferRequest;
  createdAt?: string;
  lastLoginAt?: string;
}

/**
 * 1. THÔNG TIN TÀI KHOẢN (Account Info)
 */
export interface StudentAccountInfo {
  studentId: string;
  email: string;
  displayName: string;
  avatar?: string;
  role: 'student';
  classId: string; // '9A1'..'9A8'
  school?: string;
  createdAt: string;
  lastLoginAt: string;
}

/**
 * 2. TIẾN ĐỘ HỌC (Learning Progress)
 */
export interface StudentLearningProgress {
  currentLesson: number;
  completedLessons: number[];
  completedStages: Record<string, string[]>;
  progressPercent: number; // 0% cho học sinh mới
  xp: number;
  streakDays: number;
}

/**
 * 3. KẾT QUẢ ĐÁNH GIÁ (Assessment Results)
 */
export interface StudentAssessmentResult {
  assessmentId: string;
  lessonId: number;
  attemptId: string;
  submittedAt: string;
  score: number; // Thang 10 điểm
  maxScore: number;
  percentage: number;
  resultByLevel: {
    nhanBiet: number; // Mức 1: BIẾT
    thongHieu: number; // Mức 2: HIỂU
    vanDung: number;   // Mức 3: VẬN DỤNG
  };
  feedback?: {
    strengths?: string;
    reviewNeeded?: string;
  };
}

/**
 * CẤU TRÚC HỒ SƠ HỌC SINH LƯU TRONG DATABASE DÙNG CHUNG
 */
export interface ServerStudentProfile {
  studentId: string;
  email: string;
  displayName: string;
  avatar?: string;
  school?: string;
  classId: string; // 9A1..9A8
  role: 'student';
  createdAt: string;
  lastLoginAt: string;

  // Tiến độ học
  currentLesson: number;
  completedLessons: number[];
  completedStages: Record<string, string[]>;
  progressPercent: number;
  xp: number;
  streakDays: number;

  // Kết quả đánh giá
  assessmentsCompleted: number;
  scores: StudentAssessmentResult[];
}

export interface QuizResultRecord {
  lessonId?: number;
  score: number; // Thang 10 điểm
  total: number; // Luôn là 10
  date: string;
  breakdown: {
    nhanBiet: number; // max 2.5đ
    thongHieu: number; // max 2.5đ
    vanDung: number; // max 5.0đ (gồm 2.0đ TN + 3.0đ TL)
  };
  essayScore?: number; // max 3.0đ
  essayResponse?: string;
  feedback?: {
    strengths: string;
    reviewNeeded: string;
    suggestions?: string;
  };
}

export type QuizRecord = QuizResultRecord;

export interface EssayQuestion {
  id: string;
  title: string;
  question: string;
  context?: string;
  points: number; // 3.0 điểm
  level: DifficultyLevel;
  levelName: string;
  rubric: {
    id: string;
    criterion: string;
    maxPoints: number;
    description: string;
    keywords: string[];
  }[];
  sampleAnswer: string;
  guidelines: string[];
}

export interface QuizAttempt {
  attemptId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  classId: string;
  lessonId: number;
  startedAt: string;
  submittedAt?: string;
  answers?: Record<string, any>;
  score: number | null;
  maxScore: number;
  percentage: number | null;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'SUBMITTED' | 'GRADED';
}

export interface StudentProgressItem {
  id: string;
  studentName: string;
  email: string;
  avatar: string;
  className: string;
  currentLessonId: number;
  unlockedLessonIds: number[];
  completedLessonIds: number[];
  overallProgress: number; // %
  lastQuizScore: number | null; // thang 10 hoặc null nếu chưa nộp bài
  practiceScore?: number | null; // Điểm luyện tập 10 câu
  testScore?: number | null; // Điểm kiểm tra chính thức 10đ
  completedTests?: number;
  completedExercises?: number;
  lastActive: string;
  status: 'completed' | 'in_progress' | 'needs_help' | 'not_started';
  currentStepId?: string;
  currentStepTitle?: string;
  completedSteps?: string[];
  totalStepsInLesson?: number;
  completedStepCount?: number;
  scoresHistory?: Array<{ lessonId: number; score: number; total: number; date: string }>;
  competency: {
    nhanBietRate: number; // %
    thongHieuRate: number; // %
    vanDungRate: number; // %
  };
  recentMistakes: string[];
}

/**
 * Cấu trúc chuẩn từng bước học tập bám sát SGK KHTN 9
 */
export interface SgkStepOption {
  id: string; // choiceId cố định
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface SgkStep {
  id: string; // e.g. "b1_s0", "b1_s1"
  stepNumber: number;
  title: string;
  sgkSection: string; // "Khởi động", "Mục I.1", "Mục I.2", ..., "Luyện tập cuối bài"
  badge: string;
  isFinalQuiz?: boolean;

  // 1. LÍ THUYẾT: ngắn gọn, chia ý, công thức, định nghĩa, thẻ kiến thức
  theory: {
    summary: string;
    points: string[];
    definitionOrFormula?: string;
    keyRules?: string[];
  };

  // 2. VÍ DỤ / MINH HỌA: tình huống thực tiễn THCS, tính toán dữ kiện rõ ràng
  example: {
    title: string;
    scenario: string;
    calculation?: {
      given: string;
      formula: string;
      substitution: string;
      result: string;
    };
    explanation?: string;
  };

  // 3. THÍ NGHIỆM ẢO / MINH HỌA TRỰC QUAN (nếu có)
  simulationType?: 'optics' | 'galvanometer' | 'chemistry' | 'immersion_oil' | 'amber_bottle' | 'kinetic_ramp' | 'potential_weight' | 'roller_coaster';

  // 4. HOẠT ĐỘNG TƯƠNG TÁC
  activity?: {
    type: 'quiz' | 'predict' | 'matching';
    prompt: string;
    question: string;
    options: SgkStepOption[];
    matchingPairs?: Array<{ id: string; left: string; right: string }>;
  };

  // 5. KẾT LUẬN / GHI NHỚ
  takeaway: string;
}

export interface ContentMapLesson {
  id: number;
  chapterNumber: number;
  chapterTitle: string;
  lessonNumber: number;
  lessonTitle: string;
  page: number;
  coreKnowledge: string;
  status: 'active' | 'locked' | 'completed';
}

export interface InteractiveSimulation {
  id: string;
  title: string;
  type: 'galvanometer' | 'separatory_funnel' | 'thermal_mesh' | 'light_bottle' | 'immersion_oil' | 'scientific_report';
  description: string;
}

export interface KnowledgeCard {
  id: string;
  category: string;
  categoryName: string;
  title: string;
  explorationQuestion: string;
  observation: string;
  scientificExplanation: string;
  keyFormulasOrRules?: string[];
  examples: string[];
  interactiveSimId?: string;
  quickCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface PracticeQuestion {
  id: string;
  level: DifficultyLevel;
  levelName: string;
  question: string;
  subText?: string;
  options: string[];
  correctIndex: number;
  hint?: string;
  explanation: string;
  sourceTextbookRef?: string;
}

export interface MatchingPair {
  id: string;
  tool: string;
  role: string;
  category: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface UserStats {
  xp: number;
  streakDays: number;
  completedCards: string[];
  practiceAnswers: Record<string, { answered: boolean; isCorrect: boolean; attempts: number }>;
  finalQuizScore?: number;
  finalQuizCompleted: boolean;
  badges: Badge[];
  activeLessonId: number;
}

