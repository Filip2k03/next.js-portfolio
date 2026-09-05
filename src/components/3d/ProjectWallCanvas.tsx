'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Line, RoundedBox, useTexture } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import { SRGBColorSpace, Vector3, type Group } from 'three';
import type { Project } from '@/data/projects';

interface WallProps {
  projects: Project[];
  selected: number;
  onSelect: (index: number) => void;
  /** Second activation of the selected slab opens its case study. */
  onOpen: (index: number) => void;
  animate: boolean;
}

export const SLAB_W = 2.6;
export const SLAB_H = 1.6;
const PITCH = 3.1;
const CAMERA_Z = 5.4;
/** Slabs float above the caption zone at the bottom of the frame. */
const WALL_Y = 0.35;

/** Slabs sit on a shallow arc so the ends recede; the selected one is nearest the camera. */
export function slabX(i: number, count: number) {
  return (i - (count - 1) / 2) * PITCH;
}

/** Project image mapped onto a plane sized to its aspect ratio, contained inside the slab face. */
function Artwork({ src }: { src: string }) {
  const texture = useTexture(src, (t) => {
    t.colorSpace = SRGBColorSpace;
  });
  const { width, height } = texture.image as { width: number; height: number };
  const aspect = width / height || 1.6;
  const maxW = SLAB_W * 0.7;
  const maxH = SLAB_H * 0.55;
  const w = Math.min(maxW, maxH * aspect);
  const h = w / aspect;
  return (
    <mesh position={[0, 0.12, 0.09]}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial map={texture} transparent toneMapped={false} />
    </mesh>
  );
}

function Slab({ project, index, count, selected, onSelect, onOpen, animate }: WallProps & { project: Project; index: number; count: number }) {
  const group = useRef<Group>(null);
  const x = slabX(index, count);
  const active = selected === index;
  const rest = useMemo(() => new Vector3(x, 0, -Math.abs(x) * 0.16), [x]);
  const goal = useMemo(() => new Vector3(), []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = animate ? clock.getElapsedTime() : 0;
    goal.set(rest.x, WALL_Y + Math.sin(t * 0.6 + index) * 0.02, rest.z + (active ? 0.45 : 0));
    group.current.position.lerp(goal, 0.1);
    group.current.rotation.y += ((active ? 0 : -x * 0.035) - group.current.rotation.y) * 0.1;
  });

  return (
    <group ref={group} position={[rest.x, WALL_Y, rest.z]}>
      <RoundedBox
        args={[SLAB_W, SLAB_H, 0.16]}
        radius={0.05}
        smoothness={4}
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
          if (active) onOpen(index);
          else onSelect(index);
        }}
      >
        <meshStandardMaterial
          color={active ? '#3d4249' : index % 2 ? '#2b3035' : '#24292e'}
          metalness={0.9}
          roughness={active ? 0.22 : 0.32}
          emissive={active ? '#2a2114' : '#000000'}
        />
      </RoundedBox>
      <Suspense fallback={null}>{project.image && <Artwork src={project.image.src} />}</Suspense>
      {/* Champagne base line + index tick, the slab's only ornament */}
      <Line
        points={[
          [-SLAB_W / 2 + 0.2, -SLAB_H / 2 + 0.22, 0.09],
          [SLAB_W / 2 - 0.2, -SLAB_H / 2 + 0.22, 0.09],
        ]}
        color={active ? '#efd1a0' : '#8a7654'}
        lineWidth={active ? 1.4 : 0.8}
      />
      <mesh position={[-SLAB_W / 2 + 0.28, SLAB_H / 2 - 0.26, 0.09]}>
        <boxGeometry args={[0.16, 0.04, 0.01]} />
        <meshBasicMaterial color={active ? '#efd1a0' : '#6e6252'} />
      </mesh>
    </group>
  );
}

/** Dollies sideways to the selected slab; only requests frames while moving. */
function Rig({ selected, count, animate }: { selected: number; count: number; animate: boolean }) {
  const { camera, invalidate } = useThree();
  const target = useMemo(() => new Vector3(slabX(Math.max(selected, 0), count) * 0.92, WALL_Y + 0.1, CAMERA_Z), [selected, count]);
  useFrame(({ pointer }) => {
    const goal = target.clone();
    goal.x += pointer.x * 0.25;
    goal.y += pointer.y * 0.12;
    if (camera.position.distanceTo(goal) > 0.002) {
      camera.position.lerp(goal, 0.08);
      camera.lookAt(camera.position.x, WALL_Y - 0.6, 0);
      if (!animate) invalidate();
    }
  });
  return null;
}

/** Reflective floor under the wall so the slabs read as objects in a room, not cards on a page. */
function Floor() {
  return (
    <mesh position={[0, WALL_Y - SLAB_H / 2 - 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[60, 14]} />
      <meshStandardMaterial color="#0d0f11" metalness={0.9} roughness={0.35} />
    </mesh>
  );
}

export default function ProjectWallCanvas(props: WallProps) {
  const count = props.projects.length;
  return (
    <Canvas
      frameloop={props.animate ? 'always' : 'demand'}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.1, CAMERA_Z], fov: 36 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 6, 5]} intensity={4.5} color="#e5eaf1" />
      <directionalLight position={[-6, 2, 3]} intensity={3} color="#d2b58b" />
      <directionalLight position={[6, 1, -3]} intensity={2} color="#809dad" />
      <Floor />
      {props.projects.map((project, i) => (
        <Slab key={project.slug} {...props} project={project} index={i} count={count} />
      ))}
      <Rig selected={props.selected} count={count} animate={props.animate} />
    </Canvas>
  );
}
