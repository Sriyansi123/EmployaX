import React, { useState } from 'react';
import {
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  Building2,
  CheckCircle2,
  ExternalLink,
  Filter,
  Check,
} from 'lucide-react';
import { sampleOpportunities } from '../../data/mockData';
import { StudentProfile, OpportunityItem } from '../../types';

interface OpportunitiesViewProps {
  student: StudentProfile;
  onApplySuccess: (opportunity: OpportunityItem) => void;
}

export const OpportunitiesView: React.FC<OpportunitiesViewProps> = ({
  student,
  onApplySuccess,
}) => {
  const [filterType, setFilterType] = useState<string>('All');
  const [appliedIds, setAppliedIds] = useState<string[]>(['opp_01']);

  const filteredOpportunities = sampleOpportunities.filter((opp) => {
    if (filterType === 'All') return true;
    if (filterType === 'Internship') return opp.type === 'Internship';
    if (filterType === 'Full-Time') return opp.type === 'Full-Time';
    if (filterType === 'Remote') return opp.workMode === 'Remote';
    return true;
  });

  const handleApply = (opp: OpportunityItem) => {
    if (!appliedIds.includes(opp.id)) {
      setAppliedIds([...appliedIds, opp.id]);
      onApplySuccess(opp);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-6">
      {/* Header Banner - Royal Navy Card */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0B1536] via-[#10204E] to-[#1E3A8A] text-white border border-blue-400/20 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
            <Briefcase className="w-3.5 h-3.5 text-cyan-300" />
            <span>Opportunities Hub</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            Matched Jobs & Internships
          </h1>
          <p className="text-xs sm:text-sm text-cyan-100/90 mt-1 max-w-xl">
            Opportunities dynamically ranked by matching your academic record, verified skills, and project simulations.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="relative z-10 flex items-center gap-1.5 p-1 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md self-start sm:self-auto">
          {['All', 'Internship', 'Full-Time', 'Remote'].map((f) => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterType === f
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-sm ring-1 ring-white/30'
                  : 'text-cyan-100 hover:text-white hover:bg-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filteredOpportunities.map((opp) => {
          const isApplied = appliedIds.includes(opp.id);

          return (
            <div
              key={opp.id}
              className="p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 hover:border-cyan-500/40 transition-all space-y-4 shadow-sm"
            >
              {/* Top row: Title, Company, Match % badge */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {opp.title}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {opp.type}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200">
                      {opp.workMode}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap font-medium">
                    <span className="font-bold text-slate-800 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-cyan-600" />
                      {opp.company}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {opp.location}
                    </span>
                    <span>•</span>
                    <span className="text-emerald-700 font-bold font-mono">
                      {opp.stipendOrSalary}
                    </span>
                  </div>
                </div>

                {/* Match Score Badge */}
                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-1.5 shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-xs font-bold text-emerald-800">
                      {opp.matchScore}% Match
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {opp.description}
              </p>

              {/* Transparent "Why You Match" Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="text-[11px] font-bold text-cyan-800 uppercase tracking-wider">
                  Transparent Match Rationale:
                </div>
                <ul className="space-y-1 text-xs text-slate-700 font-medium">
                  {opp.matchReasons.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills required & Apply button */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-slate-500 mr-1 font-semibold">
                    Skills:
                  </span>
                  {opp.requiredSkills.map((sk) => (
                    <span
                      key={sk}
                      className="px-2 py-0.5 rounded-lg bg-slate-100 text-[11px] font-medium text-slate-700 border border-slate-200"
                    >
                      {sk}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                    <Clock className="w-3 h-3" /> Deadline: {opp.deadline}
                  </span>
                  <button
                    onClick={() => handleApply(opp)}
                    disabled={isApplied}
                    className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isApplied
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                        : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-md shadow-blue-500/20 active:scale-95'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Applied (Tracking)</span>
                      </>
                    ) : (
                      <>
                        <span>1-Click Apply</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
