// Havertown, PA (Delaware County) — full roof replacement, completed July 2026.
// Case-study content for /service-areas/havertown (rendered by
// <ProjectCaseStudy />) and the home-page case-study carousel.
//
// PRIVACY: the job address must never appear on the site. Public copy says
// only "Havertown, PA (Delaware County)" / "a Havertown neighborhood".
//
// Photos are served from Cloudinary folder adilay/projects/havertown-josie
// (uploaded 2026-07-27, originals keep their EXIF data). This folder sits
// outside the site's mirrored /images tree, so URLs are built here directly
// instead of going through lib/cloudinary.ts.

import type { CaseStudyCard, ProjectCaseStudyData } from "@/components/ProjectCaseStudy";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "dqj9hdrda";
const PROJECT_FOLDER = "adilay/projects/havertown-josie";

export function havertownImg(id: string, width?: number): string {
  const transforms = ["f_auto", "q_auto"];
  if (width) transforms.push(`w_${width}`, "c_limit");
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms.join(",")}/${PROJECT_FOLDER}/${id}`;
}

// Cards in scroll order: Before 1 → After 1 → Before 2 → After 2 →
// Before 3 → After 3 → crew finale.
export const havertownCards: CaseStudyCard[] = [
  {
    kind: "before",
    imageId: "main-roof-before",
    caption:
      "Aging shingles and worn ridge caps — a mid-century roof at the end of its life.",
    alt: "Aging asphalt shingle roof with worn ridge caps before full replacement in Havertown PA",
    width: 675,
    height: 900,
  },
  {
    kind: "after",
    imageId: "main-roof-after",
    caption:
      "Same view after tear-off to the deck: new GAF architectural shingles, ridge caps, and ridge vent.",
    alt: "New GAF shingle roof after full replacement in Havertown PA — same ridge view",
    width: 1200,
    height: 1600,
  },
  {
    kind: "before",
    imageId: "flat-roof-before",
    caption:
      "The flat roof: a patched, painted-over membrane that kept letting water through.",
    alt: "Worn flat roof membrane with painted patches before EPDM replacement in Havertown PA",
    width: 675,
    height: 900,
  },
  {
    kind: "after",
    imageId: "flat-roof-after",
    caption:
      "New EPDM rubber membrane on fresh 3/4″ plywood, with clean aluminum edge flashing.",
    alt: "New EPDM flat roof membrane after replacement in Havertown PA",
    width: 1200,
    height: 1600,
  },
  {
    kind: "before",
    imageId: "chimney-before",
    caption:
      "Failing brick chimney flashing — a classic slow-leak entry point.",
    alt: "Deteriorated chimney flashing before roof replacement in Havertown PA",
    width: 675,
    height: 900,
  },
  {
    kind: "after",
    imageId: "chimney-after",
    caption:
      "Rebuilt flashing and a new metal chimney cover seal it for good.",
    alt: "Brick chimney with new metal cover and flashing after roof replacement in Havertown PA",
    width: 1200,
    height: 1600,
  },
  {
    kind: "crew",
    imageId: "crew-installing-shingles",
    caption:
      "The Adilay crew installing the new GAF shingle roof in a Havertown neighborhood.",
    alt: "Adilay Roofing crew in branded shirts installing GAF shingles during a roof replacement in Havertown PA",
    width: 1200,
    height: 1600,
  },
];

const havertownStats = [
  { value: "2,963 sq ft", label: "Total tear-off" },
  { value: "2,449 sq ft", label: "New GAF shingle roof" },
  { value: "514 sq ft", label: "New EPDM flat roof" },
  { value: "304 lin ft", label: "New edge flashing" },
  { value: "July 2026", label: "Completed" },
];

const havertownScope = [
  "Removed old damaged shingles & EPDM membrane from main and flat roofs — 2,963 sq ft",
  'New 1/2" plywood + GAF synthetic underlayment on main roof — 2,449 sq ft',
  'New 3/4" plywood on flat roof — 514 sq ft',
  "New white aluminum flashing & ice shield on 304 linear ft of edges",
  "New GAF asphalt shingles (customer-selected color)",
  "New EPDM membrane & aluminum flashing brackets on flat roof",
  "New metal chimney cover",
  "Full debris removal",
];

const havertownSchemaImages = [
  havertownImg("main-roof-after", 1600),
  havertownImg("flat-roof-after", 1600),
  havertownImg("chimney-after", 1600),
  havertownImg("crew-installing-shingles", 1600),
];

const havertownOgImage = havertownImg("havertown-collage-og", 1600);

/** Anchor id of the full section on /service-areas/havertown. */
export const HAVERTOWN_SHOWCASE_ID = "havertown-project";

export const havertownCaseStudy: ProjectCaseStudyData = {
  id: HAVERTOWN_SHOWCASE_ID,
  areaSlug: "havertown",
  eyebrow: "Project Showcase — Delaware County",
  heading: "Full Roof Replacement in Havertown, PA",
  introHtml:
    "An aging shingle roof and a worn flat roof, replaced down to the deck in a Havertown neighborhood. Scroll through the befores and afters.",
  stats: havertownStats,
  cards: havertownCards,
  scope: havertownScope,
  cta: {
    heading: "Is your roof next?",
    text: "Get a free roof assessment — no pressure, no obligation. Serving Havertown, Broomall, Drexel Hill, Springfield & all of Delaware County.",
  },
  img: havertownImg,
  schemaImages: havertownSchemaImages,
  ogImage: havertownOgImage,
};
