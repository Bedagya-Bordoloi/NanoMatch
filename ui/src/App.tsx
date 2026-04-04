import React, { useEffect } from 'react';
import { WorldGlobe } from './components/globe/WorldGlobe';
import { AgentDecisionTable } from './components/panels/AgentDecisionTable';
import { LatencyConfigurator } from './components/panels/LatencyConfigurator';
import { OrderBookHeatmap } from './components/panels/OrderBookHeatmap';
import { PriceLadder } from './components/panels/PriceLadder';
import { EquityCurve } from './components/panels/EquityCurve';
import { RLPerformanceMetrics } from './components/panels/RLPerformanceMetrics';
import { SimulationControls } from './components/controls/SimulationControls';
import { useWebSocketSnapshot } from './hooks/useWebSocketSnapshot';

export default function App() {
  const { snapshot, isConnected } = useWebSocketSnapshot();

  // DEBUG: Check if data is actually arriving
  useEffect(() => {
    if (snapshot.decisions.length > 0) console.log("Data arriving:", snapshot);
  }, [snapshot]);

  return (
    <div className="h-screen w-screen bg-[#050505] text-[#00f2ff] font-mono p-4 flex flex-col overflow-hidden">
      {/* HEADER */}
      <header className="h-16 border-b border-cyan-900/50 flex items-center justify-between px-8 bg-black/70 backdrop-blur-xl mb-4 rounded-2xl shrink-0">
        <div className="flex items-center gap-6">
          <div className="text-2xl font-bold tracking-[4px] text-white">NANO<span className="text-[#00ff9f]">MATCH</span></div>
          <div className="px-3 py-1 text-[10px] bg-green-500/10 border border-green-500/40 rounded-full text-green-400">
            C++ ENGINE LIVE • 1.2M MSG/S
          </div>
        </div>

        <div className="flex items-center gap-8 text-xs">
          <span>STATUS: <span className={isConnected ? "text-green-400" : "text-red-400"}>{isConnected ? "CONNECTED" : "DISCONNECTED"}</span></span>
          <span>LATENCY: <span className="text-yellow-400">{snapshot?.latency || 0} µs</span></span>
        </div>

        <SimulationControls />
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0 overflow-hidden">
        
        {/* LEFT: DECISION STREAM */}
        <div className="col-span-3 flex flex-col gap-4 bg-neutral-900/20 border border-cyan-900/30 rounded-3xl p-5 overflow-hidden">
          <h2 className="text-[10px] uppercase tracking-widest text-cyan-500 font-bold mb-2">● Agent Decision Stream</h2>
          <AgentDecisionTable decisions={snapshot?.decisions || []} />
          
          <div className="mt-auto pt-4 border-t border-cyan-900/30">
             <h2 className="text-[10px] uppercase tracking-widest text-cyan-500 font-bold mb-2">● Performance</h2>
             <RLPerformanceMetrics metrics={snapshot} />
          </div>
        </div>

        {/* CENTER: GLOBE & IMBALANCE */}
        <div className="col-span-6 flex flex-col gap-4 min-h-0">
          <div className="flex-1 relative bg-black/40 border border-cyan-900/20 rounded-3xl overflow-hidden">
            <WorldGlobe activeArcs={snapshot?.arcs || []} latencyLevel={snapshot?.latency || 20} />
          </div>
          
          <div className="h-28 bg-neutral-900/30 border border-cyan-900/40 rounded-3xl p-4 overflow-hidden">
            <h2 className="text-[10px] uppercase tracking-widest text-cyan-500 font-bold mb-2">● Order Flow Imbalance</h2>
            <OrderBookHeatmap imbalance={snapshot?.book?.imbalance || 0} />
          </div>
        </div>

        {/* RIGHT: CONFIG & ORDER BOOK */}
        <div className="col-span-3 flex flex-col gap-4 overflow-hidden">
          <div className="flex-1 bg-neutral-900/20 border border-cyan-900/30 rounded-3xl p-5">
            <h2 className="text-[10px] uppercase tracking-widest text-cyan-500 font-bold mb-2">● Physics Config</h2>
            <LatencyConfigurator />
          </div>
          
          <div className="flex-1 bg-neutral-900/20 border border-cyan-900/30 rounded-3xl p-5 overflow-hidden">
            <h2 className="text-[10px] uppercase tracking-widest text-cyan-500 font-bold mb-2">● Live Order Book</h2>
            <PriceLadder bids={snapshot?.bids || []} asks={snapshot?.asks || []} />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="h-32 bg-black border border-cyan-900/50 mt-4 rounded-3xl overflow-hidden shrink-0">
        <EquityCurve data={snapshot?.equity_history || []} />
      </footer>
    </div>
  );
}