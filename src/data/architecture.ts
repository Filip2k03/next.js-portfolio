export interface ArchitectureNode {
  label: string;
  detail: string;
  href: string;
  /** Position inside the 3D hero scene. */
  position: [number, number, number];
}

/**
 * The seven layers shown in the hero scene, with a DOM fallback for every node.
 * Six layers ring the platform; the data layer is the raised hub they all connect through.
 */
export const architectureNodes: ArchitectureNode[] = [
  { label: 'WEB', detail: 'React · Next.js', href: '/work/portfolio-studio', position: [-2.5, -1.95, 1.3] },
  { label: 'MOBILE', detail: 'Mobile application scope', href: '/technology', position: [0, -1.95, 2.7] },
  { label: 'API', detail: 'Contracts · Services', href: '/systems', position: [2.5, -1.95, 1.3] },
  { label: 'AI', detail: 'Automation · Workflows', href: '/technology', position: [-2.5, -1.95, -1.5] },
  { label: 'DATABASE', detail: 'Persistence · Data models', href: '/systems', position: [0, -1.5, 0] },
  { label: 'INFRASTRUCTURE', detail: 'Docker · Nginx · CI/CD', href: '/work/portfolio-studio', position: [2.5, -1.95, -1.5] },
  { label: 'HARDWARE', detail: 'Systems research', href: '/systems#depth', position: [0, -1.95, -2.8] },
];

/** Index of the hub node in `architectureNodes`. */
export const HUB_NODE = 4;
