import React, { useState } from 'react';
import { EmployaXLogo } from '../EmployaXLogo';
import { AbstractBackground } from '../ui/AbstractBackground';
import {
  Mail,
  Lock,
  Phone,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Code2,
  BookOpen,
  Stethoscope,
  GraduationCap,
} from 'lucide-react';
import { StudentCategory } from '../../types';

interface StudentAuthProps {
  onLoginSuccess: (category?: StudentCategory) => void;
  onOpenRegister: () => void;
}

export const StudentAuth: React.FC<StudentAuthProps> = ({
  onLoginSuccess,
  onOpenRegister,
}) => {
  const [authMode, setAuthMode] = useState<'password' | 'otp'>('password');
  const [identifier, setIdentifier] = useState('rahul.sharma@nit.ac.in');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [password, setPassword] = useState('••••••••••••');
  const [otpStep, setOtpStep] = useState<'request' | 'verify'>('request');
  const [otpCode, setOtpCode] = useState('');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMsg('Please enter your Student Email or Registered Phone');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('technical');
    }, 600);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      setErrorMsg('Please enter your mobile phone number');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpStep('verify');
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length < 4) {
      setErrorMsg('Please enter the 4-digit verification code');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('technical');
    }, 600);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.includes('@')) {
      return;
    }
    setResetSuccess(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between text-slate-900 p-4 sm:p-6 md:p-8 relative overflow-hidden select-none">
      {/* Light Blue & White Abstract Background */}
      <AbstractBackground variant="light" />

      {/* Top Bar with Official EmployaX Logo */}
      <div className="max-w-5xl w-full mx-auto flex items-center justify-between z-10 py-2">
        <EmployaXLogo variant="full" inverted={false} />
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-blue-200/60 shadow-xs text-xs font-semibold text-slate-700 backdrop-blur-md">
          <ShieldCheck className="w-4 h-4 text-cyan-600" />
          <span>Student Single Sign-On Portal</span>
        </div>
      </div>

      {/* Center Auth Card with Glassmorphism */}
      <div className="max-w-md w-full mx-auto my-auto z-10 py-6">
        <div className="bg-white/90 backdrop-blur-xl border border-blue-100/90 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-900/10 relative">
          {/* Subtle top indicator */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-600">
                Student Access
              </span>
              <h1 className="text-2xl font-heading font-extrabold text-[#0B1536] mt-0.5">
                Welcome back
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Sign in to your AI Career Copilot workspace
              </p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500/15 via-blue-500/15 to-purple-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-600 shadow-xs">
              <Sparkles className="w-5 h-5 text-cyan-600" />
            </div>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {authMode === 'password' ? (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email ID or Phone Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="student@college.edu or 9876543210"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotModalOpen(true);
                      setResetSuccess(false);
                      setResetEmail(identifier.includes('@') ? identifier : '');
                    }}
                    className="text-xs text-cyan-600 hover:text-cyan-700 font-semibold transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 active:scale-[0.98] shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Student Login</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-400 font-semibold">Or</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setAuthMode('otp');
                  setOtpStep('request');
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-600" />
                <span>Continue with OTP</span>
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              {otpStep === 'request' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Enter Mobile Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md shadow-blue-500/20 cursor-pointer"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Get 4-Digit OTP</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setAuthMode('password')}
                    className="w-full text-center text-xs text-slate-500 hover:text-slate-800 pt-1 font-medium cursor-pointer"
                  >
                    Back to Password Login
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="text-center py-1">
                    <p className="text-xs text-slate-500">
                      We sent a one-time code to{' '}
                      <span className="text-cyan-700 font-mono font-bold">{phone}</span>
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 text-center">
                      Enter 4-Digit Verification Code
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="8492"
                      className="w-44 mx-auto block text-center tracking-[1em] font-mono font-bold text-2xl py-2 px-3 rounded-xl bg-slate-50 border border-cyan-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md shadow-purple-500/20 cursor-pointer"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Verify & Enter EmployaX</span>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <button
                      type="button"
                      onClick={() => setOtpStep('request')}
                      className="hover:text-slate-800 cursor-pointer"
                    >
                      Change Phone
                    </button>
                    <button
                      type="button"
                      onClick={() => alert('Demo OTP: 8492')}
                      className="text-cyan-600 hover:text-cyan-700 font-semibold cursor-pointer"
                    >
                      Resend Code
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Quick Stream Demo Access Buttons */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <span className="text-[11px] text-slate-500 font-semibold block mb-2 text-center uppercase tracking-wider">
              Quick Stream Demo Access:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onLoginSuccess('technical')}
                className="py-1.5 px-2 rounded-xl bg-cyan-50 hover:bg-cyan-100/80 border border-cyan-200 text-[11px] font-bold text-cyan-800 flex items-center justify-center gap-1 transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <Code2 className="w-3.5 h-3.5 text-cyan-600" />
                <span>Technical</span>
              </button>
              <button
                type="button"
                onClick={() => onLoginSuccess('non-technical')}
                className="py-1.5 px-2 rounded-xl bg-purple-50 hover:bg-purple-100/80 border border-purple-200 text-[11px] font-bold text-purple-800 flex items-center justify-center gap-1 transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                <span>Non-Tech</span>
              </button>
              <button
                type="button"
                onClick={() => onLoginSuccess('medical')}
                className="py-1.5 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-[11px] font-bold text-emerald-800 flex items-center justify-center gap-1 transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                <span>Medical</span>
              </button>
            </div>
          </div>

          {/* Bottom Registration CTA */}
          <div className="mt-6 text-center text-xs text-slate-600 pt-3 border-t border-slate-100">
            <span>Don’t have an account? </span>
            <button
              onClick={onOpenRegister}
              className="text-cyan-700 hover:text-cyan-800 font-bold underline underline-offset-4 transition-colors cursor-pointer"
            >
              Register (6-Step Wizard)
            </button>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-sm w-full relative shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-cyan-400" />
              Reset Student Password
            </h3>
            {resetSuccess ? (
              <div className="py-4 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <p className="text-xs text-slate-300 mb-4">
                  Password reset link has been dispatched to{' '}
                  <span className="text-cyan-300 font-medium">{resetEmail}</span>.
                </p>
                <button
                  onClick={() => setForgotModalOpen(false)}
                  className="w-full py-2 rounded-xl bg-slate-800 text-xs font-semibold text-white hover:bg-slate-700"
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-3">
                <p className="text-xs text-slate-400">
                  Enter your registered college email and we’ll send you a secure link to reset your password.
                </p>
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="flex-1 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-semibold text-white hover:opacity-95"
                  >
                    Send Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer info */}
      <div className="max-w-5xl w-full mx-auto text-center py-2 z-10">
        <p className="text-[11px] text-slate-500">
          EmployaX · “Your AI-Powered Career Copilot” · Empowering students across Technical, Non-Technical & Medical disciplines.
        </p>
      </div>
    </div>
  );
};
