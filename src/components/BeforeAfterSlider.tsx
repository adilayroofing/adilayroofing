"use client";

/**
 * Draggable before/after image comparison slider.
 *
 * Mobile-friendliness:
 * - Container uses `touch-action: pan-y` so a finger landing on the image
 *   can still swipe-scroll the page vertically. Only the small drag
 *   handle disables touch-action, so horizontal drag on the handle works.
 * - On touch input, the container does NOT jump to wherever you tap; only
 *   the handle is interactive. (On a mouse or pen, clicking anywhere on
 *   the image still jumps the handle — desktop "bonus" interaction.)
 * - Drag handle is 48 px on mobile / 52 px on desktop — comfortably above
 *   the 44 px iOS minimum touch target.
 *
 * Hint animation:
 * - On first scroll-into-view we run a short auto-animation
 *   (50 → 80 → 20 → 50) so users see it's interactive without a separate
 *   "drag me" callout. Canceled the moment they grab it.
 *
 * Accessibility:
 * - Handle is a button with role="slider", aria-valuenow, and arrow-key
 *   support (±4, ±10 with shift, Home/End for 0/100).
 */

import { useEffect, useRef, useState } from "react";

interface Props {
  beforeSrc: string;
  beforeAlt: string;
  afterSrc: string;
  afterAlt: string;
  /** Tailwind aspect class. Defaults to aspect-[7/6] to match the
   *  homepage Victorian-house photos (1352x1163 / 1200x1045 — both
   *  about 1.16). */
  aspectClass?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  beforeAlt,
  afterSrc,
  afterAlt,
  aspectClass = "aspect-[7/6]",
  className = "",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // ── Auto-hint animation on first scroll into view ───────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        // Hint sequence: reveal the FULL after (100), then the FULL
        // before (0), then settle in the middle (50). Each step is a
        // 700ms cubic-bezier transition, with deliberate pauses at the
        // extremes so users get a clean look at each state before the
        // next slide. Total ~2.9s. Bails out if the user grabs the
        // slider mid-animation (checked inside each setState callback).
        const seq: { at: number; value: number }[] = [
          { at: 400, value: 100 },
          { at: 1600, value: 0 },
          { at: 2900, value: 50 },
        ];
        seq.forEach(({ at, value }) => {
          window.setTimeout(() => {
            setPosition((curr) => (hasInteractedRef.current ? curr : value));
          }, at);
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // Run once on mount; we read hasInteracted via a ref so we don't
    // re-register the observer on every state change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep a ref in sync with hasInteracted so the setTimeout closures above
  // can read the current value without rebinding.
  const hasInteractedRef = useRef(false);
  useEffect(() => {
    hasInteractedRef.current = hasInteracted;
  }, [hasInteracted]);

  // ── Pointer helpers ─────────────────────────────────────────────────────
  function getPercent(clientX: number): number {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return 50;
    const raw = ((clientX - rect.left) / rect.width) * 100;
    return Math.min(100, Math.max(0, raw));
  }

  function startDrag(e: React.PointerEvent<HTMLElement>) {
    setHasInteracted(true);
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function endDrag(e: React.PointerEvent<HTMLElement>) {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore — pointer may have already been released
    }
  }

  // ── Container handlers: mouse/pen click-to-jump (desktop bonus) ─────────
  // Skipped on touch so the page can scroll vertically when a finger
  // lands inside the slider area.
  function onContainerPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch") return;
    if (e.button !== 0) return;
    e.preventDefault();
    setPosition(getPercent(e.clientX));
    startDrag(e);
  }
  function onContainerPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging || e.pointerType === "touch") return;
    setPosition(getPercent(e.clientX));
  }

  // ── Handle handlers: ALL pointer types ──────────────────────────────────
  function onHandlePointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    startDrag(e);
  }
  function onHandlePointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    if (!isDragging) return;
    setPosition(getPercent(e.clientX));
  }

  // ── Keyboard ────────────────────────────────────────────────────────────
  function onHandleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setHasInteracted(true);
      setPosition((p) => Math.max(0, p - step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setHasInteracted(true);
      setPosition((p) => Math.min(100, p + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setHasInteracted(true);
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setHasInteracted(true);
      setPosition(100);
    }
  }

  const transition = isDragging
    ? "none"
    : "clip-path 700ms cubic-bezier(0.4, 0, 0.2, 1), left 700ms cubic-bezier(0.4, 0, 0.2, 1)";

  return (
    <div
      ref={containerRef}
      onPointerDown={onContainerPointerDown}
      onPointerMove={onContainerPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className={`relative w-full overflow-hidden rounded-sm select-none touch-pan-y shadow-lg ${aspectClass} ${className}`}
      role="region"
      aria-label="Before and after roof replacement comparison"
    >
      {/* After (bottom layer, fully visible) */}
      <img
        src={afterSrc}
        alt={afterAlt}
        draggable={false}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />

      {/* Before (top layer, clipped on the right) */}
      <img
        src={beforeSrc}
        alt={beforeAlt}
        draggable={false}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          transition,
        }}
      />

      {/* Labels */}
      <span className="absolute top-3 left-3 bg-brand-dark/85 text-white text-[11px] md:text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider pointer-events-none">
        Before
      </span>
      <span className="absolute top-3 right-3 bg-brand-red text-white text-[11px] md:text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider pointer-events-none">
        After
      </span>

      {/* Vertical divider */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.45)] pointer-events-none"
        style={{
          left: `${position}%`,
          transform: "translateX(-50%)",
          transition,
        }}
      />

      {/* Drag handle — owns its own pointer capture so it works on
          mouse + touch + pen. `touch-none` lets a horizontal touch drag
          through (would otherwise be intercepted by `touch-pan-y` on the
          parent). */}
      <button
        ref={handleRef}
        type="button"
        onPointerDown={onHandlePointerDown}
        onPointerMove={onHandlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onHandleKeyDown}
        aria-label="Drag to compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        role="slider"
        className="absolute top-1/2 w-12 h-12 md:w-14 md:h-14 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg ring-1 ring-black/10 flex items-center justify-center touch-none cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-brand-red"
        style={{
          left: `${position}%`,
          transition,
        }}
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6 text-brand-dark"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l-7 7 7 7M15 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
