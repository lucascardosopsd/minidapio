import Footer from "@/components/landingPage/Footer";
import HeroSection from "@/components/landingPage/sections/Hero";
import Advantages from "@/components/landingPage/sections/Advantages";
import Features from "@/components/landingPage/sections/Features";
import PlansSection from "@/components/landingPage/sections/Plans";
import Faq from "@/components/landingPage/sections/Faq";

const LandingPage = async () => {
  return (
    <div className="flex flex-col gap-y-44 overflow-x-hidden">
      <HeroSection />
      <Advantages />
      <Features />
      <PlansSection />
      <Faq />
      <Footer />
    </div>
  );
};

export default LandingPage;
