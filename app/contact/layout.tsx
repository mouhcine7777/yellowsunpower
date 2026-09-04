import type { Metadata } from "next";
import { hreflangAlternates } from "../lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez YellowSun Power pour votre projet solaire au Maroc : téléphone, WhatsApp, email ou formulaire de devis gratuit. Réponse sous 48h.",
  alternates: hreflangAlternates("/contact", "/contact"),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
