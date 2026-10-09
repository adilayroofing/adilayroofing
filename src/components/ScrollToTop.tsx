"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// How long after navigation we keep re-aligning a #hash target while content
// above it (fonts, client widgets, lazy media) finishes changing height.
const SETTLE_MS = 2500;

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Deep links like /service-areas/havertown#havertown-project must land on
    // that section, not the top of the page.
    const hash = decodeURIComponent(window.location.hash.slice(1));
    const target = hash ? document.getElementById(hash) : null;
    if (!target) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    // Offset by the sticky header's live height (it differs by breakpoint)
    // plus a little breathing room, so the section heading isn't hidden
    // underneath it.
    const jump = () => {
      const headerHeight =
        document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
      const top =
        target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
      window.scrollTo({ top, behavior: "instant" });
    };
    jump();

    // Re-align on every layout change until the page settles — but stop the
    // moment the visitor scrolls on their own.
    const observer = new ResizeObserver(jump);
    observer.observe(document.body);
    const userInput = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    const stop = () => {
      observer.disconnect();
      userInput.forEach((type) => window.removeEventListener(type, stop));
    };
    userInput.forEach((type) =>
      window.addEventListener(type, stop, { passive: true })
    );
    const timer = window.setTimeout(stop, SETTLE_MS);

    return () => {
      window.clearTimeout(timer);
      stop();
    };
  }, [pathname]);

  return null;
}
