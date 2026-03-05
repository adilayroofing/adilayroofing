"use client";

import { useState } from "react";
import {
  galleryProjects,
  galleryCategories,
  type GalleryProject,
} from "@/data/gallery";

/* ── Image placeholder icon ── */
function ImagePlaceholderIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
      />
    </svg>
  );
}

/* ── Location pin icon ── */
function PinIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  );
}

/* ── Category badge label mapping ── */
const categoryLabels: Record<string, string> = Object.fromEntries(
  galleryCategories.map((c) => [c.value, c.label])
);

/* ── Project Card ── */
function ProjectCard({ project }: { project: GalleryProject }) {
  const hasImages = project.beforeImage || project.afterImage;

  return (
    <div className="group bg-white rounded-sm border border-brand-border overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Image area — Before / After or placeholder */}
      <div className="relative">
        {hasImages ? (
          <div className="grid grid-cols-2">
            {/* Before */}
            <div className="relative">
              {project.beforeImage ? (
                <img
                  src={project.beforeImage}
                  alt={`${project.title} — before`}
                  className="w-full aspect-[4/3] object-cover"
                />
              ) : (
                <div className="w-full aspect-[4/3] bg-brand-light flex items-center justify-center">
                  <ImagePlaceholderIcon className="w-8 h-8 text-brand-border" />
                </div>
              )}
              <span className="absolute top-2 left-2 bg-white/90 text-brand-dark text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-sm">
                BEFORE
              </span>
            </div>
            {/* After */}
            <div className="relative">
              {project.afterImage ? (
                <img
                  src={project.afterImage}
                  alt={`${project.title} — after`}
                  className="w-full aspect-[4/3] object-cover"
                />
              ) : (
                <div className="w-full aspect-[4/3] bg-brand-light flex items-center justify-center">
                  <ImagePlaceholderIcon className="w-8 h-8 text-brand-border" />
                </div>
              )}
              <span className="absolute top-2 left-2 bg-brand-red text-white text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-sm">
                AFTER
              </span>
            </div>
          </div>
        ) : (
          /* Full placeholder — no images yet */
          <div className="w-full aspect-[16/9] bg-brand-light flex items-center justify-center">
            <div className="text-center">
              <ImagePlaceholderIcon className="w-10 h-10 md:w-12 md:h-12 text-brand-border mx-auto mb-2" />
              <p className="text-brand-gray/50 text-xs md:text-sm font-medium">
                Photos Coming Soon
              </p>
            </div>
          </div>
        )}

        {/* Category badge */}
        <span className="absolute bottom-3 right-3 bg-brand-dark/80 backdrop-blur-sm text-white text-[10px] md:text-xs font-semibold px-2.5 py-1 rounded-sm">
          {categoryLabels[project.category] || project.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <h3 className="text-sm md:text-base font-bold text-brand-dark mb-1.5 group-hover:text-brand-red transition-colors">
          {project.title}
        </h3>
        <p className="text-brand-gray text-xs md:text-sm leading-relaxed mb-3">
          {project.description}
        </p>
        <div className="flex items-center gap-1.5 text-brand-gray">
          <PinIcon />
          <span className="text-xs md:text-sm">{project.location}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Main Gallery Grid with Filters ── */
export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? galleryProjects
      : galleryProjects.filter((p) => p.category === activeCategory);

  return (
    <section className="bg-white">
      <div className="section-padding">
        <div className="container-wide mx-auto">
          {/* Section heading */}
          <div className="text-center mb-6 md:mb-10">
            <h2 className="section-heading">Project Gallery</h2>
            <p className="section-subheading mx-auto mt-2">
              Filter by project type to find examples relevant to your needs.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8 md:mb-12">
            {galleryCategories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActiveCategory(cat.value)}
                className={`px-3 md:px-5 py-2 md:py-2.5 rounded-sm text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.value
                    ? "bg-brand-red text-white shadow-md"
                    : "bg-brand-light text-brand-dark hover:bg-brand-red/10 hover:text-brand-red border border-brand-border"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <ImagePlaceholderIcon className="w-16 h-16 text-brand-border mx-auto mb-4" />
              <p className="text-brand-gray text-lg font-medium">
                No projects in this category yet.
              </p>
              <p className="text-brand-gray/60 text-sm mt-1">
                Check back soon — we&apos;re always adding new work.
              </p>
            </div>
          )}

          {/* Bottom note */}
          <div className="text-center mt-8 md:mt-12">
            <p className="text-brand-gray text-sm">
              More projects being added regularly. Have a project in mind?
            </p>
            <a
              href="/get-quote"
              className="inline-flex items-center gap-2 text-brand-red font-bold hover:text-brand-red-dark transition-colors text-sm md:text-base mt-2"
            >
              Get Your Free Estimate
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
