export interface SgkQuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface SgkPracticeQuestion {
  id: string;
  level: 'BIẾT' | 'HIỂU' | 'VẬN DỤNG';
  levelColor: string;
  question: string;
  subText: string;
  options: SgkQuestionOption[];
  explanation: string;
}

export interface SgkExamMCQuestion {
  id: string;
  points: number;
  question: string;
  options: SgkQuestionOption[];
  explanation: string;
}

export interface SgkExamEssayQuestion {
  id: string;
  points: number;
  title: string;
  prompt: string;
  sampleSolution: string;
}

export interface SgkTopicItem {
  id: string;
  order: string;
  title: string;
  badge: string;
  page: string;
  newKnowledge: string[];
  coreSummary: string[];
  exampleTitle: string;
  exampleText: string;
  simulation?: 'optics' | 'galvanometer' | 'chemistry' | 'kinetic_ramp' | 'potential_gravity' | 'mechanical_energy' | 'pendulum_energy';
  quickQuiz: {
    question: string;
    options: SgkQuestionOption[];
    explanation: string;
  };
  keyTakeaway: string;
}

export interface SgkLessonPackage {
  id: number;
  title: string;
  shortTitle: string;
  chapterTitle: string;
  pageInfo: string;
  warmup: {
    scenarioTitle: string;
    scenarioText: string;
    question: string;
    options: SgkQuestionOption[];
    explanation: string;
  };
  topics: SgkTopicItem[];
  practiceQuestions: SgkPracticeQuestion[];
  examMCQuestions: SgkExamMCQuestion[];
  examEssayQuestions: SgkExamEssayQuestion[];
}

// ============================================================================
// BÀI 1: NHẬN BIẾT MỘT SỐ DỤNG CỤ, HOÁ CHẤT. THUYẾT TRÌNH MỘT VẤN ĐỀ KHOA HỌC
// ============================================================================
export const LESSON_1_DATA: SgkLessonPackage = {
  id: 1,
  title: 'BÀI 1: NHẬN BIẾT MỘT SỐ DỤNG CỤ, HOÁ CHẤT. THUYẾT TRÌNH MỘT VẤN ĐỀ KHOA HỌC',
  shortTitle: 'Bài 1: Dụng cụ, hoá chất & Thuyết trình',
  chapterTitle: 'MỞ ĐẦU • SGK KHTN 9 (KẾT NỐI TRI THỨC VỚI CUỘC SỐNG)',
  pageInfo: 'SGK trang 6 - 14',
  warmup: {
    scenarioTitle: 'Tình huống mở đầu môn Khoa học tự nhiên 9',
    scenarioText: 'Trong phòng thí nghiệm KHTN 9, các em sẽ tiếp cận các thiết bị đo điện từ có độ nhạy rất cao. Khi quan sát mặt chia độ của chiếc Điện kế (Galvanometer), các em nhận thấy một điểm rất đặc biệt so với Ampe kế thông thường ở lớp 7 - 8.',
    question: 'Điểm khác biệt cốt lõi nhất trên mặt thang đo của Điện kế so với Ampe kế thông thường là gì?',
    options: [
      { id: 'w1', text: 'Vạch số 0 nằm ở chính giữa thang đo để kim lệch sang hai phía', isCorrect: true },
      { id: 'w2', text: 'Vạch số 0 nằm ở góc ngoài cùng bên trái để kim quay một chiều', isCorrect: false },
      { id: 'w3', text: 'Thang đo không có vạch số mà dùng hệ thống đèn LED cảnh báo', isCorrect: false },
      { id: 'w4', text: 'Vạch số 0 nằm ở góc ngoài cùng bên phải để đo dòng điện ngược', isCorrect: false },
    ],
    explanation: 'SGK trang 7: Điện kế có vạch số 0 ở chính giữa mặt đo giúp nhận biết độ lớn và chiều của dòng điện cảm ứng xoay chiều hoặc đổi chiều.',
  },
  topics: [
    {
      id: 'topic_1_1',
      order: 'I.1',
      title: 'Một số dụng cụ quang học',
      badge: 'Vật lí • Quang học',
      page: 'SGK trang 6',
      newKnowledge: [
        'Nguồn sáng khe hẹp và nguồn laser: Tạo chùm sáng song song, hẹp, rõ nét để khảo sát đường truyền của tia sáng.',
        'Bản bán trụ thuỷ tinh: Khối thuỷ tinh trong suốt đặt trên bảng chia độ tròn để nghiên cứu khúc xạ và phản xạ toàn phần.',
        'Bảng chia độ tròn 360°: Giúp đọc chuẩn xác góc tới i và góc khúc xạ r tại tâm bán trụ.',
        'Quy tắc an toàn thị giác: Tuyệt đối không nhìn trực tiếp vào chùm tia laser hoặc chiếu vào mắt người khác.'
      ],
      coreSummary: [
        'Định luật khúc xạ ánh sáng: Tia khúc xạ nằm trong mặt phẳng tới và ở phía bên kia pháp tuyến so với tia tới.',
        'Khi ánh sáng truyền từ không khí vào thuỷ tinh: Góc khúc xạ r luôn nhỏ hơn góc tới i (r < i).',
        'Khi tia sáng đi vuông góc với mặt cong của bản bán trụ, tia sáng truyền thẳng vào tâm mà không bị đổi hướng.'
      ],
      exampleTitle: 'Thí nghiệm khúc xạ ánh sáng SGK trang 6',
      exampleText: 'Đặt bản bán trụ trên đĩa chia độ sao cho tâm bán trụ trùng với tâm đĩa. Chiếu tia laser với góc tới i = 45°, đo được góc khúc xạ r ≈ 28°. Kết quả này khẳng định chiết suất của thuỷ tinh n ≈ 1,5.',
      simulation: 'optics',
      quickQuiz: {
        question: 'Khi chiếu tia laser vuông góc với mặt cong của bản bán trụ thuỷ tinh vào tâm, hiện tượng gì xảy ra?',
        options: [
          { id: 'q1_1_a', text: 'Tia sáng bị khúc xạ lệch một góc 30 độ', isCorrect: false },
          { id: 'q1_1_b', text: 'Tia sáng truyền thẳng vào tâm không đổi hướng', isCorrect: true },
          { id: 'q1_1_c', text: 'Tia sáng bị phản xạ toàn phần trở lại môi trường cũ', isCorrect: false },
          { id: 'q1_1_d', text: 'Tia sáng bị hấp thụ hoàn toàn tại mặt phân cách', isCorrect: false }
        ],
        explanation: 'Vì tia sáng đi vuông góc với mặt cong nên trùng với pháp tuyến tại điểm tới (i = 0°), do đó góc khúc xạ r = 0°, tia sáng truyền thẳng.'
      },
      keyTakeaway: 'Ghi nhớ: Bản bán trụ giúp đo chuẩn góc tới và khúc xạ. Tuân thủ tuyệt đối an toàn chùm tia laser.'
    },
    {
      id: 'topic_1_2',
      order: 'I.2',
      title: 'Điện kế và nguồn điện',
      badge: 'Vật lí • Điện từ học',
      page: 'SGK trang 7',
      newKnowledge: [
        'Điện kế (Galvanometer): Dụng cụ đo dòng điện cực nhạy, có vạch số 0 nằm ở chính giữa thang đo.',
        'Chiều lệch của kim: Kim lệch sang phải khi dòng điện đi theo chiều thuận, lệch sang trái khi dòng điện đi theo chiều ngược lại.',
        'Cuộn dây có hai đèn LED đỏ và vàng mắc song song ngược cực: Dùng để nhận biết chiều dòng điện cảm ứng.',
        'Nguồn điện đa năng: Cung cấp điện áp một chiều (DC) và xoay chiều (AC) từ 1,5V đến 24V có bảo vệ chống quá tải.'
      ],
      coreSummary: [
        'Điện kế đo được cả chiều và độ lớn của dòng điện cảm ứng rất nhỏ xuất hiện trong cuộn dây.',
        'Khi nam châm chuyển động lại gần hoặc ra xa cuộn dây, từ thông biến thiên làm xuất hiện dòng điện cảm ứng.',
        'Khi nam châm đứng yên so với cuộn dây, kim điện kế chỉ đúng vạch số 0 (không có dòng điện cảm ứng).'
      ],
      exampleTitle: 'Thí nghiệm cảm ứng điện từ SGK trang 7',
      exampleText: 'Nối hai đầu cuộn dây vào điện kế. Đưa cực Bắc nam châm lại gần cuộn dây: kim lệch sang phải. Giữ yên nam châm: kim về số 0. Rút nam châm ra xa: kim lệch sang trái.',
      simulation: 'galvanometer',
      quickQuiz: {
        question: 'Khi nam châm được giữ đứng yên bất động trong lòng cuộn dây, kim điện kế ở trạng thái nào?',
        options: [
          { id: 'q1_2_a', text: 'Kim dao động liên tục qua lại hai phía thang đo', isCorrect: false },
          { id: 'q1_2_b', text: 'Kim lệch tối đa sang bên phải thang đo', isCorrect: false },
          { id: 'q1_2_c', text: 'Kim chỉ đúng vạch số 0 ở chính giữa mặt đo', isCorrect: true },
          { id: 'q1_2_d', text: 'Kim lệch tối đa sang bên trái thang đo', isCorrect: false }
        ],
        explanation: 'Khi nam châm đứng yên, từ thông qua cuộn dây không đổi nên không có dòng điện cảm ứng sinh ra, kim điện kế ở đúng vạch số 0.'
      },
      keyTakeaway: 'Ghi nhớ: Vạch số 0 ở giữa thang đo điện kế giúp xác định chiều dòng điện cảm ứng.'
    },
    {
      id: 'topic_1_3',
      order: 'I.3',
      title: 'Một số dụng cụ và hoá chất thông dụng',
      badge: 'Hoá học • Thực hành phòng thí nghiệm',
      page: 'SGK trang 8 - 9',
      newKnowledge: [
        'Ống sinh hàn: Làm ngưng tụ hơi chất lỏng thành giọt chảy xuống bình hứng trong phương pháp chưng cất.',
        'Phễu chiết: Dùng để tách các chất lỏng không hoà tan vào nhau (tách dầu hoả và nước).',
        'Bảo quản kim loại kiềm (Na, K): Ngâm chìm hoàn toàn trong dầu hoả khan để cách ly với không khí và hơi ẩm.',
        'Hoá chất nhạy cảm với ánh sáng (KMnO4, AgNO3): Đựng trong lọ thuỷ tinh màu nâu hoặc bọc kín bằng giấy đen.'
      ],
      coreSummary: [
        'Phương pháp chiết: Tách hỗn hợp chất lỏng phân lớp dựa trên khối lượng riêng khác nhau.',
        'Quy tắc an toàn hoá chất: Đọc kĩ nhãn cảnh báo nguy hiểm, sử dụng kẹp và dụng cụ bảo hộ phù hợp.'
      ],
      exampleTitle: 'Thí nghiệm tách dầu hoả khỏi nước SGK trang 8',
      exampleText: 'Cho hỗn hợp dầu hoả và nước vào phễu chiết, để yên cho tách thành 2 lớp. Mở khoá phễu chiết cho nước ở lớp dưới chảy ra cốc, đóng khoá lại khi vạch ngăn cách chạm tới khoá.',
      simulation: 'chemistry',
      quickQuiz: {
        question: 'Dụng cụ nào dưới đây phù hợp nhất để tách hỗn hợp gồm dầu ăn và nước?',
        options: [
          { id: 'q1_3_a', text: 'Bát sứ nung trên ngọn lửa đèn cồn', isCorrect: false },
          { id: 'q1_3_b', text: 'Phễu chiết có khoá vặn ở cuống phễu', isCorrect: true },
          { id: 'q1_3_c', text: 'Ống đong chia vạch bằng thuỷ tinh', isCorrect: false },
          { id: 'q1_3_d', text: 'Cốc đun chịu nhiệt có mỏ rót', isCorrect: false }
        ],
        explanation: 'Dầu ăn và nước không trộn lẫn và phân lớp, do đó dùng phễu chiết để tách lớp nước phía dưới ra trước.'
      },
      keyTakeaway: 'Ghi nhớ: Dùng phễu chiết cho chất lỏng không trộn lẫn; ngâm kim loại kiềm trong dầu hoả khan.'
    },
    {
      id: 'topic_1_4',
      order: 'II.1',
      title: 'Viết báo cáo một vấn đề khoa học',
      badge: 'Phương pháp • Nghiên cứu khoa học',
      page: 'SGK trang 10',
      newKnowledge: [
        'Cấu trúc chuẩn của một báo cáo khoa học gồm 8 phần chính theo quy chuẩn SGK KHTN 9.',
        '8 phần gồm: 1. Tiêu đề; 2. Tóm tắt; 3. Giới thiệu; 4. Phương pháp; 5. Kết quả; 6. Thảo luận; 7. Kết luận; 8. Tài liệu tham khảo.',
        'Phần Kết quả: Trình bày số liệu thực nghiệm trung thực dưới dạng bảng biểu, đồ thị hoặc sơ đồ.',
        'Phần Thảo luận: Phân tích nguyên nhân của số liệu thu được, so sánh với giả thuyết ban đầu và giải thích sai số.'
      ],
      coreSummary: [
        'Nguyên tắc cốt lõi: Tính trung thực khoa học, số liệu rõ ràng, lập luận chặt chẽ có bằng chứng.',
        'Phân biệt: Kết quả nêu sự kiện thực tế quan sát được; Thảo luận giải thích cơ chế khoa học của sự kiện.'
      ],
      exampleTitle: 'Cấu trúc 8 phần của báo cáo khoa học SGK',
      exampleText: 'Báo cáo về "Khảo sát góc khúc xạ qua bản bán trụ": Đặt câu hỏi nghiên cứu, mô tả phương pháp đo, vẽ bảng số liệu góc i và r, tính chiết suất n và thảo luận sai số đo.',
      quickQuiz: {
        question: 'Phần nào trong báo cáo khoa học có nhiệm vụ giải thích nguyên nhân và phân tích sai số?',
        options: [
          { id: 'q1_4_a', text: 'Phần tiêu đề của báo cáo', isCorrect: false },
          { id: 'q1_4_b', text: 'Phần thảo luận kết quả nghiên cứu', isCorrect: true },
          { id: 'q1_4_c', text: 'Phần tài liệu tham khảo', isCorrect: false },
          { id: 'q1_4_d', text: 'Phần dụng cụ và hoá chất', isCorrect: false }
        ],
        explanation: 'Phần Thảo luận trong báo cáo khoa học có chức năng phân tích ý nghĩa số liệu, giải thích nguyên nhân và nguồn gốc sai số.'
      },
      keyTakeaway: 'Ghi nhớ: Báo cáo gồm 8 phần; Phần Thảo luận giải thích nguyên nhân và sai số.'
    },
    {
      id: 'topic_1_5',
      order: 'II.2',
      title: 'Thuyết trình một vấn đề khoa học',
      badge: 'Kỹ năng • Báo cáo & Tranh biện',
      page: 'SGK trang 11 - 14',
      newKnowledge: [
        'Slide thuyết trình: Tuân thủ quy tắc 70% hình ảnh, sơ đồ trực quan và 30% văn bản tóm tắt ngắn gọn.',
        'Poster khoa học: Kích thước tiêu chuẩn quốc tế là khổ A0 (841 × 1189 mm) hoặc A1, bố cục chia 3 cột dọc.',
        'Khoảng cách đọc: Tiêu đề poster đọc rõ từ cự li 3 mét; nội dung đọc rõ từ cự li 1 đến 1,5 mét.',
        'Tác phong thuyết trình: Giọng nói rõ ràng, mắt duy trì giao tiếp với người nghe, trả lời phản biện cầu thị.'
      ],
      coreSummary: [
        'Không chép toàn bộ văn bản dài dòng lên slide thuyết trình.',
        'Thời lượng báo cáo thông thường từ 7 đến 10 phút, dành 3 đến 5 phút cho phần hỏi đáp và phản biện.'
      ],
      exampleTitle: 'Quy chuẩn poster khoa học SGK trang 13',
      exampleText: 'Một poster thiết kế khổ A0 gồm 3 cột: Cột 1 (Giới thiệu, Mục tiêu), Cột 2 (Phương pháp, Kết quả dạng biểu đồ), Cột 3 (Thảo luận, Kết luận, Tài liệu tham khảo).',
      quickQuiz: {
        question: 'Kích thước tiêu chuẩn quốc tế quy định cho một Poster báo cáo khoa học treo tường là khổ nào?',
        options: [
          { id: 'q1_5_a', text: 'Khổ giấy A4 hoặc A5 thông dụng', isCorrect: false },
          { id: 'q1_5_b', text: 'Khổ giấy A0 hoặc A1 tiêu chuẩn', isCorrect: true },
          { id: 'q1_5_c', text: 'Khổ giấy A3 gấp đôi thông thường', isCorrect: false },
          { id: 'q1_5_d', text: 'Kích thước tự do không có quy định', isCorrect: false }
        ],
        explanation: 'SGK trang 13 chỉ rõ: Kích thước tiêu chuẩn quốc tế cho báo cáo treo tường là khổ A0 hoặc A1 để bảo đảm người xem đọc rõ từ 1 - 1,5 mét.'
      },
      keyTakeaway: 'Ghi nhớ: Slide 70% hình ảnh 30% chữ; Poster chuẩn khổ A0/A1 bố cục 3 cột.'
    }
  ],
  practiceQuestions: [
    {
      id: 'p1_1',
      level: 'BIẾT',
      levelColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      question: 'Điểm khác biệt quan trọng nhất trên thang đo của Điện kế so với Ampe kế thông thường là gì?',
      subText: 'Căn cứ SGK KHTN 9 trang 7',
      options: [
        { id: 'p1_1_a', text: 'Vạch số 0 nằm ở góc ngoài cùng bên trái thang đo', isCorrect: false },
        { id: 'p1_1_b', text: 'Vạch số 0 nằm ở chính giữa mặt chia độ thang đo', isCorrect: true },
        { id: 'p1_1_c', text: 'Không có vạch số mà dùng hệ thống đèn số điện tử', isCorrect: false },
        { id: 'p1_1_d', text: 'Vạch số 0 nằm ở góc ngoài cùng bên phải thang đo', isCorrect: false }
      ],
      explanation: 'SGK trang 7: Điện kế có vạch 0 ở giữa để phát hiện và đo chiều dòng điện cảm ứng.'
    },
    {
      id: 'p1_2',
      level: 'BIẾT',
      levelColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      question: 'Để tách hai chất lỏng không hoà tan vào nhau (như dầu hoả và nước), dụng cụ nào phù hợp nhất?',
      subText: 'Căn cứ SGK KHTN 9 trang 8',
      options: [
        { id: 'p1_2_a', text: 'Phễu chiết có khoá vặn ở cuống phễu thuỷ tinh', isCorrect: true },
        { id: 'p1_2_b', text: 'Bát sứ nung trên ngọn lửa đèn cồn phòng học', isCorrect: false },
        { id: 'p1_2_c', text: 'Ống đong chia vạch bằng thuỷ tinh chịu nhiệt', isCorrect: false },
        { id: 'p1_2_d', text: 'Lưới tản nhiệt có lớp gốm bọc xung quanh', isCorrect: false }
      ],
      explanation: 'SGK trang 8: Phễu chiết dùng để chiết tách các chất lỏng phân lớp không trộn lẫn.'
    },
    {
      id: 'p1_3',
      level: 'BIẾT',
      levelColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      question: 'Những hoá chất dễ bị phân huỷ bởi tác dụng của ánh sáng như KMnO4 hay AgNO3 cần được bảo quản thế nào?',
      subText: 'Căn cứ SGK KHTN 9 trang 9',
      options: [
        { id: 'p1_3_a', text: 'Đựng trong cốc thuỷ tinh trong suốt đặt cạnh cửa sổ', isCorrect: false },
        { id: 'p1_3_b', text: 'Mở nắp lọ cho thông thoáng khí trong bóng tối', isCorrect: false },
        { id: 'p1_3_c', text: 'Đựng trong lọ màu nâu tối hoặc bọc kín bằng giấy đen', isCorrect: true },
        { id: 'p1_3_d', text: 'Ngâm chìm toàn bộ lọ hoá chất trong chậu nước đá', isCorrect: false }
      ],
      explanation: 'SGK trang 9: Hoá chất nhạy sáng cần đựng trong lọ tối màu hoặc bọc kín bằng giấy đen.'
    },
    {
      id: 'p1_4',
      level: 'BIẾT',
      levelColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      question: 'Kích thước tiêu chuẩn quốc tế quy định cho một Poster khoa học treo tường là khổ nào?',
      subText: 'Căn cứ SGK KHTN 9 trang 13',
      options: [
        { id: 'p1_4_a', text: 'Khổ giấy A4 hoặc A5 thông dụng học sinh', isCorrect: false },
        { id: 'p1_4_b', text: 'Khổ giấy A3 gấp đôi thông thường học tập', isCorrect: false },
        { id: 'p1_4_c', text: 'Khổ giấy A0 hoặc A1 tiêu chuẩn trưng bày', isCorrect: true },
        { id: 'p1_4_d', text: 'Kích thước tự do tuỳ thuộc ý muốn người làm', isCorrect: false }
      ],
      explanation: 'SGK trang 13: Kích thước tiêu chuẩn là khổ A0 hoặc A1.'
    },
    {
      id: 'p1_5',
      level: 'HIỂU',
      levelColor: 'bg-amber-100 text-amber-800 border-amber-300',
      question: 'Cuộn dây có hai đèn LED đỏ và vàng mắc song song ngược cực có tác dụng gì trong bài thí nghiệm?',
      subText: 'Căn cứ SGK KHTN 9 trang 7',
      options: [
        { id: 'p1_5_a', text: 'Vừa phát hiện có dòng điện, vừa xác định chiều dòng điện', isCorrect: true },
        { id: 'p1_5_b', text: 'Tăng điện trở cuộn dây nhằm hạn chế nguy cơ đoản mạch', isCorrect: false },
        { id: 'p1_5_c', text: 'Chiếu sáng thí nghiệm giúp học sinh dễ dàng ghi chép', isCorrect: false },
        { id: 'p1_5_d', text: 'Biến đổi dòng xoay chiều thành dòng điện một chiều', isCorrect: false }
      ],
      explanation: 'Hai LED ngược cực luân phiên sáng theo chiều dòng điện cảm ứng chạy trong cuộn dây.'
    },
    {
      id: 'p1_6',
      level: 'HIỂU',
      levelColor: 'bg-amber-100 text-amber-800 border-amber-300',
      question: 'Khi chiếu tia sáng từ không khí vào bản bán trụ thuỷ tinh tại tâm, mối quan hệ giữa góc tới i và góc khúc xạ r là gì?',
      subText: 'Căn cứ SGK KHTN 9 trang 6',
      options: [
        { id: 'p1_6_a', text: 'Góc khúc xạ r luôn luôn lớn hơn góc tới i', isCorrect: false },
        { id: 'p1_6_b', text: 'Góc khúc xạ r luôn luôn nhỏ hơn góc tới i', isCorrect: true },
        { id: 'p1_6_c', text: 'Góc khúc xạ r luôn bằng đúng góc tới i', isCorrect: false },
        { id: 'p1_6_d', text: 'Góc khúc xạ r luôn có giá trị bằng 90 độ', isCorrect: false }
      ],
      explanation: 'Chiết suất thuỷ tinh lớn hơn không khí nên tia sáng bị khúc xạ lại gần pháp tuyến hơn (r < i).'
    },
    {
      id: 'p1_7',
      level: 'HIỂU',
      levelColor: 'bg-amber-100 text-amber-800 border-amber-300',
      question: 'Tại sao kim loại Natri (Na) và Kali (K) bắt buộc phải ngâm chìm hoàn toàn trong dầu hoả khan?',
      subText: 'Căn cứ SGK KHTN 9 trang 9',
      options: [
        { id: 'p1_7_a', text: 'Để hoà tan hoàn toàn kim loại thành dung dịch lỏng', isCorrect: false },
        { id: 'p1_7_b', text: 'Để tăng tính dẫn điện của kim loại trong thí nghiệm', isCorrect: false },
        { id: 'p1_7_c', text: 'Để ngăn cách kim loại tiếp xúc với oxy và hơi nước', isCorrect: true },
        { id: 'p1_7_d', text: 'Để làm giảm khối lượng riêng của kim loại khi đun', isCorrect: false }
      ],
      explanation: 'Na và K phản ứng mãnh liệt với nước và oxy không khí, dầu hoả ngăn cách sự tiếp xúc này.'
    },
    {
      id: 'p1_8',
      level: 'HIỂU',
      levelColor: 'bg-amber-100 text-amber-800 border-amber-300',
      question: 'Trong slide trình chiếu báo cáo khoa học, tỉ lệ khuyến nghị giữa hình ảnh/sơ đồ và văn bản là bao nhiêu?',
      subText: 'Căn cứ SGK KHTN 9 trang 11',
      options: [
        { id: 'p1_8_a', text: '10% hình ảnh đồ thị và 90% văn bản chi tiết', isCorrect: false },
        { id: 'p1_8_b', text: '70% hình ảnh đồ thị và 30% văn bản tóm tắt', isCorrect: true },
        { id: 'p1_8_c', text: '30% hình ảnh đồ thị và 70% văn bản tóm tắt', isCorrect: false },
        { id: 'p1_8_d', text: '50% hình ảnh đồ thị và 50% văn bản chi tiết', isCorrect: false }
      ],
      explanation: 'SGK trang 11: Khuyến nghị 70% hình ảnh, sơ đồ và 30% văn bản tóm tắt súc tích.'
    },
    {
      id: 'p1_9',
      level: 'VẬN DỤNG',
      levelColor: 'bg-rose-100 text-rose-800 border-rose-300',
      question: 'Học sinh tiến hành đo góc khúc xạ của bản bán trụ với góc tới i = 60° thì thu được góc khúc xạ xấp xỉ bao nhiêu (n ≈ 1,5)?',
      subText: 'Căn cứ SGK KHTN 9 trang 6',
      options: [
        { id: 'p1_9_a', text: 'Góc khúc xạ r xấp xỉ bằng khoảng 35,3 độ', isCorrect: true },
        { id: 'p1_9_b', text: 'Góc khúc xạ r xấp xỉ bằng khoảng 60,0 độ', isCorrect: false },
        { id: 'p1_9_c', text: 'Góc khúc xạ r xấp xỉ bằng khoảng 75,5 độ', isCorrect: false },
        { id: 'p1_9_d', text: 'Góc khúc xạ r xấp xỉ bằng khoảng 15,0 độ', isCorrect: false }
      ],
      explanation: 'Theo định luật khúc xạ: sin(r) = sin(60°) / 1,5 = 0,866 / 1,5 ≈ 0,577 => r ≈ 35,3°.'
    },
    {
      id: 'p1_10',
      level: 'VẬN DỤNG',
      levelColor: 'bg-rose-100 text-rose-800 border-rose-300',
      question: 'Khi di chuyển cực Bắc nam châm lại gần đầu cuộn dây, kim điện kế lệch phải; nếu rút cực Nam nam châm ra xa thì kim lệch thế nào?',
      subText: 'Căn cứ SGK KHTN 9 trang 7',
      options: [
        { id: 'p1_10_a', text: 'Kim điện kế đứng yên không lệch khỏi vạch số 0', isCorrect: false },
        { id: 'p1_10_b', text: 'Kim điện kế lệch sang phía bên trái ngược lại', isCorrect: false },
        { id: 'p1_10_c', text: 'Kim điện kế vẫn tiếp tục lệch sang phía bên phải', isCorrect: true },
        { id: 'p1_10_d', text: 'Kim dao động liên tục hai phía với chu kì lớn', isCorrect: false }
      ],
      explanation: 'Đổi cực nam châm (Bắc -> Nam) và đổi chiều chuyển động (lại gần -> ra xa) làm chiều dòng điện cảm ứng giữ nguyên như ban đầu (lệch phải).'
    }
  ],
  examMCQuestions: [
    {
      id: 'e1_mc1',
      points: 0.5,
      question: 'Dụng cụ quang học nào được sử dụng để khảo sát góc tới và góc khúc xạ trên đĩa chia độ tròn?',
      options: [
        { id: 'e1_c1', text: 'Bản bán trụ thuỷ tinh trong suốt có tâm trùng vạch', isCorrect: true },
        { id: 'e1_c2', text: 'Thước cuộn kim loại dài dùng trong cơ khí chế tạo', isCorrect: false },
        { id: 'e1_c3', text: 'Cốc thuỷ tinh chia độ chịu nhiệt dùng trong pha chế', isCorrect: false },
        { id: 'e1_c4', text: 'Lăng kính tam giác có góc chiết quang góc tù lớn', isCorrect: false }
      ],
      explanation: 'Bản bán trụ thuỷ tinh giúp đo góc tới và góc khúc xạ chuẩn xác tại tâm.'
    },
    {
      id: 'e1_mc2',
      points: 0.5,
      question: 'Thiết bị nào trong phòng thực hành vừa đo được dòng điện nhỏ, vừa nhận biết được chiều dòng điện?',
      options: [
        { id: 'e1_c1', text: 'Vôn kế xoay chiều có thang đo định mức tới 220V', isCorrect: false },
        { id: 'e1_c2', text: 'Điện kế có vạch số 0 ở chính giữa mặt chia độ', isCorrect: true },
        { id: 'e1_c3', text: 'Bút thử điện thông dụng dùng trong mạng điện nhà', isCorrect: false },
        { id: 'e1_c4', text: 'Pin tiểu gắn nối tiếp với bóng đèn dây tóc nhỏ', isCorrect: false }
      ],
      explanation: 'Điện kế có vạch số 0 ở giữa giúp đo độ lớn và chiều của dòng điện cảm ứng.'
    },
    {
      id: 'e1_mc3',
      points: 0.5,
      question: 'Kim loại Natri (Na) và Kali (K) bắt buộc phải bảo quản ngâm chìm hoàn toàn trong môi trường nào?',
      options: [
        { id: 'e1_c1', text: 'Dung dịch cồn y tế nồng độ 70 độ trong lọ kín', isCorrect: false },
        { id: 'e1_c2', text: 'Nước cất tinh khiết đã khử toàn bộ ion khoáng', isCorrect: false },
        { id: 'e1_c3', text: 'Dầu hoả khan đựng trong các lọ thuỷ tinh kín', isCorrect: true },
        { id: 'e1_c4', text: 'Dung dịch acid clohydric nồng độ loãng vừa phải', isCorrect: false }
      ],
      explanation: 'Dầu hoả khan ngăn chặn kim loại kiềm phản ứng với oxy và hơi nước trong không khí.'
    },
    {
      id: 'e1_mc4',
      points: 0.5,
      question: 'Một bản báo cáo khoa học hoàn chỉnh theo SGK KHTN 9 bao gồm bao nhiêu phần chính?',
      options: [
        { id: 'e1_c1', text: '3 phần chính', isCorrect: false },
        { id: 'e1_c2', text: '5 phần chính', isCorrect: false },
        { id: 'e1_c3', text: '8 phần chính', isCorrect: true },
        { id: 'e1_c4', text: '12 phần chính', isCorrect: false }
      ],
      explanation: 'SGK trang 10 quy định chuẩn cấu trúc gồm 8 phần chính.'
    },
    {
      id: 'e1_mc5',
      points: 0.5,
      question: 'Khi chiếu tia laser vuông góc với mặt cong của bản bán trụ thuỷ tinh thì tia sáng truyền thế nào?',
      options: [
        { id: 'e1_c1', text: 'Tia sáng truyền thẳng vào tâm mà không bị khúc xạ', isCorrect: true },
        { id: 'e1_c2', text: 'Tia sáng bị đổi hướng lệch một góc 45 độ ngay lập tức', isCorrect: false },
        { id: 'e1_c3', text: 'Tia sáng bị phản xạ toàn phần ra ngoài không khí', isCorrect: false },
        { id: 'e1_c4', text: 'Tia sáng bị phân tách thành bảy chùm màu sắc khác nhau', isCorrect: false }
      ],
      explanation: 'Tia sáng đi trùng với pháp tuyến mặt cong nên góc tới i = 0°, góc khúc xạ r = 0°, tia truyền thẳng.'
    },
    {
      id: 'e1_mc6',
      points: 0.5,
      question: 'Trong slide trình chiếu bài thuyết trình khoa học, nguyên tắc phân bổ hình ảnh và chữ viết là gì?',
      options: [
        { id: 'e1_c1', text: '90% diện tích là chữ viết để trình bày đầy đủ', isCorrect: false },
        { id: 'e1_c2', text: '70% diện tích là hình ảnh, 30% là chữ viết tóm tắt', isCorrect: true },
        { id: 'e1_c3', text: '30% diện tích là hình ảnh, 70% là chữ viết tóm tắt', isCorrect: false },
        { id: 'e1_c4', text: '100% diện tích là hình ảnh và không ghi chữ nào', isCorrect: false }
      ],
      explanation: 'Khuyến nghị chuẩn là 70% hình ảnh/sơ đồ và 30% chữ viết tóm tắt.'
    },
    {
      id: 'e1_mc7',
      points: 0.5,
      question: 'Khoảng cách đọc thông tin tiêu chuẩn cho người xem đối với một poster khoa học khổ A0 là bao nhiêu?',
      options: [
        { id: 'e1_c1', text: 'Tiêu đề đọc từ 10m, nội dung đọc từ 5m đến 7m', isCorrect: false },
        { id: 'e1_c2', text: 'Tiêu đề đọc từ 0,5m, nội dung đọc từ 0,2m đến 0,3m', isCorrect: false },
        { id: 'e1_c3', text: 'Tiêu đề đọc từ 3m, nội dung đọc từ 1m đến 1,5m', isCorrect: true },
        { id: 'e1_c4', text: 'Không có tiêu chuẩn khoảng cách cụ thể nào cả', isCorrect: false }
      ],
      explanation: 'SGK trang 13: Tiêu đề đọc từ 3m, nội dung đọc rõ từ 1 - 1,5m.'
    },
    {
      id: 'e1_mc8',
      points: 0.5,
      question: 'Phương pháp nào sau đây là phù hợp nhất để tách cồn ra khỏi hỗn hợp gồm cồn và nước?',
      options: [
        { id: 'e1_c1', text: 'Phương pháp chiết bằng phễu chiết có khoá vặn', isCorrect: false },
        { id: 'e1_c2', text: 'Phương pháp lọc qua giấy lọc đặt trong phễu', isCorrect: false },
        { id: 'e1_c3', text: 'Phương pháp chưng cất dùng ống sinh hàn ngưng tụ', isCorrect: true },
        { id: 'e1_c4', text: 'Phương pháp lắng gạn tự nhiên sau 24 giờ để yên', isCorrect: false }
      ],
      explanation: 'Cồn và nước tan vô hạn vào nhau nhưng có nhiệt độ sôi khác nhau nên dùng phương pháp chưng cất với ống sinh hàn.'
    }
  ],
  examEssayQuestions: [
    {
      id: 'e1_es1',
      points: 1.5,
      title: 'Câu 1: Phân tích dụng cụ quang học và quy tắc an toàn',
      prompt: 'Hãy nêu công dụng của bản bán trụ thuỷ tinh trong thí nghiệm quang học SGK KHTN 9. Tại sao khi sử dụng nguồn phát laser, học sinh cần tuyệt đối tuân thủ quy tắc an toàn thị giác?',
      sampleSolution: '1. Bản bán trụ thuỷ tinh đặt trên đĩa chia độ giúp tạo mặt cong để tia sáng đi thẳng vào tâm (góc tới bằng 0°), từ đó khảo sát chính xác góc tới và góc khúc xạ tại mặt phẳng đáy.\n2. Cần tuân thủ an toàn thị giác vì chùm laser có mật độ năng lượng rất cao, nếu chiếu trực tiếp vào mắt có thể làm bỏng võng mạc và suy giảm thị lực vĩnh viễn.'
    },
    {
      id: 'e1_es2',
      points: 1.5,
      title: 'Câu 2: Nguyên lý hoạt động của điện kế trong hiện tượng cảm ứng điện từ',
      prompt: 'Giải thích vì sao thang đo của Điện kế lại có vạch số 0 nằm ở chính giữa mặt đo? Mô tả hiện tượng xảy ra với kim điện kế khi ta lần lượt đưa cực Bắc nam châm lại gần cuộn dây rồi rút ra xa.',
      sampleSolution: '1. Vạch số 0 ở giữa giúp kim có thể quay sang cả hai phía, qua đó nhận biết đồng thời cả độ lớn và chiều của dòng điện cảm ứng.\n2. Khi đưa cực Bắc nam châm lại gần, kim điện kế lệch sang một phía (ví dụ: sang phải). Khi rút nam châm ra xa, từ thông biến thiên theo chiều ngược lại nên kim điện kế lệch sang phía đối diện (sang trái).'
    },
    {
      id: 'e1_es3',
      points: 1.5,
      title: 'Câu 3: Quy tắc an toàn bảo quản hoá chất trong phòng thí nghiệm',
      prompt: 'Tại sao kim loại Natri (Na) bắt buộc phải ngâm trong dầu hoả, còn dung dịch bạc nitrat (AgNO3) phải đựng trong lọ tối màu? Nêu cách xử lí an toàn nếu không may bị hoá chất acid dính vào da tay.',
      sampleSolution: '1. Na có tính khử rất mạnh, dễ phản ứng mãnh liệt với oxy và hơi nước trong không khí tạo khí H2 dễ gây cháy nổ, do đó cần ngâm trong dầu hoả khan.\n2. AgNO3 dễ bị phân huỷ bởi ánh sáng tạo kim loại bạc tự do, nên phải đựng trong lọ thuỷ tinh màu nâu tối.\n3. Nếu bị acid dính vào tay: Cần lập tức rửa dưới vòi nước sạch chảy liên tục trong ít nhất 10 - 15 phút, sau đó rửa bằng dung dịch NaHCO3 loãng để trung hoà và báo ngay cho giáo viên.'
    },
    {
      id: 'e1_es4',
      points: 1.5,
      title: 'Câu 4: Cấu trúc báo cáo khoa học và kỹ năng thuyết trình',
      prompt: 'Hãy liệt kê 8 phần chính của một bản báo cáo khoa học theo chuẩn SGK KHTN 9. Nêu 2 điểm khác biệt then chốt giữa nội dung ở phần "Kết quả" và phần "Thảo luận".',
      sampleSolution: '1. Cấu trúc 8 phần: 1. Tiêu đề; 2. Tóm tắt; 3. Giới thiệu; 4. Phương pháp; 5. Kết quả; 6. Thảo luận; 7. Kết luận; 8. Tài liệu tham khảo.\n2. Sự khác biệt giữa Kết quả và Thảo luận: Phần "Kết quả" chỉ nêu trung thực số liệu, bảng biểu, hiện tượng thu được từ thực nghiệm; phần "Thảo luận" phân tích nguyên nhân khoa học của kết quả đó, giải thích sai số và so sánh với giả thuyết ban đầu.'
    }
  ]
};

// ============================================================================
// BÀI 2: ĐỘNG NĂNG. THẾ NĂNG (CHƯƠNG I: NĂNG LƯỢNG CƠ HỌC)
// ============================================================================
export const LESSON_2_DATA: SgkLessonPackage = {
  id: 2,
  title: 'BÀI 2: ĐỘNG NĂNG. THẾ NĂNG',
  shortTitle: 'Bài 2: Động năng. Thế năng',
  chapterTitle: 'CHƯƠNG I: NĂNG LƯỢNG CƠ HỌC • SGK KHTN 9 (KẾT NỐI TRI THỨC VỚI CUỘC SỐNG)',
  pageInfo: 'SGK trang 15 - 21',
  warmup: {
    scenarioTitle: 'Bí ẩn khoảng cách phanh dừng trên đường cao tốc',
    scenarioText: 'Trên các tuyến cao tốc Việt Nam, quy định khoảng cách an toàn giữa các xe rất nghiêm ngặt. Bác tài xế nhận thấy: khi xe chạy với tốc độ 60 km/h, quãng đường phanh dừng an toàn khoảng 35m; nhưng khi xe chạy với tốc độ 120 km/h (gấp đôi), quãng đường phanh dừng lại tăng vọt lên hơn 140m (gấp 4 lần)!',
    question: 'Dưới góc độ vật lí học, nguyên nhân chính khiến quãng đường phanh dừng tăng gấp 4 lần khi tốc độ tăng gấp đôi là gì?',
    options: [
      { id: 'w2_1', text: 'Do khối lượng của xe tăng lên gấp đôi khi chạy nhanh', isCorrect: false },
      { id: 'w2_2', text: 'Do động năng của xe tỉ lệ với bình phương vận tốc', isCorrect: true },
      { id: 'w2_3', text: 'Do lực ma sát mặt đường giảm đi 4 lần khi xe tăng tốc', isCorrect: false },
      { id: 'w2_4', text: 'Do trọng lực tác dụng lên xe tăng lên gấp 4 lần', isCorrect: false },
    ],
    explanation: 'SGK trang 17: Động năng Wđ = 1/2 m v² tỉ lệ với bình phương vận tốc v². Khi v tăng 2 lần thì động năng tăng 2² = 4 lần, lực phanh cần sinh công cản gấp 4 lần khiến quãng đường phanh dài gấp 4 lần.',
  },
  topics: [
    {
      id: 'topic_2_1',
      order: 'I.1',
      title: 'Khái niệm động năng',
      badge: 'Cơ học • Động năng',
      page: 'SGK trang 15',
      newKnowledge: [
        'Định nghĩa: Năng lượng mà một vật có được do nó đang chuyển động gọi là ĐỘNG NĂNG.',
        'Kí hiệu: Wđ (hoặc Ed).',
        'Đơn vị đo động năng trong hệ SI: Jun (J). (1 kJ = 1000 J).',
        'Vật đứng yên (vận tốc v = 0) thì động năng của vật bằng 0 (Wđ = 0).'
      ],
      coreSummary: [
        'Mọi vật đang chuyển động trong tự nhiên đều mang động năng: viên bi lăn, máy bay bay, dòng nước chảy, luồng gió bão.',
        'Động năng phụ thuộc vào khối lượng của vật và tốc độ chuyển động của vật.'
      ],
      exampleTitle: 'Hiện tượng thực tế về động năng',
      exampleText: 'Chiếc búa đang giáng xuống có động năng nên khi va chạm với đinh đã thực hiện công đẩy đinh ngập sâu vào thân gỗ.',
      simulation: 'kinetic_ramp',
      quickQuiz: {
        question: 'Trường hợp nào dưới đây vật KHÔNG có động năng?',
        options: [
          { id: 'q2_1_a', text: 'Một chiếc ô tô đang chuyển động trên đường quốc lộ', isCorrect: false },
          { id: 'q2_1_b', text: 'Một hòn đá đang nằm yên bất động trên đỉnh đồi cao', isCorrect: true },
          { id: 'q2_1_c', text: 'Một giọt nước mưa đang rơi tự do từ trên trời xuống', isCorrect: false },
          { id: 'q2_1_d', text: 'Một viên bi sắt đang lăn đều trên mặt bàn nằm ngang', isCorrect: false }
        ],
        explanation: 'Hòn đá nằm yên có vận tốc v = 0 nên động năng bằng 0 (nó chỉ có thế năng trọng trường).'
      },
      keyTakeaway: 'Ghi nhớ: Động năng là năng lượng do chuyển động mà có. Vật đứng yên thì động năng bằng 0.'
    },
    {
      id: 'topic_2_2',
      order: 'I.2',
      title: 'Thí nghiệm về động năng',
      badge: 'Cơ học • Thực nghiệm',
      page: 'SGK trang 16',
      newKnowledge: [
        'Mô hình thí nghiệm SGK Hình 2.1: Máng nghiêng, viên bi thép và miếng gỗ đặt trên mặt phẳng nằm ngang.',
        'Khảo sát ảnh hưởng của tốc độ: Thả viên bi từ các độ cao khác nhau trên máng nghiêng. Thả từ vị trí càng cao, tốc độ ở chân dốc càng lớn, viên bi đẩy miếng gỗ đi xa hơn.',
        'Khảo sát ảnh hưởng của khối lượng: Thả 2 viên bi có khối lượng khác nhau từ cùng một độ cao. Viên bi có khối lượng lớn hơn đẩy miếng gỗ đi xa hơn.',
        'Kết luận thực nghiệm: Động năng của vật càng lớn khi khối lượng càng lớn và tốc độ chuyển động càng lớn.'
      ],
      coreSummary: [
        'Quãng đường miếng gỗ bị đẩy trượt biểu thị độ lớn công mà viên bi sinh ra, tương ứng với động năng của viên bi.',
        'Động năng phụ thuộc đồng thời vào 2 yếu tố: khối lượng m và tốc độ v của vật.'
      ],
      exampleTitle: 'Thí nghiệm máng nghiêng SGK trang 16',
      exampleText: 'Khi thả viên bi 50g từ độ cao h = 10cm, miếng gỗ trượt 8cm. Khi thả viên bi 100g từ cùng độ cao h = 10cm, miếng gỗ trượt 16cm. Điều này chứng minh động năng tỉ lệ với khối lượng.',
      simulation: 'kinetic_ramp',
      quickQuiz: {
        question: 'Trong thí nghiệm máng nghiêng SGK Hình 2.1, đại lượng nào dùng để đo gián tiếp động năng của viên bi?',
        options: [
          { id: 'q2_2_a', text: 'Chiều dài của toàn bộ máng nghiêng làm thí nghiệm', isCorrect: false },
          { id: 'q2_2_b', text: 'Quãng đường miếng gỗ bị viên bi đẩy trượt trên máng', isCorrect: true },
          { id: 'q2_2_c', text: 'Nhiệt độ của viên bi sau khi va chạm với miếng gỗ', isCorrect: false },
          { id: 'q2_2_d', text: 'Đường kính và diện tích bề mặt của miếng gỗ nằm ngang', isCorrect: false }
        ],
        explanation: 'Quãng đường miếng gỗ bị đẩy trượt biểu thị công mà viên bi sinh ra, qua đó đo gián tiếp động năng của viên bi.'
      },
      keyTakeaway: 'Ghi nhớ: Quãng đường miếng gỗ trượt tỉ lệ với động năng của vật va chạm.'
    },
    {
      id: 'topic_2_3',
      order: 'I.3',
      title: 'Công thức tính động năng',
      badge: 'Cơ học • Công thức & Định lượng',
      page: 'SGK trang 17',
      newKnowledge: [
        'Công thức toán học chuẩn: Wđ = 1/2 · m · v²',
        'Trong đó: m là khối lượng của vật, đo bằng kilôgam (kg).',
        'v là tốc độ của vật, đo bằng mét trên giây (m/s).',
        'Wđ là động năng của vật, đo bằng Jun (J).',
        'Quy tắc đổi đơn vị bắt buộc: v (km/h) chia cho 3,6 để ra v (m/s); m (g) chia cho 1000 để ra m (kg).'
      ],
      coreSummary: [
        'Động năng tỉ lệ thuận với khối lượng m.',
        'Động năng tỉ lệ thuận với bình phương tốc độ v²: Tốc độ tăng k lần thì động năng tăng k² lần.',
        'Khi giải bài toán động năng, bắt buộc phải đưa về các đơn vị chuẩn SI (kg, m/s).'
      ],
      exampleTitle: 'Bài toán tính động năng SGK',
      exampleText: 'Một quả bóng đá có khối lượng m = 400g (0,4kg) đang bay với tốc độ v = 20 m/s (72 km/h). Động năng của bóng là: Wđ = 1/2 · 0,4 · 20² = 80 J.',
      simulation: 'kinetic_ramp',
      quickQuiz: {
        question: 'Nếu khối lượng của một vật tăng 2 lần và tốc độ của vật tăng 2 lần thì động năng của vật tăng bao nhiêu lần?',
        options: [
          { id: 'q2_3_a', text: 'Tăng lên gấp 2 lần so với ban đầu', isCorrect: false },
          { id: 'q2_3_b', text: 'Tăng lên gấp 4 lần so với ban đầu', isCorrect: false },
          { id: 'q2_3_c', text: 'Tăng lên gấp 8 lần so với ban đầu', isCorrect: true },
          { id: 'q2_3_d', text: 'Tăng lên gấp 16 lần so với ban đầu', isCorrect: false }
        ],
        explanation: 'Theo công thức Wđ = 1/2 m v²: khi m tăng 2 lần và v tăng 2 lần thì Wđ tăng 2 × 2² = 2 × 4 = 8 lần.'
      },
      keyTakeaway: 'Ghi nhớ: Wđ = 1/2 m v². Lưu ý đổi v sang m/s và m sang kg trước khi tính.'
    },
    {
      id: 'topic_2_4',
      order: 'II.1',
      title: 'Khái niệm thế năng trọng trường',
      badge: 'Cơ học • Thế năng trọng trường',
      page: 'SGK trang 18',
      newKnowledge: [
        'Định nghĩa: Năng lượng mà một vật có được khi ở một độ cao so với mặt đất (hoặc so với vật khác được chọn làm mốc) gọi là THẾ NĂNG TRỌNG TRƯỜNG.',
        'Kí hiệu: Wt (hoặc Ep).',
        'Bản chất: Năng lượng này sinh ra do tương tác hấp dẫn giữa Trái Đất và vật thể.',
        'Đơn vị đo trong hệ SI: Jun (J).'
      ],
      coreSummary: [
        'Vật ở vị trí càng cao và có khối lượng càng lớn thì khả năng sinh công của trọng lực càng lớn, tức là thế năng càng lớn.',
        'Một vật đặt nằm yên ngay trên mốc thế năng đã chọn (độ cao h = 0) thì thế năng bằng 0.'
      ],
      exampleTitle: 'Thực tiễn về thế năng trọng trường',
      exampleText: 'Dòng nước tích trữ ở hồ thuỷ điện trên núi cao chứa thế năng khổng lồ. Khi xả xuống, thế năng chuyển thành động năng làm quay tuabin máy phát điện.',
      simulation: 'potential_gravity',
      quickQuiz: {
        question: 'Vật nào dưới đây đang sở hữu thế năng trọng trường?',
        options: [
          { id: 'q2_4_a', text: 'Một lò xo đang bị kéo dãn trên mặt bàn phẳng', isCorrect: false },
          { id: 'q2_4_b', text: 'Một quả dừa đang ở trên cành cây cao 6 mét', isCorrect: true },
          { id: 'q2_4_c', text: 'Một dòng điện đang chạy qua dây dẫn đồng', isCorrect: false },
          { id: 'q2_4_d', text: 'Một viên bi sắt đang nằm yên trên mặt đất', isCorrect: false }
        ],
        explanation: 'Quả dừa ở độ cao 6m so với mặt đất có thế năng trọng trường do tương tác hấp dẫn với Trái Đất.'
      },
      keyTakeaway: 'Ghi nhớ: Thế năng trọng trường là năng lượng do vật ở trên cao so với mốc tính.'
    },
    {
      id: 'topic_2_5',
      order: 'II.2',
      title: 'Thí nghiệm về thế năng trọng trường',
      badge: 'Cơ học • Thực nghiệm thế năng',
      page: 'SGK trang 19',
      newKnowledge: [
        'Mô hình thí nghiệm SGK Hình 2.3: Quả nặng rơi tự do tác dụng lên chiếc cọc đóng vào đất sét (hoặc cát).',
        'Ảnh hưởng của độ cao: Thả cùng một quả nặng từ các độ cao h khác nhau. Rơi từ độ cao càng lớn thì cọc bị lún càng sâu vào đất.',
        'Ảnh hưởng của khối lượng: Thả các quả nặng có khối lượng khác nhau từ cùng một độ cao h. Quả nặng có khối lượng lớn hơn làm cọc lún sâu hơn.',
        'Kết luận thực nghiệm: Thế năng trọng trường của vật càng lớn khi khối lượng càng lớn và độ cao càng lớn.'
      ],
      coreSummary: [
        'Độ lún của chiếc cọc biểu thị công mà trọng lực đã thực hiện, tương ứng với độ lớn thế năng ban đầu của vật.',
        'Thế năng phụ thuộc đồng thời vào khối lượng m và độ cao h của vật so với mặt đất.'
      ],
      exampleTitle: 'Thí nghiệm búa máy đóng cọc',
      exampleText: 'Đầu búa của máy đóng cọc được kéo lên cao rồi thả rơi tự do. Nhờ có thế năng lớn, đầu búa giáng xuống sinh công đóng cọc bê tông ngập sâu vào lòng đất.',
      simulation: 'potential_gravity',
      quickQuiz: {
        question: 'Trong thí nghiệm thả quả nặng rơi xuống làm lún cọc gỗ, đại lượng nào thể hiện độ lớn thế năng ban đầu của vật?',
        options: [
          { id: 'q2_5_a', text: 'Khối lượng riêng của chất liệu làm cọc gỗ', isCorrect: false },
          { id: 'q2_5_b', text: 'Độ lún sâu của cọc gỗ vào trong nền đất', isCorrect: true },
          { id: 'q2_5_c', text: 'Độ tăng nhiệt độ của quả nặng sau cú va chạm', isCorrect: false },
          { id: 'q2_5_d', text: 'Thời gian quả nặng tiếp xúc với cọc gỗ', isCorrect: false }
        ],
        explanation: 'Cọc gỗ lún càng sâu chứng tỏ công của trọng lực sinh ra càng lớn, tức thế năng ban đầu của quả nặng càng lớn.'
      },
      keyTakeaway: 'Ghi nhớ: Độ lún của cọc gỗ biểu thị công do thế năng của vật sinh ra.'
    },
    {
      id: 'topic_2_6',
      order: 'II.3',
      title: 'Công thức tính thế năng trọng trường & Mốc thế năng',
      badge: 'Cơ học • Công thức & Mốc quy ước',
      page: 'SGK trang 20',
      newKnowledge: [
        'Công thức toán học chuẩn: Wt = P · h = m · g · h',
        'Trong đó: P là trọng lượng của vật (N); m là khối lượng (kg); g là gia tốc trọng trường (thường lấy g = 9,8 m/s² hoặc g = 10 m/s²).',
        'h là độ cao của vật so với vị trí được chọn làm mốc thế năng, đo bằng mét (m).',
        'Vai trò của mốc thế năng: Thông thường chọn mặt đất làm mốc thế năng (tại đó h = 0 và Wt = 0).',
        'Vật ở phía trên mốc thế năng có Wt > 0; vật ở phía dưới mốc thế năng (như đáy giếng, tầng hầm) có Wt < 0.'
      ],
      coreSummary: [
        'Thế năng của một vật phụ thuộc vào việc chọn mốc tính thế năng.',
        'Đơn vị tính: m đo bằng kg, h đo bằng mét (m), Wt đo bằng Jun (J).'
      ],
      exampleTitle: 'Bài toán tính thế năng SGK trang 20',
      exampleText: 'Một kiện hàng 50kg được nâng lên tầng 2 ở độ cao h = 4m so với mặt đất (chọn mốc thế năng tại mặt đất, lấy g = 10 m/s²). Thế năng của kiện hàng là: Wt = m · g · h = 50 · 10 · 4 = 2000 J = 2 kJ.',
      simulation: 'potential_gravity',
      quickQuiz: {
        question: 'Khi thay đổi vị trí chọn làm mốc thế năng, đại lượng nào sau đây của vật sẽ bị thay đổi theo?',
        options: [
          { id: 'q2_6_a', text: 'Khối lượng m của vật thể đang xét', isCorrect: false },
          { id: 'q2_6_b', text: 'Trọng lượng P của vật thể đang xét', isCorrect: false },
          { id: 'q2_6_c', text: 'Độ lớn thế năng trọng trường Wt của vật', isCorrect: true },
          { id: 'q2_6_d', text: 'Thể tích không gian của vật thể đang xét', isCorrect: false }
        ],
        explanation: 'Vì h là khoảng cách tới mốc thế năng, nên khi mốc thay đổi thì h thay đổi dẫn tới Wt = m g h thay đổi theo.'
      },
      keyTakeaway: 'Ghi nhớ: Wt = m g h. Thế năng phụ thuộc vào vị trí chọn làm mốc tính thế năng.'
    }
  ],
  practiceQuestions: [
    {
      id: 'p2_1',
      level: 'BIẾT',
      levelColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      question: 'Năng lượng mà một vật có được do nó đang chuyển động được gọi là gì?',
      subText: 'Căn cứ SGK KHTN 9 trang 15',
      options: [
        { id: 'p2_1_a', text: 'Thế năng trọng trường', isCorrect: false },
        { id: 'p2_1_b', text: 'Động năng của vật', isCorrect: true },
        { id: 'p2_1_c', text: 'Nhiệt năng toả ra', isCorrect: false },
        { id: 'p2_1_d', text: 'Quang năng hấp thụ', isCorrect: false }
      ],
      explanation: 'SGK trang 15: Năng lượng mà một vật có được do nó đang chuyển động gọi là động năng.'
    },
    {
      id: 'p2_2',
      level: 'BIẾT',
      levelColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      question: 'Công thức toán học dùng để tính động năng của một vật chuyển động là công thức nào?',
      subText: 'Căn cứ SGK KHTN 9 trang 17',
      options: [
        { id: 'p2_2_a', text: 'Wđ = m · v', isCorrect: false },
        { id: 'p2_2_b', text: 'Wđ = 1/2 · m · v²', isCorrect: true },
        { id: 'p2_2_c', text: 'Wđ = m · g · h', isCorrect: false },
        { id: 'p2_2_d', text: 'Wđ = 1/2 · m · v', isCorrect: false }
      ],
      explanation: 'SGK trang 17: Công thức tính động năng là Wđ = 1/2 m v².'
    },
    {
      id: 'p2_3',
      level: 'BIẾT',
      levelColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      question: 'Thế năng trọng trường của một vật phụ thuộc trực tiếp vào những đại lượng nào?',
      subText: 'Căn cứ SGK KHTN 9 trang 18 - 20',
      options: [
        { id: 'p2_3_a', text: 'Khối lượng và vận tốc chuyển động', isCorrect: false },
        { id: 'p2_3_b', text: 'Thể tích và diện tích bề mặt tiếp xúc', isCorrect: false },
        { id: 'p2_3_c', text: 'Khối lượng và độ cao so với mốc tính', isCorrect: true },
        { id: 'p2_3_d', text: 'Vận tốc chuyển động và nhiệt độ môi trường', isCorrect: false }
      ],
      explanation: 'SGK trang 20: Thế năng trọng trường Wt = m g h phụ thuộc vào khối lượng m và độ cao h.'
    },
    {
      id: 'p2_4',
      level: 'BIẾT',
      levelColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      question: 'Đơn vị đo chuẩn của động năng và thế năng trong hệ đo lường quốc tế SI là gì?',
      subText: 'Căn cứ SGK KHTN 9 trang 15 - 20',
      options: [
        { id: 'p2_4_a', text: 'Oát (kí hiệu là W)', isCorrect: false },
        { id: 'p2_4_b', text: 'Niutơn (kí hiệu là N)', isCorrect: false },
        { id: 'p2_4_c', text: 'Jun (kí hiệu là J)', isCorrect: true },
        { id: 'p2_4_d', text: 'Mã lực (kí hiệu là HP)', isCorrect: false }
      ],
      explanation: 'Năng lượng, công cơ học, động năng và thế năng đều có đơn vị đo chuẩn trong hệ SI là Jun (J).'
    },
    {
      id: 'p2_5',
      level: 'HIỂU',
      levelColor: 'bg-amber-100 text-amber-800 border-amber-300',
      question: 'Khi tốc độ của một vật tăng lên gấp 3 lần thì động năng của vật đó sẽ thay đổi thế nào?',
      subText: 'Căn cứ SGK KHTN 9 trang 17',
      options: [
        { id: 'p2_5_a', text: 'Tăng lên gấp 3 lần so với ban đầu', isCorrect: false },
        { id: 'p2_5_b', text: 'Tăng lên gấp 6 lần so với ban đầu', isCorrect: false },
        { id: 'p2_5_c', text: 'Tăng lên gấp 9 lần so với ban đầu', isCorrect: true },
        { id: 'p2_5_d', text: 'Giảm đi 3 lần so với ban đầu', isCorrect: false }
      ],
      explanation: 'Vì Wđ tỉ lệ với v² nên khi v tăng 3 lần thì Wđ tăng 3² = 9 lần.'
    },
    {
      id: 'p2_6',
      level: 'HIỂU',
      levelColor: 'bg-amber-100 text-amber-800 border-amber-300',
      question: 'Một vật đang nằm yên tại vị trí được chọn làm mốc thế năng thì thế năng của vật bằng bao nhiêu?',
      subText: 'Căn cứ SGK KHTN 9 trang 20',
      options: [
        { id: 'p2_6_a', text: 'Bằng đúng trọng lượng của vật thể', isCorrect: false },
        { id: 'p2_6_b', text: 'Bằng đúng giá trị 0 Jun', isCorrect: true },
        { id: 'p2_6_c', text: 'Bằng một giá trị âm vô cùng', isCorrect: false },
        { id: 'p2_6_d', text: 'Bằng động năng ban đầu của vật', isCorrect: false }
      ],
      explanation: 'Tại mốc thế năng, độ cao h = 0 nên Wt = m g h = 0 J.'
    },
    {
      id: 'p2_7',
      level: 'HIỂU',
      levelColor: 'bg-amber-100 text-amber-800 border-amber-300',
      question: 'Trong quá trình rơi tự do của một quả táo từ trên cành cây xuống đất, dạng năng lượng nào chuyển hoá thành dạng năng lượng nào?',
      subText: 'Căn cứ SGK KHTN 9 trang 21',
      options: [
        { id: 'p2_7_a', text: 'Động năng chuyển hoá thành thế năng', isCorrect: false },
        { id: 'p2_7_b', text: 'Thế năng chuyển hoá thành động năng', isCorrect: true },
        { id: 'p2_7_c', text: 'Hoá năng chuyển hoá thành cơ năng', isCorrect: false },
        { id: 'p2_7_d', text: 'Nhiệt năng chuyển hoá thành thế năng', isCorrect: false }
      ],
      explanation: 'Khi rơi, độ cao h giảm làm thế năng Wt giảm, đồng thời vận tốc v tăng làm động năng Wđ tăng. Thế năng chuyển hoá thành động năng.'
    },
    {
      id: 'p2_8',
      level: 'HIỂU',
      levelColor: 'bg-amber-100 text-amber-800 border-amber-300',
      question: 'Hai ô tô có cùng khối lượng 1 tấn: xe A chạy với tốc độ 36 km/h, xe B chạy với tốc độ 72 km/h. Tỉ số động năng giữa xe B và xe A là bao nhiêu?',
      subText: 'Căn cứ SGK KHTN 9 trang 17',
      options: [
        { id: 'p2_8_a', text: 'Động năng xe B gấp 2 lần xe A', isCorrect: false },
        { id: 'p2_8_b', text: 'Động năng xe B gấp 4 lần xe A', isCorrect: true },
        { id: 'p2_8_c', text: 'Động năng xe B bằng đúng xe A', isCorrect: false },
        { id: 'p2_8_d', text: 'Động năng xe B gấp 8 lần xe A', isCorrect: false }
      ],
      explanation: 'Tốc độ xe B (72 km/h) gấp 2 lần xe A (36 km/h). Vì Wđ tỉ lệ với v² nên Wđ(B) / Wđ(A) = 2² = 4 lần.'
    },
    {
      id: 'p2_9',
      level: 'VẬN DỤNG',
      levelColor: 'bg-rose-100 text-rose-800 border-rose-300',
      question: 'Một vận động viên có khối lượng 60 kg đang chạy với vận tốc 8 m/s. Động năng của vận động viên là bao nhiêu?',
      subText: 'Căn cứ SGK KHTN 9 trang 17',
      options: [
        { id: 'p2_9_a', text: '240 Jun (J)', isCorrect: false },
        { id: 'p2_9_b', text: '480 Jun (J)', isCorrect: false },
        { id: 'p2_9_c', text: '1920 Jun (J)', isCorrect: true },
        { id: 'p2_9_d', text: '3840 Jun (J)', isCorrect: false }
      ],
      explanation: 'Wđ = 1/2 · m · v² = 1/2 · 60 · 8² = 30 · 64 = 1920 J.'
    },
    {
      id: 'p2_10',
      level: 'VẬN DỤNG',
      levelColor: 'bg-rose-100 text-rose-800 border-rose-300',
      question: 'Một chậu cây có khối lượng 5 kg đặt trên ban công tầng 3 ở độ cao 8 m so với mặt đất. Lấy g = 10 m/s², chọn mốc thế năng tại mặt đất, thế năng của chậu cây là bao nhiêu?',
      subText: 'Căn cứ SGK KHTN 9 trang 20',
      options: [
        { id: 'p2_10_a', text: '40 Jun (J)', isCorrect: false },
        { id: 'p2_10_b', text: '200 Jun (J)', isCorrect: false },
        { id: 'p2_10_c', text: '400 Jun (J)', isCorrect: true },
        { id: 'p2_10_d', text: '800 Jun (J)', isCorrect: false }
      ],
      explanation: 'Wt = m · g · h = 5 · 10 · 8 = 400 J.'
    }
  ],
  examMCQuestions: [
    {
      id: 'e2_mc1',
      points: 0.5,
      question: 'Trường hợp nào dưới đây vật thể có cả động năng và thế năng trọng trường?',
      options: [
        { id: 'e2_c1', text: 'Một chiếc trực thăng đang bay ngang ở độ cao 500m', isCorrect: true },
        { id: 'e2_c2', text: 'Một đoàn tàu hoả đang chạy trên đường ray mặt đất', isCorrect: false },
        { id: 'e2_c3', text: 'Một tảng đá lớn nằm yên trên đỉnh ngọn núi cao', isCorrect: false },
        { id: 'e2_c4', text: 'Một chiếc xe máy đang đỗ trong hầm để xe toà nhà', isCorrect: false }
      ],
      explanation: 'Trực thăng đang bay có tốc độ (có động năng) và ở độ cao 500m so với đất (có thế năng).'
    },
    {
      id: 'e2_mc2',
      points: 0.5,
      question: 'Động năng của một vật chuyển động sẽ thay đổi như thế nào nếu vận tốc của vật giảm đi 2 lần?',
      options: [
        { id: 'e2_c1', text: 'Động năng giảm đi 2 lần so với giá trị lúc đầu', isCorrect: false },
        { id: 'e2_c2', text: 'Động năng giảm đi 4 lần so với giá trị lúc đầu', isCorrect: true },
        { id: 'e2_c3', text: 'Động năng giữ nguyên không đổi so với lúc đầu', isCorrect: false },
        { id: 'e2_c4', text: 'Động năng giảm đi 8 lần so với giá trị lúc đầu', isCorrect: false }
      ],
      explanation: 'Động năng tỉ lệ với v². Khi v giảm 2 lần thì Wđ giảm 2² = 4 lần.'
    },
    {
      id: 'e2_mc3',
      points: 0.5,
      question: 'Khi thả viên bi kim loại từ các độ cao khác nhau trên máng nghiêng va chạm vào miếng gỗ, hiện tượng quan sát được là gì?',
      options: [
        { id: 'e2_c1', text: 'Thả từ vị trí càng cao thì miếng gỗ bị đẩy trượt càng xa', isCorrect: true },
        { id: 'e2_c2', text: 'Thả từ vị trí càng cao thì miếng gỗ bị đẩy trượt càng ngắn', isCorrect: false },
        { id: 'e2_c3', text: 'Quãng đường miếng gỗ trượt không đổi trong mọi trường hợp', isCorrect: false },
        { id: 'e2_c4', text: 'Miếng gỗ luôn đứng yên bất động không bị xê dịch chút nào', isCorrect: false }
      ],
      explanation: 'Thả từ càng cao thì vận tốc ở chân dốc càng lớn, động năng càng lớn làm miếng gỗ trượt càng xa.'
    },
    {
      id: 'e2_mc4',
      points: 0.5,
      question: 'Công thức toán học tính thế năng trọng trường của một vật ở độ cao h là công thức nào?',
      options: [
        { id: 'e2_c1', text: 'Wt = 1/2 · m · h', isCorrect: false },
        { id: 'e2_c2', text: 'Wt = m · g · h', isCorrect: true },
        { id: 'e2_c3', text: 'Wt = 1/2 · m · v²', isCorrect: false },
        { id: 'e2_c4', text: 'Wt = m · v · h', isCorrect: false }
      ],
      explanation: 'SGK trang 20: Wt = P · h = m · g · h.'
    },
    {
      id: 'e2_mc5',
      points: 0.5,
      question: 'Một vật có khối lượng 2 kg đang chuyển động với vận tốc 6 m/s thì có động năng bằng bao nhiêu?',
      options: [
        { id: 'e2_c1', text: '12 Jun (J)', isCorrect: false },
        { id: 'e2_c2', text: '36 Jun (J)', isCorrect: true },
        { id: 'e2_c3', text: '72 Jun (J)', isCorrect: false },
        { id: 'e2_c4', text: '144 Jun (J)', isCorrect: false }
      ],
      explanation: 'Wđ = 1/2 · m · v² = 1/2 · 2 · 6² = 36 J.'
    },
    {
      id: 'e2_mc6',
      points: 0.5,
      question: 'Đại lượng nào sau đây quyết định giá trị của thế năng trọng trường có thể âm, dương hoặc bằng 0?',
      options: [
        { id: 'e2_c1', text: 'Vị trí được chọn làm mốc tính thế năng', isCorrect: true },
        { id: 'e2_c2', text: 'Khối lượng của vật thể tham gia chuyển động', isCorrect: false },
        { id: 'e2_c3', text: 'Tốc độ chuyển động của vật trong không gian', isCorrect: false },
        { id: 'e2_c4', text: 'Chất liệu làm nên vật thể đang nghiên cứu', isCorrect: false }
      ],
      explanation: 'Nếu vật ở phía trên mốc thì Wt > 0; tại mốc thì Wt = 0; ở phía dưới mốc thì Wt < 0.'
    },
    {
      id: 'e2_mc7',
      points: 0.5,
      question: 'Một chiếc ô tô 2 tấn đang chạy trên đường cao tốc với tốc độ 72 km/h. Động năng của chiếc xe là bao nhiêu?',
      options: [
        { id: 'e2_c1', text: '400 000 Jun (400 kJ)', isCorrect: true },
        { id: 'e2_c2', text: '144 000 Jun (144 kJ)', isCorrect: false },
        { id: 'e2_c3', text: '5 184 000 Jun (5184 kJ)', isCorrect: false },
        { id: 'e2_c4', text: '200 000 Jun (200 kJ)', isCorrect: false }
      ],
      explanation: 'Đổi v = 72 km/h = 20 m/s; m = 2 tấn = 2000 kg. Wđ = 1/2 · 2000 · 20² = 400 000 J = 400 kJ.'
    },
    {
      id: 'e2_mc8',
      points: 0.5,
      question: 'Tại sao các nhà máy thuỷ điện thường được xây dựng ở các vùng núi cao có thung lũng sâu?',
      options: [
        { id: 'e2_c1', text: 'Để lợi dụng thế năng trọng trường rất lớn của khối nước trên cao', isCorrect: true },
        { id: 'e2_c2', text: 'Để giảm bớt nhiệt độ của các tuabin phát điện trong lòng hồ', isCorrect: false },
        { id: 'e2_c3', text: 'Để ngăn chặn hoàn toàn hiện tượng bốc hơi nước trong mùa hè', isCorrect: false },
        { id: 'e2_c4', text: 'Để tăng thêm mật độ khoáng chất có trong nguồn nước thuỷ điện', isCorrect: false }
      ],
      explanation: 'Độ cao h càng lớn thì thế năng Wt = m g h càng lớn, khi đổ xuống tạo động năng khổng lồ làm quay tuabin máy phát điện.'
    }
  ],
  examEssayQuestions: [
    {
      id: 'e2_es1',
      points: 1.5,
      title: 'Câu 1: Phân tích thí nghiệm máng nghiêng và các yếu tố ảnh hưởng đến động năng',
      prompt: 'Dựa vào thí nghiệm máng nghiêng SGK KHTN 9 Hình 2.1, hãy cho biết: Làm thế nào để thay đổi tốc độ của viên bi khi đến chân dốc? Nhờ đâu người ta nhận biết được động năng của viên bi thay đổi?',
      sampleSolution: '1. Để thay đổi tốc độ của viên bi khi đến chân dốc: Ta thay đổi độ cao h thả viên bi trên máng nghiêng. Thả từ vị trí càng cao thì thế năng ban đầu càng lớn, khi lăn xuống chân dốc vận tốc của viên bi càng lớn.\n2. Nhận biết động năng thay đổi qua quãng đường s mà miếng gỗ bị viên bi đẩy trượt: Miếng gỗ trượt càng xa chứng tỏ công sinh ra càng lớn, tức động năng của viên bi khi va chạm càng lớn.'
    },
    {
      id: 'e2_es2',
      points: 1.5,
      title: 'Câu 2: Bài toán định lượng và an toàn giao thông đường bộ',
      prompt: 'Một chiếc ô tô tải có khối lượng m = 4000 kg đang chạy với tốc độ 54 km/h trên quốc lộ. Hãy tính động năng của chiếc ô tô tải. Từ công thức động năng Wđ = 1/2 m v², hãy giải thích tại sao luật giao thông luôn bắt buộc giảm tốc độ khi đi qua khu vực đông dân cư?',
      sampleSolution: '1. Đổi đơn vị: v = 54 km/h = 54 / 3,6 = 15 m/s. Khối lượng m = 4000 kg.\nĐộng năng của xe tải là: Wđ = 1/2 · m · v² = 1/2 · 4000 · 15² = 2000 · 225 = 450 000 J = 450 kJ.\n2. Giải thích: Vì động năng tỉ lệ với bình phương vận tốc (v²), nên khi xe chạy nhanh, động năng của xe rất lớn khiến quãng đường phanh dừng tăng vọt và lực va chạm có sức tàn phá cực kì khủng khiếp. Do đó, giảm tốc độ ở khu dân cư giúp giảm mạnh động năng, giúp tài xế làm chủ tình huống và giảm thiểu tối đa tai nạn.'
    },
    {
      id: 'e2_es3',
      points: 1.5,
      title: 'Câu 3: Phân tích vai trò của mốc thế năng trọng trường',
      prompt: 'Một vật có khối lượng m = 2 kg được đặt trên mặt bàn cao 1 m so với sàn nhà. Trần nhà cao 3 m so với mặt sàn. Hãy tính thế năng trọng trường của vật trong 2 trường hợp: a) Chọn mốc thế năng tại sàn nhà; b) Chọn mốc thế năng tại mặt bàn (lấy g = 10 m/s²). Nêu ý nghĩa của việc chọn mốc thế năng.',
      sampleSolution: '1. Trường hợp a: Chọn mốc thế năng tại sàn nhà thì độ cao của vật là h1 = 1 m.\nThế năng của vật là: Wt1 = m · g · h1 = 2 · 10 · 1 = 20 J.\n2. Trường hợp b: Chọn mốc thế năng tại mặt bàn thì độ cao của vật là h2 = 0 m.\nThế năng của vật là: Wt2 = m · g · h2 = 2 · 10 · 0 = 0 J.\n3. Ý nghĩa: Thế năng trọng trường có tính tương đối, giá trị của nó phụ thuộc vào vị trí chọn làm mốc thế năng quy ước.'
    },
    {
      id: 'e2_es4',
      points: 1.5,
      title: 'Câu 4: Quá trình chuyển hoá năng lượng giữa động năng và thế năng',
      prompt: 'Một quả bóng chuyền được ném thẳng đứng lên cao từ mặt đất. Hãy mô tả chi tiết sự chuyển hoá qua lại giữa động năng và thế năng của quả bóng từ lúc rời tay đến khi lên tới điểm cao nhất rồi rơi trở lại chạm đất (bỏ qua sức cản của không khí).',
      sampleSolution: '1. Giai đoạn bay lên: Từ mặt đất lên điểm cao nhất, độ cao h tăng dần nên thế năng Wt tăng dần, đồng thời vận tốc v giảm dần do chịu trọng lực cản trở nên động năng Wđ giảm dần. Động năng chuyển hoá dần thành thế năng.\n2. Tại điểm cao nhất: Vận tốc v = 0 nên động năng Wđ = 0, độ cao h đạt cực đại nên thế năng Wt đạt giá trị lớn nhất.\n3. Giai đoạn rơi xuống: Từ điểm cao nhất rơi về mặt đất, độ cao h giảm dần nên thế năng Wt giảm dần, vận tốc v tăng dần nên động năng Wđ tăng dần. Thế năng chuyển hoá ngược lại thành động năng cho đến khi chạm đất.'
    }
  ]
};

// ============================================================================
// DỮ LIỆU BÀI 3: CƠ NĂNG (CHƯƠNG I: NĂNG LƯỢNG CƠ HỌC - SGK KHTN 9 TRANG 18 - 20)
// ============================================================================
export const LESSON_3_DATA: SgkLessonPackage = {
  id: 3,
  title: 'BÀI 3: CƠ NĂNG',
  shortTitle: 'Bài 3: Cơ năng',
  chapterTitle: 'CHƯƠNG I: NĂNG LƯỢNG CƠ HỌC • SGK KHTN 9 (KẾT NỐI TRI THỨC VỚI CUỘC SỐNG)',
  pageInfo: 'SGK trang 18 – 20',
  warmup: {
    scenarioTitle: 'TÌNH HUỐNG MỞ ĐẦU SGK TRANG 18: BÚA MÁY ĐÓNG CỌC',
    scenarioText: 'Khi sử dụng búa máy để đóng cọc, đầu búa được nâng lên đến một độ cao nhất định rồi thả cho rơi xuống cọc cần đóng. Trong quá trình rơi, động năng và thế năng của đầu búa chuyển hoá qua lại lẫn nhau như thế nào?',
    question: 'Trong quá trình đầu búa máy rơi từ trên cao xuống cọc bê tông, sự biến đổi của thế năng và động năng diễn ra như thế nào?',
    options: [
      { id: 'wm3_opt1', text: 'Độ cao giảm nên thế năng giảm, vận tốc tăng nên động năng tăng (thế năng chuyển hoá thành động năng).', isCorrect: true },
      { id: 'wm3_opt2', text: 'Độ cao tăng nên thế năng tăng, vận tốc giảm nên động năng giảm (động năng chuyển hoá thành thế năng).', isCorrect: false },
      { id: 'wm3_opt3', text: 'Cả thế năng và động năng đều giảm dần do đầu búa chịu sức cản liên tục của trọng trường Trái Đất.', isCorrect: false },
      { id: 'wm3_opt4', text: 'Cả thế năng và động năng đều không đổi trong suốt thời gian đầu búa rơi tự do từ trên cao xuống.', isCorrect: false }
    ],
    explanation: 'Căn cứ SGK KHTN 9 trang 18: Khi đầu búa rơi từ trên cao xuống, độ cao h giảm dần nên thế năng giảm; đồng thời tốc độ v tăng dần nên động năng tăng dần. Toàn bộ thế năng ban đầu của đầu búa chuyển hoá thành động năng khi va chạm vào cọc!'
  },
  topics: [
    {
      id: 'top_3_1',
      order: 'I.1',
      title: 'Khái niệm cơ năng của một vật',
      badge: 'SGK trang 18',
      page: 'Trang 18',
      newKnowledge: [
        'Tổng động năng và thế năng của một vật được gọi là cơ năng của vật đó.',
        'Biểu thức xác định cơ năng: Wc = Wđ + Wt = 1/2 · m · v² + P · h (trong đó P = 10m).',
        'Đơn vị đo lường của cơ năng trong hệ SI là jun (kí hiệu là J).',
        'Một vật có thể vừa có động năng, vừa có thế năng tại cùng một thời điểm (ví dụ: máy bay đang bay).'
      ],
      coreSummary: [
        'Cơ năng: Wc = Wđ + Wt.',
        'Công thức: Wc = 1/2 · m · v² + P · h.',
        'Đơn vị chuẩn: Jun (J).'
      ],
      exampleTitle: 'Ví dụ vật vừa có động năng vừa có thế năng (SGK trang 18)',
      exampleText: 'Một chiếc máy bay khối lượng 40 tấn đang bay ở độ cao 10 000 m với tốc độ 800 km/h: Máy bay có thế năng trọng trường cực lớn do đang ở trên cao, đồng thời có động năng khổng lồ do đang di chuyển với tốc độ cao. Tổng của hai dạng năng lượng này chính là cơ năng của máy bay.',
      quickQuiz: {
        question: 'Phát biểu nào sau đây định nghĩa chính xác nhất về cơ năng của một vật theo SGK KHTN 9?',
        options: [
          { id: 'qq3_1_a', text: 'Cơ năng của một vật là tổng động năng và thế năng của vật đó trong hệ quy chiếu đã chọn.', isCorrect: true },
          { id: 'qq3_1_b', text: 'Cơ năng của một vật là hiệu số giữa động năng và thế năng của vật đó trong trọng trường.', isCorrect: false },
          { id: 'qq3_1_c', text: 'Cơ năng của một vật là tích số giữa khối lượng của vật với gia tốc rơi tự do của Trái Đất.', isCorrect: false },
          { id: 'qq3_1_d', text: 'Cơ năng của một vật là năng lượng nhiệt toả ra khi vật ma sát với môi trường không khí.', isCorrect: false }
        ],
        explanation: 'Theo SGK KHTN 9 trang 18: Tổng động năng và thế năng được gọi là cơ năng của vật (Wc = Wđ + Wt).'
      },
      keyTakeaway: 'Ghi nhớ: Cơ năng của một vật là tổng động năng và thế năng: Wc = Wđ + Wt = 1/2 m v² + P h (đơn vị Jun).'
    },
    {
      id: 'top_3_2',
      order: 'I.2',
      title: 'Sự chuyển hoá năng lượng trong trò chơi tung hứng',
      badge: 'Hình 3.1 SGK trang 18',
      page: 'Trang 18',
      newKnowledge: [
        'Giai đoạn vật bay lên trên: độ cao tăng dần nên thế năng tăng; tốc độ giảm dần nên động năng giảm.',
        'Ở vị trí cao nhất: vận tốc v = 0 nên động năng bằng 0, thế năng đạt giá trị cực đại.',
        'Giai đoạn vật rơi xuống dưới: độ cao giảm dần nên thế năng giảm; tốc độ tăng dần nên động năng tăng.',
        'Động năng và thế năng có thể chuyển hoá qua lại lẫn nhau liên tục trong quá trình chuyển động.'
      ],
      coreSummary: [
        'Vật chuyển động đi lên: Động năng chuyển hoá thành thế năng.',
        'Vật chuyển động rơi xuống: Thế năng chuyển hoá thành động năng.',
        'Tại vị trí cao nhất: Động năng bằng 0, thế năng cực đại.'
      ],
      exampleTitle: 'Phân tích trò chơi tung hứng bóng (Hình 3.1 SGK trang 18)',
      exampleText: 'Khi người diễn xiếc ném quả bóng lên, tay truyền cho quả bóng vận tốc lớn ban đầu (động năng lớn). Quả bóng bay vút lên cao, bay chậm dần và dừng lại trong khoảnh khắc ở vị trí cao nhất (toàn bộ động năng biến thành thế năng), sau đó rơi nhanh dần trở lại lòng bàn tay.',
      quickQuiz: {
        question: 'Trong trò chơi tung hứng (Hình 3.1 SGK), tại vị trí quả bóng đạt độ cao lớn nhất thì:',
        options: [
          { id: 'qq3_2_a', text: 'Vận tốc quả bóng bằng 0 nên động năng bằng 0, thế năng của quả bóng đạt giá trị cực đại.', isCorrect: true },
          { id: 'qq3_2_b', text: 'Vận tốc quả bóng đạt cực đại nên động năng đạt giá trị lớn nhất, thế năng bằng 0.', isCorrect: false },
          { id: 'qq3_2_c', text: 'Cả động năng và thế năng của quả bóng đều bị triệt tiêu hoàn toàn về mức bằng 0.', isCorrect: false },
          { id: 'qq3_2_d', text: 'Thế năng giảm xuống mức tối thiểu trong khi động năng bắt đầu chuyển hoá thành nhiệt.', isCorrect: false }
        ],
        explanation: 'Tại điểm cao nhất, quả bóng dừng lại trong chốc lát (v = 0 nên Wđ = 0), độ cao h cực đại nên thế năng Wt đạt giá trị lớn nhất.'
      },
      keyTakeaway: 'Ghi nhớ: Khi vật đi lên thì Wđ chuyển thành Wt; khi vật rơi xuống thì Wt chuyển ngược lại thành Wđ.'
    },
    {
      id: 'top_3_3',
      order: 'II.1',
      title: 'Định luật bảo toàn cơ năng',
      badge: 'SGK trang 19',
      page: 'Trang 19',
      newKnowledge: [
        'Nếu cơ năng của vật không chuyển hoá thành dạng năng lượng khác (bỏ qua ma sát và lực cản), cơ năng luôn không đổi.',
        'Khi đó cơ năng được bảo toàn: Wc = Wđ + Wt = hằng số (const).',
        'Động năng giảm bao nhiêu thì thế năng tăng lên bấy nhiêu và ngược lại.',
        'Tại mặt đất (chọn mốc thế năng h = 0): Wt = 0, toàn bộ cơ năng là động năng cực đại: Wc = Wđ(max) = 1/2 · m · v².'
      ],
      coreSummary: [
        'Điều kiện bảo toàn: Chỉ chịu tác dụng của trọng lực (bỏ qua ma sát, lực cản).',
        'Hệ thức: Wc = Wđ + Wt = const.',
        'Tại vị trí thả (đỉnh): Wc = Wt(max). Tại mặt đất: Wc = Wđ(max).'
      ],
      exampleTitle: 'Bài toán thả rơi vật m = 1,5 kg từ độ cao h = 4 m (SGK trang 19)',
      exampleText: 'Thả rơi tự do vật m = 1,5 kg từ độ cao h = 4 m. Chọn mốc thế năng ở mặt đất.\n1. Thế năng ban đầu ở đỉnh: Wt = P · h = 10 · m · h = 10 · 1,5 · 4 = 60 J.\n2. Do cơ năng bảo toàn nên khi vừa chạm đất, toàn bộ 60 J chuyển thành động năng: Wđ = 1/2 · m · v² = 60 J ➔ 1/2 · 1,5 · v² = 60 ➔ v² = 80 ➔ v = √80 ≈ 8,94 m/s.',
      simulation: 'mechanical_energy',
      quickQuiz: {
        question: 'Một vật được thả rơi tự do từ độ cao h xuống mặt đất (bỏ qua sức cản). Nhận định nào sau đây là đúng?',
        options: [
          { id: 'qq3_3_a', text: 'Cơ năng của vật luôn không đổi; thế năng giảm bao nhiêu thì động năng tăng lên bấy nhiêu.', isCorrect: true },
          { id: 'qq3_3_b', text: 'Cơ năng của vật tăng dần theo thời gian vì vận tốc rơi của vật ngày càng tăng nhanh.', isCorrect: false },
          { id: 'qq3_3_c', text: 'Cơ năng của vật giảm dần về 0 khi vật chạm đất vì độ cao của vật đã bị triệt tiêu.', isCorrect: false },
          { id: 'qq3_3_d', text: 'Động năng và thế năng của vật luôn luôn bằng nhau ở mọi vị trí trên quãng đường rơi.', isCorrect: false }
        ],
        explanation: 'Khi bỏ qua sức cản không khí, cơ năng được bảo toàn (Wc = Wđ + Wt = const). Khi thế năng giảm, động năng tăng tương ứng.'
      },
      keyTakeaway: 'Ghi nhớ: Khi bỏ qua ma sát và lực cản, cơ năng của vật được bảo toàn: Wc = Wđ + Wt = hằng số.'
    },
    {
      id: 'top_3_4',
      order: 'II.2',
      title: 'Thí nghiệm con lắc đơn và sự hao phí cơ năng',
      badge: 'Hình 3.2 SGK trang 19',
      page: 'Trang 19',
      newKnowledge: [
        'Thí nghiệm: Kéo vật nặng đến vị trí A ở độ cao h rồi thả nhẹ (Hình 3.2 SGK).',
        'Chuyển động: Vật đi từ A đến vị trí thấp nhất O (thế năng chuyển thành động năng, tốc độ tại O lớn nhất).',
        'Tiếp tục từ O đi lên vị trí B: Động năng chuyển hoá thành thế năng, tại B vật dừng lại rồi quay ngược lại.',
        'Trong thực tế, sau một thời gian dao động, độ cao của vật nặng giảm dần do một phần cơ năng chuyển hoá thành nhiệt năng bởi lực cản của không khí.'
      ],
      coreSummary: [
        'Vị trí A, B (biên): Tốc độ v = 0, thế năng cực đại, động năng bằng 0.',
        'Vị trí O (cân bằng): Độ cao thấp nhất, động năng cực đại, thế năng cực tiểu.',
        'Hao phí: Lực cản không khí làm cơ năng giảm dần chuyển hoá thành nhiệt năng.'
      ],
      exampleTitle: 'Khảo sát độ cao điểm B so với điểm A (Hình 3.2 SGK)',
      exampleText: 'Nếu không có lực cản không khí, độ cao điểm B sẽ đúng bằng độ cao điểm A (hB = hA). Tuy nhiên trong không khí thực tế, do có lực cản ma sát nên độ cao điểm B luôn hơi thấp hơn điểm A một chút và sau một thời gian con lắc sẽ dừng lại ở vị trí O.',
      simulation: 'pendulum_energy',
      quickQuiz: {
        question: 'Trong thí nghiệm con lắc đơn (Hình 3.2 SGK), tại sao sau một thời gian dao động thì độ cao của vật nặng giảm dần và dừng lại?',
        options: [
          { id: 'qq3_4_a', text: 'Do một phần cơ năng của con lắc đã bị chuyển hoá thành nhiệt năng bởi lực cản không khí.', isCorrect: true },
          { id: 'qq3_4_b', text: 'Do khối lượng của vật nặng bị tiêu hao dần theo thời gian trong quá trình chuyển động.', isCorrect: false },
          { id: 'qq3_4_c', text: 'Do lực hút của Trái Đất yếu dần đi khi con lắc dao động qua lại quanh vị trí cân bằng.', isCorrect: false },
          { id: 'qq3_4_d', text: 'Do sợi dây treo con lắc bị co ngắn lại làm cho biên độ góc của con lắc bị thu nhỏ dần.', isCorrect: false }
        ],
        explanation: 'Căn cứ SGK KHTN 9 trang 19 - 20: Dưới tác dụng của lực cản không khí, một phần cơ năng chuyển hoá thành nhiệt năng làm cơ năng giảm dần.'
      },
      keyTakeaway: 'Ghi nhớ: Khi có ma sát hoặc lực cản, cơ năng không bảo toàn mà chuyển hoá một phần thành nhiệt năng.'
    },
    {
      id: 'top_3_5',
      order: 'II.3',
      title: 'Quỹ đạo ném vật & Mô hình xe thế năng',
      badge: 'Hình 3.3 & 3.4 SGK trang 19 – 20',
      page: 'Trang 19 – 20',
      newKnowledge: [
        'Quỹ đạo ném ngang (1) và ném chếch lên trên (2) ở Hình 3.3 SGK: Động năng và thế năng chuyển hoá liên tục dọc theo quỹ đạo parabol.',
        'Mô hình xe thế năng (Hình 3.4 SGK): Quả nặng m1 ở độ cao h nối qua ròng rọc kéo trục xe m2 lăn trên sàn.',
        'Khi quả nặng rơi từ trên xuống, thế năng của quả nặng chuyển hoá thành động năng của toàn bộ xe và quả nặng.',
        'Trong thực tế, tốc độ của xe luôn nhỏ hơn lí thuyết vì mất mát năng lượng do ma sát ở trục xe, bánh xe và lực cản không khí.',
        'Ứng dụng nhảy xa (SGK trang 20): Cần chạy lấy đà thật nhanh (động năng lớn) và bật cao tại vị trí giậm nhảy (chuyển hoá tạo góc bay tối ưu).'
      ],
      coreSummary: [
        'Mô hình xe thế năng: Thế năng quả nặng chuyển hoá thành động năng lăn của xe.',
        'Thực tế: Có ma sát nên tốc độ xe luôn nhỏ hơn giá trị lí thuyết bảo toàn.',
        'Nhảy xa: Chạy đà nhanh + giậm bật cao giúp đạt tầm xa tối đa.'
      ],
      exampleTitle: 'Bài toán xe thế năng Hình 3.4 SGK trang 20',
      exampleText: 'Quả nặng m1 = 20 g = 0,02 kg ở độ cao h = 8 cm = 0,08 m. Khối lượng xe m2 = 50 g = 0,05 kg.\nThế năng quả nặng ban đầu: Wt = m1 · g · h = 0,02 · 10 · 0,08 = 0,016 J.\nNếu coi toàn bộ thế năng chuyển thành động năng hệ (m1 + m2): 1/2 · (m1 + m2) · v² = 0,016 ➔ 1/2 · 0,07 · v² = 0,016 ➔ v ≈ 0,676 m/s.',
      quickQuiz: {
        question: 'Trong mô hình xe thế năng (Hình 3.4 SGK trang 20), năng lượng ban đầu được tích trữ dưới dạng nào?',
        options: [
          { id: 'qq3_5_a', text: 'Thế năng trọng trường của quả nặng khi được treo ở độ cao nhất định so với sàn xe.', isCorrect: true },
          { id: 'qq3_5_b', text: 'Nhiệt năng do ma sát của các ổ trục bánh xe sinh ra khi sợi dây bắt đầu kéo căng.', isCorrect: false },
          { id: 'qq3_5_c', text: 'Động năng chuyển động tịnh tiến có sẵn của khung xe trước khi quả nặng được thả ra.', isCorrect: false },
          { id: 'qq3_5_d', text: 'Thế năng tĩnh điện giữa các electron tự do tích luỹ trên bề mặt của dây kéo ròng rọc.', isCorrect: false }
        ],
        explanation: 'Ban đầu quả nặng m1 được đặt ở độ cao h so với sàn xe nên hệ thống tích trữ năng lượng dưới dạng thế năng trọng trường của quả nặng.'
      },
      keyTakeaway: 'Ghi nhớ: Xe thế năng minh hoạ sự chuyển hoá từ thế năng thành động năng; thực tế tốc độ giảm do lực ma sát.'
    }
  ],
  practiceQuestions: [
    {
      id: 'p3_q1',
      level: 'BIẾT',
      levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
      question: 'Cơ năng của một vật chuyển động trong trọng trường được định nghĩa là gì?',
      subText: 'Căn cứ mục I - Khái niệm cơ năng (SGK KHTN 9 trang 18)',
      options: [
        { id: 'p3_1_a', text: 'Là tổng của động năng và thế năng trọng trường của vật đó.', isCorrect: true },
        { id: 'p3_1_b', text: 'Là hiệu số giữa động năng ban đầu và thế năng lúc sau của vật.', isCorrect: false },
        { id: 'p3_1_c', text: 'Là phần năng lượng nhiệt sinh ra do vật cọ xát với môi trường.', isCorrect: false },
        { id: 'p3_1_d', text: 'Là tích số giữa khối lượng của vật với độ cao của vật so với đất.', isCorrect: false }
      ],
      explanation: 'Theo SGK KHTN 9 trang 18: Tổng động năng và thế năng được gọi là cơ năng của vật (Wc = Wđ + Wt).'
    },
    {
      id: 'p3_q2',
      level: 'BIẾT',
      levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
      question: 'Biểu thức nào sau đây dùng để tính cơ năng của một vật có khối lượng m, tốc độ v ở độ cao h so với mốc thế năng?',
      subText: 'Căn cứ công thức tính cơ năng (SGK KHTN 9 trang 18)',
      options: [
        { id: 'p3_2_a', text: 'Wc = 1/2 · m · v² + P · h', isCorrect: true },
        { id: 'p3_2_b', text: 'Wc = 1/2 · m · v + P · h²', isCorrect: false },
        { id: 'p3_2_c', text: 'Wc = m · v² - P · h', isCorrect: false },
        { id: 'p3_2_d', text: 'Wc = 1/2 · P · v² + m · h', isCorrect: false }
      ],
      explanation: 'Công thức cơ năng trong SGK trang 18 là: Wc = Wđ + Wt = 1/2 · m · v² + P · h (với P = 10m).'
    },
    {
      id: 'p3_q3',
      level: 'BIẾT',
      levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
      question: 'Trong hệ đơn vị đo lường quốc tế SI, đơn vị của cơ năng là gì?',
      subText: 'Căn cứ quy ước đơn vị năng lượng cơ học (SGK KHTN 9 trang 18)',
      options: [
        { id: 'p3_3_a', text: 'Jun, kí hiệu viết tắt là J.', isCorrect: true },
        { id: 'p3_3_b', text: 'Oát, kí hiệu viết tắt là W.', isCorrect: false },
        { id: 'p3_3_c', text: 'Niutơn, kí hiệu viết tắt là N.', isCorrect: false },
        { id: 'p3_3_d', text: 'Kilôgam, kí hiệu viết tắt là kg.', isCorrect: false }
      ],
      explanation: 'SGK trang 18 ghi rõ: Đơn vị của cơ năng là jun (kí hiệu là J).'
    },
    {
      id: 'p3_q4',
      level: 'BIẾT',
      levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
      question: 'Cơ năng của một vật chuyển động trong trọng trường được bảo toàn trong điều kiện nào?',
      subText: 'Căn cứ mục II - Định luật bảo toàn cơ năng (SGK KHTN 9 trang 19)',
      options: [
        { id: 'p3_4_a', text: 'Khi vật chỉ chịu tác dụng của trọng lực, không chịu lực ma sát và lực cản.', isCorrect: true },
        { id: 'p3_4_b', text: 'Khi vật chuyển động với tốc độ không đổi trên một mặt phẳng nằm ngang.', isCorrect: false },
        { id: 'p3_4_c', text: 'Khi vật rơi trong môi trường chất lỏng có độ nhớt và lực cản lớn.', isCorrect: false },
        { id: 'p3_4_d', text: 'Khi vật chuyển động nhanh dần đều dưới tác dụng của lực kéo phụ trợ.', isCorrect: false }
      ],
      explanation: 'Theo SGK KHTN 9 trang 19: Nếu cơ năng không chuyển hoá thành dạng năng lượng khác (như nhiệt do ma sát, lực cản), cơ năng của vật được bảo toàn.'
    },
    {
      id: 'p3_q5',
      level: 'HIỂU',
      levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      question: 'Khi ném một quả bóng lên theo phương thẳng đứng, quá trình bóng bay từ tay lên vị trí cao nhất diễn ra sự chuyển hoá năng lượng nào?',
      subText: 'Căn cứ ví dụ tung hứng Hình 3.1 (SGK KHTN 9 trang 18)',
      options: [
        { id: 'p3_5_a', text: 'Động năng giảm dần chuyển hoá thành thế năng tăng dần.', isCorrect: true },
        { id: 'p3_5_b', text: 'Thế năng giảm dần chuyển hoá thành động năng tăng dần.', isCorrect: false },
        { id: 'p3_5_c', text: 'Cơ năng của quả bóng chuyển hoá hoàn toàn thành nhiệt năng.', isCorrect: false },
        { id: 'p3_5_d', text: 'Nhiệt năng của môi trường chuyển hoá thành thế năng của bóng.', isCorrect: false }
      ],
      explanation: 'Khi bóng bay lên cao, độ cao tăng nên thế năng tăng; vận tốc giảm nên động năng giảm. Động năng đã chuyển hoá thành thế năng.'
    },
    {
      id: 'p3_q6',
      level: 'HIỂU',
      levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      question: 'Trong thí nghiệm con lắc đơn (Hình 3.2 SGK trang 19), tại vị trí cân bằng thấp nhất O thì:',
      subText: 'Căn cứ thí nghiệm con lắc đơn (SGK KHTN 9 trang 19)',
      options: [
        { id: 'p3_6_a', text: 'Thế năng nhỏ nhất, vận tốc lớn nhất nên động năng đạt giá trị cực đại.', isCorrect: true },
        { id: 'p3_6_b', text: 'Động năng bằng 0, độ cao lớn nhất nên thế năng đạt giá trị cực đại.', isCorrect: false },
        { id: 'p3_6_c', text: 'Cả động năng và thế năng đều bằng 0 vì vật đi qua điểm cân bằng.', isCorrect: false },
        { id: 'p3_6_d', text: 'Cơ năng bị giảm về 0 do con lắc đã chuyển động hết một nửa chu kì.', isCorrect: false }
      ],
      explanation: 'Tại vị trí O thấp nhất, độ cao nhỏ nhất nên thế năng cực tiểu; tốc độ của vật nặng lớn nhất nên động năng đạt giá trị cực đại.'
    },
    {
      id: 'p3_q7',
      level: 'HIỂU',
      levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      question: 'Trong thực tế, khi con lắc đơn dao động trong không khí, sau một thời gian con lắc sẽ dừng lại vì:',
      subText: 'Căn cứ mục II - Sự chuyển hoá năng lượng (SGK KHTN 9 trang 19)',
      options: [
        { id: 'p3_7_a', text: 'Cơ năng chuyển hoá dần thành nhiệt năng do ma sát với không khí.', isCorrect: true },
        { id: 'p3_7_b', text: 'Khối lượng của quả cầu con lắc bị giảm dần trong quá trình chuyển động.', isCorrect: false },
        { id: 'p3_7_c', text: 'Lực hút của Trái Đất tác dụng lên vật bị suy giảm sau mỗi chu kì.', isCorrect: false },
        { id: 'p3_7_d', text: 'Chiều dài của sợi dây treo bị biến dạng và giảm độ đàn hồi ban đầu.', isCorrect: false }
      ],
      explanation: 'Lực cản của không khí sinh công cản, làm một phần cơ năng chuyển hoá thành nhiệt năng toả ra môi trường, khiến dao động tắt dần.'
    },
    {
      id: 'p3_q8',
      level: 'HIỂU',
      levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      question: 'Trong mô hình xe thế năng (Hình 3.4 SGK trang 20), tại sao tốc độ thực tế của xe luôn nhỏ hơn giá trị tính toán lí thuyết?',
      subText: 'Căn cứ câu c hoạt động xe thế năng (SGK KHTN 9 trang 20)',
      options: [
        { id: 'p3_8_a', text: 'Do một phần cơ năng bị tiêu hao thành nhiệt năng vì ma sát ở trục xe và sàn.', isCorrect: true },
        { id: 'p3_8_b', text: 'Do trọng lượng của xe tăng lên khi quả nặng bắt đầu chuyển động rơi xuống.', isCorrect: false },
        { id: 'p3_8_c', text: 'Do lực hút của Trái Đất không tác dụng lên quả nặng trong quá trình rơi.', isCorrect: false },
        { id: 'p3_8_d', text: 'Do ròng rọc cố định làm triệt tiêu hoàn toàn thế năng của quả nặng.', isCorrect: false }
      ],
      explanation: 'Trong thực tế luôn tồn tại lực ma sát ở trục bánh xe, ma sát lăn giữa bánh xe với sàn và lực cản không khí, làm tiêu hao một phần năng lượng thành nhiệt năng.'
    },
    {
      id: 'p3_q9',
      level: 'VẬN DỤNG',
      levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
      question: 'Một vật có khối lượng m = 1,5 kg thả rơi tự do từ độ cao h = 4 m (chọn gốc ở đất, g = 10 m/s², bỏ qua cản). Tốc độ của vật khi vừa chạm đất là:',
      subText: 'Căn cứ bài tập vận dụng (SGK KHTN 9 trang 19)',
      options: [
        { id: 'p3_9_a', text: 'Khoảng 8,94 m/s (căn bậc hai của 80).', isCorrect: true },
        { id: 'p3_9_b', text: 'Đúng 4,00 m/s (bằng giá trị độ cao h).', isCorrect: false },
        { id: 'p3_9_c', text: 'Đúng 40,0 m/s (tích số giữa g và độ cao h).', isCorrect: false },
        { id: 'p3_9_d', text: 'Khoảng 6,32 m/s (căn bậc hai của 40).', isCorrect: false }
      ],
      explanation: 'Bảo toàn cơ năng: Wt(đỉnh) = Wđ(chạm đất) ➔ m · g · h = 1/2 · m · v² ➔ v² = 2 · g · h = 2 · 10 · 4 = 80 ➔ v = √80 ≈ 8,94 m/s.'
    },
    {
      id: 'p3_q10',
      level: 'VẬN DỤNG',
      levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
      question: 'Để nhảy xa đạt thành tích tốt nhất, vận động viên cần chạy lấy đà thật nhanh và giậm nhảy bật cao. Dưới góc độ cơ năng, điều này có ý nghĩa gì?',
      subText: 'Căn cứ mục "Em có thể" (SGK KHTN 9 trang 20)',
      options: [
        { id: 'p3_10_a', text: 'Chạy đà tạo động năng lớn, giậm bật cao giúp góc bay và thế năng tối ưu cho tầm xa cực đại.', isCorrect: true },
        { id: 'p3_10_b', text: 'Chạy đà làm giảm trọng lượng cơ thể, giậm nhảy giúp triệt tiêu hoàn toàn lực cản không khí.', isCorrect: false },
        { id: 'p3_10_c', text: 'Chạy đà chỉ để làm nóng các nhóm cơ bắp, bật nhảy không ảnh hưởng đến quỹ đạo bay của người.', isCorrect: false },
        { id: 'p3_10_d', text: 'Giậm nhảy giúp cơ thể tích tụ thế năng đàn hồi để biến đổi thành phản lực mặt đất.', isCorrect: false }
      ],
      explanation: 'Chạy đà nhanh cung cấp động năng ban đầu lớn; giậm nhảy bật cao tạo góc bay xiên hợp lý (khoảng 45°), kết hợp chuyển hoá động năng và thế năng để đạt tầm bay xa tối đa.'
    }
  ],
  examMCQuestions: [
    {
      id: 'e3_mc1',
      points: 0.5,
      question: 'Phát biểu nào sau đây là đúng khi nói về cơ năng của một vật?',
      options: [
        { id: 'e3_1_a', text: 'Cơ năng là tổng động năng và thế năng của vật.', isCorrect: true },
        { id: 'e3_1_b', text: 'Cơ năng là hiệu giữa thế năng và động năng của vật.', isCorrect: false },
        { id: 'e3_1_c', text: 'Cơ năng luôn bằng 0 nếu vật đứng yên trên mặt đất.', isCorrect: false },
        { id: 'e3_1_d', text: 'Cơ năng chỉ xuất hiện khi vật bị biến dạng đàn hồi.', isCorrect: false }
      ],
      explanation: 'SGK trang 18: Cơ năng là tổng động năng và thế năng của vật (Wc = Wđ + Wt).'
    },
    {
      id: 'e3_mc2',
      points: 0.5,
      question: 'Một vật có khối lượng m = 2 kg đang ở độ cao h = 5 m so với mặt đất (g = 10 m/s²), đứng yên. Cơ năng của vật so với mốc mặt đất là:',
      options: [
        { id: 'e3_2_a', text: '100 Jun (J)', isCorrect: true },
        { id: 'e3_2_b', text: '50 Jun (J)', isCorrect: false },
        { id: 'e3_2_c', text: '10 Jun (J)', isCorrect: false },
        { id: 'e3_2_d', text: '250 Jun (J)', isCorrect: false }
      ],
      explanation: 'Vật đứng yên nên v = 0 ➔ Wđ = 0. Cơ năng Wc = Wt = P · h = 10 · m · h = 10 · 2 · 5 = 100 J.'
    },
    {
      id: 'e3_mc3',
      points: 0.5,
      question: 'Khi thả rơi tự do một hòn đá từ độ cao h xuống nước, trong quá trình rơi trong không khí (bỏ qua sức cản):',
      options: [
        { id: 'e3_3_a', text: 'Thế năng của hòn đá giảm dần, động năng tăng dần, cơ năng không đổi.', isCorrect: true },
        { id: 'e3_3_b', text: 'Cả động năng và thế năng của hòn đá đều tăng dần theo thời gian.', isCorrect: false },
        { id: 'e3_3_c', text: 'Thế năng của hòn đá tăng dần, động năng giảm dần, cơ năng giảm.', isCorrect: false },
        { id: 'e3_3_d', text: 'Động năng không đổi trong khi thế năng giảm tỉ lệ thuận với độ cao.', isCorrect: false }
      ],
      explanation: 'Khi rơi, độ cao giảm nên thế năng giảm; tốc độ tăng nên động năng tăng; tổng cơ năng bảo toàn không đổi.'
    },
    {
      id: 'e3_mc4',
      points: 0.5,
      question: 'Trong dao động của con lắc đơn (Hình 3.2 SGK trang 19), tại vị trí biên (điểm A hoặc điểm B):',
      options: [
        { id: 'e3_4_a', text: 'Vận tốc bằng 0, động năng bằng 0, thế năng đạt giá trị cực đại.', isCorrect: true },
        { id: 'e3_4_b', text: 'Vận tốc cực đại, động năng cực đại, thế năng đạt giá trị bằng 0.', isCorrect: false },
        { id: 'e3_4_c', text: 'Động năng và thế năng bằng nhau và đều đạt giá trị cực đại.', isCorrect: false },
        { id: 'e3_4_d', text: 'Cơ năng của con lắc bị triệt tiêu hoàn toàn về mức bằng 0.', isCorrect: false }
      ],
      explanation: 'Tại biên A và B, con lắc dừng lại để đổi chiều chuyển động (v = 0 nên Wđ = 0), độ cao cực đại nên thế năng cực đại.'
    },
    {
      id: 'e3_mc5',
      points: 0.5,
      question: 'Một quả bóng bàn được thả rơi xuống sàn gạch, sau khi nảy lên thì không đạt được độ cao ban đầu. Hiện tượng này chứng tỏ:',
      options: [
        { id: 'e3_5_a', text: 'Một phần cơ năng đã chuyển hoá thành nhiệt năng và năng lượng âm thanh.', isCorrect: true },
        { id: 'e3_5_b', text: 'Định luật bảo toàn năng lượng không còn đúng trong các va chạm thực tế.', isCorrect: false },
        { id: 'e3_5_c', text: 'Khối lượng của quả bóng bàn đã bị giảm đi sau khi va chạm với sàn gạch.', isCorrect: false },
        { id: 'e3_5_d', text: 'Trọng lượng của Trái Đất đột ngột tăng lên tại vị trí bóng va chạm.', isCorrect: false }
      ],
      explanation: 'Khi va chạm và chuyển động trong không khí, ma sát và biến dạng khiến một phần cơ năng chuyển hoá thành nhiệt và âm thanh.'
    },
    {
      id: 'e3_mc6',
      points: 0.5,
      question: 'Một vật khối lượng m = 1 kg có thế năng Wt = 20 J và động năng Wđ = 30 J. Cơ năng của vật là:',
      options: [
        { id: 'e3_6_a', text: '50 J', isCorrect: true },
        { id: 'e3_6_b', text: '10 J', isCorrect: false },
        { id: 'e3_6_c', text: '600 J', isCorrect: false },
        { id: 'e3_6_d', text: '25 J', isCorrect: false }
      ],
      explanation: 'Cơ năng Wc = Wđ + Wt = 30 J + 20 J = 50 J.'
    },
    {
      id: 'e3_mc7',
      points: 0.5,
      question: 'Khi nước chảy từ đỉnh đập thuỷ điện xuống tua-bin máy phát điện ở phía dưới thấp (Hình 2.3 & Bài 3 SGK):',
      options: [
        { id: 'e3_7_a', text: 'Thế năng của dòng nước chuyển hoá thành động năng làm quay tua-bin.', isCorrect: true },
        { id: 'e3_7_b', text: 'Nhiệt năng của nước biến đổi hoàn toàn thành thế năng tĩnh điện.', isCorrect: false },
        { id: 'e3_7_c', text: 'Động năng của dòng nước chuyển hoá thành thế năng trọng trường.', isCorrect: false },
        { id: 'e3_7_d', text: 'Cơ năng của dòng nước không thay đổi và không sinh ra công hữu ích.', isCorrect: false }
      ],
      explanation: 'Nước ở trên cao có thế năng lớn, khi chảy xuống thế năng chuyển hoá thành động năng dòng chảy làm quay tua-bin máy phát điện.'
    },
    {
      id: 'e3_mc8',
      points: 0.5,
      question: 'Trường hợp nào sau đây cơ năng của vật KHÔNG ĐƯỢC bảo toàn?',
      options: [
        { id: 'e3_8_a', text: 'Một chiếc lá vàng rơi chao liệng trong không khí có gió.', isCorrect: true },
        { id: 'e3_8_b', text: 'Một viên bi sắt rơi tự do trong ống thuỷ tinh đã hút chân không.', isCorrect: false },
        { id: 'e3_8_c', text: 'Một con lắc đơn dao động trong môi trường chân không tuyệt đối.', isCorrect: false },
        { id: 'e3_8_d', text: 'Một vệ tinh nhân tạo chuyển động trên quỹ đạo không có lực cản.', isCorrect: false }
      ],
      explanation: 'Chiếc lá rơi trong không khí chịu lực cản không khí rất lớn, cơ năng chuyển hoá thành nhiệt năng nên không được bảo toàn.'
    }
  ],
  examEssayQuestions: [
    {
      id: 'e3_es1',
      points: 1.5,
      title: 'Câu 1: Khái niệm cơ năng và điều kiện bảo toàn cơ năng',
      prompt: 'Trình bày định nghĩa cơ năng của một vật, viết biểu thức tính cơ năng và nêu rõ đơn vị của từng đại lượng. Nêu điều kiện để cơ năng của một vật chuyển động trong trọng trường được bảo toàn.',
      sampleSolution: '1. Khái niệm: Cơ năng của một vật là tổng động năng và thế năng của vật đó.\n2. Biểu thức: Wc = Wđ + Wt = 1/2 · m · v² + P · h = 1/2 · m · v² + 10 · m · h.\nTrong đó:\n- m: Khối lượng của vật (đơn vị: kilôgam, kg).\n- v: Tốc độ của vật (đơn vị: mét trên giây, m/s).\n- P: Trọng lượng của vật (đơn vị: niutơn, N).\n- h: Độ cao của vật so với mốc thế năng (đơn vị: mét, m).\n- Wc: Cơ năng của vật (đơn vị: jun, J).\n3. Điều kiện bảo toàn: Cơ năng của vật được bảo toàn khi vật chỉ chịu tác dụng của trọng lực, không chịu tác dụng của các lực cản trở như ma sát, sức cản không khí (hoặc các lực này nhỏ không đáng kể).'
    },
    {
      id: 'e3_es2',
      points: 1.5,
      title: 'Câu 2: Bài toán thả rơi tự do và bảo toàn cơ năng (SGK trang 19)',
      prompt: 'Một vật có khối lượng m = 1,5 kg được thả rơi tự do từ độ cao h = 4 m so với mặt đất (lấy g = 10 m/s²). Chọn mốc thế năng ở mặt đất, bỏ qua sức cản của không khí. Hãy:\na) Tính cơ năng của vật tại vị trí thả rơi ban đầu.\nb) Tính tốc độ của vật ngay khi vừa chạm mặt đất.',
      sampleSolution: 'a) Tính cơ năng ban đầu:\n- Tại vị trí thả rơi (độ cao h = 4 m), vật được thả nhẹ nên vận tốc ban đầu v0 = 0 ➔ Động năng Wđ = 0.\n- Thế năng ban đầu của vật: Wt = P · h = 10 · m · h = 10 · 1,5 · 4 = 60 J.\n- Cơ năng ban đầu của vật là: Wc = Wđ + Wt = 0 + 60 = 60 J.\n\nb) Tính tốc độ của vật khi vừa chạm đất:\n- Chọn mốc thế năng tại mặt đất nên khi chạm đất h = 0 ➔ Wt = 0.\n- Vì bỏ qua sức cản của không khí nên cơ năng của vật được bảo toàn: Wc(chạm đất) = Wc(ban đầu) = 60 J.\n- Khi đó toàn bộ cơ năng là động năng: Wđ = 1/2 · m · v² = 60 J.\n➔ 1/2 · 1,5 · v² = 60 ➔ 0,75 · v² = 60 ➔ v² = 60 / 0,75 = 80.\n➔ Tốc độ của vật khi vừa chạm đất là: v = √80 ≈ 8,94 m/s.'
    },
    {
      id: 'e3_es3',
      points: 1.5,
      title: 'Câu 3: Phân tích thí nghiệm con lắc đơn (Hình 3.2 SGK trang 19)',
      prompt: 'Dựa vào Hình 3.2 SGK trang 19 (con lắc đơn kéo lệch đến A rồi thả nhẹ, chuyển động qua O đến B):\na) Hãy mô tả sự chuyển hoá giữa động năng và thế năng của vật nặng khi đi từ A đến O và từ O đến B.\nb) Tại sao trong thực tế sau một thời gian chuyển động, độ cao của vật nặng giảm dần rồi dừng hẳn?',
      sampleSolution: 'a) Sự chuyển hoá năng lượng:\n- Từ vị trí A đến O: Vật nặng đi xuống, độ cao h giảm dần nên thế năng giảm dần; đồng thời tốc độ tăng dần nên động năng tăng dần. Thế năng chuyển hoá thành động năng. Tại O (vị trí thấp nhất), thế năng nhỏ nhất và động năng đạt giá trị cực đại.\n- Từ vị trí O đến B: Vật nặng đi lên, độ cao h tăng dần nên thế năng tăng dần; tốc độ giảm dần nên động năng giảm dần. Động năng chuyển hoá thành thế năng. Tại B (vị trí cao nhất phía bên kia), vận tốc bằng 0 nên động năng bằng 0, thế năng đạt giá trị cực đại.\n\nb) Nguyên nhân độ cao giảm dần:\n- Trong thực tế, con lắc chuyển động trong không khí nên chịu tác dụng của lực cản không khí và ma sát ở điểm treo.\n- Lực cản này sinh công cản làm một phần cơ năng của con lắc chuyển hoá thành nhiệt năng toả ra môi trường xung quanh.\n- Do cơ năng giảm dần theo thời gian nên độ cao của con lắc ở các lần dao động tiếp theo giảm dần và cuối cùng dừng lại ở vị trí cân bằng O.'
    },
    {
      id: 'e3_es4',
      points: 1.5,
      title: 'Câu 4: Vận dụng cơ năng giải thích kĩ thuật nhảy xa (SGK trang 20)',
      prompt: 'Vận dụng kiến thức về cơ năng và sự chuyển hoá năng lượng, em hãy giải thích vì sao để nhảy xa đạt thành tích cao nhất, vận động viên cần phải chạy lấy đà đủ nhanh và bật nhảy thật cao tại vị trí giậm nhảy?',
      sampleSolution: '1. Chạy lấy đà đủ nhanh: Khi vận động viên chạy đà với tốc độ lớn v, cơ thể tích luỹ một động năng ban đầu rất lớn (vì động năng Wđ = 1/2 · m · v² tỉ lệ với bình phương tốc độ). Động năng này cung cấp vận tốc theo phương ngang lớn, giúp người bay được xa trong không gian.\n2. Giậm nhảy bật cao tại ván giậm: Tại điểm giậm nhảy, vận động viên dùng lực chân bật mạnh lên cao để chuyển hoá một phần động năng chạy đà thành vận tốc theo phương thẳng đứng. Độ cao bật nhảy tạo ra thế năng trọng trường và kéo dài thời gian lơ lửng của cơ thể trên không trung (thời gian rơi tự do tăng lên).\n3. Kết luận: Sự kết hợp hoàn hảo giữa động năng lớn theo phương ngang và thời gian bay dài trên không nhờ độ cao bật nhảy (tạo góc giậm nhảy tối ưu khoảng 40° - 45°) giúp vận động viên đạt được tầm bay xa lớn nhất!'
    }
  ]
};

// Hàm lấy dữ liệu bài học theo ID (hỗ trợ Bài 1, Bài 2 và Bài 3 bám sát SGK)
export function getSgkLessonData(lessonId: number): SgkLessonPackage {
  if (lessonId === 3) {
    return LESSON_3_DATA;
  }
  if (lessonId === 2) {
    return LESSON_2_DATA;
  }
  return LESSON_1_DATA;
}

