import React, { useEffect, useId, useRef } from 'react';
import { Shape } from './renderers/FigureMatrixRenderer';
import { UnfoldedPaperChoice } from './renderers/PaperFoldingRenderer';
import { PictureCard } from './renderers/PictureCardRenderer';
import Quantity from './renderers/QuantityRenderer';
import { SpatialScene } from './renderers/SpatialFigureRenderer';

export default function ExplanationModal({ isOpen, onClose, question, selectedAnswer }) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen || !question) return;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, [isOpen, question?.id]);

  if (!isOpen || !question) return null;
  const { explanation } = question;
  const correctOption = question.options[question.correctAnswer];
  const correctLetter = correctOption.id;
  const answered = selectedAnswer !== undefined;
  const correct = selectedAnswer === question.correctAnswer;

  function renderCorrectOption() {
    if (correctOption.scene) return <div className="w-28 h-28"><SpatialScene scene={correctOption.scene} /></div>;
    if (correctOption.shape) return <div className="w-24 h-24"><Shape {...correctOption.shape} /></div>;
    if (correctOption.holes || correctOption.cuts) return <div className="w-24 h-24"><UnfoldedPaperChoice holes={correctOption.holes} cuts={correctOption.cuts} creases={correctOption.creases} /></div>;
    if (correctOption.emoji || correctOption.illustration) return <PictureCard {...correctOption} />;
    if (correctOption.quantity !== undefined) return <Quantity count={correctOption.quantity} />;
    return <span className="text-lg font-bold">{correctOption.text || correctOption.label}</span>;
  }

  return <dialog ref={dialogRef} aria-labelledby={titleId} aria-describedby={descriptionId}
    onCancel={event => { event.preventDefault(); onClose(); }}
    className="m-auto w-[calc(100%_-_2rem)] max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-sky-200 bg-white p-5 sm:p-6 shadow-2xl backdrop:bg-slate-900/60">
    <div className="flex items-start justify-between gap-3 border-b pb-3 mb-4">
      <div>
        <h2 id={titleId} className="text-xl font-bold font-heading text-slate-900">{correct ? 'You found the rule' : 'Explore the rule'}</h2>
        <p id={descriptionId} className="mt-1 text-sm text-slate-600">{!answered ? 'You did not answer this question.' : correct ? 'Your answer was correct.' : 'Compare your answer with the reasoning below.'}</p>
      </div>
      <button autoFocus type="button" onClick={onClose} aria-label="Close explanation"
        className="rounded-lg border px-3 py-2 text-slate-700 hover:bg-slate-100 focus-visible:outline focus-visible:outline-4 focus-visible:outline-sky-700">Close</button>
    </div>
    <div className="space-y-4 text-slate-800">
      {answered && !correct && question.options[selectedAnswer]?.misconception && <section className="rounded-xl border border-amber-300 bg-amber-50 p-4">
        <h3 className="font-bold">Think about your choice</h3>
        <p className="mt-2 text-sm leading-relaxed">{question.options[selectedAnswer].misconception}</p>
      </section>}
      <section className="rounded-xl border border-sky-200 bg-sky-50 p-4">
        <h3 className="font-bold">{explanation.rule}</h3>
        <p className="mt-2 text-sm leading-relaxed">{explanation.description}</p>
      </section>
      <section className="rounded-xl border border-emerald-300 bg-emerald-50 p-4">
        <h3 className="font-bold text-emerald-950">Correct answer: Choice {correctLetter}</h3>
        <div className="mt-3 flex justify-center">{renderCorrectOption()}</div>
      </section>
      {explanation.whyOthersWrong && <section className="rounded-xl border bg-slate-50 p-4">
        <h3 className="font-bold">Why the other choices do not fit</h3>
        <p className="mt-2 text-sm leading-relaxed">{explanation.whyOthersWrong}</p>
      </section>}
      {explanation.parentTip && <section className="rounded-xl border border-amber-300 bg-amber-50 p-4">
        <h3 className="font-bold">Parent coaching tip</h3>
        <p className="mt-2 text-sm leading-relaxed">{explanation.parentTip}</p>
      </section>}
    </div>
    <button type="button" onClick={onClose} className="mt-5 w-full rounded-xl bg-sky-700 px-4 py-3 font-bold text-white hover:bg-sky-800">Back to question</button>
  </dialog>;
}
