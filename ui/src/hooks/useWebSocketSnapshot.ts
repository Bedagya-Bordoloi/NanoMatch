import { useEffect, useState } from 'react';

export function useWebSocketSnapshot() {
  const [snapshot, setSnapshot] = useState<any>({
    latency: 20.0,
    decisions: [],
    bids: [],
    asks: [],
    equity_history: Array(100).fill(1000), // Start with a flat line
    current_equity: 1000,
    sharpe: 1.45,
    win_rate: 68.2,
    total_steps: 0,
    book: { imbalance: 0 }
  });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');

    ws.onopen = () => setIsConnected(true);
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setSnapshot(data);
      } catch (e) {
        console.error("Snapshot Parse Error", e);
      }
    };
    ws.onclose = () => setIsConnected(false);

    return () => ws.close();
  }, []);

  return { snapshot, isConnected };
}