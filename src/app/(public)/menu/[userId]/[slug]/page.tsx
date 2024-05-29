import { fetchRestaurantsByQuery } from "@/actions/restaurant/fetchRestaurantsByQuery";
import RestaurantProfile from "@/components/menu/RestaurantProfile";
import { FullRestaurantProps } from "@/types/restaurant";

interface MenuProps {
  params: {
    userId: string;
    slug: string;
  };
}

const Menu = async ({ params: { userId, slug } }: MenuProps) => {
  const restaurant = (await fetchRestaurantsByQuery(
    {
      where: { slug, userId },
      include: {
        Items: true,
        Categories: {
          include: {
            items: true,
          },
        },
      },
    },
    userId
  )) as FullRestaurantProps[];

  if (!restaurant[0]) {
    return (
      <div className="flex items-center justify-center h-svh w-full">
        Restaurante não encontrado.
      </div>
    );
  }

  return (
    <div className="px-10 h-[100svh] overflow-y-auto max-w-[600px] flex items-start mx-auto antialiased">
      <RestaurantProfile restaurant={restaurant[0]} />
    </div>
  );
};

export default Menu;