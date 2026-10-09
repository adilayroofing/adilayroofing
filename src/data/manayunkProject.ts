// Manayunk, Philadelphia — full exterior restoration of a three-story stone
// rowhome, done in phases June–fall 2026 (siding & rear roof, third-floor
// roof & side bay, rear addition rebuild, roof deck). Case-study content for
// /service-areas/manayunk (rendered by <ProjectCaseStudy />), the home-page
// case-study carousel, the gallery entry, and the siding-repair service page.
//
// PRIVACY: house numbers are pixelated in the uploaded photos and never
// appear in copy. Say only "Manayunk" / "a Manayunk rowhome".
//
// Photos are served from Cloudinary folder adilay/projects/manayunk-facade
// (uploaded 2026-10-09; letterbox bars cropped, metadata stripped).

import type { CaseStudyCard, ProjectCaseStudyData } from "@/components/ProjectCaseStudy";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "dqj9hdrda";
const PROJECT_FOLDER = "adilay/projects/manayunk-facade";

export function manayunkImg(id: string, width?: number): string {
  const transforms = ["f_auto", "q_auto"];
  if (width) transforms.push(`w_${width}`, "c_limit");
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms.join(",")}/${PROJECT_FOLDER}/${id}`;
}

// BEFORE (front, side bay, rear) → DURING → AFTER in the same order, then
// the new roof deck as the finale.
const manayunkCards: CaseStudyCard[] = [
  {
    kind: "before",
    imageId: "before-front",
    caption:
      "The street view: weathered gray paint, a fish-scale slate third floor, and a tired porch on a classic Manayunk stone rowhome.",
    alt: "Weathered front facade with fish-scale slate third floor and peeling gray paint on a Manayunk Philadelphia rowhome before exterior restoration",
    width: 955,
    height: 1237,
  },
  {
    kind: "before",
    imageId: "before-side-bay",
    caption:
      "The second-floor side bay: scalloped siding broken at the corners, with water working in behind the courses.",
    alt: "Broken scalloped fish-scale siding on a second-floor side bay before siding replacement in Manayunk Philadelphia",
    width: 1536,
    height: 2048,
  },
  {
    kind: "before",
    imageId: "before-rear",
    caption:
      "Out back: worn siding on the rear addition, a dated single door and window, and old wooden steps.",
    alt: "Rear addition with worn siding, an old single door, and wooden steps before renovation in Manayunk Philadelphia",
    width: 955,
    height: 1268,
  },
  {
    kind: "during",
    imageId: "during-front-scaffold",
    caption:
      "Mid-project: the front already wears its new cedar-look siding and white trim while scaffold climbs the side of the house.",
    alt: "Adilay Roofing scaffolding along the side of a Manayunk rowhome during siding replacement, with the front facade already re-clad",
    width: 1200,
    height: 1600,
  },
  {
    kind: "during",
    imageId: "during-alley-crew",
    caption:
      "Manayunk's narrow walkways mean scaffold, not ladders — the crew re-clads the side bay while materials come in by hand.",
    alt: "Adilay Roofing crew on scaffolding installing new siding on a side bay in a narrow Manayunk walkway",
    width: 1200,
    height: 1600,
  },
  {
    kind: "after",
    imageId: "after-front",
    caption:
      "The finished front: Black Walnut cedar-look siding on the bay and porch, crisp white trim, and a charcoal-shingled third floor.",
    alt: "Restored Manayunk rowhome front with Black Walnut cedar-look vinyl siding, white trim, and charcoal shingles by Adilay Roofing",
    width: 1800,
    height: 2400,
  },
  {
    kind: "after",
    imageId: "after-side-bay",
    caption:
      "The same side bay, re-sheathed and re-clad in cedar-look vinyl with white aluminum capping around every window.",
    alt: "Side bay re-clad in Black Walnut cedar-look vinyl siding with white aluminum window capping in Manayunk Philadelphia",
    width: 1800,
    height: 2400,
  },
  {
    kind: "after",
    imageId: "after-rear",
    caption:
      "The rebuilt rear addition: reframed walls, a 72″ white French patio door, matching siding, and new stone-faced steps.",
    alt: "Rebuilt rear addition with white French patio door, Black Walnut cedar-look siding, and new stone-faced steps in Manayunk Philadelphia",
    width: 1800,
    height: 2400,
  },
  {
    kind: "after",
    imageId: "after-roof-deck",
    caption:
      "And on top of the addition — a new 132 sq ft Trex roof deck with siding-clad walls, opened up with a new door from the second floor.",
    alt: "New Trex roof deck with cedar-look siding walls on top of a rear addition in Manayunk Philadelphia by Adilay Roofing",
    width: 1800,
    height: 2400,
  },
];

const manayunkStats = [
  { value: "Black Walnut", label: "Cedar-look vinyl siding" },
  { value: "844 sq ft", label: "New GAF flat roofing" },
  { value: "72″ French door", label: "Rear addition rebuilt" },
  { value: "132 sq ft", label: "New Trex roof deck" },
  { value: "4 phases", label: "Completed fall 2026" },
];

const manayunkScope = [
  "Removed the damaged slate tile and fish-scale siding from the rear walls, third floor, and second-floor side bay",
  'New 1/2" plywood sheathing and GAF synthetic underlayment behind all new siding',
  "Cedar-look vinyl siding in Black Walnut with white trim and white aluminum window capping — front bay and porch, side bay, rear walls, and addition",
  "GAF Timberline 3D shingles in Charcoal on the third-floor walls",
  "GAF torch-down granulated membrane on the main, back, dormer, and addition flat roofs, with new white aluminum flashing and capping on every edge",
  'Rear addition rebuilt: old door and windows removed, walls reframed with 3/4" sheathing and insulation, a new 72″ × 80″ white French patio door, and a new side window',
  "New cement steps with stacked-stone facing at the French doors",
  "132 sq ft roof deck on the addition: pressure-treated 2×8 framing, Trex decking, siding-clad perimeter walls, and a new door from the second floor",
  "Full debris removal after every phase",
];

/** Anchor id of the full section on /service-areas/manayunk. */
export const MANAYUNK_SHOWCASE_ID = "manayunk-project";

export const manayunkCaseStudy: ProjectCaseStudyData = {
  id: MANAYUNK_SHOWCASE_ID,
  areaSlug: "manayunk",
  eyebrow: "Case Study — Manayunk, Philadelphia",
  heading: "Full Exterior Restoration on a Manayunk Rowhome",
  introHtml:
    'A three-story stone rowhome on Manayunk\'s hill, restored front to back: failing fish-scale siding replaced with cedar-look <a href="/services/siding-installation">vinyl siding</a>, new <a href="/services/flat-roofing">flat roofs</a>, a rebuilt rear addition with French doors, and a brand-new roof deck. Scroll through it, start to finish.',
  stats: manayunkStats,
  cards: manayunkCards,
  scope: manayunkScope,
  cta: {
    heading: "Siding or roof showing its age?",
    text: "Get a free exterior assessment — no pressure, no obligation. Serving Manayunk, Roxborough, East Falls & all of Philadelphia.",
  },
  img: manayunkImg,
  schemaImages: [
    manayunkImg("after-front", 1600),
    manayunkImg("after-rear", 1600),
    manayunkImg("after-side-bay", 1600),
    manayunkImg("after-roof-deck", 1600),
  ],
};
