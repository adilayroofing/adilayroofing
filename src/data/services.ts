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

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  category: ServiceCategory;
  description: string;
  icon: string;
  image: string;
  heroDescription: string;
  benefits: string[];
  features: string[];
  faq: { question: string; answer: string }[];
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
      "When repairs are no longer enough, a full roof replacement in Philadelphia gives your property the protection it deserves. At Adilay Roofing, licensed under PA184779, our experienced crew handles the entire roof replacement process from start to finish — from carefully removing your existing roof down to the decking, to installing a brand-new roofing system with top-quality materials and clean, professional workmanship. Whether your asphalt shingles have reached the end of their lifespan, you are dealing with storm damage, or you simply want to upgrade to a more durable roofing material, we deliver roof replacement solutions tailored to your home and budget. We serve Philadelphia and the surrounding areas including Bucks County, Montgomery County, Delaware County, and Chester County. Every roof replacement project includes a thorough inspection of your roof deck, underlayment, ventilation, and flashing to ensure your new roof performs at its best for decades. Contact us today for a free estimate on roof replacement in Philadelphia — no pressure, no obligation, just honest advice from a team you can trust.",
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
    ],
  },
  {
    slug: "roof-repair",
    title: "Roof Repair",
    shortTitle: "Repair",
    tagline: "Roof Repair Philadelphia PA — Free Estimates, Same-Day Response",
    category: "roofing",
    description:
      "Roof repair Philadelphia PA homeowners trust. Expert leak repair, storm damage, flashing & shingle fixes. Free estimates, same-day response, licensed PA184779.",
    icon: "",
    image: "/images/roof-repair-philadelphia.jpg",
    heroDescription:
      "A small leak can become a big problem fast, which is why professional roof repair in Philadelphia should never be delayed. Adilay Roofing is a licensed roof repair Philadelphia PA homeowners have trusted for over 20 years (PA184779) — we respond quickly, diagnose the issue, and fix it right the first time. Whether you're dealing with storm damage from heavy wind and rain, a persistent roof leak, worn or missing flashing, or deteriorating shingles, our experienced Philadelphia roof repair crew handles it all. We repair every roof type common to Philadelphia homes: asphalt shingle, flat rubber (EPDM), and metal roofing systems. Every roof repair comes with a free estimate — a licensed roofer inspects the damage, explains what's causing the leak, and gives you a written quote with transparent, honest pricing. No hidden fees, no high-pressure upsells. We serve Philadelphia and the surrounding communities of Bucks County, Montgomery County, Delaware County, and Chester County, and we back every repair with a workmanship guarantee. Roof damage left unaddressed leads to mold growth, structural rot, and dramatically higher repair costs later. Don't wait — call Adilay Roofing today for a free roof repair estimate and same-day scheduling for urgent leaks across Philadelphia PA.",
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
          "Roof repair costs in Philadelphia vary depending on the type and extent of the damage. Minor repairs such as replacing a few shingles or sealing a small leak may cost a few hundred dollars, while more extensive repairs can range from $500 to $3,000 or more. We provide free estimates so you know the exact cost before any work begins.",
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
    ],
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
      "Emergency roof repair Philadelphia — 24/7 response for active leaks, storm damage, and fallen debris. Licensed PA184779, insured, same-day tarping. Call (888) 823-4766.",
    icon: "",
    image: "/images/emergency-roof-repair-philadelphia.jpg",
    heroDescription:
      "When a roofing emergency strikes, every minute matters. Whether it's a violent storm that rips shingles off your roof, a tree limb that crashes through, or an active leak pouring water into your living room, you need emergency roof repair Philadelphia PA homeowners can actually reach — day or night. Adilay Roofing provides 24/7 emergency roof repair in Philadelphia and across Northeast Philadelphia, South Philly, Manayunk, Roxborough, Fishtown, Germantown, and the surrounding counties of Bucks, Montgomery, Delaware, and Chester. Licensed under PA184779 and fully insured, our Philadelphia emergency roof repair crew is equipped to stabilize your property fast. Storm damage and roof leaks don't wait for business hours — and we don't either. When you call, we dispatch an emergency roofer to your Philadelphia property for rapid tarping, leak containment, and temporary weatherproofing, then return for permanent repairs once the situation is secure. Our experienced crew has handled every kind of Philadelphia roofing emergency: wind damage, hail damage, ice dam leaks, fallen trees, and structural collapse. We also provide detailed photo and written damage documentation to support your homeowner's insurance claim — we'll work directly with your carrier if needed. Don't let an emergency roof situation turn into thousands of dollars in interior water damage. Call Adilay Roofing at (888) 823-4766 for the fastest emergency roof repair in Philadelphia — free estimates, honest pricing, and a licensed Philadelphia roofer on your property the same day whenever possible.",
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
    title: "Residential Roofing Contractor",
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
    slug: "commercial-siding",
    title: "Commercial Siding Contractor",
    shortTitle: "Commercial Siding",
    tagline: "Professional Commercial Siding Contractor in Philadelphia",
    category: "siding",
    description:
      "Adilay Roofing provides commercial siding installation and repair services in Philadelphia. Durable, professional exterior solutions for businesses, retail, and multi-unit properties.",
    icon: "",
    image: "/images/siding-philadelphia.jpg",
    heroDescription:
      "The exterior of your commercial property is the first thing customers, tenants, and visitors see — and deteriorating or outdated siding sends the wrong message about your business. Adilay Roofing is a licensed commercial siding contractor (PA184779) serving businesses throughout Philadelphia and the surrounding areas of Bucks County, Montgomery County, Delaware County, and Chester County. We install and repair commercial siding on retail storefronts, office buildings, warehouses, multi-unit residential buildings, restaurants, and mixed-use properties. Our commercial siding services include vinyl siding, fiber cement siding (James Hardie), metal panel siding, and composite cladding systems — each selected for durability, low maintenance, and professional appearance in high-traffic commercial environments. We understand that commercial siding projects require careful coordination to minimize disruption to your business operations, tenants, and customers. Our experienced crew works around your schedule and follows strict safety protocols to complete the project efficiently without compromising quality. Whether you need a complete exterior renovation to modernize your building's appearance, siding replacement to address weather damage and deterioration, or targeted repairs to maintain your property, Adilay Roofing delivers dependable results backed by manufacturer warranties and our own workmanship guarantee. Contact us today for a free commercial siding estimate — professional service, transparent pricing, and a team that understands the unique needs of commercial property owners in Philadelphia.",
    benefits: [
      "Professional exterior solutions for commercial properties",
      "Vinyl, fiber cement, metal, and composite siding options",
      "Minimal disruption to business operations",
      "Durable materials for high-traffic environments",
      "Licensed and insured commercial contractor (PA184779)",
      "Manufacturer warranties on all materials",
      "Serving Philadelphia and surrounding counties",
      "Free estimates with transparent pricing",
    ],
    features: [
      "Commercial vinyl siding installation",
      "Fiber cement (HardiePlank) commercial installation",
      "Metal panel and composite cladding systems",
      "Commercial siding repair and replacement",
      "Soffit, fascia, and trim work",
      "Moisture barrier and insulation installation",
      "Multi-unit building exterior renovation",
      "ADA-compliant access maintained during work",
    ],
    faq: [
      {
        question: "What siding materials do you recommend for commercial buildings?",
        answer:
          "For most commercial properties, we recommend fiber cement (James Hardie) or metal panel siding for their superior durability, fire resistance, and low maintenance. Vinyl siding is a cost-effective option for multi-unit residential buildings. We will assess your property and recommend the best material for your needs.",
      },
      {
        question: "How much does commercial siding cost in Philadelphia?",
        answer:
          "Commercial siding costs vary widely based on the material, the size of the building, and the complexity of the installation. We provide free, detailed estimates for every commercial project so you can plan your budget with confidence.",
      },
      {
        question: "Can you work around our business hours?",
        answer:
          "Absolutely. We schedule commercial siding work around your operating hours and take precautions to minimize noise, debris, and disruption to your employees, customers, and tenants.",
      },
      {
        question: "Do you handle commercial siding repairs?",
        answer:
          "Yes, we repair all types of commercial siding including damaged panels, failed caulking, moisture intrusion issues, and storm damage. We also provide insurance documentation for storm-related commercial siding damage.",
      },
    ],
  },
  {
    slug: "residential-siding",
    title: "Residential Siding Contractor",
    shortTitle: "Residential Siding",
    tagline: "Trusted Residential Siding Contractor in Philadelphia PA",
    category: "siding",
    description:
      "Adilay Roofing is Philadelphia's trusted residential siding contractor. We install and repair vinyl, fiber cement, and wood siding for homes throughout the Philadelphia area.",
    icon: "",
    image: "/images/siding-philadelphia.jpg",
    heroDescription:
      "Your home's siding does much more than define its appearance — it provides a critical barrier against moisture, wind, temperature extremes, and pest intrusion. At Adilay Roofing, licensed under PA184779, we are a dedicated residential siding contractor serving homeowners throughout Philadelphia and the surrounding areas of Bucks County, Montgomery County, Delaware County, and Chester County. We specialize in siding installation and repair for single-family homes, row homes, twin homes, townhouses, and residential additions. Our residential siding services include vinyl siding, fiber cement siding (James Hardie HardiePlank), and wood siding, with expert guidance to help you choose the material, color, and style that best complements your home's architecture and your personal preferences. Whether your existing siding is old and deteriorating, you are dealing with storm damage, or you simply want to give your home a fresh, modern look, our experienced crew delivers professional results that enhance your home's curb appeal, energy efficiency, and long-term value. Every residential siding project includes proper house wrap installation, insulation board placement, and meticulous trim finishing to ensure a weathertight, beautiful result. Contact us today for a free residential siding estimate — honest advice, transparent pricing, and workmanship you can trust.",
    benefits: [
      "Dedicated residential siding expertise",
      "Vinyl, fiber cement, and wood siding options",
      "Enhanced curb appeal and property value",
      "Improved energy efficiency and insulation",
      "Expert color and style guidance",
      "Licensed and insured contractor (PA184779)",
      "Manufacturer warranties on all materials",
      "Free estimates for Philadelphia and surrounding counties",
    ],
    features: [
      "Vinyl siding installation for residential homes",
      "Fiber cement (HardiePlank) residential installation",
      "Wood siding installation and finishing",
      "House wrap and moisture barrier installation",
      "Insulation board beneath siding",
      "Soffit, fascia, and trim work",
      "Old siding removal and disposal",
      "Custom color matching and style selection",
    ],
    faq: [
      {
        question: "What siding material is best for Philadelphia homes?",
        answer:
          "Vinyl siding is the most popular choice for its affordability and low maintenance. Fiber cement (James Hardie) is ideal for homeowners who want a premium look with superior durability. We will help you choose the best option during your free consultation.",
      },
      {
        question: "How much does residential siding cost in Philadelphia?",
        answer:
          "Residential siding costs depend on the material, the size of your home, and the complexity of the installation. Vinyl siding typically costs $4–$8 per square foot, while fiber cement ranges from $8–$14 per square foot. We provide free, detailed estimates with no hidden fees.",
      },
      {
        question: "How long does residential siding last?",
        answer:
          "Vinyl siding typically lasts 20–40 years with minimal maintenance. Fiber cement siding can last 30–50 years. Proper installation is key to maximizing the lifespan of any siding material, which is why choosing an experienced contractor matters.",
      },
      {
        question: "Will new siding improve my home's energy efficiency?",
        answer:
          "Yes, new siding combined with proper house wrap and insulation board installation can significantly reduce heat loss in winter and heat gain in summer, leading to lower energy bills year-round.",
      },
      {
        question: "Do you work with Philadelphia row homes and twin homes?",
        answer:
          "Yes, we have extensive experience with the unique siding requirements of Philadelphia row homes and twin homes, including shared walls, narrow lot access, and matching existing materials on adjacent properties.",
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
    slug: "window-replacement",
    title: "Window Replacement",
    shortTitle: "Window Replace",
    tagline: "Professional Window Replacement in Philadelphia — Upgrade Your Home",
    category: "windows",
    description:
      "Expert window replacement services in Philadelphia. We remove old, drafty windows and install energy-efficient replacements that save money and improve comfort.",
    icon: "",
    image: "/images/window-installation-philadelphia.jpg",
    heroDescription:
      "Old, drafty windows are one of the biggest sources of energy loss in Philadelphia homes — driving up heating costs in winter, cooling costs in summer, and letting in noise, dust, and moisture year-round. At Adilay Roofing, licensed under PA184779, we provide professional window replacement services throughout Philadelphia and the surrounding areas of Bucks County, Montgomery County, Delaware County, and Chester County. Our window replacement process starts with carefully removing your existing windows, inspecting the surrounding framing for moisture damage or rot, and then installing new, energy-efficient replacement windows with precision fit and proper insulation. We install high-quality double-pane and triple-pane vinyl replacement windows with low-E glass coatings that dramatically reduce heat transfer, block UV rays, and cut outside noise. Our experienced installers specialize in window replacement for Philadelphia row homes, twin homes, and older single-family homes that often require custom sizing to fit non-standard window openings. Every window replacement includes proper shimming, insulation around the frame, interior and exterior trim work, and a final quality check to ensure smooth operation and a weathertight seal. Replacing your windows is one of the most impactful home improvement projects you can undertake — improving comfort, reducing energy bills, and increasing your home's value. Contact Adilay Roofing today for a free window replacement estimate in Philadelphia — honest pricing, expert installation, and windows built to last.",
    benefits: [
      "Eliminate drafts and reduce energy loss",
      "Lower monthly heating and cooling bills",
      "Reduce outside noise for a quieter home",
      "Increase property value and curb appeal",
      "Custom sizing for older Philadelphia homes",
      "Licensed and insured installation (PA184779)",
      "Manufacturer warranties on all windows",
      "Free estimates for Philadelphia and surrounding counties",
    ],
    features: [
      "Complete old window removal and disposal",
      "Frame inspection for moisture damage and rot",
      "Energy-efficient double and triple-pane replacements",
      "Low-E glass coating options",
      "Proper shimming, insulation, and sealing",
      "Interior and exterior trim finishing",
      "Custom sizing for non-standard openings",
      "Final operation check and quality inspection",
    ],
    faq: [
      {
        question: "How do I know if my windows need replacement?",
        answer:
          "Common signs include drafts near closed windows, difficulty opening or closing, condensation between glass panes, visible rot or damage to frames, and noticeably higher energy bills. If your windows are over 15–20 years old, replacement is often a worthwhile investment.",
      },
      {
        question: "How much does window replacement cost in Philadelphia?",
        answer:
          "Window replacement costs in Philadelphia typically range from $300 to $1,200 per window depending on size, style, and glass options. A full-home window replacement usually falls between $5,000 and $15,000. We provide free estimates with no obligation.",
      },
      {
        question: "How long does window replacement take?",
        answer:
          "Most whole-home window replacement projects are completed in 1–3 days depending on the number of windows. Individual windows can typically be replaced in under an hour each. We minimize disruption and clean up thoroughly after every project.",
      },
      {
        question: "Will new windows really save money on energy bills?",
        answer:
          "Yes, upgrading from old single-pane or failing double-pane windows to modern energy-efficient replacement windows can reduce energy loss through windows by up to 50%, leading to meaningful savings on heating and cooling costs.",
      },
      {
        question: "Do you replace windows in Philadelphia row homes?",
        answer:
          "Yes, we specialize in window replacement for Philadelphia row homes, including custom sizing for the non-standard window openings commonly found in older row home construction. Our team has extensive experience working with these properties.",
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
    slug: "window-companies",
    title: "Window Companies in Philadelphia",
    shortTitle: "Window Companies",
    tagline: "Trusted Window Company in Philadelphia PA — Adilay Roofing",
    category: "windows",
    description:
      "Looking for reliable window companies in Philadelphia? Adilay Roofing provides expert window installation, replacement, and repair services with transparent pricing and quality workmanship.",
    icon: "",
    image: "/images/window-installation-philadelphia.jpg",
    heroDescription:
      "When searching for window companies in Philadelphia, you want a contractor you can trust — one that is licensed, insured, experienced, and committed to honest pricing and quality workmanship. Adilay Roofing has been one of the most trusted window companies in Philadelphia for over 20 years, serving homeowners throughout the city and the surrounding areas of Bucks County, Montgomery County, Delaware County, and Chester County. Licensed under PA184779 and fully insured, we provide comprehensive window services including new window installation, full window replacement, window repair, and energy-efficient upgrades. What sets us apart from other window companies in Philadelphia is our commitment to doing the job right without the high-pressure sales tactics. We do not employ commission-based salespeople who inflate prices to pad their commissions. Instead, you work directly with our experienced team from estimate to completion, and you get fair, transparent pricing based on the actual cost of materials and labor. We install high-quality double-pane and triple-pane vinyl windows with low-E glass from trusted manufacturers, and we specialize in the unique window requirements of Philadelphia row homes, twin homes, and older properties that need custom sizing. Every window project includes proper insulation, interior and exterior trim work, and a thorough final inspection. Contact Adilay Roofing today for a free estimate and see why Philadelphia homeowners choose us over the big-box window companies.",
    benefits: [
      "Over 20 years of experience in Philadelphia",
      "No high-pressure sales — just honest advice",
      "Transparent pricing without inflated markups",
      "Licensed and insured (PA184779)",
      "Installation, replacement, and repair services",
      "Specialists in Philadelphia row homes and older properties",
      "Energy-efficient window options from trusted brands",
      "Free estimates for Philadelphia and surrounding counties",
    ],
    features: [
      "New window installation for all home types",
      "Full window replacement with old window removal",
      "Window repair and restoration services",
      "Energy-efficient double and triple-pane windows",
      "Custom sizing for non-standard openings",
      "Low-E glass coating options",
      "Professional trim and casing work",
      "Post-installation quality inspection",
    ],
    faq: [
      {
        question: "Why should I choose Adilay Roofing over other window companies in Philadelphia?",
        answer:
          "We offer transparent pricing without commission-based sales pressure, over 20 years of local experience, PA licensing (PA184779), and direct communication with our installation team from start to finish. We focus on quality work and honest advice rather than high-pressure sales tactics.",
      },
      {
        question: "What window brands do you install?",
        answer:
          "We install high-quality vinyl windows from trusted manufacturers that offer excellent energy efficiency, durability, and warranty coverage. During your free consultation, we will discuss the best options for your home and budget.",
      },
      {
        question: "Do you offer financing for window projects?",
        answer:
          "We offer competitive pricing that is often significantly lower than big-box window companies because we do not have commission-based sales teams inflating the price. Contact us for a free estimate and you may find that our pricing fits your budget better than expected.",
      },
      {
        question: "How do I get a window estimate in Philadelphia?",
        answer:
          "Contact us by phone or through our website to schedule a free, no-obligation window estimate. We will visit your home, measure your windows, discuss your options, and provide a transparent, written estimate — no pressure and no hidden fees.",
      },
    ],
  },
  {
    slug: "gutter-cleaning",
    title: "Gutter Cleaning",
    shortTitle: "Gutter Cleaning",
    tagline: "Professional Gutter Cleaning Services in Philadelphia PA",
    category: "gutters",
    description:
      "Expert gutter cleaning in Philadelphia. We remove leaves, debris, and blockages to keep your gutters flowing and protect your foundation from water damage.",
    icon: "",
    image: "/images/gutters-philadelphia.png",
    heroDescription:
      "Clogged gutters are one of the most common — and most preventable — causes of water damage to Philadelphia homes. When leaves, twigs, shingle granules, and other debris accumulate in your gutters, water cannot flow to your downspouts and instead overflows onto your siding, pools around your foundation, and can seep into your basement. At Adilay Roofing, licensed under PA184779, we provide professional gutter cleaning services throughout Philadelphia and the surrounding areas of Bucks County, Montgomery County, Delaware County, and Chester County. Our thorough gutter cleaning process includes removing all debris from your gutters by hand, flushing the gutters and downspouts with water to ensure clear flow, checking for proper pitch and drainage, and inspecting your gutters for damage, loose hangers, or deteriorating seals that could lead to problems. We recommend cleaning your gutters at least twice a year — once in late spring after pollen and seed pods have fallen, and once in late fall after the leaves have dropped. If you have overhanging trees, more frequent cleaning may be necessary to prevent clogs. Regular gutter cleaning is one of the most cost-effective maintenance tasks you can do to protect your home from expensive water damage, foundation problems, and landscape erosion. Contact Adilay Roofing today to schedule a professional gutter cleaning in Philadelphia — affordable pricing, thorough service, and peace of mind.",
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
    slug: "asphalt-shingle-roofing",
    title: "Asphalt Shingle Roofing",
    shortTitle: "Asphalt Shingles",
    tagline: "Asphalt Shingle Roofing Philadelphia — GAF, CertainTeed & Owens Corning Installers",
    category: "shingles",
    description:
      "Asphalt shingle roofing Philadelphia specialists. 3-tab & architectural shingles from GAF, CertainTeed, Owens Corning. Free estimates, licensed PA184779. Call (888) 823-4766.",
    icon: "",
    image: "/images/roof-shingles-philadelphia.jpg",
    heroDescription:
      "Asphalt shingles are by far the most popular roofing material in Philadelphia, and for good reason — they deliver an excellent combination of weather protection, curb appeal, and value that's hard to beat. Adilay Roofing is an asphalt shingle roofing Philadelphia specialist (PA184779), serving homeowners across Philadelphia and the surrounding areas of Bucks, Montgomery, Delaware, and Chester Counties. We install every major asphalt shingle product line: traditional 3-tab shingles for budget-conscious Philadelphia homeowners, and premium dimensional architectural shingles for those who want superior durability, wind resistance, and a richer multi-dimensional appearance. Asphalt shingles are engineered for exactly the kind of Mid-Atlantic weather Philadelphia throws at a roof — brutal summer heat and UV, heavy rain, high winds off the Delaware River, and winter ice and snow. We work with the three top asphalt shingle manufacturers in North America — GAF, CertainTeed, and Owens Corning — giving Philadelphia customers access to industry-leading warranty coverage and products proven in real-world conditions. Our asphalt shingle roofing Philadelphia services include new installation, complete tear-off and replacement, and 3-tab to architectural upgrades. Every project includes proper underlayment, ice and water shield in vulnerable areas, ridge ventilation, drip edge, and clean flashing work at chimneys, valleys, and pipe penetrations. Philadelphia has a uniquely varied housing stock — from historic row homes in South Philly and Fishtown, to twin homes in Northeast Philadelphia, to detached Colonial and Cape-style properties across Bucks and Montgomery. We've shingled every one of them and we know what the Philadelphia climate does to a roof after 15 years. Contact Adilay Roofing today for a free asphalt shingle roofing estimate in Philadelphia — written quote, no obligation, and honest answers from a licensed local contractor.",
    benefits: [
      "Most popular and proven roofing material in America",
      "Excellent balance of protection, appearance, and value",
      "3-tab and architectural shingle options",
      "Top brands: GAF, CertainTeed, Owens Corning",
      "Manufacturer warranties up to 30+ years",
      "Engineered for the Mid-Atlantic climate",
      "Licensed and insured installation (PA184779)",
      "Free estimates for Philadelphia and surrounding counties",
    ],
    features: [
      "3-tab asphalt shingle installation",
      "Architectural (dimensional) shingle installation",
      "Complete tear-off and replacement",
      "Proper underlayment and ice shield installation",
      "Ridge vent and attic ventilation",
      "Drip edge and starter strip installation",
      "Step, chimney, and pipe flashing",
      "Full property cleanup and debris disposal",
    ],
    faq: [
      {
        question: "What is the difference between 3-tab and architectural asphalt shingles?",
        answer:
          "3-tab shingles are flat, uniform, and more affordable, while architectural (dimensional) shingles are thicker, multi-layered, and offer better wind resistance, durability, and a premium appearance. Architectural shingles also carry longer warranties — often 30 years or more.",
      },
      {
        question: "How long do asphalt shingles last in Philadelphia?",
        answer:
          "Standard 3-tab asphalt shingles typically last 15–20 years, while architectural asphalt shingles can last 25–30+ years with proper installation, ventilation, and maintenance. Philadelphia's climate is well-suited for asphalt shingles.",
      },
      {
        question: "How much does an asphalt shingle roof cost in Philadelphia?",
        answer:
          "Asphalt shingle roofing costs in Philadelphia typically range from $5,000 to $15,000 for a standard residential roof, depending on the size, shingle type, and project complexity. We provide free estimates with transparent pricing and no hidden fees.",
      },
      {
        question: "Which asphalt shingle brand is best?",
        answer:
          "GAF, CertainTeed, and Owens Corning are the three leading asphalt shingle manufacturers, and all produce excellent products. Each offers different product lines, colors, and warranty options. We will help you compare brands and choose the best fit during your free estimate.",
      },
      {
        question: "Can I upgrade from 3-tab to architectural shingles?",
        answer:
          "Yes, upgrading from 3-tab to architectural shingles is one of the most popular roofing improvements we perform. The upgrade provides better durability, wind resistance, and a significant improvement in curb appeal. We will remove your old 3-tab shingles and install premium architectural shingles with proper underlayment and ventilation.",
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
    slug: "shingle-replacement",
    title: "Philadelphia Shingle Replacement",
    shortTitle: "Shingle Replace",
    tagline: "Complete Shingle Replacement in Philadelphia PA — A Fresh Start for Your Roof",
    category: "shingles",
    description:
      "Full shingle replacement services in Philadelphia. We tear off your old shingles and install a brand-new shingle roof with premium materials and expert craftsmanship.",
    icon: "",
    image: "/images/roof-shingles-philadelphia.jpg",
    heroDescription:
      "When your asphalt shingles have reached the end of their lifespan — showing widespread curling, cracking, granule loss, or persistent leaks — a full shingle replacement is the best way to restore your home's protection and give your roof a fresh start. At Adilay Roofing, licensed under PA184779, we provide complete shingle replacement services throughout Philadelphia and the surrounding areas of Bucks County, Montgomery County, Delaware County, and Chester County. Our shingle replacement process begins with a careful tear-off of your existing shingles down to the roof deck, followed by a thorough inspection of the decking and replacement of any damaged or rotted boards. We then install new underlayment, ice and water shield in vulnerable areas like valleys and eaves, drip edge along the perimeter, and your choice of premium asphalt shingles from top manufacturers including GAF, CertainTeed, and Owens Corning. Whether you are replacing aging 3-tab shingles with an upgrade to architectural shingles, or simply refreshing your roof with new shingles of the same type, our experienced crew delivers professional results with attention to every detail — from starter strips and proper nailing patterns to ridge caps and ventilation. Philadelphia's challenging Mid-Atlantic weather demands a shingle replacement done right, and that is exactly what Adilay Roofing delivers. Contact us today for a free shingle replacement estimate — transparent pricing, premium materials, and workmanship you can count on.",
    benefits: [
      "Complete tear-off and fresh shingle installation",
      "Decking inspection and repair included",
      "Premium shingles from GAF, CertainTeed, Owens Corning",
      "Upgrade from 3-tab to architectural shingles",
      "Manufacturer warranties up to 30+ years",
      "Licensed and insured roofing contractor (PA184779)",
      "Professional cleanup and debris disposal",
      "Free estimates for Philadelphia and surrounding counties",
    ],
    features: [
      "Complete old shingle tear-off and disposal",
      "Roof deck inspection and board replacement",
      "New underlayment and ice shield installation",
      "Drip edge and starter strip installation",
      "3-tab or architectural shingle installation",
      "Ridge cap and ventilation installation",
      "Chimney, vent, and pipe flashing",
      "Final walkthrough and quality inspection",
    ],
    faq: [
      {
        question: "How long does a shingle replacement take?",
        answer:
          "Most residential shingle replacements are completed in 1–3 days depending on the size and complexity of the roof. We will provide a specific timeline during your estimate and work efficiently to minimize disruption.",
      },
      {
        question: "How much does shingle replacement cost in Philadelphia?",
        answer:
          "Shingle replacement costs in Philadelphia typically range from $8,000 to $25,000 for a standard residential home, depending on the size of the roof, the type of shingles selected, and the condition of the decking. We provide free, detailed estimates with no hidden fees.",
      },
      {
        question: "Should I upgrade to architectural shingles during replacement?",
        answer:
          "If your budget allows, upgrading to architectural shingles during replacement is an excellent investment. They offer better wind resistance, longer warranties, and a significantly more attractive appearance compared to 3-tab shingles, with only a modest increase in cost.",
      },
      {
        question: "Do I need a permit for shingle replacement in Philadelphia?",
        answer:
          "Yes, a building permit is required for shingle replacement in Philadelphia. As a licensed contractor (PA184779), we handle the permit process on your behalf and ensure your new roof meets all local building code requirements and passes inspection.",
      },
      {
        question: "What happens if the decking is damaged under the old shingles?",
        answer:
          "During the tear-off process, we inspect every section of decking. If we find damaged, rotted, or soft boards, we replace them before installing the new underlayment and shingles. This ensures your new shingle roof has a solid, secure foundation. We will notify you of any additional costs before proceeding.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
