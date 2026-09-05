import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { TechnologyUniverse } from '@/components/sections/TechnologyUniverse';

export const metadata: Metadata = {
  title: 'Technology',
  description: 'The technology map of Thu Ya Kyaw, grouped by documented experience, current implementation and research interest.',
  alternates: { canonical: '/technology' },
};

export default function TechnologyPage() {
  return (
    <>
      <PageHeader
        eyebrow="LANGUAGES / FRAMEWORKS / INFRASTRUCTURE"
        title={
          <>
            A connected <span>toolkit.</span>
          </>
        }
        description="Grouped by actual use. Documented experience, technology demonstrated in this build, and research interests are labelled separately — no percentage scores."
      />
      <TechnologyUniverse standalone />
    </>
  );
}
