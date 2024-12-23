import { fetchPaymentsByQuery } from "@/actions/payment/fetchPaymentsByQuery";
import { checkMonthlySubscription } from "@/actions/subscription/checkMonthlySubscription";
import { PaymentWithSubscriptionWithPlan } from "@/types/subscription";
import SettingsPanel from "@/components/settings/Panel";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface CustomPaymentsRes {
  payments: PaymentWithSubscriptionWithPlan[];
  pages: number;
}

const NewPaymentProfilePage = async () => {
  const user = await useCurrentUser();

  const { payments } = await fetchPaymentsByQuery<CustomPaymentsRes>({
    query: {
      where: { userId: user?.id },
      include: {
        Subscription: {
          include: {
            Plan: {
              include: {
                Subscription: true,
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
