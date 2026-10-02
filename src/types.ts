export type StudentCategory = 'technical' | 'non-technical' | 'medical';

export interface StudentProfile {
  id: string;
  fullName: string;
  avatarUrl?: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  city: string;
  state: string;
  college: string;
  collegeType: 'Central' | 'State' | 'Autonomous' | 'Private' | 'Deemed' | 'National Institute (IIT/NIT/AIIMS/IIM)';
  degree: string;
  branch: string;
  currentYear: string;
  semester: string;
  cgpa: string;
  expectedGraduationYear: string;
  category: StudentCategory;
  categorySpecific?: {
    specialization?: string;
    clinicalYear?: string;
    clinicalSubjects?: string[];
    majorSubjects?: string[];
  };
}

export interface AcademicRecord {
  tenthPercentage: string;
  twelfthPercentage: string;
  diploma?: string;
  degreeName: string;
  cgpa: string;
  major: string;
  coursework: string[];
  academicProjects: string[];
  achievements: string[];
  entranceExamInfo?: string;
  clinicalTraining?: string;
  uploadedDocuments: { name: string; type: string; size: string; date: string }[];
}

export interface SkillsAndExperience {
  skills: string[];
  programmingLanguages?: string[];
  frameworks?: string[];
  databases?: string[];
  cloudTools?: string[];
  businessTools?: string[];
  clinicalSkills?: string[];
  labSkills?: string[];
  githubUrl?: string;
  hackathons?: string[];
  internships: {
    role: string;
    company: string;
    duration: string;
    description: string;
  }[];
  certifications: string[];
  hospitalExperience?: string;
  researchPublications?: string[];
}

export interface Aspirations {
  targetDomain: string;
  targetRoles: string[];
  preferredIndustry: string;
  sectorPreference: 'Private' | 'Government' | 'Both';
  preferredLocations: string[];
  workMode: 'Remote' | 'Hybrid' | 'Office' | 'Flexible';
  internshipPreference: 'Immediate' | 'Summer' | 'Part-time' | 'Final Year';
  expectedSalaryRange: string;
  weeklyLearningHours: string;
  monthlyLearningBudget: string;
  preferredLearningFormat: 'Hands-on Projects' | 'Video Courses' | 'Interactive Labs' | 'Mentorship';
  careerSwitchingInterest: 'Staying in my core field' | 'Interested in interdisciplinary roles' | 'Actively exploring transition';
}

export interface CareerBlueprint {
  readinessScore: number;
  careerProfile: string;
  recommendedDomains: string[];
  recommendedRoles: string[];
  currentStrengths: string[];
  skillGaps: string[];
  recommendedSkills: string[];
  recommendedCourses: string[];
  recommendedCertifications: string[];
  recommendedProjects: string[];
  internshipOpportunities: string[];
  jobOpportunities: string[];
  governmentOpportunities: string[];
  personalizedRoadmap: {
    month1: { focus: string; milestones: string[] };
    month2: { focus: string; milestones: string[] };
    month3: { focus: string; milestones: string[] };
  };
}

export interface CareerTwinData {
  profileCompletion: number;
  readinessScore: number;
  skillsInventory: { name: string; level: 'Beginner' | 'Intermediate' | 'Advanced'; verified: boolean }[];
  careerGoals: string[];
  identifiedGaps: { skill: string; priority: 'High' | 'Medium' | 'Low'; reason: string }[];
  experienceSummary: { title: string; organization: string; period: string }[];
  learningProgress: { totalHours: number; completedCourses: number; activeRoadmapStep: string };
  privacyControls: {
    shareWithEmployers: boolean;
    publicPassport: boolean;
    anonymizeGrades: boolean;
    aiPersonalization: boolean;
  };
}

export interface ResumeReviewResult {
  atsScore: number;
  overallVerdict: string;
  strengths: string[];
  formattingIssues: string[];
  missingKeywords: string[];
  bulletRewrites: {
    original: string;
    improved: string;
    reason: string;
  }[];
  roleRelevanceSummary: string;
  actionableChecklist: string[];
}

export interface SkillGapAnalysis {
  targetRole: string;
  matchScore: number;
  strongSkills: string[];
  improvingSkills: string[];
  missingSkills: string[];
  recommendedCourses: string[];
  recommendedProjects: string[];
  recommendedCertifications: string[];
}

export interface ProjectSimulationItem {
  id: string;
  title: string;
  category: StudentCategory;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  scenario: string;
  problemStatement: string;
  tasks: string[];
  rubric: {
    problemSolving: number;
    technicalAccuracy: number;
    structure: number;
    communication: number;
    creativity: number;
  };
  sampleSolutionGuide: string;
}

export interface MockInterviewQuestion {
  id: number;
  question: string;
  category: string;
  idealKeypoints: string[];
}

export interface CourseItem {
  id: string;
  title: string;
  category: StudentCategory;
  provider: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessonsCount: number;
  skills: string[];
  rating: number;
  hasCertificate: boolean;
  isFree: boolean;
  progress: number;
  enrolled: boolean;
  description: string;
  syllabus: { title: string; duration: string; completed?: boolean }[];
}

export interface CertificationItem {
  id: string;
  title: string;
  category: StudentCategory;
  provider: string;
  difficulty: 'Foundational' | 'Associate' | 'Professional';
  duration: string;
  cost: string;
  skillsCovered: string[];
  eligibility: string;
  validity: string;
  officialUrl: string;
  recommendedFor: string;
}

export interface CertificateWalletItem {
  id: string;
  title: string;
  issuer: string;
  issuedDate: string;
  category: 'Course' | 'Certification' | 'Workshop' | 'Hackathon' | 'Internship' | 'Academic';
  credentialId: string;
  verified: boolean;
  inPassport: boolean;
}

export interface OpportunityItem {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Internship' | 'Full-Time' | 'Graduate Trainee' | 'Part-time';
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  stipendOrSalary: string;
  matchScore: number;
  matchReasons: string[];
  requiredSkills: string[];
  deadline: string;
  description: string;
  category: StudentCategory;
}

export interface GovernmentJobItem {
  id: string;
  title: string;
  organization: string;
  type: 'Central Government' | 'State Government' | 'PSU' | 'Internship' | 'Apprenticeship' | 'Competitive Examination';
  eligibility: string;
  qualification: string;
  requiredSkills: string[];
  location: string;
  deadline: string;
  officialPortalUrl: string;
  source: string;
  verified: boolean;
  examDate?: string;
}

export interface ApplicationTrackerItem {
  id: string;
  company: string;
  role: string;
  type: 'Job' | 'Internship' | 'Government';
  stage: 'saved' | 'applied' | 'assessment' | 'interview' | 'offer' | 'closed';
  appliedDate: string;
  deadline: string;
  interviewDate?: string;
  notes: string;
  resumeVersion: string;
}

export interface MentorItem {
  id: string;
  name: string;
  role: string;
  organization: string;
  category: StudentCategory;
  expertise: string[];
  rating: number;
  reviewsCount: number;
  avatarUrl: string;
  availability: string;
  bio: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'job' | 'resume' | 'certificate' | 'deadline' | 'course' | 'nudge';
  time: string;
  read: boolean;
  actionUrl?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  problem: string;
  solution: string;
  technology: string[];
  contribution: string;
  result: string;
  skills: string[];
  demoUrl?: string;
  githubUrl?: string;
}
