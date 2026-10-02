import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Bell,
  Lock,
  Download,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  KeyRound,
  FileText,
} from 'lucide-react';
import { StudentProfile } from '../../types';

interface SettingsPrivacyViewProps {
  student: StudentProfile;
  onLogout: () => void;
}

export const SettingsPrivacyView: React.FC<SettingsPrivacyViewProps> = ({
  student,
  onLogout,
}) => {
  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    employerSharing: true,
    documentPrivacy: true,
    aiPersonalization: true,
  });

  const [notifications, setNotifications] = useState({
    jobAlerts: true,
    internshipAlerts: true,
    courseAlerts: true,
    certAlerts: true,
    appReminders: true,
    mentorAlerts: true,
  });

  const [twoFactor, setTwoFactor] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadData = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(student, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `EmployaX_Data_${student.fullName.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 py-6">
      {/* Header Banner - Royal Navy Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0B1536] via-[#10204E] to-[#1E3A8A] text-white border border-blue-400/20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
            <Settings className="w-3.5 h-3.5 text-cyan-300" />
            <span>Governance & Preferences</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            Settings & Privacy Controls
          </h1>
          <p className="text-xs sm:text-sm text-cyan-100/90 mt-1 max-w-xl">
            Manage your account security, notification channels, AI personalization parameters, and export your verified student data.
          </p>
        </div>
      </div>

      {/* Privacy & Sharing Controls */}
      <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyan-600" />
          <span>Student Privacy & Data Sharing Controls</span>
        </h3>

        <div className="space-y-3 text-xs">
          <label className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer select-none">
            <div>
              <div className="font-bold text-slate-900">Employer Direct Outreach</div>
              <div className="text-slate-500 font-medium mt-0.5">
                Allow verified enterprise recruiters on EmployaX to message you for matched openings.
              </div>
            </div>
            <input
              type="checkbox"
              checked={privacy.employerSharing}
              onChange={() =>
                setPrivacy({ ...privacy, employerSharing: !privacy.employerSharing })
              }
              className="rounded bg-white border-slate-300 text-cyan-600 w-4 h-4 cursor-pointer"
            />
          </label>

          <label className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer select-none">
            <div>
              <div className="font-bold text-slate-900">AI Personalization Engine</div>
              <div className="text-slate-500 font-medium mt-0.5">
                Utilize your course completions and interview test answers to calibrate recommendations.
              </div>
            </div>
            <input
              type="checkbox"
              checked={privacy.aiPersonalization}
              onChange={() =>
                setPrivacy({ ...privacy, aiPersonalization: !privacy.aiPersonalization })
              }
              className="rounded bg-white border-slate-300 text-cyan-600 w-4 h-4 cursor-pointer"
            />
          </label>

          <label className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer select-none">
            <div>
              <div className="font-bold text-slate-900">Document Encryption & Access Log</div>
              <div className="text-slate-500 font-medium mt-0.5">
                Keep marksheet transcripts and certificates encrypted with student-only view access.
              </div>
            </div>
            <input
              type="checkbox"
              checked={privacy.documentPrivacy}
              onChange={() =>
                setPrivacy({ ...privacy, documentPrivacy: !privacy.documentPrivacy })
              }
              className="rounded bg-white border-slate-300 text-cyan-600 w-4 h-4 cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Notifications Channels */}
      <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Bell className="w-4 h-4 text-amber-500" />
          <span>Notification & Alert Channels</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <label className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer">
            <span className="text-slate-800 font-medium">High-Match Job & Internship Alerts</span>
            <input
              type="checkbox"
              checked={notifications.jobAlerts}
              onChange={() =>
                setNotifications({ ...notifications, jobAlerts: !notifications.jobAlerts })
              }
              className="rounded text-blue-600 cursor-pointer"
            />
          </label>

          <label className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer">
            <span className="text-slate-800 font-medium">Upcoming Application Deadlines</span>
            <input
              type="checkbox"
              checked={notifications.appReminders}
              onChange={() =>
                setNotifications({
                  ...notifications,
                  appReminders: !notifications.appReminders,
                })
              }
              className="rounded text-blue-600 cursor-pointer"
            />
          </label>

          <label className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer">
            <span className="text-slate-800 font-medium">Course & Certification Updates</span>
            <input
              type="checkbox"
              checked={notifications.courseAlerts}
              onChange={() =>
                setNotifications({
                  ...notifications,
                  courseAlerts: !notifications.courseAlerts,
                })
              }
              className="rounded text-blue-600 cursor-pointer"
            />
          </label>

          <label className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer">
            <span className="text-slate-800 font-medium">1-on-1 Mentorship Confirmations</span>
            <input
              type="checkbox"
              checked={notifications.mentorAlerts}
              onChange={() =>
                setNotifications({
                  ...notifications,
                  mentorAlerts: !notifications.mentorAlerts,
                })
              }
              className="rounded text-blue-600 cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Security & Data Portability */}
      <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Lock className="w-4 h-4 text-purple-600" />
          <span>Security & Data Portability</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleDownloadData}
            className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-colors flex items-center justify-between cursor-pointer"
          >
            <div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Download className="w-4 h-4 text-cyan-600" />
                <span>Export My Student Data (JSON)</span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                Download your complete academic transcripts, skills, and portfolio.
              </div>
            </div>
          </button>

          <button
            onClick={() => setTwoFactor(!twoFactor)}
            className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-colors flex items-center justify-between cursor-pointer"
          >
            <div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-purple-600" />
                <span>Two-Factor Authentication (2FA)</span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                Status: {twoFactor ? 'Active (SMS OTP Enabled)' : 'Disabled'}
              </div>
            </div>
            <span
              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                twoFactor ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {twoFactor ? 'Enabled' : 'Enable'}
            </span>
          </button>
        </div>

        {downloadSuccess && (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Complete student profile exported to JSON successfully!</span>
          </div>
        )}
      </div>

      {/* Session Logout & Account Management */}
      <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Active Student Session</h4>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Logged in as {student.email} ({student.college})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onLogout}
            className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-xs font-bold text-slate-700 border border-slate-200 transition-colors cursor-pointer"
          >
            Sign Out
          </button>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to permanently delete your student account and all verified records?')) {
                onLogout();
              }
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
            title="Delete Account"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
