import { fetchRestaurantsByQuery } from "@/actions/restaurant/fetchRestaurantsByQuery";
import CategoriesBar from "@/components/menu/CategoriesBar";
import MenuHeader from "@/components/menu/Header";
import { FullRestaurantProps } from "@/types/restaurant";
import ItemsList from "@/components/menu/ItemsList";
import SearchSection from "@/components/menu/SearchSection";

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

  const restaurants = (await fetchRestaurantsByQuery({
    where: { slug, userId },
    include: {
      Items: {
        orderBy: {
          order: "asc",
        },
        where: !title
          ? {
              active: true,
            }
          : {
              active: true,
              OR: [
                {
                  title: {
                    contains: searchParams?.title?.replace(/\s+$/, ""),
                    mode: "insensitive",
                  },
                },
                {
                  description: {
                    contains: searchParams?.title?.replace(/\s+$/, ""),
                    mode: "insensitive",
                  },
                },
              ],
            },
      },
      Categories: {
        orderBy: {
          order: "asc",
        },
        include: {
          items: true,
        },
      },
    },
  })) as FullRestaurantProps[];

  const sortHighLightedItems = restaurants[0].Items.filter(
    (item) => item.highlight
  );

  const sortOrdered = restaurants[0].Items.filter(
    (item) => item.order !== 0 && !item.highlight
  ).sort((a, b) => a.order - b.order);

  const sortTitle = restaurants[0].Items.filter(
    (item) => item.order == 0 && !item.highlight
  ).sort((a, b) => a.title.localeCompare(b.title));

  const items = [...sortHighLightedItems, ...sortOrdered, ...sortTitle];

  if (!restaurants[0]) {
    return (
      <div className="flex items-center justify-center h-svh w-full ">
        Restaurante não encontrado.
      </div>
    );
  }

  return (
    <div className="h-svh antialiased w-full">
      <MenuHeader restaurant={restaurants[0]} />

      <SearchSection restaurant={restaurants[0]} />

      <CategoriesBar
        categories={restaurants[0].Categories}
        themeColor={restaurants[0].color}
      />

      <div className="h-[calc(100svh-28svh)] overflow-y-auto p-5 relative pb-32 mx-auto">
        {/* Gradient FX */}
        <div className="w-full h-32 fixed bottom-0 left-0 bg-gradient-to-t from-background to-transparent z-50 pointer-events-none" />

        <ItemsList
          items={items}
          themeColor={restaurants[0].color}
          regionId={restaurants[0].regionId!}
        />
      </div>
    </div>
  );
};

export default Menu;
