"use client";

import Image from "next/image";
import { Montserrat } from "next/font/google";
import StickyMenu from "../components/StickyMenu";
import Footer from "../components/Footer";
import QuoteModal from "../components/QuoteModal";
import { QuoteModalProvider, useQuoteModal } from "../components/QuoteModalContext";

/*
  Solutions — YellowSun Power
  Same token family as the rest of the site: charcoal #14120F, gold
  #F2A93B, amber #C6660B, paper #F5EFE3, stone #A69C88, ink-soft
  #6B6355, hairline #E4DCC8.

  Structured as: intro → four property-type profiles (expanded past
  the homepage teaser's one-liners) → a materials/guarantee feature
  built around the square product shot → a compact "method" strip →
  closing CTA. Same dark/paper alternation as the other pages, kept
  editorial rather than icon-card-grid heavy throughout.
*/

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-nav",
});

const SEGMENTS = [
  {
    label: "Villas",
    range: "10 – 20 kW en moyenne",
    desc: "Toitures résidentielles haut de gamme : installations discrètes, dimensionnées sur la consommation réelle du foyer plutôt que sur une norme générique, avec un rendu qui s'efface derrière l'architecture.",
    icon: (
      <path
        d="M4 12L12 5L20 12M6 10.5V19H18V10.5M10 19V14H14V19"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Riads",
    range: "3 – 8 kW en moyenne",
    desc: "Intégration pensée pour le bâti traditionnel : rooftop de médina, patios, toitures en pente — chaque pose respecte la structure existante et reste invisible depuis la rue.",
    icon: (
      <path
        d="M5 19V11C5 7.5 8 5 12 5C16 5 19 7.5 19 11V19M5 19H19M9 19V14H15V19"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Hôtels",
    range: "20 – 60 kW en moyenne",
    desc: "Une consommation continue et exigeante — climatisation, eau chaude, cuisines — demande un dimensionnement précis et un suivi de production dédié pour tenir la charge toute l'année.",
    icon: (
      <path
        d="M6 19V6C6 5.4 6.4 5 7 5H17C17.6 5 18 5.4 18 6V19M6 19H18M6 19H4M18 19H20M9 8H10M14 8H15M9 12H10M14 12H15M9 16H10M14 16H15"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Professionnels",
    range: "60 – 100 kW+ en moyenne",
    desc: "Sites industriels et commerciaux : carports solaires, toitures de hangar, entrepôts — des installations de forte puissance avec un suivi de production pour piloter le retour sur investissement.",
    icon: (
      <path
        d="M4 8.5C4 7.7 4.7 7 5.5 7H18.5C19.3 7 20 7.7 20 8.5V18C20 18.6 19.6 19 19 19H5C4.4 19 4 18.6 4 18V8.5Z M9 7V5.5C9 4.7 9.7 4 10.5 4H13.5C14.3 4 15 4.7 15 5.5V7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

const METHOD = [
  { title: "Étude technique personnalisée et gratuite" },
  { title: "Installation clé en main" },
  { title: "Matériel haut de gamme garanti" },
  { title: "Intervention partout au Maroc" },
];

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

export default function SolutionsPage() {
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
                Solutions
              </span>
            </div>

            <h1 className="mt-6 max-w-2xl text-[clamp(2rem,3.4vw+1rem,3.6rem)] font-medium leading-[1.1] tracking-tight text-[#F5EFE3]">
              Une solution solaire pensée pour chaque type de propriété.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#F5EFE3]/70 sm:text-lg">
              Villa, riad, hôtel ou site professionnel : chaque toiture a sa
              propre consommation, sa propre exposition et ses propres
              contraintes architecturales. Nous dimensionnons chaque
              installation en conséquence — jamais sur un modèle standard.
            </p>
          </div>
        </section>

        {/* Property-type profiles */}
        <section className="w-full bg-[#F5EFE3] py-20 sm:py-28">
          <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14 xl:px-20">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
              {SEGMENTS.map((seg) => (
                <div
                  key={seg.label}
                  className="group rounded-3xl border border-[#E4DCC8] bg-white/40 p-8 transition-colors duration-200 hover:border-[#F2A93B]/40 hover:bg-white/70 sm:p-10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#14120F] text-[#F2A93B] transition-colors duration-200 group-hover:bg-[#F2A93B] group-hover:text-[#14120F]">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        {seg.icon}
                      </svg>
                    </span>
                    <span className="mt-1 shrink-0 text-xs font-semibold uppercase tracking-[0.15em] text-[#C6660B]">
                      {seg.range}
                    </span>
                  </div>
                  <p className="mt-6 text-xl font-semibold text-[#14120F]">
                    {seg.label}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-[#6B6355]">
                    {seg.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Materials / guarantee feature, built around the product shot */}
        <section className="w-full bg-[#14120F] py-20 sm:py-28">
          <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14 xl:px-20">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl border border-white/10 lg:max-w-none">
                <Image
                  src="/solution.webp"
                  alt="Panneaux solaires YellowSun Power haut de gamme"
                  fill
                  sizes="(min-width: 1024px) 44vw, (min-width: 640px) 60vw, 90vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14120F]/40 via-transparent to-transparent" />
                <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#14120F]/70 px-4 py-1.5 text-xs font-semibold text-[#F5EFE3] backdrop-blur-sm">
                  25 ans de garantie
                </span>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F2A93B]">
                  Matériel &amp; garanties
                </p>
                <h2 className="mt-4 text-[clamp(1.7rem,2.6vw+1rem,2.6rem)] font-semibold leading-[1.15] tracking-tight text-[#F5EFE3]">
                  Du matériel haut de gamme, garanti dans la durée.
                </h2>
                <p className="mt-6 max-w-lg text-base leading-relaxed text-[#F5EFE3]/70 sm:text-lg">
                  Nous sélectionnons nos panneaux et onduleurs auprès des
                  mêmes fabricants qui équipent nos installations en France,
                  avec un seul critère&nbsp;: tenir la promesse de
                  performance sur le long terme, pas seulement le jour de
                  la mise en service.
                </p>
                <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/10 pt-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-2xl font-semibold text-[#F5EFE3]">25 ans</span>
                    <span className="text-xs text-[#F5EFE3]/55">garantie sur les panneaux</span>
                  </div>
                  <div className="flex flex-col gap-1 border-l border-white/10 pl-8">
                    <span className="text-2xl font-semibold text-[#F5EFE3]">70%</span>
                    <span className="text-xs text-[#F5EFE3]/55">d&rsquo;économies possibles*</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Method strip */}
        <section className="w-full bg-[#F5EFE3] py-16 sm:py-20">
          <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14 xl:px-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C6660B]">
              Notre méthode
            </p>
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {METHOD.map((step, i) => (
                <div key={step.title} className="border-t border-[#E4DCC8] pt-5">
                  <span className="text-xs font-semibold text-[#C6660B]">
                    0{i + 1}
                  </span>
                  <p className="mt-2 text-base font-medium leading-snug text-[#14120F]">
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="w-full bg-[#14120F] py-24 sm:py-32">
          <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-8 px-6 text-center sm:px-10">
            <h2 className="max-w-2xl text-[clamp(1.7rem,2.8vw+1rem,2.8rem)] font-semibold leading-[1.2] tracking-tight text-[#F5EFE3]">
              Quelle que soit votre propriété, il existe une solution
              adaptée.
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
