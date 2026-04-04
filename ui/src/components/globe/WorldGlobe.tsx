// src/ui/src/components/globe/WorldGlobe.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { LatencyArcs } from './LatencyArcs';

export function WorldGlobe({ activeArcs = [], latencyLevel = 22 }: { activeArcs?: any[]; latencyLevel?: number }) {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 7] }} style={{ background: '#050505' }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} color="#00f2ff" />

        <Sphere args={[2.8, 64, 64]}>
          <meshStandardMaterial color="#0a0f1a" wireframe emissive="#112233" />
        </Sphere>

        <LatencyArcs arcs={activeArcs} />

        <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.2} />
      </Canvas>

      <div className="absolute top-4 left-4 bg-black/70 px-4 py-2 rounded text-xs text-cyan-400 border border-cyan-900">
        SIMULATED GLOBAL NETWORK • {latencyLevel}µs
      </div>
    </div>
  );
}