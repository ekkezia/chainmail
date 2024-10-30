import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;

export const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export default createClient(
    supabaseUrl,
    supabaseAnonKey
);
