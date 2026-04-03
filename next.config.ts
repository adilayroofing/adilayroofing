import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://192.168.68.57:3000", "http://localhost:3000"],
  async redirects() {
    return [
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
    ];
  },
};

export default nextConfig;
