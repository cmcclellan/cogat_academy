import React from 'react';
import Quantity from './QuantityRenderer';

export default function BalanceScaleRenderer({ data }) {
  return <div className="max-w-lg mx-auto space-y-4 p-3 rounded-xl border bg-slate-50">
    {[['First train', data.topCars], ['Second train', data.bottomCars]].map(([label, cars]) =>
      <div key={label} className="space-y-1">
        <p className="font-bold text-sm">{label}</p>
        <div className="flex flex-wrap items-end justify-center gap-2" role="group" aria-label={label}>
          <span aria-hidden="true" className="text-3xl">{'\u{1F682}'}</span>
          {cars.map((count, i) => <div key={i} className="relative mb-2 min-w-16 min-h-16 p-2 rounded-lg border-2 border-sky-700 bg-white flex items-center justify-center">
            {count === '?' ? <span className="text-3xl" aria-label="Missing load">?</span> : <Quantity count={count} />}
            <span aria-hidden="true" className="absolute -bottom-2 left-2 w-3 h-3 rounded-full bg-slate-700" />
            <span aria-hidden="true" className="absolute -bottom-2 right-2 w-3 h-3 rounded-full bg-slate-700" />
          </div>)}
        </div>
      </div>)}
  </div>;
}
