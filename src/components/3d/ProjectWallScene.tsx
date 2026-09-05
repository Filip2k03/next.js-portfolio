'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import { useSceneGate } from '@/hooks/useSceneGate';

const ProjectWallCanvas = dynamic(() => import('./ProjectWallCanvas'), { ssr: false });

type View = 'Wall' | 'Grid';

interface ProjectWallSceneProps {
  projects: Project[];
  /** The DOM slab grid: always the fallback, and the alternate view when the wall is on. */
  children: ReactNode;
}

/**
 * Cinematic 3D wall of project slabs for desktop. Every project also exists as a real link in the
 * strip beneath the canvas, so keyboard and screen-reader users get the same set of destinations.
 */
export function ProjectWallScene({ projects, children }: ProjectWallSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { enabled, animate, tier } = useSceneGate(ref);
  const [view, setView] = useState<View>('Wall');
  const [selected, setSelected] = useState(0);
  const wall = enabled && tier === 'full' && view === 'Wall';
  // Callers key this component by collection, so `selected` always indexes the current list.
  const active = projects[Math.min(selected, projects.length - 1)];

  const open = useCallback((i: number) => router.push(`/work/${projects[i].slug}`), [router, projects]);
  const step = (dir: 1 | -1) => setSelected((s) => (s + dir + projects.length) % projects.length);

  return (
    <div className="project-wall-frame" ref={ref}>
      {enabled && tier === 'full' && (
        <div className="segmented wall-view" role="group" aria-label="Project view">
          {(['Wall', 'Grid'] as const).map((v) => (
            <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)}>
              {v}
            </button>
          ))}
        </div>
      )}

      {wall ? (
        <div className="project-wall-3d">
          <div className="scene-corner top-left">FIG. 02 — SELECTED SYSTEMS</div>
          <div className="canvas-layer" aria-hidden="true">
            <ProjectWallCanvas projects={projects} selected={selected} onSelect={setSelected} onOpen={open} animate={animate} />
          </div>

          <div className="wall-caption" aria-live="polite">
            <p className="eyebrow">
              BUILD / {String(selected + 1).padStart(2, '0')} · {active.category.toUpperCase()}
            </p>
            <h3>{active.title}</h3>
            <Link href={`/work/${active.slug}`} className="text-link">
              {active.year ?? active.status ?? 'Case study'} — open case study <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="wall-strip">
            <button type="button" onClick={() => step(-1)} aria-label="Previous project">
              <ArrowLeft size={16} />
            </button>
            <nav aria-label="Projects on the wall">
              {projects.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  aria-current={selected === i ? 'true' : undefined}
                  onFocus={() => setSelected(i)}
                  onMouseEnter={() => setSelected(i)}
                >
                  {p.title}
                </Link>
              ))}
            </nav>
            <button type="button" onClick={() => step(1)} aria-label="Next project">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
