import { Hero } from '@/components/sections/Hero';
import { CommandCenter } from '@/components/sections/CommandCenter';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { ArchitectureLab } from '@/components/sections/ArchitectureLab';
import { TechnologyUniverse } from '@/components/sections/TechnologyUniverse';
import { EngineeringEvolution, InteractiveEngineering, SystemsDepth } from '@/components/sections/Engineering';
import { Timeline } from '@/components/sections/Timeline';
import { About, ProofOfWork } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Reveal } from '@/components/ui/Reveal';

const sections = [
  CommandCenter,
  SelectedWork,
  ArchitectureLab,
  TechnologyUniverse,
  SystemsDepth,
  InteractiveEngineering,
  EngineeringEvolution,
  Timeline,
  ProofOfWork,
  About,
  Contact,
];

export default function HomePage() {
  return (
    <>
      <Hero />
      {sections.map((Section, i) => (
        <Reveal key={i}>
          <Section />
        </Reveal>
      ))}
    </>
  );
}
