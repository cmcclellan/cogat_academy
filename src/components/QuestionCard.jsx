import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import AudioProctor from './AudioProctor';
import FigureMatrixRenderer, { Shape } from './renderers/FigureMatrixRenderer';
import PaperFoldingRenderer, { UnfoldedPaperChoice } from './renderers/PaperFoldingRenderer';
import FigureClassificationRenderer from './renderers/FigureClassificationRenderer';
import BalanceScaleRenderer from './renderers/BalanceScaleRenderer';
import NumberSeriesRenderer from './renderers/NumberSeriesRenderer';
import { PictureAnalogyRenderer, PictureClassificationRenderer, PictureCard } from './renderers/PictureCardRenderer';
import { Check, X, HelpCircle, ArrowRight, Lightbulb } from 'lucide-react';

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswerSubmit,
  isPracticeMode,
  selectedAnswer,
  isAnswerSubmitted,
  onShowExplanation,
  autoReadAudio
}) {
  const [eliminated, setEliminated] = useState({});
  const [eliminationMode, setEliminationMode] = useState(false);

  // Reset elimination states when question changes
  React.useEffect(() => {
    setEliminated({});
    setEliminationMode(false);
  }, [question.id]);

  const handleSelectOption = (idx) => {
    if (eliminationMode) {
      setEliminated(prev => ({ ...prev, [idx]: !prev[idx] }));
      return;
    }
    if (eliminated[idx] || isAnswerSubmitted) return;
    onAnswerSubmit(idx);

    // Fire mini confetti if correct in practice mode!
    if (isPracticeMode && idx === question.correctAnswer) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const toggleEliminate = (e, idx) => {
    e.stopPropagation();
    setEliminated(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Render question stimulus according to subtest type
  const renderStimulus = () => {
    switch (question.rendererType) {
      case 'figure_matrix':
        return <FigureMatrixRenderer data={question.data} />;
      case 'paper_folding':
        return <PaperFoldingRenderer data={question.data} />;
      case 'figure_classification':
        return <FigureClassificationRenderer data={question.data} />;
      case 'balance_puzzle':
        return <BalanceScaleRenderer data={question.data} />;
      case 'number_series':
        return <NumberSeriesRenderer data={question.data} />;
      case 'picture_analogy':
        return <PictureAnalogyRenderer topPair={question.data.topPair} bottomStimulus={question.data.bottomStimulus} />;
      case 'picture_classification':
        return <PictureClassificationRenderer items={question.data.items} />;
      case 'sentence_completion':
        return (
          <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-5 my-2 max-w-lg mx-auto text-center shadow-inner">
            <span className="text-xs uppercase font-bold text-sky-600 tracking-wider block mb-2 font-heading">
              Listen & Complete the Sentence
            </span>
            <p className="text-lg sm:text-xl font-bold text-slate-800 leading-snug">
              "{question.data.sentence}"
            </p>
          </div>
        );
      case 'number_analogy':
        return (
          <div className="flex flex-col items-center justify-center p-3">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 shadow-sm inline-block">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-center p-3 bg-slate-50 border rounded-xl font-heading text-2xl font-bold text-slate-800">
                  {question.data.topPair.left} ➔ {question.data.topPair.right}
                </div>
                <div className="col-span-2 border-b border-dashed border-sky-300"></div>
                <div className="flex items-center justify-center p-3 bg-sky-50 border border-sky-200 rounded-xl font-heading text-2xl font-bold text-sky-700">
                  {question.data.bottomStimulus.left} ➔ ?
                </div>
              </div>
            </div>
          </div>
        );
      case 'text_analogy':
        return (
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 my-2 max-w-lg mx-auto text-center shadow-sm">
            <p className="text-xl sm:text-2xl font-heading font-bold text-slate-800">
              {question.data.stimulus}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  // Helper to render individual answer choice contents
  const renderOptionContent = (opt, idx) => {
    const isLetter = String.fromCharCode(65 + idx);

    // If option has a geometric shape (Figure Matrices / Classification)
    if (opt.shape) {
      return (
        <div className="flex flex-col items-center justify-center p-2">
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <Shape {...opt.shape} />
          </div>
        </div>
      );
    }

    // If option has unfolded paper holes (Paper Folding)
    if (opt.holes) {
      return (
        <div className="flex flex-col items-center justify-center p-2">
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <UnfoldedPaperChoice holes={opt.holes} creases={opt.creases} />
          </div>
        </div>
      );
    }

    // If option has picture emoji (Primary Verbal)
    if (opt.emoji) {
      return (
        <div className="flex flex-col items-center justify-center p-2">
          <span className="text-4xl sm:text-5xl filter drop-shadow-sm">{opt.emoji}</span>
          <span className="text-xs sm:text-sm font-bold text-slate-800 mt-1 font-heading">{opt.label}</span>
          {opt.caption && <span className="text-[10px] text-slate-400 font-medium">{opt.caption}</span>}
        </div>
      );
    }

    // Standard number / text options
    return (
      <div className="flex flex-col items-center justify-center py-4 px-2">
        <span className="text-2xl sm:text-3xl font-heading font-bold text-slate-800">
          {opt.text || opt.label}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-md p-4 sm:p-6 max-w-3xl mx-auto">
      {/* Top Bar: Progress, Subtest Name & Audio Proctor */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="bg-sky-100 text-sky-800 text-xs font-bold px-3 py-1.5 rounded-full font-heading">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
            {question.subtestId.replace('_', ' ')}
          </span>
        </div>

        {/* Audio Proctor Button */}
        <AudioProctor script={question.audioScript} autoPlay={autoReadAudio} />
      </div>

      {/* Question Prompt */}
      <div className="mb-4 text-center">
        <p className="text-sm sm:text-base font-semibold text-slate-700 leading-relaxed max-w-2xl mx-auto">
          {question.prompt}
        </p>
      </div>

      {/* Subtest Graphic Stimulus */}
      <div className="my-3">
        {renderStimulus()}
      </div>

      {/* CogAT Test Tool: Eliminator Tool */}
      <div className="flex items-center justify-between mt-6 mb-3 px-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">
          Answer Choices:
        </span>
        <button
          onClick={() => setEliminationMode(!eliminationMode)}
          type="button"
          className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border transition-colors ${
            eliminationMode
              ? 'bg-rose-500 text-white border-rose-600 shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-300'
          }`}
          title="Click to cross out choices you know are wrong"
        >
          <X className="w-3.5 h-3.5" />
          <span>{eliminationMode ? 'Done Eliminating' : 'Eliminate Wrong Answers (X)'}</span>
        </button>
      </div>

      {/* Answer Choice Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {question.options.map((opt, idx) => {
          const letter = String.fromCharCode(65 + idx);
          const isSelected = selectedAnswer === idx;
          const isElim = eliminated[idx];
          const isCorrect = isAnswerSubmitted && idx === question.correctAnswer;
          const isWrongSelected = isAnswerSubmitted && isSelected && idx !== question.correctAnswer;

          return (
            <div
              key={idx}
              onClick={() => handleSelectOption(idx)}
              className={`relative rounded-2xl border-2 transition-all cursor-pointer select-none ${
                isElim
                  ? 'opacity-30 bg-slate-100 border-slate-300 line-through'
                  : isCorrect
                  ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300 shadow-md'
                  : isWrongSelected
                  ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-200'
                  : isSelected
                  ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-300 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-sky-300 hover:shadow-sm'
              }`}
            >
              {/* Option Letter Bubble Badge */}
              <div className={`absolute top-2 left-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center border font-heading ${
                isCorrect
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : isWrongSelected
                  ? 'bg-rose-500 text-white border-rose-600'
                  : isSelected
                  ? 'bg-sky-500 text-white border-sky-600'
                  : 'bg-slate-100 text-slate-700 border-slate-300'
              }`}>
                {letter}
              </div>

              {/* Cross-out overlay if eliminated */}
              {isElim && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <X className="w-12 h-12 text-rose-500 stroke-[3]" />
                </div>
              )}

              {/* Choice Content */}
              {renderOptionContent(opt, idx)}
            </div>
          );
        })}
      </div>

      {/* Practice Mode Feedback Banner */}
      {isPracticeMode && isAnswerSubmitted && (
        <div className={`mt-5 p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 animate-pop ${
          selectedAnswer === question.correctAnswer
            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
            : 'bg-amber-50 border-amber-300 text-amber-900'
        }`}>
          <div className="flex items-center gap-2.5">
            {selectedAnswer === question.correctAnswer ? (
              <>
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
                <div>
                  <span className="font-heading font-bold text-base block">Fantastic Job! That is Correct! 🌟</span>
                  <span className="text-xs text-emerald-700 font-medium">You recognized the pattern!</span>
                </div>
              </>
            ) : (
              <>
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <span className="font-heading font-bold text-base block">Nice Try! Let's See Why 💡</span>
                  <span className="text-xs text-amber-800 font-medium">Click "Explain Rule" to see the secret logic.</span>
                </div>
              </>
            )}
          </div>

          <button
            onClick={onShowExplanation}
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 rounded-xl text-xs sm:text-sm font-bold font-heading shadow-sm transition transform active:scale-95"
          >
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Explain the Secret Rule</span>
          </button>
        </div>
      )}
    </div>
  );
}
