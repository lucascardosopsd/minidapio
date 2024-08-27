"use server";
import { Accordion } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { fetchUserCategoriesByQuery } from "@/actions/category/fetchUserCategoriesByQuery";
import ItemsActions from "@/components/restaurant/ItemsActions";
import CategoriesList from "@/components/restaurant/lists/Categories";
import { CategoriesWithItemsProps } from "@/types/category";
import RestaurantActionbar from "@/components/restaurant/Actionbar";
import { Item } from "@prisma/client";
import { planLimits } from "@/constants/planLimits";
import { fetchSubscriptionsByQuery } from "@/actions/subscription/fetchManySubscriptions";
import { SubscriptionWithPlanProps } from "@/types/plan";

interface PageProps {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string };
}

interface CustomFetchSubscriptionsByQueryResProps {
  subscriptions: SubscriptionWithPlanProps[];
  pages: number;
}

export default async function Restaurant({
  params: { id: restaurantId },
}: PageProps) {
  const categories: CategoriesWithItemsProps[] =
    await fetchUserCategoriesByQuery({
      where: {
        restaurantId,
      },
      orderBy: {
        order: "asc",
      },
      include: {
        items: {
          orderBy: {
            order: "desc",
          },
        },
      },
    });

  const items = categories.flatMap(
    (category) => category.items && category.items
  ) as Item[];

  const { subscriptions } =
    await fetchSubscriptionsByQuery<CustomFetchSubscriptionsByQueryResProps>({
      page: 0,
      take: 1,
      query: {
        where: { userId: categories[0].userId },
        include: {
          Plan: true,
        },
      },
    });

  const limits = planLimits[subscriptions[0].Plan.alias];

  return (
    <main className="flex flex-col gap-4 pt-5 h-[90svh] overflow-y-auto">
      <RestaurantActionbar
        restaurantId={restaurantId}
        limits={limits}
        categoriesCount={categories.length}
      />

      <Separator />

      <div className="fixed flex justify-center bottom-0 left-0 p-5 bg-gradient-to-t from-background via-background to-transparent z-50 w-full">
        <ItemsActions categories={categories} items={items!} />
      </div>
      <div className="w-full mx-auto h-full">
        <Accordion type="multiple">
          <CategoriesList categories={categories} />
        </Accordion>
      </div>
    </main>
  );
}
