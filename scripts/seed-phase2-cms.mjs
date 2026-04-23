#!/usr/bin/env node
// Seed Supabase CMS with Phase 2 service pages: meta_title, meta_description,
// OG, canonical. Upserts pages rows for 4 new services + polishes gutter-cleaning.
// Usage: node scripts/seed-phase2-cms.mjs

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

const updates = [
  {
    slug: "/services/storm-damage-roof-repair",
    meta_title:
      "Storm Damage Roof Repair Philadelphia PA | Insurance Claims | Adilay Roofing",
    meta_description:
      "Storm damage roof repair in Philadelphia PA. Wind, hail, fallen-tree damage — we document, repair, and help with insurance claims. Same-day response. Call (888) 823-4766.",
    og_title:
      "Storm Damage Roof Repair Philadelphia — Insurance Claim Experts | Adilay Roofing",
    og_description:
      "Same-day response for wind, hail, and storm damage in Philadelphia. Licensed PA contractor, 20+ years, insurance-claim documentation included.",
  },
  {
    slug: "/services/roof-leak-repair",
    meta_title:
      "Roof Leak Repair Philadelphia | Same-Day Leak Fix | Adilay Roofing",
    meta_description:
      "Roof leak repair Philadelphia homeowners trust. Same-day leak detection and fix. All roof types — shingle, flat rubber, metal. Licensed PA184779. Call (888) 823-4766.",
    og_title:
      "Roof Leak Repair Philadelphia — Same-Day Detection & Fix | Adilay Roofing",
    og_description:
      "Active roof leak? Adilay Roofing dispatches licensed Philadelphia crews same-day to diagnose, trace, and fix — not patch — your roof leak.",
  },
  {
    slug: "/services/roof-inspection",
    meta_title:
      "Free Roof Inspection Philadelphia | Pre-Purchase & Storm | Adilay Roofing",
    meta_description:
      "Free roof inspection in Philadelphia — pre-purchase, post-storm, or annual. Licensed PA inspector (PA184779), written report with photos. Call (888) 823-4766.",
    og_title:
      "Free Roof Inspection Philadelphia — Written Report & Photos | Adilay Roofing",
    og_description:
      "Professional roof inspection from a licensed Philadelphia contractor. Pre-purchase, post-storm, or annual — free written report with photos.",
  },
  {
    slug: "/services/soffit-repair",
    meta_title:
      "Soffit Repair Philadelphia | Rotted Soffit & Fascia | Adilay Roofing",
    meta_description:
      "Soffit repair and replacement in Philadelphia PA. Rotted, damaged, or animal-chewed soffit fixed fast. Fascia and ventilation included. Licensed PA184779.",
    og_title:
      "Soffit Repair Philadelphia — Rotted Soffit & Fascia Specialists | Adilay Roofing",
    og_description:
      "Philadelphia soffit repair done right — we diagnose the root cause (water, ventilation, or animal damage), not just patch the surface. Licensed PA contractor.",
  },
  {
    slug: "/services/gutter-cleaning",
    meta_title:
      "Gutter Cleaning Philadelphia PA | Affordable & Same-Week | Adilay Roofing",
    meta_description:
      "Gutter cleaning Philadelphia PA. Hand debris removal, downspout flushing, inspection, before/after photos. Affordable pricing, same-week scheduling. Call (888) 823-4766.",
    og_title:
      "Gutter Cleaning Philadelphia PA — Affordable, Same-Week Scheduling | Adilay Roofing",
    og_description:
      "Professional gutter cleaning for Philadelphia homes. Hand removal (no leaf blowers), downspout flushing, inspection, before/after photos. Licensed PA184779.",
  },
];

async function main() {
  for (const u of updates) {
    const canonical_url = `${BASE}${u.slug}`;
    const { data: page, error: findErr } = await supabase
      .from("pages")
      .select("id, status")
      .eq("slug", u.slug)
      .maybeSingle();
    if (findErr) {
      console.error(u.slug, "lookup error:", findErr);
      continue;
    }
    const payload = {
      meta_title: u.meta_title,
      meta_description: u.meta_description,
      og_title: u.og_title,
      og_description: u.og_description,
      canonical_url,
    };
    if (!page) {
      const { error: insErr } = await supabase
        .from("pages")
        .insert({ slug: u.slug, status: "published", ...payload });
      if (insErr) { console.error(u.slug, "insert failed:", insErr); continue; }
      console.log("✓ Inserted pages row for", u.slug);
    } else {
      const { error: upErr } = await supabase.from("pages").update(payload).eq("id", page.id);
      if (upErr) { console.error(u.slug, "update failed:", upErr); continue; }
      console.log("✓ Updated pages row for", u.slug);
    }
  }
  console.log("\nDone. ISR revalidate <=60s.");
}

main().catch((e) => { console.error(e); process.exit(1); });
