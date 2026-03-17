import type { Metadata } from "next";
import LandingPageLayout from "@/components/LandingPageLayout";
import { getServiceBySlug } from "@/data/services";

const service = getServiceBySlug("emergency-roof-repair")!;

export const metadata: Metadata = {
  title: "Emergency Roof Repair 24/7 Philadelphia — Adilay Roofing",
  description:
    "24/7 emergency roof repair in Philadelphia. Storm damage? Leaking roof? We respond fast. Licensed PA184779, fully insured. Call now (888) 823-4766.",
  robots: { index: false, follow: false },
};

export default function EmergencyLP() {
  return (
    <LandingPageLayout
      headline="Emergency Roof Repair — 24/7"
      subheadline="Storm Damage? Leaking Roof? We're Here Now."
      heroImage="/images/emergency-roof-repair-philadelphia.jpg"
      defaultService="Emergency Roof Repair"
      isEmergency={true}
      serviceDescription="When a roofing emergency strikes — whether it's a violent storm that rips off shingles, a tree limb that crashes through your roof, or an active leak pouring water into your home — you need a roofing contractor who responds fast. We provide 24/7 emergency roof repair, equipped to handle urgent situations quickly to minimize damage to your home and belongings."
      benefits={service.benefits}
      features={service.features}
      faqs={service.faq}
      primaryCtaText="Call Now (888) 823-4766"
      secondaryCtaText="Request Emergency Service"
      offerText="FREE Emergency Roof Estimate — Same-Day Response Available"
      submitButtonText="Request Emergency Service"
      galleryImage="/images/adilay-safety-crew.jpg"
      galleryImageAlt="Adilay Roofing emergency crew ready for rapid response"
    />
  );
}
