# TechyyFilip — Portfolio v2.0

Personal portfolio of **Thu Ya Kyaw** (a.k.a. **TechyyFilip**) — CTO, System Engineer, Full Stack Developer, AI & ML Engineer, UI/UX Designer.

Live: [techyyfilip.vercel.app](https://techyyfilip.vercel.app)

## v2.0 Highlights

- **Forging the Future hero** — system engineer + AI/ML positioning, PayVia Tech Solutions affiliation, Zazy2Door featured product CTA.
- **15 engineered services** — AI & ML, API, cloud, CMS, e-commerce, HMS, mobile, POS, SMS, UI/UX, and more.
- **Capabilities section** — system architecture, AI/ML, cloud, marketplace, real-time, and security engineering.
- **Expanded portfolio** — Zazy2Door, Pai Cafe, Retail POS Pro, Edu-Manage, Health-Plus HMS, AI Logistics, and more.
- **Touch CTAs** — floating call/email/contact bar + hero quick contact + footer contact links.
- **GSAP + AOS animations** — hero entrance, stagger reveals, magnetic CTAs, scroll animations (respects `prefers-reduced-motion`).
- **Vercel Analytics** — `@vercel/analytics` for production traffic insights.
- **Retro-matte design system** — warm near-black/brown dark theme, accent customizer, terminal easter egg, i18n (EN/MM/RU).

## Stack

Next.js (Pages Router) · React · CSS Modules · next-themes · react-icons · GSAP · AOS · @vercel/analytics · next/font (Poppins + JetBrains Mono)

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

## Structure

```
src/
├── data/profile.js      # all site content (identity, skills, services, projects, experience)
├── lib/storage.js       # namespaced, SSR-safe localStorage service
├── hooks/useTypewriter.js
├── components/          # Layout, SEO, Header, Footer, Reveal, AccentPicker, BackToTop, Skill(s)
├── pages/               # index, skills, services, experience, contact, 404
└── styles/              # globals.css (tokens) + CSS Modules per component/page
```

## localStorage Schema

| Key             | Type     | Description                                        |
| --------------- | -------- | -------------------------------------------------- |
| `tf:v1:accent`  | `string` | Selected accent theme: `emerald`, `violet`, `bronze` |
| `tf:v1:lang`    | `string` | Interface language: `en` (default), `my`, `ru`     |
| `theme`         | `string` | Dark/light preference (managed by next-themes)     |

All access goes through `src/lib/storage.js` — namespaced keys, `try/catch`-wrapped, SSR-safe.

## License

MIT © Thu Ya Kyaw (TechyyFilip)
