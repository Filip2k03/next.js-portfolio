import { projects } from './projects';
import { positions } from './site';
import { technologies } from './technologies';

export interface Metric {
  value: string;
  label: string;
  /** How the number is obtained. Every metric is counted from published data, never estimated. */
  basis: string;
}

/** Hero figures. Derived at build time from the content files so they can never drift from the evidence. */
export const metrics: Metric[] = [
  { value: String(projects.length), label: 'Projects on record', basis: 'Entries in the project data' },
  { value: String(projects.filter((p) => p.live).length), label: 'Live products', basis: 'Projects with a public URL' },
  {
    value: String(new Set(technologies.flatMap((g) => g.items)).size),
    label: 'Technologies mapped',
    basis: 'Distinct items in the technology map',
  },
  { value: String(positions.length), label: 'Roles held', basis: 'Positions recorded in the existing portfolio' },
];

export const metricsBasis = 'Counts are derived from the published project, technology and role data on this site.';
