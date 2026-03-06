"use client";

import { useState, useEffect, useRef } from "react";
import { company } from "@/data/company";

/* ────────────────────────────────────────────────────────────
   Types
   ──────────────────────────────────────────────────────────── */

interface FormData {
  // Step 1 - Service Area
  serviceArea: string;
  propertyType: "" | "residential" | "commercial";

  // Step 2 - Project Type
  projectType: "" | "replace" | "repair" | "new-construction";

  // Step 3 - Services Needed
  servicesNeeded: string[];

  // Step 4 - Timeline
  timeline: string;

  // Step 5 - Property Details
  squareFootage: string;
  stories: string;
  knownIssues: string;

  // Step 6 - Contact Info
  fullName: string;
  phone: string;
  email: string;
  preferredContact: "" | "phone-call" | "text" | "email";
}

const INITIAL_FORM_DATA: FormData = {
  serviceArea: "",
  propertyType: "",
  projectType: "",
  servicesNeeded: [],
  timeline: "",
  squareFootage: "",
  stories: "",
  knownIssues: "",
  fullName: "",
  phone: "",
  email: "",
  preferredContact: "",
};

const TOTAL_STEPS = 7;

const STEP_PROGRESS: Record<number, number> = {
  1: 12,
  2: 25,
  3: 37,
  4: 50,
  5: 62,
  6: 87,
  7: 100,
};

const PROJECT_TYPES = [
  {
    value: "replace",
    label: "Replace",
    description: "Full roof replacement",
    icon: (
      <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    value: "repair",
    label: "Repair",
    description: "Fix existing issues",
    icon: (
      <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.16-5.17a3.12 3.12 0 114.42-4.42l.74.74.74-.74a3.12 3.12 0 014.42 0 3.12 3.12 0 010 4.42l-5.16 5.17zM21.68 8.71a3.12 3.12 0 00-4.42 0L12 13.97M11.42 15.17L16.58 21" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.5 4.5M14.25 8.25v.75M18 3v1.5M20.25 5.25h-1.5" />
      </svg>
    ),
  },
  {
    value: "new-construction",
    label: "New Build",
    description: "Brand new installation",
    icon: (
      <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6M4.5 9v10.125c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v4.5" />
      </svg>
    ),
  },
] as const;

const SERVICE_OPTIONS = [
  {
    value: "shingle-roofing",
    label: "Shingle Roofing",
    icon: (
      <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    value: "flat-roofing",
    label: "Flat Roofing",
    icon: (
      <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18M18.75 3v18M9 6.75h1.5M9 9.75h1.5M9 12.75h1.5M14.25 6.75h1.5M14.25 9.75h1.5M14.25 12.75h1.5M9 18.75h6V15.75H9v3z" />
      </svg>
    ),
  },
  {
    value: "siding",
    label: "Siding",
    icon: (
      <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    value: "windows",
    label: "Windows",
    icon: (
      <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M12 3.75v16.5M3 12h18" />
      </svg>
    ),
  },
  {
    value: "gutters",
    label: "Gutters",
    icon: (
      <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
] as const;

const TIMELINE_OPTIONS = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-2-months", label: "Within 1-2 months" },
  { value: "3-6-months", label: "Within 3-6 months" },
  { value: "exploring", label: "Just exploring options" },
] as const;

const CONTACT_METHODS = [
  { value: "phone-call", label: "Phone Call" },
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
] as const;

/* ────────────────────────────────────────────────────────────
   Shared presentational helpers (OUTSIDE component to avoid re-mount)
   ──────────────────────────────────────────────────────────── */

function StepHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl md:text-3xl font-bold text-brand-dark mb-4 md:mb-6">
      {children}
    </h2>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-4 py-1.5 md:py-2">
      <span className="text-xs md:text-sm font-semibold text-brand-gray w-40 flex-shrink-0">
        {label}
      </span>
      <span className="text-sm md:text-base text-brand-dark font-medium">{value}</span>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Component
   ──────────────────────────────────────────────────────────── */

export default function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isFirstRender = useRef(true);

  /** After every step change (except initial load), scroll to the progress bar.
   *  Must override the CSS `scroll-behavior: smooth` on <html> to prevent the
   *  smooth animation from conflicting with the DOM content change. */
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const anchor = document.getElementById("quote-form-top");
        if (!anchor) return;
        // Temporarily disable CSS smooth-scroll so the jump is instant
        const html = document.documentElement;
        html.style.scrollBehavior = "auto";
        anchor.scrollIntoView({ behavior: "auto", block: "start" });
        // Re-enable after the scroll completes
        requestAnimationFrame(() => {
          html.style.scrollBehavior = "";
        });
      });
    });
  }, [currentStep, submitted]);

  /* ---------- helpers ---------- */

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function toggleService(service: string) {
    setFormData((prev) => {
      const current = prev.servicesNeeded;
      const next = current.includes(service)
        ? current.filter((s) => s !== service)
        : [...current, service];
      return { ...prev, servicesNeeded: next };
    });
    if (errors.servicesNeeded) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.servicesNeeded;
        return next;
      });
    }
  }

  /* ---------- validation ---------- */

  function validateStep(step: number): boolean {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.serviceArea) newErrors.serviceArea = "Please select a service area.";
        if (!formData.propertyType) newErrors.propertyType = "Please select property type.";
        break;
      case 2:
        if (!formData.projectType) newErrors.projectType = "Please select a project type.";
        break;
      case 3:
        if (formData.servicesNeeded.length === 0)
          newErrors.servicesNeeded = "Please select at least one service.";
        break;
      case 4:
        if (!formData.timeline) newErrors.timeline = "Please select a timeline.";
        break;
      case 5:
        break;
      case 6:
        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
        if (!formData.email.trim()) newErrors.email = "Email address is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
          newErrors.email = "Please enter a valid email address.";
        if (!formData.preferredContact)
          newErrors.preferredContact = "Please select a preferred contact method.";
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  /* ---------- navigation ---------- */

  function goNext() {
    if (!validateStep(currentStep)) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS));
      setIsTransitioning(false);
    }, 200);
  }

  function goBack() {
    setErrors({});
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep((s) => Math.max(s - 1, 1));
      setIsTransitioning(false);
    }, 200);
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to submit request.");
      }

      setSubmitted(true);
      // useEffect on [submitted] handles the scroll
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or call us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  /* ---------- label helpers for review ---------- */

  function getProjectTypeLabel(value: string): string {
    return PROJECT_TYPES.find((p) => p.value === value)?.label ?? value;
  }

  function getServicesLabels(values: string[]): string {
    return values
      .map((v) => SERVICE_OPTIONS.find((s) => s.value === v)?.label ?? v)
      .join(", ");
  }

  function getTimelineLabel(value: string): string {
    return TIMELINE_OPTIONS.find((t) => t.value === value)?.label ?? value;
  }

  function getContactMethodLabel(value: string): string {
    return CONTACT_METHODS.find((c) => c.value === value)?.label ?? value;
  }

  /* ────────── Inline error helper ────────── */

  function FieldError({ field }: { field: string }) {
    if (!errors[field]) return null;
    return <p className="text-red-500 text-xs md:text-sm mt-1">{errors[field]}</p>;
  }

  /* ────────────────────────────────────────────────────────────
     Success state
     ──────────────────────────────────────────────────────────── */

  if (submitted) {
    return (
      <div className="text-center py-10 md:py-16 px-4 md:px-6">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 md:mb-6">
          <svg className="w-8 h-8 md:w-10 md:h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl md:text-3xl font-bold text-brand-dark mb-2 md:mb-3">
          Thank You!
        </h2>
        <p className="text-brand-gray text-sm md:text-lg max-w-md mx-auto mb-2">
          Your quote request has been submitted successfully. Our team will review
          your information and get back to you within 24 hours.
        </p>
        <p className="text-brand-gray text-sm">
          If you need immediate assistance, call us at{" "}
          <a href={`tel:${company.phoneRaw}`} className="text-brand-red-dark font-semibold hover:underline">
            {company.phone}
          </a>
        </p>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────
     Step content rendered inline (fixes focus bug)
     ──────────────────────────────────────────────────────────── */

  function renderStep() {
    switch (currentStep) {
      /* ── Step 1: Service Area ── */
      case 1:
        return (
          <div>
            <StepHeading>Service Area</StepHeading>

            <div className="mb-4 md:mb-6">
              <label htmlFor="serviceArea" className="block text-xs md:text-sm font-semibold text-brand-dark mb-1.5 md:mb-2">
                Where is your property located?
              </label>
              <select
                id="serviceArea"
                value={formData.serviceArea}
                onChange={(e) => updateField("serviceArea", e.target.value)}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-brand-border bg-white text-brand-dark text-sm md:text-base
                           focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red
                           transition-colors appearance-none cursor-pointer"
              >
                <option value="">Select your area...</option>
                {company.serviceAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              <FieldError field="serviceArea" />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-semibold text-brand-dark mb-2 md:mb-3">
                For a home or a business?
              </label>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {(["residential", "commercial"] as const).map((type) => (
                  <label
                    key={type}
                    className={`relative flex items-center justify-center gap-2 md:gap-3 p-3 md:p-4 rounded-lg border-2 cursor-pointer
                                transition-all duration-200 ${
                                  formData.propertyType === type
                                    ? "border-brand-red bg-brand-red/5 shadow-sm"
                                    : "border-brand-border hover:border-gray-300 bg-white"
                                }`}
                  >
                    <input
                      type="radio"
                      name="propertyType"
                      value={type}
                      checked={formData.propertyType === type}
                      onChange={(e) =>
                        updateField("propertyType", e.target.value as FormData["propertyType"])
                      }
                      className="sr-only"
                    />
                    <span
                      className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                                  ${
                                    formData.propertyType === type
                                      ? "border-brand-red"
                                      : "border-gray-300"
                                  }`}
                    >
                      {formData.propertyType === type && (
                        <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-brand-red" />
                      )}
                    </span>
                    <span className="font-medium text-brand-dark capitalize text-sm md:text-base">{type}</span>
                  </label>
                ))}
              </div>
              <FieldError field="propertyType" />
            </div>
          </div>
        );

      /* ── Step 2: Project Type ── */
      case 2:
        return (
          <div>
            <StepHeading>Type of Project</StepHeading>
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {PROJECT_TYPES.map((pt) => (
                <label
                  key={pt.value}
                  className={`relative flex flex-col items-center text-center gap-1.5 md:gap-3 p-3 md:p-6 rounded-xl border-2 cursor-pointer
                              transition-all duration-200 ${
                                formData.projectType === pt.value
                                  ? "border-brand-red bg-brand-red/5 shadow-md"
                                  : "border-brand-border hover:border-gray-300 hover:shadow-sm bg-white"
                              }`}
                >
                  <input
                    type="radio"
                    name="projectType"
                    value={pt.value}
                    checked={formData.projectType === pt.value}
                    onChange={(e) =>
                      updateField("projectType", e.target.value as FormData["projectType"])
                    }
                    className="sr-only"
                  />
                  {/* Selection indicator */}
                  <span
                    className={`absolute top-2 right-2 md:top-3 md:right-3 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center
                                ${
                                  formData.projectType === pt.value
                                    ? "border-brand-red bg-brand-red"
                                    : "border-gray-300"
                                }`}
                  >
                    {formData.projectType === pt.value && (
                      <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span
                    className={`${
                      formData.projectType === pt.value ? "text-brand-red-dark" : "text-brand-gray"
                    } transition-colors`}
                  >
                    {pt.icon}
                  </span>
                  <span className="font-bold text-brand-dark text-sm md:text-lg">{pt.label}</span>
                  <span className="text-xs md:text-sm text-brand-gray hidden md:block">{pt.description}</span>
                </label>
              ))}
            </div>
            <FieldError field="projectType" />
          </div>
        );

      /* ── Step 3: Services Needed ── */
      case 3:
        return (
          <div>
            <StepHeading>What Do You Need?</StepHeading>
            <p className="text-brand-gray text-xs md:text-sm mb-3 md:mb-5">Select all that apply.</p>
            <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-4">
              {SERVICE_OPTIONS.map((svc) => {
                const selected = formData.servicesNeeded.includes(svc.value);
                return (
                  <label
                    key={svc.value}
                    className={`relative flex flex-col items-center text-center gap-1 md:gap-2 p-3 md:p-5 rounded-xl border-2 cursor-pointer
                                transition-all duration-200 ${
                                  selected
                                    ? "border-brand-red bg-brand-red/5 shadow-md"
                                    : "border-brand-border hover:border-gray-300 hover:shadow-sm bg-white"
                                }`}
                  >
                    <input
                      type="checkbox"
                      value={svc.value}
                      checked={selected}
                      onChange={() => toggleService(svc.value)}
                      className="sr-only"
                    />
                    {/* Checkbox indicator */}
                    <span
                      className={`absolute top-1.5 right-1.5 md:top-2.5 md:right-2.5 w-4 h-4 md:w-5 md:h-5 rounded flex items-center justify-center border-2
                                  ${
                                    selected
                                      ? "border-brand-red bg-brand-red"
                                      : "border-gray-300"
                                  }`}
                    >
                      {selected && (
                        <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span
                      className={`${
                        selected ? "text-brand-red-dark" : "text-brand-gray"
                      } transition-colors`}
                    >
                      {svc.icon}
                    </span>
                    <span className="font-semibold text-brand-dark text-xs md:text-sm">{svc.label}</span>
                  </label>
                );
              })}
            </div>
            <FieldError field="servicesNeeded" />
          </div>
        );

      /* ── Step 4: Timeline ── */
      case 4:
        return (
          <div>
            <StepHeading>When Do You Need This Done?</StepHeading>
            <div className="space-y-2 md:space-y-3">
              {TIMELINE_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                              ${
                                formData.timeline === opt.value
                                  ? "border-brand-red bg-brand-red/5 shadow-sm"
                                  : "border-brand-border hover:border-gray-300 bg-white"
                              }`}
                >
                  <input
                    type="radio"
                    name="timeline"
                    value={opt.value}
                    checked={formData.timeline === opt.value}
                    onChange={(e) => updateField("timeline", e.target.value)}
                    className="sr-only"
                  />
                  <span
                    className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                                ${
                                  formData.timeline === opt.value
                                    ? "border-brand-red"
                                    : "border-gray-300"
                                }`}
                  >
                    {formData.timeline === opt.value && (
                      <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-brand-red" />
                    )}
                  </span>
                  <span className="font-medium text-brand-dark text-sm md:text-base">{opt.label}</span>
                </label>
              ))}
            </div>
            <FieldError field="timeline" />
          </div>
        );

      /* ── Step 5: Property Details ── */
      case 5:
        return (
          <div>
            <StepHeading>Tell Us About Your Property</StepHeading>

            <div className="space-y-3 md:space-y-5">
              {/* Square footage */}
              <div>
                <label htmlFor="sqft" className="block text-xs md:text-sm font-semibold text-brand-dark mb-1.5 md:mb-2">
                  Approximate Square Footage
                </label>
                <input
                  id="sqft"
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 1,500"
                  value={formData.squareFootage}
                  onChange={(e) => updateField("squareFootage", e.target.value)}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-brand-border bg-white text-brand-dark text-sm md:text-base
                             placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red
                             focus:border-brand-red transition-colors"
                />
              </div>

              {/* Stories */}
              <div>
                <label htmlFor="stories" className="block text-xs md:text-sm font-semibold text-brand-dark mb-1.5 md:mb-2">
                  Number of Stories
                </label>
                <select
                  id="stories"
                  value={formData.stories}
                  onChange={(e) => updateField("stories", e.target.value)}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-brand-border bg-white text-brand-dark text-sm md:text-base
                             focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red
                             transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select...</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3+">3+</option>
                </select>
              </div>

              {/* Known issues */}
              <div>
                <label htmlFor="issues" className="block text-xs md:text-sm font-semibold text-brand-dark mb-1.5 md:mb-2">
                  Any Known Issues?{" "}
                  <span className="text-brand-gray font-normal">(optional)</span>
                </label>
                <textarea
                  id="issues"
                  rows={3}
                  placeholder="Leaks, visible damage, age of current roof, etc."
                  value={formData.knownIssues}
                  onChange={(e) => updateField("knownIssues", e.target.value)}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-brand-border bg-white text-brand-dark text-sm md:text-base
                             placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red
                             focus:border-brand-red transition-colors resize-none"
                />
              </div>
            </div>
          </div>
        );

      /* ── Step 6: Contact Info ── */
      case 6:
        return (
          <div>
            <StepHeading>Your Contact Information</StepHeading>

            <div className="space-y-3 md:space-y-5">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-xs md:text-sm font-semibold text-brand-dark mb-1.5 md:mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="John Smith"
                  value={formData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-brand-border bg-white text-brand-dark text-sm md:text-base
                             placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red
                             focus:border-brand-red transition-colors"
                />
                <FieldError field="fullName" />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-xs md:text-sm font-semibold text-brand-dark mb-1.5 md:mb-2">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-brand-border bg-white text-brand-dark text-sm md:text-base
                             placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red
                             focus:border-brand-red transition-colors"
                />
                <FieldError field="phone" />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs md:text-sm font-semibold text-brand-dark mb-1.5 md:mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-brand-border bg-white text-brand-dark text-sm md:text-base
                             placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red
                             focus:border-brand-red transition-colors"
                />
                <FieldError field="email" />
              </div>

              {/* Preferred contact method */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-brand-dark mb-2 md:mb-3">
                  Preferred Contact Method <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  {CONTACT_METHODS.map((m) => (
                    <label
                      key={m.value}
                      className={`flex items-center justify-center gap-1.5 md:gap-2 p-2.5 md:p-3 rounded-lg border-2 cursor-pointer
                                  transition-all duration-200 text-xs md:text-sm font-medium ${
                                    formData.preferredContact === m.value
                                      ? "border-brand-red bg-brand-red/5 text-brand-dark"
                                      : "border-brand-border hover:border-gray-300 text-brand-gray bg-white"
                                  }`}
                    >
                      <input
                        type="radio"
                        name="preferredContact"
                        value={m.value}
                        checked={formData.preferredContact === m.value}
                        onChange={(e) =>
                          updateField("preferredContact", e.target.value as FormData["preferredContact"])
                        }
                        className="sr-only"
                      />
                      {m.label}
                    </label>
                  ))}
                </div>
                <FieldError field="preferredContact" />
              </div>
            </div>
          </div>
        );

      /* ── Step 7: Review & Submit ── */
      case 7:
        return (
          <div>
            <StepHeading>Review Your Information</StepHeading>
            <p className="text-brand-gray text-xs md:text-sm mb-4 md:mb-6">
              Please review the details below before submitting.
            </p>

            <div className="space-y-2 md:space-y-4">
              <ReviewRow label="Service Area" value={formData.serviceArea} />
              <ReviewRow label="Property Type" value={formData.propertyType ? formData.propertyType.charAt(0).toUpperCase() + formData.propertyType.slice(1) : ""} />
              <ReviewRow label="Project Type" value={getProjectTypeLabel(formData.projectType)} />
              <ReviewRow label="Services Needed" value={getServicesLabels(formData.servicesNeeded)} />
              <ReviewRow label="Timeline" value={getTimelineLabel(formData.timeline)} />
              {formData.squareFootage && (
                <ReviewRow label="Square Footage" value={formData.squareFootage} />
              )}
              {formData.stories && <ReviewRow label="Stories" value={formData.stories} />}
              {formData.knownIssues && <ReviewRow label="Known Issues" value={formData.knownIssues} />}

              <div className="border-t border-brand-border my-1 md:my-2" />

              <ReviewRow label="Name" value={formData.fullName} />
              <ReviewRow label="Phone" value={formData.phone} />
              <ReviewRow label="Email" value={formData.email} />
              <ReviewRow label="Preferred Contact" value={getContactMethodLabel(formData.preferredContact)} />
            </div>

            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4 md:mt-6 text-red-700 text-sm">
                {submitError}
              </div>
            )}

            <p className="text-xs text-brand-gray mt-6 md:mt-8 leading-relaxed">
              By submitting, you agree to be contacted regarding your project. We
              respect your privacy and will never share your information with third
              parties.
            </p>
          </div>
        );

      default:
        return null;
    }
  }

  /* ────────────────────────────────────────────────────────────
     Render
     ──────────────────────────────────────────────────────────── */

  return (
    <div className="w-full">
      {/* ── Progress bar ── */}
      <div className="mb-5 md:mb-8">
        <div className="flex items-center justify-between mb-1.5 md:mb-2">
          <span className="text-xs md:text-sm font-semibold text-brand-dark">
            Step {currentStep} of {TOTAL_STEPS}
          </span>
          <span className="text-xs md:text-sm font-semibold text-brand-red-dark">
            {STEP_PROGRESS[currentStep]}%
          </span>
        </div>
        <div className="w-full h-2 md:h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-red rounded-full transition-all duration-500 ease-out"
            style={{ width: `${STEP_PROGRESS[currentStep]}%` }}
          />
        </div>
      </div>

      {/* ── Navigation buttons (TOP — only on review step) ── */}
      {currentStep === TOTAL_STEPS && (
        <div className="flex items-center justify-between mb-6 md:mb-8 pb-4 md:pb-6 border-b border-brand-border">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 text-brand-gray font-medium hover:text-brand-dark transition-colors cursor-pointer text-sm md:text-base"
          >
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn-primary !py-2.5 md:!py-3 !px-6 md:!px-10 text-sm md:text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Submit Request
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 ml-1.5 md:ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}

      {/* ── Step content (inline — no nested components) ── */}
      <div
        className={`transition-opacity duration-200 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {renderStep()}
      </div>

      {/* ── Navigation buttons (BOTTOM — for steps 1-6 only) ── */}
      {currentStep < TOTAL_STEPS && (
        <div className="flex items-center justify-between mt-6 md:mt-10 pt-4 md:pt-6 border-t border-brand-border">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 text-brand-gray font-medium hover:text-brand-dark transition-colors cursor-pointer text-sm md:text-base"
            >
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Back
            </button>
          ) : (
            <div />
          )}
          <button type="button" onClick={goNext} className="btn-primary !py-2.5 md:!py-3 !px-6 md:!px-10 text-sm md:text-base">
            Next
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4 ml-1.5 md:ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
