import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ncansykgsvjlyimfxquq.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jYW5zeWtnc3ZqbHlpbWZ4cXVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1MDczNTAsImV4cCI6MjEwNjA4MzM1MH0.nKvSqGRWAuQOwLFuIrgOOhtLxWGPCMEmhVBcbfBJcoA";
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jYW5zeWtnc3ZqbHlpbWZ4cXVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDUwNzM1MCwiZXhwIjoyMTA2MDgzMzUwfQ.I0aNVdFmXE9qe8tupbGStrLeJwn3XdVyQuWVbizIG_0";

// Public client for browser operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for backend API routes / server operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
