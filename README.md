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
│   ├── 3d/                  # *Scene = gate + DOM fallback, *Canvas = R3F scene (dynamic, ssr:false):
│   │                        # Hero/Architecture, ProjectWall, Lab/Terrain (GLSL), Constellation, GameSystem, ModelStage
│   ├── sections/            # Hero, CommandCenter, SelectedWork, ArchitectureLab, TechnologyUniverse,
│   │                        # Engineering (depth / lab / evolution), Timeline, About + ProofOfWork, Contact
│   ├── ui/                  # Button, SectionHeading, PageHeader, ProjectSlab, Reveal, PrintButton
│   ├── Navigation.tsx       # floating glass bar, compact on scroll, full-screen mobile dialog
│   ├── Footer.tsx
│   └── SmoothScroll.tsx     # Lenis, fine-pointer + motion-allowed only
├── data/                    # all content, typed: site, projects, technologies, systems, timeline, architecture, models
├── hooks/                   # useMediaQuery, useReducedMotion, useWebGLSupport, useSceneGate
└── lib/                     # shaders/terrain (GLSL), waveDirector (pure game-loop simulation)
deploy/                      # nginx.conf reverse proxy, docker-compose.yml
Dockerfile                   # multi-stage build of the standalone server
tests/                       # Playwright specs (run against the production build)
archive/v2/                  # previous Pages Router site, kept for reference only (not built)
```

## Principles

- **Content is data.** Copy for projects, technology groups, systems, timeline and identity lives in
  `src/data/*.ts`. Components never hardcode content.
- **3D is progressive.** Every scene goes through `useSceneGate`: WebGL2 present, motion allowed, element
  on screen, device tier (`full` / `medium` / `low`; phones opt out unless the scene is small). Off-screen
  scenes stop their frame loop. Every scene has a DOM equivalent (static metallic composition, node buttons,
  CSS wire terrain, state strip, plinth) so the page is complete without WebGL or JavaScript.
- **GPU work stays on the GPU.** Terrain displacement is a GLSL vertex shader, crowds and constellations are
  single `InstancedMesh` draws, materials are PBR (`meshPhysicalMaterial` clearcoat).
- **3D never replaces links.** The project wall's slabs are textured `RoundedBox`es, but every project is also
  a real `<a>` in the strip beneath the canvas (`aria-current` marks the focused slab) and the DOM grid is one
  toggle away.
- **Blender → glTF pipeline.** Export `.glb` (Draco/meshopt) into `public/models/` and point
  `src/data/models.ts` at it; `ModelStage` loads it with `useGLTF` and falls back to a procedural stand-in.
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
