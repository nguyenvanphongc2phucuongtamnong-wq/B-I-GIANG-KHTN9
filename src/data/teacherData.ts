import { StudentProgressItem } from '../types';

export const MOCK_STUDENTS: StudentProgressItem[] = [
  // 9A1
  {
    id: 'hs-01',
    studentName: 'Nguyễn Văn Hải',
    email: 'nguyenvanhai.9a1@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    className: '9A1',
    currentLessonId: 1,
    unlockedLessonIds: [1],
    completedLessonIds: [1],
    overallProgress: 100,
    lastQuizScore: 9.5,
    completedTests: 1,
    completedExercises: 12,
    lastActive: '10 phút trước',
    status: 'completed',
    competency: {
      nhanBietRate: 100,
      thongHieuRate: 90,
      vanDungRate: 95
    },
    recentMistakes: ['Nhầm lẫn nhỏ ở phân biệt bình cầu đáy tròn và bình cầu đáy bằng']
  },
  {
    id: 'hs-new-01',
    studentName: 'Hoàng Quốc Bảo (Mới)',
    email: 'quocbao.hoang9a1@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
    className: '9A1',
    currentLessonId: 1,
    unlockedLessonIds: [1],
    completedLessonIds: [],
    overallProgress: 0,
    lastQuizScore: null,
    completedTests: 0,
    completedExercises: 0,
    lastActive: 'Vừa đăng ký',
    status: 'not_started',
    competency: {
      nhanBietRate: 0,
      thongHieuRate: 0,
      vanDungRate: 0
    },
    recentMistakes: []
  },
  {
    id: 'hs-02',
    studentName: 'Trần Thị Mai Anh',
    email: 'maianh.tran9a1@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    className: '9A1',
    currentLessonId: 1,
    unlockedLessonIds: [1],
    completedLessonIds: [1],
    overallProgress: 100,
    lastQuizScore: 9.0,
    lastActive: '1 giờ trước',
    status: 'completed',
    competency: {
      nhanBietRate: 100,
      thongHieuRate: 85,
      vanDungRate: 85
    },
    recentMistakes: ['Cần lưu ý thêm về quy tắc bảo quản dung dịch bạc nitrat AgNO3 trong lọ tối màu']
  },
  {
    id: 'hs-03',
    studentName: 'Lê Hoàng Long',
    email: 'hoanglong.le9a1@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    className: '9A1',
    currentLessonId: 1,
    unlockedLessonIds: [1],
    completedLessonIds: [],
    overallProgress: 65,
    lastQuizScore: 6.5,
    lastActive: '3 giờ trước',
    status: 'in_progress',
    competency: {
      nhanBietRate: 80,
      thongHieuRate: 60,
      vanDungRate: 55
    },
    recentMistakes: ['Rót nước vào axit đặc thay vì rót axit từ từ vào cốc nước', 'Chưa nhớ chức năng dầu soi kính hiển vi']
  },
  {
    id: 'hs-04',
    studentName: 'Phạm Minh Đức',
    email: 'minhduc.pham9a1@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    className: '9A1',
    currentLessonId: 1,
    unlockedLessonIds: [1],
    completedLessonIds: [],
    overallProgress: 40,
    lastQuizScore: 5.0,
    lastActive: 'Hôm qua',
    status: 'needs_help',
    competency: {
      nhanBietRate: 60,
      thongHieuRate: 50,
      vanDungRate: 40
    },
    recentMistakes: ['Sai nguyên tắc bố cục poster khoa học', 'Chưa nắm được cách dùng lưới tản nhiệt khi đun']
  },
  {
    id: 'hs-05',
    studentName: 'Đỗ Thảo Vy',
    email: 'thaovy.do9a1@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
    className: '9A1',
    currentLessonId: 1,
    unlockedLessonIds: [1],
    completedLessonIds: [1],
    overallProgress: 100,
    lastQuizScore: 10.0,
    lastActive: '2 giờ trước',
    status: 'completed',
    competency: {
      nhanBietRate: 100,
      thongHieuRate: 100,
      vanDungRate: 100
    },
    recentMistakes: []
  },

  // 9A2
  {
    id: 'hs-08',
    studentName: 'Nguyễn Thành Đạt',
    email: 'thanhdat.nguyen9a2@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
    className: '9A2',
    currentLessonId: 1,
    unlockedLessonIds: [1],
    completedLessonIds: [1],
    overallProgress: 100,
    lastQuizScore: 9.0,
    lastActive: '30 phút trước',
    status: 'completed',
    competency: {
      nhanBietRate: 100,
      thongHieuRate: 90,
      vanDungRate: 80
    },
    recentMistakes: ['Thao tác điều chỉnh gương lõm hội tụ ánh sáng']
  },
  {
    id: 'hs-09',
    studentName: 'Hoàng Kim Ngân',
    email: 'kimngan.hoang9a2@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    className: '9A2',
    currentLessonId: 1,
    unlockedLessonIds: [1],
    completedLessonIds: [],
    overallProgress: 70,
    lastQuizScore: 7.0,
    lastActive: '4 giờ trước',
    status: 'in_progress',
    competency: {
      nhanBietRate: 85,
      thongHieuRate: 70,
      vanDungRate: 60
    },
    recentMistakes: ['Bảo quản KMnO4']
  },

  // 9A3
  {
    id: 'hs-10',
    studentName: 'Đinh Tuấn Kiệt',
    email: 'tuankiet.dinh9a3@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
    className: '9A3',
    currentLessonId: 1,
    unlockedLessonIds: [1],
    completedLessonIds: [1],
    overallProgress: 100,
    lastQuizScore: 8.5,
    lastActive: '2 giờ trước',
    status: 'completed',
    competency: {
      nhanBietRate: 90,
      thongHieuRate: 85,
      vanDungRate: 80
    },
    recentMistakes: []
  },
  {
    id: 'hs-11',
    studentName: 'Ngô Bảo Trân',
    email: 'baotran.ngo9a3@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80',
    className: '9A3',
    currentLessonId: 1,
    unlockedLessonIds: [1],
    completedLessonIds: [],
    overallProgress: 50,
    lastQuizScore: 5.5,
    lastActive: 'Hôm qua',
    status: 'needs_help',
    competency: {
      nhanBietRate: 70,
      thongHieuRate: 50,
      vanDungRate: 45
    },
    recentMistakes: ['Pha loãng acid đặc', 'Cấu trúc bài thuyết trình khoa học']
  },

  // 9A4
  {
    id: 'hs-12',
    studentName: 'Phan Văn Hùng',
    email: 'vanhung.phan9a4@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
    className: '9A4',
    currentLessonId: 1,
    unlockedLessonIds: [1],
    completedLessonIds: [1],
    overallProgress: 100,
    lastQuizScore: 9.0,
    lastActive: '1 giờ trước',
    status: 'completed',
    competency: {
      nhanBietRate: 95,
      thongHieuRate: 90,
      vanDungRate: 85
    },
    recentMistakes: []
  },

  // 9A5
  {
    id: 'hs-13',
    studentName: 'Lý Gia Huy',
    email: 'giahuy.ly9a5@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
    className: '9A5',
    currentLessonId: 1,
    unlockedLessonIds: [1],
    completedLessonIds: [1],
    overallProgress: 100,
    lastQuizScore: 8.0,
    lastActive: '5 giờ trước',
    status: 'completed',
    competency: {
      nhanBietRate: 90,
      thongHieuRate: 80,
      vanDungRate: 75
    },
    recentMistakes: ['Công dụng phễu chiết']
  },

  // 9A6
  {
    id: 'hs-14',
    studentName: 'Vũ Thanh Thảo',
    email: 'thanhthao.vu9a6@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    className: '9A6',
    currentLessonId: 1,
    unlockedLessonIds: [1],
    completedLessonIds: [],
    overallProgress: 80,
    lastQuizScore: 7.5,
    lastActive: '3 giờ trước',
    status: 'in_progress',
    competency: {
      nhanBietRate: 90,
      thongHieuRate: 75,
      vanDungRate: 70
    },
    recentMistakes: ['Nhận biết điện kế']
  },

  // 9A7
  {
    id: 'hs-15',
    studentName: 'Dương Gia Bảo',
    email: 'giabao.duong9a7@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
    className: '9A7',
    currentLessonId: 1,
    unlockedLessonIds: [1],
    completedLessonIds: [1],
    overallProgress: 100,
    lastQuizScore: 8.5,
    lastActive: '2 giờ trước',
    status: 'completed',
    competency: {
      nhanBietRate: 95,
      thongHieuRate: 85,
      vanDungRate: 80
    },
    recentMistakes: []
  },

  // 9A8
  {
    id: 'hs-16',
    studentName: 'Cao Thị Hồng Nhung',
    email: 'hongnhung.cao9a8@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    className: '9A8',
    currentLessonId: 1,
    unlockedLessonIds: [1],
    completedLessonIds: [1],
    overallProgress: 100,
    lastQuizScore: 9.0,
    lastActive: '1 giờ trước',
    status: 'completed',
    competency: {
      nhanBietRate: 100,
      thongHieuRate: 85,
      vanDungRate: 85
    },
    recentMistakes: ['Quy tắc bảo quản AgNO3']
  }
];

export interface ClassSummaryStat {
  className: string;
  totalStudents: number;
  completedStudents: number;
  inProgressStudents: number;
  avgProgress: number; // %
  avgScore: number; // /10
}

export const CLASS_COMPARISON_DATA: ClassSummaryStat[] = [
  { className: '9A1', totalStudents: 42, completedStudents: 36, inProgressStudents: 6, avgProgress: 92, avgScore: 8.6 },
  { className: '9A2', totalStudents: 40, completedStudents: 32, inProgressStudents: 8, avgProgress: 88, avgScore: 8.3 },
  { className: '9A3', totalStudents: 41, completedStudents: 30, inProgressStudents: 11, avgProgress: 84, avgScore: 8.0 },
  { className: '9A4', totalStudents: 43, completedStudents: 35, inProgressStudents: 8, avgProgress: 89, avgScore: 8.4 },
  { className: '9A5', totalStudents: 39, completedStudents: 28, inProgressStudents: 11, avgProgress: 82, avgScore: 7.9 },
  { className: '9A6', totalStudents: 40, completedStudents: 31, inProgressStudents: 9, avgProgress: 85, avgScore: 8.1 },
  { className: '9A7', totalStudents: 42, completedStudents: 34, inProgressStudents: 8, avgProgress: 87, avgScore: 8.2 },
  { className: '9A8', totalStudents: 41, completedStudents: 33, inProgressStudents: 8, avgProgress: 86, avgScore: 8.2 },
];

export const INITIAL_CLASS_TRANSFER_REQUESTS = [
  {
    id: 'req-01',
    studentId: 'hs-03',
    studentName: 'Lê Hoàng Long',
    currentClass: '9A1',
    requestedClass: '9A2' as const,
    reason: 'Đổi lịch học ca chiều và chuyển sang lớp học cùng bạn phụ đạo',
    date: '08/09/2026',
    status: 'pending' as const
  }
];

export const TEACHER_MISCONCEPTION_ANALYSIS = [
  {
    id: 'mc-1',
    topic: 'Quy tắc pha loãng Acid H2SO4 đặc',
    failRate: '42%',
    severity: 'high',
    detail: 'Nhiều học sinh vẫn có thói quen trả lời rót nước vào axit. Cần nhấn mạnh: H2SO4 đặc tan toả nhiệt dữ dội, nước nhẹ sôi bùng làm bắn axit gây bỏng nặng. Luôn rót axit từ từ theo đũa thuỷ tinh vào lượng nước lớn.',
    remedy: 'Cho học sinh xem lại mô phỏng tương tác an toàn phòng thí nghiệm và câu hỏi mức Vận dụng.'
  },
  {
    id: 'mc-2',
    topic: 'Bảo quản hoá chất nhạy sáng (AgNO3, KMnO4)',
    failRate: '35%',
    severity: 'medium',
    detail: 'Học sinh hay quên lý do phải đựng trong lọ thuỷ tinh màu nâu sẫm (hoá chất bị phân huỷ dưới tác dụng của quang năng/ánh sáng).',
    remedy: 'Xem lại thẻ Knowledge Card số 4 về hoá chất nhạy quang.'
  },
  {
    id: 'mc-3',
    topic: 'Nguyên tắc thiết kế Poster khoa học khổ lớn',
    failRate: '28%',
    severity: 'low',
    detail: 'Học sinh có xu hướng chép toàn bộ đoạn văn bản dài vào poster thay vì sơ đồ hoá, biểu đồ hoá và dùng ít chữ.',
    remedy: 'Thực hành hoạt động thiết kế bố cục 8 phần của poster trong mục Thuyết trình khoa học.'
  }
];
