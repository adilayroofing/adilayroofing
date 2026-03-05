const steps = [
  {
    number: 1,
    title: "Free Inspection",
    description: "We assess your roof's condition and identify any issues that need attention.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    number: 2,
    title: "Detailed Proposal",
    description: "You receive a clear, written estimate with pricing, materials, and timeline.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    number: 3,
    title: "Professional Installation",
    description: "Our experienced crew gets to work with quality materials and clean workmanship.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    number: 4,
    title: "Final Walkthrough",
    description: "We ensure everything meets our standards and your complete satisfaction.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function ProcessSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide mx-auto">
        {/* Heading */}
        <div className="text-center mb-6 md:mb-16">
          <h2 className="section-heading">Our Process</h2>
          <p className="section-subheading mx-auto mt-4">
            From first contact to final walkthrough, we make roofing simple, transparent, and stress-free.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center">
              {/* Connector line (desktop only, between steps) */}
              {index < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-brand-border"
                  aria-hidden="true"
                />
              )}

              {/* Number Circle */}
              <div className="relative inline-flex items-center justify-center w-11 h-11 md:w-16 md:h-16 rounded-full bg-brand-red text-white mb-2 md:mb-5">
                <span className="md:hidden text-white font-bold text-sm">{step.number}</span>
                <span className="hidden md:block">{step.icon}</span>
              </div>

              {/* Step Number — visible on desktop only */}
              <p className="hidden md:block text-xs font-bold text-brand-red uppercase tracking-widest mb-2">
                Step {step.number}
              </p>

              {/* Title */}
              <h3 className="text-sm md:text-lg font-bold text-brand-dark mb-1 md:mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-brand-gray text-xs md:text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
