import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { caseStudySections, getProject, projects } from '@/data/projects';
import { Button } from '@/components/ui/button';

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudyProps): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: project.title, description: project.summary },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const facts = [
    ['Year', project.year],
    ['Role', project.role],
    ['Category', project.category],
    ['Status', project.status],
    ['Source of record', project.provenance],
  ].filter((fact): fact is [string, string] => Boolean(fact[1]));

  const sections = caseStudySections.filter(([key]) => project[key]);
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="case-study">
      <header className="case-header">
        <Link className="text-link back-link" href="/work">
          <ArrowLeft size={14} /> All work
        </Link>
        <p className="eyebrow">
          <span className="status-dot" /> CASE STUDY / {String(index + 1).padStart(2, '0')}
        </p>
        <h1>{project.title}</h1>
        <p className="section-description">{project.summary}</p>
        <dl className="fact-grid">
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </header>

      {project.image && (
        <figure className="case-visual">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={640}
            height={400}
            className={`fit-${project.image.fit}`}
            priority
          />
        </figure>
      )}

      <div className="case-grid">
        {sections.map(([key, label], i) => (
          <section key={key} className="case-section">
            <p className="eyebrow">
              {String(i + 1).padStart(2, '0')} / {label.toUpperCase()}
            </p>
            <p>{project[key]}</p>
          </section>
        ))}
        {project.technologies.length > 0 && (
          <section className="case-section">
            <p className="eyebrow">TECHNOLOGY</p>
            <div className="tech-badges">
              {project.technologies.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </section>
        )}
        {sections.length === 0 && (
          <section className="case-section case-pending">
            <p className="eyebrow">ENGINEERING NOTES</p>
            <p>
              This project is part of the supplied archive. Architecture, engineering and result notes will be published
              here once documented — nothing is described without a verified source.
            </p>
          </section>
        )}
      </div>

      <footer className="case-footer">
        <div className="contact-actions">
          {project.live && (
            <Button asChild>
              <a href={project.live} target="_blank" rel="noreferrer">
                Live product <ArrowUpRight size={16} />
              </a>
            </Button>
          )}
          {project.source && (
            <Button asChild variant="outline">
              <a href={project.source} target="_blank" rel="noreferrer">
                Source code <ArrowUpRight size={16} />
              </a>
            </Button>
          )}
          {!project.live && !project.source && <p className="fine-print">No public link is available for this project.</p>}
        </div>
        <Link className="next-project" href={`/work/${next.slug}`}>
          <span className="eyebrow">NEXT SYSTEM</span>
          <strong>
            {next.title} <ArrowUpRight size={18} />
          </strong>
        </Link>
      </footer>
    </article>
  );
}
