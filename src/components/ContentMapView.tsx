import React, { useState } from 'react';
import { CURRICULUM_CONTENT_MAP } from '../data/curriculumMap';
import { 
  BookOpen, 
  Lock, 
  CheckCircle2, 
  Search, 
  Sparkles, 
  Compass, 
  Layers, 
  GraduationCap 
} from 'lucide-react';

interface ContentMapViewProps {
  onSelectLesson: (lessonId: number) => void;
  activeLessonId: number;
  unlockedLessonIds?: number[];
}

export const ContentMapView: React.FC<ContentMapViewProps> = ({ 
  onSelectLesson, 
  activeLessonId,
  unlockedLessonIds = [1]
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<number | 'all'>('all');

  const chapters = Array.from(new Set(CURRICULUM_CONTENT_MAP.map(item => item.chapterNumber))).map(num => {
    const sample = CURRICULUM_CONTENT_MAP.find(item => item.chapterNumber === num);
    return {
      number: num,
      title: sample ? sample.chapterTitle : `Chương ${num}`,
    };
  });

  const filteredLessons = CURRICULUM_CONTENT_MAP.filter(item => {
    const matchesSearch = item.lessonTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.coreKnowledge.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChapter = selectedChapter === 'all' || item.chapterNumber === selectedChapter;
    return matchesSearch && matchesChapter;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner - Geometric Balance */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wider text-blue-700">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              <span>Khung Chương Trình Toàn Bộ Sách Giáo Khoa</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Chương Trình Khoa Học Tự Nhiên Lớp 9
            </h2>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              Hệ thống hóa toàn bộ 14 chương với 51 bài học chuẩn theo sách giáo khoa <strong>Kết nối tri thức với cuộc sống</strong> (Bộ Giáo dục & Đào tạo).
              Hệ thống áp dụng phương pháp sư phạm học sâu: <strong>tập trung hoàn thành chắc chắn từng bài học theo tiến trình</strong> (Hiện tại: <strong>Bài {activeLessonId}</strong>).
            </p>
          </div>

          <div className="shrink-0 flex md:flex-col items-end gap-2">
            <span className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-700">
              14 Chương • 51 Bài
            </span>
          </div>
        </div>

        {/* 3 Symmetrical Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Đang học trực tiếp</div>
              <div className="text-sm font-bold text-slate-900">
                {CURRICULUM_CONTENT_MAP.find(m => m.id === activeLessonId)?.lessonTitle ? `Bài ${activeLessonId}: ${CURRICULUM_CONTENT_MAP.find(m => m.id === activeLessonId)?.lessonTitle.split('.')[0]}` : `Bài ${activeLessonId}`}
              </div>
            </div>
          </div>

          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-blue-800 uppercase tracking-wide">Tiến trình tuần tự</div>
              <div className="text-sm font-bold text-slate-900">50 Bài tiếp theo theo SGK</div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">Chuẩn đầu ra</div>
              <div className="text-sm font-bold text-slate-900">GDPT 2018 (Năng lực)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl p-3 shadow-xs border border-slate-200 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm bài học, công thức, định luật..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
          />
        </div>

        {/* Chapter dropdown */}
        <div className="w-full md:w-auto flex items-center gap-2">
          <Layers className="w-4 h-4 text-slate-500 hidden md:block" />
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            aria-label="Lọc theo Chương / Chủ đề"
            className="w-full md:w-80 py-2 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium text-slate-700"
          >
            <option value="all">Tất cả các chương (Toàn bộ 14 chương)</option>
            {chapters.map((chap) => (
              <option key={chap.number} value={chap.number}>
                {chap.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Map Table */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4 w-16 text-center">Bài</th>
                <th className="py-3 px-4 w-48">Chương / Chủ đề</th>
                <th className="py-3 px-4 w-64">Tên bài học</th>
                <th className="py-3 px-4">Nội dung trọng tâm (SGK KHTN 9)</th>
                <th className="py-3 px-3 w-20 text-center">Trang</th>
                <th className="py-3 px-4 w-36 text-center">Trạng thái</th>
                <th className="py-3 px-4 w-28 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {filteredLessons.map((item) => {
                const isActive = item.id === activeLessonId;
                return (
                  <tr 
                    key={item.id}
                    className={`transition-colors ${
                      isActive 
                        ? 'bg-blue-50/50 hover:bg-blue-50/80 font-medium' 
                        : 'hover:bg-slate-50/70'
                    }`}
                  >
                    <td className="py-3.5 px-4 text-center font-bold text-slate-700">
                      {item.lessonNumber}
                    </td>
                    <td className="py-3.5 px-4 text-xs font-semibold text-slate-600">
                      {item.chapterTitle}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {item.lessonTitle}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600 leading-relaxed">
                      {item.coreKnowledge}
                    </td>
                    <td className="py-3.5 px-3 text-center text-xs font-mono text-slate-500">
                      {item.page}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                          Đang học
                        </span>
                      ) : unlockedLessonIds.includes(item.id) ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                          Đã mở khoá
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200">
                          <Lock className="w-3 h-3 text-slate-400" />
                          Đã khoá
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {unlockedLessonIds.includes(item.id) ? (
                        <button
                          onClick={() => onSelectLesson(item.id)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1 w-full ${
                            isActive 
                              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          }`}
                        >
                          <BookOpen className="w-3.5 h-3.5" /> {isActive ? 'Vào học' : 'Mở bài'}
                        </button>
                      ) : (
                        <button
                          disabled
                          title="Cần hoàn thành các bài trước để mở khoá theo tiến trình SGK"
                          className="bg-slate-100 text-slate-400 text-xs font-medium px-3 py-1.5 rounded-lg cursor-not-allowed w-full border border-slate-200 flex items-center justify-center gap-1"
                        >
                          <Lock className="w-3 h-3" /> Chờ mở
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footnote on Pedagogical Principle */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 text-xs text-slate-600 flex items-start gap-3 shadow-xs">
        <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Nguyên tắc sư phạm chuẩn:</strong> Ứng dụng thực hiện cơ chế mở khoá tuần tự từng bài học để học sinh nắm chắc kiến thức cốt lõi, hoàn thành các hoạt động tư duy tương tác và luyện tập phân hoá trước khi bước sang nội dung tiếp theo.
        </p>
      </div>
    </div>
  );
};
