'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import { Color, Object3D, type Group, type InstancedMesh } from 'three';
import { technologies } from '@/data/technologies';

interface ConstellationProps {
  /** Index of the highlighted technology group. */
  active: number;
  animate: boolean;
  detail: 'full' | 'medium';
}

const BASE = new Color('#6e6252');
const HOT = new Color('#efd1a0');
const RING_TILT = 0.42;

/** Every technology becomes one instance placed on its group's orbit; groups are concentric rings. */
function useLayout() {
  return useMemo(() => {
    const items: { group: number; angle: number; radius: number; y: number }[] = [];
    technologies.forEach((group, g) => {
      const radius = 1.15 + g * 0.34;
      group.items.forEach((_, i) => {
        const angle = (i / group.items.length) * Math.PI * 2 + g * 0.7;
        items.push({ group: g, angle, radius, y: Math.sin(angle * 2 + g) * 0.08 });
      });
    });
    return items;
  }, []);
}

function Particles({ active, animate }: Pick<ConstellationProps, 'active' | 'animate'>) {
  const mesh = useRef<InstancedMesh>(null);
  const layout = useLayout();
  const dummy = useMemo(() => new Object3D(), []);
  const color = useMemo(() => new Color(), []);

  // Colours only change with the selection, so write them outside the frame loop.
  useEffect(() => {
    if (!mesh.current) return;
    layout.forEach((p, i) => {
      color.copy(p.group === active ? HOT : BASE);
      mesh.current!.setColorAt(i, color);
    });
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  }, [active, layout, color]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = animate ? clock.getElapsedTime() : 0;
    layout.forEach((p, i) => {
      const a = p.angle + t * (0.08 + p.group * 0.01);
      const hot = p.group === active;
      dummy.position.set(Math.cos(a) * p.radius, p.y + (hot ? Math.sin(t * 3 + i) * 0.03 : 0), Math.sin(a) * p.radius);
      const s = hot ? 0.075 : 0.045;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, layout.length]}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial metalness={0.9} roughness={0.25} emissive="#2a2114" />
    </instancedMesh>
  );
}

function Rings({ active, detail }: Pick<ConstellationProps, 'active' | 'detail'>) {
  const segments = detail === 'full' ? 96 : 48;
  return (
    <>
      {technologies.map((_, g) => {
        const radius = 1.15 + g * 0.34;
        const points = Array.from({ length: segments + 1 }, (_, i) => {
          const a = (i / segments) * Math.PI * 2;
          return [Math.cos(a) * radius, 0, Math.sin(a) * radius] as [number, number, number];
        });
        const hot = g === active;
        return (
          <Line
            key={g}
            points={points}
            color={hot ? '#e6cf9f' : '#5a5045'}
            lineWidth={hot ? 1.2 : 0.5}
            transparent
            opacity={hot ? 0.9 : 0.45}
            dashed={g % 2 === 1}
            dashSize={0.12}
            gapSize={0.08}
          />
        );
      })}
    </>
  );
}

/** Slow orbital drift plus a faint tilt toward the pointer, so the field reads as a volume. */
function Orbit({ children, animate }: { children: React.ReactNode; animate: boolean }) {
  const group = useRef<Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const t = animate ? clock.getElapsedTime() : 0;
    group.current.rotation.x = RING_TILT + pointer.y * -0.08;
    group.current.rotation.z = pointer.x * 0.06;
    group.current.rotation.y = t * 0.05;
  });
  return <group ref={group}>{children}</group>;
}

export default function ConstellationCanvas({ active, animate, detail }: ConstellationProps) {
  return (
    <Canvas
      frameloop={animate ? 'always' : 'demand'}
      dpr={detail === 'full' ? [1, 1.5] : [1, 1.25]}
      camera={{ position: [0, 0.4, 6.4], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 5, 4]} intensity={4} color="#e5eaf1" />
      <directionalLight position={[-4, -2, 2]} intensity={2.5} color="#d2b58b" />
      <Orbit animate={animate}>
        <Rings active={active} detail={detail} />
        <Particles active={active} animate={animate} />
      </Orbit>
    </Canvas>
  );
}
