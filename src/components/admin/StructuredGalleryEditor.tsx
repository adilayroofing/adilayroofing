"use client";

import InlineRichTextField from "./InlineRichTextField";

export interface GalleryPageContent {
  heroLabel: string;
  heroTitle: string;
  heroTitleRed: string;
  heroDescription: string;
  beforeAfterLabel: string;
  beforeAfterHeading: string;
  beforeAfterDescription: string;
  ctaHeadline: string;
  ctaSubtext: string;
}

export default function StructuredGalleryEditor({
  content,
  onChange,
}: {
  content: GalleryPageContent;
  onChange: (content: GalleryPageContent) => void;
}) {
  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <Section title="Hero Banner" hint="The main heading (H1) and description shown in the hero section.">
        <label className="block text-xs text-gray-500 mb-1">Hero Label (small text above title)</label>
        <input
          type="text"
          value={content.heroLabel}
          onChange={(e) => onChange({ ...content, heroLabel: e.target.value })}
          className="input-field mb-3"
          placeholder="e.g. Project Gallery"
        />
        <label className="block text-xs text-gray-500 mb-1">Page Title — White Part (H1)</label>
        <input
          type="text"
          value={content.heroTitle}
          onChange={(e) => onChange({ ...content, heroTitle: e.target.value })}
          className="input-field mb-3"
          placeholder="e.g. Our Work Speaks"
        />
        <label className="block text-xs text-gray-500 mb-1">Page Title — Red Part</label>
        <input
          type="text"
          value={content.heroTitleRed}
          onChange={(e) => onChange({ ...content, heroTitleRed: e.target.value })}
          className="input-field mb-3"
          placeholder="e.g. for Itself"
        />
        <label className="block text-xs text-gray-500 mb-1">Hero Description</label>
        <InlineRichTextField
          value={content.heroDescription}
          onChange={(html) => onChange({ ...content, heroDescription: html })}
          rows={3}
          placeholder="Hero description text..."
        />
      </Section>

      {/* Before & After */}
      <Section title="Before & After" hint="Heading and description for the before/after comparison section.">
        <label className="block text-xs text-gray-500 mb-1">Section Label (small text above heading)</label>
        <input
          type="text"
          value={content.beforeAfterLabel}
          onChange={(e) => onChange({ ...content, beforeAfterLabel: e.target.value })}
          className="input-field mb-3"
          placeholder="e.g. Transformations"
        />
        <label className="block text-xs text-gray-500 mb-1">Section Heading</label>
        <input
          type="text"
          value={content.beforeAfterHeading}
          onChange={(e) => onChange({ ...content, beforeAfterHeading: e.target.value })}
          className="input-field mb-3"
          placeholder="Before & after heading..."
        />
        <label className="block text-xs text-gray-500 mb-1">Section Description</label>
        <InlineRichTextField
          value={content.beforeAfterDescription}
          onChange={(html) => onChange({ ...content, beforeAfterDescription: html })}
          rows={3}
          placeholder="Before & after description text..."
        />
      </Section>

      {/* CTA */}
      <Section title="CTA Section" hint="The call-to-action at the bottom of the page.">
        <label className="block text-xs text-gray-500 mb-1">CTA Headline</label>
        <input
          type="text"
          value={content.ctaHeadline}
          onChange={(e) => onChange({ ...content, ctaHeadline: e.target.value })}
          className="input-field mb-3"
          placeholder="e.g. Like What You See?"
        />
        <label className="block text-xs text-gray-500 mb-1">CTA Subtext</label>
        <InlineRichTextField
          value={content.ctaSubtext}
          onChange={(html) => onChange({ ...content, ctaSubtext: html })}
          rows={2}
          placeholder="CTA subtext..."
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
