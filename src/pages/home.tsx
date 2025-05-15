import ParticlesBackground from "../components/particles-background";
import HeroSection from "../components/hero-section";
import QuoteSection from "../components/quote-section";
import UspsSection from "../components/usps-section";
import HowItWorksSection from "../components/how-it-works-section";
import ShowcaseSection from "../components/showcase-section";
import ContactSection from "../components/contact-section";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ParticlesBackground />
      <HeroSection />
      <QuoteSection />
      <UspsSection />
      <HowItWorksSection />
      <ShowcaseSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
