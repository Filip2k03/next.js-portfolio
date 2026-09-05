import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { SelectedWork } from '@/components/sections/SelectedWork';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Products, platforms and systems engineered by Thu Ya Kyaw, with case studies where documented.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="PRODUCTS / PLATFORMS / SYSTEMS"
        title={
          <>
            Selected <span>systems.</span>
          </>
        }
        description="Every entry links to a case study. Projects without published engineering notes are marked as archive entries rather than described with invented detail."
      />
      <SelectedWork all standalone />
    </>
  );
}
