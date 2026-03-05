import type { Metadata } from "next";
import { company } from "@/data/company";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description: `Request a free, no-obligation roofing estimate from ${company.name}. Serving Philadelphia, PA and surrounding areas. Call ${company.phone} or fill out our quick form.`,
};

export default function GetQuotePage() {
  return (
    <>
      {/* Hero / Split Layout */}
      <section className="relative min-h-[60vh] lg:min-h-screen flex flex-col lg:flex-row">
        {/* Left Panel - Dark CTA side */}
        <div className="relative lg:w-[40%] bg-brand-darker text-white flex items-center justify-center px-4 md:px-6 py-10 md:py-16 lg:py-0">
          {/* Placeholder background overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-darker via-brand-dark to-brand-darker opacity-95" />

          <div className="relative z-10 max-w-md text-center lg:text-left">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 md:mb-4 text-white">
              GET YOUR{" "}
              <span className="text-brand-red">FREE QUOTE</span>{" "}
              TODAY!
            </h1>
            <p className="text-sm md:text-lg text-white/80 mb-5 md:mb-8">
              Fill out this short form and we will send you a detailed proposal
              tailored to your exact property measurements.
            </p>

            <div className="mb-5 md:mb-8">
              <p className="text-white/60 text-xs md:text-sm mb-1 md:mb-2">Or call us directly:</p>
              <a
                href={`tel:${company.phoneRaw}`}
                className="text-xl md:text-2xl font-bold text-brand-red hover:text-brand-red-dark transition-colors"
              >
                {company.phone}
              </a>
            </div>

            {/* Trust signals - horizontal on mobile, column on large */}
            <div className="flex flex-row lg:flex-col gap-3 md:gap-4 justify-center lg:justify-start">
              {[
                { icon: "✓", text: "Free Estimates" },
                { icon: "✓", text: "No Obligation" },
                { icon: "✓", text: "Response Within 24hrs" },
              ].map((item) => (
                <div key={item.text} className="flex flex-col md:flex-row items-center gap-1.5 md:gap-3">
                  <span className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-brand-red text-white flex items-center justify-center font-bold text-xs md:text-sm flex-shrink-0">
                    {item.icon}
                  </span>
                  <span className="text-white/90 font-medium text-xs md:text-base text-center md:text-left">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="lg:w-[60%] bg-brand-light flex items-start lg:items-center justify-center px-3 md:px-4 py-6 md:py-10 lg:py-16">
          <div className="w-full max-w-2xl">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
