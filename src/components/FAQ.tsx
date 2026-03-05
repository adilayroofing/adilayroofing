"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full divide-y divide-brand-border">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index} className="group">
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-start justify-between gap-4 py-5 text-left cursor-pointer"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              <span
                className={`text-base md:text-lg font-semibold transition-colors duration-200 ${
                  isOpen ? "text-brand-red" : "text-brand-dark"
                }`}
              >
                {item.question}
              </span>
              <span
                className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border-2 transition-all duration-200 ${
                  isOpen
                    ? "border-brand-red text-brand-red rotate-0"
                    : "border-brand-gray text-brand-gray rotate-0"
                }`}
                aria-hidden="true"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M20 12H4"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M12 4v16m8-8H4"
                    />
                  )}
                </svg>
              </span>
            </button>
            <div
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="pb-5 pr-10 text-brand-gray leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
