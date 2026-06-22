import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export interface Viewer {
  userId: string | null;
  email: string | null;
  isPro: boolean;
}

const ANON: Viewer = { userId: null, email: null, isPro: false };

export async function getViewer(): Promise<Viewer> {
  if (!isSupabaseConfigured) return ANON;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return ANON;

  const { data: profile } = await supabase
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .single();

  return { userId: user.id, email: user.email ?? null, isPro: profile?.tier === "pro" };
}
