import type { Metadata } from "next";
import { hreflangAlternates } from "../../lib/seo";

export const metadata: Metadata = {
  title: "Our Projects - Solar Installations in Morocco | YellowSun Power",
  description:
    "Explore our photovoltaic installations in Tangier, Rabat, Casablanca and Fez: villas, residences, carports and industrial sites.",
  alternates: hreflangAlternates("/realisations", "/en/projects"),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
