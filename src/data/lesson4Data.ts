import { PracticeQuestion } from '../types';

export const HOOK_SCENARIO_4 = {
  scenarioTitle: 'Nghịch Lý Đẩy Tường & Cuộc Đua Bốc Vác: Ai Mới Thực Sự "Sinh Công"?',
  scenarioContent:
    'Tại một bến cảng, một người cử phu gắng hết sức bình sinh đẩy một khối container nặng 10 tấn suốt 20 phút. Mặc dù mồ hôi đầm đìa, cơ bắp căng cứng và tim đập dồn dập, nhưng khối container kiên cố vẫn đứng bất động không xê dịch một milimét nào. Cùng lúc đó, một chiếc xe nâng điện nhẹ nhàng nâng một kiện hàng 500 kg lên thùng xe tải cao 1,5 mét chỉ trong vòng 3 giây. Theo cách nói dân gian, người cử phu đã "tốn biết bao công sức", còn chiếc xe nâng "làm việc chẳng tốn mồ hôi". Tuy nhiên trong Vật lí học, các nhà khoa học lại khẳng định: Người cử phu KHÔNG HỀ SINH CÔNG CƠ HỌC (A = 0), còn xe nâng điện đã sinh một công rất lớn với CÔNG SUẤT cực kì ấn tượng!',
  question: 'Vì sao trong trường hợp người cử phu đẩy khối container, công cơ học trong vật lí lại bằng 0?',
  options: [
    {
      id: 'opt_1',
      text: 'Vì điều kiện cần và đủ để có công cơ học là phải có lực tác dụng và vật phải DỊCH CHUYỂN theo phương không vuông góc với lực; do container đứng yên (s = 0) nên công A = 0.',
      isCorrect: true,
      feedback: 'Chính xác! Công cơ học A = F · s. Khi quãng đường s = 0 (vật không xê dịch), thì dù lực tác dụng F lớn bao nhiêu và người có mệt mỏi đến đâu, công cơ học sinh ra vẫn bằng 0.',
    },
    {
      id: 'opt_2',
      text: 'Vì khối container bằng kim loại dẫn điện tốt nên hấp thụ hết toàn bộ công mà người đẩy sinh ra.',
      isCorrect: false,
      feedback: 'Sai kiến thức vật lí. Khả năng dẫn điện không liên quan đến công thức công cơ học.',
    },
    {
      id: 'opt_3',
      text: 'Vì khối lượng của container quá lớn nên trong vật lí người ta quy ước công đó không đáng kể.',
      isCorrect: false,
      feedback: 'Không đúng. Trong vật lí không có quy ước này; công A = F · s hoàn toàn phụ thuộc vào tích của lực và quãng đường dịch chuyển.',
    },
    {
      id: 'opt_4',
      text: 'Vì người cử phu chỉ dùng lực sinh học cơ bắp chứ không phải lực cơ học máy móc.',
      isCorrect: false,
      feedback: 'Sai khái niệm. Lực do cơ bắp con người tác dụng lên vật thể vẫn là một lực cơ học hoàn chỉnh.',
    },
  ],
};

export const KNOWLEDGE_CARDS_4 = [
  {
    id: 'kc_4_1',
    title: '1. Công Cơ Học & Điều Kiện Sinh Công',
    subtitle: 'A = F · s (Đơn vị: Jun - J)',
    badge: 'Khái niệm nền tảng',
    content:
      'Trong vật lí, thuật ngữ "công" chỉ được dùng khi có CÔNG CƠ HỌC.\n\nĐIỀU KIỆN CÓ CÔNG CƠ HỌC:\nChỉ có công cơ học khi có lực tác dụng vào vật và làm cho vật DỊCH CHUYỂN theo phương không vuông góc với phương của lực.\n\nCÔNG THỨC TÍNH CÔNG:\nKhi lực F cùng hướng với hướng chuyển dời của vật:\n  A = F · s\nTrong đó:\n• F: Độ lớn lực tác dụng lên vật, đo bằng Niutơn (N).\n• s: Quãng đường vật dịch chuyển, đo bằng mét (m).\n• A: Công cơ học, đo bằng Jun (kí hiệu là J).\n  1 J = 1 N · 1 m = 1 N·m.\n\nTRƯỜNG HỢP LỰC KHÔNG SINH CÔNG (A = 0):\n1. Lực tác dụng nhưng vật không dịch chuyển (s = 0).\n2. Phương của lực vuông góc với phương chuyển dời của vật (ví dụ: trọng lực của hòm hàng khi ta kéo hòm trượt ngang trên sàn phẳng nằm ngang).',
    keyTakeaway: 'Có công cơ học khi và chỉ khi: có LỰC tác dụng và có ĐỘ DỊCH CHUYỂN không vuông góc với lực.',
    quickCheck: {
      question: 'Trường hợp nào sau đây lực tác dụng ĐÃ SINH CÔNG CƠ HỌC?',
      options: [
        { id: 'q1_a', text: 'Con bò đang dùng lực kéo chiếc xe bò lăn bánh trên đường', isCorrect: true },
        { id: 'q1_b', text: 'Người học sinh đứng yên một chỗ vác cặp sách nặng 5 kg trên vai', isCorrect: false },
        { id: 'q1_c', text: 'Vận động viên giữ tạ đứng bất động trên cao suốt 5 giây', isCorrect: false },
        { id: 'q1_d', text: 'Chiếc ô tô trượt trên đường ngang, trọng lực của ô tô tác dụng vuông góc mặt đường', isCorrect: false },
      ],
      explanation: 'Con bò tác dụng lực kéo F và chiếc xe chuyển dời một quãng đường s cùng hướng với lực nên sinh công cơ học A = F · s.',
    },
  },
  {
    id: 'kc_4_2',
    title: '2. Đơn Vị Của Công & Các Bội Số Thường Dùng',
    subtitle: 'Jun (J), Kilôjun (kJ), Megajun (MJ)',
    badge: 'Đo lường chuẩn SI',
    content:
      'Đơn vị đo công trong Hệ đo lường quốc tế (SI) là JUN (kí hiệu là J), đặt theo tên nhà vật lí người Anh James Prescott Joule.\n\nQUY ĐỔI ĐƠN VỊ:\n• 1 Jun (J) là công của một lực 1 Niutơn làm vật dịch chuyển 1 mét theo hướng của lực: 1 J = 1 N · 1 m.\n• 1 Kilôjun (kJ) = 1 000 J = 10³ J.\n• 1 Megajun (MJ) = 1 000 000 J = 10⁶ J.\n• 1 Gigajun (GJ) = 10⁹ J.\n\nĐƠN VỊ NĂNG LƯỢNG KHÁC TRONG ĐỜI SỐNG:\n• Calorie (cal): Thường dùng trong dinh dưỡng: 1 cal ≈ 4,184 J; 1 kcal (Calo lớn) ≈ 4 184 J.\n• Kilôoát giờ (kWh): Đơn vị tính hoá đơn tiền điện: 1 kWh = 3 600 000 J = 3,6 MJ.',
    keyTakeaway: '1 J = 1 N·m; 1 kJ = 10³ J; 1 MJ = 10⁶ J; 1 kWh = 3,6 · 10⁶ J.',
    quickCheck: {
      question: 'Một người tác dụng lực kéo 250 N kéo một xe hàng đi được quãng đường 40 m theo hướng của lực. Công sinh ra là bao nhiêu?',
      options: [
        { id: 'q2_a', text: '10 kJ (tức 10 000 J)', isCorrect: true },
        { id: 'q2_b', text: '1 000 J', isCorrect: false },
        { id: 'q2_c', text: '100 kJ', isCorrect: false },
        { id: 'q2_d', text: '6,25 J', isCorrect: false },
      ],
      explanation: 'A = F · s = 250 N · 40 m = 10 000 J = 10 kJ.',
    },
  },
  {
    id: 'kc_4_3',
    title: '3. Công Suất & Tốc Độ Thực Hiện Công',
    subtitle: 'P = A / t (Đơn vị: Oát - W)',
    badge: 'Đại lượng tốc độ sinh công',
    content:
      'KHÁI NIỆM CÔNG SUẤT:\nĐể biết người nào làm việc khoẻ hơn hoặc máy móc nào hoạt động mạnh mẽ hơn, người ta so sánh CÔNG THỰC HIỆN ĐƯỢC TRONG CÙNG MỘT ĐƠN VỊ THỜI GIAN.\n\nĐỊNH NGHĨA CÔNG SUẤT:\nCông suất là đại lượng đặc trưng cho tốc độ thực hiện công, được xác định bằng công thực hiện được trong một đơn vị thời gian.\n\nBIỂU THỨC TÍNH CÔNG SUẤT:\n  P = A / t\nTrong đó:\n• A: Công thực hiện được, đo bằng Jun (J).\n• t: Thời gian thực hiện công đó, đo bằng giây (s).\n• P: Công suất, đo bằng Oát (kí hiệu là W).\n\nHỆ QUẢ QUAN TRỌNG:\nKhi vật chuyển động thẳng đều với vận tốc v dưới tác dụng của lực kéo F không đổi theo phương chuyển động:\n  P = A / t = (F · s) / t = F · v',
    keyTakeaway: 'Công suất đặc trưng cho tốc độ thực hiện công: P = A / t = F · v.',
    quickCheck: {
      question: 'Một cần cẩu thực hiện công 120 kJ để nâng khối bê tông trong 30 giây. Công suất của cần cẩu là bao nhiêu?',
      options: [
        { id: 'q3_a', text: '4 000 W (tức 4 kW)', isCorrect: true },
        { id: 'q3_b', text: '3 600 kW', isCorrect: false },
        { id: 'q3_c', text: '400 W', isCorrect: false },
        { id: 'q3_d', text: '40 kW', isCorrect: false },
      ],
      explanation: 'Đổi A = 120 kJ = 120 000 J. Ta có P = A / t = 120 000 / 30 = 4 000 W = 4 kW.',
    },
  },
  {
    id: 'kc_4_4',
    title: '4. Đơn Vị Công Suất & Ý Nghĩa Số Ghi Trên Thiết Bị',
    subtitle: 'W, kW, MW, Mã Lực (HP, CV)',
    badge: 'Ứng dụng kĩ thuật & Đời sống',
    content:
      'ĐƠN VỊ CÔNG SUẤT:\n• Đơn vị trong hệ SI là Oát (Watt, kí hiệu là W), đặt theo tên James Watt:\n  1 W = 1 J / 1 s = 1 J/s.\n• 1 Kilôoát (kW) = 1 000 W = 10³ W.\n• 1 Mêgaoát (MW) = 1 000 000 W = 10⁶ W.\n• 1 Gigaoát (GW) = 1 000 000 000 W = 10⁹ W.\n\nĐƠN VỊ MÃ LỰC (SỨC NGỰA):\nTrong kĩ thuật chế tạo ô tô, tàu thuỷ, máy bay thường dùng đơn vị Mã lực (Horsepower):\n• Mã lực Anh/Mỹ (HP): 1 HP ≈ 746 W (hoặc 0,746 kW).\n• Mã lực Pháp (CV hay PS): 1 CV ≈ 736 W (hoặc 0,736 kW).\n\nÝ NGHĨA SỐ GHI CÔNG SUẤT TRÊN THIẾT BỊ:\nSố oát ghi trên nhãn động cơ cho biết CÔNG SUẤT ĐỊNH MỨC của máy đó (tức là công hoặc năng lượng mà máy có thể sinh ra hoặc tiêu thụ trong mỗi 1 giây khi hoạt động bình thường).\nVí dụ: Máy bơm ghi 750 W nghĩa là mỗi giây máy thực hiện được một công tối đa 750 J.',
    keyTakeaway: '1 W = 1 J/s; 1 kW = 10³ W; 1 HP ≈ 746 W; Số ghi công suất = công thực hiện trong mỗi giây.',
    quickCheck: {
      question: 'Một động cơ xe gắn máy có ghi thông số công suất là 8,5 kW. Thông số này có ý nghĩa gì?',
      options: [
        { id: 'q4_a', text: 'Trong mỗi 1 giây, động cơ có thể thực hiện một công là 8 500 Jun', isCorrect: true },
        { id: 'q4_b', text: 'Chiếc xe chỉ có thể chạy được quãng đường tối đa là 8,5 km', isCorrect: false },
        { id: 'q4_c', text: 'Chiếc xe tiêu thụ hết 8,5 lít xăng trong một giờ chạy', isCorrect: false },
        { id: 'q4_d', text: 'Lực kéo tối đa của xe luôn luôn bằng đúng 8 500 Niutơn', isCorrect: false },
      ],
      explanation: 'P = 8,5 kW = 8 500 W = 8 500 J/s. Nghĩa là trong mỗi 1 giây hoạt động bình thường, động cơ sinh ra công cơ học là 8 500 J.',
    },
  },
];

export const CORE_SUMMARY_4 = {
  lessonTitle: 'Bài 4: Công và công suất',
  summaryPoints: [
    'Điều kiện có công cơ học: Phải có lực tác dụng vào vật và vật phải chuyển dời theo phương không vuông góc với phương của lực.',
    'Công thức tính công khi lực cùng hướng chuyển dời: A = F · s. Đơn vị của công là Jun (J), 1 J = 1 N · 1 m.',
    'Trường hợp đặc biệt: Nếu phương của lực vuông góc với phương chuyển dời (alpha = 90°), lực không sinh công (A = 0).',
    'Công suất là đại lượng đặc trưng cho tốc độ thực hiện công: P = A / t. Khi vật chuyển động thẳng đều: P = F · v.',
    'Đơn vị của công suất là Oát (W), 1 W = 1 J/s. Các bội số thường dùng: 1 kW = 1 000 W; 1 MW = 1 000 000 W. Mã lực: 1 HP ≈ 746 W.',
    'Ý nghĩa số ghi công suất định mức trên thiết bị: Cho biết công mà thiết bị có thể thực hiện được trong mỗi một giây khi vận hành bình thường.',
  ],
};

export const MATCHING_PAIRS_LESSON_4 = [
  { id: 'm4_1', tool: 'Công cơ học (A)', role: 'Đại lượng đo bằng tích của lực và quãng đường dịch chuyển: A = F · s', category: 'Khái niệm' },
  { id: 'm4_2', tool: 'Công suất (P)', role: 'Đại lượng đặc trưng cho tốc độ thực hiện công trong 1 đơn vị thời gian: P = A/t', category: 'Đại lượng' },
  { id: 'm4_3', tool: 'Đơn vị Oát (W)', role: 'Đơn vị đo công suất trong hệ SI, tương đương với 1 Jun trên một giây (1 J/s)', category: 'Đơn vị SI' },
  { id: 'm4_4', tool: 'Lực vuông góc với dời', role: 'Không sinh công cơ học (A = 0), ví dụ trọng lực khi vật trượt trên mặt phẳng ngang', category: 'Tính chất' },
  { id: 'm4_5', tool: 'Mã lực (Horsepower - HP)', role: 'Đơn vị công suất truyền thống trong kĩ thuật động cơ, 1 HP xấp xỉ bằng 746 W', category: 'Đơn vị kĩ thuật' },
];

export const DETECTIVE_MISSIONS_LESSON_4 = [
  {
    id: 'det4_1',
    scenario: 'Nhiệm vụ 1: Giám định hiện trường tai nạn công trường.',
    question: 'Một chiếc cần cẩu nâng khối sắt 2 000 kg lên tầng cao 20 m. Khi khối sắt lên đến đỉnh và được treo đứng yên trên không trung suốt 30 phút, thanh tra kết luận: "Trong 30 phút này, sợi dây cáp của cần cẩu không hề sinh công cơ học lên khối sắt". Kết luận này đúng hay sai và vì sao?',
    options: [
      'ĐÚNG, vì khối sắt đứng yên nên quãng đường dịch chuyển s = 0, do đó A = F · s = 0 J.',
      'SAI, vì dây cáp phải chịu lực căng rất lớn nên liên tục sinh công duy trì độ cao.',
      'SAI, vì năng lượng điện của cần cẩu vẫn bị tiêu tốn do máy giữ tải.',
      'ĐÚNG, nhưng chỉ vì khối lượng sắt quá nhỏ không đủ tạo ra công cơ học.',
    ],
    correctIndex: 0,
    explanation: 'Dù lực căng của dây cáp rất lớn để cân bằng với trọng lực, nhưng vì vật không dịch chuyển (s = 0), công cơ học A = F · s = 0 J.',
  },
  {
    id: 'det4_2',
    scenario: 'Nhiệm vụ 2: Thử nghiệm hiệu suất giữa hai chiếc máy bơm nước nông nghiệp.',
    question: 'Máy bơm A bơm được 2 000 lít nước lên bể cao 10 m trong thời gian 10 phút. Máy bơm B bơm được 3 000 lít nước lên cùng độ cao đó trong thời gian 20 phút. Máy nào có CÔNG SUẤT lớn hơn?',
    options: [
      'Máy bơm A có công suất lớn hơn máy bơm B (PA > PB).',
      'Máy bơm B có công suất lớn hơn máy bơm A (PB > PA).',
      'Hai máy có công suất hoàn toàn bằng nhau vì đều nâng nước lên cùng độ cao 10 m.',
      'Không thể so sánh được vì lượng nước bơm khác nhau.',
    ],
    correctIndex: 0,
    explanation: 'Công tỉ lệ với thể tích nước: AA = k · 2 000, AB = k · 3 000. PA = AA / 10 = 200 · k; PB = AB / 20 = 150 · k. Vậy PA > PB (Máy A làm việc với tốc độ sinh công nhanh hơn).',
  },
  {
    id: 'det4_3',
    scenario: 'Nhiệm vụ 3: Tối ưu hoá vận tốc xe tải leo đèo dốc hiểm trở.',
    question: 'Khi một chiếc ô tô tải chở nặng bắt đầu leo lên một con dốc dài và cao, tài xế thường phải về số thấp (số 1 hoặc số 2) để xe chạy chậm lại. Dựa vào công thức công suất P = F · v, hành động này có ý nghĩa vật lí gì?',
    options: [
      'Khi công suất P của động cơ đạt giới hạn, giảm vận tốc v sẽ giúp tăng tối đa lực kéo F để xe thắng được trọng lực leo dốc.',
      'Để giảm lực ma sát giữa bánh xe với mặt đường dốc.',
      'Để làm tăng công suất của động cơ lên gấp 10 lần.',
      'Để tiết kiệm tối đa nhiên liệu chạy động cơ.',
    ],
    correctIndex: 0,
    explanation: 'Ta có P = F · v => F = P / v. Khi động cơ hoạt động ở công suất tối đa định mức P không đổi, muốn có lực kéo F cực đại để thắng thành phần trọng lực kéo lùi khi lên dốc, xe phải giảm vận tốc v bằng cách chuyển về số thấp.',
  },
];

export const PRACTICE_QUESTIONS_4: PracticeQuestion[] = [
  {
    id: 'p4_1',
    level: 'nhan_biet',
    levelName: 'Mức 1: Nhận biết',
    question: 'Điều kiện cần và đủ để xuất hiện công cơ học là gì?',
    options: [
      'Có lực tác dụng vào vật và vật phải dịch chuyển theo phương không vuông góc với phương của lực',
      'Chỉ cần có lực tác dụng vào vật với độ lớn rất lớn',
      'Vật chuyển động tự do trong không gian không chịu lực nào',
      'Vật chịu tác dụng của hai lực cân bằng và đứng yên',
    ],
    correctIndex: 0,
    hint: 'Công cơ học đòi hỏi cả Lực và Quãng đường dịch chuyển theo hướng của lực.',
    explanation: 'SGK KHTN 9 trang 21 khẳng định: Chỉ có công cơ học khi có lực tác dụng vào vật và làm cho vật dịch chuyển theo phương không vuông góc với lực.',
  },
  {
    id: 'p4_2',
    level: 'nhan_biet',
    levelName: 'Mức 1: Nhận biết',
    question: 'Công thức tính công cơ học trong trường hợp lực F cùng hướng với hướng chuyển dời của vật là:',
    options: [
      'A = F · s',
      'A = F / s',
      'A = F · t',
      'A = 1/2 · F · s²',
    ],
    correctIndex: 0,
    hint: 'Công bằng lực nhân quãng đường.',
    explanation: 'Biểu thức tính công chuẩn là A = F · s, trong đó F là lực (N), s là quãng đường (m), A là công (J).',
  },
  {
    id: 'p4_3',
    level: 'nhan_biet',
    levelName: 'Mức 1: Nhận biết',
    question: 'Đơn vị của công cơ học trong Hệ đơn vị đo lường quốc tế (SI) là:',
    options: [
      'Jun (J)',
      'Oát (W)',
      'Niutơn (N)',
      'Mã lực (HP)',
    ],
    correctIndex: 0,
    hint: '1 J = 1 N · 1 m.',
    explanation: 'Đơn vị đo công cơ học là Jun (J). 1 J = 1 N · m. Oát (W) là đơn vị công suất.',
  },
  {
    id: 'p4_4',
    level: 'nhan_biet',
    levelName: 'Mức 1: Nhận biết',
    question: 'Công suất là đại lượng vật lí đặc trưng cho:',
    options: [
      'Tốc độ thực hiện công (mức độ thực hiện công nhanh hay chậm)',
      'Độ lớn của lực tác dụng lên vật',
      'Quãng đường vật dịch chuyển được dài hay ngắn',
      'Khối lượng của vật đang chuyển động',
    ],
    correctIndex: 0,
    hint: 'So sánh công sinh ra trong 1 đơn vị thời gian.',
    explanation: 'Công suất là đại lượng đặc trưng cho tốc độ thực hiện công, xác định bằng công thực hiện được trong một đơn vị thời gian: P = A / t.',
  },
  {
    id: 'p4_5',
    level: 'nhan_biet',
    levelName: 'Mức 1: Nhận biết',
    question: 'Biểu thức xác định công suất là:',
    options: [
      'P = A / t',
      'P = A · t',
      'P = t / A',
      'P = F / t',
    ],
    correctIndex: 0,
    hint: 'Công chia cho thời gian.',
    explanation: 'P = A / t, trong đó A là công (J), t là thời gian (s), P là công suất (W).',
  },
  {
    id: 'p4_6',
    level: 'thong_hieu',
    levelName: 'Mức 2: Thông hiểu',
    question: 'Trường hợp nào sau đây lực tác dụng KHÔNG SINH CÔNG cơ học (công cơ học bằng 0)?',
    options: [
      'Một người xách va li đi bộ trên mặt sàn ga tàu bằng phẳng nằm ngang (trọng lực tác dụng lên va li)',
      'Đầu tàu hoả kéo các toa tàu chuyển động trên đường ray nằm ngang',
      'Cần cẩu kéo một khối đá xây dựng lên cao theo phương thẳng đứng',
      'Quả dừa rơi tự do từ trên cành cây cao xuống đất',
    ],
    correctIndex: 0,
    hint: 'Khi lực vuông góc với phương dịch chuyển thì không sinh công.',
    explanation: 'Khi người xách va li đi trên đường bằng, trọng lực hướng thẳng đứng xuống dưới vuông góc với phương chuyển dời nằm ngang (alpha = 90°), do đó trọng lực không sinh công (A = 0).',
  },
  {
    id: 'p4_7',
    level: 'thong_hieu',
    levelName: 'Mức 2: Thông hiểu',
    question: 'Một người kéo một thùng hàng có trọng lượng 500 N trượt đều một đoạn 10 m trên mặt sàn nằm ngang. Lực kéo của người theo phương ngang là 150 N. Công của người đó đã thực hiện là:',
    options: [
      '1 500 J',
      '5 000 J',
      '3 500 J',
      '65 000 J',
    ],
    correctIndex: 0,
    hint: 'Công của người kéo tính theo lực kéo F = 150 N, không lấy trọng lượng P.',
    explanation: 'Công của lực kéo người thực hiện: A = F_kéo · s = 150 N · 10 m = 1 500 J. (Trọng lượng 500 N vuông góc với mặt sàn nên không sinh công).',
  },
  {
    id: 'p4_8',
    level: 'thong_hieu',
    levelName: 'Mức 2: Thông hiểu',
    question: 'Một bóng đèn sợi đốt ghi "220V - 100W". Số ghi "100W" có ý nghĩa là:',
    options: [
      'Trong mỗi 1 giây đèn hoạt động bình thường, điện năng chuyển hoá thành quang năng và nhiệt năng là 100 Jun',
      'Mỗi giờ đèn tiêu thụ hết 100 Jun năng lượng',
      'Lực phát sáng của đèn tương đương 100 Niutơn',
      'Đèn chỉ có thể dùng tối đa trong 100 phút',
    ],
    correctIndex: 0,
    hint: '1 W = 1 J/s.',
    explanation: 'Công suất 100 W = 100 J/s nghĩa là trong mỗi giây đèn tiêu thụ và chuyển hoá 100 Jun năng lượng.',
  },
  {
    id: 'p4_9',
    level: 'thong_hieu',
    levelName: 'Mức 2: Thông hiểu',
    question: 'Hai chiếc cần cẩu nâng hai kiện hàng có cùng khối lượng lên cùng độ cao. Cần cẩu 1 hoàn thành trong 10 giây, cần cẩu 2 hoàn thành trong 25 giây. So sánh công và công suất của hai cần cẩu:',
    options: [
      'Hai cần cẩu thực hiện công bằng nhau (A1 = A2), nhưng công suất cần cẩu 1 lớn gấp 2,5 lần cần cẩu 2 (P1 = 2,5 P2)',
      'Cần cẩu 1 thực hiện công lớn hơn cần cẩu 2',
      'Công suất hai cần cẩu bằng nhau vì nâng cùng khối lượng',
      'Cần cẩu 2 có công suất lớn hơn vì làm việc lâu hơn',
    ],
    correctIndex: 0,
    hint: 'Cùng nâng vật m lên cao h thì A = mgh bằng nhau. Thời gian t1 ngắn hơn thì P1 = A/t1 lớn hơn.',
    explanation: 'Vì cùng khối lượng và cùng độ cao nên A1 = A2 = P · h. Nhưng t1 = 10s < t2 = 25s nên P1 = A / 10 = 2,5 · (A / 25) = 2,5 · P2.',
  },
  {
    id: 'p4_10',
    level: 'thong_hieu',
    levelName: 'Mức 2: Thông hiểu',
    question: 'Một ô tô chuyển động thẳng đều trên đường nằm ngang với vận tốc không đổi v = 72 km/h (20 m/s). Lực kéo của động cơ ô tô là 1 200 N. Công suất tức thời của động cơ là:',
    options: [
      '24 kW (tức 24 000 W)',
      '86,4 kW',
      '60 W',
      '2 400 W',
    ],
    correctIndex: 0,
    hint: 'Dùng công thức hệ quả P = F · v.',
    explanation: 'Đổi v = 72 km/h = 20 m/s. Áp dụng P = F · v = 1 200 N · 20 m/s = 24 000 W = 24 kW.',
  },
  {
    id: 'p4_11',
    level: 'van_dung',
    levelName: 'Mức 3: Vận dụng',
    question: 'Một thang máy có tổng khối lượng (gồm cả buồng thang và người) là m = 800 kg. Thang máy được kéo chuyển động thẳng đều lên cao 30 m trong thời gian 20 giây (lấy g = 10 m/s²). Công suất có ích của động cơ kéo thang máy là:',
    options: [
      '12 kW',
      '24 kW',
      '8 kW',
      '240 kW',
    ],
    correctIndex: 0,
    hint: 'Tính công A = m · g · h rồi tính công suất P = A / t.',
    explanation: 'Trọng lượng P = 800 · 10 = 8 000 N. Công nâng thang máy: A = P · h = 8 000 · 30 = 240 000 J = 240 kJ. Công suất: P = A / t = 240 000 / 20 = 12 000 W = 12 kW.',
  },
  {
    id: 'p4_12',
    level: 'van_dung',
    levelName: 'Mức 3: Vận dụng',
    question: 'Một máy bơm nước có công suất 1,5 kW hoạt động liên tục trong nửa giờ (30 phút). Công mà máy bơm này đã thực hiện là bao nhiêu?',
    options: [
      '2,7 MJ (tức 2 700 000 J)',
      '45 kJ',
      '750 J',
      '4,5 MJ',
    ],
    correctIndex: 0,
    hint: 'Đổi thời gian t = 30 phút = 1 800 giây, đổi P = 1 500 W. Sau đó tính A = P · t.',
    explanation: 't = 30 · 60 = 1 800 s. P = 1,5 kW = 1 500 W. Ta có A = P · t = 1 500 · 1 800 = 2 700 000 J = 2,7 MJ.',
  },
  {
    id: 'p4_13',
    level: 'van_dung',
    levelName: 'Mức 3: Vận dụng',
    question: 'Một lực sĩ nâng tạ cử được khối tạ m = 160 kg từ mặt sàn lên độ cao h = 2 m so với mặt đất trong thời gian 0,8 giây (lấy g = 10 m/s²). Công suất trung bình mà lực sĩ đã phát ra trong pha nâng tạ là:',
    options: [
      '4 000 W (4 kW, tương đương hơn 5 mã lực HP)',
      '3 200 W',
      '2 560 W',
      '1 600 W',
    ],
    correctIndex: 0,
    hint: 'A = mgh; P = A / t.',
    explanation: 'A = 160 · 10 · 2 = 3 200 J. Công suất P = A / t = 3 200 / 0,8 = 4 000 W = 4 kW.',
  },
  {
    id: 'p4_14',
    level: 'van_dung',
    levelName: 'Mức 3: Vận dụng',
    question: 'Một thác nước cao 40 m đổ xuống với lưu lượng nước là 150 m³ trong mỗi phút. Biết khối lượng riêng của nước là D = 1 000 kg/m³, lấy g = 10 m/s². Công suất cực đại của dòng nước khi chảy xuống chân thác là:',
    options: [
      '1 000 kW (tức 1 MW)',
      '600 kW',
      '60 MW',
      '10 MW',
    ],
    correctIndex: 0,
    hint: 'Khối lượng nước mỗi phút m = V · D; công sinh ra A = m · g · h; thời gian t = 60s.',
    explanation: 'Khối lượng nước trong 1 phút: m = 150 · 1 000 = 150 000 kg. Công của dòng nước trong 1 phút: A = m · g · h = 150 000 · 10 · 40 = 60 000 000 J = 60 MJ. Công suất: P = A / t = 60 000 000 / 60 = 1 000 000 W = 1 MW = 1 000 kW.',
  },
];

export const REAL_WORLD_APPLICATION_4 = {
  projectTitle: 'Dự Án Kĩ Thuật STEM: Đánh Giá Công Suất Trái Tim Người & Thiết Kế Thang Máy Toà Nhà',
  overview:
    'Ứng dụng biểu thức công A = F · s và công suất P = A / t để giải quyết hai vấn đề thực tiễn hấp dẫn: Đo lường công suất bơm máu của trái tim con người và tính toán chọn công suất động cơ thang máy chở khách cho toà chung cư.',
  steps: [
    {
      title: 'Bước 1: Tính toán công suất bơm máu kì diệu của quả tim',
      content:
        'Mỗi nhát bóp (tâm thu), quả tim người trưởng thành bơm khoảng 70 ml (0,07 kg) máu vào động mạch chủ với áp lực trung bình tương đương cột nước cao 1,6 m. Trong mỗi nhát đập, tim thực hiện công A ≈ m · g · h = 0,07 · 9,8 · 1,6 ≈ 1,1 J. Với nhịp tim trung bình 75 nhịp/phút (chu kì 0,8s), công suất của tim là P = 1,1 / 0,8 ≈ 1,37 W. Trong một đời người 75 năm, quả tim đập gần 3 tỉ lần và sinh một công khổng lồ vượt 3 tỉ Jun, đủ để nâng cả đoàn tàu hoả lên đỉnh Everest!',
    },
    {
      title: 'Bước 2: Xác định tải trọng và quãng đường nâng của thang máy',
      content:
        'Toà nhà chung cư gồm 10 tầng, độ cao mỗi tầng 3,3 m => Chiều cao nâng tối đa h = 30 m. Thang máy chở tối đa 10 người (khối lượng trung bình 65 kg/người) + đối trọng thiết kế giảm 50% tải nâng net => Khối lượng nâng cần kéo F_kéo = 5 000 N.',
    },
    {
      title: 'Bước 3: Lựa chọn động cơ tời điện có công suất tối ưu',
      content:
        'Yêu cầu thang máy chạy từ tầng 1 lên tầng 10 trong thời gian t = 15 giây. Công có ích cần sinh ra: A = F · h = 5 000 · 30 = 150 000 J = 150 kJ. Công suất kéo yêu cầu: P = A / t = 150 000 / 15 = 10 000 W = 10 kW. Tính thêm hệ số an toàn và hiệu suất 80%, kĩ sư chọn động cơ điện công suất định mức 12,5 kW (xấp xỉ 17 HP).',
    },
  ],
  studentActionPrompt:
    'Em hãy đo khối lượng của bản thân (ví dụ 45 kg) và dùng đồng hồ bấm giây đo thời gian em chạy từ tầng 1 lên tầng 2 của trường học (độ cao h = 3,6 m). Hãy tính công em đã thực hiện để thắng trọng lực và công suất của đôi chân em trong lần chạy đó!',
};

export const EXTENSION_CONTENT_4 = {
  badgeLabel: 'Kỉ Lục Động Cơ Vũ Trụ & Tương Lai Năng Lượng',
  disclaimer: 'Kiến thức mở rộng chuyên sâu dành cho học sinh đam mê công nghệ hàng không vũ trụ và siêu động cơ.',
  topics: [
    {
      title: 'Siêu Động Cơ Tên Lửa Saturn V – Đỉnh Cao Công Suất Cơ Học Loài Người',
      content:
        'Tên lửa Saturn V huyền thoại đưa tàu Apollo 11 lên Mặt Trăng sở hữu 5 cụm động cơ F-1 tại tầng thứ nhất. Trong 2,5 phút đầu tiên sau khi rời bệ phóng, các động cơ này đốt cháy 2 000 tấn nhiên liệu lỏng và giải phóng công suất khổng lồ lên tới 190 Gigaoát (190 000 000 000 W) – tương đương công suất của hơn 90 nhà máy thuỷ điện Hoà Bình gộp lại!',
    },
    {
      title: 'Động Cơ Đẩy Ion (Ion Thruster) – Công Suất Siêu Nhỏ Nhưng Bền Bỉ Hàng Thập Kỉ',
      content:
        'Trái ngược với tên lửa hoá học bùng nổ, các tàu thăm dò không gian sâu (như Dawn của NASA) sử dụng động cơ đẩy ion. Động cơ này có lực đẩy cực kì nhỏ (chỉ tương đương sức nặng của một tờ giấy đặt lên bàn tay, công suất khoảng 2 kW), nhưng có thể hoạt động liên tục không ngừng nghỉ suốt 5 năm trong chân không, giúp tàu vũ trụ dần tăng tốc lên tới hơn 40 000 km/h để khám phá vành đai tiểu hành tinh xa xôi.',
    },
    {
      title: 'Khái Niệm Hiệu Suất Cơ Học (Efficiency)',
      content:
        'Trong thực tế cơ học, không có cỗ máy nào chuyển hoá được 100% công toàn phần (A_tp) nạp vào thành công có ích (A_ích) do luôn có ma sát toả nhiệt. Hiệu suất của máy H = (A_ích / A_tp) · 100%. Ví dụ động cơ xăng ô tô chỉ đạt hiệu suất khoảng 25% - 30%, trong khi động cơ điện hiện đại có thể đạt hiệu suất vượt 90%!',
    },
  ],
};

export const FINAL_ASSESSMENT_QUIZ_4: PracticeQuestion[] = [
  {
    id: 'fq4_1',
    level: 'nhan_biet',
    levelName: 'Nhận biết',
    question: 'Trong trường hợp nào dưới đây có công cơ học theo định nghĩa vật lí?',
    options: [
      'Một người thợ kéo một xô vữa xây dựng chuyển động từ mặt đất lên giàn giáo',
      'Một hòn đá nằm yên bất động trên đỉnh núi cao suốt hàng trăm năm',
      'Người lực sĩ đang gồng mình giữ yên thanh tạ trên vai',
      'Hai đội kéo co đang giằng co dây ở vị trí cân bằng bất động',
    ],
    correctIndex: 0,
    hint: 'Vật phải có lực tác dụng và phải có sự chuyển dời theo phương của lực.',
    explanation: 'Người thợ tác dụng lực kéo lên xô vữa và xô vữa dịch chuyển lên cao cùng hướng với lực nên có công cơ học.',
  },
  {
    id: 'fq4_2',
    level: 'nhan_biet',
    levelName: 'Nhận biết',
    question: 'Đơn vị nào sau đây KHÔNG PHẢI là đơn vị của công suất?',
    options: [
      'Jun nhân giây (J · s)',
      'Oát (W)',
      'Kilôoát (kW)',
      'Mã lực (HP)',
    ],
    correctIndex: 0,
    hint: 'Công suất là công chia cho thời gian: P = A / t => đơn vị là J/s.',
    explanation: 'Đơn vị công suất là J/s (Oát), kW, MW, HP. "Jun nhân giây (J · s)" không phải là đơn vị công suất.',
  },
  {
    id: 'fq4_3',
    level: 'thong_hieu',
    levelName: 'Thông hiểu',
    question: 'Một con ngựa kéo một cỗ xe đi với vận tốc không đổi v = 9 km/h (2,5 m/s) trên đường phẳng. Lực kéo của ngựa là 200 N. Công suất của con ngựa là:',
    options: [
      '500 W',
      '1 800 W',
      '180 W',
      '80 W',
    ],
    correctIndex: 0,
    hint: 'P = F · v với v đo bằng m/s.',
    explanation: 'P = F · v = 200 N · 2,5 m/s = 500 W.',
  },
  {
    id: 'fq4_4',
    level: 'thong_hieu',
    levelName: 'Thông hiểu',
    question: 'Một người tác dụng lực kéo 180 N theo phương ngang kéo xe đi được 25 m trong 15 giây. Công cơ học và công suất của người này là:',
    options: [
      'A = 4 500 J; P = 300 W',
      'A = 450 J; P = 30 W',
      'A = 2 700 J; P = 180 W',
      'A = 4 500 J; P = 450 W',
    ],
    correctIndex: 0,
    hint: 'A = F · s; P = A / t.',
    explanation: 'A = 180 · 25 = 4 500 J. P = 4 500 / 15 = 300 W.',
  },
  {
    id: 'fq4_5',
    level: 'thong_hieu',
    levelName: 'Thông hiểu',
    question: 'Tại sao khi lực tác dụng vuông góc với phương dịch chuyển của vật thì công của lực đó bằng 0 (A = 0)?',
    options: [
      'Vì lực không làm vật tăng tốc hay dịch chuyển thêm milimét nào theo phương tác dụng của nó',
      'Vì độ lớn của lực tự động triệt tiêu về 0',
      'Vì vật không có khối lượng',
      'Vì vận tốc của vật quá chậm',
    ],
    correctIndex: 0,
    hint: 'Theo phương vuông góc, độ dịch chuyển theo phương của lực bằng 0.',
    explanation: 'Lực vuông góc không đóng góp vào chuyển dời theo phương của lực (cos 90° = 0), do đó lực không sinh công.',
  },
  {
    id: 'fq4_6',
    level: 'van_dung',
    levelName: 'Vận dụng',
    question: 'Một cần cẩu có công suất 15 kW nâng một kiện hàng nặng 1,2 tấn lên cao 25 m (lấy g = 10 m/s²). Giả sử hiệu suất của cần cẩu là 100%, thời gian nâng kiện hàng là:',
    options: [
      '20 giây',
      '15 giây',
      '30 giây',
      '10 giây',
    ],
    correctIndex: 0,
    hint: 'Tính công A = mgh rồi suy ra t = A / P.',
    explanation: 'Trọng lượng P_tl = 1 200 · 10 = 12 000 N. Công nâng: A = 12 000 · 25 = 300 000 J. Thời gian: t = A / P = 300 000 / 15 000 = 20 giây.',
  },
  {
    id: 'fq4_7',
    level: 'van_dung',
    levelName: 'Vận dụng',
    question: 'Máy kéo 1 có công suất P1 = 10 kW, máy kéo 2 có công suất P2 = 5 kW. Để cùng thực hiện một công A = 100 kJ thì:',
    options: [
      'Máy kéo 1 chỉ mất 10 giây, máy kéo 2 mất 20 giây (máy 1 hoàn thành nhanh gấp đôi)',
      'Máy kéo 2 hoàn thành nhanh hơn máy kéo 1',
      'Cả hai máy mất thời gian bằng nhau vì cùng thực hiện 100 kJ',
      'Máy kéo 1 mất 5 giây, máy kéo 2 mất 10 giây',
    ],
    correctIndex: 0,
    hint: 't = A / P.',
    explanation: 't1 = 100 000 / 10 000 = 10 s; t2 = 100 000 / 5 000 = 20 s. Máy 1 công suất gấp đôi nên thời gian chỉ bằng một nửa.',
  },
  {
    id: 'fq4_8',
    level: 'van_dung',
    levelName: 'Vận dụng',
    question: 'Một chiếc ô tô khối lượng 1,5 tấn đang leo dốc nghiêng dài 200 m, đỉnh dốc cao 10 m so với chân dốc trong thời gian 25 giây (lấy g = 10 m/s², bỏ qua ma sát). Công suất tối thiểu của động cơ là:',
    options: [
      '6 kW (tức 6 000 W)',
      '12 kW',
      '60 kW',
      '15 kW',
    ],
    correctIndex: 0,
    hint: 'Công để đưa ô tô lên cao 10 m: A = m · g · h; P = A / t.',
    explanation: 'Công nâng độ cao: A = m · g · h = 1 500 · 10 · 10 = 150 000 J. Công suất P = A / t = 150 000 / 25 = 6 000 W = 6 kW.',
  },
];
