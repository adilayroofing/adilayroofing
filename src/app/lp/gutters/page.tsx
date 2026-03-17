import type { Metadata } from "next";
import LandingPageLayout from "@/components/LandingPageLayout";
import { getServiceBySlug } from "@/data/services";

const service = getServiceBySlug("gutters")!;

export const metadata: Metadata = {
  title:
    "Gutter Installation & Repair Philadelphia | Free Estimate — Adilay Roofing",
  description:
    "Professional gutter installation, repair & cleaning in Philadelphia. Seamless aluminum gutters. Free gutter cleaning with roof replacement. Call (888) 823-4766.",
  robots: { index: false, follow: false },
};

export default function GuttersLP() {
  return (
    <LandingPageLayout
      headline="Gutter Installation & Repair in Philadelphia"
      subheadline="Free Gutter Cleaning With Every Roof Replacement"
      heroImage="/images/gutters-philadelphia.png"
      defaultService="Gutter Installation & Repair"
      serviceDescription="Gutters are your home's first defense against water damage. When they're clogged, damaged, or improperly installed, water pools around your foundation and can cause serious structural problems. We specialize in seamless aluminum gutters custom-fabricated on-site to fit your home precisely, eliminating the joints that cause leaks."
      benefits={service.benefits}
      features={service.features}
      faqs={service.faq}
      primaryCtaText="Get Your FREE Quote"
      secondaryCtaText="Call (888) 823-4766"
      offerText="FREE Gutter Cleaning With Every Roof Replacement — Limited Time Offer"
      galleryImage="/images/quality-roofing-materials-adilay.jpg"
      galleryImageAlt="Quality gutter and roofing materials used by Adilay Roofing"
    />
  );
}
