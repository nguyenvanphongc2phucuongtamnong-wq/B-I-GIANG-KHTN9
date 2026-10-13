import { PracticeQuestion } from '../types';

export const HOOK_SCENARIO_6 = {
  scenarioTitle: 'Ảo Ảnh Nước Trên Mặt Đường Nhựa Nắng Gắt & Kì Quan Sợi Cáp Quang Internet',
  scenarioContent:
    'Vào những ngày hè oi ả, khi đi trên đường nhựa phẳng phiu, chúng ta thường thấy từ xa mặt đường dường như ươn ướt loang loáng như có vũng nước phản chiếu bầu trời. Nhưng khi tiến lại gần, mặt đường lại hoàn toàn khô ráo! Đồng thời, hàng tỉ terabyte dữ liệu Internet xuyên đại dương đang được truyền đi mỗi giây trong các sợi cáp quang bằng thuỷ tinh mỏng manh như sợi tóc mà ánh sáng không hề bị lọt ra ngoài. Cả hai điều kì diệu này đều bắt nguồn từ một hiện tượng quang học đặc biệt: Hiện tượng Phản xạ toàn phần!',
  guidingQuestion:
    'Vì sao khi góc tới vượt qua một giá trị giới hạn nhất định và truyền từ môi trường chiết quang sang môi trường kém chiết quang hơn, toàn bộ tia sáng bị hắt ngược lại mà không còn tia khúc xạ sang môi trường thứ hai?',
  options: [
    { id: 'h1', text: 'Vì mặt đường nhựa đã bị tan chảy và tạo thành một lớp gương soi phản xạ ánh sáng', isCorrect: false },
    { id: 'h2', text: 'Vì khi ánh sáng truyền từ khối thuỷ tinh/nước ra không khí với góc tới lớn hơn góc tới giới hạn, hiện tượng khúc xạ biến mất và toàn bộ tia sáng bị phản xạ trở lại môi trường ban đầu', isCorrect: true },
    { id: 'h3', text: 'Vì ánh sáng bị mặt đường hấp thụ hoàn toàn và phát quang trở lại thành tia laser', isCorrect: false },
    { id: 'h4', text: 'Vì tốc độ ánh sáng trong không khí giảm về 0 làm tia sáng bị dội ngược lại', isCorrect: false }
  ],
  explanation:
    'Chính xác! Khi ánh sáng truyền từ môi trường chiết quang hơn (chiết suất n lớn) sang môi trường kém chiết quang hơn (chiết suất nhỏ) với góc tới i ≥ i_th (góc tới giới hạn), toàn bộ tia sáng bị phản xạ ngược lại tại mặt phân cách. Đây là hiện tượng phản xạ toàn phần, nền tảng của công nghệ cáp quang và lời giải cho ảo ảnh sa mạc / đường nhựa mùa hè!'
};

export const KNOWLEDGE_CARDS_6 = [
  {
    id: 'kc6_1',
    title: '1. Hiện tượng phản xạ toàn phần',
    formula: 'i ≥ i_{th} \\quad \\& \\quad n_1 > n_2',
    concept:
      'Phản xạ toàn phần là hiện tượng toàn bộ tia sáng tới bị phản xạ trở lại môi trường ban đầu tại mặt phân cách giữa hai môi trường trong suốt.',
    keyPoints: [
      'Xảy ra tại mặt phân cách giữa hai môi trường trong suốt.',
      'Toàn bộ năng lượng ánh sáng của chùm tia tới bị phản xạ ngược lại (không còn tia khúc xạ đi vào môi trường thứ hai).',
      'Cường độ sáng của tia phản xạ toàn phần bằng đúng cường độ sáng của tia tới (sáng hơn nhiều so với phản xạ một phần thông thường).'
    ]
  },
  {
    id: 'kc6_2',
    title: '2. Điều kiện xảy ra phản xạ toàn phần',
    formula: '\\sin(i_{th}) = \\frac{n_2}{n_1} \\quad (n_1 > n_2)',
    concept:
      'Để có hiện tượng phản xạ toàn phần, phải thoả mãn đồng thời cả hai điều kiện bắt buộc về môi trường truyền và góc tới.',
    keyPoints: [
      'Điều kiện 1 (Về môi trường): Ánh sáng phải truyền từ môi trường có chiết suất lớn hơn sang môi trường có chiết suất nhỏ hơn (n₁ > n₂). Ví dụ: từ thuỷ tinh/nước ra không khí.',
      'Điều kiện 2 (Về góc tới): Góc tới i phải lớn hơn hoặc bằng góc tới giới hạn (i ≥ i_th).',
      'Công thức tính góc tới giới hạn: sin(i_th) = n₂ / n₁ (với không khí có n₂ ≈ 1 thì sin(i_th) = 1/n₁).'
    ]
  },
  {
    id: 'kc6_3',
    title: '3. Góc tới giới hạn (i_th) của một số cặp môi trường',
    formula: 'i_{th} = \\arcsin(n_2 / n_1)',
    concept:
      'Mỗi cặp môi trường có một góc tới giới hạn xác định phụ thuộc vào chiết suất của hai môi trường.',
    keyPoints: [
      'Nước (n₁ = 4/3 ≈ 1,333) vào không khí (n₂ = 1): sin(i_th) = 1 / 1,333 = 0,75 ⇒ i_th ≈ 48°35\' (khoảng 48,5°).',
      'Thuỷ tinh thường (n₁ = 1,5) vào không khí (n₂ = 1): sin(i_th) = 1 / 1,5 = 0,667 ⇒ i_th ≈ 41°48\' (khoảng 42°).',
      'Kim cương (n₁ = 2,42) vào không khí (n₂ = 1): sin(i_th) = 1 / 2,42 = 0,413 ⇒ i_th ≈ 24°24\' (khoảng 24,4°). Góc i_th cực nhỏ giúp kim cương giữ ánh sáng và lấp lánh rực rỡ!'
    ]
  },
  {
    id: 'kc6_4',
    title: '4. Ứng dụng thực tiễn: Cáp quang & Lăng kính phản xạ toàn phần',
    formula: '\\text{Cáp quang: Lõi } (n_1) > \\text{Vỏ } (n_2)',
    concept:
      'Cáp quang và lăng kính phản xạ toàn phần là hai ứng dụng vĩ đại nhất của quang hình học trong công nghệ thông tin và y học hiện đại.',
    keyPoints: [
      'Cáp quang: Cấu tạo gồm lõi trong suốt có chiết suất n₁, vỏ bọc có chiết suất n₂ nhỏ hơn (n₁ > n₂). Ánh sáng đi vào lõi phản xạ toàn phần liên tiếp dọc theo sợi cáp, truyền thông tin đi hàng nghìn km mà suy hao cực thấp.',
      'Nội soi y học: Bó sợi quang mềm dẫn truyền ánh sáng vào cơ thể và truyền hình ảnh các cơ quan nội tạng ra ngoài giúp bác sĩ chẩn đoán chính xác mà không cần phẫu thuật mở.',
      'Lăng kính phản xạ toàn phần: Dùng trong ống nhòm, máy ảnh cơ DSLR và kính tiềm vọng của tàu ngầm thay cho gương phẳng (vì không bị mờ xước lớp tráng bạc và phản xạ 100% ánh sáng).'
    ]
  }
];

export const CORE_SUMMARY_6 = {
  title: 'TỔNG HỢP KIẾN THỨC CỐT LÕI BÀI 6: PHẢN XẠ TOÀN PHẦN',
  bulletPoints: [
    'Phản xạ toàn phần là hiện tượng toàn bộ tia sáng tới bị phản xạ ngược lại môi trường ban đầu tại mặt phân cách giữa hai môi trường trong suốt.',
    'Điều kiện 1: Ánh sáng truyền từ môi trường chiết quang hơn sang môi trường kém chiết quang hơn (n₁ > n₂).',
    'Điều kiện 2: Góc tới i lớn hơn hoặc bằng góc tới giới hạn: i ≥ i_th.',
    'Công thức tính góc tới giới hạn: sin(i_th) = n₂ / n₁ (khi n₂ là không khí có n₂ ≈ 1 thì sin(i_th) = 1/n₁).',
    'So sánh góc tới i với i_th (khi n₁ > n₂): Nếu i < i_th thì có cả tia khúc xạ và tia phản xạ mờ; Nếu i = i_th thì tia khúc xạ đi là là mặt phân cách (r = 90°); Nếu i > i_th thì xảy ra phản xạ toàn phần.',
    'Ứng dụng nổi bật: Sợi cáp quang truyền dữ liệu viễn thông tốc độ cao, ống nội soi trong y học, lăng kính phản xạ toàn phần trong ống nhòm và máy ảnh, giải thích ảo ảnh sa mạc / mặt đường mùa hè.'
  ],
  rulesAndTips: [
    'Mẹo ghi nhớ điều kiện môi trường: Phải đi từ "ĐẶC" sang "LOÃNG" (chiết suất lớn n₁ sang chiết suất nhỏ n₂). Chiếu từ không khí vào nước thì TUYỆT ĐỐI KHÔNG BAO GIỜ có phản xạ toàn phần!',
    'Mẹo nhớ công thức: sin(i_th) luôn luôn ≤ 1, nên tử số bắt buộc phải là chiết suất nhỏ n₂, mẫu số là chiết suất lớn n₁: sin(i_th) = n_nhỏ / n_lớn.',
    'Lăng kính phản xạ toàn phần là khối thuỷ tinh tiết diện tam giác vuông cân, góc tới tại mặt đáy bằng 45° lớn hơn i_th của thuỷ tinh (≈ 42°) nên phản xạ toàn phần 100% ánh sáng.'
  ]
};

export const MATCHING_PAIRS_LESSON_6 = [
  { id: 'm6_1', tool: 'Phản xạ toàn phần', role: 'Toàn bộ tia sáng bị hắt ngược lại môi trường ban đầu, không còn tia khúc xạ', category: 'Hiện tượng' },
  { id: 'm6_2', tool: 'Điều kiện n₁ > n₂', role: 'Ánh sáng phải truyền từ môi trường chiết quang hơn sang môi trường kém chiết quang hơn', category: 'Điều kiện 1' },
  { id: 'm6_3', tool: 'Điều kiện i ≥ i_th', role: 'Góc tới phải lớn hơn hoặc bằng góc tới giới hạn', category: 'Điều kiện 2' },
  { id: 'm6_4', tool: 'sin(i_th) = n₂ / n₁', role: 'Công thức toán học tính góc tới giới hạn phản xạ toàn phần', category: 'Công thức' },
  { id: 'm6_5', tool: 'Lõi cáp quang (n₁) > Vỏ bọc (n₂)', role: 'Cấu tạo sợi quang đảm bảo ánh sáng phản xạ toàn phần liên tục dọc theo sợi cáp', category: 'Ứng dụng' },
  { id: 'm6_6', tool: 'Kim cương lấp lánh', role: 'Chiết suất rất cao n = 2,42 khiến i_th chỉ 24,4°, ánh sáng bị "giam cầm" phản xạ nhiều lần', category: 'Kỳ quan' }
];

export const DETECTIVE_MISSIONS_LESSON_6 = [
  {
    id: 'det_6_1',
    caseTitle: 'Vụ Án Bí Ẩn: Ánh Sáng "Mất Tích" Trong Khối Thuỷ Tinh Bán Trụ',
    description:
      'Tại phòng thí nghiệm KHTN 9, các học sinh chiếu tia laser từ đáy cong vào tâm phẳng của một khối thuỷ tinh (n = 1,5) đặt trong không khí. Khi tăng dần góc tới i từ 0° lên 30°, rồi 41,8°, và cuối cùng là 60°, học sinh ghi nhận hiện tượng kỳ lạ: ở góc 60°, tia sáng đi ra không khí biến mất hoàn toàn! Hãy giải mã hiện tượng.',
    clues: [
      'Góc tới giới hạn của thuỷ tinh: sin(i_th) = 1 / 1,5 = 0,667 ⇒ i_th ≈ 41,8°.',
      'Ở i = 30° < 41,8°: Tia sáng bị khúc xạ ra không khí và lệch xa pháp tuyến hơn tia tới.',
      'Ở i = 60° > 41,8°: Góc tới vượt qua i_th, thoả mãn đồng thời cả hai điều kiện phản xạ toàn phần.'
    ],
    question: 'Tại sao ở góc tới 60° không còn nhìn thấy tia sáng ló ra ngoài không khí?',
    answerOptions: [
      { id: 'opt_1', text: 'Vì tia sáng bị khối thuỷ tinh hấp thụ 100% biến thành nhiệt', isCorrect: false },
      { id: 'opt_2', text: 'Vì góc tới i = 60° lớn hơn i_th ≈ 41,8° nên đã xảy ra hiện tượng phản xạ toàn phần, 100% ánh sáng bị hắt ngược lại bên trong thuỷ tinh', isCorrect: true },
      { id: 'opt_3', text: 'Vì không khí bị ion hoá ngăn cản ánh sáng đi qua', isCorrect: false },
      { id: 'opt_4', text: 'Vì đèn laser bị giảm công suất đột ngột', isCorrect: false }
    ],
    verdict: 'CHÍNH XÁC! Khi i > i_th và n_thuỷ tinh > n_không khí, hiện tượng khúc xạ hoàn toàn biến mất và nhường chỗ cho phản xạ toàn phần.'
  },
  {
    id: 'det_6_2',
    caseTitle: 'Hồ Sơ Sa Mạc: Bí Mật Ảo Ảnh Ốc Đảo & Vũng Nước Hè',
    description:
      'Người đi trên sa mạc thường thấy ảo ảnh những hồ nước mát lạnh ở phía chân trời. Cùng lúc đó, các tài xế chạy xe vào trưa hè nắng gắt thấy mặt đường nhựa lấp loáng nước. Tại sao mắt ta lại thấy hình ảnh đó?',
    clues: [
      'Mặt đất/mặt đường bị nung nóng khiến các lớp không khí sát mặt đất rất nóng, khối lượng riêng giảm, chiết suất n_dưới nhỏ hơn.',
      'Các lớp không khí bên trên nguội hơn nên chiết suất n_trên lớn hơn (n_trên > n_dưới).',
      'Tia sáng từ bầu trời truyền xiên góc từ lớp không khí trên xuống dưới: đi từ nơi chiết quang hơn sang nơi kém chiết quang hơn với góc tới rất lớn.'
    ],
    question: 'Cơ chế vật lý tạo ra ảo ảnh mặt đường lấp loáng nước là gì?',
    answerOptions: [
      { id: 'opt_1', text: 'Hơi nước ngưng tụ thành hồ nước thật trên mặt đường nhựa', isCorrect: false },
      { id: 'opt_2', text: 'Tia sáng từ bầu trời bị phản xạ toàn phần tại lớp không khí nóng sát mặt đất và truyền vào mắt, làm mắt nhìn thấy ảnh phản chiếu của bầu trời xanh giống như mặt nước', isCorrect: true },
      { id: 'opt_3', text: 'Mặt đường nóng làm khúc xạ ánh sáng theo đường ziczac vuông góc', isCorrect: false },
      { id: 'opt_4', text: 'Do mắt người bị mỏi và sinh ra ảo giác thị giác', isCorrect: false }
    ],
    verdict: 'TUYỆT VỜI! Đây chính là hiện tượng phản xạ toàn phần tự nhiên trong khí quyển khi có sự chênh lệch chiết suất mạnh giữa các tầng không khí.'
  }
];

export const PRACTICE_QUESTIONS_6: PracticeQuestion[] = [
  {
    id: 'pq_6_1',
    level: 'nhan_biet',
    levelName: 'Nhận biết',
    question: 'Phản xạ toàn phần là hiện tượng gì?',
    options: [
      'Hiện tượng toàn bộ tia sáng tới bị phản xạ trở lại môi trường ban đầu tại mặt phân cách giữa hai môi trường trong suốt',
      'Hiện tượng ánh sáng bị khúc xạ với góc khúc xạ lớn hơn góc tới',
      'Hiện tượng ánh sáng bị phân tách thành 7 màu sắc cầu vồng',
      'Hiện tượng ánh sáng bị môi trường thứ hai hấp thụ hoàn toàn'
    ],
    correctIndex: 0,
    hint: 'Toàn bộ ánh sáng bị giữ lại trong môi trường ban đầu.',
    explanation: 'Định nghĩa SGK KHTN 9: Phản xạ toàn phần là hiện tượng toàn bộ tia sáng tới bị phản xạ trở lại môi trường ban đầu tại mặt phân cách giữa hai môi trường trong suốt.'
  },
  {
    id: 'pq_6_2',
    level: 'nhan_biet',
    levelName: 'Nhận biết',
    question: 'Để có hiện tượng phản xạ toàn phần, ánh sáng phải truyền theo chiều nào?',
    options: [
      'Từ môi trường chiết quang kém sang môi trường chiết quang hơn (n₁ < n₂)',
      'Từ môi trường chiết quang hơn sang môi trường chiết quang kém (n₁ > n₂)',
      'Từ chân không vào bất kì môi trường trong suốt nào',
      'Theo phương vuông góc với mặt phân cách'
    ],
    correctIndex: 1,
    hint: 'Phải đi từ môi trường có chiết suất lớn sang môi trường có chiết suất nhỏ.',
    explanation: 'Điều kiện cần đầu tiên để có phản xạ toàn phần là ánh sáng phải truyền từ môi trường chiết quang hơn sang môi trường kém chiết quang hơn (n₁ > n₂).'
  },
  {
    id: 'pq_6_3',
    level: 'thong_hieu',
    levelName: 'Thông hiểu',
    question: 'Cho ánh sáng truyền từ môi trường (1) có chiết suất n₁ sang môi trường (2) có chiết suất n₂ (với n₁ > n₂). Công thức tính góc tới giới hạn phản xạ toàn phần i_th là:',
    options: [
      'sin(i_th) = n₁ / n₂',
      'sin(i_th) = n₂ / n₁',
      'cos(i_th) = n₂ / n₁',
      'tan(i_th) = n₁ · n₂'
    ],
    correctIndex: 1,
    hint: 'Do sin ≤ 1 nên tử số phải là chiết suất nhỏ n₂, mẫu số là chiết suất lớn n₁.',
    explanation: 'Công thức tính góc tới giới hạn phản xạ toàn phần là sin(i_th) = n₂ / n₁ (với n₁ > n₂ để đảm bảo giá trị sin ≤ 1).'
  },
  {
    id: 'pq_6_4',
    level: 'thong_hieu',
    levelName: 'Thông hiểu',
    question: 'Chiếu tia sáng từ nước (chiết suất n₁ = 4/3) ra không khí (chiết suất n₂ = 1). Góc tới giới hạn phản xạ toàn phần xấp xỉ bằng bao nhiêu?',
    options: [
      '41,8°',
      '48,6°',
      '60,0°',
      '30,0°'
    ],
    correctIndex: 1,
    hint: 'sin(i_th) = 1 / (4/3) = 0,75.',
    explanation: 'sin(i_th) = n₂ / n₁ = 1 / (4/3) = 3/4 = 0,75 => i_th = arcsin(0,75) ≈ 48,59° ≈ 48,6°.'
  },
  {
    id: 'pq_6_5',
    level: 'van_dung',
    levelName: 'Vận dụng',
    question: 'Một tia sáng chiếu từ thuỷ tinh (n₁ = 1,5) ra không khí (n₂ = 1) với góc tới i = 30°. Hiện tượng gì sẽ xảy ra?',
    options: [
      'Chỉ có hiện tượng phản xạ toàn phần',
      'Có cả hiện tượng khúc xạ ánh sáng (tia khúc xạ ló ra không khí) và phản xạ một phần',
      'Tia sáng truyền thẳng không đổi hướng',
      'Tia sáng bị thuỷ tinh triệt tiêu hoàn toàn'
    ],
    correctIndex: 1,
    hint: 'So sánh góc tới i = 30° với góc tới hạn i_th ≈ 41,8°.',
    explanation: 'Với cặp môi trường này, sin(i_th) = 1 / 1,5 = 0,667 => i_th ≈ 41,8°. Do góc tới i = 30° < 41,8° nên chưa đạt ngưỡng phản xạ toàn phần, ánh sáng vẫn khúc xạ ra không khí (với r ≈ 48,6°) kèm theo một tia phản xạ mờ.'
  },
  {
    id: 'pq_6_6',
    level: 'van_dung',
    levelName: 'Vận dụng',
    question: 'Cấu tạo cốt lõi của sợi quang học trong công nghệ viễn thông gồm:',
    options: [
      'Một dây đồng đặc bọc lớp cao su cách điện',
      'Lõi trong suốt có chiết suất n₁, được bao quanh bởi lớp vỏ bọc có chiết suất n₂ nhỏ hơn (n₁ > n₂)',
      'Lõi trong suốt có chiết suất n₁, được bao quanh bởi lớp vỏ bọc có chiết suất n₂ lớn hơn (n₁ < n₂)',
      'Một ống rỗng kim loại tráng bạc mặt trong'
    ],
    correctIndex: 1,
    hint: 'Lõi phải có chiết suất lớn hơn vỏ để ánh sáng phản xạ toàn phần liên tục bên trong.',
    explanation: 'Để ánh sáng phản xạ toàn phần liên tục dọc theo lõi sợi quang mà không lọt ra ngoài, lõi phải có chiết suất n₁ lớn hơn chiết suất n₂ của lớp vỏ bọc bên ngoài (n₁ > n₂).'
  }
];

export const REAL_WORLD_APPLICATION_6 = {
  title: 'Kỷ Nguyên Cáp Quang & Ứng Dụng Đột Phá Của Phản Xạ Toàn Phần',
  intro:
    'Nếu không có hiện tượng phản xạ toàn phần, nền văn minh số của nhân loại sẽ không thể tồn tại như ngày nay. Toàn bộ mạng Internet toàn cầu, các cuộc gọi video xuyên đại dương và những ca phẫu thuật nội soi tinh vi đều dựa trên nguyên lý quang học kì diệu này.',
  applications: [
    {
      name: 'Siêu Cáp Quang Internet Xuyên Đại Dương',
      detail:
        'Hàng triệu km cáp quang ngầm dưới đáy biển kết nối các châu lục. Mỗi sợi quang chỉ dày bằng sợi tóc nhưng truyền hàng terabit dữ liệu mỗi giây bằng xung laser nhờ phản xạ toàn phần với độ suy hao tín hiệu cực thấp.'
    },
    {
      name: 'Nội Soi Y Tế Không Xâm Lấn',
      detail:
        'Ống nội soi mềm gồm hàng nghìn sợi cáp quang siêu nhỏ được đưa vào dạ dày, đại tràng hoặc phế quản. Ánh sáng theo sợi quang chiếu sáng cơ quan và phản xạ ngược lại truyền hình ảnh độ nét cao ra màn hình giúp bác sĩ phát hiện mầm bệnh sớm.'
    },
    {
      name: 'Lăng Kính Phản Xạ Toàn Phần Trong Ống Nhòm & Máy Ảnh DSLR',
      detail:
        'Thay vì dùng gương phẳng tráng bạc dễ bị mốc xước và hao hụt 10-15% ánh sáng, người ta dùng lăng kính phản xạ toàn phần bằng thuỷ tinh (góc 45° > 42°) để đảo chiều tia sáng 90° hoặc 180° với hiệu suất phản xạ đạt gần 100%.'
    },
    {
      name: 'Đèn Trang Trí Sợi Quang & Bể Bơi Dạ Quang An Toàn',
      detail:
        'Nguồn phát ánh sáng đặt ở khoảng cách an toàn, ánh sáng được dẫn theo các sợi nhựa quang học đến đáy bể bơi hoặc trần nhà giả lập bầu trời sao mà không cần kéo dây điện dẫn tới nơi có nước, đảm bảo an toàn tuyệt đối chống giật điện.'
    }
  ]
};

export const EXTENSION_CONTENT_6 = {
  title: 'MỞ RỘNG NÂNG CAO: VÌ SAO KIM CƯƠNG LẤP LÁNH & NGHỆ THUẬT CẮT BRILLIANT CUT',
  content:
    'Kim cương tự nhiên có chiết suất rất cao đối với ánh sáng nhìn thấy: n ≈ 2,42. Do đó góc tới giới hạn của kim cương vào không khí cực kì nhỏ: sin(i_th) = 1 / 2,42 ≈ 0,413 => i_th ≈ 24°24\'.\n\nKhi thợ kim hoàn giác cắt kim cương theo kiểu "Brilliant Cut" (57 hoặc 58 giác cắt chuẩn xác), tia sáng đi vào viên kim cương từ mặt trên sẽ bị phản xạ toàn phần nhiều lần liên tiếp ở các mặt đáy phía dưới (do góc tới hầu hết đều lớn hơn 24,4°), sau đó mới hội tụ phóng ngược ra mặt trên vào mắt người quan sát. Cùng với khả năng tán sắc mạnh, kim cương tạo ra những tia lửa loé sáng và màu sắc rực rỡ tuyệt mỹ!'
};

export const FINAL_ASSESSMENT_QUIZ_6: PracticeQuestion[] = [
  {
    id: 'faq_6_1',
    level: 'nhan_biet',
    levelName: 'Nhận biết',
    question: 'Điều kiện nào sau đây KHÔNG PHẢI là điều kiện để có phản xạ toàn phần?',
    options: [
      'Tia sáng truyền từ môi trường có chiết suất n₁ sang môi trường có chiết suất n₂ với n₁ > n₂',
      'Góc tới i phải lớn hơn hoặc bằng góc tới giới hạn i_th',
      'Cả hai môi trường phải trong suốt',
      'Tia sáng phải truyền từ không khí vào trong khối thuỷ tinh'
    ],
    correctIndex: 3,
    hint: 'Truyền từ không khí vào thuỷ tinh thì n₁ < n₂, không thể phản xạ toàn phần.',
    explanation: 'Khi truyền từ không khí vào thuỷ tinh thì n₁ = 1 < n₂ = 1,5, không thoả mãn điều kiện n₁ > n₂ nên KHÔNG THỂ xảy ra phản xạ toàn phần.'
  },
  {
    id: 'faq_6_2',
    level: 'thong_hieu',
    levelName: 'Thông hiểu',
    question: 'Khi góc tới i đúng bằng góc tới giới hạn i_th (i = i_th) và n₁ > n₂, tia khúc xạ sẽ:',
    options: [
      'Bị phản xạ ngược lại theo phương cũ',
      'Đi là là sát mặt phân cách giữa hai môi trường (góc khúc xạ r = 90°)',
      'Vuông góc với mặt phân cách (r = 0°)',
      'Biến mất hoàn toàn và chỉ còn tia tới'
    ],
    correctIndex: 1,
    hint: 'sin(r) = 1 => r = 90°.',
    explanation: 'Theo định luật khúc xạ: n₁·sin(i_th) = n₂·sin(r) = n₂·sin(90°) = n₂. Do đó khi i = i_th thì góc khúc xạ đạt giá trị cực đại r = 90°, tia khúc xạ đi là là mặt phân cách.'
  },
  {
    id: 'faq_6_3',
    level: 'thong_hieu',
    levelName: 'Thông hiểu',
    question: 'Một tia sáng chiếu từ một chất lỏng trong suốt có chiết suất n = √2 ≈ 1,414 ra không khí (n = 1). Góc tới giới hạn i_th là:',
    options: [
      '30°',
      '45°',
      '60°',
      '90°'
    ],
    correctIndex: 1,
    hint: 'sin(i_th) = 1 / √2 = √2 / 2.',
    explanation: 'sin(i_th) = 1 / n = 1 / √2 = √2 / 2 => i_th = 45°.'
  },
  {
    id: 'faq_6_4',
    level: 'van_dung',
    levelName: 'Vận dụng',
    question: 'Tại sao trong các thiết bị quang học chính xác như ống nhòm quân sự, người ta thường dùng lăng kính phản xạ toàn phần thay cho gương phẳng?',
    options: [
      'Vì lăng kính nhẹ hơn gương phẳng gấp nhiều lần',
      'Vì lăng kính phản xạ hầu như 100% lượng ánh sáng tới và không bị ố mờ, bong tróc lớp mạ kim loại theo thời gian',
      'Vì lăng kính làm tăng nhiệt độ của ảnh',
      'Vì lăng kính rẻ tiền hơn nhiều so với thuỷ tinh phẳng'
    ],
    correctIndex: 1,
    hint: 'Phản xạ toàn phần đạt hiệu suất 100% và bề mặt phân cách tự nhiên bền vĩnh cửu.',
    explanation: 'Phản xạ toàn phần có hiệu suất phản xạ đạt gần 100% ánh sáng (trong khi gương tráng bạc chỉ đạt 85-90%) và lớp phản xạ là mặt phân cách tự nhiên, không bị oxi hoá mốc mạ tráng gương.'
  },
  {
    id: 'faq_6_5',
    level: 'van_dung',
    levelName: 'Vận dụng',
    question: 'Một người thợ lặn ở dưới đáy hồ nước trong veo nhìn lên mặt nước. Người đó sẽ nhìn thấy:',
    options: [
      'Toàn bộ cảnh vật trên bờ trong một hình nón góc mở giới hạn, bên ngoài góc đó mặt nước đóng vai trò như một chiếc gương phẳng phản xạ đáy hồ',
      'Toàn bộ mặt nước đều tối đen như mực',
      'Mặt nước hoàn toàn trong suốt ở mọi góc nhìn',
      'Cảnh vật trên bờ bị đảo ngược đầu xuống đất ở mọi góc nhìn'
    ],
    correctIndex: 0,
    hint: 'Hiện tượng Cửa sổ Snell: góc mở 2·i_th ≈ 97°.',
    explanation: 'Hiện tượng "cửa sổ Snell" (Snell\'s window): Ánh sáng từ trên bờ đi vào nước bị giới hạn trong góc nón 2·i_th ≈ 2·48,5° ≈ 97°. Ở các góc nghiêng lớn hơn i_th, tia sáng từ đáy hồ phản xạ toàn phần trở lại mắt thợ lặn, biến mặt nước thành gương soi đáy hồ!'
  }
];
