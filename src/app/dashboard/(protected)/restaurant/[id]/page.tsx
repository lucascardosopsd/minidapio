import { Accordion } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import ItemsActions from '@/components/restaurant/ItemsActions';
import CategoriesList from '@/components/restaurant/lists/Categories';
import RestaurantActionbar from '@/components/restaurant/Actionbar';
import { planLimits } from '@/constants/planLimits';
import { fetchSubscriptionsByQuery } from '@/actions/subscription/fetchManySubscriptions';
import { SubscriptionWithPlanProps } from '@/types/plan';
import { fetchCategoriesByQuery } from '@/actions/category/fetchCategoriesByQuery';
import { CategoriesWithItemsProps } from '@/types/category';
import { getCurrentUser } from '@/hooks/useCurrentUser';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { RestaurantForm } from '@/components/restaurant/forms/Restaurant';
import { fetchRestaurantById } from '@/actions/restaurant/fetchRestaurantById';

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

export const metadata: Metadata = {
  title: 'Editar Restaurante',
  description: 'Edite as informações do seu restaurante',
};

const RestaurantPage = async ({ params }: PageProps) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const { id } = await params;
  const restaurant = await fetchRestaurantById(id);

  if (!restaurant) {
    redirect('/dashboard/restaurants');
  }

  const { categories } = await fetchCategoriesByQuery<CustomFetchCategoriesRes>({
    page: 0,
    take: 10000,
    query: {
      where: {
        restaurantId: restaurant.id,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    },
  });

  const items = categories.flatMap(category => category?.items && category.items);

  const { subscriptions } =
    await fetchSubscriptionsByQuery<CustomFetchSubscriptionsByQueryResProps>({
      page: 0,
      take: 1,
      query: {
        where: { userId: user?.id },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          plan: true,
        },
      },
    });

  const limits = planLimits[subscriptions[0]?.Plan?.alias || 'free']!;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Editar Restaurante</h1>
        <p className="text-muted-foreground">Edite as informações do seu restaurante</p>
      </div>

      <RestaurantForm
        defaultValues={restaurant}
        onSubmit={async data => {
          // TODO: Implement update logic
        }}
        loading={false}
      />

      <main className="flex h-[90svh] flex-col gap-4 overflow-y-auto pt-5">
        <RestaurantActionbar
          restaurantId={restaurant.id}
          limits={limits}
          categoriesCount={categories.length}
        />

        <Separator />

        <div className="fixed bottom-0 left-0 z-50 flex w-full justify-center bg-gradient-to-t from-background via-background to-transparent p-5">
          <ItemsActions categories={categories} items={items!} />
        </div>
        <div className="mx-auto h-full w-full">
          <Accordion type="multiple">
            <CategoriesList categories={categories} limits={limits} />
          </Accordion>
        </div>
      </main>
    </div>
  );
};

export default RestaurantPage;
