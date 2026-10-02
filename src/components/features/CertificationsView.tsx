import React, { useState } from 'react';
import {
  Trophy,
  Award,
  ExternalLink,
  ShieldCheck,
  Clock,
  Sparkles,
  DollarSign,
  Tag,
  CheckCircle2,
} from 'lucide-react';
import { sampleCertifications } from '../../data/mockData';
import { StudentProfile } from '../../types';

interface CertificationsViewProps {
  student: StudentProfile;
}

export const CertificationsView: React.FC<CertificationsViewProps> = ({ student }) => {
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');

  const filteredCerts = sampleCertifications.filter((c) => {
    if (filterDifficulty === 'All') return true;
    return c.difficulty === filterDifficulty;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-6">
      {/* Header Banner - Royal Navy Card */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0B1536] via-[#10204E] to-[#1E3A8A] text-white border border-blue-400/20 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span>Professional Credentials</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            Certification Center
          </h1>
          <p className="text-xs sm:text-sm text-cyan-100/90 mt-1 max-w-xl">
            Industry recognized certifications tailored to your career goal in {student.branch || student.category}.
          </p>
        </div>

        {/* Difficulty Filter */}
        <div className="relative z-10 flex items-center gap-1.5 p-1 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md self-start sm:self-auto">
          {['All', 'Foundational', 'Associate', 'Professional'].map((d) => (
            <button
              key={d}
              onClick={() => setFilterDifficulty(d)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterDifficulty === d
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-sm ring-1 ring-white/30'
                  : 'text-cyan-100 hover:text-white hover:bg-white/10'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Certifications Grid */}
      <div className="space-y-4">
        {filteredCerts.map((cert) => (
          <div
            key={cert.id}
            className="p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 hover:border-amber-400/50 transition-all space-y-4 shadow-sm"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 uppercase">
                    {cert.difficulty}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 uppercase">
                    {cert.category}
                  </span>
                  <span className="text-[10px] font-medium text-slate-500">
                    Validity: {cert.validity}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {cert.title}
                </h3>
                <div className="text-xs font-bold text-cyan-700">
                  {cert.provider}
                </div>
              </div>

              {/* Cost / Duration Box */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-right self-start sm:self-auto shrink-0">
                <div className="text-xs font-bold text-emerald-700 font-mono">
                  {cert.cost}
                </div>
                <div className="text-[10px] text-slate-500 flex items-center justify-end gap-1 mt-0.5 font-medium">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{cert.duration}</span>
                </div>
              </div>
            </div>

            {/* Recommended For Note */}
            <div className="p-3 rounded-2xl bg-cyan-50/80 border border-cyan-100 text-xs text-slate-700 font-medium">
              <span className="font-bold text-cyan-800">Target Role Alignment: </span>
              {cert.recommendedFor}
            </div>

            {/* Criteria & Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Eligibility & Requirements
                </span>
                <p className="text-slate-600 leading-relaxed font-medium">{cert.eligibility}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Key Skills Tested
                </span>
                <div className="flex flex-wrap gap-1">
                  {cert.skillsCovered.map((sk) => (
                    <span
                      key={sk}
                      className="px-2 py-0.5 rounded-lg bg-slate-100 text-[10px] font-semibold text-slate-700 border border-slate-200"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <span className="text-xs text-emerald-700 flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Eligible for EmployaX Verified Passport Badge
              </span>

              <a
                href={cert.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-xs font-bold text-white flex items-center gap-1.5 shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <span>Official Exam Info</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
