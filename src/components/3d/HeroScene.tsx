'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { featuredProjects } from '@/data/projects';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';
import { SceneBoundary } from './SceneBoundary';

const ProductStackCanvas = dynamic(() => import('./ProductStackCanvas'), { ssr: false });

const numberWords = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN', 'TWELVE'];

export function HeroScene() {
  const [selected, setSelected] = useState(-1);
  const [enabled, setEnabled] = useState(false);
  const reduced = useReducedMotion();
  const webgl = useWebGLSupport();
  const phone = useMediaQuery('(max-width: 767px), (pointer: coarse)');
  const tablet = useMediaQuery('(max-width: 1279px)');
  const ref = useRef<HTMLDivElement>(null);

  // Desktop auto-starts the scene when it scrolls into view; phones opt in to keep the first paint light.
  useEffect(() => {
    if (!webgl || phone || reduced || !ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEnabled(true);
        observer.disconnect();
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [webgl, phone, reduced]);

  const canOffer3D = webgl === true && !enabled && !reduced;
  const active = selected >= 0 ? featuredProjects[selected] : null;
  const count = numberWords[featuredProjects.length] ?? String(featuredProjects.length);

  return (
    <div className="hero-scene" ref={ref}>
      <div className="scene-grid" aria-hidden="true" />
      <div className="scene-corner top-left">FIG. 01 — PRODUCT STACK</div>
      <div className="scene-corner top-right">
        <span className="status-dot" /> BUILT TO PRODUCTION
      </div>

      <div className={`metal-monument ${enabled ? 'is-hidden' : ''}`} aria-hidden="true">
        <div className="monument-base" />
        {featuredProjects.map((project, i) => (
          <div key={project.slug} className={`metal-block block-${i}`}>
            <span>{project.mark}</span>
            <small>BUILD / {String(i + 1).padStart(2, '0')}</small>
          </div>
        ))}
      </div>

      {enabled && !reduced && (
        <div className="canvas-layer" aria-hidden="true">
          <SceneBoundary>
            <ProductStackCanvas projects={featuredProjects} selected={selected} onSelect={setSelected} detail={tablet ? 'medium' : 'full'} />
          </SceneBoundary>
        </div>
      )}

      <div className="scene-controls" role="group" aria-label="Explore featured builds">
        {featuredProjects.map((project, i) => (
          <button key={project.slug} type="button" onClick={() => setSelected(i)} aria-pressed={selected === i}>
            {project.mark}
          </button>
        ))}
      </div>

      <div className="scene-readout" aria-live="polite">
        {active ? (
          <Link href={`/work/${active.slug}`}>
            {active.title} — {active.category} <ArrowUpRight size={14} />
          </Link>
        ) : (
          <span>{count} BUILDS. ONE ENGINEERING PRACTICE.</span>
        )}
        {canOffer3D && (
          <button type="button" onClick={() => setEnabled(true)}>
            Enable 3D ↗
          </button>
        )}
      </div>
    </div>
  );
}
