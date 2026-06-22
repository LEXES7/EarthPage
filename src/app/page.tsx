import Image from "next/image";
import Link from "next/link";
import { getAllPlants } from "@/lib/plants";
import { plantTier } from "@/data/types";

export default async function Home() {
  const plants = await getAllPlants();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-white/40">EarthPages</p>
        <h1 className="mx-auto mt-4 max-w-3xl bg-gradient-to-b from-white to-white/60 bg-clip-text font-serif text-4xl leading-tight text-transparent sm:text-6xl">
          A living book of trees &amp; plants
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-white/60">
          Each species opens like a page. Study its portrait, turn to the field notes, and open a
          leaf to explore its anatomy. Rare species unlock with Pro.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href={`/plant/${plants[0]?.slug ?? ""}`}
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Open the book
          </Link>
          <span className="rounded-full border border-white/15 px-6 py-3 text-sm text-white/50">
            Pro · coming soon
          </span>
        </div>
      </header>

      <section className="mt-20">
        <h2 className="text-sm uppercase tracking-[0.3em] text-white/40">The garden</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plants.map((plant) => {
            const pro = plantTier(plant) === "pro";
            return (
              <Link
                key={plant.slug}
                href={`/plant/${plant.slug}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10"
              >
                <Image
                  src={plant.image}
                  alt={plant.commonName}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover brightness-[0.78] transition duration-700 group-hover:scale-105 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                <div
                  className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-60"
                  style={{ background: `linear-gradient(180deg, transparent 50%, ${plant.foliage})` }}
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[9px] uppercase tracking-widest text-white/70 backdrop-blur">
                    {pro ? `${plant.rarity} · Pro` : plant.rarity}
                  </span>
                  <h3 className="mt-2 font-serif text-xl text-white">{plant.commonName}</h3>
                  <p className="font-serif text-sm italic text-white/55">{plant.scientificName}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className="mt-24 border-t border-white/10 pt-8 text-center text-xs text-white/30">
        EarthPages · imagery via Wikimedia Commons, credited on each page
      </footer>
    </main>
  );
}
