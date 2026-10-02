import React, { useEffect, useState } from 'react';
import { EmployaXLogo } from '../EmployaXLogo';
import { AbstractBackground } from '../ui/AbstractBackground';
import { ArrowRight, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 3.5 seconds timer with progress bar
    const duration = 3500;
    const interval = 50;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 200);
          return 100;
        }
        return Math.min(prev + step, 100);
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-10 text-slate-900 overflow-hidden select-none">
      {/* Consistent Light Blue & White Abstract Background */}
      <AbstractBackground variant="light" />

      {/* Top subtle brand pill */}
      <div className="pt-4 z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-blue-200/80 backdrop-blur-md text-xs font-semibold text-cyan-800 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600 animate-spin" />
          <span>EmployaX Student Employability Intelligence</span>
        </div>
      </div>

      {/* Center Logo & Branding */}
      <div className="my-auto z-10 flex flex-col items-center">
        <div className="transform transition-all duration-1000 scale-100 hover:scale-105">
          <EmployaXLogo variant="splash" />
        </div>

        {/* Progress Bar with Cyan-Blue-Pink gradient */}
        <div className="w-72 max-w-xs mt-8">
          <div className="h-2 w-full bg-blue-100/80 rounded-full overflow-hidden backdrop-blur-sm p-0.5 border border-blue-200/50 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-600 to-pink-500 rounded-full transition-all duration-100 ease-out shadow-xs"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2.5 text-xs text-slate-600 font-medium">
            <span>Initializing AI Copilot</span>
            <span className="font-mono font-bold text-cyan-700">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      {/* Bottom Skip Action */}
      <div className="pb-4 z-10 flex flex-col items-center gap-2">
        <button
          onClick={onFinish}
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-cyan-800 bg-white/90 hover:bg-white border border-blue-200/80 shadow-sm transition-all active:scale-95 cursor-pointer backdrop-blur-md"
        >
          <span>Continue to Student Login</span>
          <ArrowRight className="w-4 h-4 text-cyan-600 transition-transform group-hover:translate-x-1" />
        </button>
        <span className="text-[11px] text-slate-500 font-medium">
          EmployaX v2.4 · Secure Student Platform
        </span>
      </div>
    </div>
  );
};

