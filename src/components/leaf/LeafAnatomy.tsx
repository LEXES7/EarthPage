"use client";

import { useEffect, useMemo } from "react";
import type { Leaf, Plant } from "@/data/types";
import { LEAF_PATHS } from "@/components/leaf/shapes";

interface Props {
  plant: Plant;
  leaf: Leaf;
  locked: boolean;
  onClose: () => void;
}

const LAYERS = [
  { name: "Waxy cuticle", desc: "Waterproof film that seals in moisture." },
  { name: "Upper epidermis", desc: "Clear protective skin that lets light pass." },
  { name: "Palisade mesophyll", desc: "Column cells packed with chloroplasts — most photosynthesis happens here." },
  { name: "Spongy mesophyll", desc: "Loose cells and air spaces for gas exchange." },
  { name: "Vascular bundle", desc: "Xylem brings water in; phloem carries sugars out." },
  { name: "Lower epidermis & stomata", desc: "Pores that open to trade CO₂, O₂ and vapour." },
];

export default function LeafAnatomy({ plant, leaf, locked, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const veins = useMemo(() => buildVeins(), []);
  const accent = plant.accent ?? "#9bdcff";
  const foliage = plant.foliage ?? "#4aa56a";
  const leafStyle = plant.leafStyle ?? "broadleaf";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${leaf.field} — leaf anatomy`}
      className="anat-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      style={{ ["--accent" as string]: accent }}
    >
      <div
        className="anat-panel relative grid max-h-[90vh] w-full max-w-4xl gap-px overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f17] shadow-2xl md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-black/40 text-lg text-white/70 transition hover:bg-black/70 hover:text-white"
        >
          ×
        </button>

        {/* Left page: the leaf skeleton (venation) */}
        <div className="relative flex flex-col bg-gradient-to-b from-white/[0.03] to-transparent p-7">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Leaf skeleton</p>
          <p className="mt-1 font-serif text-lg text-white/80">{plant.commonName}</p>
          <svg viewBox="0 0 260 360" className="mx-auto my-2 h-64 w-auto overflow-visible">
            <defs>
              <radialGradient id="anat-leaf" cx="50%" cy="42%" r="62%">
                <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
                <stop offset="100%" stopColor={foliage} stopOpacity="0.18" />
              </radialGradient>
            </defs>
            <path
              d={LEAF_PATHS[leafStyle]}
              transform="translate(130 180) scale(120)"
              fill="url(#anat-leaf)"
              stroke={accent}
              strokeWidth={0.012}
            />
            {veins.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke={accent}
                strokeWidth={i === 0 ? 2.4 : 1.3}
                strokeLinecap="round"
                pathLength={1}
                className="vein"
                style={{ animationDelay: `${250 + i * 90}ms` }}
              />
            ))}
          </svg>
          <p className="mt-auto text-xs leading-relaxed text-white/45">
            Veins form the leaf&apos;s plumbing and scaffold — water and sugars travel the network
            you see drawn here.
          </p>
        </div>

        {/* Right page: cross-section layers */}
        <div className="flex flex-col bg-black/30 p-7">
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">{leaf.field}</p>
              <h2 className="mt-1 font-serif text-2xl text-white">Inside the leaf</h2>
            </div>
            {locked && (
              <span className="rounded-full border border-[color:var(--accent)]/40 px-2 py-1 text-[10px] uppercase tracking-widest text-[color:var(--accent)]">
                Pro
              </span>
            )}
          </div>

          {locked ? (
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              This is a rare species. Unlock the full anatomy and field notes with EarthPages Pro.
            </p>
          ) : (
            <p className="mt-4 text-sm leading-relaxed text-white/80">{leaf.value}</p>
          )}

          <CrossSection accent={accent} foliage={foliage} dimmed={locked} />

          <ol className="mt-4 space-y-1.5">
            {LAYERS.map((l, i) => (
              <li
                key={l.name}
                className="layer-item flex gap-2 text-xs"
                style={{ animationDelay: `${500 + i * 120}ms` }}
              >
                <span
                  className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full text-[9px] font-semibold text-black"
                  style={{ background: accent }}
                >
                  {i + 1}
                </span>
                <span className={dim(locked)}>
                  <span className="font-medium text-white/90">{l.name}.</span>{" "}
                  <span className="text-white/55">{l.desc}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

const dim = (locked: boolean) => (locked ? "blur-[3px] select-none" : "");

function CrossSection({
  accent,
  foliage,
  dimmed,
}: {
  accent: string;
  foliage: string;
  dimmed: boolean;
}) {
  const cols = Array.from({ length: 11 });
  return (
    <svg
      viewBox="0 0 420 250"
      className={`mt-5 w-full rounded-xl border border-white/5 bg-white/[0.02] ${dimmed ? "blur-[3px]" : ""}`}
    >
      {/* 1 cuticle */}
      <g className="layer" style={{ animationDelay: "500ms" }}>
        <rect x="14" y="20" width="392" height="8" rx="4" fill={accent} opacity="0.8" />
        <Marker n={1} x={400} y={24} />
      </g>
      {/* 2 upper epidermis */}
      <g className="layer" style={{ animationDelay: "620ms" }}>
        {cols.map((_, i) => (
          <rect key={i} x={16 + i * 35.5} y={30} width={33} height={26} rx={5} fill={foliage} opacity="0.35" stroke={accent} strokeOpacity="0.3" />
        ))}
        <Marker n={2} x={400} y={43} />
      </g>
      {/* 3 palisade */}
      <g className="layer" style={{ animationDelay: "740ms" }}>
        {cols.map((_, i) => (
          <rect key={i} x={18 + i * 35.5} y={60} width={26} height={60} rx={11} fill={foliage} opacity="0.55" />
        ))}
        <Marker n={3} x={400} y={90} />
      </g>
      {/* 4 spongy + 5 vein */}
      <g className="layer" style={{ animationDelay: "860ms" }}>
        {Array.from({ length: 22 }).map((_, i) => (
          <circle key={i} cx={30 + (i % 11) * 35 + (i > 10 ? 17 : 0)} cy={150 + (i > 10 ? 24 : 0)} r={11} fill={foliage} opacity="0.4" />
        ))}
        <g>
          <circle cx={210} cy={162} r={16} fill={accent} opacity="0.85" />
          <circle cx={210} cy={162} r={8} fill="#7fb0ff" opacity="0.9" />
        </g>
        <Marker n={4} x={400} y={150} />
        <Marker n={5} x={236} y={162} dark />
      </g>
      {/* 6 lower epidermis + stomata */}
      <g className="layer" style={{ animationDelay: "980ms" }}>
        {cols.map((_, i) =>
          i === 5 ? null : (
            <rect key={i} x={16 + i * 35.5} y={200} width={33} height={26} rx={5} fill={foliage} opacity="0.35" stroke={accent} strokeOpacity="0.3" />
          ),
        )}
        <path d="M196 226 q14 14 28 0" fill="none" stroke={accent} strokeWidth={3} />
        <path d="M196 226 q14 -10 28 0" fill="none" stroke={accent} strokeWidth={3} />
        <Marker n={6} x={400} y={213} />
      </g>
    </svg>
  );
}

function Marker({ n, x, y, dark }: { n: number; x: number; y: number; dark?: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r={9} fill={dark ? "#000" : "#0b0f17"} stroke="var(--accent)" />
      <text x={x} y={y + 3.5} textAnchor="middle" fontSize="11" fill="var(--accent)">
        {n}
      </text>
    </g>
  );
}

// Midrib + symmetric secondary veins, as draw-on paths.
function buildVeins(): string[] {
  const baseY = 330;
  const tipY = 34;
  const cx = 130;
  const out = [`M ${cx} ${baseY} L ${cx} ${tipY}`];
  const n = 9;
  for (let i = 1; i <= n; i++) {
    const t = i / (n + 1);
    const y = baseY + (tipY - baseY) * t;
    const w = 96 * Math.sin(Math.PI * (0.12 + t * 0.82));
    const ey = y - w * 0.5;
    out.push(`M ${cx} ${y} Q ${cx + w * 0.5} ${y - w * 0.2} ${cx + w} ${ey}`);
    out.push(`M ${cx} ${y} Q ${cx - w * 0.5} ${y - w * 0.2} ${cx - w} ${ey}`);
  }
  return out;
}
