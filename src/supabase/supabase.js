import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = process.env.SUPABASE_URL || "https://lmgbcuolwhkqoowxnaik.supabase.co";

export const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

export default createClient(
    supabaseUrl,
    supabaseAnonKey
);
