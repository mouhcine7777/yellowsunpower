// app/en/page.tsx
// English mirror of the homepage. Every shared component below
// detects the /en prefix itself (see lib/locale.js), so this file is
// intentionally identical in structure to app/page.tsx.
import StickyMenu from "../components/StickyMenu";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import Realisation from "../components/Realisation";
import Fournisseurs from "../components/Fournisseurs";
import Footer from "../components/Footer";
import { QuoteModalProvider } from "../components/QuoteModalContext";
import QuoteModal from "../components/QuoteModal";

export default function HomeEN() {
  return (
    <QuoteModalProvider>
      <main>
        <StickyMenu />
        <HeroSection />
        <AboutSection />
        <Realisation />
        <Fournisseurs />
        <Footer />
      </main>
      <QuoteModal />
    </QuoteModalProvider>
  );
}
