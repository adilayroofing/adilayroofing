import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/data/company";

const BASE_URL = "https://www.adilayroofing.com";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${company.name}. Review the terms and conditions governing the use of our website and roofing services in Philadelphia, PA.`,
  alternates: { canonical: `${BASE_URL}/terms` },
  robots: { index: true, follow: true },
};

export default function TermsOfServicePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-dark text-white py-16 md:py-20">
        <div className="container-wide mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black">
            Terms of Service
          </h1>
          <p className="mt-4 text-white/70 text-lg max-w-2xl mx-auto">
            Please read these terms carefully before using our website or
            engaging our roofing services.
          </p>
          <p className="mt-3 text-white/50 text-sm">
            Last updated: March 8, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-12 md:py-16">
        <div className="container-wide mx-auto px-4 max-w-3xl">
          <div className="space-y-10 text-brand-dark/90 leading-relaxed">
            {/* 1 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using the {company.name} website
                (www.adilayroofing.com) or engaging our roofing services, you
                agree to be bound by these Terms of Service. If you do not agree
                with any part of these terms, please do not use our website or
                services.
              </p>
            </div>

            {/* 2 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-3">
                2. About Our Company
              </h2>
              <p>
                {company.legalName} is a licensed home improvement contractor
                registered in the Commonwealth of Pennsylvania (License #
                {company.license}). We provide roofing, siding, window, and
                gutter services in Philadelphia and surrounding counties
                including Bucks, Montgomery, Delaware, and Chester counties.
              </p>
            </div>

            {/* 3 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-3">
                3. Services and Estimates
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-brand-gray">
                <li>
                  <strong className="text-brand-dark">Free Estimates:</strong>{" "}
                  We offer free on-site inspections and estimates at no
                  obligation. Estimates are valid for 30 days from the date
                  issued unless otherwise stated in writing.
                </li>
                <li>
                  <strong className="text-brand-dark">Scope of Work:</strong>{" "}
                  All roofing projects are governed by a written contract that
                  outlines the scope of work, materials, timeline, and cost.
                  Work will not begin until a signed contract is in place.
                </li>
                <li>
                  <strong className="text-brand-dark">Price Changes:</strong>{" "}
                  Estimates may be subject to change if the actual condition of
                  the roof differs from the initial assessment (e.g., hidden
                  water damage, rotted decking). Any additional costs will be
                  communicated and approved by you before work proceeds.
                </li>
                <li>
                  <strong className="text-brand-dark">Permits:</strong> Where
                  required by Pennsylvania or local municipal codes,{" "}
                  {company.name} will obtain the necessary permits for roofing
                  work. Permit fees may be included in the project cost.
                </li>
              </ul>
            </div>

            {/* 4 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-3">
                4. Payment Terms
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-brand-gray">
                <li>
                  Payment terms are outlined in the signed project contract.
                  Typical terms include a deposit upon signing and final payment
                  upon completion of work.
                </li>
                <li>
                  In accordance with the Pennsylvania Home Improvement Consumer
                  Protection Act, we will never require more than one-third
                  (1/3) of the contract price as an initial deposit.
                </li>
                <li>
                  We accept checks, credit cards, and electronic payment
                  methods. Financing options may be available — ask your project
                  manager for details.
                </li>
                <li>
                  Late payments may be subject to applicable interest charges as
                  specified in the contract.
                </li>
              </ul>
            </div>

            {/* 5 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-3">
                5. Warranties
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-brand-gray">
                <li>
                  <strong className="text-brand-dark">Workmanship Warranty:</strong>{" "}
                  {company.name} stands behind our work. Specific workmanship
                  warranty terms and duration are detailed in your project
                  contract.
                </li>
                <li>
                  <strong className="text-brand-dark">Manufacturer Warranties:</strong>{" "}
                  Roofing materials are covered by their respective
                  manufacturer warranties. We will provide you with all
                  applicable warranty documentation upon project completion.
                </li>
                <li>
                  <strong className="text-brand-dark">Warranty Exclusions:</strong>{" "}
                  Warranties do not cover damage caused by acts of nature
                  (storms, falling trees, etc.), improper maintenance,
                  unauthorized modifications, or normal wear and tear.
                </li>
              </ul>
            </div>

            {/* 6 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-3">
                6. Cancellation and Right of Rescission
              </h2>
              <p>
                In accordance with Pennsylvania law and the Federal Trade
                Commission&apos;s Cooling-Off Rule, you have the right to cancel
                a home improvement contract within three (3) business days of
                signing, provided the contract was signed at your home or a
                location other than the contractor&apos;s place of business. To
                cancel, you must provide written notice to {company.name} at our
                business address. After the three-day period, cancellation terms
                as outlined in the contract will apply.
              </p>
            </div>

            {/* 7 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-3">
                7. Website Use
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-brand-gray">
                <li>
                  <strong className="text-brand-dark">Content Ownership:</strong>{" "}
                  All content on this website — including text, images, logos,
                  graphics, and design — is the property of {company.legalName}{" "}
                  and is protected by applicable copyright and trademark laws.
                </li>
                <li>
                  <strong className="text-brand-dark">Permitted Use:</strong>{" "}
                  You may browse and use our website for personal,
                  non-commercial purposes such as learning about our services
                  and requesting estimates.
                </li>
                <li>
                  <strong className="text-brand-dark">Prohibited Use:</strong>{" "}
                  You may not copy, reproduce, distribute, or use any content
                  from this website without our prior written consent. You may
                  not use our website for any unlawful purpose or in a way that
                  could damage, disable, or impair the site.
                </li>
                <li>
                  <strong className="text-brand-dark">Accuracy:</strong> We
                  strive to keep website content accurate and current. However,
                  we do not warrant that all information is error-free. Specific
                  project pricing, timelines, and details are confirmed only
                  through a signed contract.
                </li>
              </ul>
            </div>

            {/* 8 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-3">
                8. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by Pennsylvania law,{" "}
                {company.legalName} shall not be liable for any indirect,
                incidental, special, or consequential damages arising from the
                use of our website or services. Our total liability for any
                claim related to our services shall not exceed the amount paid
                by you under the applicable project contract.
              </p>
            </div>

            {/* 9 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-3">
                9. Insurance
              </h2>
              <p>
                {company.name} maintains general liability insurance and
                workers&apos; compensation coverage as required by Pennsylvania
                law. Certificates of insurance are available upon request.
              </p>
            </div>

            {/* 10 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-3">
                10. Dispute Resolution
              </h2>
              <p>
                In the event of a dispute arising from our services, both
                parties agree to first attempt to resolve the matter through
                good-faith negotiation. If a resolution cannot be reached, the
                dispute shall be governed by the laws of the Commonwealth of
                Pennsylvania and settled in the courts of Philadelphia County,
                PA.
              </p>
            </div>

            {/* 11 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-3">
                11. Changes to These Terms
              </h2>
              <p>
                We reserve the right to update these Terms of Service at any
                time. Changes will be posted on this page with a revised
                &ldquo;Last updated&rdquo; date. Continued use of our website or
                services after changes are posted constitutes your acceptance of
                the updated terms.
              </p>
            </div>

            {/* 12 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-3">
                12. Contact Us
              </h2>
              <p className="mb-3">
                If you have questions about these Terms of Service, please
                contact us:
              </p>
              <ul className="space-y-2 text-brand-gray">
                <li>
                  <strong className="text-brand-dark">Company:</strong>{" "}
                  {company.legalName}
                </li>
                <li>
                  <strong className="text-brand-dark">Address:</strong>{" "}
                  {company.address.full}
                </li>
                <li>
                  <strong className="text-brand-dark">Phone:</strong>{" "}
                  <a
                    href={`tel:${company.phoneRaw}`}
                    className="text-brand-red hover:underline"
                  >
                    {company.phone}
                  </a>
                </li>
                <li>
                  <strong className="text-brand-dark">Email:</strong>{" "}
                  <a
                    href={`mailto:${company.email}`}
                    className="text-brand-red hover:underline"
                  >
                    {company.email}
                  </a>
                </li>
              </ul>
              <p className="mt-4 text-sm text-brand-gray">
                PA Home Improvement Contractor License:{" "}
                <strong className="text-brand-dark">{company.license}</strong>
              </p>
            </div>

            {/* Back link */}
            <div className="pt-6 border-t border-brand-border">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-brand-red font-semibold hover:gap-3 transition-all"
              >
                <svg
                  className="w-4 h-4 rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
