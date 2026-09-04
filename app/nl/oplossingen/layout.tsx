import type { Metadata } from "next";
import { hreflangAlternates } from "../../lib/seo";

export const metadata: Metadata = {
  title: "Zonne-oplossingen voor Villa's, Riads, Hotels en Bedrijven | YellowSun Power",
  description:
    "Een zonne-oplossing op maat voor elk type eigendom in Marokko: villa's, riads, hotels en bedrijfssites. Hoogwaardige apparatuur met 25 jaar garantie.",
  alternates: hreflangAlternates("/solutions", "/nl/oplossingen"),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
