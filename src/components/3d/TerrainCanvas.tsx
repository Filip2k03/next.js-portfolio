'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Color, type ShaderMaterial } from 'three';
import { terrainFragment, terrainVertex } from '@/lib/shaders/terrain';

interface TerrainProps {
  /** Freeze the surface while off screen. */
  animate: boolean;
  /** Grid resolution per side; lower on tablets. */
  segments: number;
}

function Terrain({ animate, segments }: TerrainProps) {
  const material = useRef<ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new Color('#8a7654') },
      uColorHigh: { value: new Color('#e6cf9f') },
      uOpacity: { value: 0.6 },
    }),
    [],
  );

  useFrame(({ clock }) => {
    if (animate && material.current) material.current.uniforms.uTime.value = clock.getElapsedTime() * 0.35;
  });

  return (
    <mesh rotation={[-1.05, 0, 0.2]} position={[0, -1.1, 0]}>
      <planeGeometry args={[12, 8, segments, segments]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={terrainVertex}
        fragmentShader={terrainFragment}
        wireframe
        transparent
        depthWrite={false}
      />
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
