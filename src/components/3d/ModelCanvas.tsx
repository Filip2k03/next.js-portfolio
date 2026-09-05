'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, useGLTF } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import { Box3, Vector2, Vector3, type Group } from 'three';
import type { StudioModel } from '@/data/models';
import { SceneBoundary } from './SceneBoundary';

interface ModelProps {
  model: StudioModel;
  animate: boolean;
  detail: 'full' | 'medium';
}

/** Blender export: normalised so every asset fills the same frame regardless of authored size. */
function GltfModel({ model }: { model: StudioModel }) {
  const { scene } = useGLTF(model.src);
  const { scale, offset } = useMemo(() => {
    const box = new Box3().setFromObject(scene);
    const size = box.getSize(new Vector3());
    const scale = model.fit / Math.max(size.x, size.y, size.z);
    const centre = box.getCenter(new Vector3());
    return { scale, offset: centre.multiplyScalar(-scale) };
  }, [scene, model.fit]);
  return <primitive object={scene} scale={scale} position={offset} />;
}

/** Lathe-swept graphite column: shown while an asset streams in or if it fails to load. */
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
  return (
    <mesh>
      <latheGeometry args={[profile, detail === 'full' ? 10 : 8]} />
      <meshPhysicalMaterial color="#2a2e33" metalness={0.75} roughness={0.32} clearcoat={0.8} clearcoatRoughness={0.18} flatShading />
    </mesh>
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
  const placeholder = <Monolith detail={detail} />;
  return (
    <Canvas
      frameloop={animate ? 'always' : 'demand'}
      dpr={detail === 'full' ? [1, 1.5] : [1, 1.25]}
      camera={{ position: detail === 'full' ? [3.1, 1.7, 4.3] : [3.6, 2.1, 5.2], fov: 34 }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 6, 4]} intensity={5} color="#e5eaf1" />
      <directionalLight position={[-5, 2, -2]} intensity={3.5} color="#d2b58b" />
      <directionalLight position={[2, -1, -5]} intensity={2} color="#809dad" />
      <Turntable animate={animate}>
        <SceneBoundary fallback={placeholder}>
          <Suspense fallback={placeholder}>
            <GltfModel key={model.slug} model={model} />
          </Suspense>
        </SceneBoundary>
      </Turntable>
      {detail === 'full' && <ContactShadows position={[0, -1.25, 0]} opacity={0.6} scale={5} blur={2.4} far={2} color="#000000" />}
    </Canvas>
  );
}
