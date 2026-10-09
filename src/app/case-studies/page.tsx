import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/data/company";
import { caseStudies, caseStudyCategories } from "@/data/caseStudies";
import CaseStudyCard from "@/components/CaseStudyCard";
import CTASection from "@/components/CTASection";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { BASE_URL, ORG_REF, jsonLdScript } from "@/lib/schema";

// Shareable hub of every written-up project, grouped by roof / job type.
// New case studies appear here automatically once added to
// src/data/caseStudies.ts (with a category).

const PAGE_URL = `${BASE_URL}/case-studies`;
const OG_IMAGE =
  "https://res.cloudinary.com/dqj9hdrda/image/upload/f_jpg,q_auto,c_fill,g_auto,w_1200,h_630/adilay/projects/manayunk-facade/after-front";

export const metadata: Metadata = {
  title: "Roofing Case Studies: Real Philadelphia Projects",
  description:
    "Real Philadelphia roofing case studies — flat roofs, roof replacements, repairs & siding, with before/after photos and full scopes. PA184779 · (267) 255-3620.",
  keywords: [
    "roofing case studies Philadelphia",
    "flat roof replacement Philadelphia before and after",
    "TPO roof replacement Philadelphia",
    "torch down roof Philadelphia",
    "roof replacement before and after Philadelphia",
    "Philadelphia roofing contractor projects",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Adilay Roofing Case Studies — Real Philadelphia Projects",
    description:
      "Before, during & after photos and the full scope of work for real Adilay Roofing jobs across Philadelphia and the suburbs.",
    url: PAGE_URL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
};

export default function CaseStudiesPage() {
  const groups = caseStudyCategories
    .map((cat) => ({ ...cat, items: caseStudies.filter((cs) => cs.category === cat.id) }))
    .filter((g) => g.items.length > 0);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${PAGE_URL}#collection`,
    url: PAGE_URL,
    name: "Roofing Case Studies — Real Philadelphia Projects",
    description:
      "Documented Adilay Roofing projects with before, during, and after photos and the full scope of work, grouped by roof type.",
    publisher: ORG_REF,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: caseStudies.length,
      itemListElement: groups.flatMap((g) => g.items).map((cs, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${BASE_URL}${cs.href}`,
        name: `${cs.title} — ${cs.location}`,
        image: cs.afterSrc(1200),
      })),
    },
  };

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Case Studies", path: "/case-studies" }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(collectionSchema) }}
      />

      {/* Hero */}
      <section className="bg-brand-dark">
        <div className="section-padding">
          <div className="container-narrow mx-auto text-center">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center justify-center gap-2 text-sm text-white/50 mb-5"
            >
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-white/80">Case Studies</span>
            </nav>
            <span className="inline-block text-brand-red font-bold text-xs md:text-sm tracking-widest uppercase mb-3">
              Case Studies
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-5">
              Real Philadelphia Roofing Projects,{" "}
              <span className="text-brand-red">Start to Finish</span>
            </h1>
            <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto">
              Every case study is a real Adilay Roofing job: what we found, what
              we built, the materials we used, and the before, during, and
              after photos to prove it.
            </p>
          </div>
        </div>
      </section>

      {/* Jump nav by roof / job type */}
      <nav
        aria-label="Case study categories"
        className="bg-white border-b border-brand-border"
      >
        <div className="container-wide mx-auto px-4 py-3 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:justify-center">
          {groups.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="shrink-0 rounded-full border border-brand-border px-4 py-2 text-sm font-semibold text-brand-dark hover:border-brand-red hover:text-brand-red transition-colors"
            >
              {g.label}
            </a>
          ))}
        </div>
      </nav>

      {/* One section per roof / job type */}
      {groups.map((g, i) => (
        <section
          key={g.id}
          id={g.id}
          className={`scroll-mt-32 ${i % 2 === 0 ? "bg-brand-light" : "bg-white"}`}
        >
          <div className="section-padding">
            <div className="container-wide mx-auto">
              <div className="max-w-3xl mb-8 md:mb-10">
                <h2 className="text-2xl md:text-4xl font-bold text-brand-dark mb-3">
                  {g.heading}
                </h2>
                <p className="text-brand-gray leading-relaxed md:text-lg">{g.intro}</p>
                <Link
                  href={g.serviceHref}
                  className="inline-flex items-center gap-1.5 mt-3 text-sm font-bold text-brand-red hover:gap-2.5 transition-all"
                >
                  {g.serviceLabel}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {g.items.map((cs) => (
                  <CaseStudyCard
                    key={cs.id}
                    cs={cs}
                    variant="grid"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* What every case study includes */}
      <section className="bg-white border-t border-brand-border">
        <div className="section-padding">
          <div className="container-narrow mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark text-center mb-8">
              What Every Case Study Shows You
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {[
                {
                  title: "Real job-site photos",
                  text: "Before, during, and after shots from the actual project — never stock images.",
                },
                {
                  title: "The measured scope",
                  text: "Square footage, linear feet of flashing, and every step of the work, straight from the job's scope.",
                },
                {
                  title: "Named materials",
                  text: "The exact systems we installed — GAF shingles and membranes, TPO, EPDM, PolyISO — so you can compare quotes.",
                },
                {
                  title: "Local context",
                  text: "Philadelphia rowhomes, Main Line stone houses, and Delaware County homes each fail differently. We show how we handled each one.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-brand-light border border-brand-border rounded-sm p-5">
                  <h3 className="font-bold text-brand-dark mb-1.5">{item.title}</h3>
                  <p className="text-sm text-brand-gray leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-brand-gray mt-8">
              Want more photos? Browse the{" "}
              <Link href="/gallery" className="text-brand-red font-semibold hover:underline">
                before &amp; after gallery
              </Link>{" "}
              or see{" "}
              <Link href="/service-areas" className="text-brand-red font-semibold hover:underline">
                every area we serve
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <CTASection
        headline="Want Your Roof to Be Our Next Case Study?"
        subtext={`Free, no-obligation roof assessment from a licensed Pennsylvania contractor (${company.license}). Call ${company.phone} or request an estimate online.`}
      />
    </>
  );
}
