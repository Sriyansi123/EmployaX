import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Sparkles,
  Info,
} from 'lucide-react';
import { StudentProfile } from '../../types';
import { sampleTechnicalStudent } from '../../data/mockData';

interface StudentRecordViewProps {
  student: StudentProfile;
}

export const StudentRecordView: React.FC<StudentRecordViewProps> = ({ student }) => {
  const academics = sampleTechnicalStudent.academics;

  const semesterGrades = [
    { sem: 'Sem 1', gpa: 8.4, status: 'Completed' },
    { sem: 'Sem 2', gpa: 8.6, status: 'Completed' },
    { sem: 'Sem 3', gpa: 8.9, status: 'Completed' },
    { sem: 'Sem 4', gpa: 9.1, status: 'Completed' },
    { sem: 'Sem 5', gpa: 8.84, status: 'Current' },
    { sem: 'Sem 6', gpa: 0, status: 'Upcoming' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-6">
      {/* Header Banner - Royal Navy Card */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0B1536] via-[#10204E] to-[#1E3A8A] text-white border border-blue-400/20 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
            <BarChart3 className="w-3.5 h-3.5 text-cyan-300" />
            <span>Academic Performance Audit</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            Student Record Analyzer
          </h1>
          <p className="text-xs sm:text-sm text-cyan-100/90 mt-1 max-w-xl">
            Authorized transcript audit and subject strength analytics mapped to industrial competencies.
          </p>
        </div>

        <div className="relative z-10 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-4 shrink-0">
          <div>
            <div className="text-[10px] font-bold text-cyan-200 uppercase tracking-wider">
              Cumulative CGPA
            </div>
            <div className="text-3xl font-heading font-extrabold text-white">
              {student.cgpa}
              <span className="text-xs text-cyan-200/80 font-normal"> / 10</span>
            </div>
          </div>
          <div className="text-xs text-emerald-300 font-bold bg-emerald-500/20 px-2.5 py-1 rounded-xl border border-emerald-400/30">
            Top 5% Merit
          </div>
        </div>
      </div>

      {/* GPA Trajectory Bar Chart */}
      <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Semester GPA Trajectory
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Positive upward trend across core computer science & systems semesters
            </p>
          </div>
          <span className="text-xs text-cyan-700 font-bold flex items-center gap-1 bg-cyan-50 px-2.5 py-1 rounded-xl border border-cyan-100">
            <TrendingUp className="w-3.5 h-3.5" /> +0.44 CGPA Growth
          </span>
        </div>

        <div className="grid grid-cols-6 gap-2 sm:gap-4 pt-4 items-end h-48 border-b border-slate-100 pb-2">
          {semesterGrades.map((sg) => {
            const heightPercent = sg.gpa > 0 ? (sg.gpa / 10) * 100 : 8;

            return (
              <div key={sg.sem} className="flex flex-col items-center h-full justify-end group">
                <span className="text-[11px] font-mono text-slate-500 group-hover:text-cyan-700 mb-1 font-bold transition-colors">
                  {sg.gpa > 0 ? sg.gpa : '—'}
                </span>
                <div
                  className={`w-full max-w-[48px] rounded-t-xl transition-all ${
                    sg.status === 'Current'
                      ? 'bg-gradient-to-t from-cyan-500 to-blue-600 ring-2 ring-cyan-500/30 shadow-md shadow-cyan-500/20'
                      : sg.gpa > 0
                      ? 'bg-slate-200 hover:bg-slate-300'
                      : 'bg-slate-100 border border-dashed border-slate-200'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-[11px] font-bold text-slate-600 mt-2">
                  {sg.sem}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strengths & Academic Gaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-emerald-200 space-y-3 shadow-sm">
          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Demonstrated Academic Strengths</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-700 font-medium">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span>
                Consistent grade 'O' (Outstanding) in Data Structures, Database Systems & Algorithms.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span>
                Demonstrated practical applied competence through smart hackathon project prototypes.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span>
                High coursework attendance (94%) and consistent lab experiment rubric scores.
              </span>
            </li>
          </ul>
        </div>

        <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-amber-200 space-y-3 shadow-sm">
          <div className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Academic Improvement Areas</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-700 font-medium">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span>
                Theoretical computer networks scored grade 'A' — recommend practical Wireshark socket drills.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span>
                Translate academic project write-ups into verifiable live web demos with CI/CD badges.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2 font-medium">
        <Info className="w-4 h-4 text-cyan-600 shrink-0" />
        <span>
          Academic and career insights are probabilistic guidance synthesized from your authorized coursework and peer benchmarks. EmployaX does not guarantee external interview outcomes.
        </span>
      </div>
    </div>
  );
};
