"use client";

import { useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { blogCategories } from "@/data/blogCategories";

interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPostContent {
  title: string;
  slug: string;
  description: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  featuredImage: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  bodyHtml: string;
  faq: FAQItem[];
}

export default function StructuredBlogEditor({
  content,
  onChange,
}: {
  content: BlogPostContent;
  onChange: (content: BlogPostContent) => void;
}) {
  const [faqOpen, setFaqOpen] = useState(false);

  function update(field: keyof BlogPostContent, value: unknown) {
    onChange({ ...content, [field]: value });
  }

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

  function addSecondaryKeyword() {
    onChange({ ...content, secondaryKeywords: [...content.secondaryKeywords, ""] });
  }
  function updateSecondaryKeyword(index: number, value: string) {
    const updated = [...content.secondaryKeywords];
    updated[index] = value;
    onChange({ ...content, secondaryKeywords: updated });
  }
  function removeSecondaryKeyword(index: number) {
    onChange({ ...content, secondaryKeywords: content.secondaryKeywords.filter((_, i) => i !== index) });
  }

  return (
    <div className="space-y-8">
      {/* ── Post Details ─────────────────────────────────────────── */}
      <Section title="Post Details">
        <div className="space-y-4">
          <Field label="Title" required>
            <input
              type="text"
              value={content.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Blog post title"
              className="input-field"
            />
          </Field>

          <Field label="URL Slug" required>
            <input
              type="text"
              value={content.slug}
              onChange={(e) => update("slug", e.target.value)}
              placeholder="my-blog-post-slug"
              className="input-field"
            />
            <p className="text-xs text-gray-500 mt-1">
              URL will be: /blog/{content.slug || "..."}
            </p>
          </Field>

          <Field label="Description (Meta)">
            <textarea
              value={content.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Short description for search engines and social sharing..."
              rows={3}
              className="input-field resize-y"
            />
            <p className="text-xs text-gray-500 mt-1">
              {content.description.length}/160 characters
            </p>
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Author">
              <input
                type="text"
                value={content.author}
                onChange={(e) => update("author", e.target.value)}
                placeholder="Adilay Roofing"
                className="input-field"
              />
            </Field>

            <Field label="Publish Date" required>
              <input
                type="date"
                value={content.date}
                onChange={(e) => update("date", e.target.value)}
                className="input-field"
              />
            </Field>

            <Field label="Read Time">
              <input
                type="text"
                value={content.readTime}
                onChange={(e) => update("readTime", e.target.value)}
                placeholder="5 min read"
                className="input-field"
              />
            </Field>
          </div>

          <Field label="Category">
            <select
              value={content.category}
              onChange={(e) => update("category", e.target.value)}
              className="input-field"
            >
              {blogCategories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </Section>

      {/* ── Hero Image ───────────────────────────────────────────── */}
      <Section title="Hero / Featured Image">
        <Field label="Image URL">
          <input
            type="text"
            value={content.featuredImage}
            onChange={(e) => update("featuredImage", e.target.value)}
            placeholder="/images/blog/my-post-hero.jpg or https://..."
            className="input-field"
          />
          <p className="text-xs text-gray-500 mt-1">
            Upload images to /public/images/blog/ and reference them as /images/blog/filename.jpg, or use a full URL.
          </p>
        </Field>
        {content.featuredImage && (
          <div className="mt-3 rounded-lg overflow-hidden border border-gray-700 max-w-md">
            <img
              src={content.featuredImage}
              alt="Hero preview"
              className="w-full h-40 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
      </Section>

      {/* ── SEO Keywords ─────────────────────────────────────────── */}
      <Section title="SEO Keywords">
        <Field label="Primary Keyword">
          <input
            type="text"
            value={content.primaryKeyword}
            onChange={(e) => update("primaryKeyword", e.target.value)}
            placeholder="e.g. roof replacement cost Philadelphia"
            className="input-field"
          />
        </Field>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-300">Secondary Keywords</label>
            <button
              type="button"
              onClick={addSecondaryKeyword}
              className="text-xs text-red-400 hover:text-red-300"
            >
              + Add Keyword
            </button>
          </div>
          {content.secondaryKeywords.map((kw, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                value={kw}
                onChange={(e) => updateSecondaryKeyword(i, e.target.value)}
                placeholder="Secondary keyword..."
                className="input-field flex-1"
              />
              <button
                type="button"
                onClick={() => removeSecondaryKeyword(i)}
                className="px-3 py-2 bg-gray-700 hover:bg-red-600/30 text-gray-400 hover:text-red-400 rounded-lg text-sm transition-colors"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Blog Body (Rich Text with Images) ────────────────────── */}
      <Section title="Blog Content">
        <p className="text-gray-400 text-sm mb-3">
          Write your blog post content below. Use the toolbar to add headings, lists, links, and images.
          To add images in the body, click the image icon in the toolbar and provide the image URL.
        </p>
        <RichTextEditor
          content={content.bodyHtml}
          onChange={(html) => update("bodyHtml", html)}
        />
      </Section>

      {/* ── FAQ Section ──────────────────────────────────────────── */}
      <Section title="FAQ Section (Optional)">
        <button
          type="button"
          onClick={() => setFaqOpen(!faqOpen)}
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
        >
          <svg
            className={`w-4 h-4 transition-transform ${faqOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          {content.faq.length} FAQ items — {faqOpen ? "Collapse" : "Expand"}
        </button>

        {faqOpen && (
          <div className="mt-4 space-y-4">
            {content.faq.map((item, i) => (
              <div key={i} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-xs text-gray-500 font-mono mt-1">Q{i + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeFAQ(i)}
                    className="text-xs text-gray-500 hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) => updateFAQ(i, "question", e.target.value)}
                  placeholder="Question..."
                  className="input-field mb-2"
                />
                <textarea
                  value={item.answer}
                  onChange={(e) => updateFAQ(i, "answer", e.target.value)}
                  placeholder="Answer..."
                  rows={3}
                  className="input-field resize-y"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addFAQ}
              className="w-full py-2.5 border border-dashed border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300 rounded-lg text-sm transition-colors"
            >
              + Add FAQ Item
            </button>
          </div>
        )}
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/50">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-red-500 rounded-full inline-block" />
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
