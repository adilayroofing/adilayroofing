import { company } from "@/data/company";

export const BASE_URL = "https://www.adilayroofing.com";

export const ORG_ID = `${BASE_URL}/#organization`;
export const ORG_REF = { "@id": ORG_ID } as const;

export const WEBSITE_ID = `${BASE_URL}/#website`;

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  copy: "©",
  reg: "®",
  trade: "™",
  deg: "°",
};

export function decodeEntities(text: string): string {
  if (!text) return text;
  return text
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16))
    )
    .replace(/&#(\d+);/g, (_, dec) =>
      String.fromCodePoint(parseInt(dec, 10))
    )
    .replace(/&([a-zA-Z]+);/g, (match, name) =>
      Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, name)
        ? NAMED_ENTITIES[name]
        : match
    );
}

export function stripHtml(text: string): string {
  if (!text) return text;
  return decodeEntities(text.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
}

export const AREA_SERVED = [
  {
    "@type": "City",
    name: "Philadelphia",
    sameAs: "https://en.wikipedia.org/wiki/Philadelphia",
  },
  { "@type": "AdministrativeArea", name: "Bucks County, PA" },
  { "@type": "AdministrativeArea", name: "Montgomery County, PA" },
  { "@type": "AdministrativeArea", name: "Delaware County, PA" },
  { "@type": "AdministrativeArea", name: "Chester County, PA" },
] as const;

export const POSTAL_ADDRESS = {
  "@type": "PostalAddress" as const,
  streetAddress: company.address.street,
  addressLocality: company.address.city,
  addressRegion: company.address.state,
  postalCode: company.address.zip,
  addressCountry: "US",
};

export const GEO = {
  "@type": "GeoCoordinates" as const,
  latitude: 39.9812,
  longitude: -75.1324,
};

export const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification" as const,
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
  {
    "@type": "OpeningHoursSpecification" as const,
    dayOfWeek: ["Saturday"],
    opens: "00:00",
    closes: "00:00",
  },
];

export const HAS_CREDENTIAL = {
  "@type": "EducationalOccupationalCredential" as const,
  credentialCategory: "license",
  name: "Pennsylvania Home Improvement Contractor (HIC) Registration",
  identifier: company.license,
  recognizedBy: {
    "@type": "GovernmentOrganization" as const,
    name: "Pennsylvania Office of Attorney General — Bureau of Consumer Protection",
    url: "https://www.attorneygeneral.gov/protect-yourself/hicsearch/",
  },
};

export const SAME_AS = [
  "https://share.google/xFBJQJ5Gak5Us9xmy",
  "https://www.bbb.org/us/pa/philadelphia/profile/roofing-contractors/adilay-roofing-llc-0241-236104655",
  company.social.facebook,
  company.social.instagram,
].filter(Boolean);

export const ORG_LOGO = `${BASE_URL}/images/logo-red-white.svg`;
export const ORG_IMAGE = `${BASE_URL}/images/adilay-van-service-areas.jpg`;

export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data);
}
