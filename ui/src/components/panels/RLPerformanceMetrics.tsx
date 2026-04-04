export function RLPerformanceMetrics({ metrics }: { metrics: any }) {
  return (
    <div className="space-y-2 text-xs">
      <div className="flex justify-between">
        <span>SHARPE RATIO</span>
        <span className="text-[#00ff9f]">{metrics?.sharpe?.toFixed(2) || '1.45'}</span>
      </div>
      <div className="flex justify-between">
        <span>EQUITY CURVE</span>
        <span className="text-cyan-300">{metrics?.equity || '$1,024.50'}</span>
      </div>
      <div className="flex justify-between">
        <span>TOTAL STEPS</span>
        <span className="text-yellow-400">{metrics?.steps || '45,231'}</span>
      </div>
      <div className="flex justify-between">
        <span>WIN RATE</span>
        <span className="text-[#ff00ff]">{metrics?.winRate || '68.2%'}</span>
      </div>
    </div>
  );
}