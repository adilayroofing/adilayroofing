// Fishtown, Philadelphia — new flat roof (re-cover) on a corner rowhome,
// completed October 2026. Case-study content for /service-areas/fishtown
// (rendered by <ProjectCaseStudy />), the home-page case-study carousel, and
// the gallery entry.
//
// Before photos are drone frames (16:9); after photos were shot on the roof,
// so pairs are matched by subject and vantage point rather than pixel-for-
// pixel. No house numbers or plates are visible in any chosen photo.
//
// Photos are served from Cloudinary folder adilay/projects/fishtown-flat-roof
// (uploaded 2026-10-09; metadata stripped).

import type { CaseStudyCard, ProjectCaseStudyData } from "@/components/ProjectCaseStudy";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "dqj9hdrda";
const PROJECT_FOLDER = "adilay/projects/fishtown-flat-roof";

export function fishtownImg(id: string, width?: number): string {
  const transforms = ["f_auto", "q_auto"];
  if (width) transforms.push(`w_${width}`, "c_limit");
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms.join(",")}/${PROJECT_FOLDER}/${id}`;
}

// Before → After pairs, then the whole finished roof as the finale.
const fishtownCards: CaseStudyCard[] = [
  {
    kind: "before",
    imageId: "before-main-roof",
    caption:
      "The main roof from the rear corner: a worn, patched coating with water ponding around the vents.",
    alt: "Worn patched flat roof with ponding water before GAF torch-down re-cover on a Fishtown Philadelphia rowhome",
    width: 1280,
    height: 720,
  },
  {
    kind: "after",
    imageId: "after-main-roof",
    caption:
      "Same corner after: a new two-ply GAF granulated membrane torch-welded at every seam, with new white aluminum capping along the back wall.",
    alt: "New GAF granulated torch-down flat roof with white aluminum capping on the rear wall of a Fishtown Philadelphia rowhome",
    width: 1800,
    height: 2400,
  },
  {
    kind: "before",
    imageId: "before-stack-pipe",
    caption:
      "Standing water around the stack pipe and vent — the low spots where a tired flat roof starts to leak.",
    alt: "Standing water around a stack pipe and roof vent on an aging flat roof in Fishtown Philadelphia",
    width: 1280,
    height: 720,
  },
  {
    kind: "after",
    imageId: "after-stack-pipe",
    caption:
      "Re-covered and re-flashed: the stack pipe and vent sealed into the new membrane.",
    alt: "Stack pipe and vent sealed into a new GAF torch-down membrane on a Fishtown Philadelphia flat roof",
    width: 1800,
    height: 2400,
  },
  {
    kind: "before",
    imageId: "before-vent-detail",
    caption:
      "Up close: cracked coating and open patches around the roof penetrations.",
    alt: "Cracked flat roof coating and open patches around roof penetrations before re-cover in Fishtown Philadelphia",
    width: 1120,
    height: 630,
  },
  {
    kind: "after",
    imageId: "after-vent-detail",
    caption:
      "Sealed tight: new membrane around the vent, and the chimney base wrapped in the same granulated cap sheet.",
    alt: "Roof vent sealed into new granulated membrane with the chimney base wrapped on a Fishtown Philadelphia flat roof",
    width: 1800,
    height: 2400,
  },
  {
    kind: "before",
    imageId: "before-street-parapet",
    caption:
      "The street-side parapet: coating cracked and peeling, with old patches at the corner.",
    alt: "Cracked and peeling coating on a street-side roof parapet before flat roof re-cover in Fishtown Philadelphia",
    width: 1280,
    height: 720,
  },
  {
    kind: "after",
    imageId: "after-street-parapet",
    caption:
      "New white aluminum flashing and capping along the street-side parapet — 135 linear feet around both roofs.",
    alt: "New white aluminum flashing and capping on a street-side parapet over a new flat roof in Fishtown Philadelphia",
    width: 2400,
    height: 1800,
  },
  {
    kind: "after",
    imageId: "after-finished-roof",
    caption:
      "The finished roof: 599 sq ft of fully sealed GAF membrane across the main and lower back roofs.",
    alt: "Completed GAF granulated torch-down flat roof re-cover on a Fishtown Philadelphia rowhome by Adilay Roofing",
    width: 2400,
    height: 1332,
  },
];

const fishtownStats = [
  { value: "599 sq ft", label: "New GAF flat roof" },
  { value: "2-ply", label: "Base + cap sheet" },
  { value: "135 lin ft", label: "New flashing & capping" },
  { value: "2 new", label: '4" drain-pipe boots' },
  { value: "Oct 2026", label: "Completed" },
];

const fishtownScope = [
  "Re-covered the main roof (502 sq ft) and lower back roof (97 sq ft) — 599 sq ft total",
  "Torch-down GAF granulated asphalt membrane: base and cap sheet, torch-welded at all seams for a fully sealed system",
  "Lifted the first course of back-wall siding and capping so the new membrane could be welded up the wall, then reinstalled it",
  "Removed the HVAC condenser from the lower back roof for the new membrane, then reset it",
  "New white aluminum flashing and capping around the edges of both roofs, set in flashing cement and fabric — 135 linear ft",
  'Two new 4" rubber boots on the PVC drain pipes on the main roof',
  "Full debris removal and haul-away",
];

/** Anchor id of the full section on /service-areas/fishtown. */
export const FISHTOWN_SHOWCASE_ID = "fishtown-project";

export const fishtownCaseStudy: ProjectCaseStudyData = {
  id: FISHTOWN_SHOWCASE_ID,
  areaSlug: "fishtown",
  eyebrow: "Case Study — Fishtown, Philadelphia",
  heading: "New Flat Roof Re-Cover in Fishtown",
  introHtml:
    'A Fishtown corner rowhome with a worn, ponding <a href="/services/flat-roofing">flat roof</a> — re-covered with a two-ply GAF torch-down membrane and new aluminum capping on every edge. Scroll through the befores and afters.',
  stats: fishtownStats,
  cards: fishtownCards,
  scope: fishtownScope,
  cta: {
    heading: "Flat roof ponding or patched?",
    text: "Get a free flat-roof assessment — no pressure, no obligation. Serving Fishtown, Northern Liberties, Kensington & all of Philadelphia.",
  },
  img: fishtownImg,
  schemaImages: [
    fishtownImg("after-finished-roof", 1600),
    fishtownImg("after-main-roof", 1600),
    fishtownImg("after-street-parapet", 1600),
    fishtownImg("after-stack-pipe", 1600),
  ],
};
