"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import type { Edibility, EdiblePart, Leaf, Plant } from "@/data/types";
import { allLeaves, plantTier } from "@/data/types";
import FlipBook from "@/components/book/FlipBook";
import LeafAnatomy from "@/components/leaf/LeafAnatomy";

const LEAF_ICON = "M 0 1 C 0.62 0.5 0.62 -0.5 0 -1.2 C -0.62 -0.5 -0.62 0.5 0 1 Z";

export default function PlantBook({ plant, isPro = false }: { plant: Plant; isPro?: boolean }) {
  const leaves = allLeaves(plant);
  const [open, setOpen] = useState<Leaf | null>(null);
  const proPlant = plantTier(plant) === "pro";
  const isLocked = (leaf: Leaf) => (leaf.tier === "pro" || proPlant) && !isPro;

  const pages: ReactNode[] = [
    <Cover key="cover" plant={plant} proPlant={proPlant} />,
    <Overview key="overview" plant={plant} />,
    <Classification key="class" plant={plant} />,
    <EdibilityPage key="edible" plant={plant} />,
    <Leaves key="leaves" plant={plant} leaves={leaves} isLocked={isLocked} onOpen={setOpen} />,
    <Credits key="credits" plant={plant} />,
  ];

  return (
    <div style={{ ["--accent" as string]: plant.accent }}>
      <FlipBook pages={pages} />
      {open && (
        <LeafAnatomy plant={plant} leaf={open} locked={isLocked(open)} onClose={() => setOpen(null)} />
      )}
    </div>
  );
}

function Page({
  label,
  n,
  children,
  side = "right",
}: {
  label: string;
  n: string;
  children: ReactNode;
  side?: "left" | "right";
}) {
  return (
    <div className={`book-page ${side === "left" ? "book-page-left" : "book-page-right"}`}>
      <div className="flex items-baseline justify-between">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">{label}</p>
        <p className="font-serif text-xs text-white/30">{n}</p>
      </div>
      <div className="mt-4 flex-1 overflow-y-auto pr-1">{children}</div>
    </div>
  );
}

function Cover({ plant, proPlant }: { plant: Plant; proPlant: boolean }) {
  return (
    <div className="book-page relative overflow-hidden p-0">
      <Image
        src={plant.image}
        alt={`${plant.commonName} (${plant.scientificName})`}
        fill
        priority
        sizes="(max-width: 920px) 100vw, 460px"
        className="object-cover brightness-[0.8] contrast-[1.06] saturate-[1.1]"
      />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-70"
        style={{ background: `linear-gradient(180deg, ${plant.accent}22, transparent 40%, ${plant.foliage}66)` }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/30" />
      <div className="absolute inset-x-0 bottom-0 p-7">
        <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-widest text-white/70 backdrop-blur">
          {proPlant ? `🔒 ${plant.rarity} · Pro` : plant.rarity}
        </span>
        <h1 className="mt-3 font-serif text-3xl leading-tight text-white sm:text-4xl">
          {plant.commonName}
        </h1>
        <p className="font-serif italic text-white/60">{plant.scientificName}</p>
      </div>
      <p className="absolute right-4 top-4 text-[9px] uppercase tracking-[0.3em] text-white/40">
        EarthPages
      </p>
    </div>
  );
}

function Overview({ plant }: { plant: Plant }) {
  return (
    <Page label="Overview" n="01" side="left">
      <h2 className="font-serif text-2xl text-white">{plant.commonName}</h2>
      <p className="font-serif italic text-sm text-white/45">{plant.scientificName}</p>
      <p className="mt-5 font-serif text-[15px] leading-relaxed text-white/80">{plant.summary}</p>
      <p className="mt-5 text-sm leading-relaxed text-white/50">
        Turn the page for its classification and habitat, whether it is safe to eat, and a closer
        look at its leaves.
      </p>
    </Page>
  );
}

function Classification({ plant }: { plant: Plant }) {
  return (
    <Page label="Classification & habitat" n="02">
      <dl className="space-y-2 text-sm">
        <Row label="Family" value={plant.taxonomy.family} />
        <Row label="Genus" value={plant.taxonomy.genus} />
        <Row label="Species" value={plant.taxonomy.species} />
        <Row label="Rarity" value={cap(plant.rarity)} />
      </dl>
      <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-white/40">From the field notes</p>
      <ul className="mt-3 space-y-2 text-sm text-white/70">
        {allLeaves(plant)
          .slice(0, 4)
          .map((l) => (
            <li key={l.id} className="border-b border-white/5 pb-2">
              <span className="text-white/40">{l.field}: </span>
              {l.value}
            </li>
          ))}
      </ul>
    </Page>
  );
}

const STATUS: Record<Edibility, { label: string; color: string; note: string }> = {
  edible: { label: "Edible", color: "#7CFFB2", note: "Generally safe to eat when prepared properly." },
  caution: { label: "Eat with caution", color: "#ffd27a", note: "Edible only when prepared correctly — some parts are not." },
  toxic: { label: "Poisonous", color: "#ff8a8a", note: "Best treated as toxic. Do not eat." },
  inedible: { label: "Not for eating", color: "#9fb0c4", note: "Not a food plant." },
};

function EdibilityPage({ plant }: { plant: Plant }) {
  const s = STATUS[plant.edibility.status];
  return (
    <Page label="Edibility & toxicity" n="03" side="left">
      <div
        className="flex items-center gap-3 rounded-2xl border p-4"
        style={{ borderColor: `${s.color}55`, background: `${s.color}12` }}
      >
        <span className="text-2xl">{icon(plant.edibility.status)}</span>
        <div>
          <p className="font-serif text-lg" style={{ color: s.color }}>
            {s.label}
          </p>
          <p className="text-xs text-white/55">{s.note}</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-white/75">{plant.edibility.summary}</p>

      <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-white/40">By part</p>
      <ul className="mt-3 space-y-2">
        {plant.edibility.parts.map((p) => (
          <PartRow key={p.part} part={p} />
        ))}
      </ul>

      <p className="mt-5 text-[11px] leading-relaxed text-white/35">
        Identification can be hard and look-alikes exist. Never eat a wild plant based on this page
        alone.
      </p>
    </Page>
  );
}

function PartRow({ part }: { part: EdiblePart }) {
  const map = {
    yes: { c: "#7CFFB2", t: "Safe" },
    caution: { c: "#ffd27a", t: "Caution" },
    no: { c: "#ff8a8a", t: "Avoid" },
  } as const;
  const m = map[part.safe];
  return (
    <li className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
      <span
        className="mt-0.5 h-fit rounded-full px-2 py-0.5 text-[10px] font-semibold"
        style={{ background: `${m.c}22`, color: m.c }}
      >
        {m.t}
      </span>
      <span className="text-sm">
        <span className="font-medium text-white/90">{part.part}.</span>{" "}
        <span className="text-white/55">{part.note}</span>
      </span>
    </li>
  );
}

function Leaves({
  plant,
  leaves,
  isLocked,
  onOpen,
}: {
  plant: Plant;
  leaves: Leaf[];
  isLocked: (l: Leaf) => boolean;
  onOpen: (l: Leaf) => void;
}) {
  return (
    <Page label={`The leaves · ${leaves.length}`} n="04">
      <p className="text-xs text-white/40">Open a leaf to explore its anatomy.</p>
      <div className="mt-3 grid gap-2.5">
        {leaves.map((leaf) => {
          const locked = isLocked(leaf);
          return (
            <button
              key={leaf.id}
              type="button"
              onClick={() => onOpen(leaf)}
              className="group relative flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3 text-left transition hover:border-[color:var(--accent)]/50 hover:bg-white/[0.05]"
            >
              <svg viewBox="-1.3 -1.3 2.6 2.6" className="mt-0.5 h-5 w-5 shrink-0">
                <path d={LEAF_ICON} fill={plant.accent} className="leaf-card-glyph" opacity={0.85} />
              </svg>
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-widest text-white/40">
                  {leaf.field}
                </span>
                <span className="mt-0.5 block truncate text-sm text-white/80">
                  {locked ? "🔒 Unlock with Pro" : leaf.value}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </Page>
  );
}

function Credits({ plant }: { plant: Plant }) {
  return (
    <Page label="About this page" n="05" side="left">
      <p className="text-sm leading-relaxed text-white/70">
        Portrait photography is sourced from Wikimedia Commons under a Creative Commons licence.
      </p>
      <a
        href={plant.credit.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-block rounded-xl border border-white/10 bg-white/[0.02] p-3 text-sm transition hover:border-white/25"
      >
        📷 {plant.credit.author} · {plant.credit.license}
        <span className="mt-1 block text-xs text-white/40">View source on Wikimedia Commons →</span>
      </a>
      <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-white/30">EarthPages</p>
    </Page>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-white/5 pb-2">
      <dt className="text-white/40">{label}</dt>
      <dd className="text-white/85">{value}</dd>
    </div>
  );
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const icon = (s: Edibility) =>
  s === "edible" ? "🌿" : s === "caution" ? "⚠️" : s === "toxic" ? "☠️" : "🚫";
