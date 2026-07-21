import { company } from "@/data/company";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://www.adilayroofing.com";

// Only build-time data is used — prerender as a static file.
export const dynamic = "force-static";

// llms.txt — a curated, plain-markdown map of the site for AI assistants
// (llmstxt.org convention). Built from the same data files that drive the
// pages, so it never drifts from what's actually live. Served statically.
export async function GET() {
  const posts = await getAllPosts();

  const serviceLines = services
    .map((s) => `- [${s.title}](${BASE_URL}/services/${s.slug})`)
    .join("\n");

  const byCounty = new Map<string, { name: string; slug: string }[]>();
  for (const loc of locations) {
    const list = byCounty.get(loc.county) ?? [];
    list.push({ name: loc.name, slug: loc.slug });
    byCounty.set(loc.county, list);
  }
  const areaLines = [...byCounty.entries()]
    .map(
      ([county, locs]) =>
        `- ${county}: ` +
        locs.map((l) => `[${l.name}](${BASE_URL}/service-areas/${l.slug})`).join(", ")
    )
    .join("\n");

  const postLines = posts
    .map(
      (p) =>
        `- [${p.frontmatter.title}](${BASE_URL}/blog/${p.frontmatter.slug}): ${p.frontmatter.description}`
    )
    .join("\n");

  const body = `# ${company.name}

> ${company.legalName} is a licensed, family-owned roofing contractor in Philadelphia, PA (PA contractor license ${company.license}, fully insured). ${company.yearsExperience} years of experience, a ${company.teamMembers} person in-house crew (no subcontracted labor), and a 5-star Google rating. Services: roof replacement, roof repair, 24/7 emergency roof repair and tarping, flat roofing (EPDM/TPO/modified bitumen), shingle and slate roofing, siding, windows, and gutters across Philadelphia, Bucks, Montgomery, Delaware, and Chester counties.

Key facts:

- Phone: ${company.phone} — answered 24/7; emergency crews dispatch same-day whenever possible
- Address: ${company.address.full}
- Email: ${company.email}
- Free, no-obligation written estimates: ${BASE_URL}/get-quote
- Typical Philadelphia roof replacement cost (2026): $5,192–$10,986 depending on size, material, and pitch
- Philadelphia requires a building permit for full roof replacement; we pull it for you

## Services

${serviceLines}

## Service areas

${areaLines}

## Guides and articles

${postLines}

## Company

- [About](${BASE_URL}/about): family-owned, ${company.yearsExperience} years, ${company.projectsCompleted} projects completed
- [FAQ](${BASE_URL}/faq): pricing, permits, warranties, timelines
- [Financing](${BASE_URL}/financing): roof financing options
- [Gallery](${BASE_URL}/gallery): completed project photos
- [Get a free quote](${BASE_URL}/get-quote)
- [Contact](${BASE_URL}/contact)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
