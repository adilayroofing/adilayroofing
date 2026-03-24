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
      title: "Roofer Philadelphia | #1 Roofing Contractor — Adilay Roofing",
      description: "Adilay Roofing — Philadelphia's top-rated roofer with 20+ years experience. Roof replacement, repair, flat roofing, siding & windows. Licensed PA184779. Free estimates — (888) 823-4766.",
    },
    {
      slug: "/about",
      title: "About Adilay Roofing | Philadelphia's Trusted Roofer",
      description: "Learn about Adilay Roofing — over 20 years serving Philadelphia and surrounding counties. Licensed PA184779, insured, 2,080+ projects completed.",
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
  // BLOG POSTS (existing + future scheduled)
  // =========================================================================
  const blogPosts = [
    {
      slug: "/blog/roof-replacement-cost-philadelphia-2026",
      title: "How Much Does a Roof Replacement Cost in Philadelphia in 2026?",
      description: "Roof replacement cost in Philadelphia ranges $5,192-$10,986 in 2026. Get a detailed price breakdown by material, size & more. Free estimates available.",
      date: "2026-03-08",
    },
    {
      slug: "/blog/signs-you-need-new-roof-philadelphia",
      title: "7 Signs You Need a New Roof (Philadelphia Homeowner's Checklist)",
      description: "Learn the 7 warning signs you need a new roof. Philadelphia roofers share what to look for before leaks cause costly damage. Free roof inspections available.",
      date: "2026-03-12",
    },
    {
      slug: "/blog/flat-roof-repair-philadelphia-row-home-guide",
      title: "Flat Roof Repair in Philadelphia: The Row Home Owner's Complete Guide",
      description: "Flat roof repair in Philadelphia costs $3,000-$13,000. Expert guide for row home owners covering leaks, EPDM, ponding, and party wall issues. Free estimates.",
      date: "2026-03-16",
    },
    {
      slug: "/blog/how-to-choose-roofing-contractor-philadelphia",
      title: "How to Choose a Roofing Contractor in Philadelphia: Red Flags & Green Flags",
      description: "Learn how to choose a roofing contractor in Philadelphia. Spot red flags, verify licenses, and find a roofer you can trust. Free estimates from licensed pros.",
      date: "2026-03-19",
    },
    {
      slug: "/blog/best-roofing-materials-philadelphia-climate",
      title: "Best Roofing Materials for Philadelphia's Mid-Atlantic Climate",
      description: "Find the best roofing material for Philadelphia weather. Compare asphalt, architectural shingles, metal, slate & EPDM. Get a free estimate today!",
      date: "2026-03-23",
    },
    {
      slug: "/blog/roof-repair-costs-philadelphia",
      title: "Roof Repair Costs in Philadelphia: From Minor Fixes to Major Overhauls",
      description: "See real roof repair cost Philadelphia data for 2026. Minor fixes from $300, major repairs to $10K+. Get a free estimate from licensed Philly roofers.",
      date: "2026-03-26",
    },
    {
      slug: "/blog/epdm-rubber-roofing-philadelphia",
      title: "EPDM Rubber Roofing in Philadelphia: Why It's the Best Choice for Flat Roofs",
      description: "Learn why EPDM roofing Philadelphia roofers recommend for flat roofs. 25-30 year lifespan, weather-resistant, ideal for row homes. Free estimates!",
      date: "2026-03-30",
    },
    {
      slug: "/blog/emergency-roof-leak-repair-philadelphia",
      title: "Emergency Roof Leak Repair in Philadelphia: What to Do Right Now",
      description: "Got an emergency roof repair Philadelphia situation? Here's what to do right now plus 24/7 service from licensed Philly roofers. Call (888) 823-4766.",
      date: "2026-04-02",
    },
    {
      slug: "/blog/roofing-south-philadelphia-row-homes",
      title: "Roofing for South Philadelphia Row Homes: Your Flat Roof Experts",
      description: "Expert roofing South Philadelphia row homes. Flat roof repair, EPDM solutions & honest pricing from licensed local roofers. Get a free estimate today!",
      date: "2026-04-06",
    },
    {
      slug: "/blog/3-tab-vs-architectural-shingles-philadelphia",
      title: "3-Tab vs. Architectural Shingles: Which Is Best for Your Philly Home?",
      description: "Compare asphalt shingles vs architectural shingles for Philadelphia homes. Cost, durability & wind resistance data to help you choose. Free estimates!",
      date: "2026-04-09",
    },
    {
      slug: "/blog/best-time-replace-roof-pennsylvania",
      title: "Best Time to Replace Your Roof in Pennsylvania (Seasonal Guide)",
      description: "When is the best time to replace roof PA? Seasonal guide covering fall, spring, summer & winter pros and cons. Plan your project and get a free estimate!",
      date: "2026-04-13",
    },
    {
      slug: "/blog/new-roof-increase-home-value-philadelphia",
      title: "Does a New Roof Increase Home Value in Philadelphia? (2026 Data)",
      description: "Does a new roof increase home value? See 2026 ROI data for Philadelphia homes. Learn how roof replacement boosts resale price. Free estimates available!",
      date: "2026-04-16",
    },
    {
      slug: "/blog/storm-damage-roof-repair-philadelphia",
      title: "Storm Damage Roof Repair in Philadelphia: Insurance Claims & What to Expect",
      description: "Expert storm damage roof repair in Philadelphia. Learn about insurance claims, damage assessment, and what to expect from a licensed PA roofer.",
      date: "2026-04-20",
    },
    {
      slug: "/blog/seasonal-roof-maintenance-checklist-philadelphia",
      title: "Seasonal Roof Maintenance Checklist for Philadelphia Homeowners",
      description: "Complete seasonal roof maintenance checklist for Philadelphia homes. Prevent costly repairs with our expert spring, summer, fall, and winter tips.",
      date: "2026-04-23",
    },
    {
      slug: "/blog/vinyl-vs-fiber-cement-siding-philadelphia",
      title: "Vinyl vs. Fiber Cement Siding in Philadelphia: Which Is Right for Your Home?",
      description: "Compare vinyl and fiber cement siding installation in Philadelphia. Expert breakdown of costs, durability, and which is best for Philadelphia weather.",
      date: "2026-04-27",
    },
    {
      slug: "/blog/window-replacement-philadelphia-cost",
      title: "Window Replacement in Philadelphia: Energy Savings & Cost Breakdown",
      description: "Window replacement in Philadelphia costs $300-$1,200 per window. Learn about energy savings, window types, and ROI from licensed PA contractors.",
      date: "2026-04-30",
    },
    {
      slug: "/blog/how-long-does-roof-last-philadelphia",
      title: "How Long Does a Roof Last in Philadelphia? Lifespan by Material",
      description: "Learn how long does a roof last in Philadelphia by material type. Lifespan guide for shingles, metal, slate & EPDM. Get a free estimate today.",
      date: "2026-05-04",
    },
    {
      slug: "/blog/gaf-timberline-shingles-review-philadelphia",
      title: "GAF Timberline Shingles Review: Are They Worth It for Philly Homes?",
      description: "Honest GAF shingles review from Philadelphia roofers. Compare Timberline HDZ, UHDZ & NS lines for Philly homes. Get a free estimate today.",
      date: "2026-05-07",
    },
    {
      slug: "/blog/roofing-bucks-county-common-issues",
      title: "Roofing in Bucks County: Common Issues & How to Fix Them",
      description: "Trusted roofing company Bucks County homeowners rely on. Learn common roof problems in Doylestown, Langhorne & more. Free estimates available.",
      date: "2026-05-11",
    },
    {
      slug: "/blog/roof-insurance-claim-philadelphia-guide",
      title: "Filing a Roof Insurance Claim in Philadelphia: Step-by-Step Guide",
      description: "Step-by-step guide to filing a roof insurance claim Philadelphia homeowners need. Learn the process, avoid pitfalls & get a free estimate.",
      date: "2026-05-14",
    },
    {
      slug: "/blog/roofing-warranties-explained",
      title: "Roofing Warranties Explained: Manufacturer vs. Workmanship Guarantees",
      description: "Roof warranty explained: learn the difference between manufacturer and workmanship guarantees. Protect your investment with Adilay Roofing.",
      date: "2026-05-18",
    },
    {
      slug: "/blog/energy-efficient-roofing-philadelphia",
      title: "Energy-Efficient Roofing Options for Philadelphia Homes",
      description: "Explore energy efficient roofing Philadelphia options to cut utility bills. Cool roofs, reflective shingles, and more. Get a free estimate today!",
      date: "2026-05-21",
    },
    {
      slug: "/blog/montgomery-county-roofing-weather-solutions",
      title: "Montgomery County Roofing: Weather Challenges & Smart Solutions",
      description: "Looking for a roofer Montgomery County PA trusts? Adilay Roofing covers Norristown, Cheltenham, and more. Free estimates. Call (888) 823-4766.",
      date: "2026-05-25",
    },
    {
      slug: "/blog/roof-permit-philadelphia",
      title: "Do You Need a Permit to Replace Your Roof in Philadelphia?",
      description: "Learn about Philadelphia building permits roofing requirements. What they cost, who pulls them, and why skipping one is a costly mistake.",
      date: "2026-05-28",
    },
  ];

  for (const post of blogPosts) {
    // Posts with future dates are drafts, past/today dates are published
    const postDate = new Date(post.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isPublished = postDate <= today;

    pages.push({
      slug: post.slug,
      meta_title: post.title,
      meta_description: post.description,
      canonical_url: `${BASE_URL}${post.slug}`,
      status: isPublished ? "published" : "draft",
      updated_by: "seed-script",
    });
  }

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
  const { data, error } = await supabase
    .from("pages")
    .upsert(pages, { onConflict: "slug", ignoreDuplicates: true })
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
      blog: blogPosts.length,
      landing: landingPages.length,
    },
  });
}
