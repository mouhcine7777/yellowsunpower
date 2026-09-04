import type { Metadata } from "next";
import SetHtmlLang from "../components/SetHtmlLang";
import { hreflangAlternates } from "../lib/seo";

export const metadata: Metadata = {
  title: "Premium Solar Installations in Morocco",
  description:
    "YellowSun Power designs and installs custom solar panels for villas, riads, hotels and businesses across Morocco. Free assessment and quote within 48h.",
  alternates: hreflangAlternates("/", "/en"),
};

export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SetHtmlLang lang="en" />
      {children}
    </>
  );
}
