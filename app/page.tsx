"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NorrisText from "@/components/NorrisText";
import HomeAnimation from "@/components/HomeAnimation";
import ThemeController from "@/components/ThemeController";
import BookingModal from "@/components/BookingModal";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isMenuOpen]);

  // Close the drawer when the viewport grows past md
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setIsMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  const handleNavClick = () => setIsMenuOpen(false);

  return (
    <>
      <ThemeController />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Navbar — colors driven by .site-nav / data-cta-theme so it stays visible
          on both the dark hero and light sections. */}
      <header className="site-nav fixed left-0 top-0 z-50 w-full">
        <nav className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20">
          {/* Desktop links */}
          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link href="#about" className="nav-norris">
              <NorrisText text="Facebook" />
            </Link>
            <Link href="#about" className="nav-norris">
              <NorrisText text="Instagram" />
            </Link>
            {/* <Link href="#explore" className="nav-norris">
              <NorrisText text="Explore" />
            </Link>
            <Link href="#experiences" className="nav-norris">
              <NorrisText text="Experiences" />
            </Link>
            <Link href="#contact" className="nav-norris">
              <NorrisText text="Contact" />
            </Link> */}
          </div>

          <Link
            href="/"
            className="site-brand text-lg font-bold tracking-normal sm:text-xl"
            onClick={handleNavClick}
          >
            Konfidental.
          </Link>

          <div className="flex flex-row items-center gap-4 text-sm font-medium sm:gap-6 md:gap-12 md:text-md">
            {/* Phone link — ONE visible label only.
                Inherits currentColor so it flips with the theme. */}
            <a
              href="tel:+254700000000"
              className="flex items-center gap-1.5 nav-norris"
              aria-label="Call us"
            >
              <svg
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[18px] w-[18px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="hidden sm:inline">
                <NorrisText text="Call Now" />
              </span>
              <span className="inline sm:hidden">
                <NorrisText text="Call" />
              </span>
            </a>

            <a
              href="mailto:info@example.com"
              className="hidden nav-norris sm:inline-flex"
            >
              <NorrisText text="info@example.com" />
            </a>

            {/* Hamburger — bars use currentColor so they stay visible
                on dark hero AND light sections. */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((o) => !o)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="hamburger-btn relative z-[60] flex h-10 w-10 flex-col items-center justify-center text-current md:hidden"
            >
              <span
                className={`hamburger-line block h-[2px] w-6 rounded-full bg-current transition-all duration-300 ease-out ${
                  isMenuOpen
                    ? "translate-y-[6px] rotate-45"
                    : "translate-y-0 rotate-0"
                }`}
              />
              <span
                className={`hamburger-line mt-1.5 block h-[2px] w-6 rounded-full bg-current transition-all duration-300 ease-out ${
                  isMenuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
                }`}
              />
              <span
                className={`hamburger-line mt-1.5 block h-[2px] w-6 rounded-full bg-current transition-all duration-300 ease-out ${
                  isMenuOpen
                    ? "-translate-y-[6px] -rotate-45"
                    : "translate-y-0 rotate-0"
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu drawer */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 md:hidden ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        {/* Backdrop */}
        <div
          onClick={() => setIsMenuOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Panel — explicit dark text on white so it never inherits
            the hero's light theme text color. */}
        <div
          className={`absolute inset-x-0 top-0 bg-white text-[#171717] shadow-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="px-6 pb-8 pt-20">
            <nav className="flex flex-col divide-y divide-[#171717]/10">
              {[
                { href: "#about", label: "About" },
                { href: "#explore", label: "Explore" },
                { href: "#experiences", label: "Experiences" },
                { href: "#contact", label: "Contact" },
              ].map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className="group flex items-center justify-between py-4 text-2xl font-semibold tracking-tight text-[#171717]"
                  style={{
                    transition: "opacity 300ms ease, transform 300ms ease",
                    transitionDelay: isMenuOpen ? `${80 + i * 60}ms` : "0ms",
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen
                      ? "translateY(0)"
                      : "translateY(-8px)",
                  }}
                >
                  <NorrisText text={item.label} />
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#075874] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </Link>
              ))}
            </nav>

            {/* Drawer CTA */}
            <div className="mt-8 flex flex-col gap-3">
              <a
                href="tel:+254700000000"
                onClick={handleNavClick}
                className="flex items-center justify-center gap-2 rounded-full border border-[#171717]/15 px-5 py-3 text-sm font-semibold text-[#171717] transition-colors hover:border-[#075874]/40 hover:bg-[#075874]/5"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Call Now</span>
              </a>
              <a
                href="mailto:info@example.com"
                onClick={handleNavClick}
                className="flex items-center justify-center gap-2 rounded-full bg-[#075874] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#054a61]"
              >
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <HomeAnimation />

      {/* Appointment CTA — Liquid Glass with adaptive theme */}
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-3 p-4 md:p-7">
        <button
          onClick={() => setIsBookingOpen(true)}
          aria-label="Book an Appointment"
          className="liquid-btn-wrap pointer-events-auto block"
        >
          <div className="liquid-btn">
            <span className="ml-0 pl-0">
              <NorrisText text="Book an Appointment" />
            </span>
          </div>
          <div className="liquid-btn-shadow" />
        </button>
      </div>
    </>
  );
}
