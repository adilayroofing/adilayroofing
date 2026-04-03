import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { services, getServiceBySlug } from "@/data/services";
import { getAllLocations, getLocationBySlug } from "@/data/locations";
import { faqs as hardcodedFaqs } from "@/data/faqs";

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const results: string[] = [];

  // =========================================================================
  // 1. CLEAN UP TEST BLOG POSTS
  // =========================================================================
  // Remove test/junk blog posts created during testing
  const { data: allBlogPages } = await supabase
    .from("pages")
    .select("id, slug")
    .like("slug", "/blog/%");

  const testSlugs: string[] = [];
  const testPageIds: string[] = [];

  // Known seeded blog slugs (keep these)
  const seededBlogSlugs = new Set([
    "roof-replacement-cost-philadelphia-2026",
    "signs-you-need-new-roof-philadelphia",
    "flat-roof-repair-philadelphia-row-home-guide",
    "how-to-choose-roofing-contractor-philadelphia",
    "best-roofing-materials-philadelphia-climate",
    "roof-repair-costs-philadelphia",
    "epdm-rubber-roofing-philadelphia",
    "emergency-roof-leak-repair-philadelphia",
    "roofing-south-philadelphia-row-homes",
    "3-tab-vs-architectural-shingles-philadelphia",
    "best-time-replace-roof-pennsylvania",
    "new-roof-increase-home-value-philadelphia",
    "storm-damage-roof-repair-philadelphia",
    "seasonal-roof-maintenance-checklist-philadelphia",
    "vinyl-vs-fiber-cement-siding-philadelphia",
    "window-replacement-philadelphia-cost",
    "how-long-does-roof-last-philadelphia",
    "gaf-timberline-shingles-review-philadelphia",
    "roofing-bucks-county-common-issues",
    "roof-insurance-claim-philadelphia-guide",
    "roofing-warranties-explained",
    "energy-efficient-roofing-philadelphia",
    "montgomery-county-roofing-weather-solutions",
    "roof-permit-philadelphia",
    "roof-financing-philadelphia",
  ]);

  if (allBlogPages) {
    for (const page of allBlogPages) {
      const blogSlug = page.slug.replace("/blog/", "");
      // If slug is empty, or not in our known seeded list → it's a test post
      if (!blogSlug || !seededBlogSlugs.has(blogSlug)) {
        testSlugs.push(blogSlug);
        testPageIds.push(page.id);
      }
    }
  }

  if (testPageIds.length > 0) {
    await supabase.from("content_blocks").delete().in("page_id", testPageIds);
    await supabase.from("page_revisions").delete().in("page_id", testPageIds);
    await supabase.from("pages").delete().in("id", testPageIds);
    results.push(`Deleted ${testPageIds.length} test blog pages from pages table`);
  }

  if (testSlugs.length > 0) {
    await supabase.from("blog_posts").delete().in("slug", testSlugs.filter(Boolean));
    results.push(`Deleted ${testSlugs.length} test blog posts from blog_posts table`);
  }

  // Also remove the bare /blog/ page entry if it exists (not a real page)
  await supabase.from("pages").delete().eq("slug", "/blog/");

  // =========================================================================
  // 2. SEED CONTENT BLOCKS FOR ALL PAGE TYPES
  // =========================================================================

  // Get all pages
  const { data: allPages } = await supabase.from("pages").select("id, slug");
  if (!allPages) {
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 });
  }

  // Get existing content blocks to avoid duplicates
  const pageIds = allPages.map((p) => p.id);
  const { data: existingBlocks } = await supabase
    .from("content_blocks")
    .select("page_id, block_type")
    .in("page_id", pageIds);

  const pagesWithBlocks = new Set((existingBlocks || []).map((b) => b.page_id));

  const contentBlocksToInsert: {
    page_id: string;
    block_type: string;
    content: Record<string, unknown>;
    sort_order: number;
  }[] = [];

  let serviceCount = 0;
  let locationCount = 0;
  let specialCount = 0;

  for (const page of allPages) {
    // Skip pages that already have content blocks
    if (pagesWithBlocks.has(page.id)) continue;

    const { slug } = page;

    // SERVICE PAGES
    if (slug.startsWith("/services/") && slug !== "/services") {
      const serviceSlug = slug.replace("/services/", "");
      const service = getServiceBySlug(serviceSlug);
      if (service) {
        contentBlocksToInsert.push({
          page_id: page.id,
          block_type: "structured_service",
          content: {
            heroTitle: `${service.title} in Philadelphia, PA`,
            heroTagline: service.tagline,
            heroDescription: service.heroDescription,
            benefits: [...service.benefits],
            features: [...service.features],
            faq: service.faq.map((f) => ({ ...f })),
          },
          sort_order: 0,
        });
        serviceCount++;
      }
    }

    // LOCATION PAGES
    else if (slug.startsWith("/service-areas/") && slug !== "/service-areas") {
      const locationSlug = slug.replace("/service-areas/", "");
      const location = getLocationBySlug(locationSlug);
      if (location) {
        contentBlocksToInsert.push({
          page_id: page.id,
          block_type: "structured_location",
          content: {
            heroTitle: location.h1,
            heroSubtitle: `Professional roofing services for ${location.name}, ${location.state} and surrounding areas. Licensed, insured, and trusted by local homeowners.`,
            intro: location.intro,
            localContext: location.localContext,
            neighborhoods: [...location.neighborhoods],
            zipCodes: [...location.zipCodes],
            faq: location.faq.map((f) => ({ ...f })),
          },
          sort_order: 0,
        });
        locationCount++;
      }
    }

    // HOME PAGE
    else if (slug === "/" || slug === "") {
      contentBlocksToInsert.push({
        page_id: page.id,
        block_type: "structured_home",
        content: {
          heroHeadlineWhite: "Philadelphia's Trusted",
          heroHeadlineRed: "Roofing Contractor",
          heroSubheadline: "Quality Craftsmanship. Proven Results.",
          heroDescription: "Looking for a reliable roofer in Philadelphia? From roof replacement and roof repair to emergency roofing services, Adilay Roofing has served Philadelphia and surrounding areas for over 20 years. Licensed, insured, 5-star rated on Google. Get a free estimate today.",
          whyChooseUs: [
            { title: "Experienced Crew", description: "Over 20 years of hands-on roofing experience in the Philadelphia area." },
            { title: "Quality Materials", description: "We use quality materials from trusted manufacturers for lasting results." },
            { title: "Honest Pricing", description: "Clear, written proposals with no hidden fees or surprise charges." },
          ],
          teamHeading: "Family-Owned. Locally Trusted.",
          teamParagraphs: [
            "Adilay Roofing is a family-run business built on hard work, honest service, and a genuine commitment to every homeowner we serve. From our office in Philadelphia, we manage every project personally — no subcontractors, no runaround.",
            "With over 20 years of experience and a crew that treats your home like their own, you get more than a contractor — you get a team that stands behind every shingle, every seam, and every promise.",
          ],
          serviceAreasHeading: "Serving Philadelphia & Beyond",
          serviceAreasDescription: "We proudly serve homeowners and businesses across southeastern Pennsylvania.",
        },
        sort_order: 0,
      });
      specialCount++;
    }

    // ABOUT PAGE
    else if (slug === "/about") {
      contentBlocksToInsert.push({
        page_id: page.id,
        block_type: "structured_about",
        content: {
          heroTitle: "About Adilay Roofing",
          heroDescription: "Serving the Philadelphia region with honest, high-quality roofing services for over 20 years.",
          storyHeading: "Roofing Done Right — For Over 20 Years",
          storyParagraphs: [
            "Founded by Adilay, Adilay Roofing LLC has been a trusted name in the Philadelphia roofing industry for over two decades. What started as a small, dedicated crew has grown into a full-service roofing and exterior company with 30+ professionals serving homeowners and businesses across Pennsylvania.",
            "Our mission is simple: deliver the highest standard of roofing services with integrity, quality craftsmanship, and genuine care for every customer. We don't cut corners, and we don't disappear after the job is done.",
            "With over 2,000+ completed projects and a growing list of satisfied customers, we've built our reputation on referrals, repeat business, and doing right by every property we touch.",
          ],
          values: [
            { title: "Quality Craftsmanship", description: "Every project gets our full attention. We take pride in clean, professional work that lasts." },
            { title: "Honest Communication", description: "We tell you what your roof needs — not what makes us the most money. No pressure, no upsells." },
            { title: "Reliable Service", description: "We show up when we say we will, finish on time, and stand behind our work." },
            { title: "Community Focus", description: "We live and work in the same neighborhoods we serve. Your satisfaction is our reputation." },
          ],
          teamDescription: "Our crew of 30+ experienced professionals brings decades of combined roofing expertise to every project. Led by owner Adilay, we treat every property like it's our own.",
        },
        sort_order: 0,
      });
      specialCount++;
    }

    // FAQ PAGE
    else if (slug === "/faq") {
      contentBlocksToInsert.push({
        page_id: page.id,
        block_type: "structured_faq",
        content: {
          heroTitle: "Frequently Asked Questions",
          heroSubtitle: "Have questions about roofing, our process, or your project? Find answers below, or contact us directly.",
          general: {
            title: "General Questions",
            description: "The most common questions we get from homeowners and businesses.",
            items: hardcodedFaqs.map((f) => ({ ...f })),
          },
          areas: {
            title: "Service Area Questions",
            description: "We proudly serve Philadelphia and surrounding counties in southeastern Pennsylvania.",
            items: [
              { question: "What neighborhoods in Philadelphia do you cover?", answer: "We serve all of Philadelphia — from Northeast Philly and Kensington to Center City, South Philly, Germantown, and everywhere in between. If you're in the greater Philadelphia area, we can help." },
              { question: "Do you serve outside of Philadelphia?", answer: "Yes! In addition to Philadelphia, we serve Bucks County, Montgomery County, Delaware County, and Chester County. This includes towns like Norristown, Cheltenham, Abington, Jenkintown, and many more across southeastern Pennsylvania." },
              { question: "Is there an extra charge for jobs outside of the city?", answer: "No. Our pricing is based on the scope of work, not your location. Whether you're in Philadelphia or a surrounding county, you'll receive the same honest pricing." },
            ],
          },
          roofingDetails: {
            title: "Roofing Details",
            description: "In-depth answers about costs, materials, permits, and what to expect during your roofing project.",
            items: [
              { question: "How much does a roof replacement cost in Philadelphia?", answer: "The cost of a roof replacement in Philadelphia typically ranges from $5,000 to $12,000+ depending on the size of your home, materials chosen, and the complexity of the job. Architectural shingles are the most popular choice. We provide free, detailed written estimates so you know exactly what to expect — no hidden fees." },
              { question: "Do you need a permit for a roof replacement in Philadelphia?", answer: "In most cases, yes. Philadelphia requires a building permit for roof replacements. Adilay Roofing handles the permitting process for you so you don't have to worry about it." },
              { question: "How long does a new roof last?", answer: "A new asphalt shingle roof typically lasts 25–30 years, and architectural shingles can last up to 50 years with proper maintenance. EPDM flat roofs generally last 20–25 years. The lifespan depends on materials, installation quality, ventilation, and maintenance." },
              { question: "What happens if it rains during my roof replacement?", answer: "We monitor weather closely and plan around it. If rain is expected mid-project, we use tarps and waterproof underlayment to protect your home. We never leave a roof exposed overnight. Your home's protection is always our top priority." },
              { question: "Do you use subcontractors?", answer: "No. All work is performed by our own crew of 30+ experienced professionals. We don't outsource any part of the job. This is how we maintain quality control on every project." },
              { question: "Can you replace a roof in the winter?", answer: "Yes, we can perform roof replacements year-round in the Philadelphia area. We follow manufacturer guidelines for temperature-sensitive materials and take extra precautions in colder months to ensure a proper installation." },
            ],
          },
          process: {
            title: "Our Process",
            description: "What to expect when you work with Adilay Roofing.",
            items: [
              { question: "What happens after I request a quote?", answer: "Once you submit a quote request, our team will reach out within 24 hours to schedule a convenient time for a free inspection. We'll assess your property, discuss your needs, and provide a clear, written estimate — no pressure, no obligation." },
              { question: "How do I prepare for a roof replacement?", answer: "We handle most of the prep work, but we recommend moving vehicles away from the house, securing loose items in the attic, and letting your neighbors know about the upcoming work. Our crew will protect your landscaping and clean up thoroughly when the job is done." },
              { question: "Do I need to be home during the work?", answer: "You don't need to be home for the entire project, but we ask that you're available at the start and end of each workday so we can go over progress and answer any questions. We'll keep you updated throughout." },
            ],
          },
        },
        sort_order: 0,
      });
      specialCount++;
    }

    // CONTACT PAGE
    else if (slug === "/contact") {
      contentBlocksToInsert.push({
        page_id: page.id,
        block_type: "structured_contact",
        content: {
          heroTitle: "Get In Touch",
          heroDescription: "Have a question or ready to get started? We\u2019re here to help.",
          officeHeading: "Meet the Team Behind Your Roof",
          officeDescription: "When you call Adilay Roofing, you\u2019re not dealing with a call center \u2014 you\u2019re speaking directly with the people who run and manage your project. Our family-owned office in Philadelphia is where every estimate, plan, and follow-up is handled with personal attention.",
          officeDescription2: "Stop by, give us a call, or fill out the form below \u2014 we\u2019re always happy to help.",
          formHeading: "Send Us a Message",
          formDescription: "Fill out the form below and we\u2019ll get back to you as soon as possible.",
          emergencyBannerText: "Roof Emergency? Call us now \u2014 we respond fast.",
        },
        sort_order: 0,
      });
      specialCount++;
    }

    // GET QUOTE PAGE
    else if (slug === "/get-quote") {
      contentBlocksToInsert.push({
        page_id: page.id,
        block_type: "structured_quote",
        content: {
          heroTitle: "Get Your Free Roofing Estimate",
          heroDescription: "Fill out the form below and we\u2019ll get back to you within 24 hours with a detailed, no-obligation estimate for your roofing project.",
          offerBannerText: "Limited Time: Free roof inspection with every estimate request!",
          trustSignals: [
            "Licensed & Insured (PA184779)",
            "20+ Years Experience",
            "2,000+ Projects Completed",
            "5-Star Google Rating",
          ],
          licenseHeading: "Licensed & Insured for Your Protection",
          licenseDescription: "Adilay Roofing LLC holds Pennsylvania Home Improvement Contractor License PA184779. We are fully insured with general liability and workers\u2019 compensation coverage, so you\u2019re protected throughout your project.",
          serviceAreaHeading: "Serving the Greater Philadelphia Area",
          serviceAreaDescription: "We provide free estimates throughout Philadelphia, Bucks County, Montgomery County, Delaware County, and Chester County. Whether you\u2019re in Center City or the surrounding suburbs, our team is ready to help.",
          faqHeading: "Common Questions About Getting an Estimate",
          faqSubheading: "Quick answers to help you understand our process.",
        },
        sort_order: 0,
      });
      specialCount++;
    }

    // SERVICES INDEX PAGE
    else if (slug === "/services") {
      contentBlocksToInsert.push({
        page_id: page.id,
        block_type: "structured_services_index",
        content: {
          heroTitle: "Our Roofing & Exterior Services",
          heroDescription: "Comprehensive solutions for Philadelphia properties \u2014 from roof replacement and repair to siding, windows, and gutters. Quality workmanship you can trust.",
          showcaseHeading: "Real Work. Real Results.",
          showcaseDescription1: "From full roof replacements to siding overhauls, our crew handles every project with the same level of care and professionalism. We protect your property and leave the job site clean when we\u2019re done.",
          showcaseDescription2: "Every project is managed by our experienced team \u2014 no subcontractors, no shortcuts. Just quality workmanship from start to finish.",
          whyChooseHeading: "Why Choose Adilay Roofing",
          whyChooseSubheading: "We treat every property like it\u2019s our own \u2014 with care, honesty, and attention to detail.",
          benefits: [
            { title: "Experienced Crew", description: "Our skilled team brings 20+ years of roofing and exterior experience to every project, large or small." },
            { title: "Quality Materials", description: "We use manufacturer-backed materials from trusted brands to ensure your roof or exterior stands the test of time." },
            { title: "Honest Pricing", description: "No hidden fees, no surprise charges. We provide clear, written estimates so you know exactly what to expect." },
          ],
        },
        sort_order: 0,
      });
      specialCount++;
    }

    // SERVICE AREAS INDEX PAGE
    else if (slug === "/service-areas") {
      contentBlocksToInsert.push({
        page_id: page.id,
        block_type: "structured_areas_index",
        content: {
          heroTitle: "Areas We Serve",
          heroDescription: "Professional roofing services across southeastern Pennsylvania. Wherever you are in the greater Philadelphia region, we\u2019ve got you covered.",
          mainHeading: "Trusted Roofing Services Across the Philadelphia Region",
          mainDescription: "From our home base in Philadelphia, we serve homeowners and businesses throughout the greater Philadelphia area \u2014 including communities across southeastern Pennsylvania. No matter where you are, you get the same quality workmanship and dedicated service.",
          whyLocalHeading: "Why Hiring a Local Roofer Matters",
          localBenefits: [
            { title: "Fast Response Times", description: "We\u2019re nearby and can respond quickly to emergencies and scheduled work alike." },
            { title: "Local Knowledge", description: "We understand Philadelphia\u2019s weather patterns, building codes, and common roofing challenges." },
            { title: "Community Reputation", description: "We\u2019ve built our business on referrals from satisfied neighbors. Our reputation matters to us." },
          ],
          ctaHeadline: "Need a Roofer in Your Area?",
        },
        sort_order: 0,
      });
      specialCount++;
    }

    // GALLERY PAGE
    else if (slug === "/gallery") {
      contentBlocksToInsert.push({
        page_id: page.id,
        block_type: "structured_gallery",
        content: {
          heroLabel: "Project Gallery",
          heroTitle: "Our Work Speaks",
          heroTitleRed: "for Itself",
          heroDescription: "Browse real projects completed by our team across Philadelphia and surrounding areas. Every job is done right \u2014 the first time.",
          beforeAfterLabel: "Transformations",
          beforeAfterHeading: "Before & After",
          beforeAfterDescription: "See the difference quality craftsmanship makes. Every project starts with a detailed assessment and ends with a result that exceeds expectations.",
          ctaHeadline: "Like What You See?",
          ctaSubtext: "Let us transform your roof next. Get a free, no-obligation estimate today.",
        },
        sort_order: 0,
      });
      specialCount++;
    }

    // BLOG INDEX PAGE
    else if (slug === "/blog") {
      contentBlocksToInsert.push({
        page_id: page.id,
        block_type: "structured_blog_index",
        content: {
          heroLabel: "Blog",
          heroTitle: "Roofing Tips & Expert Insights",
          heroDescription: "Practical advice for Philadelphia homeowners \u2014 from roof maintenance to choosing the right materials for your home.",
          emptyMessage: "Blog posts coming soon! Check back for expert roofing tips and guides.",
          ctaHeadline: "Need Roofing Help in Philadelphia?",
          ctaSubtext: "Contact Adilay Roofing today for a free estimate. Honest advice, quality work, no pressure.",
        },
        sort_order: 0,
      });
      specialCount++;
    }

    // FINANCING PAGE
    else if (slug === "/financing") {
      contentBlocksToInsert.push({
        page_id: page.id,
        block_type: "structured_financing",
        content: {
          heroHeadline: "Roof Financing in Philadelphia — Approved Through Service Finance Company",
          heroDescription: "A new roof is one of the most important investments you can make in your home. Don't let cost stand in the way of protecting your family. With flexible financing through Service Finance Company, you can get the roof you need now — and pay over time with manageable monthly payments.",
          howItWorks: [
            { step: "1", title: "Apply", description: "Fill out a quick application online or over the phone. It only takes a few minutes and checking your eligibility won't affect your credit score." },
            { step: "2", title: "Get Approved", description: "Receive a fast credit decision — often the same day. Choose the loan product that works best for your budget." },
            { step: "3", title: "We Start Work", description: "Once approved, we schedule your project. No payments are due until your job is complete." },
          ],
          loanOptions: [
            { title: "Same-as-Cash", description: "0% interest promotional period — pay off your balance within the promo window and pay zero interest. A great option if you want to spread payments over a few months." },
            { title: "Fixed Monthly Payments", description: "Standard installment loans with fixed monthly payments over 5–10 year terms. Predictable payments that fit your budget — no surprises." },
            { title: "Deferred Payment", description: "No payments until your project is complete. This stage-funding approach means you don't pay a cent until you're satisfied with the work." },
          ],
          benefits: [
            "Loans from $1,000 to $100,000",
            "50+ loan products to choose from",
            "Same-as-cash and 0% promotional options",
            "No payments until your job is complete",
            "Fast credit decisions — often same day",
            "No prepayment penalties",
            "Unsecured loans — home is not used as collateral",
            "Works with a range of credit profiles",
            "Available for roof replacement, repair, siding & more",
            "FHA Title I approved lender",
          ],
          trustText: "Service Finance Company, LLC is a nationally licensed sales finance company and an approved FHA Title I Lender. With over 50 loan products and a track record of helping homeowners across the country, your financing is in trusted hands.",
          faq: [
            { question: "Does Adilay Roofing offer financing?", answer: "Yes! Adilay Roofing is an authorized contractor through Service Finance Company, LLC — a nationally licensed sales finance company and FHA Title I Lender. We offer a variety of loan products to help you finance your roofing or exterior project." },
            { question: "What credit score do I need to finance a roof?", answer: "Service Finance Company works with a range of credit profiles. The best way to find out your options is to apply — checking your eligibility typically does not affect your credit score." },
            { question: "Can I finance a roof if I have insurance?", answer: "Yes. Financing and insurance are separate. If your insurance doesn't cover the full cost of your roof, financing can help you cover the difference — or fund upgrades beyond what your policy pays for." },
            { question: "How long does it take to get approved?", answer: "Credit decisions are often made the same day you apply. The process is quick and straightforward — you can apply online or over the phone." },
            { question: "Is my home used as collateral for roof financing?", answer: "No. Loans through Service Finance Company are unsecured, meaning your home is not used as collateral. This provides peace of mind and a simpler process." },
            { question: "Can I pay off my loan early?", answer: "Yes. There are no prepayment penalties, so you can pay off your loan early without any additional fees." },
            { question: "What is the minimum and maximum loan amount?", answer: "Loans range from $1,000 to $100,000, depending on your project scope and credit profile." },
          ],
          ctaHeadline: "Ready to Get Started?",
          ctaSubtext: "Apply for financing today, or contact us for a free estimate. We'll help you find the right payment option for your project.",
          bottomCtaHeadline: "Protect Your Home Today",
          bottomCtaSubtext: "Don't let cost hold you back. Finance your roofing project with Adilay Roofing and Service Finance Company. No payments until your job is complete.",
        },
        sort_order: 0,
      });
      specialCount++;
    }
  }

  // Insert content blocks in batches
  if (contentBlocksToInsert.length > 0) {
    const batchSize = 50;
    for (let i = 0; i < contentBlocksToInsert.length; i += batchSize) {
      const batch = contentBlocksToInsert.slice(i, i + batchSize);
      const { error } = await supabase.from("content_blocks").insert(batch);
      if (error) {
        results.push(`Error inserting content blocks batch ${i}: ${error.message}`);
      }
    }
    results.push(`Inserted content blocks: ${serviceCount} services, ${locationCount} locations, ${specialCount} special pages`);
  } else {
    results.push("All pages already have content blocks");
  }

  return NextResponse.json({
    message: "Migration complete",
    results,
    summary: {
      testBlogPagesRemoved: testPageIds.length,
      testBlogPostsRemoved: testSlugs.length,
      contentBlocksSeeded: contentBlocksToInsert.length,
      breakdown: {
        services: serviceCount,
        locations: locationCount,
        special: specialCount,
      },
    },
  });
}
