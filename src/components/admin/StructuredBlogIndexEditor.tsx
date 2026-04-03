"use client";

import InlineRichTextField from "./InlineRichTextField";

export interface BlogIndexPageContent {
  heroLabel: string;
  heroTitle: string;
  heroDescription: string;
  emptyMessage: string;
  ctaHeadline: string;
  ctaSubtext: string;
}

export default function StructuredBlogIndexEditor({
  content,
  onChange,
}: {
  content: BlogIndexPageContent;
  onChange: (content: BlogIndexPageContent) => void;
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
          placeholder="e.g. Blog"
        />
        <label className="block text-xs text-gray-500 mb-1">Page Title (H1)</label>
        <input
          type="text"
          value={content.heroTitle}
          onChange={(e) => onChange({ ...content, heroTitle: e.target.value })}
          className="input-field mb-3"
          placeholder="e.g. Roofing Tips & Expert Insights"
        />
        <label className="block text-xs text-gray-500 mb-1">Hero Description</label>
        <InlineRichTextField
          value={content.heroDescription}
          onChange={(html) => onChange({ ...content, heroDescription: html })}
          rows={3}
          placeholder="Hero description text..."
        />
      </Section>

      {/* Empty State */}
      <Section title="Empty State" hint="Message shown when there are no blog posts to display.">
        <label className="block text-xs text-gray-500 mb-1">Empty State Message</label>
        <InlineRichTextField
          value={content.emptyMessage}
          onChange={(html) => onChange({ ...content, emptyMessage: html })}
          rows={2}
          placeholder="Message when no posts are available..."
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
          placeholder="e.g. Need Roofing Help?"
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
