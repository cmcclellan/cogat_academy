import React from 'react';

export default function Quantity({ count, color = '#0284c7' }) {
  return <span role="img" aria-label={`${count} objects`} className="inline-grid grid-cols-5 gap-1 p-1 align-middle">
    {Array.from({ length: count }, (_, i) => <span key={i} aria-hidden="true" className="block w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: color }} />)}
  </span>;
}
