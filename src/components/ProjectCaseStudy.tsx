import Link from "next/link";
import { company } from "@/data/company";
import SafeHTML from "@/components/SafeHTML";
import ShowcaseRevealCard from "@/components/ShowcaseRevealCard";

/**
 * Full scroll-reveal case study section — one per project, embedded on that
 * project's service-area page (see src/data/projectCaseStudies.ts). The home
 * page links here from the case-study carousel.
 *
 * Server Component; the per-card reveal animation lives in the small client
 * wrapper <ShowcaseRevealCard /> (the one file to tweak).
 *
 * PRIVACY: copy, captions, and alt text name the neighborhood only — never a
 * street address or house number.
 */

export interface CaseStudyCard {
  kind: "before" | "during" | "after" | "crew";
  imageId: string;
  caption: string;
  alt: string;
  /** Intrinsic pixel size of the source image (avoids layout shift). */
  width: number;
  height: number;
}

export interface ProjectCaseStudyData {
  /** Section anchor id, e.g. "havertown-project". */
  id: string;
  /** Service-area slug whose page embeds this section. */
  areaSlug: string;
  eyebrow: string;
  heading: string;
  /** Intro paragraph; may contain internal links (rendered via SafeHTML). */
  introHtml: string;
  stats: { value: string; label: string }[];
  /** In scroll order. */
  cards: CaseStudyCard[];
  scope: string[];
  cta: { heading: string; text: string };
  /** Builds the Cloudinary delivery URL for an image id. */
  img: (imageId: string, width?: number) => string;
  /** Absolute image URLs for the area page's JSON-LD. */
  schemaImages: string[];
  /** Optional OpenGraph image for the area page. */
  ogImage?: string;
}

const TAG_STYLES: Record<CaseStudyCard["kind"], { label: string; className: string }> = {
  before: { label: "BEFORE", className: "bg-brand-red text-white" },
  during: { label: "DURING", className: "bg-amber-600 text-white" },
  after: { label: "AFTER", className: "bg-emerald-600 text-white" },
  crew: { label: "THE CREW", className: "bg-brand-dark text-white" },
};

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 mt-0.5 text-brand-red flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ScopeList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <CheckIcon />
          <span className="text-sm md:text-base text-brand-dark">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ProjectCaseStudy({ data }: { data: ProjectCaseStudyData }) {
  const { img } = data;
  const srcSet = (id: string) =>
    [480, 960, 1600].map((w) => `${img(id, w)} ${w}w`).join(", ");

  return (
    <section id={data.id} className="bg-brand-light scroll-mt-32">
      <div className="section-padding">
        <div className="container-narrow mx-auto">
          {/* Heading */}
          <div className="text-center mb-8 md:mb-12">
            <p className="text-brand-red font-bold uppercase tracking-widest text-xs md:text-sm mb-2 md:mb-3">
              {data.eyebrow}
            </p>
            <h2 className="section-heading">{data.heading}</h2>
            <SafeHTML
              html={data.introHtml}
              as="p"
              className="section-subheading mx-auto mt-3 md:mt-4 [&_a]:text-brand-red [&_a]:font-semibold [&_a:hover]:underline"
            />
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3 max-w-4xl mx-auto mb-10 md:mb-14">
            {data.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white border border-brand-border rounded-sm px-3 py-3 md:py-4 text-center last:col-span-2 sm:last:col-span-1"
              >
                <div className="text-base md:text-lg font-extrabold text-brand-dark leading-tight">
                  {stat.value}
                </div>
                <div className="text-[11px] md:text-xs text-brand-gray mt-1 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Card-by-card scroll story */}
          <div className="max-w-xl mx-auto space-y-10 md:space-y-14">
            {data.cards.map((card) => {
              const tag = TAG_STYLES[card.kind];
              return (
                <ShowcaseRevealCard key={card.imageId} kind={card.kind}>
                  <figure>
                    <div className="relative rounded-sm overflow-hidden shadow-md aspect-[3/4] bg-brand-light">
                      <img
                        src={img(card.imageId, 960)}
                        srcSet={srcSet(card.imageId)}
                        sizes="(min-width: 640px) 576px, 100vw"
                        alt={card.alt}
                        width={card.width}
                        height={card.height}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <span
                        className={`absolute top-3 left-3 md:top-4 md:left-4 px-3 py-1 rounded-sm text-xs md:text-sm font-extrabold tracking-widest ${tag.className}`}
                      >
                        {tag.label}
                      </span>
                    </div>
                    <figcaption className="text-sm md:text-base text-brand-gray text-center mt-3 max-w-lg mx-auto">
                      {card.caption}
                    </figcaption>
                  </figure>
                </ShowcaseRevealCard>
              );
            })}
          </div>

          {/* Scope of work — collapsible on mobile, open list on desktop */}
          <div className="max-w-xl mx-auto mt-12 md:mt-16">
            <details className="md:hidden group border border-brand-border rounded-sm bg-white">
              <summary className="list-none cursor-pointer flex items-center justify-between gap-3 px-4 py-4 [&::-webkit-details-marker]:hidden">
                <h3 className="text-base font-bold text-brand-dark">Full Scope of Work</h3>
                <svg
                  className="w-5 h-5 text-brand-red flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-4 pb-5">
                <ScopeList items={data.scope} />
              </div>
            </details>
            <div className="hidden md:block bg-white border border-brand-border rounded-sm p-6 md:p-8">
              <h3 className="text-xl font-bold text-brand-dark mb-5">Full Scope of Work</h3>
              <ScopeList items={data.scope} />
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12 md:mt-16">
            <h3 className="text-xl md:text-2xl font-bold text-brand-dark mb-3">{data.cta.heading}</h3>
            <p className="text-brand-gray max-w-xl mx-auto mb-6">{data.cta.text}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={`tel:${company.phoneRaw}`} className="btn-primary w-full sm:w-auto">
                Call {company.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-brand-red font-bold hover:gap-3 transition-all duration-200"
              >
                Request Free Assessment
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
