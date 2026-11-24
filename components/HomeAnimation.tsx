"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollWipeText from "./ScrollWipeText";
import MapSection from "./MapSection";

type Review = {
  quote: string;
  name: string;
  initials: string;
  localGuide?: boolean;
  reviewCount: number;
  photoCount?: number;
  timeAgo: string;
};

const REVIEWS: Review[] = [
  {
    quote:
      "The most painfree root canal done ever. Always serving patients with a smile, Dr Heena is a tooth fairy as my daughter would say it.",
    name: "Anand Gadhia",
    initials: "AG",
    localGuide: true,
    reviewCount: 16,
    photoCount: 11,
    timeAgo: "3 months ago",
  },
  {
    quote:
      "A wonderful experience with Dr Heena. She has a healing hand and knows how to tackle the condition when it comes to teeth. My all time favourite Dentist in Nairobi.",
    name: "Shruti Sankpal",
    initials: "SS",
    reviewCount: 7,
    photoCount: 3,
    timeAgo: "3 years ago",
  },
  {
    quote:
      "Dr. Heena is an amazing Dentist and an amazing person. She treated my dad's tooth problem and he is very happy with the results. I highly recommend Dr. Heena.",
    name: "Vaibhav",
    initials: "V",
    localGuide: true,
    reviewCount: 12,
    photoCount: 10,
    timeAgo: "3 years ago",
  },
  {
    quote:
      'Heena has been fantastic. My kids have felt being so at ease with her. Thanks Heena… "Tooth" been told — you are the best ⭐️',
    name: "Sneha Mashru",
    initials: "SM",
    reviewCount: 6,
    photoCount: 2,
    timeAgo: "2 years ago",
  },
  {
    quote:
      "You surely leave the clinic with a smile, very professional, awesome technology.",
    name: "Thaddeus Bah Masika",
    initials: "TM",
    localGuide: true,
    reviewCount: 16,
    photoCount: 97,
    timeAgo: "8 years ago",
  },
  {
    quote:
      "Thoroughly professional, ultimate in hygiene, sound advice, extremely satisfied with the value for money.",
    name: "Suresh Kanotra",
    initials: "SK",
    reviewCount: 9,
    timeAgo: "4 years ago",
  },
];

const services = [
  { name: "General Dentistry", image: "/assets/images/general-dentistry.jpg" },
  { name: "Orthodontics", image: "/assets/images/orthodontics.jpg" },
  { name: "Dental Implants", image: "/assets/images/implants.jpg" },
  { name: "Teeth Whitening", image: "/assets/images/whitening.jpg" },
  { name: "Dental Hygiene", image: "/assets/images/hygiene.jpg" },
  { name: "Preventive Care", image: "/assets/images/preventive.jpg" },
  { name: "Pediatric Dentistry", image: "/assets/images/pediatric.jpg" },
];

function ServicesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((c) => (c + 1) % services.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Preload all images once so the first cycle doesn't flicker
  useEffect(() => {
    services.forEach((s) => {
      const img = new window.Image();
      img.src = s.image;
    });
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-6 md:w-auto md:flex-row md:items-center">
      {/* ---------- IMAGE PANEL ---------- */}
      <div className="relative h-[320px] w-full max-w-[280px] shrink-0 overflow-hidden rounded-xl sm:h-[420px] md:h-[550px] md:w-[300px] lg:w-[350px]">
        {services.map((service, index) => (
          <img
            key={service.name}
            src={service.image}
            alt={service.name}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: index === activeIndex ? 1 : 0,
              transform:
                index === activeIndex
                  ? "scale(1.08)" // slow zoom when active (Ken Burns)
                  : "scale(1)",
              transition:
                "opacity 900ms cubic-bezier(0.4, 0, 0.2, 1), transform 4500ms cubic-bezier(0.4, 0, 0.2, 1)",
              willChange: "opacity, transform",
            }}
          />
        ))}

        {/* Optional subtle gradient overlay for depth */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* ---------- TEXT CAROUSEL ---------- */}
      <div className="services-list relative h-[200px] w-full max-w-[280px] shrink-0 overflow-hidden sm:h-[260px] md:h-[550px] md:w-[300px] lg:w-[350px]">
        {services.map((service, index) => {
          let offset = index - activeIndex;
          if (offset > services.length / 2) offset -= services.length;
          if (offset < -services.length / 2) offset += services.length;

          const distance = Math.abs(offset);
          const opacity =
            distance === 0
              ? 1
              : distance === 1
                ? 0.35
                : distance === 2
                  ? 0.12
                  : 0;

          return (
            <p
              key={service.name}
              className="service-name absolute left-0 w-full whitespace-nowrap text-center text-lg font-semibold tracking-tight sm:text-xl md:text-left md:text-3xl lg:text-4xl"
              style={{
                top: "50%",
                transform: `translateY(calc(${offset * 44}px - 50%)) scale(${
                  distance === 0 ? 1 : 0.94
                })`,
                opacity,
                filter: distance === 0 ? "blur(0px)" : "blur(0.4px)",
                transition:
                  "transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease, filter 700ms ease",
                willChange: "transform, opacity",
              }}
            >
              {service.name}
            </p>
          );
        })}
      </div>
    </div>
  );
}

gsap.registerPlugin(ScrollTrigger);

export default function HomeAnimation() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const firstSectionRef = useRef<HTMLElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);

  // Add this state
  const [year, setYear] = useState<number | null>(null);

  // Update it when the component mounts
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // 👇👇👇 ADD THE NEW useEffect HERE 👇👇👇
  useEffect(() => {
    // 1. Strip hash if present (prevents jumping to a section)
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }

    // 2. Disable browser scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // 3. Force to hero
    window.scrollTo(0, 0);

    // 4. Recalc ScrollTrigger after layout settles
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    // 5. Refresh again after full load (images, fonts)
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", onLoad);
    };
  }, []);
  // 👆👆👆 END OF NEW useEffect 👆👆👆

  // ONLY ONE useEffect IS NEEDED NOW
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(imageRef.current, {
        scale: 1,
        z: 0,
        transformOrigin: "center center",
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1.5,
        },
      });

      timeline
        .to(imageRef.current, { scale: 5, z: 10, ease: "power2.inOut" })
        .to(firstSectionRef.current, { scale: 1.5, ease: "power2.inOut" }, "<")
        .to(textOverlayRef.current, { opacity: 0, ease: "power1.out" }, -0.2);
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative w-full bg-[#171717]">
      {/* ALL SECTIONS INCLUDING HERO ARE IN THE STACK */}
      <div className="parallax-stack relative z-10">
        {/* HERO PANEL */}
        <div
          ref={wrapperRef}
          data-cta-theme="dark"
          className="parallax-panel panel-hero"
        >
          <div className="parallax-inner relative h-full w-full">
            {/* Base Image */}
            <section
              id="about"
              data-cta-theme="light"
              ref={firstSectionRef}
              className="absolute inset-0 h-full w-full overflow-hidden"
            >
              <Image
                ref={heroImageRef}
                src="/assets/images/hero.png"
                alt="Konfidental dental care"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center will-change-transform"
              />
            </section>

            {/* GSAP ZOOM OVERLAY */}
            <div className="pointer-events-none absolute inset-0 z-2 h-full w-full overflow-hidden">
              <Image
                ref={imageRef}
                src="/assets/images/2.png"
                alt="Dental care hero visual"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center will-change-transform"
              />
              {/* Overlay Text */}
              <div
                ref={textOverlayRef}
                className="absolute inset-0 z-3 flex flex-col justify-between px-4 py-6 text-[#171717] sm:px-6 sm:py-8 md:px-12 lg:px-20"
              >
                <h1 className="absolute left-[6%] top-[14%] max-w-[80%] text-4xl font-semibold leading-[0.9] tracking-tight sm:text-5xl md:top-[20%] md:max-w-[50%] md:text-7xl lg:text-8xl">
                  Comfortable
                  <br />
                  Care
                </h1>
                <div className="absolute bottom-[12%] left-[6%] max-w-[180px] sm:max-w-70 md:bottom-[12%]">
                  <h2 className="text-base font-semibold leading-tight tracking-tight sm:text-xl md:text-3xl">
                    Your Destination to
                    <br />
                    Enjoy Smiling with Confidence
                  </h2>
                </div>
                <h2 className="absolute right-[6%] top-[82%] text-right text-4xl font-semibold leading-[0.9] tracking-tight sm:text-5xl md:top-[48%] md:text-7xl lg:text-8xl">
                  Confidental
                  <br />
                  Smile
                </h2>
                <div className="absolute bottom-[80%] right-[6%] flex w-auto items-center pt-6 text-[10px] font-semibold uppercase md:bottom-[12%] md:w-[15%] md:max-w-[25dvw] md:text-xs">
                  <div className="scroll-trigger pointer-events-auto flex flex-col items-center gap-2">
                    <a href="#about" aria-label="Scroll to explore">
                      <div id="mouse-scroll">
                        <div className="mouse">
                          <div className="mouse-in" />
                        </div>

                        <div>
                          <span className="down-arrow-1" />
                          <span className="down-arrow-2" />
                          <span className="down-arrow-3" />
                        </div>
                      </div>
                    </a>

                    <span className="norris-text norris-dark">
                      {"Scroll down".split("").map((char, index) => (
                        <span
                          key={index}
                          className="norris-char"
                          style={
                            { "--char-index": index } as React.CSSProperties
                          }
                        >
                          <span
                            className="norris-char-inner"
                            data-char={char === " " ? "\u00A0" : char}
                          >
                            {char === " " ? "\u00A0" : char}
                          </span>
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-delay" />

        {/* Section 02 — About */}
        <section
          id="about"
          data-cta-theme="light"
          className="parallax-panel panel-about
             relative md:sticky
             h-auto min-h-[200svh] md:min-h-[100svh]
             overflow-visible"
        >
          <div className="parallax-inner px-4 py-12 sm:px-6 sm:py-16 md:px-12 md:py-24 lg:px-20">
            <div className="relative z-10 mx-auto w-full max-w-8xl">
              <div className="mb-10 flex flex-col gap-8 sm:mb-14 md:mb-20 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="mb-6 flex items-center gap-4" />

                  {/* HEADLINE — big word, wide window */}
                  <div className="inline-flex items-end">
                    <ScrollWipeText
                      className="text-4xl font-bold tracking-normal sm:text-5xl md:text-7xl lg:text-[7rem]"
                      text="About us"
                      revealColor="#171717"
                      hiddenColor="#e5e5e5"
                      stagger={0}
                      start="top 85%"
                      end="bottom 50%"
                    />
                    <span className="text-4xl font-bold tracking-normal text-[#075874] sm:text-5xl md:text-7xl lg:text-[7rem]">
                      .
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-24">
                {/* LEFT COLUMN */}
                <div className="flex flex-col justify-between lg:col-span-7">
                  <div>
                    {/* SUB-HEADLINE — 2 lines, generous window */}
                    <ScrollWipeText
                      className="max-w-2xl text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
                      lines={[
                        "Your Family Dentist.",
                        <>
                          Your Smile, Our{" "}
                          <span className="text-[#075874]">Priority.</span>
                        </>,
                      ]}
                      revealColor="#171717"
                      hiddenColor="#e5e5e5"
                      stagger={0.15}
                      start="top 85%"
                      end="bottom 45%"
                      text={undefined}
                    />

                    {/* PARAGRAPH 1 — long text needs a wide window */}
                    <ScrollWipeText
                      className="mt-6 max-w-2xl text-base leading-relaxed text-[#171717]/80 sm:mt-8 sm:text-lg md:mt-10 md:text-xl md:leading-relaxed"
                      text="At Konfidental Clinic, we believe every smile deserves exceptional care. We are dedicated to providing quality, personalised dental services for adults and children in a friendly and welcoming environment."
                      revealColor="#171717"
                      hiddenColor="#e5e5e5"
                      stagger={0}
                      start="top 88%"
                      end="bottom 70%"
                    />

                    {/* PARAGRAPH 2 — same treatment */}
                    <ScrollWipeText
                      className="mt-4 max-w-2xl text-base leading-relaxed text-[#171717]/60 sm:mt-6 md:text-[17px] md:leading-relaxed"
                      text="From routine dental check-ups to advanced treatments, we take the time to understand your needs and make every visit as comfortable as possible. Our approach combines professional expertise with genuine care for your confidence and long-term oral health."
                      revealColor="#171717"
                      hiddenColor="#e5e5e5"
                      stagger={0}
                      start="top 90%"
                      end="bottom 78%"
                    />
                  </div>

                  {/* ADDRESS CARD */}
                  <div className="mt-8 border border-[#171717]/10 bg-[#fafafa] p-2 sm:mt-10 lg:mt-12">
                    <div className="flex flex-col gap-5 p-4 sm:gap-6 sm:p-6 md:flex-row md:items-center md:justify-between lg:p-8">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#171717]/5 text-[#075874]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                            <circle cx="12" cy="10" r="2.5" />
                          </svg>
                        </div>
                        <div>
                          {/* Card title — short, narrow window */}
                          <ScrollWipeText
                            className="text-sm font-semibold uppercase tracking-widest text-[#171717]"
                            text="Visit our clinic"
                            revealColor="#171717"
                            hiddenColor="#dcdcdc"
                            stagger={0}
                            start="top 92%"
                            end="bottom 70%"
                          />
                          {/* Card address */}
                          <ScrollWipeText
                            className="mt-1 max-w-sm text-sm leading-relaxed text-[#171717]/60"
                            text="Kenrail Towers, Northern Wing, Floor M1, Mkungu Close, off Ring Road, Westlands, Nairobi."
                            revealColor="#171717"
                            hiddenColor="#e5e5e5"
                            stagger={0}
                            start="top 92%"
                            end="bottom 92%"
                          />
                        </div>
                      </div>
                      <div>
                        <a
                          href="https://www.google.com/maps/dir/Nairobi+Cbd,+Nairobi/Dentists+At+The+Place,+The+Place+@+67,+General+Mathenge+Drive,+Nairobi/@-1.257273,36.7722232,34732m/data=!3m2!1e3!4b1!4m13!4m12!1m5!1m1!1s0x182f116041c8127d:0x97121230126f6bd0!2m2!1d36.9025814!2d-1.2482996!1m5!1m1!1s0x182f17ae62d1a331:0x79306285060fb37!2m2!1d36.8060076!2d-1.2559186!5m1!1e1?entry=ttu"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-3 rounded-full border border-gray-200/80 bg-white/70 px-6 py-3 text-sm font-semibold text-[#171717] shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all duration-300 hover:border-[#075874]/30 hover:bg-[#075874]/5 hover:shadow-[0_8px_28px_rgba(7,88,116,0.12)] focus:outline-none focus:ring-2 focus:ring-[#075874] focus:ring-offset-2"
                        >
                          <span>Get Directions</span>

                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          >
                            <path d="M7 17 17 7M7 7h10v10" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="flex flex-col lg:col-span-5">
                  <div className="mb-8 sm:mb-10">
                    {/* EYEBROW — tiny text, tight window */}
                    <ScrollWipeText
                      className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#075874]"
                      text="The Konfidental difference"
                      revealColor="#075874"
                      hiddenColor="rgba(7,88,116,0.15)"
                      stagger={0}
                      start="top 80%"
                      end="bottom 20%"
                    />

                    {/* RIGHT HEADLINE */}
                    <ScrollWipeText
                      className="mt-4 text-2xl font-semibold tracking-tight text-[#171717] sm:text-3xl md:text-3xl lg:text-4xl"
                      text="Care that puts you first."
                      revealColor="#171717"
                      hiddenColor="#e5e5e5"
                      stagger={0}
                      start="top 80%"
                      end="bottom 32%"
                    />
                  </div>

                  <div className="flex flex-col">
                    {[
                      {
                        num: "01",
                        title: "Comprehensive Dental Care",
                        text: "From preventive check-ups to specialised dental treatments, we care for your smile at every stage.",
                      },
                      {
                        num: "02",
                        title: "Personalised Attention",
                        text: "Every patient is different. We take time to understand your concerns and tailor care around your individual needs.",
                      },
                      {
                        num: "03",
                        title: "Comfort & Confidence",
                        text: "We strive to create a welcoming experience that helps you feel relaxed, informed, and confident throughout your dental journey.",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="group border-t border-[#171717]/10 py-5 transition-colors hover:bg-[#fafafa] last:border-b sm:py-8"
                      >
                        <div className="flex items-start gap-4 px-2 sm:gap-6">
                          {/* Badge — very short text, tightest window */}
                          <ScrollWipeText
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#075874]/10 text-xs font-bold text-[#075874]"
                            text={item.num}
                            revealColor="#075874"
                            hiddenColor="rgba(7,88,116,0.15)"
                            stagger={0}
                            start="top 90%"
                            end="bottom 85%"
                          />
                          <div className="min-w-0 flex-1">
                            {/* Item title — short line */}
                            <ScrollWipeText
                              className="text-lg font-semibold tracking-tight text-[#171717] sm:text-xl md:text-2xl"
                              text={item.title}
                              revealColor="#171717"
                              hiddenColor="#dcdcdc"
                              stagger={0}
                              start="top 90%"
                              end="bottom 70%"
                            />
                            {/* Item body */}
                            <ScrollWipeText
                              className="mt-2 text-sm leading-relaxed text-[#171717]/60 sm:mt-3 md:text-base md:leading-relaxed"
                              text={item.text}
                              revealColor="#171717"
                              hiddenColor="#e5e5e5"
                              stagger={0}
                              start="top 89%"
                              end="bottom 92%"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03 — Our Services */}
        <section
          id="services"
          data-cta-theme="dark"
          data-nav-active="dark"
          className="parallax-panel panel-services min-h-screen text-white"
        >
          <div className="parallax-inner px-4 py-16 sm:px-6 md:px-12 md:py-20 lg:px-20">
            <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center gap-10 md:flex-row md:gap-0">
              <div className="flex w-full shrink-0 items-center justify-center md:w-auto md:justify-start">
                <h2 className="whitespace-nowrap text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  Our Services
                </h2>
              </div>
              <div className="hidden flex-1 items-center px-5 md:flex md:px-8">
                <div className="h-px flex-1 bg-white/20" />
                <span className="mx-4 text-2xl md:text-3xl">✦</span>
                <div className="h-px flex-1 bg-white/20" />
              </div>
              <ServicesCarousel />
            </div>
          </div>
        </section>

        {/* Section 05 — Testimonials */}
        <section
          data-cta-theme="light"
          data-nav-active="light"
          id="testimonials"
          className="parallax-panel panel-testimonials relative h-auto overflow-visible"
        >
          <div className="parallax-inner px-4 pt-20 pb-6 sm:px-6 sm:pt-24 sm:pb-8 md:px-12 md:pt-32 md:pb-10 lg:px-20 lg:pt-36">
            <div className="relative z-10 mx-auto max-w-8xl">
              {/* HEADER ROW */}
              <div className="mb-10 flex flex-col gap-6 sm:mb-14 md:mb-20 md:flex-row md:items-end md:justify-between md:gap-8">
                <div>
                  <div className="mb-5 flex items-center gap-3" />

                  {/* HEADLINE — "Kind words." — wipe word, keep period crisp */}
                  <div className="inline-flex items-end">
                    <ScrollWipeText
                      className="text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl lg:text-8xl"
                      text="Kind words"
                      revealColor="#171717"
                      hiddenColor="#e5e5e5"
                      stagger={0}
                      start="top 85%"
                      end="bottom 50%"
                    />
                    <span className="text-4xl font-bold tracking-tight text-[#075874] sm:text-5xl md:text-7xl lg:text-8xl">
                      .
                    </span>
                  </div>
                </div>

                {/* INTRO PARAGRAPH */}
                <ScrollWipeText
                  className="max-w-sm text-base leading-relaxed text-[#171717]/60 md:text-lg"
                  text="Real stories from patients who trust us with their smiles — and keep coming back."
                  revealColor="#171717"
                  hiddenColor="#e5e5e5"
                  stagger={0}
                  start="top 88%"
                  end="bottom 55%"
                />
              </div>

              {/* TESTIMONIAL CARDS GRID */}
              <div className="grid grid-cols-1 gap-px bg-[#171717]/10 md:grid-cols-2 lg:grid-cols-3">
                {REVIEWS.map((t, i) => (
                  <div
                    key={i}
                    className="group relative flex flex-col bg-white p-6 transition-colors duration-300 hover:bg-[#fafafa] sm:p-8 md:p-10"
                  >
                    {/* CARD INDEX NUMBER */}
                    <ScrollWipeText
                      className="mb-4 text-xs font-semibold tracking-[0.25em] text-[#171717]/30 sm:mb-5"
                      text={`0${i + 1}`}
                      revealColor="#171717"
                      hiddenColor="#e5e5e5"
                      stagger={0}
                      start="top 92%"
                      end="bottom 75%"
                    />

                    {/* STARS */}
                    <div className="mb-3 flex gap-1 text-[#075874] sm:mb-4">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <svg
                          key={s}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M12 2l2.9 6.9L22 9.6l-5.4 4.9 1.7 7.2L12 17.8 5.7 21.7l1.7-7.2L2 9.6l7.1-.7L12 2z" />
                        </svg>
                      ))}
                    </div>

                    {/* QUOTE BODY — flex-1 pushes author row to bottom */}
                    <ScrollWipeText
                      className="mb-6 flex-1 text-base leading-relaxed text-[#171717]/85 sm:text-lg"
                      text={`"${t.quote}"`}
                      revealColor="#171717"
                      hiddenColor="#e5e5e5"
                      stagger={0}
                      start="top 90%"
                      end="bottom 90%"
                    />

                    {/* AUTHOR ROW */}
                    <div className="flex items-center gap-4 border-t border-[#171717]/10 pt-5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#075874] text-sm font-semibold text-white">
                        {t.initials}
                      </div>
                      <div className="min-w-0">
                        {/* Author name */}
                        <ScrollWipeText
                          className="text-sm font-semibold text-[#171717]"
                          text={t.name}
                          revealColor="#171717"
                          hiddenColor="#dcdcdc"
                          stagger={0}
                          start="top 95%"
                          end="bottom 105%"
                        />
                        {/* Author meta — Local Guide / reviews / photos / time */}
                        <p className="mt-0.5 text-xs text-[#171717]/50">
                          {t.localGuide && (
                            <span className="font-medium text-[#075874]">
                              Local Guide ·{" "}
                            </span>
                          )}
                          {t.reviewCount} review{t.reviewCount === 1 ? "" : "s"}
                          {/* {t.photoCount
                            ? ` · ${t.photoCount} photo${
                                t.photoCount === 1 ? "" : "s"
                              }`
                            : ""} */}
                          {/* {" · "} */}
                          {/* {t.timeAgo} */}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 06 — Map */}
        <section
          data-cta-theme="light"
          className="parallax-panel panel-map relative md:sticky h-auto min-h-[100svh] md:min-h-[100svh] overflow-visible bg-[#f8f9fa]"
        >
          <div className="parallax-inner px-4 py-10 sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-20">
            <div className="mx-auto flex w-full max-w-[1300px] flex-col items-center justify-center gap-8 lg:flex-row lg:gap-20">
              {/* ─── Right Side - Map (shows FIRST on mobile) ─── */}
              <div className="order-1 w-full lg:order-2 lg:w-[55%]">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#171717]/10 shadow-xl sm:aspect-[16/10] md:h-[550px] md:aspect-auto lg:h-[650px]">
                  <MapSection />
                </div>
              </div>

              {/* ─── Left Side - Text Content (shows SECOND on mobile) ─── */}
              <div className="order-2 flex w-full flex-col justify-center lg:order-1 lg:w-[45%]">
                {/* Eyebrow */}
                <ScrollWipeText
                  className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#075874] sm:mb-4"
                  text="Visit Us"
                  revealColor="#075874"
                  hiddenColor="rgba(7,88,116,0.15)"
                  stagger={0}
                  start="top 85%"
                  end="bottom 60%"
                />

                {/* Headline - Inline the teal period */}
                <div className="inline-flex items-end">
                  <ScrollWipeText
                    className="text-4xl font-bold leading-[0.95] tracking-tight text-[#171717] sm:text-5xl md:text-7xl lg:text-[5.5rem]"
                    lines={["Our", "Location"]}
                    revealColor="#171717"
                    hiddenColor="#e5e5e5"
                    stagger={0.15}
                    start="top 85%"
                    end="bottom 50%"
                    text={undefined}
                  />
                  <span className="text-4xl font-bold leading-[0.95] tracking-tight text-[#075874] sm:text-5xl md:text-7xl lg:text-[5.5rem]">
                    .
                  </span>
                </div>

                {/* Paragraph */}
                <ScrollWipeText
                  className="mt-5 max-w-md text-base leading-relaxed text-[#171717]/60 sm:mt-8 md:text-lg"
                  text="Visit our state-of-the-art clinic in the heart of Westlands. We are easily accessible, with ample parking and a welcoming environment designed to put you at ease from the moment you arrive."
                  revealColor="#171717"
                  hiddenColor="#e5e5e5"
                  stagger={0}
                  start="top 88%"
                  end="bottom 65%"
                />

                {/* Contact Details List */}
                <div className="mt-6 flex flex-col gap-5 sm:mt-10 sm:gap-6">
                  {/* Address Item */}
                  <div className="flex items-start gap-4 text-[#171717]/80">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#171717]/5 text-[#075874]">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                    </div>
                    <div className="pt-1">
                      <ScrollWipeText
                        className="text-sm font-semibold text-[#171717]"
                        text="Clinic Address"
                        revealColor="#171717"
                        hiddenColor="#dcdcdc"
                        stagger={0}
                        start="top 90%"
                        end="bottom 75%"
                      />
                      <ScrollWipeText
                        className="mt-1 text-sm text-[#171717]/60"
                        text="M1 Southern Wing, Kenrail Towers, Mkungu Cl, Nairobi"
                        revealColor="#171717"
                        hiddenColor="#e5e5e5"
                        stagger={0}
                        start="top 90%"
                        end="bottom 70%"
                      />
                    </div>
                  </div>

                  {/* Hours Item — uncomment `hidden sm:flex` below to hide on tiny phones */}
                  <div className="flex items-start gap-4 text-[#171717]/80">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#171717]/5 text-[#075874]">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" />
                      </svg>
                    </div>
                    <div className="pt-1">
                      <ScrollWipeText
                        className="text-sm font-semibold text-[#171717]"
                        text="Opening Hours"
                        revealColor="#171717"
                        hiddenColor="#dcdcdc"
                        stagger={0}
                        start="top 90%"
                        end="bottom 75%"
                      />
                      <ScrollWipeText
                        className="mt-1 text-sm text-[#171717]/60"
                        text="Mon–Fri · 8:00 AM – 6:00 PM"
                        revealColor="#171717"
                        hiddenColor="#e5e5e5"
                        stagger={0}
                        start="top 90%"
                        end="bottom 75%"
                      />
                    </div>
                  </div>
                </div>

                {/* Google Maps Directions Button */}
                <div className="mt-6 sm:mt-10">
                  <a
                    href="https://maps.app.goo.gl/5GXX3SyndBpKVrpVA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full border border-gray-200/80 bg-white/70 px-6 py-3 text-sm font-semibold text-[#171717] shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all duration-300 hover:border-[#075874]/30 hover:bg-[#075874]/5 hover:shadow-[0_8px_28px_rgba(7,88,116,0.12)] focus:outline-none focus:ring-2 focus:ring-[#075874] focus:ring-offset-2"
                  >
                    <span>Get Directions</span>

                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer
        data-cta-theme="light"
        className="relative z-50 w-full border-t border-[#171717]/10 bg-white px-4 py-12 text-[#171717] sm:px-6 sm:py-16 md:px-12 lg:px-20"
      >
        <div className="mx-auto max-w-[1400px]">
          {/* NEWSLETTER ROW */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Headline — 2-line wipe */}
            <ScrollWipeText
              className="max-w-md text-2xl font-bold tracking-tight text-[#171717] sm:text-3xl md:text-3xl lg:text-4xl"
              lines={["Join our newsletter to", "keep up to date with us!"]}
              revealColor="#171717"
              hiddenColor="#e5e5e5"
              stagger={0.15}
              start="top 90%"
              end="bottom 59%"
              text={undefined}
            />

            {/* Form */}
            <form
              className="flex w-full max-w-md items-center gap-2 rounded-full border border-[#171717]/20 p-1.5 pl-4 transition-all focus-within:border-[#075874] focus-within:ring-1 focus-within:ring-[#075874]"
              onSubmit={(e) => e.preventDefault()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-[#171717]/40"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#171717]/40"
                required
              />
              <button
                type="submit"
                className="group shrink-0 rounded-full bg-[#075874] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#054a61] sm:px-5"
              >
                <ScrollWipeText
                  className="text-sm font-semibold text-white text-inherit"
                  text="Subscribe"
                  revealColor="#ffffff"
                  hiddenColor="rgba(255,255,255,0.25)"
                  stagger={0}
                  start="top 95%"
                  end="bottom 75%"
                />
              </button>
            </form>
          </div>

          <hr className="my-10 border-[#171717]/10 sm:my-12" />

          {/* MAIN FOOTER GRID */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12 lg:gap-8">
            {/* BRAND BLOCK */}
            <div className="md:col-span-5 lg:col-span-6">
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-[#075874]/10 text-[#075874]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M12 2c-3.31 0-5 1.79-5 5 0 3.5 2.5 6 5 6s5-2.5 5-6c0-3.21-1.69-5-5-5zM7 15c-2.21 0-4 1.79-4 4v1h18v-1c0-2.21-1.79-4-4-4H7z" />
                </svg>
              </div>

              {/* Brand name — keep period teal outside the wipe */}
              <div className="inline-flex items-end">
                <ScrollWipeText
                  className="text-2xl font-bold tracking-tight text-[#171717]"
                  text="Konfidental"
                  revealColor="#171717"
                  hiddenColor="#e5e5e5"
                  stagger={0}
                  start="top 92%"
                  end="bottom 78%"
                />
                <span className="text-2xl font-bold tracking-tight text-[#075874]">
                  .
                </span>
              </div>

              {/* Brand blurb */}
              <ScrollWipeText
                className="mt-3 max-w-xs text-sm leading-relaxed text-[#171717]/60"
                text="We're growing smiles with personalised dental care. Your family dentist in Westlands, Nairobi."
                revealColor="#171717"
                hiddenColor="#e5e5e5"
                stagger={0}
                start="top 92%"
                end="bottom 82%"
              />
            </div>

            {/* LINK COLUMNS */}
            <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3 lg:col-span-6">
              {/* SERVICES COLUMN */}
              <div>
                <ScrollWipeText
                  className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#171717]/40"
                  text="Services"
                  revealColor="#171717"
                  hiddenColor="#e5e5e5"
                  stagger={0}
                  start="top 92%"
                  end="bottom 75%"
                />
                <ul className="space-y-3 text-sm text-[#171717]/70">
                  <li>
                    <ScrollWipeText
                      text="General Dentistry"
                      revealColor="#171717"
                      hiddenColor="#e5e5e5"
                      stagger={0}
                      start="top 92%"
                      end="bottom 72%"
                    />
                  </li>
                  <li>
                    <ScrollWipeText
                      text="Orthodontics"
                      revealColor="#171717"
                      hiddenColor="#e5e5e5"
                      stagger={0}
                      start="top 92%"
                      end="bottom 72%"
                    />
                  </li>
                  <li>
                    <ScrollWipeText
                      text="Dental Implants"
                      revealColor="#171717"
                      hiddenColor="#e5e5e5"
                      stagger={0}
                      start="top 92%"
                      end="bottom 72%"
                    />
                  </li>
                  <li>
                    <ScrollWipeText
                      text="Teeth Whitening"
                      revealColor="#171717"
                      hiddenColor="#e5e5e5"
                      stagger={0}
                      start="top 92%"
                      end="bottom 72%"
                    />
                  </li>
                  <li>
                    <ScrollWipeText
                      text="Dental Hygiene"
                      revealColor="#171717"
                      hiddenColor="#e5e5e5"
                      stagger={0}
                      start="top 92%"
                      end="bottom 74%"
                    />
                  </li>
                </ul>
              </div>

              {/* COMPANY COLUMN */}
              <div>
                <ScrollWipeText
                  className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#171717]/40"
                  text="Company"
                  revealColor="#171717"
                  hiddenColor="#e5e5e5"
                  stagger={0}
                  start="top 92%"
                  end="bottom 75%"
                />
                <ul className="space-y-3 text-sm text-[#171717]/70">
                  <li>
                    <a
                      href="#about"
                      className="transition-colors hover:text-[#075874]"
                    >
                      <ScrollWipeText
                        text="About us"
                        revealColor="#171717"
                        hiddenColor="#e5e5e5"
                        stagger={0}
                        start="top 92%"
                        end="bottom 72%"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      className="transition-colors hover:text-[#075874]"
                    >
                      <ScrollWipeText
                        text="Our Services"
                        revealColor="#171717"
                        hiddenColor="#e5e5e5"
                        stagger={0}
                        start="top 92%"
                        end="bottom 72%"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#testimonials"
                      className="transition-colors hover:text-[#075874]"
                    >
                      <ScrollWipeText
                        text="Testimonials"
                        revealColor="#171717"
                        hiddenColor="#e5e5e5"
                        stagger={0}
                        start="top 92%"
                        end="bottom 72%"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="transition-colors hover:text-[#075874]"
                    >
                      <ScrollWipeText
                        text="Book Appointment"
                        revealColor="#171717"
                        hiddenColor="#e5e5e5"
                        stagger={0}
                        start="top 92%"
                        end="bottom 73%"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="transition-colors hover:text-[#075874]"
                    >
                      <ScrollWipeText
                        text="Patient FAQ"
                        revealColor="#171717"
                        hiddenColor="#e5e5e5"
                        stagger={0}
                        start="top 92%"
                        end="bottom 72%"
                      />
                    </a>
                  </li>
                </ul>
              </div>

              {/* CONTACT COLUMN */}
              <div className="col-span-2 md:col-span-1">
                <ScrollWipeText
                  className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#171717]/40"
                  text="Contact"
                  revealColor="#171717"
                  hiddenColor="#e5e5e5"
                  stagger={0}
                  start="top 92%"
                  end="bottom 75%"
                />
                <ul className="space-y-3 text-sm text-[#171717]/70">
                  <li>
                    <ScrollWipeText
                      className="leading-relaxed"
                      lines={[
                        "Kenrail Towers, Northern Wing,",
                        "Westlands, Nairobi",
                      ]}
                      revealColor="#171717"
                      hiddenColor="#e5e5e5"
                      stagger={0}
                      start="top 92%"
                      end="bottom 74%"
                      text={undefined}
                    />
                  </li>
                  <li>
                    <a
                      href="tel:+254700000000"
                      className="transition-colors hover:text-[#075874]"
                    >
                      <ScrollWipeText
                        text="+254 700 000 000"
                        revealColor="#171717"
                        hiddenColor="#e5e5e5"
                        stagger={0}
                        start="top 92%"
                        end="bottom 72%"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:hello@konfidental.co.ke"
                      className="break-all transition-colors hover:text-[#075874]"
                    >
                      <ScrollWipeText
                        text="hello@konfidental.co.ke"
                        revealColor="#171717"
                        hiddenColor="#e5e5e5"
                        stagger={0}
                        start="top 92%"
                        end="bottom 77%"
                      />
                    </a>
                  </li>
                  <li className="pt-2">
                    <ScrollWipeText
                      className="text-[#171717]/50"
                      text="Mon – Fri, 8:00 – 18:00"
                      revealColor="#171717"
                      hiddenColor="#e5e5e5"
                      stagger={0}
                      start="top 92%"
                      end="bottom 82%"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="my-8 border-[#171717]/10 sm:my-10" />

          {/* BOTTOM BAR */}
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-[#171717]/50 md:flex-row">
            <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:gap-6 sm:text-left">
              <ScrollWipeText
                className="text-xs text-[#171717]/50"
                text={
                  <>
                    Designed & Maintained by{" "}
                    <span className="font-semibold text-[#075874]">
                      32 Technologies
                    </span>{" "}
                    “Teching Care Of You”
                  </>
                }
                revealColor="#171717"
                hiddenColor="#e5e5e5"
                stagger={0}
                start="top 95%"
                end="bottom 94%"
              />
              <ScrollWipeText
                className="text-xs text-[#171717]/50"
                text={`© ${year || 2024} Konfidental Clinic.`}
                revealColor="#171717"
                hiddenColor="#e5e5e5"
                stagger={0}
                start="top 95%"
                end="bottom 95%"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <a href="#" className="transition-colors hover:text-[#075874]">
                <ScrollWipeText
                  text="Terms of Service"
                  revealColor="#171717"
                  hiddenColor="#e5e5e5"
                  stagger={0}
                  start="top 95%"
                  end="bottom 94%"
                />
              </a>
              <a href="#" className="transition-colors hover:text-[#075874]">
                <ScrollWipeText
                  text="Privacy Policy"
                  revealColor="#171717"
                  hiddenColor="#e5e5e5"
                  stagger={0}
                  start="top 95%"
                  end="bottom 94%"
                />
              </a>
              <a href="#" className="transition-colors hover:text-[#075874]">
                <ScrollWipeText
                  text="Cookies"
                  revealColor="#171717"
                  hiddenColor="#e5e5e5"
                  stagger={0}
                  start="top 95%"
                  end="bottom 94%"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
