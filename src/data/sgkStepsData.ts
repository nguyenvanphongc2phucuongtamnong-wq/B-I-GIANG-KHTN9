import { SgkStep, DifficultyLevel } from '../types';

export interface SgkQuizQuestion {
  id: string;
  level: DifficultyLevel;
  levelLabel: string;
  points: number; // Điểm số từng câu (ví dụ 0.5đ, 1.0đ, 2.0đ)
  question: string;
  subText?: string;
  options: Array<{
    choiceId: string; // choiceId cố định (vd: 'c1', 'c2', 'c3', 'c4')
    text: string;
    isCorrect: boolean;
  }>;
  explanation: string;
  sgkReference?: string;
}

// =====================================================================
// BÀI 1: NHẬN BIẾT MỘT SỐ DỤNG CỤ, HOÁ CHẤT. THUYẾT TRÌNH MỘT VẤN ĐỀ KHOA HỌC
// SGK KHTN 9 (Bộ Kết nối tri thức - Trang 6 đến 14)
// =====================================================================
export const SGK_STEPS_LESSON_1: SgkStep[] = [
  {
    id: 'b1_s0',
    stepNumber: 1,
    title: 'Khởi động: Thử thách Phòng Thí Nghiệm KHTN 9',
    sgkSection: 'Mở đầu',
    badge: 'Tình huống mở đầu',
    theory: {
      summary: 'Để kiểm chứng các dự đoán trong khoa học tự nhiên, thí nghiệm là phương pháp quyết định.',
      points: [
        'Môn KHTN 9 mở rộng nhiều thí nghiệm hiện đại về quang học, điện từ học, biến đổi chất và di truyền tế bào.',
        'Việc lựa chọn đúng dụng cụ, hiểu rõ nguyên lý hoạt động và quy tắc an toàn giúp thí nghiệm thành công và không gây nguy hiểm.',
      ],
      definitionOrFormula: 'Nguyên tắc an toàn phòng thí nghiệm: Hiểu rõ tính năng ➔ Tuân thủ quy trình ➔ Bảo hộ cá nhân ➔ Vệ sinh & thu dọn.',
      keyRules: [
        'Tuyệt đối không tự ý phối trộn hoá chất hoặc nhìn thẳng vào nguồn laser.',
        'Mọi dụng cụ đo điện phải kiểm tra đúng thang đo và cực trước khi đóng mạch.',
      ],
    },
    example: {
      title: 'Tình huống thực tế: Điểm 0 của Điện kế',
      scenario: 'Tại sao chiếc điện kế trong thí nghiệm cảm ứng điện từ lớp 9 lại có vạch số 0 ở CHÍNH GIỮA thang đo thay vì ở góc trái như vôn kế, ampe kế thông thường ở lớp 7, 8?',
      explanation: 'Dòng điện cảm ứng có thể đổi chiều liên tục tuỳ thuộc vào chiều dịch chuyển của nam châm. Vạch 0 ở giữa cho phép kim lệch sang PHẢI hoặc sang TRÁI, giúp phát hiện ngay cả độ lớn và chiều của dòng điện.',
    },
    simulationType: 'galvanometer',
    activity: {
      type: 'quiz',
      prompt: 'Kiểm tra nhanh trước khi vào bài:',
      question: 'Khi sử dụng điện kế đo dòng điện cảm ứng, kim điện kế lệch sang phải chứng tỏ điều gì?',
      options: [
        { id: 'opt_1', text: 'Có dòng điện đi vào chốt dương (+) và đi ra từ chốt âm (-)', isCorrect: true, feedback: 'Chính xác! Theo quy ước thang đo điện kế, chiều lệch của kim thể hiện trực tiếp chiều dòng điện qua cuộn dây.' },
        { id: 'opt_2', text: 'Dòng điện quá tải làm hỏng điện kế', isCorrect: false, feedback: 'Chưa đúng. Vạch 0 ở giữa được thiết kế để kim lệch hai phía bình thường.' },
        { id: 'opt_3', text: 'Mạch điện bị hở, không có dòng điện', isCorrect: false, feedback: 'Sai. Khi mạch hở hoặc không có dòng điện thì kim chỉ đúng vạch số 0.' },
      ],
    },
    takeaway: 'Vạch số 0 ở giữa của điện kế là đặc điểm nhận diện cốt lõi giúp xác định tức thì cả chiều và độ lớn của dòng điện cảm ứng.',
  },
  {
    id: 'b1_s1',
    stepNumber: 2,
    title: 'Mục I.1: Nhận biết dụng cụ thí nghiệm quang học',
    sgkSection: 'Mục I.1 SGK trang 6',
    badge: 'Quang học',
    theory: {
      summary: 'Các dụng cụ khảo sát đường truyền ánh sáng, hiện tượng khúc xạ và phản xạ toàn phần.',
      points: [
        'Nguồn sáng (12V - 21W): Có vỏ kim loại che chắn, khe hẹp tạo chùm sáng song song mảnh biểu diễn tia sáng.',
        'Nguồn laser: Nguồn phát chùm tia laser hẹp, công tắc điều khiển độc lập từng tia. LƯU Ý: Tuyệt đối KHÔNG chiếu laser vào mắt!',
        'Bản bán trụ thuỷ tinh: Khối thuỷ tinh trong suốt hình nửa trụ đặt trên bảng chia độ tròn để đo góc tới (i) và góc khúc xạ (r).',
        'Bộ tìm hiểu ảnh qua thấu kính: Gồm thấu kính hội tụ, thấu kính phân kì, màn chắn, vật sáng chữ F, giá quang học đồng trục.',
      ],
      definitionOrFormula: 'Mặt cong bán trụ: Tia sáng truyền thẳng qua tâm O của mặt cong mà không bị khúc xạ do góc tới i = 0° tại mặt tiếp tuyến.',
    },
    example: {
      title: 'Ứng dụng: Xác định góc khúc xạ của tia sáng',
      scenario: 'Chiếu tia laser từ không khí vào tâm mặt phẳng của bản bán trụ thuỷ tinh trên bảng chia độ với góc tới i = 45°. Đọc góc khúc xạ r trên bảng chia độ thu được r ≈ 28°.',
      explanation: 'Bảng chia độ tròn chia sẵn từ 0° đến 90° ở 4 góc phần tư giúp đo trực tiếp góc tới và góc khúc xạ một cách trực quan, chính xác.',
    },
    simulationType: 'optics',
    activity: {
      type: 'quiz',
      prompt: 'Quy tắc an toàn quang học:',
      question: 'Quy tắc an toàn quan trọng nhất khi sử dụng nguồn phát laser trong phòng thí nghiệm là gì?',
      options: [
        { id: 'opt_1', text: 'Tuyệt đối không chiếu tia laser trực tiếp hoặc phản xạ vào mắt người khác', isCorrect: true, feedback: 'Rất chính xác! Năng lượng tia laser tập trung cao có thể đốt cháy võng mạc gây mù loà tức thì.' },
        { id: 'opt_2', text: 'Phải ngâm đèn laser vào nước đá khi phát sáng', isCorrect: false, feedback: 'Không đúng, điều này làm chập mạch điện tử.' },
        { id: 'opt_3', text: 'Chỉ được dùng tia laser trong bóng tối hoàn toàn', isCorrect: false, feedback: 'Không bắt buộc, phòng lab chỉ cần giảm bớt ánh sáng chói là quan sát rõ tia.' },
      ],
    },
    takeaway: 'Bản bán trụ thuỷ tinh trên bảng chia độ tròn kết hợp nguồn sáng khe hẹp/laser là bộ dụng cụ chuẩn xác để nghiên cứu định luật khúc xạ ánh sáng.',
  },
  {
    id: 'b1_s2',
    stepNumber: 3,
    title: 'Mục I.2: Dụng cụ thí nghiệm điện từ',
    sgkSection: 'Mục I.2 SGK trang 7',
    badge: 'Điện từ',
    theory: {
      summary: 'Dụng cụ phát hiện và đo lường các hiện tượng cảm ứng điện từ và dòng điện xoay chiều.',
      points: [
        'Điện kế (Galvanometer): Dụng cụ siêu nhạy có vạch số 0 ở giữa. Dòng điện vào (+) ra (-) kim lệch phải; dòng điện vào (-) ra (+) kim lệch trái.',
        'Cuộn dây có 2 đèn LED: Gồm 2 đèn LED đỏ và vàng mắc song song ngược cực. Dòng điện đi theo chiều này thì LED đỏ sáng; khi dòng đổi chiều thì LED vàng sáng.',
        'Đồng hồ đo điện đa năng: Đo hiệu điện thế (U), cường độ dòng điện (I), điện trở (R) cho cả dòng điện 1 chiều (DC) và xoay chiều (AC).',
      ],
      definitionOrFormula: 'Hiện tượng cảm ứng điện từ: Khi số đường sức từ xuyên qua tiết diện cuộn dây biến thiên thì trong cuộn dây xuất hiện dòng điện cảm ứng.',
    },
    example: {
      title: 'Thí nghiệm thực hành: Nam châm chuyển động qua cuộn dây',
      scenario: 'Đưa cực Bắc nam châm lại gần cuộn dây: đèn LED màu đỏ loé sáng và kim điện kế lệch phải. Khi rút nam châm ra xa: đèn LED màu vàng loé sáng và kim điện kế lệch trái.',
      explanation: 'Khi đưa vào và rút ra, số đường sức từ lần lượt tăng rồi giảm, dòng điện cảm ứng đổi chiều làm hai LED luân phiên sáng.',
    },
    simulationType: 'galvanometer',
    activity: {
      type: 'quiz',
      prompt: 'Nhận biết dụng cụ điện từ:',
      question: 'Cuộn dây có 2 đèn LED đỏ - vàng mắc song song ngược cực dùng để làm gì?',
      options: [
        { id: 'opt_1', text: 'Để chiếu sáng bàn thí nghiệm', isCorrect: false, feedback: 'Chưa đúng, đèn LED thí nghiệm này dùng làm tín hiệu chỉ thị.' },
        { id: 'opt_2', text: 'Phát hiện sự xuất hiện và chiều của dòng điện cảm ứng trong cuộn dây', isCorrect: true, feedback: 'Chính xác! LED chỉ dẫn điện theo một chiều, nên hai LED ngược cực sẽ sáng luân phiên theo chiều dòng điện.' },
        { id: 'opt_3', text: 'Làm tăng điện trở của cuộn dây', isCorrect: false, feedback: 'Sai, LED là linh kiện bán dẫn dùng để phát hiện chiều dòng điện.' },
      ],
    },
    takeaway: 'Điện kế có vạch 0 ở giữa và cuộn dây 2 LED ngược cực là 2 thiết bị đặc trưng lớp 9 dùng để nhận biết dòng điện cảm ứng.',
  },
  {
    id: 'b1_s3',
    stepNumber: 4,
    title: 'Mục I.3: Dụng cụ tìm hiểu về chất và sự biến đổi chất',
    sgkSection: 'Mục I.3 SGK trang 8',
    badge: 'Hoá học',
    theory: {
      summary: 'Các dụng cụ thuỷ tinh, đồ sứ chuyên dụng dùng trong thí nghiệm hoá học và tách chất.',
      points: [
        'Bát sứ: Chịu nhiệt độ rất cao, dùng để trộn, đun nóng chảy chất rắn, cô cạn dung dịch hoặc nung.',
        'Phễu chiết: Có khoá vặn ở đáy cuống phễu, dùng để tách hai chất lỏng không trộn lẫn vào nhau (như dầu ăn và nước).',
        'Bình cầu: Đáy tròn hoặc đáy bằng, chịu nhiệt và áp lực tốt, dùng để đun sôi, chưng cất hoặc làm bình phản ứng.',
        'Lưới tản nhiệt: Tấm lưới kim loại có lớp amiăng/ceramic ở giữa, đặt dưới đáy cốc thuỷ tinh khi đun bằng đèn cồn để nhiệt truyền đều, chống nứt vỡ cốc.',
      ],
      definitionOrFormula: 'Nguyên lý chiết: Dựa vào sự khác nhau về khối lượng riêng và tính không hoà tan giữa hai chất lỏng để tách rời từng phần.',
    },
    example: {
      title: 'Quy trình: Tách dầu ăn ra khỏi nước bằng phễu chiết',
      scenario: 'Rót hỗn hợp dầu ăn và nước vào phễu chiết đậy nút, để yên trên giá sắt 5 phút. Dầu ăn nhẹ hơn nổi lên trên, nước nặng hơn lắng xuống dưới. Mở khoá phễu cho nước chảy từ từ xuống cốc hứng phía dưới, khoá van đúng thời điểm mặt phân cách vừa chạm miệng khoá.',
      explanation: 'Phương pháp chiết tách sạch 100% hai chất lỏng phân lớp mà không làm lẫn hoá chất.',
    },
    simulationType: 'chemistry',
    activity: {
      type: 'quiz',
      prompt: 'Lựa chọn dụng cụ phù hợp:',
      question: 'Dụng cụ nào sau đây BẮT BUỘC phải lót dưới đáy cốc thuỷ tinh khi đun sôi dung dịch bằng ngọn lửa đèn cồn?',
      options: [
        { id: 'opt_1', text: 'Lưới tản nhiệt', isCorrect: true, feedback: 'Chính xác! Lưới tản nhiệt phân tán đều nhiệt lượng, tránh hiện tượng sốc nhiệt cục bộ gây nứt vỡ bình thuỷ tinh.' },
        { id: 'opt_2', text: 'Bát sứ', isCorrect: false, feedback: 'Bát sứ là dụng cụ chứa chất đun, không dùng để lót đáy cốc.' },
        { id: 'opt_3', text: 'Phễu chiết', isCorrect: false, feedback: 'Phễu chiết dùng để tách chất lỏng, không chịu nhiệt trực tiếp.' },
      ],
    },
    takeaway: 'Luôn dùng lưới tản nhiệt khi đun bình thuỷ tinh; dùng phễu chiết có khoá để tách các chất lỏng phân lớp không trộn lẫn.',
  },
  {
    id: 'b1_s4',
    stepNumber: 5,
    title: 'Mục I.4: Dụng cụ dùng trong quan sát nhiễm sắc thể (NST)',
    sgkSection: 'Mục I.4 SGK trang 8',
    badge: 'Sinh học',
    theory: {
      summary: 'Thiết bị quang học phóng đại cao dùng trong nghiên cứu tế bào học và di truyền.',
      points: [
        'Kính hiển vi quang học: Có độ phóng đại từ 40x đến 1000x (thị kính 10x kết hợp các vật kính 4x, 10x, 40x, 100x).',
        'Tiêu bản cố định NST: Các tế bào đỉnh rễ hành hoặc tinh hoàn châu chấu được nhuộm màu kiềm tính để làm nổi bật hình thái NST.',
        'Dầu soi kính hiển vi: Chất lỏng trong suốt có chiết suất cao (n ≈ 1,515 tương đương thuỷ tinh của lamen).',
        'Vai trò dầu soi: Nhỏ giữa lamen và vật kính 100x để triệt tiêu khúc xạ ra không khí, giúp chùm sáng đi thẳng vào vật kính, cho hình ảnh NST cực kì sắc nét.',
      ],
      definitionOrFormula: 'Công thức độ phóng đại kính hiển vi: G = G(thị kính) × G(vật kính). Ví dụ: 10x × 100x = 1000 lần.',
    },
    example: {
      title: 'Quy trình sử dụng vật kính ngâm dầu 100x',
      scenario: '1. Đặt tiêu bản lên bàn kính, tìm vùng có tế bào đang phân chia ở vật kính 10x, 40x. 2. Nhỏ 1 giọt dầu soi lên lamen. 3. Xoay đĩa chuyển sang vật kính 100x sao cho đầu vật kính tiếp xúc với giọt dầu. 4. Dùng ốc vi cấp tinh chỉnh để quan sát rõ từng sợi NST.',
      explanation: 'Sau khi soi xong, bắt buộc phải dùng giấy lau kính mềm thấm cồn 70° để lau sạch đầu vật kính 100x.',
    },
    simulationType: 'immersion_oil',
    activity: {
      type: 'quiz',
      prompt: 'Kỹ năng phòng thí nghiệm sinh học:',
      question: 'Tại sao khi quan sát tiêu bản ở vật kính phóng đại 100x bắt buộc phải dùng dầu soi kính hiển vi?',
      options: [
        { id: 'opt_1', text: 'Vì dầu soi có chiết suất cao tương đương thuỷ tinh, ngăn ngừa tia sáng bị khúc xạ ra ngoài không khí giúp ảnh sáng rõ', isCorrect: true, feedback: 'Chính xác tuyệt đối! Dầu soi tạo môi trường đồng nhất về quang sai, tăng độ phân giải của thấu kính.' },
        { id: 'opt_2', text: 'Để làm trơn tiêu bản giúp di chuyển dễ dàng hơn', isCorrect: false, feedback: 'Sai, tiêu bản được kẹp chặt cố định trên bàn soi.' },
        { id: 'opt_3', text: 'Để nhuộm màu thêm cho nhiễm sắc thể', isCorrect: false, feedback: 'Sai, tiêu bản NST đã được nhuộm màu cố định từ trước.' },
      ],
    },
    takeaway: 'Dầu soi kính hiển vi là phụ kiện bắt buộc khi dùng vật kính ngâm dầu 100x để quan sát rõ hình thái nhiễm sắc thể.',
  },
  {
    id: 'b1_s5',
    stepNumber: 6,
    title: 'Mục II: Một số hoá chất cơ bản & Quy tắc bảo quản an toàn',
    sgkSection: 'Mục II SGK trang 9',
    badge: 'An toàn Lab',
    theory: {
      summary: 'Phân loại các hoá chất phổ biến trong phòng lab KHTN 9 và các nguyên tắc bảo quản đặc biệt.',
      points: [
        'Kim loại hoạt động mạnh (Na, K): Phản ứng dữ dội với nước và oxy không khí ➔ Bắt buộc bảo quản chìm hoàn toàn trong dầu hoả sạch.',
        'Hoá chất nhạy sáng (KMnO4, AgNO3, H2O2, nước clo): Dễ bị quang phân huỷ biến chất dưới ánh sáng ➔ Đựng trong lọ thuỷ tinh tối màu (nâu đậm) hoặc bọc giấy đen bên ngoài, cất nơi râm mát.',
        'Acid đặc (H2SO4, HNO3, HCl): Tính ăn mòn và háo nước cực mạnh ➔ Đựng trong lọ có nút mài thuỷ tinh kín.',
        'QUY TẮC VÀNG VỚI ACID: TUYỆT ĐỐI KHÔNG rót nước vào acid đặc. Luôn rót acid từ từ men theo đũa thuỷ tinh vào cốc nước đã lấy sẵn và khuấy đều.',
      ],
      definitionOrFormula: 'Quy tắc pha loãng acid: Rót ACID VÀO NƯỚC (Nước có nhiệt dung lớn sẽ hấp thụ nhiệt toả ra, không làm acid sôi bắn lên).',
    },
    example: {
      title: 'Tình huống bảo quản dung dịch bạc nitrat (AgNO3)',
      scenario: 'Nếu đựng dung dịch AgNO3 trong lọ nhựa trắng trong suốt để gần cửa sổ, chỉ sau vài ngày dung dịch sẽ xuất hiện kết tủa màu đen xám bám quanh thành bình do phản ứng quang hoá: 2AgNO3 ➔ 2Ag↓ + 2NO2↑ + O2↑. Khi đựng trong lọ màu nâu đậm, hoá chất giữ nguyên độ tinh khiết hàng năm trời.',
      explanation: 'Thuỷ tinh màu nâu sẫm ngăn chặn các tia tử ngoại và bước sóng ánh sáng khả kiến có năng lượng cao kích hoạt phản ứng phân huỷ.',
    },
    simulationType: 'amber_bottle',
    activity: {
      type: 'quiz',
      prompt: 'Quy tắc an toàn hoá chất:',
      question: 'Cách làm nào sau đây là ĐÚNG khi pha loãng dung dịch acid sulfuric (H2SO4) đặc?',
      options: [
        { id: 'opt_1', text: 'Rót từ từ acid đặc theo đũa thuỷ tinh vào cốc chứa sẵn nước rồi khuấy nhẹ', isCorrect: true, feedback: 'Rất chính xác! Nước có lượng lớn sẽ hấp thu nhiệt lượng toả ra, đảm bảo an toàn tuyệt đối.' },
        { id: 'opt_2', text: 'Rót nhanh nước lạnh vào cốc chứa acid đặc để làm nguội tức thì', isCorrect: false, feedback: 'CỰC KỲ NGUY HIỂM! Nước sôi cục bộ sẽ bắn acid đặc vào mặt và người gây bỏng nặng!' },
        { id: 'opt_3', text: 'Đổ đồng thời cả nước và acid đặc vào một cốc', isCorrect: false, feedback: 'Nguy hiểm, toả nhiệt mạnh dễ vỡ cốc.' },
      ],
    },
    takeaway: 'Hoá chất nhạy cảm với ánh sáng (AgNO3, KMnO4) phải đựng trong lọ tối màu; kim loại kiềm bảo quản trong dầu hoả; luôn rót acid vào nước.',
  },
  {
    id: 'b1_s6',
    stepNumber: 7,
    title: 'Mục III: Viết báo cáo một vấn đề khoa học',
    sgkSection: 'Mục III SGK trang 9 - 11',
    badge: 'Phương pháp khoa học',
    theory: {
      summary: 'Cấu trúc chuẩn quốc tế 8 phần của một báo cáo nghiên cứu khoa học theo SGK KHTN 9.',
      points: [
        '1. Tiêu đề: Tên đề tài nghiên cứu ngắn gọn, chính xác, nêu rõ đối tượng nghiên cứu.',
        '2. Tóm tắt: Đoạn văn súc tích (100 - 150 từ) gồm mục tiêu, phương pháp, kết quả then chốt và kết luận.',
        '3. Giới thiệu: Nêu bối cảnh, tính cấp thiết và câu hỏi/mục tiêu nghiên cứu.',
        '4. Phương pháp: Mô tả chi tiết đối tượng, dụng cụ, hoá chất, các bước tiến hành thực nghiệm và cách xử lý số liệu.',
        '5. Kết quả: Trình bày số liệu thu thập khách quan dưới dạng bảng số liệu, biểu đồ, hình ảnh trực quan.',
        '6. Thảo luận: Phân tích ý nghĩa kết quả, giải thích cơ chế, so sánh với các nghiên cứu trước đó và nêu hạn chế.',
        '7. Kết luận: Tóm tắt những phát hiện chính và đề xuất giải pháp hoặc hướng nghiên cứu tiếp theo.',
        '8. Tài liệu tham khảo: Liệt kê đầy đủ các nguồn sách báo, trang web chính thống đã trích dẫn.',
      ],
      definitionOrFormula: 'Chuẩn IMRAD mở rộng: Tiêu đề ➔ Tóm tắt ➔ Giới thiệu (I) ➔ Phương pháp (M) ➔ Kết quả (R) ➔ Thảo luận & Kết luận (AD) ➔ Tài liệu tham khảo.',
    },
    example: {
      title: 'Báo cáo mẫu SGK trang 10',
      scenario: 'Đề tài: "Khảo sát thực tế về một số bệnh đường tiêu hoá và vấn đề vệ sinh an toàn thực phẩm tại địa phương". Kết quả được biểu diễn bằng biểu đồ cột so sánh tỉ lệ mắc bệnh viêm dạ dày giữa nhóm học sinh ăn quà vặt vỉa hè và nhóm ăn cơm tại gia đình.',
      explanation: 'Bảng biểu và đồ thị giúp người đọc nắm bắt quy luật số liệu tức thì mà không cần đọc văn bản dài dòng.',
    },
    activity: {
      type: 'quiz',
      prompt: 'Cấu trúc báo cáo khoa học:',
      question: 'Trong 8 phần của báo cáo khoa học, phần nào có nhiệm vụ trình bày dữ liệu thu thập được bằng bảng số liệu, biểu đồ hoặc hình ảnh?',
      options: [
        { id: 'opt_1', text: 'Phần 5: Kết quả', isCorrect: true, feedback: 'Chính xác! Phần Kết quả chỉ trình bày khách quan dữ liệu thu được, việc lý giải nguyên nhân sẽ nằm ở phần Thảo luận.' },
        { id: 'opt_2', text: 'Phần 3: Giới thiệu', isCorrect: false, feedback: 'Phần Giới thiệu chỉ nêu lý do chọn đề tài và mục tiêu nghiên cứu.' },
        { id: 'opt_3', text: 'Phần 4: Phương pháp', isCorrect: false, feedback: 'Phần Phương pháp mô tả quy trình thực nghiệm và dụng cụ.' },
      ],
    },
    takeaway: 'Báo cáo khoa học gồm 8 phần chặt chẽ. Phần Kết quả phải ưu tiên biểu diễn bằng biểu đồ, bảng biểu trực quan và trung thực với số liệu thực nghiệm.',
  },
  {
    id: 'b1_s7',
    stepNumber: 8,
    title: 'Mục IV: Thuyết trình một vấn đề khoa học',
    sgkSection: 'Mục IV SGK trang 11 - 14',
    badge: 'Kỹ năng thuyết trình',
    theory: {
      summary: 'Kỹ năng trình bày bài báo cáo trước hội đồng qua Slide trình chiếu và Báo cáo treo tường (Poster).',
      points: [
        'Bài thuyết trình trên phần mềm (PowerPoint): Cấu trúc 8 slide chuẩn bám sát báo cáo: Trang 1 (Tiêu đề, tác giả) ➔ Trang 2 (Giới thiệu) ➔ Trang 3 (Mục tiêu) ➔ Trang 4 (Phương pháp) ➔ Trang 5 (Kết quả & đồ thị) ➔ Trang 6 (Thảo luận) ➔ Trang 7 (Kết luận) ➔ Trang 8 (Tài liệu tham khảo & Lời cảm ơn).',
        'Báo cáo treo tường (Poster): Kích thước tiêu chuẩn quốc tế là A0 hoặc A1, định dạng dọc hoặc ngang. Tiêu đề chữ to đọc được từ khoảng cách 2 - 3m.',
        'Nguyên tắc thiết kế Poster: Tối giản chữ viết, ưu tiên sơ đồ khối, hình ảnh thí nghiệm và biểu đồ dữ liệu; màu chữ tương phản rõ với màu nền.',
        'Kỹ năng nói: Tự tin, giọng nói rõ ràng, mắt giao tiếp với người nghe (eye-contact), sẵn sàng giải đáp các câu hỏi chất vấn bằng số liệu thực nghiệm.',
      ],
      definitionOrFormula: 'Quy tắc trực quan Slide & Poster: 70% hình ảnh + đồ thị / 30% chữ tóm lược từ khoá (Không dán nguyên đoạn văn bản dài lên slide).',
    },
    example: {
      title: 'Bố cục Poster khổ A0 chuẩn SGK trang 13',
      scenario: 'Chia làm 3 cột dọc hài hoà: Cột 1 (trái): Giới thiệu & Phương pháp nghiên cứu. Cột 2 (giữa): Biểu đồ kết quả số liệu nổi bật nhất & Hình ảnh thực địa. Cột 3 (phải): Thảo luận, Kết luận và Đề xuất khuyến nghị.',
      explanation: 'Người tham quan triển lãm chỉ cần 1 phút nhìn vào giữa poster là nắm được phát hiện chính của đề tài.',
    },
    activity: {
      type: 'quiz',
      prompt: 'Kích thước tiêu chuẩn Poster khoa học:',
      question: 'Kích thước chuẩn quy định cho một báo cáo treo tường (Poster khoa học) theo SGK KHTN 9 là bao nhiêu?',
      options: [
        { id: 'opt_1', text: 'Khổ A0 hoặc A1', isCorrect: true, feedback: 'Chính xác theo SGK trang 13! Khổ A0 (841 x 1189 mm) hoặc A1 (594 x 841 mm) đảm bảo người xem đọc được rõ từ xa.' },
        { id: 'opt_2', text: 'Khổ A4 đóng tập', isCorrect: false, feedback: 'Khổ A4 là kích thước của bản báo cáo giấy in, không dùng làm poster treo tường triển lãm.' },
        { id: 'opt_3', text: 'Khổ A3', isCorrect: false, feedback: 'Khổ A3 quá nhỏ để treo tường cho hội trường xem.' },
      ],
    },
    takeaway: 'Thuyết trình khoa học cần trực quan: Slide chuẩn 8 trang hoặc Poster A0/A1; ưu tiên hình ảnh, biểu đồ và tự tin tương tác với người nghe.',
  },
  {
    id: 'b1_final',
    stepNumber: 9,
    title: 'Luyện tập cuối bài: Đánh giá tổng hợp năng lực',
    sgkSection: 'Luyện tập cuối bài',
    badge: 'Kiểm tra chuẩn hoá',
    isFinalQuiz: true,
    theory: {
      summary: 'Hệ thống câu hỏi trắc nghiệm và bài tập tự luận tổng hợp toàn bộ kiến thức Bài 1.',
      points: [
        'Gồm đầy đủ 3 mức độ nhận thức: 🟢 BIẾT (Nhận biết) • 🟡 HIỂU (Thông hiểu) • 🔴 VẬN DỤNG (Vận dụng thực tế).',
        'Thang điểm 10 chuẩn mực, có phản hồi giải thích chi tiết cho từng phương án.',
        'Kết quả nộp bài sẽ tự động đồng bộ ngay vào Hồ sơ học sinh trên Cloud Firestore để Thầy/Cô quản lý.',
      ],
    },
    example: {
      title: 'Hướng dẫn làm bài thi',
      scenario: 'Đọc kỹ câu hỏi, lựa chọn phương án đúng nhất hoặc điền câu trả lời tự luận. Các đáp án trắc nghiệm được xáo trộn tự động vị trí để rèn luyện tư duy độc lập.',
      explanation: 'Sau khi bấm "NỘP BÀI", hệ thống sẽ chấm điểm tức thì và ghi nhận chứng chỉ hoàn thành Bài 1.',
    },
    activity: {
      type: 'quiz',
      prompt: 'Sẵn sàng làm bài kiểm tra tổng hợp:',
      question: 'Em đã ôn tập kỹ cả 4 mục kiến thức của Bài 1 trong SGK chưa?',
      options: [
        { id: 'opt_ready', text: 'Em đã nắm vững lý thuyết và các thí nghiệm, sẵn sàng làm bài luyện tập!', isCorrect: true, feedback: 'Chúc em đạt điểm 10 trọn vẹn!' },
      ],
    },
    takeaway: 'Hoàn thành bài luyện tập cuối bài để mở khoá Bài học tiếp theo (Bài 2: Động năng. Thế năng).',
  },
];

// =====================================================================
// BỘ CÂU HỎI LUYỆN TẬP CUỐI BÀI 1 (THANG ĐIỂM 10 CHUẨN)
// Đủ 3 mức: Biết (4 câu = 3đ) + Hiểu (4 câu = 4đ) + Vận dụng (2 câu = 3đ)
// =====================================================================
export const SGK_FINAL_QUIZ_LESSON_1: SgkQuizQuestion[] = [
  // --- MỨC 1: BIẾT (4 CÂU • 0.75đ/câu = 3.0 điểm) ---
  {
    id: 'q1_b1_biet_1',
    level: 'nhan_biet',
    levelLabel: '🟢 MỨC 1: BIẾT',
    points: 0.75,
    question: 'Đặc điểm khác biệt quan trọng nhất trên thang đo của Điện kế so với Vôn kế hay Ampe kế thông thường là gì?',
    subText: 'Căn cứ vào SGK KHTN 9 trang 7 - Mục I.2',
    options: [
      { choiceId: 'c1', text: 'Vạch số 0 nằm ở chính giữa thang đo', isCorrect: true },
      { choiceId: 'c2', text: 'Vạch số 0 nằm ở góc ngoài cùng bên trái thang đo', isCorrect: false },
      { choiceId: 'c3', text: 'Không có kim chỉ thị mà dùng màn hình số', isCorrect: false },
      { choiceId: 'c4', text: 'Vạch số 0 nằm ở góc ngoài cùng bên phải', isCorrect: false },
    ],
    explanation: 'SGK trang 7 chỉ rõ: Điện kế có vạch số 0 nằm ở chính giữa thang đo để có thể nhận biết cả hai chiều của dòng điện cảm ứng.',
  },
  {
    id: 'q1_b1_biet_2',
    level: 'nhan_biet',
    levelLabel: '🟢 MỨC 1: BIẾT',
    points: 0.75,
    question: 'Để tách hai chất lỏng không hoà tan vào nhau (như dầu hoả và nước), dụng cụ thí nghiệm nào sau đây là phù hợp nhất?',
    subText: 'Căn cứ vào SGK KHTN 9 trang 8 - Bảng 1',
    options: [
      { choiceId: 'c1', text: 'Phễu chiết có khoá vặn', isCorrect: true },
      { choiceId: 'c2', text: 'Bát sứ nung nóng', isCorrect: false },
      { choiceId: 'c3', text: 'Lưới tản nhiệt kim loại', isCorrect: false },
      { choiceId: 'c4', text: 'Ống đong chia vạch', isCorrect: false },
    ],
    explanation: 'SGK trang 8 nêu: Phễu chiết có khoá ở cuống dùng để tách chất lỏng theo phương pháp chiết đối với các chất lỏng không trộn lẫn.',
  },
  {
    id: 'q1_b1_biet_3',
    level: 'nhan_biet',
    levelLabel: '🟢 MỨC 1: BIẾT',
    points: 0.75,
    question: 'Những hoá chất dễ bị phân huỷ bởi tác dụng của ánh sáng như KMnO4 hay AgNO3 cần được bảo quản như thế nào?',
    subText: 'Căn cứ vào SGK KHTN 9 trang 9 - Mục II',
    options: [
      { choiceId: 'c1', text: 'Đựng trong các lọ thuỷ tinh tối màu hoặc bọc kín bằng giấy màu đen ở phía ngoài lọ', isCorrect: true },
      { choiceId: 'c2', text: 'Đựng trong cốc thuỷ tinh trong suốt đặt ngay cạnh cửa sổ', isCorrect: false },
      { choiceId: 'c3', text: 'Mở nắp lọ cho thoáng khí trong bóng tối', isCorrect: false },
      { choiceId: 'c4', text: 'Ngâm chìm toàn bộ lọ trong chậu nước đá', isCorrect: false },
    ],
    explanation: 'SGK trang 9 quy định: Hoá chất nhạy sáng cần đựng trong lọ tối màu hoặc bọc kín giấy đen phía ngoài lọ và để nơi râm mát.',
  },
  {
    id: 'q1_b1_biet_4',
    level: 'nhan_biet',
    levelLabel: '🟢 MỨC 1: BIẾT',
    points: 0.75,
    question: 'Kích thước tiêu chuẩn quốc tế quy định cho một báo cáo treo tường (Poster khoa học) theo SGK KHTN 9 là bao nhiêu?',
    subText: 'Căn cứ vào SGK KHTN 9 trang 13 - Mục IV',
    options: [
      { choiceId: 'c1', text: 'Khổ A0 hoặc A1', isCorrect: true },
      { choiceId: 'c2', text: 'Khổ A4 hoặc A5', isCorrect: false },
      { choiceId: 'c3', text: 'Khổ A3', isCorrect: false },
      { choiceId: 'c4', text: 'Kích thước tuỳ ý không quy định', isCorrect: false },
    ],
    explanation: 'SGK trang 13 chỉ rõ: Kích thước tiêu chuẩn cho báo cáo treo tường là khổ A0 hoặc A1.',
  },

  // --- MỨC 2: HIỂU (4 CÂU • 1.0đ/câu = 4.0 điểm) ---
  {
    id: 'q1_b1_hieu_1',
    level: 'thong_hieu',
    levelLabel: '🟡 MỨC 2: HIỂU',
    points: 1.0,
    question: 'Tại sao khi quan sát tiêu bản nhiễm sắc thể ở vật kính phóng đại lớn (100x), người ta bắt buộc phải sử dụng một giọt dầu soi kính hiển vi?',
    subText: 'Căn cứ vào SGK KHTN 9 trang 8 - Mục I.4',
    options: [
      { choiceId: 'c1', text: 'Vì dầu soi trong suốt và có chiết suất tương đương thuỷ tinh lamen, ngăn tia sáng bị khúc xạ lệch ra không khí, giúp ảnh sáng và sắc nét', isCorrect: true },
      { choiceId: 'c2', text: 'Vì dầu soi giúp diệt vi khuẩn và nấm mốc bám trên tiêu bản', isCorrect: false },
      { choiceId: 'c3', text: 'Vì dầu soi giúp gắn chặt lamen vào vật kính không cho trượt', isCorrect: false },
      { choiceId: 'c4', text: 'Vì dầu soi làm giảm nhiệt độ do bóng đèn kính hiển vi phát ra', isCorrect: false },
    ],
    explanation: 'Khi ánh sáng từ lamen (n ≈ 1,515) đi ra không khí (n ≈ 1), tia sáng bị khúc xạ lệch ra ngoài. Giọt dầu soi tạo môi trường quang học đồng nhất, đưa toàn bộ chùm sáng vào vật kính nhỏ 100x.',
  },
  {
    id: 'q1_b1_hieu_2',
    level: 'thong_hieu',
    levelLabel: '🟡 MỨC 2: HIỂU',
    points: 1.0,
    question: 'Tại sao khi đun nóng một dung dịch trong cốc thuỷ tinh bằng ngọn lửa đèn cồn, ta bắt buộc phải đặt cốc trên tấm lưới tản nhiệt?',
    subText: 'Căn cứ vào SGK KHTN 9 trang 8',
    options: [
      { choiceId: 'c1', text: 'Vì thuỷ tinh dẫn nhiệt kém, lưới tản nhiệt giúp phân tán nhiệt đều đáy cốc, tránh chênh lệch nhiệt cục bộ gây nứt vỡ cốc', isCorrect: true },
      { choiceId: 'c2', text: 'Vì lưới tản nhiệt giúp ngọn lửa cháy to hơn gấp đôi', isCorrect: false },
      { choiceId: 'c3', text: 'Vì lưới tản nhiệt ngăn không cho khói đèn cồn bay lên bám bẩn', isCorrect: false },
      { choiceId: 'c4', text: 'Vì lưới tản nhiệt là dụng cụ cách nhiệt hoàn toàn để nước không sôi', isCorrect: false },
    ],
    explanation: 'Ngọn lửa đèn cồn tập trung nhiệt ở một điểm. Thuỷ tinh dẫn nhiệt kém nên điểm đó giãn nở mạnh sinh ra ứng suất nhiệt làm nứt vỡ cốc. Lưới tản nhiệt phân bố nhiệt dàn đều ra toàn bộ đáy.',
  },
  {
    id: 'q1_b1_hieu_3',
    level: 'thong_hieu',
    levelLabel: '🟡 MỨC 2: HIỂU',
    points: 1.0,
    question: 'Trong cấu trúc chuẩn 8 phần của Báo cáo khoa học, sự khác nhau căn bản giữa phần "Kết quả" và phần "Thảo luận" là gì?',
    subText: 'Căn cứ vào SGK KHTN 9 trang 9 - Mục III',
    options: [
      { choiceId: 'c1', text: 'Phần Kết quả trình bày khách quan dữ liệu thu thập (bảng, biểu đồ); phần Thảo luận phân tích ý nghĩa, cơ chế và so sánh dữ liệu', isCorrect: true },
      { choiceId: 'c2', text: 'Phần Kết quả chỉ ghi bằng lời; phần Thảo luận chỉ vẽ biểu đồ', isCorrect: false },
      { choiceId: 'c3', text: 'Hai phần này hoàn toàn giống nhau, có thể gộp làm một', isCorrect: false },
      { choiceId: 'c4', text: 'Phần Kết quả dành cho người hướng dẫn viết; phần Thảo luận dành cho học sinh viết', isCorrect: false },
    ],
    explanation: 'SGK trang 9 chỉ rõ: Kết quả (5) trình bày dữ liệu thu thập bằng biểu đồ/bảng số liệu; Thảo luận (6) phân tích ý nghĩa kết quả, giải thích cơ chế và so sánh với nghiên cứu khác.',
  },
  {
    id: 'q1_b1_hieu_4',
    level: 'thong_hieu',
    levelLabel: '🟡 MỨC 2: HIỂU',
    points: 1.0,
    question: 'Khi sử dụng cuộn dây gắn 2 đèn LED đỏ - vàng mắc song song ngược cực, nếu ta đưa nam châm lại gần thì đèn đỏ sáng, còn khi rút nam châm ra xa thì đèn vàng sáng. Hiện tượng này chứng minh điều gì?',
    subText: 'Căn cứ vào SGK KHTN 9 trang 7',
    options: [
      { choiceId: 'c1', text: 'Chiều của dòng điện cảm ứng thay đổi khi chiều chuyển động của nam châm đảo ngược', isCorrect: true },
      { choiceId: 'c2', text: 'Đèn LED đỏ có công suất lớn hơn đèn LED vàng', isCorrect: false },
      { choiceId: 'c3', text: 'Nam châm đã bị mất từ tính khi rút ra xa', isCorrect: false },
      { choiceId: 'c4', text: 'Cuộn dây bị hỏng một cực khi rút nam châm', isCorrect: false },
    ],
    explanation: 'LED là linh kiện bán dẫn chỉ cho dòng điện đi theo một chiều nhất định. Hai LED ngược cực luân phiên sáng chứng tỏ chiều dòng điện cảm ứng đã bị đảo ngược khi đổi chiều chuyển động của nam châm.',
  },

  // --- MỨC 3: VẬN DỤNG (2 CÂU • 1.5đ/câu = 3.0 điểm) ---
  {
    id: 'q1_b1_vandung_1',
    level: 'van_dung',
    levelLabel: '🔴 MỨC 3: VẬN DỤNG',
    points: 1.5,
    question: 'Một học sinh cần pha loãng 50 mL dung dịch H2SO4 đặc để làm thí nghiệm. Thao tác thực hành nào sau đây đảm bảo an toàn phòng thí nghiệm và đúng nguyên tắc khoa học?',
    subText: 'Vận dụng kiến thức bảo quản và sử dụng hoá chất an toàn',
    options: [
      { choiceId: 'c1', text: 'Lấy sẵn khoảng 150 mL nước cất vào cốc thuỷ tinh đặt trên lưới tản nhiệt, dùng đũa thuỷ tinh dẫn từ từ 50 mL acid đặc chảy men theo thành cốc vào nước, vừa rót vừa khuấy đều', isCorrect: true },
      { choiceId: 'c2', text: 'Rót 50 mL acid đặc vào cốc, sau đó mở vòi nước máy xả trực tiếp vào cốc acid', isCorrect: false },
      { choiceId: 'c3', text: 'Đổ nhanh 50 mL acid đặc vào cốc rỗng rồi đổ tiếp 150 mL nước sôi vào', isCorrect: false },
      { choiceId: 'c4', text: 'Đựng acid đặc trong bình nhựa mỏng rồi đổ nước lạnh vào lắc mạnh', isCorrect: false },
    ],
    explanation: 'H2SO4 đặc háo nước mãnh liệt và toả lượng nhiệt khổng lồ khi hoà tan. Nếu rót nước vào acid đặc, nước nhẹ hơn nổi lên trên và sôi tức thời bắn acid gây bỏng nặng. BẮT BUỘC RÓT ACID TỪ TỪ VÀO NƯỚC.',
  },
  {
    id: 'q1_b1_vandung_2',
    level: 'van_dung',
    levelLabel: '🔴 MỨC 3: VẬN DỤNG',
    points: 1.5,
    question: 'Nhóm em hoàn thành bài nghiên cứu về "Ảnh hưởng của ô nhiễm vi nhựa trong nguồn nước tại địa phương" và cần thiết kế Poster A0 để báo cáo. Phương án thiết kế nào sau đây đạt hiệu quả trực quan cao nhất theo chuẩn SGK KHTN 9?',
    subText: 'Vận dụng kỹ năng thiết kế báo cáo treo tường (Poster)',
    options: [
      { choiceId: 'c1', text: 'Tiêu đề to rõ đọc được từ 2-3m, chia bố cục 3 cột cân đối, dành 70% diện tích cho biểu đồ số liệu cột/đường và hình ảnh chụp mẫu vi nhựa dưới kính hiển vi, phần văn bản chỉ dùng các gạch đầu dòng từ khoá súc tích', isCorrect: true },
      { choiceId: 'c2', text: 'Sao chép toàn bộ 10 trang văn bản Word của bài báo cáo dán kín mặt poster khổ A0 bằng cỡ chữ nhỏ 12pt để người đọc xem chi tiết', isCorrect: false },
      { choiceId: 'c3', text: 'Chỉ dán hình ảnh hoạt hình trang trí nhiều màu sắc sặc sỡ và không cần ghi số liệu khảo sát', isCorrect: false },
      { choiceId: 'c4', text: 'Dùng màu chữ vàng trên nền trắng để tạo sự nhẹ nhàng', isCorrect: false },
    ],
    explanation: 'Poster khoa học chuẩn mực phải ưu tiên tính trực quan: ít chữ, font chữ to rõ từ xa, màu tương phản tốt và tập trung truyền tải dữ liệu qua đồ thị và hình ảnh chụp thực nghiệm.',
  },
];

// =====================================================================
// BÀI 2: ĐỘNG NĂNG. THẾ NĂNG
// SGK KHTN 9 (Bộ Kết nối tri thức - Trang 15 đến 20)
// =====================================================================
export const SGK_STEPS_LESSON_2: SgkStep[] = [
  {
    id: 'b2_s0',
    stepNumber: 1,
    title: 'Khởi động: Bí ẩn Quãng Đường Phanh Trên Cao Tốc',
    sgkSection: 'Khởi động trang 15',
    badge: 'Tình huống thực tế',
    theory: {
      summary: 'Tại sao khi tốc độ xe tăng gấp đôi (2 lần) thì quãng đường phanh dừng lại không phải tăng 2 lần mà tăng vọt gấp 4 lần?',
      points: [
        'Mọi phương tiện giao thông đang chuyển động đều sở hữu động năng.',
        'Khi đạp phanh, lực ma sát cần thực hiện một công cơ học cản trở chuyển động để triệt tiêu toàn bộ động năng của xe.',
      ],
      definitionOrFormula: 'Công thức động năng: Wđ = 1/2 · m · v². Khi vận tốc v tăng 2 lần thì động năng tăng 2² = 4 lần!',
    },
    example: {
      title: 'Bài toán thực tế',
      scenario: 'Chiếc ô tô nặng 1000 kg chạy với tốc độ 10 m/s (36 km/h) có động năng: Wđ1 = 1/2 · 1000 · 10² = 50 000 J. Khi xe tăng tốc lên 20 m/s (72 km/h - tăng 2 lần), động năng trở thành: Wđ2 = 1/2 · 1000 · 20² = 200 000 J (gấp 4 lần!).',
      explanation: 'Vì động năng tăng 4 lần nên lực phanh cần thực hiện công lớn gấp 4 lần, khiến quãng đường trượt phanh tăng xấp xỉ 4 lần.',
    },
    simulationType: 'kinetic_ramp',
    activity: {
      type: 'quiz',
      prompt: 'Kiểm tra tư duy khởi động:',
      question: 'Nếu vận tốc của một vật tăng lên gấp 3 lần thì động năng của vật đó tăng lên bao nhiêu lần?',
      options: [
        { id: 'opt_1', text: 'Tăng lên 9 lần (vì tỉ lệ với bình phương vận tốc 3² = 9)', isCorrect: true, feedback: 'Rất chính xác! Động năng tỉ lệ thuận với v².' },
        { id: 'opt_2', text: 'Tăng lên 3 lần', isCorrect: false, feedback: 'Sai, đây là mối quan hệ bình phương, không phải tỉ lệ bậc 1.' },
        { id: 'opt_3', text: 'Tăng lên 6 lần', isCorrect: false, feedback: 'Sai, 3² = 9 chứ không phải 3 x 2.' },
      ],
    },
    takeaway: 'Động năng tỉ lệ thuận với khối lượng m và tỉ lệ thuận với bình phương vận tốc (v²).',
  },
  {
    id: 'b2_s1',
    stepNumber: 2,
    title: 'Mục I.1: Khái niệm Động năng trong đời sống',
    sgkSection: 'Mục I.1 SGK trang 15',
    badge: 'Khái niệm',
    theory: {
      summary: 'Năng lượng mà một vật có được do nó đang chuyển động được gọi là ĐỘNG NĂNG.',
      points: [
        'Vật đang chuyển động có khả năng tác dụng lực lên vật khác và sinh công cơ học.',
        'Ví dụ: Gió thổi làm quay cánh cối xay gió; viên đạn bay xuyên qua tấm bia gỗ; dòng nước lũ cuốn trôi chướng ngại vật.',
        'Vật đứng yên (vận tốc v = 0) thì động năng của vật bằng 0.',
      ],
      definitionOrFormula: 'Định nghĩa: Động năng là dạng năng lượng gắn liền với chuyển động của vật chất.',
    },
    example: {
      title: 'Quan sát thực nghiệm',
      scenario: 'Thả một viên bi lăn từ trên máng nghiêng xuống va chạm vào miếng gỗ đặt trên mặt bàn phẳng. Viên bi làm miếng gỗ dịch chuyển một đoạn s.',
      explanation: 'Viên bi chuyển động có động năng, khi va chạm đã tác dụng lực đẩy miếng gỗ sinh công.',
    },
    activity: {
      type: 'quiz',
      prompt: 'Nhận biết vật có động năng:',
      question: 'Trường hợp nào sau đây vật KHÔNG có động năng?',
      options: [
        { id: 'opt_1', text: 'Chiếc đèn chùm đang treo đứng yên trên trần nhà', isCorrect: true, feedback: 'Chính xác! Vật đứng yên (v = 0) nên động năng bằng 0 (vật chỉ có thế năng).' },
        { id: 'opt_2', text: 'Chiếc máy bay đang bay trên bầu trời', isCorrect: false, feedback: 'Máy bay đang chuyển động nên có động năng.' },
        { id: 'opt_3', text: 'Dòng nước đang chảy qua đập thuỷ điện', isCorrect: false, feedback: 'Nước đang chảy nên mang động năng lớn.' },
      ],
    },
    takeaway: 'Mọi vật đang chuyển động đều có động năng. Vật đứng yên thì động năng bằng 0.',
  },
  {
    id: 'b2_s2',
    stepNumber: 3,
    title: 'Mục I.2: Công thức tính Động năng & Các yếu tố ảnh hưởng',
    sgkSection: 'Mục I.2 SGK trang 16',
    badge: 'Công thức & Vận dụng',
    theory: {
      summary: 'Biểu thức định lượng tính động năng của vật chuyển động với vận tốc v.',
      points: [
        'Công thức: Wđ = 1/2 · m · v²',
        'Trong đó: m là khối lượng của vật (đơn vị kilôgam - kg).',
        'v là vận tốc của vật (đơn vị mét trên giây - m/s).',
        'Wđ là động năng của vật (đơn vị Jun - J). (1 kJ = 1000 J).',
      ],
      definitionOrFormula: 'Wđ = 1/2 · m · v² (m tính bằng kg, v tính bằng m/s, Wđ tính bằng J)',
      keyRules: [
        'Lưu ý đổi đơn vị: Nếu đề bài cho km/h ➔ chia cho 3,6 để đổi ra m/s.',
        'Nếu cho khối lượng gam (g) ➔ chia cho 1000 để đổi ra kg.',
      ],
    },
    example: {
      title: 'Ví dụ tính toán có lời giải mẫu',
      scenario: 'Một quả bóng đá có khối lượng m = 400 g được cầu thủ sút bay với vận tốc v = 20 m/s. Tính động năng của quả bóng.',
      calculation: {
        given: 'm = 400 g = 0,4 kg; v = 20 m/s',
        formula: 'Wđ = 1/2 · m · v²',
        substitution: 'Wđ = 1/2 · 0,4 · 20² = 0,2 · 400',
        result: 'Wđ = 80 J',
      },
      explanation: 'Động năng của quả bóng là 80 Jun.',
    },
    activity: {
      type: 'quiz',
      prompt: 'Tính nhanh động năng:',
      question: 'Một vận động viên có khối lượng 60 kg đang chạy đều với tốc độ 5 m/s. Động năng của vận động viên là bao nhiêu?',
      options: [
        { id: 'opt_1', text: '750 J', isCorrect: true, feedback: 'Chính xác: Wđ = 1/2 · 60 · 5² = 30 · 25 = 750 J.' },
        { id: 'opt_2', text: '150 J', isCorrect: false, feedback: 'Chưa bình phương vận tốc (60 x 5 / 2 = 150).' },
        { id: 'opt_3', text: '1500 J', isCorrect: false, feedback: 'Quên chia cho 2 (60 x 25 = 1500).' },
      ],
    },
    takeaway: 'Công thức động năng Wđ = 1/2 · m · v². Bắt buộc đổi khối lượng về kg và vận tốc về m/s.',
  },
  {
    id: 'b2_s3',
    stepNumber: 4,
    title: 'Mục II.1: Khái niệm Thế năng trọng trường & Mốc thế năng',
    sgkSection: 'Mục II.1 SGK trang 17',
    badge: 'Khái niệm',
    theory: {
      summary: 'Năng lượng mà một vật có được do nó ở một độ cao so với mặt đất (hoặc so với vật chọn làm mốc) gọi là THẾ NĂNG TRỌNG TRƯỜNG.',
      points: [
        'Vật ở trên cao có khả năng rơi xuống, sinh công cơ học tác dụng lực lên vật khác.',
        'Ví dụ: Quả búa máy ở trên cao rơi xuống đóng cọc bê tông; nước trong hồ chứa trên núi cao chảy xuống làm quay tuabin phát điện.',
        'Mốc tính thế năng: Vị trí quy ước có thế năng bằng 0 (thông thường chọn mặt đất làm mốc thế năng).',
        'Vật nằm ngay tại mốc thế năng thì có thế năng Wt = 0.',
      ],
      definitionOrFormula: 'Thế năng trọng trường phụ thuộc vào vị trí của vật trong trường trọng lực của Trái Đất.',
    },
    example: {
      title: 'Ý nghĩa của việc chọn mốc thế năng',
      scenario: 'Một cuốn sách đặt trên mặt bàn cao 1 m so với sàn nhà. Nếu chọn mặt đất làm mốc: sách có thế năng Wt > 0. Nếu chọn mặt bàn làm mốc: sách nằm ngay trên mốc nên có thế năng Wt = 0.',
      explanation: 'Giá trị thế năng phụ thuộc vào việc chọn mốc tính độ cao h.',
    },
    activity: {
      type: 'quiz',
      prompt: 'Khái niệm thế năng:',
      question: 'Khi một vật nằm yên ngay trên mặt đất (chọn mặt đất làm mốc thế năng) thì thế năng trọng trường của vật bằng bao nhiêu?',
      options: [
        { id: 'opt_1', text: 'Bằng 0 (Wt = 0)', isCorrect: true, feedback: 'Đúng! Vì độ cao h = 0 nên Wt = m.g.0 = 0.' },
        { id: 'opt_2', text: 'Luôn bằng 100 J', isCorrect: false, feedback: 'Sai, độ cao h = 0 thì không có thế năng.' },
        { id: 'opt_3', text: 'Bằng khối lượng của vật', isCorrect: false, feedback: 'Sai bản chất đại lượng.' },
      ],
    },
    takeaway: 'Thế năng trọng trường là năng lượng do vị trí độ cao tạo nên. Luôn phải xác định rõ mốc tính thế năng (h = 0).',
  },
  {
    id: 'b2_s4',
    stepNumber: 5,
    title: 'Mục II.2: Công thức tính Thế năng trọng trường (Wt = P.h = m.g.h)',
    sgkSection: 'Mục II.2 SGK trang 18',
    badge: 'Công thức & Vận dụng',
    theory: {
      summary: 'Biểu thức xác định độ lớn của thế năng trọng trường của một vật ở độ cao h.',
      points: [
        'Công thức: Wt = P · h = m · g · h',
        'Trong đó: P là trọng lượng của vật (đơn vị Niutơn - N). P = m · g.',
        'm là khối lượng của vật (đơn vị kilôgam - kg).',
        'g là gia tốc trọng trường (thường lấy g = 9,8 m/s² hoặc g = 10 m/s²).',
        'h là độ cao của vật so với mốc thế năng (đơn vị mét - m).',
        'Wt là thế năng trọng trường (đơn vị Jun - J).',
      ],
      definitionOrFormula: 'Wt = m · g · h (m tính bằng kg, h tính bằng m, g = 10 m/s², Wt tính bằng J)',
    },
    example: {
      title: 'Ví dụ tính toán búa máy đóng cọc',
      scenario: 'Một búa máy khối lượng m = 500 kg được cần cẩu kéo lên độ cao h = 6 m so với đầu cọc bê tông (chọn đầu cọc làm mốc thế năng). Lấy g = 10 m/s². Tính thế năng của búa máy.',
      calculation: {
        given: 'm = 500 kg; h = 6 m; g = 10 m/s²',
        formula: 'Wt = m · g · h',
        substitution: 'Wt = 500 · 10 · 6',
        result: 'Wt = 30 000 J (30 kJ)',
      },
      explanation: 'Thế năng tích luỹ của búa máy là 30 000 Jun. Khi thả rơi, toàn bộ 30 kJ này chuyển hoá thành động năng để đóng cọc.',
    },
    activity: {
      type: 'quiz',
      prompt: 'Tính nhanh thế năng:',
      question: 'Một quả dừa nặng 1,5 kg ở trên ngọn cây cao 8 m so với mặt đất (lấy g = 10 m/s²). Thế năng của quả dừa so với mặt đất là bao nhiêu?',
      options: [
        { id: 'opt_1', text: '120 J', isCorrect: true, feedback: 'Chính xác: Wt = m · g · h = 1,5 · 10 · 8 = 120 J.' },
        { id: 'opt_2', text: '12 J', isCorrect: false, feedback: 'Tính thiếu thừa số 10.' },
        { id: 'opt_3', text: '240 J', isCorrect: false, feedback: 'Sai phép nhân.' },
      ],
    },
    takeaway: 'Công thức thế năng trọng trường: Wt = m · g · h. Vật càng nặng và ở càng cao thì thế năng càng lớn.',
  },
  {
    id: 'b2_s5',
    stepNumber: 6,
    title: 'Mục III: Thí nghiệm khảo sát các yếu tố ảnh hưởng đến động năng và thế năng',
    sgkSection: 'Mục III SGK trang 19',
    badge: 'Thực hành thí nghiệm',
    theory: {
      summary: 'Khảo sát thực nghiệm chứng minh sự phụ thuộc của động năng vào khối lượng và vận tốc; thế năng vào khối lượng và độ cao.',
      points: [
        'Thí nghiệm máng nghiêng: Cho bi lăn từ các độ cao khác nhau h1 < h2 xuống va chạm vào khúc gỗ ➔ Thả từ càng cao, vận tốc lúc chạm đáy càng lớn, miếng gỗ bị đẩy đi quãng đường càng xa ➔ Động năng tỉ lệ với vận tốc.',
        'Dùng 2 quả bi có khối lượng khác nhau m1 < m2 thả cùng độ cao ➔ Quả bi nặng hơn đẩy miếng gỗ đi xa hơn ➔ Động năng tỉ lệ với khối lượng.',
        'Thí nghiệm thả rơi quả nặng làm lún nền cát ➔ Quả nặng càng lớn và thả từ càng cao thì hố cát càng lún sâu ➔ Thế năng tỉ lệ với m và h.',
      ],
      definitionOrFormula: 'Công sinh ra A = F · s đo lường trực tiếp năng lượng chuyển hoá từ động năng và thế năng.',
    },
    example: {
      title: 'Quan sát thực nghiệm',
      scenario: 'Thả viên bi thép 100g và viên bi đất nung 20g từ cùng độ cao 1m xuống chậu đất sét mềm. Viên bi thép tạo hố lún sâu gấp 5 lần so với bi đất nung.',
      explanation: 'Cùng độ cao h, vật có khối lượng m lớn hơn gấp 5 lần thì có thế năng Wt lớn gấp 5 lần, sinh công làm lún đất sét gấp 5 lần.',
    },
    simulationType: 'kinetic_ramp',
    activity: {
      type: 'quiz',
      prompt: 'Phân tích thí nghiệm:',
      question: 'Trong thí nghiệm máng nghiêng, yếu tố nào chứng tỏ viên bi có động năng lớn hơn khi chạm vào miếng gỗ?',
      options: [
        { id: 'opt_1', text: 'Miếng gỗ bị đẩy dịch chuyển một quãng đường xa hơn', isCorrect: true, feedback: 'Chính xác! Quãng đường s lớn hơn chứng tỏ công cơ học A = F · s lớn hơn, động năng ban đầu lớn hơn.' },
        { id: 'opt_2', text: 'Màu sắc của miếng gỗ bị đổi màu', isCorrect: false, feedback: 'Không liên quan đến năng lượng cơ học.' },
        { id: 'opt_3', text: 'Viên bi bị nóng chảy', isCorrect: false, feedback: 'Sai hiện tượng thực tế.' },
      ],
    },
    takeaway: 'Thí nghiệm thực tế chứng minh rõ: Động năng tăng khi m và v tăng; Thế năng tăng khi m và h tăng.',
  },
  {
    id: 'b2_final',
    stepNumber: 7,
    title: 'Luyện tập cuối bài: Đánh giá tổng hợp Bài 2',
    sgkSection: 'Luyện tập cuối bài trang 20',
    badge: 'Kiểm tra chuẩn hoá',
    isFinalQuiz: true,
    theory: {
      summary: 'Bộ câu hỏi tổng hợp kiến thức về Động năng và Thế năng trọng trường.',
      points: [
        'Đủ 3 mức độ: 🟢 BIẾT (Nhận diện công thức, đơn vị) • 🟡 HIỂU (So sánh, phân tích yếu tố) • 🔴 VẬN DỤNG (Bài toán thực tiễn).',
        'Thang điểm 10 chuẩn mực, nộp bài ghi nhận ngay vào Firestore.',
      ],
    },
    example: {
      title: 'Mẹo làm bài thi tính toán',
      scenario: 'Luôn chú ý kiểm tra đơn vị: đổi vận tốc km/h ra m/s (: 3,6); đổi khối lượng gam ra kg (: 1000). Viết công thức trước rồi mới thay số.',
      explanation: 'Làm đúng các bước giúp em không bị trừ điểm trình bày.',
    },
    activity: {
      type: 'quiz',
      prompt: 'Chuẩn bị nộp bài:',
      question: 'Đơn vị đo chuẩn của động năng và thế năng trong hệ SI là gì?',
      options: [
        { id: 'opt_1', text: 'Jun (J)', isCorrect: true, feedback: 'Chính xác! Mọi dạng năng lượng và công trong hệ SI đều đo bằng Jun (J).' },
        { id: 'opt_2', text: 'Oát (W)', isCorrect: false, feedback: 'Oát là đơn vị của Công suất (P).' },
        { id: 'opt_3', text: 'Niutơn (N)', isCorrect: false, feedback: 'Niutơn là đơn vị của Lực (F) hoặc Trọng lượng (P).' },
      ],
    },
    takeaway: 'Hoàn thành bài luyện tập để mở khoá Bài 3: Cơ năng.',
  },
];

// =====================================================================
// BỘ CÂU HỎI LUYỆN TẬP CUỐI BÀI 2 (THANG ĐIỂM 10 CHUẨN)
// =====================================================================
export const SGK_FINAL_QUIZ_LESSON_2: SgkQuizQuestion[] = [
  // --- MỨC 1: BIẾT (4 CÂU • 0.75đ/câu = 3.0 điểm) ---
  {
    id: 'q2_biet_1',
    level: 'nhan_biet',
    levelLabel: '🟢 MỨC 1: BIẾT',
    points: 0.75,
    question: 'Công thức nào sau đây dùng để tính động năng của một vật có khối lượng m chuyển động với vận tốc v?',
    subText: 'SGK KHTN 9 trang 16',
    options: [
      { choiceId: 'c1', text: 'Wđ = 1/2 · m · v²', isCorrect: true },
      { choiceId: 'c2', text: 'Wđ = m · v', isCorrect: false },
      { choiceId: 'c3', text: 'Wđ = m · g · h', isCorrect: false },
      { choiceId: 'c4', text: 'Wđ = 1/2 · m · v', isCorrect: false },
    ],
    explanation: 'SGK trang 16: Động năng của vật được tính bằng công thức Wđ = 1/2 · m · v².',
  },
  {
    id: 'q2_biet_2',
    level: 'nhan_biet',
    levelLabel: '🟢 MỨC 1: BIẾT',
    points: 0.75,
    question: 'Thế năng trọng trường của một vật phụ thuộc vào những yếu tố nào sau đây?',
    subText: 'SGK KHTN 9 trang 18',
    options: [
      { choiceId: 'c1', text: 'Khối lượng của vật và độ cao của vật so với mốc tính thế năng', isCorrect: true },
      { choiceId: 'c2', text: 'Vận tốc và thể tích của vật', isCorrect: false },
      { choiceId: 'c3', text: 'Hình dạng và màu sắc của vật', isCorrect: false },
      { choiceId: 'c4', text: 'Vận tốc chuyển động và nhiệt độ của vật', isCorrect: false },
    ],
    explanation: 'Công thức Wt = m · g · h cho thấy thế năng phụ thuộc vào khối lượng m và độ cao h so với mốc.',
  },
  {
    id: 'q2_biet_3',
    level: 'nhan_biet',
    levelLabel: '🟢 MỨC 1: BIẾT',
    points: 0.75,
    question: 'Trong hệ đơn vị đo lường quốc tế SI, đơn vị của động năng và thế năng là gì?',
    subText: 'Đơn vị đo lường chuẩn',
    options: [
      { choiceId: 'c1', text: 'Jun (kí hiệu là J)', isCorrect: true },
      { choiceId: 'c2', text: 'Oát (kí hiệu là W)', isCorrect: false },
      { choiceId: 'c3', text: 'Niutơn (kí hiệu là N)', isCorrect: false },
      { choiceId: 'c4', text: 'Kilôgam (kí hiệu là kg)', isCorrect: false },
    ],
    explanation: 'Năng lượng cơ học (động năng, thế năng, công) đều có đơn vị đo chuẩn trong hệ SI là Jun (J).',
  },
  {
    id: 'q2_biet_4',
    level: 'nhan_biet',
    levelLabel: '🟢 MỨC 1: BIẾT',
    points: 0.75,
    question: 'Trường hợp nào sau đây vật sở hữu thế năng trọng trường?',
    subText: 'Nhận biết dạng năng lượng',
    options: [
      { choiceId: 'c1', text: 'Một quả bưởi đang ở trên cành cây cao 4 mét so với mặt đất', isCorrect: true },
      { choiceId: 'c2', text: 'Một hòn bi đang lăn đều trên mặt sàn nhà nằm ngang', isCorrect: false },
      { choiceId: 'c3', text: 'Một cục pin để trong ngăn kéo bàn', isCorrect: false },
      { choiceId: 'c4', text: 'Một ấm nước sôi đặt trên bếp', isCorrect: false },
    ],
    explanation: 'Quả bưởi ở độ cao 4m so với mặt đất sở hữu thế năng trọng trường Wt = m.g.h > 0.',
  },

  // --- MỨC 2: HIỂU (4 CÂU • 1.0đ/câu = 4.0 điểm) ---
  {
    id: 'q2_hieu_1',
    level: 'thong_hieu',
    levelLabel: '🟡 MỨC 2: HIỂU',
    points: 1.0,
    question: 'Một chiếc ô tô 2 tấn và một chiếc xe máy 100 kg cùng chuyển động trên đường với tốc độ 40 km/h. So sánh động năng của hai xe:',
    options: [
      { choiceId: 'c1', text: 'Động năng của ô tô lớn hơn động năng của xe máy gấp 20 lần vì khối lượng gấp 20 lần', isCorrect: true },
      { choiceId: 'c2', text: 'Động năng hai xe bằng nhau vì cùng chạy với tốc độ 40 km/h', isCorrect: false },
      { choiceId: 'c3', text: 'Xe máy có động năng lớn hơn vì nhẹ hơn nên lướt nhanh hơn', isCorrect: false },
      { choiceId: 'c4', text: 'Không so sánh được vì hai phương tiện khác nhau', isCorrect: false },
    ],
    explanation: 'Cùng vận tốc v, động năng Wđ tỉ lệ thuận với khối lượng m. Khối lượng ô tô = 2000 kg gấp 20 lần xe máy (100 kg) ➔ Động năng gấp 20 lần.',
  },
  {
    id: 'q2_hieu_2',
    level: 'thong_hieu',
    levelLabel: '🟡 MỨC 2: HIỂU',
    points: 1.0,
    question: 'Khi vận tốc của một vật tăng lên gấp 2 lần, đồng thời khối lượng của vật giảm đi một nửa (giảm 2 lần) thì động năng của vật thay đổi như thế nào?',
    options: [
      { choiceId: 'c1', text: 'Động năng tăng lên gấp 2 lần', isCorrect: true },
      { choiceId: 'c2', text: 'Động năng không đổi', isCorrect: false },
      { choiceId: 'c3', text: 'Động năng tăng gấp 4 lần', isCorrect: false },
      { choiceId: 'c4', text: 'Động năng giảm đi 2 lần', isCorrect: false },
    ],
    explanation: 'Wđ\' = 1/2 · (m/2) · (2v)² = 1/2 · (m/2) · 4v² = 2 · (1/2 m v²) = 2 Wđ. Vậy động năng tăng gấp 2 lần.',
  },
  {
    id: 'q2_hieu_3',
    level: 'thong_hieu',
    levelLabel: '🟡 MỨC 2: HIỂU',
    points: 1.0,
    question: 'Một thùng hàng khối lượng 20 kg được cần cẩu nâng từ mặt đất lên độ cao 5 m rồi giữ yên. Lấy g = 10 m/s². Thế năng trọng trường của thùng hàng lúc này là bao nhiêu?',
    options: [
      { choiceId: 'c1', text: '1 000 J (1 kJ)', isCorrect: true },
      { choiceId: 'c2', text: '100 J', isCorrect: false },
      { choiceId: 'c3', text: '2 000 J', isCorrect: false },
      { choiceId: 'c4', text: '500 J', isCorrect: false },
    ],
    explanation: 'Wt = m · g · h = 20 · 10 · 5 = 1 000 J.',
  },
  {
    id: 'q2_hieu_4',
    level: 'thong_hieu',
    levelLabel: '🟡 MỨC 2: HIỂU',
    points: 1.0,
    question: 'Một vận động viên nhảy dù nhảy khỏi máy bay. Trong giai đoạn rơi khi chưa mở dù, độ cao của vận động viên giảm dần và tốc độ rơi tăng dần. Quá trình này thể hiện sự biến đổi năng lượng nào?',
    options: [
      { choiceId: 'c1', text: 'Thế năng trọng trường giảm dần và chuyển hoá thành Động năng tăng dần', isCorrect: true },
      { choiceId: 'c2', text: 'Động năng chuyển hoá thành Thế năng', isCorrect: false },
      { choiceId: 'c3', text: 'Cả động năng và thế năng đều cùng tăng', isCorrect: false },
      { choiceId: 'c4', text: 'Năng lượng cơ học bị triệt tiêu hoàn toàn', isCorrect: false },
    ],
    explanation: 'Độ cao h giảm ➔ Wt giảm. Vận tốc v tăng ➔ Wđ tăng. Thế năng đã chuyển hoá thành động năng.',
  },

  // --- MỨC 3: VẬN DỤNG (2 CÂU • 1.5đ/câu = 3.0 điểm) ---
  {
    id: 'q2_vandung_1',
    level: 'van_dung',
    levelLabel: '🔴 MỨC 3: VẬN DỤNG',
    points: 1.5,
    question: 'Một xe tải khối lượng 5 tấn đang chạy trên đường cao tốc với tốc độ 72 km/h. Động năng của chiếc xe tải là bao nhiêu?',
    subText: 'Bài toán vận dụng tính toán có đổi đơn vị chuẩn',
    options: [
      { choiceId: 'c1', text: '1 000 000 J (1 MJ)', isCorrect: true },
      { choiceId: 'c2', text: '12 960 000 J', isCorrect: false },
      { choiceId: 'c3', text: '100 000 J', isCorrect: false },
      { choiceId: 'c4', text: '360 000 J', isCorrect: false },
    ],
    explanation: 'Đổi đơn vị: m = 5 tấn = 5 000 kg; v = 72 km/h = 72 / 3,6 = 20 m/s. Động năng: Wđ = 1/2 · m · v² = 1/2 · 5 000 · 20² = 2 500 · 400 = 1 000 000 J = 1 MJ.',
  },
  {
    id: 'q2_vandung_2',
    level: 'van_dung',
    levelLabel: '🔴 MỨC 3: VẬN DỤNG',
    points: 1.5,
    question: 'Búa máy khối lượng m = 800 kg ở độ cao h = 5 m so với mặt cọc bê tông được thả rơi tự do để đóng cọc lún sâu vào đất cát (lấy g = 10 m/s²). Biết lực cản trung bình của nền đất tác dụng lên cọc là F = 200 000 N. Bỏ qua ma sát không khí và giả sử toàn bộ thế năng chuyển hoá thành công đóng cọc (A = F · s). Hỏi cọc bị đóng lún sâu một đoạn s bằng bao nhiêu?',
    subText: 'Vận dụng định luật bảo toàn công cơ học',
    options: [
      { choiceId: 'c1', text: 's = 0,2 m (20 cm)', isCorrect: true },
      { choiceId: 'c2', text: 's = 0,5 m (50 cm)', isCorrect: false },
      { choiceId: 'c3', text: 's = 0,1 m (10 cm)', isCorrect: false },
      { choiceId: 'c4', text: 's = 2 m', isCorrect: false },
    ],
    explanation: 'Thế năng của búa ở độ cao 5m: Wt = m · g · h = 800 · 10 · 5 = 40 000 J. Công lực cản của đất: A = F · s = 40 000 J ➔ s = A / F = 40 000 / 200 000 = 0,2 m = 20 cm.',
  },
];

// =====================================================================
// HÀM TIỆN ÍCH LẤY DỮ LIỆU BÀI HỌC VÀ TRẮC NGHIỆM ĐÃ XÁO TRỘN ĐÁP ÁN
// =====================================================================
export function getSgkStepsForLesson(lessonId: number): SgkStep[] {
  if (lessonId === 2) return SGK_STEPS_LESSON_2;
  return SGK_STEPS_LESSON_1;
}

export function getSgkFinalQuizForLesson(lessonId: number): SgkQuizQuestion[] {
  const source = lessonId === 2 ? SGK_FINAL_QUIZ_LESSON_2 : SGK_FINAL_QUIZ_LESSON_1;
  
  // XÁO TRỘN ĐÁP ÁN HIỂN THỊ (QUY TẮC XIII: CHOICE ID CỐ ĐỊNH, VỊ TRÍ XÁO TRỘN)
  return source.map(q => {
    // Clone mảng options và xáo trộn ngẫu nhiên (Fisher-Yates)
    const shuffledOptions = [...q.options];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }
    return {
      ...q,
      options: shuffledOptions,
    };
  });
}
