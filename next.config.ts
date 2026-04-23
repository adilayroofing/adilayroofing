import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://192.168.68.57:3000", "http://localhost:3000"],
  async redirects() {
    return [
      // ======================================================================
      // CANONICAL HOST — 301 every non-www request to the www apex
      // Consolidates split SEO authority between adilayroofing.com and
      // www.adilayroofing.com (GSC shows both versions indexed separately).
      // ======================================================================
      {
        source: "/:path*",
        has: [{ type: "host", value: "adilayroofing.com" }],
        destination: "https://www.adilayroofing.com/:path*",
        permanent: true,
      },

      // ======================================================================
      // Existing service-slug cleanups (kept)
      // ======================================================================
      {
        source: "/services/siding",
        destination: "/services/siding-installation",
        permanent: true,
      },
      {
        source: "/services/windows",
        destination: "/services/window-installation",
        permanent: true,
      },
      {
        source: "/services/gutters",
        destination: "/services/gutter-repair",
        permanent: true,
      },

      // ======================================================================
      // Legacy WordPress URLs — preserve ranking equity by mapping to nearest
      // live equivalent on the new site. Source URLs come from GSC Pages data.
      // ======================================================================

      // Legacy services hub
      { source: "/service-details", destination: "/services", permanent: true },
      { source: "/service-details/:path*", destination: "/services", permanent: true },

      // Legacy contact
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/contact-us/:path*", destination: "/contact", permanent: true },

      // Legacy team pages
      { source: "/team", destination: "/about", permanent: true },
      { source: "/team-details", destination: "/about", permanent: true },
      { source: "/team-details/:path*", destination: "/about", permanent: true },

      // Legacy /location/* → /service-areas/*
      {
        source: "/location/philadelphia",
        destination: "/service-areas/philadelphia",
        permanent: true,
      },
      {
        source: "/location/manayunk",
        destination: "/service-areas/manayunk",
        permanent: true,
      },
      {
        source: "/location/lansdale",
        destination: "/service-areas/lansdale",
        permanent: true,
      },
      {
        source: "/location/king-of-prussia",
        destination: "/service-areas/king-of-prussia",
        permanent: true,
      },
      // Catch-all for any other /location/:slug we don't have a page for
      {
        source: "/location/:slug*",
        destination: "/service-areas",
        permanent: true,
      },

      // Legacy standalone town URL (trenton page not yet built — send to index)
      { source: "/trenton", destination: "/service-areas", permanent: true },

      // Legacy WordPress blog archive permalinks (YYYY/MM/slug/)
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:slug*",
        destination: "/blog",
        permanent: true,
      },

      // Legacy WordPress tag archives
      { source: "/tag/:slug*", destination: "/blog", permanent: true },

      // Dead WooCommerce / junk paths
      { source: "/shop", destination: "/", permanent: true },
      { source: "/shop/:path*", destination: "/", permanent: true },
      { source: "/wishlist", destination: "/", permanent: true },
      { source: "/wishlist/:path*", destination: "/", permanent: true },
      { source: "/test", destination: "/", permanent: true },
      { source: "/test/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
