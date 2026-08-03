import { Montserrat } from "next/font/google";

/*
  About / Solutions section — YellowSun Power
  Switches to a warm paper background to give the dark hero room to
  breathe, while staying on the same token family:
  ink      #14120F  headline text
  ink-soft #6B6355  body text on paper
  gold     #F2A93B  accent (badge, headline highlight, spec values, icons)
  paper    #F5EFE3  section background
  line     #E4DCC8  hairline dividers on paper

  Signature: the four client segments (villas, riads, hôtels,
  professionnels) as a quiet icon grid — real line-art per segment
  instead of stock photography.
*/

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-nav",
});

const SEGMENTS = [
  {
    label: "Villas",
    desc: "Toitures résidentielles haut de gamme, installations discrètes et sur-mesure.",
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
    desc: "Intégration respectueuse de l'architecture traditionnelle et des patios.",
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
    desc: "Puissance dimensionnée pour une consommation continue et exigeante.",
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
    desc: "Sites industriels et commerciaux, avec suivi de production dédié.",
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

export default function AboutSection() {
  return (
    <section
      id="solutions"
      className={`${montserrat.variable} font-[family-name:var(--font-nav)] relative w-full bg-[#F5EFE3] py-20 sm:py-28`}
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          {/* Left: intro copy */}
          <div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#F2A93B]/25 bg-[#F2A93B]/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F2A93B] sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F2A93B]" />
              Solutions photovoltaïques premium
            </span>

            <h2 className="mt-6 text-[clamp(1.9rem,3vw+1rem,3rem)] font-semibold leading-[1.15] tracking-tight text-[#14120F]">
              Le solaire premium, pensé pour l&rsquo;architecture marocaine.
            </h2>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#6B6355] sm:text-lg">
              Des villas de Marrakech aux hôtels de la côte atlantique, nous
              concevons des installations qui s&rsquo;intègrent à
              l&rsquo;architecture plutôt que de s&rsquo;y imposer —
              pensées pour durer, pas pour impressionner un jour.
            </p>

            <a
              href="/realisations"
              className="mt-9 inline-flex w-fit items-center gap-2.5 rounded-full bg-[#14120F] px-7 py-3.5 text-sm font-semibold text-[#F5EFE3] transition-all duration-200 hover:gap-3.5 hover:bg-[#F2A93B] hover:text-[#14120F]"
            >
              Découvrir nos réalisations
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
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

          {/* Right: client-segment icon grid */}
          <div className="grid grid-cols-1 gap-4 self-start sm:grid-cols-2">
            {SEGMENTS.map((seg) => (
              <div
                key={seg.label}
                className="group rounded-2xl border border-[#E4DCC8] bg-white/40 p-6 transition-colors duration-200 hover:border-[#F2A93B]/40 hover:bg-white/70"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#14120F] text-[#F2A93B] transition-colors duration-200 group-hover:bg-[#F2A93B] group-hover:text-[#14120F]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    {seg.icon}
                  </svg>
                </span>
                <p className="mt-4 text-base font-semibold text-[#14120F]">
                  {seg.label}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#6B6355]">
                  {seg.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}