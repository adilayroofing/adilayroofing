#!/usr/bin/env node
// Seed Supabase CMS for the /roofer-philadelphia pillar page.
// Usage: node scripts/seed-pillar-cms.mjs

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
const SLUG = "/roofer-philadelphia";

const payload = {
  meta_title:
    "Roofer Philadelphia — Licensed, 20+ Years, 5-Star Rated | Adilay Roofing",
  meta_description:
    "Adilay Roofing is Philadelphia's trusted roofer — licensed PA184779, 20+ years, 5-star Google rated, free estimates. Residential & commercial roofing across Philly and surrounding counties.",
  og_title:
    "Roofer Philadelphia — Licensed & Trusted Roofing Contractor | Adilay Roofing",
  og_description:
    "Philadelphia's licensed, family-owned roofer — 20+ years, PA184779, free estimates, same-day response for emergencies.",
  canonical_url: `${BASE}${SLUG}`,
};

async function main() {
  const { data: page, error: findErr } = await supabase
    .from("pages")
    .select("id")
    .eq("slug", SLUG)
    .maybeSingle();
  if (findErr) { console.error("lookup error:", findErr); process.exit(1); }
  if (!page) {
    const { error } = await supabase.from("pages").insert({ slug: SLUG, status: "published", ...payload });
    if (error) { console.error("insert failed:", error); process.exit(1); }
    console.log("✓ Inserted pages row for", SLUG);
  } else {
    const { error } = await supabase.from("pages").update(payload).eq("id", page.id);
    if (error) { console.error("update failed:", error); process.exit(1); }
    console.log("✓ Updated pages row for", SLUG);
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
