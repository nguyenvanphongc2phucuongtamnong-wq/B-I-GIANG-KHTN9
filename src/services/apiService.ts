import { ClassId, ClassTransferRequest, QuizAttempt, StudentProgressItem, UserAccount } from "../types";

const API_BASE = "/api";

/**
 * Helper an toàn để parse JSON từ Response, tránh lỗi '<!doctype' khi server trả về HTML
 */
async function safeJsonParse(res: Response): Promise<any> {
  if (!res.ok) return null;
  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return null;
  }
  try {
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Gọi API Upsert học sinh khi đăng nhập thành công
 */
export async function apiUpsertStudent(student: Partial<UserAccount>): Promise<{ success: boolean; student?: any; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/students/upsert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: student.id,
        email: student.email,
        displayName: student.name,
        avatar: student.avatar,
        classId: student.gradeClass,
        school: student.school
      })
    });

    const data = await safeJsonParse(res);
    if (!data || !res.ok) {
      return { success: false, message: data?.message || "Không thể kết nối API máy chủ" };
    }

    return { success: true, student: data.student };
  } catch {
    return { success: false, message: "Lỗi kết nối máy chủ" };
  }
}

/**
 * BẮT BUỘC: Học sinh chọn lớp -> Lưu vào Database chung -> Thành công mới vào học
 */
export async function apiSelectClass(params: {
  studentId: string;
  email: string;
  classId: ClassId;
  displayName?: string;
  avatar?: string;
}): Promise<{ success: boolean; student?: any; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/students/select-class`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params)
    });

    const data = await safeJsonParse(res);
    if (!data || !res.ok) {
      return { 
        success: false, 
        message: data?.message || "Chưa thể lưu thông tin lớp học. Vui lòng thử lại." 
      };
    }

    return { success: true, student: data.student };
  } catch {
    return { 
      success: false, 
      message: "Chưa thể lưu thông tin lớp học. Vui lòng thử lại." 
    };
  }
}

/**
 * Lấy danh sách học sinh từ Database chung cho Teacher Dashboard
 */
export async function apiFetchStudents(classId?: string): Promise<StudentProgressItem[]> {
  try {
    const query = classId && classId !== "all" ? `?classId=${encodeURIComponent(classId)}` : "";
    const res = await fetch(`${API_BASE}/students${query}`, {
      cache: "no-store",
      headers: { 
        "Pragma": "no-cache",
        "Cache-Control": "no-cache"
      }
    });

    const data = await safeJsonParse(res);
    if (data && Array.isArray(data.students)) {
      return data.students as StudentProgressItem[];
    }
    return [];
  } catch {
    return [];
  }
}

/**
 * Lấy chi tiết một học sinh từ database bằng email hoặc studentId
 */
export async function apiGetStudentDetails(id: string): Promise<any | null> {
  try {
    const res = await fetch(`${API_BASE}/students/${encodeURIComponent(id)}`, {
      cache: "no-store",
      headers: {
        "Pragma": "no-cache",
        "Cache-Control": "no-cache"
      }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.student || null;
  } catch (err) {
    console.error("[apiGetStudentDetails] Error:", err);
    return null;
  }
}

/**
 * BẮT BUỘC: Xác nhận bản ghi học sinh thực sự tồn tại trong Database sau khi lưu (QUY TẮC VII)
 */
export async function apiVerifyStudentRecord(
  emailOrId: string, 
  expectedClassId: string
): Promise<{ success: boolean; student?: any; message?: string }> {
  try {
    const student = await apiGetStudentDetails(emailOrId);
    if (!student) {
      return {
        success: false,
        message: "Không tìm thấy hồ sơ học sinh trong cơ sở dữ liệu sau khi lưu."
      };
    }

    if (student.classId !== expectedClassId) {
      return {
        success: false,
        message: `Lớp học trong cơ sở dữ liệu (${student.classId}) không khớp với lớp đã chọn (${expectedClassId}).`
      };
    }

    return { success: true, student };
  } catch (err: any) {
    console.error("[apiVerifyStudentRecord] Error:", err);
    return {
      success: false,
      message: "Lỗi kết nối khi xác thực hồ sơ học sinh với cơ sở dữ liệu."
    };
  }
}

/**
 * Cập nhật tiến độ học tập của học sinh
 */
export async function apiUpdateProgress(params: {
  studentId: string;
  email?: string;
  currentLesson?: number;
  completedLessons?: number[];
  completedStages?: Record<string, string[]>;
  progressPercent?: number;
  xp?: number;
  streakDays?: number;
}): Promise<void> {
  try {
    await fetch(`${API_BASE}/students/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params)
    });
  } catch (err) {
    console.error("[apiUpdateProgress] Error:", err);
  }
}

/**
 * Lưu kết quả làm bài kiểm tra vào Database chung
 */
export async function apiRecordQuizAttempt(attempt: QuizAttempt): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/quiz-attempts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(attempt)
    });
    return res.ok;
  } catch (err) {
    console.error("[apiRecordQuizAttempt] Error:", err);
    return false;
  }
}

/**
 * Lấy danh sách yêu cầu chuyển lớp
 */
export async function apiFetchTransfers(): Promise<ClassTransferRequest[]> {
  try {
    const res = await fetch(`${API_BASE}/transfers`, { cache: "no-store" });
    const data = await safeJsonParse(res);
    return data?.transfers || [];
  } catch {
    return [];
  }
}

/**
 * Nộp yêu cầu chuyển lớp từ học sinh
 */
export async function apiSubmitTransfer(request: ClassTransferRequest): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/students/transfer-request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request)
    });
    return res.ok;
  } catch (err) {
    console.error("[apiSubmitTransfer] Error:", err);
    return false;
  }
}

/**
 * Giáo viên duyệt chuyển lớp
 */
export async function apiApproveTransfer(reqId: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/transfers/${encodeURIComponent(reqId)}/approve`, {
      method: "POST"
    });
    return res.ok;
  } catch (err) {
    console.error("[apiApproveTransfer] Error:", err);
    return false;
  }
}

/**
 * Giáo viên từ chối chuyển lớp
 */
export async function apiRejectTransfer(reqId: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/transfers/${encodeURIComponent(reqId)}/reject`, {
      method: "POST"
    });
    return res.ok;
  } catch (err) {
    console.error("[apiRejectTransfer] Error:", err);
    return false;
  }
}

/**
 * Di chuyển dữ liệu cũ từ LocalStorage lên Database chung
 */
export async function apiSyncLegacyStudents(students: UserAccount[]): Promise<number> {
  try {
    const res = await fetch(`${API_BASE}/students/sync-legacy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ students })
    });
    if (!res.ok) return 0;
    const data = await res.json();
    return data.migratedCount || 0;
  } catch {
    return 0;
  }
}

