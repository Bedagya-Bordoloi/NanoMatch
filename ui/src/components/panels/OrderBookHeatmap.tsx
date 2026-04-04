import React from 'react';

export function OrderBookHeatmap({ imbalance = 0 }: { imbalance: number }) {
  // imbalance ranges from -1 (sell pressure) to 1 (buy pressure)
  const percentage = ((imbalance + 1) / 2) * 100;
  
  return (
    <div className="relative w-full h-16 bg-neutral-900 rounded-xl border border-white/5 overflow-hidden flex items-center">
      {/* Dynamic Background Gradient */}
      <div 
        className="absolute inset-0 transition-all duration-500 ease-out opacity-40"
        style={{ 
          background: `linear-gradient(90deg, #ff00ff 0%, #00f2ff ${percentage}%, #00f2ff 100%)`,
          width: `${percentage}%` 
        }}
      />
      
      <div className="relative w-full flex justify-between px-6 z-10 font-bold tracking-tighter">
        <span className={imbalance < 0 ? "text-pink-500 animate-pulse" : "text-white/20"}>SELL PRESSURE</span>
        <span className="text-white text-xl">{(imbalance).toFixed(2)}</span>
        <span className={imbalance > 0 ? "text-cyan-400 animate-pulse" : "text-white/20"}>BUY PRESSURE</span>
      </div>
    </div>
  );
}