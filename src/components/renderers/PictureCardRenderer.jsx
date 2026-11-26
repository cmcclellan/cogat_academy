import React from 'react';

/**
 * Picture Card Component for Primary Verbal Batteries (Picture Analogies, Picture Classification, Sentence Completion)
 */
export function PictureCard({ emoji, label, caption, isSelected, onClick, isEliminated, optionLetter, size = 'normal' }) {
  const sizeClasses = size === 'large' 
    ? 'w-24 h-24 sm:w-28 sm:h-28 text-4xl sm:text-5xl' 
    : 'w-20 h-20 sm:w-24 sm:h-24 text-3xl sm:text-4xl';

  return (
    <div
      onClick={!isEliminated ? onClick : undefined}
      className={`relative flex flex-col items-center justify-center p-2 rounded-2xl border-2 transition-all cursor-pointer select-none ${
        isEliminated
          ? 'opacity-30 line-through bg-slate-100 border-slate-300 pointer-events-none'
          : isSelected
          ? 'bg-sky-50 border-sky-500 shadow-md ring-2 ring-sky-300 scale-105'
          : 'bg-white border-slate-200 hover:border-sky-300 hover:shadow-sm'
      }`}
    >
      {optionLetter && (
        <span className={`absolute -top-2.5 -left-2.5 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center border ${
          isSelected ? 'bg-sky-500 text-white border-sky-600' : 'bg-slate-100 text-slate-700 border-slate-300'
        }`}>
          {optionLetter}
        </span>
      )}

      <div className={`${sizeClasses} flex items-center justify-center filter drop-shadow-sm transition-transform hover:scale-110`}>
        <span>{emoji}</span>
      </div>

      <span className="text-xs font-bold text-slate-700 mt-1 text-center font-heading">
        {label}
      </span>

      {caption && (
        <span className="text-[10px] text-slate-400 text-center font-medium">
          {caption}
        </span>
      )}
    </div>
  );
}

/**
 * Picture Analogy 2x2 Matrix Renderer
 */
export function PictureAnalogyRenderer({ topPair, bottomStimulus }) {
  return (
    <div className="flex flex-col items-center justify-center p-3">
      <div className="bg-white border-2 border-slate-200 rounded-2xl shadow-sm p-4 inline-block">
        <div className="grid grid-cols-2 gap-4 relative">
          {/* Top Left Picture */}
          <div className="flex flex-col items-center bg-slate-50 border border-slate-200 rounded-xl p-3 shadow-inner">
            <span className="text-4xl sm:text-5xl">{topPair[0].emoji}</span>
            <span className="text-xs font-bold text-slate-700 mt-1 font-heading">{topPair[0].label}</span>
          </div>

          {/* Top Right Picture */}
          <div className="flex flex-col items-center bg-slate-50 border border-slate-200 rounded-xl p-3 shadow-inner">
            <span className="text-4xl sm:text-5xl">{topPair[1].emoji}</span>
            <span className="text-xs font-bold text-slate-700 mt-1 font-heading">{topPair[1].label}</span>
          </div>

          {/* Analogous relation pill */}
          <div className="col-span-2 border-b-2 border-dashed border-sky-300 my-1 relative">
            <span className="absolute left-1/2 -top-2.5 -translate-x-1/2 bg-sky-100 text-sky-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-sky-200">
              goes with
            </span>
          </div>

          {/* Bottom Left Picture */}
          <div className="flex flex-col items-center bg-slate-50 border border-slate-200 rounded-xl p-3 shadow-inner">
            <span className="text-4xl sm:text-5xl">{bottomStimulus.emoji}</span>
            <span className="text-xs font-bold text-slate-700 mt-1 font-heading">{bottomStimulus.label}</span>
          </div>

          {/* Bottom Right Target Box */}
          <div className="flex flex-col items-center justify-center bg-sky-50 border-2 border-dashed border-sky-400 rounded-xl p-3">
            <span className="text-3xl font-heading text-sky-500 animate-pulse">?</span>
            <span className="text-[10px] uppercase font-bold text-sky-600 mt-1">Which one?</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Picture Classification Stimulus Group Renderer
 */
export function PictureClassificationRenderer({ items }) {
  return (
    <div className="flex flex-col items-center justify-center p-3">
      <div className="bg-white border-2 border-emerald-200 rounded-2xl shadow-sm p-4 w-full max-w-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-heading flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            These 3 pictures belong together:
          </span>
          <span className="text-xs text-slate-400 font-medium">Group Pattern</span>
        </div>

        <div className="grid grid-cols-3 gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3 shadow-inner">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center bg-white border border-slate-200 rounded-lg p-2.5 shadow-sm">
              <span className="text-4xl sm:text-5xl">{item.emoji}</span>
              <span className="text-xs font-bold text-slate-700 mt-1 text-center font-heading">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
