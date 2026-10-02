import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/splash/SplashScreen';
import { StudentAuth } from './components/auth/StudentAuth';
import { RegistrationWizard } from './components/registration/RegistrationWizard';
import { HomeHub } from './components/home/HomeHub';
import { TopBar } from './components/navigation/TopBar';
import { BottomNav } from './components/navigation/BottomNav';
import { GlobalSearchModal } from './components/search/GlobalSearchModal';
import { NotificationsDrawer } from './components/notifications/NotificationsDrawer';
import { AboutCreditsModal } from './components/features/AboutCreditsModal';

// Feature Views
import { ResumeReviewView } from './components/features/ResumeReviewView';
import { SkillGapView } from './components/features/SkillGapView';
import { ProjectSimulationsView } from './components/features/ProjectSimulationsView';
import { MockInterviewView } from './components/features/MockInterviewView';
import { OpportunitiesView } from './components/features/OpportunitiesView';
import { GovernmentJobsView } from './components/features/GovernmentJobsView';
import { ApplicationTrackerView } from './components/features/ApplicationTrackerView';
import { VerifiedPassportView } from './components/features/VerifiedPassportView';
import { OnlineCoursesView } from './components/features/OnlineCoursesView';
import { CertificationsView } from './components/features/CertificationsView';
import { LearningRoadmapView } from './components/features/LearningRoadmapView';
import { CertificateWalletView } from './components/features/CertificateWalletView';
import { CareerTwinView } from './components/features/CareerTwinView';
import { CareerOptionsView } from './components/features/CareerOptionsView';
import { StudentRecordView } from './components/features/StudentRecordView';
import { PortfolioBuilderView } from './components/features/PortfolioBuilderView';
import { AiCareerCoachView } from './components/features/AiCareerCoachView';
import { MentorshipView } from './components/features/MentorshipView';
import { StudentProfileView } from './components/features/StudentProfileView';
import { SettingsPrivacyView } from './components/features/SettingsPrivacyView';
import { AbstractBackground } from './components/ui/AbstractBackground';

import {
  StudentProfile,
  StudentCategory,
  NotificationItem,
  OpportunityItem,
} from './types';
import {
  sampleTechnicalStudent,
  sampleNotifications,
} from './data/mockData';

export default function App() {
  // App Phase: 'splash' -> 'auth' -> 'register' -> 'main'
  const [appPhase, setAppPhase] = useState<'splash' | 'auth' | 'register' | 'main'>('splash');
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [student, setStudent] = useState<StudentProfile>(sampleTechnicalStudent.profile);
  const [notifications, setNotifications] = useState<NotificationItem[]>(sampleNotifications);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);

  // Listen to browser hash or back button
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      if (path !== currentRoute) {
        setCurrentRoute(path);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentRoute]);

  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      window.history.pushState({}, '', route);
    } catch (e) {
      // Ignore in iframe if pushState is restricted
    }
  };

  const handleLoginSuccess = (category: StudentCategory = 'technical') => {
    if (category === 'medical') {
      setStudent({
        ...sampleTechnicalStudent.profile,
        id: 'std_med_01',
        fullName: 'Dr. Priya Patel',
        degree: 'MBBS',
        branch: 'Clinical Medicine',
        college: 'AIIMS New Delhi',
        collegeType: 'National Institute (IIT/NIT/AIIMS/IIM)',
        category: 'medical',
        cgpa: '8.92',
      });
    } else if (category === 'non-technical') {
      setStudent({
        ...sampleTechnicalStudent.profile,
        id: 'std_nontech_01',
        fullName: 'Rohan Verma',
        degree: 'BBA / B.Com',
        branch: 'Corporate Finance & Analytics',
        college: 'Shaheed Sukhdev College of Business Studies (DU)',
        collegeType: 'Central',
        category: 'non-technical',
        cgpa: '8.76',
      });
    } else {
      setStudent(sampleTechnicalStudent.profile);
    }
    setAppPhase('main');
    handleNavigate('/');
  };

  const handleRegisterComplete = (data: any) => {
    setStudent(data.profile);
    setAppPhase('main');
    handleNavigate('/');
  };

  const handleApplySuccess = (opportunity: OpportunityItem) => {
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: `Applied to ${opportunity.title}`,
      message: `Your application to ${opportunity.company} was logged to your Application Tracker!`,
      type: 'job',
      time: 'Just now',
      read: false,
      actionUrl: '/applications',
    };
    setNotifications([newNotif, ...notifications]);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // 1. Splash Screen Phase
  if (appPhase === 'splash') {
    return <SplashScreen onFinish={() => setAppPhase('auth')} />;
  }

  // 2. Student Authentication Phase
  if (appPhase === 'auth') {
    return (
      <StudentAuth
        onLoginSuccess={handleLoginSuccess}
        onOpenRegister={() => setAppPhase('register')}
      />
    );
  }

  // 3. Six-Step Registration Wizard Phase
  if (appPhase === 'register') {
    return (
      <RegistrationWizard
        onComplete={handleRegisterComplete}
        onCancel={() => setAppPhase('auth')}
      />
    );
  }

  // 4. Main Application Hub & Routes
  const renderCurrentView = () => {
    switch (currentRoute) {
      case '/resume-review':
        return <ResumeReviewView student={student} />;
      case '/skill-gap':
        return <SkillGapView student={student} onNavigate={handleNavigate} />;
      case '/project-simulations':
        return <ProjectSimulationsView student={student} />;
      case '/mock-interviews':
        return <MockInterviewView student={student} />;
      case '/opportunities':
        return (
          <OpportunitiesView
            student={student}
            onApplySuccess={handleApplySuccess}
          />
        );
      case '/government-jobs':
        return <GovernmentJobsView student={student} />;
      case '/applications':
        return <ApplicationTrackerView />;
      case '/verified-passport':
        return <VerifiedPassportView student={student} />;
      case '/courses':
        return <OnlineCoursesView student={student} />;
      case '/certifications':
        return <CertificationsView student={student} />;
      case '/learning-roadmap':
        return <LearningRoadmapView student={student} />;
      case '/certificates':
        return <CertificateWalletView />;
      case '/career-twin':
        return <CareerTwinView student={student} />;
      case '/career-options':
        return <CareerOptionsView student={student} onNavigate={handleNavigate} />;
      case '/student-record':
        return <StudentRecordView student={student} />;
      case '/portfolio':
        return <PortfolioBuilderView student={student} />;
      case '/ai-career-coach':
        return <AiCareerCoachView student={student} />;
      case '/mentorship':
        return <MentorshipView student={student} />;
      case '/profile':
        return (
          <StudentProfileView
            student={student}
            onUpdateProfile={setStudent}
            onNavigate={handleNavigate}
          />
        );
      case '/settings':
        return (
          <SettingsPrivacyView
            student={student}
            onLogout={() => {
              setAppPhase('auth');
              handleNavigate('/');
            }}
          />
        );
      case '/notifications':
        return (
          <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-xl font-bold text-white mb-4">Notifications</h1>
            <div className="space-y-3">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => n.actionUrl && handleNavigate(n.actionUrl)}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer text-xs"
                >
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>{n.title}</span>
                    <span className="text-[10px] text-slate-500">{n.time}</span>
                  </div>
                  <p className="text-slate-300 mt-1">{n.message}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case '/':
      default:
        return (
          <HomeHub
            student={student}
            onNavigate={handleNavigate}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            onOpenCredits={() => setIsCreditsOpen(true)}
            unreadCount={unreadCount}
          />
        );
    }
  };

  const getPageHeaderInfo = () => {
    switch (currentRoute) {
      case '/resume-review':
        return { title: 'Resume Review', subtitle: 'ATS Optimization & Rewrites' };
      case '/skill-gap':
        return { title: 'Skill Gap Check', subtitle: 'Current vs Target Roles' };
      case '/project-simulations':
        return { title: 'Project Simulations', subtitle: 'Industry Sandbox' };
      case '/mock-interviews':
        return { title: 'AI Mock Interviews', subtitle: 'Live Speech Drills' };
      case '/opportunities':
        return { title: 'Jobs & Internships', subtitle: 'Ranked Opportunities' };
      case '/government-jobs':
        return { title: 'Government Employment', subtitle: 'Central, PSU & Exams' };
      case '/applications':
        return { title: 'Application Tracker', subtitle: 'Pipeline Management' };
      case '/verified-passport':
        return { title: 'Verified Passport', subtitle: 'Cryptographic Credentials' };
      case '/courses':
        return { title: 'Online Courses', subtitle: 'Skill Masterclasses' };
      case '/certifications':
        return { title: 'Certifications', subtitle: 'Industry Credentials' };
      case '/learning-roadmap':
        return { title: 'Learning Roadmap', subtitle: '90-Day Trajectory' };
      case '/certificates':
        return { title: 'Certificate Wallet', subtitle: 'Digital Credential Vault' };
      case '/career-twin':
        return { title: 'Career Twin', subtitle: 'Synchronized Competency Model' };
      case '/career-options':
        return { title: 'Career Options', subtitle: 'Directory & Salary Guides' };
      case '/student-record':
        return { title: 'Student Record Analysis', subtitle: 'Transcript Insights' };
      case '/portfolio':
        return { title: 'Portfolio Builder', subtitle: 'Problem-Solution-Impact' };
      case '/ai-career-coach':
        return { title: 'AI Career Coach', subtitle: '24/7 Career Copilot' };
      case '/mentorship':
        return { title: '1-on-1 Mentorship', subtitle: 'Expert Advisory' };
      case '/profile':
        return { title: 'My Student Profile', subtitle: 'Academic & Identity' };
      case '/settings':
        return { title: 'Settings & Privacy', subtitle: 'Governance & Data' };
      default:
        return null;
    }
  };

  const headerInfo = getPageHeaderInfo();

  return (
    <div className="min-h-screen text-slate-900 flex flex-col font-sans selection:bg-cyan-500 selection:text-white relative overflow-x-hidden">
      {/* Universal Light Blue & White Abstract Background */}
      <AbstractBackground variant="light" />

      {/* Top Header if not on Home Hub */}
      {currentRoute !== '/' && currentRoute !== '' && (
        <TopBar
          title={headerInfo?.title}
          subtitle={headerInfo?.subtitle}
          onBack={() => handleNavigate('/')}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenProfile={() => handleNavigate('/profile')}
          unreadCount={unreadCount}
          student={student}
        />
      )}

      {/* Main View Body */}
      <div className="flex-1 pb-16 md:pb-6 relative z-10">{renderCurrentView()}</div>

      {/* Mobile Bottom Navigation */}
      <BottomNav currentRoute={currentRoute} onNavigate={handleNavigate} />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Notifications Drawer */}
      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllNotificationsRead}
        onNavigate={handleNavigate}
      />

      {/* About & Credits Modal */}
      <AboutCreditsModal
        isOpen={isCreditsOpen}
        onClose={() => setIsCreditsOpen(false)}
      />
    </div>
  );
}
