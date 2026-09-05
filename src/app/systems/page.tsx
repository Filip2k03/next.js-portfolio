import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { ArchitectureLab } from '@/components/sections/ArchitectureLab';
import { EngineeringEvolution, InteractiveEngineering, SystemsDepth } from '@/components/sections/Engineering';
import { CommandCenter } from '@/components/sections/CommandCenter';

export const metadata: Metadata = {
  title: 'Systems',
  description: 'Reference architectures, systems engineering scope and the engineering practice behind the work.',
  alternates: { canonical: '/systems' },
};

export default function SystemsPage() {
  return (
    <>
      <PageHeader
        eyebrow="ARCHITECTURE / SYSTEMS / PRACTICE"
        title={
          <>
            Systems, made <span>legible.</span>
          </>
        }
        description="Interactive reference architectures, the full engineering scope from interface to hardware, and how the practice is organised."
      />
      <ArchitectureLab />
      <SystemsDepth />
      <InteractiveEngineering />
      <CommandCenter />
      <EngineeringEvolution />
    </>
  );
}
