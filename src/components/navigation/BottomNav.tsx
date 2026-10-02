import React from 'react';
import { Home, Compass, Bot, GraduationCap, User } from 'lucide-react';

interface BottomNavProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentRoute, onNavigate }) => {
  const navItems = [
    { label: 'Home', route: '/', icon: Home },
    { label: 'Explore', route: '/opportunities', icon: Compass },
    { label: 'AI Coach', route: '/ai-career-coach', icon: Bot, isSpecial: true },
    { label: 'Learning', route: '/courses', icon: GraduationCap },
    { label: 'Profile', route: '/profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-lg border-t border-slate-200/90 px-3 py-1.5 md:hidden shadow-lg">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.route === '/'
              ? currentRoute === '/' || currentRoute === ''
              : currentRoute.startsWith(item.route);

          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.route)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
                isActive
                  ? 'text-cyan-600 font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {item.isSpecial ? (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/25 -mt-3 ring-4 ring-white">
                  <Icon className="w-4 h-4" />
                </div>
              ) : (
                <Icon className="w-5 h-5 mb-0.5" />
              )}
              <span className="text-[10px] tracking-tight">{item.label}</span>
              {isActive && !item.isSpecial && (
                <span className="w-1 h-1 rounded-full bg-cyan-600 absolute bottom-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
