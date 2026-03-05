import type { MetadataRoute } from "next";

// TODO: replace with production domain
const BASE_URL = "https://www.adilayroofing.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
