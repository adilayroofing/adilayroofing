#!/usr/bin/env node
// Seed Supabase CMS for Phase 1 — money-page SEO overhaul.
//
// Phase 1 (Weeks 1–3) targets the highest-value money pages per the SEO
// gap analysis: home, emergency roof repair, roof repair, roof replacement.
//
// What this script does:
//   1. Upserts `pages` rows with sharpened meta_title, meta_description,
//      og_*, and canonical_url for the four Phase 1 URLs.
//   2. Upserts a `structured_home` content block for "/" so the new
//      keyword-focused heroDescription can be edited via CMS going forward.
//      (Body sections for the 3 service pages live in src/data/services.ts
//      as the authoritative source — the template falls through to TS when
//      no CMS override exists, so no structured_service seed is required
//      to ship the Phase 1 content.)
//
// Usage: node scripts/seed-phase1-cms.mjs

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
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const BASE = "https://www.adilayroofing.com";

// ---------------------------------------------------------------------------
// Meta payloads — sharpened per gap analysis (primary keyword in first 60
// chars of title, keyword + location + CTA in description under 155 chars).
// ---------------------------------------------------------------------------
const metaPayloads = [
  {
    slug: "/",
    meta_title: "Philadelphia Roofing Contractor — Adilay Roofing | Free Estimates",
    meta_description:
      "Trusted Philadelphia roofing contractors. Roof replacement, repair, flat roofing & 24/7 emergency. Licensed PA184779. Free estimates (267) 255-3620.",
    og_title: "Philadelphia Roofing Contractor — Adilay Roofing",
    og_description:
      "Family-owned Philadelphia roofing contractor, 20+ years local experience. Licensed PA184779, 5.0 Google rating. Free estimates — (267) 255-3620.",
  },
  {
    slug: "/services/emergency-roof-repair",
    meta_title: "Emergency Roof Repair Philadelphia — 24/7 Response",
    meta_description:
      "Active leak or storm damage? 24/7 emergency roof repair in Philadelphia. Same-day tarping & leak stabilization. Licensed PA184779. Call (267) 255-3620.",
    og_title: "Emergency Roof Repair Philadelphia — 24/7 Response | Adilay Roofing",
    og_description:
      "Same-day tarping and emergency roof repair across Philadelphia & surrounding counties. Licensed PA184779. Call (267) 255-3620 anytime.",
  },
  {
    slug: "/services/roof-repair",
    meta_title: "Roof Repair Philadelphia — Leak, Flashing & Shingle Fixes",
    meta_description:
      "Philadelphia roof repair — leaks, flashing, shingles, flat roofs & chimney repair. 20+ years local experience. Licensed PA184779. Call (267) 255-3620.",
    og_title: "Roof Repair Philadelphia — Leak, Flashing & Shingle Fixes | Adilay Roofing",
    og_description:
      "Expert roof repair across Philadelphia — leaks, flashing, shingle, and flat-roof seam work. Licensed PA184779, 20+ years. Call (267) 255-3620.",
  },
  {
    slug: "/services/roof-replacement",
    meta_title: "Roof Replacement Philadelphia — Shingle, Metal & Flat Roofs",
    meta_description:
      "Philadelphia roof replacement — architectural shingle, metal, EPDM rubber & TPO. Free estimates, financing available. Licensed PA184779. (267) 255-3620.",
    og_title: "Roof Replacement Philadelphia — Shingle, Metal & Flat Roofs | Adilay Roofing",
    og_description:
      "Full roof replacement across Philadelphia — shingle, metal, EPDM & TPO. 20+ years local, financing available. Licensed PA184779. (267) 255-3620.",
  },
];

// ---------------------------------------------------------------------------
// Structured home block — only pushes the NEW keyword-focused heroDescription
// so an operator can edit it in CMS. All other home fields continue to fall
// through to the TS fallback in src/app/page.tsx.
// ---------------------------------------------------------------------------
const homeStructured = {
  heroDescription:
    "Looking for trusted roofing contractors in Philadelphia? Adilay Roofing has served Philadelphia homeowners and businesses for more than 20 years — roof replacement, roof repair, flat roofing, and 24/7 emergency response. Licensed in Pennsylvania (PA184779), fully insured, 5.0 rating on Google. Free estimates — call (267) 255-3620.",
};

// ---------------------------------------------------------------------------
// Upsert helpers (same pattern as seed-phase4-cms.mjs)
// ---------------------------------------------------------------------------
async function upsertPageMeta(slug, meta) {
  const { data: existing, error: findErr } = await supabase
    .from("pages")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (findErr) throw findErr;

  const payload = {
    ...meta,
    canonical_url: `${BASE}${slug === "/" ? "" : slug}`,
  };

  if (!existing) {
    const { error } = await supabase
      .from("pages")
      .insert({ slug, status: "published", ...payload });
    if (error) throw error;
    console.log(`  + inserted pages row for ${slug}`);
  } else {
    const { error } = await supabase.from("pages").update(payload).eq("id", existing.id);
    if (error) throw error;
    console.log(`  ✓ updated pages row for ${slug}`);
  }
  return existing?.id;
}

async function upsertStructuredBlock(slug, blockType, content) {
  const { data: page, error: pageErr } = await supabase
    .from("pages")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (pageErr) throw pageErr;
  if (!page) throw new Error(`No pages row for ${slug} — upsert meta first`);

  const { data: existing, error: findErr } = await supabase
    .from("content_blocks")
    .select("id, content")
    .eq("page_id", page.id)
    .eq("block_type", blockType)
    .maybeSingle();
  if (findErr) throw findErr;

  if (!existing) {
    const { error } = await supabase.from("content_blocks").insert({
      page_id: page.id,
      block_type: blockType,
      content,
    });
    if (error) throw error;
    console.log(`  + inserted ${blockType} for ${slug}`);
  } else {
    // Merge: preserve existing CMS fields, overlay the Phase 1 additions.
    const merged = { ...(existing.content || {}), ...content };
    const { error } = await supabase
      .from("content_blocks")
      .update({ content: merged })
      .eq("id", existing.id);
    if (error) throw error;
    console.log(`  ✓ updated ${blockType} for ${slug}`);
  }
}

async function main() {
  console.log("Phase 1 CMS seed — money pages (home + 3 services)");
  console.log("");

  console.log("1. Page meta (4 URLs)");
  for (const p of metaPayloads) {
    await upsertPageMeta(p.slug, {
      meta_title: p.meta_title,
      meta_description: p.meta_description,
      og_title: p.og_title,
      og_description: p.og_description,
    });
  }
  console.log("");

  console.log("2. Homepage structured_home (heroDescription override)");
  await upsertStructuredBlock("/", "structured_home", homeStructured);
  console.log("");

  console.log("Done.");
}

main().catch((e) => {
  console.error("Failed:", e);
  process.exit(1);
});
