"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { PlantCard } from "@/lib/plants";
import type { PlantKind } from "@/data/types";

const KIND_LABEL: Record<PlantKind, string> = {
  tree: "Trees",
  conifer: "Conifers",
  shrub: "Shrubs",
  fruit: "Fruits",
  vegetable: "Vegetables",
  herb: "Herbs",
  flower: "Flowers",
  fern: "Ferns",
  palm: "Palms",
  succulent: "Succulents",
  grass: "Grasses",
  climber: "Climbers",
  aquatic: "Aquatic",
  houseplant: "Houseplants",
};

const PAGE = 48;

export default function Garden({ cards }: { cards: PlantCard[] }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<PlantKind | "all">("all");
  const [shown, setShown] = useState(PAGE);

  const kinds = useMemo(() => {
    const set = new Set(cards.map((c) => c.kind));
    return (Object.keys(KIND_LABEL) as PlantKind[]).filter((k) => set.has(k));
  }, [cards]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cards.filter((c) => {
      if (kind !== "all" && c.kind !== kind) return false;
      if (!q) return true;
      return c.commonName.toLowerCase().includes(q) || c.scientificName.toLowerCase().includes(q);
    });
  }, [cards, query, kind]);

  const visible = filtered.slice(0, shown);

  return (
    <section className="mt-12">
      <div className="flex flex-col gap-4">
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShown(PAGE);
          }}
          placeholder={`Search ${cards.length} species by name…`}
          className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
        />
        <div className="flex flex-wrap gap-2">
          <Chip active={kind === "all"} onClick={() => { setKind("all"); setShown(PAGE); }}>
            All
          </Chip>
          {kinds.map((k) => (
            <Chip key={k} active={kind === k} onClick={() => { setKind(k); setShown(PAGE); }}>
              {KIND_LABEL[k]}
            </Chip>
          ))}
        </div>
      </div>

      <p className="mt-5 text-xs text-white/40">
        {filtered.length} {filtered.length === 1 ? "species" : "species"}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((c) => (
          <Card key={c.slug} card={c} />
        ))}
      </div>

      {shown < filtered.length && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShown((s) => s + PAGE)}
            className="rounded-full border border-white/15 px-6 py-3 text-sm text-white/70 transition hover:text-white"
          >
            Load more
          </button>
        </div>
      )}
    </section>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs transition ${
        active
          ? "border-white/60 bg-white text-black"
          : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function Card({ card }: { card: PlantCard }) {
  const pro = card.rarity === "rare" || card.rarity === "endangered";
  return (
    <Link
      href={`/plant/${card.slug}`}
      className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10"
    >
      {card.image ? (
        <Image
          src={card.image}
          alt={card.commonName}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover brightness-[0.72] transition duration-500 group-hover:scale-105 group-hover:brightness-90"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3">
        {pro && (
          <span className="rounded-full border border-white/20 bg-black/40 px-2 py-0.5 text-[8px] uppercase tracking-widest text-white/70 backdrop-blur">
            {card.rarity} · Pro
          </span>
        )}
        <h3 className="mt-1 font-serif text-base leading-tight text-white">{card.commonName}</h3>
        <p className="font-serif text-xs italic text-white/50">{card.scientificName}</p>
      </div>
    </Link>
  );
}
