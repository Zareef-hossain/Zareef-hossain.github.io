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
- **Owner-approved text is used verbatim** (headline, bio, research interest titles/summaries):
  never paraphrase, expand or "improve" it without the owner's approval.
- **Never expose private repository source code.** Private repos never get a URL — enforced by
  the `Repository` type and the content check; private repos show a "Source private" badge
  [implemented]. All five repos are visibility `unknown`, so no repo link or badge is shown.
- **Separate personal vs team contributions** (`myContributions` vs `teamContributions`) —
  schema and project UI (two separately labelled lists, shown only when filled) [implemented].
  Both are empty: project `highlights` describe what a project covers and are not attributed
  to anyone.
- **No confidential/personal data**: no phone, home address, student ID, referee contacts, or
  unpublished paper drafts. The schema has no fields for them, and the content check rejects
  phone- and email-like text [implemented].
- **Public emails** (owner decision, 2026-11-01): exactly the three addresses in
  `profile.emails` — two Gmail addresses and the AIUB student address, which the owner approved
  despite it containing the student ID. The privacy scan exempts only these exact strings.
- **No CGPA/grades** in public content (owner decision): no schema field; the check rejects them.
- **Original CV published unchanged** (owner decision, 2026-11-01): the owner explicitly
  approved publishing the original CV as-is, **including** the personal details it contains
  (home address, phone number, academic grades, referee contacts). It is a byte-identical copy
  (SHA-256 verified against the owner's private backup, which stays outside the repository) at
  `public/cv/Ifreet_Zareef_Hossain_CV.pdf`, and `profile.cv` points to it, so the Hero shows a
  **Download CV** button [implemented locally; NOT committed or deployed]. Do not edit, redact,
  re-export or replace the file without a new owner decision. This approval covers the PDF only:
  the site's own text, schema and content check still exclude phone numbers, address, grades and
  referees. CV publication and Git commit/push/deployment are separate authorizations. Vite copies
  all of `public/` into `dist/`, so never put an unapproved file there.
- **Paper PDFs** go in `public/papers/` only if the owner confirms the publisher permits it
  (usually the accepted manuscript, not the publisher's final version). Otherwise link the DOI.
  The `PublicationPdf` type requires `permissionConfirmed: true` [implemented].
- **Unpublished research** stays out of the repo. `private/` and `drafts/` are git-ignored.
- **Placeholders:** no section renders placeholder UI any more [implemented]. `PendingContent`
  remains only as a fallback for a section whose content list is emptied (verified absent from
  the rendered page). Placeholder *data* (unknown facts) is never written as text — it is `null`
  and omitted from the page.
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
public/                        # copied verbatim to dist/ (everything in it is published)
  favicon.svg  robots.txt
  images/profile.jpg           # owner-supplied hero portrait (800×1005)
  images/section.jpg           # owner's original About photo (918 kB) — kept by owner decision
  images/section-optimized.jpg # same pixels re-encoded (315 kB) — used in About
  cv/Ifreet_Zareef_Hossain_CV.pdf # owner-approved original CV, unchanged (§2.1)
  papers/                      # [planned] only PDFs the owner may legally post
src/
  main.tsx                     # entry; imports styles/index.css
  App.tsx                      # LazyMotion + MotionConfig, page composition
  styles/index.css             # Tailwind import, fonts, @theme tokens, base styles
  content/                     # portfolio content (see §9)
    types.ts                   # schemas for all content (privacy guards built into types)
    profile.ts                 # name, degree, institution, links; unknowns null
    navigation.ts              # section ids, nav labels, titles, order; per-item anchor helpers
    researchInterests.ts publications.ts projects.ts
    achievements.ts            # awards + volunteering
    skills.ts education.ts     # skill groups; education + training
    validation.ts              # shared validator (CLI + dev UI); errors vs gaps
  components/
    icons/BrandIcons.tsx       # GitHub, LinkedIn, Facebook SVGs (lucide-static@0.468.0, ISC)
    icons/LogoMark.tsx         # site mark (same artwork as public/favicon.svg), header brand
    dev/ContentGaps.tsx        # DEV ONLY per-section list of content gaps/errors
    layout/
      Container.tsx            # max-w-page + gutters
      Section.tsx              # numbered editorial section (sticky title column on lg)
      Reveal.tsx               # one-time fade/rise on scroll; static under reduced motion
      Navbar.tsx               # sticky header: "[mark] Zareef" brand, nav, theme toggle, mobile menu
      ThemeToggle.tsx          # 44px light/dark switch (sun/moon, aria-label names the action)
      Footer.tsx  SkipLink.tsx  SocialLinks.tsx
      PendingContent.tsx       # fallback for an emptied section; not rendered currently
    ui/
      Button.tsx               # primary/secondary/ghost, sm/md, link or button, external
      Badge.tsx                # neutral/accent/outline mono label
      Card.tsx                 # bordered surface; as=, interactive, flush
      IconLink.tsx             # 44px icon-only link with sr-only label
      MissingField.tsx         # DEV ONLY "Missing: <field>" chip; renders nothing in prod
      TextLink.tsx             # underlined accent link, 44px tall; external or in-page arrow
  hooks/
    useActiveSection.ts        # IntersectionObserver scroll-spy (+ bottom-of-page rule)
    useScrolled.ts             # header border after scrolling
    useTheme.ts                # light/dark state: saved choice → system preference; persists
  lib/
    cx.ts                      # class joiner (no clsx dependency)
    date.ts                    # formatPartialDate ("2027-09" → "September 2027"), formatPeriod
    motion.ts                  # shared transitions/easing
  sections/
    Hero.tsx                   # #home — name, headline, degree, interest tags, CTAs, portrait
    About.tsx                  # #about — secondary photo, verbatim bio, academic facts (<dl>)
    ResearchInterests.tsx      # #research — numbered interests + related-paper links
    Publications.tsx           # #publications — conference paper cards (#publication-<id>)
    Projects.tsx               # #projects — project cards (#project-<id>), first one featured
    Achievements.tsx           # #achievements — award card (#achievement-<id>) + volunteering
    Skills.tsx                 # #skills — one box per skill category
    Education.tsx              # #education — degree/certificate timeline + training list
    Contact.tsx                # #contact — opportunity statement, mailto links, profiles
    StyleGuide.tsx             # DEV ONLY design-system reference (stripped from prod)
scripts/check-content.ts       # content validation CLI (runs in npm run build)
```

## 5. Architecture decisions

Specs live in §6 (design) and §7 (conventions); this section records *why*.

- **Single page, anchored sections, no router** [implemented]. Avoids GitHub Pages SPA 404 hacks.
  Nav links use `#id`. Items have stable anchors (`#publication-<id>`, `#project-<id>`,
  `#achievement-<id>`, from helpers in `navigation.ts`) used by cross-links. Cards show all
  confirmed content; there is no expand/collapse. If separate per-paper pages are ever needed,
  add a hash router — don't introduce server-style routes.
- **Content separated from components** [implemented]. Portfolio content (facts about the
  owner, research, projects) must come from typed files in `src/content/`. Generic UI labels
  ("Skip to content", "Back to top", button text) may live in components.
- **Missing-content strategy** [implemented]: unknown = `null` (or `[]` for lists), omitted in
  production. In dev, `ContentGaps` lists each section's gaps at the end of the section using
  `MissingField` chips; both are behind `import.meta.env.DEV` and verified absent from the
  production bundle. Section UIs use `MissingField` for null fields.
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
- **Section bodies** [implemented]: `App.tsx` keeps one `Section` shell per nav item (ids,
  numbers, titles, order unchanged) and fills it from a `sectionBodies` map keyed by section id;
  all eight sections have a body. Section components render body content only — the `Section`
  shell owns the h2, so components start at h3 (subsection items use h4).
- **Completed sections hide gaps in production** [implemented M3]: About shows only confirmed
  facts (degree, institution, expected graduation; location/ORCID/Scholar appear only when set).
  If the bio or interests list were ever emptied, the section falls back to `PendingContent` plus
  a dev-only `MissingField`.
- **Research interest ↔ publication links** (owner decision, M3): `relatedPublicationIds` is an
  optional topical association, rendered as "Related work" links to each paper's own anchor
  (`#publication-<id>`). It is not evidence of methods or publication status. Only publication
  ids are allowed (projects such as Reroute Agro never); the validator rejects unknown or
  duplicate ids.
- **Expected graduation** is stored as `education[0].period.end = '2027-09'` with
  `expected: true` (start unknown, `null`). The UI shows "Expected graduation" / "Expected
  September 2027" for as long as `expected` is true. It is **never inferred from today's
  date**; only the owner sets `expected: false` after confirming graduation.
- **Publications** (owner-confirmed 2026-11-01): three conference papers/presentations, not yet
  online on the conference websites. Cards show type ("Conference paper"), year, title, authors
  in order (owner in bold), venue, location/dates and a short factual summary based on the
  owner's CV. No status badge, DOI, official link, PDF or indexing claim is shown or stored.
- **Projects**: confirmed descriptions only. `context` is the CV's qualifier (e.g.
  "Documentation Project · System Analysis and Design", which makes clear it is not a deployed
  application). Tech badges appear only where the owner named them (Airline: C#, OOP). No role,
  team size, repo, demo or screenshot until confirmed. Reroute Agro links to its hackathon award
  and back (`achievements[].relatedProjectId`).
- **Volunteer experience** is a subsection (h3) of Awards & Achievements so the navigation stays
  unchanged.
- **Photos** [implemented]: owner-supplied `profile.jpg` (Hero, unmodified) and `section.jpg`
  (About). Both originals carry orientation-only EXIF (no GPS/XMP/ICC; checked 2026-11-01).
  About uses `section-optimized.jpg`: the same 1347×900 pixels re-encoded with Chrome's JPEG
  encoder at quality 0.88 (918 kB → 315 kB, PSNR 40.3 dB vs the original, no metadata) and is
  the active About image. The original stays in `public/images/` unchanged and is intentionally
  retained (owner decision, 2026-11-01); it is copied to `dist/` but not referenced by the page.
  Do not delete, rename, move or re-encode any of the three image files.
  Width/height attributes reserve space; `object-cover` crops without distortion. The Hero
  portrait is eager with `fetchpriority="high"` plus a `<link rel="preload">` in `index.html`;
  the About photo is `loading="lazy"` (Chrome may still fetch it early because it is near the
  fold).
- **Publications section wording** (owner decision, 2026-11-01): the visible heading is
  **Conference Papers & Presentations**, because the papers are not yet online. The nav label is
  the short form "Papers" and the Hero button reads "Conference papers" (the full heading does
  not fit the desktop nav bar or a non-wrapping button at 320px). The section id stays
  `publications`, so `#publications`, `#publication-<id>` anchors and all cross-links are unchanged.
- **Light/dark theme** [implemented, local]: colours are CSS variables in `@theme` (light) and
  redefined on `:root[data-theme="dark"]` in `index.css`, so every utility adapts with no
  per-component `dark:` classes (a `dark:` variant exists for exceptions). An inline script in
  `index.html` sets `data-theme` + `color-scheme` before first paint (no flash): saved choice in
  `localStorage['theme']`, else `prefers-color-scheme`. `useTheme` follows live system changes
  until the visitor chooses, persists the choice, updates `<meta name="theme-color">`, and
  tolerates blocked storage. Keep the key and colours in the script and the hook in sync.
- **Header brand** (owner decision, redesign): visible brand is "[mark] Zareef" (the existing
  favicon artwork as `LogoMark`). The full name stays in the hero, `<title>`, metadata and
  content. The previous header brand was the full name; "IZH" was never used.
- **Download CV button** [implemented, enabled locally]: the Hero renders it only when
  `profile.cv` is set (`download` attribute, label "Download CV" from content), and the content
  check fails the build if the file is missing, so it can never be a dead link. Enabled with the
  owner-approved original CV (§2.1).
- **Shock-Sense in both Publications and Projects** (owner decision): both records use id
  `shock-sense` and link to each other (`relatedProjectId` ↔ `relatedPublicationId`).

## 6. Design system [implemented]

Modern academic aesthetic (redesign, 2026-11-01): warm off-white (light) or deep navy (dark)
page, navy/near-white type, indigo accent with a restrained violet partner. Soft gradients only
as accents (hero background fields, portrait frame, section rules, card stripes); soft card
shadows. No glassmorphism beyond the existing header blur, no parallax/typing/cursor effects.

Colour tokens (`src/styles/index.css`; used as `text-ink`, `bg-card`, etc.). All text pairs meet
WCAG AA in both themes (verified by the contrast audit):

| Token | Light | Dark | Use |
|---|---|---|---|
| `bg` | `#fbfaf7` | `#0a1020` | page |
| `surface` | `#f3f2ee` | `#0e1528` | footer, subtle fills, ghost hover |
| `card` | `#ffffff` | `#131c33` | cards, secondary buttons, icon links |
| `ink` | `#0b1b33` | `#eef2fa` | headings |
| `ink-soft` | `#1a3156` | `#d5ddec` | (reserved) |
| `ink-body` | `#2a3a55` | `#c3cce0` | body text |
| `ink-muted` | `#56647c` | `#94a1ba` | metadata, secondary text |
| `line` / `line-strong` | `#e5e3dd` / `#cfccc4` | `#222d48` / `#34415f` | borders |
| `accent` | `#4338ca` | `#a5b4fc` | links, focus ring, active nav, labels |
| `accent-strong` | `#3730a3` | `#c7d2fe` | text on `accent-soft` |
| `accent-soft` | `#eef0ff` | `#1b2150` | tag backgrounds, tints, selection |
| `violet` | `#6d28d9` | `#c4b5fd` | gradient partner only (not body text) |
| `accent-fill` (+`-hover`) | `#4338ca` | `#4f46e5` | primary button fill, white text ≥ 6:1 |
| `shadow-card` (+`-hover`) | soft navy | soft black | card elevation |

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

Components: Button (`primary` indigo fill, `secondary` outline on card, `ghost`;
`icon`/`iconAfter`; all ≥44px tall; `external` adds arrow + sr-only "opens in a new tab"),
Badge (mono, ring), Card (rounded-xl, `bg-card`, `shadow-card`; `interactive` adds hover
elevation without movement), IconLink (44px square), ThemeToggle (44px). One global
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
| 3 | Conference Papers & Presentations | `#publications` |
| 4 | Projects | `#projects` |
| 5 | Awards & Achievements | `#achievements` |
| 6 | Technical Skills | `#skills` |
| 7 | Education & Training | `#education` |
| 8 | Contact | `#contact` |

Status: all sections are built [implemented]. The owner reviewed and approved the current
content and design (visual review, 2026-11-01). No section shows placeholder UI. These changes
are local and uncommitted: **commit, push, deployment and launch are not yet authorized.**

Owner-confirmed content lives in `src/content/`: headline, 4-paragraph bio, opportunity
statement, 3 public emails, GitHub/LinkedIn/ORCID/Facebook links, 2 photos, 4 research interests,
3 conference papers (authors, venues, dates, CV-based summaries), 5 projects, 1 award, 4 volunteer
roles, 6 skill groups, AIUB/HSC/SSC education and 5 training courses. Run
`npm run check:content` for the current list of gaps.

## 9. Content management

- Edit the typed files in `src/content/` [implemented]; schemas are in `types.ts`. TypeScript
  rejects wrong shapes; `npm run check:content` rejects invalid or unsafe values.
- Leave unknown facts `null` (lists `[]`). Never fill a field with a guess or placeholder text.
- Add assets to `public/` (`papers/`, `cv/`, `images/`) and reference them as `/papers/x.pdf`;
  the content check verifies the files exist. Images need `alt`, `width` and `height`.
  **Everything in `public/` is published** — never place a private file there.
- Ids are lowercase-kebab-case and unique per collection. When linking a publication and a
  project, set both `relatedProjectId` and `relatedPublicationId`.
- A research interest may list `relatedPublicationIds` (publication ids only; topical link).

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

QA (since M1): a throwaway puppeteer-core script driving the installed Chrome, kept in a
temporary folder outside the repository — **not in the repo and not available for reuse**; no
test dependency was added. It checked fonts, overflow at 1440/820/390/320px, nav scroll-spy,
sticky-header offset, skip link, 44px targets, the mobile menu (open, focus, inert, scroll lock,
Tab containment, Escape, link navigation, resize-close), reduced motion and console errors, plus
screenshots. The full-site pass (2026-11-01) checked exact owner text, all sections, both
images (loading/priority/object-fit), cross-links and per-item anchors, mailto and external
links (`noopener noreferrer`, new-tab notice), 44px targets, keyboard focus, heading order,
reduced motion, private-data absence, metadata and console/network errors at
1440/1024/820/390/320px (148/148), an extra audit of CLS, WCAG AA text contrast, head tags,
header fit and image crops (34/34), plus the M1 suite (34/34). Keyboard tests must let
`focus()`'s own smooth scroll finish before pressing Enter, or the two scrolls collide (a test
artifact, not a user-facing bug). `vite preview` answers unknown paths with `index.html` (200);
GitHub Pages returns 404. Re-create it when needed; consider
Playwright as a real dev dependency in M7.

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
- [x] **M2 — Typed content layer** (2026-11-01, implemented; approved by owner): schemas in
  `types.ts` with type-level privacy guards; content files with owner-confirmed facts only
  (unknowns null); shared `validateContent()`; `scripts/check-content.ts` wired into the build
  (0 errors, 87 gaps at completion); dev-only `MissingField` + `ContentGaps`. Section UIs
  still show `PendingContent`.
- [x] **M3 — Hero, About & Research Interests** (2026-11-01, implemented; content and design
  approved by owner; not yet committed): verbatim owner-approved headline, bio and 4 interests; Hero headline + interest
  tags (→ `#research`, 44px targets); About bio + confirmed facts `<dl>`; numbered interest
  cards (`<ol>`, h3) with "Related work" links; optional `relatedPublicationIds` schema field +
  validation; expected graduation 2027-09. Content check 0 errors / 84 gaps; browser QA 61/61
  (M3) + 34/34 (M1 regression) at 1440/820/390/320px.
  Post-audit fix: the graduation label is no longer inferred from the date (`isFuture`
  removed; `Education.expected` flag added).
- [x] **M4–M6 — Remaining sections** (2026-11-01, implemented in one pass; content and design
  approved by owner; not yet committed): Hero portrait and About photo; Publications (3 conference papers, per-paper anchors,
  no status/DOI/PDF); Projects (5, featured first card, highlights, award/paper cross-links,
  private-repo badge and my/team contribution lists ready for data); Awards + Volunteer
  Experience; Skills (6 boxes); Education timeline + Training; Contact (statement, 3 mailto
  links, 4 profiles). Facebook brand icon added. Content check 0 errors / 24 gaps.
  Final audit (2026-11-01): CV notes corrected, `section-optimized.jpg` added; publications
  heading renamed to "Conference Papers & Presentations" (owner decision).
- [x] **Redesign — light/dark academic theme** (2026-11-01, implemented locally; owner review
  pending; NOT committed): warm light + deep-navy dark palettes, theme toggle (persisted, system
  default, no flash), "[mark] Zareef" header brand, gradient hero/portrait frame, card elevation,
  featured-project and publication accents. Content, images, anchors and `noindex` unchanged.
  About photo (`section-optimized.jpg`) kept.
- [x] **CV download** (2026-11-01, implemented locally; NOT committed): owner explicitly approved
  publishing the original CV unchanged; copied byte-for-byte into `public/cv/` (hash verified),
  `profile.cv` set, Download CV button enabled.
- [x] **Final UI corrections** (2026-11-01, implemented locally; NOT committed):
  - Hero layout shift fixed. Cause: on a cold cache the web fonts arrived after the first
    render; in the fallback serif (Georgia) the Hero name wraps to 2 lines, in Source Serif 4
    (narrower at display sizes, optical sizing) it fits on 1, so the Hero content jumped
    (CLS up to 0.19 at 1440px under fast-4G throttling). Fix: `index.html` preloads the two
    Latin WOFF2 files the page actually uses (Source Serif 4 opsz, Inter wght); Vite rewrites
    the `/node_modules/...` hrefs to the same hashed files the CSS requests (verified). After:
    CLS 0.0000 at 1440/1024/820/390/320px, light and dark, unthrottled and fast-4G; ≤ 0.007 at
    1.6 Mbps. Only these two font files are requested; no console warnings.
  - Hero profile links moved to their own row ("Profiles" label, short rule, GitHub/LinkedIn
    icons) below the three buttons; three buttons plus icons do not fit one line in the text
    column, so they previously wrapped awkwardly.
  - Verified: full-site 148/148, papers/anchors 37/37, audit 34/34, navigation 34/34 (each in
    light and dark), theme 19/19, CV download 23/23 (served and downloaded file hashes match
    the original).
- [ ] **M7 — Polish:** partly done — title, description, canonical, Open Graph, portrait
  preload and Latin font preloads added. Remaining: Lighthouse audit, JSON-LD (optional), 404
  page, image resizing (needs approval).
- [ ] **M8 — Launch** [owner decision pending]: owner content review done (approved
  2026-11-01). Still requires explicit owner authorization to commit and push (which deploys),
  and a separate approval before removing noindex/robots.

## 12. Pending owner input

Decided (2026-11-01): no CGPA in public content; Shock-Sense in both Publications and Projects
with reciprocal links; three public emails approved (replacing the earlier "no public email"
decision); publications are shown without status, DOI or PDF because none is online yet.

Decided (2026-11-01, owner visual review): current content and design approved; publications
heading "Conference Papers & Presentations"; original `section.jpg` retained alongside the
active `section-optimized.jpg`; search engine indexing stays disabled (`noindex` + robots.txt);
no public CV download at that time (superseded below).

Decided (2026-11-01): the owner explicitly approved publishing the original CV unchanged,
including its personal details. It is integrated locally (`public/cv/`, Download CV button).

**Not yet authorized:** staging, commit, push, deployment and launch of the current local
changes. A push to `main` deploys automatically, so it needs the owner's explicit authorization.

Decisions [owner decision pending]:
- Review of the light/dark redesign (local, uncommitted), then separate authorization to commit
  and push it.
- Authorization to commit and push the current local changes (redesign + CV). No commit or push
  has occurred; CV publication approval does not authorize Git operations.
- When to enable search engine indexing (separate approval).
- PDF posting rights, per paper, once papers are online.

Owner actions completed (2026-11-01): GitHub Pages source switched from "Deploy from a branch"
to **GitHub Actions**, and the deployment was completed by the owner (owner-reported; not
independently re-verified in this document).

Content still needed (the authoritative, current list is `npm run check:content`):
- Per publication, once online: DOI/official link; PDF only with posting permission.
- Per project: role, personal contributions (and team contributions), repository visibility
  (public URL or private), dates where known.
- Hackathon: certificate/announcement link (optional).
- AIUB start date (optional).
