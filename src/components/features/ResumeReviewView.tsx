import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Copy,
  Check,
  Zap,
} from 'lucide-react';
import { StudentProfile, ResumeReviewResult } from '../../types';

interface ResumeReviewViewProps {
  student: StudentProfile;
}

export const ResumeReviewView: React.FC<ResumeReviewViewProps> = ({ student }) => {
  const [targetRole, setTargetRole] = useState(
    student.category === 'technical'
      ? 'Cloud Native Full-Stack Engineer'
      : student.category === 'medical'
      ? 'Junior Resident / Clinical Research Physician'
      : 'Business Analyst / Management Associate'
  );

  const defaultSampleResume = `RAHUL SHARMA
Email: rahul.sharma@nit.ac.in | Phone: +91 98765 43210 | Bengaluru, India
GitHub: github.com/rahul-sharma-dev | LinkedIn: linkedin.com/in/rahul-sharma

EDUCATION
National Institute of Technology (NIT)
B.Tech in Computer Science and Engineering | CGPA: 8.84 / 10 | Expected Graduation: 2026
Coursework: Data Structures, Operating Systems, Database Management, Cloud Computing

EXPERIENCE
CloudScale Labs — Software Development Intern (May 2025 – July 2025)
- Worked on building REST API microservices using Node.js and PostgreSQL.
- Improved database query latency by 35% through Redis caching and query indexing.
- Assisted the devops team with Docker containerization and CI/CD pipelines.

PROJECTS
Distributed Key-Value Store with Raft Consensus (Go, TypeScript, Docker)
- Built a multi-node distributed key-value store with leader elections and log replication.
- Successfully sustained 4,200 writes/sec across 5 nodes with zero data inconsistency.

Campus Resource Reservation Portal (React, Express, PostgreSQL)
- Developed an automated room and lab scheduling platform supporting 2,500+ student bookings.
- Integrated PostgreSQL exclusion constraints to prevent double-booking conflicts.

SKILLS
Languages: TypeScript, Python, C++, SQL, Go
Frameworks & Tools: React, Next.js, Express, Docker, AWS (EC2, S3), Redis, Git`;

  const [resumeText, setResumeText] = useState(defaultSampleResume);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ResumeReviewResult | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleAnalyzeResume = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/gemini/resume-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          targetRole,
          studentCategory: student.category,
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Error analyzing resume:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-6">
      {/* Header Banner - Royal Navy Card */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0B1536] via-[#10204E] to-[#1E3A8A] text-white border border-blue-400/20 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>AI Resume Review & ATS Optimization</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            Resume Intelligence Audit
          </h1>
          <p className="text-xs sm:text-sm text-cyan-100/90 mt-1 max-w-xl">
            Evaluate your resume against industry Applicant Tracking Systems (ATS) for your target role.
          </p>
        </div>

        <div className="w-full sm:w-auto relative z-10">
          <label className="block text-[11px] font-semibold text-cyan-200 uppercase tracking-wider mb-1">
            Target Role for Audit
          </label>
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full sm:w-72 px-3.5 py-2.5 rounded-xl bg-white/15 border border-white/25 text-xs text-white placeholder-cyan-200/60 focus:outline-none focus:border-cyan-300 backdrop-blur-md font-medium"
          />
        </div>
      </div>

      {/* Editor & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input Text / Upload */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-cyan-600" />
                <span>Resume Text / Markdown</span>
              </span>
              <button
                onClick={() => setResumeText(defaultSampleResume)}
                className="text-[11px] text-cyan-700 hover:text-cyan-800 font-bold cursor-pointer"
              >
                Reset to Sample
              </button>
            </div>

            <textarea
              rows={16}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your plain resume text here..."
              className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-mono focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 resize-none leading-relaxed"
            />
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-medium">
              {resumeText.split(/\s+/).filter(Boolean).length} words
            </span>
            <button
              onClick={handleAnalyzeResume}
              disabled={isAnalyzing || !resumeText.trim()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 font-bold text-xs text-white flex items-center gap-2 shadow-md shadow-blue-500/20 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Auditing ATS Compatibility...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-cyan-200" />
                  <span>Run AI Resume Review</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Analysis Results */}
        <div className="space-y-4">
          {!result && !isAnalyzing ? (
            <div className="h-full min-h-[380px] p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-3 shadow-2xs border border-cyan-100">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Ready for ATS Inspection
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mb-4">
                Click “Run AI Resume Review” to analyze ATS compliance, discover missing keywords, and get ATS-friendly bullet rewrites.
              </p>
              <button
                onClick={handleAnalyzeResume}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-xs font-bold text-cyan-800 border border-slate-200 transition-all cursor-pointer shadow-2xs"
              >
                Analyze Sample Resume
              </button>
            </div>
          ) : isAnalyzing ? (
            <div className="h-full min-h-[380px] p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 border-3 border-cyan-500/30 border-t-cyan-600 rounded-full animate-spin mb-4" />
              <div className="text-sm font-bold text-slate-900">Analyzing ATS Compliance...</div>
              <div className="text-xs text-slate-500 mt-1 max-w-xs">
                Scanning parsing structures, quantifying action verbs, and computing keyword density for {targetRole}.
              </div>
            </div>
          ) : result ? (
            <div className="space-y-4 animate-fade-in">
              {/* ATS Score Card */}
              <div className="p-5 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Estimated ATS Pass Rate
                  </span>
                  <div className="text-3xl font-heading font-extrabold text-transparent bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text mt-0.5">
                    {result.atsScore}%
                  </div>
                  <p className="text-xs text-slate-600 mt-1 max-w-md font-medium">
                    {result.overallVerdict}
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 shrink-0 shadow-2xs">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
              </div>

              {/* Missing Keywords */}
              <div className="p-5 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm">
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block mb-2">
                  Missing High-Value Keywords for {targetRole}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {result.missingKeywords?.map((kw, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800 font-mono font-medium"
                    >
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bullet Point Rewrites */}
              <div className="p-5 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm space-y-3">
                <span className="text-[11px] font-bold text-cyan-800 uppercase tracking-wider block">
                  ATS-Friendly Bullet Point Rewrites
                </span>
                {result.bulletRewrites?.map((rw, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2"
                  >
                    <div className="text-xs text-slate-500 line-through">
                      “{rw.original}”
                    </div>
                    <div className="text-xs text-emerald-800 font-semibold flex items-start justify-between gap-2">
                      <span>“{rw.improved}”</span>
                      <button
                        onClick={() => copyToClipboard(rw.improved, idx)}
                        className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 shrink-0 cursor-pointer"
                        title="Copy improved bullet"
                      >
                        {copiedIdx === idx ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <div className="text-[10px] text-slate-500 italic">
                      Why: {rw.reason}
                    </div>
                  </div>
                ))}
              </div>

              {/* Actionable Checklist */}
              <div className="p-5 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Recommended Action Items
                </span>
                <ul className="space-y-1.5">
                  {result.actionableChecklist?.map((act, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 font-medium">
                      <span className="text-cyan-600 font-bold">•</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
