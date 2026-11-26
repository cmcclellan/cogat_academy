import React from 'react';

const position = e => `${e.fill || 'outline'} ${e.shape}${e.shape === 'arrow' || e.shape === 'triangle' ? ` rotated ${e.rotation || 0} degrees clockwise` : ''}, center ${e.x} percent from the left and ${e.y} percent from the top, width ${e.size} percent`;

export function SpatialScene({ scene }) {
  return <svg role="img" aria-label={scene.elements.map(position).join('; ')} viewBox="0 0 100 100" className="w-full h-full max-w-32 max-h-32 mx-auto">
    <rect x="1" y="1" width="98" height="98" rx="3" fill="white" stroke="#cbd5e1" />
    {scene.elements.map((e, i) => {
      const half = e.size / 2;
      const common = { fill: e.fill === 'solid' ? '#0f172a' : 'white', stroke: '#0f172a', strokeWidth: 1.8 };
      return <g key={i} transform={`translate(${e.x} ${e.y}) rotate(${e.rotation || 0})`}>
        {e.shape === 'circle' ? <circle r={half} {...common} />
          : e.shape === 'square' ? <rect x={-half} y={-half} width={e.size} height={e.size} {...common} />
          : e.shape === 'triangle' ? <polygon points={`0,${-half} ${half},${half} ${-half},${half}`} {...common} />
          : <polygon points={`0,${-half} ${half},0 ${half / 2},0 ${half / 2},${half} ${-half / 2},${half} ${-half / 2},0 ${-half},0`} {...common} />}
      </g>;
    })}
  </svg>;
}

export default function SpatialFigureRenderer({ data, type }) {
  if (type === 'spatial_classification') return <div className="grid grid-cols-3 gap-2 p-3 rounded-xl border bg-slate-50 max-w-lg mx-auto">
    {data.stimulusScenes.map((scene, i) => <div key={i} className="aspect-square"><SpatialScene scene={scene} /></div>)}
  </div>;
  return <div className="grid grid-cols-2 gap-3 p-3 rounded-xl border bg-slate-50 max-w-xs mx-auto">
    {[data.topRow.left, data.topRow.right, data.bottomRow.left].map((scene, i) => <div key={i} className="aspect-square"><SpatialScene scene={scene} /></div>)}
    <div className="aspect-square flex items-center justify-center rounded-xl border-2 border-dashed border-sky-600 text-3xl" aria-label="Missing figure">?</div>
  </div>;
}
