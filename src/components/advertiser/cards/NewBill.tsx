"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaymentResProps } from "@/types/paymentProps";
import { useState } from "react";
import { toast } from "sonner";
import Moment from "moment";
import axios from "axios";
import { AdvertiserAccount } from "@prisma/client";
import { plans } from "@/constants/plans";
import { useRouter } from "next/navigation";

interface NewBillCardProps {
  advertiserAccount: AdvertiserAccount;
  title: string;
}

const NewBillCard = ({ title, advertiserAccount }: NewBillCardProps) => {
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState("pix");
  const router = useRouter();

  const moment = Moment();

  const handleCreatePayment = async () => {
    setLoading(true);

    try {
      const { data: newPayment } = await axios.post<PaymentResProps>(
        "/api/asaas/payment",
        {
          customer: advertiserAccount?.customerId!,
          billingType: option.toUpperCase(),
          value: 150,
          dueDate: moment.add(24, "hours"),
        }
      );

      router.push(`/advertiser/bills/pix/${newPayment.id}`);
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[calc(100svh-80px)] flex items-center justify-center flex-col gap-5">
      <div className="p-5 flex flex-col gap-5">
        <p>{title}</p>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <p>Método</p>
            <Select
              onValueChange={(value) => setOption(value)}
              defaultValue={option}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel></SelectLabel>
                  <SelectItem value="pix">PIX</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full"
            onClick={handleCreatePayment}
            disabled={loading}
          >
            Gerar
          </Button>
        </div>
        <p className="text-xs text-center">
          O pagamento no valor de <span className="font-bold">R$150,00</span>{" "}
          expira em 24 horas
        </p>
      </div>
    </div>
  );
};

export default NewBillCard;
