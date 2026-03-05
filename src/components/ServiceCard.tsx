import Link from "next/link";
import type { Service } from "@/data/services";
import ServiceIcon from "@/components/ServiceIcon";

/* Map service slug → background image */
const serviceImages: Record<string, string> = {
  "roof-replacement": "/images/roof-replacement-philadelphia.jpg",
  "roof-repair": "/images/roof-repair-philadelphia.jpg",
  "flat-roofing": "/images/flat-roof-philadelphia.jpg",
  "shingle-roofing": "/images/roof-shingles-philadelphia.jpg",
  siding: "/images/siding-philadelphia.jpg",
  windows: "/images/window-installation-philadelphia.jpg",
  gutters: "/images/gutters-philadelphia.png",
};

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const bgImage = serviceImages[service.slug];

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative rounded-sm overflow-hidden block min-h-[140px] md:min-h-[280px]"
    >
      {/* Background image */}
      {bgImage && (
        <img
          src={bgImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          aria-hidden="true"
        />
      )}

      {/* Dark overlay for text readability */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          bgImage
            ? "bg-black/60 group-hover:bg-black/50"
            : "bg-brand-light"
        }`}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-4 md:p-8">
        {/* Icon */}
        <div
          className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3 md:mb-4 transition-all duration-300 ${
            bgImage
              ? "bg-white/20 text-white group-hover:bg-brand-red"
              : "bg-brand-red/10 text-brand-red group-hover:bg-brand-red group-hover:text-white"
          }`}
        >
          <ServiceIcon slug={service.slug} className="w-5 h-5 md:w-6 md:h-6" />
        </div>

        {/* Title */}
        <h3
          className={`text-lg md:text-2xl font-bold mb-1 md:mb-3 transition-colors duration-200 ${
            bgImage
              ? "text-white"
              : "text-brand-dark group-hover:text-brand-red"
          }`}
        >
          {service.shortTitle || service.title}
        </h3>

        {/* Description — hidden on mobile for compact view */}
        <p
          className={`hidden md:block text-base leading-relaxed mb-5 ${
            bgImage ? "text-white/80" : "text-brand-gray"
          }`}
        >
          {service.description}
        </p>

        {/* Learn More Link */}
        <span
          className={`inline-flex items-center gap-2 font-semibold text-sm md:text-base group-hover:gap-3 transition-all duration-200 ${
            bgImage ? "text-brand-red" : "text-brand-red"
          }`}
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
      </div>
    </Link>
  );
}
