'use client';
import dynamic from 'next/dynamic';
import { useCallback, useRef, useState } from 'react';
import { useSceneGate } from '@/hooks/useSceneGate';
import type { DirectorSnapshot } from '@/lib/waveDirector';

const GameSystemCanvas = dynamic(() => import('./GameSystemCanvas'), { ssr: false });

/**
 * Wave-director simulation for the game engineering lab. The INPUT → STATE → WORLD strip is the
 * DOM fallback and stays visible; the HUD reads the live director once the canvas mounts.
 */
export function GameSystemScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { enabled, animate, tier } = useSceneGate(ref);
  const [snap, setSnap] = useState<DirectorSnapshot | null>(null);
  const onSnapshot = useCallback((s: DirectorSnapshot) => setSnap(s), []);

  return (
    <div className="game-stage" ref={ref}>
      <div className="state-machine" aria-hidden="true">
        <span>INPUT</span>
        <i>→</i>
        <span>STATE</span>
        <i>→</i>
        <span>WORLD</span>
      </div>
      {enabled && (
        <div className="canvas-layer" aria-hidden="true">
          <GameSystemCanvas animate={animate} detail={tier === 'full' ? 'full' : 'medium'} onSnapshot={onSnapshot} />
        </div>
      )}
      {snap && (
        <p className="game-hud" aria-live="off">
          WAVE {String(snap.wave).padStart(2, '0')} · AGENTS {String(snap.alive).padStart(2, '0')} · {snap.phase.toUpperCase()}
        </p>
      )}
    </div>
  );
}
