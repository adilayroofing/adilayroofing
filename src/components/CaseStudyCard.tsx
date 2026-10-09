import Link from "next/link";
import type { CaseStudy } from "@/data/caseStudies";

/**
 * One case-study card: AFTER photo with a small BEFORE inset, type and
 * location, title, key result, and a link to the full write-up.
 *
 * variant="carousel" — narrow home-page carousel cards (two-up on mobile),
 *                      so mobile text is compact and the key result hides.
 * variant="grid"     — /case-studies hub cards; full-size text everywhere.
 */

interface Props {
  cs: CaseStudy;
  variant: "carousel" | "grid";
  /** Responsive `sizes` for the AFTER photo. */
  sizes: string;
}

export default function CaseStudyCard({ cs, variant, sizes }: Props) {
  const grid = variant === "grid";
  return (
    <Link
      href={cs.href}
      className="group flex flex-col h-full bg-white border border-brand-border rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
    >
      <div
        className={`relative overflow-hidden bg-brand-light ${
          grid ? "aspect-[4/3]" : "aspect-[4/5] md:aspect-square"
        }`}
      >
        <img
          src={cs.afterSrc(640)}
          srcSet={`${cs.afterSrc(320)} 320w, ${cs.afterSrc(640)} 640w, ${cs.afterSrc(960)} 960w`}
          sizes={sizes}
          alt={cs.afterAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={cs.afterPosition ? { objectPosition: cs.afterPosition } : undefined}
        />
        <span
          className={`absolute bg-emerald-600 text-white rounded-sm font-extrabold tracking-widest uppercase ${
            grid
              ? "top-3 left-3 px-2.5 py-0.5 text-xs"
              : "top-1.5 left-1.5 md:top-3 md:left-3 px-1.5 md:px-2.5 py-0.5 text-[9px] md:text-xs"
          }`}
        >
          After
        </span>
        {/* Small BEFORE inset so each card tells the whole story */}
        <div
          className={`absolute aspect-square rounded-sm overflow-hidden border-2 border-white shadow-md bg-brand-light ${
            grid ? "bottom-3 right-3 w-[34%]" : "bottom-1.5 right-1.5 md:bottom-3 md:right-3 w-[40%]"
          }`}
        >
          <img
            src={cs.beforeSrc(320)}
            alt={cs.beforeAlt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover saturate-[0.75]"
          />
          <span
            className={`absolute bottom-0 inset-x-0 bg-brand-red/90 text-white text-center font-extrabold tracking-widest uppercase ${
              grid ? "text-[11px] py-0.5" : "text-[8px] md:text-[11px] py-px md:py-0.5"
            }`}
          >
            {cs.beforeLabel ?? "Before"}
          </span>
        </div>
      </div>

      <div className={`flex flex-col flex-1 ${grid ? "p-4 md:p-5" : "p-2.5 md:p-4"}`}>
        <p
          className={`text-brand-red font-bold uppercase tracking-wider leading-tight mb-1 ${
            grid ? "text-xs" : "text-[9px] md:text-xs"
          }`}
        >
          {grid ? (
            cs.location
          ) : (
            <>
              <span className="md:hidden">{cs.shortLocation}</span>
              <span className="hidden md:inline">
                {cs.type} · {cs.location}
              </span>
            </>
          )}
        </p>
        <h3
          className={`font-bold text-brand-dark leading-snug ${
            grid ? "text-lg md:text-xl" : "text-[13px] md:text-lg line-clamp-2"
          }`}
        >
          {cs.title}
        </h3>
        <p
          className={`text-brand-gray leading-relaxed mt-1.5 ${
            grid ? "text-sm md:text-[15px]" : "hidden md:block text-sm"
          }`}
        >
          {cs.highlight}
        </p>
        <span
          className={`mt-auto inline-flex items-center gap-1 font-bold text-brand-red group-hover:gap-2 transition-all ${
            grid ? "pt-4 text-sm" : "pt-2 md:pt-3 text-[12px] md:text-sm"
          }`}
        >
          {grid ? "Read the case study" : "View case study"}
          <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}
