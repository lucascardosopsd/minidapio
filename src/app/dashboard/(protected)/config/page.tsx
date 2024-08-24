import { fetchUserSubscriptions } from "@/actions/subscription/fetchUserSubscriptions";
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

  const userSubscriptions = await fetchUserSubscriptions({ userId: user?.id! });

  const currentPlan = plans.filter(
    (plan) => plan.alias == userSubscriptions[0].plan
  )[0];

  return (
    <div className="flex flex-col gap-5 items-center overflow-hidden">
      <p className="text-3xl">Configurações</p>

      <SubscriptionCard
        user={user!}
        currentPlan={currentPlan}
        currentSub={userSubscriptions[0]}
      />
    </div>
  );
};

export default NewPaymentProfilePage;
