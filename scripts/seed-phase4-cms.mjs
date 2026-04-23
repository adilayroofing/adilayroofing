#!/usr/bin/env node
// Seed Supabase CMS for Phase 4.
//
// - Updates the existing /service-areas/langhorne CMS row so the polished
//   locations.ts content actually surfaces (the CMS row overrides the
//   hardcoded fallback via getStructuredContent / buildMetadataFromSEO).
// - Seeds meta rows for the 7 new service-area pages so future edits can
//   go through CMS. New pages already render fine from locations.ts
//   fallback, so this is idempotent and non-blocking.
//
// Usage: node scripts/seed-phase4-cms.mjs

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

// -----------------------------------------------------------------------
// 1. Langhorne polish — update pages meta + structured_location block
// -----------------------------------------------------------------------
const LANGHORNE_SLUG = "/service-areas/langhorne";
const langhorneMeta = {
  meta_title: "Roofer Langhorne PA — Shingle, Flat Roof & Emergency Repair",
  meta_description:
    "Langhorne roofing experts. Shingle replacement, flat roof, storm damage & emergency repair for Middletown Twp homes. Licensed PA184779. Free estimates — (888) 823-4766.",
  og_title: "Roofer Langhorne PA — Shingle, Flat Roof & Emergency Repair | Adilay Roofing",
  og_description:
    "Langhorne PA roofing by your trusted local contractor. Licensed PA184779, 20+ years, free on-site estimates. Call (888) 823-4766.",
  canonical_url: `${BASE}/service-areas/langhorne`,
};

const langhorneStructured = {
  heroTitle: "Langhorne PA Roofing Services",
  heroSubtitle:
    "Professional roofing services for Langhorne Borough, Middletown Township, and lower Bucks County. Licensed PA184779, 20+ years of experience.",
  intro:
    "Langhorne is a historic borough at the heart of lower Bucks County, surrounded by Middletown Township and bordered by the Route 1 and I-95 corridors that make it one of the most convenient suburban communities to reach from both Philadelphia and central New Jersey. The borough itself covers less than half a square mile but sits within a much larger service area that includes Oxford Valley, Middletown Township, Parkland, Parkland Manor, and the communities around Sesame Place and Oxford Valley Mall. Langhorne's housing stock is remarkably diverse — beautifully preserved Victorian and early-American homes line the streets of the historic borough along Maple, Bellevue, and Pine avenues; mid-century colonials, split-levels, and ranchers fill the broader Middletown Township; and newer developments continue to add construction along the Route 413 and Langhorne-Yardley Road corridors. Most Langhorne-area homes have pitched asphalt shingle roofs, though the older borough homes sometimes feature slate, cedar shake, or complex multi-level shingle systems with dormers and steep valleys. Adilay Roofing has been serving Langhorne and the surrounding Middletown Township for years, handling full roof replacements, shingle repairs, storm-damage claims, gutter installations, and emergency leak response. Our Kensington headquarters is approximately 30 minutes away via I-95, making us one of the most responsive roofers for the Langhorne area.",
  localContext:
    "Langhorne-area roofing projects fall into two distinct categories. The historic borough homes often require meticulous craftsmanship — matching aging shingles, preserving original flashing details around chimneys and dormers, and working within Langhorne Borough Historic District guidelines where applicable. By contrast, the broader Middletown Township housing stock generally allows for more straightforward architectural shingle replacements with modern warranty-backed systems. The area's mature tree canopy — particularly in the older borough blocks and the wooded developments near Middletown Country Club — creates heavy gutter debris and algae growth on shaded north-facing slopes, so we often recommend algae-resistant shingles and leaf-guard gutter systems. Middletown Township's building department issues permits for full replacements; Langhorne Borough has its own process. We handle all paperwork and inspections for both municipalities.",
  neighborhoods: [
    "Langhorne Borough",
    "Middletown Township",
    "Oxford Valley",
    "Parkland",
    "Penndel",
  ],
  zipCodes: ["19047", "19053"],
  faq: [
    {
      question: "Do you serve Langhorne Borough and Middletown Township?",
      answer:
        "Yes. Adilay Roofing serves both Langhorne Borough and the surrounding Middletown Township, including Oxford Valley, Parkland, Parkland Manor, and Penndel. Each municipality has its own permitting process, and we handle both. Licensed PA184779 — call (888) 823-4766 for a free estimate anywhere in the Langhorne area.",
    },
    {
      question: "How much does a roof replacement cost in Langhorne?",
      answer:
        "Langhorne-area roof replacements typically range from $8,000 to $16,000 for standard single-family homes, with larger or more complex Victorian and multi-level homes running $15,000 to $25,000+. Premium materials like cedar shake or synthetic slate add to that range. We provide free on-site estimates with transparent, itemized pricing. Call (888) 823-4766.",
    },
    {
      question: "Can you handle emergency roof repairs in Langhorne?",
      answer:
        "Yes. We respond to Langhorne emergency calls typically within 2–4 hours, providing same-day tarping and leak stabilization to prevent further interior damage. Our I-95 proximity means we're among the fastest responders in lower Bucks County. Call (888) 823-4766 for 24/7 emergency service.",
    },
    {
      question: "Do you work on historic homes in Langhorne Borough?",
      answer:
        "Yes. Langhorne Borough has a notable collection of Victorian and early-American homes, some within the borough's historic district. We're experienced with historic-sensitive roofing — matching period-appropriate materials, preserving original details, and working within any historic district review requirements. Call (888) 823-4766 for an on-site assessment.",
    },
  ],
};

// -----------------------------------------------------------------------
// 2. New service-area pages — seed meta rows for future CMS edits
// -----------------------------------------------------------------------
const newPages = [
  {
    slug: "/service-areas/germantown",
    meta_title: "Roofer Germantown Philadelphia — Historic Home Roofing Experts",
    meta_description:
      "Germantown roofing by Adilay Roofing. Slate, shingle & historic home specialists along Germantown Ave. Licensed PA184779. Free estimates — (888) 823-4766.",
    og_title: "Roofer Germantown Philadelphia — Historic Home Roofing Experts | Adilay Roofing",
    og_description:
      "Germantown's historic slate & shingle roof specialists. Licensed PA184779, 20+ years, same-day emergency response. Call (888) 823-4766.",
  },
  {
    slug: "/service-areas/old-city",
    meta_title: "Roofer Old City Philadelphia — Historic Rowhouse & Loft Roofing",
    meta_description:
      "Old City Philadelphia roofing experts. Flat roof, membrane & historic rowhouse specialists near Independence Mall. Licensed PA184779. Free estimates.",
    og_title: "Roofer Old City Philadelphia — Historic Rowhouse & Loft Roofing | Adilay Roofing",
    og_description:
      "Old City Philadelphia flat roof, loft & rowhouse roofing experts. Licensed PA184779. Call (888) 823-4766 for a free estimate.",
  },
  {
    slug: "/service-areas/northern-liberties",
    meta_title: "Roofer Northern Liberties Philadelphia — Flat Roof & Deck Specialists",
    meta_description:
      "Northern Liberties roofing from Adilay Roofing. Flat roof, roof deck, new construction & rowhouse experts. Licensed PA184779. Free estimates — (888) 823-4766.",
    og_title: "Roofer Northern Liberties Philadelphia — Flat Roof & Deck Specialists | Adilay Roofing",
    og_description:
      "Northern Liberties flat roof & roof deck waterproofing experts. Licensed PA184779, 20+ years. Call (888) 823-4766.",
  },
  {
    slug: "/service-areas/conshohocken",
    meta_title: "Roofer Conshohocken PA — Roof Replacement & Repair",
    meta_description:
      "Conshohocken roofing by Adilay Roofing. Shingle replacement, flat roof, storm repair. Licensed PA184779, 20+ yrs exp. Free estimates — (888) 823-4766.",
    og_title: "Roofer Conshohocken PA — Roof Replacement & Repair | Adilay Roofing",
    og_description:
      "Conshohocken roofing contractor. Licensed PA184779, 20+ years, free on-site estimates. Call (888) 823-4766.",
  },
  {
    slug: "/service-areas/bala-cynwyd",
    meta_title: "Roofer Bala Cynwyd PA — Main Line Roof Replacement & Repair",
    meta_description:
      "Bala Cynwyd roofing by Adilay Roofing. Slate, cedar, shingle specialists for Main Line homes. Licensed PA184779. Free estimates — call (888) 823-4766.",
    og_title: "Roofer Bala Cynwyd PA — Main Line Roof Replacement & Repair | Adilay Roofing",
    og_description:
      "Main Line roofing experts serving Bala Cynwyd and surrounding communities. Slate, cedar & premium shingle specialists. Call (888) 823-4766.",
  },
  {
    slug: "/service-areas/chester",
    meta_title: "Roofer Chester PA — Residential & Commercial Roof Replacement",
    meta_description:
      "Chester PA roofing by Adilay Roofing. Residential, commercial & flat roof repair along the Delaware River. Licensed PA184779. Free estimates — (888) 823-4766.",
    og_title: "Roofer Chester PA — Residential & Commercial Roof Replacement | Adilay Roofing",
    og_description:
      "Chester PA residential & commercial roofing. Licensed PA184779, 20+ years, free estimates. Call (888) 823-4766.",
  },
  {
    slug: "/service-areas/trenton",
    meta_title: "Roofer Trenton NJ — Roof Replacement & Repair",
    meta_description:
      "Trenton NJ roofing by Adilay Roofing. Shingle, flat roof & rowhouse specialists across Mercer County. Licensed & insured. Free estimates — (888) 823-4766.",
    og_title: "Roofer Trenton NJ — Roof Replacement & Repair | Adilay Roofing",
    og_description:
      "Trenton NJ & Mercer County roofing experts. Licensed & insured, 20+ years of experience. Call (888) 823-4766 for a free estimate.",
  },
];

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
  return existing?.id;
}

async function upsertStructuredLocation(slug, structured) {
  // Look up the page row for the FK
  const { data: page, error: pageErr } = await supabase
    .from("pages")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (pageErr) throw pageErr;
  if (!page) throw new Error(`No pages row for ${slug} — upsert meta first`);

  const { data: existing, error: findErr } = await supabase
    .from("content_blocks")
    .select("id")
    .eq("page_id", page.id)
    .eq("block_type", "structured_location")
    .maybeSingle();
  if (findErr) throw findErr;

  if (!existing) {
    const { error } = await supabase.from("content_blocks").insert({
      page_id: page.id,
      block_type: "structured_location",
      content: structured,
    });
    if (error) throw error;
    console.log(`  + inserted structured_location for ${slug}`);
  } else {
    const { error } = await supabase
      .from("content_blocks")
      .update({ content: structured })
      .eq("id", existing.id);
    if (error) throw error;
    console.log(`  ✓ updated structured_location for ${slug}`);
  }
}

async function main() {
  console.log("Phase 4 CMS seed — Langhorne + 7 new service-areas");
  console.log("");

  console.log("1. Langhorne polish");
  await upsertPageMeta(LANGHORNE_SLUG, langhorneMeta);
  await upsertStructuredLocation(LANGHORNE_SLUG, langhorneStructured);
  console.log("");

  console.log("2. New service-area meta (7 pages)");
  for (const p of newPages) {
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
