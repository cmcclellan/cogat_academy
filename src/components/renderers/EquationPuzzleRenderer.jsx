import React from 'react';

export default function EquationPuzzleRenderer({ data }) {
  const tokens = [...data.left, '=', ...data.right];
  const spoken = tokens.map(token => ({ '+': 'plus', '-': 'minus', '=': 'equals', '?': 'blank' })[token] || token).join(' ');
  return <div role="img" aria-label={spoken} className="flex flex-wrap items-center justify-center gap-3 rounded-2xl border bg-slate-50 p-5 text-3xl sm:text-4xl font-bold">
    {tokens.map((token, i) => <span key={i} aria-hidden="true" className={token === '?' ? 'rounded-xl border-2 border-dashed border-sky-700 px-4 py-2 text-sky-800' : ''}>{token}</span>)}
  </div>;
}
