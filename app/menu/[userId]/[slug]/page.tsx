import { fetchUserRestaurantsByQuery } from "@/actions/restaurant/fetchUserRestaurantsByQuery";
import RestaurantProfile from "@/components/RestaurantProfile";

interface MenuProps {
  params: {
    userId: string;
    slug: string;
  };
}

const Menu = async ({ params: { userId, slug } }: MenuProps) => {
  const restaurant = await fetchUserRestaurantsByQuery({
    where: { slug, userId },
  });

  console.log(restaurant[0].workHours);

  return (
    <div className="px-10 h-[100svh] overflow-y-auto max-w-[600px] flex items-start mx-auto antialiased">
      <RestaurantProfile restaurant={restaurant[0]} />
    </div>
  );
};

export default Menu;
