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
import { Subscription } from "@prisma/client";
import { PlanProps } from "@/types/plan";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { revalidateRoute } from "@/actions/revalidateRoute";
import { deleteSubscription } from "@/actions/subscription/deleteSubscription";

interface SubscriptionCardProps {
  currentPlan: PlanProps;
  currentSub: Subscription;
}

const SubscriptionCard = ({
  currentPlan,
  currentSub,
}: SubscriptionCardProps) => {
  const [canceling, setCanceling] = useState(false);

  const handleCancelSubscription = async () => {
    try {
      setCanceling(true);

      await axios.delete(`/api/asaas/subscription/${currentSub?.asaasId}`);

      await deleteSubscription({ id: currentSub.id });

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

      <CardContent>
        <Card className="flex flex-col gap-5">
          {currentSub?.status == "ACTIVE" && (
            <CardHeader className="flex items-center justify-center bg-primary rounded-lg h-60">
              <p className="text-2xl font-semibold">{currentPlan.title}</p>
              <p>{formatPrice(currentPlan.price, "pt-BR", "BRL")}/Mês</p>
            </CardHeader>
          )}

          {currentSub?.status !== "ACTIVE" && (
            <CardHeader className="flex items-center justify-center h-60">
              <p className="2xl">Nenhum</p>
              <Link href="/dashboard/plans">
                <Button size="lg" disabled={canceling}>
                  Escolher Plano
                </Button>
              </Link>
            </CardHeader>
          )}

          {currentSub?.status == "ACTIVE" && (
            <CardFooter className="flex items-center justify-centerp-0">
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleCancelSubscription}
              >
                Cancelar
              </Button>
            </CardFooter>
          )}
        </Card>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
