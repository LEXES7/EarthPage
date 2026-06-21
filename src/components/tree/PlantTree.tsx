"use client";

import { useMemo, useState } from "react";
import type { Plant } from "@/data/types";
import { layoutPlant, strokeFor, VIEW } from "./layout";

interface Props {
  plant: Plant;
  /** Will be derived from the Supabase session and RLS. */
  isPro?: boolean;
}

export default function PlantTree({ plant, isPro = false }: Props) {
  const { segments, leaves } = useMemo(() => layoutPlant(plant), [plant]);
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-2xl select-none"
      style={{ ["--accent" as string]: plant.accent }}
    >
      <svg
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
      >
        <defs>
          <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="9" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {segments.map((s) => (
          <line
            key={s.id}
            x1={s.x1}
            y1={s.y1}
            x2={s.x2}
            y2={s.y2}
            stroke="var(--accent)"
            strokeWidth={strokeFor(s.depth)}
            strokeLinecap="round"
            opacity={0.55}
            filter="url(#glow)"
          />
        ))}

        {/* Leaf nodes; glow is staggered per leaf via animation-delay. */}
        {leaves.map((l) => (
          <circle
            key={l.id}
            cx={l.x}
            cy={l.y}
            r={active === l.id ? 13 : 9}
            fill="var(--accent)"
            filter="url(#glow)"
            className="leaf-star"
            style={{ animationDelay: `${(l.order % 7) * 0.45}s` }}
          />
        ))}
      </svg>

      {/* Focusable leaf controls overlaid on the SVG. */}
      <div className="absolute inset-0">
        {leaves.map((l) => {
          const locked = l.tier === "pro" && !isPro;
          const isOpen = active === l.id;
          return (
            <button
              key={l.id}
              type="button"
              onMouseEnter={() => setActive(l.id)}
              onFocus={() => setActive(l.id)}
              onMouseLeave={() => setActive((a) => (a === l.id ? null : a))}
              onBlur={() => setActive((a) => (a === l.id ? null : a))}
              onClick={() => setActive((a) => (a === l.id ? null : l.id))}
              aria-label={locked ? `${l.field} (Pro)` : `${l.field}: ${l.value}`}
              className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-none"
              style={{ left: `${(l.x / VIEW.w) * 100}%`, top: `${(l.y / VIEW.h) * 100}%` }}
            >
              <span className="block h-7 w-7 rounded-full ring-1 ring-white/10 transition group-hover:ring-white/40 group-focus-visible:ring-white/60" />

              <span
                role="status"
                className={`pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-48 -translate-x-1/2 rounded-xl border border-white/10 bg-black/80 p-3 text-left backdrop-blur transition ${
                  isOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="block text-[10px] uppercase tracking-widest text-white/40">
                  {l.field}
                </span>
                {locked ? (
                  <span className="mt-1 block text-xs text-[color:var(--accent)]">
                    🔒 Unlock with Pro
                  </span>
                ) : (
                  <span className="mt-1 block text-sm leading-snug text-white/90">{l.value}</span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
