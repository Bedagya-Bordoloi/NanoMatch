export function LatencyConfigurator() {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs text-cyan-300 block mb-2">NETWORK LATENCY (µs)</label>
        <input type="range" min="10" max="500" defaultValue="22" className="w-full" />
        <div className="text-xs text-gray-400 mt-1">22 µs</div>
      </div>
      <div>
        <label className="text-xs text-cyan-300 block mb-2">QUEUE POSITION VARIANCE</label>
        <input type="range" min="0" max="100" defaultValue="15" className="w-full" />
        <div className="text-xs text-gray-400 mt-1">15%</div>
      </div>
      <div>
        <label className="text-xs text-cyan-300 block mb-2">FEE RATE (bps)</label>
        <input type="range" min="0" max="50" defaultValue="2" className="w-full" />
        <div className="text-xs text-gray-400 mt-1">2 bps</div>
      </div>
    </div>
  );
}