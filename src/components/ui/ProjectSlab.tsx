import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Box, Globe, Layers3, Network, ScanLine } from 'lucide-react';
import type { Project } from '@/data/projects';

const icons = [ScanLine, Globe, Layers3, Network, Box];

interface ProjectSlabProps {
  project: Project;
  index: number;
}

/** One metallic block on the project wall. Links to the case study; the visual is decorative. */
export function ProjectSlab({ project, index }: ProjectSlabProps) {
  const Icon = icons[index % icons.length];
  return (
    <Link href={`/work/${project.slug}`} className={`project-slab slab-${index % 5}`}>
      <div className="project-meta">
        <span>BUILD / {String(index + 1).padStart(2, '0')}</span>
        <ArrowUpRight size={17} />
      </div>
      <div className="project-art" aria-hidden="true">
        <div className="artifact-orbit" />
        {project.image ? (
          <Image
            src={project.image.src}
            alt=""
            width={220}
            height={140}
            className={`project-image fit-${project.image.fit}`}
          />
        ) : (
          <Icon size={64} strokeWidth={0.65} />
        )}
        <div className="artifact-line" />
      </div>
      <div className="project-label">
        <p>{project.category}</p>
        <h3>{project.title}</h3>
        <span>
          {project.year ?? project.status ?? 'PROJECT NOTES'} <ArrowUpRight size={13} />
        </span>
      </div>
    </Link>
  );
}
