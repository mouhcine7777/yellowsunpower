import type { Metadata } from "next";
import { hreflangAlternates } from "../../lib/seo";

export const metadata: Metadata = {
  title: "Contact | YellowSun Power",
  description:
    "Neem contact op met YellowSun Power voor uw zonneproject in Marokko: telefoon, WhatsApp, e-mail of een gratis gedetailleerde offerte. Reactie binnen 48u.",
  alternates: hreflangAlternates("/contact", "/nl/contact"),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
