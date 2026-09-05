# Thu Ya Kyaw — Portfolio v3 · The Digital Studio

Portfolio of **Thu Ya Kyaw** (a.k.a. **TechyyFilip**) — CTO · Systems Architect · Product Engineer.

Live: [thuyakyaw.com](https://thuyakyaw.com)

> "I build the systems behind ambitious digital products."

## What v3 is

A complete redesign around systems architecture and product engineering: graphite surfaces, metallic
project blocks, restrained champagne accents, and a lazily loaded 3D architecture scene. Every claim on
the site traces back to the previous portfolio, the repository history, or owner-supplied project names —
nothing is invented, and projects without published notes are labelled as archive entries.

## Stack

Next.js 16 (App Router) · TypeScript strict · React 19 · Tailwind CSS v4 (tokens in `globals.css`) ·
Three.js + React Three Fiber + drei · Framer Motion (`useReducedMotion`) · Lenis · Radix UI (dialog, slot) ·
Lucide · `next/font` (Inter Tight, Instrument Serif, JetBrains Mono) · Playwright + axe-core

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # ESLint (eslint-config-next, TypeScript rules)
npm run typecheck  # tsc --noEmit
npm run build      # production build (standalone output)
npm start          # serve the build
npm run test:e2e   # Playwright: smoke, overflow, console, axe WCAG 2.1 AA, reduced motion, redirects
```

## Structure

```
src/
├── app/                     # App Router: layout, home, work/[slug] case studies, systems, technology,
│   │                        # timeline, about, contact, cv, not-found, sitemap, robots, opengraph-image
│   └── globals.css          # design tokens + component styles (graphite / champagne system)
├── components/
│   ├── 3d/                  # HeroScene + ArchitectureCanvas, LabScene + TerrainCanvas (dynamic, ssr:false)
│   ├── sections/            # Hero, CommandCenter, SelectedWork, ArchitectureLab, TechnologyUniverse,
│   │                        # Engineering (depth / lab / evolution), Timeline, About + ProofOfWork, Contact
│   ├── ui/                  # Button, SectionHeading, PageHeader, ProjectSlab, Reveal, PrintButton
│   ├── Navigation.tsx       # floating glass bar, compact on scroll, full-screen mobile dialog
│   ├── Footer.tsx
│   └── SmoothScroll.tsx     # Lenis, fine-pointer + motion-allowed only
├── data/                    # all content, typed: site, projects, technologies, systems, timeline, architecture
└── hooks/                   # useMediaQuery, useReducedMotion, useWebGLSupport
deploy/                      # nginx.conf reverse proxy, docker-compose.yml
Dockerfile                   # multi-stage build of the standalone server
tests/                       # Playwright specs (run against the production build)
archive/v2/                  # previous Pages Router site, kept for reference only (not built)
```

## Principles

- **Content is data.** Copy for projects, technology groups, systems, timeline and identity lives in
  `src/data/*.ts`. Components never hardcode content.
- **3D is progressive.** Scenes load on demand, only on WebGL-capable, non-phone devices, and never under
  `prefers-reduced-motion`. Every scene has a DOM equivalent (static metallic composition, node buttons,
  CSS wire terrain) so the page is complete without WebGL or JavaScript.
- **Accuracy over impression.** No fabricated metrics, dates, clients or scale. Undated years in the timeline
  stay "Archive open"; roles without dates are listed without dates.
- **Accessibility is tested.** One `h1` per page, landmarks, `aria-pressed` on toggles, visible focus rings,
  44px touch targets, axe WCAG 2.1 AA in CI.

## Persistence

Frontend-only. No backend, database, auth or localStorage. (The v2 storage contract was retired with the
theme customiser and i18n; nothing is persisted client-side.)

## Deployment

- **Vercel** — production deploys from `main` via the GitHub integration (`output: 'standalone'` is compatible).
- **Docker + Nginx** — `docker compose -f deploy/docker-compose.yml up -d --build`, then install
  `deploy/nginx.conf` as the TLS-terminating reverse proxy.

Legacy routes redirect permanently: `/skills → /technology`, `/services → /systems`, `/experience → /timeline`.

## License

MIT © Thu Ya Kyaw (TechyyFilip)
