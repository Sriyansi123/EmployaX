import React, { useState } from 'react';
import {
  Laptop,
  Plus,
  ExternalLink,
  Github,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { samplePortfolioProjects } from '../../data/mockData';
import { StudentProfile, PortfolioProject } from '../../types';

interface PortfolioBuilderViewProps {
  student: StudentProfile;
}

export const PortfolioBuilderView: React.FC<PortfolioBuilderViewProps> = ({ student }) => {
  const [projects, setProjects] = useState<PortfolioProject[]>(samplePortfolioProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newProject, setNewProject] = useState<Partial<PortfolioProject>>({
    title: '',
    problem: '',
    solution: '',
    technology: [],
    contribution: '',
    result: '',
    skills: [],
    githubUrl: '',
    demoUrl: '',
  });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.problem || !newProject.solution) return;

    const proj: PortfolioProject = {
      id: `proj_${Date.now()}`,
      title: newProject.title,
      problem: newProject.problem,
      solution: newProject.solution,
      technology: newProject.technology || ['TypeScript', 'React'],
      contribution: newProject.contribution || 'Architecture and implementation',
      result: newProject.result || 'Successfully demonstrated and verified',
      skills: newProject.skills || ['Full-Stack Engineering'],
      demoUrl: newProject.demoUrl,
      githubUrl: newProject.githubUrl,
    };

    setProjects([...projects, proj]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-6">
      {/* Header Banner - Royal Navy Card */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0B1536] via-[#10204E] to-[#1E3A8A] text-white border border-blue-400/20 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 uppercase tracking-wider mb-1">
            <Laptop className="w-3.5 h-3.5 text-purple-300" />
            <span>Structured Impact Showcase</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            Portfolio Builder
          </h1>
          <p className="text-xs sm:text-sm text-cyan-100/90 mt-1 max-w-xl">
            Structured around Problem → Solution → Tech → Contribution → Result → Skills. Verified by engineering peers.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="relative z-10 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 font-bold text-xs text-white flex items-center gap-1.5 shadow-md shadow-purple-500/30 active:scale-95 transition-all self-start sm:self-auto cursor-pointer ring-1 ring-white/30"
        >
          <Plus className="w-4 h-4" />
          <span>Add Real Project</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 hover:border-purple-300 transition-all space-y-4 shadow-sm"
          >
            {/* Title & Links */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {proj.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-cyan-700 font-semibold mt-0.5">
                  <span className="text-slate-500">Tech Stack:</span>
                  <span>{proj.technology.join(', ')}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 flex items-center gap-1.5 text-xs font-semibold transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                  </a>
                )}
                {proj.demoUrl && (
                  <a
                    href={proj.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-200 flex items-center gap-1.5 text-xs font-bold transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Problem & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-1">
                <span className="font-bold text-rose-800 uppercase tracking-wider text-[10px] block">
                  Problem & Bottleneck
                </span>
                <p className="text-slate-700 leading-relaxed font-medium">{proj.problem}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-cyan-50/60 border border-cyan-100 space-y-1">
                <span className="font-bold text-cyan-800 uppercase tracking-wider text-[10px] block">
                  Engineered Solution
                </span>
                <p className="text-slate-700 leading-relaxed font-medium">{proj.solution}</p>
              </div>
            </div>

            {/* Contribution & Measurable Result */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-1">
                <span className="font-bold text-purple-800 uppercase tracking-wider text-[10px] block">
                  Personal Ownership & Contribution
                </span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {proj.contribution}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                <span className="font-bold text-emerald-800 uppercase tracking-wider text-[10px] block">
                  Measurable Impact & Results
                </span>
                <p className="text-emerald-900 leading-relaxed font-medium">{proj.result}</p>
              </div>
            </div>

            {/* Skills Tested */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Demonstrated Skills:
              </span>
              {proj.skills.map((sk) => (
                <span
                  key={sk}
                  className="px-2 py-0.5 rounded-lg bg-slate-100 text-[10px] font-semibold text-slate-700 border border-slate-200"
                >
                  ✓ {sk}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fade-in">
          <div className="max-w-lg w-full bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Laptop className="w-5 h-5 text-purple-600" />
              <span>Add Verified Project</span>
            </h3>

            <form onSubmit={handleAddProject} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                  placeholder="e.g. Distributed Task Queue in Go"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  The Problem (Why was this built?)
                </label>
                <textarea
                  rows={2}
                  required
                  value={newProject.problem}
                  onChange={(e) =>
                    setNewProject({ ...newProject, problem: e.target.value })
                  }
                  placeholder="State the customer or technical bottleneck..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  The Solution (How was it designed?)
                </label>
                <textarea
                  rows={2}
                  required
                  value={newProject.solution}
                  onChange={(e) =>
                    setNewProject({ ...newProject, solution: e.target.value })
                  }
                  placeholder="Explain architecture and frameworks..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Your Contribution
                </label>
                <input
                  type="text"
                  value={newProject.contribution}
                  onChange={(e) =>
                    setNewProject({ ...newProject, contribution: e.target.value })
                  }
                  placeholder="e.g. Wrote the raft consensus state machine"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Measurable Result (Numbers & Metrics)
                </label>
                <input
                  type="text"
                  value={newProject.result}
                  onChange={(e) =>
                    setNewProject({ ...newProject, result: e.target.value })
                  }
                  placeholder="e.g. Reduced query latency by 35% with 0 errors"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-purple-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    GitHub URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={newProject.githubUrl}
                    onChange={(e) =>
                      setNewProject({ ...newProject, githubUrl: e.target.value })
                    }
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Live Demo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={newProject.demoUrl}
                    onChange={(e) =>
                      setNewProject({ ...newProject, demoUrl: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-purple-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold shadow-md shadow-purple-500/20 cursor-pointer"
                >
                  Publish to Portfolio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
