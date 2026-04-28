import { company } from "@/data/company";
import { services } from "@/data/services";
import {
  AREA_SERVED,
  BASE_URL,
  GEO,
  HAS_CREDENTIAL,
  OPENING_HOURS,
  ORG_ID,
  ORG_IMAGE,
  ORG_LOGO,
  POSTAL_ADDRESS,
  SAME_AS,
  WEBSITE_ID,
} from "@/lib/schema";

export default function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "@id": ORG_ID,
    name: company.name,
    legalName: company.legalName,
    description:
      "Philadelphia's trusted roofing contractor. Roof replacement, repair, flat roofing, shingles, siding, windows, gutters, and emergency services. Licensed PA184779, insured, 20+ years experience. Free estimates.",
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
    address: POSTAL_ADDRESS,
    geo: GEO,
    hasMap: company.mapUrl,
    openingHoursSpecification: OPENING_HOURS,
    image: ORG_IMAGE,
    logo: {
      "@type": "ImageObject",
      "@id": `${BASE_URL}/#logo`,
      url: ORG_LOGO,
      contentUrl: ORG_LOGO,
      caption: company.legalName,
    },
    sameAs: SAME_AS,
    areaServed: AREA_SERVED,
    hasCredential: HAS_CREDENTIAL,
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
    currenciesAccepted: "USD",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "41",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: BASE_URL,
    name: company.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, website],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
