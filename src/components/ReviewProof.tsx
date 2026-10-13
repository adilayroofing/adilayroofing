import ReviewerAvatar from "@/components/ReviewerAvatar";
import { getSiteReviews, pickFeatured, quoteLine } from "@/lib/reviews";

/*
 * Small review proof pieces that sit right next to call-to-action buttons:
 *  - <ReviewBadge>  faces + ★ 4.9 + "61 Google reviews", links to the reviews section
 *  - <ReviewQuotes> 1–3 pull-quote cards with the reviewer's photo
 * Both read the same cached sheet data as the main reviews section.
 */

type Tone = "light" | "dark";

function Stars({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <span className="flex items-center gap-0.5 text-brand-star" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function GoogleG({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export async function ReviewBadge({
  tone = "light",
  href = "#reviews",
  eager = false,
  className = "",
}: {
  tone?: Tone;
  href?: string;
  /** true when it sits above the fold (hero) */
  eager?: boolean;
  className?: string;
}) {
  const { reviews, stats } = await getSiteReviews();
  // Faces: everyone marked "Feature near buttons?" first (owner picks real photos there)
  const faces = [...reviews.filter((r) => r.featured), ...reviews].filter(
    (r, i, all) => r.photo && all.findIndex((x) => x.name === r.name) === i
  ).slice(0, 5);

  const dark = tone === "dark";
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2.5 rounded-full pl-1.5 pr-3.5 py-1.5 transition-colors ${
        dark
          ? "bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-sm"
          : "bg-white hover:bg-brand-light border border-brand-border shadow-sm"
      } ${className}`}
    >
      <span className="flex -space-x-2">
        {faces.map((r) => (
          <span key={r.name} className={`rounded-full ring-2 ${dark ? "ring-brand-darker" : "ring-white"}`}>
            <ReviewerAvatar name={r.name} photo={r.photo} eager={eager} className="w-7 h-7 md:w-8 md:h-8 text-xs" />
          </span>
        ))}
      </span>
      <span className="flex flex-col items-start leading-none text-left">
        <span className="flex items-center gap-1.5">
          <Stars />
          <span className={`font-extrabold text-sm ${dark ? "text-white" : "text-brand-dark"}`}>
            {stats.rating.toFixed(1)}
          </span>
        </span>
        <span className={`mt-1 text-[11px] md:text-xs font-semibold ${dark ? "text-white/80" : "text-brand-gray"} group-hover:underline`}>
          {stats.count} Google reviews
        </span>
      </span>
    </a>
  );
}

export async function ReviewQuotes({
  count = 3,
  tone = "light",
  className = "",
}: {
  count?: 1 | 2 | 3;
  tone?: Tone;
  className?: string;
}) {
  const { reviews, loadedAt } = await getSiteReviews();
  const picks = pickFeatured(reviews, count, loadedAt);
  if (!picks.length) return null;

  const dark = tone === "dark";
  const cols = count === 3 ? "md:grid-cols-3" : count === 2 ? "md:grid-cols-2" : "";

  return (
    // Mobile: swipeable row of cards. Desktop: grid.
    <div
      className={`flex md:grid ${cols} gap-3 md:gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 pb-1 [scrollbar-width:none] ${className}`}
    >
      {picks.map((r) => (
        <figure
          key={r.name}
          className={`snap-start shrink-0 ${picks.length === 1 ? "w-full" : "w-[85%]"} md:w-auto rounded-sm p-4 md:p-5 text-left flex flex-col ${
            dark ? "bg-white/[0.06] border border-white/15" : "bg-white border border-brand-border shadow-sm"
          }`}
        >
          <blockquote className={`flex-1 font-bold italic leading-snug text-[15px] md:text-base ${dark ? "text-white" : "text-brand-dark"}`}>
            <span className="text-brand-red not-italic text-2xl leading-none align-[-0.3em] mr-0.5" aria-hidden="true">&ldquo;</span>
            {quoteLine(r)}
            <span className="text-brand-red not-italic text-2xl leading-none align-[-0.3em] ml-0.5" aria-hidden="true">&rdquo;</span>
          </blockquote>
          <figcaption className="mt-3 flex items-center gap-2.5">
            <ReviewerAvatar name={r.name} photo={r.photo} className="w-8 h-8 text-sm" />
            <span className="min-w-0 flex-1">
              <span className={`block font-semibold text-sm truncate ${dark ? "text-white" : "text-brand-dark"}`}>{r.name}</span>
              <span className="flex items-center gap-1.5 mt-0.5">
                <Stars className="w-3 h-3" />
                <span className={`text-[11px] ${dark ? "text-white/60" : "text-brand-gray"}`}>Google review</span>
              </span>
            </span>
            <GoogleG className="w-4 h-4 flex-shrink-0" />
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
