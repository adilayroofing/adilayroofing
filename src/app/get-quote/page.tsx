import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/data/company";
import ContactForm from "@/components/ContactForm";
import TrustBar from "@/components/TrustBar";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQ from "@/components/FAQ";
import ScrollReveal from "@/components/ScrollReveal";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import BBBSeal from "@/components/BBBSeal";
import { AREA_SERVED, BASE_URL, ORG_REF, stripHtml } from "@/lib/schema";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Free No-Obligation Roofing Quote Philadelphia | Adilay Roofing",
    description:
      "Get a free, no-obligation roofing quote in Philadelphia. Same-day response, written estimate, no pressure. Licensed contractor, 20+ years. Call (267) 255-3620.",
    keywords: [
      "no-obligation roofing quote",
      "free roofing quote",
      "roofers free estimate",
      "roof free estimate",
      "roofing estimate Philadelphia PA",
      "same-day roof estimate",
      "roof repair quote no obligation",
      "free roofing estimate Philadelphia",
    ],
    alternates: { canonical: `${BASE_URL}/get-quote` },
    openGraph: {
      title: "Free No-Obligation Roofing Quote in Philadelphia — Adilay Roofing",
      description:
        "Free, no-obligation roofing quote in Philadelphia. Same-day response, written estimate, 20+ years experience, licensed PA184779.",
      url: `${BASE_URL}/get-quote`,
    },
  };
}

const serviceAreas = [
  "Philadelphia",
  "Bucks County",
  "Montgomery County",
  "Delaware County",
  "Chester County",
  "Norristown",
  "Cheltenham",
  "Abington",
  "Jenkintown",
  "Willow Grove",
  "Levittown",
  "Bensalem",
];

const quoteFaqs = [
  {
    question: "Is the roofing quote really free and no-obligation?",
    answer:
      "Yes. Every no-obligation roofing quote we provide in Philadelphia is 100% free. We inspect your roof, write up a detailed estimate, and walk you through your options. If you decide not to move forward, you owe us nothing — no deposit, no pressure, no follow-up sales calls.",
  },
  {
    question: "How quickly can I get a same-day roof estimate in Philadelphia?",
    answer:
      "For most Philadelphia properties, if you call us before noon we can schedule a same-day roof estimate the same afternoon. For complex commercial roofs or out-of-town properties we typically schedule within 24–48 hours. Call (267) 255-3620 for the fastest response.",
  },
  {
    question: "What's included in your free roofing estimate?",
    answer:
      "Your free roofing estimate includes a full on-site inspection of your roof, attic, flashing, and drainage; a written itemized quote with transparent pricing; material and warranty options; and a clear project timeline. You also get straight answers to every question — no surprises and no hidden fees.",
  },
  {
    question: "Do you provide a roof repair quote with no obligation?",
    answer:
      "Yes. Whether you need a full roof replacement or a small shingle repair, we provide a roof repair quote with no obligation. We'll tell you honestly whether a repair or replacement is the better long-term choice for your Philadelphia home — even if a small repair is all you need.",
  },
  {
    question: "What areas do you cover for free roofing quotes?",
    answer:
      "We provide free roofing quotes across Philadelphia and all surrounding counties — Bucks, Montgomery, Delaware, and Chester. That includes Northeast Philadelphia, South Philly, Manayunk, Roxborough, Bensalem, Yardley, Langhorne, King of Prussia, Norristown, Lansdale, Cheltenham, and more. If you're within about 30 miles of Philadelphia, we'll come out.",
  },
  {
    question: "How do I schedule my free roofing estimate?",
    answer:
      "Fill out the quick form on this page, call us at (267) 255-3620, or text us — whichever is easiest. Tell us a bit about your property and what you're seeing on your roof, and we'll get back to you the same day to confirm a time for your free, no-obligation roofing quote.",
  },
];

export default async function GetQuotePage() {
  // All content sourced directly from this file. CMS deprecated 2026-05-10.
  const heroTitle = "Free No-Obligation Roofing Quote in Philadelphia";
  const heroDescription = "Fill out the short form and a licensed Philadelphia roofer will follow up the same day with a written, no-pressure quote tailored to your property.";
  const offerBannerText = "\ud83c\udf81 Limited Offer: FREE Gutter Cleaning with Every Roof Replacement \u2014 First-Time Customers";
  const trustSignals = ["Free Estimates", "No Obligation", "Response Within 24hrs"];
  const licenseHeading = "PA Licensed Home Improvement Contractor";
  const licenseDescription = "Adilay Roofing is officially registered with the Commonwealth of Pennsylvania as a licensed Home Improvement Contractor. Your project is protected by state-regulated standards.";
  const serviceAreaHeading = "Same-Day Estimates Available Across Philadelphia & Surrounding Areas";
  const serviceAreaDescription = "Need a roofing estimate in Philadelphia PA today? We cover the entire five-county region with same-day roof estimate slots for urgent jobs — from Northeast Philadelphia and South Philly to Bucks, Montgomery, Delaware, and Chester County.";
  const faqHeading = "Frequently Asked Questions About Our Free Roofing Quotes";
  const faqSubheading = "Everything you need to know before requesting your free roofing quote in Philadelphia.";

  // ---------------------------------------------------------------------------
  // Structured data — Service + FAQ (LocalBusiness/RoofingContractor is emitted
  // globally by <JsonLd /> in layout.tsx).
  // ---------------------------------------------------------------------------
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/get-quote#service`,
    serviceType: "Free Roofing Estimate",
    name: "Free No-Obligation Roofing Quote in Philadelphia",
    description:
      "Free, no-obligation roofing quote for Philadelphia homeowners. Same-day response, written estimate, 20+ years experience, licensed PA184779.",
    provider: ORG_REF,
    areaServed: AREA_SERVED,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      description:
        "Free no-obligation roofing quote with written estimate and same-day response.",
    },
    url: `${BASE_URL}/get-quote`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: quoteFaqs.map((item) => ({
      "@type": "Question",
      name: stripHtml(item.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(item.answer),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbJsonLd items={[{ name: "Get a Quote", path: "/get-quote" }]} />

      {/* =================================================================== */}
      {/* Hero / Split Layout                                                 */}
      {/* =================================================================== */}
      <section className="relative lg:min-h-screen flex flex-col lg:flex-row">
        {/* Left Panel - Dark CTA side. On mobile, kept very compact (just
            H1 + offer banner) so the form on the right panel is visible
            without scrolling. Phone/text CTAs are already in the sticky
            site header; trust signals + BBB seal are below the form on
            mobile to keep the hero fold short. */}
        <div className="relative lg:w-[40%] bg-brand-darker text-white flex items-center justify-center px-4 md:px-6 py-4 md:py-16 lg:py-0">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-darker via-brand-dark to-brand-darker opacity-95" />

          <div className="relative z-10 max-w-md text-center lg:text-left w-full">
            <h1 className="text-xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2 md:mb-4 text-white">
              {heroTitle}
            </h1>
            <p className="hidden md:block text-sm md:text-lg text-white/80 mb-4 md:mb-6">
              {heroDescription}
            </p>

            {/* Gutter Cleaning Offer Banner */}
            <div className="mb-2 md:mb-6 bg-amber-500/15 border-l-4 border-amber-400 rounded-r-lg px-3 py-1.5 md:px-4 md:py-3 text-center lg:text-left">
              <p className="text-white text-xs md:text-sm font-semibold leading-snug">
                {offerBannerText}
              </p>
            </div>

            {/* Mobile-only compact CTA row — phone | text on a single line so
                the form below stays visible without scrolling. Desktop uses
                the larger phone/text block below this. */}
            <div className="md:hidden flex items-center justify-center gap-3 mb-3 text-sm font-semibold">
              <a
                href={`tel:${company.phoneRaw}`}
                className="text-brand-red hover:text-brand-red-dark inline-flex items-center gap-1.5 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {company.phone}
              </a>
              <span className="text-white/40" aria-hidden="true">|</span>
              <a
                href="sms:+12672553620&body=Hi%2C%20I%27m%20interested%20in%20a%20free%20roofing%20estimate."
                className="text-white hover:text-white/80 inline-flex items-center gap-1.5 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Text Us
              </a>
            </div>

            {/* Phone / Text CTAs — desktop only on this panel; mobile uses the compact one-row CTA above */}
            <div className="hidden md:block mb-5 md:mb-8">
              <p className="text-white/60 text-xs md:text-sm mb-1 md:mb-2">
                Or contact us directly:
              </p>
              <a
                href={`tel:${company.phoneRaw}`}
                className="block text-xl md:text-2xl font-bold text-brand-red hover:text-brand-red-dark transition-colors"
              >
                {company.phone}
              </a>
              <a
                href="sms:+12672553620&body=Hi%2C%20I%27m%20interested%20in%20a%20free%20roofing%20estimate."
                className="mt-2.5 md:mt-3 inline-flex items-center justify-center gap-2 border border-white/40 hover:border-white/70 bg-white/10 hover:bg-white/15 rounded-sm px-4 md:px-5 py-2 md:py-2.5 text-white text-sm md:text-base font-semibold transition-all duration-200"
              >
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Text Us
              </a>
            </div>

            {/* Trust signals — hidden on mobile to keep hero compact */}
            <div className="hidden md:flex flex-row lg:flex-col gap-4 md:gap-4 justify-center lg:justify-start items-start">
              {trustSignals.map((text) => (
                <div
                  key={text}
                  className="flex flex-col md:flex-row items-center gap-1.5 md:gap-3 flex-1 lg:flex-none"
                >
                  <span className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-brand-red text-white flex items-center justify-center font-bold text-xs md:text-sm flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-white/90 font-medium text-[10px] md:text-base text-center md:text-left leading-tight">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* BBB seal — desktop only; mobile shows it elsewhere on the page */}
            <div className="hidden md:flex mt-6 justify-center lg:justify-start">
              <BBBSeal />
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="lg:w-[60%] bg-brand-light flex items-start lg:items-center justify-center px-3 md:px-4 py-3 md:py-10 lg:py-16">
          <div className="w-full max-w-2xl">
            <div id="quote-form-top" style={{ scrollMarginTop: "120px" }} />
            <ContactForm />

            {/* Mobile-only BBB seal under the form. The desktop hero panel
                already shows the BBB seal on its own; on mobile that panel
                is hidden for compactness, so we surface it here below the
                form so the trust signal still appears on the page. */}
            <div className="md:hidden flex justify-center mt-6 mb-2">
              <BBBSeal />
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* TRUST BAR                                                           */}
      {/* =================================================================== */}
      <TrustBar />

      {/* =================================================================== */}
      {/* SEO CONTENT — Why a free roof quote is worth your time              */}
      {/* Captures DEEP RANK queries: "free roof quote" (177), "free roofing  */}
      {/* quotes" (176), "free roof quotes" (157), "roofing free estimate"    */}
      {/* (248) — 758 combined monthly impressions, currently page 4–6.       */}
      {/* =================================================================== */}
      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="section-heading">
                Why a Free Roof Quote Matters — And What Yours Should Include
              </h2>
              <p className="section-subheading mx-auto mt-3">
                A real roofing estimate is more than a number on a sticky
                note. Here&apos;s what to expect when you ask Adilay Roofing
                for a free roof quote in Philadelphia.
              </p>
            </div>
            <div className="space-y-5 text-brand-gray leading-relaxed">
              <p>
                When most Philadelphia homeowners search for{" "}
                <strong>free roofing quotes</strong>, they&apos;re hoping to
                find out two things: <em>is my roof actually a problem yet</em>,
                and <em>what&apos;s it going to cost to fix or replace?</em>{" "}
                Both deserve real answers, not a salesperson&apos;s guess. A
                proper free roof quote starts with a 30-minute on-site
                inspection &mdash; your roof from the surface, your attic
                from inside, and the full perimeter of flashing, gutters,
                and drainage. That&apos;s the only way to give you a number
                that actually holds up when the work begins.
              </p>
              <p>
                Adilay&apos;s <strong>free roof quotes</strong> are written,
                line-itemized, and fixed-price. You get the materials
                specified by manufacturer and product line (GAF Timberline
                HDZ vs CertainTeed Landmark vs Owens Corning Duration; EPDM
                vs TPO for flat roofs), the labor cost, the permit cost, the
                tear-off scope, the dumpster fee, and the warranty terms
                &mdash; all on one document you can compare against any
                other roofer in Philadelphia. No mystery line items, no
                &ldquo;we&apos;ll see when we get up there&rdquo; hedge
                language.
              </p>
              <p>
                Most importantly, our{" "}
                <strong>roofing free estimate</strong> isn&apos;t a sales
                call in disguise. If your roof has 5&ndash;10 years of life
                left and just needs a chimney flashing reworked, we quote
                the repair, not a replacement. If you have storm damage, we
                document it for your insurance carrier (State Farm,
                Allstate, Liberty Mutual, USAA, Travelers, Erie &mdash; all
                the major Pennsylvania carriers) and write the kind of
                scope adjusters approve without bouncing back. We&apos;d
                rather save you a $20,000 replacement and earn the small
                repair than burn the trust to chase a bigger ticket.
              </p>
              <p>
                Same-day response is real. If you call (267) 255-3620
                before noon on a weekday, we&apos;ll be on your roof that
                afternoon. Evening or weekend? We schedule
                next-business-day. After-hours emergencies (active leaks
                during a storm) get a 2&ndash;6 hour response window. Once
                your <strong>free roof quote</strong> is in your hands, take
                your time &mdash; we don&apos;t follow up with pressure
                calls or &ldquo;limited time&rdquo; expirations. The quote
                is honest, the price is firm, and you decide when (or
                whether) to move forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SEO CONTENT — What's included in the free roofing estimate          */}
      {/* =================================================================== */}
      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="section-heading">
                What&apos;s Included in Your Free Roofing Estimate
              </h2>
              <p className="section-subheading mx-auto mt-4">
                Every no-obligation roofing quote we send in Philadelphia comes
                with the same level of detail — whether you need a full roof
                replacement or a small shingle repair.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {[
              {
                h: "Full on-site roof inspection",
                p: "A licensed Philadelphia roofer walks your roof, checks the attic and flashing, and looks for issues you can\u2019t see from the ground.",
              },
              {
                h: "Written, itemized quote",
                p: "Every free roofing quote is written down — line-by-line materials and labor, tax, permit costs, and final total. No verbal estimates, no napkin math.",
              },
              {
                h: "Material and warranty options",
                p: "3-tab vs. architectural shingles, EPDM flat roofing, metal, slate — we explain what works for your Philadelphia property and what each warranty actually covers.",
              },
              {
                h: "Honest repair-vs-replace answer",
                p: "If a repair will buy you another 5\u201310 years, we\u2019ll tell you. Our roofers free estimate policy means an honest answer, even when it costs us the bigger job.",
              },
              {
                h: "Insurance claim guidance",
                p: "If storm damage is involved, we document the damage with photos and written descriptions your insurance carrier will accept.",
              },
              {
                h: "Zero pressure, zero obligation",
                p: "You get the quote, you take your time. We don\u2019t chase you with sales calls and we don\u2019t charge a dime if you decide not to move forward.",
              },
            ].map(({ h, p }) => (
              <div
                key={h}
                className="flex items-start gap-3 bg-brand-light rounded-sm p-5 border border-brand-border"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-red text-white flex items-center justify-center text-sm font-bold">
                  ✓
                </span>
                <div>
                  <h3 className="font-bold text-brand-dark mb-1">{h}</h3>
                  <p className="text-brand-gray text-sm leading-relaxed">{p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SEO CONTENT — Estimate process, step by step                        */}
      {/* =================================================================== */}
      <section className="section-padding bg-brand-light">
        <div className="container-narrow mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="section-heading">
                Our Estimate Process — Step by Step
              </h2>
              <p className="section-subheading mx-auto mt-4">
                From your first call to the written quote in your inbox —
                here&apos;s exactly how a free roofing quote works at Adilay.
                Whether you need a full replacement or a roof repair quote with
                no obligation, the process is the same.
              </p>
            </div>
          </ScrollReveal>

          <ol className="space-y-4 max-w-3xl mx-auto">
            {[
              {
                h: "You reach out",
                p: "Fill out the form on this page, call (267) 255-3620, or text us. Tell us the basics — your address, what you\u2019re seeing on your roof, and when you\u2019re free.",
              },
              {
                h: "We confirm same-day",
                p: "One of our Philadelphia team members calls or texts back the same day to confirm your appointment. Most inspections happen within 24\u201348 hours.",
              },
              {
                h: "On-site inspection",
                p: "A licensed Adilay roofer inspects your roof, attic ventilation, flashing, gutters, and any visible interior damage. Typical visit: 30\u201360 minutes.",
              },
              {
                h: "Written estimate in your inbox",
                p: "We send you a written roofing estimate Philadelphia PA homeowners can actually read \u2014 itemized, with material options and warranty terms spelled out.",
              },
              {
                h: "Walk-through, your pace",
                p: "We answer every question by phone, text, or in person. No sales pressure. When (and if) you\u2019re ready to move forward, we schedule the work.",
              },
            ].map(({ h, p }, i) => (
              <li
                key={h}
                className="flex items-start gap-4 bg-white rounded-sm p-5 border border-brand-border"
              >
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center text-lg font-bold">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-brand-dark mb-1">{h}</h3>
                  <p className="text-brand-gray leading-relaxed">{p}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SEO CONTENT — Why Philadelphia homeowners choose Adilay             */}
      {/* =================================================================== */}
      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="section-heading">
                Why Philadelphia Homeowners Choose Adilay for Free Quotes
              </h2>
              <p className="section-subheading mx-auto mt-4">
                Plenty of Philadelphia contractors offer a &ldquo;roofers free
                estimate&rdquo; and then hit you with high-pressure sales the
                second they show up. That&apos;s not how we work.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto space-y-4 text-brand-gray leading-relaxed">
            <p>
              Adilay Roofing has spent <strong>20+ years</strong> putting roofs
              on Philadelphia homes — from Northeast row houses to Main Line
              custom builds to flat-roof businesses in Fishtown and Kensington.
              We&apos;re a local, family-run, licensed Pennsylvania contractor
              (PA184779), 5-star rated on Google, and BBB accredited. When you
              ask for a roof free estimate from Adilay, you get a written quote
              from a business that still has to see its customers around
              Philadelphia every day.
            </p>
            <p>
              Every no-obligation roofing quote comes from someone who has
              actually been on your roof — not a sales rep using aerial photos.
              We show up on time, we explain what we find in plain English, and
              we leave you with a written estimate you can compare against
              anyone else&apos;s. If a competitor gives you a lower honest quote
              for the same scope and materials, take it; we&apos;ll sleep fine.
            </p>
            <p>
              That&apos;s why so many of our jobs come from referrals and
              repeat customers across Philadelphia, Bucks, Montgomery, Delaware,
              and Chester Counties. Free roofing quotes, honest answers, and
              work that lasts.
            </p>
          </div>

          <div className="text-center mt-8">
            <Link
              href="#quote-form-top"
              className="btn-primary inline-flex items-center gap-2"
            >
              Get My Free Roofing Quote
            </Link>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* LICENSED & CERTIFIED SECTION                                        */}
      {/* =================================================================== */}
      <section className="py-6 md:py-14 px-4 bg-brand-darker text-white">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <ScrollReveal direction="left" distance={30}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-red/30 to-brand-red/10 rounded-sm blur-sm group-hover:blur-md transition-all duration-300" />
                <div className="relative bg-white rounded-sm overflow-hidden shadow-2xl border border-white/20">
                  <img
                    src="/images/pa-license.png"
                    alt="Commonwealth of Pennsylvania Home Improvement Contractor License - Adilay Roofing LLC, Registration PA184779, Valid Until 7/25/2027"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={100} distance={30}>
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider mb-4 md:mb-6">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Licensed &amp; Verified
                </div>

                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 md:mb-6 text-white">
                  {licenseHeading}
                </h2>

                <p className="text-white/70 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0">
                  {licenseDescription}
                </p>

                <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-md mx-auto lg:mx-0">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/10">
                    <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">
                      License #
                    </p>
                    <p className="text-white font-bold text-base md:text-xl">
                      PA184779
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/10">
                    <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">
                      Status
                    </p>
                    <p className="text-green-400 font-bold text-base md:text-xl flex items-center gap-1.5 justify-center lg:justify-start">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      Active
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* TESTIMONIALS SECTION                                                */}
      {/* =================================================================== */}
      <TestimonialsSection />

      {/* =================================================================== */}
      {/* GALLERY CTA WIDGET                                                  */}
      {/* =================================================================== */}
      <section className="relative overflow-hidden">
        <img
          src="/images/gallery-banner.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-[center_10%]"
        />
        <div className="absolute inset-0 bg-brand-dark/60 md:bg-brand-dark/45" />
        <div className="relative z-10 py-4 md:py-14 px-4">
          <div className="container-narrow mx-auto">
            <ScrollReveal>
              <Link href="/gallery" className="group block text-center">
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-3">
                  See Our Work in Action
                </h2>
                <p className="text-white/80 text-base md:text-lg max-w-md mx-auto mb-4 md:mb-5">
                  Real projects. Real transformations. Browse before &amp;
                  after photos from homes across Philadelphia.
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

      {/* =================================================================== */}
      {/* SEO CONTENT — Same-day estimates across Philadelphia                */}
      {/* =================================================================== */}
      <section className="section-padding bg-white">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <ScrollReveal direction="left" distance={30}>
              <div className="rounded-sm overflow-hidden shadow-lg">
                <img
                  src="/images/adilay-van-service-areas.jpg"
                  alt="Adilay Roofing van and crew completing a same-day roof estimate at a Philadelphia PA property"
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={100} distance={30}>
              <div>
                <h2 className="section-heading text-left">
                  {serviceAreaHeading}
                </h2>
                <p className="text-brand-gray leading-relaxed mt-4 mb-4">
                  {serviceAreaDescription}
                </p>
                <p className="text-brand-gray leading-relaxed mb-6">
                  Whether you&apos;re looking for a roofing estimate Philadelphia
                  PA residents can trust, or a same-day roof estimate because
                  water is already coming through the ceiling, we can usually
                  get a licensed roofer on your property within 24 hours of
                  your call.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
                  {serviceAreas.slice(0, 9).map((area) => (
                    <div
                      key={area}
                      className="bg-brand-light rounded-sm px-3 py-2 text-center text-xs font-medium text-brand-dark border border-brand-border"
                    >
                      {area}
                    </div>
                  ))}
                </div>

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
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* FAQ SECTION — quote-specific                                        */}
      {/* =================================================================== */}
      <section className="section-padding bg-brand-light">
        <div className="container-narrow mx-auto">
          <ScrollReveal>
            <div className="text-center mb-6 md:mb-12">
              <h2 className="section-heading">{faqHeading}</h2>
              <p className="section-subheading mx-auto mt-4">{faqSubheading}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <FAQ items={quoteFaqs} />
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
    </>
  );
}
