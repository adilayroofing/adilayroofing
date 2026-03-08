"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface BlogFAQSectionProps {
  items: FAQItem[];
}

export default function BlogFAQSection({ items }: BlogFAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <section className="bg-brand-light">
      <div className="section-padding">
        <div className="container-narrow mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-dark text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {items.map((item, i) => (
              <div
                key={i}
                className="bg-white border border-brand-border rounded-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex items-center justify-between w-full px-5 py-4 text-left cursor-pointer"
                  aria-expanded={openIndex === i}
                  aria-controls={`blog-faq-answer-${i}`}
                >
                  <span className="font-bold text-brand-dark pr-4">
                    {item.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-brand-red flex-shrink-0 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  id={`blog-faq-answer-${i}`}
                  role="region"
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === i
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-4 text-brand-gray leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
