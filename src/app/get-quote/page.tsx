import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/data/company";
import { faqs } from "@/data/faqs";
import QuoteForm from "@/components/QuoteForm";
import TrustBar from "@/components/TrustBar";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQ from "@/components/FAQ";
import ScrollReveal from "@/components/ScrollReveal";

const BASE_URL = "https://www.adilayroofing.com";

export const metadata: Metadata = {
  title: "Get a Free Roofing Estimate in Philadelphia, PA | Adilay Roofing",
  description:
    "Request your free, no-obligation roofing estimate from Adilay Roofing. Serving Philadelphia & surrounding counties. Call (888) 823-4766 or fill out our quick form.",
  keywords: [
    "free roofing estimate Philadelphia",
    "roof replacement quote Philadelphia",
    "roofing quote near me",
    "free roof inspection PA",
    "roofing estimate Bucks County",
  ],
  alternates: { canonical: `${BASE_URL}/get-quote` },
  openGraph: {
    title: "Get a Free Roofing Quote — Adilay Roofing Philadelphia",
    description:
      "Request your free roofing estimate. No obligation. Serving Philadelphia, Bucks, Montgomery, Delaware & Chester Counties.",
    url: `${BASE_URL}/get-quote`,
  },
};

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

export default function GetQuotePage() {
  return (
    <>
      {/* Hero / Split Layout */}
      <section className="relative min-h-[60vh] lg:min-h-screen flex flex-col lg:flex-row">
        {/* Left Panel - Dark CTA side */}
        <div className="relative lg:w-[40%] bg-brand-darker text-white flex items-center justify-center px-4 md:px-6 py-10 md:py-16 lg:py-0">
          {/* Placeholder background overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-darker via-brand-dark to-brand-darker opacity-95" />

          <div className="relative z-10 max-w-md text-center lg:text-left">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 md:mb-4 text-white">
              GET YOUR{" "}
              <span className="text-brand-red">FREE QUOTE</span>{" "}
              TODAY!
            </h1>
            <p className="text-sm md:text-lg text-white/80 mb-5 md:mb-8">
              Fill out this short form and we will send you a detailed proposal
              tailored to your exact property measurements.
            </p>

            <div className="mb-5 md:mb-8">
              <p className="text-white/60 text-xs md:text-sm mb-1 md:mb-2">Or call us directly:</p>
              <a
                href={`tel:${company.phoneRaw}`}
                className="text-xl md:text-2xl font-bold text-brand-red hover:text-brand-red-dark transition-colors"
              >
                {company.phone}
              </a>
            </div>

            {/* Trust signals - horizontal on mobile, column on large */}
            <div className="flex flex-row lg:flex-col gap-3 md:gap-4 justify-center lg:justify-start">
              {[
                { icon: "✓", text: "Free Estimates" },
                { icon: "✓", text: "No Obligation" },
                { icon: "✓", text: "Response Within 24hrs" },
              ].map((item) => (
                <div key={item.text} className="flex flex-col md:flex-row items-center gap-1.5 md:gap-3">
                  <span className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-brand-red text-white flex items-center justify-center font-bold text-xs md:text-sm flex-shrink-0">
                    {item.icon}
                  </span>
                  <span className="text-white/90 font-medium text-xs md:text-base text-center md:text-left">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="lg:w-[60%] bg-brand-light flex items-start lg:items-center justify-center px-3 md:px-4 py-6 md:py-10 lg:py-16">
          <div className="w-full max-w-2xl">
            {/* Scroll anchor — offset by sticky header height so progress bar is visible */}
            <div id="quote-form-top" style={{ scrollMarginTop: "120px" }} />
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TRUST BAR                                    */}
      {/* ============================================ */}
      <TrustBar />

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
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

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
          alt=""
          aria-hidden="true"
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
                  alt="Adilay Roofing van and crew completing a roof replacement on a residential property"
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollReveal>

            {/* Areas content */}
            <ScrollReveal direction="right" delay={100} distance={30}>
              <div>
                <h2 className="section-heading text-left">
                  Serving Philadelphia &amp; Beyond
                </h2>
                <p className="text-brand-gray leading-relaxed mt-4 mb-6">
                  We proudly serve homeowners and businesses across southeastern
                  Pennsylvania.
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
            <FAQ items={faqs.slice(0, 6)} />
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
