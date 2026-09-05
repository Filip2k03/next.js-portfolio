'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, useGLTF } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import { Vector2, type Group } from 'three';
import type { StudioModel } from '@/data/models';

interface ModelProps {
  model: StudioModel;
  animate: boolean;
  detail: 'full' | 'medium';
}

/** Blender export path: any .glb in public/models renders through this branch. */
function GltfModel({ src, scale }: { src: string; scale: number }) {
  const { scene } = useGLTF(src, true);
  return <primitive object={scene} scale={scale} />;
}

/** Lathe-swept graphite column; the stand-in until an authored asset ships. */
function Monolith({ detail }: { detail: 'full' | 'medium' }) {
  const profile = useMemo(
    () => [
      new Vector2(0, -1.1),
      new Vector2(0.62, -1.1),
      new Vector2(0.7, -1.0),
      new Vector2(0.7, -0.75),
      new Vector2(0.5, -0.65),
      new Vector2(0.48, 0.75),
      new Vector2(0.56, 0.85),
      new Vector2(0.56, 1.02),
      new Vector2(0.3, 1.12),
      new Vector2(0, 1.12),
    ],
    [],
  );
  const segments = detail === 'full' ? 10 : 8;
  return (
    <group>
      <mesh castShadow>
        <latheGeometry args={[profile, segments]} />
        <meshPhysicalMaterial color="#2a2e33" metalness={0.75} roughness={0.32} clearcoat={0.8} clearcoatRoughness={0.18} flatShading />
      </mesh>
      <mesh position={[0, -0.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.72, 0.745, 64]} />
        <meshBasicMaterial color="#b69b70" />
      </mesh>
    </group>
  );
}

function Turntable({ children, animate }: { children: React.ReactNode; animate: boolean }) {
  const group = useRef<Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const t = animate ? clock.getElapsedTime() : 0;
    group.current.rotation.y = t * 0.35 + pointer.x * 0.3;
    group.current.rotation.x = pointer.y * -0.08;
  });
  return <group ref={group}>{children}</group>;
}

export default function ModelCanvas({ model, animate, detail }: ModelProps) {
  return (
    <Canvas
      frameloop={animate ? 'always' : 'demand'}
      dpr={detail === 'full' ? [1, 1.5] : [1, 1.25]}
      camera={{ position: detail === 'full' ? [2.6, 1.4, 3.6] : [3.2, 1.8, 4.6], fov: 34 }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 6, 4]} intensity={5} color="#e5eaf1" />
      <directionalLight position={[-5, 2, -2]} intensity={3.5} color="#d2b58b" />
      <directionalLight position={[2, -1, -5]} intensity={2} color="#809dad" />
      <Turntable animate={animate}>
        <Suspense fallback={<Monolith detail={detail} />}>
          {model.src ? <GltfModel src={model.src} scale={model.scale} /> : <Monolith detail={detail} />}
        </Suspense>
      </Turntable>
      {detail === 'full' && <ContactShadows position={[0, -1.12, 0]} opacity={0.6} scale={5} blur={2.4} far={2} color="#000000" />}
    </Canvas>
  );
}
