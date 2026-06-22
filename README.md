# EarthPages

A reference for trees and plants, presented as a book. Each species opens as a two-page spread —
a cinematic portrait beside its field notes and leaves. Open a leaf to explore its anatomy: the
venation skeleton and a layered cross-section. Common species are free; rare and endangered
species unlock with Pro.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the design and reasoning.

## Stack

- Next.js 16 (App Router, React Server Components)
- TypeScript
- Tailwind CSS v4
- Supabase for auth, Postgres, and Row-Level Security (Phase 2)

## Development

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm lint
```

## Structure

```
public/plants/             licensed species portraits (<slug>.jpg)
src/
  app/
    page.tsx                 the garden — image grid of species
    plant/[slug]/page.tsx    the book spread for one species
  components/
    PlantBook.tsx            two-page spread + leaf cards
    leaf/                    anatomy popup + leaf shapes
  data/                      data model and species
  lib/                       data-layer seam (static now, Supabase later)
```

## Imagery

Species photos are from Wikimedia Commons under Creative Commons licences; each is credited on its
page (author + licence, linking to the source).

## Status

The reading experience is complete: garden, book spreads, rarity-based Pro locks, and the leaf
anatomy view. Backend (auth, database, payments) is next — see
[ARCHITECTURE.md](./ARCHITECTURE.md#8-roadmap).
