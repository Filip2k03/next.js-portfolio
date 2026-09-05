import type { CSSProperties } from 'react';
import Link from 'next/link';
import { gameConcepts, scope } from '@/data/systems';
import { evolution } from '@/data/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LabScene } from '@/components/3d/LabScene';

export function SystemsDepth() {
  return (
    <section className="section depth-section" id="depth">
      <SectionHeading
        number="05"
        title="Beyond the application layer."
        description="An interest in the complete machine. From the surface people touch to the systems underneath."
      />
      <div className="depth-layout">
        <div className="depth-copy">
          <p className="eyebrow">SOFTWARE ↔ SYSTEMS ↔ HARDWARE</p>
          <h3>
            Understand the layers.
            <br />
            <span>Engineer the connections.</span>
          </h3>
          <p>
            Product engineering reaches beyond an interface: APIs, persistent data, deployment and the environment where
            software runs.
          </p>
          <p className="fine-print">Low-level topics are presented as research interests until project-specific work is documented.</p>
          <div className="tech-badges">
            <span>C / Go / Assembly</span>
            <span>x86_64 / ARM64 / RISC-V</span>
            <span>RTOS / OS bring-up</span>
          </div>
        </div>
        <ol className="depth-stack">
          {scope.map((s, i) => (
            <li key={s} style={{ '--layer': i } as CSSProperties}>
              <span>0{i + 1}</span>
              {s}
              <span aria-hidden="true">↘</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function InteractiveEngineering() {
  return (
    <section className="section" id="lab">
      <SectionHeading
        number="06"
        title="Engineering in another dimension."
        description="Spatial interfaces and real-time logic. An interactive laboratory, built into the portfolio."
      />
      <div className="experiment-grid">
        <article className="experiment spatial">
          <p className="eyebrow">LAB / 001 — SPATIAL INTERFACES</p>
          <LabScene />
          <div className="experiment-copy">
            <h3>Software with physical presence.</h3>
            <p>This site demonstrates interactive scenes and architecture exploration with Three.js, React Three Fiber and WebGL.</p>
            <div className="tech-badges">
              <span>Three.js</span>
              <span>React Three Fiber</span>
              <span>WebGL</span>
              <span>MediaPipe</span>
            </div>
            <Link className="text-link" href="/#top">
              Explore the live scene ↗
            </Link>
          </div>
        </article>
        <article className="experiment game">
          <p className="eyebrow">LAB / 002 — GAME ENGINEERING CONCEPTS</p>
          <div className="state-machine" aria-hidden="true">
            <span>INPUT</span>
            <i>→</i>
            <span>STATE</span>
            <i>→</i>
            <span>WORLD</span>
          </div>
          <div className="experiment-copy">
            <h3>Rules. State. Emergence.</h3>
            <div className="tech-badges">
              {gameConcepts.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
            <p className="fine-print">
              Conceptual engineering scope; game-specific implementation evidence is not yet published. Hand tracking and
              MediaPipe remain exploration topics.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

export function EngineeringEvolution() {
  return (
    <section className="section evolution-section" id="evolution">
      <p className="eyebrow">07 / ENGINEERING EVOLUTION</p>
      <h2>
        From the detail.
        <br />
        <span>To the whole system.</span>
      </h2>
      <p>My work has evolved from writing individual features to designing products, platforms and systems.</p>
      <ol className="evolution-track">
        {evolution.map((e, i) => (
          <li key={e}>
            <span>0{i + 1}</span>
            <strong>{e}</strong>
          </li>
        ))}
      </ol>
    </section>
  );
}
