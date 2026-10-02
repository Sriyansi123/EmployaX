import React from 'react';
import { EmployaXLogo } from '../EmployaXLogo';
import { ArrowLeft, Bell, Search, User } from 'lucide-react';
import { StudentProfile } from '../../types';

interface TopBarProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  unreadCount?: number;
  student: StudentProfile;
}

export const TopBar: React.FC<TopBarProps> = ({
  title,
  subtitle,
  onBack,
  onOpenSearch,
  onOpenNotifications,
  onOpenProfile,
  unreadCount = 0,
  student,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 shadow-xs">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Back button or Logo */}
        <div className="flex items-center gap-3">
          {onBack ? (
            <button
              onClick={onBack}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 transition-all active:scale-95 flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-600" />
              <span className="hidden sm:inline">Hub</span>
            </button>
          ) : (
            <EmployaXLogo variant="nav" inverted={false} />
          )}

          {title && (
            <div className="border-l border-slate-200 pl-3">
              <h1 className="text-sm sm:text-base font-heading font-extrabold text-slate-900 leading-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-[11px] text-slate-500 leading-none hidden sm:block">
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 text-slate-600 hover:text-slate-900 transition-all active:scale-95 cursor-pointer"
            title="Global Search (Ctrl+K)"
          >
            <Search className="w-4 h-4 text-cyan-600" />
          </button>

          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 text-slate-600 hover:text-slate-900 transition-all active:scale-95 cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-slate-700" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            )}
          </button>

          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 text-xs transition-all active:scale-95 cursor-pointer"
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-bold text-[11px] flex items-center justify-center shadow-xs">
              {student.fullName.charAt(0)}
            </div>
            <span className="hidden sm:inline font-semibold text-slate-700 truncate max-w-[100px]">
              {student.fullName.split(' ')[0]}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
