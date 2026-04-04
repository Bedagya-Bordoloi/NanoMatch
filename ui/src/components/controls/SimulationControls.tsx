import { Play, Pause, RotateCcw, FastForward } from 'lucide-react';

export function SimulationControls() {
  return (
    <div className="flex gap-3">
      <button className="px-4 py-1.5 bg-cyan-900/50 hover:bg-cyan-600 text-xs rounded flex items-center gap-2 transition-colors">
        <Play size={14} /> START
      </button>
      <button className="px-4 py-1.5 bg-cyan-900/50 hover:bg-cyan-600 text-xs rounded flex items-center gap-2 transition-colors">
        <Pause size={14} /> PAUSE
      </button>
      <button className="px-4 py-1.5 bg-cyan-900/50 hover:bg-cyan-600 text-xs rounded flex items-center gap-2 transition-colors">
        <FastForward size={14} /> TURBO
      </button>
      <button className="px-4 py-1.5 bg-cyan-900/50 hover:bg-cyan-600 text-xs rounded flex items-center gap-2 transition-colors">
        <RotateCcw size={14} /> RESET
      </button>
    </div>
  );
}