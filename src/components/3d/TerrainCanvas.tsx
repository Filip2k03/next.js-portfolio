'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { BufferAttribute, PlaneGeometry, type Mesh } from 'three';

interface TerrainProps {
  /** Freeze the surface (reduced motion). */
  animate: boolean;
  /** Grid resolution per side; lower on tablets. */
  segments: number;
}

// Layered sines stand in for noise: cheap, deterministic and smooth enough for a wireframe.
const height = (x: number, y: number, t: number) =>
  Math.sin(x * 0.9 + t) * 0.35 + Math.cos(y * 1.3 - t * 0.7) * 0.28 + Math.sin((x + y) * 0.5 + t * 0.4) * 0.22;

function Terrain({ animate, segments }: TerrainProps) {
  const mesh = useRef<Mesh>(null);
  const geometry = useMemo(() => new PlaneGeometry(12, 8, segments, segments), [segments]);
  const base = useMemo(() => geometry.getAttribute('position').array.slice(), [geometry]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = animate ? clock.getElapsedTime() * 0.35 : 0;
    const attr = mesh.current.geometry.getAttribute('position') as BufferAttribute;
    for (let i = 0; i < attr.count; i++) {
      const x = base[i * 3];
      const y = base[i * 3 + 1];
      attr.setZ(i, height(x, y, t));
    }
    attr.needsUpdate = true;
  });

  return (
    <mesh ref={mesh} geometry={geometry} rotation={[-1.05, 0, 0.2]} position={[0, -1.1, 0]}>
      <meshBasicMaterial color="#c8a56b" wireframe transparent opacity={0.45} />
    </mesh>
  );
}

export default function TerrainCanvas({ animate, segments }: TerrainProps) {
  return (
    <Canvas
      frameloop={animate ? 'always' : 'demand'}
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.2, 6.5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      <Terrain animate={animate} segments={segments} />
    </Canvas>
  );
}
