"use client";

import { useEffect } from "react";

type Theme = "light" | "dark";

export default function ThemeController() {
  useEffect(() => {
    let raf: number | null = null;
    let cancelled = false;
    let lastNav: Theme | null = null;
    let lastCta: Theme | null = null;

    // Navbar sits at top (~32px), CTA near bottom (~viewport - 80px)
    const navY = () => 32;
    const ctaY = () => window.innerHeight - 80;

    const findSectionAtY = (y: number): HTMLElement | null => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-cta-theme]")
      );
      if (!sections.length) return null;

      let match: HTMLElement | null = null;
      for (const el of sections) {
        const r = el.getBoundingClientRect();
        if (r.top <= y && r.bottom >= y) match = el;
      }
      if (!match) {
        let best = Infinity;
        for (const el of sections) {
          const r = el.getBoundingClientRect();
          const center = r.top + r.height / 2;
          const dist = Math.abs(center - y);
          if (dist < best) {
            best = dist;
            match = el;
          }
        }
      }
      return match;
    };

    const update = () => {
      if (cancelled) return;

      // Navbar — sample top of viewport
      const navSection = findSectionAtY(navY());
      const navTheme = navSection?.dataset.ctaTheme as Theme | undefined;
      if (
        (navTheme === "light" || navTheme === "dark") &&
        navTheme !== lastNav
      ) {
        lastNav = navTheme;
        document.body.dataset.navActive = navTheme;
      }

      // CTA — sample bottom of viewport
      const ctaSection = findSectionAtY(ctaY());
      const ctaTheme = ctaSection?.dataset.ctaTheme as Theme | undefined;
      if (
        (ctaTheme === "light" || ctaTheme === "dark") &&
        ctaTheme !== lastCta
      ) {
        lastCta = ctaTheme;
        document.body.dataset.ctaActive = ctaTheme;
      }

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}