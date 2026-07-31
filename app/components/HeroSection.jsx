"use client";

import Image from "next/image";
import { Montserrat } from "next/font/google";
import { useQuoteModal } from "./QuoteModalContext";

/*
  Design tokens — YellowSun Power hero
  bg      #14120F  warm charcoal (not pure black)
  gold    #F2A93B  primary sun accent
  amber   #C6660B  secondary / hover
  paper   #F5EFE3  warm off-white for headline
  stone   #A69C88  muted warm grey for body copy

  Signature: a large soft sun-disc glow bleeding off the top-right corner,
  ringed by slow-rotating dashed orbit lines, with a small cluster of
  glass stat cards catching its light. Locked to 100dvh so it always
  fills exactly one screen, on any device, without scrolling.
*/

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-nav",
});

const stats = [
  { value: "300+", label: "jours de soleil / an au Maroc" },
  { value: "70%", label: "d'économie possible sur la facture" },
  { value: "25 ans", label: "de garantie panneaux" },
];

export default function HeroSection() {
  const { openModal } = useQuoteModal();
  return (
    <section
      className={`${montserrat.variable} font-[family-name:var(--font-nav)] relative isolate h-[100dvh] w-full overflow-hidden bg-[#14120F]`}
    >
      {/* Background photo */}
      <Image
        src="/bg.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-[0.7]"
      />

      {/* Legibility gradients */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#14120F] via-[#14120F]/55 to-[#14120F]/10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14120F] via-[#14120F]/5 to-[#14120F]/30" />

      {/* Ambient sun glow, top-right */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(242,169,59,0.35)_0%,rgba(242,169,59,0)_70%)] blur-2xl motion-safe:animate-pulse sm:h-[640px] sm:w-[640px]"
        style={{ animationDuration: "7s" }}
      />

      {/* Slow orbit rings */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 hidden h-[420px] w-[420px] rounded-full border border-dashed border-[#F2A93B]/20 sm:block motion-safe:animate-spin"
        style={{ animationDuration: "50s" }}
      />
      <div
        className="pointer-events-none absolute -right-56 -top-56 hidden h-[680px] w-[680px] rounded-full border border-[#F2A93B]/10 lg:block motion-safe:animate-spin"
        style={{ animationDuration: "90s", animationDirection: "reverse" }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col justify-between px-6 pb-7 pt-24 sm:px-10 sm:pb-9 sm:pt-28 lg:px-14 lg:pb-10 lg:pt-32">
        {/* Middle: eyebrow + headline + CTAs */}
        <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center sm:items-start sm:text-left lg:max-w-2xl">
          <span
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#F2A93B]/30 bg-[#F2A93B]/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F2A93B] sm:text-[11px]"

          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#F2A93B]" />
            Énergie solaire · Maroc
          </span>

          <h1
            className="text-[clamp(1.75rem,3.2vw+1rem,3.4rem)] font-medium leading-[1.1] tracking-tight text-[#F5EFE3]"
            
          >
            Votre facture d&rsquo;électricité
            <br />
            a un ennemi.{" "}
            <span className="text-[#F2A93B]">Il se lève chaque matin.</span>
          </h1>

          <p
            className="max-w-md text-base leading-relaxed text-[#A69C88] sm:text-lg"
            
          >
            YellowSun Power conçoit et installe des panneaux solaires
            sur-mesure pour les foyers et entreprises marocaines.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start sm:gap-4">
            <button
              type="button"
              onClick={openModal}
              className="rounded-full bg-[#F2A93B] px-6 py-3 text-sm font-semibold text-[#14120F] transition-colors duration-200 hover:bg-[#C6660B] sm:px-7 sm:py-3.5"
            >
              Demander mon devis gratuit
            </button>
            <a
              href="#realisations"
              className="rounded-full border border-[#F5EFE3]/25 px-6 py-3 text-sm font-semibold text-[#F5EFE3] transition-colors duration-200 hover:border-[#F5EFE3]/60 sm:px-7 sm:py-3.5"
              
            >
              Voir nos installations
            </a>
          </div>
        </div>

        {/* Bottom row: inline stats + scroll cue */}
        <div className="flex flex-col items-center gap-6 sm:items-stretch">
          <div className="hidden flex-wrap gap-x-8 gap-y-2 sm:flex xl:hidden">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <span
                  className="text-lg font-semibold text-[#F2A93B] sm:text-xl"
                  
                >
                  {stat.value}
                </span>
                <span
                  className="text-[11px] text-[#A69C88] sm:text-xs"
                  
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 self-center text-[#A69C88] sm:self-start">
            <span
              className="text-[10px] uppercase tracking-[0.2em]"
              
            >
              Découvrir
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="motion-safe:animate-bounce"
            >
              <path
                d="M2 5L7 10L12 5"
                stroke="#F2A93B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Floating glass cards — large screens only, catching the glow */}
      <div className="pointer-events-none absolute right-14 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-4 xl:flex">
        <div className="w-52 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-2xl backdrop-blur-md">
          <p
            className="text-2xl font-semibold text-[#F5EFE3]"
            
          >
            300+
          </p>
          <p
            className="mt-1 text-xs text-[#A69C88]"
            
          >
            jours de soleil par an au Maroc
          </p>
        </div>
        <div className="ml-10 w-52 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-2xl backdrop-blur-md">
          <p
            className="text-2xl font-semibold text-[#F5EFE3]"
            
          >
            25 ans
          </p>
          <p
            className="mt-1 text-xs text-[#A69C88]"
            
          >
            de garantie sur les panneaux
          </p>
        </div>
      </div>
    </section>
  );
}