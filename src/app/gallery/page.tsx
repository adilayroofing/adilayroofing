import type { Metadata } from "next";
import { company } from "@/data/company";
import CTASection from "@/components/CTASection";
import TrustBar from "@/components/TrustBar";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Our Work — Project Gallery",
  description: `Browse real roofing projects completed by ${company.name} across Philadelphia and surrounding areas. See before & after transformations of roof replacements, repairs, flat roofing, siding, and more.`,
};

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-dark relative overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

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
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="rounded-sm overflow-hidden border border-brand-border shadow-sm"
                >
                  {/* Before */}
                  <div className="relative">
                    <img
                      src={`/images/before-after-${n}-before.jpg`}
                      alt={`Project ${n} — before`}
                      className="w-full aspect-square object-cover object-top"
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
                      src={`/images/before-after-${n}-after.jpg`}
                      alt={`Project ${n} — after`}
                      className="w-full aspect-square object-cover object-top"
                    />
                    <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-sm">
                      AFTER
                    </span>
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
