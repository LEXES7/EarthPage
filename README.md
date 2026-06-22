# EarthPages

A reference for trees and plants, presented as a book. Each species opens as a two-page spread —
a cinematic portrait beside its field notes and leaves. Open a leaf to explore its anatomy: the
venation skeleton and a layered cross-section. Common species are free; rare and endangered
species unlock with Pro.

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

The app runs without a backend — auth-gated features simply stay locked until
Supabase is configured.

## Auth & Pro (Supabase)

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local` and fill in `NEXT_PUBLIC_SUPABASE_URL`
   and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project Settings → API).
3. Run `supabase/migrations/0001_init.sql` in the SQL editor — it creates the
   `profiles` table, its RLS policies, and the signup trigger.
4. Add `http://localhost:3000/auth/callback` to the project's redirect URLs.
5. Optional: set `NEXT_PUBLIC_ENABLE_DEMO_PRO=true` to toggle Pro from the
   account page without payment (off in production; replaced by Stripe).

Sign-in is passwordless (magic link). Pro access is resolved server-side from
`profiles.tier`; rare/endangered species and Pro-only facts are gated on the
server, so locked content is never sent to the browser.

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

The reading experience is complete: garden, multi-page species books, rarity-based Pro locks,
edibility pages, and the leaf anatomy view. Supabase auth and server-side Pro gating are in place;
payments are next.
