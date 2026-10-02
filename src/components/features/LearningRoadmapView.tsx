import React, { useState } from 'react';
import {
  Map,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import { StudentProfile } from '../../types';

interface LearningRoadmapViewProps {
  student: StudentProfile;
}

export const LearningRoadmapView: React.FC<LearningRoadmapViewProps> = ({ student }) => {
  const [completedTasks, setCompletedTasks] = useState<string[]>([
    'm1_t1',
    'm1_t2',
  ]);

  const roadmapData = [
    {
      month: 'MONTH 1',
      title: 'Bridge Critical Skill Gaps & Deepen Core Foundations',
      timeline: 'Days 1–30',
      description: 'Focus on mastering containerization and database query tuning.',
      tasks: [
        { id: 'm1_t1', title: 'Complete "Architecture of Cloud Native Services" module', duration: '3 hours' },
        { id: 'm1_t2', title: 'Audit resume using EmployaX ATS analyzer for 80%+ score', duration: '1 hour' },
        { id: 'm1_t3', title: 'Build Dockerized full-stack starter with PostgreSQL integration', duration: '8 hours' },
        { id: 'm1_t4', title: 'Review SQL window functions and database indexing bottlenecks', duration: '4 hours' },
      ],
    },
    {
      month: 'MONTH 2',
      title: 'Advanced Cap-stone Simulation & Assessment Verification',
      timeline: 'Days 31–60',
      description: 'Solve real-world workplace scenarios and verify credentials for Verified Passport.',
      tasks: [
        { id: 'm2_t1', title: 'Complete high-throughput E-Commerce API Bottleneck project simulation', duration: '45 mins' },
        { id: 'm2_t2', title: 'Conduct 3 Technical AI Mock Interviews with 80%+ score', duration: '2 hours' },
        { id: 'm2_t3', title: 'Publish structured Problem → Solution project breakdown on Portfolio Builder', duration: '3 hours' },
        { id: 'm2_t4', title: 'Begin AWS Solutions Architect Associate certification revision drills', duration: '12 hours' },
      ],
    },
    {
      month: 'MONTH 3',
      title: 'Targeted High-Impact Applications & Mentorship Drills',
      timeline: 'Days 61–90',
      description: 'Execute strategic application pipeline and aluminum 1-on-1 mentorship.',
      tasks: [
        { id: 'm3_t1', title: 'Book 1-on-1 Mentorship session with Senior Tech Architect', duration: '45 mins' },
        { id: 'm3_t2', title: 'Submit 8 targeted applications via Opportunities & Government hubs', duration: '2 hours' },
        { id: 'm3_t3', title: 'Conduct Behavioral & STAR format mock interviews', duration: '1.5 hours' },
        { id: 'm3_t4', title: 'Track interviews and follow-ups on Application Tracker', duration: 'Continuous' },
      ],
    },
  ];

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const totalTasks = roadmapData.reduce((acc, m) => acc + m.tasks.length, 0);
  const progressPercent = Math.round((completedTasks.length / totalTasks) * 100);

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-6">
      {/* Header Banner - Royal Navy Card */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0B1536] via-[#10204E] to-[#1E3A8A] text-white border border-blue-400/20 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
            <Map className="w-3.5 h-3.5 text-cyan-300" />
            <span>90-Day Trajectory</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            Adaptive Learning Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-cyan-100/90 mt-1 max-w-xl">
            Personalized month-by-month milestone checklist synced with your Career Twin and verified goals.
          </p>
        </div>

        {/* Overall Progress Counter */}
        <div className="relative z-10 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-4 shrink-0">
          <div>
            <div className="text-[10px] font-bold text-cyan-200 uppercase tracking-wider">
              Roadmap Progress
            </div>
            <div className="text-2xl font-heading font-extrabold text-white mt-0.5">
              {progressPercent}%
            </div>
            <div className="text-[10px] text-cyan-300 font-medium">
              {completedTasks.length} of {totalTasks} milestones done
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-cyan-400 flex items-center justify-center font-mono font-bold text-xs text-white">
            {completedTasks.length}/{totalTasks}
          </div>
        </div>
      </div>

      {/* Roadmap Milestone Cards */}
      <div className="space-y-6">
        {roadmapData.map((phase, pIdx) => {
          const phaseTaskIds = phase.tasks.map((t) => t.id);
          const phaseCompleted = phaseTaskIds.filter((id) => completedTasks.includes(id)).length;
          const isCurrentPhase = pIdx === 0;

          return (
            <div
              key={phase.month}
              className={`p-6 rounded-3xl border transition-all ${
                isCurrentPhase
                  ? 'bg-white/95 backdrop-blur-md border-cyan-500/40 shadow-md ring-1 ring-cyan-500/20'
                  : 'bg-white/90 backdrop-blur-md border-slate-200/90 shadow-sm'
              }`}
            >
              {/* Phase Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">
                      {phase.month} · {phase.timeline}
                    </span>
                    {isCurrentPhase && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200">
                        In Progress
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                    {phase.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium">
                    {phase.description}
                  </p>
                </div>

                <div className="text-xs text-cyan-800 font-semibold font-mono self-start sm:self-auto bg-cyan-50 px-2.5 py-1 rounded-xl border border-cyan-100">
                  {phaseCompleted} / {phase.tasks.length} Completed
                </div>
              </div>

              {/* Task Checklist */}
              <div className="space-y-2.5">
                {phase.tasks.map((task) => {
                  const isDone = completedTasks.includes(task.id);

                  return (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                        isDone
                          ? 'bg-slate-50 border-slate-200 text-slate-400'
                          : 'bg-white border-slate-200 hover:border-cyan-500 hover:shadow-2xs text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          className={`w-5 h-5 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                            isDone
                              ? 'bg-emerald-500 text-white'
                              : 'border border-slate-300 hover:border-cyan-500 text-transparent'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <span
                          className={`text-xs sm:text-sm font-medium ${
                            isDone ? 'line-through text-slate-400' : 'text-slate-800'
                          }`}
                        >
                          {task.title}
                        </span>
                      </div>

                      <span className="text-[11px] text-slate-500 shrink-0 font-mono">
                        {task.duration}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
