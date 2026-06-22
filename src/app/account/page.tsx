import Link from "next/link";
import type { Metadata } from "next";
import { getViewer } from "@/lib/auth";
import { demoProEnabled, isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = { title: "Account — EarthPages" };

export default async function AccountPage() {
  const viewer = await getViewer();

  return (
    <main className="mx-auto w-full max-w-md flex-1 px-6 py-20">
      <Link href="/" className="text-sm text-white/40 transition hover:text-white/70">
        ← The garden
      </Link>
      <h1 className="mt-8 font-serif text-3xl text-white">Account</h1>

      {!isSupabaseConfigured ? (
        <p className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200/90">
          Authentication isn&apos;t configured yet.
        </p>
      ) : !viewer.userId ? (
        <div className="mt-6">
          <p className="text-sm text-white/60">You&apos;re not signed in.</p>
          <Link
            href="/login"
            className="mt-4 inline-block rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Sign in
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <p className="text-[10px] uppercase tracking-widest text-white/40">Signed in as</p>
            <p className="mt-1 text-white">{viewer.email}</p>
            <p className="mt-4 text-[10px] uppercase tracking-widest text-white/40">Plan</p>
            <span
              className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                viewer.isPro
                  ? "bg-[#9bffc4]/15 text-[#9bffc4]"
                  : "border border-white/15 text-white/70"
              }`}
            >
              {viewer.isPro ? "Pro" : "Free"}
            </span>
          </div>

          {demoProEnabled && (
            <form action="/api/demo/pro" method="post">
              <button
                type="submit"
                className="w-full rounded-xl border border-white/15 px-4 py-2.5 text-sm text-white/80 transition hover:border-white/40"
              >
                {viewer.isPro ? "Switch back to Free (demo)" : "Activate Pro (demo)"}
              </button>
              <p className="mt-2 text-center text-[11px] text-white/30">
                Demo toggle — real billing arrives with Stripe.
              </p>
            </form>
          )}

          <form action="/auth/signout" method="post">
            <button type="submit" className="text-sm text-white/45 transition hover:text-white/80">
              Sign out
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
