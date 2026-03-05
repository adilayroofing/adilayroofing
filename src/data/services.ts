export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  icon: string;
  heroDescription: string;
  benefits: string[];
  features: string[];
  faq: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    slug: "roof-replacement",
    title: "Roof Replacement",
    shortTitle: "Replacement",
    tagline: "A New Roof That Protects What Matters Most",
    description:
      "Complete roof replacement services for homes and businesses in Philadelphia and surrounding areas. We remove your old roof and install a brand-new roofing system built to last.",
    icon: "",
    heroDescription:
      "When repairs are no longer enough, a full roof replacement gives your property the protection it deserves. Our team handles the entire process — from removing your existing roof to installing a new system with quality materials and clean, professional workmanship.",
    benefits: [
      "Full tear-off and replacement with new materials",
      "Thorough inspection of decking and underlayment",
      "Professional cleanup — we leave your property spotless",
      "Manufacturer-backed material warranties",
      "Increased property value and curb appeal",
    ],
    features: [
      "Complete old roof removal and disposal",
      "Decking inspection and repair as needed",
      "Ice and water shield installation",
      "New underlayment and drip edge",
      "Ridge vent and attic ventilation",
      "Final walkthrough and quality check",
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
    ],
  },
  {
    slug: "roof-repair",
    title: "Roof Repair",
    shortTitle: "Repair",
    tagline: "Fast, Reliable Repairs to Stop Damage Before It Spreads",
    description:
      "Expert roof repair services in Philadelphia. From minor leak fixes to storm damage restoration, we diagnose and fix roof problems quickly.",
    icon: "",
    heroDescription:
      "A small leak can become a big problem fast. Our repair team responds quickly to diagnose the issue and fix it right — whether it's storm damage, a persistent leak, or worn flashing. We repair all roof types and stand behind our work.",
    benefits: [
      "Fast response to protect your property",
      "Accurate leak detection and diagnosis",
      "Storm damage assessment and repair",
      "All roof types — shingle, flat, metal",
      "Transparent pricing with no hidden fees",
    ],
    features: [
      "Emergency and scheduled repair services",
      "Leak detection and tracing",
      "Flashing and vent boot repair",
      "Shingle replacement for damaged areas",
      "Gutter and soffit repairs",
      "Post-repair inspection and documentation",
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
    ],
  },
  {
    slug: "flat-roofing",
    title: "Flat Roofing (EPDM)",
    shortTitle: "Flat Roof",
    tagline: "Durable Flat Roof Solutions for Commercial & Residential Properties",
    description:
      "Professional flat roof installation and repair using EPDM rubber roofing. Ideal for commercial buildings, row homes, and additions in the Philadelphia area.",
    icon: "",
    heroDescription:
      "EPDM (ethylene propylene diene terpolymer) rubber roofing is one of the most reliable flat roofing materials available. It delivers excellent waterproofing, UV resistance, and long-term durability — making it ideal for commercial buildings and residential flat roof sections.",
    benefits: [
      "Superior waterproofing for flat and low-slope roofs",
      "UV and weather resistant for long-term performance",
      "Cost-effective solution for large commercial areas",
      "Minimal maintenance requirements",
      "Proven track record of 20+ year lifespan",
    ],
    features: [
      "Full EPDM membrane installation",
      "Existing flat roof tear-off and replacement",
      "Proper drainage and slope assessment",
      "Seam welding and edge detailing",
      "Insulation board installation",
      "Penetration flashing for vents and pipes",
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
    ],
  },
  {
    slug: "shingle-roofing",
    title: "Shingle Roofing",
    shortTitle: "Shingles",
    tagline: "Classic Protection with Lasting Curb Appeal",
    description:
      "Asphalt and architectural shingle roofing installation in Philadelphia. Affordable, attractive, and built to withstand Mid-Atlantic weather.",
    icon: "",
    heroDescription:
      "Asphalt shingles remain the most popular roofing choice for a reason — they offer reliable weather protection, a clean look, and excellent value. We install both standard 3-tab and dimensional architectural shingles in a wide range of colors and styles.",
    benefits: [
      "Cost-effective roofing with proven performance",
      "Wide selection of colors and architectural styles",
      "Strong wind and impact resistance ratings",
      "Manufacturer warranties up to 30+ years",
      "Quick installation with minimal disruption",
    ],
    features: [
      "3-tab and architectural shingle options",
      "Full color and style selection",
      "Proper underlayment and ice shield",
      "Ridge cap and ventilation installation",
      "Clean tear-off of existing shingles",
      "Disposal and full property cleanup",
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
    ],
  },
  {
    slug: "siding",
    title: "Siding Installation & Repair",
    shortTitle: "Siding",
    tagline: "Transform Your Home's Exterior With Quality Siding",
    description:
      "Professional siding installation, repair, and replacement in Philadelphia. Vinyl, fiber cement, and wood options to improve your home's look and energy efficiency.",
    icon: "",
    heroDescription:
      "New siding does more than improve how your home looks — it adds a layer of insulation, protects against moisture damage, and reduces energy costs. We install vinyl, fiber cement, and wood siding with precision and attention to detail.",
    benefits: [
      "Improved curb appeal and property value",
      "Better insulation and energy efficiency",
      "Protection against moisture, wind, and pests",
      "Low-maintenance material options available",
      "Custom color and style matching",
    ],
    features: [
      "Vinyl siding installation and replacement",
      "Fiber cement (HardiePlank) siding",
      "Wood siding installation",
      "Soffit and fascia replacement",
      "House wrap and moisture barrier",
      "Trim work and finishing details",
    ],
    faq: [
      {
        question: "Which siding material is best for my home?",
        answer:
          "Vinyl is the most affordable and low-maintenance option. Fiber cement (like James Hardie) offers superior durability and a premium look. We'll help you choose based on your budget and goals.",
      },
      {
        question: "Can you replace siding without replacing the roof?",
        answer:
          "Yes, siding and roofing are independent projects. However, if both need attention, doing them together can be more efficient and cost-effective.",
      },
    ],
  },
  {
    slug: "windows",
    title: "Window Installation & Replacement",
    shortTitle: "Windows",
    tagline: "Energy-Efficient Windows That Save You Money",
    description:
      "Window installation, replacement, and coping services in Philadelphia. Improve energy efficiency, natural light, and comfort in your home.",
    icon: "",
    heroDescription:
      "Old, drafty windows drive up energy bills and let in noise, dust, and moisture. Our window installation services help you upgrade to modern, energy-efficient windows that keep your home comfortable year-round — and look great doing it.",
    benefits: [
      "Lower energy bills with better insulation",
      "Reduced outside noise and improved comfort",
      "Modern styles that enhance your home's look",
      "Proper sealing to prevent moisture damage",
      "Increased natural light and ventilation",
    ],
    features: [
      "Full window replacement and new installation",
      "Energy-efficient double and triple-pane glass",
      "Window coping and trim finishing",
      "Proper insulation and sealing",
      "Custom sizing for older Philadelphia homes",
      "Clean removal and disposal of old windows",
    ],
    faq: [
      {
        question: "How much can new windows save on energy bills?",
        answer:
          "Upgrading from single-pane to double-pane windows can reduce energy loss through windows by up to 50%, translating to noticeable savings on heating and cooling costs.",
      },
      {
        question: "Do you work with older Philadelphia row homes?",
        answer:
          "Yes, we have experience with the unique window sizes and styles found in older Philadelphia homes. We can custom-fit modern windows to your existing openings.",
      },
    ],
  },
  {
    slug: "gutters",
    title: "Gutter Installation & Repair",
    shortTitle: "Gutters",
    tagline: "Protect Your Foundation With Proper Water Management",
    description:
      "Professional gutter installation, repair, cleaning, and maintenance in Philadelphia. Keep water away from your foundation and prevent costly damage.",
    icon: "",
    heroDescription:
      "Gutters are your home's first defense against water damage. When they're clogged, damaged, or improperly installed, water pools around your foundation and can cause serious structural problems. We install, repair, and maintain gutter systems that work.",
    benefits: [
      "Prevent foundation damage and basement flooding",
      "Protect siding, landscaping, and walkways",
      "Seamless gutters for a clean, leak-free fit",
      "Gutter guard options to reduce maintenance",
      "Proper downspout placement and drainage",
    ],
    features: [
      "Seamless aluminum gutter installation",
      "Gutter guard and leaf protection systems",
      "Downspout installation and rerouting",
      "Gutter cleaning and maintenance",
      "Fascia board inspection and repair",
      "Custom color matching to your home",
    ],
    faq: [
      {
        question: "How often should gutters be cleaned?",
        answer:
          "We recommend cleaning gutters at least twice a year — in spring and fall. If you have overhanging trees, you may need more frequent cleaning or a gutter guard system.",
      },
      {
        question: "What are seamless gutters?",
        answer:
          "Seamless gutters are custom-fabricated on-site to fit your home exactly, with no seams or joints along the run. This dramatically reduces the chance of leaks compared to sectional gutters.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
