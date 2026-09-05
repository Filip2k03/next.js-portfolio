'use client';
import { useState } from 'react';
import { technologies } from '@/data/technologies';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ConstellationScene } from '@/components/3d/ConstellationScene';

export function TechnologyUniverse({ standalone = false }: { standalone?: boolean }) {
  const [active, setActive] = useState(0);
  const group = technologies[active];

  return (
    <section className="section" id="technology">
      {!standalone && (
        <SectionHeading
          number="04"
          title="A connected toolkit."
          description="The right tool follows the problem. Experience and research are shown separately."
        />
      )}
      <div className="technology-layout">
        <div className="technology-orbit" role="group" aria-label="Technology groups">
          <ConstellationScene active={active} />
          <div className="orbit-ring ring-one" aria-hidden="true" />
          <div className="orbit-ring ring-two" aria-hidden="true" />
          <div className="orbit-ring ring-three" aria-hidden="true" />
          <div className="orbit-center" aria-hidden="true">
            THU YA
            <br />
            <strong>KYAW</strong>
            <small>ENGINEERING CORE</small>
          </div>
          {technologies.map((t, i) => (
            <button
              key={t.name}
              type="button"
              className={`orbit-node orbit-node-${i}`}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
            >
              {t.name}
            </button>
          ))}
        </div>
        <div className="technology-details" aria-live="polite">
          <p className="eyebrow">TECHNOLOGY / 0{active + 1}</p>
          <h3>{group.name}</h3>
          <p className="experience-label">{group.level}</p>
          <div className="tech-badges">
            {group.items.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <p className="fine-print">No percentage scores. No claim of equal expertise across the stack.</p>
        </div>
      </div>
      <details className="all-technologies">
        <summary>View the complete technology index</summary>
        <div className="technology-index">
          {technologies.map((g) => (
            <div key={g.name}>
              <h3>{g.name}</h3>
              <p className="fine-print">{g.level}</p>
              <p>{g.items.join(' · ')}</p>
            </div>
          ))}
        </div>
      </details>
    </section>
  );
}
