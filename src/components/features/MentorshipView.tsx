import React, { useState } from 'react';
import {
  Users,
  Calendar,
  Star,
  CheckCircle2,
  Clock,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { sampleMentors } from '../../data/mockData';
import { StudentProfile, MentorItem } from '../../types';

interface MentorshipViewProps {
  student: StudentProfile;
}

export const MentorshipView: React.FC<MentorshipViewProps> = ({ student }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [bookingMentor, setBookingMentor] = useState<MentorItem | null>(null);
  const [selectedSlot, setSelectedSlot] = useState('Thursday, 06:00 PM IST');
  const [sessionTopic, setSessionTopic] = useState(
    'System Architecture Review & Tier-1 FAANG Mock Interview Practice'
  );
  const [confirmedBookings, setConfirmedBookings] = useState<
    { mentorName: string; role: string; slot: string; topic: string }[]
  >([
    {
      mentorName: 'Deepak Roy',
      role: 'Senior Engineering Manager @ Razorpay',
      slot: 'Saturday, 11:00 AM IST (Confirmed)',
      topic: 'Microservices Design & Resume Teardown',
    },
  ]);

  const [bookingSuccess, setBookingSuccess] = useState(false);

  const filteredMentors = sampleMentors.filter((m) => {
    if (selectedFilter === 'All') return true;
    return m.category.toLowerCase() === selectedFilter.toLowerCase();
  });

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingMentor) return;

    setConfirmedBookings([
      {
        mentorName: bookingMentor.name,
        role: `${bookingMentor.role} @ ${bookingMentor.organization}`,
        slot: selectedSlot,
        topic: sessionTopic,
      },
      ...confirmedBookings,
    ]);

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingMentor(null);
    }, 1800);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-6">
      {/* Header Banner - Royal Navy Card */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0B1536] via-[#10204E] to-[#1E3A8A] text-white border border-blue-400/20 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-300 uppercase tracking-wider mb-1">
            <Users className="w-3.5 h-3.5 text-rose-300" />
            <span>Human Expert Advisory</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            1-on-1 Student Mentorship
          </h1>
          <p className="text-xs sm:text-sm text-cyan-100/90 mt-1 max-w-xl">
            Connect with verified senior leaders from Google Cloud, Razorpay, AIIMS, and Sequoia portfolio startups.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="relative z-10 flex flex-wrap gap-1.5 p-1 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md self-start sm:self-auto">
          {['All', 'Technical', 'Non-Technical', 'Medical'].map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === f
                  ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-sm ring-1 ring-white/30'
                  : 'text-cyan-100 hover:text-white hover:bg-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Confirmed Sessions Bar */}
      {confirmedBookings.length > 0 && (
        <div className="p-5 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm space-y-3">
          <div className="text-xs font-bold text-cyan-800 uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-600" />
            <span>Your Upcoming 1-on-1 Sessions ({confirmedBookings.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {confirmedBookings.map((b, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1 shadow-2xs"
              >
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>{b.mentorName}</span>
                  <span className="text-[10px] text-emerald-700 font-bold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">Confirmed</span>
                </div>
                <div className="text-slate-600 font-medium text-[11px]">{b.role}</div>
                <div className="text-cyan-700 font-bold text-[11px] font-mono pt-1">
                  📅 {b.slot}
                </div>
                <div className="text-slate-500 text-[11px] italic font-medium">
                  Focus: {b.topic}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mentor Directory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 hover:border-rose-300 transition-all flex flex-col justify-between space-y-4 shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-start gap-4">
                <img
                  src={mentor.avatarUrl}
                  alt={mentor.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-200 shrink-0 shadow-2xs"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">
                      {mentor.name}
                    </h3>
                    <div className="flex items-center text-amber-500 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{mentor.rating}</span>
                    </div>
                  </div>
                  <div className="text-xs text-cyan-700 font-bold">
                    {mentor.role}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {mentor.organization}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {mentor.bio}
              </p>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {mentor.expertise.map((ex) => (
                  <span
                    key={ex}
                    className="px-2 py-0.5 rounded-lg bg-slate-100 text-[10px] font-semibold text-slate-700 border border-slate-200"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>

            {/* Availability & Booking Action */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-600" />
                <span>{mentor.availability}</span>
              </div>

              <button
                onClick={() => setBookingMentor(mentor)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-xs font-bold text-white shadow-md shadow-rose-500/20 active:scale-95 transition-all cursor-pointer"
              >
                Request Session
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {bookingMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fade-in">
          <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl relative space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-rose-600" />
              <span>Book 1-on-1 with {bookingMentor.name}</span>
            </h3>

            {bookingSuccess ? (
              <div className="p-6 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Session Confirmed!</h4>
                <p className="text-xs text-slate-600 font-medium">
                  Calendar invitation and preparation guide dispatched to your registered student email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Select Available Slot
                  </label>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-rose-500 outline-none cursor-pointer"
                  >
                    <option value="Thursday, 06:00 PM IST">Thursday, 06:00 PM IST</option>
                    <option value="Friday, 07:30 PM IST">Friday, 07:30 PM IST</option>
                    <option value="Saturday, 11:00 AM IST">Saturday, 11:00 AM IST</option>
                    <option value="Sunday, 04:00 PM IST">Sunday, 04:00 PM IST</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Discussion Focus / Goals for the Session
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={sessionTopic}
                    onChange={(e) => setSessionTopic(e.target.value)}
                    placeholder="Describe specific questions, architecture dilemmas, or target roles..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-rose-500 outline-none"
                  />
                </div>

                <div className="p-3 rounded-2xl bg-cyan-50 border border-cyan-100 text-[11px] text-cyan-800 font-medium">
                  ✓ Includes pre-session ATS resume sync and mock interview questions
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setBookingMentor(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-bold shadow-md shadow-rose-500/20 cursor-pointer"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
