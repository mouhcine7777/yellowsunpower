"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Montserrat } from "next/font/google";
import StickyMenu from "../components/StickyMenu";
import Footer from "../components/Footer";
import QuoteModal from "../components/QuoteModal";
import { QuoteModalProvider, useQuoteModal } from "../components/QuoteModalContext";
import { PROJECTS } from "../data/projects";

/*
  Réalisations — YellowSun Power
  Same token family as the rest of the site: charcoal #14120F, gold
  #F2A93B, amber #C6660B, paper #F5EFE3, stone #A69C88.

  The homepage keeps its auto-scrolling teaser filmstrip; this page is
  the full catalogue behind it — an intro with figures pulled straight
  from the project data (no hardcoded numbers to drift out of sync),
  a type filter, and a static grid of full case-study cards instead of
  a marquee, since browsing a portfolio wants to be self-paced.
*/

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-nav",
});

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-[#F5EFE3]/10">
      <Image
        src={project.image}
        alt={`${project.title} — ${project.location}`}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14120F] via-[#14120F]/30 to-[#14120F]/10" />

      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
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
          <p className="mt-1.5 text-sm leading-relaxed text-[#A69C88]">
            {project.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

function ClosingCTA() {
  const { openModal } = useQuoteModal();
  return (
    <button
      type="button"
      onClick={openModal}
      className="inline-flex w-fit items-center gap-2.5 rounded-full bg-[#F2A93B] px-7 py-3.5 text-sm font-semibold text-[#14120F] transition-colors duration-200 hover:bg-[#C6660B]"
    >
      Demander mon devis gratuit
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M2 7H12M12 7L8 3M12 7L8 11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function RealisationsPage() {
  const [filter, setFilter] = useState("Tous");

  const types = useMemo(
    () => ["Tous", ...Array.from(new Set(PROJECTS.map((p) => p.type)))],
    []
  );

  const filtered = useMemo(
    () => (filter === "Tous" ? PROJECTS : PROJECTS.filter((p) => p.type === filter)),
    [filter]
  );

  return (
    <QuoteModalProvider>
      <main className={`${montserrat.variable} font-[family-name:var(--font-nav)]`}>
        <StickyMenu />

        {/* Intro */}
        <section className="relative w-full bg-[#14120F] pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-48">
          <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14 xl:px-20">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#F2A93B]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F2A93B]">
                Réalisations
              </span>
            </div>

            <h1 className="mt-6 max-w-2xl text-[clamp(2rem,3.4vw+1rem,3.6rem)] font-medium leading-[1.1] tracking-tight text-[#F5EFE3]">
              Chaque toiture est un cas particulier.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#F5EFE3]/70 sm:text-lg">
              Dimensionnement, orientation et intégration architecturale
              pensés projet par projet — des villas de Tanger aux sites
              industriels de Casablanca.
            </p>
          </div>
        </section>

        {/* Filters + grid */}
        <section className="w-full bg-[#0C0A08] py-16 sm:py-20">
          <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14 xl:px-20">
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFilter(type)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                    filter === type
                      ? "border-[#F2A93B] bg-[#F2A93B] text-[#14120F]"
                      : "border-white/15 bg-white/[0.03] text-[#F5EFE3]/80 hover:border-[#F2A93B]/40"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="w-full bg-[#14120F] py-24 sm:py-32">
          <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-8 px-6 text-center sm:px-10">
            <h2 className="max-w-2xl text-[clamp(1.7rem,2.8vw+1rem,2.8rem)] font-semibold leading-[1.2] tracking-tight text-[#F5EFE3]">
              Votre toiture mérite la même attention.
            </h2>
            <ClosingCTA />
          </div>
        </section>

        <Footer />
        <QuoteModal />
      </main>
    </QuoteModalProvider>
  );
}
