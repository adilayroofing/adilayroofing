import type { Metadata } from "next";

const BASE_URL = "https://www.adilayroofing.com";

export const metadata: Metadata = {
  title: "Get Your FREE Roofing Estimate | Adilay Roofing Philadelphia",
  description:
    "Request your free, no-obligation roofing estimate from Adilay Roofing. Free gutter cleaning with every roof replacement. Serving Philadelphia & surrounding counties. Call (267) 255-3620.",
  alternates: { canonical: `${BASE_URL}/get-quote-ads` },
  openGraph: {
    title: "Get Your FREE Roofing Estimate — Adilay Roofing",
    description:
      "No obligation. No pressure. Free gutter cleaning with every roof replacement. Serving Philadelphia, Bucks, Montgomery, Delaware & Chester Counties.",
    url: `${BASE_URL}/get-quote-ads`,
  },
};

export default function GetQuoteAdsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
