"use client";

import { useState, useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { company } from "@/data/company";
import ScrollReveal from "@/components/ScrollReveal";

import type { Review } from "@/data/reviews";
import type { ReviewStats } from "@/lib/reviews";

// Browser's "now", fixed per page load. Server render uses the cache time instead.
const CLIENT_NOW = typeof window === "undefined" ? 0 : Date.now();
const noopSubscribe = () => () => {};

/** Google-style relative date: "3 weeks ago", "a month ago", "2 years ago". */
function timeAgo(date: string, now: number): string {
  const then = new Date(`${date}T12:00:00`);
  const nowD = new Date(now);
  const days = Math.floor((now - then.getTime()) / 86_400_000);
  if (days < 1) return "today";
  if (days < 2) return "a day ago";
  if (days < 7) return `${days} days ago`;
  if (days < 14) return "a week ago";
  let months =
    (nowD.getFullYear() - then.getFullYear()) * 12 + (nowD.getMonth() - then.getMonth());
  if (nowD.getDate() < then.getDate()) months--;
  if (months < 1) return `${Math.floor(days / 7)} weeks ago`;
  if (months < 2) return "a month ago";
  if (months < 12) return `${months} months ago`;
  const years = Math.floor(months / 12);
  return years < 2 ? "a year ago" : `${years} years ago`;
}

function StarRating({
  count,
  size = "sm",
}: {
  count: number;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses =
    size === "lg"
      ? "w-6 h-6 md:w-7 md:h-7"
      : size === "md"
      ? "w-4 h-4 md:w-5 md:h-5"
      : "w-3.5 h-3.5 md:w-4 md:h-4";
  const gap = size === "lg" ? "gap-1" : "gap-0.5";
  return (
    <div className={`flex items-center ${gap}`} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`${sizeClasses} ${
            i < count ? "text-brand-star" : "text-brand-border"
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleIcon({ className = "w-4 h-4 md:w-5 md:h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

/* ── Review card (single) ── */
/* Mobile: full text, no Read More (cards are stacked 1-col so plenty of width) */
/* Desktop: Read More on long reviews (3-col grid, cards are narrower) */
const LONG_THRESHOLD = 180;

function ReviewCard({ review, renderedAt }: { review: Review; renderedAt: number }) {
  const [expanded, setExpanded] = useState(false);
  // Hydrates with the server's date, then switches to today's date in the browser.
  const now = useSyncExternalStore(noopSubscribe, () => CLIENT_NOW, () => renderedAt);
  const ago = timeAgo(review.date, now);
  const isLong = review.quote.length > LONG_THRESHOLD;
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxH, setMaxH] = useState<string>("5.6em");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 768); }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Recalculate max-height when expanded state changes
  useEffect(() => {
    if (!contentRef.current) return;
    if (expanded) {
      setMaxH(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxH("5.6em");
    }
  }, [expanded]);

  // On mobile: always show full text. On desktop: clamp long reviews.
  const shouldClamp = isLong && !isMobile;

  return (
    <div className="bg-white rounded-sm p-4 md:p-6 shadow-sm border border-brand-border flex flex-col h-full">
      {/* Top: Google + time */}
      <div className="flex items-center justify-between mb-2">
        <GoogleIcon className="w-5 h-5 md:w-6 md:h-6" />
        <span className="text-[10px] md:text-xs text-brand-gray">{ago}</span>
      </div>

      {/* Stars */}
      <StarRating count={review.stars} size="md" />

      {/* Quote */}
      <blockquote className="mt-2 md:mt-3 flex-1">
        <div
          ref={contentRef}
          className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
          style={{ maxHeight: shouldClamp ? maxH : "none" }}
        >
          <p className="text-brand-dark leading-relaxed text-xs md:text-sm">
            &ldquo;{review.quote}&rdquo;
          </p>
        </div>

        {shouldClamp && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-brand-red hover:text-brand-red-dark text-[11px] md:text-xs font-semibold mt-1 transition-colors cursor-pointer"
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        )}
      </blockquote>

      {/* Attribution */}
      <div className="mt-3 pt-2 md:pt-3 border-t border-brand-border flex items-center gap-2">
        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center font-bold text-xs md:text-sm flex-shrink-0">
          {review.name.charAt(0).toUpperCase()}
        </div>
        <p className="font-bold text-brand-dark text-xs md:text-sm truncate">
          {review.name}
        </p>
      </div>
    </div>
  );
}

/* ── Hook: responsive perPage ── */
function usePerPage() {
  const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    function update() {
      setPerPage(window.innerWidth < 768 ? 2 : 3);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return perPage;
}

/* ── Main component ── */
export default function TestimonialsCarousel({
  reviews: testimonials,
  stats,
  renderedAt,
}: {
  reviews: Review[];
  stats: ReviewStats;
  renderedAt: number;
}) {
  const perPage = usePerPage();
  const [page, setPage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [slideDir, setSlideDir] = useState<"left" | "right">("left");

  const total = testimonials.length;
  const totalPages = Math.ceil(total / perPage);
  // Google's real total (updated daily) — can outpace the approved reviews shown here.
  const displayTotal = stats.count;
  const ratingLabel = stats.rating.toFixed(1);

  // Clamp page when perPage changes (e.g. resize)
  useEffect(() => {
    setPage((prev) => Math.min(prev, totalPages - 1));
  }, [totalPages]);

  const goTo = useCallback(
    (p: number) => {
      setPage(((p % totalPages) + totalPages) % totalPages);
    },
    [totalPages]
  );

  const animatedGo = useCallback(
    (p: number, dir: "left" | "right") => {
      setSlideDir(dir);
      setAnimating(true);
      // Quick fade-out, then swap page, then fade-in
      setTimeout(() => {
        goTo(p);
        setAnimating(false);
      }, 150);
    },
    [goTo]
  );

  const goNext = useCallback(() => animatedGo(page + 1, "left"), [page, animatedGo]);
  const goPrev = useCallback(() => animatedGo(page - 1, "right"), [page, animatedGo]);

  /* No auto-play — only manual navigation via swipe or arrows */

  /* Touch / swipe */
  const minSwipeDistance = 50;

  function onTouchStart(e: React.TouchEvent) {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }

  function onTouchMove(e: React.TouchEvent) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  function onTouchEnd() {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (Math.abs(distance) >= minSwipeDistance) {
      if (distance > 0) goNext();
      else goPrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  }

  /* Current visible slice */
  const startIdx = page * perPage;
  const visible = testimonials.slice(startIdx, startIdx + perPage);

  return (
    <section className="section-padding bg-brand-light">
      <div className="container-wide mx-auto">
        {/* Heading */}
        <ScrollReveal>
        <div className="text-center mb-6 md:mb-10">
          <h2 className="section-heading">What Our Customers Say</h2>

          {/* Google trust badge */}
          <div className="mt-4 md:mt-6 inline-flex items-center gap-2 md:gap-4 bg-white border border-brand-border rounded-full px-4 py-2 md:px-6 md:py-3 shadow-sm">
            <GoogleIcon className="w-6 h-6 md:w-8 md:h-8" />
            <span className="text-brand-dark font-bold text-2xl md:text-3xl leading-none">
              {ratingLabel}
            </span>
            <StarRating count={Math.round(stats.rating)} size="lg" />
            <span className="hidden md:inline-block w-px h-5 md:h-6 bg-brand-border" />
            <span className="hidden md:inline-block text-brand-dark text-xs md:text-sm font-semibold whitespace-nowrap">
              Across {displayTotal} Google reviews
            </span>
          </div>
          <p className="mt-2 text-brand-gray text-[11px] md:text-xs">
            <span className="md:hidden">
              Across {displayTotal} Google reviews ·{" "}
            </span>
            {stats.rating >= 5
              ? "Every Adilay Roofing customer who has reviewed us on Google has given a 5-star rating"
              : `Rated ${ratingLabel} out of 5 by Adilay Roofing customers on Google`}
          </p>

          {/* Navigation arrows + counter — right under the stars */}
          <div className="flex items-center justify-center gap-4 mt-4 md:mt-5">
            <button
              type="button"
              onClick={goPrev}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-gray hover:text-brand-dark hover:border-brand-dark transition-colors cursor-pointer"
              aria-label="Previous reviews"
            >
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <span className="text-xs md:text-sm text-brand-gray font-medium">
              {page + 1} / {totalPages}
            </span>

            <button
              type="button"
              onClick={goNext}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-gray hover:text-brand-dark hover:border-brand-dark transition-colors cursor-pointer"
              aria-label="Next reviews"
            >
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Swipe hint (mobile) */}
          <p className="text-brand-gray text-xs mt-1.5 md:hidden">
            Swipe to see more reviews
          </p>
        </div>
        </ScrollReveal>

        {/* Cards grid with slide animation */}
        <div
          className="select-none overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 transition-all duration-200 ease-out"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating
                ? `translateX(${slideDir === "left" ? "-12px" : "12px"})`
                : "translateX(0)",
            }}
          >
            {visible.map((review, i) => (
              <ReviewCard key={startIdx + i} review={review} renderedAt={renderedAt} />
            ))}
          </div>
        </div>

        {/* Google Reviews Link */}
        <div className="text-center mt-6 md:mt-10">
          <Link
            href={company.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-red font-bold hover:text-brand-red-dark transition-colors text-sm md:text-base"
          >
            See All Reviews on Google
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
