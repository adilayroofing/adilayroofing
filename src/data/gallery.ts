export interface GalleryProject {
  id: string;
  title: string;
  category: string; // matches service slugs
  /** Short scope summary (~180-260 chars). Written for both readers and
   *  SEO — includes materials + service type where possible. */
  description: string;
  location: string;
  /** Optional service-area slug for a hyperlocal internal link. */
  locationSlug?: string;
  /** Optional related service slug (deep-link to full service page). */
  serviceSlug?: string;
  /** Optional. Materials chip line, e.g. "GAF Timberline HDZ · Ice-and-water
   *  shield · Aluminum drip edge". Short comma or middot list. */
  materials?: string;
  beforeImage: string;
  beforeAlt: string;
  afterImage: string;
  afterAlt: string;
  /** Optional custom object-position for object-cover framing. Defaults to
   *  "center 45%" (biases crop up to keep roof + house visible). */
  objectPosition?: string;
  /** Tailwind aspect class for the slider box. Chosen per-project to
   *  match the source photo aspect so the container fits the image with
   *  no letterbox padding. Portrait 3:4 photos get `aspect-[3/4]`,
   *  Victorian near-square photos get `aspect-[7/6]`, landscape sources
   *  get `aspect-[3/2]`, etc. */
  aspectClass?: string;
}

export const galleryCategories = [
  { label: "All", value: "all" },
  { label: "Roof Replacement", value: "roof-replacement" },
  { label: "Roof Repair", value: "roof-repair" },
  { label: "Flat Roofing", value: "flat-roofing" },
  { label: "Shingle Roofing", value: "shingle-roofing" },
  { label: "Siding", value: "siding" },
];

/**
 * Ordered display list. Category order (Roof Replacement first, then Repair,
 * Flat, Shingle, Siding) doubles as the section grouping on the gallery
 * page, so keep like-categories adjacent.
 */
export const galleryProjects: GalleryProject[] = [
  // ── Roof Replacement ────────────────────────────────────────────────
  {
    id: "bala-cynwyd-replacement",
    title: "Main Line Roof Replacement — Bala Cynwyd",
    category: "roof-replacement",
    location: "Bala Cynwyd, PA 19004",
    locationSlug: "bala-cynwyd",
    serviceSlug: "roof-replacement",
    materials:
      "GAF Timberline HDZ · Ice-and-water shield · Synthetic underlayment · Black aluminum gutters",
    description:
      "Full tear-off and re-roof on a stone Main Line home. New GAF Timberline HDZ architectural shingles in Oyster Grey, ice-and-water shield at eaves and valleys, and new black aluminum gutters — plus vinyl-wrapped attic bay windows to match the exterior.",
    beforeImage: "/images/projects/roof-replacement-bala-cynwyd-before.jpg",
    beforeAlt:
      "Before: aging asphalt shingle roof with worn-out gutters on a Main Line home in Bala Cynwyd, PA 19004 — prior to full tear-off by Adilay Roofing.",
    afterImage: "/images/projects/roof-replacement-bala-cynwyd-after.jpg",
    afterAlt:
      "After: new GAF Timberline 3D architectural shingles in Oyster Grey, black aluminum gutters, and vinyl-wrapped attic bay windows on the same Bala Cynwyd Main Line home — completed by Adilay Roofing.",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: "victorian-replacement",
    title: "Victorian Roof Replacement — Philadelphia",
    category: "roof-replacement",
    location: "Philadelphia, PA",
    serviceSlug: "roof-replacement",
    materials:
      "Architectural shingles · Ice-and-water shield · Synthetic underlayment · New decking",
    description:
      "Full tear-off and re-roof on a Philadelphia Victorian — start to finish in four stages. (1) Full tear-off and new decking. (2) Synthetic underlayment plus ice-and-water shield at eaves, valleys, and penetrations. (3) Architectural shingles installed to manufacturer spec. (4) Completed roof, built to last 30+ years. Victorian and historic homes across Philly are our specialty.",
    beforeImage: "/images/victorian-roof-replacement-philadelphia-before.png",
    beforeAlt:
      "Before: Adilay Roofing crew installing new underlayment and slate-look shingles on a Philadelphia Victorian roof — mid-replacement.",
    afterImage: "/images/victorian-roof-replacement-philadelphia-after.jpg",
    afterAlt:
      "After: completed Victorian roof replacement by Adilay Roofing in Philadelphia — new architectural shingles, turret detail, and full roofline finished.",
    aspectClass: "aspect-[7/6]",
  },
  {
    id: "multi-unit-replacement",
    title: "Multi-Unit Townhouse Roof Replacement",
    category: "roof-replacement",
    location: "Philadelphia, PA",
    serviceSlug: "roof-replacement",
    materials:
      "Architectural shingles · Step flashing · Ridge vent",
    description:
      "Full tear-off and re-roof on a Philadelphia multi-unit townhouse building. Old shingles and underlayment removed, damaged decking replaced, then a new architectural shingle system installed with proper step flashing and ridge ventilation.",
    beforeImage: "/images/before-after-8-before.jpg",
    beforeAlt:
      "Before: worn asphalt shingle roof on a multi-unit Philadelphia townhouse building — end of service life, prior to tear-off by Adilay Roofing.",
    afterImage: "/images/before-after-8-after.jpg",
    afterAlt:
      "After: new architectural shingle roof with clean flashing and ridge vent on the Philadelphia multi-unit townhouse — installed by Adilay Roofing.",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: "shingle-roof-replacement",
    title: "Shingle Roof Replacement — Philadelphia Row Home",
    category: "roof-replacement",
    location: "Philadelphia, PA",
    serviceSlug: "roof-replacement",
    materials:
      "Architectural shingles · Synthetic underlayment · Aluminum drip edge",
    description:
      "Complete tear-off and shingle replacement on a Philadelphia row home. New synthetic underlayment, aluminum drip edge, and architectural shingles installed to manufacturer spec — long-lasting weather protection for a busy city block.",
    beforeImage: "/images/before-after-7-before.jpg",
    beforeAlt:
      "Before: aged asphalt shingle roof on a Philadelphia row home — cupping and granule loss visible, prior to replacement.",
    afterImage: "/images/before-after-7-after.jpg",
    afterAlt:
      "After: brand new architectural shingle roof on the same Philadelphia row home — installed by Adilay Roofing.",
    aspectClass: "aspect-[3/2]",
  },
  {
    id: "historic-home-replacement",
    title: "Historic Home Roof Replacement",
    category: "roof-replacement",
    location: "Philadelphia, PA",
    serviceSlug: "roof-replacement",
    materials:
      "Architectural shingles · Decking repair · Ice-and-water shield",
    description:
      "Careful roof replacement on a Philadelphia home. Multiple layers of old roofing removed, damaged decking repaired, and new architectural shingles installed with ice-and-water shield at every eave, valley, and penetration.",
    beforeImage: "/images/before-after-6-before.png",
    beforeAlt:
      "Before: weathered multi-layer shingle roof on a Philadelphia home — prior to full tear-off and decking repair by Adilay Roofing.",
    afterImage: "/images/before-after-6-after.png",
    afterAlt:
      "After: new architectural shingle roof with clean lines and proper flashing on the same Philadelphia home — completed by Adilay Roofing.",
    aspectClass: "aspect-[4/5]",
  },

  // ── Roof Repair ─────────────────────────────────────────────────────
  {
    id: "northern-liberties-repair",
    title: "Fiberglass Flat Roof Repair — Northern Liberties",
    category: "roof-repair",
    location: "Northern Liberties, Philadelphia",
    locationSlug: "northern-liberties",
    serviceSlug: "roof-repair",
    materials:
      "Flashing cement · Sika polyurethane · Silicone elastomeric coating",
    description:
      "Cracks in three sections of a Northern Liberties fiberglass roof — sealed with flashing cement and Sika polyurethane, then coated with silicone elastomeric to reflect UV and extend service life. Stucco wall patched and waterproofed at the roof-wall transition.",
    beforeImage: "/images/projects/roof-repair-northern-liberties-during.jpg",
    beforeAlt:
      "Northern Liberties Philadelphia rooftop mid-repair — fiberglass roof with cracks along the membrane and wall edge before sealing, by Adilay Roofing.",
    afterImage: "/images/projects/roof-repair-northern-liberties-after.jpg",
    afterAlt:
      "Northern Liberties Philadelphia rooftop after repair — fiberglass membrane sealed with flashing cement and silicone elastomeric coating, stucco wall patched and waterproofed, by Adilay Roofing.",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: "storm-damage-repair",
    title: "Storm Damage Roof Repair",
    category: "roof-repair",
    location: "Montgomery County, PA",
    serviceSlug: "storm-damage-roof-repair",
    materials:
      "Matched architectural shingles · Step flashing · Decking repair",
    description:
      "Emergency repair after a severe storm blew off shingles and exposed the decking. Water-damaged sheathing cut out and replaced, ice-and-water shield installed, and matched shingles woven in so the repair reads seamless against the existing roof.",
    beforeImage: "/images/before-after-2-before.jpg",
    beforeAlt:
      "Before: storm-damaged Montgomery County roof with missing shingles and exposed decking — prior to emergency repair by Adilay Roofing.",
    afterImage: "/images/before-after-2-after.jpg",
    afterAlt:
      "After: matched architectural shingles woven into the storm-damaged Montgomery County roof — repaired by Adilay Roofing.",
    aspectClass: "aspect-[2/3]",
  },
  {
    id: "decking-shingles-repair",
    title: "Roof Decking & Shingle Repair",
    category: "roof-repair",
    location: "Philadelphia, PA",
    serviceSlug: "roof-repair",
    materials:
      "OSB decking · Architectural shingles · Ice-and-water shield",
    description:
      "Section of rotted decking replaced under a leaking Philadelphia roof. New OSB installed with proper spacing, ice-and-water shield laid over the repair area, then new architectural shingles blended into the surrounding field.",
    beforeImage: "/images/before-after-4-before.jpg",
    beforeAlt:
      "Before: rotted roof decking and lifted shingles on a Philadelphia home — prior to repair by Adilay Roofing.",
    afterImage: "/images/before-after-4-after.jpg",
    afterAlt:
      "After: new decking with matched architectural shingles blended into the surrounding roof on the same Philadelphia home — repaired by Adilay Roofing.",
    aspectClass: "aspect-[6/7]",
  },

  // ── Flat Roofing ────────────────────────────────────────────────────
  {
    id: "epdm-flat-roof",
    title: "EPDM Flat Roof — Philadelphia Row Home",
    category: "flat-roofing",
    location: "Philadelphia, PA",
    serviceSlug: "flat-roofing",
    materials:
      "EPDM rubber membrane · Tapered insulation · Sealed penetrations",
    description:
      "New EPDM rubber membrane on a Philadelphia row home flat roof. Old built-up roofing removed, tapered insulation set to promote positive drainage, and a single-ply EPDM installed with fully-sealed seams and penetrations.",
    beforeImage: "/images/before-after-3-before.jpg",
    beforeAlt:
      "Before: cracked built-up flat roof on a Philadelphia row home — ponding water and split seams, prior to EPDM installation by Adilay Roofing.",
    afterImage: "/images/before-after-3-after.jpg",
    afterAlt:
      "After: new EPDM rubber flat roof on the same Philadelphia row home — clean drainage and sealed penetrations, installed by Adilay Roofing.",
    aspectClass: "aspect-[3/4]",
  },

  // ── Shingle Roofing (dedicated shingle category) ────────────────────
  {
    id: "shingle-gutter-system",
    title: "Shingle Roof + Seamless Gutter System",
    category: "shingle-roofing",
    location: "Chester County, PA",
    serviceSlug: "shingle-roofing",
    materials:
      "Architectural shingles · Seamless aluminum gutters · Gutter guards",
    description:
      "New architectural shingle roof paired with a full seamless aluminum gutter system. Custom downspouts routed to grade, gutter guards installed to keep leaves and debris out of the run.",
    beforeImage: "/images/before-after-1-before.jpg",
    beforeAlt:
      "Before: worn shingle roof and clogged gutters on a Chester County PA home — prior to full replacement by Adilay Roofing.",
    afterImage: "/images/before-after-1-after.jpg",
    afterAlt:
      "After: new architectural shingle roof with seamless aluminum gutters and gutter guards on the same Chester County PA home — installed by Adilay Roofing.",
    aspectClass: "aspect-[2/3]",
  },

  // ── Siding ──────────────────────────────────────────────────────────
  {
    id: "vinyl-siding-rowhome",
    title: "Vinyl Siding Installation — Row Home",
    category: "siding",
    location: "Philadelphia, PA",
    serviceSlug: "siding-installation",
    materials:
      "Premium vinyl siding · House wrap · Aluminum trim",
    description:
      "Complete vinyl siding installation on a Philadelphia row home. Old siding stripped, house wrap installed for a proper weather barrier, then premium vinyl siding with clean aluminum trim around windows and doors.",
    beforeImage: "/images/before-after-5-before.jpg",
    beforeAlt:
      "Before: aged and damaged siding on a Philadelphia row home — prior to full replacement by Adilay Roofing.",
    afterImage: "/images/before-after-5-after.jpg",
    afterAlt:
      "After: new premium vinyl siding with clean aluminum trim on the same Philadelphia row home — installed by Adilay Roofing.",
    aspectClass: "aspect-[4/5]",
  },
  {
    id: "manayunk-siding-restoration",
    title: "Full Facade & Siding Restoration — Manayunk",
    category: "siding",
    location: "Manayunk, Philadelphia",
    locationSlug: "manayunk",
    serviceSlug: "siding-repair",
    materials: "Shake siding · Scalloped bay accents · White trim wrap · New railings",
    description:
      "Complete facade restoration on a three-story Manayunk rowhome: weathered paint and failing scalloped bay siding replaced with new shake siding, crisp white trim wrap on the bay and cornice, and a rebuilt porch entry. Same stone, same bones — a street-transforming refresh.",
    beforeImage: "/images/projects/manayunk-siding-restoration-before.jpg",
    beforeAlt:
      "Before: weathered gray facade with peeling paint and aged siding on a three-story Manayunk rowhome, prior to restoration by Adilay Roofing.",
    afterImage: "/images/projects/manayunk-siding-restoration-after.jpg",
    afterAlt:
      "After: the same Manayunk rowhome with new shake siding, white-wrapped bay and cornice trim, and a rebuilt porch entry — restored by Adilay Roofing.",
    aspectClass: "aspect-[3/4]",
  },
];
