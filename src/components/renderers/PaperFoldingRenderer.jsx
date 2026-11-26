import React, { useState } from 'react';
import { Eye, RotateCcw, Sparkles } from 'lucide-react';

/**
 * Renders an unfolded square sheet of paper with hole punch dots
 */
export function UnfoldedPaperChoice({ holes = [], creases = [], size = 80 }) {
  const center = 50;
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full max-w-[85px] max-h-[85px] mx-auto select-none">
      {/* Base square paper */}
      <rect x="5" y="5" width="90" height="90" fill="#f8fafc" stroke="#334155" strokeWidth="2.5" rx="3" />

      {/* Crease fold lines */}
      {creases.includes('vertical') && (
        <line x1="50" y1="5" x2="50" y2="95" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
      )}
      {creases.includes('horizontal') && (
        <line x1="5" y1="50" x2="95" y2="50" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
      )}
      {creases.includes('diagonal-main') && (
        <line x1="5" y1="5" x2="95" y2="95" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
      )}

      {/* Hole punch circles */}
      {holes.map((h, i) => (
        <g key={i}>
          {/* Outer circle */}
          <circle cx={h.x} cy={h.y} r={h.r || 5} fill="#0f172a" />
          {/* Inner ring highlight */}
          <circle cx={h.x} cy={h.y} r={(h.r || 5) * 0.4} fill="#ffffff" />
        </g>
      ))}
    </svg>
  );
}

/**
 * Paper Folding Renderer
 * Renders the fold sequence and punch action, with an optional interactive unfold demonstration
 */
export default function PaperFoldingRenderer({ data }) {
  const { steps, finalUnfoldedHoles, creases = ['vertical', 'horizontal'] } = data;
  const [showDemo, setShowDemo] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  const triggerAnimation = () => {
    setShowDemo(true);
    setDemoStep(1);
    setTimeout(() => setDemoStep(2), 1200);
    setTimeout(() => setDemoStep(3), 2400);
  };

  const resetDemo = () => {
    setShowDemo(false);
    setDemoStep(0);
  };

  return (
    <div className="flex flex-col items-center justify-center p-3">
      {/* Folding Sequence Cards */}
      <div className="flex flex-wrap items-center justify-center gap-4 bg-white border-2 border-slate-200 rounded-2xl p-4 shadow-sm">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold text-slate-500 mb-1 font-heading">
                Step {idx + 1}
              </span>
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-slate-50 border border-slate-300 rounded-xl flex items-center justify-center p-2 relative shadow-inner">
                {renderStepGraphic(step)}
              </div>
              <span className="text-[11px] text-slate-600 font-medium mt-1 text-center max-w-[110px]">
                {step.caption}
              </span>
            </div>

            {idx < steps.length - 1 && (
              <div className="text-slate-400 font-bold text-xl self-center hidden sm:block">
                ➔
              </div>
            )}
          </React.Fragment>
        ))}

        {/* Question Target Paper */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-semibold text-sky-600 mb-1 font-heading">
            Unfolded?
          </span>
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-sky-50 border-2 border-dashed border-sky-400 rounded-xl flex flex-col items-center justify-center p-2 shadow-inner">
            <span className="text-3xl font-heading text-sky-500 animate-pulse">?</span>
            <span className="text-[10px] uppercase font-bold text-sky-600 mt-1">Open Up</span>
          </div>
          <span className="text-[11px] text-sky-600 font-semibold mt-1">Find the holes</span>
        </div>
      </div>

      {/* Interactive Unfolding Demo for Kid Learning */}
      <div className="mt-3 flex flex-col items-center">
        {!showDemo ? (
          <button
            onClick={triggerAnimation}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-semibold rounded-full border border-amber-300 transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Parent/Kid Tip: Watch Paper Unfold Demo</span>
          </button>
        ) : (
          <div className="mt-2 bg-amber-50 border border-amber-300 rounded-xl p-3 flex flex-col items-center animate-pop">
            <div className="flex items-center justify-between w-full mb-2 gap-4">
              <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Unfold Symmetry Step {demoStep} of 3
              </span>
              <button
                onClick={resetDemo}
                className="text-xs text-amber-700 hover:text-amber-900 underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Close Demo
              </button>
            </div>

            <div className="w-28 h-28 bg-white border-2 border-amber-400 rounded-xl p-1 shadow-md flex items-center justify-center">
              {demoStep === 1 && (
                <div className="text-center">
                  <span className="text-xs font-bold text-slate-700 block">1. Punched Hole</span>
                  <div className="w-16 h-16 mx-auto mt-1 border border-slate-400 bg-slate-100 relative">
                    <div className="w-3 h-3 bg-slate-900 rounded-full absolute top-2 right-2 ring-2 ring-amber-400"></div>
                  </div>
                </div>
              )}
              {demoStep === 2 && (
                <div className="text-center">
                  <span className="text-xs font-bold text-amber-700 block">2. Mirror Across Fold!</span>
                  <div className="w-20 h-16 mx-auto mt-1 border border-slate-400 bg-slate-100 relative flex">
                    <div className="w-1/2 h-full border-r border-dashed border-amber-500 relative">
                      <div className="w-3 h-3 bg-slate-900 rounded-full absolute top-2 right-2 animate-ping"></div>
                      <div className="w-3 h-3 bg-slate-900 rounded-full absolute top-2 right-2"></div>
                    </div>
                    <div className="w-1/2 h-full relative">
                      <div className="w-3 h-3 bg-slate-900 rounded-full absolute top-2 left-2 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              )}
              {demoStep === 3 && (
                <div className="text-center">
                  <span className="text-xs font-bold text-emerald-700 block">3. Fully Opened!</span>
                  <div className="w-20 h-20 mx-auto mt-1">
                    <UnfoldedPaperChoice holes={finalUnfoldedHoles} creases={creases} size={70} />
                  </div>
                </div>
              )}
            </div>
            <p className="text-[11px] text-amber-800 text-center mt-2 max-w-xs">
              Every fold creates a <strong>mirror line</strong>! If you punch 1 hole through 2 layers, you get 2 holes!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper to render individual fold sequence graphics
function renderStepGraphic(step) {
  const { type, foldDirection, hole } = step;

  if (type === 'initial-fold') {
    // Shows a square sheet being folded in half
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full select-none">
        {/* Full paper boundary */}
        <rect x="10" y="10" width="80" height="80" fill="#f8fafc" stroke="#475569" strokeWidth="2.5" rx="3" />

        {/* Fold line */}
        {foldDirection === 'right' && (
          <>
            <line x1="50" y1="10" x2="50" y2="90" stroke="#0284c7" strokeWidth="2" strokeDasharray="3,3" />
            {/* Shaded fold flap */}
            <path d="M 50 10 L 90 10 L 90 90 L 50 90 Z" fill="#e0f2fe" opacity="0.6" />
            {/* Curved arrow from left to right */}
            <path d="M 28 50 C 35 32, 60 32, 68 46" fill="none" stroke="#0284c7" strokeWidth="3" markerEnd="url(#arrow)" />
          </>
        )}

        {foldDirection === 'left' && (
          <>
            <line x1="50" y1="10" x2="50" y2="90" stroke="#0284c7" strokeWidth="2" strokeDasharray="3,3" />
            <path d="M 10 10 L 50 10 L 50 90 L 10 90 Z" fill="#e0f2fe" opacity="0.6" />
            <path d="M 72 50 C 65 32, 40 32, 32 46" fill="none" stroke="#0284c7" strokeWidth="3" markerEnd="url(#arrow)" />
          </>
        )}

        {foldDirection === 'up' && (
          <>
            <line x1="10" y1="50" x2="90" y2="50" stroke="#0284c7" strokeWidth="2" strokeDasharray="3,3" />
            <path d="M 10 10 L 90 10 L 90 50 L 10 50 Z" fill="#e0f2fe" opacity="0.6" />
            <path d="M 50 72 C 32 65, 32 40, 46 32" fill="none" stroke="#0284c7" strokeWidth="3" markerEnd="url(#arrow)" />
          </>
        )}

        {foldDirection === 'down' && (
          <>
            <line x1="10" y1="50" x2="90" y2="50" stroke="#0284c7" strokeWidth="2" strokeDasharray="3,3" />
            <path d="M 10 50 L 90 50 L 90 90 L 10 90 Z" fill="#e0f2fe" opacity="0.6" />
            <path d="M 50 28 C 32 35, 32 60, 46 68" fill="none" stroke="#0284c7" strokeWidth="3" markerEnd="url(#arrow)" />
          </>
        )}

        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 9 5 L 0 9 z" fill="#0284c7" />
          </marker>
        </defs>
      </svg>
    );
  }

  if (type === 'second-fold') {
    // Shows folded paper folded once more (e.g. into quarter)
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full select-none">
        {/* Half paper */}
        <rect x="50" y="10" width="40" height="80" fill="#e2e8f0" stroke="#475569" strokeWidth="2" rx="2" />
        <line x1="50" y1="50" x2="90" y2="50" stroke="#0284c7" strokeWidth="2" strokeDasharray="3,3" />
        {/* Fold arrow */}
        <path d="M 70 70 C 60 60, 60 40, 68 35" fill="none" stroke="#0284c7" strokeWidth="2.5" markerEnd="url(#arrow2)" />
        <defs>
          <marker id="arrow2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 1 L 9 5 L 0 9 z" fill="#0284c7" />
          </marker>
        </defs>
      </svg>
    );
  }

  if (type === 'punch') {
    // Shows final folded paper with a hole punch circle
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full select-none">
        {step.foldedBounds ? (
          <rect
            x={step.foldedBounds.x}
            y={step.foldedBounds.y}
            width={step.foldedBounds.w}
            height={step.foldedBounds.h}
            fill="#e2e8f0"
            stroke="#334155"
            strokeWidth="2.5"
            rx="2"
          />
        ) : (
          <rect x="25" y="25" width="50" height="50" fill="#e2e8f0" stroke="#334155" strokeWidth="2.5" rx="2" />
        )}

        {/* Crease markings on the folded paper */}
        {step.innerCreases && step.innerCreases.map((c, i) => (
          <line key={i} x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2,2" />
        ))}

        {/* Punch Hole */}
        {hole && (
          <g>
            <circle cx={hole.x} cy={hole.y} r={hole.r || 6} fill="#0f172a" />
            <circle cx={hole.x} cy={hole.y} r={(hole.r || 6) * 0.4} fill="#ffffff" />
            {/* Scissor / Punch Indicator */}
            <circle cx={hole.x} cy={hole.y} r={(hole.r || 6) + 3} fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
          </g>
        )}
      </svg>
    );
  }

  return null;
}
