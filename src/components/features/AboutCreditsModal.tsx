import React from 'react';
import { X, Code2, Users, Sparkles, Shield, Heart } from 'lucide-react';
import { EmployaXLogo } from '../EmployaXLogo';

interface AboutCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutCreditsModal: React.FC<AboutCreditsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fade-in">
      <div className="max-w-md w-full bg-white/95 border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <EmployaXLogo variant="full" inverted={false} className="justify-center mb-2" />
          <p className="text-xs text-cyan-700 font-bold tracking-wide">
            “Your AI-Powered Career Copilot”
          </p>
          <p className="text-[11px] text-slate-500 uppercase tracking-widest mt-1 font-semibold">
            Discover · Prepare · Prove · Get Hired
          </p>
        </div>

        <div className="space-y-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-4 font-medium">
          <p>
            EmployaX is an AI-powered career readiness and employability copilot designed for students across Technical, Non-Technical, and Medical disciplines. It bridges the gap between academic performance and industry expectations with ATS resume reviews, skill-gap detection, realistic project simulations, and verified employability credentials.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-cyan-800 font-bold uppercase tracking-wider text-[11px]">
              <Code2 className="w-4 h-4 text-cyan-600" />
              <span>Lead Developer & Architecture</span>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Rahul Dewangan</div>
              <div className="text-[11px] text-slate-500 font-medium">Backend / Lead Developer</div>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <div className="flex items-center gap-2 text-purple-800 font-bold uppercase tracking-wider text-[11px] mb-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span>Core Team Members</span>
              </div>
              <ul className="space-y-1 text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <span>Siddhant Bihani</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>Sriyansi Kumari</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                  <span>Surbhi Shivankar</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span>Version 2.4.0 (2026 Production)</span>
          <button
            onClick={onClose}
            className="text-blue-600 hover:text-blue-700 font-bold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
