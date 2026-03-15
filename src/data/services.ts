export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  icon: string;
  image: string;
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
    tagline: "Fast, Reliable Repairs to Stop Damage Before It Spreads",
    description:
      "Expert roof repair services in Philadelphia. From minor leak fixes to storm damage restoration, we diagnose and fix roof problems quickly.",
    icon: "",
    image: "/images/roof-repair-philadelphia.jpg",
    heroDescription:
      "A small leak can become a big problem fast, and that is why professional roof repair in Philadelphia should never be delayed. Our licensed team at Adilay Roofing (PA184779) responds quickly to diagnose the issue and fix it right — whether you are dealing with storm damage from heavy winds and rain, a persistent leak that is damaging your ceilings and walls, worn or missing flashing, or deteriorating shingles. We repair all roof types, including asphalt shingle roofs, flat rubber roofs, and metal roofing systems. Our experienced roofers have been serving Philadelphia and the surrounding communities in Bucks County, Montgomery County, Delaware County, and Chester County for over 20 years, and we stand behind every repair with a workmanship guarantee. Roof damage left unaddressed can lead to mold growth, structural deterioration, and significantly higher repair costs down the road. Do not wait for a minor issue to become a major headache — call Adilay Roofing today for a free roof repair estimate. We will inspect your roof, explain the problem, and provide an honest, transparent quote with no hidden fees.",
    benefits: [
      "Fast response to protect your property",
      "Accurate leak detection and diagnosis",
      "Storm damage assessment and repair",
      "All roof types — shingle, flat, metal",
      "Transparent pricing with no hidden fees",
      "Licensed and insured Philadelphia roofing contractor (PA184779)",
      "Free estimates and honest recommendations",
      "Workmanship guarantee on all repairs",
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
    title: "Shingle Roofing",
    shortTitle: "Shingles",
    tagline: "Classic Protection with Lasting Curb Appeal",
    description:
      "Asphalt and architectural shingle roofing installation in Philadelphia. Affordable, attractive, and built to withstand Mid-Atlantic weather.",
    icon: "",
    image: "/images/roof-shingles-philadelphia.jpg",
    heroDescription:
      "Asphalt shingles remain the most popular roofing choice in Philadelphia for a reason — they offer reliable weather protection, a clean look, and excellent value for homeowners across the region. At Adilay Roofing, licensed under PA184779, we install both standard 3-tab and dimensional architectural shingles in a wide range of colors and styles to complement any home. Our shingle roofing services cover everything from new installations on newly constructed homes to complete tear-off and replacement of aging roofs. Architectural shingles, in particular, provide superior wind resistance, impact protection, and a premium multi-dimensional appearance that enhances curb appeal and increases property value. We use only manufacturer-backed materials from trusted brands like GAF, CertainTeed, and Owens Corning, ensuring your shingle roof is built to handle Philadelphia's challenging Mid-Atlantic climate — including hot, humid summers, harsh winter storms, and heavy spring rains. Adilay Roofing serves homeowners throughout Philadelphia and the surrounding areas of Bucks County, Montgomery County, Delaware County, and Chester County. Whether you need a full shingle roof replacement or want to upgrade from 3-tab to architectural shingles, contact us today for a free estimate. Our team will help you choose the best shingle option for your home, style, and budget.",
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
        question: "How much does a shingle roof cost in Philadelphia?",
        answer:
          "The cost of a shingle roof in Philadelphia depends on the size of your roof, the type of shingle you choose, and the complexity of the installation. On average, homeowners can expect to pay between $5,000 and $15,000 for a standard residential shingle roof. We provide free, no-obligation estimates with transparent, upfront pricing.",
      },
      {
        question: "Do I need a permit for shingle roofing in Philadelphia?",
        answer:
          "Yes, Philadelphia requires a building permit for roof replacement projects, including shingle roofing. As a licensed contractor (PA184779), we handle the permit process on your behalf and ensure your new shingle roof meets all local building code requirements.",
      },
      {
        question: "What shingle brand do you recommend for Philadelphia homes?",
        answer:
          "We work with top-tier shingle manufacturers including GAF, CertainTeed, and Owens Corning. Each brand offers excellent warranties and products specifically designed to handle the Mid-Atlantic climate. During your free estimate, we can discuss which brand and product line best fits your needs and budget.",
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
    image: "/images/siding-philadelphia.jpg",
    heroDescription:
      "New siding does more than improve how your home looks — it adds a critical layer of insulation, protects against moisture damage, and reduces energy costs year-round. At Adilay Roofing, licensed under PA184779, we provide professional siding installation and repair services throughout Philadelphia and the surrounding areas of Bucks County, Montgomery County, Delaware County, and Chester County. We install vinyl siding, fiber cement siding (including James Hardie HardiePlank), and wood siding with precision and attention to detail, ensuring a flawless finish that enhances your home's curb appeal and structural integrity. Damaged or aging siding leaves your home vulnerable to water infiltration, pest intrusion, and poor energy efficiency. Our team of siding installation experts will assess your home's exterior, recommend the best siding material for your needs and budget, and complete the installation with minimal disruption to your daily life. Whether you need full siding replacement on a Philadelphia row home, siding repair on a suburban colonial, or new siding on a home addition, Adilay Roofing delivers quality results backed by manufacturer warranties and our own workmanship guarantee. Contact us today for a free siding estimate — no pressure, no obligation, just honest advice from experienced exterior professionals.",
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
      "Vinyl siding installation and replacement",
      "Fiber cement (HardiePlank) siding",
      "Wood siding installation",
      "Soffit and fascia replacement",
      "House wrap and moisture barrier",
      "Trim work and finishing details",
      "Old siding removal and proper disposal",
      "Insulation board installation beneath siding",
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
      {
        question: "How much does siding installation cost in Philadelphia?",
        answer:
          "Siding installation costs in Philadelphia vary based on the material, the size of your home, and the complexity of the job. Vinyl siding typically costs $4–$8 per square foot, while fiber cement (HardiePlank) ranges from $8–$14 per square foot. We provide free, detailed estimates so you can compare options and make an informed decision.",
      },
      {
        question: "Do I need a permit for siding replacement in Philadelphia?",
        answer:
          "In most cases, a permit is required for full siding replacement in Philadelphia. As a licensed contractor (PA184779), we handle all permitting requirements and ensure your siding installation meets local building codes.",
      },
      {
        question: "How long does new siding last in the Philadelphia climate?",
        answer:
          "Vinyl siding typically lasts 20–40 years with minimal maintenance. Fiber cement siding (like James Hardie) can last 30–50 years and is highly resistant to the moisture, temperature swings, and UV exposure common in the Philadelphia area. Both options are excellent long-term investments for your home.",
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
    image: "/images/window-installation-philadelphia.jpg",
    heroDescription:
      "Old, drafty windows drive up energy bills and let in noise, dust, and moisture — and in Philadelphia's demanding climate, that means higher heating costs in winter and higher cooling costs in summer. At Adilay Roofing, licensed under PA184779, our window installation services help you upgrade to modern, energy-efficient windows that keep your home comfortable year-round and look great doing it. We specialize in window replacement for Philadelphia row homes, twin homes, and single-family residences, with expertise in custom sizing for older properties that require non-standard window dimensions. Our team installs double-pane and triple-pane energy-efficient windows with low-E glass coatings that reduce heat transfer and block harmful UV rays, helping you save significantly on your monthly energy bills. We also provide professional window coping and trim finishing to ensure a clean, weathertight seal that prevents moisture intrusion and improves your home's exterior appearance. Adilay Roofing serves homeowners throughout Philadelphia and the surrounding areas of Bucks County, Montgomery County, Delaware County, and Chester County. Contact us today for a free window installation estimate and start enjoying a more comfortable, energy-efficient home.",
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
      "Full window replacement and new installation",
      "Energy-efficient double and triple-pane glass",
      "Window coping and trim finishing",
      "Proper insulation and sealing",
      "Custom sizing for older Philadelphia homes",
      "Clean removal and disposal of old windows",
      "Low-E glass coating options for UV protection",
      "Interior and exterior trim and casing work",
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
      {
        question: "How much does window replacement cost in Philadelphia?",
        answer:
          "Window replacement costs in Philadelphia typically range from $300 to $1,200 per window depending on the size, style, and glass options you choose. A full-home window replacement for an average Philadelphia row home usually falls between $5,000 and $15,000. We provide free estimates with transparent pricing so you can plan your budget confidently.",
      },
      {
        question: "Do I need a permit for window replacement in Philadelphia?",
        answer:
          "In most cases, replacing windows in existing openings does not require a permit in Philadelphia. However, if you are changing the size of the window opening or adding new windows, a permit will be required. As a licensed contractor (PA184779), we will advise you on permit requirements and handle the process if needed.",
      },
      {
        question: "What type of windows are best for Philadelphia's climate?",
        answer:
          "We recommend double-pane or triple-pane vinyl windows with low-E glass coatings for Philadelphia homes. These windows provide excellent insulation against both summer heat and winter cold, reduce condensation, and block UV rays that can fade furniture and flooring. During your free estimate, we will help you choose the best window style and glass options for your home.",
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
    image: "/images/gutters-philadelphia.png",
    heroDescription:
      "Gutters are your home's first defense against water damage, and when they are clogged, damaged, or improperly installed, water pools around your foundation and can cause serious structural problems including basement flooding, soil erosion, and cracked foundations. At Adilay Roofing, licensed under PA184779, we provide professional gutter installation, repair, cleaning, and maintenance services throughout Philadelphia and the surrounding areas of Bucks County, Montgomery County, Delaware County, and Chester County. We specialize in seamless aluminum gutters that are custom-fabricated on-site to fit your home precisely, eliminating the joints and seams that cause leaks in traditional sectional gutter systems. Our gutter services also include gutter guard and leaf protection system installation to dramatically reduce maintenance and keep your gutters flowing freely year-round. Philadelphia's heavy spring rains, fall leaf drop, and winter ice make a properly functioning gutter system essential for protecting your home's foundation, siding, landscaping, and walkways. Whether you need a complete gutter replacement, repair for sagging or leaking gutters, or professional gutter cleaning and maintenance, Adilay Roofing delivers reliable results at fair prices. Contact us today for a free gutter installation estimate and let our experienced team protect your home from water damage.",
    benefits: [
      "Prevent foundation damage and basement flooding",
      "Protect siding, landscaping, and walkways",
      "Seamless gutters for a clean, leak-free fit",
      "Gutter guard options to reduce maintenance",
      "Proper downspout placement and drainage",
      "Licensed and insured contractor (PA184779)",
      "Custom-fabricated on-site to fit your home exactly",
      "Free estimates for Philadelphia and surrounding counties",
    ],
    features: [
      "Seamless aluminum gutter installation",
      "Gutter guard and leaf protection systems",
      "Downspout installation and rerouting",
      "Gutter cleaning and maintenance",
      "Fascia board inspection and repair",
      "Custom color matching to your home",
      "Gutter realignment and pitch correction",
      "Ice dam prevention solutions",
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
      {
        question: "How much does gutter installation cost in Philadelphia?",
        answer:
          "Gutter installation costs in Philadelphia typically range from $6 to $15 per linear foot for seamless aluminum gutters, depending on the size of your home and the complexity of the installation. A full gutter replacement for an average Philadelphia home usually costs between $1,500 and $4,000. We provide free estimates with no hidden fees.",
      },
      {
        question: "Do I need a permit for gutter installation in Philadelphia?",
        answer:
          "Gutter installation and replacement generally do not require a permit in Philadelphia. However, if the work involves changes to your home's drainage system or downspout routing that affects city stormwater systems, additional requirements may apply. We will advise you on any applicable regulations during your free estimate.",
      },
      {
        question: "What causes gutters to pull away from the house?",
        answer:
          "Gutters pull away from the house due to rotting fascia boards, excess weight from debris or ice buildup, improper installation, or age-related wear. Our team inspects and repairs the fascia board before installing new gutters to ensure a secure, long-lasting attachment. We also recommend gutter guards to reduce debris buildup and prevent this issue.",
      },
    ],
  },
  {
    slug: "emergency-roof-repair",
    title: "Emergency Roof Repair",
    shortTitle: "Emergency Repairs",
    tagline: "24/7 Emergency Roof Repair When You Need It Most",
    description:
      "24/7 emergency roof repair services in Philadelphia. Storm damage, active leaks, and fallen debris — we respond fast to protect your property from further damage.",
    icon: "",
    image: "/images/emergency-roof-repair-philadelphia.jpg",
    heroDescription:
      "When a roofing emergency strikes — whether it is a violent storm that rips off shingles, a tree limb that crashes through your roof, or an active leak pouring water into your living room — you need a roofing contractor who responds fast. Adilay Roofing provides 24/7 emergency roof repair in Philadelphia and the surrounding areas of Bucks County, Montgomery County, Delaware County, and Chester County. Licensed under PA184779 and fully insured, our emergency roofing team is equipped to handle urgent situations quickly and effectively, minimizing damage to your home and belongings. We understand that storm damage and roof emergencies do not wait for business hours. That is why we offer rapid-response emergency service to secure your property, apply temporary protective measures like tarping, and then perform permanent repairs as soon as conditions allow. Our experienced crew has seen every type of roofing emergency — from wind-blown shingle damage and hail impact to ice dam leaks and structural collapse from fallen trees. We also provide detailed damage documentation to support your homeowner's insurance claim. Do not let an emergency roof situation cause thousands of dollars in additional interior damage. Call Adilay Roofing for fast, professional emergency roof repair in Philadelphia — free estimates and honest pricing, even in an emergency.",
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
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
