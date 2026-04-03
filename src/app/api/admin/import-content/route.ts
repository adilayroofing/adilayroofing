import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { services } from "@/data/services";
import { getAllLocations } from "@/data/locations";
import { getAllPostsIncludingFuture, renderMarkdown } from "@/lib/blog";

const BASE_URL = "https://www.adilayroofing.com";

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const results = { blog: 0, services: 0, locations: 0, errors: [] as string[] };

  // =========================================================================
  // 1. BLOG POSTS — convert markdown to HTML and store in content_blocks
  // =========================================================================
  const posts = await getAllPostsIncludingFuture();

  for (const post of posts) {
    const slug = `/blog/${post.frontmatter.slug}`;

    // Find the page in DB
    const { data: page } = await supabase
      .from("pages")
      .select("id")
      .eq("slug", slug)
      .single();

    if (!page) {
      results.errors.push(`Page not found for blog: ${slug}`);
      continue;
    }

    // Convert markdown to HTML
    const html = renderMarkdown(post.content);

    // Check if content block already exists
    const { data: existing } = await supabase
      .from("content_blocks")
      .select("id")
      .eq("page_id", page.id)
      .eq("block_type", "rich_text")
      .limit(1);

    if (existing && existing.length > 0) {
      // Update existing
      await supabase
        .from("content_blocks")
        .update({ content: { html }, updated_at: new Date().toISOString() })
        .eq("id", existing[0].id);
    } else {
      // Insert new
      await supabase.from("content_blocks").insert({
        page_id: page.id,
        block_type: "rich_text",
        content: { html },
        sort_order: 0,
      });
    }

    results.blog++;
  }

  // =========================================================================
  // 2. SERVICE PAGES — build HTML from service data
  // =========================================================================
  for (const service of services) {
    const slug = `/services/${service.slug}`;

    const { data: page } = await supabase
      .from("pages")
      .select("id")
      .eq("slug", slug)
      .single();

    if (!page) {
      results.errors.push(`Page not found for service: ${slug}`);
      continue;
    }

    // Build HTML from service data
    const html = buildServiceHtml(service);

    const { data: existing } = await supabase
      .from("content_blocks")
      .select("id")
      .eq("page_id", page.id)
      .eq("block_type", "rich_text")
      .limit(1);

    if (existing && existing.length > 0) {
      await supabase
        .from("content_blocks")
        .update({ content: { html }, updated_at: new Date().toISOString() })
        .eq("id", existing[0].id);
    } else {
      await supabase.from("content_blocks").insert({
        page_id: page.id,
        block_type: "rich_text",
        content: { html },
        sort_order: 0,
      });
    }

    results.services++;
  }

  // =========================================================================
  // 3. LOCATION PAGES — build HTML from location data
  // =========================================================================
  const locations = getAllLocations();

  for (const loc of locations) {
    const slug = `/service-areas/${loc.slug}`;

    const { data: page } = await supabase
      .from("pages")
      .select("id")
      .eq("slug", slug)
      .single();

    if (!page) {
      results.errors.push(`Page not found for location: ${slug}`);
      continue;
    }

    const html = buildLocationHtml(loc);

    const { data: existing } = await supabase
      .from("content_blocks")
      .select("id")
      .eq("page_id", page.id)
      .eq("block_type", "rich_text")
      .limit(1);

    if (existing && existing.length > 0) {
      await supabase
        .from("content_blocks")
        .update({ content: { html }, updated_at: new Date().toISOString() })
        .eq("id", existing[0].id);
    } else {
      await supabase.from("content_blocks").insert({
        page_id: page.id,
        block_type: "rich_text",
        content: { html },
        sort_order: 0,
      });
    }

    results.locations++;
  }

  return NextResponse.json({
    message: "Content import complete",
    imported: {
      blog: results.blog,
      services: results.services,
      locations: results.locations,
    },
    errors: results.errors,
  });
}

// ─── Helper: build service page HTML ──────────────────────────────────────

interface ServiceData {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  heroDescription: string;
  benefits: string[];
  features: string[];
  faq: { question: string; answer: string }[];
}

function buildServiceHtml(service: ServiceData): string {
  let html = "";

  html += `<h1>${service.title}</h1>\n`;
  html += `<p><strong>${service.tagline}</strong></p>\n`;
  html += `<p>${service.heroDescription}</p>\n`;

  html += `<h2>Benefits</h2>\n<ul>\n`;
  for (const b of service.benefits) {
    html += `<li>${b}</li>\n`;
  }
  html += `</ul>\n`;

  html += `<h2>What's Included</h2>\n<ul>\n`;
  for (const f of service.features) {
    html += `<li>${f}</li>\n`;
  }
  html += `</ul>\n`;

  if (service.faq.length > 0) {
    html += `<h2>Frequently Asked Questions</h2>\n`;
    for (const f of service.faq) {
      html += `<h3>${f.question}</h3>\n`;
      html += `<p>${f.answer}</p>\n`;
    }
  }

  return html;
}

// ─── Helper: build location page HTML ─────────────────────────────────────

interface LocationData {
  name: string;
  slug: string;
  state: string;
  county: string;
  type: string;
  h1: string;
  intro: string;
  localContext: string;
  neighborhoods: string[];
  zipCodes: string[];
  faq: { question: string; answer: string }[];
}

function buildLocationHtml(loc: LocationData): string {
  let html = "";

  html += `<h1>${loc.h1}</h1>\n`;
  html += `<p>${loc.intro}</p>\n`;

  html += `<h2>Local Roofing Expertise in ${loc.name}</h2>\n`;
  html += `<p>${loc.localContext}</p>\n`;

  if (loc.neighborhoods.length > 0) {
    html += `<h2>Areas We Serve in ${loc.name}</h2>\n<ul>\n`;
    for (const n of loc.neighborhoods) {
      html += `<li>${n}</li>\n`;
    }
    html += `</ul>\n`;
  }

  if (loc.zipCodes.length > 0) {
    html += `<h2>Zip Codes We Cover</h2>\n`;
    html += `<p>${loc.zipCodes.join(", ")}</p>\n`;
  }

  if (loc.faq.length > 0) {
    html += `<h2>Frequently Asked Questions</h2>\n`;
    for (const f of loc.faq) {
      html += `<h3>${f.question}</h3>\n`;
      html += `<p>${f.answer}</p>\n`;
    }
  }

  return html;
}
