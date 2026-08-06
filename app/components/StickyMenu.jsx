"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { useQuoteModal } from "./QuoteModalContext";
import { useLocale, localizedPath } from "../lib/locale";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-nav",
});

/*
  Navbar — YellowSun Power
  Same token system as the hero: charcoal #14120F, gold #F2A93B,
  amber #C6660B, paper #F5EFE3, stone #A69C88.

  Signature: a floating gold "pill" nav that sits detached from the
  edges of the screen (not a full-width bar), turns from fully
  transparent to a glass capsule once you scroll, with a link
  indicator that slides underneath whichever item you're on/hovering.
  Mobile gets a full-screen takeover with staggered link reveals and
  the same ambient sun-glow used in the hero, so the brand feels
  continuous rather than like a generic hamburger drawer.
*/

const TEXT = {
  fr: {
    links: [
      { label: "Accueil", href: "/" },
      { label: "Solutions", href: "/solutions" },
      { label: "Réalisations", href: "/realisations" },
      { label: "À propos", href: "/a-propos" },
      { label: "Contact", href: "/contact" },
    ],
    cta: "Devis gratuit",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
  },
  en: {
    links: [
      { label: "Home", href: "/en" },
      { label: "Solutions", href: "/en/solutions" },
      { label: "Projects", href: "/en/projects" },
      { label: "About", href: "/en/about" },
      { label: "Contact", href: "/en/contact" },
    ],
    cta: "Free quote",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  nl: {
    links: [
      { label: "Home", href: "/nl" },
      { label: "Oplossingen", href: "/nl/oplossingen" },
      { label: "Projecten", href: "/nl/projecten" },
      { label: "Over ons", href: "/nl/over-ons" },
      { label: "Contact", href: "/nl/contact" },
    ],
    cta: "Gratis offerte",
    openMenu: "Menu openen",
    closeMenu: "Menu sluiten",
  },
};

const LOCALES = ["fr", "en", "nl"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [langOpen, setLangOpen] = useState(false);
  const { openModal } = useQuoteModal();
  const router = useRouter();
  const locale = useLocale();
  const t = TEXT[locale];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const switchLocale = (target) => {
    if (target === locale) return;
    router.push(localizedPath(window.location.pathname, target));
  };

  const LangSwitch = ({ className }) => (
    <div className={className}>
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchLocale(l)}
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase transition-colors duration-200 ${
            l === locale
              ? "border-[#F2A93B]/40 bg-[#F2A93B]/10 text-[#F2A93B]"
              : "border-white/10 text-[#A69C88] hover:text-[#F5EFE3]"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <div className={`${montserrat.variable} font-[family-name:var(--font-nav)]`}>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-8 sm:pt-6">
        <div
          className={`flex w-full max-w-[1600px] items-center justify-between rounded-full border transition-all duration-300 ${
            scrolled
              ? "border-white/10 bg-[#14120F]/75 px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-6"
              : "border-transparent bg-transparent px-4 py-3 sm:px-6"
          }`}
        >
          {/* Logo */}
          <Link href={`${t.links[0].href}#accueil`} className="flex shrink-0 items-center gap-2">
            <span className="relative h-8 w-[120px] sm:h-9 sm:w-[136px]">
              <Image
                src="/logo.png"
                alt="YellowSun Power"
                fill
                sizes="136px"
                className="object-contain object-left"
                priority
              />
            </span>
          </Link>

          {/* Desktop nav pill */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {t.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                className="relative px-4 py-2 text-[13px] font-medium tracking-wide text-[#F5EFE3]/80 transition-colors duration-200 hover:text-[#F5EFE3]"
                style={{ fontFamily: "var(--font-nav)" }}
              >
                {link.label}
                <span
                  className={`pointer-events-none absolute inset-x-3 -bottom-0.5 h-[1.5px] rounded-full bg-[#F2A93B] transition-opacity duration-200 ${
                    hovered === link.href ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right cluster: language (all screens) + CTA (desktop) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                aria-label={t.openMenu === "Ouvrir le menu" ? "Choisir la langue" : "Choose language"}
                className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold uppercase text-[#A69C88] transition-colors duration-200 hover:border-[#F2A93B]/40 hover:text-[#F5EFE3]"
              >
                {locale}
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 9 9"
                  fill="none"
                  className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
                >
                  <path d="M1 3L4.5 6.5L8 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#14120F] shadow-xl">
                  {LOCALES.map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        switchLocale(l);
                        setLangOpen(false);
                      }}
                      className={`px-4 py-2 text-left text-xs font-medium uppercase transition-colors duration-150 ${
                        l === locale
                          ? "bg-[#F2A93B]/10 text-[#F2A93B]"
                          : "text-[#A69C88] hover:bg-white/5 hover:text-[#F5EFE3]"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={openModal}
              className="hidden rounded-full bg-[#F2A93B] px-5 py-2 text-[13px] font-semibold text-[#14120F] transition-colors duration-200 hover:bg-[#C6660B] lg:inline-flex"
            >
              {t.cta}
            </button>

            {/* Mobile burger — grouped with the lang button so justify-between doesn't split them apart */}
            <button
              aria-label={t.openMenu}
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 lg:hidden"
            >
              <span className="relative flex h-3.5 w-4 flex-col justify-between">
                <span className="h-[1.5px] w-full rounded-full bg-[#F5EFE3]" />
                <span className="h-[1.5px] w-full rounded-full bg-[#F5EFE3]" />
                <span className="h-[1.5px] w-3 self-end rounded-full bg-[#F2A93B]" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-[#14120F] transition-all duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* ambient glow, consistent with hero */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(242,169,59,0.3)_0%,rgba(242,169,59,0)_70%)] blur-2xl" />

        <div className="flex items-center justify-between px-6 pt-6">
          <span className="relative h-8 w-[120px]">
            <Image src="/logo.png" alt="YellowSun Power" fill sizes="120px" className="object-contain object-left" />
          </span>
          <button
            aria-label={t.closeMenu}
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="#F5EFE3" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="relative z-10 flex flex-1 flex-col justify-center gap-2 px-8">
          {t.links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`border-b border-white/5 py-3.5 text-2xl font-medium text-[#F5EFE3] transition-all duration-300 ${
                mobileOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{
                fontFamily: "var(--font-nav)",
                transitionDelay: mobileOpen ? `${80 + i * 60}ms` : "0ms",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="relative z-10 flex items-center justify-between px-8 pb-10">
          <LangSwitch className="flex gap-2" />

          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              openModal();
            }}
            className="rounded-full bg-[#F2A93B] px-5 py-2.5 text-sm font-semibold text-[#14120F]"
          >
            {t.cta}
          </button>
        </div>
      </div>
    </div>
  );
}
