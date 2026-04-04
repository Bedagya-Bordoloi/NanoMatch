import React from 'react';

interface PriceLevel { price: number; qty: number; }

export function PriceLadder({ bids = [], asks = [] }: { bids: PriceLevel[], asks: PriceLevel[] }) {
  
  // DEBUG CHECK: This helps you see if the component is actually loading
  if (bids.length === 0 && asks.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-[10px] text-cyan-900 animate-pulse font-bold tracking-tighter">
          SYNCHRONIZING WITH L2 FEED...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 font-mono text-[10px] h-full overflow-hidden">
      {/* BIDS COLUMN - LEFT */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between px-1 text-[9px] text-green-900 mb-1 border-b border-green-900/20">
          <span>SIZE</span>
          <span>BID</span>
        </div>
        {bids.slice(0, 12).map((b, i) => (
          <div key={i} className="flex justify-between items-center bg-green-500/5 border-l-2 border-green-500/40 p-1 group hover:bg-green-500/10 transition-colors">
            <span className="text-green-900 font-bold group-hover:text-green-700">{b.qty}</span>
            <span className="text-green-400 font-bold">{b.price.toFixed(1)}</span>
          </div>
        ))}
      </div>

      {/* ASKS COLUMN - RIGHT */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between px-1 text-[9px] text-pink-900 mb-1 border-b border-pink-900/20">
          <span>ASK</span>
          <span>SIZE</span>
        </div>
        {asks.slice(0, 12).map((a, i) => (
          <div key={i} className="flex justify-between items-center bg-pink-500/5 border-r-2 border-pink-500/40 p-1 group hover:bg-pink-500/10 transition-colors">
            <span className="text-pink-400 font-bold">{a.price.toFixed(1)}</span>
            <span className="text-pink-900 font-bold group-hover:text-pink-700">{a.qty}</span>
          </div>
        ))}
      </div>
    </div>
  );
}