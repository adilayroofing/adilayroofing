#!/usr/bin/env node
// Seed Supabase CMS for Gap-Analysis Phase 2 of the SEO overhaul.
//
// Phase 2 (Weeks 4–7) deepens the 8 highest-value service-area pages with
// 4 body sections each, expanded FAQs, and tightened meta. The body
// content lives in src/data/locations.ts as the authoritative source; the
// template falls through to TS when no CMS override exists. This script
// only updates the CMS `pages` table with sharpened meta titles,
// descriptions, og fields, and canonical URLs for the 8 URLs.
//
// (Filename uses `gap-phase2` to disambiguate from the legacy
// scripts/seed-phase2-cms.mjs which seeded the GSC-driven Phase 2 service
// pages — a different phase from a different SEO project.)
//
// Usage: node scripts/seed-gap-phase2-cms.mjs

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
// Phase 2 meta payloads — sharpened for the 8 deepened service-area pages.
// All titles ≤62 chars, descriptions ≤155 chars, primary keyword in first
// 60 chars of title.
// ---------------------------------------------------------------------------
const metaPayloads = [
  {
    slug: "/service-areas/philadelphia",
    meta_title: "Roofer Philadelphia PA — Rowhouse, Slate & Flat Roof",
    meta_description:
      "Trusted Philadelphia roofing contractor. Rowhouse flat roofs, slate, shingle & 24/7 emergency repair. Licensed PA184779. Free estimates — (267) 255-3620.",
    og_title: "Roofer Philadelphia PA — Rowhouse, Slate & Flat Roof | Adilay Roofing",
    og_description:
      "Family-owned Philadelphia roofer. 20+ years on local rowhouses, slate, & flat roofs. Licensed PA184779. (267) 255-3620.",
  },
  {
    slug: "/service-areas/fishtown",
    meta_title: "Roofer Fishtown — Flat Roof, Roof Deck & Same-Day Repair",
    meta_description:
      "Fishtown roofing from your neighbors. Flat roof, EPDM, roof deck & emergency tarping minutes from your block. Licensed PA184779. Call (267) 255-3620.",
    og_title: "Roofer Fishtown — Flat Roof & Roof Deck Specialists | Adilay Roofing",
    og_description:
      "Adilay Roofing is based in Kensington — minutes from every Fishtown block. Flat roof, EPDM, roof deck. (267) 255-3620.",
  },
  {
    slug: "/service-areas/northern-liberties",
    meta_title: "Roofer Northern Liberties — Flat Roof, Roof Deck & Pilot House",
    meta_description:
      "Northern Liberties roofing — TPO, EPDM, roof deck waterproofing & pilot-house flashing. Licensed PA184779. Free estimates — (267) 255-3620.",
    og_title: "Roofer Northern Liberties — Flat Roof & Roof Deck | Adilay Roofing",
    og_description:
      "Northern Liberties new-construction & rowhouse roofing experts. Licensed PA184779, 10 minutes from any NoLibs block. (267) 255-3620.",
  },
  {
    slug: "/service-areas/south-philadelphia",
    meta_title: "Roofer South Philadelphia — Rowhouse Flat Roof Experts",
    meta_description:
      "South Philly rowhouse roofing — EPDM, modified bitumen, roof decks & parapet flashing. Licensed PA184779. Free estimates — (267) 255-3620.",
    og_title: "Roofer South Philadelphia — Rowhouse Flat Roof Experts | Adilay Roofing",
    og_description:
      "South Philly rowhouse roofing specialists. Flat roof, roof decks, parapet flashing. Licensed PA184779. (267) 255-3620.",
  },
  {
    slug: "/service-areas/germantown",
    meta_title: "Roofer Germantown Philadelphia — Slate & Historic Home Experts",
    meta_description:
      "Germantown slate, designer shingle & historic home roofing. PHC review handled. Licensed PA184779. Free estimates — (267) 255-3620.",
    og_title: "Roofer Germantown Philadelphia — Slate & Historic Home Experts | Adilay Roofing",
    og_description:
      "Germantown slate roof specialists. Natural slate, synthetic slate, designer shingle. Historic district approved. (267) 255-3620.",
  },
  {
    slug: "/service-areas/manayunk",
    meta_title: "Roofer Manayunk — Steep-Slope Hillside Roofing Experts",
    meta_description:
      "Manayunk hillside roofing — wind-rated shingle, oversized gutters, slate & metal options. Licensed PA184779. Free estimates — (267) 255-3620.",
    og_title: "Roofer Manayunk — Steep-Slope Hillside Roofing | Adilay Roofing",
    og_description:
      "Manayunk hillside roofing specialists. Wind-rated shingle, oversized gutters, slate & metal. Licensed PA184779. (267) 255-3620.",
  },
  {
    slug: "/service-areas/bucks-county",
    meta_title: "Roofer Bucks County PA — Levittown to Doylestown Roofing",
    meta_description:
      "Bucks County roofing — Levittown to Doylestown. Shingle, flat roof, storm damage, ice-dam fixes. Licensed PA184779. Free estimates — (267) 255-3620.",
    og_title: "Roofer Bucks County PA — Levittown to Doylestown | Adilay Roofing",
    og_description:
      "Bucks County roofing — lower Bucks to upper Bucks. Levittown ranchers, Doylestown colonials, heritage homes. (267) 255-3620.",
  },
  {
    slug: "/service-areas/montgomery-county",
    meta_title: "Roofer Montgomery County PA — Norristown to Lower Merion",
    meta_description:
      "Montgomery County roofing — Norristown twins to Lower Merion estates. HOA & historic district experienced. Licensed PA184779. (267) 255-3620.",
    og_title: "Roofer Montgomery County PA — Norristown to Lower Merion | Adilay Roofing",
    og_description:
      "Montgomery County roofer — Norristown, KOP, Lower Merion, Cheltenham. HOA & historic review experienced. (267) 255-3620.",
  },
];

// ---------------------------------------------------------------------------
// Upsert helper — same pattern as seed-phase1-cms.mjs and seed-phase4-cms.mjs.
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
    canonical_url: `${BASE}${slug}`,
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
}

async function main() {
  console.log("Gap-Analysis Phase 2 CMS seed — 8 service-area page meta updates");
  console.log("");

  for (const p of metaPayloads) {
    await upsertPageMeta(p.slug, {
      meta_title: p.meta_title,
      meta_description: p.meta_description,
      og_title: p.og_title,
      og_description: p.og_description,
    });
  }
  console.log("");
  console.log("Done.");
}

main().catch((e) => {
  console.error("Failed:", e);
  process.exit(1);
});
