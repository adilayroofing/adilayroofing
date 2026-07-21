export type ServiceCategory = "roofing" | "siding" | "windows" | "gutters" | "shingles";

export interface ServiceCategoryInfo {
  id: ServiceCategory;
  label: string;
  description: string;
}

export const serviceCategories: ServiceCategoryInfo[] = [
  { id: "roofing", label: "Roofing", description: "Complete roofing solutions for residential and commercial properties" },
  { id: "siding", label: "Siding", description: "Professional siding installation, repair, and replacement services" },
  { id: "windows", label: "Windows", description: "Energy-efficient window installation, replacement, and repair" },
  { id: "gutters", label: "Gutters", description: "Gutter installation, repair, cleaning, and screening services" },
  { id: "shingles", label: "Shingles", description: "Asphalt shingle installation, repair, and replacement" },
];

export interface BodySection {
  heading: string;
  html: string;
}

// Recent-project showcase block — hyperlocal entity-rich content per
// master plan §2 ("real local detail no AI can fabricate"). Optional;
// service detail page only renders the section when a Service has one.
export interface ProjectShowcase {
  /** H2 heading for the section (e.g. "Recent Project: Bala Cynwyd Main Line Roof Replacement"). */
  heading: string;
  /** Display location string used in copy + ImageObject schema (e.g. "Bala Cynwyd, PA 19004"). */
  location: string;
  /** Optional slug for /service-areas/<slug>. When present, a contextual link is rendered. */
  locationSlug?: string;
  /** Before image — public path (e.g. "/images/projects/..."). */
  beforeSrc: string;
  beforeAlt: string;
  /** After image — public path. */
  afterSrc: string;
  afterAlt: string;
  /** Tailwind aspect-ratio class for the slider container. Defaults to "aspect-[4/5]". */
  aspectClass?: string;
  /** Sub-heading rendered above the project description (H3). */
  scopeHeading: string;
  /** Project description HTML (paragraph + optional list). Use real material/brand entity names. */
  scopeHtml: string;
}

// Visual "Service Types" card grid — replaces bullet-list cross-link sections
// (e.g. "Roof Types We Replace"). Renders other services as ServiceCard
// components (photo + icon + title + Learn More) instead of a <ul>.
export interface ServiceTypeCards {
  heading: string;
  intro?: string;
  /** Slugs of other Service entries to render as cards. */
  cardSlugs: string[];
}

// Visual process — replaces an ordered-list "Our Process" block with
// numbered step badges (like the homepage ProcessSection).
export interface ProcessSteps {
  heading: string;
  steps: { title: string; description: string }[];
}

// Material spec cards — replaces H3 sub-sections describing each material
// option with a compact card grid (icon + stat + brand chips + 1-liner).
export type MaterialIconKey =
  | "shingle"
  | "designer"
  | "metal"
  | "flat"
  | "tile"
  | "chimney"
  | "vent"
  | "drop";

export interface MaterialCard {
  iconKey?: MaterialIconKey;
  title: string;
  /** Big stat displayed prominently — e.g. "25–30 yrs". */
  stat: string;
  statLabel: string;
  /** Brand chips — e.g. ["GAF", "CertainTeed"]. */
  brands?: string[];
  description: string;
}

export interface MaterialCards {
  heading: string;
  items: MaterialCard[];
  footnote?: string; // HTML allowed — used for a closing flat-roof link line.
}

// Comparison block — side-by-side ✓ recommended / ✗ avoid with concise items.
export interface ComparisonBlock {
  heading: string;
  leftLabel: string;
  leftSubtitle?: string; // e.g. "Recommended"
  leftItems: string[];
  rightLabel: string;
  rightSubtitle?: string; // e.g. "Why we avoid it"
  rightItems: string[];
}

// Icon callouts — small grid of icon + title + description tiles.
export type CalloutIconKey =
  | "snowflake"
  | "row-homes"
  | "historic"
  | "permit"
  | "storm"
  | "shield"
  | "chimney"
  | "vent"
  | "drop";

export interface IconCallout {
  iconKey: CalloutIconKey;
  title: string;
  description: string;
}

export interface IconCallouts {
  heading: string;
  items: IconCallout[];
  footnote?: string; // HTML allowed.
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  category: ServiceCategory;
  description: string;
  /** SERP meta overrides — ≤60 chars / 150–160 chars incl. phone + PA184779.
   * When absent, the template default in services/[slug]/page.tsx is used. */
  metaTitle?: string;
  metaDescription?: string;
  icon: string;
  image: string;
  heroDescription: string;
  benefits: string[];
  features: string[];
  faq: { question: string; answer: string }[];
  bodySections?: BodySection[];
  projectShowcase?: ProjectShowcase;
  serviceTypeCards?: ServiceTypeCards;
  processSteps?: ProcessSteps;
  materialCards?: MaterialCards;
  comparisonBlock?: ComparisonBlock;
  iconCallouts?: IconCallouts;
}

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return services.filter((s) => s.category === category);
}

export const services: Service[] = [
  {
    slug: "roof-replacement",
    title: "Roof Replacement",
    shortTitle: "Replacement",
    tagline: "A New Roof That Protects What Matters Most",
    category: "roofing",
    description:
      "Complete roof replacement services for homes and businesses in Philadelphia and surrounding areas. We remove your old roof and install a brand-new roofing system built to last.",
    icon: "",
    image: "/images/roof-replacement-philadelphia.jpg",
    heroDescription:
      "Full roof replacement in Philadelphia — done by our own licensed crew (PA184779), never subcontracted. Tear-off down to the decking, deck repair where needed, ice-and-water shield, new underlayment, flashing, ventilation, and your choice of architectural, designer, or metal roofing. Serving Philadelphia, Bucks, Montgomery, Delaware, and Chester Counties. Free written estimate — no pressure. Call (267) 255-3620.",
    benefits: [
      "Full tear-off and replacement with new materials",
      "Thorough inspection of decking and underlayment",
      "Professional cleanup — we leave your property spotless",
      "Manufacturer-backed material warranties",
      "Increased property value and curb appeal",
      "Licensed and insured roofing contractor (PA184779)",
      "Free, no-obligation estimates for every project",
      "Serving Philadelphia, Bucks, Montgomery, Delaware & Chester Counties",
    ],
    features: [
      "Complete old roof removal and disposal",
      "Decking inspection and repair as needed",
      "Ice and water shield installation",
      "New underlayment and drip edge",
      "Ridge vent and attic ventilation",
      "Final walkthrough and quality check",
      "Gutter reattachment and flashing replacement",
      "Written warranty documentation and project photos",
    ],
    faq: [
      {
        question: "How long does a roof replacement take?",
        answer:
          "Most residential roof replacements are completed in 1–3 days depending on the size and complexity of the project. We'll provide a specific timeline during your estimate.",
      },
      {
        question: "How do I know if I need a replacement vs. a repair?",
        answer:
          "If your roof is over 20 years old, has widespread damage, or you're dealing with recurring leaks, replacement is usually the better investment. We'll inspect your roof and give you an honest recommendation.",
      },
      {
        question: "How much does a roof replacement cost in Philadelphia?",
        answer:
          "The cost of a roof replacement in Philadelphia depends on the size of your roof, the materials you choose, and the complexity of the job. Most residential roof replacements range from $8,000 to $25,000. We provide free, detailed estimates so you know exactly what to expect — no hidden fees or surprises.",
      },
      {
        question: "Do I need a permit for a roof replacement in Philadelphia?",
        answer:
          "Yes, a building permit is typically required for a full roof replacement in Philadelphia. As a licensed contractor (PA184779), we handle the permit process for you and ensure your new roof meets all local building codes and inspection requirements.",
      },
      {
        question: "What roofing materials do you recommend for Philadelphia homes?",
        answer:
          "For most Philadelphia homes, we recommend architectural asphalt shingles for their balance of durability, appearance, and value. They handle the Mid-Atlantic climate well, including hot summers, cold winters, and heavy rain. We also offer metal roofing and flat roof options depending on your property type and preferences.",
      },
      {
        question: "Do you tear off the old roof or install a new roof over it?",
        answer:
          "We almost always recommend a full tear-off. An overlay (installing new shingles over the old roof) hides decking damage, shortens the life of the new shingles, adds weight the structure may not be rated for, and voids most manufacturer warranties. A tear-off lets us inspect the decking, replace anything rotted, install ice-and-water shield and new underlayment, and start the new roof from a known-good foundation.",
      },
      {
        question: "How long does a new roof last in Philadelphia?",
        answer:
          "Architectural asphalt shingles installed correctly on a well-ventilated Philadelphia roof typically last 25 to 30 years. Designer and impact-rated shingles can last 30 to 50 years. Metal roofs go 40 to 70 years, and proper EPDM flat roofs 20 to 30 years. The biggest factors are attic ventilation, flashing quality, and whether the installer cut corners — all things we control on an Adilay roof replacement.",
      },
      {
        question: "Do you offer financing on roof replacements in Philadelphia?",
        answer:
          "Yes. We partner with Service Finance Company to offer roof replacement financing from $1,000 to $100,000, with no payments until the job is complete. See our financing page for loan terms and rate options.",
      },
      {
        question: "What warranties come with a new roof from Adilay Roofing?",
        answer:
          "Every roof replacement includes a manufacturer material warranty (typically 25 to 50 years depending on the shingle you choose) plus an Adilay Roofing workmanship warranty in writing. Specific terms vary by product — we put everything on paper with your estimate so you can compare warranties across materials before you decide.",
      },
    ],
    serviceTypeCards: {
      heading: "Roof Types We Replace in Philadelphia",
      intro: "Philadelphia's housing stock runs from 1900-era slate Victorians in Germantown to flat-rubber row-home roofs in South Philly. Every replacement starts with matching the system to the home and the neighborhood.",
      cardSlugs: [
        "shingle-roofing",
        "flat-roofing",
        "storm-damage-roof-repair",
        "residential-roofing",
        "commercial-roofing",
      ],
    },
    processSteps: {
      heading: "Your Roof Replacement Process",
      steps: [
        {
          title: "Free On-Site Estimate",
          description: "Licensed roofer walks the roof, written proposal with materials and warranties.",
        },
        {
          title: "Permit Filing",
          description: "We file with Philadelphia L&I under our PA184779 license.",
        },
        {
          title: "Full Tear-Off",
          description: "Down to the decking; rotted sheathing replaced before anything new goes on.",
        },
        {
          title: "Ice-and-Water Shield",
          description: "At eaves and valleys, plus synthetic underlayment and drip edge.",
        },
        {
          title: "New Roof Installed",
          description: "Architectural or designer shingles, flashing, and ridge-soffit ventilation to spec.",
        },
        {
          title: "Final Walkthrough",
          description: "Photos, magnetic-sweep cleanup, and written warranty before we leave.",
        },
      ],
    },
    materialCards: {
      heading: "Roofing Materials We Install",
      items: [
        {
          iconKey: "shingle",
          title: "Architectural Asphalt",
          stat: "25–30 yrs",
          statLabel: "service life",
          brands: ["GAF", "CertainTeed", "Owens Corning"],
          description: "The Philadelphia standard — 110–130 mph wind rating, dimensional profile, strong warranty.",
        },
        {
          iconKey: "designer",
          title: "Designer Shingles",
          stat: "50 yrs",
          statLabel: "warranty",
          brands: ["GAF Grand Sequoia", "CertainTeed Grand Manor"],
          description: "Impact-rated profiles for historic Germantown, Mount Airy, and Chestnut Hill homes.",
        },
        {
          iconKey: "metal",
          title: "Standing-Seam Metal",
          stat: "40–70 yrs",
          statLabel: "service life",
          description: "Best for historic homes, accents on porches and bay windows. Snow, wind, and hail durable.",
        },
      ],
      footnote: `Flat-roof system? See <a href="/services/flat-roofing">flat roofing</a> for EPDM, TPO, and modified bitumen.`,
    },
    comparisonBlock: {
      heading: "Tear-Off vs. Overlay",
      leftLabel: "Tear-Off",
      leftSubtitle: "What we recommend",
      leftItems: [
        "Decking fully inspected — rot replaced before new roof goes on.",
        "Manufacturer warranty fully preserved.",
        "Full rated lifespan of the new roof.",
      ],
      rightLabel: "Overlay",
      rightSubtitle: "Why we usually avoid it",
      rightItems: [
        "Decking hidden — water damage stays trapped underneath.",
        "Manufacturer warranty often voided on overlays.",
        "3–8 years shorter lifespan — the roof runs hotter.",
      ],
    },
    bodySections: [
      {
        heading: "Warranties in Writing",
        html: `<p>Every Adilay replacement comes with <strong>two warranties on paper</strong>: the manufacturer's material warranty (25–50 years depending on shingle line) and our own workmanship warranty (covers proper flashing, fastening, ventilation, tie-ins). We hand over both documents before you sign — ask every bidder for the same.</p>`,
      },
      {
        heading: "Financing",
        html: `<p>$1,000–$100,000 loans through Service Finance Company — no payments until the job is done. <a href="/financing">See financing options</a>.</p>`,
      },
    ],
    iconCallouts: {
      heading: "What Makes a Philadelphia Roof Different",
      items: [
        {
          iconKey: "snowflake",
          title: "Freeze-Thaw Winters",
          description: "Ice-and-water shield at eaves and valleys is non-negotiable on a Philly roof.",
        },
        {
          iconKey: "row-homes",
          title: "Row-Home Tie-Ins",
          description: "South Philly, Fishtown, Kensington pitched-to-flat tie-ins matter more than the shingles.",
        },
        {
          iconKey: "historic",
          title: "Historic Homes",
          description: "Germantown, Mount Airy, Chestnut Hill slate and built-up roofs need material-matched detailing.",
        },
      ],
      footnote: `Roof past 20? Start with a <a href="/services/roof-inspection">free roof inspection</a>.`,
    },
    projectShowcase: {
      heading: "Recent Project: Bala Cynwyd Roof Replacement on a Main Line Home",
      location: "Bala Cynwyd, PA 19004",
      locationSlug: "bala-cynwyd",
      beforeSrc: "/images/projects/roof-replacement-bala-cynwyd-before.jpg",
      beforeAlt:
        "Before: aging asphalt shingle roof with worn-out gutters on a Main Line home in Bala Cynwyd, PA 19004 — prior to full tear-off by Adilay Roofing.",
      afterSrc: "/images/projects/roof-replacement-bala-cynwyd-after.jpg",
      afterAlt:
        "After: new GAF Timberline 3D architectural shingles in Oyster Grey, black aluminum gutters, and vinyl-wrapped attic bay windows on the same Bala Cynwyd Main Line home — completed by Adilay Roofing.",
      aspectClass: "aspect-[4/5]",
      scopeHeading: "What We Replaced",
      scopeHtml: `<p>A homeowner in <a href="/service-areas/bala-cynwyd">Bala Cynwyd</a> hired the Adilay Roofing crew for a complete tear-off and replacement on the main roof and front porch. We took the project from worn-out shingles to a fully restored exterior in a single coordinated scope.</p>
<ul>
  <li><strong>Tear-off down to the decking.</strong> Old shingles, underlayment, and damaged sheathing removed; fresh plywood installed where needed.</li>
  <li><strong>Ice-and-water shield + synthetic underlayment</strong> at eaves, valleys, and penetrations — non-negotiable on a Main Line freeze-thaw winter.</li>
  <li><strong>GAF Timberline HDZ architectural shingles in Oyster Grey</strong> — the color the homeowner picked out, installed to manufacturer spec with proper starter strip, ridge cap, and ventilation.</li>
  <li><strong>Rebuilt gutter framing</strong> along the affected eaves so the new gutters had a clean, level fastening surface.</li>
  <li><strong>Four attic bay windows wrapped with new vinyl siding</strong> — matched color and profile to the existing exterior.</li>
  <li><strong>New black aluminum gutters and downspouts</strong> sized for the roof area and tied into the existing drainage points.</li>
</ul>
<p>See more of <a href="/service-areas/bala-cynwyd">our roofing work in Bala Cynwyd</a> or call <a href="tel:+12672553620">(267) 255-3620</a> for a free estimate on a similar replacement.</p>`,
    },
  },
  {
    slug: "roof-repair",
    title: "Roof Repair",
    shortTitle: "Repair",
    tagline: "Roof Repair Philadelphia PA — Free Estimates, Same-Day Response",
    category: "roofing",
    description:
      "Roof repair Philadelphia PA homeowners trust. Expert leak repair, storm damage, flashing & shingle fixes. Free estimates, same-day response, licensed PA184779.",
    metaTitle: "Roof Repair Philadelphia — Free Estimates, Fast Fixes",
    metaDescription:
      "Philadelphia roof repair — leaks, shingles, flashing & flat roofs fixed fast. Free same-week estimates, licensed PA184779, 5-star rated. Call (267) 255-3620.",
    icon: "",
    image: "/images/roof-repair-philadelphia.jpg",
    heroDescription:
      "Roof repair in Philadelphia by our own licensed crew (PA184779) — leak detection, flashing rework, shingle and EPDM repair, with same-day response for active leaks. Serving Philadelphia, Bucks, Montgomery, Delaware, and Chester Counties. Free written estimate. Call (267) 255-3620.",
    benefits: [
      "Free roof repair estimates — no obligation, no pressure",
      "Same-day response available for active leaks in Philadelphia",
      "Accurate leak detection and diagnosis",
      "Storm damage assessment and insurance documentation",
      "All roof types — shingle, flat rubber (EPDM), metal",
      "Transparent, written pricing with no hidden fees",
      "Licensed and insured Philadelphia roof repair contractor (PA184779)",
      "Workmanship guarantee on every roof repair",
    ],
    features: [
      "Emergency and scheduled repair services",
      "Leak detection and tracing",
      "Flashing and vent boot repair",
      "Shingle replacement for damaged areas",
      "Gutter and soffit repairs",
      "Post-repair inspection and documentation",
      "Pipe collar and chimney flashing repair",
      "Storm damage assessment and insurance documentation",
    ],
    faq: [
      {
        question: "Can you repair just part of my roof?",
        answer:
          "Yes, if the damage is localized, we can repair the affected area without replacing the entire roof. We'll match your existing materials as closely as possible.",
      },
      {
        question: "Do you handle insurance claims for storm damage?",
        answer:
          "We can document the damage and provide the information your insurance company needs. We'll work with you through the process to make it as smooth as possible.",
      },
      {
        question: "How much does a roof repair cost in Philadelphia?",
        answer:
          "Every roof repair is scoped from a real on-site inspection — type of failure, accessibility, materials, and whether decking work is needed all factor in. We provide a free written estimate before any work begins, with the full scope itemized so you know exactly what you're paying for. No hidden fees, no surprise add-ons.",
      },
      {
        question: "How quickly can you respond to a roof leak in Philadelphia?",
        answer:
          "We understand that roof leaks require urgent attention. In most cases, we can schedule an inspection within 24–48 hours of your call. For active leaks or emergency situations, we do our best to respond the same day to minimize water damage to your home.",
      },
      {
        question: "Do I need a permit for roof repairs in Philadelphia?",
        answer:
          "Minor roof repairs typically do not require a permit in Philadelphia. However, if the repair involves structural work or covers a significant portion of the roof, a permit may be required. As a licensed contractor (PA184779), we will let you know if a permit is needed and handle the process for you.",
      },
      {
        question: "How do I know whether to repair or replace my roof?",
        answer:
          "If the damage is localized — a few shingles, a flashing detail, a punctured section of flat roof — a roof repair is usually the right call. If your roof is over 20 years old, has widespread granule loss, multiple active leaks, or repeated repairs in the same areas, replacement is the better long-term investment. We will give you an honest recommendation during a free Philadelphia roof repair inspection, not a pushy upsell.",
      },
      {
        question: "Do you fix chimney and skylight flashing leaks?",
        answer:
          "Yes — chimney and skylight flashing failures are two of the most common sources of roof leaks on Philadelphia homes. We re-flash, reseal, or rebuild the detail using proper step-flashing technique and appropriate sealants, not just a cosmetic caulk fix that will fail again next season.",
      },
      {
        question: "Will my homeowner's insurance cover roof repair in Philadelphia?",
        answer:
          "Insurance usually covers sudden events — wind damage, hail, falling trees, storm debris. It generally does not cover wear, age, or poor maintenance. If your roof repair is storm-related, we provide date-stamped photos, a written damage report, and an itemized estimate formatted the way insurance adjusters expect, and we can meet your adjuster on-site.",
      },
      {
        question: "What kind of warranty do you offer on roof repair work?",
        answer:
          "Every roof repair we perform in Philadelphia is backed by a workmanship guarantee. The exact warranty length depends on the repair type, materials used, and whether it is a temporary or permanent fix — we put the terms in writing on your estimate so you know exactly what is covered before we start.",
      },
      {
        question: "Do you repair flat EPDM rubber roofs on Philadelphia row homes?",
        answer:
          "Yes. Flat-roof repair on EPDM, modified bitumen, and TPO membranes is a daily job for our crew. We repair seam failures, punctures, parapet-wall tie-in leaks, and drain leaks across South Philly, Fishtown, Kensington, West Philadelphia, and the rest of the city.",
      },
    ],
    serviceTypeCards: {
      heading: "Roof Repairs We Handle",
      intro: "Most leak calls trace back to flashing, vent boots, or storm-lifted shingles. Every Philly repair starts with the right diagnosis — never just a patch at the drip location.",
      cardSlugs: [
        "roof-leak-repair",
        "emergency-roof-repair",
        "storm-damage-roof-repair",
        "flat-roof-repair",
        "shingle-repair",
      ],
    },
    processSteps: {
      heading: "How a Roof Repair Visit Goes",
      steps: [
        {
          title: "Call (267) 255-3620",
          description: "Same-day for active leaks; next-day for scheduled inspections.",
        },
        {
          title: "Roof + Attic Inspection",
          description: "We trace water along framing — the leak source is rarely below the stain.",
        },
        {
          title: "Written Diagnosis",
          description: "Photos and written assessment of every failure point before any work.",
        },
        {
          title: "Itemized Estimate",
          description: "Transparent scope and price. You approve before we open anything up.",
        },
        {
          title: "Permanent Repair",
          description: "Proper flashing, sealants, and shingle tie-ins to manufacturer spec.",
        },
        {
          title: "Photos + Cleanup",
          description: "Magnetic-sweep cleanup, before/after photos, warranty in writing.",
        },
      ],
    },
    materialCards: {
      heading: "Materials & Sealants We Use",
      items: [
        {
          iconKey: "shingle",
          title: "GAF & CertainTeed Shingles",
          stat: "Color-matched",
          statLabel: "to your roof",
          description: "Replacement shingles from the major Philly brands — standard colors like charcoal, weathered wood, and slate gray.",
        },
        {
          iconKey: "chimney",
          title: "Sika Polyurethane Sealant",
          stat: "Long-life",
          statLabel: "weatherproof",
          description: "Pro-grade sealant for chimney counter-flashing, flat-roof seams, and parapet-wall tie-ins where caulks fail.",
        },
        {
          iconKey: "flat",
          title: "Silicone Elastomeric Coating",
          stat: "UV-reflective",
          statLabel: "extends roof life",
          description: "Liquid-applied silicone for fiberglass and flat membranes — restores waterproofing without a full tear-off.",
        },
        {
          iconKey: "drop",
          title: "Ice & Water Shield",
          stat: "Self-sealing",
          statLabel: "at valleys & eaves",
          description: "Self-adhering membrane at the leak-prone areas — non-negotiable on Philadelphia freeze-thaw winters.",
        },
      ],
    },
    comparisonBlock: {
      heading: "Repair or Replace? The Honest Line We Draw",
      leftLabel: "Repair",
      leftSubtitle: "Makes sense when",
      leftItems: [
        "Damage is localized — one failure point, not widespread.",
        "Roof has 5+ years of life left.",
        "Single chimney, vent boot, or flashing detail.",
      ],
      rightLabel: "Replace",
      rightSubtitle: "Better long-term call when",
      rightItems: [
        "Roof is 22+ years old or has widespread granule loss.",
        "Multiple active leaks in different roof sections.",
        "Curling shingles or repeated repair calls in 2–3 years.",
      ],
    },
    iconCallouts: {
      heading: "Where Philadelphia Roof Leaks Usually Start",
      items: [
        {
          iconKey: "chimney",
          title: "Chimney Flashing",
          description: "Step and counter-flashing failures are the #1 leak source we diagnose on Philly roofs.",
        },
        {
          iconKey: "vent",
          title: "Vent Boot UV Crack",
          description: "Rubber boot around plumbing stacks fails after 8–12 years of sun exposure.",
        },
        {
          iconKey: "storm",
          title: "Wind-Lifted Shingles",
          description: "Nor'easters and summer thunderstorms lift tabs and crease shingles at the windward side.",
        },
      ],
      footnote: `Active leak? Call <a href="tel:+12672553620">(267) 255-3620</a> or see our <a href="/services/emergency-roof-repair">24/7 emergency roof repair in Philadelphia</a> for same-day response.`,
    },
    projectShowcase: {
      heading: "Recent Project: Northern Liberties Fiberglass Roof Repair",
      location: "Northern Liberties, Philadelphia",
      locationSlug: "northern-liberties",
      beforeSrc: "/images/projects/roof-repair-northern-liberties-during.jpg",
      beforeAlt:
        "Northern Liberties Philadelphia rooftop mid-repair — fiberglass roof with cracks along the membrane and wall edge before sealing, by Adilay Roofing.",
      afterSrc: "/images/projects/roof-repair-northern-liberties-after.jpg",
      afterAlt:
        "Northern Liberties Philadelphia rooftop after repair — fiberglass membrane sealed with flashing cement and silicone elastomeric coating, stucco wall patched and waterproofed, by Adilay Roofing.",
      aspectClass: "aspect-[3/4]",
      scopeHeading: "What We Repaired",
      scopeHtml: `<p>A homeowner in <a href="/service-areas/northern-liberties">Northern Liberties</a> called us for a fiberglass roof with cracks in three sections along the membrane and wall edge — exactly the kind of repair where the diagnosis matters more than the patch.</p>
<ul>
  <li><strong>Crack repair</strong> in three sections of the fiberglass roof and wall edge.</li>
  <li><strong>Membrane sealing</strong> with flashing cement and Sika polyurethane — both rated for long-term flat-roof service.</li>
  <li><strong>Silicone elastomeric coating</strong> applied over the sealed membrane to extend service life and reflect UV.</li>
  <li><strong>Stucco wall repair</strong> — patched and sealed with waterproof paint at the roof-wall transition.</li>
</ul>
<p>See more of <a href="/service-areas/northern-liberties">our roofing work in Northern Liberties</a> or call <a href="tel:+12672553620">(267) 255-3620</a> for a free estimate.</p>`,
    },
  },
  {
    slug: "flat-roofing",
    title: "Flat Roofing (EPDM)",
    shortTitle: "Flat Roof",
    tagline: "Durable Flat Roof Solutions for Commercial & Residential Properties",
    category: "roofing",
    description:
      "Professional flat roof installation and repair using EPDM rubber roofing. Ideal for commercial buildings, row homes, and additions in the Philadelphia area.",
    icon: "",
    image: "/images/flat-roof-philadelphia.jpg",
    heroDescription:
      "EPDM (ethylene propylene diene terpolymer) rubber roofing is one of the most reliable flat roofing materials available, and Adilay Roofing is Philadelphia's trusted source for expert flat roof installation and repair. Licensed under PA184779, our team specializes in flat roofing systems for both commercial buildings and residential properties, including Philadelphia row homes, garage additions, porches, and low-slope roofs. EPDM delivers excellent waterproofing, UV resistance, and long-term durability, making it the preferred choice for flat and low-slope roofing applications throughout the Mid-Atlantic region. Unlike other flat roofing materials, EPDM can withstand extreme temperature fluctuations — from scorching Philadelphia summers to freezing winters — without cracking or deteriorating. We serve homeowners and business owners across Philadelphia and the surrounding areas of Bucks County, Montgomery County, Delaware County, and Chester County. Whether you need a complete flat roof replacement, a repair for ponding water or membrane damage, or a new flat roof installation on a building addition, our crew delivers professional results with meticulous attention to drainage, seam integrity, and edge detailing. Contact us today for a free flat roofing estimate and see why property owners across Philadelphia trust Adilay Roofing for their flat roof needs.",
    benefits: [
      "Superior waterproofing for flat and low-slope roofs",
      "UV and weather resistant for long-term performance",
      "Cost-effective solution for large commercial areas",
      "Minimal maintenance requirements",
      "Proven track record of 20+ year lifespan",
      "Expert installation by licensed contractors (PA184779)",
      "Ideal for Philadelphia row homes and commercial buildings",
      "Free estimates with no obligation",
    ],
    features: [
      "Full EPDM membrane installation",
      "Existing flat roof tear-off and replacement",
      "Proper drainage and slope assessment",
      "Seam welding and edge detailing",
      "Insulation board installation",
      "Penetration flashing for vents and pipes",
      "Parapet wall and coping cap installation",
      "Ponding water correction and drainage improvement",
    ],
    faq: [
      {
        question: "How long does an EPDM flat roof last?",
        answer:
          "A properly installed EPDM roof can last 20–30 years with regular maintenance. The material is highly resistant to UV rays, ozone, and extreme temperatures.",
      },
      {
        question: "Is EPDM good for residential flat roofs?",
        answer:
          "EPDM is an excellent choice for residential flat roofs, including row homes, additions, and porches. It provides reliable waterproofing at a reasonable cost.",
      },
      {
        question: "How much does flat roof installation cost in Philadelphia?",
        answer:
          "Flat roof installation costs in Philadelphia typically range from $4 to $10 per square foot depending on the size of the roof, the condition of the existing decking, and whether insulation is included. We provide free, itemized estimates so you understand every aspect of the cost before work begins.",
      },
      {
        question: "Do I need a permit for flat roof work in Philadelphia?",
        answer:
          "Yes, a permit is typically required for flat roof replacement in Philadelphia. As a licensed roofing contractor (PA184779), we handle all permit applications and ensure your flat roof meets Philadelphia building codes and passes inspection.",
      },
      {
        question: "What causes ponding water on a flat roof and how do you fix it?",
        answer:
          "Ponding water on a flat roof is usually caused by improper drainage, sagging decking, or clogged drains. We correct ponding issues by improving the roof slope with tapered insulation, clearing or adding drains, and ensuring the membrane is properly sealed to prevent leaks in low spots.",
      },
    ],
  },
  {
    slug: "shingle-roofing",
    title: "Shingle Installation",
    shortTitle: "Shingles",
    tagline: "Professional Shingle Installation Philadelphia PA — Built to Last",
    category: "shingles",
    description:
      "Expert shingle installation in Philadelphia, PA. Adilay Roofing installs 3-tab and architectural asphalt shingles with precision craftsmanship and manufacturer-backed warranties.",
    icon: "",
    image: "/images/roof-shingles-philadelphia.jpg",
    heroDescription:
      "Asphalt shingles remain the most popular roofing choice in Philadelphia for a reason — they offer reliable weather protection, a clean look, and excellent value for homeowners across the region. At Adilay Roofing, licensed under PA184779, we install both standard 3-tab and dimensional architectural shingles in a wide range of colors and styles to complement any home. Our shingle installation services cover everything from new installations on newly constructed homes to complete tear-off and replacement of aging roofs. Architectural shingles, in particular, provide superior wind resistance, impact protection, and a premium multi-dimensional appearance that enhances curb appeal and increases property value. We use only manufacturer-backed materials from trusted brands like GAF, CertainTeed, and Owens Corning, ensuring your shingle roof is built to handle Philadelphia's challenging Mid-Atlantic climate — including hot, humid summers, harsh winter storms, and heavy spring rains. Adilay Roofing serves homeowners throughout Philadelphia and the surrounding areas of Bucks County, Montgomery County, Delaware County, and Chester County. Whether you need a full shingle roof installation or want to upgrade from 3-tab to architectural shingles, contact us today for a free estimate. Our team will help you choose the best shingle option for your home, style, and budget.",
    benefits: [
      "Cost-effective roofing with proven performance",
      "Wide selection of colors and architectural styles",
      "Strong wind and impact resistance ratings",
      "Manufacturer warranties up to 30+ years",
      "Quick installation with minimal disruption",
      "Licensed and insured installation (PA184779)",
      "Top brands: GAF, CertainTeed, Owens Corning",
      "Free estimates for Philadelphia and surrounding counties",
    ],
    features: [
      "3-tab and architectural shingle options",
      "Full color and style selection",
      "Proper underlayment and ice shield",
      "Ridge cap and ventilation installation",
      "Clean tear-off of existing shingles",
      "Disposal and full property cleanup",
      "Drip edge and starter strip installation",
      "Step and chimney flashing integration",
    ],
    faq: [
      {
        question: "What's the difference between 3-tab and architectural shingles?",
        answer:
          "3-tab shingles are flat and uniform, offering a clean look at a lower cost. Architectural shingles are thicker and multi-dimensional, providing better durability and a more premium appearance.",
      },
      {
        question: "How long do asphalt shingles last in the Philadelphia climate?",
        answer:
          "Standard 3-tab shingles typically last 15–20 years, while architectural shingles can last 25–30+ years with proper installation and ventilation.",
      },
      {
        question: "How much does shingle installation cost in Philadelphia?",
        answer:
          "The cost of shingle installation in Philadelphia depends on the size of your roof, the type of shingle you choose, and the complexity of the installation. On average, homeowners can expect to pay between $5,000 and $15,000 for a standard residential shingle roof. We provide free, no-obligation estimates with transparent, upfront pricing.",
      },
      {
        question: "Do I need a permit for shingle installation in Philadelphia?",
        answer:
          "Yes, Philadelphia requires a building permit for roof installation projects, including shingle roofing. As a licensed contractor (PA184779), we handle the permit process on your behalf and ensure your new shingle roof meets all local building code requirements.",
      },
      {
        question: "What shingle brand do you recommend for Philadelphia homes?",
        answer:
          "We work with top-tier shingle manufacturers including GAF, CertainTeed, and Owens Corning. Each brand offers excellent warranties and products specifically designed to handle the Mid-Atlantic climate. During your free estimate, we can discuss which brand and product line best fits your needs and budget.",
      },
      {
        question: "What happens if the roof decking is damaged under the old shingles?",
        answer:
          "During tear-off we inspect every section of decking. If we find damaged, rotted, or soft boards, we replace them before installing new underlayment and shingles — so your new roof has a solid foundation. We notify you of any decking costs before proceeding, never after the fact.",
      },
    ],
  },
  {
    slug: "siding-installation",
    title: "Siding Installation",
    shortTitle: "Siding Install",
    tagline: "Expert Siding Installation Philadelphia — Transform Your Home's Exterior",
    category: "siding",
    description:
      "Professional siding installation in Philadelphia. Vinyl, fiber cement, and wood siding options to improve your home's curb appeal and energy efficiency.",
    icon: "",
    image: "/images/siding-philadelphia.jpg",
    heroDescription:
      "New siding installation does more than improve how your home looks — it adds a critical layer of insulation, protects against moisture damage, and reduces energy costs year-round. At Adilay Roofing, licensed under PA184779, we provide professional siding installation services throughout Philadelphia and the surrounding areas of Bucks County, Montgomery County, Delaware County, and Chester County. We install vinyl siding, fiber cement siding (including James Hardie HardiePlank), and wood siding with precision and attention to detail, ensuring a flawless finish that enhances your home's curb appeal and structural integrity. Our team of siding installation experts will assess your home's exterior, recommend the best siding material for your needs and budget, and complete the installation with minimal disruption to your daily life. Whether you need full siding installation on a Philadelphia row home, siding on a new home addition, or a complete exterior upgrade on a suburban colonial, Adilay Roofing delivers quality results backed by manufacturer warranties and our own workmanship guarantee. We handle everything from the initial consultation and material selection to house wrap installation, insulation board placement, and meticulous trim finishing. Every siding installation project is completed by our experienced, in-house crew — never subcontracted. Contact us today for a free siding installation estimate — no pressure, no obligation, just honest advice from experienced exterior professionals.",
    benefits: [
      "Improved curb appeal and property value",
      "Better insulation and energy efficiency",
      "Protection against moisture, wind, and pests",
      "Low-maintenance material options available",
      "Custom color and style matching",
      "Licensed and insured contractor (PA184779)",
      "Manufacturer warranties on all siding materials",
      "Free estimates for Philadelphia and surrounding counties",
    ],
    features: [
      "Vinyl siding installation",
      "Fiber cement (HardiePlank) siding installation",
      "Wood siding installation",
      "Soffit and fascia installation",
      "House wrap and moisture barrier",
      "Trim work and finishing details",
      "Insulation board installation beneath siding",
      "Custom color matching to complement your home",
    ],
    faq: [
      {
        question: "Which siding material is best for installation on my home?",
        answer:
          "Vinyl is the most affordable and low-maintenance option. Fiber cement (like James Hardie) offers superior durability and a premium look. We will help you choose based on your budget and goals during your free consultation.",
      },
      {
        question: "How long does siding installation take?",
        answer:
          "Most residential siding installation projects are completed in 3–7 days depending on the size of your home and the complexity of the job. We will provide a specific timeline during your estimate.",
      },
      {
        question: "How much does siding installation cost in Philadelphia?",
        answer:
          "Siding installation costs in Philadelphia vary based on the material, the size of your home, and the complexity of the job. Vinyl siding typically costs $4–$8 per square foot, while fiber cement (HardiePlank) ranges from $8–$14 per square foot. We provide free, detailed estimates so you can compare options and make an informed decision.",
      },
      {
        question: "Do I need a permit for siding installation in Philadelphia?",
        answer:
          "In most cases, a permit is required for full siding installation in Philadelphia. As a licensed contractor (PA184779), we handle all permitting requirements and ensure your siding installation meets local building codes.",
      },
      {
        question: "How long does new siding last in the Philadelphia climate?",
        answer:
          "Vinyl siding typically lasts 20–40 years with minimal maintenance. Fiber cement siding (like James Hardie) can last 30–50 years and is highly resistant to the moisture, temperature swings, and UV exposure common in the Philadelphia area. Both options are excellent long-term investments for your home.",
      },
      {
        question: "Do you install siding on commercial buildings?",
        answer:
          "Yes. We install and replace siding on commercial properties across Philadelphia — retail storefronts, office buildings, warehouses, restaurants, and multi-unit residential buildings — in vinyl, fiber cement, metal panel, and composite cladding. We schedule commercial work around your business hours to minimize disruption to operations, tenants, and customers.",
      },
    ],
  },
  {
    slug: "siding-repair",
    title: "Siding Repair",
    shortTitle: "Siding Repair",
    tagline: "Fast, Professional Siding Repair Philadelphia — Restore Your Exterior",
    category: "siding",
    description:
      "Expert siding repair services in Philadelphia. We fix cracked, warped, loose, and storm-damaged siding to restore your home's protection and curb appeal.",
    projectShowcase: {
      heading: "Recent Project: Manayunk Facade & Siding Restoration",
      location: "Manayunk, Philadelphia",
      locationSlug: "manayunk",
      beforeSrc: "/images/projects/manayunk-siding-restoration-before.jpg",
      beforeAlt:
        "Before: weathered gray facade with peeling paint and failing scalloped bay siding on a three-story Manayunk rowhome.",
      afterSrc: "/images/projects/manayunk-siding-restoration-after.jpg",
      afterAlt:
        "After: the same Manayunk rowhome with new shake siding, white-wrapped bay and cornice trim, and a rebuilt porch entry.",
      aspectClass: "aspect-[3/4]",
      scopeHeading: "What This Project Involved",
      scopeHtml: `<p>This three-story Manayunk rowhome had the classic hillside combination: sound stone bones with a facade past its service life &mdash; broken scalloped (fish-scale) shingles on the bay, peeling paint, and water working behind the siding courses. We stripped the failed material, re-clad the bay and upper facade in new shake siding, wrapped the bay trim and cornice in crisp white aluminum, and rebuilt the porch entry with new railings. Scaffold staging over the shared walkway kept the neighbors' access open throughout.</p>`,
    },
    icon: "",
    image: "/images/siding-philadelphia.jpg",
    heroDescription:
      "Damaged siding does more than hurt your home's appearance — it exposes your walls to moisture infiltration, pest intrusion, mold growth, and energy loss. At Adilay Roofing, licensed under PA184779, we provide professional siding repair services throughout Philadelphia and the surrounding areas of Bucks County, Montgomery County, Delaware County, and Chester County. Whether you have cracked vinyl siding from impact damage, warped panels from prolonged sun exposure, loose siding torn off by high winds, or rotting wood siding that needs to be cut out and replaced, our experienced crew diagnoses the problem and repairs it right the first time. We repair all siding types including vinyl, fiber cement (HardiePlank), wood, and aluminum siding. Our siding repair process starts with a thorough inspection of your home's exterior to identify all areas of damage — not just the obvious ones. We check for underlying moisture damage, compromised house wrap, and deteriorating insulation board behind the siding to make sure the repair addresses the root cause, not just the surface symptom. We match existing siding colors and profiles as closely as possible so the repair blends seamlessly with the rest of your home. Do not let damaged siding lead to costly structural problems down the road. Contact Adilay Roofing today for a free siding repair estimate in Philadelphia — honest pricing, quality workmanship, and fast turnaround.",
    benefits: [
      "Fast repair to stop moisture and pest intrusion",
      "Color and profile matching for seamless results",
      "All siding types — vinyl, fiber cement, wood, aluminum",
      "Underlying damage inspection included",
      "Storm damage repair and insurance documentation",
      "Licensed and insured contractor (PA184779)",
      "Honest pricing with no hidden fees",
      "Free estimates for Philadelphia and surrounding counties",
    ],
    features: [
      "Cracked and broken siding panel replacement",
      "Warped and buckled siding correction",
      "Loose siding reattachment and securing",
      "Rotting wood siding cut-out and replacement",
      "Moisture damage assessment behind siding",
      "House wrap and insulation board repair",
      "Soffit and fascia repair",
      "Storm damage documentation for insurance claims",
    ],
    faq: [
      {
        question: "Can you repair just a section of my siding?",
        answer:
          "Yes, in most cases we can repair the damaged section without replacing all of your siding. We match the existing color and profile as closely as possible for a seamless result.",
      },
      {
        question: "How much does siding repair cost in Philadelphia?",
        answer:
          "Siding repair costs in Philadelphia depend on the extent of the damage and the type of siding. Minor repairs such as replacing a few panels typically cost $200–$800, while more extensive repairs can range from $1,000 to $3,000 or more. We provide free estimates so you know the exact cost before work begins.",
      },
      {
        question: "How do I know if my siding needs repair or full replacement?",
        answer:
          "If the damage is limited to a small area — a few cracked panels, a section of loose siding, or localized rot — repair is usually the most cost-effective solution. If the damage is widespread, the siding is old and deteriorating across the entire home, or you are seeing moisture problems in multiple areas, full replacement may be the better investment. We will inspect your siding and give you an honest recommendation.",
      },
      {
        question: "Do you handle insurance claims for storm-damaged siding?",
        answer:
          "Yes, we provide detailed documentation including photos and written descriptions of the damage to support your insurance claim. We have extensive experience working with homeowner's insurance companies in the Philadelphia area.",
      },
      {
        question: "What causes siding to crack or warp?",
        answer:
          "Siding can crack from impact damage (hail, debris, baseballs), extreme temperature fluctuations, or age-related brittleness. Warping is typically caused by prolonged heat exposure, improper installation that does not allow for expansion and contraction, or moisture trapped behind the siding. Our repair process addresses both the visible damage and the underlying cause.",
      },
    ],
  },
  {
    slug: "window-installation",
    title: "Window Installation",
    shortTitle: "Window Install",
    tagline: "Professional Window Installation Philadelphia — Energy-Efficient Upgrades",
    category: "windows",
    description:
      "Expert window installation services in Philadelphia. We install energy-efficient double and triple-pane windows to improve comfort, reduce energy bills, and enhance your home.",
    icon: "",
    image: "/images/window-installation-philadelphia.jpg",
    heroDescription:
      "New window installation in Philadelphia is one of the best investments you can make in your home's comfort, energy efficiency, and curb appeal. At Adilay Roofing, licensed under PA184779, our window installation services help you upgrade to modern, energy-efficient windows that keep your home comfortable year-round and look great doing it. We specialize in window installation for Philadelphia row homes, twin homes, and single-family residences, with expertise in custom sizing for older properties that require non-standard window dimensions. Our team installs double-pane and triple-pane energy-efficient windows with low-E glass coatings that reduce heat transfer and block harmful UV rays, helping you save significantly on your monthly energy bills. We also provide professional window coping and trim finishing to ensure a clean, weathertight seal that prevents moisture intrusion and improves your home's exterior appearance. Every window installation includes proper insulation around the frame, interior and exterior trim work, and a final quality inspection to ensure smooth operation and a perfect seal. Our experienced installers handle every step of the process — from precise measurement and ordering to installation and cleanup. Adilay Roofing serves homeowners throughout Philadelphia and the surrounding areas of Bucks County, Montgomery County, Delaware County, and Chester County. Contact us today for a free window installation estimate and start enjoying a more comfortable, energy-efficient home.",
    benefits: [
      "Lower energy bills with better insulation",
      "Reduced outside noise and improved comfort",
      "Modern styles that enhance your home's look",
      "Proper sealing to prevent moisture damage",
      "Increased natural light and ventilation",
      "Licensed and insured installation (PA184779)",
      "Custom sizing for older Philadelphia homes",
      "Free estimates with no obligation",
    ],
    features: [
      "New window installation for all home types",
      "Energy-efficient double and triple-pane glass",
      "Window coping and trim finishing",
      "Proper insulation and sealing around frames",
      "Custom sizing for older Philadelphia homes",
      "Low-E glass coating options for UV protection",
      "Interior and exterior trim and casing work",
      "Final quality inspection and operation check",
    ],
    faq: [
      {
        question: "How much can new windows save on energy bills?",
        answer:
          "Upgrading to energy-efficient double-pane windows can reduce energy loss through windows by up to 50%, translating to noticeable savings on heating and cooling costs throughout the year.",
      },
      {
        question: "Do you work with older Philadelphia row homes?",
        answer:
          "Yes, we have extensive experience with the unique window sizes and styles found in older Philadelphia homes. We can custom-fit modern windows to your existing openings for a perfect installation.",
      },
      {
        question: "How much does window installation cost in Philadelphia?",
        answer:
          "Window installation costs in Philadelphia typically range from $300 to $1,200 per window depending on the size, style, and glass options you choose. A full-home window installation for an average Philadelphia row home usually falls between $5,000 and $15,000. We provide free estimates with transparent pricing so you can plan your budget confidently.",
      },
      {
        question: "How long does window installation take?",
        answer:
          "Most window installations are completed in one day for a standard home. Larger projects with many windows may take 2–3 days. We will provide a specific timeline during your estimate and work efficiently to minimize disruption to your daily routine.",
      },
      {
        question: "What type of windows do you install for Philadelphia homes?",
        answer:
          "We install double-pane and triple-pane vinyl windows with low-E glass coatings for Philadelphia homes. These windows provide excellent insulation against both summer heat and winter cold, reduce condensation, and block UV rays that can fade furniture and flooring. During your free estimate, we will help you choose the best window style and glass options for your home.",
      },
      {
        question: "How do I know if my windows need replacing?",
        answer:
          "Common signs: drafts near closed windows, difficulty opening or closing, condensation trapped between the glass panes, visible rot or damage to the frames, and rising energy bills. If your windows are over 15–20 years old, replacement usually pays for itself in comfort and energy savings. We remove the old windows, inspect the framing for moisture damage, and install energy-efficient replacements with a weathertight seal.",
      },
    ],
  },
  {
    slug: "gutter-repair",
    title: "Gutter Repair",
    shortTitle: "Gutter Repair",
    tagline: "Expert Gutter Repair Philadelphia — Stop Leaks and Prevent Water Damage",
    category: "gutters",
    description:
      "Professional gutter repair services in Philadelphia. We fix leaking, sagging, and damaged gutters to protect your foundation and prevent costly water damage.",
    icon: "",
    image: "/images/gutters-philadelphia.png",
    heroDescription:
      "Damaged or malfunctioning gutters put your entire home at risk. When gutters leak, sag, pull away from the fascia, or overflow due to clogs and damage, water pools around your foundation and can cause serious structural problems including basement flooding, soil erosion, cracked foundations, and siding damage. At Adilay Roofing, licensed under PA184779, we provide professional gutter repair services throughout Philadelphia and the surrounding areas of Bucks County, Montgomery County, Delaware County, and Chester County. Our experienced crew diagnoses gutter problems quickly and performs lasting repairs that restore proper water flow and protect your property. We repair all types of gutter systems including seamless aluminum, sectional aluminum, copper, and galvanized steel gutters. Common gutter repairs we handle include fixing leaking joints and seams, reattaching sagging or pulling gutters, replacing damaged gutter sections, repairing or rerouting downspouts, and correcting pitch and alignment issues that cause standing water. We also inspect and repair the fascia board behind your gutters, because rotting fascia is one of the most common reasons gutters fail. Philadelphia's heavy spring rains, fall leaf drop, and winter ice make a properly functioning gutter system essential for protecting your home. Do not wait for a small gutter problem to turn into expensive foundation or siding damage. Contact Adilay Roofing today for a free gutter repair estimate — fast response, honest pricing, and quality workmanship you can count on.",
    benefits: [
      "Prevent foundation damage and basement flooding",
      "Fix leaking joints, seams, and connections",
      "Reattach sagging or pulling gutters securely",
      "Restore proper water flow and drainage",
      "Fascia board inspection and repair included",
      "Licensed and insured contractor (PA184779)",
      "All gutter types — seamless, sectional, copper, steel",
      "Free estimates for Philadelphia and surrounding counties",
    ],
    features: [
      "Leaking gutter joint and seam repair",
      "Sagging gutter reattachment and reinforcement",
      "Damaged gutter section replacement",
      "Downspout repair and rerouting",
      "Gutter pitch and alignment correction",
      "Fascia board inspection and repair",
      "Gutter realignment and pitch correction",
      "Ice dam damage repair",
    ],
    faq: [
      {
        question: "How do I know if my gutters need repair?",
        answer:
          "Common signs include water overflowing during rain, visible sagging or pulling away from the house, leaking joints or seams, peeling paint or water stains on your fascia, and pooling water near your foundation. If you notice any of these signs, contact us for a free inspection.",
      },
      {
        question: "How much does gutter repair cost in Philadelphia?",
        answer:
          "Gutter repair costs in Philadelphia typically range from $150 to $600 for common repairs like fixing leaks, reattaching sagging sections, or replacing a damaged run. More extensive repairs may cost more depending on the scope of work. We provide free estimates with transparent pricing.",
      },
      {
        question: "Can you repair gutters without replacing them entirely?",
        answer:
          "Yes, in most cases we can repair the damaged sections without replacing your entire gutter system. We will inspect your gutters and recommend repair if the majority of the system is in good condition, or replacement if the damage is widespread.",
      },
      {
        question: "What causes gutters to pull away from the house?",
        answer:
          "Gutters pull away from the house due to rotting fascia boards, excess weight from debris or ice buildup, improper installation, or age-related wear. Our team inspects and repairs the fascia board before reattaching your gutters to ensure a secure, long-lasting fix.",
      },
      {
        question: "Do you offer emergency gutter repair in Philadelphia?",
        answer:
          "Yes, we provide prompt gutter repair service for urgent situations such as gutters that have detached during a storm or are actively causing water damage to your home. Contact us and we will schedule your repair as quickly as possible.",
      },
    ],
  },
  {
    slug: "emergency-roof-repair",
    title: "Emergency Roof Repair",
    shortTitle: "Emergency Repairs",
    tagline: "24/7 Emergency Roof Repair Philadelphia — Same-Day Response",
    category: "roofing",
    description:
      "Emergency roof repair Philadelphia — 24/7 response for active leaks, storm damage, and fallen debris. Licensed PA184779, insured, same-day tarping. Call (267) 255-3620.",
    // Biggest DEEP RANK lever in GSC: "emergency roof repair" 3,718 impr @ pos 21,
    // "emergency roof leak repair" 2,192 @ 19.6 (28d, 2026-07). Urgency-first snippet.
    metaTitle: "24/7 Emergency Roof Repair Philadelphia — On-Site Today",
    metaDescription:
      "Roof leaking now? 24/7 emergency roof repair & same-day tarping in Philadelphia. Licensed PA184779, insured, insurance claim help. Call (267) 255-3620.",
    icon: "",
    image: "/images/emergency-roof-repair-philadelphia.jpg",
    heroDescription:
      "When a roofing emergency strikes, every minute matters. Whether it's a violent storm that rips shingles off your roof, a tree limb that crashes through, or an active leak pouring water into your living room, you need emergency roof repair Philadelphia PA homeowners can actually reach — day or night. Adilay Roofing provides 24/7 emergency roof repair in Philadelphia and across Northeast Philadelphia, South Philly, Manayunk, Roxborough, Fishtown, Germantown, and the surrounding counties of Bucks, Montgomery, Delaware, and Chester. Licensed under PA184779 and fully insured, our Philadelphia emergency roof repair crew is equipped to stabilize your property fast. Storm damage and roof leaks don't wait for business hours — and we don't either. When you call, we dispatch an emergency roofer to your Philadelphia property for rapid tarping, leak containment, and temporary weatherproofing, then return for permanent repairs once the situation is secure. Our experienced crew has handled every kind of Philadelphia roofing emergency: wind damage, hail damage, ice dam leaks, fallen trees, and structural collapse. We also provide detailed photo and written damage documentation to support your homeowner's insurance claim — we'll work directly with your carrier if needed. Don't let an emergency roof situation turn into thousands of dollars in interior water damage. Call Adilay Roofing at (267) 255-3620 for the fastest emergency roof repair in Philadelphia — free estimates, honest pricing, and a licensed Philadelphia roofer on your property the same day whenever possible.",
    benefits: [
      "24/7 emergency response for urgent roof situations",
      "Rapid tarping and temporary protection to stop active leaks",
      "Storm damage repair for wind, hail, and fallen debris",
      "Insurance claim documentation and assistance",
      "Licensed and insured roofing contractor (PA184779)",
      "Permanent repairs performed quickly after initial assessment",
      "All roof types — shingle, flat, metal, and more",
      "Free estimates with transparent, honest pricing",
    ],
    features: [
      "Same-day emergency response for active leaks",
      "Emergency tarping and board-up services",
      "Storm damage assessment and documentation",
      "Wind and hail damage shingle repair",
      "Fallen tree and debris removal from roof",
      "Temporary waterproofing and leak containment",
      "Insurance paperwork and damage photo documentation",
      "Follow-up permanent repair scheduling",
    ],
    faq: [
      {
        question: "How quickly can you respond to a roofing emergency in Philadelphia?",
        answer:
          "We strive to respond to emergency roof repair calls within hours, not days. For active leaks and storm damage, we prioritize same-day response to secure your property and prevent further damage. Call us any time — day or night — and we will dispatch our crew as quickly as possible.",
      },
      {
        question: "How much does emergency roof repair cost in Philadelphia?",
        answer:
          "Emergency roof repair costs in Philadelphia depend on the extent of the damage and the repairs required. Emergency tarping to stop an active leak typically starts around $300–$500, while permanent repairs vary based on the scope of work. We provide a free estimate before performing any permanent repairs and work with your insurance company to help cover costs.",
      },
      {
        question: "Do you help with insurance claims for storm damage in Philadelphia?",
        answer:
          "Yes, we provide comprehensive documentation for insurance claims, including detailed photos of the damage, written descriptions of the affected areas, and itemized repair estimates. We have extensive experience working with homeowner's insurance companies and can guide you through the claims process to help ensure you receive fair coverage for storm damage repairs.",
      },
      {
        question: "What should I do while waiting for emergency roof repair?",
        answer:
          "If it is safe to do so, place buckets or containers under active leaks to catch water, move valuable items and electronics away from the affected area, and take photos of the damage for insurance purposes. Do not attempt to climb onto your roof or make repairs yourself — this is extremely dangerous, especially during or after a storm. Call Adilay Roofing and our crew will handle the rest.",
      },
      {
        question: "Do you repair all types of roofs in an emergency?",
        answer:
          "Yes, our emergency roof repair team is equipped to handle all roof types, including asphalt shingle roofs, flat EPDM rubber roofs, metal roofing, and modified bitumen systems. No matter what type of roof you have, we can provide emergency protection and permanent repairs to restore your roof's integrity.",
      },
      {
        question: "Do you work nights and weekends for emergency roof repairs?",
        answer:
          "Yes. Adilay Roofing answers the phone 24 hours a day, seven days a week for emergency roof repair calls across Philadelphia. Storms do not wait for business hours and neither do we. Call (267) 255-3620 any time, day or night.",
      },
      {
        question: "Which Philadelphia neighborhoods do you cover for emergency roof repair?",
        answer:
          "We respond to emergency roof repair calls across every Philadelphia neighborhood — Northeast Philly, South Philly, Fishtown, Kensington, Manayunk, Roxborough, Germantown, Mount Airy, West Philadelphia, Center City, Northern Liberties, and the rest of the city — plus Bucks, Montgomery, Delaware, and Chester counties. Our office is in Kensington, so we're usually minutes away.",
      },
      {
        question: "How do I stop a roof leak before you arrive?",
        answer:
          "If it is safe to do so from inside: place a bucket under the drip, move electronics and valuables away from the affected area, and poke a small hole in a sagging wet ceiling to let trapped water drain into a container instead of collapsing the drywall. Never climb onto the roof during or after a storm. Take photos of everything — they help with both the repair and the insurance claim.",
      },
      {
        question: "Is emergency tarping a permanent fix for a leaking roof?",
        answer:
          "No. A properly installed emergency roof tarp is a temporary protective measure — it stops water from entering your Philadelphia home until the permanent repair can be scheduled. Depending on weather, a well-installed tarp will hold for 30 to 90 days. We always return to complete the permanent roof repair and remove the tarp.",
      },
      {
        question: "Will my homeowner's insurance pay for emergency roof repair in Philadelphia?",
        answer:
          "Insurance usually covers sudden events — wind damage, hail, a tree falling on your roof, storm debris. It does not typically cover wear, age, or deferred maintenance. Our emergency roof repair documentation (date-stamped photos, written report, itemized estimate) is designed to support a legitimate claim. We can also meet your adjuster on-site and walk the damage with them.",
      },
      {
        question: "How long does an emergency roof tarp last?",
        answer:
          "A professionally installed emergency tarp — heavy-gauge polyethylene, secured with batten strips screwed into solid decking, overlapped properly to shed water downslope — will typically hold 30 to 90 days depending on weather. Tarps weighted down with bricks or sandbags blow off in the first windstorm and are not a reliable short-term fix.",
      },
      {
        question: "Do you handle emergency leaks on flat EPDM rubber roofs?",
        answer:
          "Yes — flat rubber roof leaks are one of the most common emergency calls we get in South Philly, Fishtown, Kensington, and West Philadelphia. We diagnose EPDM seam failures, punctures, parapet-wall tie-in leaks, and drain leaks, then repair them the same day whenever weather permits.",
      },
      {
        question: "A tree fell on my roof in Philadelphia — what should I do?",
        answer:
          "Stay out of the affected rooms if the ceiling is sagging or debris is coming through. Call us at (267) 255-3620 and take photos from a safe distance. Do not attempt to remove the tree yourself — large limbs can shift and cause more damage or injury. We remove the debris safely, tarp the opening, document the damage for insurance, and schedule the permanent repair.",
      },
      {
        question: "Do you repair ice dam leaks in Philadelphia winters?",
        answer:
          "Yes. Ice dams are one of the most common emergency roof calls from Northeast Philadelphia — Mayfair, Bustleton, Somerton, the Far Northeast — every January and February. We thaw the dam, stop the active leak, and diagnose the root cause (usually inadequate attic ventilation or insulation). Ice dams left alone will cause the same leak every winter until the underlying problem is fixed.",
      },
      {
        question: "How much does a roof tarp cost in Philadelphia?",
        answer:
          "Emergency tarping in Philadelphia typically starts around $300–$500 for a standard residential tarp installation. The price depends on the size of the damaged area, the difficulty of access, and whether any debris needs to be removed first. Permanent repairs are quoted separately — and we always provide a free written estimate before starting permanent work.",
      },
      {
        // GSC: "who does emergency roof tarping in philadelphia after wind
        // damage" — 94 impr @ pos 2.2 (AI fan-out phrasing). Entity-first,
        // quotable answer.
        question: "Who does emergency roof tarping in Philadelphia?",
        answer:
          "Adilay Roofing provides 24/7 emergency roof tarping across Philadelphia and the surrounding counties. Call (267) 255-3620 any time — we dispatch a crew, typically the same day, to install a secured reinforced tarp that stops water intrusion after wind, storm, or tree damage. Tarping is free to quote and usually reimbursable through homeowner's insurance.",
      },
    ],
    bodySections: [
      {
        heading: "Common Philadelphia Roofing Emergencies We Respond To",
        html: `<p>When your roof fails in a storm, you want a Philadelphia roofer who has already seen exactly what is happening to your house. After two decades responding to emergency roof repair calls across the city, these are the situations we handle week in and week out.</p>
<h3>Storm wind and hail damage</h3>
<p>Philadelphia sits in the path of nor'easters rolling up the Delaware Valley and convective summer storms pushing across from central Pennsylvania. Sustained winds above 50 mph lift asphalt shingles off the decking and tear flashing away from chimneys and skylights. Hail cracks shingle mats and punches through aging flat-roof membranes. If your neighbors' roofs look chewed up the morning after a storm, yours probably is too — call for a free inspection before the next rain.</p>
<h3>Flat rubber roof leaks on row homes</h3>
<p>Nearly every flat EPDM and modified bitumen roof in South Philly, Fishtown, Kensington, and the older blocks of West Philadelphia eventually fails the same way — at the seams, around the drain, or where the membrane ties into the parapet wall. A pinhole leak in the rubber sends water running along the roof decking until it finds the nearest light fixture or ceiling seam and dumps it inside. Flat-roof leak diagnosis and same-day emergency repair is a daily job for our crew.</p>
<h3>Ice dam leaks in Northeast Philadelphia</h3>
<p>Mayfair, Bustleton, Somerton, Rhawnhurst, and the Far Northeast get the coldest, snowiest winter weather in the city. When warm attic air melts snow on the upper roof, water runs down and refreezes at the cold eaves — backing up under the shingles. Ice dams rip out gutters, soak insulation, and drip water through ceilings for weeks. We thaw the ice, stop the active leak, and fix the ventilation problem underneath so it does not happen again next winter.</p>
<h3>Fallen tree limbs and storm debris</h3>
<p>The tree canopy across Mount Airy, Chestnut Hill, Roxborough, and the older parts of West Philadelphia is beautiful — and it drops heavy limbs on roofs every time there is a real windstorm. Limbs crack decking, split shingles, and puncture flat roofs. We remove the debris safely, stabilize the opening with an emergency tarp, document the damage for your insurance, and follow up with permanent repairs.</p>
<h3>Chimney flashing and skylight leaks</h3>
<p>Most "sudden" roof leaks are actually old flashing or sealant that finally let go. Chimney flashing, skylight curbs, and plumbing boot seals are the three most common culprits on Philadelphia homes. We reseal, re-flash, or rebuild the detail the right way — not just a caulk gun and a prayer.</p>
<h3>Active leaks from unknown sources</h3>
<p>When water is dripping through a ceiling and you cannot tell where it is getting in, do not guess — call. We trace the leak back to its source, stop it that day, and give you a written estimate for the permanent fix.</p>`,
      },
      {
        heading: "Our Same-Day Emergency Roof Repair Response Timeline",
        html: `<p>When you call (267) 255-3620 for emergency roof repair in Philadelphia, here is exactly what happens next.</p>
<ol>
  <li><strong>Call received, 24/7.</strong> A real person from Adilay Roofing answers and gets the basics — your address, what you are seeing, and how fast water is coming in. If the leak is actively filling ceilings or pouring down walls, we prioritize your call immediately.</li>
  <li><strong>Dispatch within hours for active leaks.</strong> For emergency roof repair across Philadelphia, Bucks, Montgomery, Delaware, and Chester counties, our crew is typically on your property the same day. During major storm events we schedule by severity — active interior leaks come first.</li>
  <li><strong>On-site diagnosis and photo documentation.</strong> A licensed Philadelphia emergency roofer walks the roof, identifies the source of the leak, and photographs every point of damage. You get the photos; so does your insurance adjuster if there is a claim.</li>
  <li><strong>Emergency tarping or temporary weatherproofing.</strong> If the leak cannot be permanently fixed on the spot — weather, time of day, scope of damage — we install a properly-secured emergency tarp or temporary flashing to stop water from entering until permanent repairs can be completed.</li>
  <li><strong>Written estimate for the permanent repair.</strong> You get a transparent quote with no hidden fees before we do any chargeable permanent work. If you accept, we schedule the repair. If insurance is involved, we coordinate directly with your adjuster.</li>
  <li><strong>Permanent repair scheduled quickly.</strong> Most permanent emergency roof repairs in Philadelphia can be completed within 1–3 days of the initial response, weather permitting.</li>
</ol>`,
      },
      {
        heading: "Emergency Tarping and Temporary Weatherproofing — Done Right",
        html: `<p>Emergency tarping is not glamorous — but done properly, it saves Philadelphia homeowners thousands of dollars in interior water damage while they wait for permanent repairs. A cheap tarp weighted down with bricks will flap loose in the first gust of wind and make the problem worse. Here is how a professional emergency roof tarp is installed:</p>
<ul>
  <li><strong>Heavy-gauge polyethylene tarp sized to overlap the damage by at least three feet on every side.</strong> Larger overlap means less chance of water running under the edge.</li>
  <li><strong>Battens secured through the tarp into solid decking.</strong> We use 1x3 or 2x4 wood strips screwed through the tarp edges into sound framing — not through rotted areas or over open seams.</li>
  <li><strong>Orientation that sheds water downslope,</strong> with the top edge tucked under existing shingles wherever possible so rain runs across and off the tarp, not underneath it.</li>
  <li><strong>Targeted temporary flashing for specific leaks</strong> — a skylight seal failure, a chimney crack, or a plumbing boot tear often needs a small temporary flashing repair instead of a full tarp.</li>
</ul>
<p>Emergency tarping is not a permanent fix. Properly installed, a tarp holds for 30 to 90 days depending on weather — enough time to document the damage, work through an insurance claim, and schedule the permanent roof repair. We always return to complete the permanent fix and remove the tarp.</p>`,
      },
      {
        heading: "Working With Your Homeowner's Insurance After Storm Damage",
        html: `<p>If the damage to your Philadelphia roof was caused by a sudden event — wind, hail, a fallen limb, storm debris — there is a good chance your homeowner's insurance will cover the repair. Insurance policies generally <strong>do not</strong> cover damage caused by wear and tear, deferred maintenance, or old age. Our emergency roof repair documentation is designed to draw a clear line between the two.</p>
<p>Here is what you get from Adilay Roofing after every emergency response:</p>
<ul>
  <li><strong>Date-stamped, high-resolution photographs</strong> of every point of damage, plus wide shots showing the overall condition of the roof.</li>
  <li><strong>A written damage report</strong> describing the cause of the leak, the roofing systems affected, and the recommended permanent repair.</li>
  <li><strong>An itemized estimate</strong> for the permanent repair broken out by labor, materials, and disposal — the format adjusters are used to seeing.</li>
  <li><strong>Direct coordination with your insurance adjuster.</strong> If you want us to, we will meet the adjuster on your property, walk the roof with them, and answer their questions on-site.</li>
</ul>
<p>What to do the moment you notice storm damage on your roof: <strong>call us first for emergency stabilization</strong>, then call your insurance carrier to open a claim. Adjusters move faster when the damage is already documented and a licensed PA roofing contractor has eyes on the property.</p>`,
      },
      {
        heading: "Emergency Response Across Philadelphia Neighborhoods",
        html: `<p>Adilay Roofing responds to emergency roof repair calls across every Philadelphia neighborhood and the surrounding Pennsylvania counties. Our office is at 2020 Dreer Street in Kensington, so we are usually minutes away. Below is a snapshot of the situations we see most often in each area.</p>
<h3><a href="/service-areas/northeast-philadelphia">Northeast Philadelphia</a></h3>
<p>Mayfair, Bustleton, Rhawnhurst, and Somerton see the heaviest ice dam and wind damage calls in the city. Twin homes and post-war ranchers on undersized attic ventilation are especially vulnerable. If snow is sliding down your roof into frozen chunks at the gutter line, call before the next thaw.</p>
<h3><a href="/service-areas/south-philadelphia">South Philadelphia</a></h3>
<p>Nearly every flat rubber roof in South Philly eventually needs emergency attention. Rowhouse roofs past 20 years old start leaking at seams, drains, and parapet tie-ins — often without warning. We repair EPDM and modified bitumen flat roofs daily in Point Breeze, Passyunk Square, Pennsport, and Grays Ferry.</p>
<h3><a href="/service-areas/manayunk">Manayunk and Roxborough</a></h3>
<p>Hillside homes, heavy tree canopies, and older steep-pitched roofs make this corner of the city a recurring emergency call. Fallen limbs and torn flashing top the list.</p>
<h3><a href="/service-areas/fishtown">Fishtown and Northern Liberties</a></h3>
<p>Newer rooftop decks and converted warehouses in Fishtown, Northern Liberties, and Kensington rely on flat EPDM and TPO membranes that have to be detailed correctly around deck supports and drains. When a seam fails here, water moves fast.</p>
<h3><a href="/service-areas/germantown">Germantown, Mount Airy, and Chestnut Hill</a></h3>
<p>Older Victorians and stone colonials in these neighborhoods often still carry original slate or built-up tar roofs well past their intended lifespan. Sudden failures are common after heavy winter weather.</p>
<h3><a href="/service-areas/philadelphia">All of Philadelphia County</a></h3>
<p>From Center City brownstones to the Far Northeast, from West Philly rowhouses to Chestnut Hill — if you need emergency roof repair in Philadelphia PA, Adilay Roofing is already nearby. Call <a href="tel:+12672553620">(267) 255-3620</a> any time.</p>`,
      },
    ],
  },
  {
    slug: "commercial-roofing",
    title: "Commercial Roofing",
    shortTitle: "Commercial Roofing",
    tagline: "Reliable Commercial Roofing Solutions for Philadelphia Businesses",
    category: "roofing",
    description:
      "Professional commercial roofing installation, repair, and maintenance in Philadelphia. Flat roofs, metal roofing, and TPO systems for businesses, warehouses, and multi-unit properties.",
    icon: "",
    image: "/images/commercial-roofing-philadelphia.jpg",
    heroDescription:
      "Your commercial property deserves a roofing system that protects your business, your inventory, and your tenants without disruption. Adilay Roofing provides comprehensive commercial roofing services in Philadelphia and the surrounding areas of Bucks County, Montgomery County, Delaware County, and Chester County, delivering reliable solutions for businesses of all sizes. Licensed under PA184779 and fully insured, our experienced team specializes in commercial flat roof systems including EPDM rubber roofing, TPO single-ply membrane, and modified bitumen — as well as commercial metal roofing for warehouses, industrial buildings, and retail spaces. We understand that commercial roofing projects require careful planning to minimize disruption to your daily operations. That is why we work around your schedule, completing projects efficiently while maintaining the highest standards of safety and workmanship. Whether you manage a retail storefront in Center City, a warehouse in Northeast Philadelphia, a multi-unit residential building, or an office complex in the suburbs, Adilay Roofing has the commercial roofing expertise to handle your project from start to finish. Our commercial roofing services include new roof installation, full roof replacement, leak repair, preventive maintenance programs, and roof inspections. Contact us today for a free commercial roofing estimate — we will assess your property, recommend the best roofing system for your needs, and provide transparent pricing with no hidden fees.",
    benefits: [
      "Expert flat roof and low-slope commercial roofing systems",
      "EPDM, TPO, modified bitumen, and metal roofing options",
      "Minimal disruption to your business operations",
      "Licensed and insured commercial contractor (PA184779)",
      "Preventive maintenance programs to extend roof life",
      "Comprehensive roof inspections and condition reports",
      "Serving Philadelphia and surrounding counties",
      "Free estimates with transparent, competitive pricing",
    ],
    features: [
      "Commercial flat roof installation and replacement",
      "EPDM rubber and TPO membrane systems",
      "Modified bitumen roofing installation",
      "Commercial metal roofing installation",
      "Preventive maintenance and inspection programs",
      "Leak detection and commercial roof repair",
      "Roof coating and restoration services",
      "Drainage improvement and ponding water correction",
    ],
    faq: [
      {
        question: "What types of commercial roofing systems do you install?",
        answer:
          "We install a full range of commercial roofing systems including EPDM rubber membrane, TPO single-ply membrane, modified bitumen, and commercial metal roofing. We will assess your building's requirements and recommend the best system for your property type, budget, and long-term goals.",
      },
      {
        question: "How much does commercial roofing cost in Philadelphia?",
        answer:
          "Commercial roofing costs in Philadelphia vary widely based on the size of the roof, the roofing system selected, and the condition of the existing roof. Commercial flat roof projects typically range from $5 to $12 per square foot. We provide free, detailed estimates for every commercial project with no hidden fees or surprise charges.",
      },
      {
        question: "Do I need a permit for commercial roofing in Philadelphia?",
        answer:
          "Yes, commercial roofing projects in Philadelphia require building permits. As a licensed contractor (PA184779), we handle all permit applications, inspections, and code compliance requirements on your behalf, ensuring your project meets all City of Philadelphia building regulations.",
      },
      {
        question: "How long does a commercial roof last?",
        answer:
          "The lifespan of a commercial roof depends on the system installed and how well it is maintained. EPDM roofs typically last 20–30 years, TPO systems last 15–25 years, and commercial metal roofs can last 40+ years. Regular maintenance and inspections can significantly extend the life of any commercial roofing system.",
      },
      {
        question: "Can you work around our business hours to minimize disruption?",
        answer:
          "Absolutely. We understand that a roofing project cannot shut down your business. We schedule commercial roofing work around your operating hours, whether that means early mornings, evenings, or weekends. We also take extra precautions to manage noise, debris, and access so your employees, customers, and tenants are minimally affected.",
      },
    ],
  },
  // === NEW SERVICE PAGES ===
  {
    slug: "residential-roofing",
    title: "Residential Roofing",
    shortTitle: "Residential Roofing",
    tagline: "Trusted Residential Roofing Contractor in Philadelphia PA",
    category: "roofing",
    description:
      "Adilay Roofing is Philadelphia's trusted residential roofing contractor. We handle roof installation, replacement, and repair for homes across Philadelphia and surrounding counties.",
    icon: "",
    image: "/images/roof-replacement-philadelphia.jpg",
    heroDescription:
      "Your home is your most important investment, and the roof over your head is its first line of defense against the elements. Adilay Roofing is a trusted residential roofing contractor serving homeowners throughout Philadelphia and the surrounding areas of Bucks County, Montgomery County, Delaware County, and Chester County. Licensed under PA184779 and fully insured, our experienced crew has been helping Philadelphia-area families protect their homes with quality roofing services for over 20 years. We handle every type of residential roofing project — from new roof installations on custom-built homes to complete tear-off and replacement of aging roofs, and everything in between. Our residential roofing expertise covers asphalt shingle roofs, architectural shingle upgrades, flat EPDM rubber roofing for row homes and additions, and metal roofing for homeowners looking for maximum durability. We understand that every home and every homeowner is different, which is why we take the time to listen to your needs, inspect your roof thoroughly, and provide personalized recommendations based on your home's specific requirements, your budget, and your long-term goals. At Adilay Roofing, we believe in doing the job right the first time with premium materials, clean workmanship, and transparent pricing. Contact us today for a free residential roofing estimate in Philadelphia — no pressure, no hidden fees, just honest advice from a team that treats your home like our own.",
    benefits: [
      "Full-service residential roofing contractor",
      "All roof types — shingle, flat, metal, and more",
      "Over 20 years of experience in Philadelphia",
      "Licensed and insured (PA184779)",
      "Premium materials with manufacturer warranties",
      "Transparent pricing with no hidden fees",
      "Free estimates for all residential projects",
      "Serving Philadelphia, Bucks, Montgomery, Delaware & Chester Counties",
    ],
    features: [
      "New residential roof installation",
      "Complete roof replacement and tear-off",
      "Residential roof repair and leak fixing",
      "Architectural and 3-tab shingle installation",
      "Flat roof systems for row homes and additions",
      "Attic ventilation and ridge vent installation",
      "Skylight installation and flashing",
      "Post-project cleanup and final inspection",
    ],
    faq: [
      {
        question: "What types of residential roofing do you offer?",
        answer:
          "We offer a full range of residential roofing services including asphalt shingle installation, architectural shingle upgrades, flat EPDM rubber roofing for row homes and additions, and metal roofing. We will recommend the best option based on your home and budget.",
      },
      {
        question: "How do I choose the right roofing contractor in Philadelphia?",
        answer:
          "Look for a licensed and insured contractor with proven experience, transparent pricing, and strong local references. Adilay Roofing is licensed under PA184779, fully insured, and has been serving Philadelphia homeowners for over 20 years. We provide free estimates and never pressure you into a decision.",
      },
      {
        question: "How much does residential roofing cost in Philadelphia?",
        answer:
          "Residential roofing costs depend on the size of your roof, the materials selected, and the scope of work. Most residential projects range from $5,000 to $25,000. We provide free, detailed estimates with transparent pricing so you know exactly what to expect.",
      },
      {
        question: "Do you offer warranties on residential roofing work?",
        answer:
          "Yes, all of our residential roofing projects include manufacturer warranties on materials and our own workmanship guarantee. We stand behind every roof we install or repair and will provide you with written warranty documentation upon completion.",
      },
    ],
  },
  {
    slug: "flat-roof-repair",
    title: "Flat Roof Repair",
    shortTitle: "Flat Roof Repair",
    tagline: "Expert Flat Roof Repair in Philadelphia — Stop Leaks Fast",
    category: "roofing",
    description:
      "Professional flat roof repair services in Philadelphia. We fix leaks, ponding water, membrane damage, and seam failures on EPDM, TPO, and modified bitumen flat roofs.",
    icon: "",
    image: "/images/flat-roof-philadelphia.jpg",
    heroDescription:
      "Flat roofs are common throughout Philadelphia — on row homes, commercial buildings, garages, porches, and additions — and they require specialized repair expertise that differs significantly from sloped roof repairs. At Adilay Roofing, licensed under PA184779, we provide professional flat roof repair services for residential and commercial properties across Philadelphia and the surrounding areas of Bucks County, Montgomery County, Delaware County, and Chester County. Our experienced flat roofing crew handles every type of flat roof problem including active leaks, ponding water, membrane punctures, seam failures, flashing deterioration, and blistering. We repair all flat roof systems including EPDM rubber membrane, TPO single-ply, modified bitumen, and built-up roofing (BUR). Flat roof leaks can be particularly difficult to trace because water often travels along the membrane or decking before appearing inside the building, sometimes far from the actual point of entry. Our team uses systematic leak detection methods to pinpoint the exact source of the problem and perform targeted repairs that address the root cause — not just the symptom. We also address ponding water issues that can accelerate membrane deterioration and lead to structural problems if left uncorrected. Do not let a flat roof leak cause mold, ceiling damage, or structural deterioration in your Philadelphia property. Contact Adilay Roofing today for a free flat roof repair estimate — fast response, honest pricing, and repairs built to last.",
    benefits: [
      "Specialized flat roof repair expertise",
      "All flat roof types — EPDM, TPO, modified bitumen",
      "Accurate leak detection and tracing",
      "Ponding water correction and drainage solutions",
      "Residential and commercial flat roof repair",
      "Licensed and insured contractor (PA184779)",
      "Fast response to minimize water damage",
      "Free estimates for Philadelphia and surrounding counties",
    ],
    features: [
      "EPDM membrane patch and seam repair",
      "TPO membrane welding and repair",
      "Modified bitumen patching and torch repair",
      "Flat roof leak detection and tracing",
      "Ponding water correction",
      "Flashing repair around vents and penetrations",
      "Drain and scupper cleaning and repair",
      "Emergency flat roof tarping and protection",
    ],
    faq: [
      {
        question: "What causes flat roof leaks?",
        answer:
          "Common causes include deteriorated seams, punctured membrane, failed flashing around vents and pipes, ponding water that degrades the membrane, and age-related wear. Our team will identify the exact cause and perform a lasting repair.",
      },
      {
        question: "How much does flat roof repair cost in Philadelphia?",
        answer:
          "Flat roof repair costs in Philadelphia depend on the type of repair and the extent of the damage. Small patch repairs typically cost $300–$800, while more extensive repairs involving seam work, flashing, or drainage correction can range from $1,000 to $3,000. We provide free estimates with no obligation.",
      },
      {
        question: "Can you repair my flat roof without replacing it entirely?",
        answer:
          "Yes, in most cases flat roof problems can be repaired without a full replacement. If the membrane is in generally good condition and the damage is localized, targeted repairs are a cost-effective solution. We will inspect your flat roof and give you an honest recommendation.",
      },
      {
        question: "How do you find leaks on a flat roof?",
        answer:
          "We use systematic inspection methods including visual examination of seams, flashing, and membrane condition, as well as moisture detection techniques. Because water can travel along a flat roof before appearing inside, we trace the leak path carefully to find the actual point of entry.",
      },
      {
        question: "Do you repair flat roofs on commercial buildings in Philadelphia?",
        answer:
          "Yes, we repair flat roofs on both residential and commercial properties throughout Philadelphia. Our team has extensive experience with commercial EPDM, TPO, and modified bitumen systems on warehouses, retail buildings, office complexes, and multi-unit properties.",
      },
    ],
  },
  {
    slug: "vinyl-siding",
    title: "Vinyl Siding",
    shortTitle: "Vinyl Siding",
    tagline: "Affordable Vinyl Siding Installation in Philadelphia PA",
    category: "siding",
    description:
      "Professional vinyl siding installation and repair in Philadelphia. Low-maintenance, durable, and available in a wide range of colors and styles to suit any home.",
    icon: "",
    image: "/images/siding-philadelphia.jpg",
    heroDescription:
      "Vinyl siding is the most popular siding material in America for good reason — it is affordable, virtually maintenance-free, and available in an enormous range of colors, textures, and styles that can complement any home's architecture. At Adilay Roofing, licensed under PA184779, we provide professional vinyl siding installation and repair services throughout Philadelphia and the surrounding areas of Bucks County, Montgomery County, Delaware County, and Chester County. Modern vinyl siding has come a long way from the thin, easily damaged products of decades past. Today's premium vinyl siding is engineered with advanced UV inhibitors to resist fading, reinforced construction for superior wind resistance, and realistic wood-grain textures that rival the appearance of natural wood at a fraction of the cost and maintenance. Our experienced crew installs vinyl siding with precision, ensuring proper overlap, secure fastening, and adequate expansion gaps to accommodate Philadelphia's wide temperature swings between summer and winter. Every vinyl siding installation includes house wrap for moisture protection, insulation board for improved energy efficiency, and professional trim finishing for a clean, polished result. We also offer insulated vinyl siding panels that provide an additional R-value to help reduce your heating and cooling costs. Whether you are updating a Philadelphia row home, re-siding a suburban colonial, or adding vinyl siding to a home addition, contact Adilay Roofing today for a free vinyl siding estimate — quality materials, expert installation, and transparent pricing.",
    benefits: [
      "Most affordable siding material option",
      "Virtually maintenance-free — no painting needed",
      "Wide range of colors, styles, and textures",
      "UV-resistant to prevent fading",
      "Strong wind resistance ratings",
      "Licensed and insured installation (PA184779)",
      "Insulated vinyl option for better energy efficiency",
      "Free estimates for Philadelphia and surrounding counties",
    ],
    features: [
      "Standard and premium vinyl siding installation",
      "Insulated vinyl siding panels",
      "Dutch lap, clapboard, and board-and-batten styles",
      "House wrap and moisture barrier installation",
      "Insulation board beneath siding",
      "Soffit, fascia, and trim in matching vinyl",
      "Old siding removal and proper disposal",
      "Window and door trim finishing",
    ],
    faq: [
      {
        question: "How long does vinyl siding last?",
        answer:
          "Quality vinyl siding typically lasts 20–40 years with minimal maintenance. Premium insulated vinyl siding may last even longer. The key to longevity is proper installation with adequate expansion gaps and secure fastening.",
      },
      {
        question: "Does vinyl siding fade in the Philadelphia sun?",
        answer:
          "Modern vinyl siding is manufactured with UV inhibitors that significantly reduce fading. While some very slight color change may occur over many years, today's premium vinyl siding maintains its appearance far better than products from previous decades.",
      },
      {
        question: "How much does vinyl siding cost in Philadelphia?",
        answer:
          "Vinyl siding installation in Philadelphia typically costs $4–$8 per square foot, depending on the grade of vinyl and the complexity of the installation. Insulated vinyl siding costs slightly more but provides better energy efficiency. We provide free estimates with transparent pricing.",
      },
      {
        question: "Is vinyl siding good for Philadelphia's climate?",
        answer:
          "Yes, vinyl siding handles Philadelphia's climate well, including hot summers, cold winters, and heavy rain. Proper installation with expansion gaps is essential to prevent buckling during temperature swings. Our experienced crew ensures correct installation for the local climate.",
      },
      {
        question: "Can vinyl siding be installed over existing siding?",
        answer:
          "In some cases, vinyl siding can be installed over existing siding, but we generally recommend removing the old siding first. This allows us to inspect the sheathing and house wrap, address any moisture issues, and ensure the best possible result.",
      },
    ],
  },
  {
    slug: "window-repair",
    title: "Window Repair",
    shortTitle: "Window Repair",
    tagline: "Professional Window Repair Services in Philadelphia PA",
    category: "windows",
    description:
      "Expert window repair in Philadelphia. We fix broken glass, failed seals, stuck windows, damaged frames, and hardware issues to restore your windows' function and efficiency.",
    icon: "",
    image: "/images/window-installation-philadelphia.jpg",
    heroDescription:
      "Not every window problem requires a full replacement — in many cases, professional window repair can restore your windows' function, appearance, and energy efficiency at a fraction of the cost. At Adilay Roofing, licensed under PA184779, we provide expert window repair services throughout Philadelphia and the surrounding areas of Bucks County, Montgomery County, Delaware County, and Chester County. Our experienced team handles a wide range of window repairs including broken or cracked glass replacement, failed seal repair for foggy double-pane windows, stuck or difficult-to-operate sash repair, damaged frame repair, hardware replacement, and weatherstripping installation. We repair all window types including double-hung, casement, sliding, bay, and bow windows in vinyl, wood, and aluminum frames. A window that does not close properly, has a broken seal, or is missing weatherstripping is costing you money every day in wasted energy and leaving your home vulnerable to moisture intrusion and drafts. Our repair process starts with a thorough assessment of the problem, followed by a clear explanation of your options and an honest recommendation on whether repair or replacement makes more sense for your situation. We believe in giving you straight answers, not upselling unnecessary work. Contact Adilay Roofing today for a free window repair estimate in Philadelphia — fast service, fair pricing, and repairs done right.",
    benefits: [
      "Cost-effective alternative to full replacement",
      "Restore window function and energy efficiency",
      "All window types — double-hung, casement, sliding, and more",
      "Broken glass and failed seal repair",
      "Honest advice on repair vs. replacement",
      "Licensed and insured contractor (PA184779)",
      "Fast turnaround for most repairs",
      "Free estimates for Philadelphia and surrounding counties",
    ],
    features: [
      "Broken and cracked glass replacement",
      "Failed seal repair for foggy windows",
      "Stuck sash and balance repair",
      "Window frame repair and restoration",
      "Hardware and lock replacement",
      "Weatherstripping installation and replacement",
      "Caulking and exterior seal repair",
      "Window screen repair and replacement",
    ],
    faq: [
      {
        question: "Can you fix foggy windows with failed seals?",
        answer:
          "In some cases, foggy double-pane windows can be repaired by replacing just the insulated glass unit (IGU) rather than the entire window. We will assess your windows and let you know if repair is a viable option or if replacement makes more sense.",
      },
      {
        question: "How much does window repair cost in Philadelphia?",
        answer:
          "Window repair costs in Philadelphia vary depending on the type of repair. Simple hardware or weatherstripping repairs may cost $75–$200 per window, while glass replacement or seal repair typically ranges from $150–$500 per window. We provide free estimates so you know the cost before any work begins.",
      },
      {
        question: "When should I repair vs. replace my windows?",
        answer:
          "Repair makes sense when the window frames are in good condition and the issue is isolated — such as a broken pane, stuck sash, or worn weatherstripping. Replacement is usually better when frames are rotting, windows are very old, or you are experiencing widespread efficiency problems. We will give you an honest recommendation.",
      },
      {
        question: "Do you repair wood windows in older Philadelphia homes?",
        answer:
          "Yes, we have experience repairing wood windows commonly found in older Philadelphia homes, including sash repair, frame restoration, reglazing, and hardware replacement. We can help preserve the character of your older windows while improving their function.",
      },
    ],
  },
  {
    slug: "gutter-cleaning",
    title: "Gutter Cleaning",
    shortTitle: "Gutter Cleaning",
    tagline: "Gutter Cleaning Philadelphia PA — Affordable, Same-Week Scheduling",
    category: "gutters",
    description:
      "Gutter cleaning Philadelphia PA homeowners trust. Hand debris removal, downspout flushing, inspection, and before/after photos. Affordable pricing, licensed PA184779.",
    icon: "",
    image: "/images/gutters-philadelphia.png",
    heroDescription:
      "Clogged gutters are one of the most common — and most preventable — causes of water damage to Philadelphia homes. When leaves, twigs, shingle granules, and other debris build up, water can't reach your downspouts and instead overflows onto your siding, pools around your foundation, and eventually seeps into your basement. Adilay Roofing provides professional gutter cleaning Philadelphia PA homeowners rely on, licensed under PA184779 and backed by 20+ years on local roofs. We serve Philadelphia and the surrounding counties — Bucks, Montgomery, Delaware, and Chester — with same-week scheduling for most appointments and affordable, transparent pricing. Our gutter cleaning service in Philadelphia is thorough from start to finish: we remove all debris from your gutters by hand (not leaf blowers that just spread the mess across your yard), flush every downspout with water to confirm clear flow, check the pitch and drainage of every run, and inspect your gutter system for loose hangers, damaged seams, sagging, or deteriorating seals — all documented with before-and-after photos we leave with you. Most Philadelphia row homes, twin homes, and Colonials need their gutters cleaned at least twice a year: once in late spring after pollen and seed pods drop, and once in late fall after the leaves come down. Homes in Manayunk, Roxborough, Chestnut Hill, Mount Airy, and the Main Line with mature tree coverage often need 3–4 visits per year to stay ahead of clogs. Regular professional gutter cleaning in Philadelphia is one of the most cost-effective things you can do for your home — it prevents foundation cracks, basement flooding, siding rot, ice dams in winter, and landscape erosion, and it extends the lifespan of the gutter system itself. Call Adilay Roofing today for affordable gutter cleaning Philadelphia PA crews can schedule this week — written quote upfront, no surprises, and before-and-after photos with every job.",
    benefits: [
      "Prevent foundation damage and basement flooding",
      "Protect siding and landscaping from overflow",
      "Extend the lifespan of your gutter system",
      "Identify gutter damage before it becomes costly",
      "Prevent ice dams in winter months",
      "Licensed and insured contractor (PA184779)",
      "Thorough cleaning including downspout flushing",
      "Affordable pricing for Philadelphia homeowners",
    ],
    features: [
      "Hand removal of all leaves and debris",
      "Downspout flushing to ensure clear flow",
      "Gutter pitch and drainage check",
      "Gutter condition inspection and damage report",
      "Loose hanger tightening and reattachment",
      "Minor seal repair during cleaning",
      "Roof edge and valley debris removal",
      "Before and after photos for your records",
    ],
    faq: [
      {
        question: "How often should I have my gutters cleaned?",
        answer:
          "We recommend at least twice a year — late spring and late fall. Homes with overhanging trees may need cleaning 3–4 times per year. Regular cleaning prevents clogs, overflow, and the damage they cause.",
      },
      {
        question: "How much does gutter cleaning cost in Philadelphia?",
        answer:
          "Gutter cleaning costs in Philadelphia typically range from $100 to $300 for a standard home, depending on the size of the house, the linear footage of gutters, and the amount of debris. We provide upfront pricing before starting any work.",
      },
      {
        question: "Can clogged gutters really cause foundation damage?",
        answer:
          "Yes, when gutters overflow, water pools around your foundation and can cause cracking, settling, and basement flooding over time. Properly functioning gutters direct water away from your foundation through downspouts and extensions. Regular cleaning is a simple way to prevent expensive foundation problems.",
      },
      {
        question: "Do you inspect gutters during cleaning?",
        answer:
          "Yes, every gutter cleaning includes a basic inspection of your gutter system. We check for damage, loose hangers, deteriorating seals, and proper pitch. If we find issues that need repair, we will let you know and provide a separate estimate.",
      },
    ],
  },
  {
    slug: "gutter-installation",
    title: "Gutter Installation",
    shortTitle: "Gutter Install",
    tagline: "Expert Gutter Installation in Philadelphia — Seamless Gutters Custom-Fit to Your Home",
    category: "gutters",
    description:
      "Professional gutter installation in Philadelphia. We install seamless aluminum gutters custom-fabricated on-site for a leak-free fit that protects your foundation and landscaping.",
    icon: "",
    image: "/images/gutters-philadelphia.png",
    heroDescription:
      "Properly installed gutters are essential for directing rainwater away from your home's foundation, siding, landscaping, and walkways — and in Philadelphia's climate with heavy spring rains, fall leaf drop, and winter ice, a quality gutter system is not optional, it is a necessity. At Adilay Roofing, licensed under PA184779, we provide professional gutter installation services throughout Philadelphia and the surrounding areas of Bucks County, Montgomery County, Delaware County, and Chester County. We specialize in seamless aluminum gutters that are custom-fabricated on-site using our portable gutter machine, creating a continuous run of gutter for each section of your roofline with no joints or seams to leak. Seamless gutters provide a cleaner appearance and dramatically superior performance compared to traditional sectional gutters that are pieced together and sealed at every joint. Our gutter installation process includes a thorough assessment of your home's roofline and drainage needs, proper fascia board inspection and repair, precise gutter pitch calculation for optimal water flow, strategic downspout placement, and your choice of gutter guard and leaf protection systems to reduce maintenance. We install 5-inch and 6-inch K-style gutters as well as half-round gutters in a wide range of colors to complement your home's exterior. Contact Adilay Roofing today for a free gutter installation estimate — custom-fit gutters, expert installation, and lasting protection for your Philadelphia home.",
    benefits: [
      "Seamless gutters for leak-free performance",
      "Custom-fabricated on-site to fit your home exactly",
      "Proper foundation protection and water management",
      "Wide range of colors to match your home",
      "Gutter guard options to reduce maintenance",
      "Licensed and insured contractor (PA184779)",
      "Fascia inspection and repair included",
      "Free estimates for Philadelphia and surrounding counties",
    ],
    features: [
      "Seamless aluminum gutter fabrication and installation",
      "5-inch and 6-inch K-style gutter options",
      "Half-round gutter installation",
      "Custom color matching to your home's exterior",
      "Downspout installation and strategic placement",
      "Gutter guard and leaf protection systems",
      "Fascia board inspection and repair before installation",
      "Proper pitch calculation for optimal drainage",
    ],
    faq: [
      {
        question: "What are seamless gutters and why are they better?",
        answer:
          "Seamless gutters are custom-fabricated on-site in one continuous piece for each section of your roofline, eliminating the joints and seams found in sectional gutters. This dramatically reduces the chance of leaks and gives your home a cleaner appearance.",
      },
      {
        question: "How much does gutter installation cost in Philadelphia?",
        answer:
          "Gutter installation costs in Philadelphia typically range from $6 to $15 per linear foot for seamless aluminum gutters. A full gutter installation for an average Philadelphia home usually costs between $1,500 and $4,000. We provide free estimates with no hidden fees.",
      },
      {
        question: "Do I need gutter guards with new gutters?",
        answer:
          "Gutter guards are optional but highly recommended, especially if you have trees near your home. They dramatically reduce the amount of debris that enters your gutters, minimizing maintenance and preventing clogs that can cause water damage.",
      },
      {
        question: "How long do new gutters last?",
        answer:
          "Seamless aluminum gutters typically last 20–30 years or more with proper maintenance. The key to longevity is proper installation with correct pitch, secure fastening to sound fascia boards, and regular cleaning or gutter guard protection.",
      },
      {
        question: "Can you replace just part of my gutter system?",
        answer:
          "Yes, we can replace damaged sections of your gutter system without replacing the entire thing. However, if your gutters are old and showing widespread wear, a full replacement with seamless gutters is usually the better long-term investment.",
      },
    ],
  },
  {
    slug: "gutter-screening",
    title: "Gutter Screening Service",
    shortTitle: "Gutter Screens",
    tagline: "Professional Gutter Screening and Guard Installation in Philadelphia",
    category: "gutters",
    description:
      "Expert gutter screening and gutter guard installation in Philadelphia. Keep leaves and debris out of your gutters and eliminate the hassle of constant gutter cleaning.",
    icon: "",
    image: "/images/gutters-philadelphia.png",
    heroDescription:
      "If you are tired of climbing a ladder to clean your gutters multiple times a year — or paying someone else to do it — gutter screening is the solution. At Adilay Roofing, licensed under PA184779, we install professional gutter screens and gutter guard systems throughout Philadelphia and the surrounding areas of Bucks County, Montgomery County, Delaware County, and Chester County. Gutter screens and guards sit on top of or inside your existing gutters, allowing rainwater to flow through while blocking leaves, twigs, pine needles, shingle granules, and other debris that cause clogs and overflow. Philadelphia's abundant tree canopy drops an enormous amount of debris into gutters every fall, and spring brings pollen, seed pods, and flower petals that can quickly build up and block water flow. Without gutter screening, homeowners face the recurring expense and safety risk of climbing ladders to clean gutters multiple times per year. Our gutter screening options include micro-mesh gutter guards for the finest filtration, aluminum screen guards for effective debris blocking, and solid gutter covers with surface tension design for maximum water flow. We will assess your home's specific needs — including the types of trees surrounding your property, your roof pitch, and your existing gutter system — to recommend the best gutter screening solution. Every installation is performed by our experienced crew with proper technique to ensure the guards stay secure through heavy rain, wind, and ice. Contact Adilay Roofing today for a free gutter screening estimate and say goodbye to constant gutter cleaning.",
    benefits: [
      "Eliminate the need for frequent gutter cleaning",
      "Prevent clogs from leaves, twigs, and debris",
      "Protect your foundation from gutter overflow",
      "Multiple guard styles for every situation",
      "Professional installation that stays secure",
      "Licensed and insured contractor (PA184779)",
      "Reduce safety risk of climbing ladders",
      "Free estimates for Philadelphia and surrounding counties",
    ],
    features: [
      "Micro-mesh gutter guard installation",
      "Aluminum screen guard installation",
      "Solid gutter cover systems",
      "Custom fitting to existing gutter systems",
      "Gutter cleaning before guard installation",
      "Secure fastening for wind and ice resistance",
      "Compatibility check with existing roof and gutters",
      "Warranty-backed gutter guard products",
    ],
    faq: [
      {
        question: "Do gutter guards really work?",
        answer:
          "Yes, quality gutter guards significantly reduce the amount of debris that enters your gutters. While no system is 100% maintenance-free, guards dramatically reduce cleaning frequency from multiple times per year to once every few years at most.",
      },
      {
        question: "How much do gutter guards cost in Philadelphia?",
        answer:
          "Gutter guard installation costs in Philadelphia typically range from $7 to $20 per linear foot depending on the type of guard system. A full-home gutter guard installation usually costs between $1,500 and $5,000. We provide free estimates with transparent pricing.",
      },
      {
        question: "What type of gutter guard is best?",
        answer:
          "The best gutter guard depends on your specific situation. Micro-mesh guards offer the finest filtration and work well for homes surrounded by trees with small debris like pine needles. Aluminum screens are effective and affordable for general leaf protection. We will recommend the best option during your free estimate.",
      },
      {
        question: "Can gutter guards be installed on existing gutters?",
        answer:
          "Yes, most gutter guard systems are designed to be installed on your existing gutters without replacement. We will inspect your current gutters to ensure they are in good condition and properly aligned before installing guards.",
      },
      {
        question: "Do gutter guards work in Philadelphia winters?",
        answer:
          "Quality gutter guards are designed to handle snow and ice. In fact, guards can help prevent ice dams by keeping gutters clear and allowing water to flow freely. Our installations account for Philadelphia's winter conditions to ensure year-round performance.",
      },
    ],
  },
  {
    slug: "shingle-repair",
    title: "Repair Asphalt Shingle Roof",
    shortTitle: "Shingle Repair",
    tagline: "Expert Asphalt Shingle Roof Repair in Philadelphia PA",
    category: "shingles",
    description:
      "Professional asphalt shingle roof repair in Philadelphia. We fix missing, cracked, curling, and storm-damaged shingles to extend your roof's life and prevent leaks.",
    icon: "",
    image: "/images/roof-shingles-philadelphia.jpg",
    heroDescription:
      "Damaged asphalt shingles leave your roof vulnerable to leaks, moisture infiltration, and further deterioration that can spread to surrounding shingles and the underlying decking if left unrepaired. At Adilay Roofing, licensed under PA184779, we provide expert asphalt shingle roof repair services throughout Philadelphia and the surrounding areas of Bucks County, Montgomery County, Delaware County, and Chester County. Our experienced roofing crew handles every type of shingle damage including missing shingles blown off by high winds, cracked or broken shingles from hail or impact, curling and buckling shingles caused by age or poor ventilation, and granule loss that exposes the shingle mat to UV damage. We also repair damaged flashing around chimneys, vents, and skylights — a common source of leaks on shingle roofs. Our asphalt shingle repair process starts with a thorough roof inspection to identify all areas of damage, not just the obvious ones. We then carefully remove the damaged shingles, inspect the underlayment and decking beneath for moisture damage, and install new shingles that match your existing roof's color and profile as closely as possible. For storm damage, we provide detailed documentation including photos and written descriptions to support your insurance claim. Do not wait for a few damaged shingles to turn into an expensive leak. Contact Adilay Roofing today for a free asphalt shingle roof repair estimate in Philadelphia — fast response, quality workmanship, and honest pricing.",
    benefits: [
      "Extend the life of your existing shingle roof",
      "Stop leaks before they cause interior damage",
      "Color and profile matching for seamless repairs",
      "Storm damage repair with insurance documentation",
      "All shingle types — 3-tab and architectural",
      "Licensed and insured roofing contractor (PA184779)",
      "Thorough inspection identifies hidden damage",
      "Free estimates for Philadelphia and surrounding counties",
    ],
    features: [
      "Missing and blown-off shingle replacement",
      "Cracked and broken shingle repair",
      "Curling and buckling shingle correction",
      "Flashing repair around chimneys and vents",
      "Underlayment and decking inspection",
      "Granule loss assessment and shingle replacement",
      "Storm damage documentation for insurance claims",
      "Roof leak tracing and targeted repair",
    ],
    faq: [
      {
        question: "Can you repair just a few damaged shingles?",
        answer:
          "Yes, if the damage is limited to a specific area, we can replace the affected shingles without replacing the entire roof. We match the color and profile of your existing shingles as closely as possible for a seamless result.",
      },
      {
        question: "How much does shingle roof repair cost in Philadelphia?",
        answer:
          "Shingle roof repair costs in Philadelphia depend on the extent of the damage. Minor repairs like replacing a few shingles typically cost $200–$500, while more extensive repairs can range from $500 to $2,000 or more. We provide free estimates so you know the exact cost before work begins.",
      },
      {
        question: "How do I know if my shingles need repair?",
        answer:
          "Common signs include missing shingles visible from the ground, dark spots on your ceiling or walls indicating a leak, shingle granules accumulating in your gutters, curling or buckling shingles, and cracked or broken shingles. If your roof is over 15 years old, a professional inspection is recommended.",
      },
      {
        question: "Do you handle insurance claims for storm-damaged shingles?",
        answer:
          "Yes, we provide detailed damage documentation including photos and written descriptions to support your homeowner's insurance claim. We have extensive experience working with insurance companies in the Philadelphia area.",
      },
      {
        question: "Will repaired shingles match my existing roof?",
        answer:
          "We make every effort to match the color and profile of your existing shingles. Keep in mind that existing shingles may have faded slightly over time, so a perfect match is not always possible, but the repair will blend well with the surrounding shingles in most cases.",
      },
    ],
  },
  {
    slug: "storm-damage-roof-repair",
    title: "Storm Damage Roof Repair",
    shortTitle: "Storm Damage",
    tagline: "Storm Damage Roof Repair Philadelphia PA — Insurance Claim Experts",
    category: "roofing",
    description:
      "Storm damage roof repair in Philadelphia PA. Wind, hail, and tree damage — we document, repair, and help with insurance claims. Free inspections, same-day response.",
    metaTitle: "Storm Damage Roof Repair Philadelphia — Insurance Help",
    metaDescription:
      "Wind, hail or tree damage? Storm damage roof repair with emergency tarping & full insurance claim documentation. Licensed PA184779. Call (267) 255-3620.",
    icon: "",
    image: "/images/roof-repair-philadelphia.jpg",
    heroDescription:
      "Severe weather hits Philadelphia hard — nor'easters, summer thunderstorms, high-wind events, hail, and the occasional hurricane remnant all leave their mark on local roofs. If your home has taken a beating, Adilay Roofing provides fast, honest storm damage roof repair Philadelphia PA homeowners trust, backed by a Pennsylvania Home Improvement Contractor license (PA184779) and 20+ years on local roofs. We respond same-day for urgent storm damage calls across Philadelphia and the surrounding counties — from torn-off shingles in Northeast Philadelphia and wind-lifted flashing in Manayunk, to hail-bruised shingles in the Main Line suburbs and fallen-tree damage in South Philly. Our licensed crew arrives with tarps, ladders, and a camera, and the first thing we do is stop the immediate leak and document everything your insurance carrier will need: close-up photos of damaged shingles, ridge caps, flashing, fascia, and any interior water staining, plus a written scope of damage. That documentation is often the difference between a fully paid claim and a denied one. We know how insurance adjusters work, we know what they look for, and we'll meet them on-site if that helps the claim move faster. Once the claim is approved, we handle the full repair — from new shingles, underlayment, and flashing to structural decking replacement and gutter reattachment. Storm damage Philadelphia roofs suffer is rarely just cosmetic; even small cracks in shingles or lifted nail heads let water in over time and cause mold, rotted decking, and interior ceiling damage. Don't wait for the next storm to make it worse. Call Adilay Roofing today for a free storm damage roof inspection in Philadelphia — no obligation, written estimate, and honest guidance on whether to file an insurance claim.",
    benefits: [
      "Same-day response for active storm damage in Philadelphia",
      "Free storm damage roof inspection with written report",
      "Full insurance claim documentation — photos, scope, measurements",
      "We meet with your insurance adjuster on-site if needed",
      "Emergency tarping to stop water damage immediately",
      "Licensed and insured Pennsylvania contractor (PA184779)",
      "Experience with all major insurance carriers in PA",
      "Serving Philadelphia, Bucks, Montgomery, Delaware & Chester Counties",
    ],
    features: [
      "Wind-damage shingle and ridge cap replacement",
      "Hail-damage assessment and bruised-shingle repair",
      "Fallen-tree damage repair — including decking and framing",
      "Emergency tarping and active-leak stop",
      "Flashing, step flashing, and chimney repair",
      "Gutter and downspout storm damage repair",
      "Interior water damage documentation for claim",
      "Full written estimate for insurance submission",
    ],
    faq: [
      {
        question: "Does homeowners insurance cover storm damage roof repair in Philadelphia?",
        answer:
          "In most cases, yes. Standard Pennsylvania homeowners policies cover sudden, accidental storm damage — wind, hail, fallen trees, and debris. They generally do not cover wear-and-tear or poor maintenance. We provide the photos, documentation, and written scope of damage your carrier needs, and we can meet the adjuster on-site to make sure nothing is missed.",
      },
      {
        question: "How soon can you respond to storm damage in Philadelphia?",
        answer:
          "For active leaks and major storm damage, we offer same-day response across Philadelphia. If water is coming through the ceiling or shingles are scattered across your yard, call (267) 255-3620 — we'll get a crew out with tarps to stop further damage and begin the inspection.",
      },
      {
        question: "Should I file an insurance claim for roof damage?",
        answer:
          "It depends. If the damage is clearly from a named storm event and the repair cost exceeds your deductible, filing a claim usually makes sense. For smaller repairs under your deductible, paying out of pocket often avoids a premium increase. During your free inspection we'll give you an honest opinion — we don't push homeowners to file claims that aren't worth it.",
      },
      {
        question: "What kinds of storm damage do roofs in Philadelphia typically suffer?",
        answer:
          "Philadelphia roofs see torn or missing shingles from high winds, hail-bruised shingles that lose their granules, lifted or damaged flashing around chimneys and vents, clogged or torn-off gutters from debris, and fallen-tree impact damage. Flat EPDM roofs common on row homes can also develop punctures and torn seams from windblown debris.",
      },
      {
        question: "Can hidden storm damage cause problems later?",
        answer:
          "Absolutely. Small cracks, lifted shingles, and compromised flashing may look minor but let water infiltrate over weeks and months, leading to mold, rotted roof decking, and interior ceiling damage. A professional storm damage roof inspection catches these issues early — often before your insurance claim window closes.",
      },
      {
        question: "Are your storm damage inspections really free?",
        answer:
          "Yes. Every storm damage roof inspection in Philadelphia is 100% free, with no obligation. You get a written report with photos, a clear explanation of what we found, and honest guidance on whether to file a claim or proceed with a simple repair.",
      },
    ],
  },
  {
    slug: "roof-leak-repair",
    title: "Roof Leak Repair",
    shortTitle: "Leak Repair",
    tagline: "Roof Leak Repair Philadelphia — Same-Day Leak Detection & Fix",
    category: "roofing",
    description:
      "Roof leak repair in Philadelphia. Same-day leak detection, tracing, and fix for active roof leaks. Licensed PA184779, 20+ years, free inspection & written quote.",
    metaTitle: "Roof Leak Repair Philadelphia — Find & Fix Leaks Fast",
    metaDescription:
      "Active roof leak? Same-day leak detection & repair across Philadelphia — flashing, shingles, flat roofs. Licensed PA184779, free estimate. (267) 255-3620.",
    icon: "",
    image: "/images/roof-repair-philadelphia.jpg",
    heroDescription:
      "A roof leak is one of those problems that almost never gets better on its own — left alone, a small drip turns into warped drywall, stained ceilings, mold in the attic, and rotted decking that costs thousands more to repair than it would have a few months earlier. Adilay Roofing specializes in fast, accurate roof leak repair Philadelphia homeowners can count on, with 20+ years diagnosing and fixing leaks across Philadelphia, Bucks County, Montgomery County, Delaware County, and Chester County, all backed by a Pennsylvania contractor license (PA184779). Roof leaks are often misdiagnosed — the water stain on your ceiling is rarely directly under the leak itself, because water follows the roof deck and runs along rafters before dripping down. Our leak detection process starts with a full walk of your roof: we check every flashing, pipe boot, chimney joint, valley, nail pop, and suspect shingle, then go into the attic to trace the water path back to its actual source. We fix leaks in all common Philadelphia roof types: asphalt shingle, flat EPDM rubber (typical on row homes in Fishtown, Kensington, and South Philly), modified bitumen, and metal roofing. Most roof leak repairs in Philadelphia are completed in a single visit — flashing replaced, new pipe boot installed, shingles repaired or replaced, sealant reapplied — and come with a workmanship guarantee. For active leaks dripping into your home right now, we offer same-day response: we'll get a crew out, stop the water, and schedule the permanent fix. Every roof leak repair in Philadelphia comes with a free inspection and a written quote — no high-pressure sales, no hidden fees, just honest answers about what's wrong and what it'll cost to fix. Call (267) 255-3620 and get your roof leak diagnosed by a licensed Philadelphia roofer today.",
    benefits: [
      "Same-day response for active roof leaks in Philadelphia",
      "Free roof leak inspection and written estimate",
      "Accurate leak tracing — we find the real source, not just the stain",
      "Interior and exterior inspection (attic + roof)",
      "Permanent repair, not a temporary patch",
      "Licensed and insured Philadelphia contractor (PA184779)",
      "Workmanship guarantee on every roof leak repair",
      "All roof types — shingle, flat rubber (EPDM), metal",
    ],
    features: [
      "Full roof surface and flashing inspection",
      "Attic inspection to trace water path",
      "Pipe boot and vent collar replacement",
      "Chimney and step-flashing repair",
      "Valley and ridge leak repair",
      "Shingle replacement and resealing",
      "Flat-roof (EPDM) seam and puncture repair",
      "Post-repair water test when needed",
    ],
    faq: [
      {
        question: "How quickly can you fix a roof leak in Philadelphia?",
        answer:
          "For active leaks, we offer same-day response across Philadelphia. Most roof leak repairs are completed in a single visit — typically 2–4 hours depending on the complexity and location of the leak. Call (267) 255-3620 and we'll get a crew to your home today.",
      },
      {
        question: "How do you find the source of a roof leak?",
        answer:
          "Water rarely drips straight down — it follows the roof deck and rafters before showing up on your ceiling. Our leak detection starts on the roof (checking flashing, pipe boots, valleys, nail pops, and shingles), then moves into the attic to trace the water path back to the actual entry point. Only then do we know what to fix.",
      },
      {
        question: "How much does roof leak repair cost in Philadelphia?",
        answer:
          "Most single-source roof leak repairs in Philadelphia range from $250 to $900 depending on location, accessibility, and what needs to be replaced — flashing, a pipe boot, a few shingles, or a section of EPDM seam. We provide a written quote before any work begins, and repairs under $150 are rare but possible for very simple fixes.",
      },
      {
        question: "Is it worth repairing a leak, or should I just replace the roof?",
        answer:
          "If your roof is under 15 years old and the leak is localized, repair is almost always the right answer. For roofs 20+ years old with multiple leak sources, or widespread shingle granule loss, replacement often makes more sense than chasing leak after leak. Our free inspection gives you an honest, no-pressure recommendation.",
      },
      {
        question: "Can a small roof leak really cause serious damage?",
        answer:
          "Yes — faster than most homeowners realize. Within weeks, a slow leak can soak insulation, rot decking, grow mold inside the attic, and warp drywall. Fixing the leak early saves thousands in interior repairs and prevents health issues from mold exposure.",
      },
      {
        question: "Do you handle roof leak repair for flat roofs on Philadelphia row homes?",
        answer:
          "Yes. Flat EPDM rubber and modified bitumen roofs are extremely common on Philadelphia row homes — Fishtown, Kensington, South Philly, Point Breeze — and we repair them routinely. Most flat-roof leaks come from seam failures, punctures, or drain flashing, all of which we fix same-day in most cases.",
      },
      {
        // GSC: "who to call for roof leak" (72 impr @ 38.2) and "who fixes
        // roof leaks" (20 @ 46.1). Direct-answer phrasing.
        question: "Who should I call for a roof leak in Philadelphia?",
        answer:
          "Call a licensed local roofing contractor — finding the true source of a leak is the hard part, and general handymen often patch the wrong spot. Adilay Roofing (PA license PA184779) answers (267) 255-3620 day and night, traces the leak to its source, and gives you a free written repair quote. Active leaks get same-day priority.",
      },
    ],
  },
  {
    slug: "roof-inspection",
    title: "Roof Inspection",
    shortTitle: "Inspection",
    tagline: "Free Roof Inspection Philadelphia — Pre-Purchase, Insurance & Annual",
    category: "roofing",
    description:
      "Free roof inspection in Philadelphia. Pre-purchase, post-storm, annual maintenance — licensed inspector, written report with photos. Licensed PA184779.",
    icon: "",
    image: "/images/roof-repair-philadelphia.jpg",
    heroDescription:
      "A professional roof inspection is the single most valuable thing a Philadelphia homeowner can do before the next storm season, before signing on a new home, or before filing an insurance claim. Adilay Roofing offers free roof inspection Philadelphia homeowners can rely on — performed by a licensed Pennsylvania contractor (PA184779) with 20+ years on local roofs, and documented with a written report, photos, and honest recommendations. Most of the expensive roof problems we fix in Philadelphia started as tiny, cheap-to-fix issues that went unnoticed for years — a cracked pipe boot, a loose ridge cap, a hairline flashing gap, granule loss from aging shingles. A thorough roof inspection catches those problems before they turn into leaks, mold, and structural damage. We offer several types of roof inspection for Philadelphia properties: (1) Pre-purchase roof inspection — if you're buying a home in Philadelphia, Bucks, Montgomery, Delaware, or Chester County, we inspect the roof before you close and give you a written report you can use to negotiate or walk away. (2) Post-storm inspection — after a major wind, hail, or tree-damage event, we document everything for your insurance claim. (3) Annual or biannual maintenance inspection — catches small issues before they become emergencies. (4) Pre-sale inspection — selling your home? A written roof report from a licensed contractor reassures buyers and speeds up the closing process. Every roof inspection in Philadelphia includes a full roof walk, an attic inspection for water staining and ventilation issues, flashing and chimney check, gutter and drainage review, and a written report with photos and prioritized recommendations. Most inspections take 45–75 minutes and come with zero obligation. Call (267) 255-3620 or fill out the form for a free roof inspection today.",
    benefits: [
      "Free roof inspection with written report — no obligation",
      "Licensed Pennsylvania contractor inspector (PA184779)",
      "Photos documenting every finding",
      "Pre-purchase, post-storm, or annual inspection",
      "Attic inspection included — not just the roof surface",
      "Insurance-claim-ready documentation when needed",
      "Serving Philadelphia, Bucks, Montgomery, Delaware, Chester",
      "Honest recommendations — no upsells, no scare tactics",
    ],
    features: [
      "Full roof surface walk and hands-on inspection",
      "Attic inspection — ventilation, insulation, water stains",
      "Flashing, chimney, and penetration check",
      "Gutter, downspout, and drainage assessment",
      "Shingle condition, granule loss, and wear analysis",
      "Written report with photos delivered same-day",
      "Prioritized recommendation list (critical / soon / optional)",
      "Storm or hail damage documentation when relevant",
    ],
    faq: [
      {
        question: "Is your roof inspection really free?",
        answer:
          "Yes. Every residential roof inspection in Philadelphia is 100% free, with no obligation. You get a written report with photos and honest recommendations — whether the findings lead to work for us or not. We believe an informed homeowner is the best long-term customer.",
      },
      {
        question: "How long does a roof inspection take?",
        answer:
          "Most Philadelphia residential roof inspections take 45–75 minutes. Larger homes, steep roofs, or complex architectural roofs may take longer. We walk the full roof surface, inspect the attic, check the flashings and gutters, and document everything with photos.",
      },
      {
        question: "Do I need a roof inspection before buying a home in Philadelphia?",
        answer:
          "Strongly recommended. A standard home inspection usually looks at the roof from the ground or from a ladder — a licensed roofing contractor actually walks the roof and checks the attic. Roof replacement in Philadelphia runs $8,000–$25,000, so finding problems before you close saves real money and gives you leverage in negotiation.",
      },
      {
        question: "When should I get a post-storm roof inspection?",
        answer:
          "As soon as possible after a significant wind, hail, or tree-damage event — ideally within 60 days, while the damage is fresh and the storm is documented with local weather records. Most Pennsylvania insurance policies have strict time limits for filing storm-damage claims. A free roof inspection gives you the documentation you need before that window closes.",
      },
      {
        question: "What do you look for during a roof inspection?",
        answer:
          "We check shingle condition and granule loss, flashing around chimneys and vents, pipe boots, ridge caps, valleys, gutter and downspout performance, drip edge, attic ventilation, insulation, signs of water staining or mold, and any visible decking damage. We document everything with photos and summarize findings in a written report.",
      },
      {
        question: "Do you do roof inspections for commercial buildings in Philadelphia?",
        answer:
          "Yes. We inspect flat (EPDM, TPO, modified bitumen) and low-slope commercial roofs across Philadelphia — warehouses, retail, small office buildings, and multi-family properties. Commercial inspections follow the same thorough process and come with a written report you can share with property managers or insurance carriers.",
      },
    ],
  },
  {
    slug: "soffit-repair",
    title: "Soffit Repair",
    shortTitle: "Soffit Repair",
    tagline: "Soffit Repair Philadelphia — Rotted Soffit & Fascia Specialists",
    category: "roofing",
    description:
      "Soffit repair and replacement in Philadelphia PA. Rotted, damaged, or animal-chewed soffit fixed fast. Fascia and ventilation included. Licensed PA184779.",
    icon: "",
    image: "/images/roof-repair-philadelphia.jpg",
    heroDescription:
      "Your soffit — the underside of your roof's overhang — is one of the most commonly ignored parts of a Philadelphia home, and also one of the first to show signs of trouble. Sagging, peeling paint, dark water stains, chewed-out holes from squirrels or birds, or visible rot along the fascia line all point to soffit damage that needs professional attention. Adilay Roofing provides expert soffit repair Philadelphia homeowners trust, backed by 20+ years of experience and a Pennsylvania contractor license (PA184779). Soffit problems almost always stem from one of three root causes: (1) water infiltration from clogged gutters or damaged flashing soaking the soffit from above; (2) inadequate attic ventilation trapping moisture against the underside of the roof; or (3) animal damage — squirrels, raccoons, and birds love to chew through compromised soffit to nest in your attic. We fix all three. Our soffit repair process starts with a full diagnosis: we identify why the soffit failed, not just where. Then we replace the damaged soffit sections (vinyl, aluminum, or wood — whatever matches your home), repair or replace any rotted fascia board behind it, fix the underlying cause (clean the gutters, correct the flashing, add proper ventilation), and seal the entry point against future animal intrusion. Philadelphia row homes, twin homes, and Colonials across Fishtown, Manayunk, Roxborough, South Philly, and Northeast Philadelphia all have their own soffit styles, and we match materials and profiles to preserve curb appeal. Left alone, rotted soffit spreads fast — it pulls moisture into the attic, ruins insulation, compromises rafters, and invites pests deep into your home. Don't wait. Call Adilay Roofing for a free soffit repair inspection in Philadelphia — we'll diagnose the cause, quote the fix in writing, and get your soffit restored to structural, weatherproof condition.",
    benefits: [
      "Free soffit repair inspection in Philadelphia",
      "Root-cause diagnosis — not just surface patching",
      "Rotted soffit and fascia replacement",
      "Animal-damage repair with entry-point sealing",
      "Proper attic ventilation correction",
      "Licensed and insured Philadelphia contractor (PA184779)",
      "Vinyl, aluminum, and wood soffit — color and profile matched",
      "Workmanship guarantee on every soffit repair",
    ],
    features: [
      "Soffit panel replacement (vinyl, aluminum, wood)",
      "Rotted fascia board repair and replacement",
      "Drip edge and gutter-edge flashing repair",
      "Animal entry-point sealing (squirrel, bird, raccoon)",
      "Vented soffit installation for proper attic airflow",
      "Paint and finish matching to existing exterior",
      "Gutter adjustment to prevent recurring water damage",
      "Full post-repair inspection and walkthrough",
    ],
    faq: [
      {
        question: "What causes soffit damage on Philadelphia homes?",
        answer:
          "Three things, almost always: clogged gutters that let water overflow onto the soffit from above, poor attic ventilation that traps moisture, or animals (squirrels, raccoons, birds) chewing through weakened soffit to nest. We diagnose the root cause before we repair, so the problem doesn't come back.",
      },
      {
        question: "How much does soffit repair cost in Philadelphia?",
        answer:
          "Partial soffit repairs in Philadelphia typically range from $300 to $1,200 depending on the length of damage, material, and whether fascia replacement is needed. Full soffit replacement on a mid-sized home usually runs $1,500–$3,500. Every quote is written, itemized, and free of surprises.",
      },
      {
        question: "Can you match the existing soffit material and color?",
        answer:
          "Yes. We carry and install vinyl, aluminum, and wood soffit in the most common Philadelphia profiles and colors. If your soffit is an older custom style, we'll match it as closely as possible or discuss exact-match sourcing options during the inspection.",
      },
      {
        question: "Do I need to replace the fascia too?",
        answer:
          "Often, yes. Water that rots the soffit usually damages the fascia board behind it, and installing new soffit over rotted fascia just traps the problem. During your free inspection we'll check the fascia condition and only recommend replacement if it's actually needed.",
      },
      {
        question: "How do you keep animals out after repair?",
        answer:
          "Animal damage happens because something was already compromised — we identify every entry point during the inspection and seal them with galvanized metal, durable flashing, and properly fastened soffit panels. We can also add continuous-vent soffit that blocks animal access while preserving attic ventilation.",
      },
      {
        question: "How long does a typical soffit repair take?",
        answer:
          "Most residential soffit repairs in Philadelphia are completed in a single day. Full soffit-and-fascia replacements on larger homes may take 2 days. We leave your property clean, haul away all debris, and walk the job with you before we call it done.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
