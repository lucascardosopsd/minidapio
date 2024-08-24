import { fetchUser } from "@/actions/user/fetchUser";
import SubscriptionCard from "@/components/config/SubscriptionCard";
import { plans } from "@/constants/plans";

import { useUserSession } from "@/hooks/useUserSession";
import { AsaasSubscriptionObj } from "@/types/asaasSubscriptions";
import axios from "axios";

const NewPaymentProfilePage = async () => {
  const session = await useUserSession();

  if (!session) {
    return;
  }

  const user = await fetchUser({ email: session?.email! });

  const { data } = await axios.get<AsaasSubscriptionObj>(
    `${process.env.NEXT_PUBLIC_HOST}/api/asaas/payment/subscription/subscriptions/${user?.customerId}`
  );

  const currentSub = data.data[0];

  const currentPlan = plans.filter((plan) => plan.alias == user?.plan)[0];

  return (
    <div className="flex flex-col gap-5 items-center overflow-hidden">
      <p className="text-3xl">Configurações</p>

      <SubscriptionCard
        user={user!}
        currentPlan={currentPlan}
        currentSub={currentSub}
      />
    </div>
  );
};

export default NewPaymentProfilePage;
