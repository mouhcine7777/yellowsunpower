"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Montserrat } from "next/font/google";
import { PROJECTS, PROJECTS_EN, PROJECTS_NL } from "../data/projects";
import { useLocale } from "../lib/locale";

/*
  Installations section — YellowSun Power
  Same dark token family: ink #14120F, gold #F2A93B, paper #F5EFE3,
  stone #A69C88.

  A single auto-scrolling filmstrip, on every breakpoint including
  mobile: it drives the wrapper's native scrollLeft itself (rAF loop)
  rather than a CSS keyframe transform, so the exact same scroll
  position is shared between "auto" and "manual" modes — no jump when
  switching. The moment the user actually interacts (touch, drag,
  wheel), auto-scroll stops for good and it becomes a normal
  swipeable/scrollable strip; on desktop, hovering still pauses it
  temporarily like before, without disabling auto-scroll permanently.

  Three copies of the card list sit back to back and a scroll listener
  silently snaps back by one copy's width whenever the edge of the
  first or third copy is reached, so it loops forever regardless of
  whether the position is being driven automatically or by the user,
  even with only a handful of projects.
*/

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-nav",
});

const AUTO_SCROLL_DURATION_MS = 72000; // time to scroll exactly one copy's width

const TEXT = {
  fr: {
    eyebrow: "Réalisations",
    heading: "Nos Installations Solaires Premium",
    paragraph:
      "Chaque toiture est un cas particulier : dimensionnement, orientation et intégration pensés projet par projet.",
    cta: "Voir toutes nos réalisations",
    ctaHref: "/realisations",
  },
  en: {
    eyebrow: "Projects",
    heading: "Our Premium Solar Installations",
    paragraph:
      "Every roof is a unique case: sizing, orientation and integration are considered project by project.",
    cta: "See all our projects",
    ctaHref: "/en/projects",
  },
  nl: {
    eyebrow: "Projecten",
    heading: "Onze Premium Zonne-installaties",
    paragraph:
      "Elk dak is een uniek geval: dimensionering, oriëntatie en integratie worden per project bekeken.",
    cta: "Bekijk al onze projecten",
    ctaHref: "/nl/projecten",
  },
};

function Card({ project }) {
  return (
    <div className="group relative aspect-[3/4] w-[280px] shrink-0 overflow-hidden rounded-3xl border border-[#F5EFE3]/10 sm:w-[330px] lg:w-[380px]">
      <Image
        src={project.image}
        alt={`${project.title}, ${project.location}`}
        fill
        sizes="(min-width: 1024px) 380px, (min-width: 640px) 330px, 280px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14120F] via-[#14120F]/30 to-[#14120F]/10" />

      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <div className="flex items-start justify-between">
          <span className="rounded-full border border-white/10 bg-[#14120F]/70 px-3 py-1 text-xs font-bold text-[#F2A93B] backdrop-blur-sm">
            {project.power}
          </span>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-white/70 backdrop-blur-sm">
            {project.type}
          </span>
        </div>

        <div>
          <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-[#F2A93B]/90">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 22C12 22 19 15.5 19 10C19 5.6 15.9 2 12 2C8.1 2 5 5.6 5 10C5 15.5 12 22 12 22Z M12 12.5C13.4 12.5 14.5 11.4 14.5 10C14.5 8.6 13.4 7.5 12 7.5C10.6 7.5 9.5 8.6 9.5 10C9.5 11.4 10.6 12.5 12 12.5Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
            {project.location}
          </p>
          <p className="mt-1.5 text-lg font-semibold text-[#F5EFE3]">
            {project.title}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-[#A69C88] line-clamp-2">
            {project.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function InstallationsSection() {
  const locale = useLocale();
  const t = TEXT[locale];
  const projects =
    locale === "en" ? PROJECTS_EN : locale === "nl" ? PROJECTS_NL : PROJECTS;

  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const setWidth = wrapper.scrollWidth / 3;
    wrapper.scrollLeft = setWidth;

    // Keep the position inside the middle copy no matter what's
    // driving scrollLeft — the rAF loop below, or the user.
    const wrapBoundaries = () => {
      if (wrapper.scrollLeft <= 0) {
        wrapper.scrollLeft += setWidth;
      } else if (wrapper.scrollLeft >= setWidth * 2) {
        wrapper.scrollLeft -= setWidth;
      }
    };
    wrapper.addEventListener("scroll", wrapBoundaries, { passive: true });

    let autoScroll = !prefersReduced;
    let hoverPaused = false;
    let rafId = null;
    let lastTime = null;
    const pxPerMs = setWidth / AUTO_SCROLL_DURATION_MS;

    const tick = (time) => {
      if (!autoScroll) {
        rafId = null;
        return;
      }
      if (lastTime !== null) {
        const dt = time - lastTime;
        if (!hoverPaused) {
          wrapper.scrollLeft += pxPerMs * dt;
        }
      }
      lastTime = time;
      rafId = requestAnimationFrame(tick);
    };
    if (autoScroll) rafId = requestAnimationFrame(tick);

    // Any deliberate scroll gesture switches to manual for good.
    const stopAutoScroll = () => {
      autoScroll = false;
      if (rafId) cancelAnimationFrame(rafId);
    };
    const onPointerDown = (e) => {
      if (e.pointerType !== "mouse") stopAutoScroll();
    };

    wrapper.addEventListener("pointerdown", onPointerDown, { passive: true });
    wrapper.addEventListener("wheel", stopAutoScroll, { passive: true });
    wrapper.addEventListener("mouseenter", () => {
      hoverPaused = true;
    });
    wrapper.addEventListener("mouseleave", () => {
      hoverPaused = false;
    });
    wrapper.addEventListener("mousedown", stopAutoScroll);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      wrapper.removeEventListener("scroll", wrapBoundaries);
      wrapper.removeEventListener("pointerdown", onPointerDown);
      wrapper.removeEventListener("wheel", stopAutoScroll);
      wrapper.removeEventListener("mousedown", stopAutoScroll);
    };
  }, [projects]);

  return (
    <section
      id="realisations"
      className={`${montserrat.variable} font-[family-name:var(--font-nav)] relative w-full overflow-hidden bg-[#14120F] py-20 sm:py-28`}
    >
      {/* Header */}
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#F2A93B]/25 bg-[#F2A93B]/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F2A93B] sm:text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F2A93B]" />
          {t.eyebrow}
        </span>
        <h2 className="mt-6 max-w-xl text-[clamp(1.9rem,3vw+1rem,3rem)] font-semibold leading-[1.15] tracking-tight text-[#F5EFE3]">
          {t.heading}
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-[#A69C88]">
          {t.paragraph}
        </p>

        <a
          href={t.ctaHref}
          className="group mt-7 inline-flex w-fit items-center gap-2.5 rounded-full border border-[#F5EFE3]/25 px-6 py-3 text-sm font-semibold text-[#F5EFE3] transition-colors duration-200 hover:border-[#F2A93B]/50 hover:text-[#F2A93B]"
        >
          {t.cta}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
            <path
              d="M2 7H12M12 7L8 3M12 7L8 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      {/* Filmstrip — auto-scrolls until touched/dragged, then becomes manual */}
      <div
        ref={wrapperRef}
        className="ysp-marquee-wrapper relative mt-14 w-full overflow-x-auto"
        style={{
          WebkitOverflowScrolling: "touch",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, black 5%, black 95%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0, black 5%, black 95%, transparent 100%)",
        }}
      >
        <div className="ysp-marquee-track flex w-max gap-5 px-6 sm:gap-6 sm:px-10 lg:px-14">
          {projects.map((project) => (
            <Card key={`a-${project.title}`} project={project} />
          ))}
          {projects.map((project) => (
            <Card key={`b-${project.title}`} project={project} />
          ))}
          {projects.map((project) => (
            <Card key={`c-${project.title}`} project={project} />
          ))}
        </div>
      </div>

      <style>{`
        .ysp-marquee-wrapper {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .ysp-marquee-wrapper::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
