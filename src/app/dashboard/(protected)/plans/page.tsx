import { fetchPlansByQuery } from "@/actions/plan/fetchPlansByQuery";
import { fetchSubscriptionsByQuery } from "@/actions/subscription/fetchManySubscriptions";
import { fetchUser } from "@/actions/user/fetchUser";
import PlanCard from "@/components/restaurant/PlanCard";
import { Separator } from "@/components/ui/separator";
import { useUserSession } from "@/hooks/useUserSession";

const PlansPage = async () => {
  const session = await useUserSession();

  if (!session) {
    return;
  }

  const user = await fetchUser({ email: session?.email! });

  const { subscriptions } = await fetchSubscriptionsByQuery({
    take: 10,
    page: 0,
    query: {
      where: {
        userId: user?.id,
      },
    },
  });

  const { plans } = await fetchPlansByQuery({ page: 0, take: 100, query: {} });

  return (
    <div className="flex flex-col tablet:items-center tablet:flex-row gap-5 mx-auto">
      <div className="flex flex-col gap-2">
        <p className="text-4xl text-center">Eleve o nível do seu restaurante</p>
        <p className="max-w-[400px] text-center mx-auto">
          Escolha um plano e agregue ainda mais à experiência do seu cliente
        </p>
      </div>

      <Separator orientation="vertical" className="hidden tablet:block" />
      <Separator orientation="horizontal" className="block tablet:hidden" />

      {plans.map((plan, index) => (
        <PlanCard
          plan={plan}
          key={index}
          current={subscriptions[0].planId == plan.id}
        />
      ))}
    </div>
  );
};

export default PlansPage;
