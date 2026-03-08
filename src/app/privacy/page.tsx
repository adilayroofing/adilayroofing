import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/data/company";

const BASE_URL = "https://www.adilayroofing.com";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${company.name}. Learn how we collect, use, and protect your personal information when you use our roofing services in Philadelphia, PA.`,
  alternates: { canonical: `${BASE_URL}/privacy` },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-dark text-white py-16 md:py-20">
        <div className="container-wide mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black">
            Privacy Policy
          </h1>
          <p className="mt-4 text-white/70 text-lg max-w-2xl mx-auto">
            Your privacy matters to us. This policy explains how {company.name}{" "}
            collects, uses, and protects your information.
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
                1. Information We Collect
              </h2>
              <p className="mb-3">
                When you contact {company.name} for a free estimate, schedule a
                service, or use our website, we may collect the following types
                of information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-brand-gray">
                <li>
                  <strong className="text-brand-dark">Personal Information:</strong>{" "}
                  Name, phone number, email address, and property address that
                  you provide when requesting an estimate, filling out a contact
                  form, or calling us.
                </li>
                <li>
                  <strong className="text-brand-dark">Project Information:</strong>{" "}
                  Details about your roofing project such as roof type, size,
                  issues described, and photos you may share with us.
                </li>
                <li>
                  <strong className="text-brand-dark">Website Usage Data:</strong>{" "}
                  IP address, browser type, device information, pages visited,
                  and time spent on our website. This data is collected
                  automatically via cookies and analytics tools.
                </li>
                <li>
                  <strong className="text-brand-dark">Communication Records:</strong>{" "}
                  Records of phone calls, emails, text messages, and form
                  submissions between you and our team.
                </li>
              </ul>
            </div>

            {/* 2 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-3">
                2. How We Use Your Information
              </h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 text-brand-gray">
                <li>
                  Provide accurate roofing estimates and proposals for your
                  property
                </li>
                <li>
                  Schedule and perform roofing services including inspections,
                  repairs, and replacements
                </li>
                <li>
                  Communicate with you about your project, including
                  appointments, progress updates, and follow-ups
                </li>
                <li>
                  Process payments and maintain records required by Pennsylvania
                  home improvement contractor regulations
                </li>
                <li>
                  Improve our website, services, and customer experience
                </li>
                <li>
                  Send you relevant information about maintenance tips or
                  seasonal roofing reminders (only with your consent)
                </li>
              </ul>
            </div>

            {/* 3 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-3">
                3. Information Sharing
              </h2>
              <p className="mb-3">
                {company.name} does <strong>not</strong> sell, rent, or trade
                your personal information to third parties. We may share
                your information only in the following limited circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-brand-gray">
                <li>
                  <strong className="text-brand-dark">Service Providers:</strong>{" "}
                  With trusted partners who assist in our operations (e.g.,
                  material suppliers, payment processors) — only the information
                  necessary to complete your project.
                </li>
                <li>
                  <strong className="text-brand-dark">Legal Compliance:</strong>{" "}
                  When required by law, court order, or to comply with
                  Pennsylvania home improvement contractor licensing regulations.
                </li>
                <li>
                  <strong className="text-brand-dark">Safety:</strong> To protect
                  the rights, property, or safety of {company.name}, our
                  customers, or the public.
                </li>
              </ul>
            </div>

            {/* 4 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-3">
                4. Cookies and Tracking Technologies
              </h2>
              <p className="mb-3">
                Our website uses cookies and similar technologies to enhance your
                browsing experience. These include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-brand-gray">
                <li>
                  <strong className="text-brand-dark">Essential Cookies:</strong>{" "}
                  Necessary for the website to function properly (e.g., form
                  submissions, navigation).
                </li>
                <li>
                  <strong className="text-brand-dark">Analytics Cookies:</strong>{" "}
                  Help us understand how visitors use our site so we can improve
                  it (e.g., Google Analytics).
                </li>
              </ul>
              <p className="mt-3">
                You can control cookies through your browser settings. Disabling
                cookies may affect some website functionality.
              </p>
            </div>

            {/* 5 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-3">
                5. Data Security
              </h2>
              <p>
                We take reasonable measures to protect your personal information
                from unauthorized access, alteration, disclosure, or
                destruction. Our website uses SSL encryption (HTTPS) to secure
                data transmitted between your browser and our servers. However,
                no method of transmission over the internet is 100% secure, and
                we cannot guarantee absolute security.
              </p>
            </div>

            {/* 6 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-3">
                6. Data Retention
              </h2>
              <p>
                We retain your personal and project information for as long as
                necessary to fulfill the purposes outlined in this policy,
                comply with Pennsylvania contractor record-keeping requirements,
                and honor any warranty obligations. You may request deletion of
                your data at any time by contacting us.
              </p>
            </div>

            {/* 7 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-3">
                7. Your Rights
              </h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-brand-gray">
                <li>
                  Request access to the personal information we hold about you
                </li>
                <li>
                  Request correction of any inaccurate or incomplete information
                </li>
                <li>
                  Request deletion of your personal information (subject to
                  legal retention requirements)
                </li>
                <li>Opt out of marketing communications at any time</li>
                <li>
                  File a complaint with the appropriate regulatory authority if
                  you believe your privacy rights have been violated
                </li>
              </ul>
            </div>

            {/* 8 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-3">
                8. Third-Party Links
              </h2>
              <p>
                Our website may contain links to third-party websites (e.g.,
                Google Maps, social media platforms). We are not responsible for
                the privacy practices or content of those external sites. We
                encourage you to review their privacy policies before providing
                any personal information.
              </p>
            </div>

            {/* 9 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-3">
                9. Children&apos;s Privacy
              </h2>
              <p>
                Our website and services are not directed to individuals under
                the age of 18. We do not knowingly collect personal information
                from children. If you believe we have inadvertently collected
                information from a child, please contact us and we will promptly
                delete it.
              </p>
            </div>

            {/* 10 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-3">
                10. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or applicable laws. Any updates will be
                posted on this page with a revised &ldquo;Last updated&rdquo;
                date. We encourage you to review this policy periodically.
              </p>
            </div>

            {/* 11 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-3">
                11. Contact Us
              </h2>
              <p className="mb-3">
                If you have any questions about this Privacy Policy or how we
                handle your information, please contact us:
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
