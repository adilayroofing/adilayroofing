"use client";

import InlineRichTextField from "./InlineRichTextField";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  description: string;
  items: FAQItem[];
}

export interface FAQPageContent {
  general: FAQCategory;
  areas: FAQCategory;
  roofingDetails: FAQCategory;
  process: FAQCategory;
}

export default function StructuredFAQEditor({
  content,
  onChange,
}: {
  content: FAQPageContent;
  onChange: (content: FAQPageContent) => void;
}) {
  function updateCategory(
    key: keyof FAQPageContent,
    field: "title" | "description",
    value: string
  ) {
    onChange({
      ...content,
      [key]: { ...content[key], [field]: value },
    });
  }

  function addFAQ(key: keyof FAQPageContent) {
    onChange({
      ...content,
      [key]: {
        ...content[key],
        items: [...content[key].items, { question: "", answer: "" }],
      },
    });
  }

  function updateFAQ(
    key: keyof FAQPageContent,
    index: number,
    field: "question" | "answer",
    value: string
  ) {
    const updated = [...content[key].items];
    updated[index] = { ...updated[index], [field]: value };
    onChange({
      ...content,
      [key]: { ...content[key], items: updated },
    });
  }

  function removeFAQ(key: keyof FAQPageContent, index: number) {
    onChange({
      ...content,
      [key]: {
        ...content[key],
        items: content[key].items.filter((_, i) => i !== index),
      },
    });
  }

  function moveFAQ(key: keyof FAQPageContent, index: number, direction: -1 | 1) {
    const items = [...content[key].items];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;
    [items[index], items[newIndex]] = [items[newIndex], items[index]];
    onChange({ ...content, [key]: { ...content[key], items } });
  }

  const categories: { key: keyof FAQPageContent; hint: string }[] = [
    { key: "general", hint: "Most common questions from homeowners and businesses." },
    { key: "areas", hint: "Questions about service coverage areas." },
    { key: "roofingDetails", hint: "In-depth answers about costs, materials, and permits." },
    { key: "process", hint: "What to expect when working with Adilay Roofing." },
  ];

  return (
    <div className="space-y-10">
      {categories.map(({ key, hint }) => (
        <div key={key} className="border border-gray-700 rounded-lg p-5">
          {/* Category header fields */}
          <div className="mb-4">
            <label className="block text-xs text-gray-500 mb-1">Section Title</label>
            <input
              type="text"
              value={content[key].title}
              onChange={(e) => updateCategory(key, "title", e.target.value)}
              className="input-field mb-2"
              placeholder="Section title..."
            />
            <label className="block text-xs text-gray-500 mb-1">Section Description</label>
            <input
              type="text"
              value={content[key].description}
              onChange={(e) => updateCategory(key, "description", e.target.value)}
              className="input-field"
              placeholder="Section description..."
            />
            <p className="text-gray-600 text-xs mt-1">{hint}</p>
          </div>

          {/* FAQ items */}
          <div className="space-y-3">
            {content[key].items.map((item, i) => (
              <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveFAQ(key, i, -1)}
                      disabled={i === 0}
                      className="text-gray-500 hover:text-white disabled:opacity-20 text-xs p-1"
                      title="Move up"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      onClick={() => moveFAQ(key, i, 1)}
                      disabled={i === content[key].items.length - 1}
                      className="text-gray-500 hover:text-white disabled:opacity-20 text-xs p-1"
                      title="Move down"
                    >
                      ▼
                    </button>
                    <span className="text-xs text-gray-500 ml-1">Q{i + 1}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFAQ(key, i)}
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
                  onChange={(e) => updateFAQ(key, i, "question", e.target.value)}
                  className="input-field mb-2 text-sm"
                  placeholder="Question..."
                />
                <InlineRichTextField
                  value={item.answer}
                  onChange={(html) => updateFAQ(key, i, "answer", html)}
                  rows={2}
                  placeholder="Answer..."
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addFAQ(key)}
            className="mt-3 px-3 py-1.5 text-sm text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-colors"
          >
            + Add FAQ
          </button>
        </div>
      ))}
    </div>
  );
}
