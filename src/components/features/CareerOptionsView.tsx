import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  Sparkles,
  Building2,
  DollarSign,
  GraduationCap,
  Layers,
  Search,
} from 'lucide-react';
import { careerOptionsCatalog } from '../../data/mockData';
import { StudentProfile } from '../../types';

interface CareerOptionsViewProps {
  student: StudentProfile;
  onNavigate: (route: string) => void;
}

export const CareerOptionsView: React.FC<CareerOptionsViewProps> = ({
  student,
  onNavigate,
}) => {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [activeCareer, setActiveCareer] = useState<typeof careerOptionsCatalog[0] | null>(
    careerOptionsCatalog[0]
  );

  const categories = ['All', 'Technical', 'Non-Technical', 'Medical'];

  const filteredCareers = careerOptionsCatalog.filter((c) => {
    const matchesCat =
      selectedCat === 'All' || c.category.toLowerCase() === selectedCat.toLowerCase();
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-6">
      {/* Header Banner - Royal Navy Card */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0B1536] via-[#10204E] to-[#1E3A8A] text-white border border-blue-400/20 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-300 uppercase tracking-wider mb-1">
            <Compass className="w-3.5 h-3.5 text-teal-300" />
            <span>Pathways Directory</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            Career Options & Trajectories
          </h1>
          <p className="text-xs sm:text-sm text-cyan-100/90 mt-1 max-w-xl">
            Explore comprehensive guides covering typical roles, salary distributions, required competencies, and employer demands.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="relative z-10 flex flex-wrap gap-1.5 p-1 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md self-start sm:self-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCat === cat
                  ? 'bg-gradient-to-r from-teal-400 to-emerald-500 text-white shadow-sm ring-1 ring-white/30'
                  : 'text-cyan-100 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Career Directory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCareers.map((c) => (
          <div
            key={c.id}
            className="p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 hover:border-teal-400/50 transition-all flex flex-col justify-between space-y-4 shadow-sm"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 uppercase">
                  {c.category}
                </span>
                <span className="text-xs font-bold text-emerald-700 font-mono">
                  {c.salaryRange}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {c.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {c.description}
              </p>

              {/* Roles Breakdown */}
              <div className="pt-2">
                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Typical Industry Roles:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {c.typicalRoles.map((r) => (
                    <span
                      key={r}
                      className="px-2 py-0.5 rounded-lg bg-slate-100 text-[11px] font-medium text-slate-700 border border-slate-200"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Skills */}
              <div className="pt-2">
                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Core Required Skills:
                </span>
                <div className="flex flex-wrap gap-1">
                  {c.requiredSkills.map((sk) => (
                    <span
                      key={sk}
                      className="px-2 py-0.5 rounded-lg bg-cyan-50 text-[10px] font-semibold text-cyan-800 border border-cyan-200"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Top Employers */}
              <div className="pt-2 text-[11px] text-slate-500 font-medium flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-slate-700">Top Employers:</span>
                <span>{c.topEmployers.join(', ')}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">
                {c.educationPath}
              </span>
              <button
                onClick={() => onNavigate('/skill-gap')}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-xs font-bold text-white flex items-center gap-1 shadow-sm transition-all cursor-pointer"
              >
                <span>Check My Fit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
