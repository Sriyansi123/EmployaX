import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  MapPin,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  Edit2,
  CheckCircle2,
  Save,
} from 'lucide-react';
import { StudentProfile } from '../../types';

interface StudentProfileViewProps {
  student: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
  onNavigate: (route: string) => void;
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({
  student,
  onUpdateProfile,
  onNavigate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(student);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(form);
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 py-6">
      {/* Header Banner - Royal Navy Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B1536] via-[#10204E] to-[#1E3A8A] text-white border border-blue-400/20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-extrabold shadow-md">
              {student.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-heading font-extrabold text-white">
                  {student.fullName}
                </h1>
                <span className="p-1 rounded-full bg-cyan-400/20 text-cyan-200">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>
              <p className="text-xs text-cyan-200 mt-0.5 font-semibold">
                {student.degree} in {student.branch}
              </p>
              <p className="text-[11px] text-cyan-100/80 font-medium">
                {student.college} · Class of {student.expectedGraduationYear}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5 text-cyan-300" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
            <button
              onClick={() => onNavigate('/verified-passport')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-xs font-bold text-white shadow-md shadow-blue-500/30 transition-all cursor-pointer ring-1 ring-white/30"
            >
              View Passport
            </button>
          </div>
        </div>

        {savedSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-xs text-emerald-200 flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>Profile details updated successfully!</span>
          </div>
        )}
      </div>

      {/* Profile Form / Display */}
      {isEditing ? (
        <form onSubmit={handleSave} className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-2">Edit Student Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-blue-500 outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Email ID</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-blue-500 outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Phone</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-blue-500 outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">College Name</label>
              <input
                type="text"
                value={form.college}
                onChange={(e) => setForm({ ...form, college: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-blue-500 outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Current CGPA</label>
              <input
                type="text"
                value={form.cgpa}
                onChange={(e) => setForm({ ...form, cgpa: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-blue-500 outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Expected Graduation Year</label>
              <input
                type="text"
                value={form.expectedGraduationYear}
                onChange={(e) => setForm({ ...form, expectedGraduationYear: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-blue-500 outline-none font-medium"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-xs font-bold text-white flex items-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm space-y-3">
            <div className="text-xs font-bold text-cyan-800 uppercase tracking-wider">
              Academic Credentials
            </div>
            <div className="space-y-2 text-xs text-slate-700 font-medium">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">College / Institute:</span>
                <span className="font-bold text-slate-900 text-right">{student.college}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Degree & Branch:</span>
                <span className="font-bold text-slate-900">{student.degree} in {student.branch}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Current Semester:</span>
                <span className="font-bold text-slate-900">{student.currentYear} ({student.semester})</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Cumulative CGPA:</span>
                <span className="font-bold text-cyan-700">{student.cgpa} / 10</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm space-y-3">
            <div className="text-xs font-bold text-blue-800 uppercase tracking-wider">
              Contact & Identity Verification
            </div>
            <div className="space-y-2 text-xs text-slate-700 font-medium">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Email:</span>
                <span className="font-bold text-slate-900">{student.email}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Phone:</span>
                <span className="font-bold text-slate-900">{student.phone}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Location:</span>
                <span className="font-bold text-slate-900">{student.city}, {student.state}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Discipline Category:</span>
                <span className="font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">{student.category}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
