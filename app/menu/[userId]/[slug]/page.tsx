import RestaurantProfile from "@/components/RestaurantProfile";
import { restaurants } from "@/mock/restaurants";

interface MenuProps {
  params: {
    userId: string;
    slug: string;
  };
}

const Menu = ({ params: { userId, slug } }: MenuProps) => {
  const restaurant = restaurants.filter(
    (data) => data.slug == slug && data.userId == Number(userId)
  )[0];

  return (
    <div className="px-10 h-[100svh] overflow-y-auto">
      <RestaurantProfile restaurant={restaurant} />
    </div>
  );
};

export default Menu;
