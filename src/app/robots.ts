import type { MetadataRoute } from "next";

const BASE_URL = "https://www.adilayroofing.com";

// Paths no crawler should index. Repeated per user-agent group below, because
// a named group REPLACES the "*" group rather than inheriting from it — an
// agent given its own `allow: /` with no disallow list would be free to crawl
// /admin/ and /api/.
const COMMON_DISALLOW = [
  "/admin/",
  "/lp/",
  "/get-quote-ads",
  "/api/",
  // Tracking-param URLs from the old WP/WooCommerce site (e.g.
  // `?ref=aftership`) — GSC was wasting crawl budget on these.
  "/*?ref=",
  // Next.js React Server Component prefetch payloads. They were
  // 74% of Googlebot's crawl bytes; blocking keeps budget on real
  // pages. Doesn't affect user-facing prefetching.
  "/*?_rsc=",
];

// AI-model TRAINING crawlers. Blocking these costs us no traffic — they ingest
// content for model training and do not send referrals. Deliberate choice to
// keep them out.
//
// SAFE FOR SEO: Googlebot, Bingbot, DuckDuckBot, Slurp, etc. are NOT in this
// list — they remain allowed via the "*" rule. `Google-Extended` is Google's
// AI-training bot for Gemini and is a SEPARATE user-agent from `Googlebot` —
// blocking it does not affect Search ranking, indexing, or our appearance in
// Google's AI Overviews (those run on the regular Googlebot index; GSC's
// Generative AI report showed ~15k impressions across 112 pages while this
// block was in place). Same applies to `Applebot-Extended` vs `Applebot`.
const BLOCKED_TRAINING_BOTS = [
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "Google-Extended",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "FacebookBot",
  "ImagesiftBot",
  "Omgilibot",
  "Diffbot",
  "Timpibot",
  "cohere-ai",
];

// AI SEARCH / citation crawlers — explicitly allowed.
//
// These build the indexes that AI assistants cite AND link from, so blocking
// them suppresses referral traffic directly. GA4 shows the AI Assistant channel
// converting at ~43% (7 conversions / 16 sessions) — the highest of any channel
// we have — and 14 of those 16 sessions came from ChatGPT, whose search agents
// were only ever allowed here by omission.
//
// `PerplexityBot` and `YouBot` were previously in the block list above. They are
// search crawlers, not training crawlers, and were misclassified: Perplexity
// sent 1 session over ~6 months while ChatGPT sent 14.
//
// Listed explicitly rather than relying on the "*" fallback so a future edit to
// the wildcard group can't silently cut the channel off.
const ALLOWED_AI_SEARCH_BOTS = [
  "OAI-SearchBot", // ChatGPT Search index
  "ChatGPT-User", // ChatGPT on-demand browsing
  "PerplexityBot", // Perplexity index
  "Perplexity-User", // Perplexity on-demand fetch
  "Claude-User", // Claude on-demand browsing
  "Claude-SearchBot", // Claude search index
  "YouBot", // You.com
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: COMMON_DISALLOW,
      },
      ...ALLOWED_AI_SEARCH_BOTS.map((bot) => ({
        userAgent: bot,
        allow: "/",
        disallow: COMMON_DISALLOW,
      })),
      ...BLOCKED_TRAINING_BOTS.map((bot) => ({
        userAgent: bot,
        disallow: "/",
      })),
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
