import type { Metadata } from "next";
import { company } from "@/data/company";
import ContactForm from "@/components/ContactForm";

const BASE_URL = "https://www.adilayroofing.com";

export const metadata: Metadata = {
  title: "Contact Us — Free Roofing Estimate | (888) 823-4766",
  description:
    "Contact Adilay Roofing for a free roofing estimate in Philadelphia, PA. Call (888) 823-4766, email info@adilayroofing.com, or fill out our quick form. Fast response!",
  keywords: [
    "contact roofer Philadelphia",
    "roofing estimate Philadelphia PA",
    "roofing company phone number",
    "free roof inspection Philadelphia",
  ],
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    title: "Contact Adilay Roofing Philadelphia — Free Estimates",
    description:
      "Call (888) 823-4766 for a free roofing estimate. Serving Philadelphia, Bucks, Montgomery, Delaware & Chester Counties.",
    url: `${BASE_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-brand-dark">
        <div className="section-padding">
          <div className="container-narrow mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Get In Touch
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              Have a question or ready to get started? We&apos;re here to help.
            </p>
          </div>
        </div>
      </section>

      {/* ── Our Office ── */}
      <section className="bg-white">
        <div className="section-padding pb-0">
          <div className="container-wide mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
              <div className="rounded-sm overflow-hidden shadow-lg">
                <img
                  src="/images/team-office.jpg"
                  alt="Adilay Roofing team at the Philadelphia office ready to help with your roofing project"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4">
                  Meet the Team Behind Your Roof
                </h2>
                <p className="text-brand-gray leading-relaxed">
                  When you call Adilay Roofing, you&apos;re not dealing with a
                  call center — you&apos;re speaking directly with the people
                  who run and manage your project. Our family-owned office in
                  Philadelphia is where every estimate, plan, and follow-up is
                  handled with personal attention.
                </p>
                <p className="text-brand-gray leading-relaxed mt-4">
                  Stop by, give us a call, or fill out the form below — we&apos;re
                  always happy to help.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Two-Column Layout: Form + Contact Info ── */}
      <section className="bg-brand-light">
        <div className="section-padding">
          <div className="container-wide mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
              {/* Left Column — Contact Form (60%) */}
              <div className="lg:col-span-3">
                <div className="bg-white border border-brand-border rounded-sm p-6 md:p-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-brand-gray mb-8">
                    Fill out the form below and we&apos;ll get back to you as
                    soon as possible.
                  </p>
                  <ContactForm />
                </div>
              </div>

              {/* Right Column — Contact Info (40%) */}
              <div className="lg:col-span-2 space-y-6">
                {/* Phone Card */}
                <div className="bg-white border border-brand-border rounded-sm p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-red/10 rounded-sm flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-brand-red"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-dark text-lg mb-1">
                        Call Us
                      </h3>
                      <a
                        href={`tel:${company.phoneRaw}`}
                        className="text-brand-red-dark font-bold text-lg hover:text-brand-red transition-colors"
                      >
                        {company.phone}
                      </a>
                      <p className="text-brand-gray text-sm mt-1">
                        24/7 (Closed Saturdays)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div className="bg-white border border-brand-border rounded-sm p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-red/10 rounded-sm flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-brand-red"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-dark text-lg mb-1">
                        Email Us
                      </h3>
                      <a
                        href={`mailto:${company.email}`}
                        className="text-brand-red-dark font-bold hover:text-brand-red transition-colors break-all"
                      >
                        {company.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Address Card */}
                <div className="bg-white border border-brand-border rounded-sm p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-red/10 rounded-sm flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-brand-red"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-dark text-lg mb-1">
                        Visit Us
                      </h3>
                      <a
                        href={company.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-gray hover:text-brand-red-dark transition-colors"
                      >
                        {company.address.street}
                        <br />
                        {company.address.city}, {company.address.state}{" "}
                        {company.address.zip}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours Card */}
                <div className="bg-white border border-brand-border rounded-sm p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-red/10 rounded-sm flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-brand-red"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-dark text-lg mb-1">
                        Business Hours
                      </h3>
                      <ul className="text-brand-gray text-sm space-y-1">
                        <li className="flex justify-between gap-4">
                          <span className="font-medium text-brand-dark">
                            Sun&ndash;Fri
                          </span>
                          <span>{company.hours.weekdays}</span>
                        </li>
                        <li className="flex justify-between gap-4">
                          <span className="font-medium text-brand-dark">
                            Saturday
                          </span>
                          <span>{company.hours.saturday}</span>
                        </li>
                        <li className="text-brand-red font-medium mt-2">
                          24/7 Emergency Service Available
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map Section ── */}
      <section className="relative">
        <iframe
          title="Adilay Roofing Service Area"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d392483.05756051!2d-75.4455701!3d40.0713949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa0bd1e455cbe4473%3A0x74b01e3f11e033a2!2sAdilay%20roofing!5e0!3m2!1sen!2sus!4v1"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
        />
        <div className="bg-white border-t border-brand-border py-3 px-4 text-center">
          <a
            href="https://www.google.com/maps/place/Adilay+roofing/@40.0713949,-75.4455701,10z/data=!3m1!4b1!4m6!3m5!1s0xa0bd1e455cbe4473:0x74b01e3f11e033a2!8m2!3d40.071862!4d-75.115953!16s%2Fg%2F11ww__wfkd"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-red font-semibold hover:text-brand-red-dark transition-colors text-sm md:text-base"
          >
            Open in Google Maps
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>

      {/* ── Emergency Banner ── */}
      <section className="bg-brand-red">
        <div className="py-8 px-4">
          <div className="container-narrow mx-auto text-center">
            <p className="text-white text-lg md:text-xl font-bold">
              Roof Emergency? Call us now at{" "}
              <a
                href={`tel:${company.phoneRaw}`}
                className="underline hover:text-white/80 transition-colors"
              >
                {company.phone}
              </a>{" "}
              &mdash; we respond fast.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
