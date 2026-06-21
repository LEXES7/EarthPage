# EarthPages

An interactive reference for trees and plants. Each page is laid out from the organism's own
structure — trunk, branches, and leaves — and every leaf carries a fact. A free tier covers a
curated set of species; a Pro tier will unlock the full database.

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
src/
  app/
    page.tsx                 landing grid of species
    plant/[slug]/page.tsx    single plant rendered from its structure
  components/tree/           SVG branches, DOM leaves, glow
  data/                      data model and sample species
  lib/                       data-layer seam (static content now, Supabase later)
```

## Status

Phase 1: data model, sample species, and the rendering experience. No backend yet.
Roadmap in [ARCHITECTURE.md](./ARCHITECTURE.md#8-roadmap).
