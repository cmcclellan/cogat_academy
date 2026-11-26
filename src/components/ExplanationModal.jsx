import React from 'react';
import { X, CheckCircle2, AlertCircle, HelpCircle, HeartHandshake } from 'lucide-react';
import { Shape } from './renderers/FigureMatrixRenderer';
import { UnfoldedPaperChoice } from './renderers/PaperFoldingRenderer';

export default function ExplanationModal({ isOpen, onClose, question, selectedAnswer }) {
  if (!isOpen || !question) return null;

  const isCorrect = selectedAnswer === question.correctAnswer;
  const { explanation } = question;
  const correctOpt = question.options[question.correctAnswer];
  const correctLetter = String.fromCharCode(65 + question.correctAnswer);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-pop">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-4 border-amber-200 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <div className="flex items-center gap-2">
            {isCorrect ? (
              <div className="flex items-center gap-2 text-emerald-600 font-heading text-xl font-bold">
                <CheckCircle2 className="w-7 h-7" />
                <span>You Got It Right! 🎉</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sky-600 font-heading text-xl font-bold">
                <HelpCircle className="w-7 h-7" />
                <span>Let's Learn the Secret Rule! 💡</span>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-slate-700">
          {/* Rule banner */}
          <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-4">
            <span className="text-xs uppercase font-bold text-sky-600 tracking-wider block font-heading">
              The Cognitive Rule
            </span>
            <span className="text-base font-bold text-sky-900 mt-1 block">
              {explanation.rule}
            </span>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {explanation.description}
            </p>
          </div>

          {/* Correct Answer Reminder */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center font-heading text-sm shrink-0">
              {correctLetter}
            </div>
            <div className="flex items-center gap-2.5">
              <div>
                <span className="text-xs font-semibold text-emerald-700 block">Correct Choice:</span>
                <span className="text-sm font-bold text-emerald-950 flex items-center gap-2 mt-0.5">
                  <span>Choice {correctLetter}</span>
                  {correctOpt?.emoji && <span>{correctOpt.emoji} {correctOpt.label}</span>}
                  {correctOpt?.text && <span>({correctOpt.text})</span>}
                </span>
              </div>
              {correctOpt?.shape && (
                <div className="w-10 h-10 border border-emerald-200 bg-white rounded-lg p-1 flex items-center justify-center ml-2">
                  <Shape {...correctOpt.shape} size={32} />
                </div>
              )}
              {correctOpt?.holes && (
                <div className="w-10 h-10 border border-emerald-200 bg-white rounded-lg p-1 flex items-center justify-center ml-2">
                  <UnfoldedPaperChoice holes={correctOpt.holes} creases={correctOpt.creases} size={32} />
                </div>
              )}
            </div>
          </div>

          {/* Why other options don't fit */}
          {explanation.whyOthersWrong && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
              <span className="text-xs font-bold text-slate-600 block mb-1 flex items-center gap-1 font-heading">
                <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
                Why Other Choices Don't Fit:
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                {explanation.whyOthersWrong}
              </p>
            </div>
          )}

          {/* Parent Coaching Tip */}
          {explanation.parentTip && (
            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4">
              <span className="text-xs font-bold text-amber-800 block mb-1 flex items-center gap-1.5 font-heading">
                <HeartHandshake className="w-4 h-4 text-amber-600" />
                Parent Coaching Tip:
              </span>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                {explanation.parentTip}
              </p>
            </div>
          )}
        </div>

        {/* Got it Button */}
        <div className="mt-6 pt-3 border-t">
          <button
            onClick={onClose}
            className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-heading font-bold rounded-2xl shadow-md transition transform active:scale-95"
          >
            I Understand, Next Question! 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
