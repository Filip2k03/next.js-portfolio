'use client';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { Box } from 'lucide-react';
import { studioModel } from '@/data/models';
import { useSceneGate } from '@/hooks/useSceneGate';

const ModelCanvas = dynamic(() => import('./ModelCanvas'), { ssr: false });

/**
 * Turntable for authored assets (Blender → glTF → R3F). A CSS plinth is the fallback so the
 * section reads correctly without WebGL; phones may opt in because this scene is small.
 */
export function ModelStage() {
  const ref = useRef<HTMLDivElement>(null);
  const { enabled, animate, tier } = useSceneGate(ref, { allowPhone: true });

  return (
    <div className="model-stage" ref={ref} aria-hidden="true">
      <div className="model-plinth">
        <Box size={40} strokeWidth={1} />
        <small>{studioModel.name.toUpperCase()}</small>
      </div>
      {enabled && (
        <div className="canvas-layer">
          <ModelCanvas model={studioModel} animate={animate} detail={tier === 'full' ? 'full' : 'medium'} />
        </div>
      )}
    </div>
  );
}
