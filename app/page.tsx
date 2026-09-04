// app/page.tsx
import StickyMenu from "./components/StickyMenu";
import HeroSection from "./components/HeroSection";
import TvFeature from "./components/TvFeature";
import AboutSection from "./components/AboutSection";
import Realisation from "./components/Realisation";
import Fournisseurs from "./components/Fournisseurs";
import Footer from "./components/Footer";
import { QuoteModalProvider } from "./components/QuoteModalContext";
import QuoteModal from "./components/QuoteModal";


export default function Home() {
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
