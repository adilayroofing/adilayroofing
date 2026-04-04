"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { company } from "@/data/company";
import { serviceCategories, getServicesByCategory } from "@/data/services";
import { locations } from "@/data/locations";

// Pre-compute county groups for the nav dropdown
const countyOrder = [
  "Philadelphia County",
  "Montgomery County",
  "Bucks County",
  "Delaware County",
  "Chester County",
  "Camden County",
  "Burlington County",
];
const locationsByCounty = countyOrder
  .map((county) => {
    const all = locations.filter((l) => l.county === county);
    const hub = all.find((l) => l.type === "county");
    const children = all.filter((l) => l.type !== "county");
    return { county, hub, children };
  })
  .filter((g) => g.hub || g.children.length > 0);

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [areasDropdownOpen, setAreasDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<string | null>(null);
  const [mobileCountyOpen, setMobileCountyOpen] = useState<string | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const areasDropdownRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Measure header height for mobile menu positioning
  useEffect(() => {
    function updateHeight() {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    }
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }
      if (
        areasDropdownRef.current &&
        !areasDropdownRef.current.contains(event.target as Node)
      ) {
        setAreasDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent background scroll when mobile menu is open (touch devices)
  useEffect(() => {
    if (!mobileMenuOpen) return;
    function preventScroll(e: TouchEvent) {
      // Allow scroll inside the menu panel itself
      const menu = document.getElementById("mobile-menu");
      if (menu && menu.contains(e.target as Node)) return;
      e.preventDefault();
    }
    document.addEventListener("touchmove", preventScroll, { passive: false });
    return () => document.removeEventListener("touchmove", preventScroll);
  }, [mobileMenuOpen]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-brand-navy text-white text-sm">
        <div className="container-wide mx-auto flex items-center justify-between px-4 py-2">
          <div className="hidden md:flex items-center gap-1 text-white/80">
            <svg
              className="w-4 h-4 mr-1 text-brand-red flex-shrink-0"
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
            <span>
              Serving {company.serviceAreas.join(" · ")}
            </span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <a
              href={`tel:${company.phoneRaw}`}
              className="flex items-center gap-2 text-white hover:text-brand-red active:text-brand-red transition-colors font-semibold"
            >
              <svg
                className="w-4 h-4"
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
              <span className="text-brand-red">Call Us</span>
              <span className="hidden sm:inline">{company.phone}</span>
              <span className="sm:hidden">{company.phone}</span>
            </a>
            <a
              href="sms:+12672553620&body=Hi%2C%20I%27m%20interested%20in%20a%20free%20roofing%20estimate."
              className="flex items-center gap-1.5 text-white/80 hover:text-brand-red active:text-brand-red transition-colors font-semibold"
              aria-label="Text Us"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="text-brand-red">Text Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className="bg-white shadow-md"
        aria-label="Main navigation"
      >
        <div className="container-wide mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center"
            aria-label="Adilay Roofing - Home"
            onClick={(e) => {
              setMobileMenuOpen(false);
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "instant" });
              }
            }}
          >
            <img
              src="/images/logo-new.png"
              alt="Adilay Roofing"
              className="h-16 md:h-20 w-auto"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Services Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onMouseEnter={() => setServicesDropdownOpen(true)}
                className="flex items-center gap-1 text-brand-dark font-semibold hover:text-brand-red transition-colors cursor-pointer"
                aria-expanded={servicesDropdownOpen}
                aria-haspopup="true"
              >
                Services
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {servicesDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-[540px] bg-white rounded-sm shadow-xl border border-brand-border p-4 z-50"
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                  role="menu"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {serviceCategories.map((cat) => {
                      const catServices = getServicesByCategory(cat.id);
                      if (catServices.length === 0) return null;
                      return (
                        <div key={cat.id}>
                          <p className="text-xs font-bold text-brand-red uppercase tracking-wider mb-1.5 px-1">
                            {cat.label}
                          </p>
                          {catServices.map((service) => (
                            <Link
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              className="block px-1 py-1 text-sm text-brand-dark hover:text-brand-red transition-colors"
                              role="menuitem"
                              onClick={() => setServicesDropdownOpen(false)}
                            >
                              {service.shortTitle}
                            </Link>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-t border-brand-border mt-3 pt-2">
                    <Link
                      href="/services"
                      className="block text-center text-sm text-brand-red font-semibold hover:bg-brand-light rounded-sm py-1.5 transition-colors"
                      role="menuitem"
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      View All Services &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Service Areas Dropdown */}
            <div ref={areasDropdownRef} className="relative">
              <button
                onClick={() => setAreasDropdownOpen(!areasDropdownOpen)}
                onMouseEnter={() => setAreasDropdownOpen(true)}
                className="flex items-center gap-1 text-brand-dark font-semibold hover:text-brand-red transition-colors cursor-pointer"
                aria-expanded={areasDropdownOpen}
                aria-haspopup="true"
              >
                Service Areas
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    areasDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {areasDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-[600px] bg-white rounded-sm shadow-xl border border-brand-border p-4 z-50"
                  onMouseLeave={() => setAreasDropdownOpen(false)}
                  role="menu"
                >
                  <div className="grid grid-cols-3 gap-4">
                    {locationsByCounty.map((group) => (
                      <div key={group.county}>
                        <Link
                          href={group.hub ? `/service-areas/${group.hub.slug}` : "/service-areas"}
                          className="text-xs font-bold text-brand-red uppercase tracking-wider mb-1.5 px-1 block hover:text-brand-red-dark transition-colors"
                          role="menuitem"
                          onClick={() => setAreasDropdownOpen(false)}
                        >
                          {group.county.replace(" County", "")}
                        </Link>
                        {group.children.map((loc) => (
                          <Link
                            key={loc.slug}
                            href={`/service-areas/${loc.slug}`}
                            className="block px-1 py-0.5 text-sm text-brand-dark hover:text-brand-red transition-colors"
                            role="menuitem"
                            onClick={() => setAreasDropdownOpen(false)}
                          >
                            {loc.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-brand-border mt-3 pt-2">
                    <Link
                      href="/service-areas"
                      className="block text-center text-sm text-brand-red font-semibold hover:bg-brand-light rounded-sm py-1.5 transition-colors"
                      role="menuitem"
                      onClick={() => setAreasDropdownOpen(false)}
                    >
                      View All Service Areas &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="text-brand-dark font-semibold hover:text-brand-red transition-colors"
            >
              About
            </Link>
            <Link
              href="/financing"
              className="text-brand-dark font-semibold hover:text-brand-red transition-colors"
            >
              Financing
            </Link>
            <Link
              href="/gallery"
              className="text-brand-dark font-semibold hover:text-brand-red transition-colors"
            >
              Gallery
            </Link>
            <Link
              href="/blog"
              className="text-brand-dark font-semibold hover:text-brand-red transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-brand-dark font-semibold hover:text-brand-red transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Phone Icon */}
            <a
              href={`tel:${company.phoneRaw}`}
              className="text-brand-dark hover:text-brand-red transition-colors"
              aria-label={`Call ${company.phone}`}
            >
              <svg
                className="w-5 h-5"
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
            </a>

            {/* Text/SMS Icon */}
            <a
              href="sms:+12672553620&body=Hi%2C%20I%27m%20interested%20in%20a%20free%20roofing%20estimate."
              className="text-brand-dark hover:text-brand-red transition-colors"
              aria-label="Text Us"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </a>

            {/* CTA Button */}
            <Link href="/get-quote" className="btn-primary !py-3 !px-6 !text-base">
              FREE Estimate
            </Link>
          </div>

          {/* Mobile Right Actions */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              href="/get-quote"
              className="bg-brand-red text-white text-xs font-bold px-3 py-2 rounded-md hover:bg-brand-red-dark transition-colors"
            >
              FREE Estimate
            </Link>
          <button
            className="flex flex-col gap-1.5 p-2 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-brand-dark transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-brand-dark transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-brand-dark transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
          </div>
        </div>

      </nav>

      {/* Mobile Menu — outside nav, inside header for correct stacking */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-0 bg-white z-[60] overflow-y-auto"
          style={{ top: headerHeight }}
        >
          <div className="flex flex-col p-6">
            {/* Mobile Services Accordion */}
            <div className="border-b border-brand-border">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex items-center justify-between w-full py-4 text-brand-dark font-semibold text-lg cursor-pointer"
                aria-expanded={mobileServicesOpen}
              >
                Services
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${
                    mobileServicesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  mobileServicesOpen ? "max-h-[2000px] pb-4" : "max-h-0"
                }`}
              >
                {serviceCategories.map((cat) => {
                  const catServices = getServicesByCategory(cat.id);
                  if (catServices.length === 0) return null;
                  const isOpen = mobileCategoryOpen === cat.id;
                  return (
                    <div key={cat.id} className="border-b border-brand-border/50 last:border-b-0">
                      <button
                        onClick={() => setMobileCategoryOpen(isOpen ? null : cat.id)}
                        className="flex items-center justify-between w-full py-3 pl-4 pr-2 cursor-pointer"
                      >
                        <span className="text-base font-semibold text-brand-dark">
                          {cat.label}
                        </span>
                        <svg
                          className={`w-4 h-4 text-brand-gray transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-[400px] pb-2" : "max-h-0"}`}>
                        {catServices.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            className="block py-2 pl-8 text-sm text-brand-gray hover:text-brand-red active:text-brand-red transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {service.shortTitle}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
                <Link
                  href="/services"
                  className="block pl-4 pt-3 text-sm text-brand-red font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  View All Services &rarr;
                </Link>
              </div>
            </div>

            {/* Mobile Service Areas Accordion */}
            <div className="border-b border-brand-border">
              <button
                onClick={() => setMobileAreasOpen(!mobileAreasOpen)}
                className="flex items-center justify-between w-full py-4 text-brand-dark font-semibold text-lg cursor-pointer"
                aria-expanded={mobileAreasOpen}
              >
                Service Areas
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${
                    mobileAreasOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  mobileAreasOpen ? "max-h-[3000px] pb-4" : "max-h-0"
                }`}
              >
                {locationsByCounty.map((group) => {
                  const isOpen = mobileCountyOpen === group.county;
                  return (
                    <div key={group.county} className="border-b border-brand-border/50 last:border-b-0">
                      <button
                        onClick={() => setMobileCountyOpen(isOpen ? null : group.county)}
                        className="flex items-center justify-between w-full py-3 pl-4 pr-2 cursor-pointer"
                      >
                        <span className="text-base font-semibold text-brand-dark">
                          {group.county.replace(" County", "")}
                        </span>
                        <svg
                          className={`w-4 h-4 text-brand-gray transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-[600px] pb-2" : "max-h-0"}`}>
                        {group.hub && (
                          <Link
                            href={`/service-areas/${group.hub.slug}`}
                            className="block py-2 pl-8 text-sm font-semibold text-brand-red hover:text-brand-red-dark active:text-brand-red transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            All {group.county.replace(" County", "")} &rarr;
                          </Link>
                        )}
                        {group.children.map((loc) => (
                          <Link
                            key={loc.slug}
                            href={`/service-areas/${loc.slug}`}
                            className="block py-2 pl-8 text-sm text-brand-gray hover:text-brand-red active:text-brand-red transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {loc.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
                <Link
                  href="/service-areas"
                  className="block pl-4 pt-3 text-sm text-brand-red font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  View All Service Areas &rarr;
                </Link>
              </div>
            </div>

            <Link
              href="/about"
              className="py-4 text-brand-dark font-semibold text-lg border-b border-brand-border hover:text-brand-red active:text-brand-red transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/financing"
              className="py-4 text-brand-dark font-semibold text-lg border-b border-brand-border hover:text-brand-red active:text-brand-red transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Financing
            </Link>
            <Link
              href="/gallery"
              className="py-4 text-brand-dark font-semibold text-lg border-b border-brand-border hover:text-brand-red active:text-brand-red transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="/blog"
              className="py-4 text-brand-dark font-semibold text-lg border-b border-brand-border hover:text-brand-red active:text-brand-red transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="py-4 text-brand-dark font-semibold text-lg border-b border-brand-border hover:text-brand-red active:text-brand-red transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Mobile CTA */}
            <div className="mt-6 flex flex-col gap-4">
              <Link
                href="/get-quote"
                className="btn-primary text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                FREE Estimate
              </Link>
              <a
                href={`tel:${company.phoneRaw}`}
                className="btn-secondary text-center"
                onClick={() => setMobileMenuOpen(false)}
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
                Call {company.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
