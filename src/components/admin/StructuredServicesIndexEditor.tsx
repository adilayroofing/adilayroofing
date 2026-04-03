"use client";

import InlineRichTextField from "./InlineRichTextField";

export interface ServicesIndexPageContent {
  heroTitle: string;
  heroDescription: string;
  showcaseHeading: string;
  showcaseDescription1: string;
  showcaseDescription2: string;
  whyChooseHeading: string;
  whyChooseSubheading: string;
  benefits: { title: string; description: string }[];
}

export default function StructuredServicesIndexEditor({
  content,
  onChange,
}: {
  content: ServicesIndexPageContent;
  onChange: (content: ServicesIndexPageContent) => void;
}) {
  // ── Benefits ─────────────────────────────────────────────────────
  function updateBenefit(index: number, field: "title" | "description", value: string) {
    const updated = [...content.benefits];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...content, benefits: updated });
  }
  function addBenefit() {
    onChange({ ...content, benefits: [...content.benefits, { title: "", description: "" }] });
  }
  function removeBenefit(index: number) {
    onChange({ ...content, benefits: content.benefits.filter((_, i) => i !== index) });
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
          placeholder="e.g. Our Roofing Services"
        />
        <label className="block text-xs text-gray-500 mb-1">Hero Description</label>
        <InlineRichTextField
          value={content.heroDescription}
          onChange={(html) => onChange({ ...content, heroDescription: html })}
          rows={3}
          placeholder="Hero description text..."
        />
      </Section>

      {/* Work Showcase */}
      <Section title="Work Showcase" hint="Heading and description paragraphs for the work showcase section.">
        <label className="block text-xs text-gray-500 mb-1">Showcase Heading</label>
        <input
          type="text"
          value={content.showcaseHeading}
          onChange={(e) => onChange({ ...content, showcaseHeading: e.target.value })}
          className="input-field mb-3"
          placeholder="Showcase heading..."
        />
        <label className="block text-xs text-gray-500 mb-1">Description (Paragraph 1)</label>
        <InlineRichTextField
          value={content.showcaseDescription1}
          onChange={(html) => onChange({ ...content, showcaseDescription1: html })}
          rows={3}
          placeholder="First showcase paragraph..."
        />
        <div className="mt-3">
          <label className="block text-xs text-gray-500 mb-1">Description (Paragraph 2)</label>
          <InlineRichTextField
            value={content.showcaseDescription2}
            onChange={(html) => onChange({ ...content, showcaseDescription2: html })}
            rows={3}
            placeholder="Second showcase paragraph..."
          />
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section title="Why Choose Us" hint="Heading, subheading, and benefit cards shown in a grid.">
        <label className="block text-xs text-gray-500 mb-1">Section Heading</label>
        <input
          type="text"
          value={content.whyChooseHeading}
          onChange={(e) => onChange({ ...content, whyChooseHeading: e.target.value })}
          className="input-field mb-3"
          placeholder="Why choose us heading..."
        />
        <label className="block text-xs text-gray-500 mb-1">Section Subheading</label>
        <input
          type="text"
          value={content.whyChooseSubheading}
          onChange={(e) => onChange({ ...content, whyChooseSubheading: e.target.value })}
          className="input-field mb-4"
          placeholder="Why choose us subheading..."
        />
        <label className="block text-xs text-gray-500 mb-1">Benefits</label>
        <div className="space-y-3">
          {content.benefits.map((benefit, i) => (
            <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">Benefit {i + 1}</span>
                <button
                  type="button"
                  onClick={() => removeBenefit(i)}
                  className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                  title="Remove"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <input
                type="text"
                value={benefit.title}
                onChange={(e) => updateBenefit(i, "title", e.target.value)}
                className="input-field mb-2"
                placeholder="Benefit title..."
              />
              <InlineRichTextField
                value={benefit.description}
                onChange={(html) => updateBenefit(i, "description", html)}
                rows={2}
                placeholder="Benefit description..."
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addBenefit}
          className="mt-3 px-3 py-1.5 text-sm text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-colors"
        >
          + Add Benefit
        </button>
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
