"use client";

import { useState } from "react";
import SafeHTML from "./SafeHTML";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-brand-border border-t border-b border-brand-border">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-start justify-between gap-4 py-4 md:py-5 text-left cursor-pointer group"
              aria-expanded={isOpen}
            >
              <span className="text-sm md:text-base font-bold text-brand-dark group-hover:text-brand-red transition-colors leading-snug">
                {item.question}
              </span>
              <svg
                className={`w-5 h-5 flex-shrink-0 text-brand-red transition-transform duration-300 mt-0.5 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-96 pb-4 md:pb-5" : "max-h-0"
              }`}
            >
              <SafeHTML
                html={item.answer}
                as="div"
                className="text-brand-gray text-sm md:text-base leading-relaxed pr-8 [&_a]:text-brand-red [&_a]:underline [&_a:hover]:text-red-700 [&_p]:mb-1 [&_p:last-child]:mb-0"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
