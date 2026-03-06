import Link from "next/link";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { faqs } from "@/data/faqs";
import ServiceCard from "@/components/ServiceCard";
import TrustBar from "@/components/TrustBar";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import FAQ from "@/components/FAQ";
import ScrollReveal from "@/components/ScrollReveal";

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

const whyChooseUs = [
  {
    title: "Experienced Crew",
    description:
      "Over 20 years of hands-on roofing experience in the Philadelphia area.",
    bgImage: "/images/experienced-crew-adilay-roofing-philadelphia.jpg",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    title: "Quality Materials",
    description:
      "We use top-rated materials from trusted manufacturers for lasting results.",
    bgImage: "/images/quality-roofing-materials-adilay.jpg",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: "Honest Pricing",
    description:
      "Clear, written proposals with no hidden fees or surprise charges.",
    bgImage: "/images/adilay-roofing-honest-pricing-proposal.jpg",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <>
      {/* ============================================ */}
      {/* HERO SECTION                                 */}
      {/* ============================================ */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center bg-brand-darker overflow-hidden">
        {/* Hero background image */}
        <img
          src="/images/hero-van.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden="true"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/80" />

        {/* Content */}
        <div className="relative z-10 container-wide mx-auto px-4 py-16 md:py-32 text-center">
          <ScrollReveal delay={200} duration={600} distance={28}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              Philadelphia&apos;s Trusted
              <br />
              <span className="text-brand-red">Roofing Experts</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={400} duration={600} distance={20}>
            <p className="text-xl md:text-2xl font-light text-white/90 mb-4 tracking-wide">
              Quality Craftsmanship. Proven Results.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={550} duration={600} distance={16}>
            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              From roof replacements to emergency repairs, Adilay Roofing has
              served Philadelphia and surrounding areas for over 20 years. Get a
              detailed proposal tailored to your property — free.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={700} duration={600} distance={16}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/get-quote" className="btn-primary w-full sm:w-auto">
                Get Your FREE Quote
              </Link>
              <a
                href={`tel:${company.phoneRaw}`}
                className="btn-outline-white w-full sm:w-auto"
              >
                <svg
                  className="w-5 h-5 mr-2"
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
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================ */}
      {/* TRUST BAR                                    */}
      {/* ============================================ */}
      <TrustBar />

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
      {/* WORK PHOTO SHOWCASE                          */}
      {/* ============================================ */}
      <section className="bg-brand-darker">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-3 gap-0">
            {[
              { src: "/images/metal-roof-crew.jpg", alt: "Adilay Roofing crew installing standing seam metal roof", pos: "object-[center_30%]" },
              { src: "/images/adilay-truck.jpg", alt: "Adilay Roofing branded truck with logo and license number", pos: "object-center" },
              { src: "/images/metal-roof-closeup.jpg", alt: "Adilay Roofing workers installing metal roof panels", pos: "object-[center_30%]" },
            ].map((img, i) => (
              <ScrollReveal key={img.src} delay={i * 120} distance={16}>
                <div className="relative h-32 md:h-80 overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className={`w-full h-full object-cover ${img.pos}`}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
            {whyChooseUs.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100} distance={20}>
                <div className="group relative rounded-sm overflow-hidden min-h-[160px] md:min-h-[300px] h-full">
                  {/* Background image */}
                  <img
                    src={item.bgImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    aria-hidden="true"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col justify-end h-full p-5 md:p-8 md:items-center md:text-center md:justify-end">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 text-white mb-3 md:mb-4 group-hover:bg-brand-red transition-colors duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-3">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>
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
                  alt="Adilay Roofing team at the office"
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollReveal>

            {/* Text */}
            <ScrollReveal direction="right" delay={100} distance={30}>
              <div>
                <h2 className="section-heading text-left">
                  Family-Owned. Locally Trusted.
                </h2>
                <p className="text-brand-gray leading-relaxed mt-4">
                  Adilay Roofing is a family-run business built on hard work,
                  honest service, and a genuine commitment to every homeowner we
                  serve. From our office in Philadelphia, we manage every project
                  personally — no subcontractors, no runaround.
                </p>
                <p className="text-brand-gray leading-relaxed mt-4">
                  With over 20 years of experience and a crew that treats your
                  home like their own, you get more than a contractor — you get a
                  team that stands behind every shingle, every seam, and every
                  promise.
                </p>
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
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-top"
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
                  src="/images/adilay-van-jobsite.jpg"
                  alt="Adilay Roofing van at a residential job site"
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
                  southeastern Pennsylvania.
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

      {/* ============================================ */}
      {/* CTA SECTION                                  */}
      {/* ============================================ */}
      <CTASection />
    </>
  );
}
