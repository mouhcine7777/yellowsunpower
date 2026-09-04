import type { Metadata } from "next";
import { hreflangAlternates } from "../../lib/seo";

export const metadata: Metadata = {
  title: "Over ons | YellowSun Power",
  description:
    "8 jaar zonne-expertise in Frankrijk, nu actief in Marokko. Ontdek het traject van YellowSun Power, ons EDF-partnerschap en onze kwaliteitsgarantie.",
  alternates: hreflangAlternates("/a-propos", "/nl/over-ons"),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
