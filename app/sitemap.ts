import type { MetadataRoute } from "next";
import { SITE_URL, ROUTES } from "./lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return Object.entries(ROUTES).flatMap(([frPath, mirrors]) => {
    const paths = [frPath, mirrors.en, mirrors.nl];
    const languages = {
      "fr-MA": `${SITE_URL}${frPath}`,
      "en-MA": `${SITE_URL}${mirrors.en}`,
      "nl-NL": `${SITE_URL}${mirrors.nl}`,
    };

    return paths.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.8,
      alternates: { languages },
    }));
  });
}
