"use client";
import { formatPrice } from "@/tools/formatPrice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { revalidateRoute } from "@/actions/revalidateRoute";
import { deleteSubscription } from "@/actions/subscription/deleteSubscription";
import { PaymentWithSubscriptionWithPlan } from "@/types/subscription";

interface SubscriptionCardProps {
  lastPayment: PaymentWithSubscriptionWithPlan;
  isValidSubscription: boolean;
}

const SubscriptionCard = ({
  lastPayment,
  isValidSubscription,
}: SubscriptionCardProps) => {
  const [canceling, setCanceling] = useState(false);

  const handleCancelSubscription = async () => {
    try {
      setCanceling(true);

      await axios.delete(
        `/api/asaas/subscription/${lastPayment.Subscription.asaasId}`
      );

      await deleteSubscription({ id: lastPayment.Subscription.Plan.id });

      toast.success("Assinatura cancelada");

      revalidateRoute({ fullPath: "/dashboard/config" });
    } catch (error) {
      toast.error("Erro ao cancelar assinatura. Contate o suporte.");
      throw new Error("Error when cancel subscription");
    } finally {
      setCanceling(false);
    }
  };

  return (
    <Card className="flex flex-col gap-5 flex-1">
      <CardHeader>
        <CardTitle>Contábil</CardTitle>
        <CardDescription>
          Informações referentes à sua assinatura
        </CardDescription>
      </CardHeader>

      <Separator />

      <p className="text-2xl text-center">Plano</p>

      <CardContent className="flex flex-col justify-center flex-1">
        <Card className="flex flex-col gap-5 border-none">
          {isValidSubscription && (
            <CardHeader className="flex items-center justify-center bg-primary rounded-lg h-60">
              <p className="text-2xl font-semibold">
                {lastPayment.Subscription.Plan.title}
              </p>
              <p>
                {formatPrice(
                  lastPayment.Subscription.Plan.price,
                  "pt-BR",
                  "BRL"
                )}
                /Mês
              </p>
            </CardHeader>
          )}

          {!isValidSubscription && (
            <CardHeader className="flex items-center justify-center h-60">
              <p className="2xl">Nenhum</p>
              <Link href="/dashboard/plans">
                <Button size="lg" disabled={canceling}>
                  Escolher Plano
                </Button>
              </Link>
            </CardHeader>
          )}

          {isValidSubscription && (
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleCancelSubscription}
            >
              Cancelar
            </Button>
          )}
        </Card>
      </CardContent>

      <CardFooter>
        <p className="text-sm text-center">
          O último pagamento efetuado continuará a ser valido mesmo diante do
          cancelamento do plano atual.
        </p>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionCard;
