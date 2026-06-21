# EarthPages — Architecture

An interactive reference for trees and plants. Each page is laid out from the organism's own
structure: trunk, branches, and leaves. Leaves carry individual facts and glow on staggered
cycles. A free tier covers a curated set of species; a Pro tier unlocks the full database.

This document records the design decisions and the reasoning behind them.

## 1. Product requirements

1. Page layout is generated from a botanical structure (trunk → branches → leaves). Each leaf is
   a focusable, indexable DOM node carrying one fact.
2. Leaves and branches animate between glow and dim states on independent cycles.
3. Free tier covers curated species; Pro unlocks the full database, deeper fields, and search.
   Access is enforced at the data layer, not only in the UI.
4. The data model and routing leave room for a later "book/diary" mode (chapters, bookmarks,
   reading progress) without a rewrite.

## 2. Stack

| Concern | Choice | Reasoning |
|---|---|---|
| Framework | Next.js 16, App Router, RSC | SSR/ISR for SEO on an information site; Server Components keep client JS small. A pure SPA would weaken SEO; Astro is strong for content but less suited to the auth/Pro flows. |
| Language | TypeScript (strict) | The `Plant` model drives the entire render pipeline. |
| Styling | Tailwind v4 | Utility-first, minimal unused CSS. |
| Animation | CSS keyframes; GSAP only where JS is required | The glow effect is GPU-composited CSS, with no main-thread cost, and honours `prefers-reduced-motion`. |
| Visualization | SVG branches + DOM leaves | Leaf text must be selectable, accessible, and indexable. WebGL makes readable text and accessibility harder, so it is reserved for optional decorative accents. |
| Auth + DB | Supabase (Postgres, Auth, RLS, Storage) | Single service for users, data, and storage. Row-Level Security enforces tier access in the database. |
| Payments | Stripe (Checkout + webhook → `profiles.tier`) | Deferred to Phase 3. |
| Hosting | Vercel + Supabase cloud | Matches the framework; preview deploys per PR. |

## 3. System overview

```
            ┌──────────────────────────────────────────────┐
   Browser  │  Next.js (Vercel)                             │
  ────────► │  ┌────────────┐   ┌──────────────────────┐    │
            │  │ RSC pages  │   │ Route Handlers / API │    │
            │  │ (SSR/ISR)  │   │  /api/search, /stripe│    │
            │  └─────┬──────┘   └──────────┬───────────┘    │
            │        │ data layer          │                │
            │        ▼ (src/data, src/lib) ▼                │
            └────────┼─────────────────────┼────────────────┘
                     │                      │
            ┌────────▼──────────┐   ┌───────▼────────┐
            │ Static content    │   │   Supabase     │
            │ (free species)    │   │  Postgres+RLS  │
            └───────────────────┘   └────────────────┘
```

Free species can ship as build-time content; Pro species, search, and user data live in Supabase
behind RLS. A single `getPlant(slug, user)` function hides the source from the UI.

## 4. Data model

```ts
type Tier = "free" | "pro";

interface Plant {
  slug: string;
  commonName: string;
  scientificName: string;
  tier: Tier;
  taxonomy: { family: string; genus: string; species: string };
  structure: TreeStructure;
  summary: string;
}

interface TreeStructure {
  trunk: Branch;
}

interface Branch {
  id: string;
  angle: number;   // degrees from parent
  length: number;  // relative to canvas
  children: Branch[];
  leaves: Leaf[];
}

interface Leaf {
  id: string;
  field: string;
  value: string;
  tier: Tier;
}
```

Branches represent topics and leaves represent facts, so the structure that renders the figure
also organizes the content.

## 5. Security

- RLS is the access boundary. Anon/free users may select rows where `tier = 'free'`; Pro reads
  require `profiles.tier = 'pro'`. A leaked anon key cannot read Pro data.
- The service-role key is server-only and used only in Route Handlers.
- Stripe webhooks are the only writer of `profiles.tier`; the client cannot self-upgrade.
- UI gating handles UX; RLS handles enforcement; signed webhooks handle trust.
- Security headers (CSP, HSTS) and Zod validation on every Route Handler.

## 6. Performance

- RSC by default; client JS only for interactive islands (leaf interaction, search).
- Glow runs as CSS keyframes on the compositor thread.
- `prefers-reduced-motion` disables animation.
- ISR for free species; HTTP caching for Pro reads.
- Targets: LCP < 1.5s, CLS ~0, near-zero TBT on a plant page.

## 7. Layout

```
src/
  app/
    page.tsx                 # landing grid of species
    plant/[slug]/page.tsx    # single plant rendered from its structure
    api/                     # route handlers (search, stripe) — later
  components/
    tree/PlantTree.tsx       # SVG branches + DOM leaves + glow
    tree/layout.ts           # structure → geometry
  data/
    plants.ts                # sample species
    types.ts                 # data model
  lib/
    plants.ts                # data-layer seam (content ⇄ Supabase)
```

## 8. Roadmap

- Phase 1 (current): data model, data-layer seam, sample species rendered as glowing trees,
  landing grid. No backend.
- Phase 2: Supabase schema and RLS, magic-link auth, species migrated to the database, full-text
  search.
- Phase 3: Stripe Pro upgrade, Pro-only fields and species, bookmarks.
- Phase 4: book/diary mode, reading progress, shareable cards, optional WebGL hero.
