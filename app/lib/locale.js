"use client";

import { usePathname } from "next/navigation";

// Locale is derived from the URL rather than passed as a prop through
// every component: any route under /en is English, /nl is Dutch,
// everything else is French. This keeps shared components (nav,
// footer, hero, etc.) usable unchanged across every mirror.
export function useLocale() {
  const pathname = usePathname() || "/";
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/nl" || pathname.startsWith("/nl/")) return "nl";
  return "fr";
}

// Maps each French route to its English and Dutch mirrors, so the
// language switcher lands on the equivalent page instead of always
// going to the home page.
const ROUTE_MAP = {
  "/": { en: "/en", nl: "/nl" },
  "/solutions": { en: "/en/solutions", nl: "/nl/oplossingen" },
  "/realisations": { en: "/en/projects", nl: "/nl/projecten" },
  "/a-propos": { en: "/en/about", nl: "/nl/over-ons" },
  "/contact": { en: "/en/contact", nl: "/nl/contact" },
};

const TO_FRENCH = { "/": "/" };
for (const [fr, mirrors] of Object.entries(ROUTE_MAP)) {
  TO_FRENCH[mirrors.en] = fr;
  TO_FRENCH[mirrors.nl] = fr;
}

export function localizedPath(pathname, targetLocale) {
  if (targetLocale === "fr") {
    return TO_FRENCH[pathname] || "/";
  }
  const frPath = TO_FRENCH[pathname] ?? pathname;
  return ROUTE_MAP[frPath]?.[targetLocale] || `/${targetLocale}`;
}
