import type { Metadata } from "next";
import { hreflangAlternates } from "../../lib/seo";

export const metadata: Metadata = {
  title: "Solar Solutions for Villas, Riads, Hotels and Businesses | YellowSun Power",
  description:
    "A solar solution tailored to every property in Morocco: villas, riads, hotels and business sites. High-end equipment guaranteed for 25 years.",
  alternates: hreflangAlternates("/solutions", "/en/solutions"),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
