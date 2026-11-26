import React from 'react';
import Quantity from './QuantityRenderer';

export default function NumberSeriesRenderer({ data }) {
  const items = data.missingIndex === undefined ? [...data.items, null] : data.items;
  return <div className="flex flex-wrap items-center justify-center gap-2 p-3 rounded-xl border bg-slate-50">
    {items.map((item, i) => item === null ?
      <div key={i} className="border-2 border-dashed border-sky-700 rounded-xl p-3 text-3xl" aria-label="Missing bead group">?</div> :
      <div key={i} className="border rounded-xl p-2 bg-white min-h-16 flex items-center"><Quantity count={item.count} color={item.color} /></div>)}
  </div>;
}
