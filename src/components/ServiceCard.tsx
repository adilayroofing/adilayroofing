import Link from "next/link";
import type { Service } from "@/data/services";
import ServiceIcon from "@/components/ServiceIcon";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group bg-white border border-brand-border rounded-sm p-4 md:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 block"
    >
      {/* Icon */}
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red mb-3 md:mb-4 group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
        <ServiceIcon slug={service.slug} className="w-5 h-5 md:w-6 md:h-6" />
      </div>

      {/* Title */}
      <h3 className="text-base md:text-xl font-bold text-brand-dark mb-1 md:mb-3 group-hover:text-brand-red transition-colors duration-200">
        {service.shortTitle || service.title}
      </h3>

      {/* Description — hidden on mobile for compact view */}
      <p className="hidden md:block text-brand-gray text-sm leading-relaxed mb-5">
        {service.description}
      </p>

      {/* Learn More Link */}
      <span
        className="inline-flex items-center gap-2 text-brand-red font-semibold text-xs md:text-sm group-hover:gap-3 transition-all duration-200"
      >
        Learn More
        <svg
          className="w-3 h-3 md:w-4 md:h-4"
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
      </span>
    </Link>
  );
}
