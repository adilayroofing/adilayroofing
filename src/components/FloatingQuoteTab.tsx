"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function FloatingQuoteTab() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [nudge, setNudge] = useState(false);

  // Don't render on the quote page itself
  const isQuotePage = pathname === "/get-quote";

  /* ── Show/hide based on scroll position ── */
  useEffect(() => {
    if (isQuotePage) return;

    function onScroll() {
      setVisible(window.scrollY > 500);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // check initial position
    return () => window.removeEventListener("scroll", onScroll);
  }, [isQuotePage]);

  /* ── Periodic nudge animation every ~8s ── */
  useEffect(() => {
    if (!visible || isQuotePage) return;

    const interval = setInterval(() => {
      setNudge(true);
      setTimeout(() => setNudge(false), 800);
    }, 8000);

    return () => clearInterval(interval);
  }, [visible, isQuotePage]);

  if (isQuotePage) return null;

  return (
    <Link
      href="/get-quote"
      aria-label="Get a free roofing quote"
      className={`
        fixed right-0 top-[62%] z-40
        transition-transform duration-500 ease-out
        ${visible ? "translate-x-0 animate-slideInRight" : "translate-x-full"}
        ${nudge ? "animate-nudge" : ""}
        hover:translate-x-[-4px] hover:scale-105
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2
        cursor-pointer
        drop-shadow-lg
      `}
    >
      <Image
        src="/images/tab-widget.png"
        alt="Get A FREE Quote - Adilay Roofing"
        width={140}
        height={108}
        className="rounded-l-lg w-[90px] md:w-[140px] h-auto"
        priority={false}
      />
    </Link>
  );
}
