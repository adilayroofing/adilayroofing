"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { company } from "@/data/company";
import { services } from "@/data/services";
import ServiceIcon from "@/components/ServiceIcon";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setServicesDropdownOpen(false);
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
          <a
            href={`tel:${company.phoneRaw}`}
            className="flex items-center gap-2 text-white hover:text-brand-red active:text-brand-red transition-colors font-semibold ml-auto"
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
            {company.phone}
          </a>
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
            className="group relative flex items-center"
            aria-label="Adilay Roofing - Home"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src="/images/logo.svg"
              alt="Adilay Roofing"
              className="h-14 md:h-16 w-auto transition-opacity duration-300 group-hover:opacity-0 group-active:opacity-0"
            />
            <img
              src="/images/logo-red.svg"
              alt=""
              className="h-14 md:h-16 w-auto absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100"
              aria-hidden="true"
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
                  className="absolute top-full left-0 mt-2 w-72 bg-white rounded-sm shadow-xl border border-brand-border py-2 z-50"
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                  role="menu"
                >
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="flex items-center gap-3 px-4 py-3 text-brand-dark hover:bg-brand-light hover:text-brand-red transition-colors"
                      role="menuitem"
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      <span className="text-brand-red/60" aria-hidden="true">
                        <ServiceIcon slug={service.slug} className="w-5 h-5" />
                      </span>
                      <span className="font-medium">{service.title}</span>
                    </Link>
                  ))}
                  <div className="border-t border-brand-border mt-2 pt-2">
                    <Link
                      href="/services"
                      className="block px-4 py-2 text-brand-red font-semibold hover:bg-brand-light transition-colors"
                      role="menuitem"
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      View All Services
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/service-areas"
              className="text-brand-dark font-semibold hover:text-brand-red transition-colors"
            >
              Service Areas
            </Link>
            <Link
              href="/about"
              className="text-brand-dark font-semibold hover:text-brand-red transition-colors"
            >
              About
            </Link>
            <Link
              href="/gallery"
              className="text-brand-dark font-semibold hover:text-brand-red transition-colors"
            >
              Gallery
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

            {/* CTA Button */}
            <Link href="/get-quote" className="btn-primary !py-3 !px-6 !text-base">
              FREE Estimate
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
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
                  mobileServicesOpen ? "max-h-[500px] pb-4" : "max-h-0"
                }`}
              >
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="flex items-center gap-3 py-2 pl-4 text-brand-gray hover:text-brand-red active:text-brand-red transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-brand-red/50" aria-hidden="true">
                      <ServiceIcon slug={service.slug} className="w-4 h-4" />
                    </span>
                    <span>{service.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/service-areas"
              className="py-4 text-brand-dark font-semibold text-lg border-b border-brand-border hover:text-brand-red active:text-brand-red transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Service Areas
            </Link>
            <Link
              href="/about"
              className="py-4 text-brand-dark font-semibold text-lg border-b border-brand-border hover:text-brand-red active:text-brand-red transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/gallery"
              className="py-4 text-brand-dark font-semibold text-lg border-b border-brand-border hover:text-brand-red active:text-brand-red transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
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
