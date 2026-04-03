"use client";

import InlineRichTextField from "./InlineRichTextField";

interface FAQItem {
  question: string;
  answer: string;
}

export interface LocationContent {
  heroTitle: string;
  heroSubtitle: string;
  heroCTAText: string;
  intro: string;
  servicesHeading: string;
  servicesSubtext: string;
  localContext: string;
  localContextHeading: string;
  whyChooseItems: string[];
  neighborhoods: string[];
  neighborhoodsHeading: string;
  neighborhoodsSubtext: string;
  zipCodes: string[];
  faq: FAQItem[];
  faqHeading: string;
  ctaHeadline: string;
  ctaSubtext: string;
}

export default function StructuredLocationEditor({
  content,
  onChange,
}: {
  content: LocationContent;
  onChange: (content: LocationContent) => void;
}) {
  // ── Text fields ───────────────────────────────────────────────────
  function updateField(field: "intro" | "localContext" | "heroCTAText" | "servicesHeading" | "servicesSubtext" | "localContextHeading" | "neighborhoodsHeading" | "neighborhoodsSubtext" | "faqHeading" | "ctaHeadline" | "ctaSubtext", value: string) {
    onChange({ ...content, [field]: value });
  }

  // ── Why Choose Items ──────────────────────────────────────────────
  function addWhyChooseItem() {
    onChange({ ...content, whyChooseItems: [...content.whyChooseItems, ""] });
  }
  function updateWhyChooseItem(index: number, value: string) {
    const updated = [...content.whyChooseItems];
    updated[index] = value;
    onChange({ ...content, whyChooseItems: updated });
  }
  function removeWhyChooseItem(index: number) {
    onChange({ ...content, whyChooseItems: content.whyChooseItems.filter((_, i) => i !== index) });
  }

  // ── Neighborhoods ─────────────────────────────────────────────────
  function addNeighborhood() {
    onChange({ ...content, neighborhoods: [...content.neighborhoods, ""] });
  }
  function updateNeighborhood(index: number, value: string) {
    const updated = [...content.neighborhoods];
    updated[index] = value;
    onChange({ ...content, neighborhoods: updated });
  }
  function removeNeighborhood(index: number) {
    onChange({ ...content, neighborhoods: content.neighborhoods.filter((_, i) => i !== index) });
  }

  // ── Zip Codes ─────────────────────────────────────────────────────
  function addZipCode() {
    onChange({ ...content, zipCodes: [...content.zipCodes, ""] });
  }
  function updateZipCode(index: number, value: string) {
    const updated = [...content.zipCodes];
    updated[index] = value;
    onChange({ ...content, zipCodes: updated });
  }
  function removeZipCode(index: number) {
    onChange({ ...content, zipCodes: content.zipCodes.filter((_, i) => i !== index) });
  }

  // ── FAQ ────────────────────────────────────────────────────────────
  function addFAQ() {
    onChange({ ...content, faq: [...content.faq, { question: "", answer: "" }] });
  }
  function updateFAQ(index: number, field: "question" | "answer", value: string) {
    const updated = [...content.faq];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...content, faq: updated });
  }
  function removeFAQ(index: number) {
    onChange({ ...content, faq: content.faq.filter((_, i) => i !== index) });
  }

  return (
    <div className="space-y-8">
      {/* ── Hero Banner ────────────────────────────────────────── */}
      <Section title="Hero Banner" hint="The main heading (H1) and subtitle shown in the hero section.">
        <label className="block text-xs text-gray-500 mb-1">Page Title (H1)</label>
        <input
          type="text"
          value={content.heroTitle}
          onChange={(e) => onChange({ ...content, heroTitle: e.target.value })}
          className="input-field mb-3"
          placeholder="e.g. Philadelphia Roofing Services"
        />
        <label className="block text-xs text-gray-500 mb-1">Subtitle</label>
        <input
          type="text"
          value={content.heroSubtitle}
          onChange={(e) => onChange({ ...content, heroSubtitle: e.target.value })}
          className="input-field mb-3"
          placeholder="e.g. Professional roofing services for Philadelphia and surrounding areas"
        />
        <label className="block text-xs text-gray-500 mb-1">CTA Button Text</label>
        <input
          type="text"
          value={content.heroCTAText}
          onChange={(e) => updateField("heroCTAText", e.target.value)}
          className="input-field"
          placeholder="Get FREE Estimate"
        />
      </Section>

      {/* ── Intro ────────────────────────────────────────────────── */}
      <Section title="Intro Paragraph" hint="Shown directly below the hero section.">
        <InlineRichTextField
          value={content.intro}
          onChange={(html) => updateField("intro", html)}
          rows={5}
          placeholder="Intro text about this service area..."
        />
      </Section>

      {/* ── Services Section ────────────────────────────────────── */}
      <Section title="Services Section" hint="Heading and subtext for the services grid.">
        <label className="block text-xs text-gray-500 mb-1">Services Heading</label>
        <input
          type="text"
          value={content.servicesHeading}
          onChange={(e) => updateField("servicesHeading", e.target.value)}
          className="input-field mb-3"
          placeholder="e.g. Our Services in Philadelphia"
        />
        <label className="block text-xs text-gray-500 mb-1">Services Subtext</label>
        <textarea
          value={content.servicesSubtext}
          onChange={(e) => updateField("servicesSubtext", e.target.value)}
          className="input-field"
          rows={3}
          placeholder="e.g. We offer a complete range of roofing and exterior services..."
        />
      </Section>

      {/* ── Local Context ────────────────────────────────────────── */}
      <Section title="Local Context" hint="'Why homeowners choose us' section — left column text.">
        <label className="block text-xs text-gray-500 mb-1">Section Heading</label>
        <input
          type="text"
          value={content.localContextHeading}
          onChange={(e) => updateField("localContextHeading", e.target.value)}
          className="input-field mb-3"
          placeholder="e.g. Why Philadelphia Homeowners Choose Adilay Roofing"
        />
        <label className="block text-xs text-gray-500 mb-1">Context Body</label>
        <InlineRichTextField
          value={content.localContext}
          onChange={(html) => updateField("localContext", html)}
          rows={5}
          placeholder="Local context about roofing in this area..."
        />
      </Section>

      {/* ── Why Choose Us Items ──────────────────────────────────── */}
      <Section title="Why Choose Us — Bullet Points" hint="Shown in the sidebar box next to the local context.">
        <div className="space-y-2">
          {content.whyChooseItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => updateWhyChooseItem(i, e.target.value)}
                className="input-field flex-1"
                placeholder="e.g. 20+ years of roofing experience"
              />
              <button
                type="button"
                onClick={() => removeWhyChooseItem(i)}
                className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                title="Remove"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addWhyChooseItem}
          className="mt-3 px-3 py-1.5 text-sm text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-colors"
        >
          + Add Item
        </button>
      </Section>

      {/* ── Neighborhoods ────────────────────────────────────────── */}
      <Section title="Neighborhoods / Communities" hint="Shown as a grid with map pin icons.">
        <label className="block text-xs text-gray-500 mb-1">Section Heading</label>
        <input
          type="text"
          value={content.neighborhoodsHeading}
          onChange={(e) => updateField("neighborhoodsHeading", e.target.value)}
          className="input-field mb-3"
          placeholder="e.g. Neighborhoods We Serve in Philadelphia"
        />
        <label className="block text-xs text-gray-500 mb-1">Section Subtext</label>
        <textarea
          value={content.neighborhoodsSubtext}
          onChange={(e) => updateField("neighborhoodsSubtext", e.target.value)}
          className="input-field mb-3"
          rows={2}
          placeholder="e.g. Our roofing services are available throughout..."
        />
        <label className="block text-xs text-gray-500 mb-1">Neighborhoods List</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {content.neighborhoods.map((name, i) => (
            <div key={i} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="text"
                value={name}
                onChange={(e) => updateNeighborhood(i, e.target.value)}
                className="input-field flex-1"
                placeholder="Neighborhood name..."
              />
              <button
                type="button"
                onClick={() => removeNeighborhood(i)}
                className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                title="Remove"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addNeighborhood}
          className="mt-3 px-3 py-1.5 text-sm text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-colors"
        >
          + Add Neighborhood
        </button>
      </Section>

      {/* ── Zip Codes ────────────────────────────────────────────── */}
      <Section title="Zip Codes" hint="Shown as a comma-separated list on the live page.">
        <div className="flex flex-wrap gap-2">
          {content.zipCodes.map((zip, i) => (
            <div key={i} className="flex items-center gap-1 bg-gray-800 border border-gray-700 rounded-lg px-2 py-1">
              <input
                type="text"
                value={zip}
                onChange={(e) => updateZipCode(i, e.target.value)}
                className="bg-transparent text-white text-sm w-16 outline-none"
                placeholder="19101"
              />
              <button
                type="button"
                onClick={() => removeZipCode(i)}
                className="text-red-400 hover:text-red-300 text-xs"
                title="Remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addZipCode}
          className="mt-3 px-3 py-1.5 text-sm text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-colors"
        >
          + Add Zip Code
        </button>
      </Section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <Section title="Frequently Asked Questions" hint="Shown as an accordion on the live page.">
        <label className="block text-xs text-gray-500 mb-1">FAQ Section Heading</label>
        <input
          type="text"
          value={content.faqHeading}
          onChange={(e) => updateField("faqHeading", e.target.value)}
          className="input-field mb-3"
          placeholder="e.g. Frequently Asked Questions About Roofing in Philadelphia"
        />
        <div className="space-y-4">
          {content.faq.map((item, i) => (
            <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-xs text-gray-500 font-medium mt-1">Q{i + 1}</span>
                <button
                  type="button"
                  onClick={() => removeFAQ(i)}
                  className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                  title="Remove FAQ"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <input
                type="text"
                value={item.question}
                onChange={(e) => updateFAQ(i, "question", e.target.value)}
                className="input-field mb-2"
                placeholder="Question..."
              />
              <InlineRichTextField
                value={item.answer}
                onChange={(html) => updateFAQ(i, "answer", html)}
                rows={3}
                placeholder="Answer..."
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addFAQ}
          className="mt-3 px-3 py-1.5 text-sm text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-colors"
        >
          + Add FAQ
        </button>
      </Section>

      {/* ── CTA Section ──────────────────────────────────────────── */}
      <Section title="Bottom CTA Section" hint="The call-to-action block at the bottom of the page.">
        <label className="block text-xs text-gray-500 mb-1">CTA Headline</label>
        <input
          type="text"
          value={content.ctaHeadline}
          onChange={(e) => updateField("ctaHeadline", e.target.value)}
          className="input-field mb-3"
          placeholder="e.g. Need a Roofer in Philadelphia?"
        />
        <label className="block text-xs text-gray-500 mb-1">CTA Subtext</label>
        <textarea
          value={content.ctaSubtext}
          onChange={(e) => updateField("ctaSubtext", e.target.value)}
          className="input-field"
          rows={3}
          placeholder="e.g. Contact Adilay Roofing today for a free roof inspection..."
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
