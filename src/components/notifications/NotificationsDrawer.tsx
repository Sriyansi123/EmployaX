import React from 'react';
import { X, Bell, CheckCircle2, Clock, ExternalLink } from 'lucide-react';
import { NotificationItem } from '../../types';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onNavigate: (route: string) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onNavigate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-heading font-bold text-white">
              Notifications & Alerts
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllRead}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => {
                if (notif.actionUrl) {
                  onNavigate(notif.actionUrl);
                  onClose();
                }
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                notif.read
                  ? 'bg-slate-850/50 border-slate-800 text-slate-400'
                  : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-cyan-500/50'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                  )}
                  <span>{notif.title}</span>
                </span>
                <span className="text-[10px] text-slate-500 shrink-0">
                  {notif.time}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {notif.message}
              </p>
              {notif.actionUrl && (
                <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-cyan-400">
                  <span>View Details</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 text-center">
          <p className="text-xs text-slate-400">
            Real-time employability alerts configured for your profile
          </p>
        </div>
      </div>
    </div>
  );
};
