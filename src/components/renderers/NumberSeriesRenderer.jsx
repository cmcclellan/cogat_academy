import React from 'react';

/**
 * Number Series & Pattern Renderer (Visual beads, block towers, and number jumps)
 */
export default function NumberSeriesRenderer({ data }) {
  const { seriesType = 'numbers', items = [], ruleHint } = data;

  if (seriesType === 'beads') {
    return (
      <div className="flex flex-col items-center justify-center p-3">
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 shadow-sm w-full max-w-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full font-heading">
              Bead Pattern Series
            </span>
            <span className="text-xs text-slate-400 font-medium">Find the next bead set</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4">
            {items.map((item, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center">
                  <div className="bg-white border border-slate-300 rounded-xl p-2.5 shadow-sm min-w-[55px] min-h-[55px] flex flex-wrap items-center justify-center gap-1">
                    {Array.from({ length: item.count }).map((_, bIdx) => (
                      <div
                        key={bIdx}
                        className="w-4 h-4 rounded-full shadow-sm"
                        style={{ backgroundColor: item.color || '#3b82f6' }}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-600 mt-1 font-heading">
                    {item.count}
                  </span>
                </div>
                {idx < items.length - 1 && (
                  <div className="text-slate-400 font-bold text-lg">➔</div>
                )}
              </React.Fragment>
            ))}

            <div className="text-slate-400 font-bold text-lg">➔</div>

            {/* Target Box */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-sky-50 border-2 border-dashed border-sky-400 rounded-xl flex items-center justify-center text-sky-500 font-bold text-2xl font-heading animate-pulse">
                ?
              </div>
              <span className="text-[10px] uppercase font-bold text-sky-600 mt-1">Next?</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (seriesType === 'blocks') {
    return (
      <div className="flex flex-col items-center justify-center p-3">
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 shadow-sm w-full max-w-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full font-heading">
              Tower Block Series
            </span>
            <span className="text-xs text-slate-400 font-medium">Watch how it grows</span>
          </div>

          <div className="flex items-end justify-center gap-4 bg-slate-50 border border-slate-200 rounded-xl p-4 min-h-[140px]">
            {items.map((count, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="flex flex-col-reverse items-center gap-0.5">
                  {Array.from({ length: count }).map((_, blockIdx) => (
                    <div
                      key={blockIdx}
                      className="w-8 h-5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded border border-purple-600 shadow-sm"
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700 mt-2 font-heading">
                  {count}
                </span>
              </div>
            ))}

            {/* Target Box */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-24 bg-sky-50 border-2 border-dashed border-sky-400 rounded-lg flex flex-col items-center justify-center text-sky-500 font-bold animate-pulse">
                <span className="text-2xl font-heading">?</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-sky-600 mt-2">Next?</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Number Series (Levels 8-18)
  return (
    <div className="flex flex-col items-center justify-center p-3">
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 shadow-sm w-full max-w-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-heading">
            Number Series Sequence
          </span>
          <span className="text-xs text-slate-400 font-medium">Find the rule</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4">
          {items.map((num, idx) => (
            <React.Fragment key={idx}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white border-2 border-slate-300 rounded-xl flex items-center justify-center font-bold text-lg sm:text-xl text-slate-800 shadow-sm font-heading">
                {num}
              </div>
              {idx < items.length - 1 && (
                <div className="text-slate-400 font-bold text-base">,</div>
              )}
            </React.Fragment>
          ))}

          <div className="text-slate-400 font-bold text-base">,</div>

          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-sky-50 border-2 border-dashed border-sky-400 rounded-xl flex items-center justify-center text-sky-500 font-bold text-2xl font-heading animate-pulse">
            ?
          </div>
        </div>
      </div>
    </div>
  );
}
