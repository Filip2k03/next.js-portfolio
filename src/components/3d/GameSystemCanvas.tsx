'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Grid, RoundedBox } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import { Color, Object3D, type InstancedMesh, type Mesh } from 'three';
import { WaveDirector, type AgentState, type DirectorSnapshot } from '@/lib/waveDirector';

interface GameSystemProps {
  animate: boolean;
  detail: 'full' | 'medium';
  /** Throttled director readout for the DOM HUD. */
  onSnapshot: (s: DirectorSnapshot) => void;
}

const STATE_COLOR: Record<AgentState, Color> = {
  spawn: new Color('#4f5a63'),
  advance: new Color('#c8a56b'),
  hold: new Color('#efd1a0'),
  retreat: new Color('#5a5045'),
};

function Agents({ animate, detail, onSnapshot }: GameSystemProps) {
  const mesh = useRef<InstancedMesh>(null);
  const core = useRef<Mesh>(null);
  const director = useMemo(() => new WaveDirector(detail === 'full' ? 48 : 28), [detail]);
  const dummy = useMemo(() => new Object3D(), []);
  const hud = useRef(0);

  useEffect(() => onSnapshot(director.snapshot()), [director, onSnapshot]);

  useFrame(({ clock }, dt) => {
    const m = mesh.current;
    if (!m) return;
    if (animate) director.tick(Math.min(dt, 0.05));

    const t = clock.getElapsedTime();
    director.agents.forEach((a, i) => {
      const lift = a.state === 'hold' ? 0.25 + Math.sin(t * 6 + i) * 0.05 : 0.12;
      dummy.position.set(a.x, lift, a.z);
      dummy.rotation.set(0, -a.angle, 0);
      const s = a.state === 'spawn' ? 0.6 : 1;
      dummy.scale.set(0.18 * s, 0.24 * s, 0.18 * s);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
      m.setColorAt(i, STATE_COLOR[a.state]);
    });
    m.count = director.agents.length;
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;

    if (core.current) core.current.rotation.y = t * 0.4;

    // 4 Hz is plenty for a text readout and keeps React renders out of the hot path.
    if (t - hud.current > 0.25) {
      hud.current = t;
      onSnapshot(director.snapshot());
    }
  });

  return (
    <>
      <instancedMesh ref={mesh} args={[undefined, undefined, director.maxAgents]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial metalness={0.85} roughness={0.3} />
      </instancedMesh>
      <RoundedBox ref={core} args={[0.7, 0.9, 0.7]} radius={0.06} smoothness={detail === 'full' ? 4 : 2} position={[0, 0.45, 0]}>
        <meshStandardMaterial color="#353b41" metalness={0.92} roughness={0.22} emissive="#2a2114" />
      </RoundedBox>
    </>
  );
}

export default function GameSystemCanvas(props: GameSystemProps) {
  return (
    <Canvas
      frameloop={props.animate ? 'always' : 'demand'}
      dpr={props.detail === 'full' ? [1, 1.5] : [1, 1.25]}
      camera={{ position: [4.2, 3.4, 4.2], fov: 38 }}
      onCreated={({ camera }) => camera.lookAt(0, 0.2, 0)}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[4, 8, 2]} intensity={4.5} color="#e5eaf1" />
      <directionalLight position={[-5, 3, -3]} intensity={2.5} color="#d2b58b" />
      <Grid
        args={[12, 12]}
        cellSize={0.5}
        sectionSize={2}
        cellThickness={0.5}
        sectionThickness={1}
        cellColor="#2b2f33"
        sectionColor="#6e6252"
        fadeDistance={11}
        fadeStrength={1.5}
        infiniteGrid={false}
      />
      <Agents {...props} />
    </Canvas>
  );
}
