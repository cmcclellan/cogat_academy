import React from 'react';
import { BATTERIES } from '../data/cogatData';
import { summarizeSession } from '../utils/session';

export default function ScoreReport({ questions, userAnswers, mode, testName, onRestart, onReviewQuestion }) {
  const summary = summarizeSession(questions, userAnswers);
  const percentage = summary.answered ? Math.round(summary.correct / summary.answered * 100) : null;
  const enrichment = questions.some(q => q.alignment === 'enrichment');
  return <section className="max-w-3xl mx-auto space-y-5">
    <div className="rounded-2xl bg-sky-800 p-6 text-white space-y-3">
      <h2 className="text-2xl font-bold">Your practice results</h2>
      <p>Grade 2 | {testName} | {mode === 'assessment' ? 'Untimed assessment sample' : 'Practice with feedback'}</p>
      <p>{enrichment ? 'Enrichment skill practice only. These results are separate from Level 8 format checks.' : 'Level 8 format practice. Independently authored, not an official test form.'}</p>
      <div className="grid sm:grid-cols-3 gap-3">
        <p className="rounded-xl bg-white/10 p-3"><strong className="text-2xl block">{summary.correct}</strong>Correct answers</p>
        <p className="rounded-xl bg-white/10 p-3"><strong className="text-2xl block">{summary.answered} / {summary.total}</strong>Questions answered</p>
        <p className="rounded-xl bg-white/10 p-3"><strong className="text-2xl block">{percentage === null ? 'Not attempted' : `${percentage}%`}</strong>Accuracy on answered questions</p>
      </div>
      <p>{summary.total - summary.answered} unanswered | {summary.answered - summary.correct} incorrect</p>
    </div>
    <p className="rounded-xl border bg-white p-4 text-sm text-slate-700">These results describe this practice session only. They do not estimate an official CogAT score, national ranking, or gifted-program eligibility. Small samples and previously practiced questions cannot establish mastery.</p>
    <section className="rounded-2xl border bg-white p-5 space-y-3">
      <h3 className="text-lg font-bold">Battery results</h3>
      <div className="grid sm:grid-cols-3 gap-3">{BATTERIES.filter(b => b.id !== 'all').map(b => {
        const data = summary.batteries[b.id];
        return <div key={b.id} className="rounded-xl bg-slate-50 border p-3 space-y-2">
          <h4 className="font-bold">{b.name}</h4>
          {!data || !data.answered ? <p>Not attempted</p> : <><p>{data.correct} correct of {data.answered} answered</p>
            <p>{Math.round(data.correct / data.answered * 100)}% accuracy on answered questions</p></>}
          {data && <p className="text-sm text-slate-600">{data.total - data.answered} unanswered of {data.total} questions</p>}
        </div>;
      })}</div>
    </section>
    <section className="rounded-2xl border bg-white p-5 space-y-3">
      <h3 className="text-lg font-bold">Review questions and explanations</h3>
      <p className="text-sm">Discuss the reasoning, then try a different question later. Review does not change your submitted results.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">{questions.map((q, i) => {
        const status = userAnswers[q.id] === undefined ? 'Unanswered' : userAnswers[q.id] === q.correctAnswer ? 'Correct' : 'Incorrect';
        return <button key={q.id} onClick={() => onReviewQuestion(i)} className="border rounded-xl p-3 text-left hover:bg-sky-50">Question {i + 1}<span className="block text-sm">{status}</span></button>;
      })}</div>
    </section>
    <button onClick={onRestart} className="rounded-xl bg-sky-700 px-5 py-3 text-white font-bold">Start another session</button>
  </section>;
}
