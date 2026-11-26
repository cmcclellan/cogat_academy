import React from 'react';
import PictureIllustration from './PictureIllustration';

export function PictureCard({ emoji, illustration, label }) {
  return <span className="inline-flex flex-col items-center gap-1 p-1">
    {illustration ? <PictureIllustration name={illustration} label={label} /> : <span role="img" aria-label={label} className="text-4xl sm:text-5xl">{emoji}</span>}
    <span className="text-sm font-bold text-slate-800" aria-hidden="true">{label}</span>
  </span>;
}
export function PictureAnalogyRenderer({ topPair, bottomStimulus }) {
  return <div className="grid grid-cols-2 gap-3 rounded-xl border p-3 max-w-sm mx-auto">
    {[...topPair, bottomStimulus].map((item, i) => <div key={i} className="flex justify-center rounded-xl bg-slate-50 border p-2"><PictureCard {...item} /></div>)}
    <div className="flex justify-center items-center rounded-xl border-2 border-dashed border-sky-600 text-3xl" aria-label="Missing picture">?</div>
  </div>;
}
export function PictureClassificationRenderer({ items }) {
  return <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto rounded-xl border bg-slate-50 p-2">
    {items.map((item, i) => <div key={i} className="bg-white rounded-xl border flex justify-center p-1"><PictureCard {...item} /></div>)}
  </div>;
}
