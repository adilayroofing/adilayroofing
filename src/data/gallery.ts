export interface GalleryProject {
  id: string;
  title: string;
  category: string; // matches service slugs
  description: string;
  location: string;
  beforeImage?: string; // path like "/images/gallery/project-1-before.jpg"
  afterImage?: string; // path like "/images/gallery/project-1-after.jpg"
}

export const galleryCategories = [
  { label: "All", value: "all" },
  { label: "Roof Replacement", value: "roof-replacement" },
  { label: "Roof Repair", value: "roof-repair" },
  { label: "Flat Roofing", value: "flat-roofing" },
  { label: "Shingle Roofing", value: "shingle-roofing" },
  { label: "Siding", value: "siding" },
  { label: "Gutters", value: "gutters" },
];

export const galleryProjects: GalleryProject[] = [
  {
    id: "project-1",
    title: "Complete Roof Replacement",
    category: "roof-replacement",
    description:
      "Full tear-off and replacement with 50-year architectural shingles. Included new ice barrier, underlayment, and flashing throughout.",
    location: "Philadelphia, PA",
    beforeImage: "/images/before-after-6-before.png",
    afterImage: "/images/before-after-6-after.png",
  },
  {
    id: "project-2",
    title: "Flat Roof EPDM Installation",
    category: "flat-roofing",
    description:
      "EPDM rubber membrane installation on a Philadelphia row home flat roof. Full tear-off, new decking, and sealed membrane with proper drainage.",
    location: "Philadelphia, PA",
    beforeImage: "/images/before-after-4-before.jpg",
    afterImage: "/images/before-after-4-after.jpg",
  },
  {
    id: "project-3",
    title: "Storm Damage Repair",
    category: "roof-repair",
    description:
      "Emergency roof repair after severe storm damage. Replaced damaged shingles, repaired decking, and restored full weatherproofing.",
    location: "Montgomery County, PA",
    beforeImage: "/images/before-after-2-before.jpg",
    afterImage: "/images/before-after-2-after.jpg",
  },
  {
    id: "project-4",
    title: "Vinyl Siding Installation",
    category: "siding",
    description:
      "Complete vinyl siding installation on a Philadelphia row home. Removed old siding, installed house wrap and premium vinyl with clean trim detail.",
    location: "Philadelphia, PA",
    beforeImage: "/images/before-after-5-before.jpg",
    afterImage: "/images/before-after-5-after.jpg",
  },
  {
    id: "project-5",
    title: "Shingle Roof & Gutter System",
    category: "shingle-roofing",
    description:
      "New architectural shingle roof with seamless aluminum gutter system. Included custom downspouts and gutter guards.",
    location: "Chester County, PA",
    beforeImage: "/images/before-after-1-before.jpg",
    afterImage: "/images/before-after-1-after.jpg",
  },
  {
    id: "project-6",
    title: "Gutter Replacement & Guards",
    category: "gutters",
    description:
      "Removed old, damaged gutters and installed new seamless aluminum system with leaf guards to prevent clogging.",
    location: "Bucks County, PA",
  },
  {
    id: "project-7",
    title: "Flat Roof Membrane Replacement",
    category: "flat-roofing",
    description:
      "Complete flat roof membrane replacement on a commercial property. Installed new EPDM membrane with improved drainage and sealed all penetrations.",
    location: "Philadelphia, PA",
    beforeImage: "/images/before-after-3-before.jpg",
    afterImage: "/images/before-after-3-after.jpg",
  },
  {
    id: "project-8",
    title: "Historic Home Restoration",
    category: "roof-replacement",
    description:
      "Careful roof replacement on a 100-year-old home. Removed layers of old roofing, repaired all decking, and installed modern shingles while preserving character.",
    location: "Philadelphia, PA",
  },
  {
    id: "project-9",
    title: "Leak Repair & Prevention",
    category: "roof-repair",
    description:
      "Diagnosed and repaired persistent leak caused by faulty flashing. Installed new step flashing and sealed all vulnerable areas.",
    location: "Bucks County, PA",
  },
];
