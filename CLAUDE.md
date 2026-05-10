# Adilay Roofing — Working Notes for Claude

This file is auto-loaded by Claude Code in every session. Read it before making changes.

---

## ⚠️ Supabase CMS is DEPRECATED — do not use

**As of 2026-05-10, all page content lives in code files. Do not write to Supabase. Do not use the `/admin` UI. Edit the data files directly.**

The CMS was silently overriding data file edits. We removed the override layer in commit `cbe073a`. The Supabase tables (`pages`, `content_blocks`) still exist as a backup but are not read at runtime.

If a future session asks "where do I edit Yardley's content?" or "how do I update the homepage description?", the answer is **the data files below**, not Supabase, not the admin panel.

### Where each kind of content lives

| Content | File |
|---|---|
| Service detail pages (titles, body, FAQ, etc.) | `adilay-roofing/src/data/services.ts` |
| Service "deep" body sections (4-5 unique H3s per service) | `adilay-roofing/src/data/serviceBodySections.ts` |
| Service-area page content (intro, FAQs, bodySections, neighborhoods, ZIPs) | `adilay-roofing/src/data/locations.ts` |
| Company info (phone, address, ratings) | `adilay-roofing/src/data/company.ts` |
| FAQ page | `adilay-roofing/src/data/faqs.ts` |
| Gallery items | `adilay-roofing/src/data/gallery.ts` |
| Blog post categories | `adilay-roofing/src/data/blogCategories.ts` |
| Blog post bodies | `adilay-roofing/content/blog/*.md` (frontmatter + markdown) |
| Homepage metadata | `adilay-roofing/src/app/page.tsx` `generateMetadata()` |
| Sitewide title default + base metadata | `adilay-roofing/src/app/layout.tsx` |
| Static page metadata (about, contact, financing, faq, etc.) | each respective `adilay-roofing/src/app/<page>/page.tsx` |

### What `lib/seo.ts` looks like now

`getPageSEO()`, `getStructuredContent()`, `getPageContent()` are **no-ops that always return null**. The body of each function was deleted; only the signature is kept so old `if (dbSeo) ...` fallback chains in page templates still compile and use the hardcoded data. Safe to delete those branches when convenient.

### How to verify a content change is actually live

After editing a data file, do not trust the dev server alone (Next.js cache can mislead). Run:

```bash
cd adilay-roofing && rm -rf .next && npm run build
# Then check the static HTML directly:
grep -oE '<title>[^<]+</title>' .next/server/app/service-areas/<slug>.html
```

If the static HTML shows the new content, the deploy will too.

### One-time backup of removed CMS data

`adilay-roofing/cms-backup-2026-05-10.json` (gitignored) holds a snapshot of the removed `pages` and `content_blocks` rows. Reference only — do not restore.

---

## Project structure

- **Next.js 16 App Router** with Turbopack, React 19, Tailwind CSS
- Project root: `adilay-roofing/` (the parent `adilayroofing new web/` folder holds non-code assets)
- Deploy: push to `main` → auto-deploys (Vercel-style)
- Domain: `https://www.adilayroofing.com`
- Phone: `(267) 255-3620` — verified GBP number, do not use any other number

## Git / SSH isolation (per-project)

This Mac has multiple GitHub accounts. The remote uses an SSH host alias:
```
origin  git@github-adilay:adilayroofing/adilayroofing.git
```
Repo-local git config sets the right identity. **Never set git config globally for this repo.**

## Per-project memory (from prior sessions)

- **New pages must be wired into the nav.** Never ship an orphan route. Update Header dropdowns + Footer (the All Service Areas grid auto-includes any new county; new services need to be added to `services.ts` so they appear in the Services dropdown).
- **Header dropdowns are SSR-rendered.** As of P0 #1 (commit `a3cb49e`), the dropdown markup is always mounted, with visibility toggled via classes. Do not revert to `{open && (...)}` conditional rendering — it breaks Googlebot crawling of nav links.
- **Footer links to all 69 service areas** in the "All Service Areas" block, grouped by county, derived dynamically from `locations.ts` (no hardcoded county list).
- **Service detail pages cross-link to all 69 areas** in a "{Service} — Service Areas We Cover" section. Do not remove this block — it provides ~28 inlinks per area page.

## SEO context

- Active master plan: `seo-audit-reports/MASTER-PLAN-2026-05-10.md`
- Indexing crisis: as of 2026-05-10, only ~25 pages indexed out of ~144 total. P0 internal-linking fixes shipped that day; CMS removed; Yardley de-templatized as worked example. Other 60 thin area pages still need de-templatization (see master plan §1 + §5).
- Competitor benchmarks (from Screaming Frog): saved as competitor analysis; Pace ~991 avg words/page, Big Joe's avg 438, Phinest avg 615.
- DEEP RANK queries (the highest-impression positions where pages exist but rank 21–60) are listed in the master plan §3.

## Common gotchas

- **Don't add "use client" to a Server Component file.** Page templates with `generateMetadata` and `generateStaticParams` must remain Server Components.
- **Don't put `revalidate` on service or area detail pages.** They're fully static now (faster, better for SEO). The CMS was the only reason `revalidate = 86400` existed.
- **Title length**: keep page titles ≤60 chars to avoid SERP truncation. The layout no longer appends a global "| Adilay Roofing" suffix — page titles are complete on their own.
- **Meta description length**: 150–160 chars sweet spot. Always include the phone number and the PA license # (PA184779) for trust signals.
- **Phone number**: only `(267) 255-3620`. The number `(888) 823-4766` is from an old GBP migration and was removed in commit `4f22741`.

## Day-to-day workflow

1. Edit data files (`src/data/*.ts`) or page templates (`src/app/**/page.tsx`)
2. Verify with `npm run build` + grep the static HTML
3. Commit with `SEO:` or feature prefix matching the existing style (see `git log --oneline -10`)
4. Push to `main` to deploy
5. After deploy, verify with `curl -s https://www.adilayroofing.com/<path> | grep <expected-string>`
