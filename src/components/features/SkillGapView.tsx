import React, { useState } from 'react';
import { Target, CheckCircle2, AlertCircle, XCircle, ArrowRight, Sparkles, BookOpen, Laptop, Trophy } from 'lucide-react';
import { StudentProfile } from '../../types';

interface SkillGapViewProps {
  student: StudentProfile;
  onNavigate: (route: string) => void;
}

export const SkillGapView: React.FC<SkillGapViewProps> = ({ student, onNavigate }) => {
  // Target roles based on student category
  const rolePresets =
    student.category === 'technical'
      ? [
          'Full-Stack Cloud Engineer',
          'Applied Machine Learning Engineer',
          'DevOps & Kubernetes Specialist',
          'Backend Microservices Developer',
        ]
      : student.category === 'medical'
      ? [
          'Junior Resident / Medical Officer',
          'Clinical Research Associate',
          'Healthcare Informatics Specialist',
          'Emergency Care Physician',
        ]
      : [
          'Business Analytics Associate',
          'Corporate FP&A / Financial Analyst',
          'Digital Product Manager',
          'Management Consultant Trainee',
        ];

  const [selectedRole, setSelectedRole] = useState(rolePresets[0]);

  // Role Skill Matrix Data
  const roleSkillProfiles: Record<
    string,
    {
      matchScore: number;
      strong: string[];
      improve: string[];
      missing: string[];
      recommendedCourses: string[];
      recommendedProjects: string[];
      recommendedCertifications: string[];
    }
  > = {
    'Full-Stack Cloud Engineer': {
      matchScore: 84,
      strong: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Git & GitHub'],
      improve: ['Docker Containerization', 'AWS S3 & EC2 Security', 'REST API Optimization'],
      missing: ['Kubernetes Orchestration', 'CI/CD Pipelines (GitHub Actions)', 'System Design at Scale'],
      recommendedCourses: ['Modern Full-Stack Cloud Native Systems', 'System Design & High-Concurrency Architecture'],
      recommendedProjects: ['Microservice Distributed Task Scheduler', 'Zero-Downtime Multi-Region Deployment'],
      recommendedCertifications: ['AWS Certified Solutions Architect – Associate', 'Certified Kubernetes Application Developer (CKAD)'],
    },
    'Applied Machine Learning Engineer': {
      matchScore: 68,
      strong: ['Python', 'SQL Fundamentals', 'Mathematics & Logic'],
      improve: ['NumPy & Pandas Dataframes', 'Model Validation & Cross-entropy'],
      missing: ['PyTorch / Transformers', 'Vector Databases & Embeddings', 'LLM Agent Architectures (Gemini SDK)'],
      recommendedCourses: ['Applied Generative AI & LLM Systems for Developers'],
      recommendedProjects: ['RAG Pipeline with Semantic Search and Embeddings', 'Computer Vision Edge Classifier'],
      recommendedCertifications: ['Google Cloud Professional Machine Learning Engineer'],
    },
    'DevOps & Kubernetes Specialist': {
      matchScore: 62,
      strong: ['Linux CLI', 'Git Version Control', 'Basic Networking'],
      improve: ['Docker Multi-stage Builds', 'Shell Scripting Automations'],
      missing: ['Kubernetes Ingress & Helm', 'Terraform Infrastructure as Code', 'Prometheus & Grafana Monitoring'],
      recommendedCourses: ['Production Kubernetes for Developers'],
      recommendedProjects: ['Automated GitOps Pipeline with ArgoCD', 'Observability Stack with Distributed Tracing'],
      recommendedCertifications: ['Certified Kubernetes Administrator (CKA)', 'AWS DevOps Engineer'],
    },
    'Junior Resident / Medical Officer': {
      matchScore: 82,
      strong: ['Clinical Diagnosis', 'Patient History Taking', 'Medical Ethics'],
      improve: ['Emergency Triage Decision Trees', 'Pharmacological Contraindications'],
      missing: ['EHR Interoperability Standards', 'Advanced Trauma Life Support (ATLS) Protocols'],
      recommendedCourses: ['Modern Clinical Informatics & Healthcare Telemedicine Systems'],
      recommendedProjects: ['Emergency Department Triage Simulation', 'Hospital Antimicrobial Stewardship Audit'],
      recommendedCertifications: ['Basic Life Support (BLS)', 'Advanced Cardiovascular Life Support (ACLS)'],
    },
    'Clinical Research Associate': {
      matchScore: 78,
      strong: ['Medical Physiology', 'Biomedical Terminology'],
      improve: ['GCP Regulatory Guidelines', 'Informed Consent Documentation'],
      missing: ['Biostatistical Power Calculations', 'Electronic Case Report Form (eCRF) Audit'],
      recommendedCourses: ['Evidence-Based Clinical Research & Biostatistics'],
      recommendedProjects: ['Phase-3 Multi-Center Oncology Protocol Audit', 'Adverse Drug Reaction Reporting Workflow'],
      recommendedCertifications: ['Good Clinical Practice (ICH-GCP)', 'SOCRA Certified Clinical Research Professional'],
    },
    'Business Analytics Associate': {
      matchScore: 85,
      strong: ['Excel Data Cleansing', 'Presentation & Storytelling', 'Business Problem Solving'],
      improve: ['Complex SQL Joins & Window Functions', 'Data Visualization Dashboards (Tableau/Power BI)'],
      missing: ['Predictive Cohort Modeling', 'A/B Testing Hypothesis Evaluation'],
      recommendedCourses: ['Strategic Financial Modeling & Business Valuation'],
      recommendedProjects: ['D2C Customer Churn & LTV Optimization Model', 'E-Commerce Unit Economics Dashboard'],
      recommendedCertifications: ['Google Data Analytics Professional Certificate'],
    },
  };

  const currentAnalysis =
    roleSkillProfiles[selectedRole] || roleSkillProfiles['Full-Stack Cloud Engineer'];

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-6">
      {/* Header Banner - Royal Navy Card */}
      <div className="relative p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0B1536] via-[#10204E] to-[#1E3A8A] text-white border border-blue-400/20 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
            <Target className="w-3.5 h-3.5 text-cyan-300" />
            <span>Competency Matrix</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            AI Skill-Gap Analyzer
          </h1>
          <p className="text-xs sm:text-sm text-cyan-100/90 mt-1 max-w-xl">
            Compare your current verified capabilities against target industry roles to pinpoint high-priority growth areas.
          </p>

          {/* Role Selector Tabs */}
          <div className="mt-5 flex flex-wrap gap-2">
            {rolePresets.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedRole === r
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-md shadow-cyan-500/30 ring-2 ring-white/30'
                    : 'bg-white/10 hover:bg-white/20 text-cyan-100 border border-white/15 backdrop-blur-md'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Match Score & Legend */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Role Alignment
          </span>
          <div className="text-4xl font-heading font-extrabold text-transparent bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text my-1">
            {currentAnalysis.matchScore}%
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Based on {student.category} profile
          </span>
        </div>

        <div className="md:col-span-3 p-5 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm flex flex-col justify-center">
          <div className="text-xs font-bold text-slate-800 mb-2">
            Skill Breakdown Legend
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
              <div className="font-bold text-emerald-800 flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>🟢 Strong Competency</span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium">
                You meet or exceed market benchmarks.
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs">
              <div className="font-bold text-amber-800 flex items-center gap-1.5 mb-1">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>🟡 Needs Improvement</span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium">
                Foundational grasp, needs practical project reps.
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs">
              <div className="font-bold text-rose-800 flex items-center gap-1.5 mb-1">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>🔴 Missing Gap</span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium">
                Critical blocker for 70%+ of candidate screenings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Lists */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Strong */}
        <div className="p-5 rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-200 shadow-sm">
          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>🟢 Strong Skills</span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {currentAnalysis.strong.length}
            </span>
          </div>
          <ul className="space-y-2">
            {currentAnalysis.strong.map((sk, idx) => (
              <li
                key={idx}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-semibold flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{sk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improve */}
        <div className="p-5 rounded-3xl bg-white/90 backdrop-blur-md border border-amber-200 shadow-sm">
          <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>🟡 Improve Next</span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
              {currentAnalysis.improve.length}
            </span>
          </div>
          <ul className="space-y-2">
            {currentAnalysis.improve.map((sk, idx) => (
              <li
                key={idx}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-semibold flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{sk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Missing */}
        <div className="p-5 rounded-3xl bg-white/90 backdrop-blur-md border border-rose-200 shadow-sm">
          <div className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>🔴 Missing Gaps</span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
              {currentAnalysis.missing.length}
            </span>
          </div>
          <ul className="space-y-2">
            {currentAnalysis.missing.map((sk, idx) => (
              <li
                key={idx}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-semibold flex items-center gap-2"
              >
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{sk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendations to Bridge Gaps */}
      <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-600" />
          <span>Tailored Recommendations to Bridge These Skill Gaps</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-bold text-purple-700 flex items-center gap-1.5 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Recommended Courses</span>
            </div>
            <ul className="space-y-1.5">
              {currentAnalysis.recommendedCourses.map((c, i) => (
                <li
                  key={i}
                  onClick={() => onNavigate('/courses')}
                  className="text-xs text-slate-700 hover:text-cyan-700 font-medium cursor-pointer flex items-start gap-1.5"
                >
                  <span className="text-cyan-600">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-bold text-blue-700 flex items-center gap-1.5 mb-2">
              <Laptop className="w-3.5 h-3.5" />
              <span>Recommended Projects</span>
            </div>
            <ul className="space-y-1.5">
              {currentAnalysis.recommendedProjects.map((p, i) => (
                <li
                  key={i}
                  onClick={() => onNavigate('/project-simulations')}
                  className="text-xs text-slate-700 hover:text-cyan-700 font-medium cursor-pointer flex items-start gap-1.5"
                >
                  <span className="text-cyan-600">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-bold text-amber-700 flex items-center gap-1.5 mb-2">
              <Trophy className="w-3.5 h-3.5" />
              <span>Recommended Certifications</span>
            </div>
            <ul className="space-y-1.5">
              {currentAnalysis.recommendedCertifications.map((cert, i) => (
                <li
                  key={i}
                  onClick={() => onNavigate('/certifications')}
                  className="text-xs text-slate-700 hover:text-cyan-700 font-medium cursor-pointer flex items-start gap-1.5"
                >
                  <span className="text-cyan-600">•</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => onNavigate('/learning-roadmap')}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-xs font-bold text-white flex items-center gap-2 shadow-md shadow-blue-500/20 cursor-pointer active:scale-95"
          >
            <span>Add Gaps to Learning Roadmap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
