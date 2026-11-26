import React, { useEffect, useRef } from 'react';

export default function SessionChangeDialog({ onCancel, onConfirm }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, []);

  return <dialog ref={dialogRef} aria-labelledby="replace-title" aria-describedby="replace-description"
    onCancel={event => { event.preventDefault(); onCancel(); }}
    className="m-auto max-w-md rounded-2xl bg-white p-6 space-y-4 backdrop:bg-slate-900/60">
    <h2 id="replace-title" className="text-xl font-bold">Start a new session?</h2>
    <p id="replace-description">Changing the session settings will clear your current answers and results.</p>
    <div className="flex flex-wrap gap-3">
      <button autoFocus className="px-4 py-2.5 rounded-xl border font-bold" onClick={onCancel}>Keep this session</button>
      <button className="px-5 py-2.5 rounded-xl bg-sky-700 text-white font-bold" onClick={onConfirm}>Start new session</button>
    </div>
  </dialog>;
}
