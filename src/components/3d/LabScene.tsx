'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';

const TerrainCanvas = dynamic(() => import('./TerrainCanvas'), { ssr: false });

/**
 * Wireframe terrain for the engineering lab. Loads only when scrolled into view on WebGL-capable,
 * non-phone devices; the CSS wire lines underneath remain as the always-available fallback.
 */
export function LabScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(false);
  const reduced = useReducedMotion();
  const webgl = useWebGLSupport();
  const phone = useMediaQuery('(max-width: 767px), (pointer: coarse)');
  const tablet = useMediaQuery('(max-width: 1279px)');

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) setStarted(true);
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const enabled = webgl === true && !phone && started;

  return (
    <div className="wire-terrain" ref={ref} aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} style={{ '--i': i } as CSSProperties} />
      ))}
      {enabled && (
        <div className="canvas-layer">
          <TerrainCanvas animate={visible && !reduced} segments={tablet ? 32 : 56} />
        </div>
      )}
    </div>
  );
}
