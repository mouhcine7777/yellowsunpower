import type { Metadata } from "next";
import { hreflangAlternates } from "../lib/seo";

export const metadata: Metadata = {
  title: "Nos réalisations - Installations solaires au Maroc",
  description:
    "Découvrez nos installations photovoltaïques réalisées à Tanger, Rabat, Casablanca et Fès : villas, résidences, carports et sites industriels.",
  alternates: hreflangAlternates("/realisations", "/realisations"),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
