#!/usr/bin/env node
// One-off: align Supabase CMS for /get-quote with the Phase 1 code rewrite.
// Reads .env.local, updates the pages row + structured_quote content block.
// Usage: node scripts/update-get-quote-cms.mjs

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env.local");
const env = Object.fromEntries(
  readFileSync(envPath, "utf8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")];
    })
);

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

const SLUG = "/get-quote";
const CANONICAL = "https://www.adilayroofing.com/get-quote";

const pageUpdates = {
  meta_title: "Free No-Obligation Roofing Quote Philadelphia | Adilay Roofing",
  meta_description:
    "Get a free, no-obligation roofing quote in Philadelphia. Same-day response, written estimate, no pressure. Licensed contractor, 20+ years. Call (888) 823-4766.",
  canonical_url: CANONICAL,
  og_title: "Free No-Obligation Roofing Quote in Philadelphia — Adilay Roofing",
  og_description:
    "Free, no-obligation roofing quote in Philadelphia. Same-day response, written estimate, 20+ years experience, licensed PA184779.",
};

const structuredQuote = {
  heroTitle: "Free No-Obligation Roofing Quote in Philadelphia",
  heroDescription:
    "Fill out the short form and a licensed Philadelphia roofer will follow up the same day with a written, no-pressure quote tailored to your property.",
  offerBannerText:
    "🎁 Limited Offer: FREE Gutter Cleaning with Every Roof Replacement — First-Time Customers",
  trustSignals: ["Free Estimates", "No Obligation", "Response Within 24hrs"],
  licenseHeading: "PA Licensed Home Improvement Contractor",
  licenseDescription:
    "Adilay Roofing is officially registered with the Commonwealth of Pennsylvania as a licensed Home Improvement Contractor. Your project is protected by state-regulated standards.",
  serviceAreaHeading:
    "Same-Day Estimates Available Across Philadelphia & Surrounding Areas",
  serviceAreaDescription:
    "Need a roofing estimate in Philadelphia PA today? We cover the entire five-county region with same-day roof estimate slots for urgent jobs — from Northeast Philadelphia and South Philly to Bucks, Montgomery, Delaware, and Chester County.",
  faqHeading: "Frequently Asked Questions About Our Free Roofing Quotes",
  faqSubheading:
    "Everything you need to know before requesting your free roofing quote in Philadelphia.",
};

async function main() {
  // 1) Page row
  const { data: page, error: pageErr } = await supabase
    .from("pages")
    .select("id, slug, status")
    .eq("slug", SLUG)
    .single();
  if (pageErr || !page) {
    console.error("Could not find page row for", SLUG, pageErr);
    process.exit(1);
  }
  console.log("Found page:", page.id, "status:", page.status);

  const { error: upErr } = await supabase
    .from("pages")
    .update(pageUpdates)
    .eq("id", page.id);
  if (upErr) {
    console.error("Failed to update page:", upErr);
    process.exit(1);
  }
  console.log("✓ Updated pages row meta/OG/canonical");

  // 2) Structured quote block
  const { data: block, error: blockErr } = await supabase
    .from("content_blocks")
    .select("id, content")
    .eq("page_id", page.id)
    .eq("block_type", "structured_quote")
    .limit(1)
    .maybeSingle();
  if (blockErr) {
    console.error("Failed to read content_blocks:", blockErr);
    process.exit(1);
  }

  if (block) {
    const merged = { ...(block.content || {}), ...structuredQuote };
    const { error: bUpErr } = await supabase
      .from("content_blocks")
      .update({ content: merged })
      .eq("id", block.id);
    if (bUpErr) {
      console.error("Failed to update content_blocks:", bUpErr);
      process.exit(1);
    }
    console.log("✓ Updated structured_quote block:", block.id);
  } else {
    const { error: insErr } = await supabase.from("content_blocks").insert({
      page_id: page.id,
      block_type: "structured_quote",
      content: structuredQuote,
      sort_order: 0,
    });
    if (insErr) {
      console.error("Failed to insert content_blocks:", insErr);
      process.exit(1);
    }
    console.log("✓ Inserted new structured_quote block");
  }

  console.log("\nDone. Revalidate /get-quote or wait up to 60s for ISR.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
