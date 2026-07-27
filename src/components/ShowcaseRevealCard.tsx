"use client";

/**
 * Scroll-reveal wrapper for the project-showcase cards.
 *
 * ALL animation tuning lives in this one file — tweak the constants below
 * and every card (home page + service-area page) follows:
 *   THRESHOLD / ROOT_MARGIN  — when a card counts as "in view"
 *   DURATION_MS / DISTANCE_PX — how far/slow the fade-up travels
 *   the filter values          — the BEFORE desaturation & AFTER pop
 *
 * Treatments by card kind:
 *   before — rises in from a heavier desaturation and settles slightly
 *            muted, so the old roof always reads a touch drab
 *   after  — starts a hair small + muted and pops to full saturation
 *   crew   — plain fade-up
 *
 * Respects prefers-reduced-motion: everything renders statically.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";

const THRESHOLD = 0.12;
const ROOT_MARGIN = "0px 0px -4% 0px";
const DURATION_MS = 450;
const DISTANCE_PX = 24;

interface Props {
  kind?: "before" | "after" | "crew";
  className?: string;
  /** Stagger offset for collage tiles that enter the viewport together —
   *  tile N gets N × ~100ms so the reveals cascade before → after. */
  delayMs?: number;
  children: ReactNode;
}

export default function ShowcaseRevealCard({
  kind = "crew",
  className = "",
  delayMs = 0,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: THRESHOLD, rootMargin: ROOT_MARGIN }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // BEFORE cards stay subtly desaturated even once settled; AFTER and crew
  // cards land clean.
  const settledFilter =
    kind === "before" ? "saturate(0.75) contrast(0.97)" : "none";
  const hiddenFilter = kind === "before" ? "saturate(0.35)" : "saturate(0.8)";
  const hiddenTransform = `translateY(${DISTANCE_PX}px)${kind === "after" ? " scale(0.97)" : ""}`;

  return (
    <div
      ref={ref}
      className={className}
      style={
        reducedMotion
          ? { filter: settledFilter }
          : {
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) scale(1)" : hiddenTransform,
              filter: visible ? settledFilter : hiddenFilter,
              transition: `opacity ${DURATION_MS}ms ease-out ${delayMs}ms, transform ${DURATION_MS}ms ease-out ${delayMs}ms, filter ${DURATION_MS}ms ease-out ${delayMs}ms`,
              willChange: "opacity, transform, filter",
            }
      }
    >
      {children}
    </div>
  );
}
