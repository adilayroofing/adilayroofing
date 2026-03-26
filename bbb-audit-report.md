# BBB Code of Advertising Compliance Audit Report

**Website:** adilayroofing.com
**Business:** Adilay Roofing LLC
**Audit Date:** March 26, 2026
**Auditor:** Automated compliance scan against all 39 sections of the BBB Code of Advertising

---

## Executive Summary

**Total violations found: 23+**
**HIGH severity: 12 | MEDIUM severity: 6 | LOW severity: 5**

The primary issue flagged by the BBB — the "#1 Rated Roofing Contractor" claim — appears in **7 locations** across the codebase including page titles, meta descriptions, Open Graph tags, JSON-LD structured data, hero headlines, and admin seed data. Beyond that flagship violation, additional objective superlative claims ("top-rated," "best roofer," "Best Roofing Contractor") appear in **10+ additional locations**.

---

## Page-by-Page Findings

### 1. Homepage (/)

| # | Exact Text | Location | BBB Section | Severity | Recommended Replacement |
|---|-----------|----------|-------------|----------|------------------------|
| 1 | `Roofer Philadelphia \| #1 Roofing Contractor — Adilay Roofing` | `<title>` tag default in `src/app/layout.tsx:33` | **Section 28** — Objective Superlative | **HIGH** | `Roofer Philadelphia \| Trusted Roofing Contractor — Adilay Roofing` |
| 2 | `Adilay Roofing | #1 Roofing Contractor in Philadelphia, PA` | Open Graph `og:title` in `src/app/layout.tsx:73` | **Section 28** | **HIGH** | `Adilay Roofing \| Trusted Roofing Contractor in Philadelphia, PA` |
| 3 | `Philadelphia's top-rated roofer with 20+ years experience` | `<meta description>` in `src/app/layout.tsx:36` | **Section 28** | **HIGH** | `Philadelphia's trusted roofer with 20+ years experience` |
| 4 | `Roofer Philadelphia \| Best Roofing Contractor — Adilay Roofing` | Fallback `<title>` in `src/app/page.tsx:51` | **Section 28** | **HIGH** | `Roofer Philadelphia \| Trusted Roofing Contractor — Adilay Roofing` |
| 5 | `Adilay Roofing is the top-rated roofing contractor` | Fallback meta description in `src/app/page.tsx:54` | **Section 28** | **HIGH** | `Adilay Roofing is a trusted roofing contractor` |
| 6 | `Adilay Roofing \| #1 Roofing Contractor in Philadelphia, PA` | Fallback OG title in `src/app/page.tsx:75` | **Section 28** | **HIGH** | `Adilay Roofing \| Trusted Roofing Contractor in Philadelphia, PA` |
| 7 | `Philadelphia's #1 Rated` | Hero headline fallback in `src/app/page.tsx:158` | **Section 28** | **HIGH** | `Philadelphia's Trusted` |
| 8 | `Looking for the best roofer in Philadelphia?` | Hero description fallback in `src/app/page.tsx:162` | **Section 28** | **MEDIUM** | `Looking for a reliable roofer in Philadelphia?` |
| 9 | `We use top-rated materials from trusted manufacturers` | "Why Choose Us" fallback in `src/app/page.tsx:119` | **Section 28** | **LOW** | `We use quality materials from trusted manufacturers` (Note: "top-rated materials" refers to product ratings, but safer to soften) |
| 10 | `"best roofer Philadelphia"` | Keywords array in `src/app/page.tsx:33,58` and `src/app/layout.tsx:42` | **Section 28** | **LOW** | Replace with `"trusted roofer Philadelphia"` or `"reliable roofer Philadelphia"` |

### 2. JSON-LD Structured Data (Global)

| # | Exact Text | Location | BBB Section | Severity | Recommended Replacement |
|---|-----------|----------|-------------|----------|------------------------|
| 11 | `Philadelphia's #1 rated roofing contractor` | JSON-LD `description` in `src/components/JsonLd.tsx:14` | **Section 28** | **HIGH** | `Philadelphia's trusted roofing contractor` |

### 3. About Page (/about)

| # | Exact Text | Location | BBB Section | Severity | Recommended Replacement |
|---|-----------|----------|-------------|----------|------------------------|
| 12 | `2,080+ projects` / `1,000+ satisfied clients` / `30+ professionals` | Used via `company.ts` in fallback story paragraphs, team description, TrustBar | **Section 34** — Claimed Results | **MEDIUM** | Flag for owner verification. If substantiable, keep. If not, use provable numbers or soften to "thousands of projects" |
| 13 | `20+ years` experience claim | Multiple pages via `company.ts:17` | **Section 34** | **MEDIUM** | Verify: Is this the LLC's age or owner's personal experience? If personal, clarify: "Over 20 years of roofing experience" |

### 4. Admin Seed Data (API Route)

| # | Exact Text | Location | BBB Section | Severity | Recommended Replacement |
|---|-----------|----------|-------------|----------|------------------------|
| 14 | `Roofer Philadelphia \| #1 Roofing Contractor — Adilay Roofing` | `src/app/api/admin/seed-pages/route.ts:32` | **Section 28** | **HIGH** | Match updated homepage title |
| 15 | `Philadelphia's top-rated roofer with 20+ years experience` | `src/app/api/admin/seed-pages/route.ts:33` | **Section 28** | **HIGH** | Match updated homepage description |

### 5. Service Area Pages (/service-areas/*)

| # | Exact Text | Location | BBB Section | Severity | Recommended Replacement |
|---|-----------|----------|-------------|----------|------------------------|
| 16 | `Top-rated Philadelphia roofer` | Philadelphia location `metaDescription` in `src/data/locations.ts:33` | **Section 28** | **HIGH** | `Trusted Philadelphia roofer` |
| 17 | `best roofer ${location.name}` | Keywords array in `src/app/service-areas/[slug]/page.tsx:51,68` | **Section 28** | **LOW** | Replace with `trusted roofer ${location.name}` |

### 6. Service Pages (/services/*)

| # | Exact Text | Location | BBB Section | Severity | Recommended Replacement |
|---|-----------|----------|-------------|----------|------------------------|
| 18 | `best ${service.title.toLowerCase()} Philadelphia` | Keywords array in `src/app/services/[slug]/page.tsx:46,64` | **Section 28** | **LOW** | Replace with `trusted ${service.title.toLowerCase()} Philadelphia` |

### 7. Warranty/Guarantee Claims (Multiple Pages)

| # | Exact Text | Location | BBB Section | Severity | Recommended Replacement |
|---|-----------|----------|-------------|----------|------------------------|
| 19 | `Workmanship guarantee on all repairs` | Roof repair service benefits in `src/data/services.ts:94` | **Section 20** — Warranties | **MEDIUM** | Acceptable IF warranty details are available before purchase. The Terms page (terms/page.tsx:136-153) does reference workmanship warranty with "specific terms detailed in your project contract" — this is compliant. |
| 20 | `workmanship warranty on every project` | FAQ answer in `src/data/faqs.ts:40` | **Section 20** | **MEDIUM** | Same as above — acceptable with the terms page disclosure. Consider adding "See your project proposal for full warranty details." |

### 8. Business Hours & Emergency Claims

| # | Exact Text | Location | BBB Section | Severity | Recommended Replacement |
|---|-----------|----------|-------------|----------|------------------------|
| 21 | `24/7 Emergency Service` / `Sun-Fri: 24 Hours, Sat: Closed` | Footer via `company.ts:35-37` and Footer.tsx:227 | **Section 1** — Basic Principles | **MEDIUM** | Verify this is actually offered 24/7. Hours show Saturday as "Closed" but emergency service is listed as available. Clarify: "24/7 Emergency Response Available" or ensure Saturday emergency calls are actually answered. |

### 9. Payment Terms Disclosure

| # | Exact Text | Location | BBB Section | Severity | Recommended Replacement |
|---|-----------|----------|-------------|----------|------------------------|
| 22 | No mention of 4% credit card surcharge on pricing pages | Site-wide | **Section 17** — Extra Charges | **MEDIUM** | Per the task brief, Adilay charges a 4% CC surcharge and has 50/50 payment terms. These should be disclosed where pricing is discussed. The Terms page mentions "deposit upon signing and final payment upon completion" but does not mention the CC surcharge. Add disclosure to Terms page payment section. |

### 10. Testimonials

| # | Exact Text | Location | BBB Section | Severity | Recommended Replacement |
|---|-----------|----------|-------------|----------|------------------------|
| 23 | Customer reviews displayed with "5.0" rating and 39/41 review count | `TestimonialsSection.tsx` | **Section 30** — Testimonials | **LOW** | Reviews appear genuine (sourced from Google Reviews, attributed with names and dates). The component links to the full Google Reviews profile. The aggregate "5.0" claim should specify "on Google" to be precise. Verify review count matches (component says 39 reviews, JSON-LD says 41). |

---

## Clean Bill of Health — Compliant Sections

The following BBB Code sections were reviewed and found **compliant** or **not applicable**:

| BBB Section | Status | Notes |
|-------------|--------|-------|
| **Section 2-7** — Price/Savings Claims | **Compliant** | No comparative price claims made |
| **Section 8** — Factory/Wholesale Claims | **N/A** | Not used |
| **Section 9-11** — Sales/Discounts | **N/A** | No sale pricing advertised |
| **Section 12-13** — Lowest Price Claims | **Compliant** | No lowest-price promises |
| **Section 14** — "Free" Claims | **Compliant** | "Free estimates" is genuinely free — no strings attached |
| **Section 15** — Trade-in Allowances | **N/A** | Not applicable |
| **Section 16** — Credit Terms | **Compliant** | No specific credit terms advertised |
| **Section 18** — Negative Option Plans | **N/A** | Not applicable |
| **Section 19** — Bait Advertising | **Compliant** | Services described accurately match what is offered |
| **Section 21** — Layout & Illustrations | **Compliant** | Images appear to be actual crew/project photos (branded van, real crew). No stock photos presenting as actual work. |
| **Section 22-23** — Asterisks/Abbreviations | **Compliant** | Appropriate use |
| **Section 24-26** — Used/As-Is/Discontinued | **N/A** | Not applicable |
| **Section 27** — Superiority/Disparagement | **Compliant** | No disparagement of competitors found |
| **Section 29** — Subjective Puffery | **Compliant** | Tagline "Philadelphia's Trusted Roofing Experts" is proper puffery. "Quality Craftsmanship. Proven Results." is acceptable puffery. |
| **Section 31** — Rebates | **N/A** | Not applicable |
| **Section 32** — Business Name | **Compliant** | "Adilay Roofing LLC" is not misleading |
| **Section 33** — Contests/Games | **N/A** | Not applicable |
| **Section 35** — Unassembled Products | **N/A** | Not applicable |
| **Section 36** — Environmental Claims | **Compliant** | "Energy-efficient windows" claims are properly scoped to specific products (Low-E glass, double/triple pane) and are standard industry terminology, not unsubstantiated green claims |
| **Section 37-38** — Made in USA/Canada | **N/A** | Not applicable |
| **Section 39** — Native Advertising | **Compliant** | Blog posts are on the company's own domain and clearly part of the business website |

### Additional Compliance Items:
- **PA License PA184779** — Displayed correctly in multiple locations
- **Business address** — Consistent: 2020 Dreer St., Unit 101, Philadelphia, PA 19125
- **Phone number** — Consistent: (888) 823-4766
- **Entity name** — Consistent: Adilay Roofing / Adilay Roofing LLC

---

## Severity Summary

| Severity | Count | Description |
|----------|-------|-------------|
| **HIGH** | 12 | Must fix immediately — these are the claims BBB has already flagged or would flag on re-review |
| **MEDIUM** | 6 | Should fix — warranty disclosures, numerical claims needing verification, hours clarification, CC surcharge |
| **LOW** | 5 | Minor risk — keywords arrays, material descriptors, review count discrepancy |
