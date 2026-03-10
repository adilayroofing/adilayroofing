import type { Metadata } from "next";
import Link from "next/link";
import { faqs } from "@/data/faqs";
import { company } from "@/data/company";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";

const BASE_URL = "https://www.adilayroofing.com";

export const metadata: Metadata = {
  title: "Roofing FAQ — Common Questions Answered | Philadelphia Roofers",
  description:
    "Answers to common roofing questions about costs, timelines, insurance claims, and materials. Expert answers from Adilay Roofing, Philadelphia's trusted contractor.",
  keywords: [
    "roofing FAQ",
    "roof replacement questions",
    "roofing cost Philadelphia",
    "how long does roof replacement take",
    "roofing insurance claims Philadelphia",
  ],
  alternates: { canonical: `${BASE_URL}/faq` },
  openGraph: {
    title: "Roofing FAQ — Answers from Philadelphia's Trusted Roofer",
    description:
      "Common questions about roofing services, costs, timelines, insurance, and more — answered by Adilay Roofing experts.",
    url: `${BASE_URL}/faq`,
  },
};

const areaFaqs = [
  {
    question: `What neighborhoods in Philadelphia do you cover?`,
    answer:
      "We serve all of Philadelphia — from Northeast Philly and Kensington to Center City, South Philly, Germantown, and everywhere in between. If you're in the greater Philadelphia area, we can help.",
  },
  {
    question: `Do you serve outside of Philadelphia?`,
    answer: `Yes! In addition to Philadelphia, we serve Bucks County, Montgomery County, Delaware County, and Chester County. This includes towns like Norristown, Cheltenham, Abington, Jenkintown, and many more across southeastern Pennsylvania.`,
  },
  {
    question: `Is there an extra charge for jobs outside of the city?`,
    answer:
      "No. Our pricing is based on the scope of work, not your location. Whether you're in Philadelphia or a surrounding county, you'll receive the same honest pricing.",
  },
];

const processFaqs = [
  {
    question: "What happens after I request a quote?",
    answer:
      "Once you submit a quote request, our team will reach out within 24 hours to schedule a convenient time for a free inspection. We'll assess your property, discuss your needs, and provide a clear, written estimate — no pressure, no obligation.",
  },
  {
    question: "How do I prepare for a roof replacement?",
    answer:
      "We handle most of the prep work, but we recommend moving vehicles away from the house, securing loose items in the attic, and letting your neighbors know about the upcoming work. Our crew will protect your landscaping and clean up thoroughly when the job is done.",
  },
  {
    question: "Do I need to be home during the work?",
    answer:
      "You don't need to be home for the entire project, but we ask that you're available at the start and end of each workday so we can go over progress and answer any questions. We'll keep you updated throughout.",
  },
];

const allFaqs = [...faqs, ...areaFaqs, ...processFaqs];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero */}
      <section className="bg-brand-dark">
        <div className="section-padding">
          <div className="container-narrow mx-auto text-center">
            <span className="inline-block text-brand-red font-bold text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4">
              FAQ
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto">
              Have questions about roofing, our process, or your project? Find
              answers below, or{" "}
              <Link
                href="/contact"
                className="text-brand-red hover:text-brand-red-dark underline underline-offset-2"
              >
                contact us
              </Link>{" "}
              directly.
            </p>
          </div>
        </div>
      </section>

      {/* General FAQs */}
      <section className="bg-white">
        <div className="section-padding">
          <div className="container-narrow mx-auto">
            <h2 className="text-xl md:text-3xl font-bold text-brand-dark mb-2 md:mb-4">
              General Questions
            </h2>
            <p className="text-brand-gray text-sm md:text-base mb-6 md:mb-8">
              The most common questions we get from homeowners and businesses.
            </p>
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* Service Area FAQs */}
      <section className="bg-brand-light">
        <div className="section-padding">
          <div className="container-narrow mx-auto">
            <h2 className="text-xl md:text-3xl font-bold text-brand-dark mb-2 md:mb-4">
              Service Area Questions
            </h2>
            <p className="text-brand-gray text-sm md:text-base mb-6 md:mb-8">
              We proudly serve Philadelphia and surrounding counties in
              southeastern Pennsylvania.
            </p>
            <FAQAccordion items={areaFaqs} />

            {/* Area tags */}
            <div className="mt-6 md:mt-8 flex flex-wrap gap-2">
              {company.serviceAreas.map((area) => (
                <span
                  key={area}
                  className="px-3 py-1.5 bg-white border border-brand-border rounded-sm text-xs md:text-sm text-brand-dark font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process FAQs */}
      <section className="bg-white">
        <div className="section-padding">
          <div className="container-narrow mx-auto">
            <h2 className="text-xl md:text-3xl font-bold text-brand-dark mb-2 md:mb-4">
              Our Process
            </h2>
            <p className="text-brand-gray text-sm md:text-base mb-6 md:mb-8">
              What to expect when you work with Adilay Roofing.
            </p>
            <FAQAccordion items={processFaqs} />
          </div>
        </div>
      </section>

      {/* Still have questions */}
      <section className="bg-brand-light">
        <div className="py-10 md:py-16 px-4">
          <div className="container-narrow mx-auto text-center">
            <h2 className="text-xl md:text-3xl font-bold text-brand-dark mb-3 md:mb-4">
              Still Have Questions?
            </h2>
            <p className="text-brand-gray text-sm md:text-base mb-6 md:mb-8 max-w-lg mx-auto">
              We&apos;re here to help. Reach out and we&apos;ll get back to you
              within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <Link href="/contact" className="btn-primary w-full sm:w-auto">
                Contact Us
              </Link>
              <a
                href={`tel:${company.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 md:py-4 border-2 border-brand-dark text-brand-dark font-bold rounded-sm hover:bg-brand-dark hover:text-white transition-colors text-sm md:text-base w-full sm:w-auto"
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call {company.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
