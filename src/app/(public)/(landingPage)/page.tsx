import Footer from "@/components/landingPage/Footer";
import AdvantagesSection from "@/components/landingPage/sections/Advantages";
import HeroSection from "@/components/landingPage/sections/Hero";
import HowWorksSection from "@/components/landingPage/sections/HowWorks";
import PlansSection from "@/components/landingPage/sections/Plans";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <HowWorksSection />
      <AdvantagesSection />
      <PlansSection />
      <Footer />
    </>
  );
};

export default LandingPage;
