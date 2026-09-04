// Shared SEO constants — one place to update the domain, GA id, or
// business info used across metadata, the sitemap, robots.txt, and
// the JSON-LD schema.

export const SITE_URL = "https://yellowsunpower.com";
export const GA_MEASUREMENT_ID = "G-1KHYSGMLEB";

export const BUSINESS = {
  name: "YellowSun Power",
  phone: "+212649139720",
  email: "contact@yellowsunpower.com",
  addressCountry: "MA",
  instagram: "https://www.instagram.com/yellowsun.power/",
  facebook: "https://www.facebook.com/profile.php?id=61593046018677",
  tiktok: "https://www.tiktok.com/@yellowsun.power",
  snapchat: "https://www.snapchat.com/@yellowsun.power",
};

// French route -> { en, nl } mirror, reused by the sitemap and by each
// page's hreflang alternates so the three language versions of a page
// always cross-reference each other correctly.
export const ROUTES: Record<string, { en: string; nl: string }> = {
  "/": { en: "/en", nl: "/nl" },
  "/solutions": { en: "/en/solutions", nl: "/nl/oplossingen" },
  "/realisations": { en: "/en/projects", nl: "/nl/projecten" },
  "/a-propos": { en: "/en/about", nl: "/nl/over-ons" },
  "/contact": { en: "/en/contact", nl: "/nl/contact" },
};

// `frPath` is always the French route key (e.g. "/contact"); `canonical`
// is the actual path of the page calling this (its own locale version),
// so /en/contact and /nl/contact both point their hreflang set at the
// same trio while each keeps its own canonical.
export function hreflangAlternates(
  frPath: keyof typeof ROUTES,
  canonical: string
) {
  const mirrors = ROUTES[frPath];
  return {
    canonical,
    languages: {
      "fr-MA": frPath,
      "en-MA": mirrors.en,
      "nl-NL": mirrors.nl,
      "x-default": frPath,
    },
  };
}
