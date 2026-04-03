import type { Metadata } from "next";
import Link from "next/link";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import ScrollReveal from "@/components/ScrollReveal";
import { getPageSEO, buildMetadataFromSEO, getStructuredContent } from "@/lib/seo";

const BASE_URL = "https://www.adilayroofing.com";

export const revalidate = 60;

// ---------------------------------------------------------------------------
// Dynamic metadata — CMS override with hardcoded fallback
// ---------------------------------------------------------------------------
export async function generateMetadata(): Promise<Metadata> {
  const dbSeo = await getPageSEO("/financing");
  if (dbSeo) {
    return {
      ...buildMetadataFromSEO(dbSeo),
      keywords: [
        "roof financing Philadelphia",
        "finance roof replacement Philadelphia",
        "Service Finance Company roofing",
        "roofing payment plan Philadelphia",
        "roof financing near me",
        "no money down roofing Philadelphia",
      ],
    };
  }

  return {
    title: "Roof Financing Philadelphia | Apply Today | Adilay Roofing",
    description:
      "Adilay Roofing offers flexible roof financing through Service Finance Company. Loans from $1,000\u2013$100,000. No payments until job is complete. Serving Philadelphia & surrounding counties.",
    keywords: [
      "roof financing Philadelphia",
      "finance roof replacement Philadelphia",
      "Service Finance Company roofing",
      "roofing payment plan Philadelphia",
      "roof financing near me",
      "no money down roofing Philadelphia",
    ],
    alternates: { canonical: `${BASE_URL}/financing` },
    openGraph: {
      title: "Roof Financing Philadelphia | Adilay Roofing",
      description:
        "Flexible roof financing through Service Finance Company. Loans from $1,000\u2013$100,000 with no payments until your project is complete.",
      url: `${BASE_URL}/financing`,
    },
  };
}

// ---------------------------------------------------------------------------
// Hardcoded fallback FAQs
// ---------------------------------------------------------------------------
const fallbackFinancingFaqs = [
  {
    question: "Does Adilay Roofing offer financing?",
    answer:
      "Yes! Adilay Roofing is an authorized contractor through Service Finance Company, LLC \u2014 a nationally licensed sales finance company and FHA Title I Lender. We offer a variety of loan products to help you finance your roofing or exterior project.",
  },
  {
    question: "What credit score do I need to finance a roof?",
    answer:
      "Service Finance Company works with a range of credit profiles. The best way to find out your options is to apply \u2014 checking your eligibility typically does not affect your credit score.",
  },
  {
    question: "Can I finance a roof if I have insurance?",
    answer:
      "Yes. Financing and insurance are separate. If your insurance doesn\u2019t cover the full cost of your roof, financing can help you cover the difference \u2014 or fund upgrades beyond what your policy pays for.",
  },
  {
    question: "How long does it take to get approved?",
    answer:
      "Credit decisions are often made the same day you apply. The process is quick and straightforward \u2014 you can apply online or over the phone.",
  },
  {
    question: "Is my home used as collateral for roof financing?",
    answer:
      "No. Loans through Service Finance Company are unsecured, meaning your home is not used as collateral. This provides peace of mind and a simpler process.",
  },
  {
    question: "Can I pay off my loan early?",
    answer:
      "Yes. There are no prepayment penalties, so you can pay off your loan early without any additional fees.",
  },
  {
    question: "What is the minimum and maximum loan amount?",
    answer:
      "Loans range from $1,000 to $100,000, depending on your project scope and credit profile.",
  },
];

// ---------------------------------------------------------------------------
// Hardcoded fallback content
// ---------------------------------------------------------------------------
const fallbackHeroHeadline = "Roof Financing in Philadelphia \u2014 Approved Through Service Finance Company";
const fallbackHeroDescription = "A new roof is one of the most important investments you can make in your home. Don\u2019t let cost stand in the way of protecting your family. With flexible financing through Service Finance Company, you can get the roof you need now \u2014 and pay over time with manageable monthly payments.";

const fallbackHowItWorks = [
  {
    step: "1",
    title: "Apply",
    description: "Fill out a quick application online or over the phone. It only takes a few minutes and checking your eligibility won\u2019t affect your credit score.",
  },
  {
    step: "2",
    title: "Get Approved",
    description: "Receive a fast credit decision \u2014 often the same day. Choose the loan product that works best for your budget.",
  },
  {
    step: "3",
    title: "We Start Work",
    description: "Once approved, we schedule your project. No payments are due until your job is complete.",
  },
];

const fallbackLoanOptions = [
  {
    title: "Same-as-Cash",
    description: "0% interest promotional period \u2014 pay off your balance within the promo window and pay zero interest. A great option if you want to spread payments over a few months.",
  },
  {
    title: "Fixed Monthly Payments",
    description: "Standard installment loans with fixed monthly payments over 5\u201310 year terms. Predictable payments that fit your budget \u2014 no surprises.",
  },
  {
    title: "Deferred Payment",
    description: "No payments until your project is complete. This stage-funding approach means you don\u2019t pay a cent until you\u2019re satisfied with the work.",
  },
];

const fallbackBenefits = [
  "Loans from $1,000 to $100,000",
  "50+ loan products to choose from",
  "Same-as-cash and 0% promotional options",
  "No payments until your job is complete",
  "Fast credit decisions \u2014 often same day",
  "No prepayment penalties",
  "Unsecured loans \u2014 home is not used as collateral",
  "Works with a range of credit profiles",
  "Available for roof replacement, repair, siding & more",
  "FHA Title I approved lender",
];

const fallbackTrustText = "Service Finance Company, LLC is a nationally licensed sales finance company and an approved FHA Title I Lender. With over 50 loan products and a track record of helping homeowners across the country, your financing is in trusted hands.";

const fallbackCtaHeadline = "Ready to Get Started?";
const fallbackCtaSubtext = "Apply for financing today, or contact us for a free estimate. We\u2019ll help you find the right payment option for your project.";

export default async function FinancingPage() {
  // Fetch CMS structured content (falls back to hardcoded if none)
  const cmsData = await getStructuredContent("/financing", "structured_financing");

  // Merge CMS data with hardcoded fallback
  const heroHeadline = (cmsData?.heroHeadline as string) || fallbackHeroHeadline;
  const heroDescription = (cmsData?.heroDescription as string) || fallbackHeroDescription;

  const cmsHowItWorks = cmsData?.howItWorks as { step: string; title: string; description: string }[] | undefined;
  const howItWorks = cmsHowItWorks?.length ? cmsHowItWorks : fallbackHowItWorks;

  const cmsLoanOptions = cmsData?.loanOptions as { title: string; description: string }[] | undefined;
  const loanOptions = cmsLoanOptions?.length ? cmsLoanOptions : fallbackLoanOptions;

  const cmsBenefits = cmsData?.benefits as string[] | undefined;
  const benefits = cmsBenefits?.length ? cmsBenefits : fallbackBenefits;

  const trustText = (cmsData?.trustText as string) || fallbackTrustText;

  const cmsFaqs = cmsData?.faq as { question: string; answer: string }[] | undefined;
  const financingFaqs = cmsFaqs?.length ? cmsFaqs : fallbackFinancingFaqs;

  const ctaHeadline = (cmsData?.ctaHeadline as string) || fallbackCtaHeadline;
  const ctaSubtext = (cmsData?.ctaSubtext as string) || fallbackCtaSubtext;

  const bottomCtaHeadline = (cmsData?.bottomCtaHeadline as string) || "Protect Your Home Today";
  const bottomCtaSubtext = (cmsData?.bottomCtaSubtext as string) || "Don\u2019t let cost hold you back. Finance your roofing project with Adilay Roofing and Service Finance Company. No payments until your job is complete.";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: financingFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbJsonLd
        items={[{ name: "Financing", path: "/financing" }]}
      />

      {/* ================================================================= */}
      {/* Hero Section                                                      */}
      {/* ================================================================= */}
      <section className="relative overflow-hidden bg-brand-darker">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/90 to-brand-darker" />
        <div className="relative section-padding">
          <div className="container-narrow mx-auto text-center">
            <ScrollReveal delay={200} duration={600} distance={28}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                {heroHeadline}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={400} duration={600} distance={20}>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-8 leading-relaxed">
                {heroDescription}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={550} duration={600} distance={16}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="btn-primary w-full sm:w-auto">
                  Apply for Financing
                </Link>
                <Link href="/get-quote" className="btn-outline-white w-full sm:w-auto">
                  Get a Free Estimate
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* How It Works                                                      */}
      {/* ================================================================= */}
      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto">
          <ScrollReveal>
            <h2 className="section-heading text-center mb-10">How It Works</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {howItWorks.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 120} distance={20}>
                <div className="text-center">
                  <span className="inline-flex items-center justify-center w-14 h-14 bg-brand-red text-white font-bold text-xl rounded-full mb-4">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-brand-gray leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Loan Options                                                      */}
      {/* ================================================================= */}
      <section className="section-padding bg-brand-light">
        <div className="container-narrow mx-auto">
          <ScrollReveal>
            <h2 className="section-heading text-center mb-10">
              Financing Options
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {loanOptions.map((option, i) => {
              // Icons stay hardcoded (design) — mapped by index
              const loanIcons = [
                <svg key="0" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>,
                <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>,
                <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>,
              ];
              return (
                <ScrollReveal key={option.title} delay={i * 100} distance={20}>
                  <div className="bg-white rounded-sm border border-brand-border p-6 h-full">
                    <div className="text-brand-red mb-4">{loanIcons[i] || loanIcons[0]}</div>
                    <h3 className="text-lg font-bold text-brand-dark mb-2">
                      {option.title}
                    </h3>
                    <p className="text-brand-gray text-sm leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal delay={300}>
            <div className="text-center mt-8">
              <p className="text-brand-gray text-sm">
                50+ loan products available. Loans from{" "}
                <strong>$1,000 to $100,000</strong>. No prepayment penalties.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Why Finance With Us                                               */}
      {/* ================================================================= */}
      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto">
          <ScrollReveal>
            <h2 className="section-heading text-center mb-10">
              Why Finance Your Roof With Adilay?
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-start gap-3 bg-brand-light rounded-sm p-4 border border-brand-border"
              >
                <svg
                  className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-brand-dark font-medium text-sm">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Trust Block                                                       */}
      {/* ================================================================= */}
      <section className="bg-brand-dark py-10 md:py-16">
        <div className="container-narrow mx-auto text-center px-4">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider mb-4">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Trusted Lender
            </div>
            <p className="text-white text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {trustText}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* FAQ Section                                                       */}
      {/* ================================================================= */}
      <section className="section-padding bg-brand-light">
        <div className="container-narrow mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="section-heading text-center mb-10">
              Roof Financing FAQ
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <FAQ items={financingFaqs} />
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* CTA Section                                                       */}
      {/* ================================================================= */}
      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto text-center">
          <ScrollReveal>
            <h2 className="section-heading mb-4">
              {ctaHeadline}
            </h2>
            <p className="text-brand-gray text-lg max-w-2xl mx-auto mb-8">
              {ctaSubtext}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary w-full sm:w-auto">
                Apply for Financing
              </Link>
              <Link href="/get-quote" className="btn-secondary w-full sm:w-auto">
                Get a Free Estimate
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Bottom CTA                                                        */}
      {/* ================================================================= */}
      <CTASection
        headline={bottomCtaHeadline}
        subtext={bottomCtaSubtext}
      />
    </>
  );
}
