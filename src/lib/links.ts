import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function getAnonClient() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey);
}

export interface InternalLink {
  id: string;
  anchor_text: string;
  context: string | null;
  target_slug: string;
}

/**
 * Fetch internal links originating from a given page slug.
 * Returns links with the target page's slug for building <a> tags.
 */
export async function getInternalLinksForPage(
  sourceSlug: string
): Promise<InternalLink[]> {
  const client = getAnonClient();
  if (!client) return [];

  try {
    // First, find the source page ID by slug
    const { data: sourcePage } = await client
      .from("pages")
      .select("id")
      .eq("slug", sourceSlug)
      .single();

    if (!sourcePage) return [];

    // Then get all links from that page
    const { data: links } = await client
      .from("internal_links")
      .select("id, anchor_text, context, target:target_page_id(slug)")
      .eq("source_page_id", sourcePage.id);

    if (!links) return [];

    return links.map((link) => ({
      id: link.id,
      anchor_text: link.anchor_text,
      context: link.context as string | null,
      target_slug: (link.target as unknown as { slug: string })?.slug || "",
    }));
  } catch {
    return [];
  }
}
