import React, { useState } from 'react';
import { EmployaXLogo } from '../EmployaXLogo';
import {
  FileText,
  Target,
  FlaskConical,
  Mic,
  Briefcase,
  Landmark,
  CheckSquare,
  Award,
  GraduationCap,
  Trophy,
  Map,
  Wallet,
  Dna,
  Compass,
  BarChart3,
  Laptop,
  Bot,
  Users,
  User,
  Bell,
  Settings,
  Search,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Info,
} from 'lucide-react';
import { StudentProfile } from '../../types';
import { AbstractBackground } from '../ui/AbstractBackground';

interface HomeHubProps {
  student: StudentProfile;
  onNavigate: (route: string) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenCredits: () => void;
  unreadCount?: number;
}

export const HomeHub: React.FC<HomeHubProps> = ({
  student,
  onNavigate,
  onOpenSearch,
  onOpenNotifications,
  onOpenCredits,
  unreadCount = 2,
}) => {
  // Feature category definitions as specified
  const featureSections = [
    {
      group: 'PRACTICE & PROVE',
      description: 'Validate your skills with simulations, resume reviews & AI interviews',
      features: [
        {
          id: 'resume-review',
          title: 'Resume Review',
          route: '/resume-review',
          icon: FileText,
          gradient: 'from-blue-500 to-cyan-500',
          badge: 'ATS 78%',
          description: 'Instant ATS audit & keyword rewrite',
        },
        {
          id: 'skill-gap',
          title: 'Skill Gap Check',
          route: '/skill-gap',
          icon: Target,
          gradient: 'from-cyan-500 to-teal-500',
          badge: '3 Gaps',
          description: 'Current skills vs target roles',
        },
        {
          id: 'project-simulations',
          title: 'Project Simulation',
          route: '/project-simulations',
          icon: FlaskConical,
          gradient: 'from-indigo-500 to-purple-500',
          badge: 'New',
          description: 'Industry engineering scenarios',
        },
        {
          id: 'mock-interviews',
          title: 'AI Mock Interview',
          route: '/mock-interviews',
          icon: Mic,
          gradient: 'from-purple-500 to-pink-500',
          badge: 'Voice AI',
          description: 'Real-time role-based interview prep',
        },
      ],
    },
    {
      group: 'OPPORTUNITIES',
      description: 'Discover curated openings with transparent match reasons',
      features: [
        {
          id: 'opportunities',
          title: 'Jobs & Internships',
          route: '/opportunities',
          icon: Briefcase,
          gradient: 'from-emerald-500 to-teal-600',
          badge: '94% Match',
          description: 'Top product & enterprise openings',
        },
        {
          id: 'government-jobs',
          title: 'Government Employment',
          route: '/government-jobs',
          icon: Landmark,
          gradient: 'from-amber-500 to-orange-600',
          badge: 'ISRO / PSU',
          description: 'Central, state & research exams',
        },
        {
          id: 'applications',
          title: 'Application Tracker',
          route: '/applications',
          icon: CheckSquare,
          gradient: 'from-blue-600 to-indigo-600',
          badge: '5 Active',
          description: 'Saved → Applied → Interview stages',
        },
        {
          id: 'verified-passport',
          title: 'Verified Passport',
          route: '/verified-passport',
          icon: Award,
          gradient: 'from-cyan-600 to-blue-700',
          badge: 'Verified',
          description: 'Shareable proof of skills & achievements',
        },
      ],
    },
    {
      group: 'LEARNING',
      description: 'Personalized courses, verified credentials & roadmaps',
      features: [
        {
          id: 'courses',
          title: 'Online Courses',
          route: '/courses',
          icon: GraduationCap,
          gradient: 'from-violet-500 to-indigo-600',
          badge: 'Category Pick',
          description: 'Interactive labs & masterclasses',
        },
        {
          id: 'certifications',
          title: 'Certifications',
          route: '/certifications',
          icon: Trophy,
          gradient: 'from-amber-400 to-yellow-600',
          badge: 'AWS / GCP',
          description: 'Industry-recognized credentials',
        },
        {
          id: 'learning-roadmap',
          title: 'Learning Roadmap',
          route: '/learning-roadmap',
          icon: Map,
          gradient: 'from-sky-500 to-blue-600',
          badge: 'Month 1',
          description: '30-60-90 day milestone path',
        },
        {
          id: 'certificates',
          title: 'Certificate Wallet',
          route: '/certificates',
          icon: Wallet,
          gradient: 'from-pink-500 to-rose-600',
          badge: '4 Stored',
          description: 'Organize & verify your credentials',
        },
      ],
    },
    {
      group: 'CAREER',
      description: 'Your continuous digital career model and portfolio',
      features: [
        {
          id: 'career-twin',
          title: 'Career Twin',
          route: '/career-twin',
          icon: Dna,
          gradient: 'from-cyan-500 to-blue-600',
          badge: '92% Synced',
          description: 'AI digital twin of your capabilities',
        },
        {
          id: 'career-options',
          title: 'Career Options',
          route: '/career-options',
          icon: Compass,
          gradient: 'from-teal-500 to-emerald-600',
          badge: 'Explore',
          description: 'In-depth domain & salary guides',
        },
        {
          id: 'student-record',
          title: 'Student Record',
          route: '/student-record',
          icon: BarChart3,
          gradient: 'from-blue-500 to-indigo-600',
          badge: '8.84 CGPA',
          description: 'Academic performance & insights',
        },
        {
          id: 'portfolio',
          title: 'Portfolio Builder',
          route: '/portfolio',
          icon: Laptop,
          gradient: 'from-purple-600 to-pink-600',
          badge: 'Structured',
          description: 'Problem → Solution → Result projects',
        },
      ],
    },
    {
      group: 'SUPPORT & ADVISORY',
      description: 'AI intelligence and human expert mentorship',
      features: [
        {
          id: 'ai-career-coach',
          title: 'AI Career Coach',
          route: '/ai-career-coach',
          icon: Bot,
          gradient: 'from-cyan-400 via-blue-500 to-purple-600',
          badge: 'Live Copilot',
          description: '24/7 personalized career guidance',
        },
        {
          id: 'mentorship',
          title: '1-on-1 Mentorship',
          route: '/mentorship',
          icon: Users,
          gradient: 'from-rose-500 to-orange-500',
          badge: 'Book Slot',
          description: 'Connect with verified industry leaders',
        },
      ],
    },
    {
      group: 'ACCOUNT & SETTINGS',
      description: 'Manage your profile, alerts and data privacy controls',
      features: [
        {
          id: 'profile',
          title: 'My Profile',
          route: '/profile',
          icon: User,
          gradient: 'from-slate-600 to-slate-800',
          badge: 'Verified',
          description: 'Academic & contact details',
        },
        {
          id: 'notifications',
          title: 'Notifications',
          route: '/notifications',
          icon: Bell,
          badge: unreadCount > 0 ? `${unreadCount} New` : undefined,
          gradient: 'from-amber-500 to-red-500',
          description: 'Job matches & deadline alerts',
        },
        {
          id: 'settings',
          title: 'Settings & Privacy',
          route: '/settings',
          icon: Settings,
          gradient: 'from-slate-700 to-zinc-900',
          badge: undefined,
          description: 'Privacy controls & data export',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen text-slate-900 pb-24 md:pb-12 relative overflow-x-hidden">
      {/* Visual inspiration: UI.jpeg background with soft blue waves and dot grids */}
      <AbstractBackground variant="light" />

      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3.5 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <EmployaXLogo variant="nav" inverted={false} />

          {/* Right Header Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button (Triggers global search modal) */}
            <button
              onClick={onOpenSearch}
              aria-label="Search"
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs text-slate-700 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Search className="w-4 h-4 text-cyan-600" />
              <span className="hidden sm:inline font-medium">Search (Ctrl+K)</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              aria-label="Notifications"
              className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-all active:scale-95 cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              )}
            </button>

            {/* Profile Avatar / Quick Link */}
            <button
              onClick={() => onNavigate('/profile')}
              className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs transition-all active:scale-95 cursor-pointer"
            >
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-bold text-[11px] flex items-center justify-center shadow-xs">
                {student.fullName.charAt(0)}
              </div>
              <span className="hidden sm:inline font-semibold text-slate-700 truncate max-w-[100px]">
                {student.fullName.split(' ')[0]}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Feature Hub Body */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-7 relative z-10">
        {/* Welcome Banner: High-contrast royal navy card */}
        <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#0B1536] via-[#10204E] to-[#1E3A8A] text-white border border-blue-400/20 shadow-xl overflow-hidden">
          {/* Subtle glowing accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 left-1/3 w-60 h-60 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span className="uppercase tracking-wider">
                  {student.category.toUpperCase()} STREAM · {student.degree}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                Hi, {student.fullName.split(' ')[0]} 👋
              </h1>
              <p className="text-sm text-cyan-100/90 mt-1">
                “Build your career, one step at a time.”
              </p>
            </div>

            {/* Quick Continuous Career Health Widget */}
            <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-500 text-white flex items-center justify-center shrink-0 shadow-md">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="text-[11px] font-semibold text-cyan-200 uppercase tracking-wider">
                  Continuous Career Health
                </div>
                <div className="text-white font-medium mt-0.5">
                  Complete your SQL module · 1 Interview drill today
                </div>
              </div>
              <button
                onClick={() => onNavigate('/learning-roadmap')}
                className="ml-auto p-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-cyan-200 transition-colors shrink-0 cursor-pointer"
                title="View Roadmap"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Compact Global Search Bar */}
          <div className="mt-5 relative">
            <div
              onClick={onOpenSearch}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-cyan-100 hover:text-white cursor-pointer shadow-inner backdrop-blur-md transition-all group"
            >
              <Search className="w-4 h-4 text-cyan-300 group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-normal">
                Search careers, jobs, courses, skills, certifications, government exams...
              </span>
              <kbd className="hidden sm:inline-block ml-auto text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 border border-white/20 text-cyan-200">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Feature Sections: Clean, small rounded icon grid with smooth hover & tap */}
        {featureSections.map((sec, secIdx) => (
          <section key={secIdx} className="space-y-3">
            <div className="flex items-baseline justify-between px-1">
              <div>
                <h2 className="text-xs sm:text-sm font-heading font-extrabold uppercase tracking-wider text-slate-800">
                  {sec.group}
                </h2>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  {sec.description}
                </p>
              </div>
            </div>

            {/* Grid of Small Icon-Based Feature Buttons with Light Glassmorphism */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {sec.features.map((feat) => {
                const IconComponent = feat.icon;

                return (
                  <button
                    key={feat.id}
                    onClick={() => onNavigate(feat.route)}
                    className="group relative flex flex-col p-3.5 sm:p-4 rounded-2xl bg-white/85 hover:bg-white border border-slate-200/90 hover:border-cyan-500/50 transition-all duration-200 text-left active:scale-[0.98] shadow-xs hover:shadow-md cursor-pointer backdrop-blur-sm"
                  >
                    {/* Top Row: Small Icon + Optional Badge */}
                    <div className="flex items-start justify-between mb-3 w-full">
                      {/* Small rounded icon with gradient background */}
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${feat.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>

                      {feat.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200/80 shadow-2xs">
                          {feat.badge}
                        </span>
                      )}
                    </div>

                    {/* Short Title & Micro-description */}
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                        {feat.title}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>

                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-1 leading-snug font-medium">
                      {feat.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>
        ))}

        {/* Bottom Credits & About Trigger */}
        <div className="pt-6 pb-2 text-center border-t border-slate-200/80">
          <button
            onClick={onOpenCredits}
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 transition-colors py-1 px-3 rounded-lg hover:bg-white/80 cursor-pointer font-medium"
          >
            <Info className="w-3.5 h-3.5 text-cyan-600" />
            <span>About EmployaX & Development Team</span>
          </button>
          <p className="text-[11px] text-slate-500 mt-1">
            EmployaX · “Your AI-Powered Career Copilot” · Discover. Prepare. Prove. Get Hired.
          </p>
        </div>
      </main>
    </div>
  );
};
