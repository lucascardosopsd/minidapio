import { fetchPaymentsByQuery } from "@/actions/payment/fetchPaymentsByQuery";
import { fetchPlansByQuery } from "@/actions/plan/fetchPlansByQuery";
import { checkMonthlySubscription } from "@/actions/subscription/checkMonthlySubscription";
import { fetchSubscriptionsByQuery } from "@/actions/subscription/fetchManySubscriptions";
import { PaymentWithSubscriptionWithPlan } from "@/types/subscription";
import SettingsPanel from "@/components/settings/Panel";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface CustomPaymentsRes {
  payments: PaymentWithSubscriptionWithPlan[];
  pages: number;
}

const NewPaymentProfilePage = async () => {
  const user = await useCurrentUser();

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
        subscription: {
          include: {
            plan: {
              include: {
                subscriptions: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    },
    page: 0,
    take: 12,
  });

  const checkPayment = await checkMonthlySubscription({ userId: user?.id! });

  return (
    <div className="flex flex-col space-y-10 items-center overflow-hidden">
      <p className="text-3xl w-full border-b mt-10 pb-5 font-semibold">
        Configurações
      </p>

      <SettingsPanel
        checkPayment={checkPayment}
        payments={payments}
        user={user!}
      />
    </div>
  );
};

export default NewPaymentProfilePage;
