import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Service Areas",
  description: `${company.name} serves the greater Philadelphia region including Pennsylvania and New Jersey. Professional roofing services in Bucks County, Montgomery County, Delaware County, Chester County, Camden County, Burlington County, and more.`,
};

// TODO: Confirm all service area cities/counties with the client
const paAreas = [
  {
    name: "Philadelphia",
    note: "Our Home Base",
    description:
      "Full roofing services across all Philadelphia neighborhoods including Center City, Northeast, South Philly, Kensington, and more.",
  },
  {
    name: "Bucks County",
    description:
      "Serving Levittown, Bensalem, Doylestown, Newtown, Langhorne, and surrounding communities.",
  },
  {
    name: "Montgomery County",
    description:
      "Roofing services in Norristown, King of Prussia, Lansdale, Conshohocken, Ambler, and nearby areas.",
  },
  {
    name: "Delaware County",
    description:
      "Covering Media, Drexel Hill, Springfield, Upper Darby, Havertown, and the surrounding region.",
  },
  {
    name: "Chester County",
    description:
      "Professional roofing in West Chester, Downingtown, Phoenixville, Coatesville, and nearby towns.",
  },
];

// TODO: Confirm all service area cities/counties with the client
const njAreas = [
  {
    name: "Camden County",
    description:
      "Serving Cherry Hill, Haddonfield, Voorhees, Collingswood, Camden, and surrounding areas.",
  },
  {
    name: "Burlington County",
    description:
      "Covering Mount Laurel, Moorestown, Marlton, Medford, and nearby communities.",
  },
  {
    name: "Gloucester County",
    description:
      "Roofing services in Washington Township, Deptford, Woodbury, Glassboro, and the surrounding area.",
  },
  {
    name: "South Jersey",
    description:
      "Extended coverage across additional South Jersey communities. Contact us to confirm availability in your area.",
  },
];

const localBenefits = [
  {
    title: "Fast Response Times",
    description:
      "We're nearby and can respond quickly to emergencies and scheduled work alike.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "Local Knowledge",
    description:
      "We understand Philadelphia's weather patterns, building codes, and common roofing challenges.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
        />
      </svg>
    ),
  },
  {
    title: "Community Reputation",
    description:
      "We've built our business on referrals from satisfied neighbors. Our reputation matters to us.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
];

// Map pin icon used for area cards
function MapPinIcon() {
  return (
    <svg
      className="w-6 h-6 text-brand-red flex-shrink-0"
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
  );
}

export default function ServiceAreasPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-brand-dark overflow-hidden">
        <img
          src="/images/adilay-van-jobsite.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[65%_65%]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative section-padding">
          <div className="container-narrow mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Areas We Serve
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              Professional roofing services across Pennsylvania and New Jersey.
              Wherever you are in the greater Philadelphia region, we&apos;ve
              got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section>
        <div className="section-padding">
          <div className="container-narrow mx-auto">
            <div className="text-center mb-16">
              <h2 className="section-heading">
                Trusted Roofing Services Across the Philadelphia Region
              </h2>
              <p className="section-subheading mx-auto mt-4">
                From our home base in Philadelphia, we serve homeowners and
                businesses throughout the greater Philadelphia area &mdash;
                including communities across Pennsylvania and New Jersey. No
                matter where you are, you get the same quality workmanship and
                dedicated service.
              </p>
            </div>

            {/* Pennsylvania Areas */}
            <div className="mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-8 flex items-center gap-3">
                <span className="w-10 h-1 bg-brand-red inline-block" />
                Pennsylvania
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paAreas.map((area) => (
                  <div
                    key={area.name}
                    className="border border-brand-border rounded-sm p-6 hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <MapPinIcon />
                      <div>
                        <h4 className="text-lg font-bold text-brand-dark">
                          {area.name}
                        </h4>
                        {area.note && (
                          <span className="inline-block text-xs font-semibold text-brand-red bg-brand-red/10 px-2 py-0.5 rounded-sm mt-1">
                            {area.note}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-brand-gray text-sm leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* New Jersey Areas */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-8 flex items-center gap-3">
                <span className="w-10 h-1 bg-brand-red inline-block" />
                New Jersey
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {njAreas.map((area) => (
                  <div
                    key={area.name}
                    className="border border-brand-border rounded-sm p-6 hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <MapPinIcon />
                      <h4 className="text-lg font-bold text-brand-dark">
                        {area.name}
                      </h4>
                    </div>
                    <p className="text-brand-gray text-sm leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Local Matters Section */}
      <section className="bg-brand-light">
        <div className="section-padding">
          <div className="container-narrow mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-heading">
                Why Hiring a Local Roofer Matters
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {localBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-red/10 text-brand-red mb-5">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-brand-gray text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection headline="Need a Roofer in Your Area?" />
    </>
  );
}
