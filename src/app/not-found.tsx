import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-white/40">404</p>
      <h1 className="mt-4 font-serif text-4xl text-white">This page has fallen from the book.</h1>
      <p className="mt-4 max-w-md text-base text-white/55">
        The page you were looking for doesn&apos;t exist, or the species may have been renamed.
      </p>
      <div className="mt-8 flex items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
        >
          Back to the garden
        </Link>
        <Link
          href="/glossary"
          className="rounded-full border border-white/15 px-6 py-3 text-sm text-white/70 transition hover:text-white"
        >
          Browse the glossary
        </Link>
      </div>
    </main>
  );
}
