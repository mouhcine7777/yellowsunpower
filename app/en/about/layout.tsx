import type { Metadata } from "next";
import { hreflangAlternates } from "../../lib/seo";

export const metadata: Metadata = {
  title: "About Us | YellowSun Power",
  description:
    "8 years of solar expertise in France, now serving Morocco. Discover YellowSun Power's journey, our EDF partnership and our commitment to quality.",
  alternates: hreflangAlternates("/a-propos", "/en/about"),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
