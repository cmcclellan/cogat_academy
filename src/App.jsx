import React, { useState } from 'react';
import Header from './components/Header';
import QuestionCard from './components/QuestionCard';
import ExplanationModal from './components/ExplanationModal';
import ScoreReport from './components/ScoreReport';
import SessionChangeDialog from './components/SessionChangeDialog';
import { buildSession, generatePracticeBatch, summarizeSession } from './utils/session';
import { SESSION_SETS } from './data/cogatData';

export default function App() {
  const [config, setConfig] = useState({ testId: 'test_1', batteryId: 'all', mode: 'practice' });
  const [questions, setQuestions] = useState(() => buildSession(config));
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stage, setStage] = useState('active');
  const [pendingConfig, setPendingConfig] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [autoReadAudio, setAutoReadAudio] = useState(false);
  const summary = summarizeSession(questions, answers);
  const current = questions[currentIndex];
  const isReview = stage === 'review';
  const isAssessment = config.mode === 'assessment';
  const testName = SESSION_SETS.find(t => t.id === config.testId)?.name;

  function startNew(next = config) {
    setConfig(next);
    setQuestions(buildSession(next, Math.floor(Math.random() * 4)));
    setAnswers({}); setCurrentIndex(0); setShowExplanation(false); setPendingConfig(null);
    setStage(next.mode === 'assessment' ? 'intro' : 'active');
  }
  function changeConfig(changes) {
    const next = { ...config, ...changes };
    if (changes.mode === 'assessment' && config.mode !== 'assessment') next.testId = 'check_1';
    if (changes.mode === 'practice' && next.testId.startsWith('check_')) next.testId = 'test_1';
    if (changes.testId?.startsWith('check_')) next.mode = 'assessment';
    if (changes.testId === 'enrichment' || changes.testId === 'infinite') next.mode = 'practice';
    if (next.mode === 'assessment' && next.testId === 'infinite') next.testId = 'check_1';
    if (JSON.stringify(next) === JSON.stringify(config)) return;
    if (summary.answered > 0) setPendingConfig(next);
    else startNew(next);
  }
  function nextQuestion() {
    if (currentIndex < questions.length - 1) setCurrentIndex(i => i + 1);
    else if (config.testId === 'infinite' && !isReview) {
      const batch = generatePracticeBatch(config.batteryId, 5, questions.length);
      setQuestions(q => [...q, ...batch]); setCurrentIndex(questions.length);
    }
  }
  const button = 'px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-800 hover:bg-slate-100 disabled:opacity-40';
  const primary = 'px-5 py-2.5 rounded-xl bg-sky-700 text-white font-bold hover:bg-sky-800';

  return <div className="min-h-screen bg-slate-50 flex flex-col">
    <Header config={config} onChange={changeConfig} autoReadAudio={autoReadAudio}
      onToggleAutoRead={() => setAutoReadAudio(v => !v)} answeredCount={summary.answered} totalQuestions={questions.length} />
    <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6">
      {stage === 'intro' ? <section className="max-w-2xl mx-auto bg-white p-6 rounded-2xl border space-y-4">
        <h2 className="text-2xl font-bold">Before your Grade 2 assessment</h2>
        <p>This is an independent practice sample with {questions.length} questions. It is not a full-length or standardized CogAT test.</p>
        <p>Only Level 8 format questions are included. Supporting activities and enrichment are kept in separate practice collections.</p>
        {config.testId.startsWith('check_') && <p className="rounded-xl bg-sky-50 p-3">These questions are reserved from routine practice. Try a check after practicing; use a different check next time to reduce answer recall.</p>}
        <ul className="list-disc pl-5 space-y-2">
          <li>There is no countdown. CogAT Level 8 subtests are untimed.</li>
          <li>Read or listen to each question. Choose an answer, then use Next.</li>
          <li>You can revisit questions and change your choices before submitting.</li>
          <li>Answers and explanations appear only after you submit the entire session.</li>
        </ul>
        <p className="text-sm text-slate-600">Parents: allow the student to answer independently. Previously practiced questions can feel familiar; these results do not predict an official score.</p>
        <button className={primary} onClick={() => setStage('active')}>Start assessment</button>
      </section> : stage === 'results' ? <ScoreReport questions={questions} userAnswers={answers} mode={config.mode}
        testName={testName} onRestart={() => startNew()} onReviewQuestion={index => { setCurrentIndex(index); setStage('review'); }} />
      : stage === 'confirm' ? <section className="max-w-2xl mx-auto rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">Ready to submit?</h2>
        <p>You answered {summary.answered} of {summary.total} questions.</p>
        {summary.answered < summary.total && <p role="status" className="text-amber-900">{summary.total - summary.answered} questions are unanswered. You can go back before submitting.</p>}
        <p>Your answers will be locked when you submit.</p>
        <div className="flex flex-wrap gap-3">
          <button className={button} onClick={() => setStage('active')}>Keep working</button>
          {summary.answered < summary.total && <button className={button} onClick={() => {
            setCurrentIndex(questions.findIndex(q => answers[q.id] === undefined)); setStage('active');
          }}>Go to first unanswered</button>}
          <button className={primary} onClick={() => setStage('results')}>Submit session</button>
        </div>
      </section> : current ? <div className="space-y-4">
        {isReview && <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <p className="font-bold">Review: answers are locked</p>
          <button className={button} onClick={() => setStage('results')}>Back to results</button>
        </div>}
        <QuestionCard key={current.id} question={current} questionNumber={currentIndex + 1} totalQuestions={questions.length}
          isPracticeMode={!isAssessment} isReview={isReview} selectedAnswer={answers[current.id]}
          isAnswerSubmitted={answers[current.id] !== undefined}
          onAnswerSubmit={index => {
            if (stage !== 'active' || (!isAssessment && answers[current.id] !== undefined)) return;
            setAnswers(a => ({ ...a, [current.id]: index }));
          }} onShowExplanation={() => setShowExplanation(true)} autoReadAudio={autoReadAudio && !pendingConfig} />
        <nav aria-label="Question navigation" className="max-w-3xl mx-auto space-y-3">
          <div className="flex flex-wrap justify-between gap-2">
            <button className={button} disabled={currentIndex === 0} onClick={() => setCurrentIndex(i => i - 1)}>Previous</button>
            {(currentIndex < questions.length - 1 || (config.testId === 'infinite' && !isReview)) &&
              <button className={primary} onClick={nextQuestion}>Next</button>}
            {!isReview && <button className={button} onClick={() => setStage('confirm')}>Finish session</button>}
          </div>
          <div className="flex flex-wrap gap-2">
            {questions.map((q, index) => <button key={q.id} aria-current={index === currentIndex ? 'step' : undefined}
              aria-label={`Question ${index + 1}, ${answers[q.id] === undefined ? 'unanswered' : 'answered'}`}
              onClick={() => setCurrentIndex(index)} className={`w-10 h-10 rounded-full border font-bold ${index === currentIndex ? 'bg-sky-700 text-white' : answers[q.id] !== undefined ? 'bg-slate-200 text-slate-900' : 'bg-white text-slate-700'}`}>{index + 1}</button>)}
          </div>
        </nav>
      </div> : <section className="max-w-2xl mx-auto bg-white rounded-2xl border p-6 space-y-3">
        <h2 className="text-xl font-bold">No activities in this selection</h2>
        <p>{config.testId === 'enrichment' ? 'The current enrichment collection contains quantitative scaffolds. Choose another battery or return to Level 8 format practice.' : 'Generated enrichment covers quantitative and nonverbal questions. Choose a curated set for verbal practice.'}</p>
        <button className={primary} onClick={() => changeConfig({ testId: 'test_1' })}>Use Practice Test 1</button>
      </section>}
    </main>
    {showExplanation && current && (isReview || (!isAssessment && answers[current.id] !== undefined)) &&
      <ExplanationModal isOpen onClose={() => setShowExplanation(false)} question={current} selectedAnswer={answers[current.id]} />}
    {pendingConfig && <SessionChangeDialog onCancel={() => setPendingConfig(null)} onConfirm={() => startNew(pendingConfig)} />}
    <footer className="border-t bg-white p-4 text-center text-xs text-slate-600">CogAT is a registered trademark of Riverside Insights. This independent Grade 2 practice tool is not affiliated with or endorsed by the publisher.</footer>
  </div>;
}
