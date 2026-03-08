"use client";

import { useState, useEffect } from "react";
import type { TOCItem } from "@/lib/blog";

interface TableOfContentsProps {
  items: TOCItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  function scrollToHeading(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  }

  return (
    <>
      {/* Mobile: collapsible */}
      <div className="lg:hidden mb-6 bg-brand-light border border-brand-border rounded-sm">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-3 text-sm font-bold text-brand-dark cursor-pointer"
          aria-expanded={isOpen}
        >
          On This Page
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
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
        {isOpen && (
          <nav className="px-4 pb-3">
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToHeading(item.id)}
                    className={`block w-full text-left text-sm py-1.5 px-3 rounded transition-colors cursor-pointer ${
                      activeId === item.id
                        ? "text-brand-red font-semibold bg-brand-red/5"
                        : "text-brand-gray hover:text-brand-dark"
                    }`}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop: sticky sidebar */}
      <nav className="hidden lg:block" aria-label="Table of contents">
        <p className="text-xs font-bold text-brand-dark uppercase tracking-wider mb-3">
          On This Page
        </p>
        <ul className="space-y-1 border-l-2 border-brand-border">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToHeading(item.id)}
                className={`block w-full text-left text-sm py-1.5 pl-4 -ml-[2px] border-l-2 transition-all cursor-pointer ${
                  activeId === item.id
                    ? "text-brand-red font-semibold border-brand-red"
                    : "text-brand-gray hover:text-brand-dark border-transparent"
                }`}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
