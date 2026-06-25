import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Trusted from "../components/Trusted";
import Features from "../components/Features";
import StatsStrip from "../components/StatsStrip";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import InstallPWA from "../components/InstallPWA";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";

const LandingPage = () => {
  return (
    <div className="font-dm bg-cream text-soil overflow-x-hidden">
      <Navbar />
      <Hero />
      {/* <Trusted /> */}
      <Features />
      <StatsStrip />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <InstallPWA />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;