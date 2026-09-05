'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects, selectedProjects } from '@/data/projects';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectSlab } from '@/components/ui/ProjectSlab';
import { ProjectWallScene } from '@/components/3d/ProjectWallScene';

type Collection = 'Selected' | 'Archive';

interface SelectedWorkProps {
  /** Render the full archive without the collection toggle (used on /work). */
  all?: boolean;
  /** Hide the section heading when a page header already introduces the wall. */
  standalone?: boolean;
}

export function SelectedWork({ all = false, standalone = false }: SelectedWorkProps) {
  const [collection, setCollection] = useState<Collection>('Selected');
  const shown = all || collection === 'Archive' ? projects : selectedProjects;

  return (
    <section id="work" className="section work-section">
      {!standalone && (
        <SectionHeading
          number="02"
          title="Selected systems."
          description="Products, platforms and the engineering behind them. A closer look at the work."
        />
      )}
      <div className="work-toolbar">
        <span className="eyebrow">PRODUCTS / PLATFORMS / SYSTEMS</span>
        {!all && (
          <div className="segmented" role="group" aria-label="Project collection">
            {(['Selected', 'Archive'] as const).map((c) => (
              <button key={c} type="button" aria-pressed={collection === c} onClick={() => setCollection(c)}>
                {c}
              </button>
            ))}
          </div>
        )}
      </div>
      <ProjectWallScene key={all ? 'all' : collection} projects={shown}>
        <div className="project-wall">
          {shown.map((project, i) => (
            <ProjectSlab key={project.slug} project={project} index={i} />
          ))}
        </div>
      </ProjectWallScene>
      {!all && (
        <Link className="text-link" href="/work">
          Explore the complete archive <ArrowUpRight size={16} />
        </Link>
      )}
    </section>
  );
}
