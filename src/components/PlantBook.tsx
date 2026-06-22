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
    <Form key="form" plant={plant} />,
    <HabitatRange key="habitat" plant={plant} />,
    <EcologyConservation key="eco" plant={plant} />,
    <EdibilityPage key="edible" plant={plant} />,
    <Uses key="uses" plant={plant} />,
    ...(plant.cultivation ? [<Cultivation key="cult" plant={plant} />] : []),
    <Identification key="id" plant={plant} />,
    <Leaves key="leaves" plant={plant} leaves={leaves} isLocked={isLocked} onOpen={setOpen} />,
    <Facts key="facts" plant={plant} />,
    <Sources key="sources" plant={plant} />,
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

/* ── Page shell ─────────────────────────────────────────── */
function Page({ label, n, children }: { label: string; n: string; children: ReactNode }) {
  return (
    <div className="book-page">
      <div className="flex items-baseline justify-between">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">{label}</p>
        <p className="font-serif text-xs text-white/30">{n}</p>
      </div>
      <div className="mt-4 flex-1 overflow-y-auto pr-1 text-sm">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="border-b border-white/5 py-2">
      <dt className="text-[10px] uppercase tracking-widest text-white/35">{label}</dt>
      <dd className="mt-0.5 text-white/80">{value}</dd>
    </div>
  );
}

/* ── Chapters ───────────────────────────────────────────── */
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
          {proPlant ? `${plant.rarity} · Pro` : plant.rarity}
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
    <Page label="Overview" n="01">
      <h2 className="font-serif text-2xl text-white">{plant.commonName}</h2>
      <p className="font-serif italic text-white/45">{plant.scientificName}</p>
      {plant.otherNames.length > 0 && (
        <p className="mt-1 text-xs text-white/40">Also: {plant.otherNames.join(" · ")}</p>
      )}
      <p className="mt-5 font-serif text-[15px] leading-relaxed text-white/80">{plant.description}</p>
      <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-3">
        <p className="text-[10px] uppercase tracking-widest text-white/35">On the name</p>
        <p className="mt-1 text-sm leading-relaxed text-white/60">{plant.etymology}</p>
      </div>
    </Page>
  );
}

function Form({ plant }: { plant: Plant }) {
  const m = plant.morphology;
  return (
    <Page label="Form & morphology" n="02">
      <dl>
        <Field label="Height" value={m.height} />
        <Field label="Spread" value={m.spread} />
        <Field label="Bark" value={m.bark} />
        <Field label="Leaves" value={m.leaves} />
        <Field label="Flowers" value={m.flowers} />
        <Field label="Fruit / seed" value={m.fruit} />
      </dl>
    </Page>
  );
}

function HabitatRange({ plant }: { plant: Plant }) {
  const d = plant.distribution;
  const p = plant.phenology;
  return (
    <Page label="Habitat & range" n="03">
      <dl>
        <Field label="Native range" value={d.nativeRange} />
        <Field label="Habitat" value={d.habitat} />
        <Field label="Soil" value={d.soil} />
        <Field label="Climate" value={d.climate} />
        <Field label="Habit" value={p.habit} />
        <Field label="Flowering" value={p.flowering} />
        <Field label="Fruiting / spores" value={p.fruiting} />
        <Field label="Lifespan" value={plant.lifespan} />
        <Field label="Growth rate" value={plant.growthRate} />
      </dl>
    </Page>
  );
}

const CONS_COLOR: Record<string, string> = {
  "Least Concern": "#7CFFB2",
  "Secure (not threatened)": "#7CFFB2",
  Vulnerable: "#ffd27a",
  Endangered: "#ff9d6a",
  "Critically Endangered": "#ff8a8a",
};

function EcologyConservation({ plant }: { plant: Plant }) {
  const c = plant.conservation;
  const color = CONS_COLOR[c.status] ?? "#9fb0c4";
  return (
    <Page label="Ecology & conservation" n="04">
      <p className="leading-relaxed text-white/80">{plant.ecology}</p>

      <div
        className="mt-5 rounded-2xl border p-4"
        style={{ borderColor: `${color}55`, background: `${color}12` }}
      >
        <div className="flex items-center justify-between">
          <p className="font-serif text-lg" style={{ color }}>
            {c.status}
          </p>
          {c.source && <span className="text-[10px] uppercase tracking-widest text-white/40">{c.source}</span>}
        </div>
        {c.trend && <p className="mt-1 text-xs text-white/55">{c.trend}</p>}
      </div>

      <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/40">Main threats</p>
      <ul className="mt-2 space-y-1.5">
        {c.threats.map((t) => (
          <li key={t} className="flex gap-2 text-sm text-white/70">
            <span style={{ color }}>•</span> {t}
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
    <Page label="Edibility & toxicity" n="05">
      <div
        className="flex items-center gap-3 rounded-2xl border p-4"
        style={{ borderColor: `${s.color}55`, background: `${s.color}12` }}
      >
        <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: s.color }} />
        <div>
          <p className="font-serif text-lg" style={{ color: s.color }}>
            {s.label}
          </p>
          <p className="text-xs text-white/55">{s.note}</p>
        </div>
      </div>

      <p className="mt-4 leading-relaxed text-white/75">{plant.edibility.summary}</p>

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
      <span>
        <span className="font-medium text-white/90">{part.part}.</span>{" "}
        <span className="text-white/55">{part.note}</span>
      </span>
    </li>
  );
}

function Uses({ plant }: { plant: Plant }) {
  return (
    <Page label="Uses" n="06">
      <ul className="space-y-2.5">
        {plant.uses.map((u) => (
          <li key={u.category} className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
            <p className="text-[10px] uppercase tracking-widest text-[color:var(--accent)]">
              {u.category}
            </p>
            <p className="mt-1 text-white/75">{u.note}</p>
          </li>
        ))}
      </ul>
    </Page>
  );
}

function Cultivation({ plant }: { plant: Plant }) {
  const c = plant.cultivation!;
  return (
    <Page label="Cultivation" n="07">
      <dl>
        <Field label="Propagation" value={c.propagation} />
        <Field label="Care" value={c.care} />
      </dl>
    </Page>
  );
}

function Identification({ plant }: { plant: Plant }) {
  return (
    <Page label="Identification" n="08">
      <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Key features</p>
      <ul className="mt-2 space-y-1.5">
        {plant.identification.map((f) => (
          <li key={f} className="flex gap-2 text-white/75">
            <span className="text-[color:var(--accent)]">—</span> {f}
          </li>
        ))}
      </ul>
      {plant.lookAlikes && plant.lookAlikes.length > 0 && (
        <>
          <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-white/40">Look-alikes</p>
          <ul className="mt-2 space-y-2">
            {plant.lookAlikes.map((l) => (
              <li key={l.name} className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <p className="font-medium text-white/90">{l.name}</p>
                <p className="mt-0.5 text-white/55">{l.distinguish}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </Page>
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
    <Page label={`The leaves · ${leaves.length}`} n="09">
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
                <span className="mt-0.5 block truncate text-white/80">
                  {locked ? "Unlock with Pro" : leaf.value}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </Page>
  );
}

function Facts({ plant }: { plant: Plant }) {
  return (
    <Page label="Did you know" n="10">
      <ul className="space-y-3">
        {plant.facts.map((f) => (
          <li key={f} className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
            <span className="text-[color:var(--accent)]">—</span>
            <span className="text-white/80">{f}</span>
          </li>
        ))}
      </ul>
    </Page>
  );
}

function Sources({ plant }: { plant: Plant }) {
  return (
    <Page label="Sources & credits" n="11">
      <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Further reading</p>
      <ul className="mt-2 space-y-2">
        {plant.references.map((r) => (
          <li key={r.url}>
            <a
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-white/25"
            >
              {r.label} <span className="text-white/30">→</span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-white/40">Image</p>
      <a
        href={plant.credit.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-2 block rounded-xl border border-white/5 bg-white/[0.02] p-3 text-white/60 transition hover:border-white/25"
      >
        Photo: {plant.credit.author} · {plant.credit.license}
        <span className="mt-0.5 block text-xs text-white/35">via Wikimedia Commons</span>
      </a>
    </Page>
  );
}
