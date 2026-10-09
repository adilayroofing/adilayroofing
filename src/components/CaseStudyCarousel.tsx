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

import { useCallback, useEffect, useRef, useState } from "react";
import { caseStudies } from "@/data/caseStudies";
import CaseStudyCard from "@/components/CaseStudyCard";

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
            <CaseStudyCard cs={cs} variant="carousel" sizes="(min-width: 768px) 29vw, 42vw" />
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
