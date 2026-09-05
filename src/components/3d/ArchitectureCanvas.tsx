'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Line, RoundedBox } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import { Vector3 } from 'three';
import { HUB_NODE, architectureNodes } from '@/data/architecture';

interface SceneProps {
  selected: number;
  onSelect: (index: number) => void;
  /** Lower detail for tablets: fewer segments, no rim ring. */
  detail: 'full' | 'medium';
}

const REST_POSITION = new Vector3(8.5, 6.2, 11);
const REST_LOOK = new Vector3(0, -1.7, 0);
const PLATFORM_Y = -2.8;

/** Eases the camera toward the selected node; only requests frames while moving (frameloop="demand"). */
function CameraRig({ selected }: { selected: number }) {
  const { camera, invalidate } = useThree();
  const look = useRef(REST_LOOK.clone());
  const { position, target } = useMemo(() => {
    if (selected < 0) return { position: REST_POSITION, target: REST_LOOK };
    const [x, y, z] = architectureNodes[selected].position;
    return {
      position: new Vector3(x * 0.45 + 6.4, 4.4, z * 0.45 + 8.4),
      target: new Vector3(x * 0.6, y + 0.4, z * 0.6),
    };
  }, [selected]);
  useEffect(() => invalidate(), [selected, invalidate]);
  useFrame(() => {
    if (camera.position.distanceTo(position) > 0.01 || look.current.distanceTo(target) > 0.01) {
      camera.position.lerp(position, 0.07);
      look.current.lerp(target, 0.07);
      camera.lookAt(look.current);
      invalidate();
    }
  });
  return null;
}

function Blocks({ selected, onSelect, detail }: SceneProps) {
  const smoothness = detail === 'full' ? 4 : 2;
  const hub = architectureNodes[HUB_NODE];
  return (
    <group>
      {architectureNodes.map((node, i) => {
        const active = selected === i;
        const isHub = i === HUB_NODE;
        return (
          <group position={node.position} key={node.label}>
            <RoundedBox
              args={isHub ? [1.7, 2.4, 1.7] : [1.6, 1.5, 1.6]}
              radius={0.08}
              smoothness={smoothness}
              onPointerOver={(e) => {
                e.stopPropagation();
                onSelect(i);
              }}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(i);
              }}
            >
              <meshStandardMaterial
                color={active ? '#6f6a62' : isHub ? '#353b41' : '#2b3035'}
                metalness={0.92}
                roughness={active ? 0.2 : 0.3}
                emissive={active ? '#3a2f1c' : '#000000'}
              />
            </RoundedBox>
            <Line
              points={[
                [-0.65, isHub ? -1.0 : -0.6, isHub ? 0.87 : 0.82],
                [0.65, isHub ? -1.0 : -0.6, isHub ? 0.87 : 0.82],
              ]}
              color={active ? '#efd1a0' : '#9e8969'}
              lineWidth={active ? 1.6 : 1}
            />
          </group>
        );
      })}

      {/* Platform */}
      <mesh position={[0, PLATFORM_Y, 0]}>
        <cylinderGeometry args={[4.6, 4.8, 0.25, detail === 'full' ? 96 : 48]} />
        <meshStandardMaterial color="#14181a" metalness={0.85} roughness={0.28} />
      </mesh>
      {detail === 'full' && (
        <mesh position={[0, PLATFORM_Y + 0.14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[4.4, 4.43, 96]} />
          <meshBasicMaterial color="#b69b70" />
        </mesh>
      )}

      {/* Connections: every layer meets at the data hub, drawn just above the platform */}
      {architectureNodes.map((node, i) => {
        if (i === HUB_NODE) return null;
        const [x, , z] = node.position;
        const y = PLATFORM_Y + 0.14;
        return (
          <Line
            key={node.label}
            points={[
              [hub.position[0], y, hub.position[2]],
              [x, y, z],
            ]}
            color={selected === i ? '#e6cf9f' : '#8a7654'}
            lineWidth={selected === i ? 1.4 : 0.6}
            transparent
            opacity={selected === i ? 1 : 0.7}
          />
        );
      })}
    </group>
  );
}

export default function ArchitectureCanvas(props: SceneProps) {
  return (
    <Canvas
      frameloop="demand"
      dpr={props.detail === 'full' ? [1, 1.5] : [1, 1.25]}
      camera={{ position: REST_POSITION.toArray(), fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[0, 8, 4]} intensity={5} color="#e5eaf1" />
      <directionalLight position={[-7, 3, 2]} intensity={4} color="#d2b58b" />
      <directionalLight position={[5, 1, -4]} intensity={4} color="#809dad" />
      <Blocks {...props} />
      <CameraRig selected={props.selected} />
    </Canvas>
  );
}
