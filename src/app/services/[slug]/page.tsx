import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/data/services";
import { locations } from "@/data/locations";
import { SERVICE_BODY_SECTIONS } from "@/data/serviceBodySections";
import ServiceCard from "@/components/ServiceCard";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import ServiceIcon from "@/components/ServiceIcon";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import SafeHTML from "@/components/SafeHTML";
import BBBSeal from "@/components/BBBSeal";
import VanBanner from "@/components/VanBanner";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import {
  AREA_SERVED,
  BASE_URL,
  ORG_REF,
  decodeEntities,
  stripHtml,
} from "@/lib/schema";

// Fully static — every service page is generated at build time from
// src/data/services.ts and src/data/serviceBodySections.ts. No runtime CMS.

// Pre-compute county groupings once for the "Service Areas" cross-link block.
// Built dynamically from locations data so every county is included.
const SERVICE_LOCATION_GROUPS = (() => {
  const allCounties = Array.from(new Set(locations.map((l) => l.county)));
  return allCounties
    .map((county) => {
      const all = locations.filter((l) => l.county === county);
      const hub = all.find((l) => l.type === "county");
      const children = all.filter((l) => l.type !== "county");
      return { county, hub, children };
    })
    .filter((g) => g.hub || g.children.length > 0)
    .sort((a, b) => {
      if (a.county === "Philadelphia County") return -1;
      if (b.county === "Philadelphia County") return 1;
      return a.county.localeCompare(b.county);
    });
})();

// ---------------------------------------------------------------------------
// Static params — pre-render all 7 service pages
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata per service
// ---------------------------------------------------------------------------
type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.title} Philadelphia PA | Free Estimates`,
    description: `Need ${service.title.toLowerCase()} in Philadelphia? Adilay Roofing offers professional ${service.title.toLowerCase()} services with 20+ years experience. Licensed PA184779, 5-star rated on Google. Free estimates — call (267) 255-3620.`,
    keywords: [
      `${service.title.toLowerCase()} Philadelphia`,
      `${service.title.toLowerCase()} Philadelphia PA`,
      `${service.title.toLowerCase()} near me`,
      `trusted ${service.title.toLowerCase()} Philadelphia`,
      `Philadelphia ${service.title.toLowerCase()} contractor`,
      `affordable ${service.title.toLowerCase()} Philadelphia`,
      "roofer Philadelphia",
      "roofing contractor Philadelphia",
    ],
    alternates: { canonical: `${BASE_URL}/services/${slug}` },
    openGraph: {
      title: `${service.title} — Adilay Roofing Philadelphia`,
      description: service.description,
      url: `${BASE_URL}/services/${slug}`,
      images: service.image ? [{ url: `${BASE_URL}${service.image}` }] : undefined,
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // All content sourced directly from src/data/services.ts and serviceBodySections.ts.
  const heroTitle = `${service.title} in Philadelphia, PA`;
  const heroTagline = service.tagline;
  const heroDescription = service.heroDescription;
  const features = service.features;
  const faq = service.faq;
  // bodySections: per-service inline first, else centralized SERVICE_BODY_SECTIONS
  // map (4-5 unique H3 sections per service to break the templated-content
  // fingerprint that was keeping these pages out of Google's index).
  const bodySections = service.bodySections?.length
    ? service.bodySections
    : SERVICE_BODY_SECTIONS[slug] ?? [];

  // Optional per-service project showcase — real recent job with
  // before/after photos. Rendered only when present.
  const projectShowcase = service.projectShowcase;

  const heroCTAText = "Get a FREE Estimate";
  const featuresHeading = "What's Included";
  const faqHeading = "Frequently Asked Questions";
  const relatedHeading = "Other Services We Offer";
  const relatedSubheading = "Explore more ways Adilay Roofing can protect and improve your property.";
  const financingHeadline = "Don\u2019t let cost hold you back.";
  const financingBody = "Financing is available through Service Finance Company \u2014 loans from $1,000 to $100,000, with no payments until your job is complete.";
  const ctaHeadline = `Ready for ${service.shortTitle} Services?`;
  const ctaSubtext = `Contact us today for a free estimate on ${service.title.toLowerCase()}. No pressure, no obligation — just honest advice from experienced professionals.`;

  // Build related services — prefer same category, then fill with others
  const sameCategory = services.filter(
    (s) => s.slug !== service.slug && s.category === service.category
  );
  const otherCategory = services.filter(
    (s) => s.slug !== service.slug && s.category !== service.category
  );
  const relatedServices = [...sameCategory, ...otherCategory].slice(0, 3);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/services/${slug}#service`,
    serviceType: service.title,
    name: `${service.title} in Philadelphia`,
    description: decodeEntities(service.description),
    provider: ORG_REF,
    areaServed: AREA_SERVED,
    url: `${BASE_URL}/services/${slug}`,
    image: service.image ? `${BASE_URL}${service.image}` : undefined,
  };

  const faqSchema =
    faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: stripHtml(item.question),
            acceptedAnswer: {
              "@type": "Answer",
              text: stripHtml(item.answer),
            },
          })),
        }
      : null;

  // ImageObject pair for the project showcase (when present). Provides
  // explicit geo + descriptive context that Google can associate with the
  // service — far more durable than EXIF metadata, which Google strips.
  const projectImageSchemas = projectShowcase
    ? [
        {
          "@context": "https://schema.org",
          "@type": "ImageObject",
          contentUrl: `${BASE_URL}${projectShowcase.beforeSrc}`,
          url: `${BASE_URL}${projectShowcase.beforeSrc}`,
          name: `Before — ${projectShowcase.heading}`,
          description: projectShowcase.beforeAlt,
          contentLocation: { "@type": "Place", name: projectShowcase.location },
          creator: ORG_REF,
        },
        {
          "@context": "https://schema.org",
          "@type": "ImageObject",
          contentUrl: `${BASE_URL}${projectShowcase.afterSrc}`,
          url: `${BASE_URL}${projectShowcase.afterSrc}`,
          name: `After — ${projectShowcase.heading}`,
          description: projectShowcase.afterAlt,
          contentLocation: { "@type": "Place", name: projectShowcase.location },
          creator: ORG_REF,
        },
      ]
    : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {projectImageSchemas.map((s, i) => (
        <script
          key={`project-image-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <BreadcrumbJsonLd
        items={[
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${slug}` },
        ]}
      />
      {/* ================================================================= */}
      {/* Hero Section                                                      */}
      {/* ================================================================= */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt={`Professional ${service.title.toLowerCase()} services in Philadelphia, PA by Adilay Roofing`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-darker/75" />
        </div>

        <div className="relative section-padding">
          <div className="container-narrow mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-white mb-4">
              <ServiceIcon slug={service.slug} className="w-8 h-8" />
            </div>
            <h1 className="text-[26px] md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
              {heroTitle}
            </h1>
            <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto mb-6 md:mb-8">
              {heroTagline}
            </p>
            <Link href="/contact" className="btn-primary">
              {heroCTAText}
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Main Content — heroDescription                                    */}
      {/* ================================================================= */}
      <section className="bg-white">
        <div className="section-padding">
          <div className="container-narrow mx-auto">
            <SafeHTML
              html={heroDescription}
              as="div"
              className="text-[15px] md:text-lg text-brand-gray leading-relaxed max-w-3xl mx-auto [&_a]:text-brand-red [&_a]:underline [&_a:hover]:text-red-700 [&_p]:mb-3 [&_p:last-child]:mb-0"
            />
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Van Banner — service-specific message                             */}
      {/* ================================================================= */}
      <div className="bg-white pb-6 md:pb-8">
        <div className="container-narrow mx-auto px-4">
          <VanBanner
            href="/contact"
            text={`Ask about our {highlight} for ${service.title.toLowerCase()} — local crew, written estimate, no pressure.`}
            highlight="free on-site inspection"
          />
        </div>
      </div>

      {/* ================================================================= */}
      {/* BBB Trust Badge                                                   */}
      {/* ================================================================= */}
      <div className="bg-white pb-4 md:pb-6">
        <div className="flex justify-center">
          <BBBSeal />
        </div>
      </div>

      {/* ================================================================= */}
      {/* Body Sections — deep content with H2s for keyword targeting       */}
      {/* ================================================================= */}
      {bodySections.length > 0 && (
        <section className="bg-white">
          <div className="section-padding pt-0">
            <div className="container-narrow mx-auto">
              <div className="max-w-3xl mx-auto space-y-10">
                {bodySections.map((section) => (
                  <article key={section.heading}>
                    <h2 className="text-xl md:text-3xl font-bold text-brand-dark mb-3 md:mb-4">
                      {section.heading}
                    </h2>
                    <SafeHTML
                      html={section.html}
                      as="div"
                      className="text-[15px] md:text-lg text-brand-gray leading-relaxed [&_a]:text-brand-red [&_a]:underline [&_a:hover]:text-red-700 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3 [&_li]:mb-1 [&_h3]:text-base md:text-xl [&_h3]:font-bold [&_h3]:text-brand-dark [&_h3]:mt-4 [&_h3]:mb-2 [&_strong]:text-brand-dark"
                    />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================================================================= */}
      {/* Project Showcase (optional, per-service)                          */}
      {/* Real recent job with before/after photos + scope. Hyperlocal      */}
      {/* entity-rich content that no AI template can fabricate — the      */}
      {/* anti-template-fingerprint move from master plan §2.              */}
      {/* ================================================================= */}
      {projectShowcase && (
        <section className="bg-white">
          <div className="section-padding pt-0">
            <div className="container-narrow mx-auto">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-xl md:text-3xl font-bold text-brand-dark mb-3 md:mb-4">
                  {projectShowcase.heading}
                </h2>
                <p className="text-[15px] md:text-lg text-brand-gray mb-5 md:mb-6">
                  {projectShowcase.locationSlug ? (
                    <>
                      Completed in{" "}
                      <Link
                        href={`/service-areas/${projectShowcase.locationSlug}`}
                        className="text-brand-red underline hover:text-red-700"
                      >
                        {projectShowcase.location}
                      </Link>
                      .
                    </>
                  ) : (
                    <>Completed in {projectShowcase.location}.</>
                  )}{" "}
                  Drag the slider to see the before and after.
                </p>

                <BeforeAfterSlider
                  beforeSrc={projectShowcase.beforeSrc}
                  beforeAlt={projectShowcase.beforeAlt}
                  afterSrc={projectShowcase.afterSrc}
                  afterAlt={projectShowcase.afterAlt}
                  aspectClass={projectShowcase.aspectClass ?? "aspect-[4/5]"}
                  className="mb-6 md:mb-8"
                />

                <h3 className="text-lg md:text-2xl font-bold text-brand-dark mb-3">
                  {projectShowcase.scopeHeading}
                </h3>
                <SafeHTML
                  html={projectShowcase.scopeHtml}
                  as="div"
                  className="text-[15px] md:text-lg text-brand-gray leading-relaxed [&_a]:text-brand-red [&_a]:underline [&_a:hover]:text-red-700 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3 [&_li]:mb-1 [&_strong]:text-brand-dark"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================================================================= */}
      {/* Features Section — "What's Included"                              */}
      {/* (Benefits block removed 2026-05-23 — duplicated Features content  */}
      {/*  near-identically across all 22 service pages, contributing to    */}
      {/*  the template-fingerprint that was keeping services unindexed.)   */}
      {/* ================================================================= */}
      <section className="bg-white">
        <div className="section-padding">
          <div className="container-narrow mx-auto">
            <h2 className="section-heading text-center mb-10">
              {featuresHeading}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-start gap-2 sm:gap-3 p-3 sm:p-5 bg-brand-light rounded-sm border border-brand-border"
                >
                  {/* Numbered icon */}
                  <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-brand-red text-white font-bold text-xs sm:text-sm rounded-full">
                    {index + 1}
                  </span>
                  <span className="text-brand-dark text-sm leading-snug sm:leading-relaxed font-medium pt-0.5 sm:pt-1">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Service FAQ                                                       */}
      {/* ================================================================= */}
      {faq.length > 0 && (
        <section className="bg-brand-light">
          <div className="section-padding">
            <div className="container-narrow mx-auto max-w-3xl">
              <h2 className="section-heading text-center mb-10">
                {faqHeading}
              </h2>
              <FAQ items={faq} />
            </div>
          </div>
        </section>
      )}

      {/* ================================================================= */}
      {/* Related Services                                                  */}
      {/* ================================================================= */}
      <section className="bg-white">
        <div className="section-padding">
          <div className="container-wide mx-auto">
            <div className="text-center mb-10">
              <h2 className="section-heading">{relatedHeading}</h2>
              <p className="section-subheading mx-auto">
                {relatedSubheading}
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
              {relatedServices.map((related) => (
                <ServiceCard key={related.slug} service={related} />
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-brand-red font-semibold hover:gap-3 transition-all duration-200"
              >
                View All Services
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Service Areas — every area linked from every service detail page  */}
      {/* so each location page collects ~28 inlinks (one per service).     */}
      {/* ================================================================= */}
      <section className="bg-brand-light">
        <div className="section-padding">
          <div className="container-wide mx-auto">
            <div className="text-center mb-10">
              <h2 className="section-heading">
                {service.title} — Service Areas We Cover
              </h2>
              <p className="section-subheading mx-auto mt-3">
                We provide {service.title.toLowerCase()} throughout Philadelphia
                and the surrounding Delaware Valley. Click your area for
                details specific to your neighborhood.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-7">
              {SERVICE_LOCATION_GROUPS.map((group) => (
                <div key={group.county}>
                  {group.hub ? (
                    <Link
                      href={`/service-areas/${group.hub.slug}`}
                      className="block text-xs font-bold text-brand-red uppercase tracking-wider mb-2.5 hover:text-brand-red-dark transition-colors"
                    >
                      {group.county.replace(" County", "")}
                    </Link>
                  ) : (
                    <p className="text-xs font-bold text-brand-red uppercase tracking-wider mb-2.5">
                      {group.county.replace(" County", "")}
                    </p>
                  )}
                  <ul className="space-y-1.5">
                    {group.children.map((loc) => (
                      <li key={loc.slug}>
                        <Link
                          href={`/service-areas/${loc.slug}`}
                          className="text-sm text-brand-dark hover:text-brand-red active:text-brand-red transition-colors"
                        >
                          {loc.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/service-areas"
                className="inline-flex items-center gap-2 text-brand-red font-semibold hover:gap-3 transition-all duration-200"
              >
                View All Service Areas
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Financing Callout                                                 */}
      {/* ================================================================= */}
      <section className="bg-white">
        <div className="container-narrow mx-auto px-4">
          <div className="border-l-4 border-brand-red bg-brand-light rounded-sm p-5 md:p-6 max-w-3xl mx-auto">
            <p className="text-brand-dark font-bold text-lg mb-2">
              {financingHeadline}
            </p>
            <p className="text-brand-gray leading-relaxed mb-3">
              {financingBody}
            </p>
            <Link
              href="/financing"
              className="inline-flex items-center gap-1 text-brand-red font-bold hover:underline"
            >
              See Financing Options &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* CTA                                                               */}
      {/* ================================================================= */}
      <CTASection
        headline={ctaHeadline}
        subtext={ctaSubtext}
      />
    </>
  );
}
