"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setLoading(false);
    if (error) setError(error.message);
    else setSent(true);
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-20">
      <Link href="/" className="text-sm text-white/40 transition hover:text-white/70">
        ← The garden
      </Link>
      <h1 className="mt-8 font-serif text-3xl text-white">Sign in</h1>
      <p className="mt-2 text-sm text-white/55">
        Get a magic link by email — no password. Pro unlocks rare and endangered species.
      </p>

      {!isSupabaseConfigured ? (
        <p className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200/90">
          Authentication isn&apos;t configured yet. Add your Supabase keys to{" "}
          <code className="text-amber-100">.env.local</code> to enable sign in.
        </p>
      ) : sent ? (
        <p className="mt-8 rounded-2xl border border-[color:var(--accent)]/30 bg-white/[0.03] p-4 text-sm text-white/80">
          ✦ Check <span className="text-white">{email}</span> for your magic link.
        </p>
      ) : (
        <form onSubmit={submit} className="mt-8 space-y-3" style={{ ["--accent" as string]: "#9bffc4" }}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
          />
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:opacity-50"
          >
            {loading ? "Sending…" : "Send magic link"}
          </button>
        </form>
      )}
    </main>
  );
}
