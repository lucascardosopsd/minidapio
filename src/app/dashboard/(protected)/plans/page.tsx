import { fetchPlansByQuery } from "@/actions/plan/fetchPlansByQuery";
import { fetchSubscriptionsByQuery } from "@/actions/subscription/fetchManySubscriptions";
import PlanCard from "@/components/restaurant/PlanCard";
import { Separator } from "@/components/ui/separator";
import { useUserSession } from "@/hooks/useUserSession";
import moment from "moment";

const PlansPage = async () => {
  const user = await useUserSession();

  const { subscriptions } = await fetchSubscriptionsByQuery({
    take: 10,
    page: 0,
    query: {
      where: {
        userId: user?.id,
      },
    },
  });

  let { plans } = await fetchPlansByQuery({
    page: 0,
    take: 100,
    query: {
      orderBy: {
        order: "asc",
      },
    },
  });

  const trialRemaining = moment(user?.createdAt)
    .add(1, "month")
    .diff(moment(), "day");

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
              disabled={trialRemaining < 0 && plan.alias == "free"}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PlansPage;
