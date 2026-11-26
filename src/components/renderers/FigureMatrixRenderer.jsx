import React from 'react';

/**
 * Universal SVG Shape Renderer
 * Renders primitive and composite geometric shapes with transforms, fills, and patterns
 */
export function Shape({ shape, fill = 'none', color = '#1e293b', rotation = 0, size = 60, innerShape = null, dots = 0, lines = 0, isLarge = false }) {
  const s = isLarge ? size * 1.25 : size;
  const center = 50;
  const half = s / 2;
  const fillColor = fill === 'solid' ? color : fill === 'semi' ? `${color}33` : fill === 'striped' ? 'url(#stripe-pattern)' : 'none';
  const strokeWidth = 2.5;

  // Render base shape path
  const renderBase = () => {
    switch (shape) {
      case 'circle':
        return <circle cx={center} cy={center} r={half} fill={fillColor} stroke={color} strokeWidth={strokeWidth} />;
      case 'square':
        return <rect x={center - half} y={center - half} width={s} height={s} fill={fillColor} stroke={color} strokeWidth={strokeWidth} rx="2" />;
      case 'triangle': {
        const h = (s * Math.sqrt(3)) / 2;
        const p1 = `${center},${center - (2/3)*h}`;
        const p2 = `${center - half},${center + (1/3)*h}`;
        const p3 = `${center + half},${center + (1/3)*h}`;
        return <polygon points={`${p1} ${p2} ${p3}`} fill={fillColor} stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />;
      }
      case 'diamond': {
        const p1 = `${center},${center - half}`;
        const p2 = `${center + half},${center}`;
        const p3 = `${center},${center + half}`;
        const p4 = `${center - half},${center}`;
        return <polygon points={`${p1} ${p2} ${p3} ${p4}`} fill={fillColor} stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />;
      }
      case 'star': {
        const points = [];
        const numPoints = 5;
        const outerR = half;
        const innerR = half * 0.45;
        for (let i = 0; i < numPoints * 2; i++) {
          const r = i % 2 === 0 ? outerR : innerR;
          const angle = (i * Math.PI) / numPoints - Math.PI / 2;
          points.push(`${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`);
        }
        return <polygon points={points.join(' ')} fill={fillColor} stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />;
      }
      case 'pentagon': {
        const points = [];
        for (let i = 0; i < 5; i++) {
          const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
          points.push(`${center + half * Math.cos(angle)},${center + half * Math.sin(angle)}`);
        }
        return <polygon points={points.join(' ')} fill={fillColor} stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />;
      }
      case 'hexagon': {
        const points = [];
        for (let i = 0; i < 6; i++) {
          const angle = (i * 2 * Math.PI) / 6;
          points.push(`${center + half * Math.cos(angle)},${center + half * Math.sin(angle)}`);
        }
        return <polygon points={points.join(' ')} fill={fillColor} stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />;
      }
      case 'cross': {
        const w = s / 3;
        const p = `${center - half},${center - w/2} ${center - w/2},${center - w/2} ${center - w/2},${center - half} 
                   ${center + w/2},${center - half} ${center + w/2},${center - w/2} ${center + half},${center - w/2} 
                   ${center + half},${center + w/2} ${center + w/2},${center + w/2} ${center + w/2},${center + half} 
                   ${center - w/2},${center + half} ${center - w/2},${center + w/2} ${center - half},${center + w/2}`;
        return <polygon points={p} fill={fillColor} stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />;
      }
      case 'arrow_up': {
        const p = `${center},${center - half} ${center + half},${center} ${center + half/2},${center} 
                   ${center + half/2},${center + half} ${center - half/2},${center + half} 
                   ${center - half/2},${center} ${center - half},${center}`;
        return <polygon points={p} fill={fillColor} stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />;
      }
      case 'trapezoid': {
        const p = `${center - half * 0.5},${center - half * 0.7} ${center + half * 0.5},${center - half * 0.7} 
                   ${center + half},${center + half * 0.7} ${center - half},${center + half * 0.7}`;
        return <polygon points={p} fill={fillColor} stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />;
      }
      case 'heart': {
        const d = `M ${center} ${center + half * 0.7} 
                   C ${center - half * 0.8} ${center + half * 0.1}, ${center - half} ${center - half * 0.4}, ${center - half * 0.5} ${center - half * 0.7} 
                   C ${center - half * 0.1} ${center - half * 0.9}, ${center} ${center - half * 0.4}, ${center} ${center - half * 0.4} 
                   C ${center} ${center - half * 0.4}, ${center + half * 0.1} ${center - half * 0.9}, ${center + half * 0.5} ${center - half * 0.7} 
                   C ${center + half} ${center - half * 0.4}, ${center + half * 0.8} ${center + half * 0.1}, ${center} ${center + half * 0.7} Z`;
        return <path d={d} fill={fillColor} stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />;
      }
      default:
        return <circle cx={center} cy={center} r={half} fill={fillColor} stroke={color} strokeWidth={strokeWidth} />;
    }
  };

  // Render internal dots if any
  const renderDots = () => {
    if (!dots || dots <= 0) return null;
    const dotElements = [];
    if (dots === 1) {
      dotElements.push(<circle key="dot1" cx={center} cy={center} r="4" fill={color} />);
    } else if (dots === 2) {
      dotElements.push(<circle key="dot1" cx={center - 10} cy={center} r="3.5" fill={color} />);
      dotElements.push(<circle key="dot2" cx={center + 10} cy={center} r="3.5" fill={color} />);
    } else if (dots === 3) {
      dotElements.push(<circle key="dot1" cx={center} cy={center - 8} r="3.5" fill={color} />);
      dotElements.push(<circle key="dot2" cx={center - 10} cy={center + 8} r="3.5" fill={color} />);
      dotElements.push(<circle key="dot3" cx={center + 10} cy={center + 8} r="3.5" fill={color} />);
    } else if (dots === 4) {
      dotElements.push(<circle key="dot1" cx={center - 10} cy={center - 10} r="3.5" fill={color} />);
      dotElements.push(<circle key="dot2" cx={center + 10} cy={center - 10} r="3.5" fill={color} />);
      dotElements.push(<circle key="dot3" cx={center - 10} cy={center + 10} r="3.5" fill={color} />);
      dotElements.push(<circle key="dot4" cx={center + 10} cy={center + 10} r="3.5" fill={color} />);
    }
    return <g>{dotElements}</g>;
  };

  // Render division lines if any
  const renderLines = () => {
    if (!lines) return null;
    if (lines === 'horizontal') {
      return <line x1={center - half} y1={center} x2={center + half} y2={center} stroke={color} strokeWidth={strokeWidth} />;
    }
    if (lines === 'vertical') {
      return <line x1={center} y1={center - half} x2={center} y2={center + half} stroke={color} strokeWidth={strokeWidth} />;
    }
    if (lines === 'cross') {
      return (
        <g stroke={color} strokeWidth={strokeWidth}>
          <line x1={center - half} y1={center} x2={center + half} y2={center} />
          <line x1={center} y1={center - half} x2={center} y2={center + half} />
        </g>
      );
    }
    return null;
  };

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full max-w-[90px] max-h-[90px] mx-auto select-none">
      <defs>
        <pattern id="stripe-pattern" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="8" stroke={color} strokeWidth="2.5" />
        </pattern>
      </defs>
      <g transform={`rotate(${rotation} ${center} ${center})`}>
        {renderBase()}
        {renderLines()}
        {innerShape && (
          <g transform={`scale(0.5) translate(${center}, ${center})`}>
            <Shape {...innerShape} size={size * 0.5} />
          </g>
        )}
        {renderDots()}
      </g>
    </svg>
  );
}

/**
 * Figure Matrix 2x2 Renderer
 * Represents the official CogAT Form 7/8 Figure Matrices layout
 */
export default function FigureMatrixRenderer({ data }) {
  const { topRow, bottomRow } = data;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* 2x2 Stimulus Grid with classic CogAT divider */}
      <div className="bg-white border-2 border-slate-300 rounded-2xl shadow-sm p-4 inline-block">
        <div className="grid grid-cols-2 gap-3 relative">
          {/* Top Left Shape */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center p-2 shadow-inner">
            <Shape {...topRow.left} />
          </div>

          {/* Top Right Shape */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center p-2 shadow-inner">
            <Shape {...topRow.right} />
          </div>

          {/* Dividing dashed line between top analogy and bottom question */}
          <div className="col-span-2 border-b-2 border-dashed border-sky-300 my-1 relative">
            <span className="absolute left-1/2 -top-2.5 -translate-x-1/2 bg-sky-100 text-sky-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-sky-200">
              transforms as
            </span>
          </div>

          {/* Bottom Left Shape */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center p-2 shadow-inner">
            <Shape {...bottomRow.left} />
          </div>

          {/* Bottom Right Shape (Question Mark) */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-sky-50 border-2 border-dashed border-sky-400 rounded-xl flex flex-col items-center justify-center p-2 text-sky-500 font-bold">
            <span className="text-3xl font-heading animate-pulse">?</span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-sky-600 mt-0.5">Which one?</span>
          </div>
        </div>
      </div>
    </div>
  );
}
