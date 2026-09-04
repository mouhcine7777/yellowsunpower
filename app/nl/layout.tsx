import type { Metadata } from "next";
import SetHtmlLang from "../components/SetHtmlLang";
import { hreflangAlternates } from "../lib/seo";

export const metadata: Metadata = {
  title: "Premium Zonne-installaties in Marokko",
  description:
    "YellowSun Power ontwerpt en installeert zonnepanelen op maat voor villa's, riads, hotels en bedrijven in heel Marokko. Gratis onderzoek en offerte binnen 48u.",
  alternates: hreflangAlternates("/", "/nl"),
};

export default function DutchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SetHtmlLang lang="nl" />
      {children}
    </>
  );
}
