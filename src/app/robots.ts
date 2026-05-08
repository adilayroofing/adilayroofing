import type { MetadataRoute } from "next";

const BASE_URL = "https://www.adilayroofing.com";

// AI / scraper user-agents that consume crawl budget (and ISR write budget on
// Vercel) without driving real traffic. We block them outright.
//
// SAFE FOR SEO: Googlebot, Bingbot, DuckDuckBot, Slurp, etc. are NOT in this
// list — they remain allowed via the "*" rule. `Google-Extended` is Google's
// AI-training bot for Gemini and is a SEPARATE user-agent from `Googlebot` —
// blocking it does not affect Search ranking or indexing. Same applies to
// `Applebot-Extended` vs `Applebot`. Google AI Overviews are powered by the
// regular Search index (Googlebot), so we still appear there.
//
// Balanced posture: we block proactive training crawlers (GPTBot, ClaudeBot,
// CCBot, PerplexityBot, etc.) but ALLOW the on-demand AI-search user-agents
// (`OAI-SearchBot`, `ChatGPT-User`, `Perplexity-User`, `Claude-Web`). Those
// only fetch when a user asks an AI a question about us, so volume is low —
// in exchange we stay citable in ChatGPT Search, Perplexity, and Claude.
const BLOCKED_AI_BOTS = [
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "CCBot",
  "PerplexityBot",
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
  "YouBot",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/lp/", "/get-quote-ads", "/api/"],
      },
      ...BLOCKED_AI_BOTS.map((bot) => ({
        userAgent: bot,
        disallow: "/",
      })),
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
