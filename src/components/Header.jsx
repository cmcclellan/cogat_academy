import React from 'react';
import { GRADE_LEVELS, BATTERIES, PRACTICE_TESTS } from '../data/cogatData';
import { Timer, BookOpen, Volume2, VolumeX, Award, Sparkles, Zap } from 'lucide-react';

export default function Header({
  selectedGrade,
  onSelectGrade,
  selectedTest,
  onSelectTest,
  selectedBattery,
  onSelectBattery,
  testMode,
  onToggleTestMode,
  autoReadAudio,
  onToggleAutoRead,
  timeLeft,
  totalScore,
  answeredCount,
  totalQuestions
}) {
  const currentGradeObj = GRADE_LEVELS.find(g => g.id === selectedGrade) || GRADE_LEVELS[2];
  const currentTestObj = PRACTICE_TESTS.find(t => t.id === selectedTest) || PRACTICE_TESTS[0];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3">
        {/* Top Tier: Title, Grade Selector, Test Selector, Mode, Auto-Read */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white text-2xl shadow-md">
              🧠
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg sm:text-xl font-bold font-heading text-slate-800 tracking-tight">
                  CogAT Prep Academy
                </h1>
                <span className="bg-amber-100 text-amber-800 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border border-amber-300">
                  Free
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                {currentGradeObj.name} ({currentGradeObj.level}) • <span className="text-sky-600 font-bold">{currentTestObj.name}</span>
              </p>
            </div>
          </div>

          {/* Controls: Grade selector, Test selector, Mode switcher, Auto-Audio */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {/* Grade Selector */}
            <select
              value={selectedGrade}
              onChange={(e) => onSelectGrade(e.target.value)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold font-heading py-2 px-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer transition"
              title="Select Grade Level"
            >
              {GRADE_LEVELS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name} ({g.level}) {g.id === '2' ? '⭐ Recommended' : ''}
                </option>
              ))}
            </select>

            {/* Test Selector Dropdown */}
            <select
              value={selectedTest}
              onChange={(e) => onSelectTest(e.target.value)}
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs sm:text-sm font-bold font-heading py-2 px-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer transition"
              title="Select Practice Test or Infinite Generator"
            >
              {PRACTICE_TESTS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.badge})
                </option>
              ))}
            </select>

            {/* Mode Switcher: Practice vs Timed */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
              <button
                type="button"
                onClick={() => onToggleTestMode('practice')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold font-heading transition ${
                  testMode === 'practice'
                    ? 'bg-white text-sky-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Practice</span>
              </button>
              <button
                type="button"
                onClick={() => onToggleTestMode('timed')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold font-heading transition ${
                  testMode === 'timed'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Timer className="w-3.5 h-3.5" />
                <span>Timed Exam</span>
              </button>
            </div>

            {/* Auto-read speech toggle */}
            <button
              type="button"
              onClick={onToggleAutoRead}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition ${
                autoReadAudio
                  ? 'bg-sky-50 text-sky-700 border-sky-300'
                  : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
              }`}
              title={autoReadAudio ? "Voice read-aloud is ON" : "Voice read-aloud is OFF"}
            >
              {autoReadAudio ? <Volume2 className="w-4 h-4 text-sky-600" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden lg:inline">{autoReadAudio ? 'Voice ON' : 'Voice OFF'}</span>
            </button>
          </div>
        </div>

        {/* Lower Tier: Battery Selector Pills & Progress */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5">
            {BATTERIES.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => onSelectBattery(b.id)}
                className={`text-xs font-bold font-heading px-3 py-1 rounded-full border transition ${
                  selectedBattery === b.id
                    ? 'bg-sky-500 text-white border-sky-600 shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                {b.name.split(' (')[0]}
              </button>
            ))}

            {selectedTest === 'infinite' && (
              <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-1 rounded-full border border-amber-300 animate-pulse">
                <Zap className="w-3 h-3 text-amber-600" />
                Infinite Questions Active
              </span>
            )}
          </div>

          {/* Status Indicators */}
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
            {testMode === 'timed' && (
              <div className="flex items-center gap-1.5 text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full font-mono font-bold">
                <Timer className="w-3.5 h-3.5" />
                <span>Time: {formatTime(timeLeft)}</span>
              </div>
            )}

            <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-full">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Score: {totalScore} / {answeredCount}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
