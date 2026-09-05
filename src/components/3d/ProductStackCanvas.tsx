'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import { CanvasTexture, SRGBColorSpace, Vector3 } from 'three';
import type { Project } from '@/data/projects';

interface StackProps {
  projects: Array<Project & { mark: string }>;
  selected: number;
  onSelect: (index: number) => void;
  /** Lower detail for tablets: fewer segments, no rim ring. */
  detail: 'full' | 'medium';
}

/** Top face of the platform; every block rests on it or on another block. */
const PLATFORM_TOP = -2.1;
const REST_POSITION = new Vector3(7.6, 4.4, 9.8);
const REST_LOOK = new Vector3(0, -0.35, 0);

interface Slot {
  x: number;
  z: number;
  size: number;
  /** Height of whatever the block sits on, measured from the platform top. */
  restsOn: number;
  yaw: number;
}

/**
 * The pile, in stage order. Ground blocks ring a large centre block; the upper tiers sit squarely on
 * the ones beneath so nothing floats. Presentation only — the content comes from `projects`.
 */
const SLOTS: Slot[] = [
  { x: 0, z: 0, size: 1.9, restsOn: 0, yaw: 0.18 },
  { x: -1.85, z: 0.5, size: 1.6, restsOn: 0, yaw: -0.32 },
  { x: 1.85, z: 0.3, size: 1.6, restsOn: 0, yaw: 0.28 },
  { x: -1.0, z: -1.9, size: 1.5, restsOn: 0, yaw: 0.12 },
  { x: 1.1, z: -1.8, size: 1.5, restsOn: 0, yaw: -0.22 },
  { x: 0.15, z: -0.1, size: 1.5, restsOn: 1.9, yaw: -0.3 },
  { x: -1.85, z: 0.5, size: 1.2, restsOn: 1.6, yaw: 0.4 },
  { x: 1.85, z: 0.3, size: 1.25, restsOn: 1.6, yaw: -0.5 },
  { x: 0.1, z: -0.1, size: 1.05, restsOn: 3.4, yaw: 0.35 },
];

const slotY = (slot: Slot) => PLATFORM_TOP + slot.restsOn + slot.size / 2;

/** Draws the brand mark into a transparent canvas texture so the metal shows through around the text. */
function useMarkTexture(mark: string) {
  const texture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    // Use the page's loaded body font so the cube face matches the typography around it.
    const family = getComputedStyle(document.body).fontFamily || 'system-ui, sans-serif';
    const words = mark.split(' ');
    const lines = words.length > 1 && mark.length > 8 ? [words[0], words.slice(1).join(' ')] : [mark];
    let px = 112;
    ctx.font = `600 ${px}px ${family}`;
    const widest = Math.max(...lines.map((l) => ctx.measureText(l).width));
    if (widest > size * 0.78) px = Math.floor((px * size * 0.78) / widest);
    ctx.font = `600 ${px}px ${family}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ecebe7';
    const lineHeight = px * 1.02;
    const startY = size / 2 - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, i) => ctx.fillText(line, size / 2, startY + i * lineHeight));
    // Champagne base line, the same ornament the project slabs carry.
    ctx.fillStyle = '#c8a56b';
    ctx.fillRect(size * 0.22, size * 0.8, size * 0.56, 4);
    const t = new CanvasTexture(canvas);
    t.colorSpace = SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }, [mark]);
  useEffect(() => () => texture?.dispose(), [texture]);
  return texture;
}

function Block({ project, index, selected, onSelect, detail }: StackProps & { project: Project & { mark: string }; index: number }) {
  const slot = SLOTS[index];
  const active = selected === index;
  const texture = useMarkTexture(project.mark);
  const face = slot.size / 2 + 0.012;
  const label = slot.size * 0.84;
  return (
    <group position={[slot.x, slotY(slot), slot.z]} rotation={[0, slot.yaw, 0]}>
      <RoundedBox
        args={[slot.size, slot.size, slot.size]}
        radius={0.05}
        smoothness={detail === 'full' ? 4 : 2}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          onSelect(index);
        }}
        onPointerOut={() => {
          document.body.style.cursor = '';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(index);
        }}
      >
        <meshStandardMaterial
          color={active ? '#5b5750' : index % 2 ? '#2b3035' : '#22272c'}
          metalness={0.92}
          roughness={active ? 0.2 : 0.3}
          emissive={active ? '#3a2f1c' : '#000000'}
        />
      </RoundedBox>
      {/* The mark on the two faces the camera can see: front (+z) and right (+x). */}
      {texture && (
        <>
          <mesh position={[0, 0, face]}>
            <planeGeometry args={[label, label]} />
            <meshBasicMaterial map={texture} transparent toneMapped={false} />
          </mesh>
          <mesh position={[face, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[label, label]} />
            <meshBasicMaterial map={texture} transparent toneMapped={false} opacity={0.92} />
          </mesh>
        </>
      )}
    </group>
  );
}

/** Stepped stage with a champagne rim — the only light source the pile appears to stand in. */
function Platform({ detail }: { detail: StackProps['detail'] }) {
  const segments = detail === 'full' ? 96 : 48;
  return (
    <group>
      <mesh position={[0, PLATFORM_TOP - 0.15, 0]}>
        <cylinderGeometry args={[4.1, 4.25, 0.3, segments]} />
        <meshStandardMaterial color="#14181a" metalness={0.85} roughness={0.28} />
      </mesh>
      <mesh position={[0, PLATFORM_TOP - 0.42, 0]}>
        <cylinderGeometry args={[5.0, 5.15, 0.22, segments]} />
        <meshStandardMaterial color="#0d1013" metalness={0.8} roughness={0.35} />
      </mesh>
      <mesh position={[0, PLATFORM_TOP + 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.85, 3.9, segments]} />
        <meshBasicMaterial color="#e6cf9f" toneMapped={false} />
      </mesh>
      {detail === 'full' && (
        <mesh position={[0, PLATFORM_TOP - 0.31, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[4.25, 4.9, segments]} />
          <meshBasicMaterial color="#c8a56b" transparent opacity={0.16} toneMapped={false} />
        </mesh>
      )}
    </group>
  );
}

/** Eases the camera toward the selected block; only requests frames while moving (frameloop="demand"). */
function CameraRig({ selected }: { selected: number }) {
  const { camera, invalidate } = useThree();
  const look = useRef(REST_LOOK.clone());
  const { position, target } = useMemo(() => {
    if (selected < 0 || selected >= SLOTS.length) return { position: REST_POSITION, target: REST_LOOK };
    const slot = SLOTS[selected];
    const y = slotY(slot);
    return {
      position: new Vector3(slot.x * 0.4 + 6.3, y + 2.6, slot.z * 0.4 + 8.2),
      target: new Vector3(slot.x * 0.7, y - 0.4, slot.z * 0.7),
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

export default function ProductStackCanvas(props: StackProps) {
  // The pile has a fixed number of slots; extra projects stay reachable through the DOM controls.
  const staged = props.projects.slice(0, SLOTS.length);
  return (
    <Canvas
      frameloop="demand"
      dpr={props.detail === 'full' ? [1, 1.5] : [1, 1.25]}
      camera={{ position: REST_POSITION.toArray(), fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      <ambientLight intensity={1.0} />
      <directionalLight position={[0, 9, 4]} intensity={5} color="#e5eaf1" />
      <directionalLight position={[-7, 3, 3]} intensity={4} color="#d2b58b" />
      <directionalLight position={[6, 1, -4]} intensity={3.5} color="#809dad" />
      <pointLight position={[0, PLATFORM_TOP + 0.3, 0]} intensity={6} distance={6} color="#c8a56b" />
      <Platform detail={props.detail} />
      {staged.map((project, i) => (
        <Block key={project.slug} {...props} project={project} index={i} />
      ))}
      <CameraRig selected={props.selected} />
    </Canvas>
  );
}
