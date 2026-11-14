"use client";

import { ReactLenis } from "lenis/react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // This ensures ScrollTrigger and Lenis stay perfectly synchronized
    ScrollTrigger.refresh();
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.01, // Lower = smoother/slower (0.05 - 0.1 is the sweet spot)
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}