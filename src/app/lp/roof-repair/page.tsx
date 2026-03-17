import type { Metadata } from "next";
import LandingPageLayout from "@/components/LandingPageLayout";
import { getServiceBySlug } from "@/data/services";

const service = getServiceBySlug("roof-repair")!;

export const metadata: Metadata = {
  title: "Roof Repair in Philadelphia | Same-Day Service — Adilay Roofing",
  description:
    "Fast, affordable roof leak repair in Philadelphia. Same-day service available. 20+ years experience. Licensed PA184779. Free estimates — call (888) 823-4766.",
  robots: { index: false, follow: false },
};

export default function RoofRepairLP() {
  return (
    <LandingPageLayout
      headline="Roof Repair in Philadelphia"
      subheadline="Fast, Affordable Roof Leak Repair — Same-Day Service Available"
      heroImage="/images/roof-repair-philadelphia.jpg"
      defaultService="Roof Repair"
      serviceDescription="A small leak can become a big problem fast. Our licensed team responds quickly to diagnose the issue and fix it right — whether you're dealing with storm damage, a persistent leak, worn flashing, or deteriorating shingles. We repair all roof types, including asphalt shingle, flat rubber, and metal roofing systems."
      benefits={service.benefits}
      features={service.features}
      faqs={service.faq}
      primaryCtaText="Get Your FREE Quote"
      secondaryCtaText="Call (888) 823-4766"
      offerText="FREE Gutter Cleaning With Every Roof Replacement — Limited Time Offer"
      galleryImage="/images/crew-working.jpg"
      galleryImageAlt="Adilay Roofing crew performing roof repair in Philadelphia"
    />
  );
}
