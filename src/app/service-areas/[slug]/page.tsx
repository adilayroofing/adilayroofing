import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { getAllLocations, getLocationBySlug } from "@/data/locations";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";

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
      `best roofer ${location.name} ${location.state}`,
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
    mainEntity: location.faq.map((item) => ({
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
              {location.h1}
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8">
              Professional roofing services for {location.name},{" "}
              {location.state} and surrounding areas. Licensed, insured,
              and backed by {company.yearsExperience} years of experience.
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
                Get FREE Estimate
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
              <p className="text-lg text-brand-gray leading-relaxed">
                {location.intro}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Services Section                                                  */}
      {/* ================================================================= */}
      <section className="bg-brand-light">
        <div className="section-padding">
          <div className="container-narrow mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-heading">
                Our Roofing Services in {location.name}
              </h2>
              <p className="text-brand-gray mt-4 max-w-2xl mx-auto">
                We offer a complete range of roofing and exterior services to
                homeowners and businesses in {location.name},{" "}
                {location.state}. Every project is backed by our{" "}
                {company.yearsExperience} years of experience and our
                commitment to quality workmanship.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group bg-white border border-brand-border rounded-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <CheckIcon />
                    <div>
                      <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-red transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-brand-gray mt-2 leading-relaxed">
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
                    Why {location.name} Homeowners Choose Adilay Roofing
                  </h2>
                  <p className="text-brand-gray leading-relaxed">
                    {location.localContext}
                  </p>
                </div>
                <div className="md:col-span-5">
                  <div className="bg-brand-light border border-brand-border rounded-sm p-6">
                    <h3 className="text-lg font-bold text-brand-dark mb-4">
                      Why Choose Us
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-sm text-brand-dark font-medium">
                          {company.yearsExperience} years of roofing experience
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-sm text-brand-dark font-medium">
                          {company.projectsCompleted} projects completed
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-sm text-brand-dark font-medium">
                          Licensed in Pennsylvania (PA184779)
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-sm text-brand-dark font-medium">
                          Fully insured with workers&apos; comp
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-sm text-brand-dark font-medium">
                          Free on-site estimates &mdash; no pressure
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-sm text-brand-dark font-medium">
                          Emergency service available 24/7
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Neighborhoods / Areas Served                                      */}
      {/* ================================================================= */}
      {location.neighborhoods.length > 0 && (
        <section className="bg-brand-light">
          <div className="section-padding">
            <div className="container-narrow mx-auto">
              <div className="text-center mb-10">
                <h2 className="section-heading">
                  {location.type === "county"
                    ? `Communities We Serve in ${location.name}`
                    : `Neighborhoods We Serve in ${location.name}`}
                </h2>
                <p className="text-brand-gray mt-4 max-w-2xl mx-auto">
                  Our roofing services are available throughout{" "}
                  {location.name} and the surrounding{" "}
                  {location.type === "neighborhood"
                    ? "neighborhoods"
                    : "communities"}
                  . No matter where you are in the area, we provide the same
                  quality workmanship and reliable service.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {location.neighborhoods.map((neighborhood) => (
                  <div
                    key={neighborhood}
                    className="flex items-center gap-2 bg-white border border-brand-border rounded-sm px-4 py-3"
                  >
                    <MapPinIcon className="w-4 h-4 text-brand-red flex-shrink-0" />
                    <span className="text-sm font-medium text-brand-dark">
                      {neighborhood}
                    </span>
                  </div>
                ))}
              </div>

              {/* Zip codes */}
              {location.zipCodes.length > 0 && (
                <div className="mt-8 text-center">
                  <p className="text-sm text-brand-gray">
                    <span className="font-semibold text-brand-dark">
                      Zip codes served:{" "}
                    </span>
                    {location.zipCodes.join(", ")}
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
      {location.faq.length > 0 && (
        <section className="bg-white">
          <div className="section-padding">
            <div className="container-narrow mx-auto max-w-3xl">
              <h2 className="section-heading text-center mb-10">
                Frequently Asked Questions About Roofing in {location.name}
              </h2>
              <FAQ items={location.faq} />
            </div>
          </div>
        </section>
      )}

      {/* ================================================================= */}
      {/* CTA Section                                                       */}
      {/* ================================================================= */}
      <CTASection
        headline={`Need a Roofer in ${location.name}?`}
        subtext={`Contact Adilay Roofing today for a free roof inspection and estimate in ${location.name}, ${location.state}. No pressure, no obligation — just honest advice from experienced professionals.`}
      />
    </>
  );
}
