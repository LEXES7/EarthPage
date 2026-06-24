"use client";

import { useMemo, useState } from "react";
import type { Term } from "@/data/glossary";

export default function Glossary({ terms }: { terms: Term[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const sorted = [...terms].sort((a, b) => a.term.localeCompare(b.term));
    if (!q) return sorted;
    return sorted.filter(
      (t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q),
    );
  }, [terms, query]);

  return (
    <section className="mt-10">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Search ${terms.length} terms…`}
        className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
      />

      <p className="mt-5 text-xs text-white/40">{filtered.length} terms</p>

      {filtered.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
          <p className="font-serif text-lg text-white/80">No terms match your search.</p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-5 rounded-full border border-white/15 px-5 py-2 text-sm text-white/70 transition hover:text-white"
          >
            Clear search
          </button>
        </div>
      ) : (
        <dl className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] sm:grid-cols-2">
          {filtered.map((t) => (
            <div key={t.term} className="bg-[#05070d] p-5">
              <dt className="font-serif text-base text-white">{t.term}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-white/55">{t.definition}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
