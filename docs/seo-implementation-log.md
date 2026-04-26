# SEO Implementation Log

Running record of every SEO-driven change we ship, organized by phase. The
phases follow the 90-day plan in `Adilay-Roofing-SEO-Gap-Analysis.docx`
(Weeks 1–3 money pages, Weeks 4–7 service areas, Weeks 8–12 missing services
and blog).

Earlier GSC-driven work (gutter cleaning, storm damage, leak repair, roof
inspection, soffit repair, /get-quote rewrite, /roofer-philadelphia pillar,
the 7 Phase-4 service-area pages, and the site-wide internal-link graph) is
not re-logged here — it shipped before this log existed. This log begins
with Phase 1 of the gap-analysis overhaul.

---

## Phase 1 — Money-page deep-dive (Weeks 1–3)

Branch: `seo-phase-1-money-pages`

Targets the four pages that drive the most conversion value per the gap
analysis: home, emergency roof repair, roof repair, roof replacement. Goal
is to bring each page to 1,500+ words of locally-specific content, 10+ FAQs
(15 for emergency), tightened meta, and deeper internal linking.

| Date       | Path                                  | Target keyword(s)                                                                                  | Change                                                                                                                                                                    | Phase |
|------------|---------------------------------------|----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------|
| 2026-04-24 | `src/data/services.ts` (type)         | —                                                                                                  | Added `BodySection` interface + optional `bodySections` field to `Service` so service pages can carry arbitrary long-form body copy without touching the template.         | 1A    |
| 2026-04-24 | `src/data/locations.ts` (type)        | —                                                                                                  | Added matching `LocationBodySection` + `bodySections` field to `Location` for Phase 2 service-area expansion.                                                              | 1A    |
| 2026-04-24 | `src/app/services/[slug]/page.tsx`    | —                                                                                                  | Render `bodySections` (CMS overlay → TS fallback) between BBBSeal and Benefits sections using `SafeHTML`.                                                                  | 1A    |
| 2026-04-24 | `src/app/service-areas/[slug]/page.tsx` | —                                                                                                | Same `bodySections` render block added before the Neighborhoods section.                                                                                                   | 1A    |
| 2026-04-24 | `/services/emergency-roof-repair`     | "emergency roof repair philadelphia", "24 hour roofer philadelphia", "storm damage roof philly"   | Added 5 body sections (Common Philadelphia Emergencies, Response Timeline, Tarping Process, Insurance, Neighborhoods) + 10 new FAQs (5 → 15). Internal links to service areas and related services. | 1B    |
| 2026-04-24 | `/services/roof-repair`               | "roof repair philadelphia", "roof leak repair philadelphia", "flashing repair philly"            | Added 6 body sections (Leak Repair, Flashing, Shingle, Flat-roof, Chimney/Soffit, Storm Damage) + 5 new FAQs (5 → 10). Cross-links to leak-repair, emergency, and storm-damage pages. | 1B    |
| 2026-04-24 | `/services/roof-replacement`          | "roof replacement philadelphia", "new roof philadelphia cost", "philadelphia roofing contractor" | Added 6 body sections (Process/Timeline, Materials, Tear-off vs Overlay, Warranties, Financing, Philly-specific considerations) + 5 new FAQs (5 → 10).                    | 1B    |
| 2026-04-24 | `/` (homepage)                        | "roofing contractors philadelphia", "philadelphia roofer", "best roofing companies in philadelphia" | Rewrote hero description (keyword-dense first sentence, PA184779, 5.0 rating, phone). Added ~420-word "Roofing Contractors Philadelphia Homeowners Trust" body section between financing banner and service grid — includes 15+ internal links to service and service-area pages. | 1B    |
| 2026-04-24 | `src/data/faqs.ts`                    | "best roofing companies in philadelphia", "philadelphia roofer emergency response"                | Added 2 keyword-targeted FAQs and reordered so they land in the homepage's visible `slice(0, 8)` window — both the rendered FAQ accordion and the FAQPage schema now reflect the new questions. | 1B    |
| 2026-04-24 | `scripts/seed-phase1-cms.mjs`         | —                                                                                                  | New seed script — upserts CMS meta for the 4 Phase-1 URLs (sharpened titles under 60 chars, descriptions under 155 chars) + a `structured_home` block with the new keyword-focused `heroDescription` so operators can edit via CMS. | 1C    |

### Phase 1 notes

- **CMS strategy:** Body sections for the 3 service pages live in
  `src/data/services.ts` as the authoritative source; the template falls
  through to TS when no CMS override exists. The seed script does not
  duplicate body content into CMS — only meta + homepage hero description.
  Future CMS edits for body sections can be added ad hoc via the admin UI
  or a follow-up seed once anyone actually wants to edit those fields.
- **Content guardrails:** No fabricated warranty, insurance, or
  certification facts. All claims trace back to `src/data/company.ts`
  (PA184779, 20+ years, 2,000+ projects, 30+ crew, 5.0 rating across 40+
  reviews, Fishtown HQ at 2020 Dreer St).
- **Internal linking:** Every new body section links to at least 3 related
  service or service-area pages. Homepage body section alone adds 15+
  internal links to previously under-linked pages.

### Phase 1 verification checklist (to run before PR)

- [ ] `npm run build` passes without TypeScript errors.
- [ ] Visit each Phase-1 URL in the running preview server and confirm:
      body sections render between hero and benefits; FAQ accordion shows
      the new questions; internal links resolve.
- [ ] Run Rich Results Test against each Phase-1 URL — confirm FAQPage and
      Service/RoofingContractor schema validate.
- [ ] Sitemap includes all Phase-1 URLs (no new URLs were added in Phase 1,
      so this is a sanity check, not new work).
- [ ] Word count spot-check: each service page ≥1,500 words; homepage total
      body copy ≥900 words.
- [ ] Lighthouse SEO score ≥95 on homepage + 3 services.
- [ ] `node scripts/seed-phase1-cms.mjs` runs cleanly against staging
      Supabase (idempotent — can be re-run).

---

## Phase 2 — Service-area pages (Weeks 4–7)

Branch: `seo-phase-2-service-areas`

Targets the 8 highest-value service-area pages per gap analysis. Goal is
~1,200+ words of locally-specific body copy per page, expanded
location-specific FAQs, deeper neighborhood-level internal linking, and
sharpened meta. Body sections live authoritatively in
`src/data/locations.ts`; the template falls through to TS when no CMS
override exists, identical to the Phase 1 services pattern.

Note on scope: the original gap-analysis target list included
`chestnut-hill`, which doesn't exist as a route in `locations.ts`.
Swapped for `germantown` (already exists; same slate / historic premium
profile) so all 8 Phase 2 targets ship as edits to existing routes — no
new routes, no nav wiring needed.

| Date       | Path                                  | Target keyword(s)                                                                  | Change                                                                                                                                                              | Phase |
|------------|---------------------------------------|------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------|
| 2026-04-26 | `/service-areas/philadelphia`         | "roofer philadelphia", "philadelphia roofing contractor", "rowhouse roof philly"  | Added 5 body sections (housing types, climate, permits/L&I, emergency response by neighborhood, neighborhood link block) + 3 new FAQs. ~1,500 words new copy.       | 2     |
| 2026-04-26 | `/service-areas/fishtown`             | "roofer fishtown", "fishtown roof deck", "fishtown rowhouse roofer"               | Added 4 body sections (HQ proximity, two Fishtown housing eras, roof decks, pre-listing replacement) + 4 new FAQs. ~1,200 words new copy.                          | 2     |
| 2026-04-26 | `/service-areas/northern-liberties`   | "roofer northern liberties", "nolibs roof deck", "pilot house roof leak"          | Added 4 body sections (two roof eras, pilot houses & roof decks, green roofs, response time) + 4 new FAQs. ~1,300 words new copy.                                  | 2     |
| 2026-04-26 | `/service-areas/south-philadelphia`   | "roofer south philly", "south philly rowhouse roof", "south philadelphia flat roof" | Added 4 body sections (5 typical failure points, roof decks, tight-block logistics, neighborhoods served) + 4 new FAQs. ~1,400 words new copy.                    | 2     |
| 2026-04-26 | `/service-areas/germantown`           | "roofer germantown", "germantown slate roof", "germantown historic home roofer"   | Added 4 body sections (slate restoration vs replacement, three replacement tiers, historic-district process, tree canopy/moss/gutters) + 4 new FAQs. ~1,500 words. | 2     |
| 2026-04-26 | `/service-areas/manayunk`             | "roofer manayunk", "manayunk steep roof", "manayunk hillside gutters"             | Added 4 body sections (steep-slope methods, oversized gutters, slate/metal premium options, Main Street logistics) + 4 new FAQs. ~1,200 words new copy.            | 2     |
| 2026-04-26 | `/service-areas/bucks-county`         | "roofer bucks county", "bucks county roof replacement cost", "levittown roof"     | Added 4 body sections (lower/central/upper Bucks markets, Levittown specifics, storm response, communities) + 4 new FAQs. ~1,300 words new copy.                   | 2     |
| 2026-04-26 | `/service-areas/montgomery-county`    | "roofer montgomery county", "lower merion slate", "montco hoa roof rules"         | Added 4 body sections (housing types, HOAs/historic districts, storm response, communities) + 4 new FAQs. ~1,300 words new copy.                                   | 2     |
| 2026-04-26 | `scripts/seed-gap-phase2-cms.mjs`     | —                                                                                  | New seed script — upserts sharpened meta (titles ≤62 chars, descriptions ≤155 chars) for the 8 Phase 2 URLs. Filename uses `gap-phase2-` to disambiguate from the legacy GSC-driven `seed-phase2-cms.mjs`. |  2C   |

### Phase 2 notes

- **Internal-linking density:** Every Phase 2 page now contains 5–15
  internal links to other service-area pages and core services. The
  Philadelphia pillar links to 13 neighborhood pages; Fishtown / NoLibs
  / South Philly each link to the pillar plus 4 nearby neighborhoods;
  county pages link to 7–11 community pages within the county.
- **Content guardrails:** All claims trace to `src/data/company.ts` —
  PA184779, 20+ years, 2,000+ projects, 30-person crew, Fishtown HQ at
  2020 Dreer Street. No fabricated warranty/insurance/certification
  claims. Local details (Levittown housing eras, Lower Merion HARB,
  Cheltenham historic districts, PHC review process for Germantown,
  Fishtown / Lower Kensington Historic District) are matters of public
  record.
- **CMS strategy:** Same as Phase 1 — body sections authoritative in
  TS, CMS overlay handles meta only. Operators can push body sections
  to CMS later via the admin UI when a specific page needs ad-hoc edits.

### Phase 2 verification checklist (run before merge)

- [ ] `npm run build` passes without TypeScript errors.
- [ ] Visit each of the 8 Phase 2 URLs in the running preview server and
      confirm: body sections render between intro and neighborhoods;
      internal links resolve; FAQ accordion shows new questions.
- [ ] Run Rich Results Test against each of the 8 URLs — confirm
      FAQPage and Service/RoofingContractor schema validate.
- [ ] Word-count spot-check: each of the 8 service-area pages should be
      ≥1,200 words of body copy.
- [ ] Lighthouse SEO score ≥95 on philadelphia + fishtown +
      bucks-county at minimum.
- [ ] `node scripts/seed-gap-phase2-cms.mjs` runs cleanly against
      staging Supabase (idempotent — can be re-run).

---

## Phase 3 — Missing services + blog (Weeks 8–12)

_Not yet started._ Planned targets: audit services.ts for gaps per gap
analysis (e.g., ice dam removal, skylight repair, roof ventilation); seed a
markdown-based blog with 4–6 Philadelphia-specific how-to articles linked
from the homepage and pillar.
