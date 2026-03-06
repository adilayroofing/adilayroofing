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

// Placeholder projects — replace images when ready
export const galleryProjects: GalleryProject[] = [
  {
    id: "project-1",
    title: "Complete Roof Replacement",
    category: "roof-replacement",
    description:
      "Full tear-off and replacement with 50-year architectural shingles. Included new ice barrier, underlayment, and flashing throughout.",
    location: "Philadelphia, PA",
  },
  {
    id: "project-2",
    title: "Flat Roof Installation",
    category: "flat-roofing",
    description:
      "Torch-down flat roof system installed on a multi-unit residential building. Sealed all seams and added proper drainage.",
    location: "Bucks County, PA",
  },
  {
    id: "project-3",
    title: "Storm Damage Repair",
    category: "roof-repair",
    description:
      "Emergency roof repair after severe storm damage. Replaced damaged shingles, repaired decking, and restored full weatherproofing.",
    location: "Montgomery County, PA",
  },
  {
    id: "project-4",
    title: "Vinyl Siding Installation",
    category: "siding",
    description:
      "Complete siding replacement on a two-story colonial home. Upgraded to premium vinyl with insulated backing for energy efficiency.",
    location: "Delaware County, PA",
  },
  {
    id: "project-5",
    title: "Shingle Roof & Gutter System",
    category: "shingle-roofing",
    description:
      "New architectural shingle roof with seamless aluminum gutter system. Included custom downspouts and gutter guards.",
    location: "Chester County, PA",
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
    title: "Multi-Roof Commercial Project",
    category: "flat-roofing",
    description:
      "Four flat roofs replaced on a commercial property. Included EPDM membrane and improved drainage systems.",
    location: "Philadelphia, PA",
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
