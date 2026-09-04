import type { Metadata } from "next";
import { hreflangAlternates } from "../../lib/seo";

export const metadata: Metadata = {
  title: "Contact | YellowSun Power",
  description:
    "Get in touch with YellowSun Power for your solar project in Morocco: phone, WhatsApp, email, or a free detailed quote. We reply within 48h.",
  alternates: hreflangAlternates("/contact", "/en/contact"),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
