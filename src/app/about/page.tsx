import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { About, ProofOfWork } from '@/components/sections/About';
import { EngineeringEvolution } from '@/components/sections/Engineering';

export const metadata: Metadata = {
  title: 'About',
  description: 'Thu Ya Kyaw — CTO, systems architect and product engineer. Technology strategy, architecture and hands-on engineering.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="CTO · SYSTEMS ARCHITECT · PRODUCT ENGINEER"
        title={
          <>
            The person behind <span>the systems.</span>
          </>
        }
      />
      <About standalone />
      <EngineeringEvolution />
      <ProofOfWork />
    </>
  );
}
