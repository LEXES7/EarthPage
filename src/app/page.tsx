import Link from "next/link";
import { getAllPlants } from "@/lib/plants";
import PlantTree from "@/components/tree/PlantTree";

export default async function Home() {
  const plants = await getAllPlants();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      {/* Hero */}
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-white/40">EarthPages</p>
        <h1 className="mx-auto mt-4 max-w-3xl bg-gradient-to-b from-white to-white/60 bg-clip-text text-4xl font-semibold leading-tight text-transparent sm:text-6xl">
          A living encyclopedia where every page is shaped like the plant itself
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-white/60">
          Branches and leaves glow and dim like stars. Hover a leaf to read its fact. Unlock
          the full database — thousands of species — with Pro.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href={`/plant/${plants[0]?.slug ?? ""}`}
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Enter the garden
          </Link>
          <span className="rounded-full border border-white/15 px-6 py-3 text-sm text-white/50">
            Pro · coming soon
          </span>
        </div>
      </header>

      {/* The grove */}
      <section className="mt-24">
        <h2 className="text-sm uppercase tracking-[0.3em] text-white/40">The grove</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {plants.map((plant) => (
            <Link
              key={plant.slug}
              href={`/plant/${plant.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/25"
            >
              <div className="flex items-baseline justify-between">
                <div>
                  <h3 className="text-xl font-medium">{plant.commonName}</h3>
                  <p className="text-sm italic text-white/40">{plant.scientificName}</p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-white/50">
                  {plant.tier}
                </span>
              </div>
              <div className="pointer-events-none mt-4 opacity-90 transition group-hover:opacity-100">
                <PlantTree plant={plant} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="mt-24 border-t border-white/10 pt-8 text-center text-xs text-white/30">
        EarthPages · built as a study in architecture, design &amp; performance
      </footer>
    </main>
  );
}
