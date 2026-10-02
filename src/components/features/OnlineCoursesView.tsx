import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Clock,
  BookOpen,
  Award,
  Star,
  CheckCircle2,
  Play,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { sampleCourses } from '../../data/mockData';
import { StudentProfile, CourseItem } from '../../types';

interface OnlineCoursesViewProps {
  student: StudentProfile;
}

export const OnlineCoursesView: React.FC<OnlineCoursesViewProps> = ({ student }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'my-courses' | 'recommended'>('all');
  const [courses, setCourses] = useState<CourseItem[]>(sampleCourses);
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);

  // Category relevant courses
  const categoryCourses = courses.filter(
    (c) => c.category === student.category || activeFilter === 'all'
  );

  // Filter based on activeFilter
  const displayCourses = categoryCourses.filter((c) => {
    if (activeFilter === 'my-courses') return c.enrolled;
    return true;
  });

  const handleEnrollOrContinue = (course: CourseItem) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === course.id ? { ...c, enrolled: true, progress: c.progress || 10 } : c))
    );
    setSelectedCourse({ ...course, enrolled: true, progress: course.progress || 10 });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-6">
      {/* Header Banner - Royal Navy Card */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0B1536] via-[#10204E] to-[#1E3A8A] text-white border border-blue-400/20 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-300" />
            <span>Curriculum & Micro-credentials</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            Online Courses & Skill Modules
          </h1>
          <p className="text-xs sm:text-sm text-cyan-100/90 mt-1 max-w-xl">
            Industry-aligned coursework tailored to {student.category.toUpperCase()} disciplines with verified certificates.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="relative z-10 flex items-center gap-1.5 p-1 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md self-start sm:self-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-sm ring-1 ring-white/30'
                : 'text-cyan-100 hover:text-white hover:bg-white/10'
            }`}
          >
            All Courses
          </button>
          <button
            onClick={() => setActiveFilter('my-courses')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'my-courses'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-sm ring-1 ring-white/30'
                : 'text-cyan-100 hover:text-white hover:bg-white/10'
            }`}
          >
            My Learning ({courses.filter((c) => c.enrolled).length})
          </button>
        </div>
      </div>

      {/* AI Recommended For You Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-700 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-cyan-600" />
            <span>AI Recommended For You</span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500">
            Targeting: {student.branch} & Career Blueprint
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-sm font-bold text-slate-900">
              System Design & High-Concurrency Architecture
            </div>
            <p className="text-xs text-slate-600 font-medium">
              <span className="text-cyan-700 font-bold">Why recommended:</span> Your Skill-Gap analysis identified system design and Redis distributed locking as key hurdles in Tier-1 technical screenings.
            </p>
          </div>
          <button
            onClick={() => {
              const rec = courses.find((c) => c.id === 'course_02');
              if (rec) handleEnrollOrContinue(rec);
            }}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-xs font-bold text-white shrink-0 shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer"
          >
            Start Learning Now →
          </button>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayCourses.map((course) => (
          <div
            key={course.id}
            className="p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4 shadow-sm"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 uppercase">
                  {course.level} · {course.category}
                </span>

                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{course.rating}</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {course.title}
              </h3>
              <div className="text-xs text-cyan-700 font-bold">
                {course.provider}
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                {course.description}
              </p>

              {/* Course Meta Info */}
              <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap pt-1 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {course.duration}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  {course.lessonsCount} lessons
                </span>
                <span>•</span>
                <span className="text-emerald-700 font-bold">
                  {course.isFree ? 'Free (Full Access)' : 'Scholarship Covered'}
                </span>
              </div>

              {/* Progress bar if enrolled */}
              {course.enrolled && (
                <div className="pt-2">
                  <div className="flex justify-between text-[11px] text-slate-600 mb-1 font-semibold">
                    <span>Course Progress</span>
                    <span className="font-mono text-cyan-700">{course.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Skills & CTA */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1">
                {course.skills.slice(0, 3).map((sk) => (
                  <span
                    key={sk}
                    className="px-2 py-0.5 rounded-lg bg-slate-100 text-[10px] font-semibold text-slate-700 border border-slate-200"
                  >
                    {sk}
                  </span>
                ))}
              </div>

              <button
                onClick={() => handleEnrollOrContinue(course)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 active:scale-95 cursor-pointer ${
                  course.enrolled
                    ? 'bg-slate-100 hover:bg-slate-200 text-cyan-800 border border-slate-200'
                    : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-md shadow-blue-500/20'
                }`}
              >
                {course.enrolled ? (
                  <>
                    <Play className="w-3 h-3 fill-cyan-700 text-cyan-700" />
                    <span>Continue Learning</span>
                  </>
                ) : (
                  <>
                    <span>Start Course</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Course Detail Modal / Syllabus Inspector */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          <div className="max-w-xl w-full bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl relative space-y-4 text-slate-900">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-cyan-700 uppercase tracking-wider">
                  Interactive Course Syllabus
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {selectedCourse.title}
                </h3>
                <div className="text-xs text-slate-500 font-medium">{selectedCourse.provider}</div>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-xs text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {selectedCourse.syllabus.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-800 flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-slate-800 font-semibold">{item.title}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">{item.duration}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-emerald-700 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Includes EmployaX Verified Certificate
              </span>
              <button
                onClick={() => {
                  alert(`Resuming module: ${selectedCourse.title}`);
                  setSelectedCourse(null);
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Launch Virtual Lab
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
