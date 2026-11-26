import React from 'react';
import { Shape } from './FigureMatrixRenderer';

/**
 * Figure Classification Renderer
 * Renders 3 stimulus figures that share an invariant visual rule
 */
export default function FigureClassificationRenderer({ data }) {
  const { stimulusFigures, ruleDescription } = data;

  return (
    <div className="flex flex-col items-center justify-center p-3">
      {/* Stimulus Box with 3 figures */}
      <div className="bg-white border-2 border-indigo-200 rounded-2xl shadow-sm p-4 w-full max-w-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-full font-heading flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            These 3 figures belong together:
          </span>
          <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
            Shared Rule
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3 shadow-inner">
          {stimulusFigures.map((fig, idx) => (
            <div
              key={idx}
              className="h-24 sm:h-28 bg-white border border-slate-200 rounded-lg flex items-center justify-center p-2 shadow-sm hover:border-indigo-300 transition-colors"
            >
              <Shape {...fig} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 text-center">
        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
          Which one from the choices below belongs in this group?
        </span>
      </div>
    </div>
  );
}
