#!/usr/bin/env node
// Align Supabase CMS meta_title + meta_description for Phase 1 service pages
// with the optimized copy. Run after scripts/update-get-quote-cms.mjs.
// Usage: node scripts/update-service-meta-cms.mjs

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
  console.error("Missing Supabase env vars");
  process.exit(1);
}
const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

const BASE = "https://www.adilayroofing.com";

const updates = [
  {
    slug: "/services/roof-repair",
    meta_title:
      "Roof Repair Philadelphia PA — Free Same-Day Estimates | Adilay Roofing",
    meta_description:
      "Fast roof repair in Philadelphia PA. Same-day response for leaks, storm damage & missing shingles. Free roof repair estimates — no obligation. Call (888) 823-4766.",
    og_title:
      "Roof Repair Philadelphia PA — Free Same-Day Estimates | Adilay Roofing",
    og_description:
      "Licensed Philadelphia roof repair contractor. Same-day response, free written estimates, 20+ years. Leaks, storm damage, flashing, missing shingles.",
    canonical_url: `${BASE}/services/roof-repair`,
  },
  {
    slug: "/services/emergency-roof-repair",
    meta_title:
      "24/7 Emergency Roof Repair Philadelphia PA | Same-Day Response | Adilay Roofing",
    meta_description:
      "24/7 emergency roof repair in Philadelphia PA. Same-day tarping, active-leak stops, storm damage response. Licensed contractor, 20+ years. Call (888) 823-4766.",
    og_title:
      "24/7 Emergency Roof Repair Philadelphia — Same-Day Response | Adilay Roofing",
    og_description:
      "Active roof leak? Storm damage? Adilay Roofing dispatches licensed Philadelphia crews 24/7 for same-day tarping and emergency roof repair.",
    canonical_url: `${BASE}/services/emergency-roof-repair`,
  },
  {
    slug: "/services/asphalt-shingle-roofing",
    meta_title:
      "Asphalt Shingle Roofing Philadelphia PA | GAF & CertainTeed Installer",
    meta_description:
      "Asphalt shingle roof installation in Philadelphia PA. Certified GAF, CertainTeed & Owens Corning installer. Free estimates, 20+ years. Call (888) 823-4766.",
    og_title:
      "Asphalt Shingle Roofing Philadelphia — GAF & CertainTeed Installer | Adilay Roofing",
    og_description:
      "Philadelphia's trusted asphalt shingle roofing contractor — 3-tab and architectural shingles from GAF, CertainTeed, and Owens Corning. Free estimates, 20+ years.",
    canonical_url: `${BASE}/services/asphalt-shingle-roofing`,
  },
];

async function main() {
  for (const u of updates) {
    const { data: page, error: findErr } = await supabase
      .from("pages")
      .select("id, status")
      .eq("slug", u.slug)
      .maybeSingle();
    if (findErr) {
      console.error(u.slug, "lookup error:", findErr);
      continue;
    }
    if (!page) {
      const { error: insErr } = await supabase.from("pages").insert({
        slug: u.slug,
        status: "published",
        meta_title: u.meta_title,
        meta_description: u.meta_description,
        og_title: u.og_title,
        og_description: u.og_description,
        canonical_url: u.canonical_url,
      });
      if (insErr) {
        console.error(u.slug, "insert failed:", insErr);
        continue;
      }
      console.log("✓ Inserted pages row for", u.slug);
    } else {
      const { error: upErr } = await supabase
        .from("pages")
        .update({
          meta_title: u.meta_title,
          meta_description: u.meta_description,
          og_title: u.og_title,
          og_description: u.og_description,
          canonical_url: u.canonical_url,
        })
        .eq("id", page.id);
      if (upErr) {
        console.error(u.slug, "update failed:", upErr);
        continue;
      }
      console.log("✓ Updated pages row for", u.slug);
    }
  }
  console.log("\nDone. Wait up to 60s for ISR or revalidate.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
