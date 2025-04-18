import { Metadata } from "next";
import { getCurrentUser } from "@/hooks/useCurrentUser";
import { fetchPlansByQuery } from "@/actions/plan/fetchPlansByQuery";
import { checkMonthlySubscription } from "@/actions/subscription/checkMonthlySubscription";
import { fetchSubscriptionsByQuery } from "@/actions/subscription/fetchManySubscriptions";
import PlanCard from "@/components/restaurant/PlanCard";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Planos",
  description: "Escolha o plano ideal para o seu negócio",
};

const PlansPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const { subscriptions } = await fetchSubscriptionsByQuery({
    take: 10,
    page: 0,
    query: {
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    },
  });

  let { plans } = await fetchPlansByQuery({
    page: 0,
    take: 100,
    query: {
      orderBy: {
        price: "asc",
      },
    },
  });

  delete plans[0];

  const checkPayment = await checkMonthlySubscription({ userId: user.id });

  return (
    <>
      <section className="flex flex-col tablet:flex-row justify-center items-center gap-5 mx-auto p-5 tablet:p-0 w-full">
        <div className="flex flex-col gap-2">
          <p className="text-4xl text-center text-primary font-semibold">
            Eleve o nível do seu restaurante
          </p>
          <p className="max-w-[450px] text-center mx-auto">
            O período de testes acabou e está na hora de dar início ao seu plano
            profissional
          </p>
        </div>

        <Separator orientation="vertical" className="hidden tablet:block" />
        <Separator orientation="horizontal" className="block tablet:hidden" />

        <div className="flex flex-col tablet:flex-row items-center gap-5">
          {plans.map((plan, index) => (
            <PlanCard
              plan={plan}
              key={index}
              current={
                checkPayment.type == "paid" && !!checkPayment?.remaining!
                  ? subscriptions[0]?.planId == plan.id
                  : false
              }
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default PlansPage;
