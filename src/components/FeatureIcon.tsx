/**
 * FeatureIcon — small SVG icon library used by service page visual
 * sections (material cards, icon callouts). Heroicons-style strokes,
 * sized via parent className. Adding a new icon: add a key + path here,
 * type it in src/data/services.ts.
 */

import type { CalloutIconKey, MaterialIconKey } from "@/data/services";

type IconKey = CalloutIconKey | MaterialIconKey;

const PATHS: Record<IconKey, React.ReactNode> = {
  // ── material icons ──
  shingle: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M3 10l3-3 3 3 3-3 3 3 3-3 3 3M3 14l3-3 3 3 3-3 3 3 3-3 3 3M3 18l3-3 3 3 3-3 3 3 3-3 3 3"
    />
  ),
  designer: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M12 3l4 6h-8l4-6zm-5 8h10l-5 10-5-10z"
    />
  ),
  metal: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M3 21V8l9-5 9 5v13M7 21V11M12 21V11M17 21V11M3 21h18"
    />
  ),
  flat: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M3 18h18M5 18V8l7-4 7 4v10"
    />
  ),
  tile: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M4 6h6v6H4zM14 6h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"
    />
  ),
  chimney: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M3 20h18M5 20V12l7-5 7 5v8M14 7V4h4v6M9 14h6M9 17h6"
    />
  ),
  vent: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M3 20h18M6 20V11l3-3h6l3 3v9M9 8V5h6v3M10 12h4M10 15h4"
    />
  ),
  drop: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M12 3c-2.5 4-6 8-6 12a6 6 0 0012 0c0-4-3.5-8-6-12z"
    />
  ),

  // ── callout icons ──
  snowflake: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07M7 5l5 2 5-2M7 19l5-2 5 2M5 7l2 5-2 5M19 7l-2 5 2 5"
    />
  ),
  "row-homes": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M3 21V10l4-4v15M9 21V8l4-4v17M15 21V10l4-4v15M3 21h18M7 12h.01M7 16h.01M13 10h.01M13 14h.01M13 18h.01M17 12h.01M17 16h.01"
    />
  ),
  historic: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M3 21h18M5 21V10l7-6 7 6v11M9 21v-7h6v7M8 10h8"
    />
  ),
  permit: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M9 12h6m-6 4h4m4-9V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2h8a2 2 0 002-2v-4M16 3v4h4"
    />
  ),
  storm: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M3 15a4 4 0 014-4 5 5 0 019.6-1.4A4 4 0 0117 17H7a4 4 0 01-4-2zM11 17l-2 4M14 17l-2 4"
    />
  ),
  shield: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
    />
  ),
};

interface FeatureIconProps {
  name: IconKey;
  className?: string;
}

export default function FeatureIcon({ name, className = "w-6 h-6" }: FeatureIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
