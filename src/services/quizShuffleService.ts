/**
 * Dịch vụ xáo trộn đáp án trắc nghiệm với thuật toán Fisher-Yates
 * Đảm bảo:
 * 1. Phân bố đáp án đúng cân bằng giữa A - B - C - D.
 * 2. Lưu trữ ID đáp án độc lập (id, text, isCorrect).
 * 3. Chấm điểm theo selectedOptionId === correctOptionId.
 * 4. Không shuffle lại trong cùng một attempt (ổn định khi chuyển câu).
 * 5. Attempt mới tạo thứ tự xáo trộn mới.
 */

export interface QuizOptionItem {
  id: string;
  text: string;
  isCorrect: boolean;
  originalIndex: number;
}

export interface ShuffledQuestion {
  questionId: string;
  options: QuizOptionItem[];
  correctOptionId: string;
}

/**
 * Thuật toán Fisher-Yates xáo trộn mảng an toàn
 */
export function fisherYatesShuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Xáo trộn một tập hợp câu hỏi (ví dụ 14 câu Final Quiz hoặc Practice Stage)
 * Đảm bảo phân bố vị trí đáp án đúng cân bằng đều giữa A, B, C, D
 */
export function shuffleQuestionsWithBalancedAnswers(
  questions: Array<{ id: string; options: string[]; correctIndex: number }>
): Record<string, ShuffledQuestion> {
  const result: Record<string, ShuffledQuestion> = {};
  const total = questions.length;
  if (total === 0) return result;

  // Tạo danh sách target positions cân bằng (0: A, 1: B, 2: C, 3: D)
  const targetPositions: number[] = [];
  for (let i = 0; i < total; i++) {
    targetPositions.push(i % 4);
  }
  // Xáo trộn thứ tự target positions bằng Fisher-Yates
  const shuffledTargets = fisherYatesShuffle(targetPositions);

  questions.forEach((q, idx) => {
    const numOptions = q.options.length;
    const targetCorrectPos = Math.min(shuffledTargets[idx], numOptions - 1);

    // Tạo danh sách option items với ID cố định dựa trên index gốc
    const allOptions: QuizOptionItem[] = q.options.map((text, origIdx) => ({
      id: `${q.id}_opt_${origIdx}`,
      text,
      isCorrect: origIdx === q.correctIndex,
      originalIndex: origIdx,
    }));

    const correctOption = allOptions[q.correctIndex] || allOptions[0];
    const distractorOptions = allOptions.filter((_, origIdx) => origIdx !== q.correctIndex);
    const shuffledDistractors = fisherYatesShuffle(distractorOptions);

    // Đặt đáp án đúng vào vị trí targetCorrectPos, điền các distractors vào các vị trí còn lại
    const finalShuffledOptions: QuizOptionItem[] = [];
    let distractorIndex = 0;

    for (let slot = 0; slot < numOptions; slot++) {
      if (slot === targetCorrectPos) {
        finalShuffledOptions.push(correctOption);
      } else {
        if (distractorIndex < shuffledDistractors.length) {
          finalShuffledOptions.push(shuffledDistractors[distractorIndex++]);
        } else {
          finalShuffledOptions.push(correctOption);
        }
      }
    }

    result[q.id] = {
      questionId: q.id,
      options: finalShuffledOptions,
      correctOptionId: correctOption.id,
    };
  });

  return result;
}

/**
 * Xáo trộn một câu hỏi đơn lẻ (như QuickCheck trong thẻ bài, Thám tử phòng lab, Khởi động)
 * Đảm bảo đáp án đúng ngẫu nhiên ở A, B, C hoặc D
 */
export function shuffleSingleQuestion(
  questionId: string,
  options: string[],
  correctIndex: number
): ShuffledQuestion {
  const numOptions = options.length;
  const targetCorrectPos = Math.floor(Math.random() * numOptions);

  const allOptions: QuizOptionItem[] = options.map((text, origIdx) => ({
    id: `${questionId}_opt_${origIdx}`,
    text,
    isCorrect: origIdx === correctIndex,
    originalIndex: origIdx,
  }));

  const correctOption = allOptions[correctIndex] || allOptions[0];
  const distractors = allOptions.filter((_, origIdx) => origIdx !== correctIndex);
  const shuffledDistractors = fisherYatesShuffle(distractors);

  const finalShuffledOptions: QuizOptionItem[] = [];
  let distractorIdx = 0;

  for (let slot = 0; slot < numOptions; slot++) {
    if (slot === targetCorrectPos) {
      finalShuffledOptions.push(correctOption);
    } else {
      if (distractorIdx < shuffledDistractors.length) {
        finalShuffledOptions.push(shuffledDistractors[distractorIdx++]);
      } else {
        finalShuffledOptions.push(correctOption);
      }
    }
  }

  return {
    questionId,
    options: finalShuffledOptions,
    correctOptionId: correctOption.id,
  };
}

/**
 * Xáo trộn câu hỏi từ cấu trúc options có sẵn { text: string; correct: boolean }
 * Thường dùng trong HookScenario
 */
export function shuffleScenarioQuestion(
  questionId: string,
  options: Array<{ text: string; correct: boolean; feedback?: string }>
): {
  options: Array<{ id: string; text: string; correct: boolean; feedback?: string; originalIndex: number }>;
  correctOptionId: string;
} {
  const allOptions = options.map((opt, idx) => ({
    id: `${questionId}_opt_${idx}`,
    text: opt.text,
    correct: opt.correct,
    feedback: opt.feedback,
    originalIndex: idx,
  }));

  const correctOption = allOptions.find(o => o.correct) || allOptions[0];
  const distractors = allOptions.filter(o => !o.correct);
  const shuffledDistractors = fisherYatesShuffle(distractors);

  const targetPos = Math.floor(Math.random() * options.length);
  const finalOptions: Array<{ id: string; text: string; correct: boolean; feedback?: string; originalIndex: number }> = [];
  let distractorIdx = 0;

  for (let slot = 0; slot < options.length; slot++) {
    if (slot === targetPos) {
      finalOptions.push(correctOption);
    } else {
      if (distractorIdx < shuffledDistractors.length) {
        finalOptions.push(shuffledDistractors[distractorIdx++]);
      } else {
        finalOptions.push(correctOption);
      }
    }
  }

  return {
    options: finalOptions,
    correctOptionId: correctOption.id,
  };
}
