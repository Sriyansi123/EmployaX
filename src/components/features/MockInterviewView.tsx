import React, { useState } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Send,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  Bot,
} from 'lucide-react';
import { StudentProfile } from '../../types';

interface MockInterviewViewProps {
  student: StudentProfile;
}

export const MockInterviewView: React.FC<MockInterviewViewProps> = ({ student }) => {
  const modes = [
    { id: 'Technical', label: 'Technical Interview', desc: 'Coding, system architecture & algorithmic depth' },
    { id: 'HR', label: 'HR Interview', desc: 'Career motivations, cultural fit & salary expectations' },
    { id: 'Behavioral', label: 'Behavioral (STAR)', desc: 'Situational leadership, conflicts & achievements' },
    { id: 'Internship', label: 'Internship Interview', desc: 'Learning agility, fast ramp-up & project ownership' },
    { id: 'Government', label: 'Government / PSU', desc: 'Administrative aptitude, constitutional ethics & service' },
    { id: 'Role-specific', label: 'Role-Specific Deep Dive', desc: 'Domain specialized clinical, cloud, or finance drills' },
  ];

  const [selectedMode, setSelectedMode] = useState('Technical');

  const questionBank: Record<string, string[]> = {
    Technical: [
      'Can you explain how you would handle race conditions when two users attempt to purchase the exact last seat simultaneously in a distributed ticketing service?',
      'How does PostgreSQL manage transactions under the Read Committed isolation level, and what are MVCC snapshots?',
      'Walk me through the trade-offs between REST and gRPC for internal microservice communication.',
    ],
    HR: [
      'Tell me about yourself, why you chose your branch, and where you envision your career 3 years from graduation.',
      'How do you handle ambiguous requirements or conflicting priorities when working on a tight deadline?',
      'Why are you interested in joining a fast-paced product engineering team over legacy IT consulting?',
    ],
    Behavioral: [
      'Tell me about a time an academic or hackathon project was failing. How did you adapt your plan to deliver on time? (STAR method)',
      'Describe a scenario where you disagreed with a team member’s technical decision. How did you resolve it constructively?',
      'Give an example of a project where you went beyond the initial assignment scope to create extra impact.',
    ],
    Internship: [
      'What was the most challenging bug you encountered in your coursework or personal projects, and how did you debug it?',
      'If given a completely unfamiliar tech stack or codebase on day one, what is your 48-hour ramp-up strategy?',
      'Tell me about an open-source project or repository you contributed to or admire.',
    ],
    Government: [
      'If assigned to modernize a district land-registry office facing legacy citizen queues, how would you design an accessible digital workflow?',
      'How would you balance strict regulatory protocol compliance with the urgency of a citizen grievance?',
      'What are the core national technology missions of MeitY or ISRO, and how does your engineering background contribute?',
    ],
    'Role-specific': [
      'Walk me through the lifecycle of an HTTP request from browser DNS lookup to server socket accept and TLS handshake.',
      'In a high-throughput microservice, when would you choose Redis caching over in-memory process dictionaries, and why?',
    ],
  };

  const currentQuestions = questionBank[selectedMode] || questionBank.Technical;
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const activeQuestion = currentQuestions[currentQIndex] || currentQuestions[0];

  const [candidateAnswer, setCandidateAnswer] = useState(
    'In a distributed ticketing service, to handle the race condition on the last available seat, I would use an atomic distributed lock or Redis conditional operations. Specifically, we can key by seat ID and execute an atomic DECR or SETNX with a lease TTL of 10 minutes while the user completes payment. If the seat count hits zero, subsequent requests immediately fail fast without locking the SQL database tables.'
  );

  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const [evaluation, setEvaluation] = useState<{
    score: number;
    feedback: string;
    technicalAccuracy: string;
    communicationClarity: string;
    strengths: string[];
    improvements: string[];
    betterAnswerSample: string;
    suggestedFollowUp: string;
  } | null>(null);

  // Web Speech API Voice Toggle
  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please type your response.');
      return;
    }

    if (isListening) {
      setIsListening(false);
    } else {
      try {
        const SpeechRecognition =
          (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setCandidateAnswer((prev) => (prev ? prev + ' ' + transcript : transcript));
          setIsListening(false);
        };
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
        recognition.start();
      } catch (e) {
        console.error(e);
        setIsListening(false);
      }
    }
  };

  const handleEvaluateAnswer = async () => {
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/gemini/mock-interview-eval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: activeQuestion,
          answer: candidateAnswer,
          mode: selectedMode,
          targetRole: student.branch || 'Software Engineer',
        }),
      });
      const data = await res.json();
      setEvaluation(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const nextQuestion = () => {
    if (currentQIndex < currentQuestions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setCandidateAnswer('');
      setEvaluation(null);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-6">
      {/* Header Banner - Royal Navy Card */}
      <div className="relative p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0B1536] via-[#10204E] to-[#1E3A8A] text-white border border-blue-400/20 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
            <Bot className="w-3.5 h-3.5 text-cyan-300" />
            <span>Interactive AI Interview Room</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            AI Mock Interview Drills
          </h1>
          <p className="text-xs sm:text-sm text-cyan-100/90 mt-1 max-w-xl">
            Simulate realistic hiring rounds with AI-generated follow-up questions, speech capture, and instant scoring rubrics.
          </p>

          {/* Mode Selector Tabs */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setSelectedMode(m.id);
                  setCurrentQIndex(0);
                  setEvaluation(null);
                }}
                className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                  selectedMode === m.id
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white border-white/40 shadow-md ring-2 ring-white/30'
                    : 'bg-white/10 hover:bg-white/20 text-cyan-100 border-white/15 backdrop-blur-md'
                }`}
              >
                <div
                  className={`text-xs font-bold ${
                    selectedMode === m.id ? 'text-white' : 'text-cyan-100'
                  }`}
                >
                  {m.label}
                </div>
                <div className="text-[10px] text-cyan-200/80 line-clamp-1 mt-0.5 font-medium">
                  {m.desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Question & Answer Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Question Box */}
        <div className="lg:col-span-12 p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3 font-semibold">
            <span className="text-cyan-700 uppercase tracking-wider">
              {selectedMode} Interview · Question {currentQIndex + 1} of {currentQuestions.length}
            </span>
            <button
              onClick={() => {
                if ('speechSynthesis' in window) {
                  const utter = new SpeechSynthesisUtterance(activeQuestion);
                  window.speechSynthesis.speak(utter);
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-cyan-700 text-xs transition-colors cursor-pointer border border-slate-200 shadow-2xs"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Read Question Aloud</span>
            </button>
          </div>

          <div className="text-base sm:text-lg font-heading font-extrabold text-[#0B1536] leading-relaxed">
            “{activeQuestion}”
          </div>

          {/* Answer Input */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
              <span>Your Candidate Response:</span>
              <button
                onClick={toggleListening}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-3.5 h-3.5" />
                    <span>Listening (Speak now)...</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Dictate Answer</span>
                  </>
                )}
              </button>
            </div>

            <textarea
              rows={5}
              value={candidateAnswer}
              onChange={(e) => setCandidateAnswer(e.target.value)}
              placeholder="Structure your answer clearly. Explain your logic, constraints, and results..."
              className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 resize-none leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-500 font-medium">
              Evaluation checks technical accuracy, clarity & structure
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleEvaluateAnswer}
                disabled={isEvaluating || !candidateAnswer.trim()}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 font-bold text-xs text-white flex items-center gap-2 shadow-md shadow-blue-500/20 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isEvaluating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>AI Grading Response...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-cyan-200" />
                    <span>Evaluate My Answer</span>
                  </>
                )}
              </button>

              {currentQIndex < currentQuestions.length - 1 && (
                <button
                  onClick={nextQuestion}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer border border-slate-200 shadow-2xs"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* AI Evaluation Card */}
        {evaluation && (
          <div className="lg:col-span-12 p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm space-y-4 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                  AI Interviewer Feedback
                </span>
                <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                  Performance Breakdown
                </h4>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text">
                  {evaluation.score}
                </span>
                <span className="text-xs text-slate-500 font-medium">/ 100 Score</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed p-4 rounded-2xl bg-slate-50 border border-slate-200 font-medium">
              {evaluation.feedback}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="font-bold text-emerald-800 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Strengths Demonstrated</span>
                </div>
                <ul className="space-y-1 text-slate-700 mt-2 font-medium">
                  {evaluation.strengths?.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <div className="font-bold text-amber-800 mb-1 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Areas to Refine</span>
                </div>
                <ul className="space-y-1 text-slate-700 mt-2 font-medium">
                  {evaluation.improvements?.map((i, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-600">•</span>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Suggested Follow-Up Question */}
            {evaluation.suggestedFollowUp && (
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                <div className="text-[11px] font-bold text-purple-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
                  <span>AI Follow-Up Challenge:</span>
                </div>
                <p className="text-xs font-bold text-slate-900">
                  “{evaluation.suggestedFollowUp}”
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
