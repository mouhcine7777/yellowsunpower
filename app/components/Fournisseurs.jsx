import Image from "next/image";
import { Montserrat } from "next/font/google";

/*
  Partners section — YellowSun Power
  Light paper background, keeping the alternating rhythm of the page:
  hero (dark) → about (light) → installations (dark) → partners (light)
  → footer (dark).
  ink #14120F  headline
  ink-soft #6B6355  body text on paper
  gold #F2A93B  accent
  paper #F5EFE3  section background
  line #E4DCC8  hairline dividers

  Signature: logos run as a slow auto-scrolling strip in grayscale,
  each one snapping to full color only on hover/focus — same loop
  mechanics as the installations filmstrip (duplicated track, -50%
  translate, pause on hover), so the page has one consistent "moving
  strip" language instead of two different carousel implementations.

  NOTE: replace the 8 placeholder files below with the real supplier
  logos once available, and update the alt text to the actual brand
  names — these are unbranded placeholders, not real manufacturer
  claims.
*/

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-nav",
});

const PARTNERS = [
  { name: "Fournisseur 1", logo: "/partners/partner-1.png" },
  { name: "Fournisseur 2", logo: "/partners/partner-2.png" },
  { name: "Fournisseur 3", logo: "/partners/partner-3.png" },
  { name: "Fournisseur 4", logo: "/partners/partner-4.png" },
  { name: "Fournisseur 5", logo: "/partners/partner-5.png" },
  { name: "Fournisseur 6", logo: "/partners/partner-6.png" },
  { name: "Fournisseur 7", logo: "/partners/partner-7.png" },
  { name: "Fournisseur 8", logo: "/partners/partner-8.png" },
];

function LogoTile({ partner }) {
  return (
    <div className="flex h-16 w-[150px] shrink-0 items-center justify-center sm:w-[170px]">
      <span className="relative h-9 w-full opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
        <Image
          src={partner.logo}
          alt={partner.name}
          fill
          className="object-contain"
        />
      </span>
    </div>
  );
}

export default function PartnersSection() {
  return (
    <section className={`${montserrat.variable} font-[family-name:var(--font-nav)] relative w-full overflow-hidden bg-[#F5EFE3] py-20 sm:py-24`}>
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        <div className="max-w-xl">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#F2A93B]/30 bg-[#F2A93B]/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C6660B] sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F2A93B]" />
            Partenaires
          </span>
          <h2 className="mt-5 text-[clamp(1.7rem,2.5vw+1rem,2.6rem)] font-semibold leading-[1.15] tracking-tight text-[#14120F]">
            Nos fournisseurs partenaires
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#6B6355]">
            Des équipements sélectionnés auprès des meilleurs fabricants
            internationaux, pour des installations pensées pour durer.
          </p>
        </div>
      </div>

      {/* Auto-scrolling logo strip — full bleed */}
      <div
        className="ysp-partners-wrapper relative mt-14 w-full"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, black 5%, black 95%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0, black 5%, black 95%, transparent 100%)",
        }}
      >
        <div className="ysp-partners-track flex w-max gap-4 px-6 sm:gap-5 sm:px-10 lg:px-14">
          {PARTNERS.map((partner) => (
            <LogoTile key={`a-${partner.name}`} partner={partner} />
          ))}
          {PARTNERS.map((partner) => (
            <LogoTile key={`b-${partner.name}`} partner={partner} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ysp-partners-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ysp-partners-track {
          animation: ysp-partners-scroll 34s linear infinite;
        }
        .ysp-partners-wrapper:hover .ysp-partners-track,
        .ysp-partners-wrapper:focus-within .ysp-partners-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .ysp-partners-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}