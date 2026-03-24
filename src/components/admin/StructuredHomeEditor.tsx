"use client";

import InlineRichTextField from "./InlineRichTextField";

export interface HomePageContent {
  heroHeadlineWhite: string;
  heroHeadlineRed: string;
  heroSubheadline: string;
  heroDescription: string;
  whyChooseUs: { title: string; description: string }[];
  teamHeading: string;
  teamParagraphs: string[];
  serviceAreasHeading: string;
  serviceAreasDescription: string;
}

export default function StructuredHomeEditor({
  content,
  onChange,
}: {
  content: HomePageContent;
  onChange: (content: HomePageContent) => void;
}) {
  // ── Why Choose Us ──────────────────────────────────────────────
  function updateWhyItem(index: number, field: "title" | "description", value: string) {
    const updated = [...content.whyChooseUs];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...content, whyChooseUs: updated });
  }
  function addWhyItem() {
    onChange({ ...content, whyChooseUs: [...content.whyChooseUs, { title: "", description: "" }] });
  }
  function removeWhyItem(index: number) {
    onChange({ ...content, whyChooseUs: content.whyChooseUs.filter((_, i) => i !== index) });
  }

  // ── Team paragraphs ────────────────────────────────────────────
  function updateTeamParagraph(index: number, value: string) {
    const updated = [...content.teamParagraphs];
    updated[index] = value;
    onChange({ ...content, teamParagraphs: updated });
  }
  function addTeamParagraph() {
    onChange({ ...content, teamParagraphs: [...content.teamParagraphs, ""] });
  }
  function removeTeamParagraph(index: number) {
    onChange({ ...content, teamParagraphs: content.teamParagraphs.filter((_, i) => i !== index) });
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Section title="Hero Section" hint="The main banner at the top of the homepage.">
        <label className="block text-xs text-gray-500 mb-1">Headline — Line 1 (white text)</label>
        <input
          type="text"
          value={content.heroHeadlineWhite}
          onChange={(e) => onChange({ ...content, heroHeadlineWhite: e.target.value })}
          className="input-field mb-3"
          placeholder="e.g. Philadelphia's #1 Rated"
        />
        <label className="block text-xs text-gray-500 mb-1">Headline — Line 2 (red accent text)</label>
        <input
          type="text"
          value={content.heroHeadlineRed}
          onChange={(e) => onChange({ ...content, heroHeadlineRed: e.target.value })}
          className="input-field mb-3"
          placeholder="e.g. Roofing Contractor"
        />
        <label className="block text-xs text-gray-500 mb-1">Subheadline</label>
        <input
          type="text"
          value={content.heroSubheadline}
          onChange={(e) => onChange({ ...content, heroSubheadline: e.target.value })}
          className="input-field mb-3"
          placeholder="Short subheadline..."
        />
        <label className="block text-xs text-gray-500 mb-1">Description</label>
        <InlineRichTextField
          value={content.heroDescription}
          onChange={(html) => onChange({ ...content, heroDescription: html })}
          rows={3}
          placeholder="Hero description paragraph..."
        />
      </Section>

      {/* Why Choose Us */}
      <Section title="Why Choose Us" hint="Cards shown in the 'Why Philadelphia Homeowners Choose Adilay' section.">
        <div className="space-y-3">
          {content.whyChooseUs.map((item, i) => (
            <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">Card {i + 1}</span>
                <button
                  type="button"
                  onClick={() => removeWhyItem(i)}
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
                value={item.title}
                onChange={(e) => updateWhyItem(i, "title", e.target.value)}
                className="input-field mb-2"
                placeholder="Card title..."
              />
              <InlineRichTextField
                value={item.description}
                onChange={(html) => updateWhyItem(i, "description", html)}
                rows={2}
                placeholder="Card description..."
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addWhyItem}
          className="mt-3 px-3 py-1.5 text-sm text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-colors"
        >
          + Add Card
        </button>
      </Section>

      {/* Team / About Section */}
      <Section title="Team / About Section" hint="The 'Family-Owned. Locally Trusted.' section with heading and paragraphs.">
        <label className="block text-xs text-gray-500 mb-1">Section Heading</label>
        <input
          type="text"
          value={content.teamHeading}
          onChange={(e) => onChange({ ...content, teamHeading: e.target.value })}
          className="input-field mb-4"
          placeholder="Section heading..."
        />
        <label className="block text-xs text-gray-500 mb-1">Paragraphs</label>
        <div className="space-y-2">
          {content.teamParagraphs.map((para, i) => (
            <div key={i} className="flex gap-2">
              <div className="flex-1">
                <InlineRichTextField
                  value={para}
                  onChange={(html) => updateTeamParagraph(i, html)}
                  rows={3}
                  placeholder={`Paragraph ${i + 1}...`}
                />
              </div>
              <button
                type="button"
                onClick={() => removeTeamParagraph(i)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors self-start"
                title="Remove paragraph"
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
          onClick={addTeamParagraph}
          className="mt-3 px-3 py-1.5 text-sm text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-colors"
        >
          + Add Paragraph
        </button>
      </Section>

      {/* Service Areas Section */}
      <Section title="Service Areas Section" hint="The 'Serving Philadelphia & Beyond' section heading and description.">
        <label className="block text-xs text-gray-500 mb-1">Section Heading</label>
        <input
          type="text"
          value={content.serviceAreasHeading}
          onChange={(e) => onChange({ ...content, serviceAreasHeading: e.target.value })}
          className="input-field mb-3"
          placeholder="Section heading..."
        />
        <label className="block text-xs text-gray-500 mb-1">Description</label>
        <InlineRichTextField
          value={content.serviceAreasDescription}
          onChange={(html) => onChange({ ...content, serviceAreasDescription: html })}
          rows={2}
          placeholder="Section description..."
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
