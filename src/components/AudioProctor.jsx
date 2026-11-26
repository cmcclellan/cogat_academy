import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

/**
 * Web Speech API Proctor for early elementary (Grade 2) students
 * Reads questions aloud in a clear, supportive voice.
 */
export default function AudioProctor({ script, autoPlay = false }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSupported(false);
      return;
    }

    if (autoPlay && script) {
      speakText(script);
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [script, autoPlay]);

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // Stop any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Pacing optimized for 7-year-olds
    utterance.rate = 0.88; 
    utterance.pitch = 1.05;

    // Pick a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const friendlyVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Zira')));
    if (friendlyVoice) {
      utterance.voice = friendlyVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const toggleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      speakText(script);
    }
  };

  if (!supported) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleSpeak}
        type="button"
        title={isSpeaking ? "Pause Proctor Voice" : "Listen to Teacher / Proctor"}
        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full font-heading font-semibold text-xs sm:text-sm transition-all shadow-sm ${
          isSpeaking
            ? 'bg-amber-400 text-slate-900 ring-2 ring-amber-300 animate-pulse'
            : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
        }`}
      >
        {isSpeaking ? (
          <>
            <Pause className="w-4 h-4 fill-slate-900" />
            <span>Listening...</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>Read to Me (Proctor Voice)</span>
          </>
        )}
      </button>
    </div>
  );
}
