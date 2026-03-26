import { Suspense } from "react";
import Link from "next/link";
import { company } from "@/data/company";
import LPLeadForm from "@/components/LPLeadForm";
import TransformationTimeline from "@/components/TransformationTimeline";
import BBBSeal from "@/components/BBBSeal";

interface LandingPageLayoutProps {
  headline: string;
  subheadline: string;
  heroImage: string;
  defaultService: string;
  serviceDescription: string;
  benefits: string[];
  features: string[];
  faqs: { question: string; answer: string }[];
  isEmergency?: boolean;
  primaryCtaText: string;
  secondaryCtaText: string;
  offerText?: string;
  submitButtonText?: string;
  galleryImage?: string;
  galleryImageAlt?: string;
  showTransformation?: boolean;
}

/* 3 strong testimonials for social proof */
const testimonials = [
  {
    quote:
      "This house had been plagued with roof leaks for years. Adilay Roofing was the only one that left nothing to chance. Their experience showed first in their quote and then in their workmanship. The entire job was done in 2 days, everything cleaned up and in order. Better than expected!",
    name: "Rob Lehr",
  },
  {
    quote:
      "Outstanding. I'd highly recommend Adilay Roofing to anyone in need of roofing services. From communication to pricing to execution, everything was flawless. The team was unbelievably punctual and completed the job within 48 hours. A+!",
    name: "Matthew Kollar",
  },
  {
    quote:
      "Adilay roofing was highly recommended to us by a friend. They came out quickly, sent a professional and detailed proposal, and were attentive to our questions. They were extremely thorough and professional. We are happy to say we no longer have a leak!",
    name: "Nikki Talarico",
  },
];

function PhoneIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}

function StarRating() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-brand-star"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function LandingPageLayout({
  headline,
  subheadline,
  heroImage,
  defaultService,
  serviceDescription,
  benefits,
  features,
  faqs,
  isEmergency = false,
  primaryCtaText,
  secondaryCtaText,
  offerText,
  submitButtonText,
  galleryImage,
  galleryImageAlt,
  showTransformation = false,
}: LandingPageLayoutProps) {
  const currentYear = new Date().getFullYear();
  const accentBg = isEmergency ? "bg-orange-600" : "bg-brand-red";
  const accentHover = isEmergency
    ? "hover:bg-orange-700"
    : "hover:bg-brand-red-dark";

  return (
    <div className="min-h-screen">
      {/* ── LP Header ── */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" aria-label="Adilay Roofing - Home">
            <img
              src="/images/logo-new.png"
              alt="Adilay Roofing"
              className="h-16 md:h-20 w-auto"
            />
          </Link>
          <a
            href={`tel:${company.phoneRaw}`}
            className={`flex items-center gap-2 ${
              isEmergency ? "text-orange-600" : "text-brand-red"
            } font-bold text-base md:text-xl transition-colors`}
          >
            <PhoneIcon className="w-5 h-5 md:w-6 md:h-6" />
            <span>{company.phone}</span>
          </a>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section
        className={`relative ${
          isEmergency ? "bg-gray-900" : "bg-brand-navy"
        } text-white overflow-hidden`}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt=""
            className="w-full h-full object-cover opacity-15"
            loading="eager"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: Content */}
            <div>
              {isEmergency && (
                <div className="inline-flex items-center gap-2 bg-orange-600 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  24/7 Emergency Service
                </div>
              )}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-white leading-tight">
                {headline}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-6">
                {subheadline}
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  { icon: "shield", text: `PA Licensed #${company.license}` },
                  { icon: "clock", text: "20+ Years" },
                  { icon: "star", text: "5-Star Rated" },
                  { icon: "check", text: "Free Estimates" },
                ].map((badge) => (
                  <div
                    key={badge.text}
                    className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm text-white/90"
                  >
                    {badge.icon === "shield" && (
                      <svg
                        className="w-4 h-4 text-green-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    )}
                    {badge.icon === "clock" && (
                      <svg
                        className="w-4 h-4 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                    {badge.icon === "star" && (
                      <svg
                        className="w-4 h-4 text-brand-star"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    )}
                    {badge.icon === "check" && (
                      <svg
                        className="w-4 h-4 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                    {badge.text}
                  </div>
                ))}
              </div>

              {/* BBB Accredited */}
              <div className="mb-6">
                <BBBSeal />
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {isEmergency ? (
                  <>
                    <a
                      href={`tel:${company.phoneRaw}`}
                      className="inline-flex items-center justify-center px-8 py-4 bg-orange-600 text-white font-bold text-lg rounded-sm hover:bg-orange-700 active:scale-[0.97] transition-all duration-300 cursor-pointer"
                    >
                      <PhoneIcon className="w-5 h-5 mr-2" />
                      {primaryCtaText}
                    </a>
                    <a
                      href="#lead-form"
                      className="btn-outline-white"
                    >
                      {secondaryCtaText}
                    </a>
                  </>
                ) : (
                  <>
                    <a href="#lead-form" className="btn-primary">
                      {primaryCtaText}
                    </a>
                    <a
                      href={`tel:${company.phoneRaw}`}
                      className="btn-outline-white"
                    >
                      <PhoneIcon className="w-5 h-5 mr-2" />
                      {secondaryCtaText}
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Right: Lead Form */}
            <div
              className="bg-white rounded-lg shadow-2xl p-5 md:p-6 scroll-mt-24"
              id="lead-form"
            >
              <h2 className="text-brand-dark text-xl font-bold mb-1 text-center">
                Get Your Free Quote
              </h2>
              <p className="text-brand-gray text-sm mb-4 text-center">
                Fast response &mdash; no obligation
              </p>
              <Suspense
                fallback={
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="h-12 bg-gray-100 rounded-sm animate-pulse"
                      />
                    ))}
                    <div className="h-14 bg-gray-200 rounded-sm animate-pulse" />
                  </div>
                }
              >
                <LPLeadForm
                  defaultService={defaultService}
                  isEmergency={isEmergency}
                  submitButtonText={submitButtonText}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* ── Free Gutter Cleaning Banner ── */}
      <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-brand-dark font-bold text-base md:text-lg">
            {offerText ||
              "FREE Gutter Cleaning With Every Roof Replacement — Limited Time Offer"}
          </p>
        </div>
      </section>

      {/* ── Why Choose Adilay ── */}
      <section className="py-10 md:py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-brand-dark">
            Why Choose Adilay Roofing?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Experienced Crew",
                desc: "20+ years and 2,000+ projects completed across Philadelphia.",
                icon: (
                  <svg
                    className="w-8 h-8 text-brand-red"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "Quality Materials",
                desc: "Top-grade materials from trusted manufacturers with full warranties.",
                icon: (
                  <svg
                    className="w-8 h-8 text-brand-red"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                desc: "Transparent quotes with no hidden fees. The price we quote is the price you pay.",
                icon: (
                  <svg
                    className="w-8 h-8 text-brand-red"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "Licensed & Insured",
                desc: `PA License #${company.license}. Fully insured for your protection.`,
                icon: (
                  <svg
                    className="w-8 h-8 text-brand-red"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
            ].map((card) => (
              <div
                key={card.title}
                className="border border-brand-border rounded-lg p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center mb-3">{card.icon}</div>
                <h3 className="font-bold text-brand-dark text-lg mb-2">
                  {card.title}
                </h3>
                <p className="text-brand-gray text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof / Testimonials ── */}
      <section className="py-10 md:py-16 px-4 bg-brand-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-3">
              What Our Customers Say
            </h2>
            <div className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-brand-dark font-bold">5.0</span>
              <StarRating />
              <span className="text-brand-gray text-sm">(41 reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-lg p-6 shadow-sm border border-brand-border"
              >
                <StarRating />
                <blockquote className="mt-3 text-brand-dark text-sm leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-4 pt-3 border-t border-brand-border flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <span className="font-bold text-brand-dark text-sm">
                    {t.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Details ── */}
      <section className="py-10 md:py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4">
                {headline}
              </h2>
              <p className="text-brand-gray leading-relaxed mb-6">
                {serviceDescription}
              </p>
              <h3 className="font-bold text-brand-dark text-lg mb-3">
                What&apos;s Included
              </h3>
              <ul className="space-y-2">
                {features.slice(0, 6).map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg
                      className={`w-5 h-5 ${
                        isEmergency ? "text-orange-500" : "text-brand-red"
                      } flex-shrink-0 mt-0.5`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-brand-gray">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-brand-dark text-lg mb-3">
                Benefits
              </h3>
              <ul className="space-y-2 mb-8">
                {benefits.slice(0, 6).map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <svg
                      className={`w-5 h-5 ${
                        isEmergency ? "text-orange-500" : "text-brand-red"
                      } flex-shrink-0 mt-0.5`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-brand-gray">{b}</span>
                  </li>
                ))}
              </ul>

              {/* FAQ */}
              {faqs.length > 0 && (
                <>
                  <h3 className="font-bold text-brand-dark text-lg mb-3">
                    Common Questions
                  </h3>
                  <div className="space-y-4">
                    {faqs.slice(0, 3).map((faq) => (
                      <div key={faq.question}>
                        <h4 className="font-bold text-brand-dark text-sm mb-1">
                          {faq.question}
                        </h4>
                        <p className="text-brand-gray text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery Image ── */}
      {galleryImage && (
        <section className="py-10 md:py-16 px-4 bg-white border-t border-brand-border">
          <div className="max-w-4xl mx-auto">
            <img
              src={galleryImage}
              alt={galleryImageAlt || "Adilay Roofing project"}
              className="w-full h-auto rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
        </section>
      )}

      {/* ── Project Transformation Timeline ── */}
      {showTransformation && (
        <section className="py-10 md:py-16 px-4 bg-brand-light overflow-hidden">
          <TransformationTimeline />
        </section>
      )}

      {/* ── Service Areas ── */}
      <section
        className={`py-8 ${
          isEmergency ? "bg-gray-900" : "bg-brand-navy"
        } text-white`}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-3 text-white">
            Serving the Greater Philadelphia Area
          </h2>
          <p className="text-white/70">
            {company.serviceAreas.join(" · ")}
          </p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-10 md:py-16 px-4 bg-brand-light">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-3">
            Ready to Get Started?
          </h2>
          <p className="text-brand-gray mb-6">
            Call us now or fill out the form above for a free, no-obligation
            estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${company.phoneRaw}`}
              className={`inline-flex items-center justify-center px-8 py-4 ${accentBg} text-white font-bold text-lg rounded-sm ${accentHover} active:scale-[0.97] transition-all duration-300 cursor-pointer`}
            >
              <PhoneIcon className="w-5 h-5 mr-2" />
              Call {company.phone}
            </a>
            <a
              href="#lead-form"
              className="btn-secondary"
            >
              Get Your FREE Quote
            </a>
          </div>
          <p className="text-brand-gray text-sm mt-4">
            PA License #{company.license} &middot; Licensed &amp; Insured
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="bg-white rounded-xl shadow-lg border-2 border-brand-red/20 p-5 md:p-8 inline-block">
              <img
                src="/images/pa-license.png"
                alt={`Pennsylvania Home Improvement Contractor License #${company.license}`}
                className="h-52 md:h-72 w-auto"
                loading="lazy"
              />
            </div>
            <BBBSeal />
          </div>
        </div>
      </section>

      {/* ── Minimal LP Footer ── */}
      <footer className="bg-brand-navy text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p className="text-white/70 text-sm">
            &copy; {currentYear} {company.legalName}. All rights reserved.
          </p>
          <p className="text-white/50 text-xs">
            {company.address.full} &middot; License #{company.license}
          </p>
          <p className="text-white/50 text-xs">
            <a
              href={`tel:${company.phoneRaw}`}
              className="hover:text-brand-red transition-colors"
            >
              {company.phone}
            </a>
            {" · "}
            <a
              href={`mailto:${company.email}`}
              className="hover:text-brand-red transition-colors"
            >
              {company.email}
            </a>
          </p>
          <div className="mt-3 flex justify-center">
            <BBBSeal />
          </div>
        </div>
      </footer>
    </div>
  );
}
