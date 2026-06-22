import Link from "next/link";
import { getViewer } from "@/lib/auth";

export default async function SiteHeader() {
  const viewer = await getViewer();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05070d]/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="font-serif text-sm tracking-wide text-white">
          EarthPages
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link href="/" className="text-white/55 transition hover:text-white">
            Garden
          </Link>
          {viewer.userId ? (
            <Link
              href="/account"
              className={`transition hover:text-white ${viewer.isPro ? "text-[#9bffc4]" : "text-white/55"}`}
            >
              {viewer.isPro ? "✦ Pro" : "Account"}
            </Link>
          ) : (
            <Link href="/login" className="text-white/55 transition hover:text-white">
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
