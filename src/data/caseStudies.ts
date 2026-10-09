// Home-page case-study carousel. ONLY projects with a dedicated written-up
// story elsewhere on the site belong here (a full showcase section on an area
// page, or a "Recent Project" write-up on a service page) — plain gallery
// sliders don't qualify. Each card deep-links to that write-up.
//
// Newest first. When a new case study ships, add it to the top.

import { cldUrl } from "@/lib/cloudinary";
import { galleryProjects } from "@/data/gallery";
import {
  havertownImg,
  havertownCards,
  HAVERTOWN_SHOWCASE_ID,
} from "@/data/havertownProject";
import { nolibsImg, NOLIBS_SHOWCASE_ID } from "@/data/northernLibertiesProject";
import { manayunkImg, MANAYUNK_SHOWCASE_ID } from "@/data/manayunkProject";

export interface CaseStudy {
  id: string;
  title: string;
  location: string;
  /** Compact location for the narrow mobile cards. */
  shortLocation: string;
  /** Short type chip shown on the photo, e.g. "TPO Flat Roof". */
  type: string;
  /** One-line key result shown under the title. */
  highlight: string;
  /** Builds a Cloudinary URL for the given delivery width. */
  afterSrc: (width: number) => string;
  afterAlt: string;
  beforeSrc: (width: number) => string;
  beforeAlt: string;
  /** Label on the small inset photo — "Before" unless it's a mid-job shot. */
  beforeLabel?: string;
  /** CSS object-position for the AFTER cover photo. */
  afterPosition?: string;
  /** Deep link to the full write-up (with #anchor). */
  href: string;
}

const gallery = (id: string) => {
  const project = galleryProjects.find((p) => p.id === id);
  if (!project) throw new Error(`caseStudies: gallery project "${id}" not found`);
  return project;
};

const fromLocal = (path: string) => (width: number) => cldUrl(path, { width });

const nlTpo = gallery("northern-liberties-tpo");
const bala = gallery("bala-cynwyd-replacement");
const manayunk = gallery("manayunk-siding-restoration");
const nlRepair = gallery("northern-liberties-repair");
const havertownBefore = havertownCards.find((c) => c.imageId === "main-roof-before")!;
const havertownAfter = havertownCards.find((c) => c.imageId === "main-roof-after")!;

export const caseStudies: CaseStudy[] = [
  {
    id: "northern-liberties-tpo",
    title: "Full TPO Flat Roof Replacement",
    location: "Northern Liberties, Philadelphia",
    shortLocation: "Northern Liberties",
    type: "TPO Flat Roof",
    highlight:
      "1,043 sq ft rebuilt from the framing up — new roof walls, decking, PolyISO & sealed TPO.",
    afterSrc: (w) => nolibsImg("after-wide", w),
    afterAlt: nlTpo.afterAlt,
    beforeSrc: (w) => nolibsImg("before-wide", w),
    beforeAlt: nlTpo.beforeAlt,
    href: `/service-areas/northern-liberties#${NOLIBS_SHOWCASE_ID}`,
  },
  {
    id: "manayunk-siding-restoration",
    title: "Full Exterior Restoration",
    location: "Manayunk, Philadelphia",
    shortLocation: "Manayunk",
    type: "Siding + Roofing",
    highlight:
      "Black Walnut cedar-look siding, new GAF roofs, a rebuilt rear addition & a Trex roof deck.",
    afterSrc: (w) => manayunkImg("after-front", w),
    afterAlt: manayunk.afterAlt,
    beforeSrc: (w) => manayunkImg("before-front", w),
    beforeAlt: manayunk.beforeAlt,
    href: `/service-areas/manayunk#${MANAYUNK_SHOWCASE_ID}`,
  },
  {
    id: "havertown-replacement",
    title: "Full Roof Replacement",
    location: "Havertown, PA",
    shortLocation: "Havertown, PA",
    type: "Shingle + EPDM",
    highlight:
      "2,963 sq ft tear-off — new GAF shingles, EPDM flat roof & metal chimney cover.",
    afterSrc: (w) => havertownImg("main-roof-after", w),
    afterAlt: havertownAfter.alt,
    beforeSrc: (w) => havertownImg("main-roof-before", w),
    beforeAlt: havertownBefore.alt,
    afterPosition: "center top",
    href: `/service-areas/havertown#${HAVERTOWN_SHOWCASE_ID}`,
  },
  {
    id: "bala-cynwyd-replacement",
    title: "Main Line Roof Replacement",
    location: "Bala Cynwyd, PA",
    shortLocation: "Bala Cynwyd, PA",
    type: "Shingle Roof",
    highlight:
      "GAF Timberline HDZ in Oyster Grey, new black gutters & wrapped attic bay windows.",
    afterSrc: fromLocal(bala.afterImage),
    afterAlt: bala.afterAlt,
    beforeSrc: fromLocal(bala.beforeImage),
    beforeAlt: bala.beforeAlt,
    href: "/services/roof-replacement#recent-project",
  },
  {
    id: "northern-liberties-repair",
    title: "Fiberglass Flat Roof Repair",
    location: "Northern Liberties, Philadelphia",
    shortLocation: "Northern Liberties",
    type: "Roof Repair",
    highlight:
      "Cracks sealed in three sections, silicone elastomeric coating & a waterproofed stucco wall.",
    afterSrc: fromLocal(nlRepair.afterImage),
    afterAlt: nlRepair.afterAlt,
    beforeSrc: fromLocal(nlRepair.beforeImage),
    beforeAlt: nlRepair.beforeAlt,
    beforeLabel: "During",
    href: "/services/roof-repair#recent-project",
  },
];
