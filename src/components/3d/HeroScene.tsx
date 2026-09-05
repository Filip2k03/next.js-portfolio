'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight, Box } from 'lucide-react';
import { architectureNodes } from '@/data/architecture';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';

const ArchitectureCanvas = dynamic(() => import('./ArchitectureCanvas'), { ssr: false });

const monument = ['WEB', 'MOBILE', 'API', 'AI', 'DATA', 'INFRA', 'CORE'];

/** If WebGL fails at runtime the static composition underneath simply stays visible. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

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
  const active = selected >= 0 ? architectureNodes[selected] : null;

  return (
    <div className="hero-scene" ref={ref}>
      <div className="scene-grid" aria-hidden="true" />
      <div className="scene-corner top-left">FIG. 01 — SYSTEM ARCHITECTURE</div>
      <div className="scene-corner top-right">
        <span className="status-dot" /> CONNECTED THINKING
      </div>

      <div className={`metal-monument ${enabled ? 'is-hidden' : ''}`} aria-hidden="true">
        <div className="monument-base" />
        {monument.map((label, i) => (
          <div key={label} className={`metal-block block-${i}`}>
            <span>{label === 'CORE' ? <Box size={42} strokeWidth={1} /> : label}</span>
            <small>TYK / 0{i + 1}</small>
          </div>
        ))}
      </div>

      {enabled && !reduced && (
        <div className="canvas-layer" aria-hidden="true">
          <SceneBoundary>
            <ArchitectureCanvas selected={selected} onSelect={setSelected} detail={tablet ? 'medium' : 'full'} />
          </SceneBoundary>
        </div>
      )}

      <div className="scene-controls" role="group" aria-label="Explore architecture nodes">
        {architectureNodes.map((node, i) => (
          <button key={node.label} type="button" onClick={() => setSelected(i)} aria-pressed={selected === i}>
            {node.label}
          </button>
        ))}
      </div>

      <div className="scene-readout" aria-live="polite">
        {active ? (
          <Link href={active.href}>
            {active.detail} <ArrowUpRight size={14} />
          </Link>
        ) : (
          <span>SEVEN LAYERS. ONE CONNECTED SYSTEM.</span>
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
