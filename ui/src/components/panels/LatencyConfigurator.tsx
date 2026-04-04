import React, { useState } from 'react';

export function LatencyConfigurator() {
  const [latency, setLatency] = useState(22);
  const [variance, setVariance] = useState(15);
  const [fee, setFee] = useState(2);

  const updateBackend = async (key: string, value: number) => {
    try {
      await fetch('http://127.0.0.1:8001/update_physics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [key]: value })
      });
    } catch (err) {
      console.error("Connection to Port 8001 failed:", err);
    }
  };

  return (
    <div className="space-y-8 p-2">
      {/* NETWORK LATENCY */}
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-cyan-400 text-[10px] font-bold tracking-widest">NETWORK LATENCY (µs)</span>
          <span className="text-white text-xs font-mono">{latency} µs</span>
        </div>
        <input 
          type="range" min="5" max="500" value={latency}
          onChange={(e) => {
            const val = Number(e.target.value);
            setLatency(val);
            updateBackend('latency', val);
          }}
          className="w-full accent-cyan-500 bg-neutral-800 rounded-lg appearance-none h-1.5 cursor-pointer"
        />
      </div>

      {/* QUEUE VARIANCE */}
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-cyan-400 text-[10px] font-bold tracking-widest">QUEUE POSITION VARIANCE</span>
          <span className="text-white text-xs font-mono">{variance}%</span>
        </div>
        <input 
          type="range" min="0" max="100" value={variance}
          onChange={(e) => {
            const val = Number(e.target.value);
            setVariance(val);
            updateBackend('variance', val);
          }}
          className="w-full accent-cyan-500 bg-neutral-800 rounded-lg appearance-none h-1.5 cursor-pointer"
        />
      </div>

      {/* FEE RATE */}
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-cyan-400 text-[10px] font-bold tracking-widest">FEE RATE (bps)</span>
          <span className="text-white text-xs font-mono">{fee} bps</span>
        </div>
        <input 
          type="range" min="0" max="50" value={fee}
          onChange={(e) => {
            const val = Number(e.target.value);
            setFee(val);
            updateBackend('fee_rate', val);
          }}
          className="w-full accent-cyan-500 bg-neutral-800 rounded-lg appearance-none h-1.5 cursor-pointer"
        />
      </div>
    </div>
  );
}