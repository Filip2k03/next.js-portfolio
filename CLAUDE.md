# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install dependencies (no node_modules checked in)
npm run dev        # dev server at http://localhost:3000
npm run lint       # ESLint via eslint-config-next (src + tests)
npm run typecheck  # tsc --noEmit (strict)
npm run build      # production build, output: 'standalone'
npm run test:e2e   # Playwright against the production build (smoke, overflow, console, axe AA, motion)
```

Run lint → typecheck → build → test:e2e before reporting any change as done. Playwright needs
`npx playwright install chromium` once per machine.

## Architecture (v3 — "The Digital Studio")

- **Next.js 16 App Router, TypeScript strict**, `src/` directory, `@/*` alias. Routes in `src/app/`:
  `/`, `/work`, `/work/[slug]` (SSG via `generateStaticParams`, `dynamicParams = false`), `/systems`,
  `/technology`, `/timeline`, `/about`, `/contact`, `/cv`, `not-found`, plus `sitemap.ts`, `robots.ts`,
  `opengraph-image.tsx`. Legacy `/skills`, `/services`, `/experience` redirect in `next.config.js`.
- **Server-first.** Sections are Server Components; `"use client"` only where state or browser APIs are
  needed (Navigation, SelectedWork toggle, ArchitectureLab, TechnologyUniverse, Reveal, 3D, SmoothScroll).
- **Content is data.** All copy lives in `src/data/*.ts` (`site`, `projects`, `technologies`, `systems`,
  `timeline`, `architecture`). Never hardcode content in components. Case-study sections render only when
  the field exists; archive-only projects show a "notes pending" block instead.
- **Accuracy rule (non-negotiable).** Do not invent companies, clients, dates, metrics, team size or
  scale. Each `Project` carries `provenance`; each dated `TimelineEntry` carries `source`. If data is
  missing, say so in neutral language rather than filling the gap.
- **Design system:** tokens as CSS variables in `src/app/globals.css` (graphite surfaces, champagne
  `--accent`, mono eyebrows, fluid `--step-*` type). Components use semantic class names defined there;
  Tailwind v4 is imported for preflight/utilities. Never hardcode colours in components.
- **3D is progressive enhancement.** `HeroScene` / `LabScene` gate WebGL on `useWebGLSupport`,
  `useMediaQuery` (no phones / coarse pointers) and `useReducedMotion`; canvases are `next/dynamic`
  with `ssr: false`, `frameloop="demand"` where static, and sit behind an error boundary. Every scene
  has a DOM fallback (static metallic monument, node buttons, CSS wire terrain). Keep it that way.
- **Motion:** `Reveal` is IntersectionObserver + CSS (`[data-reveal]`); server HTML is always visible
  without JS. Lenis loads lazily for fine-pointer devices only. All motion collapses under
  `prefers-reduced-motion` (centralised in `globals.css`).
- **Fonts:** `next/font/google` — Inter Tight (`--font-body`), Instrument Serif italic (`--font-accent`,
  used for `<span>` highlights in headings), JetBrains Mono (`--font-mono`).
- **Analytics:** `@vercel/analytics` renders only when `process.env.VERCEL` is set.

## Persistence

Frontend-only: no backend routes, database, auth or localStorage. If client persistence is ever
reintroduced, add a typed `src/lib/storage.ts` with namespaced `tf:v1:*` keys, try/catch and SSR guards,
and document the schema in README in the same change.

## Deployment

Vercel deploys `main` through the GitHub integration. `Dockerfile` + `deploy/nginx.conf` +
`deploy/docker-compose.yml` provide the self-hosted path. `.github/workflows/ci.yml` runs lint,
typecheck, build and Playwright on every push/PR.

## Coding standards

- Named exports; file name matches component (`ProjectSlab.tsx`). Props typed with explicit interfaces.
- Hooks live in `src/hooks/` and are prefixed `use`.
- One-line "why" comments on non-obvious logic; no dead code, no `console.log`, no `any`.
- `archive/v2/` is the previous Pages Router site kept for reference — excluded from tsconfig and ESLint.
  Do not import from it.
- Mobile is a composition, not a squeeze: verify 320–430px, 768, 1440, 1920. Touch targets ≥ 44px,
  safe-area insets respected, no horizontal overflow (tested).

## Definition of Done

- [ ] `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:e2e` all pass
- [ ] New content added in `src/data/`, with provenance/source where it is a factual claim
- [ ] Any new 3D or motion has a DOM fallback and respects reduced motion
- [ ] One `h1` per route, axe clean, no console errors
