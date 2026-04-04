import { useEffect, useState, useRef } from 'react';

export function useWebSocketSnapshot() {
  const [snapshot, setSnapshot] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connect = () => {
      // Force 127.0.0.1 for high-speed stability
      ws.current = new WebSocket('ws://127.0.0.1:8001/ws');

      ws.current.onopen = () => {
        console.log("✅ WS Connected");
        setIsConnected(true);
      };

      ws.current.onmessage = (event) => {
        setSnapshot(JSON.parse(event.data));
      };

      ws.current.onclose = () => {
        setIsConnected(false);
        setTimeout(connect, 2000); // Reconnect loop
      };
    };

    connect();
    return () => ws.current?.close();
  }, []);

  // Safe fallback to prevent empty dashboard
  const safeSnapshot = snapshot || {
    latency: 0,
    decisions: [],
    bids: [],
    asks: [],
    equity_history: Array(300).fill(1000),
    book: { imbalance: 0 }
  };

  return { snapshot: safeSnapshot, isConnected };
}