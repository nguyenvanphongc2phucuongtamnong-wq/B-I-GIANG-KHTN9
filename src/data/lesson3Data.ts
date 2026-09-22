import { PracticeQuestion } from '../types';

export const HOOK_SCENARIO_3 = {
  scenarioTitle: 'Bí Ẩn Tàu Lượn Siêu Tốc: Tại Sao Đỉnh Dốc Đầu Tiên Luôn Phải Cao Nhất?',
  scenarioContent:
    'Tại công viên giải trí, Minh và An quan sát một đoàn tàu lượn siêu tốc khổng lồ. Đoàn tàu được động cơ kéo chầm chậm lên đỉnh dốc đầu tiên rất cao, nhưng sau đó trong toàn bộ hành trình uốn lượn ngoạn mục, lộn nhào 360 độ và lao vun vút qua các dốc tiếp theo, tàu hoàn toàn KHÔNG CẦN ĐỘNG CƠ kéo nữa. An thắc mắc: "Tại sao tất cả các đỉnh dốc sau đều phải thấp hơn đỉnh dốc đầu tiên, và nguồn năng lượng nào đã đưa con tàu lao đi với vận tốc xé gió như vậy?"',
  question: 'Hiện tượng trên được giải thích dựa trên quy luật vật lý nào?',
  options: [
    {
      id: 'opt_1',
      text: 'Tại đỉnh dốc đầu tiên, tàu tích luỹ thế năng cực đại; khi lao xuống, thế năng chuyển hoá thành động năng và tổng cơ năng được bảo toàn (trừ một phần hao phí do ma sát).',
      isCorrect: true,
      feedback: 'Chính xác! Đỉnh dốc đầu tiên cung cấp thế năng ban đầu cực đại (Wt = mgh). Toàn bộ hành trình sau đó là sự chuyển hoá liên tục giữa thế năng và động năng theo Định luật bảo toàn cơ năng.',
    },
    {
      id: 'opt_2',
      text: 'Do trọng lực của Trái Đất liên tục sinh ra thêm năng lượng mới đẩy con tàu ngày càng chạy nhanh hơn mà không bao giờ cạn kiệt.',
      isCorrect: false,
      feedback: 'Chưa đúng. Năng lượng không tự sinh ra; trọng lực chỉ đóng vai trò chuyển hoá thế năng tích luỹ ban đầu thành động năng.',
    },
    {
      id: 'opt_3',
      text: 'Do từ trường của đường ray tự động hút toa tàu chạy tới phía trước với tốc độ không đổi.',
      isCorrect: false,
      feedback: 'Không đúng với nguyên lý tàu lượn trọng lực truyền thống. Tàu vận hành hoàn toàn nhờ sự chuyển hoá thế năng và động năng.',
    },
    {
      id: 'opt_4',
      text: 'Do khối lượng của con tàu giảm dần khi chạy trên đường ray giúp nó vọt qua các dốc sau dễ dàng.',
      isCorrect: false,
      feedback: 'Sai kiến thức khoa học. Khối lượng toa tàu không thay đổi trong suốt hành trình.',
    },
  ],
};

export const KNOWLEDGE_CARDS_3 = [
  {
    id: 'kc_3_1',
    title: '1. Khái Niệm Cơ Năng & Biểu Thức Tổng Quát',
    subtitle: 'W = Wđ + Wt (Đơn vị: Jun - J)',
    badge: 'Khái niệm cốt lõi',
    content:
      'Khi một vật vừa có khả năng sinh công do chuyển động (động năng Wđ) vừa có khả năng sinh công do vị trí trong trọng trường (thế năng Wt), thì tổng động năng và thế năng của vật được gọi là CƠ NĂNG (kí hiệu là W).\n\nBiểu thức cơ năng:\n  W = Wđ + Wt = 1/2 · m · v² + m · g · h\n\nTrong hệ SI: Khối lượng m đo bằng kilôgam (kg), vận tốc v đo bằng mét trên giây (m/s), độ cao h đo bằng mét (m), cơ năng W đo bằng Jun (J).',
    keyTakeaway: 'Cơ năng là đại lượng vô hướng đặc trưng cho toàn bộ năng lượng cơ học của vật.',
    quickCheck: {
      question: 'Một cánh chim nặng 0,5 kg đang bay ở độ cao 20 m với tốc độ 10 m/s (lấy g = 10 m/s²). Cơ năng của cánh chim là bao nhiêu?',
      options: [
        { id: 'q1_a', text: '125 J (gồm Động năng 25 J và Thế năng 100 J)', isCorrect: true },
        { id: 'q1_b', text: '100 J (chỉ tính thế năng trọng trường)', isCorrect: false },
        { id: 'q1_c', text: '25 J (chỉ tính động năng chuyển động)', isCorrect: false },
        { id: 'q1_d', text: '200 J', isCorrect: false },
      ],
      explanation: 'Wđ = 1/2 · 0,5 · 10² = 25 J; Wt = 0,5 · 10 · 20 = 100 J => Cơ năng W = Wđ + Wt = 25 + 100 = 125 J.',
    },
  },
  {
    id: 'kc_3_2',
    title: '2. Sự Chuyển Hoá Giữa Động Năng & Thế Năng',
    subtitle: 'Quá trình hoán đổi liên tục trong tự nhiên',
    badge: 'Quy luật biến đổi',
    content:
      'Trong chuyển động của vật dưới tác dụng của trọng lực:\n• Khi vật rơi từ trên cao xuống: Độ cao h giảm dần => Thế năng Wt giảm; đồng thời tốc độ v tăng dần => Động năng Wđ tăng. Thế năng đã chuyển hoá thành động năng.\n• Khi ném vật lên cao: Tốc độ v giảm dần => Động năng Wđ giảm; đồng thời độ cao h tăng dần => Thế năng Wt tăng. Động năng đã chuyển hoá thành thế năng.\n• Tại vị trí cao nhất: Động năng bằng 0 (nếu ném thẳng đứng), thế năng đạt cực đại.\n• Tại mặt đất (mốc thế năng): Thế năng bằng 0, động năng đạt giá trị cực đại.',
    keyTakeaway: 'Động năng và thế năng có thể chuyển hoá qua lại lẫn nhau một cách liên tục.',
    quickCheck: {
      question: 'Khi thả rơi một quả bưởi từ cành cây xuống đất (bỏ qua sức cản gió), đại lượng nào sau đây của quả bưởi TĂNG LÊN?',
      options: [
        { id: 'q2_a', text: 'Động năng của quả bưởi', isCorrect: true },
        { id: 'q2_b', text: 'Thế năng trọng trường của quả bưởi', isCorrect: false },
        { id: 'q2_c', text: 'Cơ năng toàn phần của quả bưởi', isCorrect: false },
        { id: 'q2_d', text: 'Khối lượng của quả bưởi', isCorrect: false },
      ],
      explanation: 'Khi rơi tự do, độ cao giảm làm thế năng giảm; tốc độ tăng làm động năng tăng dần.',
    },
  },
  {
    id: 'kc_3_3',
    title: '3. Định Luật Bảo Toàn Cơ Năng',
    subtitle: 'Định luật nền tảng của Cơ học cổ điển',
    badge: 'Định luật bảo toàn',
    content:
      'PHÁT BIỂU ĐỊNH LUẬT:\nKhi một vật chuyển động trong trọng trường chỉ chịu tác dụng của trọng lực (bỏ qua ma sát và lực cản của môi trường), cơ năng của vật là một đại lượng BẢO TOÀN (không đổi theo thời gian).\n\nBiểu thức định luật:\n  W = Wđ + Wt = hằng số (const)\n  => Wđ₁ + Wt₁ = Wđ₂ + Wt₂\n  => 1/2 · m · v₁² + m · g · h₁ = 1/2 · m · v₂² + m · g · h₂\n\nHỆ QUẢ QUAN TRỌNG:\n• Ở vị trí thế năng cực đại thì động năng bằng 0 (Wt_max = W).\n• Ở vị trí động năng cực đại thì thế năng bằng 0 (Wđ_max = W).\n• Độ giảm thế năng bằng độ tăng động năng: ΔWt = ΔWđ.',
    keyTakeaway: 'Trong điều kiện chỉ chịu lực thế (trọng lực), tổng năng lượng cơ học được bảo toàn tuyệt đối.',
    quickCheck: {
      question: 'Điều kiện tiên quyết để cơ năng của một vật chuyển động trong trọng trường được bảo toàn là gì?',
      options: [
        { id: 'q3_a', text: 'Chỉ chịu tác dụng của trọng lực, bỏ qua lực cản và ma sát', isCorrect: true },
        { id: 'q3_b', text: 'Vật phải chuyển động với vận tốc không đổi', isCorrect: false },
        { id: 'q3_c', text: 'Vật phải có khối lượng rất lớn', isCorrect: false },
        { id: 'q3_d', text: 'Độ cao của vật phải giữ nguyên không đổi', isCorrect: false },
      ],
      explanation: 'Định luật bảo toàn cơ năng chỉ nghiệm đúng khi không có lực ma sát hay lực cản ngoại lai sinh công tiêu tán cơ năng.',
    },
  },
  {
    id: 'kc_3_4',
    title: '4. Sự Hao Phí Cơ Năng Do Lực Cản & Ma Sát',
    subtitle: 'Thực tế cơ học trong đời sống',
    badge: 'Thực nghiệm & Ứng dụng',
    content:
      'Trong thực tế đời sống, luôn tồn tại lực ma sát giữa các bề mặt tiếp xúc và sức cản của không khí hoặc nước.\n• Khi có ma sát hoặc lực cản, cơ năng của vật KHÔNG được bảo toàn mà giảm dần theo thời gian.\n• Cơ năng bị hao phí đã chuyển hoá thành NHIỆT NĂNG (làm nóng vật và môi trường) và NĂNG LƯỢNG ÂM THANH.\n• Định luật bảo toàn công áp dụng:\n  W_ban_đầu - W_lúc_sau = A_ma_sát = F_cản · s\n\nVí dụ: Con lắc dao động một thời gian rồi dừng lại vì cơ năng chuyển hoá dần thành nhiệt năng do ma sát ở trục quay và cản không khí.',
    keyTakeaway: 'Lực ma sát và lực cản làm cơ năng suy giảm, biến đổi cơ năng thành nhiệt năng.',
    quickCheck: {
      question: 'Một hòn bi lăn trên sàn nhà gồ ghề sau một đoạn thì dừng lại. Cơ năng của hòn bi đã biến đi đâu?',
      options: [
        { id: 'q4_a', text: 'Đã chuyển hoá thành nhiệt năng làm nóng hòn bi và mặt sàn do lực ma sát sinh công cản', isCorrect: true },
        { id: 'q4_b', text: 'Đã hoàn toàn tự biến mất mà không sinh ra dạng năng lượng nào', isCorrect: false },
        { id: 'q4_c', text: 'Đã biến thành thế năng tích luỹ trong lòng đất', isCorrect: false },
        { id: 'q4_d', text: 'Đã chuyển thành năng lượng hạt nhân nguyên tử', isCorrect: false },
      ],
      explanation: 'Theo nguyên lý bảo toàn và chuyển hoá năng lượng, cơ năng hao phí do công của lực ma sát chuyển hoá thành nhiệt năng.',
    },
  },
  {
    id: 'kc_3_5',
    title: '5. Ứng Dụng Cơ Năng Trong Kĩ Thuật & Đời Sống',
    subtitle: 'Thuỷ điện, Búa máy, Thể thao & Giao thông',
    badge: 'Kĩ thuật công nghệ',
    content:
      'Cơ năng đóng vai trò rực rỡ trong nền văn minh nhân loại:\n• Nhà máy thuỷ điện: Nước ở hồ chứa trên cao có thế năng khổng lồ, khi xả qua đường ống áp lực thế năng chuyển thành động năng quay tuabin máy phát điện.\n• Đóng cọc móng công trình: Búa máy được nâng lên cao tích luỹ thế năng rồi thả rơi va chạm đóng cọc lún sâu vào đất.\n• Thể thao nhảy sào, nhảy cầu: Vận động viên chạy lấy đà tạo động năng, uốn cong thanh sào (thế năng đàn hồi) rồi bật lên cao (thế năng trọng trường).\n• Bắn cung tên: Dây cung bị kéo căng tích luỹ thế năng đàn hồi, khi buông tay phóng mũi tên bay vút đi với động năng lớn.',
    keyTakeaway: 'Con người khai thác quy luật chuyển hoá cơ năng để tạo ra điện năng và chế tạo máy móc hiện đại.',
    quickCheck: {
      question: 'Trong nhà máy thuỷ điện Hoà Bình, chu trình chuyển hoá năng lượng chính diễn ra như thế nào?',
      options: [
        { id: 'q5_a', text: 'Thế năng của nước -> Động năng dòng nước -> Cơ năng tuabin -> Điện năng', isCorrect: true },
        { id: 'q5_b', text: 'Quang năng -> Nhiệt năng -> Điện năng', isCorrect: false },
        { id: 'q5_c', text: 'Hoá năng của nước -> Điện năng trực tiếp', isCorrect: false },
        { id: 'q5_d', text: 'Điện năng -> Thế năng của nước trên đập', isCorrect: false },
      ],
      explanation: 'Thế năng nước trên cao biến đổi thành động năng dòng nước chảy xiết, làm quay tuabin máy phát biến cơ năng thành điện năng.',
    },
  },
];

export const CORE_SUMMARY_3 = {
  title: 'Hệ Thống Kiến Thức Trọng Tâm: Bài 3 - Cơ Năng',
  bulletPoints: [
    'Cơ năng (W) là tổng động năng và thế năng của vật: W = Wđ + Wt = 1/2 m v² + m g h.',
    'Đơn vị của cơ năng trong hệ đơn vị chuẩn quốc tế SI là Jun (kí hiệu là J). 1 kJ = 1 000 J.',
    'Động năng và thế năng chuyển hoá qua lại liên tục: khi rơi tự do Wt giảm thì Wđ tăng; khi bay lên Wđ giảm thì Wt tăng.',
    'Định luật bảo toàn cơ năng: Khi vật chuyển động trong trọng trường chỉ chịu tác dụng của trọng lực, cơ năng của vật được bảo toàn (W = const).',
    'Tại vị trí cao nhất (v = 0): Cơ năng bằng thế năng cực đại (W = Wt_max). Tại vị trí thấp nhất (h = 0): Cơ năng bằng động năng cực đại (W = Wđ_max).',
    'Trong thực tế, do lực ma sát và lực cản của môi trường nên cơ năng bị hao phí, chuyển hoá thành nhiệt năng và âm thanh.',
  ],
  formulaCard: {
    title: 'Cụm Công Thức Tính Cơ Năng & Bảo Toàn Cơ Năng',
    formula: 'W = Wđ + Wt = 1/2 · m · v² + m · g · h = hằng số',
    explanation: 'Trong đó: m (kg) là khối lượng; v (m/s) là vận tốc; h (m) là độ cao so với mốc thế năng; g (m/s²) là gia tốc trọng trường.',
  },
};

export const DETECTIVE_MISSIONS_3 = [
  {
    id: 'det_3_1',
    scenario: 'Nhiệm vụ 1: Vận động viên nhảy dù vừa nhảy ra khỏi trực thăng ở độ cao 3 000 m.',
    question: 'Trong 5 giây đầu tiên khi chiếc dù CHƯA MỞ, chuyển hoá năng lượng nào diễn ra mạnh mẽ nhất?',
    options: [
      'Thế năng trọng trường chuyển hoá thành động năng',
      'Động năng chuyển hoá thành thế năng đàn hồi',
      'Cơ năng chuyển hoá 100% thành hoá năng',
      'Nhiệt năng chuyển hoá thành thế năng trọng trường',
    ],
    correctIndex: 0,
    explanation: 'Khi chưa mở dù, lực cản không khí còn nhỏ, vận động viên rơi nhanh dần dưới tác dụng của trọng lực nên thế năng giảm mạnh chuyển thành động năng tăng vọt.',
  },
  {
    id: 'det_3_2',
    scenario: 'Nhiệm vụ 2: Thí nghiệm con lắc đơn dao động giữa hai vị trí biên A và B qua vị trí cân bằng O thấp nhất.',
    question: 'Tại vị trí cân bằng O, các đại lượng động năng và thế năng của quả nặng đạt giá trị thế nào?',
    options: [
      'Thế năng bằng 0 (nếu chọn mốc tại O), động năng đạt giá trị cực đại',
      'Động năng bằng 0, thế năng đạt giá trị cực đại',
      'Cả động năng và thế năng đều bằng 0',
      'Động năng bằng một nửa thế năng cực đại',
    ],
    correctIndex: 0,
    explanation: 'Tại O, quả nặng ở vị trí thấp nhất (h = 0) nên Wt = 0; tốc độ quả nặng đạt cực đại nên Wđ đạt cực đại bằng toàn bộ cơ năng.',
  },
  {
    id: 'det_3_3',
    scenario: 'Nhiệm vụ 3: Bạn An ném một quả bóng tennis khối lượng 0,1 kg thẳng đứng lên cao từ mặt đất với vận tốc ban đầu 10 m/s (g = 10 m/s², bỏ qua lực cản).',
    question: 'Quả bóng sẽ bay lên đến độ cao tối đa là bao nhiêu trước khi bắt đầu rơi xuống?',
    options: [
      'h_max = 5,0 mét',
      'h_max = 10,0 mét',
      'h_max = 2,5 mét',
      'h_max = 7,5 mét',
    ],
    correctIndex: 0,
    explanation: 'Bảo toàn cơ năng: Wt_max = Wđ_max => m·g·h_max = 1/2·m·v² => h_max = v² / (2g) = 10² / (2 · 10) = 100 / 20 = 5,0 m.',
  },
  {
    id: 'det_3_4',
    scenario: 'Nhiệm vụ 4: Kiểm tra xe trượt máng gỗ trượt từ đỉnh dốc xuống chân dốc có ma sát.',
    question: 'Công của lực ma sát tác dụng lên xe trong suốt đoạn dốc bằng đại lượng nào?',
    options: [
      'Bằng độ giảm cơ năng của xe giữa đỉnh dốc và chân dốc: A_ms = W_đỉnh - W_chân',
      'Bằng tổng cơ năng tại đỉnh dốc cộng cơ năng tại chân dốc',
      'Bằng thế năng tại chân dốc chia cho động năng',
      'Luôn bằng 0 vì ma sát không sinh công',
    ],
    correctIndex: 0,
    explanation: 'Theo định lý biến thiên cơ năng, công của lực không thế (lực ma sát) bằng độ biến thiên cơ năng: A_ms = W_sau - W_đầu < 0 (công cản).',
  },
];

export const PRACTICE_QUESTIONS_3: PracticeQuestion[] = [
  {
    id: 'p3_1',
    level: 'nhan_biet',
    levelName: 'Mức 1: Nhận biết',
    question: 'Cơ năng của một vật chuyển động trong trọng trường là tổng của những dạng năng lượng nào?',
    options: [
      'Động năng và thế năng trọng trường',
      'Động năng và quang năng',
      'Thế năng trọng trường và nhiệt năng',
      'Hoá năng và cơ năng',
    ],
    correctIndex: 0,
    hint: 'Công thức tính cơ năng là W = Wđ + Wt.',
    explanation: 'Theo định nghĩa SGK KHTN 9, cơ năng là tổng của động năng và thế năng: W = Wđ + Wt.',
  },
  {
    id: 'p3_2',
    level: 'nhan_biet',
    levelName: 'Mức 1: Nhận biết',
    question: 'Đơn vị đo chuẩn của cơ năng trong hệ đo lường quốc tế SI là gì?',
    options: [
      'Niu-tơn (N)',
      'Jun (J)',
      'Oát (W)',
      'Mét trên giây (m/s)',
    ],
    correctIndex: 1,
    hint: 'Cơ năng có cùng đơn vị với công và nhiệt lượng.',
    explanation: 'Cơ năng có cùng đơn vị với công cơ học và nhiệt lượng, đó là Jun (kí hiệu là J).',
  },
  {
    id: 'p3_3',
    level: 'nhan_biet',
    levelName: 'Mức 1: Nhận biết',
    question: 'Trong các trường hợp sau, trường hợp nào cơ năng của vật KHÔNG ĐƯỢC BẢO TOÀN?',
    options: [
      'Vật rơi tự do không vận tốc ban đầu trong chân không',
      'Một hòn bi lăn trên mặt bàn có ma sát đáng kể',
      'Con lắc đơn dao động trong bình đã hút hết chân không',
      'Một vật được ném thẳng đứng lên cao bỏ qua lực cản không khí',
    ],
    correctIndex: 1,
    hint: 'Hiện tượng ma sát làm sinh nhiệt và làm hao phí năng lượng.',
    explanation: 'Khi có ma sát đáng kể, một phần cơ năng chuyển hoá thành nhiệt năng nên cơ năng không được bảo toàn.',
  },
  {
    id: 'p3_4',
    level: 'thong_hieu',
    levelName: 'Mức 2: Thông hiểu',
    question: 'Khi một quả cầu được ném thẳng đứng từ dưới đất lên cao, trong quá trình bay lên thì:',
    options: [
      'Động năng tăng, thế năng giảm',
      'Cả động năng và thế năng đều tăng',
      'Động năng giảm, thế năng tăng',
      'Cả động năng và thế năng đều giảm',
    ],
    correctIndex: 2,
    hint: 'Càng lên cao thì độ cao h tăng và vận tốc v giảm dần.',
    explanation: 'Khi bay lên, độ cao tăng dần nên thế năng tăng; tốc độ chậm dần nên động năng giảm.',
  },
  {
    id: 'p3_5',
    level: 'thong_hieu',
    levelName: 'Mức 2: Thông hiểu',
    question: 'Một vật khối lượng m = 2 kg được thả rơi từ độ cao h = 10 m xuống đất. Lấy g = 10 m/s². Bỏ qua lực cản không khí. Cơ năng của vật là bao nhiêu?',
    options: [
      '100 J',
      '20 J',
      '50 J',
      '200 J',
    ],
    correctIndex: 3,
    hint: 'Cơ năng ban đầu ở vị trí thả chỉ gồm thế năng cực đại: W = m · g · h.',
    explanation: 'Cơ năng bằng thế năng cực đại ban đầu: W = Wt_max = m·g·h = 2 · 10 · 10 = 200 J.',
  },
  {
    id: 'p3_6',
    level: 'thong_hieu',
    levelName: 'Mức 2: Thông hiểu',
    question: 'Vận tốc của vật ở câu trên (m = 2 kg, thả từ độ cao 10 m) ngay trước khi chạm đất là:',
    options: [
      'v = 14,14 m/s (căn bậc hai của 200)',
      'v = 20 m/s',
      'v = 10 m/s',
      'v = 5 m/s',
    ],
    correctIndex: 0,
    hint: 'Khi chạm đất, toàn bộ cơ năng 200 J chuyển thành động năng 1/2 m v².',
    explanation: 'Wđ_max = 1/2 m v² = W = 200 J => v = √(2 · 200 / 2) = √200 ≈ 14,14 m/s.',
  },
  {
    id: 'p3_7',
    level: 'thong_hieu',
    levelName: 'Mức 2: Thông hiểu',
    question: 'Một con lắc đơn dao động quanh vị trí cân bằng. Tại hai vị trí biên (độ cao cực đại):',
    options: [
      'Thế năng cực đại, động năng bằng 0',
      'Động năng cực đại, thế năng bằng 0',
      'Cả động năng và thế năng đều cực đại',
      'Cơ năng của con lắc bằng 0',
    ],
    correctIndex: 0,
    hint: 'Tại vị trí biên con lắc dừng lại đổi chiều nên vận tốc tức thời bằng 0.',
    explanation: 'Tại vị trí biên, con lắc đổi chiều chuyển động nên vận tốc tức thời bằng 0 => Wđ = 0, thế năng đạt cực đại Wt = W.',
  },
  {
    id: 'p3_8',
    level: 'thong_hieu',
    levelName: 'Mức 2: Thông hiểu',
    question: 'Một quả bóng bàn rơi từ độ cao 1 m xuống sàn gạch nảy lên được độ cao 0,7 m. Hiện tượng này chứng tỏ:',
    options: [
      'Cơ năng quả bóng đã được bảo toàn hoàn toàn',
      'Một phần cơ năng đã chuyển hoá thành nhiệt năng và âm thanh khi va chạm',
      'Khối lượng quả bóng bị giảm đi 30%',
      'Trọng lực không còn tác dụng lên quả bóng khi chạm đất',
    ],
    correctIndex: 1,
    hint: 'Độ cao nảy lên bị giảm đi thể hiện cơ năng không được bảo toàn.',
    explanation: 'Do độ cao nảy lên nhỏ hơn độ cao thả ban đầu nên thế năng cực đại giảm, chứng tỏ cơ năng bị tiêu hao thành nhiệt và âm thanh.',
  },
  {
    id: 'p3_9',
    level: 'van_dung',
    levelName: 'Mức 3: Vận dụng',
    question: 'Vận động viên nhảy sào có khối lượng 60 kg vượt qua mức xà cao 5 m (mốc thế năng tại mặt đệm nhảy, g = 10 m/s²). Thế năng của vận động viên tại đỉnh xà là:',
    options: [
      '3 000 J (3 kJ)',
      '300 J',
      '6 000 J',
      '1 500 J',
    ],
    correctIndex: 0,
    hint: 'Tính theo công thức Wt = m · g · h với m = 60 kg, h = 5 m.',
    explanation: 'Wt = m · g · h = 60 · 10 · 5 = 3 000 J = 3 kJ.',
  },
  {
    id: 'p3_10',
    level: 'van_dung',
    levelName: 'Mức 3: Vận dụng',
    question: 'Một vật trượt không vận tốc đầu từ đỉnh một mặt phẳng nghiêng cao h = 5 m xuống chân dốc. Do có ma sát, vận tốc ở chân dốc đo được là 8 m/s (lấy g = 10 m/s²). Tỉ lệ phần trăm cơ năng bị hao phí là:',
    options: [
      '36%',
      '64%',
      '50%',
      '20%',
    ],
    correctIndex: 0,
    hint: 'So sánh cơ năng ban đầu (g · h = 50) và động năng chân dốc (1/2 · 8² = 32).',
    explanation: 'Cơ năng ban đầu W₁ = m·g·h = 50m. Cơ năng ở chân dốc W₂ = 1/2·m·8² = 32m. Cơ năng hao phí: ΔW = 50m - 32m = 18m. Tỉ lệ hao phí: 18m / 50m = 36%.',
  },
  {
    id: 'p3_11',
    level: 'van_dung',
    levelName: 'Mức 3: Vận dụng',
    question: 'Tại vị trí nào trên quỹ đạo bay của một vật ném xiên thì động năng của vật bằng thế năng (chọn mốc thế năng tại điểm ném)?',
    options: [
      'Tại vị trí có độ cao bằng một nửa độ cao cực đại: h = h_max / 2',
      'Tại vị trí cao nhất trên quỹ đạo',
      'Ngay tại vị trí xuất phát lúc mới ném',
      'Tại vị trí có vận tốc bằng một nửa vận tốc ban đầu',
    ],
    correctIndex: 0,
    hint: 'Khi Wđ = Wt thì W = 2 · Wt.',
    explanation: 'Khi Wđ = Wt thì cơ năng W = Wđ + Wt = 2·Wt => m·g·h_max = 2·m·g·h => h = h_max / 2.',
  },
  {
    id: 'p3_12',
    level: 'van_dung',
    levelName: 'Mức 3: Vận dụng',
    question: 'Một viên đạn khối lượng 20 g (0,02 kg) bay theo phương ngang với vận tốc 400 m/s găm vào một bao cát nằm yên. Toàn bộ động năng của viên đạn đã biến thành:',
    options: [
      'Nhiệt năng làm nóng viên đạn và bao cát cùng công phá huỷ cấu trúc cát',
      'Thế năng trọng trường của viên đạn',
      'Quang năng phát sáng chói loà',
      'Hoá năng sinh ra phản ứng hạt nhân',
    ],
    correctIndex: 0,
    hint: 'Lực cản của cát đã sinh công cản chuyển hoá động năng thành nhiệt và biến dạng.',
    explanation: 'Động năng cực lớn của viên đạn (1/2 · 0,02 · 400² = 1 600 J) khi bị chặn dừng lại chuyển hoá toàn bộ thành nhiệt năng và biến dạng cơ học.',
  },
  {
    id: 'p3_13',
    level: 'van_dung',
    levelName: 'Mức 3: Vận dụng',
    question: 'Tại sao trong môn thể thao nhảy cầu từ ván cao 10 m, các vận động viên phải tiếp nước theo tư thế duỗi thẳng tay chân cắm đầu hoặc mũi chân xuống trước?',
    options: [
      'Để giảm diện tích tiếp xúc với mặt nước, kéo dài quãng đường hãm tốc độ, giảm lực cản đột ngột gây chấn thương nguy hiểm',
      'Để giữ cho thế năng trọng trường không bị chuyển hoá thành động năng',
      'Để làm tăng động năng của cơ thể lúc tiếp nước',
      'Để nổi lên mặt nước ngay lập tức mà không cần bơi',
    ],
    correctIndex: 0,
    hint: 'Tiết diện tiếp xúc càng nhỏ thì áp lực và lực cản của nước càng êm dịu.',
    explanation: 'Ở độ cao 10 m, vận tốc lúc tiếp nước khoảng 14 m/s (50 km/h). Duỗi thẳng người giúp giảm tiết diện xung lực, bảo đảm an toàn sinh mạng.',
  },
  {
    id: 'p3_14',
    level: 'van_dung',
    levelName: 'Mức 3: Vận dụng',
    question: 'Một máy bay phản lực khối lượng 50 tấn đang bay bằng ở độ cao 10 km với vận tốc 900 km/h (250 m/s). So sánh độ lớn động năng và thế năng trọng trường của máy bay (lấy g = 10 m/s²):',
    options: [
      'Thế năng Wt = 5 000 MJ lớn hơn Động năng Wđ = 1 562,5 MJ',
      'Động năng lớn hơn thế năng gấp 2 lần',
      'Động năng và thế năng bằng nhau',
      'Thế năng bằng 0 vì máy bay đang bay bằng',
    ],
    correctIndex: 0,
    hint: 'Tính Wt = m · g · h và Wđ = 1/2 · m · v² rồi so sánh.',
    explanation: 'Wt = 50 000 · 10 · 10 000 = 5·10⁹ J = 5 000 MJ. Wđ = 1/2 · 50 000 · 250² = 1,5625·10⁹ J = 1 562,5 MJ. Thế năng lớn hơn động năng.',
  },
];

export const REAL_WORLD_APPLICATION_3 = {
  projectTitle: 'Dự Án STEM Kĩ Thuật: Thiết Kế Đường Lượn An Toàn & Khai Thác Năng Lượng Đập Thuỷ Điện',
  overview:
    'Vận dụng định luật bảo toàn cơ năng và tính toán độ tiêu hao cơ năng để giải quyết 2 bài toán thực tiễn: Thiết kế máng trượt công viên nước không bị lật và tính công suất phát điện của đập thuỷ điện.',
  steps: [
    {
      title: 'Bước 1: Khảo sát độ cao dốc thả ban đầu (h_A)',
      content: 'Xác định mốc thế năng tại mặt hồ bơi (h = 0). Tính toán độ cao đỉnh máng trượt h_A để đảm bảo vận tốc tối đa của người trượt ở chân máng không vượt quá ngưỡng an toàn v_max = 12 m/s (43 km/h). Áp dụng công thức: h_A ≤ v_max² / (2g) = 144 / 20 = 7,2 m.',
    },
    {
      title: 'Bước 2: Bố trí độ cao các gờ uốn lượn tiếp theo',
      content: 'Tại mỗi khúc cua và đỉnh dốc phụ B, C, độ cao phải thoả mãn điều kiện h_sau < h_trước ít nhất 1,5 m nhằm bù đắp cho công của lực ma sát giữa người với mặt máng có nước (nếu không người trượt sẽ bị đứng lại giữa chừng).',
    },
    {
      title: 'Bước 3: Thiết kế đoạn phanh giảm tốc cuối hành trình',
      content: 'Tại đoạn cuối sát mặt nước, sử dụng máng nằm ngang có mực nước sâu dần để tạo lực cản nước lớn, chuyển hoá toàn bộ động năng của người thành nhiệt năng và sóng nước an toàn.',
    },
  ],
  studentActionPrompt:
    'Em hãy viết một đoạn báo cáo ngắn (3 - 5 câu) giải thích tại sao trong các nhà máy thuỷ điện, hồ chứa nước ở vùng núi cao có ý nghĩa sống còn đối với công suất phát điện của nhà máy?',
};

export const EXTENSION_CONTENT_3 = {
  badgeLabel: 'Cơ Học Tương Lai & Năng Lượng Xanh',
  disclaimer: 'Kiến thức mở rộng dành cho học sinh yêu thích Vật lý hiện đại & Kĩ thuật Không gian vũ trụ.',
  topics: [
    {
      title: 'Pin Cơ Học Bánh Đà (Flywheel Energy Storage)',
      content: 'Công nghệ lưu trữ năng lượng bằng cách quay một bánh đà khối lượng lớn bằng sợi carbon trong môi trường chân không với tốc độ 60 000 vòng/phút. Điện năng dư thừa được chuyển thành động năng quay của bánh đà, khi cần điện bánh đà làm quay máy phát trả lại điện với hiệu suất lên tới 90%, không độc hại như pin hoá học.',
    },
    {
      title: 'Tàu Đệm Từ Maglev & Tàu Chân Không Hyperloop',
      content: 'Bằng cách nâng đoàn tàu lơ lửng nhờ đệm từ trường (loại bỏ hoàn toàn ma sát bánh xe) và cho tàu chạy trong ống hút chân không (loại bỏ lực cản không khí), cơ năng của đoàn tàu gần như được bảo toàn tuyệt đối, cho phép đạt vận tốc vượt 600 - 1000 km/h với mức tiêu thụ năng lượng cực thấp.',
    },
    {
      title: 'Cơ Chế Bắn Vệ Tinh Không Dùng Tên Lửa (SpinLaunch)',
      content: 'Hệ thống dùng cánh tay đòn quay khổng lồ trong buồng chân không để tăng tốc viên đạn mang vệ tinh lên vận tốc Mach 6 (gần 8 000 km/h) nhờ tích luỹ động năng quay, sau đó phóng vút lên tầng bình lưu, giúp tiết kiệm hơn 80% nhiên liệu tên lửa truyền thống.',
    },
  ],
};

export const FINAL_ASSESSMENT_QUIZ_3: PracticeQuestion[] = [
  {
    id: 'fq3_1',
    level: 'nhan_biet',
    levelName: 'Nhận biết',
    question: 'Biểu thức tính cơ năng của một vật khối lượng m, chuyển động với vận tốc v ở độ cao h so với mốc thế năng trong trọng trường là:',
    options: [
      'W = 1/2 · m · v² + m · g · h',
      'W = m · v + m · g · h',
      'W = 1/2 · m · v² - m · g · h',
      'W = m · g · h',
    ],
    correctIndex: 0,
    hint: 'Cơ năng bằng tổng động năng cộng thế năng.',
    explanation: 'Cơ năng W = Wđ + Wt = 1/2 m v² + m g h.',
  },
  {
    id: 'fq3_2',
    level: 'nhan_biet',
    levelName: 'Nhận biết',
    question: 'Định luật bảo toàn cơ năng được áp dụng khi vật chuyển động:',
    options: [
      'Chỉ dưới tác dụng của trọng lực (hoặc lực đàn hồi), bỏ qua ma sát và lực cản',
      'Trong mọi môi trường có lực ma sát lớn',
      'Với vận tốc cực kì lớn vượt tốc độ âm thanh',
      'Có khối lượng biến đổi liên tục',
    ],
    correctIndex: 0,
    hint: 'Chỉ áp dụng khi không có lực ma sát hoặc lực cản làm tiêu hao cơ năng.',
    explanation: 'Định luật chỉ nghiệm đúng khi không có sự tiêu tán cơ năng do lực ma sát hay lực cản môi trường.',
  },
  {
    id: 'fq3_3',
    level: 'thong_hieu',
    levelName: 'Thông hiểu',
    question: 'Một vật được thả rơi tự do từ độ cao h xuống mặt đất. Khi thế năng bằng động năng (Wt = Wđ) thì vật đang ở độ cao nào?',
    options: [
      'h / 2 (ở độ cao bằng một nửa độ cao thả ban đầu)',
      'h / 4',
      '3h / 4',
      'Ngay sát mặt đất',
    ],
    correctIndex: 0,
    hint: 'Tổng cơ năng là W = 2 · Wt.',
    explanation: 'W = Wt + Wđ = 2·Wt => m·g·h = 2·m·g·h_vị_trí => h_vị_trí = h / 2.',
  },
  {
    id: 'fq3_4',
    level: 'thong_hieu',
    levelName: 'Thông hiểu',
    question: 'Trong dao động của con lắc đồng hồ quả lắc, chuyển hoá năng lượng nào diễn ra khi quả lắc đi từ vị trí cân bằng sang vị trí biên?',
    options: [
      'Động năng chuyển hoá thành thế năng',
      'Thế năng chuyển hoá thành động năng',
      'Nhiệt năng chuyển hoá thành cơ năng',
      'Điện năng chuyển hoá thành cơ năng',
    ],
    correctIndex: 0,
    hint: 'Từ vị trí thấp nhất lên vị trí cao nhất.',
    explanation: 'Khi đi từ vị trí cân bằng lên biên, độ cao tăng dần nên thế năng tăng, tốc độ giảm dần về 0 nên động năng chuyển thành thế năng.',
  },
  {
    id: 'fq3_5',
    level: 'thong_hieu',
    levelName: 'Thông hiểu',
    question: 'Một hòn bi sắt nặng 0,2 kg được thả rơi từ đỉnh tháp cao 45 m xuống đất (lấy g = 10 m/s², bỏ qua lực cản). Động năng của hòn bi khi vừa chạm đất là:',
    options: [
      '90 J',
      '45 J',
      '180 J',
      '9 J',
    ],
    correctIndex: 0,
    hint: 'Động năng chạm đất bằng thế năng tại đỉnh tháp.',
    explanation: 'Theo định luật bảo toàn cơ năng: Wđ_chạm_đất = Wt_đỉnh = m · g · h = 0,2 · 10 · 45 = 90 J.',
  },
  {
    id: 'fq3_6',
    level: 'van_dung',
    levelName: 'Vận dụng',
    question: 'Vận tốc chạm đất của hòn bi sắt ở câu hỏi trên (thả từ độ cao 45 m) bằng bao nhiêu?',
    options: [
      '30 m/s (108 km/h)',
      '20 m/s',
      '15 m/s',
      '45 m/s',
    ],
    correctIndex: 0,
    hint: 'Wđ = 1/2 · m · v² = 90 J.',
    explanation: 'Wđ = 1/2 · m · v² = 90 J => v² = 2 · 90 / 0,2 = 900 => v = √900 = 30 m/s.',
  },
  {
    id: 'fq3_7',
    level: 'van_dung',
    levelName: 'Vận dụng',
    question: 'Một chiếc xe đồ chơi chuyển động từ vị trí A có cơ năng 50 J đến vị trí B có cơ năng 42 J. Kết luận nào sau đây là ĐÚNG NHẤT?',
    options: [
      'Lực ma sát đã sinh công cản 8 J làm cơ năng chuyển hoá thành nhiệt năng',
      'Xe đã bay lên cao thêm một đoạn tương ứng với 8 J thế năng',
      'Khối lượng của xe bị giảm đi 8 kg',
      'Cơ năng của chiếc xe luôn được bảo toàn tuyệt đối',
    ],
    correctIndex: 0,
    hint: 'Cơ năng bị giảm một lượng bằng công của lực cản.',
    explanation: 'Độ giảm cơ năng ΔW = 50 - 42 = 8 J chính là công của lực cản/ma sát chuyển hoá cơ năng thành nhiệt năng.',
  },
];
