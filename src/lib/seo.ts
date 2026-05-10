// CMS deprecated 2026-05-10. The Supabase client and DB query bodies were
// removed; the exported function signatures are kept (returning null) so
// existing page templates with `if (dbSeo) ...` fallback chains still
// compile and use their hardcoded data files. See cms-backup-2026-05-10.json
// for a snapshot of the removed CMS data.

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
export async function getPageSEO(_slug: string): Promise<PageSEO | null> {
  // CMS deprecated 2026-05-10. All page metadata now lives in the data files
  // (src/data/services.ts, src/data/locations.ts, and per-page page.tsx
  // metadata blocks). This function is kept as a no-op so the existing
  // `if (dbSeo) ...` fallback chains in page templates still compile and
  // automatically use the hardcoded data. Safe to delete after every page
  // template has been migrated off these calls. See cms-backup-2026-05-10.json
  // for a snapshot of the old CMS data if reference is ever needed.
  return null;
}

/**
 * Build a Next.js Metadata object from Supabase SEO data.
 * Returns null if no DB data found (caller should use hardcoded fallback).
 */
/**
 * Fetch CMS content (rich_text block) for a page from Supabase.
 * Returns the HTML string if found, or null (caller falls back to hardcoded).
 */
export async function getPageContent(_slug: string): Promise<string | null> {
  // CMS deprecated 2026-05-10 — see getPageSEO comment.
  return null;
}

/**
 * Fetch structured content (service or location) for a page from Supabase.
 * Returns the JSONB content object or null (caller falls back to hardcoded data).
 */
export async function getStructuredContent(
  _slug: string,
  _blockType: "structured_service" | "structured_location" | "structured_faq" | "structured_about" | "structured_home" | "structured_financing" | "structured_contact" | "structured_quote" | "structured_services_index" | "structured_areas_index" | "structured_gallery" | "structured_blog_index"
): Promise<Record<string, unknown> | null> {
  // CMS deprecated 2026-05-10 — see getPageSEO comment.
  return null;
}

export function buildMetadataFromSEO(seo: PageSEO) {
  return {
    // CMS meta_title is already fully-formed (includes brand), so bypass the
    // root layout's "%s | Adilay Roofing" template with `absolute`.
    title: seo.meta_title ? { absolute: seo.meta_title } : undefined,
    description: seo.meta_description,
    alternates: seo.canonical_url ? { canonical: seo.canonical_url } : undefined,
    openGraph: {
      title: seo.og_title || seo.meta_title || undefined,
      description: seo.og_description || seo.meta_description || undefined,
      images: seo.og_image ? [{ url: seo.og_image }] : undefined,
    },
  };
}
