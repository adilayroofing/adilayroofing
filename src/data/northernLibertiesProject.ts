// Northern Liberties, Philadelphia — full TPO flat roof replacement on a
// third-floor main roof, 2026. Case-study content for
// /service-areas/northern-liberties (rendered by <ProjectCaseStudy />), the
// home-page case-study carousel, and the gallery entry.
//
// Photos are served from Cloudinary folder adilay/projects/northern-liberties-tpo
// (uploaded 2026-10-09). The during/after originals are 450×600 — srcset tops
// out at their native size via c_limit (no upscaling).

import type { CaseStudyCard, ProjectCaseStudyData } from "@/components/ProjectCaseStudy";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "dqj9hdrda";
const PROJECT_FOLDER = "adilay/projects/northern-liberties-tpo";

export function nolibsImg(id: string, width?: number): string {
  const transforms = ["f_auto", "q_auto"];
  if (width) transforms.push(`w_${width}`, "c_limit");
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms.join(",")}/${PROJECT_FOLDER}/${id}`;
}

// Cards in scroll order — a three-act case study:
// failing membrane → rebuild (wall, deck, insulation) → finished TPO.
const nolibsCards: CaseStudyCard[] = [
  {
    kind: "before",
    imageId: "before-wide",
    caption:
      "The old TPO membrane — coating worn through, seams failing across the whole third-floor roof.",
    alt: "Failing TPO flat roof membrane with worn coating before replacement in Northern Liberties Philadelphia",
    width: 840,
    height: 1120,
  },
  {
    kind: "before",
    imageId: "before-parapet",
    caption:
      "At the roof walls the deterioration ran into the framing underneath — water was getting past the membrane.",
    alt: "Deteriorated flat roof and parapet wall before TPO replacement in Northern Liberties Philadelphia",
    width: 960,
    height: 1280,
  },
  {
    kind: "during",
    imageId: "during-roof-wall",
    caption:
      "Day one: the crew strips the roof and rebuilds 135 sq ft of damaged roof-wall framing with new 2×4s and 3/4″ plywood.",
    alt: "Adilay Roofing crew rebuilding flat roof wall framing with new plywood sheathing in Northern Liberties Philadelphia",
    width: 450,
    height: 600,
  },
  {
    kind: "during",
    imageId: "during-decking",
    caption:
      "New 1/2″ plywood decking goes down over the full 1,043 sq ft roof — a solid base instead of patches.",
    alt: "New plywood roof decking installed during flat roof replacement in Northern Liberties Philadelphia",
    width: 450,
    height: 600,
  },
  {
    kind: "during",
    imageId: "during-insulation",
    caption:
      "2″ PolyISO insulation board, mechanically fastened — energy efficiency the old roof never had.",
    alt: "PolyISO insulation board fastened over flat roof deck during TPO installation in Northern Liberties Philadelphia",
    width: 450,
    height: 600,
  },
  {
    kind: "after",
    imageId: "after-capping",
    caption:
      "The new TPO membrane wraps the roof walls, with 106 linear ft of new white aluminum capping sealing every edge.",
    alt: "New white TPO membrane and aluminum capping along flat roof edge after replacement in Northern Liberties Philadelphia",
    width: 450,
    height: 600,
  },
  {
    kind: "after",
    imageId: "after-wide",
    caption:
      "The finished roof: 1,043 sq ft of fully sealed, reflective TPO — watertight from deck to parapet.",
    alt: "Completed white TPO flat roof replacement with sealed seams in Northern Liberties Philadelphia by Adilay Roofing",
    width: 450,
    height: 600,
  },
];

const nolibsStats = [
  { value: "1,043 sq ft", label: "New TPO roof system" },
  { value: "135 sq ft", label: "Roof wall rebuilt" },
  { value: "2″ PolyISO", label: "New insulation" },
  { value: "106 lin ft", label: "Aluminum capping" },
  { value: "Fall 2026", label: "Completed" },
];

const nolibsScope = [
  "Removed and disposed of the damaged TPO membrane from the third-floor main roof and roof-wall areas — 1,043 sq ft",
  "Rebuilt 135 sq ft of damaged roof-wall framing with new 2×4 studs and 3/4″ exterior-grade plywood sheathing",
  'New 1/2" plywood decking over the main roof and wall areas — 1,043 sq ft',
  "New 2″ PolyISO insulation board across the full flat roof",
  "New TPO membrane with all seams, penetrations, and terminations sealed to manufacturer spec",
  "New white aluminum capping and TPO-wrapped wall edges — 106 linear ft of watertight perimeter",
  "Full debris removal and broom-clean finish",
];

const nolibsSchemaImages = [
  nolibsImg("after-wide", 1600),
  nolibsImg("after-capping", 1600),
  nolibsImg("during-insulation", 1600),
  nolibsImg("before-wide", 1600),
];

/** Anchor id of the full section on /service-areas/northern-liberties. */
export const NOLIBS_SHOWCASE_ID = "northern-liberties-project";

export const nolibsCaseStudy: ProjectCaseStudyData = {
  id: NOLIBS_SHOWCASE_ID,
  areaSlug: "northern-liberties",
  eyebrow: "Case Study — Northern Liberties, Philadelphia",
  heading: "Full TPO Flat Roof Replacement in Northern Liberties",
  introHtml:
    'A third-floor flat roof rebuilt from the framing up — new roof walls, decking, insulation, and a fully sealed <a href="/services/flat-roofing">TPO roofing system</a>. Scroll through the build, start to finish.',
  stats: nolibsStats,
  cards: nolibsCards,
  scope: nolibsScope,
  cta: {
    heading: "Flat roof past its prime?",
    text: "Get a free flat-roof assessment — no pressure, no obligation. Serving Northern Liberties, Fishtown, Kensington & all of Philadelphia.",
  },
  img: nolibsImg,
  schemaImages: nolibsSchemaImages,
};
