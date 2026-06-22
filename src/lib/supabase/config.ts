export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// When unset, auth is skipped and the app runs anonymously (everything Pro-gated
// stays locked). This keeps local dev working before Supabase is provisioned.
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

// Demo upgrade button (no payment) — must stay off in production.
export const demoProEnabled = process.env.NEXT_PUBLIC_ENABLE_DEMO_PRO === "true";
