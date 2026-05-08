import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import { company } from "@/data/company";
import { locations } from "@/data/locations";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getPageSEO, buildMetadataFromSEO, getStructuredContent } from "@/lib/seo";
import { BASE_URL, ORG_REF } from "@/lib/schema";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const dbSeo = await getPageSEO("/service-areas");
  if (dbSeo) {
    return {
      ...buildMetadataFromSEO(dbSeo),
      keywords: [
        "roofer near me Philadelphia",
        "roofing contractor near me",
        "roofer Bucks County PA",
        "roofer Montgomery County PA",
        "roofer Delaware County PA",
        "Chester County roofer",
        "roofer near me",
        "roofing service areas Philadelphia",
      ],
    };
  }
  return {
    title: "Service Areas — Philadelphia, PA & South Jersey",
    description:
      "Adilay Roofing serves Philadelphia, Bucks, Montgomery, Delaware & Chester Counties PA plus Camden & Burlington Counties NJ. Free estimates — (267) 255-3620.",
    keywords: [
      "roofer near me Philadelphia",
      "roofing contractor near me",
      "roofer Bucks County PA",
      "roofer Montgomery County PA",
      "roofer Delaware County PA",
      "Chester County roofer",
      "roofer near me",
      "roofing service areas Philadelphia",
    ],
    alternates: { canonical: `${BASE_URL}/service-areas` },
    openGraph: {
      title: "Adilay Roofing Service Areas — Philadelphia & Surrounding Counties",
      description:
        "Professional roofing in Philadelphia, Bucks, Montgomery, Delaware & Chester Counties. Local team, fast response.",
      url: `${BASE_URL}/service-areas`,
    },
  };
}

// Group locations by county, with the county hub page first
const countyOrder = [
  "Philadelphia County",
  "Montgomery County",
  "Bucks County",
  "Delaware County",
  "Chester County",
  "Camden County",
  "Burlington County",
];

const locationsByCounty = countyOrder
  .map((county) => {
    const all = locations.filter((l) => l.county === county);
    const hub = all.find((l) => l.type === "county");
    const cities = all.filter((l) => l.type !== "county");
    const state = all[0]?.state ?? "PA";
    return { county, hub, cities, state };
  })
  .filter((g) => g.hub || g.cities.length > 0);


const localBenefitIcons = [
  (
    <svg
      key="fast"
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  ),
  (
    <svg
      key="local"
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
      />
    </svg>
  ),
  (
    <svg
      key="community"
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  ),
];

const defaultLocalBenefits = [
  {
    title: "Fast Response Times",
    description:
      "We're nearby and can respond quickly to emergencies and scheduled work alike.",
  },
  {
    title: "Local Knowledge",
    description:
      "We understand Philadelphia's weather patterns, building codes, and common roofing challenges.",
  },
  {
    title: "Community Reputation",
    description:
      "We've built our business on referrals from satisfied neighbors. Our reputation matters to us.",
  },
];

// Map pin icon used for area cards
function MapPinIcon() {
  return (
    <svg
      className="w-6 h-6 text-brand-red flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

export default async function ServiceAreasPage() {
  const cmsData = await getStructuredContent("/service-areas", "structured_areas_index");

  const heroTitle = (cmsData?.heroTitle as string) || "Areas We Serve";
  const heroDescription =
    (cmsData?.heroDescription as string) ||
    "Professional roofing services across southeastern Pennsylvania. Wherever you are in the greater Philadelphia region, we've got you covered.";
  const mainHeading =
    (cmsData?.mainHeading as string) || "Trusted Roofing Services Across the Philadelphia Region";
  const mainDescription =
    (cmsData?.mainDescription as string) ||
    "From our home base in Philadelphia, we serve homeowners and businesses throughout the greater Philadelphia area — including communities across southeastern Pennsylvania. No matter where you are, you get the same quality workmanship and dedicated service.";
  const whyLocalHeading =
    (cmsData?.whyLocalHeading as string) || "Why Hiring a Local Roofer Matters";
  const cmsLocalBenefits = cmsData?.localBenefits as Array<{ title: string; description: string }> | undefined;
  const localBenefits = (cmsLocalBenefits && cmsLocalBenefits.length > 0 ? cmsLocalBenefits : defaultLocalBenefits).map(
    (b, i) => ({ ...b, icon: localBenefitIcons[i] || localBenefitIcons[0] })
  );
  const ctaHeadline = (cmsData?.ctaHeadline as string) || "Need a Roofer in Your Area?";

  const areasCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE_URL}/service-areas#collection`,
    url: `${BASE_URL}/service-areas`,
    name: "Service Areas — Adilay Roofing",
    description:
      "Cities, counties, and neighborhoods in southeastern Pennsylvania served by Adilay Roofing.",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: ORG_REF,
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: locations.length,
      itemListElement: locations.map((loc, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${BASE_URL}/service-areas/${loc.slug}`,
        name: `${loc.name}, ${loc.state}`,
      })),
    },
  };

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Service Areas", path: "/service-areas" }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areasCollectionSchema) }}
      />
      {/* Hero Section */}
      <section className="relative bg-brand-dark overflow-hidden">
        <img
          src="/images/adilay-van-jobsite.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[65%_65%]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative section-padding">
          <div className="container-narrow mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              {heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section>
        <div className="section-padding">
          <div className="container-narrow mx-auto">
            <div className="text-center mb-16">
              <h2 className="section-heading">
                {mainHeading}
              </h2>
              <p className="section-subheading mx-auto mt-4">
                {mainDescription}
              </p>
            </div>

            {/* Areas grouped by county */}
            {locationsByCounty.map((group) => (
              <div key={group.county} className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-10 h-1 bg-brand-red inline-block" />
                  {group.hub ? (
                    <Link
                      href={`/service-areas/${group.hub.slug}`}
                      className="text-2xl md:text-3xl font-bold text-brand-dark hover:text-brand-red transition-colors"
                    >
                      {group.county}, {group.state}
                    </Link>
                  ) : (
                    <h3 className="text-2xl md:text-3xl font-bold text-brand-dark">
                      {group.county}, {group.state}
                    </h3>
                  )}
                  {group.hub?.slug === "philadelphia" && (
                    <span className="text-xs font-semibold text-brand-red bg-brand-red/10 px-2 py-0.5 rounded-sm">
                      Our Home Base
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {group.cities.map((area) => (
                    <Link
                      key={area.slug}
                      href={`/service-areas/${area.slug}`}
                      className="group flex items-center gap-2 bg-white border border-brand-border rounded-sm px-4 py-3 hover:shadow-md hover:border-brand-red/30 transition-all"
                    >
                      <MapPinIcon />
                      <span className="text-sm font-medium text-brand-dark group-hover:text-brand-red transition-colors">
                        {area.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Why Local Matters Section */}
      <section className="bg-brand-light">
        <div className="section-padding">
          <div className="container-narrow mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-heading">
                {whyLocalHeading}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {localBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-red/10 text-brand-red mb-5">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-brand-gray text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection headline={ctaHeadline} />
    </>
  );
}
