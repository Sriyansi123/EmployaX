import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Copy,
  Check,
  Lock,
  Globe,
  Sparkles,
  QrCode,
  ExternalLink,
} from 'lucide-react';
import { StudentProfile } from '../../types';
import { sampleCareerTwin } from '../../data/mockData';

interface VerifiedPassportViewProps {
  student: StudentProfile;
}

export const VerifiedPassportView: React.FC<VerifiedPassportViewProps> = ({ student }) => {
  const [isPublic, setIsPublic] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  const passportUrl = `https://employax.app/passport/${student.id}`;

  const copyPassportLink = () => {
    navigator.clipboard.writeText(passportUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-6">
      {/* Header Banner - Royal Navy Card */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0B1536] via-[#10204E] to-[#1E3A8A] text-white border border-blue-400/20 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
            <Award className="w-3.5 h-3.5 text-cyan-300" />
            <span>Employability Credential</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            EmployaX Verified Passport
          </h1>
          <p className="text-xs sm:text-sm text-cyan-100/90 mt-1 max-w-xl">
            Tamper-proof verifiable record of your validated competencies, projects, certifications, and academic record.
          </p>
        </div>

        {/* Share & Privacy Controls */}
        <div className="relative z-10 flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsPublic(!isPublic)}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
              isPublic
                ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200 backdrop-blur-md'
                : 'bg-white/10 border-white/20 text-slate-300 backdrop-blur-md'
            }`}
          >
            {isPublic ? <Globe className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
            <span>{isPublic ? 'Publicly Verifiable' : 'Private (Hidden)'}</span>
          </button>

          <button
            onClick={copyPassportLink}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/30 active:scale-95 cursor-pointer ring-1 ring-white/30"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied Link' : 'Share Passport'}</span>
          </button>
        </div>
      </div>

      {/* Official Passport Card Body */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-white/90 backdrop-blur-md border-2 border-cyan-500/40 shadow-xl overflow-hidden space-y-6">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Passport Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
              {student.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-heading font-extrabold text-slate-900">
                  {student.fullName}
                </h2>
                <span className="p-1 rounded-full bg-cyan-50 text-cyan-600">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {student.degree} · {student.branch} ({student.college})
              </p>
              <div className="text-[11px] text-cyan-800 font-mono font-semibold mt-0.5">
                Credential ID: EMP-PASSPORT-{student.id}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto p-2.5 rounded-2xl bg-slate-50 border border-slate-200">
            <QrCode className="w-10 h-10 text-cyan-600 shrink-0" />
            <div className="text-[10px] text-slate-500 font-mono">
              <div className="font-bold text-slate-800">SCAN TO VERIFY</div>
              <div className="text-cyan-700">NMC / AICTE / EMP</div>
            </div>
          </div>
        </div>

        {/* Verified Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Verified Skills */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-cyan-800 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Verified Skills</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {sampleCareerTwin.skillsInventory
                .filter((s) => s.verified)
                .map((sk) => (
                  <span
                    key={sk.name}
                    className="px-2 py-0.5 rounded-lg bg-cyan-50 border border-cyan-200 text-[11px] font-semibold text-cyan-800"
                  >
                    ✓ {sk.name} ({sk.level})
                  </span>
                ))}
            </div>
          </div>

          {/* Academic Standings */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Academic Records</span>
            </div>
            <div className="space-y-1 text-xs text-slate-700 font-medium">
              <div>Degree CGPA: <span className="font-bold text-slate-900">{student.cgpa} / 10</span></div>
              <div>Class Standing: <span className="text-cyan-700 font-bold">Top 5% Merit List</span></div>
              <div>College Status: <span className="text-slate-500">{student.collegeType}</span></div>
            </div>
          </div>

          {/* Certified Achievements */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-purple-800 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Verified Credentials</span>
            </div>
            <div className="space-y-1 text-xs text-slate-700 font-medium">
              <div>✓ AWS Certified Cloud Practitioner</div>
              <div>✓ Smart India Hackathon Finalist</div>
              <div>✓ CloudScale Labs Internship Completed</div>
            </div>
          </div>
        </div>

        {/* Verification Footer Note */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-600 font-medium">
          <span>
            Digitally signed & encrypted. Employers scanning this link can inspect source code artifacts and grade transcripts.
          </span>
          <span className="font-mono text-cyan-800 font-bold shrink-0">
            STATUS: ACTIVE & VERIFIED
          </span>
        </div>
      </div>
    </div>
  );
};
