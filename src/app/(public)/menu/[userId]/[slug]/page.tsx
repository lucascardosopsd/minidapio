import { fetchRestaurantsByQuery } from "@/actions/restaurant/fetchRestaurantsByQuery";
import CategoriesBar from "@/components/menu/CategoriesBar";
import MenuHeader from "@/components/menu/Header";
import MenuInputSearch from "@/components/menu/InputSearch";
import { FullRestaurantProps } from "@/types/restaurant";
import ItemsList from "@/components/menu/ItemsList";

interface MenuProps {
  params: {
    userId: string;
    slug: string;
  };
  searchParams?: {
    title?: string;
    categoryId?: string;
  };
}

const Menu = async ({ params: { userId, slug }, searchParams }: MenuProps) => {
  const title = !!searchParams?.title?.length;

  const restaurants = (await fetchRestaurantsByQuery(
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

  const currentCategoryId = searchParams?.categoryId || "highlights";

  const currentItems = restaurants[0]?.Items?.filter(
    (item) => item.categoryId == currentCategoryId
  );

  const highlightItems = restaurants[0]?.Items?.filter(
    (item) => item.highlight
  );

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
      <MenuInputSearch keyName="title" placeholder="Busque um item" />

      {!searchParams?.title && (
        <CategoriesBar
          categories={restaurants[0].Categories}
          themeColor={restaurants[0].color}
          currentCategoryId={currentCategoryId}
          initialIndex={restaurants[0].Categories.findIndex(
            (category) => category.id == currentCategoryId
          )}
        />
      )}

      <div className="h-[calc(100svh-28svh)] overflow-y-auto p-5 relative pb-32 mx-auto">
        {/* Gradient FX */}
        <div className="w-full h-32 fixed bottom-0 left-0 bg-gradient-to-t from-background to-transparent z-50 pointer-events-none" />

        {currentCategoryId !== "highlights" && (
          <ItemsList
            items={currentItems}
            themeColor={restaurants[0].color}
            regionId={restaurants[0].regionId!}
          />
        )}

        {currentCategoryId == "highlights" && (
          <ItemsList
            items={highlightItems}
            themeColor={restaurants[0].color}
            regionId={restaurants[0].regionId!}
          />
        )}
      </div>
    </div>
  );
};

export default Menu;
