"use client";

import InlineRichTextField from "./InlineRichTextField";

export interface ContactPageContent {
  heroTitle: string;
  heroDescription: string;
  officeHeading: string;
  officeDescription: string;
  officeDescription2: string;
  formHeading: string;
  formDescription: string;
  emergencyBannerText: string;
}

export default function StructuredContactEditor({
  content,
  onChange,
}: {
  content: ContactPageContent;
  onChange: (content: ContactPageContent) => void;
}) {
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
          placeholder="e.g. Contact Us"
        />
        <label className="block text-xs text-gray-500 mb-1">Hero Description</label>
        <InlineRichTextField
          value={content.heroDescription}
          onChange={(html) => onChange({ ...content, heroDescription: html })}
          rows={3}
          placeholder="Hero description text..."
        />
      </Section>

      {/* Office Section */}
      <Section title="Office Section" hint="Office information heading and description paragraphs.">
        <label className="block text-xs text-gray-500 mb-1">Office Heading</label>
        <input
          type="text"
          value={content.officeHeading}
          onChange={(e) => onChange({ ...content, officeHeading: e.target.value })}
          className="input-field mb-3"
          placeholder="Office heading..."
        />
        <label className="block text-xs text-gray-500 mb-1">Office Description (Paragraph 1)</label>
        <InlineRichTextField
          value={content.officeDescription}
          onChange={(html) => onChange({ ...content, officeDescription: html })}
          rows={3}
          placeholder="First office description paragraph..."
        />
        <div className="mt-3">
          <label className="block text-xs text-gray-500 mb-1">Office Description (Paragraph 2)</label>
          <InlineRichTextField
            value={content.officeDescription2}
            onChange={(html) => onChange({ ...content, officeDescription2: html })}
            rows={3}
            placeholder="Second office description paragraph..."
          />
        </div>
      </Section>

      {/* Form Section */}
      <Section title="Form Section" hint="Heading and description above the contact form.">
        <label className="block text-xs text-gray-500 mb-1">Form Heading</label>
        <input
          type="text"
          value={content.formHeading}
          onChange={(e) => onChange({ ...content, formHeading: e.target.value })}
          className="input-field mb-3"
          placeholder="Form heading..."
        />
        <label className="block text-xs text-gray-500 mb-1">Form Description</label>
        <input
          type="text"
          value={content.formDescription}
          onChange={(e) => onChange({ ...content, formDescription: e.target.value })}
          className="input-field"
          placeholder="Form description..."
        />
      </Section>

      {/* Emergency Banner */}
      <Section title="Emergency Banner" hint="Emergency/urgent contact banner text.">
        <label className="block text-xs text-gray-500 mb-1">Banner Text</label>
        <InlineRichTextField
          value={content.emergencyBannerText}
          onChange={(html) => onChange({ ...content, emergencyBannerText: html })}
          rows={2}
          placeholder="Emergency banner text..."
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
