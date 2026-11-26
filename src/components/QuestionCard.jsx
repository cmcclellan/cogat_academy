import React, { useState } from 'react';
import AudioProctor from './AudioProctor';
import FigureMatrixRenderer, { Shape } from './renderers/FigureMatrixRenderer';
import PaperFoldingRenderer, { UnfoldedPaperChoice } from './renderers/PaperFoldingRenderer';
import FigureClassificationRenderer from './renderers/FigureClassificationRenderer';
import BalanceScaleRenderer from './renderers/BalanceScaleRenderer';
import NumberSeriesRenderer from './renderers/NumberSeriesRenderer';
import { PictureAnalogyRenderer, PictureClassificationRenderer, PictureCard } from './renderers/PictureCardRenderer';
import Quantity from './renderers/QuantityRenderer';
import EquationPuzzleRenderer from './renderers/EquationPuzzleRenderer';
import SpatialFigureRenderer, { SpatialScene } from './renderers/SpatialFigureRenderer';

export default function QuestionCard({ question, questionNumber, totalQuestions, onAnswerSubmit,
  isPracticeMode, isReview = false, selectedAnswer, isAnswerSubmitted, onShowExplanation, autoReadAudio }) {
  const [eliminated, setEliminated] = useState({});
  const [eliminationMode, setEliminationMode] = useState(false);
  const showFeedback = isReview || (isPracticeMode && isAnswerSubmitted);
  const locked = isReview || (isPracticeMode && isAnswerSubmitted);
  const q = question;
  function choose(index) {
    if (locked) return;
    if (eliminationMode) {
      if (index === selectedAnswer) return;
      setEliminated(e => ({ ...e, [index]: !e[index] }));
    } else if (!eliminated[index]) onAnswerSubmit(index);
  }
  function stimulus() {
    switch (q.rendererType) {
      case 'figure_matrix': return <FigureMatrixRenderer data={q.data} />;
      case 'spatial_matrix':
      case 'spatial_classification': return <SpatialFigureRenderer data={q.data} type={q.rendererType} />;
      case 'equation_puzzle': return <EquationPuzzleRenderer data={q.data} />;
      case 'paper_folding': return <PaperFoldingRenderer data={q.data} allowDemo={showFeedback} />;
      case 'figure_classification': return <FigureClassificationRenderer data={q.data} />;
      case 'balance_puzzle': return <BalanceScaleRenderer data={q.data} />;
      case 'number_series': return <NumberSeriesRenderer data={q.data} />;
      case 'picture_analogy': return <PictureAnalogyRenderer topPair={q.data.topPair} bottomStimulus={q.data.bottomStimulus} />;
      case 'picture_classification': return <PictureClassificationRenderer items={q.data.items} />;
      case 'sentence_completion': return <p className="text-lg font-bold text-center p-4 rounded-xl bg-sky-50">{q.data.sentence}</p>;
      case 'number_analogy': return <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto p-3 rounded-xl border">
        {[...(q.data.examplePairs || [q.data.topPair]).flatMap(pair => [pair.left, pair.right]), q.data.bottomStimulus.left, '?'].map((n, i) =>
          <div key={i} className="flex items-center justify-center min-h-20 border rounded-xl p-2 bg-slate-50">{n === '?' ? <span className="text-3xl" aria-label="Missing quantity">?</span> : <Quantity count={n} />}</div>)}
      </div>;
      default: return null;
    }
  }
  function optionContent(option) {
    if (option.scene) return <div className="w-24 h-24 mx-auto"><SpatialScene scene={option.scene} /></div>;
    if (option.shape) return <div className="w-20 h-20 mx-auto"><Shape {...option.shape} /></div>;
    if (option.holes || option.cuts) return <div className="w-24 h-24 mx-auto"><UnfoldedPaperChoice holes={option.holes} cuts={option.cuts} creases={option.creases} /></div>;
    if (option.emoji || option.illustration) return <PictureCard {...option} />;
    if (option.quantity !== undefined) return <Quantity count={option.quantity} />;
    return <span className="text-2xl sm:text-3xl font-bold">{option.text || option.label}</span>;
  }
  return <section aria-label={`Question ${questionNumber}`} className="bg-white rounded-2xl border shadow-sm p-4 sm:p-6 max-w-3xl mx-auto space-y-4">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="font-bold">Question {questionNumber} of {totalQuestions}</h2>
      <AudioProctor script={q.audioScript} autoPlay={autoReadAudio} />
    </div>
    <p className="text-sm text-slate-600 capitalize">{q.subtestId.replaceAll('_', ' ')}</p>
    <p className="text-xs font-bold text-slate-600">{q.alignment === 'enrichment' ? 'Enrichment activity' : 'Level 8 format practice'}</p>
    <p className="text-base font-semibold text-center">{q.prompt}</p>
    {stimulus()}
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h3 className="font-bold">Choose one answer</h3>
      {!locked && <button aria-pressed={eliminationMode} onClick={() => setEliminationMode(v => !v)} className="rounded-xl border px-3 py-2 text-sm">
        {eliminationMode ? 'Done crossing out' : 'Cross out choices'}</button>}
    </div>
    <div role="group" aria-label="Answer choices" className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {q.options.map((option, index) => {
        const selected = selectedAnswer === index;
        const correct = showFeedback && index === q.correctAnswer;
        const wrong = showFeedback && selected && index !== q.correctAnswer;
        const crossed = !showFeedback && eliminated[index];
        return <button key={option.id} type="button" onClick={() => choose(index)} disabled={locked}
          aria-pressed={selected} aria-describedby={`option-${q.id}-${index}`} aria-label={`Choice ${option.id}${crossed ? ', crossed out' : ''}${correct ? ', correct answer' : wrong ? ', incorrect answer' : ''}`}
          className={`relative rounded-2xl border-2 p-2 pt-8 min-h-32 focus-visible:outline focus-visible:outline-4 focus-visible:outline-sky-700 ${correct ? 'border-emerald-600 bg-emerald-50' : wrong ? 'border-rose-600 bg-rose-50' : selected ? 'border-sky-700 bg-sky-50' : 'border-slate-300 bg-white'} ${crossed ? 'opacity-40' : ''}`}>
          <span className="absolute top-1 left-2 font-bold" aria-hidden="true">{option.id}</span>
          <span id={`option-${q.id}-${index}`}>{optionContent(option)}</span>
          {crossed && <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center text-5xl text-slate-800">X</span>}
          {correct && <span className="block text-sm font-bold text-emerald-900">Correct answer</span>}
          {wrong && <span className="block text-sm font-bold text-rose-900">Your answer</span>}
        </button>;
      })}
    </div>
    {showFeedback ? <div role="status" className="rounded-xl bg-slate-50 border p-4 space-y-2">
      <p className="font-bold">{selectedAnswer === undefined ? 'You did not answer this question.' : selectedAnswer === q.correctAnswer ? 'Correct. Well done.' : 'Let us look at the reasoning.'}</p>
      <button onClick={onShowExplanation} className="rounded-xl bg-sky-700 text-white font-bold px-4 py-2">Explain the rule</button>
    </div> : !isPracticeMode && <p role="status" className="text-sm text-slate-600">{selectedAnswer === undefined ? 'Choose an answer, then use Next.' : 'Answer saved. You can change it before submitting.'}</p>}
  </section>;
}
