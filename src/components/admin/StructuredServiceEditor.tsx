"use client";

import { useState } from "react";
import InlineRichTextField from "./InlineRichTextField";

interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceContent {
  heroDescription: string;
  benefits: string[];
  features: string[];
  faq: FAQItem[];
}

export default function StructuredServiceEditor({
  content,
  onChange,
}: {
  content: ServiceContent;
  onChange: (content: ServiceContent) => void;
}) {
  // ── Hero Description ──────────────────────────────────────────────
  function updateHero(value: string) {
    onChange({ ...content, heroDescription: value });
  }

  // ── Benefits ──────────────────────────────────────────────────────
  function addBenefit() {
    onChange({ ...content, benefits: [...content.benefits, ""] });
  }
  function updateBenefit(index: number, value: string) {
    const updated = [...content.benefits];
    updated[index] = value;
    onChange({ ...content, benefits: updated });
  }
  function removeBenefit(index: number) {
    onChange({ ...content, benefits: content.benefits.filter((_, i) => i !== index) });
  }
  function moveBenefit(index: number, direction: -1 | 1) {
    const updated = [...content.benefits];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= updated.length) return;
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange({ ...content, benefits: updated });
  }

  // ── Features ──────────────────────────────────────────────────────
  function addFeature() {
    onChange({ ...content, features: [...content.features, ""] });
  }
  function updateFeature(index: number, value: string) {
    const updated = [...content.features];
    updated[index] = value;
    onChange({ ...content, features: updated });
  }
  function removeFeature(index: number) {
    onChange({ ...content, features: content.features.filter((_, i) => i !== index) });
  }
  function moveFeature(index: number, direction: -1 | 1) {
    const updated = [...content.features];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= updated.length) return;
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange({ ...content, features: updated });
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
      {/* ── Hero Description ─────────────────────────────────────── */}
      <Section title="Hero Description" hint="The main intro paragraph shown below the hero banner.">
        <InlineRichTextField
          value={content.heroDescription}
          onChange={(html) => updateHero(html)}
          rows={5}
          placeholder="Describe this service..."
        />
      </Section>

      {/* ── Benefits ─────────────────────────────────────────────── */}
      <Section title="Benefits" hint="Shown as a 2-column grid with checkmark icons.">
        <div className="space-y-2">
          {content.benefits.map((benefit, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex flex-col gap-0.5">
                <button
                  type="button"
                  onClick={() => moveBenefit(i, -1)}
                  disabled={i === 0}
                  className="text-gray-500 hover:text-white disabled:opacity-20 text-xs leading-none"
                  title="Move up"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => moveBenefit(i, 1)}
                  disabled={i === content.benefits.length - 1}
                  className="text-gray-500 hover:text-white disabled:opacity-20 text-xs leading-none"
                  title="Move down"
                >
                  ▼
                </button>
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
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
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

      {/* ── Features ─────────────────────────────────────────────── */}
      <Section title="Features (What's Included)" hint="Shown as numbered cards in a 3-column grid.">
        <div className="space-y-2">
          {content.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex flex-col gap-0.5">
                <button
                  type="button"
                  onClick={() => moveFeature(i, -1)}
                  disabled={i === 0}
                  className="text-gray-500 hover:text-white disabled:opacity-20 text-xs leading-none"
                  title="Move up"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => moveFeature(i, 1)}
                  disabled={i === content.features.length - 1}
                  className="text-gray-500 hover:text-white disabled:opacity-20 text-xs leading-none"
                  title="Move down"
                >
                  ▼
                </button>
              </div>
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-red-600 text-white font-bold text-xs rounded-full">
                {i + 1}
              </span>
              <input
                type="text"
                value={feature}
                onChange={(e) => updateFeature(i, e.target.value)}
                className="input-field flex-1"
                placeholder="Feature text..."
              />
              <button
                type="button"
                onClick={() => removeFeature(i)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
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
          onClick={addFeature}
          className="mt-3 px-3 py-1.5 text-sm text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-colors"
        >
          + Add Feature
        </button>
      </Section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <Section title="Frequently Asked Questions" hint="Shown as an accordion on the live page.">
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
