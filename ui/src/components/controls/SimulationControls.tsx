import React, { useState } from 'react';
import { Play, Pause, Zap, RotateCcw } from 'lucide-react';

export function SimulationControls() {
  const [isTurbo, setIsTurbo] = useState(false);

  const sendCommand = async (cmd: string) => {
    if (cmd === 'turbo') {
      const newTurbo = !isTurbo;
      setIsTurbo(newTurbo);
      cmd = newTurbo ? 'turbo_on' : 'turbo_off';
    }
    await fetch('http://127.0.0.1:8001/control', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cmd })
    });
  };

  const btnClass = "flex items-center gap-1 px-3 py-1 bg-cyan-500/10 border border-cyan-500/50 rounded text-cyan-400 text-[10px] font-bold hover:bg-cyan-500/20 transition-all";

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => sendCommand('start')} className={btnClass}>
        <Play size={12} fill="currentColor" /> START
      </button>
      <button onClick={() => sendCommand('pause')} className={btnClass}>
        <Pause size={12} fill="currentColor" /> PAUSE
      </button>
      <button 
        onClick={() => sendCommand('turbo')} 
        className={`${btnClass} ${isTurbo ? 'bg-pink-500/20 border-pink-500 text-pink-500 animate-pulse' : ''}`}
      >
        <Zap size={12} fill="currentColor" /> TURBO
      </button>
      <button onClick={() => sendCommand('reset')} className={btnClass}>
        <RotateCcw size={12} /> RESET
      </button>
    </div>
  );
}