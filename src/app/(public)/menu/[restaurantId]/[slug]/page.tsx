import { fetchRestaurantsByQuery } from "@/actions/restaurant/fetchRestaurantsByQuery";
import MenuHeader from "@/components/menu/Header";
import NoteModal from "@/components/menu/NoteModal";
import { checkMonthlySubscription } from "@/actions/subscription/checkMonthlySubscription";
import { FullRestaurantProps } from "@/types/restaurant";
import CategoryList from "@/components/menu/CategoriesList";

interface MenuProps {
  params: {
    restaurantId: string;
    slug: string;
  };
}

interface CustomRestaurantRes {
  pages: number;
  restaurants: FullRestaurantProps[];
}

const Menu = async ({ params: { restaurantId } }: MenuProps) => {
  const { restaurants } = await fetchRestaurantsByQuery<CustomRestaurantRes>({
    page: 0,
    take: 10,
    query: {
      where: { id: restaurantId },
      include: {
        Items: true,
        Categories: {
          orderBy: {
            order: "asc",
          },
          include: {
            items: {
              where: {
                active: true,
              },
              orderBy: {
                highlight: "desc",
              },
            },
          },
        },
      },
    },
  });

  if (!restaurants[0]) {
    return (
      <div className="flex items-center justify-center h-svh w-full ">
        Restaurante não encontrado.
      </div>
    );
  }

  const currentSub = await checkMonthlySubscription({
    userId: restaurants[0].userId!,
  });

  if (currentSub.remaining == null) {
    return (
      <div className="flex items-center justify-center h-svh w-full ">
        Pagamento pendente.
      </div>
    );
  }

  return (
    <div className="h-svh antialiased w-full overflow-hidden ">
      {restaurants[0].note && <NoteModal restaurant={restaurants[0]} />}
      <MenuHeader restaurant={restaurants[0]} />

      <div className="flex flex-col gap-2 h-[88svh] overflow-y-auto px-5">
        {restaurants[0].Categories.map((category) => (
          <CategoryList
            category={category}
            themeColor={restaurants[0].color}
            key={category.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
