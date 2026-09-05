import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { positions, site } from '@/data/site';
import { SectionHeading } from '@/components/ui/SectionHeading';

const proof = [
  ['Project archive', 'Products and published project notes', '/work'],
  ['Source code', 'Repository for this portfolio', site.repository],
  ['Engineering practice', 'Interactive reference architectures', '/systems'],
] as const;

export function ProofOfWork() {
  return (
    <section className="section proof-section" id="proof">
      <p className="eyebrow">09 / PROOF OF WORK</p>
      <h2>
        Less assertion.
        <br />
        <span>More evidence.</span>
      </h2>
      <div className="proof-links">
        {proof.map(([name, desc, url]) => (
          <Link href={url} key={name}>
            <div>
              <h3>{name}</h3>
              <p>{desc}</p>
            </div>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        ))}
      </div>
      <p className="fine-print">No counts or metrics are displayed until they can be verified.</p>
    </section>
  );
}

export function About({ standalone = false }: { standalone?: boolean }) {
  const roles = positions.map((p) => `${p.role} at ${p.company}`);
  return (
    <section className="section about-section" id="about">
      {!standalone && <SectionHeading number="10" title="The person behind the systems." />}
      <div className="about-layout">
        <div className="about-monogram" aria-hidden="true">
          TYK
          <span>INDEPENDENT TECHNOLOGY CRAFTSMAN</span>
        </div>
        <div className="about-copy">
          <p className="eyebrow">
            {site.name.toUpperCase()} / {site.alias.toUpperCase()}
          </p>
          <h3>{site.message}</h3>
          <p>
            My practice connects technology strategy, product architecture and hands-on engineering. I work across
            interfaces, applications and infrastructure, with an interest in how each layer shapes the next.
          </p>
          <p>
            Recorded roles: {roles.slice(0, -1).join(', ')} and {roles.at(-1)}. The work includes restaurant software,
            commerce platforms and interface design.
          </p>
          <p>
            {site.secondaryIdentity.join('. ')}. Focused on turning a technical direction into software that can be
            deployed, understood and maintained.
          </p>
          <Link className="text-link" href="/cv">
            View professional profile <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
