import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  User,
  ArrowRight,
  RefreshCw,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { StudentProfile } from '../../types';

interface AiCareerCoachViewProps {
  student: StudentProfile;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const AiCareerCoachView: React.FC<AiCareerCoachViewProps> = ({ student }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Hello ${student.fullName.split(' ')[0]}! 👋 I'm your EmployaX AI Career Coach.

I've loaded your profile in ${student.branch || student.degree} (${student.college || 'University'}), your current 8.84 CGPA standing, and your verified projects.

How can I help you accelerate your career this week? Feel free to ask about internships, bridging skill gaps, interview prep, or government PSU exams!`,
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'What skills should I learn this month to crack a Tier-1 role?',
    'Which internships match my verified profile right now?',
    'How should I prepare for a technical interview on concurrency?',
    'Which government opportunities match my qualifications?',
    'What should I work on this week?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const message = textToSend || input;
    if (!message.trim() || isTyping) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: message }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/gemini/career-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          history: messages,
          studentProfile: {
            name: student.fullName,
            category: student.category,
            degree: student.degree,
            branch: student.branch,
            college: student.college,
            cgpa: student.cgpa,
            skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker'],
            targetRole: 'Full-Stack Cloud Engineer',
            targetDomain: 'Cloud Native Microservices',
          },
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply || 'Here is your personalized roadmap step...' },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'I encountered a brief latency spike. Here is my strategic recommendation: focus on containerizing your Raft consensus project with Docker and practicing system design drills on the sandbox.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto px-4 py-6 flex flex-col h-[calc(100vh-140px)]">
      {/* Header Banner - Royal Navy Card */}
      <div className="flex items-center justify-between p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#0B1536] via-[#10204E] to-[#1E3A8A] text-white border border-blue-400/20 shadow-xl shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-heading font-extrabold text-white flex items-center gap-2">
              <span>EmployaX AI Career Coach</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-200 border border-cyan-400/30">
                Live Copilot
              </span>
            </h1>
            <p className="text-[11px] text-cyan-100/80 font-medium">
              Personalized guidance grounded in your {student.category} profile
            </p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              m.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0 ${
                m.role === 'user'
                  ? 'bg-slate-700'
                  : 'bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-sm'
              }`}
            >
              {m.role === 'user' ? (
                <User className="w-4 h-4" />
              ) : (
                <Bot className="w-4 h-4" />
              )}
            </div>

            <div
              className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none shadow-md shadow-blue-500/10'
                  : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-none shadow-2xs font-medium'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 rounded-tl-none text-xs text-cyan-700 flex items-center gap-2 font-medium">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-600" />
              <span>Analyzing student profile & formulating guidance...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0">
        <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 ml-1" />
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(qp)}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-700 hover:text-cyan-700 hover:border-cyan-300 shrink-0 transition-colors whitespace-nowrap shadow-2xs cursor-pointer"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your AI Career Coach about roadmaps, roles, resume feedback..."
          className="flex-1 px-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-sm"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white disabled:opacity-40 transition-all active:scale-95 shadow-md shadow-blue-500/20 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
