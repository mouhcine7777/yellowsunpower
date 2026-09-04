import type { Metadata } from "next";
import { hreflangAlternates } from "../lib/seo";

export const metadata: Metadata = {
  title: "Solutions solaires pour villas, riads, hôtels et professionnels",
  description:
    "Une solution solaire adaptée à chaque propriété au Maroc : villas, riads, hôtels et sites professionnels. Matériel haut de gamme garanti 25 ans.",
  alternates: hreflangAlternates("/solutions", "/solutions"),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
