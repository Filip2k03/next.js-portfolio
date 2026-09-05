'use client';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { useSceneGate } from '@/hooks/useSceneGate';

const ConstellationCanvas = dynamic(() => import('./ConstellationCanvas'), { ssr: false });

/**
 * 3D orbit field behind the DOM technology nodes. The buttons stay in the DOM for keyboard and
 * screen-reader access; the canvas is decorative depth and mounts only through the scene gate.
 */
export function ConstellationScene({ active }: { active: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { enabled, animate, tier } = useSceneGate(ref);

  return (
    <div className="constellation-layer" ref={ref} aria-hidden="true">
      {enabled && (
        <div className="canvas-layer">
          <ConstellationCanvas active={active} animate={animate} detail={tier === 'full' ? 'full' : 'medium'} />
        </div>
      )}
    </div>
  );
}
