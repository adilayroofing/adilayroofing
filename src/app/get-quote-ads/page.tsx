"use client";

import { useState, useEffect, FormEvent, Suspense } from "react";
import Image from "next/image";
import { useSearchParams, usePathname } from "next/navigation";
import { company } from "@/data/company";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const serviceOptions = [
  "Roof Replacement",
  "Roof Replacement + Free Gutter Cleaning",
  "Roof Repair",
  "Flat Roofing",
  "Shingle Roofing",
  "Siding",
  "Other",
];

const reviews = [
  {
    name: "Rob Lehr",
    quote:
      "Adilay Roofing was the only one that left nothing to chance. They removed a leaking metal roof installed over cedar shingles probably 100 years ago. The entire job was done in 2 days, everything cleaned up. They even painted the chimneys and replaced some downspouts — things not in the quote. Better than expected!",
    timeAgo: "6 months ago",
  },
  {
    name: "Matthew Kollar",
    quote:
      "I'd highly recommend Adilay Roofing to anyone. From communication to pricing to execution, everything was flawless. The team was professional and completed the job within 48 hours. A+. Highly Recommend!",
    timeAgo: "10 months ago",
  },
  {
    name: "Cathy Williams",
    quote:
      "Nissim Erez, Owner is a professional, honest and easy to communicate with. His crew is skilled and gave a full day performance each day. They completed each project with quality workmanship. I'm a satisfied customer.",
    timeAgo: "4 months ago",
  },
];

function StarIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export default function GetQuoteAdsPage() {
  return (
    <Suspense>
      <GetQuoteAdsContent />
    </Suspense>
  );
}

function GetQuoteAdsContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const utmSource = searchParams.get("utm_source") || "";
  const utmMedium = searchParams.get("utm_medium") || "";
  const utmCampaign = searchParams.get("utm_campaign") || "";
  const utmContent = searchParams.get("utm_content") || "";
  const utmTerm = searchParams.get("utm_term") || "";
  const gclid = searchParams.get("gclid") || "";

  // Fire ViewContent on mount
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "ViewContent", { content_name: "Meta Ads Quote Page" });
    }
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    // Honeypot check
    if (formData.get("website")) {
      setSubmitted(true);
      setIsSubmitting(false);
      return;
    }

    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      service: formData.get("service") as string,
      zipCode: formData.get("zipCode") as string,
      message: formData.get("message") as string,
      source: "meta-ads",
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_content: utmContent,
      utm_term: utmTerm,
      gclid,
      landingPage: pathname,
    };

    try {
      const res = await fetch("/api/lp-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to submit.");

      setSubmittedName(data.name);
      setSubmitted(true);

      // GA4 generate_lead event
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", {
          event_category: "Meta Ads Landing Page",
          service_type: data.service,
          landing_page: pathname,
          currency: "USD",
          value: 10,
        });
      }

      // Facebook Pixel Lead event
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "Lead", {
          content_name: data.service,
          content_category: "Meta Ads Landing Page",
        });
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or call us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "w-full px-4 py-3.5 border border-brand-border rounded-sm text-brand-dark placeholder:text-brand-gray/60 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-colors text-base";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ── Minimal Header ── */}
      <header className="bg-white border-b border-brand-border px-4 py-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a href="/" aria-label="Adilay Roofing Home">
            <Image
              src="/images/logo-new.png"
              alt="Adilay Roofing"
              width={220}
              height={64}
              className="h-14 md:h-16 w-auto"
              priority
            />
          </a>
          <div className="flex items-center gap-3">
            <a
              href="sms:+12672553620&body=Hi%2C%20I%27m%20interested%20in%20a%20free%20roofing%20estimate."
              className="inline-flex items-center gap-1.5 text-brand-dark hover:text-brand-red transition-colors text-sm font-medium"
              aria-label="Text us"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="hidden md:inline">Text Us</span>
            </a>
            <a
              href={`tel:${company.phoneRaw}`}
              className="inline-flex items-center gap-1.5 bg-brand-red text-white font-bold text-sm px-4 py-2.5 rounded-sm hover:bg-brand-red-dark transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {company.phone}
            </a>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="flex-1">
        {/* ── Hero with Background Photo ── */}
        <section className="relative bg-brand-darker overflow-hidden">
          <Image
            src="/images/adilay-van-jobsite.jpg"
            alt="Adilay Roofing crew and truck at a job site"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:py-14 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-3">
              Get Your <span className="text-brand-red">FREE</span> Roofing Estimate
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto">
              No obligation. No pressure. We&apos;ll respond within 24 hours.
            </p>

            {/* Offer Banner */}
            <div className="mt-4 inline-block bg-amber-500/20 border border-amber-400/40 rounded-lg px-4 py-2.5">
              <p className="text-white text-sm md:text-base font-semibold">
                🎁 <span className="text-amber-300">FREE Gutter Cleaning</span> with Every Roof Replacement — First-Time Customers
              </p>
            </div>

            {/* Quick trust row */}
            <div className="flex items-center justify-center gap-4 md:gap-8 mt-5 flex-wrap">
              {[
                { value: "20+", label: "Years Exp." },
                { value: "2,080+", label: "Projects" },
                { value: "5.0★", label: "Google Rating" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-white font-bold text-lg md:text-2xl">{stat.value}</p>
                  <p className="text-white/60 text-[10px] md:text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Form + Trust Side-by-Side on Desktop ── */}
        <section className="max-w-5xl mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* ── Left: Form ── */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-1">
                Request Your Free Estimate
              </h2>
              <p className="text-brand-gray text-sm mb-5">
                Fill out this quick form — takes less than 60 seconds.
              </p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <svg
                    className="w-14 h-14 text-green-500 mx-auto mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-green-800 text-lg font-bold mb-2">
                    Thank You{submittedName.trim() ? `, ${submittedName.trim().split(" ")[0]}` : ""}!
                  </p>
                  <p className="text-green-700 text-sm mb-1">
                    We received your request.
                  </p>
                  <p className="text-green-700 text-sm">
                    Our team will call you within 24 hours to schedule your free estimate.
                  </p>
                  <p className="text-green-600 text-sm mt-3">
                    Need help sooner? Call us now:{" "}
                    <a href={`tel:${company.phoneRaw}`} className="font-bold underline">
                      {company.phone}
                    </a>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your full name"
                    className={inputClass}
                  />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Your phone number"
                    className={inputClass}
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Your email address"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    name="zipCode"
                    required
                    placeholder="Your ZIP code"
                    pattern="[0-9]{5}"
                    maxLength={5}
                    inputMode="numeric"
                    className={inputClass}
                  />
                  <select
                    name="service"
                    required
                    defaultValue=""
                    className={`${inputClass} appearance-none bg-white bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23717171%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat`}
                  >
                    <option value="" disabled>
                      Service Needed
                    </option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <textarea
                    name="message"
                    placeholder="Brief description of your roofing issue (optional)"
                    rows={2}
                    className={`${inputClass} resize-none`}
                  />

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-sm p-3 text-red-700 text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-brand-red hover:bg-brand-red-dark text-white font-bold text-lg rounded-sm transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Get My Free Estimate"
                    )}
                  </button>

                  {/* Trust signals below button */}
                  <p className="text-xs text-brand-gray text-center pt-1">
                    ✓ Free Estimates &nbsp;&nbsp; ✓ No Obligation &nbsp;&nbsp; ✓ Response Within 24hrs
                  </p>
                </form>
              )}
            </div>

            {/* ── Right: Trust Content (visible on all screens) ── */}
            <div className="space-y-6">
              {/* Crew working photo */}
              <div className="rounded-sm overflow-hidden shadow-lg">
                <Image
                  src="/images/crew-working.jpg"
                  alt="Adilay Roofing crew working on a residential roof replacement"
                  width={600}
                  height={400}
                  className="w-full h-48 md:h-56 object-cover"
                />
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "20+", label: "Years Experience" },
                  { value: "2,080+", label: "Projects Completed" },
                  { value: "1,000+", label: "Happy Clients" },
                  { value: "PA184779", label: "Licensed & Insured" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-brand-navy text-white text-center rounded-sm px-3 py-3"
                  >
                    <p className="text-lg md:text-xl font-bold">{stat.value}</p>
                    <p className="text-[10px] md:text-xs text-white/70 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Truck + house photo */}
              <div className="rounded-sm overflow-hidden shadow-lg">
                <Image
                  src="/images/adilay-van-service-areas.jpg"
                  alt="Adilay Roofing branded truck parked outside a completed residential roofing project"
                  width={600}
                  height={400}
                  className="w-full h-48 md:h-56 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Licensed & Insured Section ── */}
        <section className="bg-brand-darker text-white py-8 md:py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
              {/* License image */}
              <div className="rounded-sm overflow-hidden shadow-2xl border border-white/10 bg-white">
                <Image
                  src="/images/pa-license.png"
                  alt="Commonwealth of Pennsylvania Home Improvement Contractor License - Adilay Roofing LLC, Registration PA184779"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
              </div>

              {/* License text */}
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Licensed &amp; Verified
                </div>
                <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-3 text-white">
                  PA Licensed Home Improvement Contractor
                </h2>
                <p className="text-white/70 text-sm md:text-base leading-relaxed mb-5">
                  Adilay Roofing is officially registered with the Commonwealth of
                  Pennsylvania. Your project is protected by state-regulated standards.
                </p>
                <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto md:mx-0">
                  <div className="bg-white/10 rounded-lg p-3 border border-white/10">
                    <p className="text-white/50 text-[10px] font-semibold uppercase tracking-wider mb-0.5">License #</p>
                    <p className="text-white font-bold text-base">PA184779</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 border border-white/10">
                    <p className="text-white/50 text-[10px] font-semibold uppercase tracking-wider mb-0.5">Status</p>
                    <p className="text-green-400 font-bold text-base flex items-center gap-1.5 justify-center md:justify-start">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      Active
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Real Work Photos ── */}
        <section className="py-8 md:py-12 px-4 bg-brand-light">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-brand-dark text-center mb-5">
              Our Crew in Action
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { src: "/images/adilay-crew-at-work.jpg", alt: "Adilay Roofing crew installing a new roof", pos: "" },
                { src: "/images/adilay-truck.jpg", alt: "Adilay Roofing branded truck at a residential property", pos: "" },
                { src: "/images/crew-flat-roof-action.png", alt: "Crew working on a flat roof installation", pos: "" },
                { src: "/images/metal-roof-crew.jpg", alt: "Roofing crew installing metal roofing", pos: "object-left" },
                { src: "/images/zzzz.jpg", alt: "Adilay Roofing crew installing siding on a residential property", pos: "" },
                { src: "/images/adilay-safety-crew.jpg", alt: "Adilay Roofing safety crew with helmets on site", pos: "object-left" },
              ].map((photo) => (
                <div key={photo.src} className="rounded-sm overflow-hidden shadow-md">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={400}
                    height={300}
                    className={`w-full h-32 md:h-44 object-cover ${photo.pos}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Project Transformation Timeline ── */}
        <section className="py-8 md:py-12 px-4 bg-white overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-brand-dark text-center mb-1">
              See the Transformation
            </h2>
            <p className="text-brand-gray text-sm text-center mb-6">
              A complete roof replacement on a large Victorian home — start to finish.
            </p>

            {/* Timeline strip */}
            <div className="relative">
              {/* Progress line */}
              <div className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-0.5 bg-brand-border z-0" />
              <div className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-0.5 bg-brand-red z-0 origin-left animate-[growLine_1.5s_ease-out_0.3s_both]" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {[
                  { src: "/images/project11-1.jpg", label: "Tear-Off & Prep", step: 1, pos: "", bg: "" },
                  { src: "/images/project11-2.jpg", label: "In Progress", step: 2, pos: "", bg: "" },
                  { src: "/images/project11-3.png", label: "Nearly Complete", step: 3, pos: "", bg: "" },
                  { src: "/images/project11-4.png", label: "Finished Result", step: 4, pos: "!object-contain", bg: "bg-[#B5CCE0]" },
                ].map((photo, idx) => (
                  <div
                    key={photo.step}
                    className="relative opacity-0 animate-[fadeSlideUp_0.5s_ease-out_forwards]"
                    style={{ animationDelay: `${idx * 0.2 + 0.3}s` }}
                  >
                    {/* Step dot */}
                    <div className="hidden md:flex w-10 h-10 rounded-full bg-brand-red text-white items-center justify-center font-bold text-sm mx-auto mb-3 relative z-10 shadow-md">
                      {photo.step}
                    </div>
                    <div className={`rounded-sm overflow-hidden shadow-lg border border-brand-border ${photo.bg}`}>
                      <Image
                        src={photo.src}
                        alt={`Step ${photo.step}: ${photo.label} — Victorian roof replacement project`}
                        width={400}
                        height={300}
                        className={`w-full h-40 md:h-48 object-cover ${photo.pos}`}
                      />
                    </div>
                    <p className="text-center mt-2">
                      <span className="md:hidden inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-red text-white text-[10px] font-bold mr-1 align-middle">
                        {photo.step}
                      </span>
                      <span className="text-brand-dark font-semibold text-xs md:text-sm">{photo.label}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Service Areas ── */}
        <section className="py-5 md:py-6 px-4 bg-brand-navy text-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Serving Philadelphia &amp; Surrounding Areas
            </h2>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {["Philadelphia", "Bucks County", "Montgomery County", "Delaware County", "Chester County", "Norristown", "Cheltenham", "Bensalem", "Levittown", "Abington"].map((area) => (
                <span
                  key={area}
                  className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs md:text-sm text-white/90 font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Google Reviews ── */}
        <section className="py-8 md:py-12 px-4 bg-brand-light">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-5">
              <GoogleIcon />
              <span className="text-brand-dark font-bold text-base">5.0</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarIcon key={i} className="w-5 h-5 text-brand-star" />
                ))}
              </div>
              <span className="text-brand-gray text-sm">(41 reviews)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reviews.map((review) => (
                <div
                  key={review.name}
                  className="bg-brand-light border border-brand-border rounded-sm p-5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {review.name.charAt(0)}
                      </div>
                      <span className="font-bold text-brand-dark text-sm">{review.name}</span>
                    </div>
                    <span className="text-[10px] text-brand-gray">{review.timeAgo}</span>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <StarIcon key={i} className="w-3.5 h-3.5 text-brand-star" />
                    ))}
                  </div>
                  <p className="text-brand-dark text-sm leading-relaxed">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="bg-brand-red py-8 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Ready for Your Free Estimate?
            </h2>
            <p className="text-white/80 text-sm md:text-base mb-5">
              Call us now or scroll back up to fill out the form.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`tel:${company.phoneRaw}`}
                className="inline-flex items-center gap-2 bg-white text-brand-red font-bold text-lg px-8 py-4 rounded-sm hover:bg-brand-light transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call {company.phone}
              </a>
              <a
                href="sms:+12672553620&body=Hi%2C%20I%27m%20interested%20in%20a%20free%20roofing%20estimate."
                className="inline-flex items-center gap-2 bg-transparent text-white font-bold text-lg px-8 py-4 rounded-sm border-2 border-white hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Text Us
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Minimal Footer ── */}
      <footer className="bg-brand-navy text-white/60 text-center text-xs py-6 px-4">
        <p className="font-bold text-white text-sm mb-1">Adilay Roofing &copy; {new Date().getFullYear()}</p>
        <p>
          <a href={`tel:${company.phoneRaw}`} className="text-white/80 hover:text-white transition-colors">
            {company.phone}
          </a>
        </p>
        <p className="mt-1">Licensed PA Home Improvement Contractor #PA184779</p>
      </footer>
    </div>
  );
}
