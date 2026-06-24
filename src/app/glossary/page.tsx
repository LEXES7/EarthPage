import Link from "next/link";
import type { Metadata } from "next";
import { GLOSSARY } from "@/data/glossary";
import Glossary from "@/components/Glossary";

export const metadata: Metadata = {
  title: "Glossary — EarthPages",
  description: "A concise glossary of the botanical terms used across the species books.",
};

export default function GlossaryPage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
      <Link href="/" className="text-sm text-white/40 transition hover:text-white/70">
        ← The garden
      </Link>
      <header className="mt-8">
        <p className="text-xs uppercase tracking-[0.4em] text-white/40">Reference</p>
        <h1 className="mt-4 font-serif text-4xl text-white">Glossary</h1>
        <p className="mt-4 max-w-xl text-base text-white/60">
          The botanical terms used across the species books, defined in plain language.
        </p>
      </header>

      <Glossary terms={GLOSSARY} />
    </main>
  );
}
