"use client";

import InlineRichTextField from "./InlineRichTextField";

export interface QuotePageContent {
  heroTitle: string;
  heroDescription: string;
  offerBannerText: string;
  trustSignals: string[];
  licenseHeading: string;
  licenseDescription: string;
  serviceAreaHeading: string;
  serviceAreaDescription: string;
  faqHeading: string;
  faqSubheading: string;
}

export default function StructuredQuoteEditor({
  content,
  onChange,
}: {
  content: QuotePageContent;
  onChange: (content: QuotePageContent) => void;
}) {
  // ── Trust Signals ────────────────────────────────────────────────
  function updateTrustSignal(index: number, value: string) {
    const updated = [...content.trustSignals];
    updated[index] = value;
    onChange({ ...content, trustSignals: updated });
  }
  function addTrustSignal() {
    onChange({ ...content, trustSignals: [...content.trustSignals, ""] });
  }
  function removeTrustSignal(index: number) {
    onChange({ ...content, trustSignals: content.trustSignals.filter((_, i) => i !== index) });
  }

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <Section title="Hero Banner" hint="The main heading (H1) and description shown in the hero section.">
        <label className="block text-xs text-gray-500 mb-1">Page Title (H1)</label>
        <input
          type="text"
          value={content.heroTitle}
          onChange={(e) => onChange({ ...content, heroTitle: e.target.value })}
          className="input-field mb-3"
          placeholder="e.g. Get a Free Quote"
        />
        <label className="block text-xs text-gray-500 mb-1">Hero Description</label>
        <InlineRichTextField
          value={content.heroDescription}
          onChange={(html) => onChange({ ...content, heroDescription: html })}
          rows={3}
          placeholder="Hero description text..."
        />
      </Section>

      {/* Offer Banner */}
      <Section title="Offer Banner" hint="Promotional banner text displayed on the page.">
        <label className="block text-xs text-gray-500 mb-1">Banner Text</label>
        <input
          type="text"
          value={content.offerBannerText}
          onChange={(e) => onChange({ ...content, offerBannerText: e.target.value })}
          className="input-field"
          placeholder="e.g. Limited time offer..."
        />
      </Section>

      {/* Trust Signals */}
      <Section title="Trust Signals" hint="List of trust signals shown to visitors.">
        <div className="space-y-2">
          {content.trustSignals.map((signal, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={signal}
                onChange={(e) => updateTrustSignal(i, e.target.value)}
                className="input-field flex-1"
                placeholder={`Trust signal ${i + 1}...`}
              />
              <button
                type="button"
                onClick={() => removeTrustSignal(i)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors self-start"
                title="Remove trust signal"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addTrustSignal}
          className="mt-3 px-3 py-1.5 text-sm text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-colors"
        >
          + Add Trust Signal
        </button>
      </Section>

      {/* License Section */}
      <Section title="License Section" hint="License and certification information.">
        <label className="block text-xs text-gray-500 mb-1">License Heading</label>
        <input
          type="text"
          value={content.licenseHeading}
          onChange={(e) => onChange({ ...content, licenseHeading: e.target.value })}
          className="input-field mb-3"
          placeholder="License heading..."
        />
        <label className="block text-xs text-gray-500 mb-1">License Description</label>
        <InlineRichTextField
          value={content.licenseDescription}
          onChange={(html) => onChange({ ...content, licenseDescription: html })}
          rows={3}
          placeholder="License description text..."
        />
      </Section>

      {/* Service Area */}
      <Section title="Service Area" hint="Service area coverage information.">
        <label className="block text-xs text-gray-500 mb-1">Service Area Heading</label>
        <input
          type="text"
          value={content.serviceAreaHeading}
          onChange={(e) => onChange({ ...content, serviceAreaHeading: e.target.value })}
          className="input-field mb-3"
          placeholder="Service area heading..."
        />
        <label className="block text-xs text-gray-500 mb-1">Service Area Description</label>
        <InlineRichTextField
          value={content.serviceAreaDescription}
          onChange={(html) => onChange({ ...content, serviceAreaDescription: html })}
          rows={3}
          placeholder="Service area description text..."
        />
      </Section>

      {/* FAQ Header */}
      <Section title="FAQ Header" hint="Heading and subheading for the FAQ section.">
        <label className="block text-xs text-gray-500 mb-1">FAQ Heading</label>
        <input
          type="text"
          value={content.faqHeading}
          onChange={(e) => onChange({ ...content, faqHeading: e.target.value })}
          className="input-field mb-3"
          placeholder="FAQ heading..."
        />
        <label className="block text-xs text-gray-500 mb-1">FAQ Subheading</label>
        <input
          type="text"
          value={content.faqSubheading}
          onChange={(e) => onChange({ ...content, faqSubheading: e.target.value })}
          className="input-field"
          placeholder="FAQ subheading..."
        />
      </Section>
    </div>
  );
}

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
      {hint && <p className="text-gray-500 text-xs mb-3">{hint}</p>}
      {children}
    </div>
  );
}
