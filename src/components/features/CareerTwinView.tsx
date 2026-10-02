import React, { useState } from 'react';
import {
  Dna,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  CheckCircle2,
  Lock,
  Globe,
  TrendingUp,
  Brain,
  Sliders,
} from 'lucide-react';
import { sampleCareerTwin } from '../../data/mockData';
import { StudentProfile } from '../../types';

interface CareerTwinViewProps {
  student: StudentProfile;
}

export const CareerTwinView: React.FC<CareerTwinViewProps> = ({ student }) => {
  const [twinData, setTwinData] = useState(sampleCareerTwin);

  const toggleControl = (key: keyof typeof sampleCareerTwin.privacyControls) => {
    setTwinData((prev) => ({
      ...prev,
      privacyControls: {
        ...prev.privacyControls,
        [key]: !prev.privacyControls[key],
      },
    }));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-6">
      {/* Header Banner - Royal Navy Card */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0B1536] via-[#10204E] to-[#1E3A8A] text-white border border-blue-400/20 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
            <Dna className="w-3.5 h-3.5 text-cyan-300" />
            <span>Digital Employability Model</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            AI Career Twin
          </h1>
          <p className="text-xs sm:text-sm text-cyan-100/90 mt-1 max-w-xl">
            Continuously synchronizes your academic transcripts, code repositories, interview drills, and certificates into a unified digital twin.
          </p>
        </div>

        <div className="relative z-10 p-3.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-cyan-400/20 text-cyan-200 flex items-center justify-center font-bold text-sm">
            {twinData.profileCompletion}%
          </div>
          <div className="text-xs">
            <div className="font-bold text-white">Twin Fidelity</div>
            <div className="text-cyan-200">Synchronized Real-Time</div>
          </div>
        </div>
      </div>

      {/* Main Twin Profile Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 space-y-6 shadow-sm">
        {/* Top Profile Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center text-white text-xl font-extrabold shadow-md">
              {student.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">{student.fullName}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 uppercase">
                  {student.category} TWIN
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {student.degree} · {student.branch} ({student.college})
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Market Readiness Index
            </div>
            <div className="text-2xl font-extrabold text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text">
              {twinData.readinessScore} / 100
            </div>
          </div>
        </div>

        {/* Goals & Learning Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-cyan-800 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4 text-cyan-600" />
              <span>Active Career Goals</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
              {twinData.careerGoals.map((g, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-purple-800 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span>Learning & Skill Hours</span>
            </div>
            <div className="space-y-1 text-xs text-slate-700 font-medium">
              <div>Total Interactive Lab Time: <span className="font-bold text-slate-900">{twinData.learningProgress.totalHours} Hours</span></div>
              <div>Completed Micro-Courses: <span className="font-bold text-slate-900">{twinData.learningProgress.completedCourses} Certified</span></div>
              <div className="text-cyan-700 pt-1 text-[11px] font-mono font-semibold">
                {twinData.learningProgress.activeRoadmapStep}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Inventory Grid */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Verified Competency Inventory
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {twinData.skillsInventory.map((sk) => (
              <div
                key={sk.name}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900">{sk.name}</div>
                  <div className="text-[10px] text-slate-500 font-medium">{sk.level}</div>
                </div>
                {sk.verified ? (
                  <span title="Verified by Assessment">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  </span>
                ) : (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-600 font-medium">
                    Self-Reported
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Identified Gaps */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">
            Prioritized Gaps for Target Roles
          </div>
          <div className="space-y-2">
            {twinData.identifiedGaps.map((gap, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-900">{gap.skill}</span>
                  <span className="text-slate-600 font-medium">• {gap.reason}</span>
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 self-start sm:self-auto">
                  {gap.priority} Priority
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy & Student Sovereignty Controls */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-800 uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5 text-cyan-600" />
            <span>Student Information Sovereignty & Privacy Controls</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <label className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer select-none">
              <div>
                <div className="font-bold text-slate-900">Share with Verified Employers</div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Allow inbound recruiter inquiries for matched internships
                </div>
              </div>
              <input
                type="checkbox"
                checked={twinData.privacyControls.shareWithEmployers}
                onChange={() => toggleControl('shareWithEmployers')}
                className="rounded bg-white border-slate-300 text-cyan-600 w-4 h-4 cursor-pointer"
              />
            </label>

            <label className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer select-none">
              <div>
                <div className="font-bold text-slate-900">Public Verified Passport</div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Enable public cryptographic verification link
                </div>
              </div>
              <input
                type="checkbox"
                checked={twinData.privacyControls.publicPassport}
                onChange={() => toggleControl('publicPassport')}
                className="rounded bg-white border-slate-300 text-cyan-600 w-4 h-4 cursor-pointer"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
