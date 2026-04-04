import { useEffect, useRef } from 'react';
import uPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';

export function EquityCurve({ data = [] }: { data: number[] }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const plotInstance = useRef<uPlot | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const xData = Array.from({ length: data.length }, (_, i) => i);
    const opts: uPlot.Options = {
      width: chartRef.current.offsetWidth, // Grabs actual width
      height: 120,
      cursor: { show: false },
      scales: { x: { time: false }, y: { auto: true } },
      axes: [
        { show: false },
        { stroke: "#444", grid: { stroke: "#111" }, values: (self, ticks) => ticks.map(v => "$" + v.toLocaleString()) }
      ],
      series: [
        {},
        { stroke: "#00ffcc", width: 2, fill: "rgba(0, 255, 204, 0.05)", points: { show: false } }
      ]
    };

    plotInstance.current = new uPlot(opts, [xData, data], chartRef.current);
    
    const handleResize = () => plotInstance.current?.setSize({ width: chartRef.current?.offsetWidth || 800, height: 120 });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      plotInstance.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (plotInstance.current && data.length > 0) {
      const xData = Array.from({ length: data.length }, (_, i) => i);
      plotInstance.current.setData([xData, data]);
    }
  }, [data]);

  return (
    <div className="w-full h-full flex flex-col px-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">● Portfolio Performance Path</span>
        <span className="text-xs font-mono text-cyan-400 font-bold">${data[data.length - 1]?.toLocaleString(undefined, {minimumFractionDigits: 3})}</span>
      </div>
      <div ref={chartRef} className="flex-1 w-full" />
    </div>
  );
}