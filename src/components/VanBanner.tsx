"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Props = {
  /** Sentence-case message. Use {highlight} as a placeholder for the emphasised word/phrase. */
  text: string;
  highlight?: string;
  /** Optional CTA link (e.g. /contact) — wraps the whole banner in a Link. */
  href?: string;
  /** Visual variant: red brand background by default; dark navy as alt. */
  variant?: "red" | "navy";
};

export default function VanBanner({ text, highlight, href, variant = "red" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const bgClass = variant === "navy" ? "bg-brand-dark" : "bg-brand-red";
  const accentClass = variant === "navy" ? "bg-brand-red" : "bg-brand-dark";

  const renderedText = highlight && text.includes("{highlight}")
    ? text.split("{highlight}").reduce<React.ReactNode[]>((acc, part, i, arr) => {
        acc.push(part);
        if (i < arr.length - 1) {
          acc.push(
            <span key={i} className="text-amber-300 font-bold">
              {highlight}
            </span>
          );
        }
        return acc;
      }, [])
    : text;

  const inner = (
    // mb-* leaves room for the van to overflow below without overlapping next section.
    // min-h-* gives the van a tall enough banner on desktop so it stays "inside"
    // vertically (only the wheels poke out) instead of bleeding way above the top.
    <div
      ref={ref}
      className={`relative ${bgClass} rounded-r-2xl rounded-l-sm shadow-sm mb-8 md:mb-10
                  min-h-[120px] md:min-h-[150px] lg:min-h-[170px]`}
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-1.5 md:w-2 ${accentClass} rounded-l-sm`}
        aria-hidden="true"
      />
      <p
        className="text-white text-sm md:text-base font-medium leading-snug
                   pl-5 md:pl-7 pr-32 sm:pr-44 md:pr-52 lg:pr-56 py-5 md:py-6 max-w-[42rem]"
      >
        {renderedText}
      </p>
      <img
        src="/images/adilay-van-small.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute right-0 sm:right-2 md:right-4 bottom-0
                   w-40 sm:w-44 md:w-48 lg:w-52 h-auto drop-shadow-xl
                   transition-all duration-[900ms] ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translate(0, 22px) rotate(0deg)"
            : "translate(80px, 22px) rotate(2deg)",
        }}
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block group hover:opacity-95 transition-opacity">
        {inner}
      </Link>
    );
  }
  return inner;
}
