import { 
  HOOK_SCENARIO as HOOK_SCENARIO_1, 
  KNOWLEDGE_CARDS as KNOWLEDGE_CARDS_1, 
  MATCHING_PAIRS as MATCHING_PAIRS_1, 
  PRACTICE_QUESTIONS as PRACTICE_QUESTIONS_1, 
  REAL_WORLD_APPLICATION as REAL_WORLD_APPLICATION_1, 
  EXTENSION_CONTENT as EXTENSION_CONTENT_1, 
  FINAL_ASSESSMENT_QUIZ as FINAL_ASSESSMENT_QUIZ_1 
} from '../data/lesson1Data';

import { 
  HOOK_SCENARIO_2, 
  KNOWLEDGE_CARDS_2, 
  PRACTICE_QUESTIONS_2, 
  REAL_WORLD_APPLICATION_2, 
  EXTENSION_CONTENT_2, 
  FINAL_ASSESSMENT_QUIZ_2 
} from '../data/lesson2Data';

import { 
  HOOK_SCENARIO_3, 
  KNOWLEDGE_CARDS_3, 
  CORE_SUMMARY_3, 
  DETECTIVE_MISSIONS_3, 
  PRACTICE_QUESTIONS_3, 
  REAL_WORLD_APPLICATION_3, 
  EXTENSION_CONTENT_3, 
  FINAL_ASSESSMENT_QUIZ_3 
} from '../data/lesson3Data';

import {
  HOOK_SCENARIO_4,
  KNOWLEDGE_CARDS_4,
  CORE_SUMMARY_4,
  MATCHING_PAIRS_LESSON_4,
  DETECTIVE_MISSIONS_LESSON_4,
  PRACTICE_QUESTIONS_4,
  REAL_WORLD_APPLICATION_4,
  EXTENSION_CONTENT_4,
  FINAL_ASSESSMENT_QUIZ_4
} from '../data/lesson4Data';

import { 
  ESSAY_QUESTION_LESSON_1, 
  ESSAY_QUESTION_LESSON_2, 
  ESSAY_QUESTION_LESSON_3,
  ESSAY_QUESTION_LESSON_4 
} from '../data/essayQuestions';

import { EssayQuestion, PracticeQuestion } from '../types';

export interface RegisteredLesson {
  id: number;
  lessonKey: string;
  lessonNumber: number;
  title: string;
  shortTitle?: string;
  subtitle: string;
  chapterNumber: number;
  chapterTitle: string;
  page: number;
  coreKnowledge: string;

  // 8 Stages Content Data
  hook: any;
  knowledgeCards: any[];
  matchingPairs: Array<{ id: string; tool: string; role: string; category: string }>;
  summary?: any;
  games?: any[];
  practice: PracticeQuestion[];
  realWorld: any;
  extension: any;
  finalQuiz: PracticeQuestion[];
  essay: EssayQuestion;
}

// Matching pairs cho Bài 2 (Động năng & Thế năng)
const MATCHING_PAIRS_LESSON_2 = [
  { id: 'm1', tool: 'Động năng Wđ', role: 'Năng lượng do vật chuyển động mà có (Wđ = 1/2 m v²)', category: 'Động học' },
  { id: 'm2', tool: 'Thế năng trọng trường Wt', role: 'Năng lượng do vật ở độ cao h so với mốc (Wt = P.h = m.g.h)', category: 'Trọng trường' },
  { id: 'm3', tool: 'Đơn vị chuẩn Jun (J)', role: 'Đơn vị đo lường công cơ học, động năng, thế năng trong hệ SI', category: 'Đơn vị SI' },
  { id: 'm4', tool: 'Mốc thế năng (h = 0)', role: 'Vị trí quy ước có thế năng bằng 0 (thông thường chọn mặt đất)', category: 'Quy ước' },
  { id: 'm5', tool: 'Tốc độ v tăng gấp 2 lần', role: 'Động năng của vật tăng vọt lên 4 lần (tỉ lệ với bình phương v²)', category: 'Quy luật' },
];

// Matching pairs cho Bài 3 (Cơ năng)
const MATCHING_PAIRS_LESSON_3 = [
  { id: 'm3_1', tool: 'Cơ năng W', role: 'Tổng của động năng và thế năng của vật: W = Wđ + Wt', category: 'Khái niệm' },
  { id: 'm3_2', tool: 'Định luật bảo toàn cơ năng', role: 'Chỉ chịu trọng lực, cơ năng không đổi: Wđ + Wt = const', category: 'Định luật' },
  { id: 'm3_3', tool: 'Tại điểm rơi cao nhất', role: 'Vận tốc v = 0, động năng Wđ = 0, thế năng Wt đạt cực đại', category: 'Hệ quả' },
  { id: 'm3_4', tool: 'Tại vị trí chạm đất', role: 'Độ cao h = 0, thế năng Wt = 0, động năng Wđ đạt cực đại', category: 'Hệ quả' },
  { id: 'm3_5', tool: 'Hao phí do ma sát', role: 'Cơ năng giảm dần chuyển hoá thành nhiệt năng và năng lượng âm thanh', category: 'Thực tiễn' },
];

// Trò chơi Thám tử cho Bài 1
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
    scenario: 'Nhiệm vụ 2: Trong thí nghiệm đo cường độ dòng điện cảm ứng xoay chiều rất nhỏ xuất hiện khi nam châm rơi qua cuộn dây.',
    question: 'Thiết bị nào sau đây phản ứng nhạy nhất và đo được chiều dòng điện hai phía?',
    options: [
      'Điện kế chứng minh (Galvanometer với vạch 0 ở giữa)',
      'Ampe kế xoay chiều thang đo 10A',
      'Vôn kế 220V dân dụng',
      'Đồng hồ đo thời gian hiện số',
    ],
    correctIndex: 0,
    explanation: 'Điện kế có kim ở chính giữa (vạch 0 trung tâm) cực kỳ nhạy cảm với dòng điện mili-ampe hoặc micro-ampe và chỉ rõ chiều dòng điện rẽ sang trái hay phải.',
  },
  {
    id: 'det_3',
    scenario: 'Nhiệm vụ 3: Đun nóng chất lỏng hữu cơ dễ cháy trong ống nghiệm bằng ngọn lửa đèn cồn.',
    question: 'Biện pháp nào sau đây là BẮT BUỘC để đảm bảo an toàn tuyệt đối?',
    options: [
      'Đun cách thuỷ qua cốc nước đặt trên lưới thép tản nhiệt',
      'Chĩa miệng ống nghiệm thẳng vào mắt để quan sát bốc hơi',
      'Đun trực tiếp lửa to đáy ống nghiệm và đậy thật chặt nút',
      'Dùng cồn 90 độ đổ trực tiếp vào ống nghiệm khi đang cháy',
    ],
    correctIndex: 0,
    explanation: 'Chất lỏng hữu cơ dễ cháy phải đun cách thuỷ trên lưới tản nhiệt, miệng ống nghiệm nghiêng 45 độ hướng về phía không có người.',
  },
  {
    id: 'det_4',
    scenario: 'Nhiệm vụ 4: Sau buổi thực hành, nhóm học sinh cần viết báo cáo khoa học trình bày trước lớp.',
    question: 'Phần nào trong báo cáo thực hành thể hiện tính trung thực và khách quan khoa học cao nhất?',
    options: [
      'Bảng số liệu gốc và phân tích nguyên nhân sai số',
      'Lời cảm ơn dài và hình ảnh trang trí đẹp',
      'Tự ý sửa số liệu cho khớp hoàn hảo với công thức lý thuyết',
      'Chỉ ghi kết luận và bỏ qua bảng số liệu đo',
    ],
    correctIndex: 0,
    explanation: 'Khoa học đòi hỏi trung thực: luôn giữ nguyên số liệu đo đạc thực tế, tính giá trị trung bình và phân tích nguyên nhân sai số thực nghiệm.',
  },
];

// Trò chơi Thám tử cho Bài 2
const DETECTIVE_MISSIONS_LESSON_2 = [
  {
    id: 'det_2_1',
    scenario: 'Nhiệm vụ 1: Một chiếc ô tô chở khách 2 tấn và một xe đạp 15 kg cùng di chuyển trên đường với tốc độ 36 km/h (10 m/s).',
    question: 'Xe nào có động năng lớn hơn và gấp bao nhiêu lần?',
    options: [
      'Ô tô có động năng lớn hơn gấp hơn 133 lần vì khối lượng lớn hơn nhiều',
      'Xe đạp có động năng lớn hơn vì nhẹ hơn',
      'Hai xe có động năng bằng nhau vì cùng tốc độ 36 km/h',
      'Không so sánh được vì hai loại phương tiện khác nhau',
    ],
    correctIndex: 0,
    explanation: 'Động năng tỉ lệ thuận với khối lượng: Wđ_ô tô = 1/2 · 2000 · 10² = 100 000 J; Wđ_xe đạp = 1/2 · 15 · 10² = 750 J. Ô tô lớn hơn gấp 133,3 lần!',
  },
  {
    id: 'det_2_2',
    scenario: 'Nhiệm vụ 2: Búa máy khối lượng 500 kg được kéo lên độ cao 6 m rồi thả rơi tự do để đóng cọc bê tông (g = 10 m/s²).',
    question: 'Thế năng của búa máy ở độ cao 6 m là bao nhiêu?',
    options: [
      '30 000 J (30 kJ)',
      '3 000 J',
      '300 000 J',
      '15 000 J',
    ],
    correctIndex: 0,
    explanation: 'Thế năng trọng trường Wt = m · g · h = 500 · 10 · 6 = 30 000 J (30 kJ).',
  },
  {
    id: 'det_2_3',
    scenario: 'Nhiệm vụ 3: Khi xe đang chạy với tốc độ 40 km/h, người lái xe tăng tốc lên 80 km/h (tăng gấp đôi).',
    question: 'Động năng của xe và quãng đường phanh khẩn cấp sẽ thay đổi thế nào?',
    options: [
      'Động năng tăng gấp 4 lần, quãng đường phanh tăng khoảng 4 lần',
      'Động năng chỉ tăng gấp 2 lần',
      'Động năng không đổi vì khối lượng xe không đổi',
      'Quãng đường phanh giảm đi một nửa',
    ],
    correctIndex: 0,
    explanation: 'Vì động năng tỉ lệ với bình phương vận tốc (v²), tốc độ tăng 2 lần => động năng tăng 2² = 4 lần. Lực phanh sinh công cản tương ứng nên quãng đường phanh tăng 4 lần!',
  },
  {
    id: 'det_2_4',
    scenario: 'Nhiệm vụ 4: Một quả táo rơi từ trên cành cây cao 3 m xuống mặt đất.',
    question: 'Trong suốt quá trình rơi, dạng năng lượng nào đã chuyển hoá thành dạng năng lượng nào?',
    options: [
      'Thế năng trọng trường chuyển hoá thành Động năng',
      'Động năng chuyển hoá thành Thế năng',
      'Cơ năng chuyển hoá thành Hoá năng',
      'Nhiệt năng chuyển hoá thành Thế năng',
    ],
    correctIndex: 0,
    explanation: 'Khi rơi, độ cao h giảm làm thế năng Wt giảm, đồng thời tốc độ v tăng làm động năng Wđ tăng tương ứng. Thế năng chuyển hoá thành động năng.',
  },
];

// =========================================================================
// DANH MỤC CÁC BÀI HỌC ĐÃ TRIỂN KHAI NỘI DUNG TOÀN DIỆN (REGISTERED LESSONS)
// =========================================================================
// Khi giáo viên bổ sung Bài 4, Bài 5, Bài 6...:
// 1. Tạo file lesson4Data.ts
// 2. Import vào đây và thêm 1 phần tử vào mảng REGISTERED_LESSONS
// Hệ thống sẽ tự động cập nhật mọi màn hình, mở khoá tự động, cập nhật tiến độ
// và giữ nguyên 100% dữ liệu học sinh cũ!
// =========================================================================

export const REGISTERED_LESSONS: RegisteredLesson[] = [
  {
    id: 1,
    lessonKey: 'lesson_01',
    lessonNumber: 1,
    title: 'Bài 1: Nhận biết một số dụng cụ, hoá chất. Thuyết trình một vấn đề khoa học',
    shortTitle: 'Dụng Cụ & Thuyết Trình',
    subtitle: 'Chương Mở đầu - Trang 6 SGK KHTN 9 (Kết nối tri thức)',
    chapterNumber: 0,
    chapterTitle: 'Mở Đầu: Thiết Bị Thí Nghiệm & Phương Pháp',
    page: 6,
    coreKnowledge: 'Quy tắc an toàn, nhận biết các dụng cụ quang học, điện kế, hoá chất và cấu trúc bài thuyết trình khoa học.',
    hook: HOOK_SCENARIO_1,
    knowledgeCards: KNOWLEDGE_CARDS_1,
    matchingPairs: MATCHING_PAIRS_1,
    games: DETECTIVE_MISSIONS_LESSON_1,
    practice: PRACTICE_QUESTIONS_1,
    realWorld: REAL_WORLD_APPLICATION_1,
    extension: EXTENSION_CONTENT_1,
    finalQuiz: FINAL_ASSESSMENT_QUIZ_1,
    essay: ESSAY_QUESTION_LESSON_1,
  },
  {
    id: 2,
    lessonKey: 'lesson_02',
    lessonNumber: 2,
    title: 'Bài 2: Động năng. Thế năng',
    shortTitle: 'Động Năng & Thế Năng',
    subtitle: 'Chương I: Năng lượng cơ học - Trang 12 SGK KHTN 9 (Kết nối tri thức)',
    chapterNumber: 1,
    chapterTitle: 'Chương I: Năng Lượng Cơ Học',
    page: 12,
    coreKnowledge: 'Công thức động năng Wđ = 1/2 m v²; thế năng trọng trường Wt = P h = m g h; các yếu tố ảnh hưởng và ứng dụng thực tế.',
    hook: HOOK_SCENARIO_2,
    knowledgeCards: KNOWLEDGE_CARDS_2,
    matchingPairs: MATCHING_PAIRS_LESSON_2,
    games: DETECTIVE_MISSIONS_LESSON_2,
    practice: PRACTICE_QUESTIONS_2,
    realWorld: REAL_WORLD_APPLICATION_2,
    extension: EXTENSION_CONTENT_2,
    finalQuiz: FINAL_ASSESSMENT_QUIZ_2,
    essay: ESSAY_QUESTION_LESSON_2,
  },
  {
    id: 3,
    lessonKey: 'lesson_03',
    lessonNumber: 3,
    title: 'Bài 3: Cơ năng',
    shortTitle: 'Cơ Năng',
    subtitle: 'Chương I: Năng lượng cơ học - Trang 18 SGK KHTN 9 (Kết nối tri thức)',
    chapterNumber: 1,
    chapterTitle: 'Chương I: Năng Lượng Cơ Học',
    page: 18,
    coreKnowledge: 'Cơ năng W = Wđ + Wt; sự chuyển hoá qua lại giữa động năng và thế năng; định luật bảo toàn cơ năng và sự hao phí.',
    hook: HOOK_SCENARIO_3,
    knowledgeCards: KNOWLEDGE_CARDS_3,
    matchingPairs: MATCHING_PAIRS_LESSON_3,
    summary: CORE_SUMMARY_3,
    games: DETECTIVE_MISSIONS_3,
    practice: PRACTICE_QUESTIONS_3,
    realWorld: REAL_WORLD_APPLICATION_3,
    extension: EXTENSION_CONTENT_3,
    finalQuiz: FINAL_ASSESSMENT_QUIZ_3,
    essay: ESSAY_QUESTION_LESSON_3,
  },
  {
    id: 4,
    lessonKey: 'lesson_04',
    lessonNumber: 4,
    title: 'Bài 4: Công và công suất',
    shortTitle: 'Công & Công Suất',
    subtitle: 'Chương I: Năng lượng cơ học - Trang 21 SGK KHTN 9 (Kết nối tri thức)',
    chapterNumber: 1,
    chapterTitle: 'Chương I: Năng Lượng Cơ Học',
    page: 21,
    coreKnowledge: 'Công cơ học A = F·s (J); điều kiện sinh công và các trường hợp A = 0; công suất P = A/t = F·v (W, kW, HP); ý nghĩa số ghi công suất.',
    hook: HOOK_SCENARIO_4,
    knowledgeCards: KNOWLEDGE_CARDS_4,
    matchingPairs: MATCHING_PAIRS_LESSON_4,
    summary: CORE_SUMMARY_4,
    games: DETECTIVE_MISSIONS_LESSON_4,
    practice: PRACTICE_QUESTIONS_4,
    realWorld: REAL_WORLD_APPLICATION_4,
    extension: EXTENSION_CONTENT_4,
    finalQuiz: FINAL_ASSESSMENT_QUIZ_4,
    essay: ESSAY_QUESTION_LESSON_4,
  },
];

// =========================================================================
// TIỆN ÍCH QUẢN LÝ TIẾN ĐỘ & MỞ KHOÁ TỰ ĐỘNG (PROGRESSION ENGINE)
// =========================================================================

/**
 * Lấy toàn bộ danh sách bài học đã triển khai
 */
export function getAllRegisteredLessons(): RegisteredLesson[] {
  return REGISTERED_LESSONS;
}

/**
 * Lấy tổng số bài học hiện có trong hệ thống (dynamic)
 */
export function getTotalRegisteredLessons(): number {
  return REGISTERED_LESSONS.length;
}

/**
 * Lấy dữ liệu bài học theo ID hoặc key (mặc định fallback về Bài 1 nếu không tìm thấy)
 */
export function getLessonModule(lessonId: number | string): RegisteredLesson {
  const numId = typeof lessonId === 'string' ? parseInt(lessonId.replace(/\D/g, ''), 10) : lessonId;
  const found = REGISTERED_LESSONS.find(l => l.id === numId || l.lessonKey === String(lessonId));
  return found || REGISTERED_LESSONS[0];
}

/**
 * Kiểm tra xem bài học có trong hệ thống không
 */
export function isLessonRegistered(lessonId: number | string): boolean {
  const numId = typeof lessonId === 'string' ? parseInt(lessonId.replace(/\D/g, ''), 10) : lessonId;
  return REGISTERED_LESSONS.some(l => l.id === numId || l.lessonKey === String(lessonId));
}

/**
 * NGUYÊN TẮC V & VI: TÍNH TOÁN CƠ CHẾ MỞ KHOÁ TỰ ĐỘNG
 * - Bài 1 luôn luôn mở khoá (AVAILABLE / COMPLETED).
 * - Bài N (N > 1) được mở khoá (AVAILABLE) NẾU VÀ CHỈ NẾU Bài (N-1) đã có trong completedLessons.
 * - Nếu Bài (N-1) chưa hoàn thành -> Bài N vẫn BỊ KHOÁ (LOCKED).
 * 
 * Áp dụng hoàn hảo cho các kịch bản:
 * - Test 1: Học sinh hoàn thành Bài 1, 2, 3 -> Giáo viên thêm Bài 4 -> Bài 4 TỰ ĐỘNG MỞ KHOÁ!
 * - Test 2: Học sinh mới hoàn thành Bài 1 -> Giáo viên thêm Bài 4 -> Bài 2 mở, Bài 3 & 4 BỊ KHOÁ!
 */
export function computeUnlockedLessonIds(completedLessons: (number | string)[] = []): number[] {
  const unlocked = new Set<number>([1]); // Bài 1 luôn mở

  const safeCompleted = Array.isArray(completedLessons) ? completedLessons : [];
  const normalizedCompleted = safeCompleted.map(id => {
    if (typeof id === 'number') return id;
    const match = String(id).match(/\d+/);
    return match ? parseInt(match[0], 10) : NaN;
  }).filter(n => !isNaN(n));

  for (let i = 0; i < REGISTERED_LESSONS.length; i++) {
    const currentLesson = REGISTERED_LESSONS[i];
    const prevLesson = i > 0 ? REGISTERED_LESSONS[i - 1] : null;

    if (!prevLesson) {
      unlocked.add(currentLesson.id);
    } else {
      // Nếu bài trước đã hoàn thành -> mở khoá bài hiện tại
      if (normalizedCompleted.includes(prevLesson.id)) {
        unlocked.add(currentLesson.id);
      }
    }
  }

  return Array.from(unlocked).sort((a, b) => a - b);
}

/**
 * Kiểm tra xem một bài học cụ thể có mở khoá cho học sinh hay không
 */
export function isLessonUnlocked(lessonId: number | string, completedLessons: (number | string)[] = []): boolean {
  const unlockedList = computeUnlockedLessonIds(completedLessons);
  const numId = typeof lessonId === 'string' ? parseInt(lessonId.replace(/\D/g, ''), 10) : lessonId;
  return unlockedList.includes(numId);
}

/**
 * NGUYÊN TẮC IX: TÍNH TIẾN ĐỘ TỔNG THỂ ĐÚNG ĐẮN
 * Tiến độ = (Số bài đã hoàn thành / Tổng số bài hiện có trong app) * 100%
 */
export function calculateStudentOverallProgress(completedLessons: (number | string)[] = []): {
  completedCount: number;
  totalLessons: number;
  percentage: number;
  displayText: string;
} {
  const total = REGISTERED_LESSONS.length;
  const safeCompleted = Array.isArray(completedLessons) ? completedLessons : [];
  const normalizedCompleted = Array.from(new Set(
    safeCompleted.map(id => {
      if (typeof id === 'number') return id;
      const match = String(id).match(/\d+/);
      return match ? parseInt(match[0], 10) : NaN;
    }).filter(n => !isNaN(n) && REGISTERED_LESSONS.some(l => l.id === n))
  ));

  const completedCount = normalizedCompleted.length;
  const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  return {
    completedCount,
    totalLessons: total,
    percentage,
    displayText: `Đã hoàn thành ${completedCount}/${total} bài (${percentage}%)`,
  };
}

/**
 * NGUYÊN TẮC X: THÔNG BÁO BÀI HỌC MỚI (CHỈ THÔNG BÁO 1 LẦN CHO MỖI BÀI)
 * Trả về danh sách các bài học mới được mở khoá mà học sinh chưa xem thông báo
 */
export function getNewLessonsToNotify(completedLessons: (number | string)[] = []): RegisteredLesson[] {
  try {
    const rawNotified = localStorage.getItem('khtn9_notified_lessons');
    const notifiedIds: number[] = rawNotified ? JSON.parse(rawNotified) : [1]; // Mặc định bài 1 đã biết

    const unlocked = computeUnlockedLessonIds(completedLessons);
    
    // Tìm các bài đã mở nhưng chưa được thông báo
    const newLessons = REGISTERED_LESSONS.filter(
      lesson => unlocked.includes(lesson.id) && !notifiedIds.includes(lesson.id)
    );

    return newLessons;
  } catch (err) {
    return [];
  }
}

/**
 * Đánh dấu bài học đã được thông báo để không hiện lại
 */
export function markLessonAsNotified(lessonId: number): void {
  try {
    const rawNotified = localStorage.getItem('khtn9_notified_lessons');
    const notifiedIds: number[] = rawNotified ? JSON.parse(rawNotified) : [1];
    if (!notifiedIds.includes(lessonId)) {
      notifiedIds.push(lessonId);
      localStorage.setItem('khtn9_notified_lessons', JSON.stringify(notifiedIds));
    }
  } catch (err) {
    console.warn('[LessonRegistry] Không thể lưu trạng thái thông báo:', err);
  }
}

/**
 * Chuỗi định danh phiên bản nội dung app
 */
export function getAppContentVersion(): string {
  const ids = REGISTERED_LESSONS.map(l => l.id).join('_');
  return `khtn9_v2.5_lessons_${ids}`;
}
