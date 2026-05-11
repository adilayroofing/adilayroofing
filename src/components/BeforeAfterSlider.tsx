"use client";

/**
 * Draggable before/after image comparison slider.
 *
 * - Both images stack absolutely; the "before" is clipped on the right
 *   based on `position` (0–100%) so the "after" shows through.
 * - Pointer-down anywhere on the image jumps the handle to that x and
 *   starts a drag; pointer-move while dragging updates position; pointer
 *   release ends the drag. Pointer Events cover mouse + touch + stylus.
 * - On first scroll-into-view we run a short auto-animation (50 → 80 →
 *   20 → 50) so users see it's interactive without a separate label.
 *   The auto-animation is canceled as soon as the user touches it.
 */

import { useEffect, useRef, useState } from "react";

interface Props {
  beforeSrc: string;
  beforeAlt: string;
  afterSrc: string;
  afterAlt: string;
  /** Tailwind aspect class. Defaults to aspect-[7/6] to match the homepage
   *  Victorian-house photos (1352x1163 / 1200x1045 — both ~1.16). */
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
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // ── Auto-hint animation on first scroll into view ───────────────────────
  useEffect(() => {
    if (hasInteracted) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasInteracted) return;
        observer.disconnect();
        // 50 → 80 → 20 → 50, ~2.4s total
        const seq: { at: number; value: number }[] = [
          { at: 350, value: 80 },
          { at: 1250, value: 20 },
          { at: 2150, value: 50 },
        ];
        seq.forEach(({ at, value }) => {
          window.setTimeout(() => {
            // Bail out if the user grabbed it during the hint
            setPosition((curr) => (curr === position && !hasInteracted ? value : curr));
            setPosition(value);
          }, at);
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // We intentionally only register once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Pointer handlers ────────────────────────────────────────────────────
  function getPercent(clientX: number): number {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return 50;
    const raw = ((clientX - rect.left) / rect.width) * 100;
    return Math.min(100, Math.max(0, raw));
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault();
    setHasInteracted(true);
    setIsDragging(true);
    containerRef.current?.setPointerCapture(e.pointerId);
    setPosition(getPercent(e.clientX));
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    setPosition(getPercent(e.clientX));
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      containerRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      // ignore — pointer may have already been released
    }
  }

  // ── Keyboard accessibility (left/right arrows when handle focused) ──────
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
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className={`relative w-full overflow-hidden rounded-sm select-none touch-none cursor-ew-resize shadow-lg ${aspectClass} ${className}`}
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

      {/* Drag handle (circle) */}
      <button
        type="button"
        onKeyDown={onHandleKeyDown}
        aria-label="Drag to compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        role="slider"
        className="absolute top-1/2 w-11 h-11 md:w-12 md:h-12 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg ring-1 ring-black/10 flex items-center justify-center cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-brand-red"
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
