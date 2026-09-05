import { Code2, Compass, Cpu, Layers3, Server, UsersRound } from 'lucide-react';
import { approach } from '@/data/site';
import { SectionHeading } from '@/components/ui/SectionHeading';

const icons = [Compass, Layers3, Code2, Server, Cpu, UsersRound];

export function CommandCenter() {
  return (
    <section id="how-i-work" className="section">
      <SectionHeading
        number="01"
        title="How I work."
        description="The whole system in view. Every technical decision connected to the product it serves."
      />
      <div className="command-grid">
        {approach.map(([title, description], i) => {
          const Icon = icons[i];
          return (
            <article className="command-panel" key={title}>
              <div className="panel-top">
                <Icon size={23} strokeWidth={1} aria-hidden="true" />
                <span>0{i + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
