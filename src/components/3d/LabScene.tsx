'use client';
import dynamic from 'next/dynamic';
import { useRef, type CSSProperties } from 'react';
import { useSceneGate } from '@/hooks/useSceneGate';

const TerrainCanvas = dynamic(() => import('./TerrainCanvas'), { ssr: false });

/**
 * GLSL-displaced wireframe terrain for the engineering lab. The CSS wire lines underneath are the
 * always-available fallback; the canvas mounts only through the shared scene gate.
 */
export function LabScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { enabled, animate, tier } = useSceneGate(ref);

  return (
    <div className="wire-terrain" ref={ref} aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} style={{ '--i': i } as CSSProperties} />
      ))}
      {enabled && (
        <div className="canvas-layer">
          <TerrainCanvas animate={animate} segments={tier === 'full' ? 72 : 40} />
        </div>
      )}
    </div>
  );
}
