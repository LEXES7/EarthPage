import Link from "next/link";
import { getCatalogCards } from "@/lib/plants";
import Garden from "@/components/Garden";

export default async function Home() {
  const cards = await getCatalogCards();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-white/40">EarthPages</p>
        <h1 className="mx-auto mt-4 max-w-3xl bg-gradient-to-b from-white to-white/60 bg-clip-text font-serif text-4xl leading-tight text-transparent sm:text-6xl">
          A living library of trees &amp; plants
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-white/60">
          {cards.length} species and growing. Each opens as a book — portrait, field notes,
          edibility, and leaf anatomy. Rare species unlock with Pro.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/plant/english-oak"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Open a book
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-white/15 px-6 py-3 text-sm text-white/70 transition hover:text-white"
          >
            Sign in
          </Link>
        </div>
      </header>

      <Garden cards={cards} />

      <footer className="mt-24 border-t border-white/10 pt-8 text-center text-xs text-white/30">
        EarthPages · imagery and summaries via Wikipedia, credited on each page
      </footer>
    </main>
  );
}
