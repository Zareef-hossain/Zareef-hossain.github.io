# CLAUDE.md — Research & Engineering Portfolio

Project memory for Claude Code sessions. Read fully before making changes, and update it
after every milestone or significant decision. Do not rely on prior conversation history.

## 1. Project objectives

Hybrid academic + engineering portfolio for **Ifreet Zareef Hossain** (B.Sc. CSE, American
International University-Bangladesh). Audiences, in priority order:

1. EPFL E3 Summer Research Internship reviewers
2. Academic / graduate research supervisors
3. Software engineering recruiters

- Live site: https://zareef-hossain.github.io/
- Repo: https://github.com/Zareef-hossain/Zareef-hossain.github.io (user site → served from root)

## 2. Non-negotiable content rules

- **Never invent** research findings, publication links/DOIs, venues, years, abstracts, metrics,
  project contributions, skills, or awards details. Unknown → `null` in the content files.
- **Never fabricate links.** A DOI/URL is added only when the owner supplies it.
- **Never expose private repository source code.** Private repos show a "Source private" badge
  and no link.
- **Separate personal vs team contributions** (`myContributions` vs `teamContributions`).
- **No confidential/personal data**: no phone, home address, student ID, or unpublished paper
  drafts. Email is shown only after owner confirms which address (`profile.email` is `null`).
- **Paper PDFs** go in `public/papers/` only if the owner confirms the publisher permits it
  (usually the accepted manuscript, not the publisher's final version). Otherwise link the DOI.
- **Unpublished research** stays out of the repo. `private/` and `drafts/` are git-ignored.
- **Never `git push`** or publish to GitHub without the owner's explicit approval.

## 3. Technology stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | React 19 + TypeScript (strict) | TS 7 (native compiler), `tsc -b` in build |
| Build | Vite 8 | `base: '/'` (user site) |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` | CSS-first config; **no** `tailwind.config.js`, **no** PostCSS config |
| Animation | Motion (`motion` package) | Import from `motion/react` — never `framer-motion` |
| Icons | `lucide-react` | Lucide 1.x has **no brand icons** → see `src/components/icons/BrandIcons.tsx` |
| CI/CD | GitHub Actions → GitHub Pages | `.github/workflows/deploy.yml` |
| Node | ≥ 22.12 (CI uses 24) | |

## 4. Folder structure

Current (M0) plus planned (marked *planned*):

```
.github/workflows/deploy.yml   # build on push/PR; deploy from main only
public/                        # copied verbatim to dist/
  favicon.svg  robots.txt
  papers/ cv/ images/          # planned — only owner-approved files
src/
  main.tsx  App.tsx
  styles/index.css             # Tailwind import + @theme design tokens
  content/                     # ALL editable content (only place to edit text)
    profile.ts                 # exists (minimal); full schema in M2
    types.ts researchInterests.ts publications.ts projects.ts
    achievements.ts skills.ts education.ts         # planned (M2)
  components/
    icons/BrandIcons.tsx       # GitHub + LinkedIn SVGs (lucide-static@0.468.0, ISC)
    layout/ ui/ cards/         # planned (M1, M4–M6)
  sections/                    # planned: one component per site section
  hooks/ lib/                  # planned
scripts/check-content.ts       # planned (M2): reports null/missing fields
```

## 5. Architecture decisions

- **Single page, anchored sections, no router.** Avoids GitHub Pages SPA 404 hacks. Nav links use
  `#id`. Publication/project detail expands inline. If per-paper URLs are ever needed, add a
  hash router — don't introduce server-style routes.
- **Content/data separated from components.** Components never hard-code portfolio text.
- **Missing-content strategy:** unknown = `null`. In dev, render a dashed "Missing: <field>"
  chip; in production, omit the field entirely. Never ship literal placeholder text.
- **Indexing disabled until launch:** `index.html` has `<meta name="robots" content="noindex">`
  and `public/robots.txt` disallows all. Remove both at M8.
- **Brand icons:** Lucide 1.x removed them and Simple Icons removed LinkedIn, so stroke-style
  paths from `lucide-static@0.468.0` (ISC) are vendored in `BrandIcons.tsx`.
- **Fonts self-hosted** via `@fontsource` (M1) — no Google Fonts requests.
- **Shock-Sense** appears in both Publications and Projects, cross-linked (pending owner confirm).

## 6. Design system

Minimal academic-journal aesthetic: white page, deep navy type, restrained cyan accent.
No gradients, no decorative clutter, no parallax/typing/cursor effects.

Tokens (defined in `src/styles/index.css` under `@theme`, used as `text-ink`, `bg-surface`, etc.):

| Token | Value | Use |
|---|---|---|
| `bg` | `#ffffff` | page |
| `surface` | `#f7f9fc` | alt sections, cards |
| `ink` | `#0b1b33` | headings |
| `ink-body` | `#2a3a55` | body text |
| `ink-muted` | `#5b6b85` | metadata |
| `line` | `#e3e8f0` | borders |
| `accent` | `#0e7490` | links, focus, active nav (AA on white; don't use brighter cyan for text) |
| `accent-soft` | `#ecfeff` | tag backgrounds, hover tints |

Planned (M1): Source Serif 4 (headings), Inter (body), JetBrains Mono (metadata); ~1.25 type
scale, 17px body / 1.7 leading, ~68ch measure; max width 1120px; 8px spacing grid; section
labels like `03 — Publications`.

Motion: single 0.4s fade + 8px rise on enter, height animation on expand, sliding nav
underline. Always respect `useReducedMotion()`.

## 7. Coding conventions

- TypeScript strict; `noUncheckedIndexedAccess` on. No `any`.
- Function components, named exports for components (`App` is the default-export exception).
- Relative imports include the `.ts`/`.tsx` extension (matches existing code).
- Tailwind utilities in JSX; use theme tokens, not raw hex values. Shared visuals → components
  in `components/ui/`, not long repeated class strings (refactor the M0 buttons in M1).
- External links: `target="_blank" rel="noopener noreferrer"`. Decorative icons:
  `aria-hidden="true"`. Tap targets ≥ 44px (`min-h-11`).
- Accessibility: semantic landmarks, visible `focus-visible` rings, skip link (M1).
- Keep comments sparse and explanatory (why, not what).

## 8. Website sections

1. Home (hero) 2. About Me 3. Research Interests 4. Research Publications 5. Projects
6. Awards & Achievements 7. Technical Skills 8. Education & Training 9. Contact

Known content (owner-confirmed):
- Publications (titles only so far): *Shock-Sense: A Low-Cost Rule-Based Physiological Monitoring
  System for Early Hemorrhagic Shock Risk Detection*; *Public Awareness and Expectations of
  Accelerated Reliable MRI Imaging Using Machine Learning*; *Machine Learning in Bangladesh's
  Primary Education*.
- Projects (names only): Shock-Sense; Reroute Agro; University Management System Backend
  Software; Airline Management System Backend Software; Event Planning and Vendor Management System.
- Achievement: Hackathon Runner-up — Hack for Humanity: Hack to Protect the Environment,
  Powered by AI Collective (2026).

## 9. Content management

- Edit only files in `src/content/`. Each file exports typed arrays/objects (schemas in M2).
- Add assets to `public/` (`papers/`, `cv/`, `images/`) and reference them as `/papers/x.pdf`.
- Leave unknown fields `null`; run the content check (M2) to list gaps.

## 10. Commands & deployment

```bash
npm install          # first time
npm run dev          # local dev server
npm run build        # tsc -b && vite build → dist/
npm run preview      # serve dist/ locally
```

Deployment: push to `main` → workflow builds and deploys to Pages. PRs build only.
One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Workflow security: top-level `permissions: contents: read`; deploy job alone gets
`pages: write` + `id-token: write`; actions pinned to commit SHAs; `persist-credentials: false`;
`npm ci` with lockfile; `github-pages` environment; no secrets used. When bumping actions,
update both the SHA and the trailing version comment.

## 11. Milestones

- [x] **M0 — Scaffold + CI** (2026-11-01): Vite/React/TS/Tailwind v4/Motion/Lucide set up;
  token stub; minimal placeholder page (name, degree, institution, GitHub, LinkedIn); brand
  icons; SHA-pinned Pages workflow; `.gitignore`; noindex; production build verified;
  this file. *Not yet committed or pushed — awaiting owner review.*
- [ ] **M1 — Design system:** fonts, full tokens/type scale, Container/Section/Navbar (active
  section, mobile sheet)/Footer, Button/Tag/Badge/Card/IconLink, skip link. Consider
  `LazyMotion` + `m` to shrink the bundle (M0 JS is ~115 kB gzip).
- [ ] **M2 — Content layer:** `types.ts` schemas, all content files with known facts + nulls,
  `MissingField` chip, `scripts/check-content.ts`.
- [ ] **M3 — Hero, About, Research Interests**
- [ ] **M4 — Publications** (expandable cards, PDF/DOI handling)
- [ ] **M5 — Projects** (my vs team contributions, private-repo badge)
- [ ] **M6 — Achievements, Skills, Education, Contact**
- [ ] **M7 — Polish:** a11y audit, Lighthouse ≥95, Open Graph/JSON-LD, 404 page, mobile QA
- [ ] **M8 — Content fill + launch:** replace nulls, remove noindex/robots block, final review

## 12. Pending owner input

- Decisions: public email; PDF posting rights per paper; Shock-Sense in both sections?
- Profile photo, bio, location, CV PDF, ORCID / Google Scholar (if any).
- Research interests (3–5 + one line each).
- Per publication: venue, year, status, author list/order, abstract, methodology, own
  contributions, DOI/official link, PDF.
- Per project: summary, dates, role, team size, my/team contributions, stack, repo URL +
  visibility, demo, screenshots.
- Hackathon: date/location, what was built, role, certificate/announcement link.
- Skills list; education dates, expected graduation, CGPA (optional), courses/certifications.
