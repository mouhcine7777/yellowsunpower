import Image from "next/image";
import { Montserrat } from "next/font/google";

/*
  Footer — YellowSun Power
  Slightly darker than the other sections (#0C0A08) so it reads as the
  true bottom anchor of the page, same token family otherwise:
  gold #F2A93B, paper #F5EFE3, stone #A69C88.

  Signature: a giant, barely-there "YELLOWSUN" wordmark bleeding off
  both edges behind the columns (brand recall without shouting), and a
  thin sunrise-gradient hairline at the very top instead of a plain
  border — the one visual callback to the hero's sun motif, kept
  minimal here since the footer's job is utility, not spectacle.
*/

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-nav",
});

const NAV_LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "Solutions", href: "#solutions" },
  { label: "Réalisations", href: "#realisations" },
  { label: "À propos", href: "#a-propos" },
  { label: "Contact", href: "#contact" },
];

const SOLUTIONS = ["Villas", "Riads", "Hôtels", "Professionnels"];

const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <path
        d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm4.6-1.9a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
      />
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <path
        d="M14 9h2.5V6H14c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.3l.5-3H14V9c0-.4.3-1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <path
        d="M6.5 9.5v9M6.5 6.6v.1M11 18.5v-5.2c0-1.8 1.2-3 2.8-3 1.5 0 2.7 1.1 2.7 3v5.2M11 12v6.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
];

export default function Footer() {
  return (
    <footer
      className={`${montserrat.variable} font-[family-name:var(--font-nav)] relative w-full overflow-hidden bg-[#0C0A08]`}
    >
      {/* sunrise hairline */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#F2A93B]/50 to-transparent" />

      {/* CTA band */}
      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-16 sm:px-10 sm:pb-20 sm:pt-20 lg:px-14">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-[#F5EFE3]/10 pb-14 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#F2A93B]/25 bg-[#F2A93B]/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F2A93B] sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F2A93B]" />
              Passons à l&rsquo;étape suivante
            </span>
            <h2 className="mt-5 max-w-lg text-[clamp(1.7rem,2.8vw+1rem,2.8rem)] font-semibold leading-[1.15] tracking-tight text-[#F5EFE3]">
              Prêt à faire de votre toit une source d&rsquo;économies ?
            </h2>
          </div>

          <a
            href="#devis"
            className="inline-flex w-fit shrink-0 items-center gap-2.5 rounded-full bg-[#F2A93B] px-7 py-3.5 text-sm font-semibold text-[#14120F] transition-colors duration-200 hover:bg-[#C6660B]"
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
          </a>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 gap-12 pt-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr] lg:gap-10">
          {/* Brand */}
          <div>
            <span className="relative block h-9 w-[136px]">
              <Image
                src="/logo.png"
                alt="YellowSun Power"
                fill
                className="object-contain object-left"
              />
            </span>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#A69C88]">
              Installations photovoltaïques premium pour villas, riads,
              hôtels et professionnels au Maroc.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#F5EFE3]/15 text-[#A69C88] transition-colors duration-200 hover:border-[#F2A93B]/40 hover:text-[#F2A93B]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#F5EFE3]/50">
              Navigation
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#A69C88] transition-colors duration-200 hover:text-[#F2A93B]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#F5EFE3]/50">
              Solutions
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {SOLUTIONS.map((label) => (
                <li key={label}>
                  <a
                    href="#solutions"
                    className="text-sm text-[#A69C88] transition-colors duration-200 hover:text-[#F2A93B]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#F5EFE3]/50">
              Contact
            </p>
            <ul className="mt-5 flex flex-col gap-3.5 text-sm text-[#A69C88]">
              <li>
                <a
                  href="tel:+212649139720"
                  className="flex items-center gap-2.5 transition-colors duration-200 hover:text-[#F2A93B]"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <path
                      d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5L16 13l4 1.5v3a2 2 0 0 1-2 2C10.5 19.5 4.5 13.5 4.5 6a2 2 0 0 1 2-2Z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinejoin="round"
                    />
                  </svg>
                  +212 649-139720
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@yellowsunpower.com"
                  className="flex items-center gap-2.5 transition-colors duration-200 hover:text-[#F2A93B]"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <path
                      d="M4 6h16v12H4z M4 6l8 7 8-7"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinejoin="round"
                    />
                  </svg>
                  contact@yellowsunpower.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0">
                  <path
                    d="M12 22C12 22 19 15.5 19 10C19 5.6 15.9 2 12 2C8.1 2 5 5.6 5 10C5 15.5 12 22 12 22Z M12 12.5C13.4 12.5 14.5 11.4 14.5 10C14.5 8.6 13.4 7.5 12 7.5C10.6 7.5 9.5 8.6 9.5 10C9.5 11.4 10.6 12.5 12 12.5Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                  />
                </svg>
                Maroc
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Giant faint wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative -mt-4 select-none whitespace-nowrap text-center leading-[0.8] text-[#F5EFE3]/[0.035]"
        style={{ fontSize: "clamp(3.2rem, 13vw, 10rem)", fontWeight: 800 }}
      >
        YELLOWSUN
      </div>

      {/* Bottom bar */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 border-t border-[#F5EFE3]/10 px-6 py-6 text-xs text-[#A69C88] sm:px-10 lg:px-14">
        <p>© {new Date().getFullYear()} YellowSun Power. Tous droits réservés.</p>
      </div>
    </footer>
  );
}