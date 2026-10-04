import { EssayQuestion } from '../types';

export const ESSAY_QUESTION_LESSON_1: EssayQuestion = {
  id: 'essay-lesson-1',
  title: 'Tự luận Vận dụng Thực tiễn: Thực Hành Quang Học & Thiết Kế Poster Khoa Học',
  level: 'van_dung',
  levelName: 'Mức 3: Vận dụng thực tế',
  points: 3.0,
  context: 'Nhóm em được phân công thực hiện đề tài nghiên cứu nhỏ: "Khảo sát định luật khúc xạ ánh sáng qua khối bán trụ thuỷ tinh" và trình bày báo cáo bằng Poster khổ A0 trong buổi hội thảo khoa học của trường.',
  question: `Hãy hoàn thành 3 yêu cầu khoa học sau:\n1. Liệt kê 3 dụng cụ thí nghiệm thiết yếu cần dùng và nêu rõ chức năng của từng dụng cụ.\n2. Nêu 2 quy tắc an toàn quan trọng khi sử dụng nguồn phát laser và bảo quản bản thuỷ tinh quang học.\n3. Nêu cấu trúc chuẩn của một Poster báo cáo khoa học (hoặc báo cáo thuyết trình) theo hướng dẫn SGK KHTN 9 để đạt hiệu quả trực quan cao nhất.`,
  guidelines: [
    'Phần 1 (1.0 điểm): Nêu đủ tên dụng cụ quang học (đèn laser, bản bán trụ thuỷ tinh, bảng chia độ tròn).',
    'Phần 2 (1.0 điểm): Nhấn mạnh quy tắc không chiếu laser vào mắt và cách vệ sinh/bảo quản bề mặt quang học.',
    'Phần 3 (1.0 điểm): Nêu đủ các mục chính của poster và lưu ý trực quan ít chữ, nhiều đồ thị/hình ảnh.'
  ],
  rubric: [
    {
      id: 'r1',
      criterion: 'Dụng cụ thí nghiệm quang học và công dụng',
      maxPoints: 1.0,
      description: 'Nêu đúng đèn laser (tạo chùm tia sáng hẹp), bản bán trụ thuỷ tinh (môi trường trong suốt truyền qua), bảng chia độ tròn (đo góc tới i và góc khúc xạ r).',
      keywords: ['đèn laser', 'bán trụ', 'bảng chia độ', 'góc tới', 'khúc xạ']
    },
    {
      id: 'r2',
      criterion: 'Quy tắc an toàn và bảo quản thiết bị',
      maxPoints: 1.0,
      description: 'Tuyệt đối không nhìn trực tiếp hoặc chiếu chùm laser vào mắt người khác; lau chùi dụng cụ quang học bằng khăn mềm chuyên dụng, không làm xước mặt phẳng.',
      keywords: ['không chiếu vào mắt', 'khăn mềm', 'tránh xước', 'tắt nguồn', 'an toàn']
    },
    {
      id: 'r3',
      criterion: 'Cấu trúc Poster và nguyên tắc trực quan',
      maxPoints: 1.0,
      description: 'Poster gồm: Tiêu đề, Tác giả, Mục tiêu, Phương pháp/Dụng cụ, Kết quả đồ thị, Kết luận; tuân thủ quy tắc ít chữ, nhiều biểu đồ/hình ảnh nổi bật.',
      keywords: ['tiêu đề', 'phương pháp', 'kết quả', 'đồ thị', 'kết luận', 'ít chữ', 'hình ảnh']
    }
  ],
  sampleAnswer: `1. Ba dụng cụ thí nghiệm thiết yếu:
- Đèn laser / nguồn phát tia sáng hẹp: tạo tia sáng song song mảnh dễ dàng quan sát đường truyền.
- Bản bán trụ thuỷ tinh: môi trường trong suốt để ánh sáng truyền qua và bị khúc xạ tại mặt phân cách.
- Bảng chia độ tròn: đo góc tới (i) và góc khúc xạ (r) tương ứng từ 0° đến 90°.

2. Hai quy tắc an toàn:
- Tuyệt đối không chiếu tia laser trực tiếp vào mắt hoặc để tia phản xạ chiếu vào mắt người khác vì chùm laser có mật độ năng lượng cao gây tổn thương võng mạc.
- Bảo quản bản bán trụ thuỷ tinh: lau bằng khăn giấy mềm hoặc vải chuyên dụng, không dùng vật cứng gây trầy xước làm sai lệch đường truyền ánh sáng; cất vào hộp chống sốc sau khi dùng.

3. Cấu trúc Poster khoa học theo chuẩn SGK:
- Bố cục gồm: Tiêu đề nghiên cứu (to rõ), Họ tên nhóm tác giả & trường lớp, Giới thiệu & Mục tiêu, Dụng cụ & Phương pháp tiến hành, Kết quả đo đạc (ưu tiên bảng số liệu & đồ thị góc i - góc r), Thảo luận & Kết luận.
- Nguyên tắc trực quan: Dùng ít chữ, cỡ chữ tối thiểu đọc được từ 1-2m, làm nổi bật thông điệp khoa học qua hình ảnh thí nghiệm thực tế.`
};

export const ESSAY_QUESTION_LESSON_2: EssayQuestion = {
  id: 'essay-lesson-2',
  title: 'Tự luận Vận dụng Thực tiễn: Bài Toán Búa Máy & Chuyển Hoá Cơ Năng',
  level: 'van_dung',
  levelName: 'Mức 3: Vận dụng thực tế',
  points: 3.0,
  context: 'Tại một công trường xây dựng nền móng cầu đường, một quả búa máy có khối lượng m = 500 kg được tời kéo lên độ cao h = 6 m so với đầu cọc bê tông trên mặt đất, sau đó thả rơi tự do để đóng cọc lún sâu vào nền đất cát. Lấy gia tốc trọng trường g = 10 m/s². Bỏ qua lực cản của không khí.',
  question: `Hãy giải quyết 3 bài toán vật lý sau:\n1. Xác định dạng năng lượng mà búa máy sở hữu ở độ cao 6 m và tính độ lớn năng lượng đó theo đơn vị Jun (J).\n2. Khi búa rơi chạm vào đầu cọc bê tông ở mặt đất, toàn bộ năng lượng trên đã chuyển hoá thành dạng năng lượng nào? Tính vận tốc của búa ngay trước thời điểm va chạm.\n3. Sau va chạm, cọc bê tông bị búa đóng lún sâu vào lòng đất một đoạn s = 15 cm (0,15 m). Hãy tính độ lớn lực cản trung bình của nền đất tác dụng lên cọc bê tông.`,
  guidelines: [
    'Phần 1 (1.0 điểm): Nhận diện đúng thế năng trọng trường và áp dụng Wt = m.g.h = 30 000 J.',
    'Phần 2 (1.0 điểm): Nêu sự chuyển hoá thành động năng Wđ = Wt = 30 000 J, tính đúng vận tốc v = √(2gh) ≈ 10,95 m/s.',
    'Phần 3 (1.0 điểm): Vận dụng định luật bảo toàn công: W = A_cản = F_cản . s => F_cản = 200 000 N.'
  ],
  rubric: [
    {
      id: 'r1',
      criterion: 'Nhận diện và tính Thế năng trọng trường',
      maxPoints: 1.0,
      description: 'Nêu đúng thế năng trọng trường; công thức Wt = m · g · h; tính đúng Wt = 500 · 10 · 6 = 30 000 J.',
      keywords: ['thế năng', 'trọng trường', '30000', '30 000', 'mgh']
    },
    {
      id: 'r2',
      criterion: 'Chuyển hoá sang Động năng và tính vận tốc',
      maxPoints: 1.0,
      description: 'Nêu đúng thế năng chuyển hoá thành động năng; Wđ = 30 000 J; tính v = căn(2gh) = căn(120) ≈ 10,95 m/s.',
      keywords: ['động năng', 'vận tốc', '10.95', '11', 'căn']
    },
    {
      id: 'r3',
      criterion: 'Tính lực cản trung bình của đất',
      maxPoints: 1.0,
      description: 'Nêu công lực cản A = F_cản · s; đổi s = 0,15 m; tính đúng F_cản = 30 000 / 0,15 = 200 000 N (200 kN).',
      keywords: ['lực cản', '200000', '200 000', '200 kn', '0.15']
    }
  ],
  sampleAnswer: `1. Dạng năng lượng và tính toán:
- Ở độ cao h = 6 m, búa máy sở hữu Thế năng trọng trường (do chịu tác dụng của trọng lực).
- Áp dụng công thức tính thế năng trọng trường:
  Wt = m · g · h = 500 · 10 · 6 = 30 000 J (hoặc 30 kJ).

2. Sự chuyển hoá năng lượng và vận tốc:
- Bỏ qua lực cản không khí, theo định luật bảo toàn cơ năng, khi rơi xuống sát mặt đất (h = 0), toàn bộ thế năng đã chuyển hoá thành Động năng:
  Wđ = Wt = 30 000 J.
- Ta có công thức: Wđ = 1/2 · m · v²
  => v² = (2 · Wđ) / m = (2 · 30 000) / 500 = 120
  => v = √120 ≈ 10,95 m/s.

3. Tính độ lớn lực cản trung bình của đất:
- Cơ năng của búa chuyển hoá thành công để thắng lực cản của đất làm cọc lún sâu s = 15 cm = 0,15 m:
  A_cản = F_cản · s = W = 30 000 J
- Lực cản trung bình của nền đất:
  F_cản = A_cản / s = 30 000 / 0,15 = 200 000 N (tương đương 200 kN).`
};

export const ESSAY_QUESTION_LESSON_3: EssayQuestion = {
  id: 'essay-lesson-3',
  title: 'Tự luận Vận dụng Thực tiễn: Định Luật Bảo Toàn Cơ Năng & Thiết Kế Tàu Lượn Siêu Tốc',
  level: 'van_dung',
  levelName: 'Mức 3: Vận dụng thực tế',
  points: 3.0,
  context: 'Một kĩ sư công viên giải trí đang thiết kế một toa tàu lượn siêu tốc có tổng khối lượng m = 400 kg. Toa tàu bắt đầu trượt không vận tốc đầu từ đỉnh A có độ cao h_A = 20 m so với mặt đất, đi xuống vị trí thấp nhất B sát mặt đất (h_B = 0 m), sau đó leo lên đỉnh vòng lộn nhào C có độ cao h_C = 12 m. Lấy g = 10 m/s² và giả sử ban đầu bỏ qua mọi ma sát và lực cản không khí.',
  question: `Hãy giải quyết 3 câu hỏi kĩ thuật sau:\n1. Tính cơ năng toàn phần của toa tàu tại đỉnh A (theo đơn vị Jun hoặc kJ). Khi đến điểm B thấp nhất, vận tốc của toa tàu đạt bao nhiêu?\n2. Khi toa tàu leo đến đỉnh C của vòng lộn nhào (cao 12 m), tính thế năng, động năng và vận tốc của toa tàu tại điểm C.\n3. Trong thực tế do ma sát giữa bánh xe với đường ray và sức cản không khí, vận tốc thực tế tại C chỉ đạt 10 m/s. Hãy tính độ hao phí cơ năng của toa tàu trên đoạn đường từ A đến C và giải thích dạng năng lượng mà lượng hao phí này đã chuyển hoá thành.`,
  guidelines: [
    'Phần 1 (1.0 điểm): Tính cơ năng W_A = W_tA = m·g·h_A = 80 000 J (80 kJ). Tại B: W_đB = W_A => v_B = √(2gh_A) = 20 m/s.',
    'Phần 2 (1.0 điểm): Tại C: W_tC = m·g·h_C = 48 000 J; W_đC = W_A - W_tC = 32 000 J; v_C = √(2·W_đC/m) = √160 ≈ 12,65 m/s.',
    'Phần 3 (1.0 điểm): W_thực = W_tC + 1/2 m v_thực² = 48 000 + 20 000 = 68 000 J. Hao phí ΔW = 80 000 - 68 000 = 12 000 J (12 kJ). Chuyển thành nhiệt năng làm nóng bánh xe, đường ray và âm thanh.'
  ],
  rubric: [
    {
      id: 'r1',
      criterion: 'Cơ năng tại A và vận tốc tại B',
      maxPoints: 1.0,
      description: 'Tính đúng W_A = 400 · 10 · 20 = 80 000 J (80 kJ); Tại B: v_B = √(2 · 10 · 20) = 20 m/s.',
      keywords: ['80000', '80 kJ', '20 m/s', 'bảo toàn cơ năng', 'vận tốc']
    },
    {
      id: 'r2',
      criterion: 'Thế năng, động năng và vận tốc tại C',
      maxPoints: 1.0,
      description: 'W_tC = 48 000 J; W_đC = 80 000 - 48 000 = 32 000 J; v_C = √(2 · 32000 / 400) = √160 ≈ 12,65 m/s.',
      keywords: ['48000', '48 kJ', '32000', '32 kJ', '12.65', '12,65']
    },
    {
      id: 'r3',
      criterion: 'Độ hao phí cơ năng và bản chất năng lượng',
      maxPoints: 1.0,
      description: 'Tính đúng cơ năng thực tế tại C = 68 000 J; độ hao phí ΔW = 12 000 J (12 kJ); giải thích đúng chuyển hoá thành nhiệt năng và năng lượng âm thanh.',
      keywords: ['12000', '12 kJ', 'hao phí', 'nhiệt năng', 'ma sát', 'âm thanh']
    }
  ],
  sampleAnswer: `1. Cơ năng tại đỉnh A và vận tốc tại vị trí B:
- Chọn mốc thế năng tại mặt đất (h = 0).
- Tại đỉnh A, toa tàu bắt đầu trượt không vận tốc ban đầu (v_A = 0):
  W_A = W_tA + W_đA = m · g · h_A + 0 = 400 · 10 · 20 = 80 000 J (tức 80 kJ).
- Theo định luật bảo toàn cơ năng (bỏ qua ma sát), tại vị trí B sát đất (h_B = 0):
  W_B = W_A = 80 000 J => W_đB = 1/2 · m · v_B² = 80 000 J.
  => v_B = √(2 · W_B / m) = √(2 · 80 000 / 400) = √400 = 20 m/s (tương đương 72 km/h).

2. Thế năng, động năng và vận tốc tại đỉnh C (h_C = 12 m):
- Thế năng tại C:
  W_tC = m · g · h_C = 400 · 10 · 12 = 48 000 J (48 kJ).
- Động năng tại C:
  W_đC = W_A - W_tC = 80 000 - 48 000 = 32 000 J (32 kJ).
- Vận tốc tại C:
  v_C = √(2 · W_đC / m) = √(2 · 32 000 / 400) = √160 ≈ 12,65 m/s.

3. Độ hao phí cơ năng trong thực tế:
- Khi có ma sát, cơ năng thực tế tại C là:
  W_C_thực = W_tC + 1/2 · m · v_thực² = 48 000 + 1/2 · 400 · (10)² = 48 000 + 20 000 = 68 000 J (68 kJ).
- Độ hao phí cơ năng do lực cản và ma sát gây ra:
  ΔW = W_A - W_C_thực = 80 000 - 68 000 = 12 000 J (12 kJ).
- Lượng cơ năng bị hao phí này không mất đi mà đã chuyển hoá thành nhiệt năng (làm nóng bánh xe toa tàu, thanh ray và không khí xung quanh) cùng năng lượng âm thanh (tiếng rít cọ xát).`
};

export const ESSAY_QUESTION_LESSON_4: EssayQuestion = {
  id: 'essay-lesson-4',
  title: 'Tự luận Vận dụng Thực tiễn: Tính Toán Công & Công Suất Cần Cẩu Xây Dựng',
  level: 'van_dung',
  levelName: 'Mức 3: Vận dụng thực tế',
  points: 3.0,
  context: 'Tại công trường xây dựng một toà chung cư cao tầng, một chiếc cần cẩu tháp sử dụng động cơ điện kéo một thùng vữa bê tông có khối lượng m = 1 200 kg chuyển động thẳng đều từ mặt đất lên sàn tầng 6 ở độ cao h = 18 m trong khoảng thời gian t = 36 giây. Lấy gia tốc trọng trường g = 10 m/s². Bỏ qua lực cản của không khí và ma sát ở các ròng rọc.',
  question: `Hãy hoàn thành 3 yêu cầu kĩ thuật sau:\n1. Tính độ lớn lực kéo của sợi dây cáp cần cẩu và tính công cơ học mà động cơ cần cẩu đã thực hiện để nâng thùng bê tông lên độ cao 18 m (theo đơn vị kJ).\n2. Tính công suất có ích của động cơ cần cẩu trong quá trình nâng. Nêu ý nghĩa con số công suất tính được.\n3. Khi thùng bê tông đã lên đến sàn tầng 6 và dừng lại, cần cẩu quay tay cần sang ngang để di chuyển thùng bê tông theo phương ngang một đoạn s = 8 m với vận tốc không đổi. Hãy cho biết trong quá trình dịch chuyển ngang này, trọng lực của thùng bê tông có sinh công không? Giải thích rõ lí do theo định nghĩa công cơ học.`,
  guidelines: [
    'Phần 1 (1.0 điểm): Tính đúng lực kéo F = P = m·g = 12 000 N. Công nâng A = F·h = 216 000 J = 216 kJ.',
    'Phần 2 (1.0 điểm): Tính công suất P = A / t = 216 000 / 36 = 6 000 W = 6 kW. Nêu đúng ý nghĩa: Mỗi giây động cơ sinh công 6 000 J.',
    'Phần 3 (1.0 điểm): Khẳng định trọng lực KHÔNG sinh công (A = 0) vì phương của trọng lực (thẳng đứng hướng xuống) vuông góc với phương dịch chuyển nằm ngang (alpha = 90°, cos 90° = 0).'
  ],
  rubric: [
    {
      id: 'r1',
      criterion: 'Tính Lực kéo và Công của cần cẩu',
      maxPoints: 1.0,
      description: 'Nêu F_kéo = P = 12 000 N; công A = F · h = 12 000 · 18 = 216 000 J = 216 kJ.',
      keywords: ['12000', '12 000', '216000', '216 kJ', 'công']
    },
    {
      id: 'r2',
      criterion: 'Tính Công suất và Giải thích ý nghĩa',
      maxPoints: 1.0,
      description: 'P = A / t = 216 000 / 36 = 6 000 W = 6 kW; giải thích: Trong mỗi 1 giây động cơ thực hiện một công 6 000 J.',
      keywords: ['6000', '6 kW', 'mỗi giây', '6 000 J', 'công suất']
    },
    {
      id: 'r3',
      criterion: 'Phân tích công của trọng lực khi dịch chuyển ngang',
      maxPoints: 1.0,
      description: 'Khẳng định A = 0; giải thích vì phương trọng lực thẳng đứng vuông góc với phương dịch chuyển ngang nên không sinh công cơ học.',
      keywords: ['không sinh công', 'bằng 0', 'vuông góc', 'A = 0', 'thẳng đứng', 'nằm ngang']
    }
  ],
  sampleAnswer: `1. Lực kéo của dây cáp và công cơ học của cần cẩu:
- Do thùng vữa bê tông được kéo chuyển động thẳng đều nên lực kéo của dây cáp cân bằng với trọng lượng của vật:
  F_kéo = P_vật = m · g = 1 200 · 10 = 12 000 N.
- Công cơ học mà động cơ cần cẩu thực hiện khi nâng thùng hàng lên cao h = 18 m:
  A = F_kéo · h = 12 000 · 18 = 216 000 J = 216 kJ.

2. Công suất có ích của động cơ cần cẩu và ý nghĩa vật lí:
- Áp dụng công thức tính công suất:
  P = A / t = 216 000 / 36 = 6 000 W = 6 kW.
- Ý nghĩa vật lí của con số 6 kW (6 000 W):
  Công suất 6 000 W cho biết tốc độ thực hiện công của động cơ cần cẩu, nghĩa là cứ trong mỗi 1 giây hoạt động bình thường, động cơ cần cẩu có khả năng sinh ra một công cơ học là 6 000 Jun để kéo vật.

3. Phân tích công của trọng lực khi thùng bê tông di chuyển theo phương ngang:
- Trong quá trình thùng bê tông chuyển động theo phương ngang, trọng lực của thùng bê tông KHÔNG SINH CÔNG CƠ HỌC (A = 0 J).
- Giải thích bản chất vật lí:
  Theo định nghĩa, công cơ học chỉ xuất hiện khi lực tác dụng có phương không vuông góc với phương dịch chuyển. Ở đây:
  + Trọng lực P luôn có phương thẳng đứng, hướng từ trên xuống dưới.
  + Thùng bê tông dịch chuyển theo phương nằm ngang.
  Do phương của trọng lực VUÔNG GÓC với phương chuyển dời của vật (góc α = 90°, cos 90° = 0), lực không làm vật tăng tốc hay dời chỗ theo phương thẳng đứng nên trọng lực không sinh công.`
};


