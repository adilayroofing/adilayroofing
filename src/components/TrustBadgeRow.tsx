/**
 * Compact 4-badge trust row used on /contact and /get-quote.
 * Renders white cards with subtle borders that work on light or dark
 * backgrounds. 2x2 grid on mobile, 1x4 on desktop.
 *
 * The homepage hero renders its own larger version inline because the
 * sizing has to feel right against a full-bleed dark photo. This
 * component is the smaller, light-background variant.
 */
export default function TrustBadgeRow({
  className = "",
}: {
  className?: string;
}) {
  return (
    <ul
      className={`mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 max-w-sm md:max-w-3xl ${className}`}
    >
      <li className="bg-white border border-brand-border rounded-sm flex items-center justify-center p-1 h-14 md:h-16 overflow-hidden">
        <img
          src="/images/google-business-review-5-stars.png"
          alt="Adilay Roofing — 5.0 stars on Google Business Reviews"
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </li>
      <li className="bg-white border border-brand-border rounded-sm flex items-center justify-center p-1 h-14 md:h-16 overflow-hidden">
        <a
          href="https://www.bbb.org/us/pa/philadelphia/profile/roofing-contractors/adilay-roofing-llc-0241-236104655/#sealclick"
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="block h-full w-full"
        >
          <img
            src="https://seal-dc-easternpa.bbb.org/seals/blue-seal-160-82-bbb-236104655.png"
            alt="Adilay Roofing — BBB Accredited Business"
            loading="lazy"
            width={160}
            height={82}
            className="h-full w-full object-contain"
            style={{ border: 0 }}
          />
        </a>
      </li>
      <li className="bg-white border border-brand-border rounded-sm flex items-center justify-center gap-1.5 p-1.5 h-14 md:h-16">
        <img
          src="/images/gaf-certified-logo.jpg"
          alt="GAF Certified Contractor"
          loading="lazy"
          className="h-full w-auto aspect-square object-contain flex-shrink-0"
        />
        <span className="text-brand-dark font-bold text-[11px] md:text-xs leading-tight text-left">
          GAF
          <br />
          Certified
        </span>
      </li>
      <li className="bg-white border border-brand-border rounded-sm flex flex-col items-center justify-center p-1.5 h-14 md:h-16">
        <span className="text-[10px] md:text-[11px] text-brand-gray font-semibold uppercase tracking-wider leading-tight">
          Licensed PA
        </span>
        <span className="text-brand-dark font-extrabold text-sm md:text-base leading-tight mt-0.5">
          #PA184779
        </span>
      </li>
    </ul>
  );
}
