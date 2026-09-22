/**
 * DANH SÁCH TÀI KHOẢN GMAIL GIÁO VIÊN ĐƯỢC CẤP QUYỀN (AUTHORIZED_TEACHER_EMAILS)
 * 
 * 🚨 NGUYÊN TẮC BẢO MẬT BẮT BUỘC:
 * - HỌC SINH KHÔNG ĐƯỢC QUYỀN TỰ CHỌN VAI TRÒ GIÁO VIÊN.
 * - Chỉ những tài khoản Gmail nằm trong danh sách này mới được hệ thống
 *   xác định là 👨🏫 TEACHER và được cấp quyền truy cập Teacher Dashboard (8 lớp).
 * - Tất cả các Gmail khác khi đăng nhập ĐỀU TỰ ĐỘNG là 👨🎓 HỌC SINH (STUDENT).
 * 
 * 🚨 HƯỚNG DẪN DÀNH CHO GIÁO VIÊN:
 * Thầy/Cô hãy thay "EMAIL_GIAO_VIEN_CUA_TOI" bằng địa chỉ Gmail thật của Thầy/Cô.
 */
export const AUTHORIZED_TEACHER_EMAILS: string[] = [
  "nvphong.thcsphuninh@gmail.com"
];

/**
 * Kiểm tra xem một email có thuộc danh sách Giáo viên được cấp quyền hay không.
 * So sánh không phân biệt chữ hoa, chữ thường và bỏ khoảng trắng dư thừa.
 */
export function isAuthorizedTeacherEmail(email?: string | null): boolean {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();

  // 1. Kiểm tra trong danh sách hằng số cố định
  const isMatch = AUTHORIZED_TEACHER_EMAILS.some(
    teacherEmail => teacherEmail.trim().toLowerCase() === cleanEmail
  );
  if (isMatch) return true;

  // 2. Kiểm tra trong danh sách giáo viên được cấp quyền lưu bổ sung tại localStorage (nếu có)
  try {
    const customList = JSON.parse(localStorage.getItem('khtn9_authorized_teachers') || '[]');
    if (Array.isArray(customList)) {
      return customList.some(
        e => typeof e === 'string' && e.trim().toLowerCase() === cleanEmail
      );
    }
  } catch {
    // bỏ qua lỗi đọc localStorage
  }

  return false;
}

/**
 * Cấp quyền bổ sung cho một Gmail giáo viên vào localStorage (tiện ích dành cho quản trị viên/giáo viên)
 */
export function addAuthorizedTeacherEmail(newEmail: string): boolean {
  if (!newEmail || !newEmail.includes('@')) return false;
  const cleanEmail = newEmail.trim().toLowerCase();
  
  try {
    const existingList: string[] = JSON.parse(localStorage.getItem('khtn9_authorized_teachers') || '[]');
    if (!existingList.includes(cleanEmail)) {
      existingList.push(cleanEmail);
      localStorage.setItem('khtn9_authorized_teachers', JSON.stringify(existingList));
    }
    return true;
  } catch {
    return false;
  }
}
