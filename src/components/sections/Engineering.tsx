import type { CSSProperties } from 'react';
import Link from 'next/link';
import { gameConcepts, scope } from '@/data/systems';
import { evolution } from '@/data/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LabScene } from '@/components/3d/LabScene';
import { GameSystemScene } from '@/components/3d/GameSystemScene';
import { ModelStage } from '@/components/3d/ModelStage';
import { assetPipeline } from '@/data/models';

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
            <p>
              This terrain is displaced in a GLSL vertex shader — the CPU never touches the mesh. The hero architecture,
              the technology constellation and the labs below are all live Three.js scenes rendered with React Three
              Fiber.
            </p>
            <div className="tech-badges">
              <span>Three.js</span>
              <span>React Three Fiber</span>
              <span>WebGL 2</span>
              <span>GLSL</span>
              <span>MediaPipe</span>
            </div>
            <Link className="text-link" href="/#top">
              Explore the live scene ↗
            </Link>
          </div>
        </article>
        <article className="experiment game">
          <p className="eyebrow">LAB / 002 — GAME ENGINEERING CONCEPTS</p>
          <GameSystemScene />
          <div className="experiment-copy">
            <h3>Rules. State. Emergence.</h3>
            <p>
              A seeded wave director spawns agents, drives them through spawn → advance → hold → retreat states around a
              player core, and escalates each wave. The simulation is plain TypeScript; the scene is one instanced mesh.
            </p>
            <div className="tech-badges">
              {gameConcepts.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
            <p className="fine-print">
              Demonstration built for this portfolio; shipped game titles are not yet published. Hand tracking and
              MediaPipe remain exploration topics.
            </p>
          </div>
        </article>
        <article className="experiment pipeline">
          <ModelStage />
          <div className="experiment-copy">
            <p className="eyebrow">LAB / 003 — ASSET PIPELINE</p>
            <h3>From Blender to the browser.</h3>
            <p>
              Three assets authored in Blender from a reproducible <code>bpy</code> script — boolean cuts, hardened
              bevels, array modifiers, PBR and emissive materials — exported as glTF Binary and streamed into React
              Three Fiber with size normalisation, a turntable and contact shadows.
            </p>
            <div className="tech-badges">
              {assetPipeline.map((step) => (
                <span key={step}>{step}</span>
              ))}
            </div>
            <p className="fine-print">
              GPU-side work across the lab: GLSL vertex displacement, InstancedMesh crowds, physically based materials
              and soft contact shadows — all gated behind WebGL, viewport and motion preferences.
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
