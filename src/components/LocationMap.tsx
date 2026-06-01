type Props = {
  /** Place name as displayed (e.g., "Yardley" or "Bucks County") */
  name: string;
  /** Two-letter state abbreviation */
  state: "PA";
  /** Containing county (e.g., "Bucks County") */
  county: string;
  /** True if this page IS the county hub (no town drilldown needed). */
  isCounty: boolean;
  /** Up to ~6 nearby town/neighborhood names — surface in the description for unique per-page text. */
  neighborhoods?: string[];
  /** Adilay Roofing Google Business Profile / Maps URL. */
  mapUrl: string;
};

export default function LocationMap({
  name,
  state,
  county,
  isCounty,
  neighborhoods = [],
  mapUrl,
}: Props) {
  // County pages center on the county; sub-area pages center on the town
  // (Google auto-highlights the boundary either way).
  const query = isCounty ? `${county}, ${state}` : `${name}, ${state}`;
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed&z=${isCounty ? 10 : 12}`;

  const heading = isCounty
    ? `Where We Work Across ${county}`
    : `${name} on the ${county} Map`;

  const nearbyLine = neighborhoods.slice(0, 4).join(", ");
  const description = isCounty
    ? `Our crews cover every town in ${county}${nearbyLine ? ` — including ${nearbyLine}` : ""}. Use the map to see where ${county} sits in the greater Philadelphia region.`
    : nearbyLine
      ? `${name} is part of ${county}, ${state}. We also serve nearby — ${nearbyLine}, and surrounding towns. The pin shows where ${name} sits inside ${county}.`
      : `${name} is part of ${county}, ${state}. The pin shows where it sits inside the county.`;

  return (
    <section className="bg-white">
      <div className="section-padding pt-0">
        <div className="container-narrow mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-3xl font-bold text-brand-dark mb-2 md:mb-3">
              {heading}
            </h2>
            <p className="text-[15px] md:text-base text-brand-gray mb-4 md:mb-6 leading-relaxed">
              {description}
            </p>
            <div className="relative rounded-sm overflow-hidden border border-brand-border bg-brand-light aspect-[16/11] md:aspect-[16/8] shadow-sm">
              <iframe
                title={`Map of ${query} — area served by Adilay Roofing`}
                src={embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
            <div className="mt-3 flex justify-center md:justify-start">
              <a
                href={mapUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-red font-bold text-sm hover:underline"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                View Adilay Roofing on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
