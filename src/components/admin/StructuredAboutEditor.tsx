"use client";

import InlineRichTextField from "./InlineRichTextField";

export interface AboutPageContent {
  heroDescription: string;
  storyHeading: string;
  storyParagraphs: string[];
  values: { title: string; description: string }[];
  teamDescription: string;
}

export default function StructuredAboutEditor({
  content,
  onChange,
}: {
  content: AboutPageContent;
  onChange: (content: AboutPageContent) => void;
}) {
  // ── Story paragraphs ──────────────────────────────────────────────
  function updateParagraph(index: number, value: string) {
    const updated = [...content.storyParagraphs];
    updated[index] = value;
    onChange({ ...content, storyParagraphs: updated });
  }
  function addParagraph() {
    onChange({ ...content, storyParagraphs: [...content.storyParagraphs, ""] });
  }
  function removeParagraph(index: number) {
    onChange({ ...content, storyParagraphs: content.storyParagraphs.filter((_, i) => i !== index) });
  }

  // ── Values ────────────────────────────────────────────────────────
  function updateValue(index: number, field: "title" | "description", value: string) {
    const updated = [...content.values];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...content, values: updated });
  }
  function addValue() {
    onChange({ ...content, values: [...content.values, { title: "", description: "" }] });
  }
  function removeValue(index: number) {
    onChange({ ...content, values: content.values.filter((_, i) => i !== index) });
  }

  return (
    <div className="space-y-8">
      {/* Hero Description */}
      <Section title="Hero Description" hint="Shown below the page title in the hero banner.">
        <InlineRichTextField
          value={content.heroDescription}
          onChange={(html) => onChange({ ...content, heroDescription: html })}
          rows={3}
          placeholder="Hero description text..."
        />
      </Section>

      {/* Our Story */}
      <Section title="Our Story" hint="Main content section with heading and paragraphs.">
        <label className="block text-xs text-gray-500 mb-1">Section Heading</label>
        <input
          type="text"
          value={content.storyHeading}
          onChange={(e) => onChange({ ...content, storyHeading: e.target.value })}
          className="input-field mb-4"
          placeholder="Story section heading..."
        />
        <label className="block text-xs text-gray-500 mb-1">Paragraphs</label>
        <div className="space-y-2">
          {content.storyParagraphs.map((para, i) => (
            <div key={i} className="flex gap-2">
              <div className="flex-1">
                <InlineRichTextField
                  value={para}
                  onChange={(html) => updateParagraph(i, html)}
                  rows={3}
                  placeholder={`Paragraph ${i + 1}...`}
                />
              </div>
              <button
                type="button"
                onClick={() => removeParagraph(i)}
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
          onClick={addParagraph}
          className="mt-3 px-3 py-1.5 text-sm text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-colors"
        >
          + Add Paragraph
        </button>
      </Section>

      {/* Values */}
      <Section title="What We Stand For" hint="4 value cards shown in a grid.">
        <div className="space-y-3">
          {content.values.map((value, i) => (
            <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">Value {i + 1}</span>
                <button
                  type="button"
                  onClick={() => removeValue(i)}
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
                value={value.title}
                onChange={(e) => updateValue(i, "title", e.target.value)}
                className="input-field mb-2"
                placeholder="Value title..."
              />
              <InlineRichTextField
                value={value.description}
                onChange={(html) => updateValue(i, "description", html)}
                rows={2}
                placeholder="Value description..."
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addValue}
          className="mt-3 px-3 py-1.5 text-sm text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-colors"
        >
          + Add Value
        </button>
      </Section>

      {/* Team Description */}
      <Section title="Team Description" hint="Paragraph in the 'Our Team' section.">
        <InlineRichTextField
          value={content.teamDescription}
          onChange={(html) => onChange({ ...content, teamDescription: html })}
          rows={3}
          placeholder="Team description text..."
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
