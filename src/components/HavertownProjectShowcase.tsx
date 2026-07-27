import Link from "next/link";
import { company } from "@/data/company";
import ShowcaseRevealCard from "@/components/ShowcaseRevealCard";
import {
  havertownCards,
  havertownStats,
  havertownScope,
  havertownImg,
  havertownSrcSet,
  HAVERTOWN_SHOWCASE_ID,
} from "@/data/havertownProject";

/**
 * Scroll-animated before/after showcase for the Havertown, PA (Delaware
 * County) full roof replacement — completed July 2026.
 *
 * Server Component; the per-card reveal animation lives in the small client
 * wrapper <ShowcaseRevealCard /> (the one file to tweak).
 *
 * variant="full"       — the whole story: 3 pairs + crew, stat strip, scope
 *                        of work, CTA. Embedded on /service-areas/havertown.
 * variant="condensed"  — 2 pairs + crew and a link to the full section.
 *                        Embedded on the home page.
 *
 * PRIVACY: never render the job's street address — location is described only
 * as "Havertown, PA (Delaware County)" / "a Havertown neighborhood".
 */

interface Props {
  variant?: "full" | "condensed";
}

const TAG_STYLES: Record<string, { label: string; className: string }> = {
  before: { label: "BEFORE", className: "bg-brand-red text-white" },
  after: { label: "AFTER", className: "bg-emerald-600 text-white" },
  crew: { label: "THE CREW", className: "bg-brand-dark text-white" },
};

function ShowcaseCards({ cards }: { cards: typeof havertownCards }) {
  return (
    <div className="max-w-xl mx-auto space-y-10 md:space-y-14">
      {cards.map((card) => {
        const tag = TAG_STYLES[card.kind];
        return (
          <ShowcaseRevealCard key={card.imageId} kind={card.kind}>
            <figure>
              <div className="relative rounded-sm overflow-hidden shadow-md aspect-[3/4] bg-brand-light">
                <img
                  src={havertownImg(card.imageId, 960)}
                  srcSet={havertownSrcSet(card.imageId)}
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
  );
}

/**
 * Condensed home-page presentation: ONE compact collage (befores left,
 * afters right, crew banner below) whose tiles cascade in before → after
 * as the collage scrolls into view — no per-photo scrolling.
 */
function ShowcaseCollage() {
  // b1, a1, b2, a2 tiles + crew banner, staggered ~150ms apart.
  const tiles = [...havertownCards.slice(0, 4), havertownCards[6]];
  return (
    <figure className="max-w-3xl mx-auto">
      <div className="grid grid-cols-2 gap-1.5 md:gap-3">
        {tiles.map((card, i) => {
          const tag = TAG_STYLES[card.kind];
          const isCrew = card.kind === "crew";
          return (
            <ShowcaseRevealCard
              key={card.imageId}
              kind={card.kind}
              delayMs={i * 100}
              className={isCrew ? "col-span-2" : ""}
            >
              <div
                className={`relative rounded-sm overflow-hidden shadow-md bg-brand-light ${
                  isCrew ? "aspect-[2/1] md:aspect-[5/2]" : "aspect-square"
                }`}
              >
                <img
                  src={havertownImg(card.imageId, 960)}
                  srcSet={havertownSrcSet(card.imageId)}
                  sizes={
                    isCrew
                      ? "(min-width: 768px) 744px, 100vw"
                      : "(min-width: 768px) 372px, 50vw"
                  }
                  alt={card.alt}
                  width={card.width}
                  height={card.height}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                  // AFTER shots are portrait; anchoring the square crop to the
                  // top keeps the street/tree context so their framing matches
                  // the wider-looking BEFORE tiles.
                  style={
                    isCrew
                      ? { objectPosition: "center 35%" }
                      : card.kind === "after"
                        ? { objectPosition: "center top" }
                        : undefined
                  }
                />
                <span
                  className={`absolute top-2 left-2 px-2 py-0.5 rounded-sm text-[10px] md:text-xs font-extrabold tracking-widest ${tag.className}`}
                >
                  {tag.label}
                </span>
              </div>
            </ShowcaseRevealCard>
          );
        })}
      </div>
      <figcaption className="text-[13px] md:text-base text-brand-gray text-center mt-3 md:mt-4 max-w-2xl mx-auto">
        Old shingles and a patched flat roof (left) &rarr; new GAF shingle
        roof and EPDM membrane (right), by the Adilay crew in a Havertown
        neighborhood.
      </figcaption>
    </figure>
  );
}

function ScopeList() {
  return (
    <ul className="space-y-2.5">
      {havertownScope.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <svg
            className="w-5 h-5 mt-0.5 text-brand-red flex-shrink-0"
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
          <span className="text-sm md:text-base text-brand-dark">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function HavertownProjectShowcase({ variant = "full" }: Props) {
  const isFull = variant === "full";

  return (
    <section
      id={isFull ? HAVERTOWN_SHOWCASE_ID : undefined}
      className="bg-brand-light scroll-mt-24"
    >
      <div className={isFull ? "section-padding" : "px-4 py-10 md:py-16"}>
        <div className="container-narrow mx-auto">
          {/* Heading */}
          <div className={`text-center ${isFull ? "mb-8 md:mb-12" : "mb-6 md:mb-8"}`}>
            <p className="text-brand-red font-bold uppercase tracking-widest text-xs md:text-sm mb-2 md:mb-3">
              Project Showcase — Delaware County
            </p>
            <h2 className="section-heading">
              Full Roof Replacement in Havertown, PA
            </h2>
            <p className="section-subheading mx-auto mt-3 md:mt-4">
              An aging shingle roof and a worn flat roof, replaced down to the
              deck in a Havertown neighborhood.
              {isFull && " Scroll through the befores and afters."}
            </p>
          </div>

          {/* Stat strip — full: card grid; condensed: compact pill row */}
          {isFull ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3 max-w-4xl mx-auto mb-10 md:mb-14">
              {havertownStats.map((stat) => (
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
          ) : (
            <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 max-w-2xl mx-auto mb-6 md:mb-8">
              {havertownStats.map((stat) => (
                <span
                  key={stat.label}
                  className="bg-white border border-brand-border rounded-full px-3 py-1 text-[11px] md:text-sm text-brand-gray whitespace-nowrap"
                >
                  <strong className="font-extrabold text-brand-dark">
                    {stat.value}
                  </strong>{" "}
                  {stat.label.toLowerCase()}
                </span>
              ))}
            </div>
          )}

          {/* Full: card-by-card scroll story. Condensed: one collage whose
              tiles cascade in on a single scroll-into-view. */}
          {isFull ? <ShowcaseCards cards={havertownCards} /> : <ShowcaseCollage />}

          {isFull ? (
            <>
              {/* Scope of work — collapsible on mobile, open list on desktop */}
              <div className="max-w-xl mx-auto mt-12 md:mt-16">
                <details className="md:hidden group border border-brand-border rounded-sm bg-white">
                  <summary className="list-none cursor-pointer flex items-center justify-between gap-3 px-4 py-4 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base font-bold text-brand-dark">
                      Full Scope of Work
                    </h3>
                    <svg
                      className="w-5 h-5 text-brand-red flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="px-4 pb-5">
                    <ScopeList />
                  </div>
                </details>
                <div className="hidden md:block bg-white border border-brand-border rounded-sm p-6 md:p-8">
                  <h3 className="text-xl font-bold text-brand-dark mb-5">
                    Full Scope of Work
                  </h3>
                  <ScopeList />
                </div>
              </div>

              {/* CTA */}
              <div className="text-center mt-12 md:mt-16">
                <h3 className="text-xl md:text-2xl font-bold text-brand-dark mb-3">
                  Is your roof next?
                </h3>
                <p className="text-brand-gray max-w-xl mx-auto mb-6">
                  Get a free roof assessment — no pressure, no obligation.
                  Serving Havertown, Broomall, Drexel Hill, Springfield &amp;
                  all of Delaware County.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={`tel:${company.phoneRaw}`}
                    className="btn-primary w-full sm:w-auto"
                  >
                    Call {company.phone}
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-brand-red font-bold hover:gap-3 transition-all duration-200"
                  >
                    Request Free Assessment
                    <svg
                      className="w-5 h-5"
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
            </>
          ) : (
            /* Condensed: link to the full write-up on the Havertown page */
            <div className="text-center mt-6 md:mt-8">
              <Link
                href={`/service-areas/havertown#${HAVERTOWN_SHOWCASE_ID}`}
                className="inline-flex items-center gap-2 text-brand-red font-bold text-lg hover:gap-3 transition-all duration-200"
              >
                See the Full Havertown Project
                <svg
                  className="w-5 h-5"
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
          )}
        </div>
      </div>
    </section>
  );
}
