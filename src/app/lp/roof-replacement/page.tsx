import type { Metadata } from "next";
import LandingPageLayout from "@/components/LandingPageLayout";
import { getServiceBySlug } from "@/data/services";

const service = getServiceBySlug("roof-replacement")!;

export const metadata: Metadata = {
  title: "Roof Replacement in Philadelphia | Free Estimate — Adilay Roofing",
  description:
    "Professional roof replacement in Philadelphia. 20+ years experience, 2,000+ projects. Free gutter cleaning included. Licensed PA184779. Call (267) 255-3620 for a free estimate.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.adilayroofing.com/lp/roof-replacement" },
};

export default function RoofReplacementLP() {
  return (
    <LandingPageLayout
      headline="Roof Replacement in Philadelphia"
      subheadline="Free Gutter Cleaning Included With Every Roof Replacement"
      heroImage="/images/roof-replacement-philadelphia.jpg"
      defaultService="Roof Replacement"
      serviceDescription="When repairs are no longer enough, a full roof replacement gives your property the protection it deserves. Our experienced crew handles the entire process — from carefully removing your existing roof down to the decking, to installing a brand-new roofing system with top-quality materials. We serve Philadelphia and the surrounding areas including Bucks County, Montgomery County, Delaware County, and Chester County."
      benefits={service.benefits}
      features={service.features}
      faqs={service.faq}
      primaryCtaText="Get Your FREE Quote"
      secondaryCtaText="Call (267) 255-3620"
      offerText="FREE Gutter Cleaning With Every Roof Replacement — Limited Time Offer"
      galleryImage="/images/adilay-crew-at-work.jpg"
      galleryImageAlt="Adilay Roofing crew completing a roof replacement in Philadelphia"
      showTransformation
    />
  );
}
