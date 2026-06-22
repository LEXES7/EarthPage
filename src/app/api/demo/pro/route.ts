import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { demoProEnabled, isSupabaseConfigured } from "@/lib/supabase/config";

// Demo-only: lets a signed-in user toggle their own tier without payment.
// Gated behind NEXT_PUBLIC_ENABLE_DEMO_PRO; replaced by Stripe in Phase 3.
export async function POST(request: Request) {
  const back = NextResponse.redirect(new URL("/account", request.url), { status: 303 });
  if (!isSupabaseConfigured || !demoProEnabled) return back;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return back;

  const { data: profile } = await supabase.from("profiles").select("tier").eq("id", user.id).single();
  const next = profile?.tier === "pro" ? "free" : "pro";
  await supabase.from("profiles").update({ tier: next }).eq("id", user.id);
  return back;
}
