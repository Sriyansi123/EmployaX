import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  Clock,
  Calendar,
  Building2,
  FileText,
  Trash2,
  Edit2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { sampleApplications } from '../../data/mockData';
import { ApplicationTrackerItem } from '../../types';

export const ApplicationTrackerView: React.FC = () => {
  const [applications, setApplications] =
    useState<ApplicationTrackerItem[]>(sampleApplications);
  const [activeTab, setActiveTab] = useState<'kanban' | 'list'>('kanban');

  const stages: { key: ApplicationTrackerItem['stage']; label: string; color: string }[] = [
    { key: 'saved', label: 'Saved', color: 'border-slate-500 text-slate-300' },
    { key: 'applied', label: 'Applied', color: 'border-blue-500 text-blue-300' },
    { key: 'assessment', label: 'Assessment', color: 'border-purple-500 text-purple-300' },
    { key: 'interview', label: 'Interview', color: 'border-amber-500 text-amber-300' },
    { key: 'offer', label: 'Offer', color: 'border-emerald-500 text-emerald-300' },
    { key: 'closed', label: 'Closed', color: 'border-rose-500 text-rose-300' },
  ];

  const updateStage = (
    id: string,
    newStage: ApplicationTrackerItem['stage']
  ) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, stage: newStage } : app))
    );
  };

  const removeApplication = (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-6">
      {/* Header Banner - Royal Navy Card */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0B1536] via-[#10204E] to-[#1E3A8A] text-white border border-blue-400/20 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
            <CheckSquare className="w-3.5 h-3.5 text-cyan-300" />
            <span>Pipeline Intelligence</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            Application Tracker
          </h1>
          <p className="text-xs sm:text-sm text-cyan-100/90 mt-1 max-w-xl">
            Track your pipeline from Saved → Applied → Assessment → Interview → Offer with automated reminders.
          </p>
        </div>

        {/* View Toggle */}
        <div className="relative z-10 flex items-center gap-1.5 p-1 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('kanban')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'kanban'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-sm ring-1 ring-white/30'
                : 'text-cyan-100 hover:text-white hover:bg-white/10'
            }`}
          >
            Kanban Board
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'list'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-sm ring-1 ring-white/30'
                : 'text-cyan-100 hover:text-white hover:bg-white/10'
            }`}
          >
            Detailed List
          </button>
        </div>
      </div>

      {/* Kanban Board View */}
      {activeTab === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {stages.map((st) => {
            const stageApps = applications.filter((a) => a.stage === st.key);

            return (
              <div
                key={st.key}
                className="p-3.5 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm flex flex-col min-h-[460px]"
              >
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    {st.label}
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {stageApps.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto">
                  {stageApps.length === 0 ? (
                    <div className="h-28 flex items-center justify-center text-[11px] text-slate-400 border border-dashed border-slate-200 rounded-2xl font-medium">
                      Empty
                    </div>
                  ) : (
                    stageApps.map((app) => (
                      <div
                        key={app.id}
                        className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-cyan-400 transition-all space-y-2 text-xs shadow-2xs"
                      >
                        <div className="font-bold text-slate-900 leading-tight">
                          {app.role}
                        </div>
                        <div className="text-[11px] text-cyan-700 font-bold flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-slate-400" />
                          {app.company}
                        </div>

                        {app.interviewDate && (
                          <div className="text-[10px] text-amber-800 bg-amber-50 p-1.5 rounded-xl border border-amber-200 font-medium">
                            🗓️ {app.interviewDate}
                          </div>
                        )}

                        <div className="text-[11px] text-slate-500 line-clamp-2 font-medium">
                          {app.notes}
                        </div>

                        {/* Move stage dropdown */}
                        <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                          <select
                            value={app.stage}
                            onChange={(e) =>
                              updateStage(
                                app.id,
                                e.target.value as ApplicationTrackerItem['stage']
                              )
                            }
                            className="bg-white border border-slate-200 text-[10px] font-semibold rounded-lg px-2 py-0.5 text-slate-700 focus:outline-none cursor-pointer"
                          >
                            <option value="saved">Saved</option>
                            <option value="applied">Applied</option>
                            <option value="assessment">Assessment</option>
                            <option value="interview">Interview</option>
                            <option value="offer">Offer</option>
                            <option value="closed">Closed</option>
                          </select>

                          <button
                            onClick={() => removeApplication(app.id)}
                            className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                            title="Delete entry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Detailed List View */
        <div className="p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="pb-3">Company & Role</th>
                <th className="pb-3">Stage</th>
                <th className="pb-3">Applied Date</th>
                <th className="pb-3">Deadline</th>
                <th className="pb-3">Resume Version</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 pr-4">
                    <div className="font-bold text-slate-900">{app.role}</div>
                    <div className="text-[11px] text-cyan-700 font-semibold">
                      {app.company}
                    </div>
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-cyan-50 text-cyan-800 border border-cyan-200">
                      {app.stage}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-slate-600 font-medium">{app.appliedDate}</td>
                  <td className="py-3.5 pr-4 text-slate-600 font-medium">{app.deadline}</td>
                  <td className="py-3.5 pr-4 text-slate-700 font-mono text-[11px]">
                    {app.resumeVersion}
                  </td>
                  <td className="py-3.5">
                    <button
                      onClick={() => removeApplication(app.id)}
                      className="p-1 rounded text-slate-400 hover:text-red-500 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
