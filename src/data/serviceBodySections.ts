// ---------------------------------------------------------------------------
// Per-service bodySections — adds 4-5 unique H3 sections to each service page
// to break the templated-content fingerprint that was keeping these pages out
// of Google's index. Used as a fallback when neither CMS nor services.ts
// provides bodySections for a given slug.
//
// Order of resolution in app/services/[slug]/page.tsx:
//   1. CMS structured_service.bodySections (highest priority)
//   2. service.bodySections (from src/data/services.ts)
//   3. SERVICE_BODY_SECTIONS[slug] (this file)
// ---------------------------------------------------------------------------

import type { BodySection } from "./services";

export const SERVICE_BODY_SECTIONS: Record<string, BodySection[]> = {
  // -------------------------------------------------------------------------
  "flat-roofing": [
    {
      heading: "EPDM, TPO, and Modified Bitumen — Choosing the Right Flat Roof System",
      html: "<p>Most Philadelphia rowhouses, additions, and commercial buildings need a low-slope or fully flat roofing system. We install three proven membranes: <strong>EPDM rubber</strong> (60-mil black or white, 25-30 year service life), <strong>TPO</strong> (heat-welded white membrane that reflects summer heat and reduces cooling bills), and <strong>modified bitumen</strong> (torch-down or peel-and-stick, ideal for foot-traffic decks). On a typical Philadelphia rowhouse roof we recommend EPDM for its proven longevity in our freeze-thaw climate and its straightforward seam repair if anything ever fails decades down the road.</p>",
    },
    {
      heading: "Why Flat Roofing Matters in Philadelphia Rowhouse Country",
      html: "<p>From Fishtown and Northern Liberties to South Philly and Kensington, the bulk of Philadelphia housing stock is row construction with shared parapet walls and flat or near-flat roofs. These roofs face challenges most pitched roofs don't: shared chimney flashing with neighbors, stepped parapet caps that direct water onto adjacent roofs, ponding from settled decking, and ice dams that form at parapet edges in February. Every flat roof we install in Philadelphia includes proper drainage planning and tie-ins to neighboring roof systems so water never becomes your neighbor's problem (or vice versa).</p>",
    },
    {
      heading: "Tear-Off vs Overlay — When Each Makes Sense",
      html: "<p>If your existing flat roof has only one layer of membrane and the decking underneath is dry and structurally sound, an overlay (installing fresh membrane over the existing one) can save 20-30% versus a full tear-off. But if you have two or more existing layers, water-damaged decking, or persistent leaks, a complete tear-off down to the deck is the only honest option — Philadelphia code generally won't allow a third roof layer either way. We pull a moisture probe sample on every estimate so the recommendation is based on what's actually under your roof, not a guess.</p>",
    },
    {
      heading: "Common Flat Roof Failure Points We Inspect",
      html: "<p>Flat roofs rarely fail in the middle of the field. Almost every leak we repair traces back to one of five locations: <strong>seams between membrane sheets</strong>, <strong>flashing at the parapet wall or chimney</strong>, <strong>penetrations</strong> (vent stacks, satellite mounts, AC line sets), <strong>scuppers and internal drains</strong>, and <strong>terminations at the front and rear of the building</strong>. During every flat roof inspection in Philadelphia we walk every seam, probe every flashing, and document the condition with photos so you have a clear picture of what's actually wrong before any repair work is quoted.</p>",
    },
    {
      heading: "Warranty That Reflects Real Service Life",
      html: "<p>A new EPDM or TPO flat roof installed by Adilay Roofing in Philadelphia comes with two warranties: a <strong>manufacturer membrane warranty</strong> (typically 20-30 years for material defects) and our own <strong>workmanship warranty</strong> covering installation defects. We register every roof with the manufacturer at completion and provide you with the warranty documentation. On commercial flat roofs we also offer an optional inspection-and-maintenance contract that keeps the warranty in good standing and catches small issues before they become claims.</p>",
    },
  ],

  // -------------------------------------------------------------------------
  "shingle-roofing": [
    {
      heading: "Architectural vs 3-Tab vs Designer Shingles — What Goes on Philadelphia Roofs",
      html: "<p>Most homeowners we work with choose <strong>architectural (laminated) shingles</strong> as the right balance of price, lifespan, and curb appeal. They're roughly 30% more expensive than basic 3-tab shingles but last 25-30 years versus 15-20, carry a 110-130 mph wind warranty, and look dramatically better on a Philadelphia twin or single. We install GAF Timberline HDZ, CertainTeed Landmark, and Owens Corning Duration as our standard architectural lines. Designer shingles (Slateline, Camelot, Presidential) cost roughly twice as much as architectural and are a great fit for Mt. Airy, Chestnut Hill, and historic-district homes where the roof is part of the curb appeal.</p>",
    },
    {
      heading: "What Goes Under the Shingles Matters Just as Much",
      html: "<p>A good shingle installation is 50% what's under the shingles. On every Philadelphia roof we replace, we install <strong>synthetic underlayment</strong> (not asphalt felt — felt tears in wind and degrades from UV during a multi-day install), <strong>ice-and-water shield</strong> at the eaves and in valleys (Philadelphia code requires it from the eave edge to 24 inches inside the warm wall, but we typically run it 36 inches for added protection against ice dams), and <strong>drip edge</strong> on every rake and eave. Vents, valleys, sidewalls, and chimney flashing get hand-detailed with metal flashing — never just sealed with caulk.</p>",
    },
    {
      heading: "Wind, Hail, and Philadelphia Weather",
      html: "<p>Philadelphia gets its share of severe weather: 60+ mph nor'easter gusts in winter, summer thunderstorms with hail, and the occasional remnant of a hurricane riding up the I-95 corridor. We install all shingles with six nails per shingle (not the four-nail factory minimum) which upgrades the wind warranty to 130 mph on most architectural lines. In neighborhoods with mature trees (West Philadelphia, Mt. Airy, Chestnut Hill) we also recommend Class 4 impact-rated shingles, which can earn you a discount on your homeowner's insurance and shrug off hail that would crack a standard shingle.</p>",
    },
    {
      heading: "Ventilation — The Hidden Lifespan Multiplier",
      html: "<p>Shingles fail prematurely when the attic underneath is too hot in summer and too humid in winter. Proper roof ventilation — typically a balance of <strong>soffit intake vents</strong> at the eaves and <strong>ridge vents</strong> at the peak — pulls heat and moisture out continuously and can extend shingle life by 5-7 years on a Philadelphia home. Every shingle replacement we do includes a ventilation assessment and (when needed) ridge-vent installation. If your roof is hotter than your attic in July, your shingles are aging twice as fast as they should.</p>",
    },
    {
      heading: "Color, Curb Appeal, and Resale",
      html: "<p>Shingle color choice matters more than most homeowners realize. On a Philadelphia rowhouse or twin where the roof is barely visible from the street, neutral grays and weathered woods disappear into the architecture. On a colonial or Victorian with a steep visible roof, color becomes part of the home's identity — and the wrong choice can knock 1-2% off resale value. We bring sample boards to every estimate and (for any home in a Philadelphia historic district) we coordinate with the Historical Commission's approved-materials list so you don't end up replacing shingles twice.</p>",
    },
  ],

  // -------------------------------------------------------------------------
  "siding-installation": [
    {
      heading: "Vinyl, Fiber Cement, and Wood — Picking the Right Siding for Philadelphia",
      html: "<p><strong>Insulated vinyl siding</strong> is our most-installed material for Philadelphia rowhomes and twins: it adds R-2 to R-4 of insulation under the siding, lasts 30-40 years with zero maintenance, and costs roughly half what fiber cement does. <strong>Fiber cement</strong> (James Hardie, Allura) is the upgrade option for homes where authenticity and resale matter — it looks indistinguishable from painted wood, lasts 50+ years, and stands up to wind, fire, and insects. <strong>Wood siding</strong> (cedar shake, clapboard, board-and-batten) is what we install on historic homes in Chestnut Hill, Mt. Airy, and Society Hill where it's required to maintain district character.</p>",
    },
    {
      heading: "Why Siding Matters More on a Philadelphia Row Home",
      html: "<p>Philadelphia rowhouses share walls with neighbors, but the front and rear facades are 100% yours — and they take a beating. The front faces traffic, salt spray from PennDOT plows, and direct sun all summer. The rear takes wind and snow load from nor'easters. Quality siding installed over a proper weather-resistant barrier (housewrap) and ½-inch foam continuous insulation keeps your interior temperature stable, knocks 10-20% off your monthly energy bill, and protects the underlying sheathing from moisture damage that would otherwise rot the wood structure of a 100+ year old home.</p>",
    },
    {
      heading: "What's Under the Siding — The Layers That Actually Protect Your House",
      html: "<p>A good siding install is a layered system: <strong>existing siding removed</strong> (we find rotten sheathing on roughly 1 in 4 Philadelphia rowhomes — repaired before we go any further), <strong>new sheathing as needed</strong> (½-inch OSB or plywood), <strong>weather-resistant barrier</strong> (Tyvek HomeWrap or equivalent, taped at all seams), <strong>continuous foam insulation</strong> on full facades when the home isn't already insulated, and finally the new siding with proper flashing at every window, door, deck connection, and wall penetration. Skipping any layer creates the moisture-trapping conditions that cause siding to fail in 10 years instead of 40.</p>",
    },
    {
      heading: "Trim, Soffits, and the Details That Make or Break the Look",
      html: "<p>The siding itself is only half the visual story — the <strong>trim around windows and doors</strong>, <strong>corner posts</strong>, <strong>soffit and fascia</strong>, and <strong>frieze board</strong> at the roofline are what make a finished home look like a finished home. We install matching aluminum or PVC trim packages that color-match the siding, replace deteriorated soffits with vented aluminum (which also improves attic ventilation), and wrap the fascia so the gutters install onto a clean, durable surface. Cheap installers cut these corners; the result is a home that looks half-finished even though the siding itself is brand new.</p>",
    },
    {
      heading: "Lifespan, Maintenance, and What to Expect Year-Over-Year",
      html: "<p>A properly installed insulated vinyl siding job in Philadelphia should give you 30-40 years of zero-maintenance service. Fiber cement should give you 50+ years with one repaint cycle around year 15-20. Wood siding requires 5-7 year staining or painting to last its full life. Across all materials, an annual rinse with a garden hose to wash off pollen and city soot is the only routine maintenance most homeowners ever need. We register every siding install with the manufacturer for the full transferable warranty, which adds resale value when you eventually sell.</p>",
    },
  ],

  // -------------------------------------------------------------------------
  "siding-repair": [
    {
      heading: "What Causes Siding Damage on Philadelphia Homes",
      html: "<p>Most siding repairs we do trace back to four causes: <strong>storm impact</strong> (wind-driven debris, hail, falling tree limbs), <strong>moisture intrusion</strong> from failed flashing or missing housewrap behind the siding, <strong>impact damage</strong> from ladders, lawnmowers, or vehicle contact, and <strong>age-related failure</strong> on vinyl that's past its UV-stabilizer life (typically year 25+). Diagnosing the root cause matters because patching impact damage is straightforward; patching moisture damage without fixing the underlying flashing problem just guarantees you'll repair the same area again next year.</p>",
    },
    {
      heading: "Matching Color and Profile on Existing Siding",
      html: "<p>The hardest part of vinyl siding repair isn't the install — it's finding replacement panels that match your existing color and profile. Vinyl colors fade with UV exposure over years, so a brand-new panel of the original color almost never blends in. Our approach: we identify the manufacturer and original color code (usually stamped on the back of an existing panel), then either source a closest match or pull replacement panels from a less-visible side of the home (rear or under-eave) and install the new ones there instead. The visible repair area gets the older, color-matched panels.</p>",
    },
    {
      heading: "Patch vs Section Replacement — Knowing When Each Is Right",
      html: "<p>A small impact crack or single-panel hail damage is a clean patch — pop the J-channel, slide out the damaged panel, slide in a replacement, lock it back into the channel. A whole rotted corner from years of failed gutter water is a section replacement: we remove a square section of siding, replace damaged sheathing and housewrap underneath, and reinstall siding with proper terminations. We always quote both options when both are viable so you can make the call based on budget and how long you plan to be in the home.</p>",
    },
    {
      heading: "Storm Damage and Insurance Claims",
      html: "<p>If a storm took out your siding (high wind, fallen tree, hail), there's a strong chance your homeowner's insurance will cover the repair or replacement. We document storm damage thoroughly — wide shots, close-ups, panel-by-panel inventory — so your claim gets approved without back-and-forth. We can also meet your insurance adjuster on-site to walk the damage together. About half our siding-damage repairs in Philadelphia are insurance jobs, and we know exactly what documentation State Farm, Allstate, USAA, and Erie need to greenlight a claim.</p>",
    },
    {
      heading: "When Repair Stops Making Sense (and Replacement Is the Better Move)",
      html: "<p>If you're getting siding repairs every 1-2 years, multiple sides of the home are showing UV fade and brittleness, or the underlying sheathing has moisture damage in more than one spot, you've crossed the line from \"this needs a repair\" to \"this needs a new siding system.\" We're upfront about it: we'll quote a repair if a repair is the right answer, but if you'd be throwing good money after bad, we say so and quote the replacement instead. Honest assessment is what keeps customers calling us back.</p>",
    },
  ],

  // -------------------------------------------------------------------------
  "window-installation": [
    {
      heading: "Window Styles — What Goes Where on a Philadelphia Home",
      html: "<p><strong>Double-hung</strong> windows are the most common for Philadelphia rowhouses, twins, and colonials — both sashes open, easy to clean, traditional appearance. <strong>Casement</strong> (crank-out) windows offer the best energy efficiency and unobstructed views; we install them most often in kitchens above sinks and in upper-floor bedrooms. <strong>Sliders</strong> work well in basements and over kitchen sinks where vertical space is limited. <strong>Awning</strong> windows are great for bathrooms because they can stay open in light rain. <strong>Picture windows</strong> (fixed) maximize light but don't open. We help match the right style to each opening on every estimate.</p>",
    },
    {
      heading: "Energy Star, U-Factor, and What Actually Matters in Philadelphia's Climate",
      html: "<p>Philadelphia is in <strong>climate zone 4</strong>, which means our windows need to handle both summer heat and winter cold. Look for <strong>U-factor ≤ 0.30</strong> (lower = better insulation) and <strong>SHGC (Solar Heat Gain Coefficient) between 0.25 and 0.40</strong> (low enough to block summer heat, high enough to let in winter sun). All Energy Star Most Efficient windows we install meet or exceed these specs. Triple-pane windows are worth the upgrade in upper-floor bedrooms facing the street or in any room where you can hear traffic noise — the sound damping is dramatic.</p>",
    },
    {
      heading: "Lead Paint and Older Philadelphia Homes — What You Need to Know",
      html: "<p>If your home was built before 1978 (which covers most of Philadelphia), your existing window frames likely have lead paint. EPA's Renovation, Repair and Painting (RRP) Rule requires any contractor working on a pre-1978 home to be lead-safe certified — we are. Our crews use HEPA vacuums, plastic containment, and certified disposal procedures so the window swap doesn't contaminate your home with lead dust. We also test the existing paint at no charge before starting work so you know exactly what you're dealing with.</p>",
    },
    {
      heading: "Egress Windows in Bedrooms — A Code Requirement, Not a Suggestion",
      html: "<p>Philadelphia building code requires every bedroom to have at least one window that meets <strong>egress dimensions</strong>: minimum 5.7 sq ft of openable area, minimum 24-inch height and 20-inch width, and a sill no higher than 44 inches off the floor. If your existing bedroom window doesn't meet egress, code requires we enlarge the rough opening to a window that does. This is mandatory for any window replacement that requires a permit, and it's the difference between a passable life-safety setup and being trapped in a fire.</p>",
    },
    {
      heading: "Custom and Historic Window Matching",
      html: "<p>If you live in a Philadelphia historic district (Old City, Society Hill, Rittenhouse, Chestnut Hill, parts of Mt. Airy and Germantown), the Philadelphia Historical Commission has approval rights over visible window changes. We work with manufacturers like Marvin and Andersen who offer historically-accurate profiles, divided lights with simulated muntins, and exterior wood cladding that match the home's original era. Custom historic windows take 4-6 weeks for manufacturing instead of 2-3 weeks for stock — we plan the project timeline accordingly so you're not exposed to weather waiting on glass.</p>",
    },
  ],

  // -------------------------------------------------------------------------
  "gutter-repair": [
    {
      heading: "Common Gutter Problems We Diagnose",
      html: "<p>Most gutter repair calls in Philadelphia trace back to one of these issues: <strong>sagging or pulling away from the fascia</strong> (failed hangers or rotted fascia behind the gutter), <strong>leaking seams or end caps</strong> (sealant deterioration, common at year 8-10), <strong>downspout disconnections</strong> at the elbow joints from freeze-thaw movement, <strong>overflow at the front lip</strong> during heavy rain (undersized 5-inch gutters on a roof that needs 6-inch K-style), and <strong>water dumping behind the gutter</strong> from missing or failed drip edge on the roof. We diagnose the actual cause before quoting because patching the symptom rarely fixes the underlying problem.</p>",
    },
    {
      heading: "Repair vs Replacement — When Each Is Right",
      html: "<p>If you have a single section sagging or one downspout disconnected, repair is the right call — we re-hang, replace failed sealant, and you're good for another decade. But if multiple sections are sagging, the gutters have splits in the seams in more than one spot, or the fascia behind the gutter is rotted across the run, you've moved into replacement territory. Seamless aluminum replacement runs cost roughly the same as 3-4 individual section repairs spread over a few years, so when you're past the threshold the math favors a full replacement.</p>",
    },
    {
      heading: "Soffit and Fascia Damage Behind Failing Gutters",
      html: "<p>Gutters that have leaked for years almost always cause secondary damage: <strong>fascia rot</strong> (the wood board the gutter hangs from), <strong>soffit damage</strong> (the underside of the eave overhang), and <strong>sheathing rot</strong> at the roof edge. On every gutter repair estimate we probe the fascia and soffit with a screwdriver — if it gives, we quote the carpentry repair as part of the job. Installing a new gutter onto rotted fascia is wasted money; the new gutter pulls away within a year. We fix the foundation of the gutter so the gutter itself can do its job.</p>",
    },
    {
      heading: "Pricing Factors and What Drives the Estimate",
      html: "<p>Gutter repair pricing in Philadelphia depends on three things: <strong>linear feet</strong> of run that needs work, <strong>height/accessibility</strong> (single-story rear with a flat ladder approach is fast; three-story rowhouse front off a sidewalk requires a lift), and <strong>whether fascia carpentry is needed</strong>. Most repairs run $300-900. If we find substantial fascia rot during the work, we pause, get your sign-off on the additional carpentry scope, and proceed. No surprise charges at the end. Every estimate is itemized so you can see exactly what you're paying for.</p>",
    },
  ],

  // -------------------------------------------------------------------------
  "commercial-roofing": [
    {
      heading: "Commercial vs Residential — Why Commercial Roofing Is Its Own Discipline",
      html: "<p>Commercial roofing in Philadelphia is structurally and procedurally different from residential. Buildings are larger (often 5,000+ sq ft of roof area), almost always low-slope or fully flat, carry HVAC and refrigeration loads on the roof, and require <strong>certified installers</strong> for manufacturer warranty coverage. We're licensed PA184779 and certified by GAF, Carlisle, and Firestone for commercial flat-roofing systems. Insurance requirements are also higher — we carry $2M general liability and a $1M umbrella policy that meet the additional-insured requirements most Philadelphia commercial property owners need before any work starts.</p>",
    },
    {
      heading: "Flat Membrane Systems — TPO, EPDM, and Modified Bitumen for Commercial",
      html: "<p>For commercial flat roofing in Philadelphia we install three membrane systems: <strong>TPO</strong> (60-80 mil heat-welded, white reflective, 20-year manufacturer warranty, best for buildings with summer cooling loads), <strong>EPDM</strong> (60-90 mil, black or white, 25-year warranty, most forgiving of foot traffic and rooftop equipment), and <strong>modified bitumen</strong> (torch-down or self-adhered, ideal where membrane will see heat or chemical exposure). Pricing per square foot is similar across all three; the right choice depends on building use, equipment loads, and warranty preference.</p>",
    },
    {
      heading: "Insurance, Certification, and Warranty for Commercial Properties",
      html: "<p>Commercial property owners and managers need three things from a roofing contractor before any work can start: <strong>certificates of insurance</strong> naming the building owner as additionally insured, <strong>manufacturer certification</strong> for the membrane system being installed (required for the manufacturer warranty to be valid), and a <strong>workmanship warranty</strong> from the installer covering the install itself. We provide all three in writing before kickoff, plus a final closeout package with photos, NDL warranty registration, and as-built drawings of any drainage modifications.</p>",
    },
    {
      heading: "Maintenance Contracts That Keep Warranties Valid",
      html: "<p>Most commercial flat roof manufacturer warranties have a maintenance clause: skip the inspections, lose the warranty if you ever file a claim. We offer two annual inspection-and-maintenance packages for commercial properties in Philadelphia: <strong>biannual</strong> (spring and fall, includes drain clearing, seam inspection, flashing review, photo report) and <strong>quarterly</strong> (recommended for buildings with heavy rooftop equipment or food-service grease exhaust). The package cost is a fraction of what a single major repair would cost and keeps the warranty in good standing.</p>",
    },
    {
      heading: "Roof Asset Management for Multi-Building Property Managers",
      html: "<p>If you manage multiple commercial properties in Philadelphia, we provide a <strong>roof asset management program</strong>: a master spreadsheet of every roof in your portfolio with install date, system type, manufacturer warranty status, last inspection date, projected replacement year, and estimated replacement cost. This gives you and your CFO the data needed for capital planning so a roof failure never becomes an emergency expense. Most of our commercial maintenance clients started with a single building and added the rest of their portfolio over the next year.</p>",
    },
  ],

  // -------------------------------------------------------------------------
  "residential-roofing": [
    {
      heading: "What Sets a Good Residential Roofing Contractor Apart in Philadelphia",
      html: "<p>Anyone with a ladder and a Home Depot account can call themselves a roofer. A real residential roofing contractor in Philadelphia carries the right credentials and works the right way: <strong>state license</strong> (PA HIC# 184779 in our case), <strong>fully insured</strong> with workers' comp and general liability you can verify, <strong>manufacturer certifications</strong> from GAF, CertainTeed, and Owens Corning that unlock enhanced warranties, and <strong>local references</strong> from homes you can drive past in your own neighborhood. We provide all four upfront, before you sign anything.</p>",
    },
    {
      heading: "Common Philadelphia Residential Roof Types We Work On",
      html: "<p>Philadelphia residential housing covers a wider range of roof types than most U.S. cities: <strong>flat or low-slope membrane roofs</strong> on rowhouses (Fishtown, South Philly, Kensington, West Phila), <strong>asphalt shingle pitched roofs</strong> on twins and singles (Northeast, Roxborough, Manayunk), <strong>slate roofs</strong> on early-1900s singles (Mt. Airy, Chestnut Hill, Germantown), <strong>cedar shake</strong> on a small number of historic homes, and <strong>standing-seam metal</strong> on newer modern construction. Our 30-person crew has installers experienced in every one of these systems.</p>",
    },
    {
      heading: "Pitched vs Low-Slope — Why the Distinction Matters",
      html: "<p>The roof's slope determines what materials and techniques are appropriate. <strong>Pitched roofs</strong> (4:12 or steeper) shed water by gravity and are well-suited to shingles, slate, or metal panels. <strong>Low-slope roofs</strong> (under 4:12) hold water during rainstorms and require continuous-membrane systems (EPDM, TPO, modified bitumen) — shingles will fail prematurely on anything under 4:12. We measure your roof's slope on every estimate and won't quote a system that's wrong for the pitch, even if it would be cheaper.</p>",
    },
    {
      heading: "HOA, Historic Districts, and Approval Processes",
      html: "<p>If you're in a Philadelphia HOA or historic district (Society Hill, Old City, Rittenhouse, Chestnut Hill, Mt. Airy West), there's a separate approval process before any roof work can start: <strong>HOA architectural review</strong> for color/material approval, <strong>Philadelphia Historical Commission</strong> for visible roof changes in historic districts. We've done dozens of these projects and know which materials are pre-approved by which boards, which saves you 4-6 weeks of submission/revision cycles. We'll handle the paperwork and review submissions for you when needed.</p>",
    },
    {
      heading: "From Estimate to Final Inspection — What to Expect",
      html: "<p>A typical residential roofing project with us follows this timeline: <strong>day 1</strong> on-site estimate, written quote within 48 hours; <strong>1-2 weeks later</strong> material order and permit pull; <strong>install day</strong> 1-3 days depending on size; <strong>final inspection</strong> by Philadelphia L&I (we coordinate). On install day the crew arrives at 7 AM, we tarp landscaping and protect AC condensers, dumpster delivered before tear-off, complete cleanup at end of every day with magnetic nail sweeps. You'll have a single point of contact (the project manager) from estimate through final inspection.</p>",
    },
  ],

  // -------------------------------------------------------------------------
  "flat-roof-repair": [
    {
      heading: "EPDM Seam Repair — The Most Common Flat Roof Repair in Philadelphia",
      html: "<p>EPDM rubber roofs fail at the seams more often than anywhere else. Original installation seams used a tape-and-prime system that gradually loses adhesion over 15-20 years, especially at corners and tee-joints. Our seam repair process: <strong>clean</strong> the existing membrane with EPDM cleaner, <strong>prime</strong> the substrate, <strong>apply</strong> a 6-inch wide cover-strip patch over the failed seam with new high-bond tape, <strong>roll</strong> with a hand seam roller to ensure full adhesion. A properly executed seam repair carries a 5-10 year service life and costs a fraction of a full membrane replacement.</p>",
    },
    {
      heading: "Patching vs Full Replacement — How We Decide",
      html: "<p>If your flat roof has 1-3 isolated leak points and the membrane otherwise has 5+ years of life remaining, patching is the right answer — typical patch repair runs $400-1,200 in Philadelphia. If you're getting new leak callbacks every season, the membrane has visible alligatoring or chalking across the field, or moisture probing shows wet insulation under more than 10% of the roof, you're past the patching threshold. We probe before quoting on every flat roof inspection so the recommendation is based on what's actually under your membrane, not a guess.</p>",
    },
    {
      heading: "Common Flat Roof Leak Sources in Philadelphia Rowhouses",
      html: "<p>On Philadelphia rowhouses specifically, leaks tend to cluster at: <strong>parapet wall flashing</strong> (where your roof meets the shared wall with the neighbor), <strong>chimney flashing</strong> (especially at the back side where snow piles up), <strong>scupper drains</strong> at the front and rear of the building, <strong>vent stack penetrations</strong>, and <strong>at the seams between your roof membrane and the neighbor's</strong>. Diagnosing the actual leak source requires more than just looking at the wet ceiling stain inside — water travels along framing before it drops, so the visible ceiling spot is rarely directly below the actual leak.</p>",
    },
    {
      heading: "Ponding Water — Why It's a Bigger Deal Than It Looks",
      html: "<p>If your flat roof holds standing water for more than 48 hours after a rain, you have a ponding problem. Long-term ponding accelerates membrane breakdown, voids most manufacturer warranties, and adds dead-load weight that the original deck wasn't designed for. We fix ponding three ways depending on cause: <strong>tapered insulation</strong> built up under a re-roof to redirect water to drains, <strong>additional drains or scuppers</strong> installed where existing drainage is undersized, and <strong>structural reinforcement</strong> if the deck has sagged from years of water weight.</p>",
    },
    {
      heading: "Reflective Coatings — When They Make Sense (and When They Don't)",
      html: "<p>White reflective elastomeric coatings (typically silicone or acrylic) can extend the life of an aging flat roof by 5-10 years and reduce summer cooling costs by 10-15%. They're a smart investment when the underlying membrane is sound but aging — think of them as a sunscreen for your roof. They are <strong>not</strong> a substitute for repair: spraying coating over an actively leaking roof traps moisture and accelerates failure. We only quote a coating when the membrane is intact and the goal is service-life extension, not leak repair.</p>",
    },
  ],


  // -------------------------------------------------------------------------
  "vinyl-siding": [
    {
      heading: "Insulated vs Standard Vinyl — The R-Value Decision",
      html: "<p>Standard vinyl siding (the kind installed on most Philadelphia rowhomes in the 1990s and 2000s) provides essentially zero insulation value — it's just a weather barrier. <strong>Insulated vinyl siding</strong> (CertainTeed Cedar Impressions, Mastic Structure, Norandex EnerEx) has rigid foam laminated to the back of every panel, adding R-2 to R-4 of continuous insulation. On a Philadelphia rowhome with no wall insulation, upgrading from standard to insulated vinyl during a re-side typically cuts winter heating bills by 8-12% and pays for the upgrade premium within 5-7 years.</p>",
    },
    {
      heading: "Color and Texture Options That Don't Look Like Vinyl",
      html: "<p>Modern vinyl siding has come a long way from the white-only, fake-grain look of 30 years ago. Current vinyl lines we install in Philadelphia: <strong>thick-profile (.046+ gauge)</strong> with deep wood-grain embossing, <strong>shake and shingle profiles</strong> for accent gables, <strong>color-fade warranties</strong> of 25-30 years (vinyl from 2000s-era used to fade noticeably by year 10; modern formulations don't), and <strong>dark colors</strong> (deep blues, grays, browns) that earlier vinyl couldn't hold without warping. We bring full sample boards to every estimate so you see the actual finished look in your home's lighting before committing.</p>",
    },
    {
      heading: "What Goes Behind the Vinyl",
      html: "<p>Vinyl siding is only as good as what's installed behind it. Our standard system: <strong>existing siding fully removed</strong> (we don't install vinyl over existing siding — it traps moisture and voids manufacturer warranties), <strong>sheathing repair</strong> where the underlying OSB or plywood has rotted, <strong>weather-resistant barrier</strong> (Tyvek HomeWrap or Hydrogap) properly seamed and taped, optional <strong>continuous foam insulation</strong> on full re-sides for maximum thermal performance, and <strong>flashing tape</strong> at every window, door, and wall penetration. Skipping any layer is a 10-year shortcut on a 40-year material.</p>",
    },
    {
      heading: "Vinyl's Lifespan in the Philadelphia Climate",
      html: "<p>Quality vinyl siding installed correctly should give you <strong>30-40 years</strong> of zero-maintenance service in Philadelphia's climate. The freeze-thaw cycles, summer humidity, and UV exposure don't shorten that significantly when the vinyl is .044 gauge or thicker (we install nothing thinner). Annual maintenance is one rinse with a garden hose to wash off pollen, soot, and pollution film. No painting, no staining, no caulking. The homes we re-sided in 2008-2010 still look essentially the same as install day.</p>",
    },
    {
      heading: "Vinyl vs Fiber Cement — When Each Wins",
      html: "<p>Vinyl wins on <strong>price</strong> (roughly half the installed cost of fiber cement), <strong>maintenance</strong> (zero versus repaint every 15-20 years), and <strong>install time</strong> (faster, less invasive). Fiber cement wins on <strong>resale value</strong> in upper-tier neighborhoods like Chestnut Hill, Society Hill, and Rittenhouse where buyers expect Hardie, on <strong>fire resistance</strong> in row construction, and on <strong>impact resistance</strong> from hail and storms. We quote both options on most full re-side jobs in Philadelphia so you can compare the actual numbers for your home and make the call yourself.</p>",
    },
  ],


  // -------------------------------------------------------------------------
  "window-repair": [
    {
      heading: "Common Window Failures and What Causes Them",
      html: "<p>The most frequent window repair calls in Philadelphia: <strong>broken seals</strong> (the foggy, condensation-between-panes look — caused by spacer failure on year-15+ insulated glass units), <strong>sash hardware failure</strong> (broken balance springs, snapped tilt latches, worn pivot bars), <strong>weatherstripping deterioration</strong> (drafts in winter, often the cheapest fix on the list), <strong>broken or stuck locks</strong>, and <strong>cracked or chipped glass</strong> from impact or thermal stress. Each has a distinct fix — we diagnose the specific failure mode on every repair call before quoting parts.</p>",
    },
    {
      heading: "DIY vs Pro Repair — Where the Line Is",
      html: "<p>Some window repairs are reasonable DIY projects: weatherstripping replacement, lock cylinder swaps, simple latch adjustments. Others really should go to a pro: <strong>insulated glass unit (IGU) replacement</strong> (requires factory-spec glass and proper resealing — wrong glass voids the manufacturer warranty), <strong>balance spring replacement</strong> (the springs are under significant tension and can injure if released wrong), <strong>full sash rebuild</strong>, and <strong>lead paint disturbance</strong> on pre-1978 windows (legally requires RRP-certified contractor). We're upfront about which is which and won't upsell you a service call for a $20 weatherstrip you can do yourself.</p>",
    },
    {
      heading: "Repair vs Replace — How to Run the Numbers",
      html: "<p>The honest math on most window repairs: <strong>a single broken IGU</strong> costs $150-350 to swap, versus $500-900 to replace the entire window. <strong>Sash hardware fix</strong> runs $100-250 versus $500+ for full replacement. <strong>If more than half your windows have failed seals</strong> simultaneously, replacement starts to make economic sense — the per-window install cost drops, and you're getting current-spec efficiency on the whole envelope. We'll quote both options whenever both are viable so you can see the comparison.</p>",
    },
    {
      heading: "Storm Windows — A Cheaper Alternative to Replacement",
      html: "<p>If your existing windows are functional but drafty (common on pre-WW2 Philadelphia homes with original wood double-hung windows), <strong>interior storm windows</strong> can deliver 70-80% of the energy savings of full replacement at 25-30% of the cost. Indow inserts and Larson Quickfit interiors are two systems we install regularly. They're also a great fit for historic district homes where exterior window changes require Historical Commission approval but interior modifications don't. We evaluate every existing window on a repair call to see if storms are a smarter spend than replacement.</p>",
    },
  ],


  // -------------------------------------------------------------------------
  "gutter-cleaning": [
    {
      heading: "How Often to Clean Gutters on a Philadelphia Home",
      html: "<p>For most Philadelphia homes, <strong>twice a year</strong> is the right cadence: once in late spring (after maple seeds and oak pollen drop) and once in late fall (after leaves come down). Homes with mature trees overhanging the roof — common in West Philadelphia, Mt. Airy, and Chestnut Hill — should be cleaned <strong>three or four times</strong> per year because clogs build up faster. Homes with no overhanging trees and a metal-screen gutter guard system can often go to <strong>once a year</strong>. The right cadence pays for itself many times over by preventing the secondary damage clogged gutters cause.</p>",
    },
    {
      heading: "Tree Species That Cause the Worst Clogs",
      html: "<p>The trees that clog gutters worst in Philadelphia, in order: <strong>silver maple</strong> (giant fluffy seed clusters in May and dense leaves in October), <strong>oak</strong> (heavy leaf load plus acorns that physically block downspouts), <strong>sycamore</strong> (peeling bark that mats into gutters), <strong>sweetgum</strong> (the spiked seed balls jam downspout elbows), and <strong>pine</strong> (dropped needles year-round form a wet mat that blocks drainage). If you have any of these within 30 feet of your roofline, you're a candidate for more frequent cleaning or a screen system.</p>",
    },
    {
      heading: "What Damage Neglected Gutters Actually Cause",
      html: "<p>A clogged gutter overflowing for one season can cause: <strong>fascia rot</strong> behind the gutter (visible as soft wood when you press a screwdriver), <strong>soffit damage</strong> from water tracking back into the eave, <strong>sheathing rot</strong> at the roof edge that compromises the next 5 feet of roof, <strong>siding stains and mold</strong> on whatever wall the overflow is hitting, and <strong>foundation problems</strong> from concentrated water pooling at the base of the home. The repair cost for any one of these is typically 5-10× the cost of routine cleanings that would have prevented it.</p>",
    },
    {
      heading: "Cleaning + Inspection — Why We Bundle Them",
      html: "<p>Every Adilay Roofing gutter cleaning in Philadelphia includes a <strong>condition inspection</strong>: we walk every linear foot of gutter, check hangers and seams, probe fascia for rot, photograph any issues we find, and email the report to you the same day. Roughly 1 in 4 cleanings turns up at least one item that should be addressed in the next 6-12 months. Catching these early — a $200 fascia repair instead of a $2,000 fascia-and-sheathing rebuild — is the real value of routine professional cleaning over having a relative do it with a leaf blower.</p>",
    },
    {
      heading: "Why Hand-Cleaning Beats Blowers and Pressure Washers",
      html: "<p>Leaf blowers move debris but leave the silty mineral sludge that actually causes long-term damage to gutter coatings. Pressure washers can loosen seams, blast sealant out of end caps, and force water back under shingles where it shouldn't go. Our process is <strong>hand removal</strong> with gloved scoops, <strong>downspout flushing</strong> with controlled water flow to verify drainage, and <strong>final wipe-down</strong> of gutter interiors. It takes longer but produces a gutter that's truly clean and undamaged — the difference shows up 5-10 years later when our customers' gutters are still tight and our competitors' are sagging.</p>",
    },
  ],

  // -------------------------------------------------------------------------
  "gutter-installation": [
    {
      heading: "Seamless Aluminum vs Sectional — Why Seamless Wins for Most Philadelphia Homes",
      html: "<p>Sectional gutters (the kind sold at home centers in 10-foot sticks) have a seam every 10 feet — and every seam is a potential leak. <strong>Seamless aluminum gutters</strong> are extruded on-site to the exact length of each run, so the only joints are at corners and downspout drops. Seamless costs 20-30% more upfront but typically lasts 25-30 years versus 12-15 for sectional, and you'll spend less on seam-leak repairs over the lifespan. For 90% of Philadelphia homes we install seamless as the default; sectional only makes sense for very small accessory structures.</p>",
    },
    {
      heading: "5-Inch vs 6-Inch K-Style — Sizing for the Roof",
      html: "<p>The standard residential gutter is <strong>5-inch K-style</strong>, which handles roof areas up to about 1,000 square feet per downspout. Larger homes, homes with steeper pitched roofs (which shed water faster), and homes with major rainfall exposure should step up to <strong>6-inch K-style</strong>: 40% more capacity, 8% wider visible profile from the ground, only $1-2/foot more installed. We measure your actual roof area and pitch on every estimate; if you're at the threshold we recommend the 6-inch upgrade so you're not undersized in the storms that actually matter.</p>",
    },
    {
      heading: "Downspout Sizing, Quantity, and Routing",
      html: "<p>The right gutter capacity is wasted without enough downspouts. Standard residential downspouts are <strong>2x3-inch rectangular</strong> (3-square-inch flow area) or <strong>3x4-inch</strong> (12 sq in flow area, 4× the capacity). We size at one downspout per 30-40 feet of gutter run for 2x3, or per 50-60 feet for 3x4. Routing matters too: downspout exits should be at least 5 feet from the foundation (to prevent basement water issues), and on Philadelphia rowhouses we coordinate downspout routing with neighbors so water isn't being directed onto shared property.</p>",
    },
    {
      heading: "Hidden Hangers — Why the Hardware Underneath Matters",
      html: "<p>The gutter you see is only as good as how it's hung. Our standard: <strong>hidden internal hangers</strong> (screwed into the fascia rafter every 24 inches), not surface-mounted spike-and-ferrule (which loosens with thermal cycling and falls out within 10 years), and not external strap hangers (which look unprofessional and can damage shingles). Hidden hangers don't show from the ground, hold up to 80 lb of ice load, and can be tightened or replaced individually without disturbing the gutter run. The hardware is the difference between gutters that look great install day and gutters that still look great 20 years later.</p>",
    },
    {
      heading: "Color Matching and Curb Appeal",
      html: "<p>Modern aluminum gutters come in 25+ baked-on enamel colors that match common Philadelphia trim and siding. We bring color samples to every estimate so you see the actual finish in your home's lighting before committing. Common Philadelphia choices: <strong>white</strong> (default for white-trim homes), <strong>matte black</strong> (modern and historic looks alike), <strong>bronze</strong> (warm tones, complements brick), and <strong>color-matched to existing siding</strong> for the cleanest visual integration. Color-matched gutters add roughly $0.50/foot but make the home look more intentional and add resale value when you sell.</p>",
    },
  ],

  // -------------------------------------------------------------------------
  "gutter-screening": [
    {
      heading: "Screen Types — Mesh, Solid, and Foam Compared",
      html: "<p>Three gutter-protection systems we install in Philadelphia, ranked by effectiveness: <strong>fine micro-mesh</strong> (LeafFilter, Gutter Helmet, GutterGlove — block almost all debris but cost $20-30/foot installed and can be over-spec for homes without major tree exposure), <strong>solid covers with reverse-curve</strong> (water rides over the curve into the gutter, leaves slide off — $15-20/foot, work well in moderate leaf load), and <strong>foam inserts</strong> (cheap, $3-6/foot, only marginal effectiveness and degrade with UV — we generally don't recommend them despite the price). The right system depends on tree exposure and budget.</p>",
    },
    {
      heading: "Cost vs Ongoing Cleaning Savings",
      html: "<p>Quality gutter screens cost $1,500-4,000 installed on a typical Philadelphia home, depending on linear feet and system choice. Twice-a-year professional cleaning runs roughly $200-400 per visit, so $400-800/year. <strong>Payback math: most screen systems break even at year 4-7 versus continued professional cleaning</strong>, and the ongoing labor savings continue from there. Beyond direct cost, screens prevent the secondary damage clogged gutters cause (fascia rot, foundation water, ice dams) — much harder to put a number on but real value.</p>",
    },
    {
      heading: "Warranty Considerations — Read the Fine Print",
      html: "<p>\"Lifetime warranty\" claims in the gutter-screening industry are notoriously slippery. Common gotchas in screening warranties: <strong>transferability</strong> (does it survive a home sale?), <strong>service requirement</strong> (some require annual paid \"inspections\" by the original installer to keep warranty valid), <strong>exclusions for certain debris types</strong> (pine needles often excluded), and <strong>labor coverage limits</strong> (warranty pays for materials but you pay labor for the warranty service call). We read every warranty in plain English on the estimate so you understand exactly what you're getting before signing.</p>",
    },
    {
      heading: "Retrofit vs New Install — How We Approach Each",
      html: "<p>If your existing gutters are in good condition (3-15 years old, properly hung, no major leaks), a screen <strong>retrofit</strong> is the right project — $1,500-3,000 typical for a Philadelphia home. If your existing gutters are sagging, leaking, or older than 20 years, the smart play is a <strong>combined gutter replacement + screening</strong> — the install crew is already on-site, the per-foot install cost drops, and you avoid having to remove brand-new screens to replace failing gutters in 5 years. We assess and recommend honestly on every estimate.</p>",
    },
  ],


  // -------------------------------------------------------------------------
  "shingle-repair": [
    {
      heading: "Common Shingle Damage We Repair",
      html: "<p>The frequent shingle repair calls in Philadelphia: <strong>wind-lifted shingles</strong> after nor'easters or summer thunderstorm gusts (single shingle or whole-row peeling along the leading edge), <strong>granule loss</strong> from age, hail, or pressure-washing damage (visible as smooth black spots and granules in the gutters), <strong>cracked shingles</strong> from foot traffic or thermal stress, <strong>missing shingles</strong> from impact damage (fallen branches, hail), and <strong>flashing failures</strong> at chimneys, valleys, and sidewalls (the actual leak source for most \"shingle\" leaks). We diagnose the specific failure mode before quoting parts.</p>",
    },
    {
      heading: "Wind-Lifted Shingles and Why They Happen",
      html: "<p>Shingles are wind-rated up to 110-130 mph for architectural products, but the rating only holds when they're installed correctly: <strong>six nails per shingle</strong> placed in the nail line (not above or below), <strong>self-sealing strips activated</strong> by sun exposure (a common failure mode for shingles installed in cool weather and never properly heat-sealed), and <strong>proper starter strip and ridge cap</strong>. When we repair a wind-lifted area we hand-seal the new shingles with manufacturer-spec roofing cement so they bond before the next storm regardless of weather.</p>",
    },
    {
      heading: "Granule Loss — When It's Cosmetic and When It's a Problem",
      html: "<p>Granule loss from <strong>year 1-3 of a new install</strong> is normal — loose factory granules wash off in the first few rainstorms. Granule loss from <strong>year 5-15</strong> in concentrated areas (under valleys, at downspout impact points, where tree limbs scrape) is usually addressable with selective shingle replacement and corrective work. <strong>Widespread granule loss from year 15+</strong> is end-of-life and replacement is the right answer — the underlying asphalt mat is now exposed to UV and will fail rapidly. Granule loss is a useful indicator of where you are in the roof's lifespan curve.</p>",
    },
    {
      heading: "Hail Damage and Insurance Documentation",
      html: "<p>Hail damage to asphalt shingles can be subtle: small circular bruises where the granules are knocked off and the underlying mat is fractured. Untrained eyes miss it; trained adjusters and roofers find it with chalk marking. We do <strong>free post-storm hail inspections</strong> for Philadelphia homeowners after any significant hail event. If we find damage, we provide the chalk-marked photo report your insurance carrier needs to approve a claim. Roughly 60% of post-hail inspections we do result in a claim being approved — the carriers know what to look for, but you have to ask.</p>",
    },
    {
      heading: "Matching Shingles on Older Roofs — A Real Challenge",
      html: "<p>If your roof is more than 5-7 years old, <strong>exact-match replacement shingles probably aren't available anymore</strong>. Manufacturers discontinue color blends every few years, and sun-faded shingles don't match new ones of the same color anyway. Our approach: pull spare shingles from <strong>less-visible roof areas</strong> (rear slopes, behind dormers) and install the new shingles in those locations, leaving the matched-vintage shingles on the visible front. Done well, the repair is invisible from the curb. We also keep an inventory of common discontinued colors when we can source them.</p>",
    },
  ],


  // -------------------------------------------------------------------------
  "soffit-repair": [
    {
      heading: "What Soffits Actually Do for Your Philadelphia Home",
      html: "<p>The soffit is the underside of your roof eave overhang — the part you see when you stand below and look up. It does two jobs that most homeowners don't realize: <strong>ventilation</strong> (intake vents in the soffit pull cool air into the attic, which exits through ridge or gable vents — without soffit ventilation your attic heats up and your shingles age twice as fast), and <strong>protection</strong> (it prevents water, insects, birds, and squirrels from entering the eave assembly). When soffits fail, you get cooked shingles, ice dams in winter, and surprise wildlife in your attic.</p>",
    },
    {
      heading: "Common Causes of Soffit Damage",
      html: "<p>Soffits in Philadelphia fail for predictable reasons: <strong>chronic gutter overflow</strong> (the most common cause — water tracks back along the soffit and rots the wood from above), <strong>ice dam damage</strong> in February (water backed up under shingles eventually finds the soffit), <strong>animal damage</strong> from squirrels, raccoons, or starlings chewing entry holes, <strong>impact damage</strong> from ladders during gutter cleaning, and <strong>simple age</strong> on wood soffits past year 30-40. Each cause has a different repair scope; identifying it is step one of the diagnosis.</p>",
    },
    {
      heading: "Vinyl, Aluminum, and Wood Soffits — Replacement Material Options",
      html: "<p>When soffit damage requires replacement (rather than repair), you have three material choices: <strong>vinyl soffit</strong> (lifetime non-prorated warranty, vented or solid panels, color choices, around $7-12 per linear foot installed), <strong>aluminum soffit</strong> (more durable than vinyl, longer color lifespan, $10-15 per foot, our most common recommendation in Philadelphia), and <strong>wood soffit replacement</strong> (matches original construction on historic homes, $15-25 per foot installed plus periodic painting). For most homes we recommend aluminum as the right balance of durability, appearance, and cost.</p>",
    },
    {
      heading: "Working With Fascia and Gutters — Sequence Matters",
      html: "<p>The right repair sequence on an eave is: <strong>gutter removal</strong> → <strong>fascia inspection and repair</strong> → <strong>soffit repair or replacement</strong> → <strong>fascia wrap or repaint</strong> → <strong>gutter reinstall or replacement</strong>. Doing the sequence out of order — installing new soffits behind existing fascia, or hanging gutters on rotted fascia — guarantees you'll have to redo the work. We package soffit repair with fascia and gutter work whenever the underlying problem touches all three, because partial fixes don't solve the root cause and you end up paying twice.</p>",
    },
  ],

  // -------------------------------------------------------------------------
  "storm-damage-roof-repair": [
    {
      heading: "Common Storm Damage Types We Repair in Philadelphia",
      html: "<p>Philadelphia gets hit by storms several times a year that produce roof damage. The frequent damage types: <strong>wind-lifted or torn shingles</strong> from nor'easter gusts (60+ mph), <strong>tree limb impact</strong> punching through the deck or breaking shingles, <strong>hail damage</strong> from summer thunderstorms (subtle bruising that an untrained eye misses), <strong>flashing failures</strong> at chimneys and valleys from wind-driven rain, and <strong>full sections</strong> of shingles peeled away in tornado-strength gusts (rare but not unheard of in summer in Philadelphia). Each has a distinct response timeline.</p>",
    },
    {
      heading: "Same-Day Tarping and Temporary Weatherproofing",
      html: "<p>If your roof has active leaks or visible damage after a storm, tarping is the priority — stop the secondary damage before scheduling permanent repairs. Our <strong>same-day emergency tarping service</strong> covers Philadelphia and the close suburbs: we install heavy-duty 6-mil reinforced tarp over the damaged area, secured with sandbags or screwed-down 1x4 furring strips, with proper overlap to shed water. Tarping holds for 30-60 days while the permanent repair is scheduled and any insurance claim is processed. Tarping cost is typically reimbursable through your homeowner's insurance. Roof actively leaking right now? Go straight to our <a href=\"/services/emergency-roof-repair\">24/7 emergency roof repair in Philadelphia</a> — that team dispatches day or night.</p>",
    },
    {
      heading: "The Insurance Claim Process — How to Maximize Your Coverage",
      html: "<p>If you suspect storm damage, do these things in order: <strong>document immediately</strong> with photos before any cleanup, <strong>save any debris or damaged shingles</strong> as evidence, <strong>file the claim</strong> with your insurance carrier within the policy window (usually 365 days for storm damage but check yours), <strong>request a meeting</strong> between the adjuster and your roofer at the property, and <strong>get a written scope of work</strong> from the adjuster before you sign anything. We meet adjusters on roofs across Philadelphia 30-40 times a year and know exactly what documentation State Farm, Allstate, USAA, Liberty Mutual, and Erie need.</p>",
    },
    {
      heading: "Permanent Repair vs Full Replacement — How Carriers Decide",
      html: "<p>Insurance carriers will typically pay for: <strong>permanent repair</strong> when the damage is localized (one or two areas), the rest of the roof is in good condition, and the original shingles are still available. They'll pay for <strong>full replacement</strong> when the damage covers more than 25% of the roof, when the roof is older and finding matching shingles is impossible, or when partial repair would leave a visually mismatched roof. Knowing how this decision gets made — and presenting your case correctly — can be the difference between a $1,500 repair check and a $15,000 replacement check.</p>",
    },
  ],

  // -------------------------------------------------------------------------
  "roof-leak-repair": [
    {
      heading: "Finding the Leak Source — Why It's Harder Than It Looks",
      html: "<p>The water stain on your ceiling is rarely directly below the actual leak. <strong>Water travels along framing</strong> — rafters, joists, plywood seams — before it finally drops through the ceiling drywall. A leak at a chimney flashing on the front of your house can produce a stain in the middle of the room. Finding the actual source requires <strong>roof access</strong>, <strong>attic inspection</strong> with a moisture meter, and sometimes <strong>controlled water testing</strong> (running a hose on suspected areas while a second tech watches inside). Skip this step and you're patching the wrong spot.</p>",
    },
    {
      heading: "Common Leak Points on Philadelphia Homes",
      html: "<p>The frequent leak locations we diagnose: <strong>chimney flashing</strong> (especially the back flashing where snow accumulates against the chimney), <strong>roof valleys</strong> (where two roof slopes meet — heavy water flow, common failure point in older roofs), <strong>vent boots</strong> around plumbing stacks (rubber boots crack from UV after 8-12 years), <strong>skylights</strong> (the seal between the skylight curb and the roof deck fails or the gasket between the lens and the curb deteriorates), and <strong>step flashing at sidewalls</strong> where a roof meets a vertical wall. Each requires a different repair technique.</p>",
    },
    {
      heading: "Repair Techniques — Real Fixes vs Temporary Patches",
      html: "<p>What we're not going to do: smear roofing cement over the visible leak area and call it fixed. Roofing cement is a temporary product (12-24 month service life) and using it as a permanent repair is what bad contractors do. Our approach: <strong>open up the failed assembly</strong> (remove a few shingles around the chimney, peel back the existing flashing), <strong>diagnose the actual failure</strong>, <strong>install proper new flashing</strong> (step flashing, counter flashing, ice-and-water shield as appropriate), and <strong>reinstall the shingles</strong>. The repair area looks essentially identical to the rest of the roof when we're done, and it'll outlast the surrounding shingles.</p>",
    },
    {
      heading: "When a Leak Means the Whole Roof Is Done",
      html: "<p>One leak point can be repaired. Multiple leaks in different locations on a roof older than 18-20 years usually mean the roof is at end-of-life and replacement is the right call. Telltale signs that point to replacement instead of repair: <strong>granule loss</strong> across the field, <strong>shingle curling or cupping</strong>, <strong>visible nail backing-out</strong> through the shingle face, <strong>moss or algae growth</strong> in patches, and <strong>multiple repair calls</strong> in the past 2-3 years. We're upfront on the diagnosis — repair when repair is the right answer, replacement quote when it's not.</p>",
    },
    {
      heading: "Active Leak Emergency Response",
      html: "<p>If you have water actively coming through your ceiling, follow this in order: <strong>contain the water</strong> (place a bucket and put a hole in the ceiling drywall to release trapped water — sounds counterintuitive but prevents the entire ceiling from collapsing under the water weight), <strong>protect electronics and valuables</strong> in the affected area, <strong>call us at (267) 255-3620</strong> for same-day emergency response (24/7 for active leaks), and <strong>document with photos</strong> for any insurance claim. Our typical response time for active leaks in Philadelphia is 2-6 hours during business hours, same-day after hours.</p>",
    },
  ],


  // -------------------------------------------------------------------------
  "emergency-roof-repair": [
    {
      heading: "What Counts as a Roofing Emergency in Philadelphia",
      html: "<p>Not every roof leak is an emergency. We define a true roofing emergency as any situation where active water is entering your living space, where structural roof material has been displaced (a tarp ripped off, a tree limb through the deck, a chimney leaning), or where a section of roof is exposed to weather that's still active. The classic Philadelphia emergencies we get called for: a nor'easter that lifted half a row's flat-roof membrane in Fishtown, a high-wind summer thunderstorm that took shingles off the windward side of a Manayunk Cape Cod, a derecho that dropped a Norway maple onto a Mt. Airy attic, and ice dams that finally cracked through the soffit at 4am after three weeks of February freeze-thaw. If water is in your house right now, call (267) 255-3620 — that's an emergency. If your roof can wait until morning, schedule a regular estimate.</p>",
    },
    {
      heading: "The First 24 Hours After a Storm — Homeowner Checklist",
      html: "<p>Before our crew arrives (we typically respond within 2-4 hours during business hours, longer overnight), there are five things you can do to protect your home and your insurance claim:</p><ul><li><strong>Move valuables and electronics</strong> away from any area showing water damage. Use buckets, plastic bins, or bath towels to catch active drips. Do not stand on wet flooring above a finished basement — drywall ceilings can fail without warning.</li><li><strong>Photograph everything.</strong> Interior water spots, ceiling stains, soaked insulation, exterior shingle damage visible from the ground. Date-stamp the photos via your phone's camera. These become evidence for your insurance adjuster.</li><li><strong>Locate your insurance policy</strong> and call the carrier's claims hotline. State Farm, Allstate, USAA, Liberty Mutual, Travelers, and Erie all have 24/7 claim intake; reporting within 24-48 hours strengthens the claim.</li><li><strong>Don't climb on a wet roof.</strong> Flat roofs after rain are slick. Pitched roofs after hail can hide unstable shingle patches. Let our crew handle it.</li><li><strong>Save the storm date and NWS event reference.</strong> Storm reports show specific times and hail/wind sizes that adjusters cite when approving claims.</li></ul>",
    },
    {
      heading: "Tarping, Patching, and Permanent Repair — Our Staged Approach",
      html: "<p>Emergency roof repairs come in three stages, and we do all three in sequence so your home is protected from the moment we arrive through the final repair.</p><p><strong>Stage 1 — Stabilization (within hours):</strong> a heavy-mil tarp anchored with 2x4 furring strips and roofing nails, weighed at the perimeter, sized to overlap the damage by at least 18 inches on all sides. A tarp like this buys you 7-30 days of dry weather depending on storm exposure and tarp anchoring. We use 12-mil reinforced poly, not the thin blue tarps you find at hardware stores.</p><p><strong>Stage 2 — Localized repair (within days):</strong> replacement shingles tied into existing flashing, or an EPDM/TPO patch heat-welded to existing membrane. This is a real repair, not a temporary one, and on a flat roof a properly heat-welded patch can outlast the rest of the roof.</p><p><strong>Stage 3 — Full replacement (within weeks):</strong> if the storm has revealed end-of-life material (a roof you were going to replace next year anyway), we transition the emergency repair into a full replacement and credit the patch cost toward the project. No double-billing for work you already paid for.</p>",
    },
    {
      heading: "Documenting an Insurance Claim — What Adjusters Need",
      html: "<p>Insurance adjusters in our region want specific documentation: cause of damage, date of loss, scope of repair, and replacement cost. We provide all of it in writing. On an emergency call we capture: <strong>date-stamped photos</strong> showing damage from multiple angles, <strong>soft-metal evidence of hail</strong> (gutter aprons, vents, AC unit fins all dimple in characteristic patterns), <strong>wind-uplift patterns</strong> on shingle roofs (lifted tabs, missing nails, exposed underlayment), <strong>exposed underlayment or decking</strong> on flat roofs, and <strong>any interior damage</strong> with measurements and material affected. We then provide a written, line-item scope and estimate that adjusters from State Farm, Allstate, Liberty Mutual, USAA, Travelers, and Erie all recognize. We never inflate scope to chase the deductible — that gets claims rejected and contractors blacklisted by carriers. If a claim isn't defensible, we tell you before you file.</p>",
    },
    {
      heading: "What to Expect When Our Emergency Crew Arrives",
      html: "<p>When the truck pulls up, you'll meet a 2-3 person crew: a project lead with at least 10 years of Philadelphia roofing experience, plus 1-2 supporting installers. We bring tarps in 20×30 and 30×40 sizes, a roller of EPDM repair membrane, a TPO heat welder for flat-roof patches, replacement architectural shingles in standard Philly-area colors (charcoal, weathered wood, slate gray), full fall-arrest harnessing for steep pitches, and a portable generator for nighttime work. Before any roof access we lay down driveway protection — sheet plywood over your gutters, drop cloths around landscaping, magnetic nail sweeps for the post-job cleanup. The first 30 minutes are inspection and damage assessment; the next 1-3 hours are stabilization. You'll have written documentation in your hand before we leave the property — photos, scope, and any insurance reference numbers we've already opened on your behalf.</p>",
    },
  ],
};
