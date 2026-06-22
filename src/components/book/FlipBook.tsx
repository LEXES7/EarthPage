"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";

interface Props {
  pages: ReactNode[];
}

// A 3D page-turning book. Pages are paired front/back onto sheets that rotate
// about the spine. Reading order across spreads: cover, then (1,2), (3,4)…
export default function FlipBook({ pages }: Props) {
  const padded = pages.length % 2 === 0 ? pages : [...pages, <Blank key="blank" />];
  const sheets: [ReactNode, ReactNode][] = [];
  for (let i = 0; i < padded.length; i += 2) sheets.push([padded[i], padded[i + 1]]);

  const [current, setCurrent] = useState(0); // number of flipped sheets
  const [animating, setAnimating] = useState<number | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      setCurrent((c) => {
        const next = c + dir;
        if (next < 0 || next > sheets.length) return c;
        setAnimating(dir === 1 ? c : next);
        window.setTimeout(() => setAnimating(null), 850);
        return next;
      });
    },
    [sheets.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const atStart = current === 0;
  const atEnd = current === sheets.length;

  return (
    <div className="flip-scene">
      <div className="flip-book">
        <div className="flip-base" />
        {sheets.map(([front, back], i) => {
          const flipped = i < current;
          const z = i === animating ? 1000 : flipped ? i : sheets.length - i;
          return (
            <div key={i} className="flip-sheet" data-flipped={flipped} style={{ zIndex: z }}>
              <div className="flip-face flip-front">{front}</div>
              <div className="flip-face flip-back">{back}</div>
            </div>
          );
        })}

        {/* Click zones for turning */}
        {!atStart && (
          <button
            type="button"
            aria-label="Previous page"
            onClick={() => go(-1)}
            className="absolute left-0 top-0 z-[1100] h-full w-1/2 cursor-w-resize"
          />
        )}
        {!atEnd && (
          <button
            type="button"
            aria-label="Next page"
            onClick={() => go(1)}
            className="absolute right-0 top-0 z-[1100] h-full w-1/2 cursor-e-resize"
          />
        )}
      </div>

      <div className="mt-5 flex items-center justify-center gap-6 text-sm text-white/50">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={atStart}
          className="rounded-full border border-white/15 px-4 py-1.5 transition enabled:hover:text-white disabled:opacity-30"
        >
          ← Prev
        </button>
        <span className="tabular-nums text-white/40">
          {current} / {sheets.length}
        </span>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={atEnd}
          className="rounded-full border border-white/15 px-4 py-1.5 transition enabled:hover:text-white disabled:opacity-30"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

function Blank() {
  return <div className="book-page" />;
}
