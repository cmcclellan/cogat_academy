import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { calculateCogATScore, BATTERIES } from '../data/cogatData';
import { Trophy, CheckCircle, XCircle, RotateCcw, ArrowRight, Award, Compass, BookOpen } from 'lucide-react';

export default function ScoreReport({
  score,
  total,
  batteryScores,
  gradeName,
  levelName,
  userAnswers,
  questions,
  onRestart,
  onReviewQuestion
}) {
  const scoreData = calculateCogATScore(score, total);

  useEffect(() => {
    // Fire celebratory confetti for good effort!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const getStanineBadgeColor = (stanine) => {
    if (stanine >= 8) return 'bg-emerald-500 text-white';
    if (stanine >= 6) return 'bg-sky-500 text-white';
    if (stanine >= 4) return 'bg-amber-500 text-white';
    return 'bg-slate-500 text-white';
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6 animate-pop">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-br from-sky-600 via-indigo-600 to-purple-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl text-center relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 text-9xl">🧠</div>
        
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold font-heading mb-3">
          <Trophy className="w-4 h-4 text-amber-300" />
          <span>CogAT Form 7/8 Assessment Complete</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold font-heading">
          Terrific Effort on the CogAT! 🎉
        </h2>
        <p className="text-sky-100 text-sm mt-1 max-w-md mx-auto font-medium">
          Official Score Profile Estimate for {gradeName} ({levelName})
        </p>

        {/* 3 Core CogAT Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6">
          {/* Stanine Score */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
            <span className="text-[11px] uppercase font-bold text-sky-200 block font-heading">
              Estimated Stanine
            </span>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-4xl font-bold font-heading">{scoreData.stanine}</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded text-sky-100 font-semibold">
                of 9
              </span>
            </div>
            <span className="text-[11px] text-sky-200 mt-1 block">
              {scoreData.stanine >= 7 ? '⭐ Gifted / Advanced' : 'Solid Performance'}
            </span>
          </div>

          {/* Percentile Rank */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
            <span className="text-[11px] uppercase font-bold text-sky-200 block font-heading">
              Age Percentile Rank (APR)
            </span>
            <span className="text-2xl sm:text-3xl font-bold font-heading block mt-1">
              {scoreData.percentile}
            </span>
            <span className="text-[11px] text-sky-200 mt-1 block">
              Compared to national norms
            </span>
          </div>

          {/* Standard Age Score (SAS) */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
            <span className="text-[11px] uppercase font-bold text-sky-200 block font-heading">
              Standard Age Score (SAS)
            </span>
            <span className="text-4xl font-bold font-heading block mt-1">
              ~{scoreData.sas}
            </span>
            <span className="text-[11px] text-sky-200 mt-1 block">
              Average is 100 (SD = 16)
            </span>
          </div>
        </div>
      </div>

      {/* Battery-by-Battery Performance Breakdown */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-sm">
        <h3 className="text-base font-bold font-heading text-slate-800 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-500" />
          <span>Battery Performance Breakdown</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {BATTERIES.filter(b => b.id !== 'all').map(battery => {
            const bData = batteryScores[battery.id] || { correct: 0, total: 0 };
            const pct = bData.total > 0 ? Math.round((bData.correct / bData.total) * 100) : 0;

            return (
              <div key={battery.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <span className="text-xs font-bold text-slate-700 block font-heading">
                  {battery.name}
                </span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl font-bold font-heading text-slate-900">
                    {bData.correct} / {bData.total}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    pct >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {pct}%
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-3">
                  <div
                    className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actionable Parent Coaching Suggestions */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-6">
        <h3 className="text-base font-bold font-heading text-amber-900 mb-2 flex items-center gap-2">
          <Compass className="w-5 h-5 text-amber-600" />
          <span>Next Steps for CogAT Success</span>
        </h3>
        <ul className="text-xs sm:text-sm text-amber-900 space-y-2 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="font-bold text-amber-700">•</span>
            <span><strong>Celebrate the cognitive growth:</strong> CogAT tests reasoning ability, not memorized facts. Praise your child's effort and logical thinking!</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-amber-700">•</span>
            <span><strong>Target Spatial Reasoning:</strong> For 2nd graders, <em>Paper Folding</em> is usually the most challenging subtest. Use ordinary paper napkins or square sticky notes at dinner to practice real folds!</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-amber-700">•</span>
            <span><strong>Use Process of Elimination:</strong> Teach your child to find at least two "obviously silly" choices first and cross them out!</span>
          </li>
        </ul>
      </div>

      {/* Question by Question Review */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-sm">
        <h3 className="text-base font-bold font-heading text-slate-800 mb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-sky-500" />
          <span>Review All Questions & Explanations</span>
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Click on any question below to inspect its cognitive rule and parent coaching tips.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
          {questions.map((q, idx) => {
            const userAns = userAnswers[q.id];
            const isCorrect = userAns === q.correctAnswer;
            const isAnswered = userAns !== undefined;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onReviewQuestion(idx)}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold font-heading transition ${
                  !isAnswered
                    ? 'bg-slate-100 border-slate-300 text-slate-500'
                    : isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                    : 'bg-rose-50 border-rose-300 text-rose-800 hover:bg-rose-100'
                }`}
              >
                <span>Q{idx + 1}</span>
                {isCorrect ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Restart / Practice More Button */}
      <div className="text-center pt-2">
        <button
          onClick={onRestart}
          type="button"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-sky-500 hover:bg-sky-600 text-white font-heading font-bold text-base rounded-2xl shadow-lg transition transform active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Start Another Practice Session</span>
        </button>
      </div>
    </div>
  );
}
