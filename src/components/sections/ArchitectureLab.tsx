'use client';
import { useState } from 'react';
import { systems } from '@/data/systems';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function ArchitectureLab() {
  const [active, setActive] = useState(0);
  const [layer, setLayer] = useState(0);
  const system = systems[active];
  const [layerName, layerDescription] = system.layers[layer];

  return (
    <section className="section" id="architecture">
      <SectionHeading
        number="03"
        title="Architecture lab."
        description="Complexity, made legible. Explore the boundaries that make a system work."
      />
      <div className="architecture-lab">
        <div className="lab-sidebar">
          <p className="eyebrow">REFERENCE ARCHITECTURES</p>
          {systems.map((s, i) => (
            <button
              key={s.name}
              type="button"
              aria-pressed={active === i}
              onClick={() => {
                setActive(i);
                setLayer(0);
              }}
            >
              <span>0{i + 1}</span>
              {s.name}
              <span aria-hidden="true">↗</span>
            </button>
          ))}
          <p className="fine-print">Conceptual models. These diagrams do not claim to represent a specific deployed project.</p>
        </div>
        <div className="schematic">
          <div className="schematic-header">
            <span className="eyebrow">{system.name}</span>
            <span className="status-dot" />
          </div>
          <p className="schematic-description">{system.description}</p>
          <div className="layer-track" role="group" aria-label={`${system.name} layers`}>
            {system.layers.map(([name], i) => (
              <button
                key={name}
                type="button"
                aria-pressed={layer === i}
                onMouseEnter={() => setLayer(i)}
                onFocus={() => setLayer(i)}
                onClick={() => setLayer(i)}
              >
                <span>0{i + 1}</span>
                {name}
                <span className="layer-port" />
              </button>
            ))}
          </div>
          <div className="layer-description" aria-live="polite">
            <strong>{layerName}</strong>
            <p>{layerDescription}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
