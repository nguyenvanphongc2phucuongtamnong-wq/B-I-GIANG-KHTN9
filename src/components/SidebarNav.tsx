import React, { useState } from 'react';
import { LessonStage, UserAccount } from '../types';
import { 
  Compass, 
  Rocket, 
  BookOpen, 
  Gamepad2, 
  FileEdit, 
  Globe2, 
  HelpCircle, 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  User, 
  Zap, 
  Flame, 
  BrainCircuit, 
  School,
  IdCard,
  Layers,
  X
} from 'lucide-react';

interface SidebarNavProps {
  currentTab: 'content_map' | 'teacher_dashboard' | LessonStage;
  onSelectTab: (tab: 'content_map' | 'teacher_dashboard' | LessonStage) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  currentUser: UserAccount;
  onOpenAuthModal: () => void;
  onOpenProfileModal: () => void;
  activeLessonId: number;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  currentTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  currentUser,
  onOpenAuthModal,
  onOpenProfileModal,
  activeLessonId
}) => {
  const [mobileStagesMenuOpen, setMobileStagesMenuOpen] = useState(false);

  const lessonStages: { id: LessonStage; label: string; icon: any; color: string }[] = [
    { id: 'sgk_learning', label: 'Bài học (4 tab chuẩn)', icon: BookOpen, color: 'text-blue-600' }
  ];

  const handleMobileSelectStage = (stageId: LessonStage) => {
    onSelectTab(stageId);
    setMobileStagesMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar: Collapsible */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r border-slate-200 transition-all duration-200 shrink-0 sticky top-16 h-[calc(100vh-4rem)] z-30 ${
          isCollapsed ? 'w-16' : 'w-60'
        }`}
      >
        {/* Toggle Collapse Button Header */}
        <div className="p-3 border-b border-slate-100 flex items-center justify-between">
          {!isCollapsed && (
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">
              Điều hướng bài học
            </span>
          )}
          <button
            type="button"
            onClick={onToggleCollapse}
            title={isCollapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors mx-auto cursor-pointer"
            aria-label="Thu gọn hoặc mở rộng menu"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-4">
          {/* Main Book Map */}
          <div>
            <button
              type="button"
              onClick={() => onSelectTab('content_map')}
              title="Khung Toàn Bộ Sách (51 Bài)"
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[44px] ${
                currentTab === 'content_map'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              } ${isCollapsed ? 'justify-center px-0' : ''}`}
            >
              <Compass className="w-4 h-4 text-indigo-600 shrink-0" />
              {!isCollapsed && <span className="truncate">Toàn Bộ Sách (51 Bài)</span>}
            </button>
          </div>

          {/* Teacher Dashboard Link: CHỈ HIỂN THỊ KHI VAI TRÒ LÀ GIÁO VIÊN */}
          {currentUser.role === 'teacher' && (
            <div>
              <button
                type="button"
                onClick={() => onSelectTab('teacher_dashboard')}
                title="Teacher Dashboard (Dành cho Giáo viên)"
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[44px] ${
                  currentTab === 'teacher_dashboard'
                    ? 'bg-purple-50 text-purple-700 border border-purple-200/80 shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                } ${isCollapsed ? 'justify-center px-0' : ''}`}
              >
                <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
                {!isCollapsed && (
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="truncate">Teacher Dashboard</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  </div>
                )}
              </button>
            </div>
          )}

          {/* Current Lesson Stages */}
          <div className="space-y-1">
            {!isCollapsed && (
              <div className="px-2 pb-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Bài {activeLessonId}: Tiến Trình</span>
                <span className="text-blue-600 font-bold">4 Tab Chuẩn</span>
              </div>
            )}

            {lessonStages.map((stage) => {
              const Icon = stage.icon;
              const isActive = currentTab === stage.id;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => onSelectTab(stage.id)}
                  title={stage.label}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer min-h-[40px] ${
                    isActive
                      ? 'bg-blue-50 text-blue-800 font-bold border border-blue-200/80 shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${stage.color}`} />
                  {!isCollapsed && <span className="truncate">{stage.label}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* User Account & Student Profile Footer */}
        <div className="p-2.5 border-t border-slate-100 bg-slate-50/70 space-y-1.5">
          {currentUser.role === 'student' && (
            <button
              type="button"
              onClick={onOpenProfileModal}
              title="Xem Hồ Sơ Học Sinh & Kết Quả"
              className={`w-full flex items-center gap-2 rounded-xl text-xs p-2 hover:bg-blue-50/80 text-blue-700 transition-colors cursor-pointer min-h-[40px] ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <School className="w-4 h-4 text-blue-600 shrink-0" />
              {!isCollapsed && (
                <span className="font-bold text-[11px] truncate">
                  Hồ sơ • <span className="underline">{currentUser.gradeClass}</span>
                </span>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={onOpenAuthModal}
            className={`w-full flex items-center gap-2.5 rounded-xl text-xs transition-colors hover:bg-white p-2 cursor-pointer min-h-[44px] ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={`Tài khoản: ${currentUser.name}`}
          >
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-7 h-7 rounded-full object-cover border border-slate-300 shrink-0" 
            />
            {!isCollapsed && (
              <div className="text-left overflow-hidden">
                <div className="font-bold text-slate-800 truncate text-[11px] leading-tight">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {currentUser.role === 'teacher' ? '👨🏫 Giáo viên THCS' : `👨🎓 ${currentUser.gradeClass}`}
                </div>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Stages Drawer Modal */}
      {mobileStagesMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div className="bg-white rounded-t-3xl p-5 border-t border-slate-200 shadow-2xl max-h-[80vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-slate-900 text-sm">
                  Bài {activeLessonId}: Chọn Chặng Học Tập
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileStagesMenuOpen(false)}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {lessonStages.map((stage) => {
                const Icon = stage.icon;
                const isActive = currentTab === stage.id;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => handleMobileSelectStage(stage.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl text-xs font-bold transition-all min-h-[48px] ${
                      isActive
                        ? 'bg-blue-50 text-blue-800 border border-blue-300 shadow-xs'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${stage.color}`} />
                      <span>{stage.label}</span>
                    </div>
                    {isActive && <span className="text-blue-600 text-[10px]">Đang học</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar: Compact, High-contrast, Full Access */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-2 flex items-center justify-around shadow-lg">
        <button
          type="button"
          onClick={() => onSelectTab('content_map')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold p-1 min-w-[56px] min-h-[44px] justify-center ${
            currentTab === 'content_map' ? 'text-indigo-600' : 'text-slate-500'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span>Toàn Sách</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('sgk_learning')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold p-1 min-w-[56px] min-h-[44px] justify-center ${
            currentTab === 'sgk_learning' ? 'text-blue-600' : 'text-slate-500'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>5 Mục SGK</span>
        </button>

        {currentUser.role === 'teacher' ? (
          <button
            type="button"
            onClick={() => onSelectTab('teacher_dashboard')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-bold p-1 min-w-[56px] min-h-[44px] justify-center ${
              currentTab === 'teacher_dashboard' ? 'text-purple-600' : 'text-slate-500'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Giáo Viên</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onOpenProfileModal}
            className="flex flex-col items-center gap-0.5 text-[10px] font-bold text-slate-500 p-1 min-w-[56px] min-h-[44px] justify-center"
          >
            <School className="w-5 h-5 text-blue-600" />
            <span>{currentUser.gradeClass}</span>
          </button>
        )}

        <button
          type="button"
          onClick={onOpenAuthModal}
          className="flex flex-col items-center gap-0.5 text-[10px] font-bold text-slate-500 p-1 min-w-[56px] min-h-[44px] justify-center"
        >
          <User className="w-5 h-5" />
          <span>Tài Khoản</span>
        </button>
      </nav>
    </>
  );
};
