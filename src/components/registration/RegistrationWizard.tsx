import React, { useState } from 'react';
import { EmployaXLogo } from '../EmployaXLogo';
import { AbstractBackground } from '../ui/AbstractBackground';
import {
  StudentCategory,
  StudentProfile,
  AcademicRecord,
  SkillsAndExperience,
  Aspirations,
  CareerBlueprint,
} from '../../types';
import {
  Code,
  BookOpen,
  Stethoscope,
  ArrowRight,
  ArrowLeft,
  Upload,
  CheckCircle2,
  Sparkles,
  FileText,
  Briefcase,
  GraduationCap,
  Compass,
  Trophy,
  Target,
  Clock,
  Building2,
  MapPin,
  Flame,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RegistrationWizardProps {
  onComplete: (data: {
    profile: StudentProfile;
    academics: AcademicRecord;
    skills: SkillsAndExperience;
    aspirations: Aspirations;
    blueprint: CareerBlueprint;
  }) => void;
  onCancel: () => void;
}

export const RegistrationWizard: React.FC<RegistrationWizardProps> = ({
  onComplete,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // Step 1: Category
  const [category, setCategory] = useState<StudentCategory>('technical');

  // Step 2: Basic Profile & College
  const [profile, setProfile] = useState<Partial<StudentProfile>>({
    fullName: 'Aniket Verma',
    email: 'aniket.v@college.edu.in',
    phone: '+91 98765 12340',
    dateOfBirth: '2004-08-16',
    city: 'Pune',
    state: 'Maharashtra',
    college: 'Pune Institute of Computer Technology',
    collegeType: 'Autonomous',
    degree: 'B.Tech',
    branch: 'Computer Engineering',
    currentYear: '3rd Year',
    semester: '5th Semester',
    cgpa: '8.65',
    expectedGraduationYear: '2026',
    categorySpecific: {
      specialization: 'Cloud & Distributed Systems',
    },
  });

  // Step 3: Academic Background
  const [academics, setAcademics] = useState<Partial<AcademicRecord>>({
    tenthPercentage: '95.4%',
    twelfthPercentage: '93.2%',
    degreeName: 'B.Tech Computer Engineering',
    cgpa: '8.65',
    major: 'Computer Engineering',
    coursework: ['Data Structures & Algorithms', 'Database Systems', 'Computer Networks', 'Operating Systems'],
    academicProjects: ['Cloud Inventory Tracker in React', 'P2P File Transfer Protocol'],
    achievements: ['Smart India Hackathon Finalist', 'College Merit Scholarship'],
    entranceExamInfo: 'JEE Mains Rank: 14,200',
    clinicalTraining: '',
    uploadedDocuments: [
      { name: 'Semester_4_Grade_Card.pdf', type: 'PDF', size: '1.4 MB', date: 'Jul 2025' },
    ],
  });

  // Step 4: Skills & Practical Experience
  const [skills, setSkills] = useState<Partial<SkillsAndExperience>>({
    skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'Git'],
    programmingLanguages: ['TypeScript', 'JavaScript', 'Python', 'C++'],
    frameworks: ['React', 'Express', 'Tailwind CSS'],
    databases: ['PostgreSQL', 'MongoDB', 'Redis'],
    cloudTools: ['Docker', 'AWS EC2', 'Git & GitHub'],
    businessTools: ['Excel', 'PowerBI'],
    clinicalSkills: [],
    labSkills: [],
    githubUrl: 'https://github.com/aniket-verma',
    hackathons: ['SIH 2025', 'Pune TechFest Hackathon'],
    internships: [
      {
        role: 'Frontend Developer Intern',
        company: 'Apex Tech Solutions',
        duration: 'June 2025 – August 2025 (2 months)',
        description: 'Developed 8+ responsive dashboard modules in React with full unit test coverage.',
      },
    ],
    certifications: ['PostgreSQL Foundations', 'AWS Cloud Practitioner'],
  });

  // Step 5: Aspirations & Preferences
  const [aspirations, setAspirations] = useState<Partial<Aspirations>>({
    targetDomain: 'Cloud Native & Full-Stack Development',
    targetRoles: ['Full-Stack Developer', 'Cloud Engineer', 'Backend Developer'],
    preferredIndustry: 'Enterprise Software & Cloud Platforms',
    sectorPreference: 'Both',
    preferredLocations: ['Pune', 'Bengaluru', 'Mumbai', 'Remote'],
    workMode: 'Hybrid',
    internshipPreference: 'Immediate',
    expectedSalaryRange: '₹12,00,000 – ₹18,00,000 PA',
    weeklyLearningHours: '10 hours',
    monthlyLearningBudget: '₹1,500 – ₹3,000',
    preferredLearningFormat: 'Hands-on Projects',
    careerSwitchingInterest: 'Staying in my core field',
  });

  // Step 6: Generated Blueprint
  const [blueprint, setBlueprint] = useState<CareerBlueprint | null>(null);

  // Switch category presets helper
  const handleCategorySelect = (selected: StudentCategory) => {
    setCategory(selected);
    if (selected === 'technical') {
      setProfile((prev) => ({
        ...prev,
        degree: 'B.Tech',
        branch: 'Computer Science & Engineering',
        categorySpecific: { specialization: 'Cloud & AI Systems' },
      }));
      setAcademics((prev) => ({
        ...prev,
        degreeName: 'B.Tech in Computer Science',
        coursework: ['Data Structures', 'Database Systems', 'Operating Systems', 'Cloud Systems'],
      }));
      setSkills((prev) => ({
        ...prev,
        skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker'],
      }));
      setAspirations((prev) => ({
        ...prev,
        targetDomain: 'Cloud Native & Full-Stack Systems',
        targetRoles: ['Full-Stack Developer', 'Cloud Engineer'],
      }));
    } else if (selected === 'non-technical') {
      setProfile((prev) => ({
        ...prev,
        degree: 'B.Com / BBA',
        branch: 'Finance & Business Analytics',
        categorySpecific: { specialization: 'Corporate Strategy & Analytics' },
      }));
      setAcademics((prev) => ({
        ...prev,
        degreeName: 'Bachelor of Business Administration',
        coursework: ['Financial Accounting', 'Business Statistics', 'Marketing Strategy', 'Corporate Finance'],
      }));
      setSkills((prev) => ({
        ...prev,
        skills: ['Financial Modeling', 'SQL for Analytics', 'Excel DCF', 'Power BI', 'Market Research'],
      }));
      setAspirations((prev) => ({
        ...prev,
        targetDomain: 'Business Analytics & Corporate Strategy',
        targetRoles: ['Business Analyst', 'Management Trainee', 'Product Associate'],
      }));
    } else if (selected === 'medical') {
      setProfile((prev) => ({
        ...prev,
        degree: 'MBBS',
        branch: 'General Medicine & Surgery',
        categorySpecific: { clinicalYear: 'Final Professional (Part II)', clinicalSubjects: ['Medicine', 'Surgery', 'Pediatrics'] },
      }));
      setAcademics((prev) => ({
        ...prev,
        degreeName: 'Bachelor of Medicine & Bachelor of Surgery (MBBS)',
        coursework: ['Pathology', 'Pharmacology', 'General Medicine', 'Community Medicine'],
        clinicalTraining: '18 months clinical rotations in Tertiary Care Hospital',
        entranceExamInfo: 'NEET-UG Rank: 8,450',
      }));
      setSkills((prev) => ({
        ...prev,
        skills: ['Clinical Diagnosis', 'Patient Triage', 'BLS CPR', 'EHR Management', 'Medical Ethics'],
      }));
      setAspirations((prev) => ({
        ...prev,
        targetDomain: 'Clinical Practice & Healthcare Informatics',
        targetRoles: ['Junior Resident', 'Medical Officer', 'Clinical Research Associate'],
      }));
    }
  };

  const generateBlueprint = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/gemini/generate-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          profile,
          academics,
          skills,
          aspirations,
        }),
      });

      const data = await response.json();
      setBlueprint(data);
      setCurrentStep(6);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06B6D4', '#3B82F6', '#8B5CF6', '#EC4899'],
      });
    } catch (err) {
      console.error('Error generating blueprint:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFinishRegistration = () => {
    const fullProfile: StudentProfile = {
      id: `std_${Date.now()}`,
      fullName: profile.fullName || 'Student',
      email: profile.email || 'student@college.edu',
      phone: profile.phone || '+91 98765 00000',
      dateOfBirth: profile.dateOfBirth,
      city: profile.city || 'Bengaluru',
      state: profile.state || 'Karnataka',
      college: profile.college || 'National Institute',
      collegeType: profile.collegeType || 'Autonomous',
      degree: profile.degree || 'B.Tech',
      branch: profile.branch || 'Computer Science',
      currentYear: profile.currentYear || '3rd Year',
      semester: profile.semester || '5th Semester',
      cgpa: profile.cgpa || '8.5',
      expectedGraduationYear: profile.expectedGraduationYear || '2026',
      category,
      categorySpecific: profile.categorySpecific,
    };

    const fullAcademics: AcademicRecord = {
      tenthPercentage: academics.tenthPercentage || '95%',
      twelfthPercentage: academics.twelfthPercentage || '93%',
      diploma: academics.diploma,
      degreeName: academics.degreeName || profile.degree || 'Degree',
      cgpa: academics.cgpa || profile.cgpa || '8.5',
      major: academics.major || profile.branch || 'Major',
      coursework: academics.coursework || [],
      academicProjects: academics.academicProjects || [],
      achievements: academics.achievements || [],
      entranceExamInfo: academics.entranceExamInfo,
      clinicalTraining: academics.clinicalTraining,
      uploadedDocuments: academics.uploadedDocuments || [],
    };

    const fullSkills: SkillsAndExperience = {
      skills: skills.skills || [],
      programmingLanguages: skills.programmingLanguages,
      frameworks: skills.frameworks,
      databases: skills.databases,
      cloudTools: skills.cloudTools,
      businessTools: skills.businessTools,
      clinicalSkills: skills.clinicalSkills,
      labSkills: skills.labSkills,
      githubUrl: skills.githubUrl,
      hackathons: skills.hackathons,
      internships: skills.internships || [],
      certifications: skills.certifications || [],
    };

    const fullAspirations: Aspirations = {
      targetDomain: aspirations.targetDomain || 'Technology',
      targetRoles: aspirations.targetRoles || ['Professional'],
      preferredIndustry: aspirations.preferredIndustry || 'Enterprise',
      sectorPreference: aspirations.sectorPreference || 'Both',
      preferredLocations: aspirations.preferredLocations || ['Bengaluru'],
      workMode: aspirations.workMode || 'Hybrid',
      internshipPreference: aspirations.internshipPreference || 'Immediate',
      expectedSalaryRange: aspirations.expectedSalaryRange || '₹10,00,000 – ₹16,00,000 PA',
      weeklyLearningHours: aspirations.weeklyLearningHours || '10 hours',
      monthlyLearningBudget: aspirations.monthlyLearningBudget || '₹2,000',
      preferredLearningFormat: aspirations.preferredLearningFormat || 'Hands-on Projects',
      careerSwitchingInterest: aspirations.careerSwitchingInterest || 'Staying in my core field',
    };

    if (blueprint) {
      onComplete({
        profile: fullProfile,
        academics: fullAcademics,
        skills: fullSkills,
        aspirations: fullAspirations,
        blueprint,
      });
    }
  };

  const stepsList = [
    { number: '01', title: 'Category' },
    { number: '02', title: 'Profile' },
    { number: '03', title: 'Academics' },
    { number: '04', title: 'Skills' },
    { number: '05', title: 'Aspirations' },
    { number: '06', title: 'Blueprint' },
  ];

  return (
    <div className="min-h-screen text-slate-900 flex flex-col justify-between p-4 sm:p-6 md:p-8 relative overflow-x-hidden">
      {/* Background */}
      <AbstractBackground variant="light" />

      {/* Top Navbar */}
      <div className="relative z-10 max-w-5xl w-full mx-auto flex items-center justify-between pb-4 border-b border-blue-100">
        <EmployaXLogo variant="full" inverted={false} />
        <button
          onClick={onCancel}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          Cancel & Return to Login
        </button>
      </div>

      {/* Main Form Container */}
      <div className="relative z-10 max-w-4xl w-full mx-auto my-6 bg-white/95 border border-blue-100/90 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        {/* Step Progress Indicator: 01 -> 02 -> 03 -> 04 -> 05 -> 06 */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 -translate-y-1/2 z-0 transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (stepsList.length - 1)) * 100}%` }}
            />

            {stepsList.map((st, idx) => {
              const stepNum = idx + 1;
              const isActive = currentStep === stepNum;
              const isPassed = currentStep > stepNum;

              return (
                <button
                  key={st.number}
                  disabled={stepNum > currentStep && currentStep !== 6}
                  onClick={() => stepNum <= currentStep && setCurrentStep(stepNum)}
                  className="z-10 flex flex-col items-center group cursor-pointer disabled:cursor-not-allowed"
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white ring-4 ring-blue-500/20 scale-110 shadow-lg shadow-blue-500/30'
                        : isPassed
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {isPassed ? <CheckCircle2 className="w-5 h-5" /> : st.number}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs mt-1.5 font-medium transition-colors hidden sm:block ${
                      isActive ? 'text-blue-700 font-bold' : 'text-slate-500'
                    }`}
                  >
                    {st.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* STEP 1: STUDENT CATEGORY                                      */}
        {/* ------------------------------------------------------------- */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-lg mx-auto">
              <span className="text-xs uppercase font-bold tracking-widest text-blue-600">
                Step 01
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 mt-1">
                Which field do you belong to?
              </h2>
              <p className="text-sm text-slate-600 mt-2 font-medium">
                Selecting your field customizes your entire career roadmap, skill verification, mock interviews, and opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {/* Technical Card */}
              <div
                onClick={() => handleCategorySelect('technical')}
                className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                  category === 'technical'
                    ? 'bg-gradient-to-b from-blue-50 to-white border-blue-500 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/20'
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/80 shadow-2xs'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100">
                  <Code className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <span>💻 Technical</span>
                </h3>
                <p className="text-xs text-slate-600 mb-3 font-medium">
                  Engineering, Software, AI/ML, Data Science, Core Disciplines.
                </p>
                <div className="text-[11px] text-blue-700 leading-relaxed font-mono font-medium">
                  Computer Science · IT · AI/ML · Electronics · Mechanical · Civil · Data Science
                </div>
              </div>

              {/* Non-Technical Card */}
              <div
                onClick={() => handleCategorySelect('non-technical')}
                className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                  category === 'non-technical'
                    ? 'bg-gradient-to-b from-purple-50 to-white border-purple-500 shadow-xl shadow-purple-500/10 ring-2 ring-purple-500/20'
                    : 'bg-white border-slate-200 hover:border-purple-300 hover:bg-slate-50/80 shadow-2xs'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 border border-purple-100">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <span>📚 Non-Technical</span>
                </h3>
                <p className="text-xs text-slate-600 mb-3 font-medium">
                  Commerce, Management, Economics, Humanities, Law, Arts.
                </p>
                <div className="text-[11px] text-purple-700 leading-relaxed font-mono font-medium">
                  Commerce · Management · Economics · Arts · Law · Humanities · Social Sciences
                </div>
              </div>

              {/* Medical Card */}
              <div
                onClick={() => handleCategorySelect('medical')}
                className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                  category === 'medical'
                    ? 'bg-gradient-to-b from-emerald-50 to-white border-emerald-500 shadow-xl shadow-emerald-500/10 ring-2 ring-emerald-500/20'
                    : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50/80 shadow-2xs'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-100">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <span>🩺 Medical</span>
                </h3>
                <p className="text-xs text-slate-600 mb-3 font-medium">
                  Clinical Medicine, Dental, Nursing, Pharmacy, Allied Health.
                </p>
                <div className="text-[11px] text-emerald-700 leading-relaxed font-mono font-medium">
                  MBBS · BDS · Nursing · Pharmacy · Physiotherapy · Biotechnology · Allied Health
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-bold text-sm text-white flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
              >
                <span>Continue to Profile (Step 02)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* STEP 2: BASIC PROFILE & COLLEGE                               */}
        {/* ------------------------------------------------------------- */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
                Step 02 · {category.toUpperCase()}
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 mt-1">
                Tell us where you study and your academic standing
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.fullName || ''}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  College / University Email
                </label>
                <input
                  type="email"
                  value={profile.email || ''}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profile.phone || ''}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={profile.dateOfBirth || ''}
                  onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={profile.city || ''}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={profile.state || ''}
                  onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  College / University Name
                </label>
                <input
                  type="text"
                  value={profile.college || ''}
                  onChange={(e) => setProfile({ ...profile, college: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  College Type
                </label>
                <select
                  value={profile.collegeType}
                  onChange={(e) =>
                    setProfile({ ...profile, collegeType: e.target.value as any })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                >
                  <option value="Autonomous">Autonomous</option>
                  <option value="National Institute (IIT/NIT/AIIMS/IIM)">
                    National Institute (IIT/NIT/AIIMS/IIM)
                  </option>
                  <option value="State">State University</option>
                  <option value="Central">Central University</option>
                  <option value="Private">Private University</option>
                  <option value="Deemed">Deemed University</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Degree
                </label>
                <input
                  type="text"
                  value={profile.degree || ''}
                  onChange={(e) => setProfile({ ...profile, degree: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Branch / Major
                </label>
                <input
                  type="text"
                  value={profile.branch || ''}
                  onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Year
                </label>
                <select
                  value={profile.currentYear}
                  onChange={(e) => setProfile({ ...profile, currentYear: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Final Year / Intern">Final Year / Intern</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current CGPA or Percentage
                </label>
                <input
                  type="text"
                  value={profile.cgpa || ''}
                  onChange={(e) => setProfile({ ...profile, cgpa: e.target.value })}
                  placeholder="e.g. 8.65 or 85%"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Expected Graduation Year
                </label>
                <select
                  value={profile.expectedGraduationYear}
                  onChange={(e) =>
                    setProfile({ ...profile, expectedGraduationYear: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                >
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                </select>
              </div>

              {/* Category-Specific Field */}
              <div>
                <label className="block text-xs font-semibold text-blue-700 mb-1">
                  {category === 'technical'
                    ? 'Technical Specialization'
                    : category === 'non-technical'
                    ? 'Functional Specialization'
                    : 'Clinical Rotations / Specialization'}
                </label>
                <input
                  type="text"
                  value={profile.categorySpecific?.specialization || ''}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      categorySpecific: {
                        ...profile.categorySpecific,
                        specialization: e.target.value,
                      },
                    })
                  }
                  placeholder={
                    category === 'technical'
                      ? 'e.g. Cloud, AI/ML, Cybersecurity'
                      : category === 'non-technical'
                      ? 'e.g. Corporate Finance, Digital Marketing'
                      : 'e.g. Cardiology, Pediatrics, Emergency Care'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-blue-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                />
              </div>
            </div>

            <div className="pt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-semibold text-sm text-white flex items-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer"
              >
                <span>Continue to Academics (Step 03)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* STEP 3: ACADEMIC BACKGROUND                                   */}
        {/* ------------------------------------------------------------- */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-blue-600">
                Step 03 · Qualifications
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 mt-1">
                Academic qualifications, coursework, and degree details
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  10th Percentage / Board CGPA
                </label>
                <input
                  type="text"
                  value={academics.tenthPercentage || ''}
                  onChange={(e) => setAcademics({ ...academics, tenthPercentage: e.target.value })}
                  placeholder="e.g. 95.4%"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  12th Percentage / Diploma Score
                </label>
                <input
                  type="text"
                  value={academics.twelfthPercentage || ''}
                  onChange={(e) => setAcademics({ ...academics, twelfthPercentage: e.target.value })}
                  placeholder="e.g. 93.2%"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {category === 'medical' ? 'Entrance Exam (NEET-UG/PG)' : 'Entrance / Diploma Details'}
                </label>
                <input
                  type="text"
                  value={academics.entranceExamInfo || ''}
                  onChange={(e) => setAcademics({ ...academics, entranceExamInfo: e.target.value })}
                  placeholder={category === 'medical' ? 'NEET Rank / AIR' : 'JEE / CET / Direct'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Key Coursework Completed (comma separated)
                </label>
                <input
                  type="text"
                  value={academics.coursework?.join(', ') || ''}
                  onChange={(e) =>
                    setAcademics({
                      ...academics,
                      coursework: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Academic Projects / Case Studies
                </label>
                <input
                  type="text"
                  value={academics.academicProjects?.join('; ') || ''}
                  onChange={(e) =>
                    setAcademics({
                      ...academics,
                      academicProjects: e.target.value.split(';').map((s) => s.trim()),
                    })
                  }
                  placeholder="Separated by semicolon (;)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Academic Achievements, Scholarships, or Honors
                </label>
                <input
                  type="text"
                  value={academics.achievements?.join(', ') || ''}
                  onChange={(e) =>
                    setAcademics({
                      ...academics,
                      achievements: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                />
              </div>

              {category === 'medical' && (
                <div>
                  <label className="block text-xs font-semibold text-emerald-700 mb-1">
                    Clinical Rotations & Hospital Experience
                  </label>
                  <textarea
                    rows={2}
                    value={academics.clinicalTraining || ''}
                    onChange={(e) => setAcademics({ ...academics, clinicalTraining: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                  />
                </div>
              )}
            </div>

            {/* Document Upload Area */}
            <div className="p-4 rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 text-center">
              <Upload className="w-7 h-7 text-blue-600 mx-auto mb-2" />
              <p className="text-xs text-slate-800 font-semibold">
                Upload Marksheets, Transcripts or Degree Certificates
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Accepted: PDF, PNG, JPG (Simulated upload securely encrypted in your Career Twin)
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {academics.uploadedDocuments?.map((doc, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-100 border border-blue-200 text-xs text-blue-800 font-medium"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>{doc.name}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-semibold text-sm text-white flex items-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer"
              >
                <span>Continue to Skills (Step 04)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* STEP 4: SKILLS & PRACTICAL EXPERIENCE                         */}
        {/* ------------------------------------------------------------- */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-blue-600">
                Step 04 · Experience & Capabilities
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 mt-1">
                Skills, projects, internships, and certifications
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Core Skills & Competencies (comma separated)
                </label>
                <input
                  type="text"
                  value={skills.skills?.join(', ') || ''}
                  onChange={(e) =>
                    setSkills({
                      ...skills,
                      skills: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                />
              </div>

              {category === 'technical' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Programming Languages & Frameworks
                    </label>
                    <input
                      type="text"
                      value={skills.programmingLanguages?.join(', ') || ''}
                      onChange={(e) =>
                        setSkills({
                          ...skills,
                          programmingLanguages: e.target.value.split(',').map((s) => s.trim()),
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      GitHub Profile URL
                    </label>
                    <input
                      type="url"
                      value={skills.githubUrl || ''}
                      onChange={(e) => setSkills({ ...skills, githubUrl: e.target.value })}
                      placeholder="https://github.com/username"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                    />
                  </div>
                </div>
              )}

              {category === 'non-technical' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Business Tools, Finance & Marketing Softwares
                  </label>
                  <input
                    type="text"
                    value={skills.businessTools?.join(', ') || ''}
                    onChange={(e) =>
                      setSkills({
                        ...skills,
                        businessTools: e.target.value.split(',').map((s) => s.trim()),
                      })
                    }
                    placeholder="e.g. Advanced Excel, SQL, Tableau, Power BI, HubSpot"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                  />
                </div>
              )}

              {category === 'medical' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Clinical Diagnostics & Medical Procedures
                  </label>
                  <input
                    type="text"
                    value={skills.clinicalSkills?.join(', ') || ''}
                    onChange={(e) =>
                      setSkills({
                        ...skills,
                        clinicalSkills: e.target.value.split(',').map((s) => s.trim()),
                      })
                    }
                    placeholder="e.g. BLS CPR, Venipuncture, ECG Analysis, Suture Technique, Triage"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Certifications or Workshops (comma separated)
                </label>
                <input
                  type="text"
                  value={skills.certifications?.join(', ') || ''}
                  onChange={(e) =>
                    setSkills({
                      ...skills,
                      certifications: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Internship or Practical Work Experience
                </label>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  <div className="font-bold text-slate-900">
                    {skills.internships?.[0]?.role} · {skills.internships?.[0]?.company}
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    {skills.internships?.[0]?.duration}
                  </div>
                  <div className="mt-1 text-slate-600 font-medium">
                    {skills.internships?.[0]?.description}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-semibold text-sm text-white flex items-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer"
              >
                <span>Continue to Aspirations (Step 05)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* STEP 5: ASPIRATIONS & LEARNING PREFERENCES                   */}
        {/* ------------------------------------------------------------- */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-blue-600">
                Step 05 · Your Ambition
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 mt-1">
                Where do you want your career to go?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Career Domain
                </label>
                <input
                  type="text"
                  value={aspirations.targetDomain || ''}
                  onChange={(e) => setAspirations({ ...aspirations, targetDomain: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Job Roles (comma separated)
                </label>
                <input
                  type="text"
                  value={aspirations.targetRoles?.join(', ') || ''}
                  onChange={(e) =>
                    setAspirations({
                      ...aspirations,
                      targetRoles: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Sector Preference
                </label>
                <select
                  value={aspirations.sectorPreference}
                  onChange={(e) =>
                    setAspirations({
                      ...aspirations,
                      sectorPreference: e.target.value as any,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                >
                  <option value="Both">Both (Private Tech & Government / PSUs)</option>
                  <option value="Private">Private Industry Only</option>
                  <option value="Government">Government & PSUs Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Work Mode Preference
                </label>
                <select
                  value={aspirations.workMode}
                  onChange={(e) =>
                    setAspirations({ ...aspirations, workMode: e.target.value as any })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                >
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                  <option value="Office">Office / On-Site</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Cities / Locations
                </label>
                <input
                  type="text"
                  value={aspirations.preferredLocations?.join(', ') || ''}
                  onChange={(e) =>
                    setAspirations({
                      ...aspirations,
                      preferredLocations: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Expected Salary / CTC Range
                </label>
                <input
                  type="text"
                  value={aspirations.expectedSalaryRange || ''}
                  onChange={(e) =>
                    setAspirations({ ...aspirations, expectedSalaryRange: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Weekly Time Available for Learning
                </label>
                <select
                  value={aspirations.weeklyLearningHours}
                  onChange={(e) =>
                    setAspirations({ ...aspirations, weeklyLearningHours: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                >
                  <option value="5-8 hours">5 – 8 hours / week</option>
                  <option value="10 hours">10 hours / week</option>
                  <option value="15 hours">15 hours / week</option>
                  <option value="20+ hours (Intensive)">20+ hours / week (Intensive)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Learning Format
                </label>
                <select
                  value={aspirations.preferredLearningFormat}
                  onChange={(e) =>
                    setAspirations({
                      ...aspirations,
                      preferredLearningFormat: e.target.value as any,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium"
                >
                  <option value="Hands-on Projects">Hands-on Projects & Code Labs</option>
                  <option value="Video Courses">Structured Video Courses</option>
                  <option value="Interactive Labs">Interactive Simulations & Case Studies</option>
                  <option value="Mentorship">1-on-1 Mentorship & Code Reviews</option>
                </select>
              </div>
            </div>

            <div className="pt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                disabled={isGenerating}
                onClick={generateBlueprint}
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 font-bold text-sm text-white flex items-center gap-2.5 shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>AI Analyzing Profile & Synthesizing Blueprint...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-cyan-200" />
                    <span>Generate AI Career Blueprint (Step 06)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* STEP 6: INITIAL CAREER BLUEPRINT                              */}
        {/* ------------------------------------------------------------- */}
        {currentStep === 6 && blueprint && (
          <div className="space-y-6 animate-fade-in">
            {/* Banner - Royal Navy Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0B1536] via-[#10204E] to-[#1E3A8A] text-white border border-blue-400/20 text-center relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-cyan-200 mb-2 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Your AI Career Blueprint is ready!</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                  Initial Career Blueprint Generated
                </h2>
                <p className="text-xs sm:text-sm text-cyan-100/90 max-w-xl mx-auto mt-1.5 font-medium">
                  AI has analyzed your academic qualifications, practical projects, skill gaps, and aspirations to construct your tailored employability trajectory.
                </p>
              </div>
            </div>

            {/* Top Score & Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-center shadow-2xs">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Career Readiness Score
                </span>
                <div className="text-4xl sm:text-5xl font-heading font-extrabold text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text my-2">
                  {blueprint.readinessScore}
                  <span className="text-lg text-slate-400 font-normal">/100</span>
                </div>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Top 15% in peer cohort
                </span>
              </div>

              <div className="md:col-span-2 p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
                <span className="text-xs font-bold text-cyan-800 uppercase tracking-wider block mb-1">
                  Synthesized Career Profile
                </span>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {blueprint.careerProfile}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {blueprint.recommendedRoles.map((role, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-800 font-bold"
                    >
                      🎯 {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Strengths & Skill Gaps Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 shadow-2xs">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Current Strengths</h4>
                </div>
                <ul className="space-y-2">
                  {blueprint.currentStrengths.map((str, idx) => (
                    <li key={idx} className="text-xs text-slate-700 font-medium flex items-start gap-2">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 shadow-2xs">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Flame className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Critical Skill Gaps to Bridge</h4>
                </div>
                <ul className="space-y-2">
                  {blueprint.skillGaps.map((gap, idx) => (
                    <li key={idx} className="text-xs text-slate-700 font-medium flex items-start gap-2">
                      <span className="text-amber-600 font-bold shrink-0">⚡</span>
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 30-60-90 Day Milestones Roadmap */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-cyan-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  Personalized 90-Day Learning & Employability Roadmap
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Month 1 */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <div className="text-[11px] font-bold text-cyan-800 uppercase tracking-wider mb-1">
                    Month 1 (Days 1–30)
                  </div>
                  <div className="text-xs font-bold text-slate-900 mb-2">
                    {blueprint.personalizedRoadmap?.month1?.focus}
                  </div>
                  <ul className="space-y-1.5">
                    {blueprint.personalizedRoadmap?.month1?.milestones?.map((m, idx) => (
                      <li key={idx} className="text-[11px] text-slate-600 font-medium flex items-start gap-1.5">
                        <span className="text-cyan-600 font-bold shrink-0">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Month 2 */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <div className="text-[11px] font-bold text-blue-800 uppercase tracking-wider mb-1">
                    Month 2 (Days 31–60)
                  </div>
                  <div className="text-xs font-bold text-slate-900 mb-2">
                    {blueprint.personalizedRoadmap?.month2?.focus}
                  </div>
                  <ul className="space-y-1.5">
                    {blueprint.personalizedRoadmap?.month2?.milestones?.map((m, idx) => (
                      <li key={idx} className="text-[11px] text-slate-600 font-medium flex items-start gap-1.5">
                        <span className="text-blue-600 font-bold shrink-0">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Month 3 */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <div className="text-[11px] font-bold text-purple-800 uppercase tracking-wider mb-1">
                    Month 3 (Days 61–90)
                  </div>
                  <div className="text-xs font-bold text-slate-900 mb-2">
                    {blueprint.personalizedRoadmap?.month3?.focus}
                  </div>
                  <ul className="space-y-1.5">
                    {blueprint.personalizedRoadmap?.month3?.milestones?.map((m, idx) => (
                      <li key={idx} className="text-[11px] text-slate-600 font-medium flex items-start gap-1.5">
                        <span className="text-purple-600 font-bold shrink-0">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Button to Enter App */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
              >
                ← Edit Information
              </button>
              <button
                type="button"
                onClick={handleFinishRegistration}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 font-bold text-sm text-white shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Enter EmployaX →</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom helper */}
      <div className="max-w-4xl w-full mx-auto text-center text-xs text-slate-500">
        All student information is strictly confidential and controlled by your personal privacy settings.
      </div>
    </div>
  );
};
