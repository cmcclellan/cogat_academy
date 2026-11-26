import React from 'react';

// Small code-native illustrations replace emoji that depicted a different object.
export default function PictureIllustration({ name, label }) {
  const drawings = {
    tennis_racket: <><g transform="rotate(30 50 50)"><ellipse cx="44" cy="32" rx="19" ry="25" fill="#e0f2fe" stroke="#0369a1" strokeWidth="4" /><path d="M34 14V50M44 9V55M54 14V50M27 24H61M26 34H62M29 44H59" fill="none" stroke="#64748b" strokeWidth="1.2" /><path d="M44 57V89" stroke="#334155" strokeWidth="7" /></g><circle cx="76" cy="76" r="12" fill="#a3e635" stroke="#4d7c0f" strokeWidth="2" /><path d="M69 66Q81 76 69 86" fill="none" stroke="white" strokeWidth="2" /></>,
    leash: <><ellipse cx="28" cy="22" rx="15" ry="12" fill="none" stroke="#b45309" strokeWidth="5" /><path d="M40 30 Q80 35 60 65 Q45 85 80 82" fill="none" stroke="#b45309" strokeWidth="5" /><path d="M80 75v15h10v-8" fill="none" stroke="#475569" strokeWidth="4" /></>,
    doghouse: <><path d="M15 45L50 12 85 45V90H15Z" fill="#d97706" /><path d="M8 46L50 8 92 46" fill="none" stroke="#7c2d12" strokeWidth="7" /><path d="M36 90V65a14 14 0 0 1 28 0v25" fill="#422006" /></>,
    tadpole: <><path d="M44 52Q70 75 92 37Q73 53 50 34" fill="#5b713b" /><ellipse cx="33" cy="42" rx="24" ry="18" fill="#5b713b" /><circle cx="20" cy="37" r="4" fill="white" /><circle cx="20" cy="37" r="2" fill="#111827" /></>,
    barn: <><path d="M12 43L28 21 50 10 72 21 88 43V90H12Z" fill="#dc2626" stroke="#7f1d1d" strokeWidth="3" /><path d="M32 90V52H68V90M32 52L68 90M68 52L32 90" fill="none" stroke="white" strokeWidth="4" /><rect x="42" y="28" width="16" height="12" fill="#dbeafe" /></>,
    freezer: <><rect x="24" y="8" width="52" height="84" rx="5" fill="#cbd5e1" stroke="#334155" strokeWidth="3" /><path d="M24 39H76M33 20V30M33 49V61" stroke="#334155" strokeWidth="3" /><path d="M51 52V78M39 58L63 72M39 72L63 58" stroke="#0284c7" strokeWidth="3" /></>,
    oven: <><rect x="12" y="16" width="76" height="73" rx="5" fill="#cbd5e1" stroke="#334155" strokeWidth="3" /><rect x="23" y="43" width="54" height="34" rx="3" fill="#1e293b" /><path d="M28 47H72M28 84V93M72 84V93" stroke="#334155" strokeWidth="4" />{[28,50,72].map(x=><circle key={x} cx={x} cy="29" r="5" fill="#475569" />)}</>,
    dam: <><path d="M5 14H95V90H5Z" fill="#7dd3fc" />{[25,40,55,70].map((y,i)=><path key={y} d={`M12 ${y}L88 ${y+12}`} stroke={i%2?'#78350f':'#a16207'} strokeWidth="9" />)}<path d="M12 80Q24 70 36 80T60 80T84 80" fill="none" stroke="white" strokeWidth="3" /></>,
    harp: <><path d="M22 15Q75 6 79 23L55 86H24Z" fill="#fef3c7" stroke="#a16207" strokeWidth="6" />{[30,39,48,57,66].map(x=><path key={x} d={`M${x} 21L${Math.min(x,54)} 81`} stroke="#b45309" strokeWidth="1.5" />)}<path d="M17 90H64" stroke="#a16207" strokeWidth="7" /></>,
    watering_can: <><path d="M23 46H65V83H23Z" fill="#16a34a" /><path d="M64 51Q92 20 83 67H65M23 62L7 41 3 45 18 80 25 80" fill="none" stroke="#15803d" strokeWidth="7" /><ellipse cx="44" cy="46" rx="21" ry="6" fill="#4ade80" /><path d="M3 45L12 37" stroke="#166534" strokeWidth="6" /></>,
    paint_roller: <><rect x="12" y="12" width="63" height="25" rx="6" fill="#a855f7" /><path d="M75 25H87V50H48V67" fill="none" stroke="#475569" strokeWidth="5" /><rect x="40" y="65" width="16" height="28" rx="5" fill="#d97706" /></>
  };
  return <svg role="img" aria-label={label} viewBox="0 0 100 100" className="w-16 h-16">{drawings[name]}</svg>;
}
