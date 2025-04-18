import MenuHeader from "@/components/menu/Header";
import NoteModal from "@/components/menu/NoteModal";
import { checkMonthlySubscription } from "@/actions/subscription/checkMonthlySubscription";
import { FullRestaurantProps } from "@/types/restaurant";
import CategoryList from "@/components/menu/CategoriesList";
import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";

interface MenuProps {
  params: Promise<{
    restaurantId: string;
    slug: string;
  }>;
}

interface CustomRestaurantRes {
  pages: number;
  restaurants: FullRestaurantProps[];
}

const Menu = async ({ params }: MenuProps) => {
  const { restaurantId } = await params;

  const restaurant = await prisma.restaurant.findUnique({
    where: { id: restaurantId },
    include: {
      menuItems: true,
      categories: {
        orderBy: {
          order: "asc",
        },
        include: {
          items: true,
        },
      },
    },
  });

  if (!restaurant) {
    return (
      <div className="flex items-center justify-center h-svh w-full ">
        <h1 className="text-2xl font-bold">Restaurant not found</h1>
      </div>
    );
  }

  // Map Prisma model to FullRestaurantProps
  const mappedRestaurant: FullRestaurantProps = {
    id: restaurant.id,
    title: restaurant.name,
    active: restaurant.isActive,
    landline: null,
    whatsapp: null,
    address: restaurant.address,
    methods: restaurant.methods as any,
    workHours: restaurant.workHours as any,
    logo: "",
    color: "",
    linkMaps: null,
    note: restaurant.description,
    activeMenu: true,
    slug: "",
    createdAt: restaurant.createdAt,
    updatedAt: restaurant.updatedAt,
    userId: restaurant.userId,
    state: "",
    province: "",
    Items: restaurant.menuItems as any,
    Categories: restaurant.categories as any,
  };

  const currentSub = await checkMonthlySubscription({
    userId: restaurant.ownerId!,
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
      {mappedRestaurant.note && <NoteModal restaurant={mappedRestaurant} />}
      <MenuHeader restaurant={mappedRestaurant} />

      <div className="flex flex-col gap-2 h-[88svh] overflow-y-auto px-5 pb-20">
        {mappedRestaurant.Categories.map((category: Category) => (
          <CategoryList
            category={category}
            themeColor={mappedRestaurant.color}
            key={category.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
