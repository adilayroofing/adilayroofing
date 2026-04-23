import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/data/company";
import { services, getServicesByCategory, serviceCategories } from "@/data/services";
import { locations } from "@/data/locations";
import CTASection from "@/components/CTASection";
import TrustBar from "@/components/TrustBar";
import FAQ from "@/components/FAQ";
import TestimonialsSection from "@/components/TestimonialsSection";
import ScrollReveal from "@/components/ScrollReveal";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import BBBSeal from "@/components/BBBSeal";
import ServiceIcon from "@/components/ServiceIcon";
import { getPageSEO, buildMetadataFromSEO } from "@/lib/seo";

const BASE_URL = "https://www.adilayroofing.com";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const dbSeo = await getPageSEO("/roofer-philadelphia");
  if (dbSeo) {
    return {
      ...buildMetadataFromSEO(dbSeo),
      keywords: [
        "roofer Philadelphia",
        "Philadelphia roofer",
        "roofing contractor Philadelphia",
        "Philadelphia roofing company",
        "best roofer in Philadelphia",
        "licensed roofer Philadelphia PA",
        "roofer near me Philadelphia",
        "residential roofer Philadelphia",
        "commercial roofer Philadelphia",
      ],
    };
  }
  return {
    title: {
      absolute:
        "Roofer Philadelphia — Licensed, 20+ Years, 5-Star Rated | Adilay Roofing",
    },
    description:
      "Adilay Roofing is Philadelphia's trusted roofer — licensed PA184779, 20+ years, 5-star Google rated, free estimates. Residential & commercial roofing across Philly and surrounding counties.",
    keywords: [
      "roofer Philadelphia",
      "Philadelphia roofer",
      "roofing contractor Philadelphia",
      "Philadelphia roofing company",
      "best roofer in Philadelphia",
      "licensed roofer Philadelphia PA",
      "roofer near me Philadelphia",
    ],
    alternates: { canonical: `${BASE_URL}/roofer-philadelphia` },
    openGraph: {
      title:
        "Roofer Philadelphia — Licensed & Trusted Roofing Contractor | Adilay Roofing",
      description:
        "Philadelphia's licensed, family-owned roofer — 20+ years, PA184779, free estimates, same-day response for emergencies.",
      url: `${BASE_URL}/roofer-philadelphia`,
    },
  };
}

const philadelphiaNeighborhoods = [
  "northeast-philadelphia",
  "south-philadelphia",
  "kensington",
  "fishtown",
  "roxborough",
  "west-philadelphia",
  "north-philadelphia",
  "center-city",
  "manayunk",
  "university-city",
];

const faqs = [
  {
    question: "Who is the best roofer in Philadelphia?",
    answer:
      "The best Philadelphia roofer for your home is one who is licensed, insured, locally based, and willing to provide a written, no-obligation estimate. Adilay Roofing has served Philadelphia homeowners for 20+ years, holds Pennsylvania Home Improvement Contractor license PA184779, carries full general liability and workers' comp insurance, and is 5-star rated on Google. We're family-owned, run our own crews (no subcontractors), and stand behind every job with a workmanship guarantee.",
  },
  {
    question: "What does a Philadelphia roofer charge for a new roof?",
    answer:
      "A full roof replacement in Philadelphia typically runs $8,000 to $25,000 depending on the size of the roof, the material (asphalt shingle, flat EPDM, or metal), the complexity of the home's architecture, and the condition of the underlying decking. Roof repairs generally range from $250 to $2,500. We provide free, written estimates so you know exactly what to expect — no verbal guesses, no hidden fees.",
  },
  {
    question: "How fast can a Philadelphia roofer get to my house?",
    answer:
      "For emergency roof repair (active leaks, storm damage), Adilay Roofing typically dispatches a crew the same day across Philadelphia. For standard estimates, most appointments are scheduled within 24–48 hours. Major projects like full roof replacements are usually scheduled 1–3 weeks out depending on season and material availability.",
  },
  {
    question: "Do Philadelphia roofers need a license?",
    answer:
      "Yes. Pennsylvania requires any contractor performing more than $5,000 of home improvement work to register with the Office of the Attorney General. Adilay Roofing holds Pennsylvania Home Improvement Contractor license PA184779. Always ask any Philadelphia roofer for their license number before signing a contract — and verify it at the PA Attorney General's contractor search.",
  },
  {
    question: "What types of roofs are common on Philadelphia homes?",
    answer:
      "Philadelphia has one of the most varied housing stocks in the country. Row homes and twin homes in neighborhoods like Fishtown, Kensington, South Philly, and Point Breeze typically have flat EPDM rubber or modified bitumen roofs. Colonial, Cape Cod, and Victorian homes in the Main Line suburbs and Chestnut Hill use architectural asphalt shingles, sometimes slate or metal. Commercial buildings use TPO, EPDM, or built-up roofing. We service all of these systems.",
  },
  {
    question: "Should I hire a local Philadelphia roofer or a national chain?",
    answer:
      "Local Philadelphia roofers almost always outperform national chains for residential work. Local crews know Philadelphia building codes, understand the weather patterns, can respond faster to warranty callbacks, and have community reputations they care about protecting. National chains often subcontract work out to third-party crews, which hurts both quality and accountability.",
  },
  {
    question: "What kind of warranty should a Philadelphia roofer offer?",
    answer:
      "A good Philadelphia roofer offers two warranties: a manufacturer's material warranty (often 25–50 years for quality asphalt shingles, from brands like GAF, CertainTeed, or Owens Corning) and a separate workmanship warranty covering labor. Adilay Roofing provides both in writing on every roof replacement project.",
  },
  {
    question: "Does a Philadelphia roofer handle insurance claims?",
    answer:
      "Yes, a good local roofer helps you through insurance claims for storm damage. We document the damage with photos and a written scope, meet with your adjuster on-site if needed, and submit the estimate your carrier requires. We work with every major Pennsylvania insurance carrier.",
  },
  {
    question: "Can I get a free quote from a Philadelphia roofer?",
    answer:
      "Yes. Adilay Roofing provides 100% free, no-obligation roofing quotes in Philadelphia for repairs, replacements, and inspections. You get a written estimate with itemized materials and labor — no pressure, no follow-up sales calls. Request yours by filling out the form on our get-a-quote page or calling (888) 823-4766.",
  },
  {
    question: "What should I look for when hiring a roofer in Philadelphia?",
    answer:
      "Check four things: (1) PA contractor license number (PA184779 for Adilay), (2) proof of general liability and workers' compensation insurance, (3) written estimate on company letterhead with itemized pricing, and (4) local references and recent Google reviews from Philadelphia neighbors. Any roofer who refuses to provide these is one to avoid.",
  },
  {
    question: "Do you serve areas outside Philadelphia?",
    answer:
      "Yes. Beyond Philadelphia itself, we serve the four surrounding counties: Bucks, Montgomery, Delaware, and Chester — and parts of southern New Jersey (Camden and Burlington counties). That covers most of the greater Philadelphia metro area. Check our service areas page for a complete list of towns.",
  },
];

export default function RooferPhiladelphiaPage() {
  const roofingServices = getServicesByCategory("roofing");
  const shingleServices = getServicesByCategory("shingles");
  const sidingServices = getServicesByCategory("siding");
  const windowServices = getServicesByCategory("windows");
  const gutterServices = getServicesByCategory("gutters");

  const cityNeighborhoods = locations.filter((l) =>
    philadelphiaNeighborhoods.includes(l.slug)
  );

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    name: "Adilay Roofing",
    description:
      "Licensed Philadelphia roofer — 20+ years, PA184779, free estimates, same-day response for emergencies. Residential and commercial roofing across Philadelphia and surrounding counties.",
    url: `${BASE_URL}/roofer-philadelphia`,
    telephone: company.phoneRaw,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      postalCode: company.address.zip,
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "City", name: "Philadelphia" },
      { "@type": "AdministrativeArea", name: "Bucks County" },
      { "@type": "AdministrativeArea", name: "Montgomery County" },
      { "@type": "AdministrativeArea", name: "Delaware County" },
      { "@type": "AdministrativeArea", name: "Chester County" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbJsonLd
        items={[{ name: "Roofer Philadelphia", path: "/roofer-philadelphia" }]}
      />

      {/* HERO */}
      <section className="relative bg-brand-darker text-white py-16 md:py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-darker via-brand-dark to-brand-darker opacity-95" />
        <div className="relative container-narrow mx-auto text-center">
          <p className="inline-block bg-brand-red/20 text-brand-red font-bold uppercase text-xs tracking-widest px-3 py-1.5 rounded-sm mb-4">
            Philadelphia's Trusted Roofer · Licensed PA184779
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
            Roofer Philadelphia — Licensed, Trusted, 20+ Years of Quality Work
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Adilay Roofing is a family-owned, locally-operated Philadelphia
            roofer serving residential and commercial properties across
            Philadelphia, Bucks, Montgomery, Delaware, and Chester counties.
            Free written estimates, same-day response for emergencies, and a
            workmanship guarantee on every job.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/get-quote"
              className="btn-primary inline-flex items-center gap-2"
            >
              Get My Free Roofing Quote
            </Link>
            <a
              href={`tel:${company.phoneRaw}`}
              className="inline-flex items-center gap-2 border border-white/40 hover:border-white/70 bg-white/10 hover:bg-white/15 rounded-sm px-5 py-3 text-white font-semibold transition-all"
            >
              Call {company.phone}
            </a>
          </div>
          <div className="mt-6 flex justify-center">
            <BBBSeal />
          </div>
        </div>
      </section>

      <TrustBar />

      {/* WHY CHOOSE ADILAY */}
      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="section-heading">
                Why Philadelphia Homeowners Choose Adilay Roofing
              </h2>
              <p className="section-subheading mx-auto mt-4">
                A licensed, local, family-run Philadelphia roofer — not a call
                center, not a national chain.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto space-y-4 text-brand-gray leading-relaxed">
            <p>
              Choosing the right <strong>roofer in Philadelphia</strong> is one
              of the most consequential decisions you'll make as a homeowner.
              A good roof protects tens of thousands of dollars of structure,
              belongings, and interior finish below it; a bad one lets water
              destroy all of it. Over the past 20+ years, Adilay Roofing has
              grown into one of the most trusted Philadelphia roofing
              contractors by doing one thing consistently: showing up on time,
              telling the truth about what a roof actually needs, and standing
              behind the work for as long as it's on your home.
            </p>
            <p>
              We're a <strong>licensed Pennsylvania contractor</strong>{" "}
              (PA184779), fully insured with general liability and workers'
              compensation coverage, BBB accredited, and 5-star rated on
              Google. Those aren't just credentials — they mean you're
              protected if anything goes wrong, and that our team is held to
              real professional standards. We run our own crews (no
              subcontractors), so the person who quotes your job is the person
              standing behind it.
            </p>
            <p>
              Because we live and work in the same Philadelphia neighborhoods
              our customers do, our reputation isn't built on ads — it's built
              on referrals. Most of our work comes from previous customers,
              neighbors, and word-of-mouth across Northeast Philadelphia,
              South Philly, Manayunk, Roxborough, Fishtown, Germantown, the
              Main Line, Bucks County, and beyond. That's the benefit of
              hiring a local <strong>Philadelphia roofer</strong>: you're
              hiring someone who has to answer for their work in person, not
              a phone number that routes to another state.
            </p>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/get-quote"
              className="btn-primary inline-flex items-center gap-2"
            >
              Request Your Free Estimate
            </Link>
          </div>
        </div>
      </section>

      {/* ROOFING SERVICES IN PHILADELPHIA */}
      <section className="section-padding bg-brand-light">
        <div className="container-wide mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="section-heading">
                Full-Service Roofing in Philadelphia
              </h2>
              <p className="section-subheading mx-auto mt-4">
                Whether you need a quick roof leak repair or a full
                replacement — we do every part of a roof, plus exterior
                services that work with it.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {roofingServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group bg-white border border-brand-border rounded-sm p-5 hover:border-brand-red hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-brand-red/10 text-brand-red flex items-center justify-center">
                    <ServiceIcon slug={s.slug} className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark mb-1 group-hover:text-brand-red transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-sm text-brand-gray leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Other service categories (compact grid) */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Shingle Services", list: shingleServices },
              { label: "Siding", list: sidingServices },
              { label: "Windows", list: windowServices },
              { label: "Gutters", list: gutterServices },
            ].map((group) => (
              <div
                key={group.label}
                className="bg-white border border-brand-border rounded-sm p-5"
              >
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-red mb-2">
                  {group.label}
                </h3>
                <ul className="space-y-1">
                  {group.list.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="text-brand-dark hover:text-brand-red text-sm font-semibold transition-colors"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILADELPHIA ROOFING IS UNIQUE */}
      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="section-heading">
                Philadelphia Roofing Is Different — Here's What That Means
              </h2>
              <p className="section-subheading mx-auto mt-4">
                Every Philadelphia roofer worth hiring knows the local housing
                stock, climate, and code requirements. We do.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto space-y-4 text-brand-gray leading-relaxed">
            <p>
              Philadelphia has some of the most diverse housing stock in the
              country, and that affects every roofing decision. In Fishtown,
              Kensington, Point Breeze, and the row-home neighborhoods of
              South Philly, flat EPDM rubber and modified bitumen roofs are
              the norm — they're cost-effective to install, but seam failures
              and drain issues are the number-one source of roof leaks we fix
              on Philadelphia row homes. A good roofer has to be fluent in
              flat-roof systems, not just shingles.
            </p>
            <p>
              In the streetcar suburbs — Mount Airy, Chestnut Hill,
              Germantown, West Philadelphia — you'll find Victorian and
              Colonial homes with steep-pitch architectural asphalt, slate,
              and the occasional tile roof. These homes often have complex
              valleys, dormers, and chimneys that require experienced hands
              and proper flashing to stop leaks. Out on the Main Line and
              into Montgomery and Chester counties, larger Colonials and
              custom homes lean toward high-end architectural shingles,
              cedar shake, and metal roofing.
            </p>
            <p>
              On top of housing variety, Philadelphia's climate is demanding
              — hot humid summers, heavy rain, ice dams in winter, nor'easter
              wind events, and the occasional hurricane remnant. Any{" "}
              <strong>Philadelphia roofer</strong> worth hiring selects
              materials, underlayment, and ventilation specifically for this
              climate. We use ice-and-water shield in vulnerable valleys,
              proper ridge venting to prevent attic condensation, and
              high-wind-rated shingles (GAF Timberline HDZ, CertainTeed
              Landmark) that are tested to handle Philadelphia storms.
            </p>
            <p>
              Finally — Philadelphia permits and code. Residential roof
              replacements in Philadelphia typically require a building
              permit, and commercial roofs are subject to additional
              inspection requirements. As a licensed Pennsylvania contractor,
              we pull permits, coordinate inspections, and make sure every
              job meets or exceeds the International Residential Code as
              adopted by the city.
            </p>
          </div>
        </div>
      </section>

      {/* NEIGHBORHOODS WE SERVE */}
      <section className="section-padding bg-brand-light">
        <div className="container-wide mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="section-heading">
                Philadelphia Neighborhoods We Serve
              </h2>
              <p className="section-subheading mx-auto mt-4">
                Local roofing service across every corner of the city — plus
                Bucks, Montgomery, Delaware, and Chester counties.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
            {cityNeighborhoods.map((n) => (
              <Link
                key={n.slug}
                href={`/service-areas/${n.slug}`}
                className="bg-white border border-brand-border hover:border-brand-red hover:shadow-sm rounded-sm px-3 py-2.5 text-center text-sm font-medium text-brand-dark hover:text-brand-red transition-all"
              >
                {n.name}
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/service-areas"
              className="inline-flex items-center gap-2 text-brand-red font-bold hover:gap-3 transition-all"
            >
              View All Service Areas &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ROOFING COSTS */}
      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="section-heading">
                What Does a Philadelphia Roofer Cost?
              </h2>
              <p className="section-subheading mx-auto mt-4">
                Honest, transparent price ranges so you know what to expect
                before you call.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {[
              {
                h: "Roof Repair",
                p: "$250 – $2,500 depending on the type of leak and accessibility. Most single-source leaks fall in the $400–$900 range.",
              },
              {
                h: "Roof Replacement (Shingle)",
                p: "$8,000 – $20,000 for a typical Philadelphia home. Price depends on size, shingle quality, and decking condition.",
              },
              {
                h: "Flat Roof (EPDM) Replacement",
                p: "$6,000 – $18,000 for row homes and small commercial buildings. New rubber, insulation, and flashing included.",
              },
              {
                h: "Storm / Insurance Damage",
                p: "Usually covered by homeowners insurance less your deductible. We handle the documentation and adjuster meeting.",
              },
              {
                h: "Roof Inspection",
                p: "Free. We provide a written report with photos whether you hire us for the repair or not.",
              },
              {
                h: "Emergency / Same-Day",
                p: "Same-day response across Philadelphia. Tarping starts at around $250; permanent repair quoted after inspection.",
              },
            ].map(({ h, p }) => (
              <div
                key={h}
                className="bg-brand-light border border-brand-border rounded-sm p-5"
              >
                <h3 className="font-bold text-brand-dark mb-1">{h}</h3>
                <p className="text-brand-gray text-sm leading-relaxed">{p}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-brand-gray mt-8 max-w-2xl mx-auto">
            These are general ranges — every Philadelphia property is
            different. Your actual price comes on a written estimate after a
            free on-site inspection.
          </p>
        </div>
      </section>

      <TestimonialsSection />

      {/* FAQ */}
      <section className="section-padding bg-brand-light">
        <div className="container-narrow mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="section-heading">
                Frequently Asked Questions About Philadelphia Roofers
              </h2>
              <p className="section-subheading mx-auto mt-4">
                Everything Philadelphia homeowners ask us before hiring a
                roofer.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <FAQ items={faqs} />
          </ScrollReveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
