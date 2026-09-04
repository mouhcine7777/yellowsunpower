import type { Metadata } from "next";
import { hreflangAlternates } from "../../lib/seo";

export const metadata: Metadata = {
  title: "Onze Projecten - Zonne-installaties in Marokko | YellowSun Power",
  description:
    "Ontdek onze fotovoltaïsche installaties in Tanger, Rabat, Casablanca en Fez: villa's, residenties, carports en industriële sites.",
  alternates: hreflangAlternates("/realisations", "/nl/projecten"),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
