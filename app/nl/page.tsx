// app/nl/page.tsx
// Dutch mirror of the homepage. Every shared component below detects
// the /nl prefix itself (see lib/locale.js), so this file mirrors
// app/page.tsx and app/en/page.tsx in structure.
import StickyMenu from "../components/StickyMenu";
import HeroSection from "../components/HeroSection";
import TvFeature from "../components/TvFeature";
import AboutSection from "../components/AboutSection";
import Realisation from "../components/Realisation";
import Fournisseurs from "../components/Fournisseurs";
import Footer from "../components/Footer";
import { QuoteModalProvider } from "../components/QuoteModalContext";
import QuoteModal from "../components/QuoteModal";

export default function HomeNL() {
  return (
    <QuoteModalProvider>
      <main>
        <StickyMenu />
        <HeroSection />
        <TvFeature />
        <AboutSection />
        <Realisation />
        <Fournisseurs />
        <Footer />
      </main>
      <QuoteModal />
    </QuoteModalProvider>
  );
}
