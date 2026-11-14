"use client";

import { useEffect, useRef, ReactNode, ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ScrollRevealText.module.css";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealTextProps {
  /** Content to reveal — plain text, or JSX with one child per line */
  children: ReactNode;
  /** Element to render as the wrapper (default: div) */
  as?: ElementType;
  /** Font size (any CSS value). Default: clamp(3rem, 10vw, 140px) */
  fontSize?: string;
  /** Font family (any CSS value) */
  fontFamily?: string;
  /** Revealed color. Default: #fff */
  revealColor?: string;
  /** Hidden color. Default: #252525 */
  hiddenColor?: string;
  /** Stagger between lines. Default: 1 */
  stagger?: number;
  /** Scrubbing smoothness. Default: 1 */
  scrub?: number | boolean;
  /** Vertical spacing between lines (any CSS value). Default: -0.8em */
  lineGap?: string;
  /** Extra class for the wrapper */
  className?: string;
  /** Extra class applied to each reveal line */
  lineClassName?: string;
}

export default function ScrollRevealText({
  children,
  as: Tag = "div",
  fontSize = "clamp(3rem, 10vw, 140px)",
  fontFamily = "inherit",
  revealColor = "#ffffff",
  hiddenColor = "#252525",
  stagger = 1,
  scrub = 1,
  lineGap = "-0.8em",
  className = "",
  lineClassName = "",
}: ScrollRevealTextProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Find every reveal target inside this component (scoped to root)
    const targets = root.querySelectorAll<HTMLElement>(`.${styles.line}`);
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.to(targets, {
        backgroundPositionX: "0%",
        stagger,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          scrub,
          start: "top center",
          end: "bottom top",
        },
      });
    }, root);

    return () => ctx.revert();
  }, [stagger, scrub]);

  // Split children into "line" wrappers.
  // If children is a single string, break on newlines.
  const lines: ReactNode[] = [];
  if (typeof children === "string") {
    children.split("\n").forEach((line, i) => {
      lines.push(
        <span key={i} className={styles.line}>
          {line}
        </span>
      );
    });
  } else {
    // If it's JSX, treat each top-level child as one line.
    const arr = Array.isArray(children) ? children : [children];
    arr.forEach((child, i) => {
      lines.push(
        <span key={i} className={styles.line}>
          {child}
        </span>
      );
    });
  }

  return (
    <Tag
      ref={rootRef as any}
      className={`${styles.wrapper} ${className}`}
      style={
        {
          "--reveal-font-size": fontSize,
          "--reveal-font-family": fontFamily,
          "--reveal-color": revealColor,
          "--reveal-hidden": hiddenColor,
          "--reveal-line-gap": lineGap,
        } as React.CSSProperties
      }
    >
      {lines}
    </Tag>
  );
}