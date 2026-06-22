# EarthPages — Architecture

An interactive reference for trees and plants, presented as a book. Each species opens as a
two-page spread: a cinematic portrait on one side, field notes and its leaves on the other.
Opening a leaf reveals its anatomy — venation skeleton and a layered cross-section. A free tier
covers common species; rare and endangered species unlock with Pro.

This document records the design decisions and the reasoning behind them.

## 1. Product requirements

1. Each species is a book spread: real licensed portrait, field notes (summary, taxonomy), and
   its facts presented as leaf cards.
2. Opening a leaf transitions to an anatomy view — drawn venation skeleton plus a cross-section
   of the tissue layers, revealed sequentially.
3. Rarity drives access: common/uncommon are free; rare/endangered are Pro. Enforced at the data
   layer, not only in the UI.
4. Imagery is real and properly attributed (Wikimedia Commons), unified by a consistent cinematic
   treatment so species stay distinct yet cohesive.
5. The data model leaves room for a later expanded "diary" mode (chapters, bookmarks, reading
   progress) without a rewrite.

## 2. Stack

| Concern | Choice | Reasoning |
|---|---|---|
| Framework | Next.js 16, App Router, RSC | SSR/ISR for SEO on an information site; Server Components keep client JS small. A pure SPA would weaken SEO; Astro is strong for content but less suited to the auth/Pro flows. |
| Language | TypeScript (strict) | The `Plant` model drives the entire render pipeline. |
| Styling | Tailwind v4 | Utility-first, minimal unused CSS. |
| Type | Fraunces (serif) for display, Geist for body | The serif gives the editorial, book-like reading feel. |
| Animation | CSS keyframes | Glow, draw-on veins, sequential layer reveals, and the popup transition are GPU-composited CSS; no main-thread cost, honours `prefers-reduced-motion`. |
| Imagery | Real photos (Wikimedia Commons, CC) + cinematic CSS treatment | Real photos read as authentic, not artificial. A shared duotone/glow/vignette treatment keeps a cohesive house style and attribution is tracked per image. |
| Leaf anatomy | Hand-drawn SVG (venation + cross-section) | A clean diagram is clearer than a micrograph, scales crisply, and is tinted per species. |
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
type Rarity = "common" | "uncommon" | "rare" | "endangered";

interface Plant {
  slug: string;
  commonName: string;
  scientificName: string;
  rarity: Rarity;          // drives Pro gating via plantTier()
  accent: string;          // species hue for the cinematic treatment + anatomy
  foliage: string;
  leafStyle: LeafStyle;    // shape used by the anatomy skeleton
  image: string;           // /public/plants/<slug>.jpg
  credit: ImageCredit;     // author, license, source URL
  taxonomy: { family: string; genus: string; species: string };
  summary: string;
  structure: TreeStructure; // holds the leaves (facts)
}

interface Leaf {
  id: string;
  field: string;
  value: string;
  tier: Tier;              // a single leaf can be Pro-only
}
```

`plantTier()` derives access from rarity (rare/endangered → Pro). `allLeaves()` flattens the
structure into the facts shown as leaf cards.

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
public/plants/             # licensed species portraits, <slug>.jpg
src/
  app/
    page.tsx                 # the garden — image grid of species
    plant/[slug]/page.tsx    # the book spread for one species
    api/                     # route handlers (search, stripe) — later
  components/
    PlantBook.tsx            # two-page spread + leaf cards
    leaf/LeafAnatomy.tsx     # anatomy popup (skeleton + cross-section)
    leaf/shapes.ts           # leaf outlines per leafStyle
  data/
    plants.ts                # species data
    types.ts                 # data model + plantTier()/allLeaves()
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
