import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/data/company";
import { galleryProjects, galleryCategories, type GalleryProject } from "@/data/gallery";
import CTASection from "@/components/CTASection";
import TrustBar from "@/components/TrustBar";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

const BASE_URL = "https://www.adilayroofing.com";

export const metadata: Metadata = {
  title: "Roofing Project Gallery — Philadelphia Before & After Photos",
  description:
    "See real before & after photos of Adilay Roofing projects — roof replacements, repairs, flat roofs & siding across Philadelphia. PA184779 · (267) 255-3620.",
  keywords: [
    "roofing before and after photos Philadelphia",
    "roof replacement photos Philadelphia",
    "roofing project gallery",
    "Philadelphia roofing work examples",
    "roofing company portfolio Philadelphia",
    "flat roof EPDM Philadelphia",
    "storm damage roof repair Philadelphia",
  ],
  alternates: { canonical: `${BASE_URL}/gallery` },
  openGraph: {
    title: "Adilay Roofing Project Gallery — Before & After Photos",
    description:
      "Real Philadelphia roofing projects with drag-to-compare before & after sliders. Roof replacements, repairs, flat roofs, siding & more.",
    url: `${BASE_URL}/gallery`,
  },
};

/* ─── Gallery FAQ (also emitted as FAQPage JSON-LD for rich results
 *     + AI answer boxes). Kept in this file because it's page-specific
 *     and short enough not to warrant its own data module.
 */
const faqs = [
  {
    question: "How much does a roof replacement cost in Philadelphia?",
    answer:
      "A typical single-family roof replacement in the Philadelphia area runs $8,000 to $18,000+, depending on square footage, pitch, tear-off complexity, and material. Architectural asphalt shingles are the most common choice; slate, metal, and flat-roof systems price higher. Adilay Roofing provides free written estimates — call (267) 255-3620.",
  },
  {
    question: "How long does a roof replacement take?",
    answer:
      "Most single-family Philadelphia homes are torn off and re-roofed in one to two days once materials are on site. Multi-unit buildings, steep-pitch roofs, or slate/tile jobs typically run three to five days. We schedule around the forecast to keep the interior dry throughout.",
  },
  {
    question: "What are the best shingles for the Philadelphia climate?",
    answer:
      "Architectural (dimensional) asphalt shingles handle Philadelphia's freeze-thaw winters and humid summers best. We install GAF Timberline HDZ most often — it carries StainGuard Plus algae protection and up to a 50-year material warranty when installed by a certified contractor.",
  },
  {
    question: "How do I know if my roof needs to be replaced?",
    answer:
      "Common warning signs: curling, cupping, or missing shingles; granules collecting in gutters; daylight visible through the attic decking; sagging rooflines; leaks after every heavy rain; or a roof past 20 years old. A free inspection tells you whether repair or full replacement is the right call.",
  },
  {
    question: "Do you offer warranties on your roofing work?",
    answer:
      "Yes. Every Adilay Roofing project includes a written workmanship warranty on top of the manufacturer's material warranty. We're a licensed Pennsylvania Home Improvement Contractor (PA184779) and fully insured — certificates of insurance available on request.",
  },
  {
    question: "Do you handle both residential and commercial roofs?",
    answer:
      "Yes. Residential shingle and slate roofs, commercial flat roofs (EPDM, TPO, modified bitumen), multi-unit townhouses, and mixed-use buildings — we've handled all of them across Philadelphia, Bucks, Montgomery, Delaware, and Chester counties.",
  },
];

/* Group projects by category, preserving the order defined in
 * galleryCategories (minus "all"). Categories with no projects are
 * skipped. */
function groupByCategory(projects: GalleryProject[]) {
  const order = galleryCategories.filter((c) => c.value !== "all");
  return order
    .map((cat) => ({
      value: cat.value,
      label: cat.label,
      projects: projects.filter((p) => p.category === cat.value),
    }))
    .filter((g) => g.projects.length > 0);
}

const CATEGORY_INTROS: Record<string, string> = {
  "roof-replacement":
    "Full tear-offs and re-roofs across Philadelphia and the surrounding counties. Drag any slider to see the transformation.",
  "roof-repair":
    "Targeted repairs — from storm damage to flat-roof crack sealing. Every fix is diagnosed before we quote the scope.",
  "flat-roofing":
    "EPDM, TPO, and modified-bitumen flat roofs — the dominant style on Philadelphia row homes and commercial buildings.",
  "shingle-roofing":
    "Architectural shingle roofs paired with the gutters, flashing, and ventilation details that make them last.",
  siding:
    "Vinyl and wrapped exteriors installed with proper house wrap and clean trim details.",
};

export default function GalleryPage() {
  const grouped = groupByCategory(galleryProjects);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Gallery", path: "/gallery" }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ==================================================================
          Hero
          ================================================================== */}
      <section className="relative overflow-hidden">
        <img
          src="/images/gallery-banner.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-[center_10%]"
        />
        <div className="absolute inset-0 bg-brand-dark/70" />

        <div className="section-padding relative z-10">
          <div className="container-narrow mx-auto text-center">
            <span className="inline-block text-brand-red font-bold text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4">
              Project Gallery
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
              Philadelphia Roofing Projects{" "}
              <span className="text-brand-red">— Before &amp; After</span>
            </h1>
            <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto">
              Drag the sliders below to see real Adilay Roofing jobs across
              Philadelphia, Bucks, Montgomery, Delaware, and Chester counties —
              tear-offs, repairs, flat roofs, and siding, all completed by our
              own crew.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-8 md:mt-10">
              {[
                { value: company.projectsCompleted, label: "Projects Completed" },
                { value: company.satisfiedClients, label: "Clients Served" },
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

      {/* ==================================================================
          Slider grid — grouped by category (H2 per category for SEO)
          Grid: 1 col mobile / 2 col md+. Each slider is a
          BeforeAfterSlider, which uses IntersectionObserver internally
          so the auto-hint only fires once the card scrolls into view.
          Images use loading="lazy" + Cloudinary via the /images/*
          redirect in next.config.ts.
          ================================================================== */}
      {grouped.map((group, groupIdx) => (
        <section
          key={group.value}
          className={groupIdx % 2 === 0 ? "bg-white" : "bg-brand-light"}
        >
          <div className="section-padding">
            <div className="container-wide mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <span className="inline-block text-brand-red font-bold text-xs md:text-sm tracking-widest uppercase mb-3">
                  {group.projects.length}{" "}
                  {group.projects.length === 1 ? "Project" : "Projects"}
                </span>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-brand-dark mb-3">
                  {group.label} — Before &amp; After
                </h2>
                <p className="text-sm md:text-base text-brand-gray max-w-2xl mx-auto">
                  {CATEGORY_INTROS[group.value]}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {group.projects.map((project) => (
                  <ProjectSliderCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ==================================================================
          FAQ — page-specific, targets common AI/search queries about
          Philadelphia roofing (cost, timeline, materials, warranty).
          FAQPage JSON-LD is emitted above for rich results.
          ================================================================== */}
      <section className="bg-white border-t border-brand-border">
        <div className="section-padding">
          <div className="container-narrow mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <span className="inline-block text-brand-red font-bold text-xs md:text-sm tracking-widest uppercase mb-3">
                Common Questions
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-brand-dark">
                Philadelphia Roofing FAQs
              </h2>
              <p className="text-sm md:text-base text-brand-gray max-w-xl mx-auto mt-3">
                Answers to the questions we hear most from homeowners
                comparing before-and-after work.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <details
                  key={faq.question}
                  className="group bg-brand-light border border-brand-border rounded-sm"
                  {...(idx === 0 ? { open: true } : {})}
                >
                  <summary className="flex items-start justify-between gap-4 p-4 md:p-5 cursor-pointer list-none">
                    <h3 className="text-base md:text-lg font-bold text-brand-dark">
                      {faq.question}
                    </h3>
                    <svg
                      className="w-5 h-5 flex-shrink-0 text-brand-red mt-0.5 transition-transform group-open:rotate-45"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </summary>
                  <div className="px-4 md:px-5 pb-4 md:pb-5 text-brand-gray text-sm md:text-base leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      <CTASection
        headline="Like What You See?"
        subtext="Let us transform your roof next. Free, no-obligation written estimate — call (267) 255-3620 or request one online."
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   ProjectSliderCard
   Renders one project as a titled card with a BeforeAfterSlider,
   materials chip line, description, and location tag.
   ───────────────────────────────────────────────────────────────────── */
function ProjectSliderCard({ project }: { project: GalleryProject }) {
  return (
    <article className="bg-white border border-brand-border rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <BeforeAfterSlider
        beforeSrc={project.beforeImage}
        beforeAlt={project.beforeAlt}
        afterSrc={project.afterImage}
        afterAlt={project.afterAlt}
        aspectClass="aspect-[4/5] md:aspect-[4/3]"
        objectPosition={project.objectPosition ?? "center 45%"}
      />

      <div className="p-4 md:p-5">
        <h3 className="text-base md:text-lg font-bold text-brand-dark mb-1.5">
          {project.title}
        </h3>

        <p className="flex items-center gap-1.5 text-xs md:text-sm text-brand-gray mb-3">
          <svg
            className="w-3.5 h-3.5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          {project.locationSlug ? (
            <Link
              href={`/service-areas/${project.locationSlug}`}
              className="text-brand-red hover:underline"
            >
              {project.location}
            </Link>
          ) : (
            <span>{project.location}</span>
          )}
        </p>

        {project.materials && (
          <p className="text-[11px] md:text-xs font-semibold uppercase tracking-wider text-brand-dark/70 mb-2">
            {project.materials}
          </p>
        )}

        <p className="text-sm md:text-[15px] text-brand-gray leading-relaxed">
          {project.description}
        </p>

        {project.serviceSlug && (
          <Link
            href={`/services/${project.serviceSlug}`}
            className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-brand-red hover:underline"
          >
            Learn about this service
            <svg
              className="w-3.5 h-3.5"
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
        )}
      </div>
    </article>
  );
}
