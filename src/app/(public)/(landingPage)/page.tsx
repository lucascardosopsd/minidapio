import { fetchManyRestaurants } from "@/actions/restaurant/fetchManyRestaurants";
import Footer from "@/components/landingPage/Footer";
import HeroSection from "@/components/landingPage/sections/Hero";
import Advantages from "@/components/landingPage/sections/Advantages";
import Features from "@/components/landingPage/sections/Features";
import PlansSection from "@/components/landingPage/sections/Plans";

const LandingPage = async () => {
  const { restaurants } = await fetchManyRestaurants({
    page: 0,
    take: 20,
    query: {
      orderBy: {
        title: "asc",
      },
    },
  });

  return (
    <div className="flex flex-col gap-y-44">
      <HeroSection />
      <Advantages />
      <Features />
      <PlansSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
