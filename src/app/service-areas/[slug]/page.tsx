import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { company } from "@/data/company";
import { serviceCategories, getServicesByCategory } from "@/data/services";
import { getAllLocations, getLocationBySlug, type Location } from "@/data/locations";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getPageSEO, buildMetadataFromSEO, getStructuredContent } from "@/lib/seo";
import SafeHTML from "@/components/SafeHTML";

export const revalidate = 60;

// ---------------------------------------------------------------------------
// Static params — pre-render all location pages
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return getAllLocations().map((location) => ({ slug: location.slug }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata per location
// ---------------------------------------------------------------------------
type PageProps = { params: Promise<{ slug: string }> };

const BASE_URL = "https://www.adilayroofing.com";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return { title: "Location Not Found" };
  }

  // Check Supabase for CMS-managed SEO data first
  const dbSeo = await getPageSEO(`/service-areas/${slug}`);
  if (dbSeo) {
    return {
      ...buildMetadataFromSEO(dbSeo),
      keywords: [
        `roofer ${location.name}`,
        `roofing contractor ${location.name}`,
        `roof replacement ${location.name}`,
        `roof repair ${location.name}`,
        `${location.name} roofer`,
        `${location.name} roofing`,
        `trusted roofer ${location.name} ${location.state}`,
        `roofer near me ${location.name}`,
      ],
    };
  }

  // Fallback to hardcoded metadata
  return {
    title: location.metaTitle,
    description: location.metaDescription,
    keywords: [
      `roofer ${location.name}`,
      `roofing contractor ${location.name}`,
      `roof replacement ${location.name}`,
      `roof repair ${location.name}`,
      `${location.name} roofer`,
      `${location.name} roofing`,
      `trusted roofer ${location.name} ${location.state}`,
      `roofer near me ${location.name}`,
    ],
    alternates: { canonical: `${BASE_URL}/service-areas/${slug}` },
    openGraph: {
      title: `${location.h1} | ${company.name}`,
      description: location.metaDescription,
      url: `${BASE_URL}/service-areas/${slug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Checkmark icon used in service cards
// ---------------------------------------------------------------------------
function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Map pin icon
// ---------------------------------------------------------------------------
function MapPinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
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

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  // All locations for linking in "Communities We Serve"
  const allLocations = getAllLocations();

  // Fetch CMS structured content (falls back to hardcoded if none)
  const cmsData = await getStructuredContent(`/service-areas/${slug}`, "structured_location");

  // Merge: CMS data overrides hardcoded, with fallback
  const heroTitle = (cmsData?.heroTitle as string) || location.h1;
  const heroSubtitle = (cmsData?.heroSubtitle as string) ||
    `Professional roofing services for ${location.name}, ${location.state} and surrounding areas. Licensed, insured, and trusted by local homeowners.`;
  const intro = (cmsData?.intro as string) || location.intro;
  const localContext = (cmsData?.localContext as string) || location.localContext;
  const cmsNeighborhoods = cmsData?.neighborhoods as string[] | undefined;
  const neighborhoods = cmsNeighborhoods?.length ? cmsNeighborhoods : location.neighborhoods;
  const cmsZipCodes = cmsData?.zipCodes as string[] | undefined;
  const zipCodes = cmsZipCodes?.length ? cmsZipCodes : location.zipCodes;
  const cmsFaq = cmsData?.faq as { question: string; answer: string }[] | undefined;
  const locationFaq = cmsFaq?.length ? cmsFaq : location.faq;

  // Additional CMS fields with fallbacks
  const heroCTAText = (cmsData?.heroCTAText as string) || "Get FREE Estimate";
  const servicesHeading = (cmsData?.servicesHeading as string) || `Our Services in ${location.name}`;
  const servicesSubtext = (cmsData?.servicesSubtext as string) ||
    `We offer a complete range of roofing and exterior services to homeowners and businesses in ${location.name}, ${location.state}. Every project is backed by our ${company.yearsExperience} years of experience and our commitment to quality workmanship.`;
  const localContextHeading = (cmsData?.localContextHeading as string) ||
    `Why ${location.name} Homeowners Choose Adilay Roofing`;
  const cmsWhyChooseItems = cmsData?.whyChooseItems as string[] | undefined;
  const whyChooseItems = cmsWhyChooseItems?.length ? cmsWhyChooseItems : [
    `${company.yearsExperience} years of roofing experience`,
    `${company.projectsCompleted} projects completed`,
    "Licensed in Pennsylvania (PA184779)",
    "Fully insured with workers' comp",
    "Free on-site estimates \u2014 no pressure",
    "Emergency service available 24/7",
  ];
  const neighborhoodsHeading = (cmsData?.neighborhoodsHeading as string) ||
    `${location.type === "county" ? "Communities" : "Neighborhoods"} We Serve in ${location.name}`;
  const neighborhoodsSubtext = (cmsData?.neighborhoodsSubtext as string) ||
    `Our roofing services are available throughout ${location.name} and the surrounding ${location.type === "county" ? "communities" : "neighborhoods"}. No matter where you are in the area, we provide the same quality workmanship and reliable service.`;
  const faqHeading = (cmsData?.faqHeading as string) ||
    `Frequently Asked Questions About Roofing in ${location.name}`;
  const ctaHeadline = (cmsData?.ctaHeadline as string) || `Need a Roofer in ${location.name}?`;
  const ctaSubtext = (cmsData?.ctaSubtext as string) ||
    `Contact Adilay Roofing today for a free roof inspection and estimate in ${location.name}, ${location.state}. No pressure, no obligation \u2014 just honest advice from experienced professionals.`;

  // JSON-LD LocalBusiness schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    name: company.name,
    description: `Professional roofing services in ${location.name}, ${location.state}. ${company.description}`,
    url: `${BASE_URL}/service-areas/${slug}`,
    telephone: company.phoneRaw,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      postalCode: company.address.zip,
      addressCountry: "US",
    },
    areaServed: {
      "@type":
        location.type === "county" ? "AdministrativeArea" : "City",
      name: `${location.name}, ${location.state}`,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "39.9784",
      longitude: "-75.1348",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs: [company.social.facebook, company.social.instagram],
    priceRange: "$$",
  };

  // JSON-LD BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Service Areas",
        item: `${BASE_URL}/service-areas`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: location.name,
        item: `${BASE_URL}/service-areas/${slug}`,
      },
    ],
  };

  // JSON-LD FAQPage schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: locationFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Service Areas", path: "/service-areas" },
          { name: location.name, path: `/service-areas/${slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* ================================================================= */}
      {/* Hero Section                                                      */}
      {/* ================================================================= */}
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
            {/* Breadcrumbs */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center justify-center gap-2 text-sm text-white/50 mb-6"
            >
              <Link
                href="/"
                className="hover:text-white transition-colors"
              >
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                href="/service-areas"
                className="hover:text-white transition-colors"
              >
                Service Areas
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-white/80">{location.name}</span>
            </nav>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8">
              {heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${company.phoneRaw}`}
                className="btn-primary w-full sm:w-auto"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call {company.phone}
              </a>
              <Link
                href="/contact"
                className="btn-outline-white w-full sm:w-auto"
              >
                {heroCTAText}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Intro Section                                                     */}
      {/* ================================================================= */}
      <section className="bg-white">
        <div className="section-padding">
          <div className="container-narrow mx-auto">
            <div className="max-w-3xl mx-auto">
              <SafeHTML
                html={intro}
                as="div"
                className="text-lg text-brand-gray leading-relaxed [&_a]:text-brand-red [&_a]:underline [&_a:hover]:text-red-700 [&_p]:mb-2 [&_p:last-child]:mb-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Services Section — grouped by category                            */}
      {/* ================================================================= */}
      <section className="bg-brand-light">
        <div className="section-padding">
          <div className="container-narrow mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-heading">
                {servicesHeading}
              </h2>
              <p className="text-brand-gray mt-4 max-w-2xl mx-auto">
                {servicesSubtext}
              </p>
            </div>

            <div className="space-y-10">
              {serviceCategories.map((cat) => {
                const catServices = getServicesByCategory(cat.id);
                if (catServices.length === 0) return null;
                return (
                  <div key={cat.id}>
                    <h3 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2">
                      <span className="w-6 h-0.5 bg-brand-red inline-block" />
                      {cat.label}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {catServices.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="group bg-white border border-brand-border rounded-sm p-5 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start gap-3">
                            <CheckIcon />
                            <div>
                              <h4 className="text-base font-bold text-brand-dark group-hover:text-brand-red transition-colors">
                                {service.title}
                              </h4>
                              <p className="text-sm text-brand-gray mt-1 leading-relaxed line-clamp-2">
                                {service.description.replace(
                                  /in Philadelphia/gi,
                                  `in ${location.name}`
                                )}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Local Context Section                                             */}
      {/* ================================================================= */}
      <section className="bg-white">
        <div className="section-padding">
          <div className="container-narrow mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-7">
                  <h2 className="section-heading mb-6">
                    {localContextHeading}
                  </h2>
                  <SafeHTML
                    html={localContext}
                    as="div"
                    className="text-brand-gray leading-relaxed [&_a]:text-brand-red [&_a]:underline [&_a:hover]:text-red-700 [&_p]:mb-2 [&_p:last-child]:mb-0"
                  />
                </div>
                <div className="md:col-span-5">
                  <div className="bg-brand-light border border-brand-border rounded-sm p-6">
                    <h3 className="text-lg font-bold text-brand-dark mb-4">
                      Why Choose Us
                    </h3>
                    <ul className="space-y-3">
                      {whyChooseItems.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckIcon />
                          <span className="text-sm text-brand-dark font-medium">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Neighborhoods / Areas Served — with links to pages                */}
      {/* ================================================================= */}
      {neighborhoods.length > 0 && (
        <section className="bg-brand-light">
          <div className="section-padding">
            <div className="container-narrow mx-auto">
              <div className="text-center mb-10">
                <h2 className="section-heading">
                  {neighborhoodsHeading}
                </h2>
                <p className="text-brand-gray mt-4 max-w-2xl mx-auto">
                  {neighborhoodsSubtext}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {neighborhoods.map((neighborhood) => {
                  const matchedLocation = allLocations.find(
                    (l) =>
                      l.name.toLowerCase() === neighborhood.toLowerCase() &&
                      l.slug !== slug
                  );
                  if (matchedLocation) {
                    return (
                      <Link
                        key={neighborhood}
                        href={`/service-areas/${matchedLocation.slug}`}
                        className="group flex items-center gap-2 bg-white border border-brand-border rounded-sm px-4 py-3 hover:shadow-md hover:border-brand-red/30 transition-all"
                      >
                        <MapPinIcon className="w-4 h-4 text-brand-red flex-shrink-0" />
                        <span className="text-sm font-medium text-brand-dark group-hover:text-brand-red transition-colors">
                          {neighborhood}
                        </span>
                      </Link>
                    );
                  }
                  return (
                    <div
                      key={neighborhood}
                      className="flex items-center gap-2 bg-white border border-brand-border rounded-sm px-4 py-3"
                    >
                      <MapPinIcon className="w-4 h-4 text-brand-red flex-shrink-0" />
                      <span className="text-sm font-medium text-brand-dark">
                        {neighborhood}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Zip codes */}
              {zipCodes.length > 0 && (
                <div className="mt-8 text-center">
                  <p className="text-sm text-brand-gray">
                    <span className="font-semibold text-brand-dark">
                      Zip codes served:{" "}
                    </span>
                    {zipCodes.join(", ")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================= */}
      {/* FAQ Section                                                       */}
      {/* ================================================================= */}
      {locationFaq.length > 0 && (
        <section className="bg-white">
          <div className="section-padding">
            <div className="container-narrow mx-auto max-w-3xl">
              <h2 className="section-heading text-center mb-10">
                {faqHeading}
              </h2>
              <FAQ items={locationFaq} />
            </div>
          </div>
        </section>
      )}

      {/* ================================================================= */}
      {/* CTA Section                                                       */}
      {/* ================================================================= */}
      <CTASection
        headline={ctaHeadline}
        subtext={ctaSubtext}
      />
    </>
  );
}
