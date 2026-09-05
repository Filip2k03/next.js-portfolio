import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { education, positions, site } from '@/data/site';
import { selectedProjects } from '@/data/projects';
import { technologies } from '@/data/technologies';
import { PageHeader } from '@/components/ui/PageHeader';
import { PrintButton } from '@/components/ui/PrintButton';

export const metadata: Metadata = {
  title: 'CV',
  description: 'Professional profile of Thu Ya Kyaw — roles, selected systems, technology and education.',
  alternates: { canonical: '/cv' },
};

// Only groups with documented experience belong on a CV; research interests stay on /technology.
const cvTechnology = technologies.filter((g) => !g.level.toLowerCase().includes('pending') && !g.level.includes('interest'));

export default function CvPage() {
  return (
    <>
      <PageHeader
        eyebrow="PROFESSIONAL PROFILE"
        title={
          <>
            {site.name} <span>— CV.</span>
          </>
        }
        description={site.supportingMessage}
      />
      <section className="section cv-page">
        <div className="cv-toolbar">
          <p className="fine-print">
            {site.primaryIdentity.join(' · ')} · {site.location}
          </p>
          <PrintButton />
        </div>

        <div className="cv-grid">
          <section className="cv-block">
            <p className="eyebrow">01 / ROLES</p>
            <ul className="cv-list">
              {positions.map((p) => (
                <li key={p.company}>
                  <strong>{p.role}</strong>
                  <span>
                    {'url' in p ? (
                      <a href={p.url} target="_blank" rel="noreferrer">
                        {p.company} <ArrowUpRight size={12} />
                      </a>
                    ) : (
                      p.company
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <p className="fine-print">Dates are not listed because they are not documented in the source material.</p>
          </section>

          <section className="cv-block">
            <p className="eyebrow">02 / SELECTED SYSTEMS</p>
            <ul className="cv-list">
              {selectedProjects.map((p) => (
                <li key={p.slug}>
                  <strong>
                    <Link href={`/work/${p.slug}`}>{p.title}</Link>
                  </strong>
                  <span>
                    {p.category}
                    {p.role ? ` · ${p.role}` : ''}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="cv-block">
            <p className="eyebrow">03 / TECHNOLOGY</p>
            {cvTechnology.map((g) => (
              <p key={g.name} className="cv-tech">
                <strong>{g.name}</strong> {g.items.join(' · ')}
              </p>
            ))}
          </section>

          <section className="cv-block">
            <p className="eyebrow">04 / EDUCATION</p>
            <ul className="cv-list">
              {education.map((e) => (
                <li key={e}>
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="cv-block">
            <p className="eyebrow">05 / CONTACT</p>
            <ul className="cv-list">
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={`tel:${site.phone}`}>{site.phone}</a>
              </li>
              <li>
                <a href={site.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href={site.github} target="_blank" rel="noreferrer">
                  GitHub <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </>
  );
}
