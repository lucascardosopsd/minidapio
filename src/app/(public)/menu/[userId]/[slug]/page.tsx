import { fetchRestaurantsByQuery } from "@/actions/restaurant/fetchRestaurantsByQuery";
import RestaurantProfile from "@/components/menu/RestaurantProfile";
import { FullRestaurantProps } from "@/types/restaurant";

interface MenuProps {
  params: {
    userId: string;
    slug: string;
  };
  searchParams?: {
    title?: string;
  };
}

const Menu = async ({ params: { userId, slug }, searchParams }: MenuProps) => {
  const title = !!searchParams?.title?.length;

  const restaurant = (await fetchRestaurantsByQuery(
    {
      where: { slug, userId },
      include: {
        Items: {
          where: !title
            ? {}
            : {
                OR: [
                  {
                    title: {
                      contains: searchParams?.title,
                      mode: "insensitive",
                    },
                  },
                  {
                    description: {
                      contains: searchParams?.title,
                      mode: "insensitive",
                    },
                  },
                ],
              },
        },
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
      <div className="flex items-center justify-center h-svh w-full ">
        Restaurante não encontrado.
      </div>
    );
  }

  return (
    <div className="px-5 h-svh max-w-[600px] antialiased">
      <RestaurantProfile
        restaurant={restaurant[0]}
        pageSearchParams={searchParams}
      />
    </div>
  );
};

export default Menu;
