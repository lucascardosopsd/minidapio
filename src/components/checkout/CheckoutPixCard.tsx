"use client";
import { PaymentResProps, PixCodeResProps } from "@/types/paymentProps";
import { Plan, User } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { copyToClipboard } from "@/tools/copyToClipboard";
import { Copy } from "lucide-react";
import moment from "moment";
import { Separator } from "../ui/separator";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import createSubscription from "@/actions/subscription/createSubscription";
import createPayment from "@/actions/payment/createPayment";

interface CheckoutPixCard {
  plan: Plan;
  user: User;
}

const CheckoutPixCard = ({ plan, user }: CheckoutPixCard) => {
  const [payment, setPayment] = useState<PaymentResProps>();
  const [qrCode, setQrCode] = useState({
    encodedImage: "",
    payload: "",
    expirationDate: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();

  const handleCreatePayment = async () => {
    if (params.get("paymentId")) {
      return;
    }

    try {
      const { data } = await axios.post<PaymentResProps>("/api/asaas/payment", {
        billingType: "PIX",
        customer: user.customerId,
        value: plan.price,
      });

      params.set("paymentId", data.id);
      replace(`${pathname}?${params.toString()}`);

      setPayment(data);
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao criar o pagamento via PIX. Contate o suporte."
      );
    }
  };

  const handleCreateQrCode = async () => {
    try {
      const { data } = await axios.get<PixCodeResProps>(
        `/api/asaas/payment/pixQrCode/${params.get("paymentId")}`
      );

      data && setQrCode(data);
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao criar o pagamento via PIX. Contate o suporte."
      );
    }
  };

  const handleCheckSub = async () => {
    try {
      const { data } = await axios.get<PaymentResProps>(
        `/api/asaas/payment/${params.get("paymentId")}`
      );

      if (data.status == "RECEIVED") {
        const subscription = await createSubscription({
          subscription: {
            billingType: data.billingType,
            customerId: data.customer,
            dateCreated: moment().format(),
            deleted: data.deleted,
            description: data.description,
            value: data.value,
            userId: user.id,
            planId: plan.id,
          },
        });

        await createPayment({
          userId: user.id,
          payment: {
            asaasId: data.id,
            billingType: data.billingType,
            customer: data.customer,
            dateCreated: data.dateCreated,
            deleted: data.deleted,
            paymentDate: data.paymentDate,
            planId: plan.id,
            value: data.value,
            status: data.status,
            userId: user.id,
            subscriptionId: subscription.id,
          },
        });

        toast.success("Pagamento identificado. Redirecionando.");

        router.push("/dashboard/restaurants");

        return;
      }

      if (data.status == "PENDING") {
        toast.info("Pagamento ainda não identificado.");

        return;
      }

      router.push("/dashboard/plans");
    } catch (error) {
      toast.error(
        "Estamos enfrentando problemas com a verificação do pagamento."
      );
    }
  };

  useEffect(() => {
    !payment && handleCreatePayment().then(() => handleCreateQrCode());
  }, [user]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="p-5">
        <CardTitle>
          <p className="mb-4">
            Pagamento via{" "}
            <span className="font-semibold text-primary">PIX</span>
          </p>
        </CardTitle>
        <Separator />
      </CardHeader>

      {qrCode.encodedImage && (
        <CardContent className="p-5">
          <Image
            src={`data:image/png;base64,${qrCode.encodedImage}`}
            height={500}
            width={500}
            alt="qrcode"
            className="h-36 w-36 rounded mx-auto"
          />
        </CardContent>
      )}

      <CardFooter className="flex-col gap-2 justify-center items-center h-full">
        <div className="flex flex-col gap-5 items-center justify-center break-all">
          <Button
            className="w-full gap-2"
            variant="outline"
            onClick={() =>
              copyToClipboard(qrCode.payload, "", "Código Copiado")
            }
          >
            Copiar código
            <Copy />
          </Button>

          <Button onClick={handleCheckSub}>Realizei o pagamento</Button>
        </div>

        <div className="flex flex-col p-5">
          <p className="text-center text-xs">Válido até</p>

          <p className="text-center text-xs">
            {moment(payment?.dueDate).format("DD/MM/YYYY")}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CheckoutPixCard;
