"use client";

/**
 * Home-page case-study carousel.
 *
 * Native horizontal scroll with CSS scroll-snap, so touch swipe feels like
 * the phone's own scrolling. Arrow buttons and dots drive the same scroller.
 *
 * Mobile shows two cards plus a peek of the third, so it's obvious there's
 * more to swipe; desktop shows three plus a peek of the fourth. Every card
 * and link is server-rendered, so crawlers see all case studies and links.
 */

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { caseStudies } from "@/data/caseStudies";

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d={dir === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
      />
    </svg>
  );
}

export default function CaseStudyCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const step = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return first.offsetWidth + gap;
  }, []);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const s = step();
    const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    // The last cards can never snap to the left edge, so light the final dot
    // once the scroller bottoms out.
    if (end) setActive(caseStudies.length - 1);
    else if (s) setActive(Math.round(track.scrollLeft / s));
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(end);
  }, [step]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      track.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const smooth = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

  const scrollByCards = (n: number) =>
    trackRef.current?.scrollBy({ left: n * step(), behavior: smooth() });

  const scrollToCard = (i: number) =>
    trackRef.current?.scrollTo({ left: i * step(), behavior: smooth() });

  return (
    <div aria-roledescription="carousel" aria-label="Roofing case studies">
      <ul
        ref={trackRef}
        className="flex gap-3 md:gap-5 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 scroll-px-4 md:mx-0 md:px-0 md:scroll-px-0 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {caseStudies.map((cs, i) => (
          <li
            key={cs.id}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${caseStudies.length}: ${cs.title}, ${cs.location}`}
            className="snap-start shrink-0 w-[42%] md:w-[29%]"
          >
            <Link
              href={cs.href}
              className="group flex flex-col h-full bg-white border border-brand-border rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[4/5] md:aspect-square overflow-hidden bg-brand-light">
                <img
                  src={cs.afterSrc(640)}
                  srcSet={`${cs.afterSrc(320)} 320w, ${cs.afterSrc(640)} 640w, ${cs.afterSrc(960)} 960w`}
                  sizes="(min-width: 768px) 29vw, 42vw"
                  alt={cs.afterAlt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={cs.afterPosition ? { objectPosition: cs.afterPosition } : undefined}
                />
                <span className="absolute top-1.5 left-1.5 md:top-3 md:left-3 bg-emerald-600 text-white px-1.5 md:px-2.5 py-0.5 rounded-sm text-[9px] md:text-xs font-extrabold tracking-widest uppercase">
                  After
                </span>
                {/* Small BEFORE inset so each card tells the whole story */}
                <div className="absolute bottom-1.5 right-1.5 md:bottom-3 md:right-3 w-[40%] aspect-square rounded-sm overflow-hidden border-2 border-white shadow-md bg-brand-light">
                  <img
                    src={cs.beforeSrc(320)}
                    alt={cs.beforeAlt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover saturate-[0.75]"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-brand-red/90 text-white text-center text-[8px] md:text-[11px] font-extrabold tracking-widest uppercase py-px md:py-0.5">
                    {cs.beforeLabel ?? "Before"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-1 p-2.5 md:p-4">
                <p className="text-brand-red font-bold uppercase tracking-wider text-[9px] md:text-xs leading-tight mb-1">
                  <span className="md:hidden">{cs.shortLocation}</span>
                  <span className="hidden md:inline">
                    {cs.type} · {cs.location}
                  </span>
                </p>
                <h3 className="text-[13px] md:text-lg font-bold text-brand-dark leading-snug line-clamp-2">
                  {cs.title}
                </h3>
                <p className="hidden md:block text-sm text-brand-gray leading-relaxed mt-1.5">
                  {cs.highlight}
                </p>
                <span className="mt-auto pt-2 md:pt-3 inline-flex items-center gap-1 text-[12px] md:text-sm font-bold text-brand-red group-hover:gap-2 transition-all">
                  View case study
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Controls: arrows + dots */}
      <div className="flex items-center justify-center gap-4 mt-3 md:mt-5">
        <button
          type="button"
          onClick={() => scrollByCards(-1)}
          disabled={atStart}
          aria-label="Previous case study"
          className="w-11 h-11 rounded-full border border-brand-border bg-white text-brand-dark flex items-center justify-center shadow-sm hover:border-brand-red hover:text-brand-red transition-colors disabled:opacity-35 disabled:hover:border-brand-border disabled:hover:text-brand-dark disabled:cursor-default"
        >
          <Arrow dir="left" />
        </button>
        <div className="flex items-center gap-1.5">
          {caseStudies.map((cs, i) => (
            <button
              key={cs.id}
              type="button"
              onClick={() => scrollToCard(i)}
              aria-label={`Go to case study ${i + 1}: ${cs.title}`}
              aria-current={i === active ? "true" : undefined}
              className="p-1.5"
            >
              <span
                className={`block h-2 rounded-full transition-all ${
                  i === active ? "w-5 bg-brand-red" : "w-2 bg-brand-border"
                }`}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => scrollByCards(1)}
          disabled={atEnd}
          aria-label="Next case study"
          className="w-11 h-11 rounded-full border border-brand-border bg-white text-brand-dark flex items-center justify-center shadow-sm hover:border-brand-red hover:text-brand-red transition-colors disabled:opacity-35 disabled:hover:border-brand-border disabled:hover:text-brand-dark disabled:cursor-default"
        >
          <Arrow dir="right" />
        </button>
      </div>
    </div>
  );
}
