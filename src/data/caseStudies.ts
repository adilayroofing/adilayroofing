// Case studies for the home-page carousel and the /case-studies hub page.
// ONLY projects with a dedicated written-up
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
import { fishtownImg, FISHTOWN_SHOWCASE_ID } from "@/data/fishtownProject";

export type CaseStudyCategoryId =
  | "flat-roofing"
  | "roof-replacement"
  | "roof-repair"
  | "siding-exterior";

export interface CaseStudyCategory {
  id: CaseStudyCategoryId;
  label: string;
  heading: string;
  intro: string;
  serviceHref: string;
  serviceLabel: string;
}

/** Section order on /case-studies. Empty categories are skipped. */
export const caseStudyCategories: CaseStudyCategory[] = [
  {
    id: "flat-roofing",
    label: "Flat Roofing",
    heading: "Flat Roof Case Studies",
    intro:
      "Flat roofs cover most Philadelphia rowhomes — and they fail the same ways: ponding water, cracked coatings, and open seams at walls and pipes. These projects replaced tired flat roofs with fully sealed TPO and GAF torch-down systems.",
    serviceHref: "/services/flat-roofing",
    serviceLabel: "Flat roofing services",
  },
  {
    id: "roof-replacement",
    label: "Roof Replacement",
    heading: "Roof Replacement Case Studies",
    intro:
      "Full tear-offs down to the deck: rotted sheathing replaced, ice-and-water shield and synthetic underlayment installed, and new GAF architectural shingles finished with proper flashing and ventilation.",
    serviceHref: "/services/roof-replacement",
    serviceLabel: "Roof replacement services",
  },
  {
    id: "roof-repair",
    label: "Roof Repair",
    heading: "Roof Repair Case Studies",
    intro:
      "Not every roof needs replacing. These targeted repairs found the actual leak, fixed it properly, and bought the homeowner years of service for a fraction of a new roof.",
    serviceHref: "/services/roof-repair",
    serviceLabel: "Roof repair services",
  },
  {
    id: "siding-exterior",
    label: "Siding & Exterior",
    heading: "Siding & Exterior Case Studies",
    intro:
      "Siding, trim, and full exterior rebuilds — often paired with new roofing so the whole envelope is sealed at once.",
    serviceHref: "/services/siding-installation",
    serviceLabel: "Siding services",
  },
];

export interface CaseStudy {
  id: string;
  category: CaseStudyCategoryId;
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

const fishtown = gallery("fishtown-flat-roof-recover");
const nlTpo = gallery("northern-liberties-tpo");
const bala = gallery("bala-cynwyd-replacement");
const manayunk = gallery("manayunk-siding-restoration");
const nlRepair = gallery("northern-liberties-repair");
const havertownBefore = havertownCards.find((c) => c.imageId === "main-roof-before")!;
const havertownAfter = havertownCards.find((c) => c.imageId === "main-roof-after")!;

export const caseStudies: CaseStudy[] = [
  {
    id: "fishtown-flat-roof-recover",
    category: "flat-roofing",
    title: "New Flat Roof Re-Cover",
    location: "Fishtown, Philadelphia",
    shortLocation: "Fishtown",
    type: "Flat Roof",
    highlight:
      "599 sq ft of two-ply GAF torch-down membrane, new capping on every edge & sealed penetrations.",
    afterSrc: (w) => fishtownImg("after-main-roof", w),
    afterAlt: fishtown.afterAlt,
    beforeSrc: (w) => fishtownImg("before-main-roof", w),
    beforeAlt: fishtown.beforeAlt,
    href: `/service-areas/fishtown#${FISHTOWN_SHOWCASE_ID}`,
  },
  {
    id: "northern-liberties-tpo",
    category: "flat-roofing",
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
    category: "siding-exterior",
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
    category: "roof-replacement",
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
    category: "roof-replacement",
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
    category: "roof-repair",
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
