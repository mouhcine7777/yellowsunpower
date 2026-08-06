"use client";

import Image from "next/image";
import { Montserrat } from "next/font/google";
import StickyMenu from "../../components/StickyMenu";
import Footer from "../../components/Footer";
import QuoteModal from "../../components/QuoteModal";
import { QuoteModalProvider, useQuoteModal } from "../../components/QuoteModalContext";

/*
  About — YellowSun Power (English mirror of app/a-propos/page.tsx)
  Same token family and structure as the French version: an opening
  statement, a two-column track record/EDF spread, a full-bleed
  pull-quote for the mission line, a credentials strip, a numbered
  process list, and a closing manifesto line before the footer.
*/

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-nav",
});

const CREDENTIALS = [
  { value: "8+", label: "years of experience in France" },
  { value: "EDF", label: "partner in the national energy transition programme" },
  { value: "70%", label: "possible savings on your bill*" },
];

const PROCESS = [
  { n: "01", title: "Personalized, free technical assessment" },
  { n: "02", title: "Turnkey installation" },
  { n: "03", title: "Guaranteed high-end equipment" },
  { n: "04", title: "Service anywhere in Morocco" },
  { n: "05", title: "Up to 70% savings on your electricity bill*" },
];

function ClosingCTA() {
  const { openModal } = useQuoteModal();
  return (
    <button
      type="button"
      onClick={openModal}
      className="inline-flex w-fit items-center gap-2.5 rounded-full bg-[#F2A93B] px-7 py-3.5 text-sm font-semibold text-[#14120F] transition-colors duration-200 hover:bg-[#C6660B]"
    >
      Request my free quote
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

export default function AboutPageEN() {
  return (
    <QuoteModalProvider>
      <main className={`${montserrat.variable} font-[family-name:var(--font-nav)]`}>
        <StickyMenu />

        {/* Opening statement */}
        <section className="relative isolate w-full overflow-hidden bg-[#14120F] pb-16 pt-32 sm:pb-24 sm:pt-40 lg:pb-28 lg:pt-48">
          <Image
            src="/bgaboutus.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-[0.55]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14120F] via-[#14120F]/60 to-[#14120F]/20" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#14120F]/70 via-[#14120F]/20 to-transparent" />

          <div className="relative mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14 xl:px-20">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#F2A93B]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F2A93B]">
                About
              </span>
            </div>

            <h1 className="mt-6 max-w-3xl text-[clamp(2.1rem,3.6vw+1rem,3.8rem)] font-medium leading-[1.08] tracking-tight text-[#F5EFE3]">
              Yellow Sun Power arrives in Morocco.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#F5EFE3]/70 sm:text-lg">
              After more than 8 years of experience in France, we now
              bring our expertise to Moroccan homeowners and businesses.
            </p>

            {/* France → Morocco, typographic, no icons or shapes */}
            <div className="mt-14 flex flex-wrap items-center gap-6 border-t border-white/10 pt-8 sm:gap-10">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A69C88]">
                  Since
                </span>
                <span className="text-lg font-semibold text-[#F5EFE3] sm:text-xl">
                  France · 8+ years
                </span>
              </div>
              <svg width="22" height="14" viewBox="0 0 22 14" fill="none" className="shrink-0 text-[#F2A93B]/50">
                <path
                  d="M1 7H21M21 7L15 1M21 7L15 13"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#F2A93B]">
                  Today
                </span>
                <span className="text-lg font-semibold text-[#F5EFE3] sm:text-xl">
                  Morocco
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Track record + EDF, editorial two-column */}
        <section className="w-full bg-[#F5EFE3] py-20 sm:py-28">
          <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14 xl:px-20">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C6660B]">
                  Our track record
                </p>
                <p className="mt-5 text-lg leading-relaxed text-[#3B362C] sm:text-xl">
                  Over the years we have delivered photovoltaic
                  installations of every size&nbsp;: private homes,
                  commercial buildings, shops and custom projects, all
                  built to the highest standards of quality and safety.
                </p>
              </div>

              <div className="lg:border-l lg:border-[#E4DCC8] lg:pl-20">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C6660B]">
                  EDF partnership
                </p>
                <p className="mt-5 text-lg leading-relaxed text-[#3B362C] sm:text-xl">
                  Our expertise also grew through our participation,
                  alongside <span className="font-semibold text-[#14120F]">EDF</span>,
                  in the energy transition programme supporting French
                  households in their shift toward cleaner, more
                  affordable energy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission pull-quote */}
        <section className="w-full bg-[#14120F] py-24 sm:py-32">
          <div className="mx-auto max-w-4xl px-6 text-center sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F2A93B]">
              Our ambition
            </p>
            <p className="mx-auto mt-8 h-px w-16 bg-[#F2A93B]/40" />
            <blockquote className="mt-8 text-[clamp(1.7rem,3vw+1rem,3.2rem)] font-medium leading-[1.2] tracking-tight text-[#F5EFE3]">
              Making solar energy{" "}
              <span className="text-[#F2A93B]">accessible</span>,{" "}
              <span className="text-[#F2A93B]">profitable</span> and{" "}
              <span className="text-[#F2A93B]">reliable</span> for everyone.
            </blockquote>
          </div>
        </section>

        {/* Credentials strip */}
        <section className="w-full border-y border-[#E4DCC8] bg-[#F5EFE3] py-16">
          <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14 xl:px-20">
            <div className="flex flex-wrap justify-center gap-x-14 gap-y-8 text-center sm:gap-x-20">
              {CREDENTIALS.map((c, i) => (
                <div
                  key={c.label}
                  className={`flex max-w-[13rem] flex-col gap-1.5 ${
                    i > 0 ? "sm:border-l sm:border-[#E4DCC8] sm:pl-14 lg:pl-20" : ""
                  }`}
                >
                  <span className="text-3xl font-semibold text-[#14120F] sm:text-4xl">
                    {c.value}
                  </span>
                  <span className="text-xs leading-snug text-[#6B6355]">
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-10 text-center text-[11px] text-[#6B6355]/70">
              * Average estimate, varies depending on consumption
              profile and installation setup.
            </p>
          </div>
        </section>

        {/* Full-service process */}
        <section className="w-full bg-[#14120F] py-20 sm:py-28">
          <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14 xl:px-20">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F2A93B]">
                End to end
              </p>
              <h2 className="mt-4 text-[clamp(1.7rem,2.6vw+1rem,2.6rem)] font-semibold leading-[1.15] tracking-tight text-[#F5EFE3]">
                Full support, from first contact to commissioning.
              </h2>
            </div>

            <div className="mt-14 border-t border-white/10">
              {PROCESS.map((step) => (
                <div
                  key={step.n}
                  className="group flex items-baseline gap-6 border-b border-white/10 py-6 transition-colors duration-200 sm:gap-10"
                >
                  <span className="text-sm font-semibold text-[#F2A93B]/50 transition-colors duration-200 group-hover:text-[#F2A93B] sm:text-base">
                    {step.n}
                  </span>
                  <p className="text-lg font-medium text-[#F5EFE3]/85 transition-colors duration-200 group-hover:text-[#F5EFE3] sm:text-xl">
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing manifesto */}
        <section className="w-full bg-[#14120F] pb-28 pt-4 sm:pb-36">
          <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-8 px-6 text-center sm:px-10">
            <h2 className="max-w-2xl text-[clamp(1.7rem,2.8vw+1rem,2.8rem)] font-semibold leading-[1.2] tracking-tight text-[#F5EFE3]">
              The future of energy starts today.
            </h2>
            <ClosingCTA />
            <p className="text-sm text-[#A69C88]">
              Yellow Sun Power · 🇲🇦 French expertise, serving Morocco.
            </p>
          </div>
        </section>

        <Footer />
        <QuoteModal />
      </main>
    </QuoteModalProvider>
  );
}
