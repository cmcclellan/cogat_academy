import React from 'react';
import { BATTERIES, PRACTICE_TESTS, ASSESSMENT_TESTS, EXTRA_ACTIVITIES, SESSION_SETS } from '../data/cogatData';

export default function Header({ config, onChange, autoReadAudio, onToggleAutoRead, answeredCount, totalQuestions }) {
  const tests = config.mode === 'assessment' ? ASSESSMENT_TESTS : PRACTICE_TESTS;
  const selectedSet = SESSION_SETS.find(t => t.id === config.testId);
  const extra = EXTRA_ACTIVITIES.some(t => t.id === config.testId);
  const filteredBattery = BATTERIES.find(b => b.id === config.batteryId);
  return <header className="bg-white border-b border-slate-200">
    <div className="max-w-5xl mx-auto p-4 space-y-3">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div><h1 className="text-xl font-bold font-heading">CogAT Prep Academy</h1>
          <p className="text-sm text-slate-600">Grade 2 | Level 8</p></div>
        <p className="text-sm font-bold">Answered: {answeredCount} / {totalQuestions}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm font-bold">{config.mode === 'assessment' ? 'Assessment' : 'Practice test'}
          <select value={extra ? '' : config.testId} onChange={e => onChange({ testId: e.target.value })} className="ml-2 max-w-full rounded-xl border bg-slate-50 p-2">
            {extra && <option value="" disabled>Choose a practice test</option>}
            {tests.map(t => <option key={t.id} value={t.id}>{t.name} ({t.count} questions)</option>)}
          </select>
        </label>
        <div role="group" aria-label="Session mode" className="flex gap-1 rounded-xl bg-slate-100 p-1">
          {[['practice', 'Practice'], ['assessment', 'Assessment']].map(([mode, name]) => <button key={mode} aria-pressed={config.mode === mode}
            onClick={() => onChange({ mode })} className={`rounded-lg px-3 py-2 text-sm font-bold ${config.mode === mode ? 'bg-sky-700 text-white' : 'text-slate-700'}`}>{name}</button>)}
        </div>
        <button onClick={onToggleAutoRead} aria-pressed={autoReadAudio} className="rounded-xl border p-2 text-sm font-bold">Auto-read: {autoReadAudio ? 'On' : 'Off'}</button>
      </div>
      <p className="text-sm text-slate-600">{extra && <strong>{selectedSet.name}: </strong>}{selectedSet?.description}</p>
      {config.batteryId !== 'all' && <p className="text-sm font-bold text-sky-800">Practicing {filteredBattery?.name} only. Change this in Practice options.</p>}
      <details className="text-sm border-t pt-2">
        <summary className="cursor-pointer font-bold text-slate-700 py-1">Practice options</summary>
        <div className="space-y-3 pt-3">
          <div role="group" aria-label="Battery" className="flex flex-wrap items-center gap-2">
            <span className="font-bold">Focus:</span>
            {BATTERIES.map(b => <button key={b.id} aria-pressed={config.batteryId === b.id} onClick={() => onChange({ batteryId: b.id })}
              className={`rounded-full border px-3 py-2 font-bold ${config.batteryId === b.id ? 'bg-sky-700 text-white' : 'bg-white text-slate-700'}`}>{b.id === 'all' ? 'All batteries' : b.name}</button>)}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold">Extra skill practice:</span>
            {EXTRA_ACTIVITIES.map(activity => <button key={activity.id} aria-pressed={config.testId === activity.id}
              onClick={() => onChange({ testId: activity.id })} className="rounded-xl border px-3 py-2 font-bold hover:bg-slate-100">{activity.name}</button>)}
          </div>
          <p className="text-slate-600">Extra activities support reasoning skills and are excluded from assessments. All sessions are untimed.</p>
        </div>
      </details>
    </div>
  </header>;
}
