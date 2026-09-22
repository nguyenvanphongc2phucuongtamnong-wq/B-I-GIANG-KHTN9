import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json({ limit: "10mb" }));

// CORS headers for local/cross-origin safety
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Database Setup (Server-side File-backed JSON Database)
const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "students_database.json");

interface ServerStudentProfile {
  studentId: string;
  email: string;
  displayName: string;
  avatar?: string;
  school?: string;
  classId: string; // "9A1".."9A8"
  role: "student";
  createdAt: string;
  lastLoginAt: string;

  // Tiến độ học
  currentLesson: number;
  completedLessons: number[];
  completedStages: Record<string, string[]>;
  progressPercent: number;
  xp: number;
  streakDays: number;

  // Đánh giá
  assessmentsCompleted: number;
  scores: Array<{
    assessmentId: string;
    lessonId: number;
    attemptId: string;
    submittedAt: string;
    score: number;
    maxScore: number;
    percentage: number;
    resultByLevel: {
      nhanBiet: number;
      thongHieu: number;
      vanDung: number;
    };
    feedback?: {
      strengths?: string;
      reviewNeeded?: string;
    };
  }>;
}

interface DatabaseSchema {
  students: Record<string, ServerStudentProfile>;
  quizAttempts: any[];
  transfers: any[];
}

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readDatabase(): DatabaseSchema {
  ensureDataDir();
  if (!fs.existsSync(DB_FILE)) {
    const initialDb: DatabaseSchema = {
      students: {},
      quizAttempts: [],
      transfers: [
        {
          id: "req-init-1",
          studentId: "hs-03",
          studentName: "Vũ Đức Long",
          currentClass: "9A1",
          requestedClass: "9A2",
          reason: "Em chuyển buổi học bồi dưỡng Tin học sang thứ 3 trùng lịch 9A1, xin chuyển sang 9A2 để thuận tiện tham gia đầy đủ",
          date: "09/09/2026",
          status: "pending"
        }
      ]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), "utf-8");
    return initialDb;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("[Database] Error reading database file:", err);
    return { students: {}, quizAttempts: [], transfers: [] };
  }
}

function writeDatabase(db: DatabaseSchema): void {
  ensureDataDir();
  try {
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(db, null, 2), "utf-8");
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error("[Database] Error writing database file:", err);
  }
}

const VALID_CLASSES = ["9A1", "9A2", "9A3", "9A4", "9A5", "9A6", "9A7", "9A8"];

// ==========================================
// API ROUTES
// ==========================================

// 1. Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 2. Lấy danh sách học sinh cho Teacher Dashboard (lọc theo classId hoặc all)
app.get("/api/students", (req, res) => {
  try {
    const db = readDatabase();
    const classFilter = req.query.classId as string | undefined;

    // Chuyển đổi hồ sơ từ database sang StudentProgressItem
    const studentList = Object.values(db.students).map((s) => {
      const validScores = s.scores || [];
      const hasScores = validScores.length > 0;
      const latestScore = hasScores ? validScores[validScores.length - 1].score : null;
      const hasCompletedLessons = s.completedLessons && s.completedLessons.length > 0;

      // Học sinh mới đăng ký và chưa nộp bài -> status: 'not_started', score: null
      let status: "completed" | "in_progress" | "not_started" = "not_started";
      if (hasScores || hasCompletedLessons) {
        status = "completed";
      } else if (s.classId && (s.progressPercent > 0 || (s.xp && s.xp > 0))) {
        status = "in_progress";
      }

      const competency = hasScores && latestScore !== null
        ? {
            nhanBietRate: Math.min(100, Math.round(latestScore * 10)),
            thongHieuRate: Math.min(100, Math.round(latestScore * 9)),
            vanDungRate: Math.min(100, Math.round(latestScore * 8))
          }
        : {
            nhanBietRate: 0,
            thongHieuRate: 0,
            vanDungRate: 0
          };

      return {
        id: s.studentId,
        studentName: s.displayName,
        email: s.email,
        avatar: s.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        className: s.classId || "Chưa chọn lớp",
        currentLessonId: s.currentLesson || 1,
        unlockedLessonIds: hasCompletedLessons ? [1, 2] : [1],
        completedLessonIds: s.completedLessons || [],
        overallProgress: s.progressPercent || 0,
        lastQuizScore: latestScore, // null nếu chưa có bài nộp
        completedTests: validScores.length,
        completedExercises: hasCompletedLessons ? s.completedLessons.length * 8 : 0,
        lastActive: s.lastLoginAt ? new Date(s.lastLoginAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) + " hôm nay" : "Vừa đăng ký",
        status,
        competency,
        recentMistakes: [],
        createdAt: s.createdAt,
        lastLoginAt: s.lastLoginAt,
        isRealStudent: true
      };
    });

    // Lọc theo lớp nếu được chỉ định
    const filtered = classFilter && classFilter !== "all"
      ? studentList.filter((s) => s.className === classFilter)
      : studentList;

    res.json({
      success: true,
      count: filtered.length,
      students: filtered
    });
  } catch (err: any) {
    console.error("[API GET /api/students] Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Lấy thông tin chi tiết một học sinh
app.get("/api/students/:id", (req, res) => {
  try {
    const db = readDatabase();
    const id = req.params.id;
    const cleanId = id.toLowerCase().trim();

    // Tìm theo studentId hoặc email
    const student = Object.values(db.students).find(
      (s) => s.studentId.toLowerCase() === cleanId || s.email.toLowerCase() === cleanId
    );

    if (!student) {
      return res.status(404).json({ success: false, message: "Không tìm thấy học sinh" });
    }

    res.json({ success: true, student });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Đăng nhập / Upsert hồ sơ học sinh (QUY TẮC VI & VII: Dùng authenticated ID / Email, không tạo trùng)
app.post("/api/students/upsert", (req, res) => {
  try {
    const { studentId, email, displayName, avatar, classId, school } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email là bắt buộc" });
    }

    const cleanEmail = email.trim().toLowerCase();
    const db = readDatabase();

    // Tìm xem học sinh đã có hồ sơ chưa (theo email hoặc studentId)
    const existingKey = Object.keys(db.students).find(
      (k) => db.students[k].email.toLowerCase() === cleanEmail || (studentId && db.students[k].studentId === studentId)
    );

    const now = new Date().toISOString();

    if (existingKey) {
      // ĐÃ CÓ HỒ SƠ -> UPDATE
      const existing = db.students[existingKey];
      existing.lastLoginAt = now;
      if (displayName) existing.displayName = displayName;
      if (avatar) existing.avatar = avatar;
      if (classId && VALID_CLASSES.includes(classId)) {
        existing.classId = classId;
      }
      db.students[existingKey] = existing;
      writeDatabase(db);
      return res.json({ success: true, action: "updated", student: existing });
    }

    // CHƯA CÓ HỒ SƠ -> CREATE
    // QUY TẮC V: HỌC SINH MỚI KHÔNG ĐƯỢC CÓ ĐIỂM HOẶC TIẾN ĐỘ 100%!
    const newStudentId = studentId || `student-${cleanEmail.replace(/[^a-zA-Z0-9]/g, "_")}`;
    const newProfile: ServerStudentProfile = {
      studentId: newStudentId,
      email: cleanEmail,
      displayName: displayName || cleanEmail.split("@")[0],
      avatar: avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      school: school || "Trường THCS Phú Ninh",
      classId: classId && VALID_CLASSES.includes(classId) ? classId : "",
      role: "student",
      createdAt: now,
      lastLoginAt: now,
      currentLesson: 1,
      completedLessons: [],
      completedStages: {},
      progressPercent: 0,
      xp: 0,
      streakDays: 1,
      assessmentsCompleted: 0,
      scores: []
    };

    db.students[cleanEmail] = newProfile;
    writeDatabase(db);

    res.json({ success: true, action: "created", student: newProfile });
  } catch (err: any) {
    console.error("[API POST /api/students/upsert] Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Chọn lớp học (QUY TẮC VIII: Lưu thành công vào database chung mới được vào học)
app.post("/api/students/select-class", (req, res) => {
  try {
    const { studentId, email, classId, displayName, avatar } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email là bắt buộc" });
    }

    if (!classId || !VALID_CLASSES.includes(classId)) {
      return res.status(400).json({ 
        success: false, 
        message: `Lớp không hợp lệ. Vui lòng chọn 1 trong 8 lớp: ${VALID_CLASSES.join(", ")}` 
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const db = readDatabase();
    const now = new Date().toISOString();

    // Tìm hồ sơ
    const existingKey = Object.keys(db.students).find(
      (k) => db.students[k].email.toLowerCase() === cleanEmail || (studentId && db.students[k].studentId === studentId)
    );

    let studentProfile: ServerStudentProfile;

    if (existingKey) {
      studentProfile = db.students[existingKey];
      studentProfile.classId = classId;
      studentProfile.lastLoginAt = now;
      if (displayName) studentProfile.displayName = displayName;
      if (avatar) studentProfile.avatar = avatar;
      db.students[existingKey] = studentProfile;
    } else {
      const newStudentId = studentId || `student-${cleanEmail.replace(/[^a-zA-Z0-9]/g, "_")}`;
      studentProfile = {
        studentId: newStudentId,
        email: cleanEmail,
        displayName: displayName || cleanEmail.split("@")[0],
        avatar: avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
        school: "Trường THCS Phú Ninh",
        classId,
        role: "student",
        createdAt: now,
        lastLoginAt: now,
        currentLesson: 1,
        completedLessons: [],
        completedStages: {},
        progressPercent: 0,
        xp: 0,
        streakDays: 1,
        assessmentsCompleted: 0,
        scores: []
      };
      db.students[cleanEmail] = studentProfile;
    }

    writeDatabase(db);
    console.log(`[Database] Đã lưu thành công học sinh ${studentProfile.displayName} (${studentProfile.email}) vào lớp ${classId}`);

    res.json({
      success: true,
      message: "Lưu thông tin lớp học thành công",
      student: studentProfile
    });
  } catch (err: any) {
    console.error("[API POST /api/students/select-class] Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. Cập nhật tiến độ học tập của học sinh
app.post("/api/students/progress", (req, res) => {
  try {
    const { studentId, email, currentLesson, completedLessons, completedStages, progressPercent, xp, streakDays } = req.body;

    if (!email && !studentId) {
      return res.status(400).json({ success: false, message: "studentId hoặc email là bắt buộc" });
    }

    const cleanEmail = (email || "").trim().toLowerCase();
    const db = readDatabase();

    const existingKey = Object.keys(db.students).find(
      (k) => (cleanEmail && db.students[k].email.toLowerCase() === cleanEmail) || (studentId && db.students[k].studentId === studentId)
    );

    if (!existingKey) {
      return res.status(404).json({ success: false, message: "Không tìm thấy học sinh để cập nhật tiến độ" });
    }

    const student = db.students[existingKey];
    if (currentLesson !== undefined) student.currentLesson = currentLesson;
    if (completedLessons !== undefined) student.completedLessons = completedLessons;
    if (completedStages !== undefined) student.completedStages = completedStages;
    if (progressPercent !== undefined) student.progressPercent = progressPercent;
    if (xp !== undefined) student.xp = xp;
    if (streakDays !== undefined) student.streakDays = streakDays;
    student.lastLoginAt = new Date().toISOString();

    db.students[existingKey] = student;
    writeDatabase(db);

    res.json({ success: true, student });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. Ghi nhận kết quả làm bài kiểm tra (QUY TẮC XII: Tách rõ kết quả đánh giá và tiến độ)
app.post("/api/quiz-attempts", (req, res) => {
  try {
    const attempt = req.body;
    if (!attempt || !attempt.studentEmail) {
      return res.status(400).json({ success: false, message: "Dữ liệu attempt không hợp lệ" });
    }

    const db = readDatabase();
    db.quizAttempts.unshift(attempt);

    // Cập nhật kết quả vào hồ sơ học sinh
    const cleanEmail = attempt.studentEmail.trim().toLowerCase();
    const existingKey = Object.keys(db.students).find(
      (k) => db.students[k].email.toLowerCase() === cleanEmail || db.students[k].studentId === attempt.studentId
    );

    if (existingKey) {
      const student = db.students[existingKey];
      if (!student.scores) student.scores = [];

      const scoreValue = typeof attempt.score === "number" ? attempt.score : 0;
      const newScoreRecord = {
        assessmentId: attempt.attemptId || `assess-${Date.now()}`,
        lessonId: attempt.lessonId || 1,
        attemptId: attempt.attemptId || `attempt-${Date.now()}`,
        submittedAt: attempt.submittedAt || new Date().toISOString(),
        score: scoreValue,
        maxScore: attempt.maxScore || 10,
        percentage: attempt.percentage || Math.round((scoreValue / 10) * 100),
        resultByLevel: {
          nhanBiet: 2.5,
          thongHieu: 2.5,
          vanDung: Math.max(0, +(scoreValue - 5.0).toFixed(1))
        },
        feedback: {
          strengths: scoreValue >= 8 ? "Nắm vững lý thuyết và áp dụng tốt vào thực hành" : "Nhận biết tốt nội dung cơ bản",
          reviewNeeded: scoreValue < 8 ? "Cần rèn luyện thêm bài tập vận dụng" : "Duy trì phong độ học tập tốt"
        }
      };

      student.scores.push(newScoreRecord);
      student.assessmentsCompleted = student.scores.length;

      // Nếu đạt >= 5.0 thì hoàn thành bài học
      if (scoreValue >= 5) {
        if (!student.completedLessons) student.completedLessons = [];
        if (!student.completedLessons.includes(attempt.lessonId)) {
          student.completedLessons.push(attempt.lessonId);
        }
      }

      // Cập nhật tiến độ
      student.progressPercent = Math.min(100, (student.completedLessons?.length || 0) * 50);

      db.students[existingKey] = student;
    }

    writeDatabase(db);
    res.json({ success: true, message: "Lưu kết quả bài kiểm tra thành công" });
  } catch (err: any) {
    console.error("[API POST /api/quiz-attempts] Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. Lấy danh sách yêu cầu chuyển lớp
app.get("/api/transfers", (req, res) => {
  try {
    const db = readDatabase();
    res.json({ success: true, transfers: db.transfers || [] });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 9. Nộp yêu cầu chuyển lớp
app.post("/api/students/transfer-request", (req, res) => {
  try {
    const request = req.body;
    if (!request || !request.studentId || !request.requestedClass) {
      return res.status(400).json({ success: false, message: "Thông tin chuyển lớp không hợp lệ" });
    }

    const db = readDatabase();
    if (!db.transfers) db.transfers = [];
    db.transfers.unshift(request);
    writeDatabase(db);

    res.json({ success: true, message: "Đã gửi yêu cầu chuyển lớp đến giáo viên" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 10. Giáo viên phê duyệt chuyển lớp
app.post("/api/transfers/:id/approve", (req, res) => {
  try {
    const reqId = req.params.id;
    const db = readDatabase();

    const transferReq = (db.transfers || []).find((t) => t.id === reqId);
    if (!transferReq) {
      return res.status(404).json({ success: false, message: "Không tìm thấy yêu cầu" });
    }

    transferReq.status = "approved";

    // Cập nhật lớp mới cho học sinh trong database
    const student = Object.values(db.students).find(
      (s) => s.studentId === transferReq.studentId || s.displayName === transferReq.studentName
    );

    if (student) {
      student.classId = transferReq.requestedClass;
    }

    writeDatabase(db);
    res.json({ success: true, message: "Phê duyệt chuyển lớp thành công", newClass: transferReq.requestedClass });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 11. Giáo viên từ chối chuyển lớp
app.post("/api/transfers/:id/reject", (req, res) => {
  try {
    const reqId = req.params.id;
    const db = readDatabase();

    const transferReq = (db.transfers || []).find((t) => t.id === reqId);
    if (!transferReq) {
      return res.status(404).json({ success: false, message: "Không tìm thấy yêu cầu" });
    }

    transferReq.status = "rejected";
    writeDatabase(db);

    res.json({ success: true, message: "Đã từ chối chuyển lớp" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 12. Migration endpoint (QUY TẮC XIV: Đưa hồ sơ từ LocalStorage cũ lên Database chung)
app.post("/api/students/sync-legacy", (req, res) => {
  try {
    const { students } = req.body;
    if (!Array.isArray(students)) {
      return res.json({ success: true, migratedCount: 0 });
    }

    const db = readDatabase();
    let count = 0;

    students.forEach((s: any) => {
      if (!s.email) return;
      const cleanEmail = s.email.trim().toLowerCase();
      if (!db.students[cleanEmail]) {
        db.students[cleanEmail] = {
          studentId: s.id || `student-${cleanEmail.replace(/[^a-zA-Z0-9]/g, "_")}`,
          email: cleanEmail,
          displayName: s.name || cleanEmail.split("@")[0],
          avatar: s.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
          school: s.school || "Trường THCS Phú Ninh",
          classId: s.gradeClass || "",
          role: "student",
          createdAt: s.joinDate || new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          currentLesson: s.currentLessonId || 1,
          completedLessons: s.completedLessonIds || [],
          completedStages: {},
          progressPercent: s.completedLessonIds?.length ? s.completedLessonIds.length * 50 : 0,
          xp: s.xp || 0,
          streakDays: s.streakDays || 1,
          assessmentsCompleted: s.quizRecords ? Object.keys(s.quizRecords).length : 0,
          scores: []
        };
        count++;
      }
    });

    if (count > 0) {
      writeDatabase(db);
    }

    res.json({ success: true, migratedCount: count });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// VITE MIDDLEWARE & STATIC SERVE
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] KHTN 9 Full-stack Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
