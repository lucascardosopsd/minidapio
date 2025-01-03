"use server";
import { Accordion } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import ItemsActions from "@/components/restaurant/ItemsActions";
import CategoriesList from "@/components/restaurant/lists/Categories";
import RestaurantActionbar from "@/components/restaurant/Actionbar";
import { Item } from "@prisma/client";
import { planLimits } from "@/constants/planLimits";
import { fetchSubscriptionsByQuery } from "@/actions/subscription/fetchManySubscriptions";
import { SubscriptionWithPlanProps } from "@/types/plan";
import { fetchCategoriesByQuery } from "@/actions/category/fetchCategoriesByQuery";
import { CategoriesWithItemsProps } from "@/types/category";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface CustomFetchSubscriptionsByQueryResProps {
  subscriptions: SubscriptionWithPlanProps[];
  pages: number;
}

interface CustomFetchCategoriesRes {
  categories: CategoriesWithItemsProps[];
  pages: number;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Restaurant({ params }: PageProps) {
  const { id: restaurantId } = await params;

  const user = await useCurrentUser();

  const { categories } = await fetchCategoriesByQuery<CustomFetchCategoriesRes>(
    {
      page: 0,
      take: 10000,
      query: {
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
      },
    }
  );

  const items = categories.flatMap(
    (category) => category?.items && category.items
  ) as Item[];

  const { subscriptions } =
    await fetchSubscriptionsByQuery<CustomFetchSubscriptionsByQueryResProps>({
      page: 0,
      take: 1,
      query: {
        where: { userId: user?.id },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          Plan: true,
        },
      },
    });

  const limits = planLimits[subscriptions[0]?.Plan?.alias || "free"];

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
          <CategoriesList categories={categories} limits={limits} />
        </Accordion>
      </div>
    </main>
  );
}
