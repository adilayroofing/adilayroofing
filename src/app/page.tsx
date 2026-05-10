import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { faqs } from "@/data/faqs";
import { locations } from "@/data/locations";
import { getAllPosts } from "@/lib/blog";
import ServiceCard from "@/components/ServiceCard";
import TrustBar from "@/components/TrustBar";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import FAQ from "@/components/FAQ";
import BlogCard from "@/components/blog/BlogCard";
import ScrollReveal from "@/components/ScrollReveal";
import SafeHTML from "@/components/SafeHTML";
import BBBSeal from "@/components/BBBSeal";
import { stripHtml } from "@/lib/schema";

const BASE_URL = "https://www.adilayroofing.com";

// 24h ISR window. Vercel Hobby ISR-write budget = 200K/mo, and a 60s window
// across ~120 ISR routes burned the cap in days once crawler activity ramped
// up. Content here changes infrequently; a fresh deploy regenerates everything
// instantly anyway, so 24h is plenty for CMS-edit propagation.
export const revalidate = 86400;

// ---------------------------------------------------------------------------
// Dynamic metadata
// ---------------------------------------------------------------------------
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      // Brand-first title format: lifts CTR on branded "adilay" queries (was 1.54%
      // at pos 4.6 — way too low for a brand-name match). "Adilay Roofing" is
      // also the exact Google Business Profile name, so this should resolve any
      // SERP confusion.
      absolute: "Adilay Roofing — Philadelphia Roofing Contractor | Free Estimates",
    },
    description:
      // Brand-led description with concrete trust signals. Includes license #,
      // 5-star review claim (verify GBP rating before deploy), and phone for
      // direct-call attribution. Length 152ch — under Google's 155–160 truncation.
      "Adilay Roofing — licensed Philadelphia roofers (PA184779). Roof replacement, repair & 24/7 emergency. 5-star reviews. Free estimates (267) 255-3620.",
    keywords: [
      "roofer Philadelphia",
      "roofing contractor Philadelphia",
      "trusted roofer Philadelphia",
      "roof replacement Philadelphia",
      "roof repair Philadelphia",
      "Philadelphia roofer",
      "roofer near me",
      "roofing company near me",
      "affordable roofer Philadelphia",
      "flat roofing Philadelphia",
      "siding installation Philadelphia",
      "emergency roof repair Philadelphia",
      "licensed roofer PA",
      "free roofing estimate Philadelphia",
    ],
    alternates: {
      canonical: BASE_URL,
    },
    openGraph: {
      title: "Adilay Roofing | Trusted Roofing Contractor in Philadelphia, PA",
      description:
        "Philadelphia's trusted roofing experts. 20+ years, 2,000+ projects completed. Roof replacement, repair, flat roofing, siding & more. Free estimates!",
      url: BASE_URL,
      images: [
        {
          url: `${BASE_URL}/images/adilay-van-service-areas.jpg`,
          width: 1534,
          height: 969,
          alt: "Adilay Roofing crew and van completing a roofing project in Philadelphia",
        },
      ],
    },
  };
}

// Priority service-area slugs surfaced on the homepage so Googlebot can crawl
// them at depth 1. Grouped by county; order within each group reflects
// search/business priority, not alphabetical.
const HOMEPAGE_AREA_SLUGS: Record<string, string[]> = {
  "Philadelphia & Neighborhoods": [
    "philadelphia",
    "fishtown",
    "northern-liberties",
    "south-philadelphia",
    "northeast-philadelphia",
    "center-city",
    "manayunk",
    "roxborough",
    "west-philadelphia",
    "north-philadelphia",
  ],
  "Montgomery County, PA": [
    "montgomery-county",
    "norristown",
    "king-of-prussia",
    "abington",
    "cheltenham",
    "conshohocken",
  ],
  "Bucks County, PA": [
    "bucks-county",
    "levittown",
    "bensalem",
    "doylestown",
  ],
  "Delaware County, PA": [
    "delaware-county",
    "upper-darby",
    "media",
    "drexel-hill",
    "havertown",
  ],
  "Chester County, PA": ["chester-county", "west-chester"],
  "South Jersey": [
    "camden-county",
    "cherry-hill",
    "burlington-county",
    "mount-laurel",
  ],
};

// ---------------------------------------------------------------------------
// Hardcoded fallback data
// ---------------------------------------------------------------------------
const fallbackWhyChooseUs = [
  {
    title: "Experienced Crew",
    description:
      "Over 20 years of hands-on roofing experience in the Philadelphia area.",
    bgImage: "/images/experienced-crew-adilay-roofing-philadelphia.jpg",
  },
  {
    title: "Quality Materials",
    description:
      "We use quality materials from trusted manufacturers for lasting results.",
    bgImage: "/images/quality-roofing-materials-adilay.jpg",
  },
  {
    title: "Honest Pricing",
    description:
      "Clear, written proposals with no hidden fees or surprise charges.",
    bgImage: "/images/adilay-roofing-honest-pricing-proposal.jpg",
  },
  {
    title: "Flexible Financing",
    description:
      'Approved through Service Finance Company. Break your project into manageable monthly payments \u2014 no home equity required. <a href="/financing">Learn more</a>',
    bgImage: "/images/adilay-roofing-honest-pricing-proposal.jpg",
  },
];

// Icons for Why Choose Us cards — mapped by index (design stays the same)
const whyChooseUsIcons = [
  <svg key="0" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>,
  <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>,
  <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>,
];

// Background images for Why Choose Us — mapped by index
const whyChooseUsBgImages = [
  "/images/experienced-crew-adilay-roofing-philadelphia.jpg",
  "/images/quality-roofing-materials-adilay.jpg",
  "/images/adilay-roofing-honest-pricing-proposal.jpg",
  "/images/adilay-roofing-honest-pricing-proposal.jpg",
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default async function Home() {
  // All content sourced directly from this file — CMS deprecated 2026-05-10.
  // H1 keeps "Philadelphia" + "Roofing" for the primary keyword match; full
  // keyword-rich body copy lives in the "Roofing Contractors Philadelphia
  // Homeowners Trust" section below.
  const heroHeadlineWhite = "Philadelphia's Trusted";
  const heroHeadlineRed = "Roofing Contractor";
  const heroSubheadline =
    "Roof repair, replacement & 24/7 emergency — family-owned, licensed PA184779.";

  const whyChooseUs = fallbackWhyChooseUs;

  const teamHeading = "Family-Owned. Locally Trusted.";
  const teamParagraphs = [
    "Adilay Roofing is a family-run business built on hard work, honest service, and a genuine commitment to every homeowner we serve. From our office in Philadelphia, we manage every project personally — no subcontractors, no runaround.",
    "With over 20 years of experience and a crew that treats your home like their own, you get more than a contractor — you get a team that stands behind every shingle, every seam, and every promise.",
  ];

  const serviceAreasHeading = "Serving Philadelphia & Beyond";
  const serviceAreasDescription = "We proudly serve homeowners and businesses across southeastern Pennsylvania.";

  // FAQPage schema — must match the 8 FAQs rendered by <FAQ items={faqs.slice(0, 8)} />
  // below. stripHtml removes any inline anchors (e.g. financing link) and
  // decodes entities so Google sees clean plain-text Q&A.
  const homepageFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.slice(0, 8).map((faq) => ({
      "@type": "Question",
      name: stripHtml(faq.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(faq.answer),
      },
    })),
  };

  // Fetch latest blog posts
  const latestPosts = (await getAllPosts()).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }}
      />
      {/* ============================================ */}
      {/* HERO SECTION                                 */}
      {/* ============================================ */}
      <section className="relative min-h-[clamp(540px,70vh,640px)] md:min-h-[600px] lg:min-h-[640px] flex items-stretch md:items-center justify-center bg-brand-darker overflow-hidden">
        {/* Hero background image */}
        <img
          src="/images/hero-van.jpg"
          alt="Adilay Roofing van and crew at a roofing job site in Philadelphia PA"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Content — on mobile splits into top (heading) + bottom (CTAs + trust)
            so the van branding stays visible in the middle. On md+ it's a normal
            vertically-centered block. */}
        <div className="relative z-10 container-wide mx-auto px-4 pt-10 pb-3 md:py-16 lg:py-20 text-center w-full flex flex-col justify-between md:block">
          {/* Top: headline + subtitle */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] mb-4 md:mb-5 text-balance">
              {heroHeadlineWhite}
              <br />
              <span className="text-brand-red">{heroHeadlineRed}</span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl font-light text-white/90 mb-0 md:mb-8 max-w-xl mx-auto leading-snug">
              {heroSubheadline}
            </p>
          </div>

          {/* Bottom: CTAs, text-us link, trust-badge cards */}
          <div className="mt-8 md:mt-0">
            <div className="flex flex-row items-center justify-center gap-2 sm:gap-4">
              <Link
                href="/get-quote"
                className="btn-primary border-2 border-transparent px-4 py-2.5 text-sm sm:px-8 sm:py-4 sm:text-lg"
              >
                Get Your FREE Quote
              </Link>
              <a
                href={`tel:${company.phoneRaw}`}
                className="btn-outline-white px-4 py-2.5 text-sm sm:px-8 sm:py-4 sm:text-lg"
              >
                <svg
                  className="w-4 h-4 mr-1.5 sm:w-5 sm:h-5 sm:mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call {company.phone}
              </a>
            </div>

            <a
              href="sms:+12672553620&body=Hi%2C%20I%27m%20interested%20in%20a%20free%20roofing%20estimate."
              className="inline-flex items-center gap-1.5 mt-3 sm:mt-4 text-base font-bold text-white hover:text-white/80 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              or text us — fast response
            </a>

            <ScrollReveal delay={150} duration={500} distance={12}>
              <ul className="mt-5 md:mt-7 mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 max-w-sm md:max-w-3xl">
                <li className="bg-white rounded-md flex items-center justify-center p-0.5 h-20 overflow-hidden">
                  <img
                    src="/images/google-business-review-5-stars.png"
                    alt="Adilay Roofing — 5.0 stars on Google Business Reviews"
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </li>
                <li className="bg-white rounded-md flex items-center justify-center p-0.5 h-20 overflow-hidden">
                  <a
                    href="https://www.bbb.org/us/pa/philadelphia/profile/roofing-contractors/adilay-roofing-llc-0241-236104655/#sealclick"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="block h-full w-full"
                  >
                    <img
                      src="https://seal-dc-easternpa.bbb.org/seals/blue-seal-160-82-bbb-236104655.png"
                      alt="Adilay Roofing — BBB Accredited Business"
                      loading="lazy"
                      width={160}
                      height={82}
                      className="h-full w-full object-contain"
                      style={{ border: 0 }}
                    />
                  </a>
                </li>
                <li className="bg-white rounded-md flex items-center justify-center gap-2 p-1.5 h-20">
                  <img
                    src="/images/gaf-certified-logo.jpg"
                    alt="GAF Certified Contractor"
                    loading="lazy"
                    className="h-full w-auto aspect-square object-contain flex-shrink-0"
                  />
                  <span className="text-brand-dark font-bold text-xs md:text-sm leading-tight text-left">
                    GAF<br />Certified
                  </span>
                </li>
                <li className="bg-white rounded-md flex flex-col items-center justify-center p-1.5 h-20">
                  <span className="text-[11px] md:text-xs text-brand-gray font-semibold uppercase tracking-wider">
                    Licensed PA
                  </span>
                  <span className="text-brand-dark font-extrabold text-lg md:text-2xl leading-tight mt-0.5">
                    #PA184779
                  </span>
                </li>
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TRUST BAR                                    */}
      {/* ============================================ */}
      <TrustBar />

      {/* ============================================ */}
      {/* FINANCING BANNER                             */}
      {/* ============================================ */}
      <section className="bg-brand-light border-y border-brand-border">
        <div className="container-wide mx-auto px-4 py-5 md:py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-center md:text-left">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-brand-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <p className="text-brand-dark text-sm md:text-base">
                <strong className="font-bold">Financing Available</strong>
                <span className="hidden sm:inline"> &mdash; </span>
                <br className="sm:hidden" />
                <span className="text-brand-gray">Approved through Service Finance Company. Apply in minutes. No payments until your project is complete.</span>
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link href="/financing" className="text-brand-red font-bold text-sm hover:underline whitespace-nowrap">
                Learn More
              </Link>
              <span className="text-brand-border">|</span>
              <Link href="/financing" className="text-brand-red font-bold text-sm hover:underline whitespace-nowrap">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SERVICES SECTION                             */}
      {/* ============================================ */}
      <section className="section-padding bg-white">
        <div className="container-wide mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8 md:mb-16">
              <h2 className="section-heading">
                Our Roofing &amp; Exterior Services
              </h2>
              <p className="section-subheading mx-auto mt-4">
                Everything your property needs — from the roof down.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-8">
            {services.slice(0, 6).map((service, i) => (
              <ScrollReveal key={service.slug} delay={i * 80} distance={20}>
                <ServiceCard service={service} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={200}>
            <div className="text-center mt-12">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-brand-red font-bold text-lg hover:gap-3 transition-all duration-200"
              >
                View All Services
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================ */}
      {/* INTRO / TRUST BODY COPY                      */}
      {/* ============================================ */}
      <section className="bg-white border-t border-brand-border">
        <div className="section-padding">
          <div className="container-narrow mx-auto">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
                  Roofing Contractors Philadelphia Homeowners Trust
                </h2>
                <div className="space-y-5 text-brand-gray leading-relaxed text-base md:text-lg">
                  <p>
                    Philadelphia roofs take a beating. Row-home flat roofs get ponding water after every nor&rsquo;easter. Slate and Spanish-tile roofs in Chestnut Hill and Mt. Airy shed pieces after every freeze-thaw cycle. Ice dams form behind the parapet walls in Fishtown and Northern Liberties every January. After 20+ years working on Philadelphia homes and businesses, we know exactly how these roofs fail &mdash; and how to fix them so they stay fixed.
                  </p>
                  <p>
                    Adilay Roofing is a family-owned, Philadelphia-based roofing contractor licensed in Pennsylvania (<strong>PA184779</strong>) and fully insured. We&rsquo;ve completed over 2,000 projects across Philadelphia County, Bucks County, Montgomery County, Delaware County, and Chester County. Our 30-person crew handles every job in-house &mdash; no subcontracted labor, no day-of surprises.
                  </p>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-brand-dark mt-10 mb-4">
                  Every Major Roofing Service for Philadelphia Properties
                </h3>
                <p className="text-brand-gray leading-relaxed text-base md:text-lg mb-4">
                  Whether your roof is leaking tonight or you&rsquo;re planning a full replacement this spring, we handle the full scope of Philadelphia roofing work:
                </p>
                <ul className="space-y-2 text-brand-gray text-base md:text-lg list-disc pl-6 mb-6">
                  <li>
                    <Link href="/services/roof-replacement" className="text-brand-red font-semibold hover:underline">Roof replacement</Link> &mdash; architectural shingles, standing-seam metal, EPDM rubber, TPO, and modified bitumen
                  </li>
                  <li>
                    <Link href="/services/roof-repair" className="text-brand-red font-semibold hover:underline">Roof repair</Link> and <Link href="/services/roof-leak-repair" className="text-brand-red font-semibold hover:underline">roof leak repair</Link> &mdash; flashing, shingle, and flat-roof seam repairs
                  </li>
                  <li>
                    <Link href="/services/emergency-roof-repair" className="text-brand-red font-semibold hover:underline">24/7 emergency roof repair</Link> &mdash; same-day tarping and leak containment
                  </li>
                  <li>
                    <Link href="/services/flat-roofing" className="text-brand-red font-semibold hover:underline">Flat roofing</Link> &mdash; the dominant roof style on Philadelphia row homes and commercial buildings
                  </li>
                  <li>
                    <Link href="/services/storm-damage-roof-repair" className="text-brand-red font-semibold hover:underline">Storm damage repair</Link> and insurance-claim documentation
                  </li>
                  <li>
                    <Link href="/services/roof-inspection" className="text-brand-red font-semibold hover:underline">Roof inspections</Link>, <Link href="/services/gutter-cleaning" className="text-brand-red font-semibold hover:underline">gutter cleaning</Link>, <Link href="/services/siding-installation" className="text-brand-red font-semibold hover:underline">siding installation</Link>, and <Link href="/services/soffit-repair" className="text-brand-red font-semibold hover:underline">soffit repair</Link>
                  </li>
                </ul>

                <h3 className="text-xl md:text-2xl font-bold text-brand-dark mt-10 mb-4">
                  Serving Philadelphia &amp; the Surrounding Counties
                </h3>
                <p className="text-brand-gray leading-relaxed text-base md:text-lg mb-4">
                  We&rsquo;re based at 2020 Dreer St in Kensington (Philadelphia 19125) and most of our work stays within an hour of the shop. If you&rsquo;re in any of these areas, you&rsquo;re in our service zone:
                </p>
                <p className="text-brand-gray leading-relaxed text-base md:text-lg mb-6">
                  <Link href="/service-areas/philadelphia" className="text-brand-red font-semibold hover:underline">Philadelphia</Link>, <Link href="/service-areas/fishtown" className="text-brand-red font-semibold hover:underline">Fishtown</Link>, <Link href="/service-areas/northern-liberties" className="text-brand-red font-semibold hover:underline">Northern Liberties</Link>, <Link href="/service-areas/south-philadelphia" className="text-brand-red font-semibold hover:underline">South Philadelphia</Link>, <Link href="/service-areas/northeast-philadelphia" className="text-brand-red font-semibold hover:underline">Northeast Philadelphia</Link>, <Link href="/service-areas/center-city" className="text-brand-red font-semibold hover:underline">Center City</Link>, <Link href="/service-areas/west-philadelphia" className="text-brand-red font-semibold hover:underline">West Philadelphia</Link>, <Link href="/service-areas/north-philadelphia" className="text-brand-red font-semibold hover:underline">North Philadelphia</Link>, <Link href="/service-areas/manayunk" className="text-brand-red font-semibold hover:underline">Manayunk</Link>, <Link href="/service-areas/roxborough" className="text-brand-red font-semibold hover:underline">Roxborough</Link>, <Link href="/service-areas/bucks-county" className="text-brand-red font-semibold hover:underline">Bucks County</Link>, <Link href="/service-areas/montgomery-county" className="text-brand-red font-semibold hover:underline">Montgomery County</Link>, <Link href="/service-areas/delaware-county" className="text-brand-red font-semibold hover:underline">Delaware County</Link>, and <Link href="/service-areas/chester-county" className="text-brand-red font-semibold hover:underline">Chester County</Link>.
                </p>

                <h3 className="text-xl md:text-2xl font-bold text-brand-dark mt-10 mb-4">
                  What Makes Us Different
                </h3>
                <p className="text-brand-gray leading-relaxed text-base md:text-lg">
                  You can read our 40+ five-star Google reviews, but the short version is this: we show up when we say we will, we write down what&rsquo;s actually wrong with your roof (not what sells the biggest job), and we stand behind our workmanship in writing. If you&rsquo;d rather talk before you commit to anything, call <a href="tel:+12672553620" className="text-brand-red font-semibold hover:underline">(267) 255-3620</a> or <Link href="/get-quote" className="text-brand-red font-semibold hover:underline">request a free estimate</Link> and we&rsquo;ll be out within a day or two.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* WORK PHOTO SHOWCASE                          */}
      {/* ============================================ */}
      <section className="bg-brand-darker">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {[
              {
                src: "/images/adilay-crew-at-work.jpg",
                alt: "Adilay Roofing van and crew working on a multi-unit roof replacement in Philadelphia",
                objPos: "30% 45%",
                extraClass: "",
              },
              {
                src: "/images/adilay-safety-crew.jpg",
                alt: "Adilay Roofing crew with safety harnesses and hard hats installing underlayment on a steep roof",
                objPos: "",
                extraClass: "safety-crew-photo",
              },
            ].map((img, i) => (
              <ScrollReveal key={img.src} delay={i * 120} distance={16}>
                <div className="relative h-80 md:h-[28rem] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className={`w-full h-full object-cover ${img.extraClass}`}
                    style={img.objPos ? { objectPosition: img.objPos } : undefined}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* WHY CHOOSE US SECTION                        */}
      {/* ============================================ */}
      <section className="section-padding bg-brand-light">
        <div className="container-wide mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8 md:mb-16">
              <h2 className="section-heading">
                Why Philadelphia Homeowners Choose Adilay
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {whyChooseUs.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100} distance={20}>
                <div className="group relative rounded-sm overflow-hidden min-h-[160px] md:min-h-[300px] h-full">
                  {/* Background image */}
                  <img
                    src={item.bgImage}
                    alt={`${item.title} — Adilay Roofing Philadelphia`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col justify-end h-full p-5 md:p-8 md:items-center md:text-center md:justify-end">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 text-white mb-3 md:mb-4 group-hover:bg-brand-red transition-colors duration-300">
                      {whyChooseUsIcons[i] || whyChooseUsIcons[0]}
                    </div>
                    <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-3">
                      {item.title}
                    </h3>
                    <SafeHTML
                      html={item.description}
                      as="div"
                      className="text-white/80 text-sm md:text-base leading-relaxed [&_a]:text-red-300 [&_a]:underline [&_a:hover]:text-white [&_p]:mb-0"
                    />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TEAM / ABOUT SECTION                         */}
      {/* ============================================ */}
      <section className="section-padding bg-white">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Photo */}
            <ScrollReveal direction="left" distance={30}>
              <div className="relative rounded-sm overflow-hidden shadow-lg">
                <img
                  src="/images/team-office.jpg"
                  alt="Adilay Roofing team at the Philadelphia office — family-owned roofer"
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollReveal>

            {/* Text */}
            <ScrollReveal direction="right" delay={100} distance={30}>
              <div>
                <h2 className="section-heading text-left">
                  {teamHeading}
                </h2>
                {teamParagraphs.map((para, i) => (
                  <SafeHTML
                    key={i}
                    html={para}
                    as="div"
                    className="text-brand-gray leading-relaxed mt-4 [&_a]:text-brand-red [&_a]:underline [&_a:hover]:text-red-700 [&_p]:mb-1 [&_p:last-child]:mb-0"
                  />
                ))}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link href="/about" className="btn-primary">
                    Learn More About Us
                  </Link>
                  <Link href="/get-quote" className="btn-secondary">
                    Get a FREE Quote
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* LICENSED & CERTIFIED SECTION                 */}
      {/* ============================================ */}
      <section className="py-6 md:py-14 px-4 bg-brand-darker text-white">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* License image */}
            <ScrollReveal direction="left" distance={30}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-red/30 to-brand-red/10 rounded-sm blur-sm group-hover:blur-md transition-all duration-300" />
                <div className="relative bg-white rounded-sm overflow-hidden shadow-2xl border border-white/20">
                  <img
                    src="/images/pa-license.png"
                    alt="Commonwealth of Pennsylvania Home Improvement Contractor License - Adilay Roofing LLC, Registration PA184779, Valid Until 7/25/2027"
                    loading="lazy"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Text content */}
            <ScrollReveal direction="right" delay={100} distance={30}>
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider mb-4 md:mb-6">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Licensed &amp; Verified
                </div>

                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 md:mb-6 text-white">
                  PA Licensed Home Improvement Contractor
                </h2>

                <p className="text-white/70 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0">
                  Adilay Roofing is officially registered with the Commonwealth of
                  Pennsylvania as a licensed Home Improvement Contractor. Your
                  project is protected by state-regulated standards.
                </p>

                <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-md mx-auto lg:mx-0">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/10">
                    <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">License #</p>
                    <p className="text-white font-bold text-base md:text-xl">PA184779</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/10">
                    <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">Status</p>
                    <p className="text-green-400 font-bold text-base md:text-xl flex items-center gap-1.5 justify-center lg:justify-start">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      Active
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-center lg:justify-start">
                  <BBBSeal />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PROCESS SECTION                              */}
      {/* ============================================ */}
      <ProcessSection />

      {/* ============================================ */}
      {/* TESTIMONIALS SECTION                         */}
      {/* ============================================ */}
      <TestimonialsSection />

      {/* ============================================ */}
      {/* GALLERY CTA WIDGET                           */}
      {/* ============================================ */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <img
          src="/images/gallery-banner.png"
          alt="Roofing project gallery — before and after photos by Adilay Roofing Philadelphia"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-[center_10%]"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-brand-dark/60 md:bg-brand-dark/45" />
        <div className="relative z-10 py-4 md:py-14 px-4">
          <div className="container-narrow mx-auto">
            <ScrollReveal>
              <Link
                href="/gallery"
                className="group block text-center"
              >
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-3">
                  See Our Work in Action
                </h2>
                <p className="text-white/80 text-base md:text-lg max-w-md mx-auto mb-4 md:mb-5">
                  Real projects. Real transformations. Browse before &amp; after photos from homes across Philadelphia.
                </p>
                <span className="inline-flex items-center gap-2 bg-brand-red text-white font-bold px-6 md:px-8 py-3 md:py-4 rounded-sm text-sm md:text-base group-hover:gap-3 transition-all duration-200 shadow-lg group-hover:shadow-xl">
                  View Project Gallery
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SERVICE AREAS SECTION                        */}
      {/* ============================================ */}
      <section className="section-padding bg-white">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Van photo */}
            <ScrollReveal direction="left" distance={30}>
              <div className="rounded-sm overflow-hidden shadow-lg">
                <img
                  src="/images/adilay-van-service-areas.jpg"
                  alt="Adilay Roofing van and crew completing a roof replacement on a residential property in Philadelphia"
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollReveal>

            {/* Areas content */}
            <ScrollReveal direction="right" delay={100} distance={30}>
              <div>
                <h2 className="section-heading text-left">
                  {serviceAreasHeading}
                </h2>
                <SafeHTML
                  html={serviceAreasDescription}
                  as="div"
                  className="text-brand-gray leading-relaxed mt-4 mb-6 [&_a]:text-brand-red [&_a]:underline [&_a:hover]:text-red-700 [&_p]:mb-2 [&_p:last-child]:mb-0"
                />

                <div className="space-y-4 mb-8">
                  {Object.entries(HOMEPAGE_AREA_SLUGS).map(([groupName, slugs]) => {
                    const items = slugs
                      .map((s) => locations.find((l) => l.slug === s))
                      .filter((l): l is NonNullable<typeof l> => Boolean(l));
                    if (items.length === 0) return null;
                    return (
                      <div key={groupName}>
                        <h3 className="text-[11px] font-bold tracking-widest uppercase text-brand-gray mb-2">
                          {groupName}
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {items.map((loc) => (
                            <Link
                              key={loc.slug}
                              href={`/service-areas/${loc.slug}`}
                              className="bg-brand-light hover:bg-brand-red hover:text-white rounded-sm px-3 py-1.5 text-xs font-medium text-brand-dark border border-brand-border hover:border-brand-red transition-colors"
                            >
                              {loc.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link
                    href="/service-areas"
                    className="inline-flex items-center gap-2 text-brand-red font-bold hover:gap-3 transition-all duration-200"
                  >
                    View All Service Areas
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="/roofer-philadelphia"
                    className="inline-flex items-center gap-2 text-brand-dark font-semibold border-b border-brand-dark/40 hover:text-brand-red hover:border-brand-red transition-colors"
                  >
                    Philadelphia Roofer — Full Guide
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FAQ SECTION                                  */}
      {/* ============================================ */}
      <section className="section-padding bg-brand-light">
        <div className="container-narrow mx-auto">
          <ScrollReveal>
            <div className="text-center mb-6 md:mb-12">
              <h2 className="section-heading">Frequently Asked Questions</h2>
              <p className="section-subheading mx-auto mt-4">
                Get answers to common questions about our roofing services.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <FAQ items={faqs.slice(0, 8)} />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="text-center mt-10">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-brand-red font-bold text-lg hover:gap-3 transition-all duration-200"
              >
                View All FAQs
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================ */}
      {/* BLOG / LATEST INSIGHTS                       */}
      {/* ============================================ */}
      {latestPosts.length > 0 && (
          <section className="bg-brand-light section-padding">
            <div className="container-wide mx-auto">
              <ScrollReveal distance={20}>
                <div className="text-center mb-10 md:mb-14">
                  <span className="text-brand-red font-bold text-sm uppercase tracking-wider">
                    From Our Blog
                  </span>
                  <h2 className="section-heading mt-2">
                    Roofing Tips & Expert Insights
                  </h2>
                  <p className="text-brand-gray max-w-2xl mx-auto mt-3">
                    Helpful guides for Philadelphia homeowners — from cost
                    breakdowns to maintenance tips.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {latestPosts.map((post, i) => (
                  <ScrollReveal key={post.frontmatter.slug} delay={i * 120} distance={16}>
                    <BlogCard post={post.frontmatter} />
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={300} distance={12}>
                <div className="text-center mt-10 md:mt-14">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 bg-white border-2 border-brand-dark text-brand-dark font-bold px-8 py-3 rounded-sm hover:bg-brand-dark hover:text-white transition-all duration-300"
                  >
                    See All Blog Posts
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </section>
      )}

      {/* ============================================ */}
      {/* CTA SECTION                                  */}
      {/* ============================================ */}
      <CTASection />
    </>
  );
}
