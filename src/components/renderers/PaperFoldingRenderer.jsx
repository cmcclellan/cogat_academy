import React, { useId, useState } from 'react';
import { PAPER } from '../../utils/paperGeometry';

const points = polygon => polygon.map(p => p.join(',')).join(' ');
function Creases({ creases = [] }) {
  return <g stroke="#64748b" strokeWidth="1" strokeDasharray="3 3">
    {creases.includes('vertical') && <path d="M50 10V90" />}
    {creases.includes('horizontal') && <path d="M10 50H90" />}
    {creases.includes('diagonal-main') && <path d="M10 10L90 90" />}
    {creases.includes('diagonal-other') && <path d="M10 90L90 10" />}
  </g>;
}
function PaperGraphic({ polygon = PAPER, holes = [], cuts = [], markCuts = false, creases = [], before, foldDirection, label }) {
  const clip = useId().replaceAll(':', '');
  const source = before || polygon;
  const arrowX = (Math.min(...source.map(p => p[0])) + Math.max(...source.map(p => p[0]))) / 2;
  const arrowY = (Math.min(...source.map(p => p[1])) + Math.max(...source.map(p => p[1]))) / 2;
  const cutLocations = cuts.map(cut => cut.points.map(([x, y]) => `(${x}, ${y})`).join(', ')).join('; ');
  const accessibleLabel = markCuts ? `${label}. Marked cut outlines: ${cutLocations}` : label;
  return <svg role="img" aria-label={accessibleLabel} viewBox="0 0 100 100" className="w-full h-full">
    <defs>
      <clipPath id={clip}><polygon points={points(polygon)} /></clipPath>
      <mask id={`${clip}-cuts`} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <rect width="100" height="100" fill="white" />
        {cuts.map((cut, i) => <polygon key={i} points={points(cut.points)} fill="black" />)}
      </mask>
    </defs>
    {before && <polygon points={points(before)} fill="none" stroke="#94a3b8" strokeDasharray="3 3" />}
    <g mask={`url(#${clip}-cuts)`}>
      <polygon points={points(polygon)} fill="#e2e8f0" stroke="#334155" strokeWidth="2" />
      <Creases creases={creases} />
    </g>
    {markCuts && <g clipPath={`url(#${clip})`} fill="none" stroke="#b91c1c" strokeWidth="1.8" strokeDasharray="3 2">
      {cuts.map((cut, i) => <polygon key={i} points={points(cut.points)} />)}
    </g>}
    <g clipPath={`url(#${clip})`}>{holes.map((h, i) => <circle key={i} cx={h.x} cy={h.y} r={h.r || 5} fill="#0f172a" />)}</g>
    {foldDirection && <g fill="none" stroke="#0369a1" strokeWidth="2.5">
      {foldDirection === 'right' && <path d={`M25 ${arrowY}H70L63 ${arrowY - 6}M70 ${arrowY}L63 ${arrowY + 6}`} />}
      {foldDirection === 'left' && <path d={`M75 ${arrowY}H30L37 ${arrowY - 6}M30 ${arrowY}L37 ${arrowY + 6}`} />}
      {foldDirection === 'up' && <path d={`M${arrowX} 75V28L${arrowX - 6} 35M${arrowX} 28L${arrowX + 6} 35`} />}
      {foldDirection === 'down' && <path d={`M${arrowX} 25V72L${arrowX - 6} 65M${arrowX} 72L${arrowX + 6} 65`} />}
      {foldDirection === 'diagonal' && <path d="M70 28L28 70M28 70L28 59M28 70L39 70" />}
      {foldDirection === 'anti_diagonal' && <path d="M72 72L28 28M28 28L28 39M28 28L39 28" />}
    </g>}
  </svg>;
}
export function UnfoldedPaperChoice({ holes = [], cuts = [], creases = [] }) {
  const description = holes.map(h => `(${h.x}, ${h.y})`).join(', ');
  const cutDescription = cuts.map(cut => cut.points.map(([x, y]) => `(${x}, ${y})`).join(', ')).join('; ');
  return <PaperGraphic holes={holes} cuts={cuts} creases={creases} label={cuts.length
    ? `Opened paper with cut-out pieces outlined by ${cutDescription}`
    : `Opened paper with ${holes.length} hole${holes.length === 1 ? '' : 's'} at ${description}`} />;
}

export default function PaperFoldingRenderer({ data, allowDemo = false }) {
  const [demoIndex, setDemoIndex] = useState(null);
  const frame = demoIndex === null ? null : data.unfolding[demoIndex];
  return <div className="space-y-3">
    <div className="flex flex-wrap justify-center gap-3">
      {data.steps.map((step, i) => <figure key={i} className="w-28 text-center">
        <figcaption className="text-sm font-bold">Step {i + 1}</figcaption>
        <div className="h-28 p-1 border rounded-xl">
          <PaperGraphic polygon={step.polygon} before={step.before} foldDirection={step.foldDirection}
            holes={step.hole ? [step.hole] : []} cuts={step.cuts || []} markCuts={step.type === 'cut'} label={step.caption} />
        </div>
        <p className="text-xs mt-1">{step.caption}</p>
      </figure>)}
    </div>
    {allowDemo && <div className="text-center space-y-2">
      {frame === null ? <button onClick={() => setDemoIndex(0)} className="rounded-xl border border-amber-500 bg-amber-50 px-3 py-2 font-bold text-sm">Watch paper unfold</button>
      : <div className="rounded-xl border border-amber-500 bg-amber-50 p-3 space-y-2">
        <p aria-live="polite" className="font-bold">{frame.caption}</p>
        <div className="w-36 h-36 mx-auto"><PaperGraphic polygon={frame.polygon} holes={frame.holes} cuts={frame.cuts || []} label={frame.caption} /></div>
        <div className="flex flex-wrap justify-center gap-3">
          <button disabled={demoIndex === 0} onClick={() => setDemoIndex(i => i - 1)} className="border rounded-xl px-3 py-2 disabled:opacity-40">Previous step</button>
          <button disabled={demoIndex === data.unfolding.length - 1} onClick={() => setDemoIndex(i => i + 1)} className="border rounded-xl px-3 py-2 disabled:opacity-40">Unfold next</button>
          <button onClick={() => setDemoIndex(null)} className="border rounded-xl px-3 py-2">Close demonstration</button>
        </div>
        <p className="text-sm">Undo each fold in reverse order. Mirror every removed piece across the crease. Cuts touching a crease can join when the paper opens.</p>
      </div>}
    </div>}
  </div>;
}
