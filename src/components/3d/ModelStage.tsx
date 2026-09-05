'use client';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { Box } from 'lucide-react';
import { studioModels } from '@/data/models';
import { useSceneGate } from '@/hooks/useSceneGate';

const ModelCanvas = dynamic(() => import('./ModelCanvas'), { ssr: false });

/**
 * Turntable for Blender-authored glTF assets. A CSS plinth is the fallback so the section reads
 * correctly without WebGL; phones may opt in because the scene is small. The asset switcher is DOM
 * so the descriptions stay readable and keyboard-reachable.
 */
export function ModelStage() {
  const ref = useRef<HTMLDivElement>(null);
  const { enabled, animate, tier } = useSceneGate(ref, { allowPhone: true });
  const [index, setIndex] = useState(0);
  const model = studioModels[index];

  return (
    <div className="model-lab">
      <div className="model-stage" ref={ref} aria-hidden="true">
        <div className="model-plinth">
          <Box size={40} strokeWidth={1} />
          <small>{model.name.toUpperCase()}</small>
        </div>
        {enabled && (
          <div className="canvas-layer">
            <ModelCanvas model={model} animate={animate} detail={tier === 'full' ? 'full' : 'medium'} />
          </div>
        )}
        <div className="scene-corner top-left">ASSET / {String(index + 1).padStart(2, '0')} — {model.name.toUpperCase()}</div>
      </div>
      <div className="model-switcher" role="group" aria-label="Choose a 3D asset">
        {studioModels.map((m, i) => (
          <button key={m.slug} type="button" aria-pressed={index === i} onClick={() => setIndex(i)}>
            {m.name}
          </button>
        ))}
      </div>
      <p className="model-description" aria-live="polite">
        {model.description}
      </p>
    </div>
  );
}
