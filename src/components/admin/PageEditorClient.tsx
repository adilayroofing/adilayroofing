"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase";
import SEOPreview from "./SEOPreview";
import RichTextEditor from "./RichTextEditor";
import StructuredServiceEditor, { type ServiceContent } from "./StructuredServiceEditor";
import StructuredLocationEditor, { type LocationContent } from "./StructuredLocationEditor";
import StructuredFAQEditor, { type FAQPageContent } from "./StructuredFAQEditor";
import StructuredAboutEditor, { type AboutPageContent } from "./StructuredAboutEditor";
import StructuredHomeEditor, { type HomePageContent } from "./StructuredHomeEditor";
import StructuredBlogEditor, { type BlogPostContent } from "./StructuredBlogEditor";
import StructuredFinancingEditor, { type FinancingPageContent } from "./StructuredFinancingEditor";
import StructuredContactEditor, { type ContactPageContent } from "./StructuredContactEditor";
import StructuredQuoteEditor, { type QuotePageContent } from "./StructuredQuoteEditor";
import StructuredServicesIndexEditor, { type ServicesIndexPageContent } from "./StructuredServicesIndexEditor";
import StructuredAreasIndexEditor, { type AreasIndexPageContent } from "./StructuredAreasIndexEditor";
import StructuredGalleryEditor, { type GalleryPageContent } from "./StructuredGalleryEditor";
import StructuredBlogIndexEditor, { type BlogIndexPageContent } from "./StructuredBlogIndexEditor";
import { getServiceBySlug } from "@/data/services";
import { getLocationBySlug } from "@/data/locations";
import { faqs as hardcodedFaqs } from "@/data/faqs";

interface PageData {
  id: string;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  custom_head_tags: string | null;
  status: string;
}

interface ContentBlock {
  id: string;
  block_type: string;
  content: Record<string, unknown>;
  sort_order: number;
}

export default function PageEditorClient({
  page,
  contentBlocks,
  userRole,
  userEmail,
}: {
  page: PageData | null;
  contentBlocks: ContentBlock[];
  userRole: string;
  userEmail: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isNew = !page;
  const isBlogType = searchParams.get("type") === "blog";

  const [tab, setTab] = useState<"seo" | "content">(isBlogType ? "content" : "seo");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // SEO fields
  const [slug, setSlug] = useState(page?.slug || (isBlogType ? "/blog/" : ""));
  const [metaTitle, setMetaTitle] = useState(page?.meta_title || "");
  const [metaDescription, setMetaDescription] = useState(page?.meta_description || "");
  const [canonicalUrl, setCanonicalUrl] = useState(page?.canonical_url || "");
  const [ogTitle, setOgTitle] = useState(page?.og_title || "");
  const [ogDescription, setOgDescription] = useState(page?.og_description || "");
  const [ogImage, setOgImage] = useState(page?.og_image || "");
  const [customHeadTags, setCustomHeadTags] = useState(page?.custom_head_tags || "");
  const [status, setStatus] = useState(page?.status || (isBlogType ? "published" : "draft"));

  // Detect page type from slug
  const isServicePage = slug.startsWith("/services/") && slug !== "/services";
  const isLocationPage = slug.startsWith("/service-areas/") && slug !== "/service-areas";
  const isFAQPage = slug === "/faq";
  const isAboutPage = slug === "/about";
  const isHomePage = slug === "/" || slug === "";
  const isFinancingPage = slug === "/financing";
  const isContactPage = slug === "/contact";
  const isQuotePage = slug === "/get-quote";
  const isServicesIndexPage = slug === "/services";
  const isAreasIndexPage = slug === "/service-areas";
  const isGalleryPage = slug === "/gallery";
  const isBlogIndexPage = slug === "/blog";
  const isBlogPost = slug.startsWith("/blog/") && slug !== "/blog";

  // Find structured content block or rich_text block
  const structuredBlock = contentBlocks.find(
    (b) =>
      b.block_type === "structured_service" ||
      b.block_type === "structured_location" ||
      b.block_type === "structured_faq" ||
      b.block_type === "structured_about" ||
      b.block_type === "structured_home" ||
      b.block_type === "structured_financing" ||
      b.block_type === "structured_contact" ||
      b.block_type === "structured_quote" ||
      b.block_type === "structured_services_index" ||
      b.block_type === "structured_areas_index" ||
      b.block_type === "structured_gallery" ||
      b.block_type === "structured_blog_index" ||
      b.block_type === "structured_blog"
  );
  const richTextBlock = contentBlocks.find((b) => b.block_type === "rich_text");

  // Content — rich text (for blog/static pages)
  const [editorContent, setEditorContent] = useState(
    richTextBlock?.content
      ? (richTextBlock.content as { html?: string }).html || ""
      : ""
  );

  // Content — structured service (pre-fill from CMS or hardcoded data)
  const [serviceContent, setServiceContent] = useState<ServiceContent>(() => {
    if (structuredBlock?.block_type === "structured_service") {
      const c = structuredBlock.content as Record<string, unknown>;
      return {
        heroTitle: (c.heroTitle as string) || "",
        heroTagline: (c.heroTagline as string) || "",
        heroDescription: (c.heroDescription as string) || "",
        benefits: (c.benefits as string[]) || [],
        features: (c.features as string[]) || [],
        faq: (c.faq as { question: string; answer: string }[]) || [],
      };
    }
    // Pre-fill from hardcoded service data if no CMS block exists yet
    if (isServicePage) {
      const serviceSlug = slug.replace("/services/", "");
      const hardcoded = getServiceBySlug(serviceSlug);
      if (hardcoded) {
        return {
          heroTitle: `${hardcoded.title} in Philadelphia, PA`,
          heroTagline: hardcoded.tagline,
          heroDescription: hardcoded.heroDescription,
          benefits: [...hardcoded.benefits],
          features: [...hardcoded.features],
          faq: hardcoded.faq.map((f) => ({ ...f })),
        };
      }
    }
    return { heroTitle: "", heroTagline: "", heroDescription: "", benefits: [], features: [], faq: [] };
  });

  // Content — structured location (pre-fill from CMS or hardcoded data)
  const [locationContent, setLocationContent] = useState<LocationContent>(() => {
    if (structuredBlock?.block_type === "structured_location") {
      const c = structuredBlock.content as Record<string, unknown>;
      return {
        heroTitle: (c.heroTitle as string) || "",
        heroSubtitle: (c.heroSubtitle as string) || "",
        intro: (c.intro as string) || "",
        localContext: (c.localContext as string) || "",
        neighborhoods: (c.neighborhoods as string[]) || [],
        zipCodes: (c.zipCodes as string[]) || [],
        faq: (c.faq as { question: string; answer: string }[]) || [],
      };
    }
    // Pre-fill from hardcoded location data if no CMS block exists yet
    if (isLocationPage) {
      const locationSlug = slug.replace("/service-areas/", "");
      const hardcoded = getLocationBySlug(locationSlug);
      if (hardcoded) {
        return {
          heroTitle: hardcoded.h1,
          heroSubtitle: `Professional roofing services for ${hardcoded.name}, ${hardcoded.state} and surrounding areas. Licensed, insured, and trusted by local homeowners.`,
          intro: hardcoded.intro,
          localContext: hardcoded.localContext,
          neighborhoods: [...hardcoded.neighborhoods],
          zipCodes: [...hardcoded.zipCodes],
          faq: hardcoded.faq.map((f) => ({ ...f })),
        };
      }
    }
    return { heroTitle: "", heroSubtitle: "", intro: "", localContext: "", neighborhoods: [], zipCodes: [], faq: [] };
  });

  // Content — structured FAQ page (pre-fill from CMS or hardcoded data)
  const [faqContent, setFaqContent] = useState<FAQPageContent>(() => {
    if (structuredBlock?.block_type === "structured_faq") {
      const c = structuredBlock.content as Record<string, unknown>;
      return {
        heroTitle: (c.heroTitle as string) || "Frequently Asked Questions",
        heroSubtitle: (c.heroSubtitle as string) || "",
        ...(c as unknown as Omit<FAQPageContent, "heroTitle" | "heroSubtitle">),
      };
    }
    // Pre-fill from hardcoded FAQ data
    if (isFAQPage) {
      return {
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
            { question: "What is the difference between 3-tab and architectural shingles?", answer: "3-tab shingles are thinner, flat, and more affordable but have a shorter lifespan (15–20 years). Architectural shingles are thicker, more durable, offer a dimensional look, and last 25–50 years. We recommend architectural shingles for most Philadelphia homes because they handle our weather better and add more curb appeal." },
            { question: "Do you provide roof inspections?", answer: "Yes. We offer free roof inspections for homeowners in Philadelphia and surrounding counties. We'll assess your roof's condition, document any issues with photos, and give you an honest recommendation — no pressure to commit." },
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
      };
    }
    return {
      heroTitle: "",
      heroSubtitle: "",
      general: { title: "", description: "", items: [] },
      areas: { title: "", description: "", items: [] },
      roofingDetails: { title: "", description: "", items: [] },
      process: { title: "", description: "", items: [] },
    };
  });

  // Content — structured About page (pre-fill from CMS or hardcoded data)
  const [aboutContent, setAboutContent] = useState<AboutPageContent>(() => {
    if (structuredBlock?.block_type === "structured_about") {
      const c = structuredBlock.content as Record<string, unknown>;
      return {
        heroTitle: (c.heroTitle as string) || "About Adilay Roofing",
        ...(c as unknown as Omit<AboutPageContent, "heroTitle">),
      };
    }
    if (isAboutPage) {
      return {
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
      };
    }
    return {
      heroTitle: "",
      heroDescription: "",
      storyHeading: "",
      storyParagraphs: [],
      values: [],
      teamDescription: "",
    };
  });

  // Content — structured Home page (pre-fill from CMS or hardcoded data)
  const [homeContent, setHomeContent] = useState<HomePageContent>(() => {
    if (structuredBlock?.block_type === "structured_home") {
      const c = structuredBlock.content as Record<string, unknown>;
      // Handle migration from old heroHeadline field to new split fields
      const oldHeadline = c.heroHeadline as string | undefined;
      return {
        heroHeadlineWhite: (c.heroHeadlineWhite as string) || (oldHeadline ? "Philadelphia's Trusted" : ""),
        heroHeadlineRed: (c.heroHeadlineRed as string) || (oldHeadline ? "Roofing Contractor" : ""),
        heroSubheadline: (c.heroSubheadline as string) || "",
        heroDescription: (c.heroDescription as string) || "",
        whyChooseUs: (c.whyChooseUs as { title: string; description: string }[]) || [],
        teamHeading: (c.teamHeading as string) || "",
        teamParagraphs: (c.teamParagraphs as string[]) || [],
        serviceAreasHeading: (c.serviceAreasHeading as string) || "",
        serviceAreasDescription: (c.serviceAreasDescription as string) || "",
      };
    }
    if (isHomePage) {
      return {
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
      };
    }
    return {
      heroHeadlineWhite: "",
      heroHeadlineRed: "",
      heroSubheadline: "",
      heroDescription: "",
      whyChooseUs: [],
      teamHeading: "",
      teamParagraphs: [],
      serviceAreasHeading: "",
      serviceAreasDescription: "",
    };
  });

  // Content — structured Financing page
  const [financingContent, setFinancingContent] = useState<FinancingPageContent>(() => {
    if (structuredBlock?.block_type === "structured_financing") {
      const c = structuredBlock.content as Record<string, unknown>;
      return {
        heroHeadline: (c.heroHeadline as string) || "",
        heroDescription: (c.heroDescription as string) || "",
        howItWorks: (c.howItWorks as { step: string; title: string; description: string }[]) || [],
        loanOptions: (c.loanOptions as { title: string; description: string }[]) || [],
        benefits: (c.benefits as string[]) || [],
        trustText: (c.trustText as string) || "",
        faq: (c.faq as { question: string; answer: string }[]) || [],
        ctaHeadline: (c.ctaHeadline as string) || "",
        ctaSubtext: (c.ctaSubtext as string) || "",
        bottomCtaHeadline: (c.bottomCtaHeadline as string) || "",
        bottomCtaSubtext: (c.bottomCtaSubtext as string) || "",
      };
    }
    if (isFinancingPage) {
      return {
        heroHeadline: "Roof Financing in Philadelphia \u2014 Approved Through Service Finance Company",
        heroDescription: "A new roof is one of the most important investments you can make in your home. Don\u2019t let cost stand in the way of protecting your family. With flexible financing through Service Finance Company, you can get the roof you need now \u2014 and pay over time with manageable monthly payments.",
        howItWorks: [
          { step: "1", title: "Apply", description: "Fill out a quick application online or over the phone. It only takes a few minutes and checking your eligibility won\u2019t affect your credit score." },
          { step: "2", title: "Get Approved", description: "Receive a fast credit decision \u2014 often the same day. Choose the loan product that works best for your budget." },
          { step: "3", title: "We Start Work", description: "Once approved, we schedule your project. No payments are due until your job is complete." },
        ],
        loanOptions: [
          { title: "Same-as-Cash", description: "0% interest promotional period \u2014 pay off your balance within the promo window and pay zero interest." },
          { title: "Fixed Monthly Payments", description: "Standard installment loans with fixed monthly payments over 5\u201310 year terms. Predictable payments that fit your budget." },
          { title: "Deferred Payment", description: "No payments until your project is complete. This stage-funding approach means you don\u2019t pay a cent until you\u2019re satisfied." },
        ],
        benefits: [
          "Loans from $1,000 to $100,000",
          "50+ loan products to choose from",
          "Same-as-cash and 0% promotional options",
          "No payments until your job is complete",
          "Fast credit decisions \u2014 often same day",
          "No prepayment penalties",
          "Unsecured loans \u2014 home is not used as collateral",
          "Works with a range of credit profiles",
          "Available for roof replacement, repair, siding & more",
          "FHA Title I approved lender",
        ],
        trustText: "Service Finance Company, LLC is a nationally licensed sales finance company and an approved FHA Title I Lender. With over 50 loan products and a track record of helping homeowners across the country, your financing is in trusted hands.",
        faq: [
          { question: "Does Adilay Roofing offer financing?", answer: "Yes! Adilay Roofing is an authorized contractor through Service Finance Company, LLC \u2014 a nationally licensed sales finance company and FHA Title I Lender." },
          { question: "What credit score do I need to finance a roof?", answer: "Service Finance Company works with a range of credit profiles. The best way to find out your options is to apply." },
          { question: "Can I finance a roof if I have insurance?", answer: "Yes. Financing and insurance are separate. Financing can help you cover the difference or fund upgrades." },
          { question: "How long does it take to get approved?", answer: "Credit decisions are often made the same day you apply." },
          { question: "Is my home used as collateral?", answer: "No. Loans through Service Finance Company are unsecured." },
          { question: "Can I pay off my loan early?", answer: "Yes. There are no prepayment penalties." },
          { question: "What is the minimum and maximum loan amount?", answer: "Loans range from $1,000 to $100,000." },
        ],
        ctaHeadline: "Ready to Get Started?",
        ctaSubtext: "Apply for financing today, or contact us for a free estimate. We\u2019ll help you find the right payment option for your project.",
        bottomCtaHeadline: "Protect Your Home Today",
        bottomCtaSubtext: "Don\u2019t let cost hold you back. Finance your roofing project with Adilay Roofing and Service Finance Company. No payments until your job is complete.",
      };
    }
    return {
      heroHeadline: "", heroDescription: "", howItWorks: [], loanOptions: [], benefits: [],
      trustText: "", faq: [], ctaHeadline: "", ctaSubtext: "", bottomCtaHeadline: "", bottomCtaSubtext: "",
    };
  });

  // Content — structured Contact page
  const [contactContent, setContactContent] = useState<ContactPageContent>(() => {
    if (structuredBlock?.block_type === "structured_contact") {
      const c = structuredBlock.content as Record<string, unknown>;
      return {
        heroTitle: (c.heroTitle as string) || "",
        heroDescription: (c.heroDescription as string) || "",
        officeHeading: (c.officeHeading as string) || "",
        officeDescription: (c.officeDescription as string) || "",
        officeDescription2: (c.officeDescription2 as string) || "",
        formHeading: (c.formHeading as string) || "",
        formDescription: (c.formDescription as string) || "",
        emergencyBannerText: (c.emergencyBannerText as string) || "",
      };
    }
    if (isContactPage) {
      return {
        heroTitle: "Contact Us",
        heroDescription: "Have a question or need a free estimate? Reach out to our team — we're here to help with all your roofing needs.",
        officeHeading: "Our Office",
        officeDescription: "Adilay Roofing is proudly based in Philadelphia, PA. We serve homeowners and businesses across southeastern Pennsylvania.",
        officeDescription2: "Stop by our office or give us a call — we'd love to hear from you.",
        formHeading: "Send Us a Message",
        formDescription: "Fill out the form below and we'll get back to you within 24 hours.",
        emergencyBannerText: "Roof emergency? Call us now for immediate assistance.",
      };
    }
    return {
      heroTitle: "", heroDescription: "", officeHeading: "", officeDescription: "",
      officeDescription2: "", formHeading: "", formDescription: "", emergencyBannerText: "",
    };
  });

  // Content — structured Quote page
  const [quoteContent, setQuoteContent] = useState<QuotePageContent>(() => {
    if (structuredBlock?.block_type === "structured_quote") {
      const c = structuredBlock.content as Record<string, unknown>;
      return {
        heroTitle: (c.heroTitle as string) || "",
        heroDescription: (c.heroDescription as string) || "",
        offerBannerText: (c.offerBannerText as string) || "",
        trustSignals: (c.trustSignals as string[]) || [],
        licenseHeading: (c.licenseHeading as string) || "",
        licenseDescription: (c.licenseDescription as string) || "",
        serviceAreaHeading: (c.serviceAreaHeading as string) || "",
        serviceAreaDescription: (c.serviceAreaDescription as string) || "",
        faqHeading: (c.faqHeading as string) || "",
        faqSubheading: (c.faqSubheading as string) || "",
      };
    }
    if (isQuotePage) {
      return {
        heroTitle: "Get a Free Roofing Quote",
        heroDescription: "Fill out the form below for a no-obligation estimate. We'll get back to you within 24 hours.",
        offerBannerText: "Limited time: Free roof inspection with every quote request!",
        trustSignals: [
          "Licensed & Insured",
          "20+ Years Experience",
          "5-Star Google Rating",
          "2,000+ Projects Completed",
        ],
        licenseHeading: "Licensed & Insured",
        licenseDescription: "Adilay Roofing is a fully licensed and insured roofing contractor serving the Philadelphia area.",
        serviceAreaHeading: "Our Service Area",
        serviceAreaDescription: "We serve Philadelphia and surrounding counties including Bucks, Montgomery, Delaware, and Chester County.",
        faqHeading: "Frequently Asked Questions",
        faqSubheading: "Common questions about getting a roofing quote.",
      };
    }
    return {
      heroTitle: "", heroDescription: "", offerBannerText: "", trustSignals: [],
      licenseHeading: "", licenseDescription: "", serviceAreaHeading: "",
      serviceAreaDescription: "", faqHeading: "", faqSubheading: "",
    };
  });

  // Content — structured Services Index page
  const [servicesIndexContent, setServicesIndexContent] = useState<ServicesIndexPageContent>(() => {
    if (structuredBlock?.block_type === "structured_services_index") {
      const c = structuredBlock.content as Record<string, unknown>;
      return {
        heroTitle: (c.heroTitle as string) || "",
        heroDescription: (c.heroDescription as string) || "",
        showcaseHeading: (c.showcaseHeading as string) || "",
        showcaseDescription1: (c.showcaseDescription1 as string) || "",
        showcaseDescription2: (c.showcaseDescription2 as string) || "",
        whyChooseHeading: (c.whyChooseHeading as string) || "",
        whyChooseSubheading: (c.whyChooseSubheading as string) || "",
        benefits: (c.benefits as { title: string; description: string }[]) || [],
      };
    }
    if (isServicesIndexPage) {
      return {
        heroTitle: "Our Roofing Services",
        heroDescription: "From roof replacement and repair to emergency services and inspections — Adilay Roofing has you covered.",
        showcaseHeading: "Quality Work You Can See",
        showcaseDescription1: "Every project we complete reflects our commitment to quality craftsmanship and attention to detail.",
        showcaseDescription2: "Browse our recent projects to see the Adilay Roofing difference for yourself.",
        whyChooseHeading: "Why Choose Adilay Roofing?",
        whyChooseSubheading: "Here's what sets us apart from the competition.",
        benefits: [
          { title: "20+ Years Experience", description: "Two decades of trusted roofing service in the Philadelphia area." },
          { title: "Quality Materials", description: "We use only the best materials from trusted manufacturers." },
          { title: "Honest Pricing", description: "No hidden fees — just clear, written estimates every time." },
        ],
      };
    }
    return {
      heroTitle: "", heroDescription: "", showcaseHeading: "", showcaseDescription1: "",
      showcaseDescription2: "", whyChooseHeading: "", whyChooseSubheading: "", benefits: [],
    };
  });

  // Content — structured Areas Index page
  const [areasIndexContent, setAreasIndexContent] = useState<AreasIndexPageContent>(() => {
    if (structuredBlock?.block_type === "structured_areas_index") {
      const c = structuredBlock.content as Record<string, unknown>;
      return {
        heroTitle: (c.heroTitle as string) || "",
        heroDescription: (c.heroDescription as string) || "",
        mainHeading: (c.mainHeading as string) || "",
        mainDescription: (c.mainDescription as string) || "",
        whyLocalHeading: (c.whyLocalHeading as string) || "",
        localBenefits: (c.localBenefits as { title: string; description: string }[]) || [],
        ctaHeadline: (c.ctaHeadline as string) || "",
      };
    }
    if (isAreasIndexPage) {
      return {
        heroTitle: "Areas We Serve",
        heroDescription: "Professional roofing services across southeastern Pennsylvania. Wherever you are in the greater Philadelphia region, we've got you covered.",
        mainHeading: "Trusted Roofing Services Across the Philadelphia Region",
        mainDescription: "From our home base in Philadelphia, we serve homeowners and businesses throughout the greater Philadelphia area — including communities across southeastern Pennsylvania. No matter where you are, you get the same quality workmanship and dedicated service.",
        whyLocalHeading: "Why Hiring a Local Roofer Matters",
        localBenefits: [
          { title: "Fast Response Times", description: "We're nearby and can respond quickly to emergencies and scheduled work alike." },
          { title: "Local Knowledge", description: "We understand Philadelphia's weather patterns, building codes, and common roofing challenges." },
          { title: "Community Reputation", description: "We've built our business on referrals from satisfied neighbors. Our reputation matters to us." },
        ],
        ctaHeadline: "Need a Roofer in Your Area?",
      };
    }
    return {
      heroTitle: "", heroDescription: "", mainHeading: "", mainDescription: "",
      whyLocalHeading: "", localBenefits: [], ctaHeadline: "",
    };
  });

  // Content — structured Gallery page
  const [galleryContent, setGalleryContent] = useState<GalleryPageContent>(() => {
    if (structuredBlock?.block_type === "structured_gallery") {
      const c = structuredBlock.content as Record<string, unknown>;
      return {
        heroLabel: (c.heroLabel as string) || "",
        heroTitle: (c.heroTitle as string) || "",
        heroTitleRed: (c.heroTitleRed as string) || "",
        heroDescription: (c.heroDescription as string) || "",
        beforeAfterLabel: (c.beforeAfterLabel as string) || "",
        beforeAfterHeading: (c.beforeAfterHeading as string) || "",
        beforeAfterDescription: (c.beforeAfterDescription as string) || "",
        ctaHeadline: (c.ctaHeadline as string) || "",
        ctaSubtext: (c.ctaSubtext as string) || "",
      };
    }
    if (isGalleryPage) {
      return {
        heroLabel: "Project Gallery",
        heroTitle: "Our Work Speaks",
        heroTitleRed: "for Itself",
        heroDescription: "Browse real projects completed by our team across Philadelphia and surrounding areas. Every job is done right — the first time.",
        beforeAfterLabel: "Transformations",
        beforeAfterHeading: "Before & After",
        beforeAfterDescription: "See the difference quality craftsmanship makes. Every project starts with a detailed assessment and ends with a result that exceeds expectations.",
        ctaHeadline: "Like What You See?",
        ctaSubtext: "Let us transform your roof next. Get a free, no-obligation estimate today.",
      };
    }
    return {
      heroLabel: "", heroTitle: "", heroTitleRed: "", heroDescription: "",
      beforeAfterLabel: "", beforeAfterHeading: "", beforeAfterDescription: "",
      ctaHeadline: "", ctaSubtext: "",
    };
  });

  // Content — structured Blog Index page
  const [blogIndexContent, setBlogIndexContent] = useState<BlogIndexPageContent>(() => {
    if (structuredBlock?.block_type === "structured_blog_index") {
      const c = structuredBlock.content as Record<string, unknown>;
      return {
        heroLabel: (c.heroLabel as string) || "",
        heroTitle: (c.heroTitle as string) || "",
        heroDescription: (c.heroDescription as string) || "",
        emptyMessage: (c.emptyMessage as string) || "",
        ctaHeadline: (c.ctaHeadline as string) || "",
        ctaSubtext: (c.ctaSubtext as string) || "",
      };
    }
    if (isBlogIndexPage) {
      return {
        heroLabel: "Blog",
        heroTitle: "Roofing Tips & Expert Insights",
        heroDescription: "Practical advice for Philadelphia homeowners — from roof maintenance to choosing the right materials for your home.",
        emptyMessage: "Blog posts coming soon! Check back for expert roofing tips and guides.",
        ctaHeadline: "Need Roofing Help in Philadelphia?",
        ctaSubtext: "Contact Adilay Roofing today for a free estimate. Honest advice, quality work, no pressure.",
      };
    }
    return {
      heroLabel: "", heroTitle: "", heroDescription: "", emptyMessage: "",
      ctaHeadline: "", ctaSubtext: "",
    };
  });

  // Content — structured Blog post
  const [blogContent, setBlogContent] = useState<BlogPostContent>(() => {
    if (structuredBlock?.block_type === "structured_blog") {
      const c = structuredBlock.content as Record<string, unknown>;
      return {
        title: (c.title as string) || "",
        slug: (c.slug as string) || (isBlogPost ? slug.replace("/blog/", "") : ""),
        description: (c.description as string) || "",
        author: (c.author as string) || "Adilay Roofing",
        date: (c.date as string) || new Date().toISOString().split("T")[0],
        category: (c.category as string) || "general-roofing",
        readTime: (c.readTime as string) || "5 min read",
        featuredImage: (c.featuredImage as string) || "",
        primaryKeyword: (c.primaryKeyword as string) || "",
        secondaryKeywords: (c.secondaryKeywords as string[]) || [],
        bodyHtml: (c.bodyHtml as string) || "",
        faq: (c.faq as { question: string; answer: string }[]) || [],
      };
    }
    return {
      title: metaTitle || "",
      slug: isBlogPost ? slug.replace("/blog/", "") : "",
      description: metaDescription || "",
      author: "Adilay Roofing",
      date: new Date().toISOString().split("T")[0],
      category: "general-roofing",
      readTime: "5 min read",
      featuredImage: "",
      primaryKeyword: "",
      secondaryKeywords: [],
      bodyHtml: "",
      faq: [],
    };
  });
  // Load blog content from blog_posts table (bypasses content_blocks CHECK constraint issue)
  useEffect(() => {
    if (!isBlogPost || isNew || structuredBlock) return;
    const blogSlug = slug.replace("/blog/", "");
    if (!blogSlug) return;
    const supabase = createClient();
    supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", blogSlug)
      .single()
      .then(({ data }) => {
        if (data) {
          setBlogContent({
            title: data.title || "",
            slug: data.slug || "",
            description: data.description || "",
            author: data.author || "Adilay Roofing",
            date: data.date || new Date().toISOString().split("T")[0],
            category: data.category || "general-roofing",
            readTime: data.read_time || "5 min read",
            featuredImage: data.featured_image || "",
            primaryKeyword: data.primary_keyword || "",
            secondaryKeywords: data.secondary_keywords || [],
            bodyHtml: data.body_html || "",
            faq: data.faq || [],
          });
        }
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync blog editor fields → page SEO fields
  function handleBlogContentChange(updated: BlogPostContent) {
    setBlogContent(updated);
    // Sync slug
    if (updated.slug) {
      const pageSlug = `/blog/${updated.slug}`;
      setSlug(pageSlug);
      setCanonicalUrl(`https://www.adilayroofing.com${pageSlug}`);
    }
    // Sync title → meta title
    if (updated.title) {
      setMetaTitle(`${updated.title} | Adilay Roofing`);
    }
    // Sync description → meta description
    if (updated.description) {
      setMetaDescription(updated.description);
    }
    // Sync featured image → og image
    if (updated.featuredImage) {
      setOgImage(updated.featuredImage);
    }
  }

  const [deleting, setDeleting] = useState(false);

  async function handleDeleteBlogPost() {
    if (!page || !isBlogPost) return;
    if (!confirm("Are you sure you want to delete this blog post? This cannot be undone.")) return;

    setDeleting(true);
    setMessage(null);
    const supabase = createClient();
    const blogSlug = slug.replace("/blog/", "");

    try {
      // Delete from blog_posts table
      await supabase.from("blog_posts").delete().eq("slug", blogSlug);
      // Delete content blocks
      await supabase.from("content_blocks").delete().eq("page_id", page.id);
      // Delete revisions
      await supabase.from("page_revisions").delete().eq("page_id", page.id);
      // Delete the page itself
      const { error } = await supabase.from("pages").delete().eq("id", page.id);
      if (error) throw error;

      await supabase.from("activity_log").insert({
        user_email: userEmail,
        action: `Deleted blog post: ${slug}`,
        details: { slug, page_id: page.id },
      });

      setMessage({ type: "success", text: "Blog post deleted. Redirecting..." });
      await new Promise((r) => setTimeout(r, 1000));
      router.push("/admin/pages");
      router.refresh();
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Failed to delete" });
    } finally {
      setDeleting(false);
    }
  }

  const canonicalValid =
    !canonicalUrl || canonicalUrl.startsWith("https://www.adilayroofing.com");

  async function handleSave(asPending: boolean) {
    if (userRole === "viewer") {
      setMessage({ type: "error", text: "View-only users cannot save changes." });
      return;
    }
    setSaving(true);
    setMessage(null);

    const supabase = createClient();

    const pageData = {
      slug,
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
      canonical_url: canonicalUrl || null,
      og_title: ogTitle || null,
      og_description: ogDescription || null,
      og_image: ogImage || null,
      custom_head_tags: customHeadTags || null,
      status,
      updated_by: userEmail,
    };

    try {
      // Determine content to save based on page type
      const contentPayload = isServicePage
        ? { blockType: "structured_service" as const, data: serviceContent }
        : isLocationPage
          ? { blockType: "structured_location" as const, data: locationContent }
          : isFAQPage
            ? { blockType: "structured_faq" as const, data: faqContent }
            : isAboutPage
              ? { blockType: "structured_about" as const, data: aboutContent }
              : isHomePage
                ? { blockType: "structured_home" as const, data: homeContent }
                : isFinancingPage
                  ? { blockType: "structured_financing" as const, data: financingContent }
                : isContactPage
                  ? { blockType: "structured_contact" as const, data: contactContent }
                : isQuotePage
                  ? { blockType: "structured_quote" as const, data: quoteContent }
                : isServicesIndexPage
                  ? { blockType: "structured_services_index" as const, data: servicesIndexContent }
                : isAreasIndexPage
                  ? { blockType: "structured_areas_index" as const, data: areasIndexContent }
                : isGalleryPage
                  ? { blockType: "structured_gallery" as const, data: galleryContent }
                : isBlogIndexPage
                  ? { blockType: "structured_blog_index" as const, data: blogIndexContent }
                : isBlogPost
                  ? { blockType: "structured_blog" as const, data: blogContent }
                  : { blockType: "rich_text" as const, data: { html: editorContent } };

      if (asPending) {
        // Editor submits for review
        const { error } = await supabase.from("pending_changes").insert({
          table_name: "pages",
          record_id: page?.id || "00000000-0000-0000-0000-000000000000",
          change_type: isNew ? "create" : "update",
          old_value: page || null,
          new_value: { ...pageData, content_block_type: contentPayload.blockType, content_data: contentPayload.data },
          submitted_by: userEmail,
          status: "pending",
        });
        if (error) throw error;

        // Log activity
        await supabase.from("activity_log").insert({
          user_email: userEmail,
          action: `Submitted ${isNew ? "new page" : "edit"} for review: ${slug}`,
          details: { slug, change_type: isNew ? "create" : "update" },
        });

        setMessage({ type: "success", text: "Changes submitted for review!" });
      } else {
        // Admin saves directly
        if (isNew) {
          const { data: newPage, error } = await supabase
            .from("pages")
            .insert(pageData)
            .select()
            .single();
          if (error) throw error;

          // Save content block
          await supabase.from("content_blocks").insert({
            page_id: newPage.id,
            block_type: contentPayload.blockType,
            content: contentPayload.data,
            sort_order: 0,
          });

          // Also save to blog_posts table for blog pages
          if (isBlogPost && contentPayload.blockType === "structured_blog") {
            const bp = contentPayload.data as BlogPostContent;
            await supabase.from("blog_posts").upsert({
              slug: bp.slug,
              title: bp.title,
              description: bp.description,
              author: bp.author,
              date: bp.date,
              category: bp.category,
              read_time: bp.readTime,
              featured_image: bp.featuredImage || null,
              primary_keyword: bp.primaryKeyword || null,
              secondary_keywords: bp.secondaryKeywords.filter(Boolean),
              body_html: bp.bodyHtml,
              faq: bp.faq,
              status,
              updated_by: userEmail,
            }, { onConflict: "slug" });
          }

          await supabase.from("activity_log").insert({
            user_email: userEmail,
            action: `Created page: ${slug}`,
            details: { slug, page_id: newPage.id },
          });

          setMessage({ type: "success", text: "Blog post created successfully! Redirecting..." });
          setSaving(false);
          await new Promise((r) => setTimeout(r, 1500));
          router.push(`/admin/pages/${newPage.id}`);
          router.refresh();
        } else {
          // Save revision snapshot before overwriting (for revert)
          const existingBlock = structuredBlock || richTextBlock;
          const { error: revError } = await supabase.from("page_revisions").insert({
            page_id: page.id,
            slug: page.slug,
            page_data: page,
            content_data: existingBlock?.content || {},
            block_type: existingBlock?.block_type || contentPayload.blockType,
            saved_by: userEmail,
          });
          if (revError) {
            console.warn("Failed to save revision:", revError.message);
          }

          const { error } = await supabase
            .from("pages")
            .update(pageData)
            .eq("id", page.id);
          if (error) throw error;

          // Update or create content block
          if (existingBlock) {
            await supabase
              .from("content_blocks")
              .update({ block_type: contentPayload.blockType, content: contentPayload.data })
              .eq("id", existingBlock.id);
          } else {
            await supabase.from("content_blocks").insert({
              page_id: page.id,
              block_type: contentPayload.blockType,
              content: contentPayload.data,
              sort_order: 0,
            });
          }

          // Also save to blog_posts table for blog pages
          if (isBlogPost && contentPayload.blockType === "structured_blog") {
            const bp = contentPayload.data as BlogPostContent;
            await supabase.from("blog_posts").upsert({
              slug: bp.slug,
              title: bp.title,
              description: bp.description,
              author: bp.author,
              date: bp.date,
              category: bp.category,
              read_time: bp.readTime,
              featured_image: bp.featuredImage || null,
              primary_keyword: bp.primaryKeyword || null,
              secondary_keywords: bp.secondaryKeywords.filter(Boolean),
              body_html: bp.bodyHtml,
              faq: bp.faq,
              status,
              updated_by: userEmail,
            }, { onConflict: "slug" });
          }

          await supabase.from("activity_log").insert({
            user_email: userEmail,
            action: `Updated page: ${slug}`,
            details: { slug, page_id: page.id },
          });

          setMessage({ type: "success", text: "Page saved!" });
          router.refresh();
        }
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to save",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {isNew ? "New Page" : "Edit Page"}
          </h1>
          {!isNew && <p className="text-gray-400 text-sm mt-1">{page.slug}</p>}
        </div>
        <div className="flex gap-2 items-center">
          {userRole === "viewer" ? (
            <span className="px-3 py-1.5 bg-gray-700 text-gray-400 text-sm font-medium rounded-lg">
              👁 View Only
            </span>
          ) : userRole === "editor" ? (
            <button
              onClick={() => handleSave(true)}
              disabled={saving || !slug}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {saving ? "Submitting..." : "Submit for Review"}
            </button>
          ) : (
            <>
              {!isNew && isBlogPost && (
                <button
                  onClick={handleDeleteBlogPost}
                  disabled={deleting}
                  className="px-4 py-2 bg-gray-700 hover:bg-red-700 disabled:bg-gray-700 text-gray-300 hover:text-white text-sm font-medium rounded-lg transition-colors"
                >
                  {deleting ? "Deleting..." : "Delete Post"}
                </button>
              )}
              <button
                onClick={() => handleSave(false)}
                disabled={saving || !slug}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                {saving ? "Saving..." : "Save Directly"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Viewer read-only banner */}
      {userRole === "viewer" && (
        <div className="mb-4 p-3 rounded-lg text-sm bg-blue-500/10 border border-blue-500/20 text-blue-400">
          You are viewing this page in read-only mode. Contact an admin if you need edit access.
        </div>
      )}

      {/* Message */}
      {message && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm ${
            message.type === "success"
              ? "bg-green-500/10 border border-green-500/20 text-green-400"
              : "bg-red-500/10 border border-red-500/20 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-800 rounded-lg p-1 w-fit">
        <button
          onClick={() => setTab("seo")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            tab === "seo"
              ? "bg-gray-700 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          SEO Fields
        </button>
        <button
          onClick={() => setTab("content")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            tab === "content"
              ? "bg-gray-700 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Content
        </button>
      </div>

      {/* Form fields — disabled for viewer role */}
      <div className={userRole === "viewer" ? "pointer-events-none opacity-75 select-none" : ""}>

      {/* SEO Tab */}
      {tab === "seo" && (
        <div className="space-y-6">
          {/* Slug */}
          <Field label="Page Slug" required>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="/services/roof-replacement"
              className="input-field"
            />
            <p className="text-xs text-gray-500 mt-1">
              Path like /services/roof-replacement or /blog/my-post
            </p>
          </Field>

          {/* Meta Title */}
          <Field label="Meta Title" count={metaTitle.length} warnAt={60}>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="Page Title | Adilay Roofing"
              className="input-field"
            />
          </Field>

          {/* Meta Description */}
          <Field label="Meta Description" count={metaDescription.length} warnAt={160}>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="A compelling description of this page..."
              rows={3}
              className="input-field resize-y"
            />
          </Field>

          {/* Canonical URL */}
          <Field label="Canonical URL">
            <input
              type="url"
              value={canonicalUrl}
              onChange={(e) => setCanonicalUrl(e.target.value)}
              placeholder="https://www.adilayroofing.com/services/roof-replacement"
              className={`input-field ${!canonicalValid ? "!border-red-500" : ""}`}
            />
            {!canonicalValid && (
              <p className="text-xs text-red-400 mt-1">
                Must start with https://www.adilayroofing.com
              </p>
            )}
          </Field>

          {/* OG fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="OG Title">
              <input
                type="text"
                value={ogTitle}
                onChange={(e) => setOgTitle(e.target.value)}
                placeholder="Open Graph title"
                className="input-field"
              />
            </Field>
            <Field label="OG Image URL">
              <input
                type="url"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                placeholder="https://..."
                className="input-field"
              />
            </Field>
          </div>

          <Field label="OG Description">
            <textarea
              value={ogDescription}
              onChange={(e) => setOgDescription(e.target.value)}
              placeholder="Open Graph description"
              rows={2}
              className="input-field resize-y"
            />
          </Field>

          {/* Custom Head Tags */}
          <Field label="Custom Head Tags">
            <textarea
              value={customHeadTags}
              onChange={(e) => setCustomHeadTags(e.target.value)}
              placeholder='<script type="application/ld+json">...</script>'
              rows={5}
              className="input-field font-mono text-sm resize-y"
            />
            <p className="text-xs text-gray-500 mt-1">
              Raw HTML injected into the page {"<head>"} (schema markup, hreflang, etc.)
            </p>
          </Field>

          {/* Status */}
          <Field label="Status">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="input-field"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>

          {/* Google Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Google Search Preview
            </label>
            <SEOPreview
              title={metaTitle}
              description={metaDescription}
              url={canonicalUrl || `https://www.adilayroofing.com${slug}`}
            />
          </div>
        </div>
      )}

      {/* Content Tab */}
      {tab === "content" && (
        <div>
          {isServicePage ? (
            <>
              <p className="text-gray-400 text-sm mb-4">
                Edit the service page content below. Each section maps to a styled section on the live site.
              </p>
              <StructuredServiceEditor content={serviceContent} onChange={setServiceContent} />
            </>
          ) : isLocationPage ? (
            <>
              <p className="text-gray-400 text-sm mb-4">
                Edit the location page content below. Each section maps to a styled section on the live site.
              </p>
              <StructuredLocationEditor content={locationContent} onChange={setLocationContent} />
            </>
          ) : isFAQPage ? (
            <>
              <p className="text-gray-400 text-sm mb-4">
                Edit the FAQ page content below. Each category maps to a styled section on the live site.
              </p>
              <StructuredFAQEditor content={faqContent} onChange={setFaqContent} />
            </>
          ) : isAboutPage ? (
            <>
              <p className="text-gray-400 text-sm mb-4">
                Edit the About page content below. Each field maps to a styled section on the live site.
              </p>
              <StructuredAboutEditor content={aboutContent} onChange={setAboutContent} />
            </>
          ) : isHomePage ? (
            <>
              <p className="text-gray-400 text-sm mb-4">
                Edit the homepage content below. Each section maps to a styled section on the live site.
              </p>
              <StructuredHomeEditor content={homeContent} onChange={setHomeContent} />
            </>
          ) : isFinancingPage ? (
            <>
              <p className="text-gray-400 text-sm mb-4">
                Edit the financing page content below. Each section maps to a styled section on the live site.
              </p>
              <StructuredFinancingEditor content={financingContent} onChange={setFinancingContent} />
            </>
          ) : isContactPage ? (
            <>
              <p className="text-gray-400 text-sm mb-4">
                Edit the contact page content below. Each section maps to a styled section on the live site.
              </p>
              <StructuredContactEditor content={contactContent} onChange={setContactContent} />
            </>
          ) : isQuotePage ? (
            <>
              <p className="text-gray-400 text-sm mb-4">
                Edit the quote page content below. Each section maps to a styled section on the live site.
              </p>
              <StructuredQuoteEditor content={quoteContent} onChange={setQuoteContent} />
            </>
          ) : isServicesIndexPage ? (
            <>
              <p className="text-gray-400 text-sm mb-4">
                Edit the services index page content below. Each section maps to a styled section on the live site.
              </p>
              <StructuredServicesIndexEditor content={servicesIndexContent} onChange={setServicesIndexContent} />
            </>
          ) : isAreasIndexPage ? (
            <>
              <p className="text-gray-400 text-sm mb-4">
                Edit the service areas index page content below. Each section maps to a styled section on the live site.
              </p>
              <StructuredAreasIndexEditor content={areasIndexContent} onChange={setAreasIndexContent} />
            </>
          ) : isGalleryPage ? (
            <>
              <p className="text-gray-400 text-sm mb-4">
                Edit the gallery page content below. Each section maps to a styled section on the live site.
              </p>
              <StructuredGalleryEditor content={galleryContent} onChange={setGalleryContent} />
            </>
          ) : isBlogIndexPage ? (
            <>
              <p className="text-gray-400 text-sm mb-4">
                Edit the blog index page content below. Each section maps to a styled section on the live site.
              </p>
              <StructuredBlogIndexEditor content={blogIndexContent} onChange={setBlogIndexContent} />
            </>
          ) : isBlogPost ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-400 text-sm">
                  Edit the blog post content below. Add a hero image, write your article with inline images, and optionally add FAQ items for SEO.
                </p>
                <div className="flex items-center gap-2 ml-4 shrink-0">
                  <label className="text-sm font-medium text-gray-300">Status:</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                      status === "published"
                        ? "bg-green-500/10 border-green-500/30 text-green-400"
                        : "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                    }`}
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
              <StructuredBlogEditor content={blogContent} onChange={handleBlogContentChange} />
            </>
          ) : (
            <>
              <p className="text-gray-400 text-sm mb-4">
                Rich text content for this page. Supports headings, links, images, tables, and raw HTML.
              </p>
              <RichTextEditor content={editorContent} onChange={setEditorContent} />
            </>
          )}
        </div>
      )}

      </div>{/* end viewer-disabled wrapper */}

      {/* Global styles for input fields */}
      <style jsx global>{`
        .input-field {
          width: 100%;
          padding: 0.625rem 1rem;
          background: rgb(31 41 55);
          border: 1px solid rgb(75 85 99);
          border-radius: 0.5rem;
          color: white;
          font-size: 0.875rem;
          outline: none;
        }
        .input-field:focus {
          border-color: transparent;
          box-shadow: 0 0 0 2px rgb(220 38 38);
        }
        .input-field::placeholder {
          color: rgb(107 114 128);
        }

        /* ── Inline Rich Text Field ─────────────────────── */
        .inline-rich-field-wrapper {
          position: relative;
          background: rgb(31 41 55);
          border: 1px solid rgb(75 85 99);
          border-radius: 0.5rem;
          overflow: hidden;
          transition: box-shadow 0.15s, border-color 0.15s;
        }
        .inline-rich-field-wrapper:focus-within {
          border-color: transparent;
          box-shadow: 0 0 0 2px rgb(220 38 38);
        }
        .inline-rich-toolbar {
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 4px 8px;
          background: rgb(24 32 43);
          border-bottom: 1px solid rgb(55 65 81);
        }
        .irt-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 3px 6px;
          font-size: 0.75rem;
          color: rgb(156 163 175);
          background: transparent;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.1s, color 0.1s;
        }
        .irt-btn:hover {
          background: rgb(55 65 81);
          color: white;
        }
        .irt-btn-active {
          background: rgb(55 65 81);
          color: rgb(248 113 113);
        }
        .irt-separator {
          width: 1px;
          height: 16px;
          background: rgb(55 65 81);
          margin: 0 4px;
        }
        .irt-link-popup {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          z-index: 50;
          padding: 12px;
          background: rgb(17 24 39);
          border: 1px solid rgb(55 65 81);
          border-radius: 0 0 0.5rem 0.5rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.4);
        }
        .inline-rich-editor-content {
          padding: 0.625rem 1rem;
          color: white;
          font-size: 0.875rem;
          outline: none;
          line-height: 1.6;
        }
        .inline-rich-editor-content p {
          margin: 0 0 0.25em 0;
        }
        .inline-rich-editor-content p:last-child {
          margin-bottom: 0;
        }
        .inline-rich-editor-content p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: rgb(107 114 128);
          float: left;
          height: 0;
          pointer-events: none;
        }
        .inline-rich-editor-content a,
        .inline-rich-editor-content .cms-inline-link {
          color: rgb(96 165 250);
          text-decoration: underline;
          cursor: pointer;
        }
        .inline-rich-editor-content a:hover,
        .inline-rich-editor-content .cms-inline-link:hover {
          color: rgb(147 197 253);
        }
        .inline-rich-editor-content .ProseMirror {
          outline: none;
        }
        .inline-rich-editor-content .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: rgb(107 114 128);
          float: left;
          height: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
  required,
  count,
  warnAt,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  count?: number;
  warnAt?: number;
}) {
  const overLimit = count !== undefined && warnAt !== undefined && count > warnAt;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="block text-sm font-medium text-gray-300">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
        {count !== undefined && warnAt !== undefined && (
          <span
            className={`text-xs ${
              overLimit ? "text-amber-400" : "text-gray-500"
            }`}
          >
            {count}/{warnAt}
            {overLimit && " (over recommended)"}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
