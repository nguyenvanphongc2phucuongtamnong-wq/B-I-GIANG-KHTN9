import { SgkQuestionOption } from './sgkCurriculumData';

export interface TopicHierarchy {
  romanHeader: string;
  subHeader: string;
  subItems: string[];
}

export interface FormulaDetails {
  title: string;
  formula: string;
  explanation: string;
  variables: Array<{
    symbol: string;
    name: string;
    unit: string;
  }>;
}

export interface TopicTableOrDiagram {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface TopicExampleDetail {
  type: 'problem' | 'phenomenon';
  title: string;
  givenOrPhenomenon: string;
  stepsOrExplanation: string;
  resultOrTakeaway: string;
}

export interface SimObservationInfo {
  title: string;
  instruction: string;
  observationQuestion: string;
  observationAnswer: string;
}

export interface InteractiveQuizItem {
  id: string;
  question: string;
  options: SgkQuestionOption[];
  explanation: string;
}

export interface EnrichedTopicData {
  hierarchy: TopicHierarchy;
  formula?: FormulaDetails;
  tableOrDiagram?: TopicTableOrDiagram;
  warningNote: string;
  exampleDetail: TopicExampleDetail;
  simObservation?: SimObservationInfo;
  interactiveQuizzes: InteractiveQuizItem[];
}

// BẢNG DỮ LIỆU ĐẶC BIỆT HOÁ ĐẦY ĐỦ CHO TỪNG ĐỀ MỤC SGK BÀI 1, 2, 3, 4
export const ENRICHED_TOPICS_MAP: Record<string, EnrichedTopicData> = {
  // ==========================================
  // BÀI 1: DỤNG CỤ, HOÁ CHẤT & BÁO CÁO KHOA HỌC
  // ==========================================
  topic_1_1: {
    hierarchy: {
      romanHeader: 'I. MỘT SỐ DỤNG CỤ VÀ HOÁ CHẤT THÍ NGHIỆM',
      subHeader: '1. Một số dụng cụ quang học',
      subItems: [
        'a) Nguồn sáng khe hẹp và nguồn phát tia laser',
        'b) Bản bán trụ thuỷ tinh trong suốt',
        'c) Bảng chia độ tròn 360° đo góc tới và góc khúc xạ'
      ]
    },
    tableOrDiagram: {
      title: 'Bảng đối chiếu dụng cụ quang học SGK KHTN 9 (trang 6)',
      headers: ['Tên dụng cụ', 'Đặc điểm cấu tạo', 'Chức năng thí nghiệm'],
      rows: [
        ['Nguồn sáng khe hẹp', 'Đèn sợi đốt có tấm chắn khe hẹp', 'Tạo chùm sáng song song hoặc phân kì mỏng'],
        ['Nguồn phát laser', 'Bút phát chùm tia laser bước sóng 650 nm', 'Tạo tia sáng đơn sắc mảnh, độ định hướng cực cao'],
        ['Bản bán trụ thuỷ tinh', 'Khối thuỷ tinh hình bán nguyệt trong suốt', 'Khảo sát hiện tượng khúc xạ và phản xạ toàn phần'],
        ['Đĩa chia độ tròn', 'Mặt đĩa khắc độ chia từ 0° đến 360°', 'Đo chính xác góc tới i và góc khúc xạ r']
      ]
    },
    warningNote: '⚠ LƯU Ý AN TOÀN QUANG HỌC: Tuyệt đối không nhìn trực tiếp vào đầu phát của chùm tia laser hoặc chiếu chùm tia laser vào mắt người khác. Bức xạ laser tập trung có mật độ năng lượng rất cao, có thể gây tổn thương giác mạc hoặc mù loà vĩnh viễn!',
    exampleDetail: {
      type: 'problem',
      title: 'Thực nghiệm đo góc khúc xạ của bản bán trụ (SGK trang 6)',
      givenOrPhenomenon: 'Chiếu tia laser từ không khí vào tâm mặt phẳng của bản bán trụ thuỷ tinh với góc tới i = 45°. Chiết suất của thuỷ tinh là n ≈ 1,5.',
      stepsOrExplanation: 'Theo định luật khúc xạ ánh sáng: sin(i) = n · sin(r) ➔ sin(r) = sin(45°) / 1,5 = 0,7071 / 1,5 ≈ 0,4714. Tra bảng góc lượng giác suy ra góc khúc xạ r ≈ 28°.',
      resultOrTakeaway: 'Góc khúc xạ r ≈ 28° (luôn nhỏ hơn góc tới i = 45° khi ánh sáng truyền từ không khí vào thuỷ tinh).'
    },
    simObservation: {
      title: 'Thí nghiệm ảo: Khúc xạ ánh sáng qua bản bán trụ',
      instruction: 'Kéo thanh trượt để thay đổi góc tới i từ 0° đến 80° và quan sát đường truyền của tia khúc xạ màu xanh lá cây.',
      observationQuestion: 'Khi góc tới i = 0° (chiếu vuông góc với mặt phân cách), tia khúc xạ truyền như thế nào?',
      observationAnswer: 'Khi i = 0°, tia sáng đi theo phương của pháp tuyến nên tiếp tục truyền thẳng vào tâm mà không bị đổi hướng (r = 0°).'
    },
    interactiveQuizzes: [
      {
        id: 'iq_1_1_1',
        question: 'Khi ánh sáng truyền từ không khí vào bản bán trụ thuỷ tinh, mối quan hệ giữa góc tới i và góc khúc xạ r là gì?',
        options: [
          { id: 'opt_1', text: 'Góc khúc xạ r luôn lớn hơn góc tới i (r > i)', isCorrect: false },
          { id: 'opt_2', text: 'Góc khúc xạ r luôn nhỏ hơn góc tới i (r < i)', isCorrect: true },
          { id: 'opt_3', text: 'Góc khúc xạ r luôn bằng đúng góc tới i (r = i)', isCorrect: false },
          { id: 'opt_4', text: 'Góc khúc xạ r và góc tới i luôn bù nhau (i + r = 180°)', isCorrect: false }
        ],
        explanation: 'Vì thuỷ tinh có chiết suất lớn hơn không khí (n > 1) nên chùm tia sáng bị bẻ gãy lại gần pháp tuyến hơn, do đó r < i.'
      },
      {
        id: 'iq_1_1_2',
        question: 'Tại sao trong thí nghiệm khúc xạ lại sử dụng bản thuỷ tinh hình BÁN TRỤ thay vì hình khối chữ nhật thông thường?',
        options: [
          { id: 'opt_1', text: 'Vì bản bán trụ có giá thành rẻ hơn nhiều lần', isCorrect: false },
          { id: 'opt_2', text: 'Để tia sáng khi đi ra khỏi mặt cong theo phương bán kính sẽ truyền thẳng, không bị khúc xạ lần thứ hai', isCorrect: true },
          { id: 'opt_3', text: 'Để ánh sáng không thể lọt qua mặt đáy của bản', isCorrect: false },
          { id: 'opt_4', text: 'Để làm tăng độ sáng của chùm tia laser thí nghiệm', isCorrect: false }
        ],
        explanation: 'SGK trang 6: Mọi tia sáng đi qua tâm bản bán trụ đều vuông góc với mặt cong tròn nên truyền thẳng ra ngoài không khí mà không bị khúc xạ thêm lần nữa, giúp số đo góc r hoàn toàn chuẩn xác.'
      }
    ]
  },

  topic_1_2: {
    hierarchy: {
      romanHeader: 'I. MỘT SỐ DỤNG CỤ VÀ HOÁ CHẤT THÍ NGHIỆM',
      subHeader: '2. Điện kế và nguồn điện',
      subItems: [
        'a) Cấu tạo và nguyên lý của điện kế (Galvanometer)',
        'b) Cuộn dây cảm ứng với hai đèn LED mắc song song ngược cực',
        'c) Nguồn điện một chiều (DC) và xoay chiều (AC) chuyên dụng'
      ]
    },
    tableOrDiagram: {
      title: 'So sánh Điện kế và Ampe kế thông thường',
      headers: ['Tiêu chí', 'Điện kế (Galvanometer)', 'Ampe kế thông thường'],
      rows: [
        ['Vị trí vạch số 0', 'Ở CHÍNH GIỮA mặt chia độ', 'Ở góc ngoài cùng bên trái'],
        ['Chiều lệch kim', 'Có thể lệch sang TRÁI hoặc sang PHẢI', 'Chỉ lệch sang một chiều thuận'],
        ['Độ nhạy', 'Rất cao (đo được dòng microampe µA)', 'Trung bình (đo dòng mA hoặc A)'],
        ['Mục đích chính', 'Nhận biết chiều và độ lớn dòng cảm ứng', 'Đo cường độ dòng điện trong mạch kín']
      ]
    },
    warningNote: '⚠ LƯU Ý SỬ DỤNG THIẾT BỊ ĐIỆN: Điện kế là dụng cụ có độ nhạy cực kì cao. Tuyệt đối KHÔNG mắc điện kế trực tiếp vào hai cực của pin hay nguồn điện mạnh vì dòng điện quá tải sẽ làm đứt cuộn dây hoặc cháy hỏng kim đo ngay lập tức!',
    exampleDetail: {
      type: 'phenomenon',
      title: 'Hiện tượng cảm ứng điện từ với nam châm và cuộn dây',
      givenOrPhenomenon: 'Nối hai đầu cuộn dây dẫn có lồng hai đèn LED đỏ - vàng ngược chiều vào điện kế. Đưa cực Bắc nam châm lại gần rồi rút ra xa.',
      stepsOrExplanation: 'Khi đưa cực Bắc lại gần: từ thông tăng, sinh dòng cảm ứng thuận làm kim lệch sang phải và đèn đỏ sáng. Khi nam châm dừng lại: từ thông không đổi, kim về số 0. Khi rút nam châm ra: từ thông giảm, sinh dòng cảm ứng ngược chiều làm kim lệch sang trái và đèn vàng sáng.',
      resultOrTakeaway: 'Chiều dòng điện cảm ứng phụ thuộc trực tiếp vào sự tăng hoặc giảm của từ thông xuyên qua cuộn dây.'
    },
    simObservation: {
      title: 'Thí nghiệm ảo: Điện kế kim giữa và nam châm chuyển động',
      instruction: 'Bấm các nút "Đưa nam châm lại gần", "Rút nam châm ra xa", "Giữ nam châm đứng yên" để quan sát kim điện kế và trạng thái đèn LED.',
      observationQuestion: 'Tại sao khi giữ nam châm đứng yên bất động trong cuộn dây thì kim điện kế chỉ số 0?',
      observationAnswer: 'Vì khi nam châm đứng yên, số đường sức từ xuyên qua tiết diện cuộn dây không biến thiên (từ thông không đổi), nên không sinh ra dòng điện cảm ứng.'
    },
    interactiveQuizzes: [
      {
        id: 'iq_1_2_1',
        question: 'Vạch số 0 trên mặt thang đo của chiếc Điện kế nằm ở vị trí nào?',
        options: [
          { id: 'opt_1', text: 'Nằm ở góc ngoài cùng bên trái thang đo', isCorrect: false },
          { id: 'opt_2', text: 'Nằm ở chính giữa mặt đo để kim lệch được 2 phía', isCorrect: true },
          { id: 'opt_3', text: 'Nằm ở góc ngoài cùng bên phải thang đo', isCorrect: false },
          { id: 'opt_4', text: 'Mặt đo không có vạch số mà dùng kim báo đỏ', isCorrect: false }
        ],
        explanation: 'SGK trang 7: Điện kế có vạch số 0 ở chính giữa thang đo để kim có thể quay sang phải hoặc sang trái tương ứng với chiều dòng điện.'
      },
      {
        id: 'iq_1_2_2',
        question: 'Hai đèn LED đỏ và vàng mắc song song ngược cực vào cuộn dây có tác dụng gì?',
        options: [
          { id: 'opt_1', text: 'Làm tăng gấp đôi độ sáng cho phòng thí nghiệm', isCorrect: false },
          { id: 'opt_2', text: 'Nhận biết trực quan chiều của dòng điện cảm ứng qua màu đèn sáng', isCorrect: true },
          { id: 'opt_3', text: 'Ngăn chặn hiện tượng đoản mạch trong cuộn dây', isCorrect: false },
          { id: 'opt_4', text: 'Tích trữ điện năng giống như một tụ điện', isCorrect: false }
        ],
        explanation: 'Đèn LED chỉ cho dòng điện đi qua theo một chiều. Mắc ngược cực giúp: dòng điện đi theo chiều này thì đèn đỏ sáng, đi chiều ngược lại thì đèn vàng sáng.'
      }
    ]
  },

  topic_1_3: {
    hierarchy: {
      romanHeader: 'I. MỘT SỐ DỤNG CỤ VÀ HOÁ CHẤT THÍ NGHIỆM',
      subHeader: '3. Một số dụng cụ và hoá chất thông dụng',
      subItems: [
        'a) Ống sinh hàn trong phương pháp chưng cất',
        'b) Phễu chiết trong phương pháp chiết chất lỏng không trộn lẫn',
        'c) Quy tắc an toàn và bảo quản hoá chất dễ phản ứng (Na, KMnO4, AgNO3)'
      ]
    },
    tableOrDiagram: {
      title: 'Quy tắc bảo quản hoá chất đặc thù trong phòng thí nghiệm',
      headers: ['Hoá chất', 'Đặc tính nguy hiểm', 'Quy tắc bảo quản chuẩn SGK'],
      rows: [
        ['Kim loại Natri (Na), Kali (K)', 'Phản ứng mãnh liệt với nước và oxy gây cháy nổ', 'Ngâm ngập hoàn toàn trong dầu hoả khan'],
        ['Bạc nitrat (AgNO3), KMnO4', 'Dễ bị quang phân huỷ dưới tác dụng ánh sáng', 'Đựng trong lọ thuỷ tinh màu nâu sẫm, nút kín'],
        ['Acid đặc (H2SO4, HCl, HNO3)', 'Ăn mòn da cực mạnh, toả nhiệt dữ dội', 'Để ngăn dưới cùng tủ hoá chất, có khay đệm cát']
      ]
    },
    warningNote: '⚠ LƯU Ý AN TOÀN KHI BỊ ACID DÍNH VÀO TAY: Tuyệt đối không dùng khăn chà xát mạnh. Phải xả ngay tay dưới vòi nước sạch chảy liên tục ít nhất 10–15 phút để làm loãng và trôi acid, sau đó rửa nhẹ bằng dung dịch NaHCO3 loãng (khoảng 2%) rồi báo ngay cho giáo viên!',
    exampleDetail: {
      type: 'phenomenon',
      title: 'Thực hành tách dầu ăn ra khỏi nước bằng phễu chiết (SGK trang 8)',
      givenOrPhenomenon: 'Hỗn hợp dầu ăn và nước được cho vào phễu chiết rồi lắc đều, sau đó để yên trên giá thí nghiệm khoảng 5 phút.',
      stepsOrExplanation: 'Do dầu ăn không tan trong nước và có khối lượng riêng nhỏ hơn nước (d_dầu ≈ 0,8 g/cm³ < d_nước = 1,0 g/cm³) nên dầu nổi lên trên, nước chìm xuống dưới tạo thành 2 lớp phân chia rõ rệt. Mở khoá phễu chiết cho lớp nước chảy chậm vào cốc phía dưới, đóng khoá lại ngay khi mặt phân cách chạm đến chốt khoá.',
      resultOrTakeaway: 'Tách riêng được hoàn toàn lớp nước và giữ lại lớp dầu ăn tinh khiết trong phễu chiết.'
    },
    simObservation: {
      title: 'Thí nghiệm ảo: Tách chất lỏng bằng phễu chiết',
      instruction: 'Bấm nút "Để yên phân lớp" rồi bấm "Mở khoá phễu chiết" để theo dõi dòng chất lỏng chảy xuống bình hứng.',
      observationQuestion: 'Dựa vào tính chất vật lí nào để phương pháp chiết có thể phân tách hai chất lỏng?',
      observationAnswer: 'Dựa vào tính chất: hai chất lỏng không hoà tan vào nhau và có khối lượng riêng khác nhau (phân lớp).'
    },
    interactiveQuizzes: [
      {
        id: 'iq_1_3_1',
        question: 'Dụng cụ nào dưới đây thích hợp nhất để tách hỗn hợp gồm dầu hoả và nước?',
        options: [
          { id: 'opt_1', text: 'Bát sứ nung trên ngọn lửa đèn cồn', isCorrect: false },
          { id: 'opt_2', text: 'Phễu chiết thuỷ tinh có van khoá', isCorrect: true },
          { id: 'opt_3', text: 'Ống đong hình trụ khắc vạch chia', isCorrect: false },
          { id: 'opt_4', text: 'Giấy lọc đặt trong phễu lọc thường', isCorrect: false }
        ],
        explanation: 'SGK trang 8: Phễu chiết chuyên dùng để tách các chất lỏng không hoà tan vào nhau và phân thành các lớp riêng biệt.'
      },
      {
        id: 'iq_1_3_2',
        question: 'Tại sao kim loại Natri (Na) bắt buộc phải ngâm chìm trong dầu hoả khan?',
        options: [
          { id: 'opt_1', text: 'Để hoà tan Natri thành dung dịch bôi trơn', isCorrect: false },
          { id: 'opt_2', text: 'Để ngăn Natri tiếp xúc với oxy và hơi nước trong không khí', isCorrect: true },
          { id: 'opt_3', text: 'Để làm tăng độ cứng và độ bóng kim loại của Natri', isCorrect: false },
          { id: 'opt_4', text: 'Để làm giảm nhiệt độ nóng chảy của kim loại Natri', isCorrect: false }
        ],
        explanation: 'Natri có tính khử rất mạnh, phản ứng nổ với nước và oxy ẩm trong không khí nên bắt buộc phải ngâm ngập trong dầu hoả khan.'
      }
    ]
  },

  topic_1_4: {
    hierarchy: {
      romanHeader: 'II. THUYẾT TRÌNH MỘT VẤN ĐỀ KHOA HỌC',
      subHeader: '1. Viết báo cáo khoa học',
      subItems: [
        'a) Cấu trúc chuẩn 8 phần của một báo cáo khoa học',
        'b) Nguyên tắc trung thực khi trình bày số liệu thực nghiệm',
        'c) Phân biệt rành mạch giữa phần "Kết quả" và phần "Thảo luận"'
      ]
    },
    tableOrDiagram: {
      title: 'Cấu trúc chuẩn 8 phần của Báo cáo nghiên cứu khoa học (SGK trang 10)',
      headers: ['Thứ tự', 'Tên phần', 'Nội dung cốt lõi bắt buộc'],
      rows: [
        ['1', 'Tiêu đề', 'Ngắn gọn, phản ánh chính xác mục tiêu nghiên cứu'],
        ['2', 'Tóm tắt', 'Khái quát mục tiêu, phương pháp và kết quả chính trong 100-150 từ'],
        ['3', 'Giới thiệu', 'Lí do chọn đề tài, giả thuyết khoa học đặt ra'],
        ['4', 'Phương pháp', 'Mô tả dụng cụ, hoá chất, tiến trình thí nghiệm để người khác lặp lại được'],
        ['5', 'Kết quả', 'Số liệu, bảng biểu, đồ thị trung thực thu được từ thực nghiệm'],
        ['6', 'Thảo luận', 'Phân tích nguyên nhân khoa học, giải thích sai số, so sánh với giả thuyết'],
        ['7', 'Kết luận', 'Khẳng định câu trả lời cho câu hỏi nghiên cứu ban đầu'],
        ['8', 'Tài liệu tham khảo', 'Liệt kê sách, bài báo khoa học đã trích dẫn theo đúng quy cách']
      ]
    },
    warningNote: '⚠ LƯU Ý PHÂN BIỆT RÀNH MẠCH: Tuyệt đối không đưa nhận xét chủ quan hoặc suy đoán nguyên nhân vào phần "Kết quả". Phần Kết quả chỉ ghi nhận trung thực số liệu thô và đồ thị. Toàn bộ phần lập luận giải thích "vì sao" bắt buộc phải nằm ở phần "Thảo luận"!',
    exampleDetail: {
      type: 'phenomenon',
      title: 'Mẫu phân tích phần Thảo luận báo cáo Khúc xạ ánh sáng',
      givenOrPhenomenon: 'Học sinh đo được tỉ số sin(i) / sin(r) qua 5 lần đo lần lượt là 1,48; 1,51; 1,49; 1,52; 1,50. Giá trị trung bình n = 1,50.',
      stepsOrExplanation: 'Trong phần Thảo luận: Nhận xét các giá trị đo dao động quanh mức 1,50; giải thích sai số ±0,02 xuất phát từ bề rộng chùm laser và độ tinh chỉnh trên đĩa chia độ; so sánh thấy kết quả này hoàn toàn phù hợp với chiết suất chuẩn của thuỷ tinh trong SGK.',
      resultOrTakeaway: 'Khẳng định giả thuyết khúc xạ được chứng minh bằng thực nghiệm với độ tin cậy khoa học cao.'
    },
    interactiveQuizzes: [
      {
        id: 'iq_1_4_1',
        question: 'Phần nào trong bản báo cáo khoa học có nhiệm vụ phân tích nguyên nhân và giải thích nguồn gốc sai số?',
        options: [
          { id: 'opt_1', text: 'Phần Tiêu đề và Tóm tắt', isCorrect: false },
          { id: 'opt_2', text: 'Phần Thảo luận (Discussion)', isCorrect: true },
          { id: 'opt_3', text: 'Phần Tài liệu tham khảo', isCorrect: false },
          { id: 'opt_4', text: 'Phần Dụng cụ và Hoá chất', isCorrect: false }
        ],
        explanation: 'SGK trang 10: Phần Thảo luận là nơi phân tích số liệu, bàn luận về độ tin cậy và giải thích cơ chế khoa học của kết quả.'
      }
    ]
  },

  topic_1_5: {
    hierarchy: {
      romanHeader: 'II. THUYẾT TRÌNH MỘT VẤN ĐỀ KHOA HỌC',
      subHeader: '2. Thuyết trình một vấn đề khoa học',
      subItems: [
        'a) Thiết kế slide thuyết trình theo quy tắc 70/30',
        'b) Bố cục Poster khoa học khổ A0 hoặc A1 tiêu chuẩn quốc tế',
        'c) Kĩ năng trình bày, tương tác mắt và văn hoá tranh biện khoa học'
      ]
    },
    tableOrDiagram: {
      title: 'Quy chuẩn Poster và Slide báo cáo khoa học SGK trang 12–14',
      headers: ['Hình thức', 'Kích thước / Tỉ lệ', 'Quy tắc hiển thị chuẩn mực'],
      rows: [
        ['Poster treo tường', 'Khổ A0 (841 × 1189 mm) hoặc A1', 'Bố cục 3 cột dọc; tiêu đề đọc từ 3m, chữ đọc từ 1,5m'],
        ['Slide trình chiếu', 'Màn hình tỉ lệ 16:9', 'Quy tắc 70% hình ảnh / sơ đồ trực quan, 30% văn bản tóm tắt'],
        ['Thời lượng báo cáo', 'Khoảng 7 đến 10 phút', 'Trình bày 7 phút, dành 3–5 phút tiếp thu và trả lời phản biện']
      ]
    },
    warningNote: '⚠ LƯU Ý KHI THUYẾT TRÌNH: Tránh tuyệt đối lỗi "đọc chép" nguyên văn văn bản trên slide. Người thuyết trình cần dùng slide làm điểm tựa trực quan để tương tác mắt (eye contact) với người nghe và diễn giải bằng lời nói tự nhiên của mình!',
    exampleDetail: {
      type: 'phenomenon',
      title: 'Bố cục 3 cột của Poster khoa học chuẩn A0',
      givenOrPhenomenon: 'Học sinh trình bày đề tài "Chế tạo xe thế năng từ vật liệu tái chế" trên poster khổ A0.',
      stepsOrExplanation: 'Cột 1: Đặt vấn đề, mục tiêu, câu hỏi nghiên cứu. Cột 2: Sơ đồ thiết kế xe, bảng số liệu quãng đường xe chạy theo độ cao dốc thả. Cột 3: Phân tích cơ chế chuyển hoá thế năng thành động năng, kết luận và hướng phát triển.',
      resultOrTakeaway: 'Người xem nắm bắt toàn bộ công trình nghiên cứu chỉ trong 3-5 phút quan sát poster.'
    },
    interactiveQuizzes: [
      {
        id: 'iq_1_5_1',
        question: 'Kích thước tiêu chuẩn quốc tế quy định cho một Poster báo cáo khoa học treo tường là khổ giấy nào?',
        options: [
          { id: 'opt_1', text: 'Khổ A4 hoặc A3 thông thường', isCorrect: false },
          { id: 'opt_2', text: 'Khổ A0 hoặc A1 tiêu chuẩn', isCorrect: true },
          { id: 'opt_3', text: 'Khổ tự do không có quy định', isCorrect: false },
          { id: 'opt_4', text: 'Khổ A5 dạng sổ tay bỏ túi', isCorrect: false }
        ],
        explanation: 'SGK trang 13 quy định: Poster khoa học chuẩn có kích thước khổ A0 hoặc A1 để đảm bảo người xem đọc rõ từ khoảng cách 1 đến 1,5 mét.'
      }
    ]
  },

  // ==========================================
  // BÀI 2: ĐỘNG NĂNG. THẾ NĂNG
  // ==========================================
  topic_2_1: {
    hierarchy: {
      romanHeader: 'I. ĐỘNG NĂNG',
      subHeader: '1. Khái niệm động năng',
      subItems: [
        'a) Định nghĩa động năng của vật chuyển động',
        'b) Đơn vị đo động năng trong hệ SI: Jun (kí hiệu: J)',
        'c) Phân biệt vật có động năng và vật đứng yên'
      ]
    },
    tableOrDiagram: {
      title: 'Ví dụ các vật có động năng trong tự nhiên và đời sống',
      headers: ['Vật thể', 'Trạng thái chuyển động', 'Dạng năng lượng'],
      rows: [
        ['Viên bi sắt đang lăn', 'Chuyển động trên mặt phẳng ngang', 'Mang động năng (Wđ > 0)'],
        ['Chiếc búa đang giáng xuống', 'Chuyển động nhanh dần về phía cọc', 'Động năng chuyển thành công đóng đinh'],
        ['Hòn đá nằm yên trên đồi', 'Đứng yên bất động (v = 0)', 'Không có động năng (Wđ = 0)'],
        ['Dòng nước lũ cuồn cuộn', 'Khối lượng lớn, vận tốc chảy xiết', 'Động năng cực lớn gây xói mòn']
      ]
    },
    warningNote: '⚠ LƯU Ý CỐT LÕI: Vật đứng yên có vận tốc v = 0 thì động năng của vật luôn bằng 0, bất kể khối lượng của vật lớn đến mức nào!',
    exampleDetail: {
      type: 'phenomenon',
      title: 'Hiện tượng búa giáng vào đinh (SGK trang 15)',
      givenOrPhenomenon: 'Khi người thợ vung búa đập mạnh vào đầu đinh đóng vào khúc gỗ.',
      stepsOrExplanation: 'Khi búa đang rơi với vận tốc v, búa mang động năng. Khi va chạm với đầu đinh, búa tác dụng lực mạnh làm đinh dịch chuyển lún sâu vào thân gỗ, tức là búa đã thực hiện công cơ học nhờ có động năng.',
      resultOrTakeaway: 'Chứng minh: Năng lượng mà vật có được do chuyển động chính là động năng.'
    },
    simObservation: {
      title: 'Mô phỏng: Động năng viên bi trên máng nghiêng',
      instruction: 'Chọn khối lượng viên bi và thả từ đỉnh dốc để quan sát quãng đường khối gỗ bị xô trượt.',
      observationQuestion: 'Nhờ đâu ta nhận biết được viên bi có động năng lớn hay nhỏ khi đến chân dốc?',
      observationAnswer: 'Nhờ quãng đường s mà khối gỗ bị viên bi đẩy trượt: trượt càng xa chứng tỏ động năng viên bi càng lớn.'
    },
    interactiveQuizzes: [
      {
        id: 'iq_2_1_1',
        question: 'Vật nào dưới đây KHÔNG mang động năng?',
        options: [
          { id: 'opt_1', text: 'Một chiếc máy bay đang bay trên bầu trời', isCorrect: false },
          { id: 'opt_2', text: 'Một quả bóng đang nằm yên trên mặt đất', isCorrect: true },
          { id: 'opt_3', text: 'Một giọt mưa đang rơi trong không khí', isCorrect: false },
          { id: 'opt_4', text: 'Một viên đạn đang bay về phía bia', isCorrect: false }
        ],
        explanation: 'Quả bóng nằm yên có vận tốc v = 0 nên Wđ = 0 (không có động năng).'
      }
    ]
  },

  topic_2_2: {
    hierarchy: {
      romanHeader: 'I. ĐỘNG NĂNG',
      subHeader: '2. Thí nghiệm về động năng (Hình 2.1 SGK trang 16)',
      subItems: [
        'a) Khảo sát ảnh hưởng của tốc độ đến động năng',
        'b) Khảo sát ảnh hưởng của khối lượng đến động năng',
        'c) Kết luận định tính về động năng'
      ]
    },
    tableOrDiagram: {
      title: 'Bảng số liệu thực nghiệm máng nghiêng Hình 2.1 SGK',
      headers: ['Lần thí nghiệm', 'Khối lượng bi (m)', 'Độ cao thả (h)', 'Vận tốc chân dốc (v)', 'Quãng đường gỗ trượt (s)'],
      rows: [
        ['Thí nghiệm 1', 'm = 50 g', 'h1 = 10 cm', 'v1 = 1,4 m/s', 's1 = 8 cm'],
        ['Thí nghiệm 2', 'm = 50 g', 'h2 = 20 cm (cao hơn)', 'v2 = 2,0 m/s (nhanh hơn)', 's2 = 16 cm (xa hơn gấp đôi)'],
        ['Thí nghiệm 3', 'm = 100 g (nặng gấp đôi)', 'h1 = 10 cm', 'v1 = 1,4 m/s', 's3 = 16 cm (xa hơn gấp đôi)']
      ]
    },
    warningNote: '⚠ LƯU Ý THỰC NGHIỆM: Trong thí nghiệm máng nghiêng, độ nhám của mặt sàn và vị trí đặt miếng gỗ phải được giữ nguyên hoàn toàn giữa các lần thả bi để đảm bảo lực ma sát cản trở là không đổi!',
    exampleDetail: {
      type: 'phenomenon',
      title: 'Phân tích thí nghiệm máng nghiêng SGK trang 16',
      givenOrPhenomenon: 'Thả bi thép từ độ cao h lăn xuống va chạm vào miếng gỗ trên máng ngang.',
      stepsOrExplanation: 'Khi tăng độ cao h, thế năng biến đổi thành vận tốc v lớn hơn ở chân dốc, miếng gỗ bị xô đi xa hơn. Khi tăng khối lượng m ở cùng độ cao h, miếng gỗ cũng bị xô xa hơn.',
      resultOrTakeaway: 'Động năng của vật càng lớn khi khối lượng của vật càng lớn và tốc độ chuyển động của vật càng lớn.'
    },
    interactiveQuizzes: [
      {
        id: 'iq_2_2_1',
        question: 'Động năng của một vật phụ thuộc vào hai yếu tố nào sau đây?',
        options: [
          { id: 'opt_1', text: 'Khối lượng và hình dáng của vật thể', isCorrect: false },
          { id: 'opt_2', text: 'Khối lượng và tốc độ chuyển động của vật', isCorrect: true },
          { id: 'opt_3', text: 'Thể tích và nhiệt độ bề mặt của vật', isCorrect: false },
          { id: 'opt_4', text: 'Vận tốc và chất liệu làm nên vật', isCorrect: false }
        ],
        explanation: 'SGK trang 16 kết luận: Động năng của vật phụ thuộc vào khối lượng và tốc độ của vật.'
      }
    ]
  },

  topic_2_3: {
    hierarchy: {
      romanHeader: 'I. ĐỘNG NĂNG',
      subHeader: '3. Công thức tính động năng',
      subItems: [
        'a) Biểu thức toán học của động năng: Wđ = 1/2 · m · v²',
        'b) Đơn vị đo chuẩn SI và quy đổi km/h sang m/s',
        'c) Ứng dụng giải thích khoảng cách an toàn giao thông'
      ]
    },
    formula: {
      title: 'Công thức tính Động năng (SGK KHTN 9 trang 17)',
      formula: 'W_đ = \\frac{1}{2} m v^2',
      explanation: 'Động năng tỉ lệ thuận với khối lượng m và tỉ lệ với BÌNH PHƯƠNG vận tốc v² của vật.',
      variables: [
        { symbol: 'W_đ', name: 'Động năng của vật', unit: 'Jun (J)' },
        { symbol: 'm', name: 'Khối lượng của vật', unit: 'kilôgam (kg)' },
        { symbol: 'v', name: 'Tốc độ chuyển động của vật', unit: 'mét trên giây (m/s)' }
      ]
    },
    warningNote: '⚠ LƯU Ý ĐỔI ĐƠN VỊ KHI TÍNH TOÁN: Trong công thức Wđ = 1/2 m v², vận tốc BẮT BUỘC phải đổi ra đơn vị m/s. Nếu đề bài cho km/h, ta phải chia cho 3,6 (ví dụ: 72 km/h = 72 / 3,6 = 20 m/s; 54 km/h = 15 m/s; 36 km/h = 10 m/s). Khối lượng bắt buộc đổi ra kg (1 tấn = 1000 kg)!',
    exampleDetail: {
      type: 'problem',
      title: 'Bài toán tính động năng xe ô tô trên cao tốc (SGK trang 17)',
      givenOrPhenomenon: 'Một chiếc ô tô có khối lượng m = 1 500 kg đang chạy với tốc độ v = 72 km/h trên quốc lộ.',
      stepsOrExplanation: '1. Đổi đơn vị vận tốc sang chuẩn SI: v = 72 km/h = 72 / 3,6 = 20 m/s.\n2. Áp dụng công thức tính động năng: Wđ = 1/2 · m · v² = 1/2 · 1 500 · 20² = 750 · 400 = 300 000 J = 300 kJ.',
      resultOrTakeaway: 'Động năng của ô tô là 300 kJ (300 000 Jun).'
    },
    interactiveQuizzes: [
      {
        id: 'iq_2_3_1',
        question: 'Khi tốc độ của một vật tăng lên gấp 3 lần thì động năng của vật đó thay đổi như thế nào?',
        options: [
          { id: 'opt_1', text: 'Động năng tăng lên gấp 3 lần', isCorrect: false },
          { id: 'opt_2', text: 'Động năng tăng lên gấp 9 lần (3² = 9)', isCorrect: true },
          { id: 'opt_3', text: 'Động năng tăng lên gấp 6 lần', isCorrect: false },
          { id: 'opt_4', text: 'Động năng không đổi vì khối lượng giữ nguyên', isCorrect: false }
        ],
        explanation: 'Vì Wđ tỉ lệ với bình phương vận tốc v² nên khi v tăng 3 lần, Wđ tăng 3² = 9 lần.'
      },
      {
        id: 'iq_2_3_2',
        question: 'Một vật có khối lượng m = 2 kg đang chuyển động với tốc độ v = 4 m/s. Động năng của vật là bao nhiêu?',
        options: [
          { id: 'opt_1', text: '8 Jun (J)', isCorrect: false },
          { id: 'opt_2', text: '16 Jun (J)', isCorrect: true },
          { id: 'opt_3', text: '32 Jun (J)', isCorrect: false },
          { id: 'opt_4', text: '4 Jun (J)', isCorrect: false }
        ],
        explanation: 'Áp dụng Wđ = 1/2 · m · v² = 1/2 · 2 · 4² = 1 · 16 = 16 J.'
      }
    ]
  },

  topic_2_4: {
    hierarchy: {
      romanHeader: 'II. THẾ NĂNG',
      subHeader: '1. Khái niệm thế năng trọng trường',
      subItems: [
        'a) Năng lượng tương tác giữa vật và Trái Đất',
        'b) Sự phụ thuộc vào khối lượng và độ cao so với mốc',
        'c) Ứng dụng thế năng trong nhà máy thuỷ điện'
      ]
    },
    tableOrDiagram: {
      title: 'Đặc điểm thế năng trọng trường trong tự nhiên',
      headers: ['Trường hợp', 'Độ cao h so với mốc', 'Giá trị thế năng Wt'],
      rows: [
        ['Vật ở trên cao so với mặt đất', 'h > 0', 'Wt > 0 (mang thế năng dương)'],
        ['Vật nằm ngay tại mặt đất (chọn làm mốc)', 'h = 0', 'Wt = 0 (thế năng bằng không)'],
        ['Vật ở dưới đáy giếng sâu so với mặt đất', 'h < 0', 'Wt < 0 (thế năng mang dấu âm)'],
        ['Hồ nước trên đập thuỷ điện 150m', 'h rất lớn', 'Thế năng khổng lồ làm quay tuabin']
      ]
    },
    warningNote: '⚠ LƯU Ý VỀ MỐC THẾ NĂNG: Thế năng trọng trường có tính tương đối. Giá trị của thế năng phụ thuộc vào vị trí được chọn làm mốc tính thế năng (thông thường người ta chọn mặt đất làm mốc thế năng).',
    exampleDetail: {
      type: 'phenomenon',
      title: 'Ứng dụng thế năng tại Đập thuỷ điện Hoà Bình',
      givenOrPhenomenon: 'Hàng triệu mét khối nước được tích trữ trên hồ chứa nhân tạo ở độ cao hơn 100m so với lòng sông.',
      stepsOrExplanation: 'Khối nước trên cao sở hữu thế năng trọng trường cực lớn. Khi mở cửa xả, nước đổ ào xuống dưới, thế năng chuyển hoá thành dòng động năng khổng lồ đẩy các cánh tuabin quay tròn, kéo máy phát điện sản xuất ra điện năng phục vụ cả nước.',
      resultOrTakeaway: 'Thế năng trọng trường là nguồn năng lượng tái tạo sạch quan trọng bậc nhất của quốc gia.'
    },
    simObservation: {
      title: 'Mô phỏng: Thế năng vật nặng rơi tự do',
      instruction: 'Thay đổi độ cao nâng vật và thả cho vật rơi tự do xuống nền cát để quan sát độ lún.',
      observationQuestion: 'Độ lún của cát biểu thị đại lượng nào của vật nặng?',
      observationAnswer: 'Độ lún biểu thị công mà vật thực hiện được khi rơi xuống, tỉ lệ thuận với thế năng ban đầu của vật.'
    },
    interactiveQuizzes: [
      {
        id: 'iq_2_4_1',
        question: 'Đại lượng nào quyết định giá trị thế năng trọng trường có thể mang giá trị âm, dương hoặc bằng 0?',
        options: [
          { id: 'opt_1', text: 'Vị trí được chọn làm mốc tính thế năng', isCorrect: true },
          { id: 'opt_2', text: 'Khối lượng của vật thể chuyển động', isCorrect: false },
          { id: 'opt_3', text: 'Vận tốc chuyển động tức thời của vật', isCorrect: false },
          { id: 'opt_4', text: 'Chất liệu làm nên bề mặt vật thể', isCorrect: false }
        ],
        explanation: 'SGK trang 18: Thế năng phụ thuộc vào vị trí chọn làm mốc. Ở trên mốc Wt > 0, tại mốc Wt = 0, dưới mốc Wt < 0.'
      }
    ]
  },

  topic_2_5: {
    hierarchy: {
      romanHeader: 'II. THẾ NĂNG',
      subHeader: '2. Công thức tính thế năng trọng trường',
      subItems: [
        'a) Biểu thức toán học: Wt = P · h = m · g · h',
        'b) Mối liên hệ giữa trọng lượng P và khối lượng m (P = 10m)',
        'c) Bài tập định lượng tính thế năng'
      ]
    },
    formula: {
      title: 'Công thức tính Thế năng trọng trường (SGK KHTN 9 trang 18)',
      formula: 'W_t = P \\cdot h = m \\cdot g \\cdot h',
      explanation: 'Thế năng trọng trường tỉ lệ thuận với trọng lượng P (hoặc khối lượng m) và độ cao h của vật so với mốc thế năng.',
      variables: [
        { symbol: 'W_t', name: 'Thế năng trọng trường', unit: 'Jun (J)' },
        { symbol: 'P', name: 'Trọng lượng của vật (P = 10m)', unit: 'Niutơn (N)' },
        { symbol: 'm', name: 'Khối lượng của vật', unit: 'kilôgam (kg)' },
        { symbol: 'h', name: 'Độ cao so với mốc thế năng', unit: 'mét (m)' }
      ]
    },
    warningNote: '⚠ LƯU Ý KHI TÍNH TOÁN: Khi tính thế năng, nếu đề bài không nói gì thêm, ta mặc định lấy g = 10 m/s² (tương đương P = 10 · m). Độ cao h bắt buộc phải tính bằng đơn vị mét (m)!',
    exampleDetail: {
      type: 'problem',
      title: 'Bài toán tính thế năng kiện hàng nâng bằng cần cẩu',
      givenOrPhenomenon: 'Một kiện hàng nặng m = 500 kg được cần cẩu nâng lên độ cao h = 12 m so với mặt đất (lấy g = 10 m/s²).',
      stepsOrExplanation: '1. Tính trọng lượng của kiện hàng: P = 10 · m = 10 · 500 = 5 000 N.\n2. Áp dụng công thức tính thế năng trọng trường: Wt = P · h = 5 000 · 12 = 60 000 J = 60 kJ.',
      resultOrTakeaway: 'Thế năng trọng trường của kiện hàng tại độ cao 12m là 60 kJ.'
    },
    interactiveQuizzes: [
      {
        id: 'iq_2_5_1',
        question: 'Một chậu hoa có khối lượng m = 3 kg đặt trên lan can tầng 3 cao h = 10 m so với mặt đất (lấy g = 10 m/s²). Thế năng trọng trường của chậu hoa so với mặt đất là:',
        options: [
          { id: 'opt_1', text: '30 Jun (J)', isCorrect: false },
          { id: 'opt_2', text: '300 Jun (J)', isCorrect: true },
          { id: 'opt_3', text: '150 Jun (J)', isCorrect: false },
          { id: 'opt_4', text: '600 Jun (J)', isCorrect: false }
        ],
        explanation: 'Áp dụng Wt = m · g · h = 3 · 10 · 10 = 300 J.'
      }
    ]
  },

  // ==========================================
  // BÀI 3: CƠ NĂNG
  // ==========================================
  top_3_1: {
    hierarchy: {
      romanHeader: 'I. CƠ NĂNG VÀ SỰ BẢO TOÀN CƠ NĂNG',
      subHeader: '1. Khái niệm cơ năng của một vật',
      subItems: [
        'a) Định nghĩa cơ năng là tổng động năng và thế năng',
        'b) Biểu thức: Wc = Wđ + Wt',
        'c) Đơn vị đo cơ năng trong hệ SI: Jun (kí hiệu: J)'
      ]
    },
    formula: {
      title: 'Biểu thức xác định Cơ năng (SGK KHTN 9 trang 18)',
      formula: 'W_c = W_đ + W_t = \\frac{1}{2} m v^2 + m g h',
      explanation: 'Tổng động năng và thế năng của một vật thể được gọi là cơ năng của vật đó.',
      variables: [
        { symbol: 'W_c', name: 'Cơ năng của vật', unit: 'Jun (J)' },
        { symbol: 'W_đ', name: 'Động năng của vật', unit: 'Jun (J)' },
        { symbol: 'W_t', name: 'Thế năng trọng trường của vật', unit: 'Jun (J)' }
      ]
    },
    warningNote: '⚠ LƯU Ý PHÂN BIỆT: Một vật có thể vừa có động năng, vừa có thế năng tại cùng một thời điểm (ví dụ: máy bay đang bay trên bầu trời, con chim đang sải cánh, giọt nước mưa đang rơi). Khi đó cơ năng là tổng số của cả hai dạng năng lượng!',
    exampleDetail: {
      type: 'problem',
      title: 'Tính cơ năng của một chú chim đang bay (SGK trang 18)',
      givenOrPhenomenon: 'Một chú chim có khối lượng m = 0,5 kg đang bay ở độ cao h = 20 m với tốc độ v = 10 m/s (lấy g = 10 m/s²).',
      stepsOrExplanation: '1. Tính động năng của chú chim: Wđ = 1/2 · m · v² = 1/2 · 0,5 · 10² = 25 J.\n2. Tính thế năng của chú chim: Wt = m · g · h = 0,5 · 10 · 20 = 100 J.\n3. Tính tổng cơ năng: Wc = Wđ + Wt = 25 + 100 = 125 J.',
      resultOrTakeaway: 'Tổng cơ năng của chú chim là 125 Jun (J).'
    },
    simObservation: {
      title: 'Mô phỏng: Sự bảo toàn cơ năng của vật ném lên',
      instruction: 'Nhấn nút ném quả bóng và quan sát hai thanh biểu đồ năng lượng màu đỏ (động năng) và xanh (thế năng).',
      observationQuestion: 'Khi quả bóng bay lên cao dần, biểu đồ động năng và thế năng thay đổi ra sao?',
      observationAnswer: 'Thanh thế năng tăng dần, thanh động năng tụt lùi dần, nhưng tổng độ cao của hai thanh (cơ năng) luôn không đổi!'
    },
    interactiveQuizzes: [
      {
        id: 'iq_3_1_1',
        question: 'Phát biểu nào sau đây định nghĩa chính xác nhất về cơ năng của một vật theo SGK KHTN 9?',
        options: [
          { id: 'opt_1', text: 'Cơ năng là tổng động năng và thế năng của vật đó', isCorrect: true },
          { id: 'opt_2', text: 'Cơ năng là hiệu số giữa động năng trừ đi thế năng', isCorrect: false },
          { id: 'opt_3', text: 'Cơ năng là năng lượng nhiệt toả ra do ma sát', isCorrect: false },
          { id: 'opt_4', text: 'Cơ năng chỉ xuất hiện khi vật đứng yên trên đỉnh đồi', isCorrect: false }
        ],
        explanation: 'SGK trang 18: Tổng động năng và thế năng của một vật được gọi là cơ năng của vật đó.'
      }
    ]
  },

  top_3_2: {
    hierarchy: {
      romanHeader: 'I. CƠ NĂNG VÀ SỰ BẢO TOÀN CƠ NĂNG',
      subHeader: '2. Sự chuyển hoá giữa động năng và thế năng',
      subItems: [
        'a) Chuyển động của quả bóng ném thẳng đứng lên cao và rơi xuống',
        'b) Khảo sát dao động của con lắc đơn (Hình 3.2 SGK trang 19)',
        'c) Sự biến thiên qua lại giữa độ cao h và vận tốc v'
      ]
    },
    tableOrDiagram: {
      title: 'Chu trình chuyển hoá năng lượng của con lắc đơn Hình 3.2 SGK',
      headers: ['Vị trí', 'Độ cao (h)', 'Vận tốc (v)', 'Động năng (Wđ)', 'Thế năng (Wt)'],
      rows: [
        ['Vị trí biên A (cao nhất)', 'Cực đại (h_max)', 'Bằng 0 (v = 0)', 'Wđ = 0', 'Wt cực đại (Wt_max)'],
        ['Đi từ A xuống vị trí O', 'Giảm dần', 'Tăng dần', 'Tăng dần', 'Giảm dần (Wt ➔ Wđ)'],
        ['Vị trí cân bằng O (thấp nhất)', 'Bằng 0 (h = 0)', 'Cực đại (v_max)', 'Wđ cực đại (Wđ_max)', 'Wt = 0'],
        ['Đi từ O lên vị trí biên B', 'Tăng dần', 'Giảm dần', 'Giảm dần', 'Tăng dần (Wđ ➔ Wt)'],
        ['Vị trí biên B (đối diện)', 'Cực đại (h_max)', 'Bằng 0 (v = 0)', 'Wđ = 0', 'Wt cực đại (Wt_max)']
      ]
    },
    warningNote: '⚠ LƯU Ý KHI DAO ĐỘNG: Tại vị trí biên (cao nhất), vật đổi chiều chuyển động nên vận tốc tức thời bằng 0, động năng bằng 0, toàn bộ cơ năng là thế năng. Tại vị trí cân bằng (thấp nhất), độ cao bằng 0, toàn bộ cơ năng là động năng cực đại!',
    exampleDetail: {
      type: 'phenomenon',
      title: 'Quá trình rơi của búa máy đóng cọc bê tông (SGK trang 18)',
      givenOrPhenomenon: 'Đầu búa được kéo lên cao 5 mét rồi thả rơi tự do trúng vào đầu cọc bê tông.',
      stepsOrExplanation: 'Ở đỉnh cao 5m: búa có thế năng cực đại, động năng bằng 0. Khi rơi xuống: độ cao giảm khiến thế năng giảm, vận tốc tăng nhanh khiến động năng tăng. Ngay trước khi va chạm: toàn bộ thế năng đã chuyển hoá thành động năng khổng lồ truyền xung lực đóng cọc ngập sâu vào lòng đất.',
      resultOrTakeaway: 'Minh chứng cho sự chuyển hoá hoàn hảo từ thế năng sang động năng.'
    },
    interactiveQuizzes: [
      {
        id: 'iq_3_2_1',
        question: 'Trong dao động của con lắc đơn bỏ qua ma sát, tại vị trí cân bằng O (vị trí thấp nhất), đại lượng nào đạt cực đại?',
        options: [
          { id: 'opt_1', text: 'Thế năng của con lắc đạt giá trị cực đại', isCorrect: false },
          { id: 'opt_2', text: 'Động năng của con lắc đạt giá trị cực đại', isCorrect: true },
          { id: 'opt_3', text: 'Cả động năng và thế năng đều bằng 0', isCorrect: false },
          { id: 'opt_4', text: 'Gia tốc trọng trường biến mất hoàn toàn', isCorrect: false }
        ],
        explanation: 'Tại vị trí thấp nhất O, toàn bộ thế năng đã chuyển hoá thành động năng nên vận tốc và động năng đạt giá trị cực đại.'
      }
    ]
  },

  top_3_3: {
    hierarchy: {
      romanHeader: 'I. CƠ NĂNG VÀ SỰ BẢO TOÀN CƠ NĂNG',
      subHeader: '3. Định luật bảo toàn cơ năng',
      subItems: [
        'a) Nội dung định luật bảo toàn cơ năng khi bỏ qua ma sát',
        'b) Hệ thức: Wc = Wđ + Wt = hằng số (W1 = W2)',
        'c) Ảnh hưởng của lực cản và ma sát trong thực tế'
      ]
    },
    formula: {
      title: 'Hệ thức Định luật Bảo toàn Cơ năng (SGK KHTN 9 trang 19)',
      formula: 'W_c = W_đ + W_t = \\text{const} \\iff \\frac{1}{2} m v_1^2 + m g h_1 = \\frac{1}{2} m v_2^2 + m g h_2',
      explanation: 'Khi một vật chuyển động trong trọng trường chỉ chịu tác dụng của trọng lực (bỏ qua ma sát), cơ năng của vật là một đại lượng bảo toàn.',
      variables: [
        { symbol: 'W_1', name: 'Cơ năng tại vị trí ban đầu 1', unit: 'Jun (J)' },
        { symbol: 'W_2', name: 'Cơ năng tại vị trí sau 2', unit: 'Jun (J)' }
      ]
    },
    warningNote: '⚠ LƯU Ý ĐIỀU KIỆN ÁP DỤNG: Định luật bảo toàn cơ năng CHỈ ĐÚNG khi bỏ qua ma sát và lực cản của môi trường. Trong thực tế luôn có lực ma sát, một phần cơ năng sẽ chuyển hoá thành nhiệt năng làm vật nóng lên và cơ năng giảm dần (dao động tắt dần)!',
    exampleDetail: {
      type: 'problem',
      title: 'Tính vận tốc của vật khi chạm đất bằng bảo toàn cơ năng',
      givenOrPhenomenon: 'Thả một vật rơi tự do từ độ cao h = 20 m xuống đất (lấy g = 10 m/s², bỏ qua sức cản không khí).',
      stepsOrExplanation: '1. Cơ năng tại vị trí thả (A): Vật thả nhẹ nên v_A = 0 ➔ W_A = Wt_A = m · g · h = m · 10 · 20 = 200 · m.\n2. Cơ năng tại mặt đất (B): h_B = 0 ➔ W_B = Wđ_B = 1/2 · m · v_B².\n3. Áp dụng bảo toàn cơ năng (W_A = W_B): 200 · m = 1/2 · m · v_B² ➔ v_B² = 400 ➔ v_B = 20 m/s.',
      resultOrTakeaway: 'Vận tốc chạm đất của vật là v = 20 m/s (không phụ thuộc vào khối lượng của vật).'
    },
    interactiveQuizzes: [
      {
        id: 'iq_3_3_1',
        question: 'Khi nào cơ năng của một vật chuyển động trong trọng trường được bảo toàn hoàn toàn?',
        options: [
          { id: 'opt_1', text: 'Khi vật chuyển động nhanh dần đều', isCorrect: false },
          { id: 'opt_2', text: 'Khi chỉ có trọng lực tác dụng lên vật (bỏ qua ma sát và lực cản)', isCorrect: true },
          { id: 'opt_3', text: 'Khi vật vừa chịu tác dụng của lực cản không khí cực mạnh', isCorrect: false },
          { id: 'opt_4', text: 'Khi khối lượng của vật liên tục biến đổi', isCorrect: false }
        ],
        explanation: 'SGK trang 19: Khi một vật chỉ chịu tác dụng của trọng lực, cơ năng của vật được bảo toàn.'
      }
    ]
  },

  top_3_4: {
    hierarchy: {
      romanHeader: 'II. VẬN DỤNG CƠ NĂNG TRONG ĐỜI SỐNG',
      subHeader: '1. Vận dụng thực tiễn & Kĩ thuật',
      subItems: [
        'a) Ứng dụng nguyên lí thế năng chế tạo xe đồ chơi thế năng (SGK trang 20)',
        'b) Kĩ thuật chạy đà và giậm nhảy trong môn nhảy xa thể thao',
        'c) Khắc phục tiêu hao cơ năng trong máy móc và thiết bị'
      ]
    },
    tableOrDiagram: {
      title: 'Vận dụng cơ năng trong đời sống và thể thao',
      headers: ['Lĩnh vực', 'Hiện tượng / Thiết bị', 'Bản chất vật lí'],
      rows: [
        ['Thể thao nhảy xa', 'Vận động viên chạy đà thật nhanh rồi bật cao', 'Tích luỹ động năng lớn kết hợp thế năng bật nhảy'],
        ['Trò chơi xe thế năng', 'Quả nặng rơi xuống làm quay trục bánh xe', 'Chuyển hoá thế năng của quả nặng thành động năng xe'],
        ['Tàu lượn siêu tốc', 'Kéo tàu lên dốc cao nhất rồi thả trôi lượn vòng', 'Thế năng ở đỉnh dốc chuyển hoá thành động năng lộn nhào']
      ]
    },
    warningNote: '⚠ LƯU Ý KĨ THUẬT NHẢY XA: Để đạt thành tích xa nhất, vận động viên không chỉ chạy đà nhanh (tạo động năng) mà còn phải bật giậm nhảy lên cao (tạo thế năng kéo dài thời gian bay trên không với góc giậm tối ưu 40°–45°)!',
    exampleDetail: {
      type: 'phenomenon',
      title: 'Cơ chế hoạt động của xe thế năng (Hình 3.3 SGK trang 20)',
      givenOrPhenomenon: 'Chiếc xe đồ chơi có gắn một sợi dây vắt qua ròng rọc buộc vào vật nặng m.',
      stepsOrExplanation: 'Khi nâng vật nặng lên cao, hệ có thế năng trọng trường. Khi thả tay, vật nặng rơi xuống kéo sợi dây làm trục bánh xe quay tròn, chiếc xe chạy tiến về phía trước. Thế năng của vật nặng đã chuyển hoá thành động năng của toàn bộ chiếc xe.',
      resultOrTakeaway: 'Mô hình chứng minh chuyển hoá cơ năng ứng dụng trong kĩ thuật chế tạo robot và xe tự hành.'
    },
    interactiveQuizzes: [
      {
        id: 'iq_3_4_1',
        question: 'Trong kĩ thuật nhảy xa, vì sao vận động viên bắt buộc phải chạy lấy đà thật nhanh trước khi giậm nhảy?',
        options: [
          { id: 'opt_1', text: 'Để cơ thể tích luỹ động năng ban đầu thật lớn giúp bay xa', isCorrect: true },
          { id: 'opt_2', text: 'Để làm tăng trọng lượng của bản thân khi rơi xuống cát', isCorrect: false },
          { id: 'opt_3', text: 'Để làm giảm nhịp tim và ổn định hơi thở khi thi đấu', isCorrect: false },
          { id: 'opt_4', text: 'Để làm mát cơ bắp dưới tác dụng của gió', isCorrect: false }
        ],
        explanation: 'SGK trang 20: Chạy đà nhanh giúp tích luỹ động năng lớn, tạo vận tốc ban đầu theo phương ngang giúp bay xa trên không trung.'
      }
    ]
  },

  // ==========================================
  // BÀI 4: CÔNG VÀ CÔNG SUẤT
  // ==========================================
  topic_4_1: {
    hierarchy: {
      romanHeader: 'I. CÔNG CƠ HỌC',
      subHeader: '1. Điều kiện có công cơ học',
      subItems: [
        'a) Định nghĩa công cơ học trong Vật lí học',
        'b) Hai điều kiện bắt buộc đồng thời để sinh công',
        'c) Các trường hợp lực tác dụng nhưng KHÔNG sinh công (A = 0)'
      ]
    },
    tableOrDiagram: {
      title: 'Phân biệt trường hợp Có sinh công và Không sinh công (A = 0)',
      headers: ['Tình huống thực tế', 'Có lực F?', 'Có dịch chuyển s?', 'Có sinh công (A ≠ 0)?'],
      rows: [
        ['Người đẩy xe hàng lăn trên sàn', 'CÓ', 'CÓ', 'CÓ SINH CÔNG (A = F · s)'],
        ['Người gắng sức đẩy bức tường bê tông đứng yên', 'CÓ', 'KHÔNG (s = 0)', 'KHÔNG SINH CÔNG (A = 0)'],
        ['Kéo kiện hàng trượt trên sàn ngang (xét Trọng lực P)', 'CÓ', 'CÓ (nhưng P vuông góc sàn)', 'KHÔNG SINH CÔNG (A = 0)'],
        ['Vệ tinh bay tròn đều quanh Trái Đất (lực hấp dẫn vuông góc)', 'CÓ', 'CÓ (lực vuông góc quỹ đạo)', 'KHÔNG SINH CÔNG (A = 0)']
      ]
    },
    warningNote: '⚠ LƯU Ý HAI ĐIỀU KIỆN BẮT BUỘC: Chỉ có công cơ học khi có đủ 2 điều kiện: 1. Có lực F tác dụng vào vật; 2. Vật phải dịch chuyển quãng đường s theo phương KHÔNG VUÔNG GÓC với lực. Nếu thiếu một trong hai hoặc lực vuông góc với hướng chuyển dời thì công A = 0!',
    exampleDetail: {
      type: 'phenomenon',
      title: 'Hiện tượng đẩy bức tường bê tông kiên cố (SGK trang 21)',
      givenOrPhenomenon: 'Một học sinh dùng hết sức đẩy bức tường bê tông trong 10 phút, mồ hôi nhễ nhại nhưng bức tường không hề xê dịch.',
      stepsOrExplanation: 'Mặc dù học sinh tác dụng một lực F rất lớn và tiêu tốn năng lượng sinh học của cơ bắp, nhưng quãng đường dịch chuyển của điểm đặt lực bằng 0 (s = 0). Theo định nghĩa vật lí A = F · s = F · 0 = 0.',
      resultOrTakeaway: 'Trong Vật lí, lực đẩy của học sinh không hề sinh công cơ học.'
    },
    simObservation: {
      title: 'Mô phỏng: Lực kéo kiện hàng và công cơ học',
      instruction: 'Điều chỉnh lực kéo F và quãng đường kéo s để quan sát đồ thị diện tích công sinh ra.',
      observationQuestion: 'Nếu kéo vật trượt đều trên sàn ngang, trọng lực của vật có sinh công không?',
      observationAnswer: 'Trọng lực có phương thẳng đứng vuông góc với mặt sàn ngang (alpha = 90°) nên trọng lực hoàn toàn KHÔNG sinh công!'
    },
    interactiveQuizzes: [
      {
        id: 'iq_4_1_1',
        question: 'Trường hợp nào dưới đây có lực tác dụng nhưng KHÔNG sinh công cơ học?',
        options: [
          { id: 'opt_1', text: 'Cần cẩu nâng khối bê tông từ mặt đất lên cao', isCorrect: false },
          { id: 'opt_2', text: 'Một người đang gắng sức đẩy bức tường kiên cố nhưng tường không nhúc nhích', isCorrect: true },
          { id: 'opt_3', text: 'Đầu tàu hoả kéo đoàn toa xe chạy trên đường ray', isCorrect: false },
          { id: 'opt_4', text: 'Quả dừa rụng từ trên cây cao rơi xuống đất', isCorrect: false }
        ],
        explanation: 'Vì bức tường không dịch chuyển (s = 0) nên công cơ học A = F · s = 0.'
      }
    ]
  },

  topic_4_2: {
    hierarchy: {
      romanHeader: 'I. CÔNG CƠ HỌC',
      subHeader: '2. Công thức tính công cơ học',
      subItems: [
        'a) Biểu thức: A = F · s khi lực cùng hướng chuyển dời',
        'b) Đơn vị Jun (J) và các bội số kJ, MJ',
        'c) Bài tập định lượng tính công kéo vật'
      ]
    },
    formula: {
      title: 'Công thức tính Công cơ học (SGK KHTN 9 trang 22)',
      formula: 'A = F \\cdot s',
      explanation: 'Khi một lực F tác dụng vào vật và vật chuyển dời một quãng đường s theo hướng của lực.',
      variables: [
        { symbol: 'A', name: 'Công cơ học của lực F', unit: 'Jun (J) hoặc N·m' },
        { symbol: 'F', name: 'Độ lớn của lực tác dụng', unit: 'Niutơn (N)' },
        { symbol: 's', name: 'Quãng đường vật chuyển dời theo hướng lực', unit: 'mét (m)' }
      ]
    },
    warningNote: '⚠ LƯU Ý ĐƠN VỊ CÔNG: 1 Jun (J) = 1 N · 1 m. Trong thực tế đời sống và kĩ thuật, các máy móc thường sinh công lớn nên hay dùng kilôjun (1 kJ = 1 000 J) hoặc mêgajun (1 MJ = 1 000 000 J)!',
    exampleDetail: {
      type: 'problem',
      title: 'Bài toán tính công nâng khối đá xây dựng (SGK trang 22)',
      givenOrPhenomenon: 'Một lực kéo dây cáp F = 2 500 N kéo đều một khối đá lên cao h = 8 m.',
      stepsOrExplanation: '1. Nhận xét: Lực kéo có hướng thẳng đứng cùng chiều với chiều chuyển dời của khối đá.\n2. Áp dụng công thức tính công cơ học: A = F · s = 2 500 · 8 = 20 000 J = 20 kJ.',
      resultOrTakeaway: 'Công cơ học của lực kéo là 20 kJ (20 000 Jun).'
    },
    interactiveQuizzes: [
      {
        id: 'iq_4_2_1',
        question: 'Một người công nhân tác dụng lực đẩy F = 150 N đẩy chiếc xe cút kít đi được quãng đường s = 20 m trên mặt đường phẳng. Công mà người đó thực hiện là:',
        options: [
          { id: 'opt_1', text: '170 Jun (J)', isCorrect: false },
          { id: 'opt_2', text: '3 000 Jun (3 kJ)', isCorrect: true },
          { id: 'opt_3', text: '1 500 Jun (1,5 kJ)', isCorrect: false },
          { id: 'opt_4', text: '7,5 Jun (J)', isCorrect: false }
        ],
        explanation: 'Áp dụng A = F · s = 150 · 20 = 3 000 J = 3 kJ.'
      }
    ]
  },

  topic_4_3: {
    hierarchy: {
      romanHeader: 'II. CÔNG SUẤT',
      subHeader: '1. Khái niệm công suất',
      subItems: [
        'a) Định nghĩa tốc độ thực hiện công của máy móc',
        'b) Đơn vị Oát (W), kilôoát (kW), mã lực (HP)',
        'c) Ý nghĩa thông số công suất ghi trên nhãn thiết bị'
      ]
    },
    tableOrDiagram: {
      title: 'Công suất của một số thiết bị thông dụng trong đời sống',
      headers: ['Thiết bị', 'Công suất trung bình', 'Ý nghĩa vật lí'],
      rows: [
        ['Bóng đèn LED chiếu sáng', '10 W – 20 W', 'Mỗi giây tiêu thụ và chuyển hoá 10–20 Jun năng lượng'],
        ['Bình nóng lạnh gia đình', '2 500 W (2,5 kW)', 'Mỗi giây sinh công nhiệt lượng 2 500 Jun'],
        ['Động cơ xe máy Wave', '6,5 kW (≈ 8,7 HP)', 'Khả năng sinh công tối đa trong 1 giây là 6 500 Jun'],
        ['Tổ máy Thuỷ điện Hoà Bình', '240 MW (240 000 kW)', 'Mỗi giây phát ra 240 000 000 Jun điện năng']
      ]
    },
    warningNote: '⚠ LƯU Ý PHÂN BIỆT CÔNG VÀ CÔNG SUẤT: Công suất biểu thị tốc độ làm việc NHANH HAY CHẬM, không đồng nghĩa với công sinh ra LỚN HAY NHỎ! Một cỗ máy có công suất nhỏ nhưng chạy trong thời gian dài vẫn sinh ra công lớn hơn một cỗ máy công suất lớn chỉ chạy trong chốc lát.',
    exampleDetail: {
      type: 'phenomenon',
      title: 'Ý nghĩa thông số ghi trên máy kéo: "Công suất 35 kW"',
      givenOrPhenomenon: 'Trên nhãn kim loại gắn ở thân một chiếc máy kéo nông nghiệp có ghi: "Công suất định mức: 35 kW".',
      stepsOrExplanation: 'Đổi đơn vị: 35 kW = 35 000 W = 35 000 J/s. Con số này có ý nghĩa: Khi máy kéo hoạt động ở chế độ bình thường, trong mỗi một giây máy có khả năng thực hiện một công cơ học là 35 000 Jun.',
      resultOrTakeaway: 'Giúp người nông dân chọn máy cày phù hợp với diện tích ruộng canh tác.'
    },
    simObservation: {
      title: 'Mô phỏng: Cần cẩu bốc dỡ hàng và so sánh công suất',
      instruction: 'Thay đổi công suất động cơ cần cẩu từ 5 kW lên 20 kW để xem thời gian nâng kiện hàng.',
      observationQuestion: 'Khi tăng công suất động cơ lên gấp đôi thì thời gian nâng cùng một kiện hàng thay đổi ra sao?',
      observationAnswer: 'Thời gian nâng kiện hàng sẽ giảm đi một nửa (t = A / P, thời gian tỉ lệ nghịch với công suất).'
    },
    interactiveQuizzes: [
      {
        id: 'iq_4_3_1',
        question: 'Đại lượng vật lí nào đặc trưng cho tốc độ thực hiện công nhanh hay chậm?',
        options: [
          { id: 'opt_1', text: 'Cơ năng của vật', isCorrect: false },
          { id: 'opt_2', text: 'Công suất (P)', isCorrect: true },
          { id: 'opt_3', text: 'Quãng đường chuyển dời', isCorrect: false },
          { id: 'opt_4', text: 'Khối lượng riêng của chất liệu', isCorrect: false }
        ],
        explanation: 'SGK trang 22: Công suất là đại lượng đặc trưng cho tốc độ thực hiện công.'
      }
    ]
  },

  topic_4_4: {
    hierarchy: {
      romanHeader: 'II. CÔNG SUẤT',
      subHeader: '2. Công thức tính công suất và mối liên hệ P = F · v',
      subItems: [
        'a) Biểu thức: P = A / t',
        'b) Mối liên hệ tốc độ: P = F · v',
        'c) Vận dụng giải thích hiện tượng xe ô tô leo dốc phải về số thấp'
      ]
    },
    formula: {
      title: 'Công thức tính Công suất và Mối liên hệ P = F · v (SGK KHTN 9 trang 23)',
      formula: 'P = \\frac{A}{t} = \\frac{F \\cdot s}{t} = F \\cdot v',
      explanation: 'Công suất P được xác định bằng công thực hiện được trong một đơn vị thời gian. Khi vật chuyển động đều với vận tốc v dưới tác dụng của lực F cùng hướng thì P = F · v.',
      variables: [
        { symbol: 'P', name: 'Công suất của động cơ', unit: 'Oát (W)' },
        { symbol: 'A', name: 'Công cơ học thực hiện', unit: 'Jun (J)' },
        { symbol: 't', name: 'Thời gian thực hiện công', unit: 'giây (s)' },
        { symbol: 'F', name: 'Lực phát động của động cơ', unit: 'Niutơn (N)' },
        { symbol: 'v', name: 'Vận tốc chuyển động đều của vật', unit: 'm/s' }
      ]
    },
    warningNote: '⚠ LƯU Ý KHI LEO DỐC: Từ công thức P = F · v suy ra lực kéo F = P / v. Khi công suất cực đại P của động cơ không đổi, muốn tăng lực kéo F lên mức tối đa để leo qua dốc đứng, người lái xe bắt buộc phải giảm vận tốc v bằng cách chuyển về số thấp (số 1 hoặc số 2)!',
    exampleDetail: {
      type: 'problem',
      title: 'Bài toán tính công và công suất của cần cẩu điện (SGK trang 23)',
      givenOrPhenomenon: 'Một cần cẩu điện nâng một khối hàng nặng m = 1 000 kg lên cao h = 15 m trong thời gian t = 20 giây (lấy g = 10 m/s²).',
      stepsOrExplanation: '1. Trọng lượng khối hàng: P_vật = 10 · m = 10 · 1 000 = 10 000 N.\n2. Công cần cẩu thực hiện: A = P_vật · h = 10 000 · 15 = 150 000 J = 150 kJ.\n3. Công suất có ích của cần cẩu: P = A / t = 150 000 / 20 = 7 500 W = 7,5 kW.',
      resultOrTakeaway: 'Công suất động cơ cần cẩu là 7,5 kW.'
    },
    interactiveQuizzes: [
      {
        id: 'iq_4_4_1',
        question: 'Dựa vào công thức P = F · v, vì sao khi xe máy hoặc ô tô bắt đầu leo lên một đoạn dốc đứng, người lái xe phải chuyển về số thấp (số 1 hoặc số 2)?',
        options: [
          { id: 'opt_1', text: 'Để xe chạy nhanh hơn và lướt qua đỉnh dốc', isCorrect: false },
          { id: 'opt_2', text: 'Để giảm vận tốc v, qua đó khuếch đại lực kéo F lên cực đại khi công suất P không đổi', isCorrect: true },
          { id: 'opt_3', text: 'Để làm tăng lượng xăng bơm vào buồng đốt gấp 10 lần', isCorrect: false },
          { id: 'opt_4', text: 'Để ngắt hoàn toàn hệ thống phanh của bánh xe', isCorrect: false }
        ],
        explanation: 'Vì F = P / v, khi công suất P không đổi, giảm tốc độ v giúp lực kéo F tăng vọt, giúp xe thắng được trọng lực kéo lùi để leo dốc an toàn.'
      },
      {
        id: 'iq_4_4_2',
        question: 'Một cỗ máy thực hiện một công A = 12 000 J trong thời gian t = 30 giây. Công suất của cỗ máy đó là:',
        options: [
          { id: 'opt_1', text: '400 W', isCorrect: true },
          { id: 'opt_2', text: '360 000 W', isCorrect: false },
          { id: 'opt_3', text: '40 W', isCorrect: false },
          { id: 'opt_4', text: '120 W', isCorrect: false }
        ],
        explanation: 'Áp dụng P = A / t = 12 000 / 30 = 400 W.'
      }
    ]
  }
};

// Hàm lấy thông tin làm giàu cho một topic (nếu có, hoặc tạo mặc định dự phòng)
export function getEnrichedTopicData(topicId: string, fallbackTopic: any): EnrichedTopicData {
  if (ENRICHED_TOPICS_MAP[topicId]) {
    return ENRICHED_TOPICS_MAP[topicId];
  }

  // Fallback an toàn nếu topic chưa có trong map
  return {
    hierarchy: {
      romanHeader: 'I. KIẾN THỨC BÀI HỌC SGK',
      subHeader: fallbackTopic.title || 'Nội dung kiến thức',
      subItems: fallbackTopic.newKnowledge || []
    },
    warningNote: '⚠ LƯU Ý SGK: Đọc kĩ lý thuyết, ghi nhớ các định nghĩa và công thức cơ bản trước khi làm bài tập vận dụng.',
    exampleDetail: {
      type: 'phenomenon',
      title: fallbackTopic.exampleTitle || 'Ví dụ minh hoạ',
      givenOrPhenomenon: fallbackTopic.exampleText || 'Hiện tượng thực tế minh hoạ bài học.',
      stepsOrExplanation: 'Quan sát và phân tích hiện tượng theo kiến thức đã học trong SGK.',
      resultOrTakeaway: fallbackTopic.keyTakeaway || 'Rút ra kết luận khoa học.'
    },
    interactiveQuizzes: fallbackTopic.quickQuiz ? [
      {
        id: `iq_${topicId}_1`,
        question: fallbackTopic.quickQuiz.question,
        options: fallbackTopic.quickQuiz.options,
        explanation: fallbackTopic.quickQuiz.explanation
      }
    ] : []
  };
}
