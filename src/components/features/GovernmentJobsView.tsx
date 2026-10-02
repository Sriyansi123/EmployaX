import React, { useState } from 'react';
import {
  Landmark,
  ShieldCheck,
  Calendar,
  MapPin,
  ExternalLink,
  Search,
  CheckCircle2,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { sampleGovernmentJobs } from '../../data/mockData';
import { StudentProfile } from '../../types';

interface GovernmentJobsViewProps {
  student: StudentProfile;
}

export const GovernmentJobsView: React.FC<GovernmentJobsViewProps> = ({ student }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'All',
    'Central Government',
    'PSU',
    'Internship',
    'Competitive Examination',
  ];

  const filteredJobs = sampleGovernmentJobs.filter((job) => {
    const matchesCat =
      activeCategory === 'All' || job.type.includes(activeCategory);
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.qualification.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-6">
      {/* Header Banner - Royal Navy Card */}
      <div className="relative p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0B1536] via-[#10204E] to-[#1E3A8A] text-white border border-blue-400/20 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1">
            <Landmark className="w-3.5 h-3.5 text-amber-300" />
            <span>Public Sector & National Services</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            Government Employment & PSU Portals
          </h1>
          <p className="text-xs sm:text-sm text-cyan-100/90 mt-1 max-w-xl">
            Verified notifications across Central Ministries, Maharatna PSUs, Research Institutes (ISRO/DRDO/NIC), and Competitive Examinations.
          </p>

          {/* Filter & Search Bar */}
          <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === c
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-sm ring-1 ring-white/30'
                      : 'text-cyan-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-cyan-200/80 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search notifications..."
                className="w-full sm:w-64 pl-9 pr-4 py-2 rounded-xl bg-white/15 border border-white/25 text-xs text-white placeholder-cyan-200/60 focus:outline-none focus:border-amber-300 backdrop-blur-md font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2 font-medium">
        <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          All listings are verified against official Government Gazettes, UPSC Calendars, and PSU recruitment boards. Always verify via the linked official portal before submitting fees.
        </span>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 hover:border-amber-400/50 transition-all space-y-4 shadow-sm"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    {job.type}
                  </span>
                  {job.verified && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Official
                    </span>
                  )}
                  {job.examDate && (
                    <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-600" /> Exam: {job.examDate}
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {job.title}
                </h3>
                <div className="text-xs font-bold text-cyan-700 mt-0.5">
                  {job.organization}
                </div>
              </div>

              <div className="text-xs text-slate-500 font-medium flex items-center gap-1 shrink-0">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{job.location}</span>
              </div>
            </div>

            {/* Criteria Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Eligibility & Criteria
                </span>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {job.eligibility}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Required Qualification
                </span>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {job.qualification}
                </p>
              </div>
            </div>

            {/* Required Skills & Official Link */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-500 mr-1 font-semibold">
                  Syllabus / Focus:
                </span>
                {job.requiredSkills.map((sk) => (
                  <span
                    key={sk}
                    className="px-2 py-0.5 rounded-lg bg-slate-100 text-[11px] font-medium text-slate-700 border border-slate-200"
                  >
                    {sk}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-500 font-medium">
                  Deadline: <span className="text-slate-900 font-bold">{job.deadline}</span>
                </span>
                <a
                  href={job.officialPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 font-bold text-xs text-white flex items-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Official Application</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 italic">
              Source: {job.source}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
