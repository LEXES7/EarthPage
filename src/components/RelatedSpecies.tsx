import Image from "next/image";
import Link from "next/link";
import type { PlantCard } from "@/lib/plants";
import type { PlantKind } from "@/data/types";

const KIND_NOUN: Record<PlantKind, string> = {
  tree: "trees",
  conifer: "conifers",
  shrub: "shrubs",
  fruit: "fruits",
  vegetable: "vegetables",
  herb: "herbs",
  flower: "flowers",
  fern: "ferns",
  palm: "palms",
  succulent: "succulents",
  grass: "grasses",
  climber: "climbers",
  aquatic: "aquatic plants",
  houseplant: "houseplants",
};

export default function RelatedSpecies({ cards, kind }: { cards: PlantCard[]; kind: PlantKind }) {
  if (cards.length === 0) return null;

  return (
    <section className="mt-16 border-t border-white/10 pt-10">
      <h2 className="font-serif text-lg text-white/80">More {KIND_NOUN[kind]}</h2>
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {cards.map((c) => {
          const pro = c.rarity === "rare" || c.rarity === "endangered";
          return (
            <Link
              key={c.slug}
              href={`/plant/${c.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10"
            >
              <Image
                src={c.image}
                alt={c.commonName}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover brightness-[0.7] transition duration-500 group-hover:scale-105 group-hover:brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-2.5">
                {pro && (
                  <span className="rounded-full border border-white/20 bg-black/40 px-1.5 py-0.5 text-[7px] uppercase tracking-widest text-white/70 backdrop-blur">
                    Pro
                  </span>
                )}
                <h3 className="mt-1 font-serif text-xs leading-tight text-white">{c.commonName}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
