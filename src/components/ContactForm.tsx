"use client";

import { useState, useRef, FormEvent } from "react";
import Link from "next/link";
import { company } from "@/data/company";
import { bookingSchedules } from "@/data/booking";

const serviceOptions = [
  "Roof Replacement",
  "Roof Repair",
  "Flat Roofing (EPDM)",
  "Shingle Roofing",
  "Siding Installation & Repair",
  "Window Installation & Replacement",
  "Gutter Installation & Repair",
  "Other",
];

type Step = 1 | 2;

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  financingInterested: boolean;
}

const INITIAL: FormData = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  financingInterested: false,
};

const inputClass =
  "w-full px-3.5 py-2.5 md:px-4 md:py-3 border border-brand-border rounded-sm text-brand-dark placeholder:text-brand-gray/50 " +
  "focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-colors";

export default function ContactForm() {
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [showStage1Errors, setShowStage1Errors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openScheduleIdx, setOpenScheduleIdx] = useState<number | null>(null);
  const formTopRef = useRef<HTMLDivElement>(null);
  const bookingEmbedRef = useRef<HTMLDivElement>(null);

  const availableSchedules = bookingSchedules.filter((s) => s.url.trim());

  function selectSchedule(i: number) {
    // On phones the embedded iframe is cramped, iOS zooms into its form
    // inputs, and the booking confirmation ends up out of view — Google's
    // standalone page handles mobile properly, so open it directly.
    if (window.matchMedia("(max-width: 640px)").matches) {
      window.open(
        bookingUrl(availableSchedules[i].url, false),
        "_blank",
        "noopener"
      );
      return;
    }
    const opening = openScheduleIdx !== i;
    setOpenScheduleIdx(opening ? i : null);
    if (opening) {
      requestAnimationFrame(() => {
        bookingEmbedRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      });
    }
  }

  // Google booking pages don't support prefill via URL params; signed-in
  // Google users get their name/email auto-filled by Google itself.
  function bookingUrl(base: string, embed: boolean) {
    try {
      const url = new URL(base);
      if (embed) url.searchParams.set("gv", "true");
      return url.toString();
    } catch {
      return base;
    }
  }

  const emailValid = /\S+@\S+\.\S+/.test(data.email.trim());
  const stage1Valid = data.name.trim().length > 0 && emailValid;
  const stage2Valid = data.service.length > 0 && data.message.trim().length > 0;

  function scrollFormToTop() {
    if (!formTopRef.current) return;
    const html = document.documentElement;
    html.style.scrollBehavior = "auto";
    formTopRef.current.scrollIntoView({ behavior: "auto", block: "start" });
    requestAnimationFrame(() => {
      html.style.scrollBehavior = "";
    });
  }

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function goNext() {
    setShowStage1Errors(true);
    if (stage1Valid) {
      setStep(2);
      setError("");
      requestAnimationFrame(scrollFormToTop);
    }
  }

  function goPrev() {
    setStep(1);
    setError("");
    requestAnimationFrame(scrollFormToTop);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!stage2Valid) return;
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to send message.");

      setSubmitted(true);

      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "Lead");
      }
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", {
          event_category: "Contact Form",
          service_type: data.service,
          currency: "USD",
          value: 1,
        });
      }

      setTimeout(scrollFormToTop, 50);
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

  // ── Thank-you state ───────────────────────────────────────────────────
  if (submitted) {
    const firstName = data.name.trim().split(/\s+/)[0];
    return (
      <div
        ref={formTopRef}
        style={{ scrollMarginTop: "120px" }}
        className="bg-white border border-brand-border rounded-sm p-6 md:p-10 text-center"
      >
        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-5 bg-brand-red/10 rounded-full flex items-center justify-center">
          <svg
            className="w-9 h-9 md:w-11 md:h-11 text-brand-red"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-3">
          Thank You{firstName ? `, ${firstName}` : ""}!
        </h3>
        <p className="text-brand-gray text-base md:text-lg mb-1">
          Your request was successfully sent.
        </p>
        <p className="text-brand-gray text-sm md:text-base mb-7">
          One of our team will reach out within 24 hours. Need to talk now?
        </p>

        {availableSchedules.length > 0 && (
          <div className="mb-7 border-2 border-brand-red/20 rounded-sm bg-brand-light/60 p-4 md:p-6 text-left">
            <div className="text-center mb-4 md:mb-5">
              <span className="inline-block px-3 py-1 mb-2 bg-brand-red text-white text-xs font-bold uppercase tracking-wider rounded-full">
                New
              </span>
              <h4 className="text-lg md:text-xl font-bold text-brand-dark mb-1">
                Skip the wait — book your free visit now
              </h4>
              <p className="text-brand-gray text-sm">
                Choose a day and time that works for you — booking takes
                under a minute.
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-3"
              role="group"
              aria-label="Choose a visit type"
            >
              {availableSchedules.map((schedule, i) => {
                const selected = openScheduleIdx === i;
                return (
                  <button
                    key={schedule.label}
                    type="button"
                    onClick={() => selectSchedule(i)}
                    aria-expanded={selected}
                    className={`flex-1 flex items-center gap-3 p-3.5 md:p-4 rounded-sm border-2 text-left transition-all active:scale-[0.98] cursor-pointer ${
                      selected
                        ? "border-brand-red bg-white shadow-md"
                        : "border-brand-border bg-white hover:border-brand-red/60"
                    }`}
                  >
                    <span
                      className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        selected
                          ? "bg-brand-red text-white"
                          : "bg-brand-red/10 text-brand-red"
                      }`}
                    >
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-bold text-brand-dark leading-tight">
                        {schedule.label}
                      </span>
                      <span className="block text-sm text-brand-gray mt-0.5">
                        {schedule.duration} on-site
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="sm:hidden w-9 h-9 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M7 17L17 7m0 0H8m9 0v9"
                        />
                      </svg>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`hidden sm:flex w-5 h-5 rounded-full border-2 items-center justify-center shrink-0 transition-colors ${
                        selected
                          ? "border-brand-red bg-brand-red"
                          : "border-brand-border bg-white"
                      }`}
                    >
                      {selected && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            <div ref={bookingEmbedRef} style={{ scrollMarginTop: "100px" }}>
              {openScheduleIdx !== null && availableSchedules[openScheduleIdx] && (
                <div className="mt-4">
                  <iframe
                    src={bookingUrl(availableSchedules[openScheduleIdx].url, true)}
                    title={`Book a ${availableSchedules[openScheduleIdx].duration} visit`}
                    className="w-full h-[600px] md:h-[680px] bg-white border border-brand-border rounded-sm"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mt-2">
                    <p className="text-xs text-brand-gray">
                      Powered by Google Calendar — you&apos;ll get an email
                      confirmation instantly.
                    </p>
                    <a
                      href={bookingUrl(availableSchedules[openScheduleIdx].url, false)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-brand-gray underline hover:text-brand-dark whitespace-nowrap"
                    >
                      Open in a new tab
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`tel:${company.phoneRaw}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-red text-white font-bold rounded-sm hover:bg-brand-red-dark active:scale-[0.97] transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call {company.phone}
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-brand-dark font-bold border-2 border-brand-dark rounded-sm hover:bg-brand-dark hover:text-white active:scale-[0.97] transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // ── Form state ────────────────────────────────────────────────────────
  return (
    <div ref={formTopRef} style={{ scrollMarginTop: "120px" }}>
      {/* Progress indicator: ○ ────── ○ */}
      <div className="flex items-center justify-center mb-4 md:mb-6" aria-label={`Step ${step} of 2`}>
        <StepCircle n={1} active={step >= 1} complete={step > 1} />
        <div
          className={`flex-1 max-w-[200px] h-0.5 mx-2 transition-colors duration-300 ${
            step >= 2 ? "bg-brand-red" : "bg-brand-border"
          }`}
        />
        <StepCircle n={2} active={step >= 2} complete={false} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-5" noValidate>
        {step === 1 ? (
          <>
            {/* Stage 1 — Contact basics */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-brand-dark mb-1.5">
                Full Name <span className="text-brand-red">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="John Smith"
                className={inputClass}
                aria-invalid={showStage1Errors && !data.name.trim()}
                autoComplete="name"
              />
              {showStage1Errors && !data.name.trim() && (
                <p className="text-brand-red text-xs mt-1">Please enter your name.</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-brand-dark mb-1.5">
                Email Address <span className="text-brand-red">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="john@example.com"
                className={inputClass}
                aria-invalid={showStage1Errors && !emailValid}
                autoComplete="email"
                inputMode="email"
              />
              {showStage1Errors && !emailValid && (
                <p className="text-brand-red text-xs mt-1">Please enter a valid email.</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-bold text-brand-dark mb-1.5">
                Phone Number <span className="text-brand-gray font-normal">(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="(555) 123-4567"
                className={inputClass}
                autoComplete="tel"
                inputMode="tel"
              />
            </div>

            <button
              type="button"
              onClick={goNext}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 md:py-3.5 bg-brand-red text-white font-bold rounded-sm hover:bg-brand-red-dark active:scale-[0.97] transition-all"
            >
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </>
        ) : (
          <>
            {/* Stage 2 — Project details */}
            <div>
              <label htmlFor="service" className="block text-sm font-bold text-brand-dark mb-1.5">
                Service Needed <span className="text-brand-red">*</span>
              </label>
              <select
                id="service"
                name="service"
                value={data.service}
                onChange={(e) => update("service", e.target.value)}
                className={`${inputClass} appearance-none bg-white bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23717171%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10`}
              >
                <option value="" disabled>
                  Select a service...
                </option>
                {serviceOptions.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-bold text-brand-dark mb-1.5">
                How can we help? <span className="text-brand-red">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={data.message}
                onChange={(e) => update("message", e.target.value)}
                rows={4}
                placeholder="Tell us a bit about your project — property address, what's going on, anything we should know."
                className={`${inputClass} resize-vertical`}
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="financingInterested"
                name="financingInterested"
                checked={data.financingInterested}
                onChange={(e) => update("financingInterested", e.target.checked)}
                className="mt-1 w-4 h-4 text-brand-red border-brand-border rounded focus:ring-brand-red cursor-pointer"
              />
              <label htmlFor="financingInterested" className="text-sm text-brand-dark cursor-pointer">
                I&apos;m interested in <strong>financing options</strong> for my project
                <span className="block text-xs text-brand-gray mt-0.5">
                  Loans from $1,000 to $100,000 — no payments until job is complete.
                </span>
              </label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-sm p-3 text-red-700 text-sm" role="alert">
                {error}
              </div>
            )}

            <p className="text-xs text-gray-500 mt-3 leading-snug">
              By submitting, you agree that Adilay Roofing may contact you by phone, text, and email about your request. Msg frequency varies; msg &amp; data rates may apply. Reply STOP to opt out, HELP for help. See our <Link href="/privacy" className="underline hover:text-gray-700">Privacy Policy</Link>.
            </p>

            <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-1">
              <button
                type="button"
                onClick={goPrev}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-white text-brand-dark font-semibold border border-brand-border rounded-sm hover:bg-brand-light active:scale-[0.97] transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Previous
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !stage2Valid}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-red text-white font-bold rounded-sm hover:bg-brand-red-dark active:scale-[0.97] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Request Estimate"
                )}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────
function StepCircle({ n, active, complete }: { n: number; active: boolean; complete: boolean }) {
  return (
    <div
      className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors duration-300 ${
        active
          ? "bg-brand-red border-brand-red text-white"
          : "bg-white border-brand-border text-brand-gray"
      }`}
      aria-current={active && !complete ? "step" : undefined}
    >
      {complete ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        n
      )}
    </div>
  );
}
