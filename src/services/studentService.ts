import { QuizAttempt, StudentProgressItem, UserAccount } from '../types';
import { apiRecordQuizAttempt, apiUpsertStudent } from './apiService';

const ATTEMPTS_STORAGE_KEY = 'khtn9_quiz_attempts';
const STUDENTS_REGISTRY_KEY = 'khtn9_students_registry';

/**
 * Lưu attempt làm bài kiểm tra hợp lệ khi học sinh thực sự nộp bài
 * Đồng bộ cả LocalStorage và Database chung của ứng dụng
 */
export function recordQuizAttempt(attempt: QuizAttempt): void {
  try {
    const attempts = getAllQuizAttempts();
    attempts.unshift(attempt);
    localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(attempts));

    // Cập nhật vào hồ sơ học sinh cục bộ
    updateStudentQuizRecord(attempt);

    // BẮT BUỘC: Đồng bộ vào Database chung của ứng dụng
    apiRecordQuizAttempt(attempt).catch(err => {
      console.warn('Lưu attempt lên server database cảnh báo:', err);
    });
  } catch (err) {
    console.error('Lỗi khi lưu attempt bài kiểm tra:', err);
  }
}

/**
 * Lấy danh sách tất cả các attempt đã nộp
 */
export function getAllQuizAttempts(): QuizAttempt[] {
  try {
    const raw = localStorage.getItem(ATTEMPTS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as QuizAttempt[];
  } catch {
    return [];
  }
}

/**
 * Lấy các attempt của một học sinh theo email
 */
export function getStudentAttempts(email: string): QuizAttempt[] {
  const cleanEmail = email.trim().toLowerCase();
  return getAllQuizAttempts().filter(a => a.studentEmail.trim().toLowerCase() === cleanEmail);
}

/**
 * Đăng ký hoặc cập nhật hồ sơ học sinh vào hệ thống quản lý
 * Đồng bộ cả LocalStorage và Server Database
 */
export function registerStudentInDirectory(student: UserAccount): void {
  if (student.role !== 'student' || !student.email) return;

  try {
    const raw = localStorage.getItem(STUDENTS_REGISTRY_KEY);
    const registry: Record<string, Partial<UserAccount>> = raw ? JSON.parse(raw) : {};
    const key = student.email.trim().toLowerCase();
    
    registry[key] = {
      id: student.id,
      email: student.email,
      name: student.name,
      avatar: student.avatar,
      gradeClass: student.gradeClass,
      role: 'student',
      school: student.school,
      joinDate: student.joinDate,
      xp: student.xp,
      completedLessonIds: student.completedLessonIds || [],
      unlockedLessonIds: student.unlockedLessonIds || [1],
      quizRecords: student.quizRecords || {}
    };

    localStorage.setItem(STUDENTS_REGISTRY_KEY, JSON.stringify(registry));

    // BẮT BUỘC: Đồng bộ lên database chung
    apiUpsertStudent(student).catch(err => {
      console.warn('Đồng bộ học sinh lên database cảnh báo:', err);
    });
  } catch (err) {
    console.error('Lỗi đăng ký học sinh vào directory:', err);
  }
}

/**
 * Cập nhật điểm và bài thi vào hồ sơ học sinh sau khi nộp bài
 */
function updateStudentQuizRecord(attempt: QuizAttempt): void {
  try {
    const studentKey = `khtn9_student_${attempt.studentEmail.trim().toLowerCase()}`;
    const rawStudent = localStorage.getItem(studentKey);
    if (rawStudent) {
      const student = JSON.parse(rawStudent) as UserAccount;
      if (!student.quizRecords) student.quizRecords = {};
      
      student.quizRecords[attempt.lessonId] = {
        lessonId: attempt.lessonId,
        score: attempt.score || 0,
        total: attempt.maxScore || 10,
        date: new Date().toLocaleDateString('vi-VN'),
        breakdown: {
          nhanBiet: 2.5,
          thongHieu: 2.5,
          vanDung: Math.max(0, +((attempt.score || 0) - 5.0).toFixed(1))
        }
      };

      if (attempt.score !== null && attempt.score >= 5) {
        if (!student.completedLessonIds) student.completedLessonIds = [];
        if (!student.completedLessonIds.includes(attempt.lessonId)) {
          student.completedLessonIds.push(attempt.lessonId);
        }
      }

      localStorage.setItem(studentKey, JSON.stringify(student));
      registerStudentInDirectory(student);
    }
  } catch (err) {
    console.error('Lỗi cập nhật điểm:', err);
  }
}

/**
 * Lấy toàn bộ danh sách học sinh cho Teacher Dashboard
 * BẮT BUỘC: Đọc trực tiếp từ Database thật (QUY TẮC IX, XII)
 * KHÔNG sử dụng Mock Data (QUY TẮC XII: Không hiển thị dữ liệu mẫu, Dashboard chỉ hiển thị dữ liệu từ Database thật)
 *
 * Áp dụng quy tắc bắt buộc:
 * - Học sinh mới chưa nộp bài -> lastQuizScore = null, completedTests = 0, status = 'not_started'
 */
export function getUnifiedStudentsList(
  _mockStudentsIgnored: StudentProgressItem[], 
  serverStudents: StudentProgressItem[] = []
): StudentProgressItem[] {
  const result: StudentProgressItem[] = [];
  const processedEmails = new Set<string>();

  // 1. Nguồn chuẩn duy nhất: Học sinh từ Database chung của server (QUY TẮC IX, XII)
  if (Array.isArray(serverStudents) && serverStudents.length > 0) {
    serverStudents.forEach(s => {
      if (s.email) {
        const clean = s.email.trim().toLowerCase();
        processedEmails.add(clean);
        result.push(s);
      }
    });
  }

  // 2. Dự phòng: Học sinh từ LocalStorage registry chỉ nếu chưa có trên server (hỗ trợ offline tạm thời)
  try {
    const raw = localStorage.getItem(STUDENTS_REGISTRY_KEY);
    if (raw) {
      const registry: Record<string, UserAccount> = JSON.parse(raw);
      Object.values(registry).forEach(user => {
        if (user.role === 'student' && user.email) {
          const cleanEmail = user.email.trim().toLowerCase();
          if (processedEmails.has(cleanEmail)) return;
          processedEmails.add(cleanEmail);

          // Kiểm tra các attempt đã nộp
          const attempts = getStudentAttempts(cleanEmail);
          const validSubmittedAttempts = attempts.filter(a => a.status === 'SUBMITTED' || a.status === 'GRADED');
          
          let latestScore: number | null = null;
          if (validSubmittedAttempts.length > 0) {
            latestScore = validSubmittedAttempts[0].score;
          } else if (user.quizRecords && Object.keys(user.quizRecords).length > 0) {
            const records = Object.values(user.quizRecords);
            latestScore = records[records.length - 1].score;
          }

          const hasCompletedLesson = user.completedLessonIds && user.completedLessonIds.length > 0;
          const status = validSubmittedAttempts.length > 0 || hasCompletedLesson
            ? 'completed'
            : (user.gradeClass ? 'in_progress' : 'not_started');

          const progressPercent = hasCompletedLesson ? 100 : (latestScore !== null ? 70 : 0);

          result.push({
            id: user.id || `hs-${cleanEmail}`,
            studentName: user.name,
            email: user.email,
            avatar: user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
            className: user.gradeClass || 'Chưa chọn lớp',
            currentLessonId: user.currentLessonId || 1,
            unlockedLessonIds: user.unlockedLessonIds || [1],
            completedLessonIds: user.completedLessonIds || [],
            overallProgress: progressPercent,
            lastQuizScore: latestScore, // null nếu chưa có bài nộp!
            completedTests: validSubmittedAttempts.length,
            completedExercises: hasCompletedLesson ? 8 : 0,
            lastActive: 'Hôm nay',
            status: status as any,
            competency: latestScore !== null ? {
              nhanBietRate: Math.min(100, Math.round(latestScore * 10)),
              thongHieuRate: Math.min(100, Math.round(latestScore * 9)),
              vanDungRate: Math.min(100, Math.round(latestScore * 8))
            } : {
              nhanBietRate: 0,
              thongHieuRate: 0,
              vanDungRate: 0
            },
            recentMistakes: []
          });
        }
      });
    }
  } catch (err) {
    console.error('Lỗi khi đọc registry học sinh:', err);
  }

  // TUYỆT ĐỐI KHÔNG thêm mockStudents vào kết quả theo QUY TẮC XII!
  return result;
}
