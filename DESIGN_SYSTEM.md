# Revenue Craft Digital — Design System & Architecture

This document is the source of truth for how the site is built: the design tokens,
component conventions, folder architecture, and routing map. It reflects what is
actually implemented in `src/` — if this doc and the code disagree, trust the code
and update this file.

For the content-provider (CMS) and lead-destination (CRM/email/webhook)
architecture specifically, see [INTEGRATIONS.md](INTEGRATIONS.md) — this file
covers UI/design; that one covers data and form-submission plumbing.

## Brand positioning (do not violate)

Revenue Craft Digital is a premium **performance marketing brand** — not a
freelancer, not a "digital marketing agency," not a solo marketer. Copy, UI
microcopy, and metadata should never use those terms. The tone is consultative,
data-driven, enterprise-grade — closer to how Stripe or Linear talk about their
own product than how a typical marketing vendor talks about services.

---

## 1. Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, Server Components, `next build` webpack) |
| UI runtime | React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` config, no `tailwind.config.ts`) |
| Component primitives | shadcn/ui on **Base UI** (`@base-ui/react`), not Radix |
| Motion | Framer Motion (declarative, scroll-triggered reveals) + GSAP/ScrollTrigger (timeline-driven effects) |
| Forms | React Hook Form + Zod (`@hookform/resolvers/zod`) |
| Icons | lucide-react |

Base UI components use a `render` prop for polymorphism (not Radix's `asChild`).
When rendering `Button` as a `<Link>`, always let the shared `Button` component
handle `nativeButton` — see [§5.2](#52-button).

---

## 2. Design tokens (`src/app/globals.css`)

All tokens are defined once, in Tailwind v4's `@theme` block, and become Tailwind
utilities automatically — e.g. `--color-brand-600` → `bg-brand-600` / `text-brand-600`,
`--text-display-lg` → `text-display-lg`, `--duration-slow` → `duration-slow`.
Never hardcode a hex/oklch value or a magic duration in a component — extend the
token set instead.

### 2.1 Color system

- **`brand-{50…950}`** — "Craft Indigo," the signature color. Reserved for CTAs,
  links, focus states, and chart accents. The interface itself stays neutral;
  brand color is for emphasis, not decoration.
- **`signal-{400,500,600}`** — growth/success green. Used sparingly: positive
  metrics, checkmarks, success states. Never as a primary UI color.
- **`warning-{500,600}`**, **`danger-500`** (aliases `destructive`) — status colors.
- **`ink-{0…950}`** — an independent neutral scale for marketing surfaces (e.g.
  the near-black `CtaSection` band) so dark sections can go true near-black
  without being coupled to the shadcn `background`/`foreground` semantic pair.
- shadcn semantic tokens (`background`, `foreground`, `card`, `popover`,
  `muted`, `accent`, `border`, `ring`, etc.) power every shadcn/ui primitive and
  automatically theme light/dark via the `.dark` class (see `ThemeProvider`,
  `attribute="class"`, `defaultTheme="system"`).

### 2.2 Typography

- Font: **Geist Sans** (`--font-sans`) for UI and body copy, **Geist Mono**
  (`--font-geist-mono`) reserved for numeric/data display (stat labels, metric
  values) to reinforce the "data-driven" brand personality.
- **Display scale** — `text-display-sm` → `text-display-2xl` — fluid, `clamp()`-based
  headline sizes with paired line-height/letter-spacing/font-weight tokens. Use
  these for hero and section headings; use Tailwind's default `text-*` scale for
  body copy.
- **Page H1 scale convention** (deliberate, not arbitrary): the homepage `Hero`
  is the one place that uses `text-display-2xl` — it's the single biggest, most
  important headline site-wide. Every inner content page's `<h1>` (`/about`,
  `/services/[slug]`, `/industries/[slug]`, `/case-studies/[slug]`) uses
  `text-display-xl` consistently. `not-found.tsx` uses the smaller
  `text-display-lg`, since a 404 is a lighter utility page, not a content page.
  Keep new pages on this same three-tier scale — don't introduce a fourth size
  for "just this one page."
- Utility classes `text-balance` / `text-pretty` are used on nearly every heading
  and paragraph — always pair long headlines with `text-balance` and supporting
  copy with `text-pretty`.

### 2.3 Spacing & layout

- Base spacing is Tailwind's default 4px scale — no custom spacing tokens were
  introduced; consistency comes from the `Container` and `Section` primitives
  (see §5), not ad-hoc padding.
- `--container-page` (1280px) and `--container-narrow` (768px) → `max-w-page` /
  `max-w-narrow`, consumed via the `<Container narrow>` prop.

### 2.4 Elevation

`shadow-xs` → `shadow-xl` are soft, low-opacity shadows (Stripe/Linear style).
`shadow-glow` is a brand-tinted glow reserved for primary CTA emphasis — use it
rarely.

### 2.5 Motion tokens

`duration-fast|base|slow|slower` (150/250/400/600ms) and
`ease-out-expo|out-quart|in-out-quart` are real Tailwind utilities *and* mirrored
as JS constants in `src/lib/animations.ts` so CSS transitions and Framer Motion
variants stay in sync. Every animated component must respect
`prefers-reduced-motion` — see §6.

`--animate-mesh-drift|mesh-drift-slow|float|ripple` are Tailwind v4
`--animate-*` theme keys with matching top-level `@keyframes` (Tailwind only
generates the utility class from `--animate-*`; the actual `@keyframes` block
must be declared separately at the CSS top level — see globals.css if adding
a new one).

### 2.6 Glassmorphism tokens

`--glass-bg`, `--glass-bg-strong`, `--glass-border`, `--glass-highlight`,
`--glass-blur` back the `.glass`/`.glass-strong` utility classes (and
`GlassPanel`/`GlassCard`). They're re-declared inside `.dark` with different
values — dark-mode glass is a light frost lifted off the dark surface, not
the same white-card translucency light mode uses. Don't reuse `--color-brand-*`
or `--color-ink-*` for glass surfaces; extend these tokens instead.

### 2.7 Gradient mesh tokens

`--color-mesh-1|2|3` back `GradientMesh` and any one-off decorative blobs
(`bg-mesh-1` etc. are real Tailwind utilities). Kept as a separate scale from
`--color-brand-*` so mesh opacity/hue can be tuned without touching brand
colors used in buttons/links/focus rings.

---

## 3. Folder architecture

```
src/
  app/
    (marketing)/            route group — public site, shares header/footer
      layout.tsx
      page.tsx               → "/"
      services/
        page.tsx             → "/services"
        [slug]/page.tsx       → "/services/:slug"
      industries/            → same listing + detail pattern
      case-studies/          → same listing + detail pattern
      insights/page.tsx      → "/insights" (blog stub, no CMS yet)
      about/page.tsx
      contact/page.tsx
    api/
      contact/route.ts       → POST handler, validates with the same Zod schema as the form
    layout.tsx               → root layout: fonts, ThemeProvider, JSON-LD, metadata defaults
    globals.css
    sitemap.ts / robots.ts / not-found.tsx
  components/
    ui/                      → shadcn/ui primitives (button, card, input, select, ...)
                                + glass-panel.tsx, glass-card.tsx, tilt-glass-card.tsx,
                                  content-icon.tsx, typography.tsx
    layout/                  → Container, Section, SiteHeader, SiteFooter, MobileNav,
                                ScrollProgress, BackToTop, ThemeToggle, LoadingScreen,
                                PageTransition, DeferredEffects
    marketing/               → Hero, ServiceCard, SectionHeading, ContentSection, CtaSection,
                                ProcessSteps, CaseStudyCard, GradientMesh, ...
    motion/                  → Reveal, StaggerGroup/StaggerItem, FloatingShape, CursorGlow,
                                NoiseOverlay, MagneticButton, TiltCard, AnimatedIcon, ParallaxLayer,
                                MouseFollower
    forms/                   → ContactForm, GrowthAuditForm (React Hook Form + Zod + shadcn Form)
    theme-provider.tsx
  config/                    → site.ts, services.ts, industries.ts, case-studies.ts,
                                testimonials.ts, faqs.ts, tech-stack.ts, why-choose-us.ts
                                (the *local* content provider's data source — see below)
  lib/
    cms/                     → ContentProvider abstraction — see INTEGRATIONS.md §1
    leads/                   → LeadDestination abstraction — see INTEGRATIONS.md §2
    icon-registry.ts          → string-key → LucideIcon map (content stays JSON-serializable)
    utils.ts                 → cn()
    animations.ts             → Framer Motion variants + duration/easing constants
    gsap.ts                   → registerGsap(), useGsapContext() for timeline-driven effects
    seo.ts                    → buildMetadata(), JSON-LD helpers (Organization, FAQPage)
    validations/              → Zod schemas (contact-form.ts, growth-audit-form.ts)
  hooks/                     → use-media-query.ts, use-mounted.ts
  types/                     → shared TS interfaces (Service, Industry, CaseStudy, Testimonial, FaqItem)
```

**config/ vs. content:** `config/*.ts` is the data source for the *local*
content provider (the default — see `src/lib/cms/providers/local.ts`), not a
hardcoded dead end. Pages never import these files directly for
services/industries/case-studies/testimonials/FAQs — they call
`getContentProvider().getServices()` etc. Swapping to Sanity/Contentful/
Strapi/WordPress is a `CMS_PROVIDER` env var change, not a rewrite. Full
details in [INTEGRATIONS.md](INTEGRATIONS.md).

---

## 4. Routing conventions

- The `(marketing)` route group holds every public page so they share
  `SiteHeader`/`SiteFooter` via one layout, without adding a URL segment.
- Listing + detail pairs (`services`, `industries`, `case-studies`) all follow
  the same pattern: a `page.tsx` listing grid, and a `[slug]/page.tsx` detail
  page using `generateStaticParams()` (fully static) and an async
  `generateMetadata()` that 404s gracefully (`notFound()`) for unknown slugs.
- `sitemap.ts` and `robots.ts` are generated from `getContentProvider()`, the
  same source every page renders from — adding a new service/industry/case
  study (or switching CMS providers) automatically extends the sitemap.

---

## 5. Reusable components & naming conventions

- **PascalCase** component names, **kebab-case** filenames
  (`section-heading.tsx` exports `SectionHeading`).
- One component per file; co-locate tightly-coupled sub-parts in the same file
  (e.g. `StaggerGroup`/`StaggerItem`) only when they're never used apart.
- Props interfaces are named `<ComponentName>Props` and declared directly above
  the component.

### 5.1 Layout primitives

- **`Container`** — the only place page gutters (`px-6 md:px-8 lg:px-12`) and
  max-width (`max-w-page` / `max-w-narrow`) are defined. Never hardcode gutters
  in a page.
- **`Section`** — the only place vertical rhythm (`py-*`) is defined, via a
  `spacing="sm" | "md" | "lg"` prop. Every page section should be a `<Section>`.

### 5.2 `Button`

`src/components/ui/button.tsx` wraps Base UI's `Button`. It infers
`nativeButton={false}` automatically whenever a `render` prop is passed (e.g.
`render={<Link href="/contact" />}`), because Base UI's button primitive
otherwise assumes its rendered root is a literal `<button>` and warns/breaks
ARIA semantics when it's actually an `<a>`. **Never override this manually** —
if a future variant needs `nativeButton={true}` while still using `render`,
pass it explicitly and you'll get the correct behavior either way.

**This auto-inference does NOT generalize to `SheetTrigger`/`SheetClose`**
(`src/components/ui/sheet.tsx`) — don't copy the pattern there. `Button`'s
heuristic works because *`Button` itself* controls what its own `render` prop
means (if given one, `Button` is always becoming something else). `Sheet`'s
primitives are different: their `render` target is a completely free choice
made by the *caller* — `SheetTrigger` in `MobileNav` renders a real `Button`
(so `nativeButton` should stay `true`), while `SheetClose` in the same file
renders a `<Link>` (so it needs `nativeButton={false}`). There's no safe
default to infer from the prop shape alone — pass `nativeButton` explicitly
at each `SheetClose`/`SheetTrigger` call site based on what you're actually
rendering. (This was tried as an auto-heuristic once and broke the trigger —
don't reintroduce it.)

### 5.3 Motion wrappers (`components/motion/`)

- **`Reveal`** — the default scroll-in animation for any single element/block.
  Wraps Framer Motion's `whileInView`, defaults to the `fadeUp` variant, and
  renders children statically (no animation) when
  `useReducedMotion()` is true.
- **`StaggerGroup` + `StaggerItem`** — for grids/lists where children should
  cascade in (service cards, industry tiles, testimonials). Same reduced-motion
  fallback.
- For anything more complex than an entrance animation (parallax, pinned
  sections, scrubbed timelines), use `useGsapContext` from `src/lib/gsap.ts`
  instead of forcing it through Framer Motion.

### 5.4 Marketing components (`components/marketing/`)

`Hero`, `SectionHeading`, `ServiceCard`, `ProcessSteps`, `TestimonialCard`,
`FaqAccordion`, `CtaSection`, `LogoWall`, `StatCounter`, `GradientMesh` — all
are presentational, take typed data (`Service`, `Testimonial`, etc. from
`@/types`) as props, and contain no page-specific logic. Compose pages from
these; don't build new one-off section markup inside a `page.tsx` if an
existing component already covers the pattern.

### 5.5 Typography primitives (`components/ui/typography.tsx`)

`Heading` (`as` + `size` props mapping to the `--text-display-*` scale),
`Eyebrow`, `Lead`, `Text`. Prefer these over hand-rolling
`className="text-display-lg text-balance"` on a raw `<h2>` — they exist so the
heading scale can change in one place. Existing pages that predate these
(most of them) use the equivalent raw classes directly; both are valid since
they resolve to the same tokens, but new sections should use the components.

### 5.6 Glassmorphism (`components/ui/glass-panel.tsx`, `glass-card.tsx`)

`GlassPanel` is the raw frosted surface (`.glass` in globals.css: translucent
fill + backdrop-blur + inset top highlight, themed separately for light/dark
via the `--glass-*` tokens). `GlassCard` composes it with Card's internal
spacing rhythm so you can still use `CardHeader`/`CardTitle`/`CardContent`
inside it. **Glass only reads as "glass" over a backdrop** — a gradient mesh,
photo, or colored section behind it. Don't use it on a flat neutral
background (see it in use on the `/contact` page's form panel, sitting over a
`<GradientMesh variant="subtle" />`).

### 5.7 Atmosphere & cursor effects (`components/motion/`)

- **`GradientMesh`** (`components/marketing/`) — decorative blurred-blob
  backdrop using the `--color-mesh-*` tokens and the `mesh-drift` keyframe
  animation. `variant="hero"` for full hero sections, `"subtle"` for smaller
  panels. Place as the first child of a `relative` container.
- **`FloatingShape`** — a single ambient floating blob/shape; you own its size,
  color, and position entirely via `className` (it only supplies the float
  motion). Use 2-3 per hero, not more — this is atmosphere, not confetti.
- **`CursorGlow`** — global soft radial glow that trails the pointer, mounted
  once in the root layout. Auto-disabled on touch devices and under
  `prefers-reduced-motion`.
- **`NoiseOverlay`** — fixed full-viewport film-grain texture (inline SVG
  turbulence, no image request), mounted once in the root layout at very low
  opacity with `mix-blend-mode: overlay`. This is texture, not decoration —
  if you can consciously see it, the opacity is too high.

### 5.8 Interactive motion wrappers

- **`MagneticButton`** — wraps one CTA and gently pulls it toward the cursor
  within its own bounds. One or two per page max, on the highest-intent CTA
  only (see `Hero` and `CtaSection`).
- **`TiltCard`** — wraps a card with a cursor-following 3D tilt + glare. Baked
  directly into `ServiceCard` so every usage gets it consistently; pass a
  matching `rounded-*` class so the glare mask lines up with the card's own
  radius.
- **`AnimatedIcon`** — wraps an **already-rendered** icon element (not a
  component reference — see the callout below) with a hover spring
  (`effect="rotate" | "scale" | "bounce"`).
- **Button ripple** — opt-in via `<Button ripple>`. Implemented inside the
  shared `Button` component (pointer-position-tracked absolutely-positioned
  spans, `animate-ripple` keyframe). Use tastefully on primary CTAs only —
  Stripe/Linear-style premium UI does not ripple every button.

> **RSC boundary gotcha:** `AnimatedIcon` takes `children`, not an `icon: LucideIcon`
> prop. Passing a bare icon *component reference* from a Server Component into
> a Client Component prop fails to serialize ("Functions cannot be passed
> directly to Client Components..."). Render the icon yourself
> (`<AnimatedIcon><Icon className="size-5" /></AnimatedIcon>`) so only a
> React element — which RSC can serialize — crosses the boundary.

### 5.9 Composite shells — the anti-duplication layer

Two components exist purely to stop the same ~15-line block being retyped
on every page. If you're about to hand-roll a `Section` + `GradientMesh` +
heading + closing-CTA block, or a `TiltCard` wrapping a `GlassCard`, reach
for these instead:

- **`ContentSection`** (`components/marketing/content-section.tsx`) — the
  "Section + GradientMesh backdrop + SectionHeading + content + closing CTA"
  shell used by nearly every marketing section (see the homepage's
  `page.tsx`, now ~120 lines instead of ~195 after this was extracted).
  Props: `eyebrow`/`title`/`description`, `muted` (alternates section
  background for visual rhythm down a long page), `cta` (`{label, href,
  variant}`). Sections with a genuinely different layout — `Hero`,
  `CtaSection`, `ContactSection` — stay hand-built; don't force them into
  this shell just for consistency's sake.
- **`TiltGlassCard`** (`components/ui/tilt-glass-card.tsx`) — the
  "`TiltCard` wrapping a `GlassCard`" pattern used by `TestimonialCard`,
  `ProcessSteps`, `CaseStudyCard`, the industries grid, and `TechStack`.
  Pass `href` to make the whole card a clickable link (`TiltCard` > `Link` >
  `GlassCard`); omit it for static content cards (testimonials, metrics).
  `ServiceCard` is the one deliberate exception — it applies the `.glass`
  utility class directly to a `<Link>` instead of using `GlassCard`, so the
  anchor stays the single clickable+semantic element rather than nesting a
  div surface inside it.
- **`CaseStudyCard`** (`components/marketing/case-study-card.tsx`) — the
  actual card body (industry tag, headline, summary, metrics grid) shared
  between the homepage preview and the `/case-studies` listing page. If a
  third case-study grid appears anywhere, it should render this, not
  reimplement the markup.

### 5.10 Content-driven icons (`components/ui/content-icon.tsx`)

`Service.icon`/`Industry.icon`/`TechStackItem.icon` are **strings** (keys
into `src/lib/icon-registry.ts`), not `LucideIcon` component references —
see [INTEGRATIONS.md §1](INTEGRATIONS.md#1-content-backend-srclibcms) for
why. Render them with `<ContentIcon name={service.icon} className="size-5" />`,
never `const Icon = resolveIcon(name); <Icon />` directly in a page/component
— that second pattern trips the `react-hooks/static-components` lint rule
(a false positive here, since `resolveIcon` always returns the same stable
reference for a given name, but the fix is still the right one to reuse
rather than re-litigate per call site).

### 5.11 Navigation & page chrome (`components/layout/`)

- **`ScrollProgress`** — thin brand-gradient bar pinned to the viewport top,
  tracks scroll position via `useScroll`/`useSpring`. Mounted once, root layout.
- **`BackToTop`** — appears after scrolling past one viewport height; mounted
  in the `(marketing)` layout (not root, since it's a public-page-only affordance).
- **`ThemeToggle`** — light/dark cycle via `next-themes`. Uses the shared
  `useMounted()` hook (`src/hooks/use-mounted.ts`, `useSyncExternalStore`-based)
  to avoid a server/client mismatch — **don't** reintroduce the classic
  `useState(false)` + `useEffect(() => setMounted(true))` pattern; this
  project's lint config (`react-hooks/set-state-in-effect`) rejects it.
- **`LoadingScreen`** — brief branded splash on initial load only; mounted in
  the root layout so it never remounts on client-side navigation.
- **`PageTransition`** — fades/slides route content in on navigation change,
  keyed on `usePathname()`. Wraps `{children}` inside the `(marketing)` layout,
  *outside* of `SiteHeader`/`SiteFooter` so chrome never re-animates.

---

## 6. Accessibility & motion baseline

- `globals.css` sets a global `prefers-reduced-motion: reduce` override that
  collapses all CSS animation/transition durations to near-zero.
- `Reveal` and `StaggerGroup` additionally check `useReducedMotion()` from
  Framer Motion and skip the animated code path entirely (not just shortening
  duration), so screen readers/reduced-motion users get static, immediately
  visible content.
- Every icon-only interactive element must have an accessible label
  (`aria-label`, e.g. `MobileNav`'s menu trigger) or `aria-hidden="true"` if
  purely decorative next to visible text.
- Form fields use the shadcn `Form`/`FormField`/`FormLabel`/`FormMessage`
  pattern (`src/components/ui/form.tsx`), which wires `aria-describedby` and
  `aria-invalid` automatically from Zod validation state — don't bypass it by
  wiring `Input`/`Select` directly to `register()`.

## 7. SEO baseline

- `src/lib/seo.ts` → `buildMetadata()` is the only way page-level `Metadata` is
  constructed; it fills in canonical URL, Open Graph, and Twitter card defaults
  from `siteConfig`. Every route's `page.tsx` should export
  `export const metadata = buildMetadata({...})` (or `generateMetadata` for
  dynamic routes).
- `organizationJsonLd()` is injected once in the root layout; `faqPageJsonLd()`
  is injected on the homepage FAQ section, generated from the exact same
  `FaqItem[]` the visible `FaqAccordion` renders — never let the schema and
  the visible copy drift apart by hand-writing one separately.
- `sitemap.ts` / `robots.ts` are generated, not static files, and read through
  `getContentProvider()` — keep them that way so new services/industries/case
  studies (or a CMS switch) are picked up automatically.
- `opengraph-image.tsx` / `icon.tsx` / `apple-icon.tsx` (app root) generate
  the OG card and favicon dynamically via `next/og`'s `ImageResponse` — don't
  add a static image file for these; don't set `openGraph.images` in
  `buildMetadata()` unless a specific page genuinely needs a bespoke image
  (doing so opts that page out of the generated default).

---

## 8. What's intentionally out of scope for this phase

- No CMS/MDX wiring for `/insights` — it's a placeholder page (the content
  *provider* architecture exists — see INTEGRATIONS.md — there's just no blog
  content model built on top of it yet).
- No real client logos (`LogoWall` uses text placeholders — swap for SVG marks
  under `public/logos/` when available).
- No dark-mode toggle *UI polish beyond the header icon* — `ThemeToggle` exists
  and works, but there's no theme preference beyond light/dark/system.
- Lead destinations (Zoho, HubSpot, Google Sheets, Resend, EmailJS, generic
  webhook) are real, working implementations, but all inert until you set
  their env vars — see [INTEGRATIONS.md §2](INTEGRATIONS.md#2-lead-destinations-srclibleads).
  Nothing is forwarded anywhere until at least one is configured.
