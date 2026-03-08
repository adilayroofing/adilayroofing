import { company } from "@/data/company";
import { services } from "@/data/services";

export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "@id": "https://www.adilayroofing.com",
    name: company.name,
    description:
      "Professional roofing contractor in Philadelphia, PA. Roof replacement, repair, flat roofing, siding, windows & gutters. Licensed PA184779, 20+ years experience.",
    url: "https://www.adilayroofing.com",
    telephone: company.phone,
    email: company.email,
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
      latitude: 39.9784,
      longitude: -75.1285,
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
    image: "https://www.adilayroofing.com/images/adilay-van-service-areas.jpg",
    logo: "https://www.adilayroofing.com/images/logo-red-white.svg",
    sameAs: [
      company.social.facebook,
      company.social.instagram,
    ].filter(Boolean),
    areaServed: company.serviceAreas.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Roofing Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
      })),
    },
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
