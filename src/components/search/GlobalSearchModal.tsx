import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  Briefcase,
  GraduationCap,
  Trophy,
  Landmark,
  Compass,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import {
  sampleOpportunities,
  sampleGovernmentJobs,
  sampleCourses,
  sampleCertifications,
  careerOptionsCatalog,
} from '../../data/mockData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search Results
  const matchedJobs = q
    ? sampleOpportunities.filter(
        (o) =>
          o.title.toLowerCase().includes(q) ||
          o.company.toLowerCase().includes(q) ||
          o.requiredSkills.some((s) => s.toLowerCase().includes(q))
      )
    : [];

  const matchedGovt = q
    ? sampleGovernmentJobs.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.organization.toLowerCase().includes(q) ||
          g.requiredSkills.some((s) => s.toLowerCase().includes(q))
      )
    : [];

  const matchedCourses = q
    ? sampleCourses.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.skills.some((s) => s.toLowerCase().includes(q))
      )
    : [];

  const matchedCerts = q
    ? sampleCertifications.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.skillsCovered.some((s) => s.toLowerCase().includes(q))
      )
    : [];

  const matchedCareers = q
    ? careerOptionsCatalog.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      )
    : [];

  const totalResults =
    matchedJobs.length +
    matchedGovt.length +
    matchedCourses.length +
    matchedCerts.length +
    matchedCareers.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="max-w-2xl w-full bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-800">
          <Search className="w-5 h-5 text-cyan-400 shrink-0 mr-3" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search careers, jobs, courses, certifications, skills..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-4">
          {!q ? (
            <div className="py-8 text-center">
              <Sparkles className="w-8 h-8 text-cyan-400/60 mx-auto mb-2" />
              <p className="text-xs text-slate-400 font-medium">
                Try searching for “Cloud”, “Internship”, “ISRO”, “System Design”, or “Python”
              </p>
              {/* Quick Suggestion Pills */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {['TypeScript', 'Kubernetes', 'UPSC', 'Razorpay', 'Biostatistics'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-cyan-300"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No matching records found for "{query}". Try a different skill or keyword.
            </div>
          ) : (
            <div className="space-y-4">
              {/* Jobs & Internships */}
              {matchedJobs.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Jobs & Internships ({matchedJobs.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedJobs.map((j) => (
                      <div
                        key={j.id}
                        onClick={() => {
                          onNavigate('/opportunities');
                          onClose();
                        }}
                        className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-between cursor-pointer group"
                      >
                        <div>
                          <div className="text-xs font-semibold text-white group-hover:text-cyan-300">
                            {j.title}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {j.company} · {j.location} · {j.stipendOrSalary}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Government Jobs */}
              {matchedGovt.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Landmark className="w-3.5 h-3.5 text-amber-400" />
                    <span>Government Opportunities ({matchedGovt.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedGovt.map((g) => (
                      <div
                        key={g.id}
                        onClick={() => {
                          onNavigate('/government-jobs');
                          onClose();
                        }}
                        className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-between cursor-pointer group"
                      >
                        <div>
                          <div className="text-xs font-semibold text-white group-hover:text-amber-300">
                            {g.title}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {g.organization} · {g.type}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Courses */}
              {matchedCourses.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                    <span>Courses ({matchedCourses.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedCourses.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => {
                          onNavigate('/courses');
                          onClose();
                        }}
                        className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-between cursor-pointer group"
                      >
                        <div>
                          <div className="text-xs font-semibold text-white group-hover:text-purple-300">
                            {c.title}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {c.provider} · {c.duration}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {matchedCerts.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Certifications ({matchedCerts.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedCerts.map((cert) => (
                      <div
                        key={cert.id}
                        onClick={() => {
                          onNavigate('/certifications');
                          onClose();
                        }}
                        className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-between cursor-pointer group"
                      >
                        <div>
                          <div className="text-xs font-semibold text-white group-hover:text-yellow-300">
                            {cert.title}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {cert.provider} · {cert.difficulty}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-yellow-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Career Options */}
              {matchedCareers.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-teal-400" />
                    <span>Career Options ({matchedCareers.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedCareers.map((car) => (
                      <div
                        key={car.id}
                        onClick={() => {
                          onNavigate('/career-options');
                          onClose();
                        }}
                        className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-between cursor-pointer group"
                      >
                        <div>
                          <div className="text-xs font-semibold text-white group-hover:text-teal-300">
                            {car.title}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {car.salaryRange}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-500">
          <span>Tip: Tap any result to jump directly to that module</span>
          <button
            onClick={onClose}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
