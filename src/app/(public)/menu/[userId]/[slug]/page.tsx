import { fetchRestaurantsByQuery } from "@/actions/restaurant/fetchRestaurantsByQuery";
import CategoriesBar from "@/components/menu/CategoriesBar";
import MenuHeader from "@/components/menu/Header";
import { FullRestaurantProps } from "@/types/restaurant";
import ItemsList from "@/components/menu/ItemsList";
import SearchSection from "@/components/menu/SearchSection";
import NoteModal from "@/components/menu/NoteModal";
import { checkMonthlySubscription } from "@/actions/subscription/checkMonthlySubscription";

interface MenuProps {
  params: {
    userId: string;
    slug: string;
  };
}

const Menu = async ({ params: { userId, slug } }: MenuProps) => {
  const restaurants = (await fetchRestaurantsByQuery({
    where: { slug, userId },
    include: {
      Items: {
        orderBy: {
          order: "asc",
        },
        where: {
          active: true,
        },
      },
      Categories: {
        orderBy: {
          order: "asc",
        },
        include: {
          items: {
            where: {
              active: true,
            },
          },
        },
      },
    },
  })) as FullRestaurantProps[];

  if (!restaurants[0]?.Items) {
    return;
  }

  const sortHighLightedItems = restaurants[0]?.Items.filter(
    (item) => item.highlight
  );

  sortHighLightedItems.sort((a, b) => a.order - b.order);

  const sortOrdered = restaurants[0]?.Items.filter(
    (item) => !item.highlight
  ).sort((a, b) => a.order - b.order);

  const items = [...sortHighLightedItems, ...sortOrdered];

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
    <div className="h-svh antialiased w-full">
      {restaurants[0].note && <NoteModal restaurant={restaurants[0]} />}

      <MenuHeader restaurant={restaurants[0]} />

      <SearchSection restaurant={restaurants[0]} />

      {restaurants[0].Categories.length ? (
        <CategoriesBar
          categories={restaurants[0].Categories}
          themeColor={restaurants[0].color}
        />
      ) : (
        <p className="text-center">Sem categorias</p>
      )}

      <div className="h-[calc(100svh-28svh)] overflow-y-auto p-5 relative pb-32 mx-auto">
        {/* Gradient FX */}
        <div className="w-full h-32 fixed bottom-0 left-0 bg-gradient-to-t from-background to-transparent z-50 pointer-events-none" />

        <ItemsList items={items} themeColor={restaurants[0].color} />
      </div>
    </div>
  );
};

export default Menu;
