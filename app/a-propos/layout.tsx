import type { Metadata } from "next";
import { hreflangAlternates } from "../lib/seo";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "8 ans d'expertise solaire en France, aujourd'hui au Maroc. Découvrez le parcours de YellowSun Power, notre partenariat EDF et notre engagement qualité.",
  alternates: hreflangAlternates("/a-propos", "/a-propos"),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
