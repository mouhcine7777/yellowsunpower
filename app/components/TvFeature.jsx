"use client";

import { useRef, useState } from "react";
import { Montserrat } from "next/font/google";
import { useLocale } from "../lib/locale";

/*
  TvFeature — "vu à la télé" trust section.
  Sits directly under the hero so it's the first thing visitors see
  after the fold: social proof + media credibility, before anything
  else. Same token family as Hero/Footer (bg #14120F, gold #F2A93B,
  paper #F5EFE3, stone #A69C88) so it reads as one continuous brand,
  not a bolted-on widget.
*/

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-nav",
});

const TEXT = {
  fr: {
    badge: "Vu à la télévision marocaine",
    heading: "Ils nous ont fait confiance.",
    sub: "En tant qu’expert au service des foyers et professionnels marocains, YellowSun Power a été invité à en parler à la télévision nationale.",
    play: "Regarder le reportage",
  },
  en: {
    badge: "Featured on Moroccan television",
    heading: "They put their trust in us.",
    sub: "As an expert serving Moroccan homes and businesses, YellowSun Power was invited to speak on national television.",
    play: "Watch the segment",
  },
  nl: {
    badge: "Te zien op de Marokkaanse televisie",
    heading: "Zij vertrouwden op ons.",
    sub: "Als expert ten dienste van Marokkaanse huishoudens en bedrijven werd YellowSun Power uitgenodigd op de nationale televisie.",
    play: "Bekijk de reportage",
  },
};

export default function TvFeature() {
  const locale = useLocale();
  const t = TEXT[locale];
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = false;
    el.controls = true;
    el.play();
    setPlaying(true);
  };

  return (
    <section
      className={`${montserrat.variable} font-[family-name:var(--font-nav)] relative w-full overflow-hidden bg-[#14120F] py-16 sm:py-20 lg:py-24`}
    >
      {/* Ambient glow, echoes hero */}
      <div className="pointer-events-none absolute -left-40 -top-32 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(242,169,59,0.22)_0%,rgba(242,169,59,0)_70%)] blur-2xl" />

      <div className="relative mx-auto flex max-w-[1200px] flex-col items-center gap-8 px-6 text-center sm:px-10 lg:px-14">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#F2A93B]/30 bg-[#F2A93B]/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F2A93B] sm:text-[11px]">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16v10H4z M9 20h6 M9 20l1-3.5h4L15 20"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
          {t.badge}
        </span>

        <h2 className="max-w-2xl text-[clamp(1.5rem,2.4vw+1rem,2.4rem)] font-semibold leading-[1.15] tracking-tight text-[#F5EFE3]">
          {t.heading}
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-[#A69C88] sm:text-base">
          {t.sub}
        </p>

        {/* Video card */}
        <div className="group relative mt-2 w-full max-w-3xl overflow-hidden rounded-2xl border border-[#F5EFE3]/10 bg-black shadow-2xl">
          <div className="relative aspect-video w-full">
            <video
              ref={videoRef}
              src="/vidtel.mp4"
              className="h-full w-full object-cover"
              playsInline
              preload="metadata"
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
            />

            {!playing && (
              <button
                type="button"
                onClick={handlePlay}
                aria-label={t.play}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-t from-black/70 via-black/20 to-black/40 transition-colors duration-200 hover:from-black/75"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F2A93B] shadow-lg transition-transform duration-200 group-hover:scale-105 sm:h-20 sm:w-20">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5v14l12-7L8 5Z" fill="#14120F" />
                  </svg>
                </span>
                <span className="rounded-full bg-black/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#F5EFE3] backdrop-blur-sm">
                  {t.play}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
