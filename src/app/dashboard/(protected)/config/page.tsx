import { fetchPaymentsByQuery } from "@/actions/payment/fetchPaymentsByQuery";
import { fetchSubscriptionsByQuery } from "@/actions/subscription/fetchManySubscriptions";
import { fetchUser } from "@/actions/user/fetchUser";
import PaymentsHistoryCard from "@/components/config/PaymentsHistoryCard";
import SubscriptionCard from "@/components/config/SubscriptionCard";
import { plans } from "@/constants/plans";

import { useUserSession } from "@/hooks/useUserSession";
import { PaymentWithSubscriptionProps } from "@/types/paymentProps";

interface CustomPaymentsRes {
  payments: PaymentWithSubscriptionProps[];
  pages: number;
}

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

  const { payments } = await fetchPaymentsByQuery<CustomPaymentsRes>({
    query: {
      where: { userId: user?.id },
      include: {
        Subscription: true,
      },
    },
    page: 0,
    take: 12,
  });

  return (
    <div className="flex flex-col space-y-10 items-center overflow-hidden">
      <p className="text-3xl w-full border-b mt-10 pb-5">Configurações</p>

      <div className="flex min-h-screen gap-5">
        <SubscriptionCard
          currentPlan={currentPlan}
          currentSub={subscriptions[0]}
        />

        <PaymentsHistoryCard payments={payments} />
      </div>
    </div>
  );
};

export default NewPaymentProfilePage;
