import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lqzbyewlqodsggrhehbz.supabase.co";

//const supabaseKey = "sb_publishable_WFSWEuk3swMFC0xkEjAmlw_D6nOT403";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxemJ5ZXdscW9kc2dncmhlaGJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzOTQwNTUsImV4cCI6MjA5NDk3MDA1NX0.8FiTSQOoUMNuMg-06uKaqZdXTvFnXUQDs2Vt8Wx12ns"

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);