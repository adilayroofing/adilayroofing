import Link from "next/link";
import { company } from "@/data/company";
import ScrollReveal from "@/components/ScrollReveal";

interface CTASectionProps {
  headline?: string;
  subtext?: string;
}

export default function CTASection({
  headline = "Ready to Get Started?",
  subtext = "Contact us today for a free roof inspection and estimate. No pressure, no obligation — just honest advice from experienced professionals.",
}: CTASectionProps) {
  return (
    <section className="relative bg-brand-dark overflow-hidden">
      {/* Gold accent bar at top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-brand-red" />

      <div className="section-padding">
        <div className="container-narrow mx-auto text-center">
          <ScrollReveal distance={20}>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
              {headline}
            </h2>
            <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto mb-6 md:mb-8">
              {subtext}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${company.phoneRaw}`}
                className="btn-primary w-full sm:w-auto"
              >
                <svg
                  className="w-5 h-5 mr-2"
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
                Call Now
              </a>
              <Link
                href="/contact"
                className="btn-outline-white w-full sm:w-auto"
              >
                Get Free Quote
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
