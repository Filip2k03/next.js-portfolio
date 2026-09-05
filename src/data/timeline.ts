export interface TimelineEntry {
  year: number;
  focus?: string;
  project?: string;
  technology?: string;
  milestone?: string;
  role?: string;
  /** Where the date comes from. Entries without a source stay open. */
  source?: string;
}

// Only dated, verifiable events are attached to a year. Roles without dates live in site.ts.
const documented: Record<number, Omit<TimelineEntry, 'year'>> = {
  2025: {
    focus: 'Personal portfolio launched',
    project: 'thuyakyaw.com — first Next.js edition',
    technology: 'Next.js · React',
    milestone: 'First commit to the portfolio repository (February 2025)',
    source: 'Repository history',
  },
  2026: {
    focus: 'The Digital Studio',
    project: 'Portfolio v2 redesign (July) and v3 systems-architecture edition (September)',
    technology: 'Next.js · TypeScript · Three.js · React Three Fiber',
    milestone: 'Current portfolio edition',
    source: 'Repository history',
  },
};

export const timeline: TimelineEntry[] = Array.from({ length: 11 }, (_, i) => {
  const year = 2016 + i;
  return { year, ...documented[year] };
});
