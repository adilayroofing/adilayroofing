import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { company } from "@/data/company";
import { serviceCategories, getServicesByCategory } from "@/data/services";
import { getAllLocations, getLocationBySlug, getNearbyLocations, type Location } from "@/data/locations";
import FAQ from "@/components/FAQ";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { galleryProjects } from "@/data/gallery";
import CTASection from "@/components/CTASection";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import SafeHTML from "@/components/SafeHTML";
import VanBanner from "@/components/VanBanner";
import LocationMap from "@/components/LocationMap";
import HavertownProjectShowcase from "@/components/HavertownProjectShowcase";
import { havertownSchemaImages, havertownOgImage } from "@/data/havertownProject";
import { BASE_URL, ORG_REF, stripHtml } from "@/lib/schema";

// Fully static — every location page is generated at build time from
// src/data/locations.ts. No runtime CMS lookup, no revalidation needed.

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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return { title: "Location Not Found" };
  }

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
      // Havertown gets the completed-project collage as its social image.
      ...(slug === "havertown" ? { images: [havertownOgImage] } : {}),
    },
  };
}

// ---------------------------------------------------------------------------
// Checkmark icon used in service cards
// ---------------------------------------------------------------------------
function CheckIcon({ small = false }: { small?: boolean } = {}) {
  return (
    <svg
      className={`${small ? "w-4 h-4 mt-0" : "w-5 h-5 mt-0.5"} text-brand-red flex-shrink-0`}
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

  // All content sourced directly from src/data/locations.ts (single source of truth).
  const heroTitle = location.h1;
  const heroSubtitle = `Professional roofing services for ${location.name}, ${location.state} and surrounding areas. Licensed, insured, and trusted by local homeowners.`;
  const intro = location.intro;
  const localContext = location.localContext;
  const neighborhoods = location.neighborhoods;
  const zipCodes = location.zipCodes;
  const locationFaq = location.faq;
  const bodySections = location.bodySections ?? [];
  // Before/after sliders for gallery projects tagged with this area's slug —
  // any location that gets a locationSlug'd gallery entry shows it automatically.
  const localProjects = galleryProjects.filter((p) => p.locationSlug === slug);

  const heroCTAText = "Get FREE Estimate";
  const servicesHeading = `Our Services in ${location.name}`;
  const servicesSubtext = `Roofing, siding, gutters, and windows for ${location.name} homeowners and businesses.`;
  const localContextHeading = `Why ${location.name} Homeowners Choose Adilay Roofing`;
  const whyChooseItems = [
    `${company.yearsExperience} years of roofing experience`,
    `${company.projectsCompleted} projects completed`,
    "Licensed in Pennsylvania (PA184779)",
    "Fully insured with workers' comp",
    "Free on-site estimates \u2014 no pressure",
    "Emergency service available 24/7",
  ];
  const neighborhoodsHeading = `${location.type === "county" ? "Communities" : "Neighborhoods"} We Serve in ${location.name}`;
  const neighborhoodsSubtext = `${location.type === "county" ? "Communities" : "Neighborhoods"} we cover across ${location.name}.`;
  const faqHeading = `Frequently Asked Questions About Roofing in ${location.name}`;
  const ctaHeadline = `Need a Roofer in ${location.name}?`;
  const ctaSubtext = `Contact Adilay Roofing today for a free roof inspection and estimate in ${location.name}, ${location.state}. No pressure, no obligation \u2014 just honest advice from experienced professionals.`;

  // Per-location Service schema — narrows areaServed to just this location
  // and references the canonical RoofingContractor by @id (emitted sitewide
  // via <JsonLd /> in app/layout.tsx).
  const locationAreaServed =
    location.type === "county"
      ? {
          "@type": "AdministrativeArea",
          name: `${location.name}${location.county === location.name ? "" : `, ${location.state}`}`,
        }
      : {
          "@type": "City",
          name: `${location.name}, ${location.state}`,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: location.county,
          },
        };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/service-areas/${slug}#service`,
    serviceType: "Roofing Contractor",
    name: `Roofing Services in ${location.name}, ${location.state}`,
    description: stripHtml(location.intro).slice(0, 300),
    provider: ORG_REF,
    areaServed: locationAreaServed,
    url: `${BASE_URL}/service-areas/${slug}`,
    // Havertown: photos of the completed July 2026 full roof replacement
    // (city-level location only — no street address in copy or schema).
    ...(slug === "havertown" ? { image: havertownSchemaImages } : {}),
  };

  // JSON-LD FAQPage schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: locationFaq.map((item) => ({
      "@type": "Question",
      name: stripHtml(item.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(item.answer),
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
          __html: JSON.stringify(serviceSchema),
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

            <h1 className="text-[26px] md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
              {heroTitle}
            </h1>
            <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto mb-6 md:mb-8">
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
                className="text-[15px] md:text-lg text-brand-gray leading-relaxed [&_a]:text-brand-red [&_a]:underline [&_a:hover]:text-red-700 [&_p]:mb-2 [&_p:last-child]:mb-0"
              />
              <div className="mt-6 md:mt-8">
                <VanBanner
                  href="/contact"
                  text={`Local crew already working in ${location.name} — get a {highlight} on your roof this week.`}
                  highlight="free on-site quote"
                />
              </div>
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
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 sm:gap-3">
                      {catServices.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="group bg-white border border-brand-border rounded-sm p-2 sm:p-4 hover:shadow-md hover:border-brand-red/30 transition-all"
                        >
                          <div className="flex items-start gap-1.5 sm:gap-3">
                            <CheckIcon small />
                            <div>
                              <h4 className="text-[13px] sm:text-base font-bold text-brand-dark group-hover:text-brand-red transition-colors leading-tight">
                                {service.title}
                              </h4>
                              <p className="hidden sm:block text-sm text-brand-gray mt-1 leading-relaxed line-clamp-2">
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
      {/* Local Map — interactive Google Maps embed                         */}
      {/* ================================================================= */}
      <LocationMap
        name={location.name}
        state={location.state}
        county={location.county}
        isCounty={location.type === "county"}
        neighborhoods={neighborhoods}
        mapUrl={company.mapUrl}
      />

      {/* ================================================================= */}
      {/* Havertown project showcase — scroll-reveal before/after story     */}
      {/* ================================================================= */}
      {slug === "havertown" && <HavertownProjectShowcase variant="full" />}

      {/* ================================================================= */}
      {/* Local Projects — before/after sliders for jobs done in this area  */}
      {/* ================================================================= */}
      {localProjects.length > 0 && (
        <section className="bg-brand-light">
          <div className="section-padding">
            <div className="container-narrow mx-auto">
              <div className="text-center mb-10">
                <h2 className="section-heading">Recent Work in {location.name}</h2>
                <p className="text-brand-gray mt-4 max-w-2xl mx-auto">
                  Drag the slider to see a real Adilay Roofing project in{" "}
                  {location.name} — before and after.
                </p>
              </div>
              <div className="max-w-xl mx-auto space-y-12">
                {localProjects.map((project) => (
                  <div key={project.id}>
                    <BeforeAfterSlider
                      beforeSrc={project.beforeImage}
                      beforeAlt={project.beforeAlt}
                      afterSrc={project.afterImage}
                      afterAlt={project.afterAlt}
                      aspectClass={project.aspectClass}
                      objectPosition={project.objectPosition}
                    />
                    <div className="mt-5 text-center">
                      <h3 className="text-lg font-bold text-brand-dark">
                        {project.title}
                      </h3>
                      <p className="text-sm text-brand-gray mt-2 max-w-lg mx-auto">
                        {project.description}
                      </p>
                      {project.serviceSlug && (
                        <Link
                          href={`/services/${project.serviceSlug}`}
                          className="inline-block mt-3 text-brand-red font-semibold text-sm hover:underline"
                        >
                          Learn about this service &rarr;
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================================================================= */}
      {/* Body Sections — deep local content with H2s                       */}
      {/* ================================================================= */}
      {bodySections.length > 0 && (
        <section className="bg-white">
          <div className="section-padding pt-0">
            <div className="container-narrow mx-auto">
              <div className="max-w-3xl mx-auto space-y-3 md:space-y-4">
                {bodySections.map((section, i) => (
                  <details
                    key={section.heading}
                    open={i === 0}
                    className="group border border-brand-border rounded-sm bg-white open:shadow-sm transition-shadow"
                  >
                    <summary className="list-none cursor-pointer flex items-center justify-between gap-3 px-4 md:px-6 py-4 md:py-5 [&::-webkit-details-marker]:hidden">
                      <h2 className="text-base md:text-xl font-bold text-brand-dark leading-snug">
                        {section.heading}
                      </h2>
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6 text-brand-red flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-4 md:px-6 pb-5 md:pb-6 -mt-1">
                      <SafeHTML
                        html={section.html}
                        as="div"
                        className="text-[15px] md:text-lg text-brand-gray leading-relaxed [&_a]:text-brand-red [&_a]:underline [&_a:hover]:text-red-700 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3 [&_li]:mb-1 [&_h3]:text-base md:text-xl [&_h3]:font-bold [&_h3]:text-brand-dark [&_h3]:mt-4 [&_h3]:mb-2 [&_strong]:text-brand-dark [&_img]:rounded-sm [&_img]:my-4 [&_img]:w-full [&_img]:max-w-md [&_img]:mx-auto"
                      />
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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
      {/* Nearby Areas We Serve — sibling cross-linking for crawl/SEO        */}
      {/* ================================================================= */}
      {(() => {
        const nearby = getNearbyLocations(slug, 6);
        if (nearby.length === 0) return null;
        return (
          <section className="bg-brand-light">
            <div className="section-padding">
              <div className="container-narrow mx-auto">
                <h2 className="section-heading text-center mb-3">
                  Nearby Areas We Serve
                </h2>
                <p className="text-brand-gray text-center mb-10 max-w-2xl mx-auto">
                  Adilay Roofing also serves homeowners in these neighboring
                  communities. Same crew, same Pennsylvania licensing,
                  same straightforward pricing.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {nearby.map((area) => (
                    <Link
                      key={area.slug}
                      href={`/service-areas/${area.slug}`}
                      className="group flex items-center justify-center bg-white border border-brand-border rounded-sm px-4 py-3 hover:shadow-md hover:border-brand-red/40 transition-all"
                    >
                      <span className="text-sm font-medium text-brand-dark group-hover:text-brand-red transition-colors text-center">
                        {area.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })()}

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
