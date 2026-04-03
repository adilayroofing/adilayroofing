import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { services } from "@/data/services";
import { getAllLocations } from "@/data/locations";

const BASE_URL = "https://www.adilayroofing.com";

export async function POST(request: Request) {
  // Verify service role key is present (basic protection)
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  const pages: {
    slug: string;
    meta_title: string;
    meta_description: string;
    canonical_url: string;
    status: string;
    updated_by: string;
  }[] = [];

  // =========================================================================
  // STATIC PAGES
  // =========================================================================
  const staticPages = [
    {
      slug: "/",
      title: "Roofer Philadelphia | Trusted Roofing Contractor — Adilay Roofing",
      description: "Adilay Roofing — Philadelphia's trusted roofer with 20+ years experience. Roof replacement, repair, flat roofing, siding & windows. Licensed PA184779. Free estimates — (888) 823-4766.",
    },
    {
      slug: "/about",
      title: "About Adilay Roofing | Philadelphia's Trusted Roofer",
      description: "Learn about Adilay Roofing — over 20 years serving Philadelphia and surrounding counties. Licensed PA184779, insured, 2,000+ projects completed.",
    },
    {
      slug: "/contact",
      title: "Contact Adilay Roofing | Free Estimate Philadelphia",
      description: "Contact Adilay Roofing for a free roofing estimate in Philadelphia. Call (888) 823-4766 or fill out our online form. Licensed PA184779.",
    },
    {
      slug: "/faq",
      title: "Roofing FAQ — Common Questions Answered | Adilay Roofing",
      description: "Get answers to frequently asked roofing questions. Learn about costs, materials, timelines, and more from Philadelphia's trusted roofing contractor.",
    },
    {
      slug: "/gallery",
      title: "Roofing Project Gallery — Before & After Photos | Adilay Roofing",
      description: "Browse our roofing project gallery. See before & after photos of roof replacements, repairs, and installations across Philadelphia and surrounding areas.",
    },
    {
      slug: "/privacy",
      title: "Privacy Policy | Adilay Roofing",
      description: "Adilay Roofing privacy policy. Learn how we collect, use, and protect your personal information.",
    },
    {
      slug: "/terms",
      title: "Terms of Service | Adilay Roofing",
      description: "Adilay Roofing terms of service. Read the terms and conditions for using our website and services.",
    },
    {
      slug: "/services",
      title: "Roofing Services Philadelphia | Adilay Roofing",
      description: "Full range of roofing services in Philadelphia — roof replacement, repair, flat roofing, siding, windows, gutters & emergency service. Licensed PA184779.",
    },
    {
      slug: "/service-areas",
      title: "Service Areas | Adilay Roofing Philadelphia",
      description: "Adilay Roofing serves Philadelphia, Bucks County, Montgomery County, Delaware County, Chester County & Riverside NJ. Free estimates — (888) 823-4766.",
    },
    {
      slug: "/blog",
      title: "Roofing Blog | Tips & Advice — Adilay Roofing",
      description: "Expert roofing tips, cost guides, and advice for Philadelphia homeowners. Learn about roof replacement, repair, materials, and maintenance from licensed pros.",
    },
    {
      slug: "/get-quote",
      title: "Get a Free Roofing Quote | Adilay Roofing Philadelphia",
      description: "Request a free, no-obligation roofing estimate from Adilay Roofing. Serving Philadelphia and surrounding areas. Licensed PA184779.",
    },
    {
      slug: "/financing",
      title: "Roof Financing Philadelphia | Apply Today | Adilay Roofing",
      description: "Adilay Roofing offers flexible roof financing through Service Finance Company. Loans from $1,000–$100,000. No payments until job is complete. Serving Philadelphia & surrounding counties.",
    },
  ];

  for (const sp of staticPages) {
    pages.push({
      slug: sp.slug,
      meta_title: sp.title,
      meta_description: sp.description,
      canonical_url: `${BASE_URL}${sp.slug === "/" ? "" : sp.slug}`,
      status: "published",
      updated_by: "seed-script",
    });
  }

  // =========================================================================
  // SERVICE PAGES
  // =========================================================================
  for (const service of services) {
    pages.push({
      slug: `/services/${service.slug}`,
      meta_title: `${service.title} Philadelphia PA | Adilay Roofing`,
      meta_description: service.description,
      canonical_url: `${BASE_URL}/services/${service.slug}`,
      status: "published",
      updated_by: "seed-script",
    });
  }

  // =========================================================================
  // LOCATION / SERVICE AREA PAGES
  // =========================================================================
  const locations = getAllLocations();
  for (const loc of locations) {
    pages.push({
      slug: `/service-areas/${loc.slug}`,
      meta_title: loc.metaTitle,
      meta_description: loc.metaDescription,
      canonical_url: `${BASE_URL}/service-areas/${loc.slug}`,
      status: "published",
      updated_by: "seed-script",
    });
  }

  // =========================================================================
  // BLOG POSTS — managed by SEO team via CMS, no seeding needed
  // =========================================================================

  // =========================================================================
  // LANDING PAGES
  // =========================================================================
  const landingPages = [
    {
      slug: "/lp/roof-replacement",
      title: "Roof Replacement Philadelphia — Free Estimate | Adilay Roofing",
      description: "Get a free roof replacement estimate in Philadelphia. Licensed PA184779, 20+ years experience. Call (888) 823-4766.",
    },
    {
      slug: "/lp/roof-repair",
      title: "Roof Repair Philadelphia — Fast Service | Adilay Roofing",
      description: "Fast, affordable roof repair in Philadelphia. Licensed PA184779, 20+ years experience. Call (888) 823-4766.",
    },
    {
      slug: "/lp/gutters",
      title: "Gutter Installation Philadelphia — Free Estimate | Adilay Roofing",
      description: "Professional gutter installation and repair in Philadelphia. Seamless gutters, leaf guards & more. Free estimates.",
    },
    {
      slug: "/lp/emergency",
      title: "Emergency Roof Repair Philadelphia — 24/7 | Adilay Roofing",
      description: "24/7 emergency roof repair in Philadelphia. Fast response, licensed PA184779. Call (888) 823-4766 now.",
    },
    {
      slug: "/lp/free-inspection",
      title: "Free Roof Inspection Philadelphia | Adilay Roofing",
      description: "Get a free professional roof inspection in Philadelphia. Licensed PA184779, 20+ years experience. Schedule today.",
    },
  ];

  for (const lp of landingPages) {
    pages.push({
      slug: lp.slug,
      meta_title: lp.title,
      meta_description: lp.description,
      canonical_url: `${BASE_URL}${lp.slug}`,
      status: "published",
      updated_by: "seed-script",
    });
  }

  // =========================================================================
  // UPSERT ALL PAGES
  // =========================================================================
  // Remove old service pages that were renamed/split
  const deprecatedSlugs = ["/services/siding", "/services/windows", "/services/gutters"];
  await supabase.from("pages").delete().in("slug", deprecatedSlugs);

  const { data, error } = await supabase
    .from("pages")
    .upsert(pages, { onConflict: "slug", ignoreDuplicates: false })
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    message: `Seeded ${data?.length ?? 0} pages`,
    totalAttempted: pages.length,
    breakdown: {
      static: staticPages.length,
      services: services.length,
      locations: locations.length,
      landing: landingPages.length,
    },
  });
}
