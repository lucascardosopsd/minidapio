import { fetchSubscriptionsByQuery } from "@/actions/subscription/fetchManySubscriptions";
import { fetchUser } from "@/actions/user/fetchUser";
import SubscriptionCard from "@/components/config/SubscriptionCard";
import { plans } from "@/constants/plans";

import { useUserSession } from "@/hooks/useUserSession";

const NewPaymentProfilePage = async () => {
  const session = await useUserSession();

  if (!session) {
    return;
  }

  const user = await fetchUser({ email: session?.email! });

  const { subscriptions } = await fetchSubscriptionsByQuery({
    page: 0,
    take: 100,
    query: {
      where: {
        userId: user?.id,
        status: "ACTIVE",
      },
    },
  });

  const currentPlan = plans.filter(
    (plan) => plan.alias == subscriptions[0]?.plan
  )[0];

  return (
    <div className="flex flex-col gap-5 items-center overflow-hidden">
      <p className="text-3xl">Configurações</p>

      <SubscriptionCard
        currentPlan={currentPlan}
        currentSub={subscriptions[0]}
      />
    </div>
  );
};

export default NewPaymentProfilePage;
