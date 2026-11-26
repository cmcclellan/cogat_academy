import React from 'react';
import { Scale, Train } from 'lucide-react';

/**
 * Balance Scale & Train Car Renderer for CogAT Number Puzzles
 */
export default function BalanceScaleRenderer({ data }) {
  const { type = 'balance', leftWeights = [], rightWeights = [], targetTotal, trainCars = [], equationRows = [] } = data;

  if (type === 'balance') {
    return (
      <div className="flex flex-col items-center justify-center p-3">
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 shadow-sm w-full max-w-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full flex items-center gap-1.5 font-heading">
              <Scale className="w-3.5 h-3.5" />
              Make Both Sides Equal
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              Scale is Balanced ( = )
            </span>
          </div>

          {/* SVG Balance Scale Graphic */}
          <div className="relative w-full h-48 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-2 shadow-inner">
            <svg viewBox="0 0 400 200" className="w-full h-full max-w-md select-none">
              {/* Fulcrum base */}
              <polygon points="200,140 185,185 215,185" fill="#475569" stroke="#334155" strokeWidth="2" />
              <rect x="170" y="183" width="60" height="7" rx="3" fill="#334155" />

              {/* Pivot circle */}
              <circle cx="200" cy="140" r="7" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />

              {/* Horizontal Beam */}
              <line x1="60" y1="90" x2="340" y2="90" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />

              {/* Left Pan Hangers & Pan */}
              <line x1="80" y1="90" x2="60" y2="135" stroke="#94a3b8" strokeWidth="2" />
              <line x1="80" y1="90" x2="100" y2="135" stroke="#94a3b8" strokeWidth="2" />
              <ellipse cx="80" cy="138" rx="45" ry="10" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />

              {/* Right Pan Hangers & Pan */}
              <line x1="320" y1="90" x2="300" y2="135" stroke="#94a3b8" strokeWidth="2" />
              <line x1="320" y1="90" x2="340" y2="135" stroke="#94a3b8" strokeWidth="2" />
              <ellipse cx="320" cy="138" rx="45" ry="10" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />

              {/* Equals sign in center indicator */}
              <g transform="translate(193, 70)">
                <circle cx="7" cy="0" r="14" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
                <text x="7" y="5" textAnchor="middle" fill="#0284c7" fontSize="16" fontWeight="bold">=</text>
              </g>

              {/* Left Pan Weights */}
              {leftWeights.map((w, i) => {
                const totalW = leftWeights.length;
                const offset = (i - (totalW - 1) / 2) * 32;
                return (
                  <g key={`l-${i}`} transform={`translate(${80 + offset}, 115)`}>
                    <rect x="-14" y="-14" width="28" height="28" rx="6" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
                    <text x="0" y="5" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">
                      {w}
                    </text>
                  </g>
                );
              })}

              {/* Right Pan Weights */}
              {rightWeights.map((w, i) => {
                const totalW = rightWeights.length;
                const offset = (i - (totalW - 1) / 2) * 32;
                const isUnknown = w === '?';
                return (
                  <g key={`r-${i}`} transform={`translate(${320 + offset}, 115)`}>
                    {isUnknown ? (
                      <>
                        <rect x="-14" y="-14" width="28" height="28" rx="6" fill="#fef08a" stroke="#eab308" strokeWidth="2.5" strokeDasharray="3,2" />
                        <text x="0" y="6" textAnchor="middle" fill="#ca8a04" fontSize="18" fontWeight="bold">?</text>
                      </>
                    ) : (
                      <>
                        <rect x="-14" y="-14" width="28" height="28" rx="6" fill="#10b981" stroke="#047857" strokeWidth="2" />
                        <text x="0" y="5" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">{w}</text>
                      </>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'train') {
    return (
      <div className="flex flex-col items-center justify-center p-3">
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 shadow-sm w-full max-w-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full flex items-center gap-1.5 font-heading">
              <Train className="w-3.5 h-3.5" />
              Number Train Puzzle
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              The engine equals the cars!
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-center gap-3">
            {/* Engine Car */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-16 bg-red-500 border-2 border-red-700 rounded-lg flex flex-col items-center justify-center text-white font-bold shadow relative">
                <span className="text-[10px] uppercase font-semibold text-red-100">Engine</span>
                <span className="text-2xl font-heading">{targetTotal}</span>
                {/* Wheels */}
                <div className="absolute -bottom-2 flex gap-3">
                  <div className="w-4 h-4 bg-slate-800 rounded-full border border-slate-600"></div>
                  <div className="w-4 h-4 bg-slate-800 rounded-full border border-slate-600"></div>
                </div>
              </div>
            </div>

            <div className="text-slate-400 font-bold text-2xl">=</div>

            {/* Train Cars */}
            {trainCars.map((car, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center font-bold shadow relative ${
                    car === '?' 
                      ? 'bg-amber-100 border-2 border-dashed border-amber-400 text-amber-700' 
                      : 'bg-emerald-500 border-2 border-emerald-700 text-white'
                  }`}>
                    <span className="text-[10px] uppercase font-semibold opacity-80">Car {idx + 1}</span>
                    <span className="text-2xl font-heading">{car}</span>
                    <div className="absolute -bottom-2 flex gap-2">
                      <div className="w-3.5 h-3.5 bg-slate-800 rounded-full border border-slate-600"></div>
                      <div className="w-3.5 h-3.5 bg-slate-800 rounded-full border border-slate-600"></div>
                    </div>
                  </div>
                </div>
                {idx < trainCars.length - 1 && (
                  <div className="text-slate-400 font-bold text-xl">+</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Upper Grade Equation Balance System (Level 9+)
  if (type === 'equation') {
    return (
      <div className="flex flex-col items-center justify-center p-3">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-4 shadow-sm w-full max-w-lg">
          <div className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full mb-3 inline-block font-heading">
            Shape Equations
          </div>
          <div className="space-y-3 bg-slate-50 border border-slate-200 rounded-xl p-4">
            {equationRows.map((row, idx) => (
              <div key={idx} className="flex items-center justify-center gap-3 bg-white p-2.5 rounded-lg border border-slate-200 text-lg font-bold text-slate-700">
                {row}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
