import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/data/services";
import ServiceCard from "@/components/ServiceCard";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import ServiceIcon from "@/components/ServiceIcon";

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
    title: service.title,
    description: service.description,
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

  // Build related services — exclude the current one, take up to 3
  const relatedServices = services
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      {/* ================================================================= */}
      {/* Hero Section                                                      */}
      {/* ================================================================= */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-darker/75" />
        </div>

        <div className="relative section-padding">
          <div className="container-narrow mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-white mb-4">
              <ServiceIcon slug={service.slug} className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8">
              {service.tagline}
            </p>
            <Link href="/contact" className="btn-primary">
              Get a FREE Estimate
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
            <p className="text-lg md:text-xl text-brand-gray leading-relaxed max-w-3xl mx-auto text-center">
              {service.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Benefits Section                                                  */}
      {/* ================================================================= */}
      <section className="bg-brand-light">
        <div className="section-padding">
          <div className="container-narrow mx-auto">
            <h2 className="section-heading text-center mb-10">Benefits</h2>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {service.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 bg-white rounded-sm p-5 border border-brand-border"
                >
                  {/* Checkmark icon */}
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
                  <span className="text-brand-dark font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Features Section — "What's Included"                              */}
      {/* ================================================================= */}
      <section className="bg-white">
        <div className="section-padding">
          <div className="container-narrow mx-auto">
            <h2 className="section-heading text-center mb-10">
              What&apos;s Included
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {service.features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 p-5 bg-brand-light rounded-sm border border-brand-border"
                >
                  {/* Numbered icon */}
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-brand-red text-white font-bold text-sm rounded-full">
                    {index + 1}
                  </span>
                  <span className="text-brand-dark text-sm leading-relaxed font-medium pt-1">
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
      {service.faq.length > 0 && (
        <section className="bg-brand-light">
          <div className="section-padding">
            <div className="container-narrow mx-auto max-w-3xl">
              <h2 className="section-heading text-center mb-10">
                Frequently Asked Questions
              </h2>
              <FAQ items={service.faq} />
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
              <h2 className="section-heading">Other Services We Offer</h2>
              <p className="section-subheading mx-auto">
                Explore more ways Adilay Roofing can protect and improve your
                property.
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
      {/* CTA                                                               */}
      {/* ================================================================= */}
      <CTASection
        headline={`Ready for ${service.shortTitle} Services?`}
        subtext={`Contact us today for a free estimate on ${service.title.toLowerCase()}. No pressure, no obligation — just honest advice from experienced professionals.`}
      />
    </>
  );
}
