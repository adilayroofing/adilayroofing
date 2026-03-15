import { company } from "@/data/company";
import { services } from "@/data/services";

const BASE_URL = "https://www.adilayroofing.com";

export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "@id": `${BASE_URL}/#organization`,
    name: company.name,
    legalName: company.legalName,
    description:
      "Philadelphia's #1 rated roofing contractor. Roof replacement, repair, flat roofing, shingles, siding, windows, gutters, and emergency services. Licensed, insured, 20+ years experience. Free estimates.",
    url: BASE_URL,
    telephone: company.phoneRaw,
    email: company.email,
    founder: {
      "@type": "Person",
      name: company.owner,
    },
    foundingLocation: "Philadelphia, PA",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 30,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      postalCode: company.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.9741,
      longitude: -75.1284,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    image: `${BASE_URL}/images/adilay-van-service-areas.jpg`,
    logo: `${BASE_URL}/images/logo-red-white.svg`,
    sameAs: [
      company.social.facebook,
      company.social.instagram,
      company.googleReviewsUrl,
    ].filter(Boolean),
    areaServed: [
      {
        "@type": "City",
        name: "Philadelphia",
        sameAs: "https://en.wikipedia.org/wiki/Philadelphia",
      },
      { "@type": "AdministrativeArea", name: "Bucks County, PA" },
      { "@type": "AdministrativeArea", name: "Montgomery County, PA" },
      { "@type": "AdministrativeArea", name: "Delaware County, PA" },
      { "@type": "AdministrativeArea", name: "Chester County, PA" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Roofing & Exterior Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          url: `${BASE_URL}/services/${service.slug}`,
        },
      })),
    },
    priceRange: "$$",
    paymentAccepted: "Cash, Check, Credit Card",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "41",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
