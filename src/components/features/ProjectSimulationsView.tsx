import React, { useState } from 'react';
import {
  FlaskConical,
  Clock,
  Award,
  Sparkles,
  CheckCircle2,
  Send,
  RefreshCw,
  ChevronRight,
  Code2,
  BookOpen,
  Stethoscope,
} from 'lucide-react';
import { sampleProjectSimulations } from '../../data/mockData';
import { StudentProfile, ProjectSimulationItem } from '../../types';

interface ProjectSimulationsViewProps {
  student: StudentProfile;
}

export const ProjectSimulationsView: React.FC<ProjectSimulationsViewProps> = ({ student }) => {
  const [selectedSim, setSelectedSim] = useState<ProjectSimulationItem>(
    sampleProjectSimulations.find((s) => s.category === student.category) ||
      sampleProjectSimulations[0]
  );

  const [studentSolution, setStudentSolution] = useState(
    `Proposed Architecture & Solution Implementation:

1. Root Cause Identification:
- The database bottleneck stems from row-level locks on the 'inventory' table during synchronous checkout transactions under high concurrency.

2. Redis Atomic Write-Behind Caching:
- Replace synchronous SQL updates with atomic Redis 'DECRBY inventory:stock:<item_id> 1'.
- If the return value is < 0, immediately trigger an out-of-stock event and return HTTP 409 without touching the PostgreSQL database.
- Utilize a durable Redis stream or worker queue to asynchronously batch order insertions and persist inventory debits to PostgreSQL in chunks of 200 records every 500ms.

3. Token Bucket Rate Limiter:
- Implement a token bucket middleware utilizing Redis hashes to cap incoming burst requests at 50 requests/sec per IP, protecting the payment gateway from abusive bots.

4. Performance & Latency Result:
- Benchmark shows database IOPS drops by 82%, p99 latency decreases from 2800ms to 42ms, sustaining 15,000 requests/sec with 0% dropped transactions.`
  );

  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<{
    scores: {
      problemSolving: number;
      technicalKnowledge: number;
      accuracy: number;
      structure: number;
      communication: number;
      creativity: number;
    };
    totalScore: number;
    feedback: string;
    strengths: string[];
    improvementAreas: string[];
    mentorNote: string;
  } | null>(null);

  const handleRunEvaluation = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      setEvaluation({
        scores: {
          problemSolving: 24,
          technicalKnowledge: 23,
          accuracy: 19,
          structure: 18,
          communication: 14,
          creativity: 14,
        },
        totalScore: 92,
        feedback:
          'Excellent production-grade resolution! Your write-behind Redis caching pattern directly eliminates the database row-locking contention. The token bucket rate limiter demonstrates sound defensive systems engineering.',
        strengths: [
          'Correctly utilized atomic DECRBY instead of naive GET-and-SET race conditions',
          'Batching database writes every 500ms is standard high-concurrency best practice',
          'Clearly quantified latency reduction from 2800ms down to 42ms',
        ],
        improvementAreas: [
          'Consider handling Redis worker node failover with Redis Sentinel or Redis Cluster replication',
          'Add an idempotency key header to guarantee zero duplicate order placements on network retry',
        ],
        mentorNote:
          'This simulation submission demonstrates senior-level microservice systems aptitude and is verified for your EmployaX Verified Passport.',
      });
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-6">
      {/* Header Banner - Royal Navy Card */}
      <div className="relative p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0B1536] via-[#10204E] to-[#1E3A8A] text-white border border-blue-400/20 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
            <FlaskConical className="w-3.5 h-3.5 text-cyan-300" />
            <span>Industry Sandbox</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            Practical Project Simulations
          </h1>
          <p className="text-xs sm:text-sm text-cyan-100/90 mt-1 max-w-xl">
            Solve real-world workplace scenarios designed by senior architects, managers, and physicians. Tested against measurable criteria.
          </p>

          {/* Available Simulations Tab Selector */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {sampleProjectSimulations.map((sim) => {
              const isSelected = selectedSim.id === sim.id;
              return (
                <div
                  key={sim.id}
                  onClick={() => {
                    setSelectedSim(sim);
                    setEvaluation(null);
                  }}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white border-white/40 shadow-md ring-2 ring-white/30'
                      : 'bg-white/10 hover:bg-white/20 text-cyan-100 border-white/15 backdrop-blur-md'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1.5 font-semibold">
                    <span className="capitalize">
                      {sim.category}
                    </span>
                    <span className="flex items-center gap-1 opacity-90">
                      <Clock className="w-3 h-3" />
                      {sim.durationMinutes}m
                    </span>
                  </div>
                  <div className="text-xs font-bold line-clamp-1">
                    {sim.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Scenario Details & Submission Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Problem Brief */}
        <div className="lg:col-span-1 p-5 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm space-y-4">
          <div>
            <div className="text-[11px] font-bold text-cyan-700 uppercase tracking-wider mb-1">
              Active Scenario
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {selectedSim.title}
            </h3>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
            <span className="font-bold text-slate-900 block mb-1">Context:</span>
            {selectedSim.scenario}
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-800">
              Required Deliverables:
            </div>
            <ul className="space-y-1.5">
              {selectedSim.tasks.map((task, idx) => (
                <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 font-medium">
                  <span className="text-cyan-600 font-bold shrink-0">{idx + 1}.</span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
            <span className="font-bold text-slate-700 block mb-1">Evaluation Rubric:</span>
            Problem Solving · Technical Knowledge · Accuracy · Structure · Communication · Creativity
          </div>
        </div>

        {/* Right: Solution Workspace & Evaluation */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-cyan-600" />
                <span>Your Professional Submission</span>
              </span>
              <button
                onClick={() => setStudentSolution('')}
                className="text-[11px] text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Clear
              </button>
            </div>

            <textarea
              rows={11}
              value={studentSolution}
              onChange={(e) => setStudentSolution(e.target.value)}
              placeholder="Outline your architectural reasoning, code or policy draft, and measurable impact metrics..."
              className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-mono focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 resize-none leading-relaxed"
            />

            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">
                Evaluation checks problem solving, accuracy & technical rigor
              </span>
              <button
                onClick={handleRunEvaluation}
                disabled={isEvaluating || !studentSolution.trim()}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 font-bold text-xs text-white flex items-center gap-2 shadow-md shadow-blue-500/20 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isEvaluating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Grading Rubric...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-cyan-200" />
                    <span>Submit & Evaluate Simulation</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Qualitative & Quantitative Evaluation Feedback */}
          {evaluation && (
            <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                    Simulation Verified
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                    Detailed Qualitative Assessment
                  </h4>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-transparent bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text">
                    {evaluation.totalScore} / 100
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">Total Score</div>
                </div>
              </div>

              {/* Rubric Criteria Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-medium">Problem Solving</div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">
                    {evaluation.scores.problemSolving}/25
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-medium">Technical Knowledge</div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">
                    {evaluation.scores.technicalKnowledge}/25
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-medium">Accuracy</div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">
                    {evaluation.scores.accuracy}/20
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-medium">Structure</div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">
                    {evaluation.scores.structure}/20
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-medium">Communication</div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">
                    {evaluation.scores.communication}/15
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-medium">Creativity</div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">
                    {evaluation.scores.creativity}/15
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
                <span className="font-bold text-cyan-800 block mb-1">Evaluator Feedback:</span>
                {evaluation.feedback}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="font-bold text-emerald-800 mb-1">Strengths Demonstrated:</div>
                  <ul className="space-y-1 text-slate-700 font-medium">
                    {evaluation.strengths.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-600">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <div className="font-bold text-amber-800 mb-1">Areas to Sharpen:</div>
                  <ul className="space-y-1 text-slate-700 font-medium">
                    {evaluation.improvementAreas.map((a, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-600">•</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-cyan-800 flex items-center justify-between font-medium">
                <span>🏅 Verified Achievement recorded to your Verified Passport</span>
                <span className="font-bold">Credential #PS-2026-{selectedSim.id}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
