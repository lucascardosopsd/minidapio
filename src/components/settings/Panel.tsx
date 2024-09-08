"use client";
import { CheckMonthlyPaymentReturnProps } from "@/actions/subscription/checkMonthlySubscription";
import SubscriptionCard from "./SubscriptionCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import ReusableDialog from "../misc/ReusableDialog";
import { Trash } from "lucide-react";
import PaymentsHistoryCard from "./PaymentsHistoryCard";
import UpdateProfileCard from "../restaurant/Profile";
import { User } from "@prisma/client";
import { PaymentWithSubscriptionWithPlan } from "@/types/subscription";
import { deleteUser } from "@/actions/user/deleteUser";
import { toast } from "sonner";
import { revalidateRoute } from "@/actions/revalidateRoute";
import { signOut } from "next-auth/react";

interface SettingsPanelProps {
  checkPayment: CheckMonthlyPaymentReturnProps;
  user: User;
  payments: PaymentWithSubscriptionWithPlan[];
}

const SettingsPanel = ({
  checkPayment,
  user,
  payments,
}: SettingsPanelProps) => {
  const handleDeleteAccount = async () => {
    try {
      signOut({ redirect: true, callbackUrl: "/" });

      await deleteUser({ id: user?.id! });

      revalidateRoute({ fullPath: "/" });
    } catch (error) {
      toast.error("Ocorreu um erro ao deletar a conta. Contate o suporte");
    }
  };

  return (
    <section className="flex flex-col tablet:flex-row min-h-screen gap-5 mx-auto">
      <div className="flex flex-col gap-5 flex-1">
        <SubscriptionCard
          isValidSubscription={
            (checkPayment?.remaining &&
              checkPayment?.remaining > 0 &&
              checkPayment.type == "paid") ||
            false
          }
          lastPayment={payments[0]}
        />

        <Card className="flex flex-col gap-5">
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
              onSubmit={handleDeleteAccount}
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-5 flex-[2]">
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
  );
};

export default SettingsPanel;
