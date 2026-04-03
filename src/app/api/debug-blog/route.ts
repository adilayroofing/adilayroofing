import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { createClient as createJsClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET() {
  const results: Record<string, unknown> = {};

  // Check env vars exist
  results.envVars = {
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    SERVICE_KEY_LENGTH: process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0,
  };

  // Test with service role key (admin client)
  try {
    const admin = createAdminClient();
    const { data, error, count } = await admin
      .from("blog_posts")
      .select("slug, status, title", { count: "exact" })
      .limit(5);
    results.adminClient = {
      success: !error,
      error: error?.message || null,
      count,
      posts: data?.map((p) => ({ slug: p.slug, status: p.status, title: p.title })) || [],
    };
  } catch (err) {
    results.adminClient = {
      success: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }

  // Test with anon key
  try {
    const anon = createJsClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data, error, count } = await anon
      .from("blog_posts")
      .select("slug, status", { count: "exact" })
      .limit(5);
    results.anonClient = {
      success: !error,
      error: error?.message || null,
      count,
      rows: data?.length || 0,
    };
  } catch (err) {
    results.anonClient = {
      success: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }

  return NextResponse.json(results);
}
