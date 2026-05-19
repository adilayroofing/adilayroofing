import type { NextConfig } from "next";

// Cloudinary config is read at module-load time. Restart dev server when
// NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME changes — env reloads alone don't
// re-evaluate this file.
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://192.168.68.57:3000", "http://localhost:3000"],
  images: {
    // When CLOUD_NAME is set, route every <Image src="/images/..."> through
    // Cloudinary. The loader file (src/lib/cloudinary.ts) prefixes the folder
    // and adds f_auto,q_auto for per-request format/quality optimization.
    ...(cloudName
      ? { loader: "custom", loaderFile: "./src/lib/cloudinary.ts" }
      : {}),
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async redirects() {
    const cloudinaryFolder =
      process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || "adilayroofing";
    const cloudinaryRedirects = cloudName
      ? [
          // /images/foo.jpg → res.cloudinary.com/<cloud>/image/upload/f_auto,q_auto/<folder>/images/foo.jpg
          // 308 Permanent Redirect; browsers cache aggressively, so the hop
          // only happens on first visit. Keeps the codebase free of hardcoded
          // CDN URLs while still serving every image from Cloudinary.
          {
            source: "/images/:path*",
            destination: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${cloudinaryFolder}/images/:path*`,
            permanent: true,
          },
        ]
      : [];
    return [
      ...cloudinaryRedirects,
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
      // Service consolidation (2026-05) — 6 near-duplicate service pages
      // merged into their canonical survivor. Each cluster (Google indexed one
      // page and ignored the rest) collapses to fewer, stronger pages. The
      // 301s pass ranking equity to the survivor.
      // ======================================================================
      {
        source: "/services/asphalt-shingle-roofing",
        destination: "/services/shingle-roofing",
        permanent: true,
      },
      {
        source: "/services/shingle-replacement",
        destination: "/services/shingle-roofing",
        permanent: true,
      },
      {
        source: "/services/commercial-siding",
        destination: "/services/siding-installation",
        permanent: true,
      },
      {
        source: "/services/residential-siding",
        destination: "/services/siding-installation",
        permanent: true,
      },
      {
        source: "/services/window-companies",
        destination: "/services/window-installation",
        permanent: true,
      },
      {
        source: "/services/window-replacement",
        destination: "/services/window-installation",
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
      { source: "/checkout", destination: "/", permanent: true },
      { source: "/checkout/:path*", destination: "/", permanent: true },
      { source: "/checkout-2", destination: "/", permanent: true },
      { source: "/checkout-2/:path*", destination: "/", permanent: true },
      { source: "/cart", destination: "/", permanent: true },
      { source: "/cart/:path*", destination: "/", permanent: true },
      { source: "/my-account", destination: "/", permanent: true },
      { source: "/my-account/:path*", destination: "/", permanent: true },

      // Default WordPress placeholder pages — surfaced in GSC "Crawled, not
      // indexed". Send to home so Google drops them on next recrawl.
      { source: "/sample-page", destination: "/", permanent: true },
      { source: "/sample-page/:path*", destination: "/", permanent: true },
      { source: "/hello-world", destination: "/blog", permanent: true },

      { source: "/test", destination: "/", permanent: true },
      { source: "/test/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
