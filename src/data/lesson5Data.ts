import { PracticeQuestion } from '../types';

export const HOOK_SCENARIO_5 = {
  scenarioTitle: 'Ảo Ảnh Đồng Xu "Nổi Lên" & Nghịch Lý Chiếc Đũa Gãy Khúc Trong Cốc Nước',
  scenarioContent:
    'Trong một buổi sinh hoạt khoa học vui tại trường THCS, thầy giáo đặt một chiếc đồng xu nhỏ bằng kim loại nằm phẳng ở đáy một chiếc cốc sứ đục màu (không nhìn xuyên qua thành cốc được). Thầy yêu cầu một học sinh lùi dần mắt ra xa cho đến khi mép thành cốc vừa vặn che khuất tầm nhìn, khiến học sinh hoàn toàn không thể nhìn thấy đồng xu ở đáy cốc nữa. Giữ nguyên vị trí của mắt và cốc, thầy giáo từ từ rót nước trong suốt vào trong cốc. Thật kì diệu: Chiếc đồng xu dường như tự động "nổi lên" từ đáy cốc và hiện rõ mồn một trước mắt em học sinh! Đồng thời, khi cắm một chiếc đũa thẳng vào cốc nước, chiếc đũa lại trông như bị gập khúc một góc tại mặt nước. Liệu đồng xu có thực sự di chuyển nổi lên hay chiếc đũa có bị cong gãy không? Tất cả bí ẩn này bắt nguồn từ một hiện tượng quang học nền tảng: HIỆN TƯỢNG KHÚC XẠ ÁNH SÁNG!',
  question: 'Vì sao khi đổ nước vào cốc, mắt ta lại nhìn thấy đồng xu dù vị trí cốc và mắt không hề thay đổi?',
  options: [
    {
      id: 'opt_1',
      text: 'Vì tia sáng xuất phát từ đồng xu khi truyền từ nước ra không khí đã bị đổi hướng (bị bẻ cong xa pháp tuyến) tại mặt nước, rồi truyền vào mắt người quan sát.',
      isCorrect: true,
      feedback: 'Chính xác! Tia sáng từ đồng xu truyền xiên góc từ nước ra không khí bị khúc xạ với góc khúc xạ lớn hơn góc tới (r > i), làm cho đường kéo dài của tia sáng đi vào mắt hướng về vị trí ảnh ảo của đồng xu ở phía trên vị trí thật!',
    },
    {
      id: 'opt_2',
      text: 'Vì nước có lực đẩy Ác-si-mét làm đồng xu kim loại tự động nổi lên sát mặt nước.',
      isCorrect: false,
      feedback: 'Sai kiến thức vật lí. Khối lượng riêng của kim loại lớn hơn nhiều so với nước nên đồng xu vẫn nằm cố định ở đáy cốc.',
    },
    {
      id: 'opt_3',
      text: 'Vì phân tử nước đóng vai trò như một nguồn phát sáng mới chiếu thẳng vào mắt.',
      isCorrect: false,
      feedback: 'Không đúng. Nước chỉ là môi trường trong suốt cho ánh sáng truyền qua chứ không tự phát sáng trong trường hợp này.',
    },
    {
      id: 'opt_4',
      text: 'Vì mắt người khi nhìn qua nước sẽ tự động tăng kích thước đồng tử để nhìn xuyên qua thành cốc.',
      isCorrect: false,
      feedback: 'Sai sinh học. Mắt người không thể nhìn xuyên qua chất liệu sứ đục màu của thành cốc.',
    },
  ],
};

export const KNOWLEDGE_CARDS_5 = [
  {
    id: 'kc_5_1',
    title: '1. Hiện Tượng Khúc Xạ Ánh Sáng',
    subtitle: 'Sự đổi hướng truyền khi đi qua mặt phân cách hai môi trường',
    badge: 'Khái niệm quang học nền tảng',
    content:
      'ĐỊNH NGHĨA HIỆN TƯỢNG KHÚC XẠ:\nKhúc xạ ánh sáng là hiện tượng tia sáng bị gãy khúc (đổi hướng truyền đột ngột) tại mặt phân cách giữa hai môi trường trong suốt khác nhau khi truyền xiên góc từ môi trường này sang môi trường kia.\n\nCÁC KHÁI NIỆM HÌNH HỌC QUANG HỌC CỐT LÕI (SGK KHTN 9 Trang 26):\n• Điểm tới (I): Điểm mà tia sáng tới gặp mặt phân cách giữa hai môi trường.\n• Tia tới (SI): Tia sáng truyền thẳng từ nguồn sáng đến điểm tới I trên mặt phân cách.\n• Pháp tuyến (NN\'): Đường thẳng vuông góc với mặt phân cách tại điểm tới I.\n• Tia khúc xạ (IR): Tia sáng tiếp tục đi vào môi trường thứ hai từ điểm tới I.\n• Góc tới (i): Góc tạo bởi tia tới SI và pháp tuyến NN\' (góc SIN).\n• Góc khúc xạ (r): Góc tạo bởi tia khúc xạ IR và pháp tuyến NN\' (góc N\'IR).\n• Mặt phẳng tới: Mặt phẳng được xác định bởi tia tới SI và pháp tuyến NN\'.\n\nTRƯỜNG HỢP ĐẶC BIỆT (GÓC TỚI i = 0°):\nKhi chiếu tia sáng theo phương vuông góc với mặt phân cách (tia tới trùng với pháp tuyến, i = 0°), tia sáng sẽ truyền THẲNG vào môi trường thứ hai mà KHÔNG bị đổi hướng (r = 0°).',
    keyTakeaway: 'Khúc xạ là sự gãy khúc của tia sáng tại mặt phân cách khi truyền xiên góc; nếu chiếu vuông góc (i = 0°) thì tia sáng truyền thẳng (r = 0°).',
    quickCheck: {
      question: 'Pháp tuyến tại điểm tới I trong hiện tượng khúc xạ ánh sáng là đường thẳng nào?',
      options: [
        { id: 'q1_a', text: 'Đường thẳng vuông góc với mặt phân cách hai môi trường tại điểm tới I', isCorrect: true },
        { id: 'q1_b', text: 'Đường thẳng nằm trùng với mặt phân cách giữa hai môi trường', isCorrect: false },
        { id: 'q1_c', text: 'Đường thẳng song song với tia tới SI', isCorrect: false },
        { id: 'q1_d', text: 'Đường phân giác của góc giữa tia tới và tia khúc xạ', isCorrect: false },
      ],
      explanation: 'Theo quy ước quang hình học, pháp tuyến NN\' luôn vuông góc với bề mặt phân cách tại đúng điểm tới I.',
    },
  },
  {
    id: 'kc_5_2',
    title: '2. Định Luật Khúc Xạ Ánh Sáng',
    subtitle: 'Định luật Snell: sini / sinr = const và mối quan hệ vị trí',
    badge: 'Định luật vật lí kinh điển',
    content:
      'NỘI DUNG ĐỊNH LUẬT KHÚC XẠ ÁNH SÁNG (SGK KHTN 9 Trang 27):\nĐịnh luật khúc xạ ánh sáng (do nhà bác học Willebrord Snellius tìm ra năm 1621) gồm hai nội dung cơ bản:\n\n1. Vị trí tia khúc xạ:\nTia khúc xạ luôn nằm trong MẶT PHẲNG TỚI và ở BÊN KIA PHÁP TUYẾN so với tia tới.\n\n2. Mối liên hệ định lượng giữa góc tới i và góc khúc xạ r:\nVới hai môi trường trong suốt nhất định, tỉ số giữa sin của góc tới (sin i) và sin của góc khúc xạ (sin r) luôn luôn là một HẰNG SỐ:\n  (sin i) / (sin r) = const = n₂₁\n\nQUY TẮC SO SÁNH GÓC TỚI (i) VÀ GÓC KHÚC XẠ (r):\n• Khi ánh sáng truyền từ môi trường CHIẾT QUANG KÉM sang môi trường CHIẾT QUANG HƠN (ví dụ từ không khí vào nước hoặc thuỷ tinh):\n  Góc khúc xạ nhỏ hơn góc tới: r < i (tia khúc xạ bị lệch lại gần pháp tuyến hơn).\n• Khi ánh sáng truyền từ môi trường CHIẾT QUANG HƠN sang môi trường CHIẾT QUANG KÉM (ví dụ từ nước hoặc thuỷ tinh ra không khí):\n  Góc khúc xạ lớn hơn góc tới: r > i (tia khúc xạ bị lệch ra xa pháp tuyến hơn).',
    keyTakeaway: 'Tia khúc xạ nằm trong mặt phẳng tới, ở bên kia pháp tuyến; (sin i) / (sin r) = hằng số; từ không khí vào nước thì r < i, từ nước ra không khí thì r > i.',
    quickCheck: {
      question: 'Chiếu một tia sáng từ không khí vào trong một bể nước với góc tới i = 45°. Kết luận nào sau đây về góc khúc xạ r là ĐÚNG?',
      options: [
        { id: 'q2_a', text: 'Góc khúc xạ r nhỏ hơn 45° (r < 45°)', isCorrect: true },
        { id: 'q2_b', text: 'Góc khúc xạ r bằng đúng 45° (r = 45°)', isCorrect: false },
        { id: 'q2_c', text: 'Góc khúc xạ r lớn hơn 45° (r > 45°)', isCorrect: false },
        { id: 'q2_d', text: 'Góc khúc xạ r luôn bằng 0°', isCorrect: false },
      ],
      explanation: 'Nước chiết quang hơn không khí (nước n ≈ 1,33 > không khí n ≈ 1), do đó tia khúc xạ bị bẻ cong về phía pháp tuyến, suy ra r < i = 45° (thực tế r ≈ 32°).',
    },
  },
  {
    id: 'kc_5_3',
    title: '3. Chiết Suất Của Môi Trường',
    subtitle: 'Chiết suất tuyệt đối n = c / v và Chiết suất tỉ đối n₂₁ = n₂ / n₁',
    badge: 'Đại lượng quang học đặc trưng',
    content:
      'CHIẾT SUẤT TUYỆT ĐỐI (n):\nChiết suất tuyệt đối (thường gọi tắt là chiết suất) của một môi trường trong suốt là đại lượng đặc trưng cho khả năng làm chậm tốc độ truyền ánh sáng của môi trường đó so với chân không:\n  n = c / v\nTrong đó:\n• c: Tốc độ ánh sáng trong chân không (c ≈ 3 · 10⁸ m/s).\n• v: Tốc độ ánh sáng truyền trong môi trường trong suốt đó (m/s).\n• n: Chiết suất tuyệt đối (đại lượng không có đơn vị, luôn n ≥ 1).\n\nGIÁ TRỊ CHIẾT SUẤT CỦA MỘT SỐ CHẤT THÔNG THƯỜNG:\n• Chân không: n = 1 (chuẩn tuyệt đối).\n• Không khí: n ≈ 1,000293 ≈ 1 (trong tính toán phổ thông coi như bằng 1).\n• Nước tinh khiết: n ≈ 1,33 (tức bằng 4/3).\n• Thuỷ tinh quang học: n ≈ 1,50 đến 1,65 tuỳ loại.\n• Kim cương: n ≈ 2,42 (chiết suất rất lớn, tán sắc rực rỡ).\n\nCHIẾT SUẤT TỈ ĐỐI & DẠNG ĐỐI XỨNG CỦA ĐỊNH LUẬT SNELL:\nChiết suất tỉ đối của môi trường 2 đối với môi trường 1:\n  n₂₁ = n₂ / n₁ = v₁ / v₂\nĐịnh luật Snell viết dưới dạng đối xứng quen thuộc:\n  n₁ · sin(i) = n₂ · sin(r)',
    keyTakeaway: 'n = c / v ≥ 1; n(nước) ≈ 1,33; n(thuỷ tinh) ≈ 1,5; Định luật khúc xạ dạng đối xứng: n₁ · sin i = n₂ · sin r.',
    quickCheck: {
      question: 'Tốc độ ánh sáng trong chân không là c = 3 · 10⁸ m/s. Biết chiết suất của nước là n = 4/3. Tốc độ truyền của ánh sáng trong nước là:',
      options: [
        { id: 'q3_a', text: '2,25 · 10⁸ m/s (tức 225 000 km/s)', isCorrect: true },
        { id: 'q3_b', text: '4,00 · 10⁸ m/s', isCorrect: false },
        { id: 'q3_c', text: '3,00 · 10⁸ m/s', isCorrect: false },
        { id: 'q3_d', text: '1,50 · 10⁸ m/s', isCorrect: false },
      ],
      explanation: 'Ta có n = c / v => v = c / n = (3 · 10⁸) / (4/3) = 2,25 · 10⁸ m/s.',
    },
  },
  {
    id: 'kc_5_4',
    title: '4. Ứng Dụng & Giải Thích Các Hiện Tượng Đời Sống',
    subtitle: 'Nâng đáy chậu biểu kiến, khúc xạ kế Abbe, đũa gãy khúc, săn cá',
    badge: 'Ứng dụng thực tiễn sâu rộng',
    content:
      '1. HIỆN TƯỢNG NÂNG ĐÁY CHẬU (ẢO ẢNH ĐỘ SÂU BIỂU KIẾN):\nKhi nhìn gần như thẳng đứng từ không khí xuống đáy một bể nước có độ sâu thực là h, ta thấy đáy bể dường như được nâng lên, chỉ còn cách mặt nước một khoảng biểu kiến h\':\n  h\' ≈ h / n\nVí dụ: Bể bơi sâu h = 2 m, người nhìn từ bờ tưởng bể chỉ sâu h\' = 2 / 1,33 ≈ 1,5 m. Do đó trẻ em rất dễ gặp nguy hiểm đuối nước vì lầm tưởng đáy bể nông!\n\n2. KINH NGHIỆM ĐÂM CÁ CỦA NGƯ PHỦ:\nTia sáng từ con cá truyền từ nước ra không khí bị lệch xa pháp tuyến, mắt người nhìn thấy ảnh ảo của con cá ở vị trí CAO HƠN con cá thật. Muốn đâm trúng cá, ngư phủ phải phóng lao vào vị trí THẤP HƠN vị trí con cá mà mắt nhìn thấy.\n\n3. KHÚC XẠ KẾ (REFRACTOMETER) TRONG NÔNG NGHIỆP & ĐỜI SỐNG:\nĐo nồng độ đường (độ Brix) trong nước mía, hoa quả hoặc độ mặn của nước biển bằng cách đo góc khúc xạ của giọt dung dịch đặt trên lăng kính của khúc xạ kế.\n\n4. ẢO ẢNH SA MẠC VÀ ĐƯỜNG NHỰA TRỜI NẮNG (MIRAGE):\nKhông khí sát mặt đường bị hun nóng có khối lượng riêng giảm, chiết suất giảm dần từ trên cao xuống dưới đất. Tia sáng từ bầu trời bị khúc xạ cong liên tục rồi phản xạ lên mắt, làm ta thấy ảo ảnh vũng nước lấp loáng trên mặt đường.',
    keyTakeaway: 'Độ sâu biểu kiến h\' ≈ h / n (nông hơn thực tế); đâm cá phải nhắm dưới ảnh; khúc xạ kế đo chiết suất để xác định độ ngọt dung dịch.',
    quickCheck: {
      question: 'Một người đứng trên bờ nhìn con cá đang bơi dưới hồ nước trong veo. Để phóng lao đâm trúng con cá, người đó cần nhắm lao vào đâu?',
      options: [
        { id: 'q4_a', text: 'Nhắm vào điểm thấp hơn vị trí con cá mà mắt nhìn thấy', isCorrect: true },
        { id: 'q4_b', text: 'Nhắm đúng ngay vào vị trí con cá mà mắt nhìn thấy', isCorrect: false },
        { id: 'q4_c', text: 'Nhắm vào điểm cao hơn vị trí con cá mà mắt nhìn thấy', isCorrect: false },
        { id: 'q4_d', text: 'Nhắm sang bên trái con cá 1 mét', isCorrect: false },
      ],
      explanation: 'Do khúc xạ ánh sáng từ nước ra không khí, ảnh ảo của con cá nằm cao hơn vị trí thật của nó. Vì vậy cần phóng lao vào phía dưới vị trí nhìn thấy để trúng thân cá.',
    },
  },
];

export const CORE_SUMMARY_5 = {
  lessonTitle: 'Bài 5: Khúc xạ ánh sáng',
  summaryPoints: [
    'Hiện tượng khúc xạ ánh sáng là hiện tượng tia sáng bị gãy khúc (đổi hướng) tại mặt phân cách giữa hai môi trường trong suốt khi truyền xiên góc.',
    'Tia khúc xạ luôn nằm trong mặt phẳng tới và ở bên kia pháp tuyến so với tia tới.',
    'Định luật khúc xạ ánh sáng (Snell): Với hai môi trường trong suốt nhất định, tỉ số (sin i) / (sin r) = const = n₂₁.',
    'Khi truyền từ không khí vào nước hoặc thuỷ tinh (môi trường chiết quang hơn): góc khúc xạ nhỏ hơn góc tới (r < i). Ngược lại từ nước ra không khí: r > i.',
    'Chiết suất tuyệt đối của môi trường: n = c / v (với c ≈ 3 · 10⁸ m/s, luôn có n ≥ 1). Chân không có n = 1, nước n ≈ 1,33, thuỷ tinh n ≈ 1,5.',
    'Dạng đối xứng của định luật khúc xạ: n₁ · sin(i) = n₂ · sin(r). Khi chiếu vuông góc mặt phân cách (i = 0°), tia sáng truyền thẳng (r = 0°).',
    'Ứng dụng và hiện tượng thực tế: Chiếc đũa bị gãy trong nước, đáy chậu dường như nâng lên gần mặt nước (h\' ≈ h/n), khúc xạ kế đo nồng độ đường trong hoa quả.',
  ],
};

export const MATCHING_PAIRS_LESSON_5 = [
  { id: 'm5_1', tool: 'Góc tới (i)', role: 'Góc tạo bởi tia sáng tới SI và pháp tuyến NN\' tại điểm tới trên mặt phân cách', category: 'Yếu tố hình học' },
  { id: 'm5_2', tool: 'Góc khúc xạ (r)', role: 'Góc tạo bởi tia khúc xạ IR và pháp tuyến NN\' trong môi trường thứ hai', category: 'Yếu tố hình học' },
  { id: 'm5_3', tool: 'Định luật Snell', role: 'Mối liên hệ định lượng n₁ · sin(i) = n₂ · sin(r) giữa góc tới và góc khúc xạ', category: 'Định luật vật lí' },
  { id: 'm5_4', tool: 'Chiết suất tuyệt đối (n)', role: 'Tỉ số giữa tốc độ ánh sáng trong chân không và trong môi trường: n = c / v', category: 'Đại lượng quang' },
  { id: 'm5_5', tool: 'Độ sâu biểu kiến (h\')', role: 'Độ sâu của ảnh ảo dưới đáy bể khi nhìn từ bờ, tính gần đúng bằng h\' ≈ h / n', category: 'Hiện tượng thực tiễn' },
];

export const DETECTIVE_MISSIONS_LESSON_5 = [
  {
    id: 'det5_1',
    scenario: 'Nhiệm vụ 1: Bí ẩn đồng xu vàng dưới đáy giếng cổ.',
    question: 'Một nhà khảo cổ học nhìn từ trên miệng giếng đứng thẳng xuống đáy một giếng nước cổ trong suốt. Nhà khảo cổ ước lượng bằng mắt đáy giếng chỉ sâu khoảng 3 mét. Biết chiết suất của nước trong giếng là n = 4/3. Độ sâu THẬT của mực nước dưới giếng là bao nhiêu?',
    options: [
      '4 mét (h = h\' · n = 3 · 4/3 = 4 m)',
      '2,25 mét',
      '3 mét',
      '6 mét',
    ],
    correctIndex: 0,
    explanation: 'Khi nhìn gần như thẳng đứng từ không khí vào nước, độ sâu biểu kiến nhìn thấy là h\' ≈ h / n. Từ đó độ sâu thực tế là h = h\' · n = 3 m · (4/3) = 4 m. Đáy giếng thực sự sâu 4 m chứ không phải 3 m!',
  },
  {
    id: 'det5_2',
    scenario: 'Nhiệm vụ 2: Giám định chất lượng khối ngọc bích nhân tạo.',
    question: 'Trong phòng thí nghiệm ngọc học, một chuyên gia chiếu tia laser đơn sắc màu đỏ từ không khí vào một khối khoáng vật trong suốt với góc tới i = 60°. Thiết bị đo quang phổ ghi nhận góc khúc xạ trong khối khoáng vật là r = 30°. Chiết suất của khối khoáng vật này là bao nhiêu?',
    options: [
      'n = căn(3) ≈ 1,732',
      'n = 2,0',
      'n = 1,5',
      'n = 1,33',
    ],
    correctIndex: 0,
    explanation: 'Áp dụng định luật Snell: n_kk · sin(i) = n · sin(r) với n_kk = 1. Ta có: 1 · sin(60°) = n · sin(30°) => n = sin(60°) / sin(30°) = (căn(3)/2) / (1/2) = căn(3) ≈ 1,732.',
  },
  {
    id: 'det5_3',
    scenario: 'Nhiệm vụ 3: Thử thách của thiện xạ đâm cá suối ngàn.',
    question: 'Một người thợ săn bản địa đứng trên bờ đá nhìn thấy một con cá bống suối đang đứng yên tại một điểm cách mặt nước 60 cm theo phương gần thẳng đứng. Nếu người thợ săn muốn dùng mũi giáo phi trúng con cá, người đó phải căn mũi giáo như thế nào?',
    options: [
      'Phóng mũi giáo xuống sâu hơn điểm nhìn thấy con cá (khoảng 80 cm dưới mặt nước)',
      'Phóng đúng ngay vào vị trí 60 cm nhìn thấy con cá',
      'Phóng mũi giáo nông hơn điểm nhìn thấy con cá (khoảng 45 cm dưới mặt nước)',
      'Phóng lên trên không trung vì con cá sẽ nhảy lên',
    ],
    correctIndex: 0,
    explanation: 'Con cá ở độ sâu thật h. Mắt nhìn thấy ảnh ảo con cá ở độ sâu biểu kiến h\' = 60 cm. Vì h = h\' · n_nước = 60 · (4/3) = 80 cm. Con cá thật nằm sâu 80 cm, tức sâu hơn 20 cm so với ảnh nhìn thấy. Phải phóng mũi giáo sâu hơn điểm nhìn thấy!',
  },
  {
    id: 'det5_4',
    scenario: 'Nhiệm vụ 4: Kiểm tra góc tới đặc biệt trong bể thuỷ sinh.',
    question: 'Người nuôi cá cảnh chiếu một chùm sáng laser thẳng đứng từ trên nắp bể cá xuống mặt nước (tia tới vuông góc với mặt nước phẳng lặng). Nhận xét nào sau đây về tia khúc xạ trong nước là chính xác nhất?',
    options: [
      'Tia sáng tiếp tục truyền thẳng đứng xuống đáy bể mà không hề bị đổi hướng (góc tới i = 0°, góc khúc xạ r = 0°)',
      'Tia sáng bị bẻ gãy một góc 90° chạy dọc mặt nước',
      'Tia sáng bị bật ngược hoàn toàn trở lại không khí',
      'Tia sáng bị khúc xạ với góc r = 45°',
    ],
    correctIndex: 0,
    explanation: 'Khi tia sáng chiếu vuông góc với mặt phân cách (i = 0°), theo định luật khúc xạ sin(r) = sin(0°)/n = 0 => r = 0°. Tia sáng tiếp tục truyền thẳng vào môi trường thứ hai mà không bị gãy khúc.',
  },
];

export const PRACTICE_QUESTIONS_5: PracticeQuestion[] = [
  {
    id: 'p5_1',
    level: 'nhan_biet',
    levelName: 'Mức 1: Nhận biết',
    question: 'Hiện tượng khúc xạ ánh sáng là hiện tượng:',
    options: [
      'Tia sáng bị gãy khúc tại mặt phân cách giữa hai môi trường trong suốt khi truyền xiên góc',
      'Tia sáng bị hắt trở lại môi trường cũ khi gặp một mặt phẳng nhẵn bóng',
      'Ánh sáng bị phân tách thành các màu cầu vồng khi đi qua nước',
      'Ánh sáng bị hấp thụ hoàn toàn và chuyển hoá thành nhiệt năng',
    ],
    correctIndex: 0,
    hint: 'Khúc xạ là sự gãy khúc khi truyền qua mặt phân cách.',
    explanation: 'SGK KHTN 9 trang 26 định nghĩa: Hiện tượng khúc xạ ánh sáng là hiện tượng tia sáng bị đổi hướng (gãy khúc) tại mặt phân cách giữa hai môi trường trong suốt khác nhau khi truyền xiên góc.',
  },
  {
    id: 'p5_2',
    level: 'nhan_biet',
    levelName: 'Mức 1: Nhận biết',
    question: 'Trong hiện tượng khúc xạ ánh sáng, góc khúc xạ r là góc hợp bởi:',
    options: [
      'Tia khúc xạ và pháp tuyến tại điểm tới',
      'Tia khúc xạ và tia tới',
      'Tia khúc xạ và mặt phân cách giữa hai môi trường',
      'Tia tới và mặt phân cách',
    ],
    correctIndex: 0,
    hint: 'Góc khúc xạ luôn được so với pháp tuyến NN\'.',
    explanation: 'Theo quy ước quang hình học, góc khúc xạ r là góc giữa tia khúc xạ IR và pháp tuyến NN\' tại điểm tới I.',
  },
  {
    id: 'p5_3',
    level: 'nhan_biet',
    levelName: 'Mức 1: Nhận biết',
    question: 'Tia khúc xạ trong hiện tượng khúc xạ ánh sáng có vị trí như thế nào?',
    options: [
      'Nằm trong mặt phẳng tới và ở bên kia pháp tuyến so với tia tới',
      'Nằm trong mặt phẳng tới và ở cùng phía pháp tuyến với tia tới',
      'Nằm vuông góc với mặt phẳng tới',
      'Nằm song song với mặt phân cách giữa hai môi trường',
    ],
    correctIndex: 0,
    hint: 'Nội dung thứ nhất của định luật khúc xạ ánh sáng.',
    explanation: 'Nội dung định luật: Tia khúc xạ nằm trong mặt phẳng tới và ở bên kia pháp tuyến so với tia tới.',
  },
  {
    id: 'p5_4',
    level: 'nhan_biet',
    levelName: 'Mức 1: Nhận biết',
    question: 'Khi chiếu một tia sáng từ không khí vào nước với góc tới i > 0°, so sánh giữa góc tới i và góc khúc xạ r:',
    options: [
      'Góc khúc xạ r luôn nhỏ hơn góc tới i (r < i)',
      'Góc khúc xạ r luôn lớn hơn góc tới i (r > i)',
      'Góc khúc xạ r luôn bằng đúng góc tới i (r = i)',
      'Góc khúc xạ r luôn bằng 90°',
    ],
    correctIndex: 0,
    hint: 'Nước chiết quang hơn không khí nên bẻ tia khúc xạ lại gần pháp tuyến.',
    explanation: 'Khi truyền từ không khí vào nước (môi trường chiết quang hơn, n_nước > n_kk), tia sáng bị lệch lại gần pháp tuyến hơn nên r < i.',
  },
  {
    id: 'p5_5',
    level: 'nhan_biet',
    levelName: 'Mức 1: Nhận biết',
    question: 'Chiết suất tuyệt đối của một môi trường trong suốt được xác định bằng công thức:',
    options: [
      'n = c / v (trong đó c là tốc độ ánh sáng trong chân không, v là tốc độ ánh sáng trong môi trường)',
      'n = v / c',
      'n = c · v',
      'n = c - v',
    ],
    correctIndex: 0,
    hint: 'n = c / v và luôn có n ≥ 1.',
    explanation: 'Chiết suất tuyệt đối n = c / v, trong đó c là tốc độ ánh sáng trong chân không (3 · 10⁸ m/s), v là tốc độ ánh sáng trong môi trường.',
  },
  {
    id: 'p5_6',
    level: 'thong_hieu',
    levelName: 'Mức 2: Thông hiểu',
    question: 'Một tia sáng chiếu vuông góc với mặt nước của một hồ bơi (góc tới i = 0°). Khi đi vào nước, tia sáng sẽ:',
    options: [
      'Tiếp tục truyền thẳng vuông góc xuống đáy hồ mà không bị gãy khúc (r = 0°)',
      'Bị gãy một góc 45° so với phương thẳng đứng',
      'Bị phản xạ ngược hoàn toàn trở lại nguồn sáng',
      'Tản rộng thành chùm sáng hình nón',
    ],
    correctIndex: 0,
    hint: 'Khi i = 0° thì sin(i) = 0 nên sin(r) = 0 => r = 0°.',
    explanation: 'Khi chiếu tia sáng theo phương vuông góc với mặt phân cách (i = 0°), tia sáng truyền thẳng vào môi trường thứ hai mà không bị đổi hướng.',
  },
  {
    id: 'p5_7',
    level: 'thong_hieu',
    levelName: 'Mức 2: Thông hiểu',
    question: 'Đặt một chiếc đũa thẳng vào một bát nước trong. Quan sát từ bên ngoài, ta thấy chiếc đũa dường như bị gãy khúc tại mặt phân cách giữa nước và không khí. Nguyên nhân là do:',
    options: [
      'Tia sáng từ phần đũa ngập trong nước khi truyền ra không khí bị khúc xạ, làm mắt nhìn thấy ảnh ảo của phần đũa bị nâng lên',
      'Nước tác dụng một lực cơ học bẻ cong chiếc đũa',
      'Hiện tượng giãn nở vì nhiệt của chiếc đũa khi tiếp xúc với nước',
      'Ánh sáng bị hấp thụ hoàn toàn ở phần đáy bát',
    ],
    correctIndex: 0,
    hint: 'Ảnh ảo của các điểm trên đũa dưới nước bị nâng lên cao hơn thực tế.',
    explanation: 'Các điểm trên phần đũa chìm trong nước cho ảnh ảo nâng lên cao hơn vị trí thật do khúc xạ ánh sáng (r > i), tạo cảm giác chiếc đũa bị gập khúc tại mặt nước.',
  },
  {
    id: 'p5_8',
    level: 'thong_hieu',
    levelName: 'Mức 2: Thông hiểu',
    question: 'Biết chiết suất của nước là 4/3 và chiết suất của thuỷ tinh là 1,5. Khi chiếu tia sáng từ nước sang thuỷ tinh, nhận định nào sau đây là ĐÚNG?',
    options: [
      'Tia sáng đi từ môi trường chiết quang kém sang môi trường chiết quang hơn nên góc khúc xạ nhỏ hơn góc tới (r < i)',
      'Góc khúc xạ lớn hơn góc tới (r > i)',
      'Góc khúc xạ bằng góc tới (r = i)',
      'Tia sáng không thể đi vào thuỷ tinh',
    ],
    correctIndex: 0,
    hint: 'So sánh chiết suất: n_nước = 1,33 < n_thuỷ tinh = 1,5.',
    explanation: 'Vì n_nước (4/3 ≈ 1,33) < n_thuỷ tinh (1,5), ánh sáng truyền vào môi trường có chiết suất lớn hơn (chiết quang hơn) nên góc khúc xạ nhỏ hơn góc tới (r < i).',
  },
  {
    id: 'p5_9',
    level: 'thong_hieu',
    levelName: 'Mức 2: Thông hiểu',
    question: 'Biểu thức dạng đối xứng của định luật khúc xạ ánh sáng giữa hai môi trường có chiết suất n₁ và n₂ là:',
    options: [
      'n₁ · sin(i) = n₂ · sin(r)',
      'n₁ · sin(r) = n₂ · sin(i)',
      'n₁ · cos(i) = n₂ · cos(r)',
      'n₁ · i = n₂ · r',
    ],
    correctIndex: 0,
    hint: 'n₁ đi với sin góc tới i, n₂ đi với sin góc khúc xạ r.',
    explanation: 'Từ (sin i) / (sin r) = n₂ / n₁ ta biến đổi chéo thành dạng đối xứng: n₁ · sin(i) = n₂ · sin(r).',
  },
  {
    id: 'p5_10',
    level: 'thong_hieu',
    levelName: 'Mức 2: Thông hiểu',
    question: 'Tốc độ ánh sáng truyền trong thuỷ tinh là v = 2 · 10⁸ m/s. Biết tốc độ ánh sáng trong chân không là c = 3 · 10⁸ m/s. Chiết suất tuyệt đối của loại thuỷ tinh này là:',
    options: [
      '1,5',
      '1,33',
      '1,67',
      '0,67',
    ],
    correctIndex: 0,
    hint: 'n = c / v.',
    explanation: 'n = c / v = (3 · 10⁸) / (2 · 10⁸) = 1,5.',
  },
  {
    id: 'p5_11',
    level: 'van_dung',
    levelName: 'Mức 3: Vận dụng',
    question: 'Chiếu một tia sáng từ không khí vào khối bán trụ thuỷ tinh có chiết suất n = căn(2) ≈ 1,414 với góc tới i = 45°. Góc khúc xạ r trong khối thuỷ tinh bằng bao nhiêu?',
    options: [
      '30°',
      '45°',
      '60°',
      '20°',
    ],
    correctIndex: 0,
    hint: 'Áp dụng: 1 · sin(45°) = căn(2) · sin(r).',
    explanation: 'Ta có sin(r) = sin(45°) / căn(2) = (căn(2)/2) / căn(2) = 1/2 = 0,5. Suy ra r = 30°.',
  },
  {
    id: 'p5_12',
    level: 'van_dung',
    levelName: 'Mức 3: Vận dụng',
    question: 'Một tia laser truyền từ nước (chiết suất n₁ = 4/3) ra ngoài không khí (n₂ = 1) với góc tới i = 30°. Sin của góc khúc xạ (sin r) ngoài không khí có giá trị là:',
    options: [
      '2/3 (xấp xỉ 0,667, ứng với r ≈ 41,8°)',
      '3/8 (xấp xỉ 0,375)',
      '1/2',
      '3/4',
    ],
    correctIndex: 0,
    hint: 'n₁ · sin(i) = n₂ · sin(r) => sin(r) = (n₁ / n₂) · sin(i).',
    explanation: 'sin(r) = (4/3) · sin(30°) = (4/3) · (1/2) = 4/6 = 2/3 ≈ 0,667. Tra bảng góc suy ra r ≈ 41,8° > 30°.',
  },
  {
    id: 'p5_13',
    level: 'van_dung',
    levelName: 'Mức 3: Vận dụng',
    question: 'Một bể bơi chứa đầy nước có độ sâu thực tế là h = 2,0 m. Một người đứng trên thành hồ nhìn gần như vuông góc xuống đáy bể. Biết chiết suất của nước là n = 4/3. Người đó nhìn thấy đáy bể dường như chỉ cách mặt nước một khoảng là:',
    options: [
      '1,5 m',
      '2,67 m',
      '2,0 m',
      '1,2 m',
    ],
    correctIndex: 0,
    hint: 'Độ sâu biểu kiến: h\' ≈ h / n.',
    explanation: 'Khi nhìn gần như vuông góc: h\' ≈ h / n = 2,0 / (4/3) = 1,5 m. Đáy bể trông nông hơn thực tế 0,5 m.',
  },
  {
    id: 'p5_14',
    level: 'van_dung',
    levelName: 'Mức 3: Vận dụng',
    question: 'Biết chiết suất của kim cương là n = 2,42. Tốc độ truyền ánh sáng trong viên kim cương xấp xỉ bằng bao nhiêu (cho c = 3 · 10⁸ m/s)?',
    options: [
      '1,24 · 10⁸ m/s (chậm hơn 2,42 lần so với trong chân không)',
      '2,42 · 10⁸ m/s',
      '3,00 · 10⁸ m/s',
      '7,26 · 10⁸ m/s',
    ],
    correctIndex: 0,
    hint: 'v = c / n = 3 · 10⁸ / 2,42.',
    explanation: 'v = c / n = 3 · 10⁸ / 2,42 ≈ 1,2396 · 10⁸ m/s ≈ 1,24 · 10⁸ m/s. Ánh sáng bị hãm tốc độ cực mạnh trong kim cương, tạo nên hiện tượng khúc xạ và tán sắc lấp lánh tuyệt đẹp.',
  },
];

export const REAL_WORLD_APPLICATION_5 = {
  projectTitle: 'Dự Án STEM Quang Học: Chế Tạo Khúc Xạ Kế Đo Độ Ngọt Trái Cây & Bể Cảnh Ảo Ảnh',
  overview:
    'Ứng dụng hiện tượng khúc xạ ánh sáng và định luật Snell để giải thích hai ứng dụng kĩ thuật nổi bật: Chế tạo thiết bị kiểm tra hàm lượng đường trong nước ép hoa quả và tính toán an toàn hồ bơi chống đuối nước.',
  steps: [
    {
      title: 'Bước 1: Nguyên lý khúc xạ kế cầm tay (Brix Refractometer)',
      content:
        'Khi nồng độ đường trong nước ép hoa quả (cam, dưa hấu, mía) tăng lên, chiết suất của dung dịch tăng theo một hàm tỉ lệ tuyến tính xác định (nước tinh khiết n = 1,333; nước đường 10% n = 1,348; nước đường 50% n = 1,420). Khi nhỏ một giọt nước ép lên lăng kính và hướng về nguồn sáng, tia sáng khúc xạ tạo ra một ranh giới sáng - tối trên thang đo quang học, cho phép người nông dân đọc ngay độ ngọt (°Brix) mà không cần nếm!',
    },
    {
      title: 'Bước 2: Phân tích nguy cơ an toàn đuối nước do ảo ảnh nâng đáy hồ',
      content:
        'Tại các khu nghỉ dưỡng hoặc bể bơi công cộng, đáy hồ sâu 2,0 mét khi nhìn từ trên bờ xuống chỉ trông như sâu 1,5 mét (h\' ≈ h / 1,33). Trẻ nhỏ đứng trên bờ nhìn xuống thấy "nước chỉ tới ngực mình", nhưng khi nhảy xuống nước sẽ ngập quá đầu (2 m). Việc hiểu rõ hiện tượng khúc xạ giúp các em luôn chú ý biển báo độ sâu thực tế để bảo vệ an toàn tính mạng.',
    },
    {
      title: 'Bước 3: Thực hành đo chiết suất của chất lỏng bằng tia laser đồ chơi',
      content:
        'Học sinh sử dụng một chiếc hộp nhựa trong suốt có đáy chia độ (hoặc gắn thước đo góc), đổ nửa hộp nước hoặc dầu ăn, dùng bút laser đỏ chiếu từ không khí vào mặt chất lỏng với góc tới i = 45°. Ghi lại góc khúc xạ r đọc được trên thước chia độ, sau đó tính chiết suất n = sin(45°) / sin(r). So sánh chiết suất của nước, dầu ăn và cồn y tế.',
    },
  ],
  studentActionPrompt:
    'Em hãy lấy một chiếc cốc thuỷ tinh, đổ đầy nước và thả vào một quả trứng gà hoặc quả chanh. Quan sát từ bên hông cốc và từ trên miệng cốc nhìn xuống. Hãy giải thích tại sao nhìn qua thành cong của cốc nước, quả trứng trông to hơn bình thường gấp 1,5 lần!',
};

export const EXTENSION_CONTENT_5 = {
  badgeLabel: 'Kỉ Lục Quang Học & Ảo Ảnh Thiên Nhiên Kì Vĩ',
  disclaimer: 'Kiến thức mở rộng chuyên sâu dành cho học sinh đam mê quang học và khám phá các hiện tượng khí tượng kì thú.',
  topics: [
    {
      title: 'Ảo Ảnh Fata Morgana & Con Tàu Ma Huyền Thoại Flying Dutchman',
      content:
        'Trên các vùng biển lạnh Bắc Cực, lớp không khí sát mặt biển bị làm lạnh rất sâu nên đặc hơn và có chiết suất cao hơn lớp không khí ấm bên trên. Hiện tượng nghịch nhiệt này khiến các tia sáng từ những con tàu ở xa ngoài chân trời bị khúc xạ cong liên tục hướng xuống mặt đất. Khi quan sát từ bờ, mắt người nhìn thấy ảo ảnh con tàu lơ lửng giữa không trung hoặc bị biến dạng khổng lồ như một toà lâu đài ma quái – nguồn gốc của truyền thuyết con tàu ma "Người Hà Lan bay"!',
    },
    {
      title: 'Cáp Quang Internet (Fiber Optic) – Siêu Xa Lộ Dữ Liệu Toàn Cầu',
      content:
        'Hàng triệu kilômét sợi cáp quang xuyên lòng đại dương kết nối Internet toàn cầu hoạt động dựa trên sự phối hợp hoàn hảo giữa hiện tượng khúc xạ và phản xạ toàn phần. Lõi sợi quang có chiết suất n₁ = 1,48, được bọc bởi lớp vỏ có chiết suất n₂ = 1,46 nhỏ hơn. Các xung ánh sáng mang dữ liệu laser truyền trong lõi liên tục gặp mặt phân cách với góc tới lớn hơn góc tới hạn, bị phản xạ toàn phần 100% không hao hụt năng lượng và di chuyển với tốc độ xấp xỉ 200 000 km/s qua khắp các châu lục!',
    },
    {
      title: 'Tốc Độ Ánh Sáng Chậm Nhất Thế Giới: Chỉ Còn 17 Mét/Giây!',
      content:
        'Trong chân không, ánh sáng là vật thể chuyển động nhanh nhất vũ trụ (300 000 km/s). Nhưng vào năm 1999, nữ giáo sư vật lí Lene Hau tại Đại học Harvard đã thực hiện một thí nghiệm chấn động: Bà chiếu chùm tia laser đi qua một đám mây nguyên tử Natri siêu lạnh ở trạng thái ngưng tụ Bose-Einstein (gần sát độ 0 tuyệt đối). Kết quả là chùm ánh sáng bị khúc xạ và hãm tốc độ xuống chỉ còn... 17 mét/giây (khoảng 61 km/h – tương đương tốc độ của một người đi xe đạp điện)!',
    },
  ],
};

export const FINAL_ASSESSMENT_QUIZ_5: PracticeQuestion[] = [
  {
    id: 'fq5_1',
    level: 'nhan_biet',
    levelName: 'Nhận biết',
    question: 'Hiện tượng khúc xạ ánh sáng xảy ra khi nào?',
    options: [
      'Khi ánh sáng truyền xiên góc qua mặt phân cách giữa hai môi trường trong suốt',
      'Khi ánh sáng truyền thẳng trong một môi trường trong suốt đồng tính',
      'Khi ánh sáng gặp một tấm gương phẳng nhẵn bóng',
      'Khi ánh sáng bị chặn lại bởi một vật cản tối màu',
    ],
    correctIndex: 0,
    hint: 'Phải truyền xiên góc và qua mặt phân cách hai môi trường trong suốt.',
    explanation: 'Khúc xạ chỉ xuất hiện khi tia sáng truyền xiên góc qua mặt phân cách giữa hai môi trường trong suốt khác nhau.',
  },
  {
    id: 'fq5_2',
    level: 'nhan_biet',
    levelName: 'Nhận biết',
    question: 'Khi chiếu tia sáng từ không khí vào khối thuỷ tinh với góc tới i = 60°, góc khúc xạ r trong thuỷ tinh có thể nhận giá trị nào sau đây?',
    options: [
      '35° (nhỏ hơn góc tới 60°)',
      '60°',
      '75°',
      '90°',
    ],
    correctIndex: 0,
    hint: 'Thuỷ tinh chiết quang hơn không khí nên r < i.',
    explanation: 'Vì n_thuỷ tinh (≈ 1,5) > n_không khí (≈ 1), tia khúc xạ bị lệch lại gần pháp tuyến nên r < i = 60°. Do đó 35° là giá trị hợp lí.',
  },
  {
    id: 'fq5_3',
    level: 'nhan_biet',
    levelName: 'Nhận biết',
    question: 'Đại lượng nào sau đây KHÔNG THAY ĐỔI khi ánh sáng truyền từ không khí vào trong nước?',
    options: [
      'Tần số của sóng ánh sáng',
      'Vận tốc truyền của ánh sáng',
      'Bước sóng của ánh sáng',
      'Phương truyền của tia sáng (khi truyền xiên góc)',
    ],
    correctIndex: 0,
    hint: 'Tần số f phụ thuộc vào nguồn phát sóng, không đổi khi truyền qua các môi trường.',
    explanation: 'Khi ánh sáng truyền từ môi trường này sang môi trường khác, tần số ánh sáng không đổi, trong khi vận tốc v và bước sóng λ bị giảm (v = c/n).',
  },
  {
    id: 'fq5_4',
    level: 'thong_hieu',
    levelName: 'Thông hiểu',
    question: 'Một tia sáng đi từ môi trường 1 có chiết suất n₁ sang môi trường 2 có chiết suất n₂. Định luật khúc xạ ánh sáng dạng đối xứng được viết là:',
    options: [
      'n₁ · sin(i) = n₂ · sin(r)',
      'n₂ · sin(i) = n₁ · sin(r)',
      'sin(i) / sin(r) = n₁ / n₂',
      'n₁ · cos(i) = n₂ · cos(r)',
    ],
    correctIndex: 0,
    hint: 'Môi trường 1 đi với góc i, môi trường 2 đi với góc r.',
    explanation: 'Định luật Snell dạng đối xứng: n₁ · sin(i) = n₂ · sin(r).',
  },
  {
    id: 'fq5_5',
    level: 'thong_hieu',
    levelName: 'Thông hiểu',
    question: 'Tại sao khi nhìn một hồ cá cảnh hình hộp chữ nhật từ phía trên, ta cảm thấy các chú cá bơi ở vị trí nông hơn bình thường?',
    options: [
      'Do tia sáng từ con cá truyền từ nước ra không khí bị khúc xạ xa pháp tuyến, mắt người thu nhận chùm tia kéo dài hội tụ tại ảnh ảo nông hơn vị trí thật',
      'Do mắt người bị ảo giác quang học vì màu xanh của nước',
      'Do nước làm thon nhỏ kích thước thật của con cá',
      'Do đáy hồ phản xạ ánh sáng mạnh hơn mặt nước',
    ],
    correctIndex: 0,
    hint: 'Ảnh ảo của vật trong nước nhìn từ không khí luôn cao hơn vật thật.',
    explanation: 'Tia sáng từ con cá khúc xạ tại mặt nước với góc r > i, chùm tia khúc xạ loang ra vào mắt có đường kéo dài cắt nhau tại ảnh ảo S\' ở phía trên con cá thật S.',
  },
  {
    id: 'fq5_6',
    level: 'van_dung',
    levelName: 'Vận dụng',
    question: 'Chiếu tia sáng từ không khí vào một chất lỏng trong suốt với góc tới i = 45° thì đo được góc khúc xạ r = 30°. Chiết suất tuyệt đối của chất lỏng đó là:',
    options: [
      'căn(2) ≈ 1,414',
      '1,5',
      '1,33',
      '1,732',
    ],
    correctIndex: 0,
    hint: 'n = sin(i) / sin(r) = sin(45°) / sin(30°).',
    explanation: 'n = sin(45°) / sin(30°) = (căn(2)/2) / (1/2) = căn(2) ≈ 1,414.',
  },
  {
    id: 'fq5_7',
    level: 'van_dung',
    levelName: 'Vận dụng',
    question: 'Một tia sáng chiếu từ nước (n = 4/3) vào không khí. Nếu góc tới i = 0° (vuông góc mặt nước), góc khúc xạ r bằng:',
    options: [
      '0° (tia sáng truyền thẳng)',
      '45°',
      '90°',
      '30°',
    ],
    correctIndex: 0,
    hint: 'Chiếu vuông góc thì không bị khúc xạ đổi hướng.',
    explanation: 'Khi i = 0°, tia sáng đi trùng với pháp tuyến nên truyền thẳng, góc khúc xạ r = 0°.',
  },
  {
    id: 'fq5_8',
    level: 'van_dung',
    levelName: 'Vận dụng',
    question: 'Một bể chứa dầu trong suốt có chiết suất n = 1,5. Đáy bể có độ sâu thực tế là 1,8 m. Khi nhìn thẳng đứng từ trên xuống, đáy bể dường như chỉ cách mặt dầu bao nhiêu mét?',
    options: [
      '1,2 m',
      '2,7 m',
      '1,5 m',
      '0,9 m',
    ],
    correctIndex: 0,
    hint: 'h\' = h / n = 1,8 / 1,5.',
    explanation: 'Độ sâu biểu kiến h\' ≈ h / n = 1,8 m / 1,5 = 1,2 m. Đáy bể trông nông hơn 0,6 m so với thực tế.',
  },
];
