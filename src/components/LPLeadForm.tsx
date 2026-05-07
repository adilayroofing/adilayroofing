"use client";

import { useState, FormEvent } from "react";
import { useSearchParams, usePathname } from "next/navigation";

const serviceOptions = [
  "Roof Replacement",
  "Roof Repair",
  "Flat Roofing (EPDM)",
  "Shingle Roofing",
  "Siding Installation & Repair",
  "Window Installation & Replacement",
  "Gutter Installation & Repair",
  "Emergency Roof Repair",
  "Free Roof Inspection",
  "Other",
];

interface LPLeadFormProps {
  defaultService?: string;
  isEmergency?: boolean;
  submitButtonText?: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export default function LPLeadForm({
  defaultService,
  isEmergency,
  submitButtonText = "Get My Free Quote",
}: LPLeadFormProps) {
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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      service: formData.get("service") as string,
      zipCode: formData.get("zipCode") as string,
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
          event_category: "Landing Page Form",
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
          content_category: "Landing Page",
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

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <svg
          className="w-12 h-12 text-green-500 mx-auto mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-green-800 text-lg font-bold mb-2">
          Thank You
          {submittedName.trim()
            ? `, ${submittedName.trim().split(" ")[0]}`
            : ""}
          !
        </p>
        <p className="text-green-700 text-sm">
          We&apos;ll contact you within 30 minutes during business hours.
        </p>
        <p className="text-green-600 text-xs mt-2">
          Need immediate help? Call{" "}
          <a href="tel:+12672553620" className="font-bold underline">
            (267) 255-3620
          </a>
        </p>
      </div>
    );
  }

  const accent = isEmergency
    ? "focus:ring-orange-500 focus:border-orange-500"
    : "focus:ring-brand-red focus:border-brand-red";

  const inputClass = `w-full px-4 py-3 border border-brand-border rounded-sm text-brand-dark placeholder:text-brand-gray/60 focus:outline-none focus:ring-2 ${accent} transition-colors`;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        name="name"
        required
        placeholder="Full Name *"
        className={inputClass}
      />
      <input
        type="tel"
        name="phone"
        required
        placeholder="Phone Number *"
        className={inputClass}
      />
      <input
        type="email"
        name="email"
        required
        placeholder="Email Address *"
        className={inputClass}
      />
      <select
        name="service"
        required
        defaultValue={defaultService || ""}
        className={`${inputClass} appearance-none bg-white bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23717171%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat`}
      >
        {!defaultService && (
          <option value="" disabled>
            Service Needed *
          </option>
        )}
        {serviceOptions.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="zipCode"
        required
        placeholder="Zip Code *"
        pattern="[0-9]{5}"
        maxLength={5}
        className={inputClass}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-sm p-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 ${
          isEmergency
            ? "bg-orange-600 hover:bg-orange-700"
            : "bg-brand-red hover:bg-brand-red-dark"
        } text-white font-bold text-lg rounded-sm transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {isSubmitting ? (
          <span className="inline-flex items-center justify-center">
            <svg
              className="w-5 h-5 mr-2 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Submitting...
          </span>
        ) : (
          submitButtonText
        )}
      </button>

      <p className="text-xs text-brand-gray text-center">
        No spam. No obligation. Free estimate.
      </p>
    </form>
  );
}
