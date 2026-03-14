import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";

const BASE_URL = "https://www.adilayroofing.com";

export const metadata: Metadata = {
  title: "Roofing & Exterior Services Philadelphia PA",
  description:
    "Full roofing services in Philadelphia: roof replacement, repair, flat roofing, shingle installation, siding, windows, gutters, emergency roof repair & commercial roofing. Licensed PA184779. Free estimates!",
  keywords: [
    "roofing services Philadelphia",
    "roof replacement service Philadelphia",
    "roof repair service Philadelphia PA",
    "flat roofing Philadelphia",
    "siding installation Philadelphia",
    "gutter installation Philadelphia",
    "emergency roof repair Philadelphia",
    "commercial roofing Philadelphia",
  ],
  alternates: { canonical: `${BASE_URL}/services` },
  openGraph: {
    title: "Roofing & Exterior Services — Adilay Roofing Philadelphia",
    description:
      "Comprehensive roofing and exterior services. Roof replacement, repair, flat roofing, siding, windows, gutters, emergency repairs & commercial roofing.",
    url: `${BASE_URL}/services`,
  },
};

const benefits = [
  {
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
    title: "Experienced Crew",
    description:
      "Our skilled team brings 20+ years of roofing and exterior experience to every project, large or small.",
  },
  {
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
    title: "Quality Materials",
    description:
      "We use manufacturer-backed materials from trusted brands to ensure your roof or exterior stands the test of time.",
  },
  {
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
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Honest Pricing",
    description:
      "No hidden fees, no surprise charges. We provide clear, written estimates so you know exactly what to expect.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-brand-darker overflow-hidden">
        <img
          src="/images/crew-working.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative section-padding">
          <div className="container-narrow mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Our Roofing &amp; Exterior Services
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              Comprehensive solutions for Philadelphia properties — from roof
              replacement and repair to siding, windows, and gutters. Quality
              workmanship you can trust.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-brand-light">
        <div className="section-padding">
          <div className="container-wide mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
              {services.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work Showcase */}
      <section className="bg-white">
        <div className="section-padding">
          <div className="container-wide mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="rounded-sm overflow-hidden shadow-lg">
                <img
                  src="/images/metal-roof-closeup.jpg"
                  alt="Close-up of professional standing seam metal roof installation by Adilay Roofing in Philadelphia"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div>
                <h2 className="section-heading text-left">
                  Real Work. Real Results.
                </h2>
                <p className="text-brand-gray leading-relaxed mt-4">
                  From full roof replacements to siding overhauls, our crew
                  handles every project with the same level of care and
                  professionalism. We protect your property and leave the job
                  site clean when we&apos;re done.
                </p>
                <p className="text-brand-gray leading-relaxed mt-4">
                  Every project is managed by our experienced team — no
                  subcontractors, no shortcuts. Just quality workmanship from
                  start to finish.
                </p>
                <div className="mt-8">
                  <Link href="/get-quote" className="btn-primary">
                    Get Your FREE Estimate
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Adilay */}
      <section className="bg-brand-light">
        <div className="section-padding">
          <div className="container-narrow mx-auto">
            <div className="text-center mb-6 md:mb-16">
              <h2 className="section-heading">Why Choose Adilay Roofing</h2>
              <p className="section-subheading mx-auto">
                We treat every property like it&apos;s our own — with care,
                honesty, and attention to detail.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-4 md:flex-col md:items-center md:text-center">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-brand-red/10 text-brand-red md:mb-5">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-brand-dark mb-1 md:mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-brand-gray text-sm md:text-base leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA link */}
            <div className="text-center mt-12">
              <Link href="/contact" className="btn-primary">
                Get Your FREE Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <CTASection />
    </>
  );
}
