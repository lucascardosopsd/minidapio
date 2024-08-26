import { fetchPaymentsByQuery } from "@/actions/payment/fetchPaymentsByQuery";
import { fetchPlansByQuery } from "@/actions/plan/fetchPlansByQuery";
import { fetchSubscriptionsByQuery } from "@/actions/subscription/fetchManySubscriptions";
import { fetchUser } from "@/actions/user/fetchUser";
import PaymentsHistoryCard from "@/components/config/PaymentsHistoryCard";
import SubscriptionCard from "@/components/config/SubscriptionCard";

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
  const { plans } = await fetchPlansByQuery({ take: 10, page: 0, query: {} });

  const currentPlan = plans.filter(
    (plan) => plan.id == subscriptions[0]?.planId
  )[0];

  const { payments } = await fetchPaymentsByQuery<CustomPaymentsRes>({
    query: {
      where: { userId: user?.id },
      include: {
        Subscription: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    },
    page: 0,
    take: 12,
  });

  return (
    <div className="flex flex-col space-y-10 items-center overflow-hidden">
      <p className="text-3xl w-full border-b mt-10 pb-5 font-semibold">
        Configurações
      </p>

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
