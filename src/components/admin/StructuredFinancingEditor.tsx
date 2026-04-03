"use client";

import InlineRichTextField from "./InlineRichTextField";

export interface FinancingPageContent {
  heroHeadline: string;
  heroDescription: string;
  howItWorks: { step: string; title: string; description: string }[];
  loanOptions: { title: string; description: string }[];
  benefits: string[];
  trustText: string;
  faq: { question: string; answer: string }[];
  ctaHeadline: string;
  ctaSubtext: string;
  bottomCtaHeadline: string;
  bottomCtaSubtext: string;
}

export default function StructuredFinancingEditor({
  content,
  onChange,
}: {
  content: FinancingPageContent;
  onChange: (content: FinancingPageContent) => void;
}) {
  // ── How It Works steps ──────────────────────────────────────────
  function updateStep(index: number, field: "step" | "title" | "description", value: string) {
    const updated = [...content.howItWorks];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...content, howItWorks: updated });
  }
  function addStep() {
    const nextNum = String(content.howItWorks.length + 1);
    onChange({ ...content, howItWorks: [...content.howItWorks, { step: nextNum, title: "", description: "" }] });
  }
  function removeStep(index: number) {
    onChange({ ...content, howItWorks: content.howItWorks.filter((_, i) => i !== index) });
  }

  // ── Loan Options ────────────────────────────────────────────────
  function updateLoanOption(index: number, field: "title" | "description", value: string) {
    const updated = [...content.loanOptions];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...content, loanOptions: updated });
  }
  function addLoanOption() {
    onChange({ ...content, loanOptions: [...content.loanOptions, { title: "", description: "" }] });
  }
  function removeLoanOption(index: number) {
    onChange({ ...content, loanOptions: content.loanOptions.filter((_, i) => i !== index) });
  }

  // ── Benefits ────────────────────────────────────────────────────
  function updateBenefit(index: number, value: string) {
    const updated = [...content.benefits];
    updated[index] = value;
    onChange({ ...content, benefits: updated });
  }
  function addBenefit() {
    onChange({ ...content, benefits: [...content.benefits, ""] });
  }
  function removeBenefit(index: number) {
    onChange({ ...content, benefits: content.benefits.filter((_, i) => i !== index) });
  }

  // ── FAQ ─────────────────────────────────────────────────────────
  function updateFaq(index: number, field: "question" | "answer", value: string) {
    const updated = [...content.faq];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...content, faq: updated });
  }
  function addFaq() {
    onChange({ ...content, faq: [...content.faq, { question: "", answer: "" }] });
  }
  function removeFaq(index: number) {
    onChange({ ...content, faq: content.faq.filter((_, i) => i !== index) });
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Section title="Hero Section" hint="The main heading (H1) and description at the top of the page.">
        <label className="block text-xs text-gray-500 mb-1">Headline (H1)</label>
        <input
          type="text"
          value={content.heroHeadline}
          onChange={(e) => onChange({ ...content, heroHeadline: e.target.value })}
          className="input-field mb-3"
          placeholder="e.g. Roof Financing in Philadelphia..."
        />
        <label className="block text-xs text-gray-500 mb-1">Description</label>
        <InlineRichTextField
          value={content.heroDescription}
          onChange={(html) => onChange({ ...content, heroDescription: html })}
          rows={4}
          placeholder="Hero description text..."
        />
      </Section>

      {/* How It Works */}
      <Section title="How It Works" hint="Step-by-step process cards (typically 3 steps).">
        <div className="space-y-3">
          {content.howItWorks.map((item, i) => (
            <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">Step {i + 1}</span>
                <button
                  type="button"
                  onClick={() => removeStep(i)}
                  className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                  title="Remove"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Step Number</label>
                  <input
                    type="text"
                    value={item.step}
                    onChange={(e) => updateStep(i, "step", e.target.value)}
                    className="input-field"
                    placeholder="1"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateStep(i, "title", e.target.value)}
                    className="input-field"
                    placeholder="e.g. Apply"
                  />
                </div>
              </div>
              <label className="block text-xs text-gray-500 mb-1">Description</label>
              <InlineRichTextField
                value={item.description}
                onChange={(html) => updateStep(i, "description", html)}
                rows={2}
                placeholder="Step description..."
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addStep}
          className="mt-3 px-3 py-1.5 text-sm text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-colors"
        >
          + Add Step
        </button>
      </Section>

      {/* Loan Options */}
      <Section title="Financing Options" hint="Loan product cards shown in a 3-column grid.">
        <div className="space-y-3">
          {content.loanOptions.map((option, i) => (
            <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">Option {i + 1}</span>
                <button
                  type="button"
                  onClick={() => removeLoanOption(i)}
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
                value={option.title}
                onChange={(e) => updateLoanOption(i, "title", e.target.value)}
                className="input-field mb-2"
                placeholder="Option title..."
              />
              <InlineRichTextField
                value={option.description}
                onChange={(html) => updateLoanOption(i, "description", html)}
                rows={2}
                placeholder="Option description..."
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addLoanOption}
          className="mt-3 px-3 py-1.5 text-sm text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-colors"
        >
          + Add Loan Option
        </button>
      </Section>

      {/* Benefits */}
      <Section title="Why Finance With Adilay" hint="Checklist of benefits shown in a 2-column grid.">
        <div className="space-y-2">
          {content.benefits.map((benefit, i) => (
            <div key={i} className="flex gap-2">
              <div className="flex items-center text-green-400 mt-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <input
                type="text"
                value={benefit}
                onChange={(e) => updateBenefit(i, e.target.value)}
                className="input-field flex-1"
                placeholder="Benefit text..."
              />
              <button
                type="button"
                onClick={() => removeBenefit(i)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors self-start"
                title="Remove"
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
          onClick={addBenefit}
          className="mt-3 px-3 py-1.5 text-sm text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-colors"
        >
          + Add Benefit
        </button>
      </Section>

      {/* Trust Block */}
      <Section title="Trust Block" hint="Dark section with trusted lender messaging.">
        <InlineRichTextField
          value={content.trustText}
          onChange={(html) => onChange({ ...content, trustText: html })}
          rows={3}
          placeholder="Trust block text about Service Finance Company..."
        />
      </Section>

      {/* FAQ */}
      <Section title="Financing FAQ" hint="FAQ accordion with schema markup for SEO.">
        <div className="space-y-3">
          {content.faq.map((item, i) => (
            <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">FAQ {i + 1}</span>
                <button
                  type="button"
                  onClick={() => removeFaq(i)}
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
                value={item.question}
                onChange={(e) => updateFaq(i, "question", e.target.value)}
                className="input-field mb-2"
                placeholder="Question..."
              />
              <InlineRichTextField
                value={item.answer}
                onChange={(html) => updateFaq(i, "answer", html)}
                rows={3}
                placeholder="Answer..."
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addFaq}
          className="mt-3 px-3 py-1.5 text-sm text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-colors"
        >
          + Add FAQ
        </button>
      </Section>

      {/* CTA Section */}
      <Section title="CTA Section" hint="Call-to-action before the bottom banner.">
        <label className="block text-xs text-gray-500 mb-1">Headline</label>
        <input
          type="text"
          value={content.ctaHeadline}
          onChange={(e) => onChange({ ...content, ctaHeadline: e.target.value })}
          className="input-field mb-3"
          placeholder="e.g. Ready to Get Started?"
        />
        <label className="block text-xs text-gray-500 mb-1">Subtext</label>
        <InlineRichTextField
          value={content.ctaSubtext}
          onChange={(html) => onChange({ ...content, ctaSubtext: html })}
          rows={2}
          placeholder="CTA description..."
        />
      </Section>

      {/* Bottom CTA Banner */}
      <Section title="Bottom CTA Banner" hint="Full-width banner at the very bottom of the page.">
        <label className="block text-xs text-gray-500 mb-1">Headline</label>
        <input
          type="text"
          value={content.bottomCtaHeadline}
          onChange={(e) => onChange({ ...content, bottomCtaHeadline: e.target.value })}
          className="input-field mb-3"
          placeholder="e.g. Protect Your Home Today"
        />
        <label className="block text-xs text-gray-500 mb-1">Subtext</label>
        <InlineRichTextField
          value={content.bottomCtaSubtext}
          onChange={(html) => onChange({ ...content, bottomCtaSubtext: html })}
          rows={2}
          placeholder="Bottom CTA description..."
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
