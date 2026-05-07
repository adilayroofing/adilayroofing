import type { Metadata } from "next";
import LandingPageLayout from "@/components/LandingPageLayout";
import { getServiceBySlug } from "@/data/services";

const service = getServiceBySlug("roof-repair")!;

export const metadata: Metadata = {
  title:
    "Free Roof Inspection Philadelphia | No Cost, No Obligation — Adilay Roofing",
  description:
    "Free roof inspection in Philadelphia. Know your roof's condition with no cost and no obligation. Licensed PA184779. Call (267) 255-3620 to schedule.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.adilayroofing.com/lp/free-inspection" },
};

export default function FreeInspectionLP() {
  return (
    <LandingPageLayout
      headline="Free Roof Inspection in Philadelphia"
      subheadline="Know Your Roof's Condition — No Cost, No Obligation"
      heroImage="/images/roof-replacement-philadelphia.jpg"
      defaultService="Free Roof Inspection"
      serviceDescription="Don't wait for a small problem to become a costly emergency. Our free roof inspection gives you a clear, honest assessment of your roof's condition — no pressure, no obligation. Our licensed inspectors will check for damage, wear, ventilation issues, and potential problem areas, then provide you with a detailed report and recommendations."
      benefits={[
        "Completely free, no-obligation inspection",
        "Honest assessment — we'll tell you if your roof is fine",
        "Detailed written report of findings",
        "Catch small problems before they become expensive repairs",
        "Licensed and insured inspectors (PA184779)",
        "Serving Philadelphia and surrounding counties",
      ]}
      features={[
        "Complete exterior roof surface inspection",
        "Flashing and vent boot condition check",
        "Gutter and drainage assessment",
        "Attic ventilation evaluation",
        "Shingle/membrane wear analysis",
        "Written condition report with photos",
      ]}
      faqs={[
        {
          question: "What does a free roof inspection include?",
          answer:
            "Our free roof inspection includes a thorough examination of your roof's surface, flashing, vents, gutters, and drainage. We check for storm damage, wear patterns, ventilation issues, and potential leak points. You'll receive a written report with our findings and honest recommendations.",
        },
        {
          question: "How long does a roof inspection take?",
          answer:
            "Most residential roof inspections take 30–60 minutes depending on the size and complexity of your roof. We'll schedule a time that works for you and provide our findings on the spot.",
        },
        {
          question: "Is there really no cost or obligation?",
          answer:
            "Absolutely. Our roof inspection is 100% free with no strings attached. If your roof is in good shape, we'll tell you. If we find issues, we'll explain your options and provide a quote — but there's never any pressure to proceed.",
        },
      ]}
      primaryCtaText="Schedule Free Inspection"
      secondaryCtaText="Call (267) 255-3620"
      offerText="FREE Gutter Cleaning With Every Roof Replacement — Limited Time Offer"
      submitButtonText="Schedule My Free Inspection"
      galleryImage="/images/experienced-crew-adilay-roofing-philadelphia.jpg"
      galleryImageAlt="Experienced Adilay Roofing crew inspecting a roof in Philadelphia"
    />
  );
}
