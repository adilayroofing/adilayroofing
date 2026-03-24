import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Lightweight anon client for public SEO reads (no auth needed) */
function getAnonClient() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey);
}

export interface PageSEO {
  id: string;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  custom_head_tags: string | null;
  status: string;
}

/**
 * Fetch SEO metadata for a page from Supabase.
 * Returns null if not found or Supabase is not configured (graceful fallback).
 */
export async function getPageSEO(slug: string): Promise<PageSEO | null> {
  const client = getAnonClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from("pages")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (error || !data) return null;
    return data as PageSEO;
  } catch {
    return null;
  }
}

/**
 * Build a Next.js Metadata object from Supabase SEO data.
 * Returns null if no DB data found (caller should use hardcoded fallback).
 */
export function buildMetadataFromSEO(seo: PageSEO) {
  return {
    title: seo.meta_title,
    description: seo.meta_description,
    alternates: seo.canonical_url ? { canonical: seo.canonical_url } : undefined,
    openGraph: {
      title: seo.og_title || seo.meta_title || undefined,
      description: seo.og_description || seo.meta_description || undefined,
      images: seo.og_image ? [{ url: seo.og_image }] : undefined,
    },
  };
}
