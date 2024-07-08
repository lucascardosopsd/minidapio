import { fetchManyRestaurants } from "@/actions/restaurant/fetchManyRestaurants";
import Footer from "@/components/landingPage/Footer";
import AdvantagesSection from "@/components/landingPage/sections/Advantages";
import HeroSection from "@/components/landingPage/sections/Hero";
import HowWorksSection from "@/components/landingPage/sections/HowWorks";
import PlansSection from "@/components/landingPage/sections/Plans";
import { InfiniteMovingCards } from "@/components/ui/infinity-moving-cards";

const LandingPage = async () => {
  const { restaurants } = await fetchManyRestaurants({ page: 0, take: 20 });

  const carouselItems = restaurants.map((restaurant) => ({
    imageUrl: restaurant.logo,
    href: `${process.env.NEXT_PUBLIC_HOST}/${restaurant.userId}/${restaurant.slug}`,
    title: restaurant.title,
  }));

  return (
    <>
      <HeroSection />
      <div className="flex flex-col py-24 border border-boder rounded gap-10">
        <div className="flex flex-col">
          <p className="text-center text-2xl text-primary font-semibold">
            Restaurantes
          </p>
          <p className="text-center">
            Conheça alguns dos nossos restaurantes parceiros
          </p>
        </div>
        <InfiniteMovingCards items={carouselItems} direction="left" />
      </div>
      <HowWorksSection />
      <AdvantagesSection />
      <PlansSection />
      <Footer />
    </>
  );
};

export default LandingPage;
