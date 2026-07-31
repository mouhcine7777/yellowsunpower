// app/page.tsx
import StickyMenu from "./components/StickyMenu";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import Realisation from "./components/Realisation";
import Fournisseurs from "./components/Fournisseurs";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <main>
      <StickyMenu />
      <HeroSection />
      <AboutSection />
      <Realisation />
      <Fournisseurs />
      <Footer />
    </main>
  );
}
