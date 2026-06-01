import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import { getAllPosts, getPublishedPostSlugs } from "@/lib/blog";

const BASE_URL = "https://www.adilayroofing.com";

// Per-content-type lastmod constants. Bump these (manually) only when the
// underlying content actually changes — NOT on every deploy. Sending a fresh
// timestamp on every URL on every build trains Google to ignore our freshness
// signal entirely. Stable, infrequent updates are what crawlers reward.
//
// Conventions:
//  - SERVICES_LASTMOD: bump when src/data/services.ts is meaningfully edited
//    (new service, new bodySections, copy rewrite). Don't bump for typos.
//  - LOCATIONS_LASTMOD: bump when src/data/locations.ts is meaningfully edited
//    (new city, new bodySections, copy rewrite).
//  - STATIC_LASTMOD: bump when a static page (about/contact/etc.) gets a real
//    content rewrite.
//  - HOMEPAGE_LASTMOD: bump on any homepage section change.
//  - BLOG_*: handled per-post via frontmatter dateModified (see below).
//
// Format: YYYY-MM-DD (ISO date). Next.js will serialize as the W3C datetime.
const SERVICES_LASTMOD = "2026-05-26";
const LOCATIONS_LASTMOD = "2026-06-01";
const STATIC_LASTMOD = "2026-05-11";
const HOMEPAGE_LASTMOD = "2026-05-11";
const LEGAL_LASTMOD = "2026-03-15"; // privacy/terms — rarely change

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const servicePages = services.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: SERVICES_LASTMOD,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const locationPages = locations.map((location) => ({
    url: `${BASE_URL}/service-areas/${location.slug}`,
    lastModified: LOCATIONS_LASTMOD,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // For blog posts, prefer the per-post dateModified (or fall back to date)
  // so freshness signal actually reflects the post's edit history.
  const allPosts = await getAllPosts().catch(() => []);
  const postLastmod = new Map(
    allPosts.map((p) => [
      p.frontmatter.slug,
      p.frontmatter.dateModified || p.frontmatter.date,
    ])
  );
  const publishedSlugs = await getPublishedPostSlugs();
  const blogPostPages = publishedSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: postLastmod.get(slug) || STATIC_LASTMOD,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: HOMEPAGE_LASTMOD,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/roofer-philadelphia`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: SERVICES_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...servicePages,
    {
      url: `${BASE_URL}/service-areas`,
      lastModified: LOCATIONS_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...locationPages,
    {
      url: `${BASE_URL}/financing`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPostPages,
    {
      url: `${BASE_URL}/faq`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/get-quote`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: LEGAL_LASTMOD,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: LEGAL_LASTMOD,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
