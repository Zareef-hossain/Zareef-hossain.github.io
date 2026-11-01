# Research & Engineering Portfolio — Project Information

Project reference for everyone working on this repository. Read it fully before making changes,
and update it after every milestone or significant decision. It is meant to be self-contained:
it should not depend on knowledge kept anywhere else.
Commit status is not tracked here — **git history (`git log`, `git status`) is the source of truth.**

Status markers used below: **[implemented]** exists in the code now · **[planned Mx]** not built
yet, scheduled for milestone x · **[owner decision pending]** awaiting the owner; do not assume.

## 1. Project objectives

Hybrid academic + engineering portfolio for **Ifreet Zareef Hossain** (B.Sc. CSE, American
International University-Bangladesh). Audiences, in priority order:

1. EPFL E3 Summer Research Internship reviewers
2. Academic / graduate research supervisors
3. Software engineering recruiters

- Live site: https://zareef-hossain.github.io/
- Repo: https://github.com/Zareef-hossain/Zareef-hossain.github.io (user site → served from root)

## 2. Rules

### 2.1 Content rules

- **Never invent** research findings, publication links/DOIs, venues, years, abstracts, metrics,
  project contributions, skills, or award details. Unknown → `null` in the content files.
- **Never fabricate links.** A DOI/URL is added only when the owner supplies it.
- **Never expose private repository source code.** Private repos never get a URL — enforced by
  the `Repository` type and the content check [implemented]; a "Source private" badge in the
  project UI [planned M5].
- **Separate personal vs team contributions** (`myContributions` vs `teamContributions`) —
  schema [implemented]; project UI [planned M5].
- **No confidential/personal data**: no phone, home address, student ID, referee contacts, or
  unpublished paper drafts. The schema has no fields for them, and the content check rejects
  phone- and email-like text [implemented].
- **No public email** (owner decision): `profile.email` stays `null`.
- **No CGPA/grades** in public content (owner decision): no schema field; the check rejects them.
- **The owner's CV PDF is never copied into the repo.** Only facts the owner confirms are added;
  a downloadable CV requires an owner-approved, redacted file.
- **Paper PDFs** go in `public/papers/` only if the owner confirms the publisher permits it
  (usually the accepted manuscript, not the publisher's final version). Otherwise link the DOI.
  The `PublicationPdf` type requires `permissionConfirmed: true` [implemented].
- **Unpublished research** stays out of the repo. `private/` and `drafts/` are git-ignored.
- **Placeholders:** temporary placeholder UI (currently `PendingContent`, "This section is being
  prepared.") is allowed during development and pre-launch builds, but **must be removed before
  the final public launch** (target: M6; launch gate: M8). Placeholder *data* (unknown facts)
  is never written as text — it is `null` and omitted from the page.
- **A deployed site is public.** `noindex` and `robots.txt` only ask search engines not to index;
  they do **not** make a GitHub Pages site private. Anyone with the URL can view it, and the repo
  itself is public. Never deploy or commit anything that must stay private.

### 2.2 Git & repository safety

- **Never** `git push`, deploy, or publish without explicit owner approval.
- **Commit only when asked**, using the owner's exact commit message. No co-author or
  tool-attribution trailers (owner preference).
- **Never** amend, reset, rebase, pull, force-push, or otherwise rewrite history without explicit
  approval.
- **Before any commit:** run `git status` and `git diff --check`, review every file to be
  committed, scan for secrets/personal data, and confirm no generated files (`node_modules/`,
  `dist/`, `.env*`, `*.tsbuildinfo`) are included. Stage only what was reviewed.
- **Do not change without approval:** git config/identity, `.github/workflows/`, GitHub Pages
  settings, `.gitignore`, or dependencies (no install/upgrade/remove).
- **Read-only requests stay read-only:** no automatic fixes (`npm audit fix`, formatters,
  `git add`) during inspections or reviews.
- Repo-local identity (already configured; do not change):
  `Ifreet Zareef Hossain <251018922+Zareef-hossain@users.noreply.github.com>`.
- LF→CRLF warnings from git are expected on this Windows setup (`core.autocrlf`); the index
  stores LF. Do not "fix" them unless asked.
- Work in milestones; stop after each and wait for owner review.

## 3. Technology stack [implemented]

| Concern | Choice | Notes |
|---|---|---|
| Framework | React 19 + TypeScript (strict) | TS 7 (native compiler), `tsc -b` in build |
| Build | Vite 8 | `base: '/'` (user site) |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` | CSS-first config in `src/styles/index.css`; **no** `tailwind.config.js`, **no** PostCSS config |
| Animation | Motion (`motion` package) | `motion/react` only — never import `framer-motion` directly (it is Motion's internal dependency) |
| Icons | `lucide-react` | Lucide 1.x has **no brand icons** → `src/components/icons/BrandIcons.tsx` |
| Fonts | `@fontsource-variable/source-serif-4` (opsz axis), `@fontsource-variable/inter` | Self-hosted, OFL. Mono = system stack (no package) |
| CI/CD | GitHub Actions → GitHub Pages | `.github/workflows/deploy.yml` |
| Node | ≥ 22.12 (CI uses 24) | |

No other runtime dependencies. Avoid adding packages for things a few lines can do (e.g. `cx()`
instead of `clsx`).

## 4. Folder structure

Everything listed exists unless marked planned.

```
.github/workflows/deploy.yml   # build on push/PR; deploy from main only
public/                        # copied verbatim to dist/
  favicon.svg  robots.txt
  papers/ cv/ images/          # [planned] only owner-approved files
src/
  main.tsx                     # entry; imports styles/index.css
  App.tsx                      # LazyMotion + MotionConfig, page composition
  styles/index.css             # Tailwind import, fonts, @theme tokens, base styles
  content/                     # portfolio content (see §9)
    types.ts                   # schemas for all content (privacy guards built into types)
    profile.ts                 # name, degree, institution, links; unknowns null
    navigation.ts              # section ids, nav labels, section titles, order/numbering
    researchInterests.ts publications.ts projects.ts
    achievements.ts skills.ts education.ts   # education + training
    validation.ts              # shared validator (CLI + dev UI); errors vs gaps
  components/
    icons/BrandIcons.tsx       # GitHub + LinkedIn SVGs (lucide-static@0.468.0, ISC)
    dev/ContentGaps.tsx        # DEV ONLY per-section list of content gaps/errors
    layout/
      Container.tsx            # max-w-page + gutters
      Section.tsx              # numbered editorial section (sticky title column on lg)
      Reveal.tsx               # one-time fade/rise on scroll; static under reduced motion
      Navbar.tsx               # sticky header, desktop nav, accessible mobile menu
      Footer.tsx  SkipLink.tsx  SocialLinks.tsx
      PendingContent.tsx       # TEMPORARY placeholder for unbuilt sections (remove by M6)
    ui/
      Button.tsx               # primary/secondary/ghost, sm/md, link or button, external
      Badge.tsx                # neutral/accent/outline mono label
      Card.tsx                 # bordered surface; as=, interactive, flush
      IconLink.tsx             # 44px icon-only link with sr-only label
      MissingField.tsx         # DEV ONLY "Missing: <field>" chip; renders nothing in prod
    cards/                     # [planned M4–M6] PublicationCard, ProjectCard, ...
  hooks/
    useActiveSection.ts        # IntersectionObserver scroll-spy (+ bottom-of-page rule)
    useScrolled.ts             # header border after scrolling
  lib/
    cx.ts                      # class joiner (no clsx dependency)
    motion.ts                  # shared transitions/easing
  sections/
    Hero.tsx                   # #home — confirmed facts only (bio etc. in M3)
    StyleGuide.tsx             # DEV ONLY design-system reference (stripped from prod)
scripts/check-content.ts       # content validation CLI (runs in npm run build)
```

## 5. Architecture decisions

Specs live in §6 (design) and §7 (conventions); this section records *why*.

- **Single page, anchored sections, no router** [implemented]. Avoids GitHub Pages SPA 404 hacks.
  Nav links use `#id`. Publication/project detail will expand inline [planned M4/M5]. If
  per-paper URLs are ever needed, add a hash router — don't introduce server-style routes.
- **Content separated from components** [implemented]. Portfolio content (facts about the
  owner, research, projects) must come from typed files in `src/content/`. Generic UI labels
  ("Skip to content", "Back to top", button text) may live in components.
- **Missing-content strategy** [implemented]: unknown = `null` (or `[]` for lists), omitted in
  production. In dev, `ContentGaps` lists each section's gaps under its placeholder using
  `MissingField` chips; both are behind `import.meta.env.DEV` and verified absent from the
  production bundle. Section UIs (M3–M6) should use `MissingField` for null fields.
- **Privacy enforced in two layers** [implemented]: (1) types — `Repository` forbids a URL unless
  public; `PublicationPdf` requires `permissionConfirmed: true` and a `/papers/*.pdf` path; no
  schema fields for phone/address/grades; (2) `validateContent()` — rejects phone/email-like
  text and grade terms anywhere in content.
- **One validator, two consumers** [implemented]: `src/content/validation.ts` is pure TS (no
  DOM/Node APIs). `scripts/check-content.ts` adds file-existence checks via `node:fs`; the dev UI
  skips those. Severity `error` (invalid links/DOIs/dates/years, duplicate ids, broken or
  non-reciprocal cross-links, missing files, private data) fails the build; `gap` (not provided
  yet) never does. Cross-links between publications and projects must be reciprocal.
- **No script dependencies** [implemented]: Node 24 (local and CI) runs `.ts` directly (type
  stripping, verified), which requires erasable-only syntax (`erasableSyntaxOnly` is on). Older
  Node 22 releases inside the `engines` range (≥ 22.12) may need a flag — unverified. `scripts/` is
  type-checked via `tsconfig.node.json` (ES2023 lib — avoid ES2024 APIs like `Map.groupBy`).
- **Indexing discouraged until launch** [implemented]: `<meta name="robots" content="noindex">`
  in `index.html` and `Disallow: /` in `public/robots.txt`. Remove both at M8. (Not a privacy
  control — see §2.1.)
- **Brand icons** [implemented]: Lucide 1.x removed them and Simple Icons removed LinkedIn, so
  stroke-style paths from `lucide-static@0.468.0` (ISC) are vendored in `BrandIcons.tsx`.
- **Fonts self-hosted** [implemented] — no Google Fonts requests. All unicode-range subsets are
  emitted to `dist/`, but browsers download only the Latin files (~170 kB total). JetBrains Mono
  was dropped for the system monospace stack (one fewer dependency).
- **Small motion bundle** [implemented]: `<LazyMotion features={domAnimation} strict>` cut JS from
  ~115 to ~105 kB gzip. `domMax` features (layout/layoutId) are deliberately avoided, so the nav
  underline is CSS, not a shared-layout animation.
- **Reduced motion** [implemented]: `<MotionConfig reducedMotion="user">` globally; `Reveal`
  renders a plain div when `useReducedMotion()` is true; CSS disables smooth scroll and shortens
  transitions.
- **Mobile menu** [implemented]: the panel is a *sibling* of `<header>` because the header's
  backdrop-filter would otherwise become the containing block and clip a fixed child. While
  open: `inert` on `#skip-link`, `#main-content`, `#site-footer`; html scroll lock; focus to the
  first link; Escape closes and restores focus to the toggle; auto-closes at the lg breakpoint
  (64rem). Keep those ids stable.
- **Scroll offset** [implemented]: `html { scroll-padding-top: var(--header-height) }` — exactly
  the header height, so the section's top border tucks under the header's. `--header-height`
  (4rem) on `:root` drives header height and panel offset.
- **Dev-only style guide** [implemented]: `{import.meta.env.DEV && <StyleGuide />}` — verified
  absent from the production bundle. For reviewing components; never put real content there.
- **Shock-Sense in both Publications and Projects** (owner decision): both records use id
  `shock-sense` and link to each other (`relatedProjectId` ↔ `relatedPublicationId`).

## 6. Design system [implemented]

Minimal academic-journal aesthetic: white page, deep navy type, restrained cyan accent.
No gradients, no decorative clutter, no parallax/typing/cursor effects.

Colour tokens (`@theme` in `src/styles/index.css`, used as `text-ink`, `bg-surface`, etc.):

| Token | Value | Use |
|---|---|---|
| `bg` | `#ffffff` | page |
| `surface` | `#f7f9fc` | footer, subtle fills, ghost hover |
| `ink` | `#0b1b33` | headings, primary button |
| `ink-soft` | `#1a3156` | primary button hover |
| `ink-body` | `#2a3a55` | body text |
| `ink-muted` | `#5b6b85` | metadata, secondary text |
| `line` | `#e3e8f0` | borders, dividers |
| `line-strong` | `#cbd4e1` | button borders, hover borders |
| `accent` | `#0e7490` | links, focus, active nav (AA on white; never use a brighter cyan for text) |
| `accent-strong` | `#155e75` | text on `accent-soft` |
| `accent-soft` | `#ecfeff` | tag backgrounds, selection |

Typography (`font-serif` / `font-sans` / `font-mono`):
- Headings h1–h4: Source Serif 4 (optical sizing auto, `text-wrap: balance`), colour `ink`.
- Body: Inter, `text-body` = 17px / 1.7, `ss01` open digits. Prose width `max-w-prose` (45rem).
- Metadata/labels: system monospace, `text-meta` (13px).

| Size token | Value | Use |
|---|---|---|
| `text-display` | clamp(2.5rem → 4.25rem) / 1.08 | hero name |
| `text-title` | clamp(1.875rem → 2.5rem) / 1.2 | section titles |
| `text-heading` | 1.375rem / 1.35 | card titles |
| `text-lead` | 1.25rem / 1.6 | intros (sm and up; `text-body` on phones) |
| `text-body` | 1.0625rem / 1.7 | default |
| `text-meta` | 0.8125rem / 1.5 | mono metadata |

Layout: `max-w-page` 70rem (1120px); gutters `px-5 sm:px-8`; sections `py-16 sm:py-20 lg:py-24`
separated by hairline `border-t border-line`. A section has a numbered mono label (`03` + short
rule) and serif title in a 4/12 column (sticky on lg), with content in 8/12. Stacks below lg.

Breakpoints: Tailwind defaults. Desktop nav from `lg` (1024px); menu button below.

Components: Button (`primary` navy fill, `secondary` outline, `ghost`; `icon`/`iconAfter`; all
≥44px tall; `external` adds arrow + sr-only "opens in a new tab"), Badge (mono, ring), Card
(rounded-lg, border-line, optional hover shadow), IconLink (44px square). One global
`:focus-visible` ring in accent.

Motion: one 0.45s fade + 8px rise on first view (`Reveal`), 0.2s menu fade/slide, CSS nav
underline. No springs, parallax, typing or cursor effects.

## 7. Coding conventions

- TypeScript strict; `noUncheckedIndexedAccess` on. No `any`.
- Function components, named exports for components (`App` is the default-export exception).
- Relative imports include the `.ts`/`.tsx` extension (matches existing code).
- Animations: use `m.*` (not `motion.*` — `LazyMotion strict` throws) from `motion/react`;
  reuse presets in `lib/motion.ts`; respect reduced motion (wrap in `Reveal` or check
  `useReducedMotion()`).
- Class merging via `cx()` from `lib/cx.ts`. Use theme tokens (`text-ink`, `bg-surface`), not hex.
- Shared visuals → components in `components/ui/`, not long repeated class strings.
- External links: `target="_blank" rel="noopener noreferrer"` (Button `external` and IconLink do
  this). Decorative icons: `aria-hidden="true"`. Tap targets ≥ 44px (`min-h-11` / `size-11`).
- Accessibility: semantic landmarks, `aria-labelledby` on sections, `aria-current="location"`
  on the active nav link, skip link, visible focus rings, sr-only labels for icon-only controls.
- Keep comments sparse and explanatory (why, not what).

## 8. Website sections

Anchor ids come from `src/content/navigation.ts` (`homeId` and `sections`).

| # | Section | Anchor |
|---|---|---|
| 0 | Home (hero) | `#home` |
| 1 | About Me | `#about` |
| 2 | Research Interests | `#research` |
| 3 | Research Publications | `#publications` |
| 4 | Projects | `#projects` |
| 5 | Awards & Achievements | `#achievements` |
| 6 | Technical Skills | `#skills` |
| 7 | Education & Training | `#education` |
| 8 | Contact | `#contact` |

Status: Home has a foundation hero [implemented]; sections 1–8 are shells showing
`PendingContent` [implemented, temporary] until M3–M6.

Owner-confirmed content lives in `src/content/` (3 publication titles, 5 project names, 1
achievement, AIUB degree). Run `npm run check:content` for the current list of gaps.

## 9. Content management

- Edit the typed files in `src/content/` [implemented]; schemas are in `types.ts`. TypeScript
  rejects wrong shapes; `npm run check:content` rejects invalid or unsafe values.
- Leave unknown facts `null` (lists `[]`). Never fill a field with a guess or placeholder text.
- Add assets to `public/` (`papers/`, `cv/`, `images/`) and reference them as `/papers/x.pdf`;
  the content check verifies the files exist.
- Ids are lowercase-kebab-case and unique per collection. When linking a publication and a
  project, set both `relatedProjectId` and `relatedPublicationId`.

## 10. Commands, QA & deployment

```bash
npm install          # first time (dependency changes need owner approval)
npm run dev          # local dev server, this PC only — default (includes DEV-only style guide)
npm run dev:lan      # dev server on all interfaces (0.0.0.0) for phone preview on same Wi-Fi
npm run typecheck    # tsc -b (app, vite config and scripts/)
npm run check:content  # validate content: errors exit 1, gaps are reported only
npm run build        # tsc -b && check:content && vite build → dist/
npm run preview      # serve dist/ locally
```

**`dev:lan` security warning:** `npm run dev:lan` binds the development server to all network
interfaces. Other devices on the same network may be able to access it, depending on firewall
settings. Use it only on trusted networks, prefer `npm run dev` by default, and stop the server
when finished. The LAN URL is printed as "Network:" by Vite (the IP can change between
connections).

QA (M1 approach): a throwaway puppeteer-core script driving the installed Chrome, kept in a
temporary folder outside the repository — **not in the repo and not available for reuse**; no
test dependency was added. It checked fonts, overflow at 1440/820/390/320px, nav scroll-spy,
sticky-header offset, skip link, 44px targets, the mobile menu (open, focus, inert, scroll lock,
Tab containment, Escape, link navigation, resize-close), reduced motion and console errors, plus
screenshots. Re-create it when needed; consider Playwright as a real dev dependency in M7.

Deployment (only with owner approval — see §2.2): a push to `main` triggers the workflow, which
builds and deploys to Pages. PRs build only. Pages source is set to
**Settings → Pages → Build and deployment → Source: GitHub Actions** (configured by the owner on
2026-11-01; must stay on GitHub Actions — "Deploy from a branch" would publish raw source).

Workflow security [implemented]: top-level `permissions: contents: read`; deploy job alone gets
`pages: write` + `id-token: write`; actions pinned to commit SHAs; `persist-credentials: false`;
`npm ci` with lockfile; `github-pages` environment; no secrets used. When bumping actions,
update both the SHA and the trailing version comment.

## 11. Milestones

- [x] **M0 — Scaffold + CI** (2026-11-01): Vite/React/TS/Tailwind v4/Motion/Lucide set up;
  token stub; minimal placeholder page; brand icons; SHA-pinned Pages workflow; `.gitignore`;
  noindex; production build verified.
- [x] **M1 — Design system & UI foundation** (2026-11-01, implemented; approved by owner):
  self-hosted Source Serif 4 + Inter; full token set and type scale; Container, Section, Reveal,
  SkipLink, Navbar (scroll-spy, accessible mobile menu), Footer, SocialLinks; Button, Badge,
  Card, IconLink; LazyMotion; reduced-motion support; 8 section shells with `PendingContent`;
  dev-only StyleGuide; browser QA 34/34 passing. Post-M1: `dev:lan` script added.
- [x] **M2 — Typed content layer** (2026-11-01, implemented; owner review pending): schemas in
  `types.ts` with type-level privacy guards; content files with owner-confirmed facts only
  (unknowns null); shared `validateContent()`; `scripts/check-content.ts` wired into the build
  (0 errors, 87 gaps at completion); dev-only `MissingField` + `ContentGaps`. Section UIs
  still show `PendingContent`.
- [ ] **M3 — Hero, About, Research Interests** (Hero foundation exists; add bio/focus line)
- [ ] **M4 — Publications** (expandable cards, PDF/DOI handling)
- [ ] **M5 — Projects** (my vs team contributions, private-repo badge)
- [ ] **M6 — Achievements, Skills, Education, Contact** (remove `PendingContent`)
- [ ] **M7 — Polish:** a11y audit, Lighthouse ≥95, Open Graph/JSON-LD, 404 page, mobile QA,
  preload Latin font files
- [ ] **M8 — Content fill + launch:** replace nulls, confirm no placeholder UI remains, remove
  noindex/robots block, final review

## 12. Pending owner input

Decided (2026-11-01): no public email; no CGPA in public content; Shock-Sense in both
Publications and Projects with reciprocal links.

Decisions [owner decision pending]:
- PDF posting rights, per paper.
- Whether under-review papers may be listed publicly (double-blind review policies).

Owner actions completed (2026-11-01): GitHub Pages source switched from "Deploy from a branch"
to **GitHub Actions**, and the deployment was completed by the owner (owner-reported; not
independently re-verified in this document).

Content still needed (the authoritative, current list is `npm run check:content`):
- Profile photo, bio, location, CV PDF, ORCID / Google Scholar (if any).
- Research interests (3–5 + one line each).
- Per publication: venue, year, status, author list/order, abstract, methodology, own
  contributions, DOI/official link, PDF.
- Per project: summary, dates, role, team size, my/team contributions, stack, repo URL +
  visibility, demo, screenshots.
- Hackathon: date/location, what was built, role, certificate/announcement link.
- Skills list; education dates, expected graduation, courses/certifications.
