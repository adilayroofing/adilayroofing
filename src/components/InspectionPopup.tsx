"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Lead-capture popup — house-shaped frame with all copy as real HTML.
 *
 * Triggers once per session (sessionStorage) after 8s OR on exit-intent,
 * whichever fires first. Renders nothing until triggered, so it never
 * affects LCP / initial render.
 */

const SESSION_KEY = "adilay_inspection_popup_shown";
const SHOW_DELAY_MS = 8000;
const CLOSE_ANIM_MS = 200;

export default function InspectionPopup() {
  const [render, setRender] = useState(false); // present in DOM
  const [visible, setVisible] = useState(false); // animation target
  const [pulse, setPulse] = useState(false); // one-shot CTA pulse

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  // ---- open / close -------------------------------------------------------
  const openPopup = useCallback(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, "1");
    lastFocused.current = document.activeElement as HTMLElement | null;
    setRender(true);
    // double rAF so the enter transition runs from the initial state
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  }, []);

  const closePopup = useCallback(() => {
    setVisible(false);
    setPulse(false);
    window.setTimeout(() => {
      setRender(false);
      lastFocused.current?.focus?.();
    }, CLOSE_ANIM_MS);
  }, []);

  // ---- trigger: 8s timer OR exit-intent ----------------------------------
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = window.setTimeout(openPopup, SHOW_DELAY_MS);
    const onMouseOut = (e: MouseEvent) => {
      // mouse left the viewport through the top edge
      if (e.clientY <= 0 && !e.relatedTarget) openPopup();
    };
    document.addEventListener("mouseout", onMouseOut);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [openPopup]);

  // ---- while open: scroll lock, Esc, focus trap, CTA pulse ---------------
  useEffect(() => {
    if (!render) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePopup();
        return;
      }
      if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);

    // move focus into the dialog
    closeBtnRef.current?.focus();

    // subtle one-shot CTA pulse 1.5s after opening
    const pulseTimer = window.setTimeout(() => setPulse(true), 1500);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(pulseTimer);
    };
  }, [render, closePopup]);

  if (!render) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4"
      onClick={closePopup}
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/55 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity ${visible ? 250 : CLOSE_ANIM_MS}ms ease-out`,
        }}
      />

      {/* Popup — house frame */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="inspection-popup-headline"
        onClick={(e) => e.stopPropagation()}
        className="relative w-[90vw] max-w-[360px] md:max-w-[480px] ease-out"
        style={{
          aspectRatio: "1612 / 1692",
          opacity: visible ? 1 : 0,
          transform: visible
            ? "scale(1) translateY(0)"
            : "scale(0.92) translateY(12px)",
          transition: `opacity ${visible ? 350 : CLOSE_ANIM_MS}ms ease-out, transform ${
            visible ? 350 : CLOSE_ANIM_MS
          }ms ease-out`,
          transitionDelay: visible ? "80ms" : "0ms",
        }}
      >
        {/* Frame image — lazy, never blocks LCP */}
        <Image
          src="/images/popup-frame.png"
          alt=""
          fill
          priority={false}
          sizes="(max-width: 768px) 88vw, 480px"
          className="object-contain select-none pointer-events-none"
        />

        {/* Close button — over the navy roof, 44x44 tap target */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={closePopup}
          aria-label="Close popup"
          className="absolute top-[6%] right-[6%] z-20 flex h-11 w-11 items-center
                     justify-center text-white transition-transform hover:scale-110
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <svg
            className="h-6 w-6 drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 6l12 12M18 6L6 18"
            />
          </svg>
        </button>

        {/* Content — stacked inside the white shingle interior.
            Inset box is measured against the frame: white interior is
            ~18.5-83% wide and the full-width rectangle runs ~38-86.5%
            of the image height. The box stays safely inside that. */}
        <div
          className="absolute z-10 flex flex-col items-center justify-center text-center"
          style={{ top: "37%", left: "22%", right: "22%", bottom: "14%" }}
        >
          <h2
            id="inspection-popup-headline"
            className="w-full text-[22px] md:text-[30px] font-extrabold leading-tight text-brand-dark"
          >
            Free Roof Inspection.
          </h2>

          <p className="mt-1 w-full text-[15px] md:text-[19px] font-semibold leading-snug text-brand-red">
            Same-Day Quote.
          </p>

          <p className="mt-1.5 w-full text-[12px] md:text-[14px] font-semibold leading-snug text-[#2a2a2a]">
            Full photo report. No pressure. Licensed pros.
          </p>

          <Link
            href="/contact?source=popup-inspection"
            data-source="popup"
            onClick={closePopup}
            className={`mt-2.5 flex w-full items-center justify-center gap-1.5
                        rounded-md bg-brand-dark px-3 py-2.5 md:py-3.5 text-[13px] md:text-[15px]
                        font-bold text-white transition-colors duration-200
                        hover:bg-brand-red active:bg-brand-red
                        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark
                        ${pulse ? "animate-cta-pulse" : ""}`}
          >
            Book Free Inspection
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 12h14M13 6l6 6-6 6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
