import { fetchPaymentsByQuery } from "@/actions/payment/fetchPaymentsByQuery";
import { fetchPlansByQuery } from "@/actions/plan/fetchPlansByQuery";
import { fetchSubscriptionsByQuery } from "@/actions/subscription/fetchManySubscriptions";
import PaymentsHistoryCard from "@/components/config/PaymentsHistoryCard";
import SubscriptionCard from "@/components/config/SubscriptionCard";
import ReusableDialog from "@/components/misc/ReusableDialog";
import UpdateProfileCard from "@/components/restaurant/Profile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useUserSession } from "@/hooks/useUserSession";
import { PaymentWithSubscriptionProps } from "@/types/paymentProps";
import { Trash } from "lucide-react";

interface CustomPaymentsRes {
  payments: PaymentWithSubscriptionProps[];
  pages: number;
}

const NewPaymentProfilePage = async () => {
  const user = await useUserSession();

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
        Subscription: {
          include: {
            Plan: true,
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

  return (
    <div className="flex flex-col space-y-10 items-center overflow-hidden">
      <p className="text-3xl w-full border-b mt-10 pb-5 font-semibold">
        Configurações
      </p>

      <section className="flex min-h-screen gap-5">
        <div className="flex flex-col gap-5">
          <SubscriptionCard
            currentPlan={currentPlan}
            currentSub={subscriptions[0]}
          />

          <Card className="flex flex-col gap-5 flex-1">
            <CardHeader>
              <CardTitle>Encerrar</CardTitle>
              <CardDescription>
                Delete permanentemente sua conta da plataforma
              </CardDescription>
            </CardHeader>

            <Separator />

            <CardContent className="flex-row">
              <ReusableDialog
                trigger={
                  <div className="flex gap-2">
                    Deletar <Trash />
                  </div>
                }
                triggerClassName="w-full"
                triggerVariant="destructive"
                content={<></>}
                title="Deletar conta"
                description="Você está prestes a deletar sua conta, tem certeza que deseja continuar?"
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <PaymentsHistoryCard payments={payments} />

          <UpdateProfileCard
            data={{
              email: user?.email!,
              image: user?.image!,
              name: user?.name!,
            }}
            userId={user?.id!}
          />
        </div>
      </section>
    </div>
  );
};

export default NewPaymentProfilePage;
