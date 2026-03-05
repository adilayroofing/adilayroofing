import { company } from "@/data/company";
import { services } from "@/data/services";

export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.adilayroofing.com", // TODO: confirm production URL
    name: company.name,
    description: company.description,
    url: "https://www.adilayroofing.com", // TODO: confirm production URL
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
      // TODO: confirm exact lat/long for business address
      latitude: 39.9784,
      longitude: -75.1285,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "14:00",
      },
    ],
    // TODO: Add actual logo URL once available
    image: "https://www.adilayroofing.com/logo.png",
    // TODO: Add actual logo URL once available
    logo: "https://www.adilayroofing.com/logo.png",
    sameAs: [
      company.social.facebook,
      company.social.instagram,
      // TODO: add other social profiles when confirmed
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
    // TODO: Add aggregateRating once review data is available
    // aggregateRating: {
    //   "@type": "AggregateRating",
    //   ratingValue: "4.9",
    //   reviewCount: "150",
    // },
    priceRange: "$$", // TODO: confirm price range indicator
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
