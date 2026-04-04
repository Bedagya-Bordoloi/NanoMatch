// src/ui/src/components/globe/LatencyArcs.tsx
import { useRef } from 'react';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

export function LatencyArcs({ arcs = [] }: { arcs?: any[] }) {
  return (
    <>
      {arcs.map((arc, i) => {
        const color = arc.side === 'buy' ? '#00f2ff' : '#ff00ff';
        const start = [0, 0, 0];
        const end = arc.side === 'buy' ? [4, 2.5, 0] : [-4, 2.5, 0];

        return (
          <Line
            key={i}
            points={[start, end]}
            color={color}
            lineWidth={3 + (arc.intensity || 0.8) * 5}
            transparent
            opacity={0.85}
          />
        );
      })}
    </>
  );
}