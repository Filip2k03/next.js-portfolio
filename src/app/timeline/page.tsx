import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Timeline } from '@/components/sections/Timeline';

export const metadata: Metadata = {
  title: 'Timeline',
  description: 'An engineering timeline from 2016 to 2026, populated only with dated, verified milestones.',
  alternates: { canonical: '/timeline' },
};

export default function TimelinePage() {
  return (
    <>
      <PageHeader
        eyebrow="2016 — 2026"
        title={
          <>
            An evolving <span>practice.</span>
          </>
        }
        description="A track built to grow. Years without a dated source stay open rather than being filled with assumptions."
      />
      <Timeline standalone />
    </>
  );
}
