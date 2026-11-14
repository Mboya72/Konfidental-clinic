"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollWipeTextProps = {
  /** Plain text with \n line breaks */
  text: React.ReactNode;
  /** Array of ReactNode lines (use instead of text for JSX) */
  lines?: ReactNode[];
  className?: string;
  /** Optional per-line class */
  lineClassName?: string;
  /** Revealed color. Default: #ffffff */
  revealColor?: string;
  /** Hidden color. Default: rgba(255,255,255,0.08) */
  hiddenColor?: string;
  /** Stagger between lines, seconds. Default: 0.3 */
  stagger?: number;
  /** ScrollTrigger start. Default: "top 80%" */
  start?: string;
  /** ScrollTrigger end. Default: "bottom 30%" */
  end?: string;
};

export default function ScrollWipeText({
  text,
  lines,
  className = "",
  lineClassName = "",
  revealColor = "#ffffff",
  hiddenColor = "rgba(255,255,255,0.08)",
  stagger = 0.3,
  start = "top 80%",
  end = "bottom 30%",
}: ScrollWipeTextProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  // Resolve lines from `lines` (preferred) or `text` (fallback)
  const resolvedLines: ReactNode[] = lines
    ? lines
    : typeof text === "string"
    ? text.split("\n")
    : [];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const lineEls = root.querySelectorAll<HTMLElement>("[data-wipe-line]");
    if (!lineEls.length) return;

    const ctx = gsap.context(() => {
      gsap.set(lineEls, { backgroundPositionX: "100%" });
      gsap.to(lineEls, {
        backgroundPositionX: "0%",
        ease: "none",
        stagger,
        scrollTrigger: {
          trigger: root,
          start,
          end,
          scrub: 1,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [stagger, start, end]);

  // Nothing to render — bail early instead of crashing
  if (!resolvedLines.length) return null;

  return (
    <div ref={rootRef} className={className}>
      {resolvedLines.map((line, i) => (
        <span
          key={i}
          data-wipe-line
          className={`block ${lineClassName}`}
          style={{
            backgroundImage: `linear-gradient(to right, ${revealColor} 50%, ${hiddenColor} 50%)`,
            backgroundSize: "200% 100%",
            backgroundPositionX: "100%",
            color: "transparent",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
          }}
        >
          {line}
        </span>
      ))}
    </div>
  );
}