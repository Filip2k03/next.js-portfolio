export type Provenance = 'Existing portfolio' | 'Owner-supplied project';

export interface ProjectImage {
  src: string;
  alt: string;
  /** `contain` for logos, `cover` for screenshots. */
  fit: 'contain' | 'cover';
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  summary: string;
  /** Where the information comes from. Nothing here is invented. */
  provenance: Provenance;
  year?: string;
  role?: string;
  status?: string;
  technologies: string[];
  image?: ProjectImage;
  live?: string;
  source?: string;
  context?: string;
  problem?: string;
  solution?: string;
  architecture?: string;
  engineering?: string;
  infrastructure?: string;
  interface?: string;
  result?: string;
}

/** Case-study sections in display order. Only sections with content are rendered. */
export const caseStudySections = [
  ['context', 'Context'],
  ['problem', 'Problem'],
  ['solution', 'Solution'],
  ['architecture', 'Architecture'],
  ['engineering', 'Engineering'],
  ['infrastructure', 'Infrastructure'],
  ['interface', 'Interface'],
  ['result', 'Result'],
] as const satisfies ReadonlyArray<readonly [keyof Project, string]>;

const archiveOnly = (title: string): Project => ({
  slug: title.toLowerCase().replaceAll(' ', '-'),
  title,
  category: 'Project archive',
  summary: 'A selected build from the project archive. Detailed engineering notes are not yet published.',
  provenance: 'Owner-supplied project',
  status: 'Notes pending',
  technologies: [],
});

export const projects: Project[] = [
  {
    slug: 'paicafes',
    title: 'PaiCafes',
    category: 'Restaurant platform',
    summary: 'From a table-side QR code to a connected kitchen. Digital ordering, payments and restaurant operations.',
    provenance: 'Existing portfolio',
    status: 'Live',
    technologies: ['PayVia POS'],
    image: { src: '/images/paicafes.svg', alt: 'PaiCafes brand mark', fit: 'contain' },
    live: 'https://paicafes.com',
    context: 'A digital restaurant solution powered by the PayVia POS system.',
    solution:
      'Customers scan a QR code to browse the menu, place orders and pay online. Kitchen displays, table panel updates and inventory management run in real time.',
    interface: 'Customer ordering, kitchen display and table panels, as described in the existing portfolio.',
  },
  {
    slug: 'digital-marketplace-mm',
    title: 'Digital Marketplace MM',
    category: 'Commerce platform',
    summary: 'A multi-vendor marketplace connecting seller dashboards, order flows and commerce operations.',
    provenance: 'Existing portfolio',
    status: 'Live',
    technologies: [],
    image: { src: '/images/digitalmarketplacemm.svg', alt: 'Digital Marketplace MM brand mark', fit: 'contain' },
    live: 'https://digitalmarketplacemm.com',
    context: 'Listed in the existing portfolio as the Zazy2Door Marketplace.',
    solution: 'Vendor onboarding, seller dashboards, cart and checkout, order lifecycle and analytics.',
  },
  {
    slug: 'reiwa-sakura',
    title: 'Reiwa Sakura',
    category: 'Technology leadership',
    summary: 'Technology strategy, architecture and product delivery for the company platform.',
    provenance: 'Existing portfolio',
    role: 'CTO',
    technologies: [],
    image: { src: '/images/reiwasakura-logo.png', alt: 'Reiwasakura logo', fit: 'contain' },
    live: 'https://reiwasakura.tech',
    context: 'The existing portfolio identifies Thu Ya Kyaw as CTO at Reiwasakura.',
    engineering: 'Engineering strategy, product direction and delivery.',
  },
  {
    slug: 'payvia',
    title: 'PayVia',
    category: 'Business systems',
    summary: 'POS, marketplace and restaurant engineering at PayVia Tech Solutions.',
    provenance: 'Existing portfolio',
    role: 'Lead Engineer',
    technologies: [],
    image: { src: '/images/pos.svg', alt: 'Point-of-sale illustration', fit: 'contain' },
    context: 'The existing portfolio lists a Lead Engineer role at PayVia Tech Solutions.',
    solution: 'Point-of-sale, marketplace and restaurant platform development.',
  },
  {
    slug: 'digizens-alliance',
    title: 'Digizens Alliance',
    category: 'Interface engineering',
    summary: 'UI/UX design and website development with an emphasis on the user experience.',
    provenance: 'Existing portfolio',
    role: 'UI/UX design & development',
    status: 'Live',
    technologies: ['React'],
    image: { src: '/images/uiux.webp', alt: 'Interface design work', fit: 'cover' },
    live: 'https://digizensalliance.org/',
    interface: 'Designed and developed the website UI/UX, as documented in the existing portfolio.',
  },
  {
    slug: 'portfolio-studio',
    title: 'The Digital Studio',
    category: 'Interactive engineering',
    summary: 'This portfolio: a cinematic, accessible system for presenting engineering work.',
    provenance: 'Owner-supplied project',
    year: '2026',
    role: 'Design & engineering',
    status: 'Current edition',
    technologies: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Three.js', 'React Three Fiber', 'Docker', 'Nginx'],
    source: 'https://github.com/Filip2k03/ThuYaKyawportfolio',
    context: 'A complete redesign of the existing portfolio around systems architecture and product engineering.',
    problem: 'Present a broad engineering practice with clarity, physical depth and accessible content.',
    solution: 'A server-rendered portfolio with typed content, case-study routes and progressive 3D enhancement.',
    architecture:
      'Next.js App Router serves semantic pages. Client islands handle navigation, architecture exploration and a lazy-loaded WebGL scene.',
    engineering: 'On-demand rendering, responsive scene complexity, reduced-motion support and DOM alternatives for every 3D element.',
    infrastructure: 'Standalone Next.js build with a Docker image and Nginx reverse-proxy configuration; deployed through Vercel.',
    interface: 'Graphite surfaces, architectural modules and restrained champagne accents.',
  },
  ...['LaBa Taxi', 'ShweTap', 'TAPMI', 'MB Logistics', 'ChatApp', 'Food Fusion'].map(archiveOnly),
];

/** Projects with documented detail, shown on the home page wall. */
export const selectedProjects = projects.filter((p) => p.category !== 'Project archive');

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
