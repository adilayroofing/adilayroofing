# BBB Compliance — Code Change Instructions

Every change below fixes a specific BBB Code of Advertising violation. Changes are ordered by priority (HIGH first).

---

## HIGH PRIORITY — Must Fix Before BBB Re-Review

### Change 1: Layout Default Title Tag

```
FILE: src/app/layout.tsx
LOCATION: Line 33 (metadata.title.default)
CURRENT: "Roofer Philadelphia | #1 Roofing Contractor — Adilay Roofing"
REPLACE WITH: "Roofer Philadelphia | Trusted Roofing Contractor — Adilay Roofing"
REASON: Section 28 — "#1" is an objective superlative requiring substantiation. "Trusted" is subjective puffery (Section 29), no proof needed.
SEO NOTE: Keeps "Roofer Philadelphia" and "Roofing Contractor" keywords. Title stays under 60 chars. Brand name preserved.
```

### Change 2: Layout Default Meta Description

```
FILE: src/app/layout.tsx
LOCATION: Line 36 (metadata.description)
CURRENT: "Adilay Roofing — Philadelphia's top-rated roofer with 20+ years experience. Roof replacement, repair, flat roofing, siding & windows. Licensed PA184779, insured. 5-star rated, 2,080+ projects. Free estimates — (888) 823-4766."
REPLACE WITH: "Adilay Roofing — Philadelphia's trusted roofer with 20+ years experience. Roof replacement, repair, flat roofing, siding & windows. Licensed PA184779, insured. 5-star rated on Google, 2,080+ projects. Free estimates — (888) 823-4766."
REASON: Section 28 — "top-rated" implies a provable ranking. "Trusted" is puffery. Also qualified "5-star rated" with "on Google" for accuracy.
SEO NOTE: All target keywords preserved. Description stays under 155 chars.
```

### Change 3: Layout Open Graph Title

```
FILE: src/app/layout.tsx
LOCATION: Line 73 (openGraph.title)
CURRENT: "Adilay Roofing | #1 Roofing Contractor in Philadelphia, PA"
REPLACE WITH: "Adilay Roofing | Trusted Roofing Contractor in Philadelphia, PA"
REASON: Section 28 — Remove "#1" objective superlative.
SEO NOTE: Keywords preserved.
```

### Change 4: Homepage Fallback Title

```
FILE: src/app/page.tsx
LOCATION: Line 51 (title.absolute in fallback metadata)
CURRENT: "Roofer Philadelphia | Best Roofing Contractor — Adilay Roofing"
REPLACE WITH: "Roofer Philadelphia | Trusted Roofing Contractor — Adilay Roofing"
REASON: Section 28 — "Best" is an objective superlative when used as a definitive claim.
SEO NOTE: Keywords preserved.
```

### Change 5: Homepage Fallback Meta Description

```
FILE: src/app/page.tsx
LOCATION: Line 54 (description in fallback metadata)
CURRENT: "Looking for a roofer in Philadelphia? Adilay Roofing is the top-rated roofing contractor with 20+ years experience, 2,080+ projects & 5-star reviews."
REPLACE WITH: "Looking for a roofer in Philadelphia? Adilay Roofing is a trusted roofing contractor with 20+ years experience, 2,080+ projects & 5-star Google reviews."
REASON: Section 28 — "top-rated" removed, "5-star" qualified with "Google".
SEO NOTE: Keywords preserved.
```

### Change 6: Homepage Fallback OG Title

```
FILE: src/app/page.tsx
LOCATION: Line 75 (openGraph.title in fallback metadata)
CURRENT: "Adilay Roofing | #1 Roofing Contractor in Philadelphia, PA"
REPLACE WITH: "Adilay Roofing | Trusted Roofing Contractor in Philadelphia, PA"
REASON: Section 28 — Remove "#1".
SEO NOTE: Keywords preserved.
```

### Change 7: Homepage Hero Headline Fallback

```
FILE: src/app/page.tsx
LOCATION: Line 158 (heroHeadlineWhite fallback)
CURRENT: "Philadelphia's #1 Rated"
REPLACE WITH: "Philadelphia's Trusted"
REASON: Section 28 — THE violation BBB flagged. "#1 Rated" is an objective superlative.
SEO NOTE: H1 still contains "Philadelphia's" — primary geo keyword preserved. The second line "Roofing Contractor" remains unchanged.
```

### Change 8: Homepage Hero Description Fallback

```
FILE: src/app/page.tsx
LOCATION: Line 162 (heroDescription fallback)
CURRENT: "Looking for the best roofer in Philadelphia? From roof replacement and roof repair to emergency roofing services, Adilay Roofing has served Philadelphia and surrounding areas for over 20 years. Licensed, insured, 5-star rated. Get a free estimate today."
REPLACE WITH: "Looking for a reliable roofer in Philadelphia? From roof replacement and roof repair to emergency roofing services, Adilay Roofing has served Philadelphia and surrounding areas for over 20 years. Licensed, insured, 5-star rated on Google. Get a free estimate today."
REASON: Section 28 — "best roofer" is an objective superlative. "reliable" is puffery. Qualified "5-star rated" with "on Google".
SEO NOTE: Keeps "roofer in Philadelphia", "roof replacement", "roof repair" keywords.
```

### Change 9: JSON-LD Structured Data Description

```
FILE: src/components/JsonLd.tsx
LOCATION: Line 14 (description property)
CURRENT: "Philadelphia's #1 rated roofing contractor. Roof replacement, repair, flat roofing, shingles, siding, windows, gutters, and emergency services. Licensed, insured, 20+ years experience. Free estimates."
REPLACE WITH: "Philadelphia's trusted roofing contractor. Roof replacement, repair, flat roofing, shingles, siding, windows, gutters, and emergency services. Licensed, insured, 20+ years experience. Free estimates."
REASON: Section 28 — "#1 rated" in structured data is just as visible to search engines as on-page text. BBB reviewers may inspect page source.
SEO NOTE: Schema description preserved with all service keywords.
```

### Change 10: Seed Data — Homepage Title

```
FILE: src/app/api/admin/seed-pages/route.ts
LOCATION: Line 32 (homepage seed title)
CURRENT: "Roofer Philadelphia | #1 Roofing Contractor — Adilay Roofing"
REPLACE WITH: "Roofer Philadelphia | Trusted Roofing Contractor — Adilay Roofing"
REASON: Section 28 — Seed data populates the CMS database. Must match corrected values.
SEO NOTE: Keywords preserved.
```

### Change 11: Seed Data — Homepage Description

```
FILE: src/app/api/admin/seed-pages/route.ts
LOCATION: Line 33 (homepage seed description)
CURRENT: "Adilay Roofing — Philadelphia's top-rated roofer with 20+ years experience. Roof replacement, repair, flat roofing, siding & windows. Licensed PA184779. Free estimates — (888) 823-4766."
REPLACE WITH: "Adilay Roofing — Philadelphia's trusted roofer with 20+ years experience. Roof replacement, repair, flat roofing, siding & windows. Licensed PA184779. Free estimates — (888) 823-4766."
REASON: Section 28 — "top-rated" removed from seed data.
SEO NOTE: Keywords preserved.
```

### Change 12: Philadelphia Location Meta Description

```
FILE: src/data/locations.ts
LOCATION: Line 33 (Philadelphia metaDescription)
CURRENT: "Top-rated Philadelphia roofer. Roof replacement, repair, flat roofing for rowhouses & more. Licensed PA184779, 20+ yrs exp. Free estimates — (888) 823-4766."
REPLACE WITH: "Trusted Philadelphia roofer. Roof replacement, repair, flat roofing for rowhouses & more. Licensed PA184779, 20+ yrs exp. Free estimates — (888) 823-4766."
REASON: Section 28 — "Top-rated" is an objective superlative.
SEO NOTE: Keywords preserved.
```

---

## MEDIUM PRIORITY — Should Fix

### Change 13: "Why Choose Us" Materials Claim

```
FILE: src/app/page.tsx
LOCATION: Line 119 (fallbackWhyChooseUs[1].description)
CURRENT: "We use top-rated materials from trusted manufacturers for lasting results."
REPLACE WITH: "We use quality materials from trusted manufacturers for lasting results."
REASON: Section 28 — "top-rated materials" could be read as an objective claim about material ratings. "Quality" is puffery.
SEO NOTE: No keyword impact.
```

### Change 14: Terms Page — Add CC Surcharge Disclosure

```
FILE: src/app/terms/page.tsx
LOCATION: Line 118 (after the credit card payment mention)
CURRENT: "We accept checks, credit cards, and electronic payment methods."
REPLACE WITH: "We accept checks, credit cards (a 4% processing surcharge applies to credit card payments), and electronic payment methods."
REASON: Section 17 — Extra charges must be conspicuously disclosed. The 4% CC surcharge is a material extra charge.
SEO NOTE: No SEO impact — Terms page.
```

### Change 15: JSON-LD Review Count Consistency

```
FILE: src/components/JsonLd.tsx
LOCATION: Line 91 (aggregateRating.reviewCount)
CURRENT: "41"
REPLACE WITH: Update to match the actual current Google review count. If it's 39, use "39". If it's 41, verify the TestimonialsSection matches.
REASON: Section 34 — Claimed results must be accurate. The testimonials component shows a different count. These must be consistent.
SEO NOTE: Accurate review count improves rich snippet trustworthiness.
```

### Change 16: Footer Hours vs Emergency Service Clarification

```
FILE: src/data/company.ts
LOCATION: Lines 35-37 (hours object)
CURRENT:
  hours: {
    weekdays: "24 Hours",
    saturday: "Closed",
    sunday: "24 Hours",
  },
REPLACE WITH:
  hours: {
    weekdays: "24 Hours",
    saturday: "Closed",
    sunday: "24 Hours",
  },
NOTE: Verify with Nissim — is the business truly closed Saturday for all calls, or just non-emergency? If Saturday emergency calls ARE answered, consider changing to "Saturday: Emergency Only" or clarify "Emergency service available 7 days a week" in the footer. The "24/7 Emergency Service" badge combined with "Saturday: Closed" could be seen as contradictory (Section 1 — misleading by implication).
```

### Change 17: Warranty FAQ — Add Pointer to Terms

```
FILE: src/data/faqs.ts
LOCATION: Line 40 (warranty FAQ answer)
CURRENT: "We stand behind our work with a workmanship warranty on every project, in addition to manufacturer warranties on materials. The specific terms depend on the project and materials chosen — we'll cover all warranty details in your proposal."
REPLACE WITH: "We stand behind our work with a workmanship warranty on every project, in addition to manufacturer warranties on materials. The specific terms depend on the project and materials chosen — we cover all warranty details in your project proposal before any work begins. See our Terms of Service for more information."
REASON: Section 20 — Warranty claims should direct consumers to full warranty details. Adding "before any work begins" satisfies the BBB requirement.
SEO NOTE: No SEO impact.
```

---

## LOW PRIORITY — Minor Risk

### Change 18: Keywords Arrays — Replace "best" with "trusted"

```
FILE: src/app/layout.tsx
LOCATION: Line 42 (keywords array)
CURRENT: "best roofer Philadelphia"
REPLACE WITH: "trusted roofer Philadelphia"
REASON: Section 28 — While keywords meta tags have minimal SEO impact today, BBB reviewers inspecting source code could flag this.
SEO NOTE: Keywords meta tag has negligible ranking impact. Change is low-risk.
```

```
FILE: src/app/page.tsx
LOCATION: Lines 33, 58 (keywords arrays)
CURRENT: "best roofer Philadelphia"
REPLACE WITH: "trusted roofer Philadelphia"
REASON: Same as above.
```

```
FILE: src/app/service-areas/[slug]/page.tsx
LOCATION: Lines 51, 68 (keywords arrays)
CURRENT: `best roofer ${location.name} ${location.state}`
REPLACE WITH: `trusted roofer ${location.name} ${location.state}`
REASON: Same as above.
```

```
FILE: src/app/services/[slug]/page.tsx
LOCATION: Lines 46, 64 (keywords arrays)
CURRENT: `best ${service.title.toLowerCase()} Philadelphia`
REPLACE WITH: `trusted ${service.title.toLowerCase()} Philadelphia`
REASON: Same as above.
```

### Change 19: Qualify "5-star rated" Throughout

Wherever "5-star rated" appears without qualification, add "on Google":

```
FILE: src/app/services/[slug]/page.tsx
LOCATION: Line 58 (fallback meta description template)
CURRENT: "Licensed PA184779, 5-star rated."
REPLACE WITH: "Licensed PA184779, 5-star rated on Google."
REASON: Section 34 — Claimed results should cite the source. The 5.0 rating comes specifically from Google Reviews.
SEO NOTE: Adds specificity — may actually improve click-through rate.
```

---

## IMPORTANT: CMS/Database Check

The site uses a Supabase CMS that can override hardcoded metadata via `getPageSEO()` and `getStructuredContent()`. After making the code changes above:

1. **Run the seed script** to update the CMS database with corrected titles/descriptions
2. **Check the Supabase `pages` table** directly — if any pages have already been manually edited in the admin panel with "#1" or "top-rated" claims, those database values will override the code fixes
3. **Check the Supabase `page_content` table** — if structured content (hero headlines, descriptions) has been saved via the admin panel, those will override the fallback values in the code

**Action Required:** After deploying code changes, also update any CMS-stored content that contains "#1", "top-rated", "best roofer", or "Best Roofing Contractor" claims. Use the admin panel at /admin to review and update all pages.

---

## Numerical Claims — Owner Verification Required

The following claims appear throughout the site and need Nissim's confirmation:

| Claim | Location | Action Needed |
|-------|----------|--------------|
| `2,080+ projects completed` | `src/data/company.ts:18`, used on 10+ pages | Can Nissim substantiate with records/invoices? If yes, keep. If rough estimate, use a defensible round number. |
| `1,000+ satisfied clients` | `src/data/company.ts:19`, TrustBar, About page | Same — needs documentation. "Satisfied" adds subjectivity. Consider "1,000+ clients served" instead. |
| `30+ professionals` | `src/data/company.ts:20`, About page team section | Is this the current actual team size including subcontractors? Use the real number. |
| `20+ years experience` | `src/data/company.ts:17`, used on 15+ pages | Is this Adilay LLC's age or Nissim's personal experience? If personal, change to "Over 20 years of roofing experience" (not "in business for 20+ years"). |
| `Over 2,080 projects across the city` | `src/data/locations.ts:36` (Philadelphia intro) | Must match company.ts value. Update if company.ts changes. |
