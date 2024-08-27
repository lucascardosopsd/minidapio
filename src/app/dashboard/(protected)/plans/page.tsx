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

  const { plans } = await fetchPlansByQuery({
    page: 0,
    take: 100,
    query: {
      orderBy: {
        order: "asc",
      },
    },
  });

  return (
    <>
      <div className="flex flex-col tablet:items-center gap-5 mx-auto p-5 tablet:p-0">
        <div className="flex flex-col gap-2">
          <p className="text-4xl text-center text-primary font-semibold">
            Eleve o nível do seu restaurante
          </p>
          <p className="max-w-[450px] text-center mx-auto">
            Escolha um plano e agregue ainda mais à experiência do seu cliente
          </p>
        </div>

        <Separator orientation="horizontal" />

        <div className="flex flex-col tablet:flex-row items-center gap-5">
          {plans.map((plan, index) => (
            <PlanCard
              plan={plan}
              key={index}
              current={subscriptions[0]?.planId == plan.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PlansPage;
