"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { company } from "@/data/company";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 500);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-dark border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
      <div className="flex items-center gap-3 px-4 py-3">
        <Link
          href="/get-quote"
          className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-brand-red text-white font-bold text-sm rounded-sm hover:bg-brand-red-dark transition-colors"
        >
          Get FREE Quote
        </Link>
        <a
          href={`tel:${company.phoneRaw}`}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-white/30 text-white font-bold text-sm rounded-sm hover:bg-white/10 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          Call
        </a>
      </div>
    </div>
  );
}
