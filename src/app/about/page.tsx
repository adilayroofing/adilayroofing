import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import TrustBar from "@/components/TrustBar";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${company.name} — over ${company.yearsExperience} years of trusted roofing services in Philadelphia, PA and surrounding areas. Licensed (${company.license}), quality craftsmanship, and reliable service.`,
};

export default function AboutPage() {
  const values = [
    {
      title: "Quality Craftsmanship",
      description:
        "Every project gets our full attention. We take pride in clean, professional work that lasts.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Honest Communication",
      description:
        "We tell you what your roof needs — not what makes us the most money. No pressure, no upsells.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      title: "Reliable Service",
      description:
        "We show up when we say we will, finish on time, and stand behind our work.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Community Focus",
      description:
        "We live and work in the same neighborhoods we serve. Your satisfaction is our reputation.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-dark">
        <div className="section-padding">
          <div className="container-narrow mx-auto text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              About Adilay Roofing
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              Serving the Philadelphia region with honest, high-quality roofing
              services for over {company.yearsExperience} years.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section>
        <div className="section-padding">
          <div className="container-narrow mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Text Column */}
              <div>
                <h2 className="section-heading">
                  Roofing Done Right &mdash; For Over 20 Years
                </h2>
                <p className="text-brand-gray text-base md:text-lg leading-relaxed mt-6">
                  Founded by {company.owner}, {company.legalName} has been a
                  trusted name in the Philadelphia roofing industry for over two
                  decades. What started as a small, dedicated crew has grown into
                  a full-service roofing and exterior company with {company.teamMembers}{" "}
                  professionals serving homeowners and businesses across
                  Pennsylvania.
                </p>
                <p className="text-brand-gray text-base md:text-lg leading-relaxed mt-4">
                  Our mission is simple: deliver the highest standard of roofing
                  services with integrity, quality craftsmanship, and genuine care
                  for every customer. We don&apos;t cut corners, and we don&apos;t
                  disappear after the job is done.
                </p>
                <p className="text-brand-gray text-base md:text-lg leading-relaxed mt-4">
                  With over {company.projectsCompleted} completed projects and a
                  growing list of satisfied customers, we&apos;ve built our
                  reputation on referrals, repeat business, and doing right by
                  every property we touch.
                </p>

                {/* License badge */}
                <div className="mt-8 flex items-center gap-3 bg-brand-light p-4 rounded-sm">
                  <svg className="w-6 h-6 text-brand-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <p className="font-bold text-brand-dark text-sm">Licensed Contractor</p>
                    <p className="text-brand-gray text-sm">PA License #{company.license}</p>
                  </div>
                </div>
              </div>

              {/* Image Column */}
              <div className="rounded-sm overflow-hidden shadow-lg">
                <img
                  src="/images/metal-roof-crew.jpg"
                  alt="Adilay Roofing crew working on a standing seam metal roof"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-brand-light">
        <div className="section-padding">
          <div className="container-narrow mx-auto">
            <div className="text-center mb-6 md:mb-12">
              <h2 className="section-heading">What We Stand For</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white p-4 md:p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow flex items-start gap-4 sm:flex-col">
                  <div className="flex-shrink-0 text-brand-red sm:mb-4">{value.icon}</div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-brand-dark mb-1 md:mb-2">{value.title}</h3>
                    <p className="text-brand-gray text-sm leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <TrustBar />

      {/* Team Overview */}
      <section>
        <div className="section-padding">
          <div className="container-narrow mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <h2 className="section-heading text-left">Our Team</h2>
                <p className="text-brand-gray text-base md:text-lg leading-relaxed mt-4">
                  Our crew of {company.teamMembers} experienced professionals brings
                  decades of combined roofing expertise to every project. Led by owner{" "}
                  {company.owner}, we treat every property like it&apos;s our own.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-8">
                  {[
                    { label: `${company.yearsExperience} Years`, sub: "Experience" },
                    { label: `${company.teamMembers}`, sub: "Professionals" },
                    { label: `${company.projectsCompleted}`, sub: "Projects" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-brand-light p-4 rounded-sm text-center">
                      <p className="text-2xl font-bold text-brand-red">{stat.label}</p>
                      <p className="text-brand-gray text-xs mt-1">{stat.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-sm overflow-hidden shadow-lg">
                <img
                  src="/images/adilay-truck.jpg"
                  alt="Adilay Roofing branded truck"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </>
  );
}
