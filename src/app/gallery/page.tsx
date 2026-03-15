import type { Metadata } from "next";
import { company } from "@/data/company";
import CTASection from "@/components/CTASection";
import TrustBar from "@/components/TrustBar";
import GalleryGrid from "@/components/GalleryGrid";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

const BASE_URL = "https://www.adilayroofing.com";

export const metadata: Metadata = {
  title: "Roofing Project Gallery — Before & After Photos | Philadelphia",
  description:
    "Browse real before & after roofing photos by Adilay Roofing. See roof replacements, repairs, flat roofs, siding & gutter projects across Philadelphia, PA.",
  keywords: [
    "roofing before and after photos",
    "roof replacement photos Philadelphia",
    "roofing project gallery",
    "Philadelphia roofing work examples",
    "roofing company portfolio",
  ],
  alternates: { canonical: `${BASE_URL}/gallery` },
  openGraph: {
    title: "Adilay Roofing Project Gallery — Before & After Photos",
    description:
      "Real roofing projects across Philadelphia. See the quality of our roof replacements, repairs, siding, and more.",
    url: `${BASE_URL}/gallery`,
  },
};

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Gallery", path: "/gallery" }]} />
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background banner image */}
        <img
          src="/images/gallery-banner.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-[center_10%]"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-brand-dark/70" />

        <div className="section-padding relative z-10">
          <div className="container-narrow mx-auto text-center">
            <span className="inline-block text-brand-red font-bold text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4">
              Project Gallery
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
              Our Work Speaks <span className="text-brand-red">for Itself</span>
            </h1>
            <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto">
              Browse real projects completed by our team across Philadelphia and
              surrounding areas. Every job is done right — the first time.
            </p>

            {/* Stats inline */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-8 md:mt-10">
              {[
                { value: company.projectsCompleted, label: "Projects Completed" },
                { value: company.satisfiedClients, label: "Happy Clients" },
                { value: company.yearsExperience, label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-brand-red">
                    {stat.value}
                  </p>
                  <p className="text-white/50 text-xs md:text-sm mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <section className="bg-white">
        <div className="section-padding">
          <div className="container-wide mx-auto">
            <div className="text-center mb-8 md:mb-14">
              <span className="inline-block text-brand-red font-bold text-xs md:text-sm tracking-widest uppercase mb-3">
                Transformations
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-brand-dark mb-3 md:mb-4">
                Before &amp; After
              </h2>
              <p className="text-base md:text-lg text-brand-gray max-w-xl mx-auto">
                See the difference quality craftsmanship makes. Every project
                starts with a detailed assessment and ends with a result that
                exceeds expectations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                /* Roof Replacement */
                { id: 8, ext: "jpg", beforePos: "object-center", afterPos: "object-center", label: "Multi-Unit Roof Replacement" },
                { id: 1, ext: "jpg", beforePos: "object-top", afterPos: "object-top", label: "Roof Replacement" },
                { id: 6, ext: "png", beforePos: "object-center", afterPos: "object-center", label: "Complete Roof Replacement" },
                { id: 7, ext: "jpg", beforePos: "object-center", afterPos: "object-center", label: "Shingle Roof Replacement" },
                /* Roof Repair */
                { id: 2, ext: "jpg", beforePos: "object-center", afterPos: "object-top", label: "Roof Repair" },
                { id: 4, ext: "jpg", beforePos: "object-center", afterPos: "object-center", label: "Roof Decking & Shingles" },
                /* Flat Roofing */
                { id: 3, ext: "jpg", beforePos: "object-center", afterPos: "object-top", label: "Flat Roof Repair" },
                /* Siding */
                { id: 5, ext: "jpg", beforePos: "object-center", afterPos: "object-center", label: "Vinyl Siding Installation" },
              ].map((project) => (
                <div
                  key={project.id}
                  className="rounded-sm overflow-hidden border border-brand-border shadow-sm"
                >
                  {/* Before */}
                  <div className="relative">
                    <img
                      src={`/images/before-after-${project.id}-before.${project.ext}`}
                      alt={`${project.label} — before`}
                      className={`w-full aspect-square object-cover ${project.beforePos}`}
                    />
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-sm">
                      BEFORE
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-brand-border" />

                  {/* After */}
                  <div className="relative">
                    <img
                      src={`/images/before-after-${project.id}-after.${project.ext}`}
                      alt={`${project.label} — after`}
                      className={`w-full aspect-square object-cover ${project.afterPos}`}
                    />
                    <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-sm">
                      AFTER
                    </span>
                  </div>

                  {/* Label */}
                  <div className="bg-white px-4 py-2.5 text-center">
                    <span className="text-sm font-semibold text-brand-dark">{project.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery with filter — client component */}
      <GalleryGrid />

      {/* Trust Stats */}
      <TrustBar />

      {/* CTA */}
      <CTASection
        headline="Like What You See?"
        subtext="Let us transform your roof next. Get a free, no-obligation estimate today."
      />
    </>
  );
}
