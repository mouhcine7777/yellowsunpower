import Image from "next/image";
import { Montserrat } from "next/font/google";

/*
  Installations section — YellowSun Power
  Same dark token family: ink #14120F, gold #F2A93B, paper #F5EFE3,
  stone #A69C88.

  Signature: a continuous auto-scrolling filmstrip, full-bleed edge to
  edge. Cards are duplicated once so the loop is seamless (translating
  exactly -50% of track width returns to the starting frame). Pauses
  on hover/focus so it's actually readable, fades at both edges via a
  mask so cards never crop hard against the viewport, and respects
  prefers-reduced-motion. Pure CSS — no JS/client component needed.
*/

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-nav",
});

const PROJECTS = [
  {
    title: "Villa contemporaine",
    location: "Tanger",
    type: "Villa",
    power: "18 kW",
    desc: "Installation photovoltaïque 18 kW pour villa moderne avec optimisation énergétique complète.",
    image: "/installations/villa-contemporaine-tanger.webp",
  },
  {
    title: "Villa moderne",
    location: "Tanger",
    type: "Villa",
    power: "17 kW",
    desc: "Système solaire résidentiel 17 kW avec panneaux haute performance et autonomie renforcée.",
    image: "/installations/villa-moderne-tanger.webp",
  },
  {
    title: "Résidence premium",
    location: "Rabat",
    type: "Résidence",
    power: "21 kW",
    desc: "Installation solaire 21 kW répartie sur plusieurs toitures plates avec intégration architecturale discrète.",
    image: "/installations/residence-premium-rabat.webp",
  },
  {
    title: "Carport solaire",
    location: "Tanger",
    type: "Carport résidentiel",
    power: "9 kW",
    desc: "Carport photovoltaïque résidentiel 9 kW avec protection véhicule et production d'énergie solaire.",
    image: "/installations/carport-solaire-tanger.webp",
  },
  {
    title: "Installation industrielle",
    location: "Casablanca",
    type: "Carport industriel",
    power: "90 kW",
    desc: "Carport industriel solaire 90 kW conçu pour l'alimentation énergétique de site professionnel.",
    image: "/installations/installation-industrielle-casablanca.webp",
  },
  {
    title: "Riad traditionnel",
    location: "Fès",
    type: "Riad",
    power: "5 kW",
    desc: "Installation photovoltaïque 5 kW intégrée discrètement sur rooftop de riad dans la médina.",
    image: "/installations/riad-traditionnel-fes.webp",
  },
];

function Card({ project }) {
  return (
    <div className="group relative aspect-[3/4] w-[280px] shrink-0 overflow-hidden rounded-3xl border border-[#F5EFE3]/10 sm:w-[330px] lg:w-[380px]">
      <Image
        src={project.image}
        alt={`${project.title} — ${project.location}`}
        fill
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
  return (
    <section
      id="realisations"
      className={`${montserrat.variable} font-[family-name:var(--font-nav)] relative w-full overflow-hidden bg-[#14120F] py-20 sm:py-28`}
    >
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#F2A93B]/25 bg-[#F2A93B]/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F2A93B] sm:text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F2A93B]" />
          Réalisations
        </span>
        <h2 className="mt-6 max-w-xl text-[clamp(1.9rem,3vw+1rem,3rem)] font-semibold leading-[1.15] tracking-tight text-[#F5EFE3]">
          Nos Installations Solaires Premium
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-[#A69C88]">
          Chaque toiture est un cas particulier — dimensionnement,
          orientation et intégration pensés projet par projet.
        </p>
      </div>

      {/* Auto-scrolling filmstrip — full bleed */}
      <div
        className="ysp-marquee-wrapper relative mt-14 w-full"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, black 5%, black 95%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0, black 5%, black 95%, transparent 100%)",
        }}
      >
        <div className="ysp-marquee-track flex w-max gap-5 px-6 sm:gap-6 sm:px-10 lg:px-14">
          {PROJECTS.map((project) => (
            <Card key={`a-${project.title}`} project={project} />
          ))}
          {PROJECTS.map((project) => (
            <Card key={`b-${project.title}`} project={project} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ysp-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ysp-marquee-track {
          animation: ysp-marquee 48s linear infinite;
        }
        .ysp-marquee-wrapper:hover .ysp-marquee-track,
        .ysp-marquee-wrapper:focus-within .ysp-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .ysp-marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}