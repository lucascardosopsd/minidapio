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
import {
  BarCodeCodeResProps,
  PaymentResProps,
  PixCodeResProps,
} from "@/types/paymentProps";
import { Copy } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import Moment from "moment";
import axios from "axios";
import { AdvertiserAccount, User } from "@prisma/client";

interface NewBillCardProps {
  user: User;
  advertiserAccount: AdvertiserAccount | null;
  title: string;
}

const NewBillCard = ({ user, title, advertiserAccount }: NewBillCardProps) => {
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState("pix");
  const [methodCode, setMethodCode] = useState("");
  const [methodImage, setMethodImage] = useState("");

  const moment = Moment();

  const handleCreatePayment = async () => {
    setLoading(true);

    try {
      const { data: newPayment } = await axios.post<PaymentResProps>(
        "/api/asaas/payment",
        {
          customer: advertiserAccount?.customerId || "",
          billingType: option.toUpperCase(),
          value: 100,
          dueDate: moment.add(24, "hours"),
        }
      );

      if (option == "pix") {
        const { data: codeData } = await axios.get<PixCodeResProps>(
          `/api/asaas/payment/${newPayment.id}/pixQrCode`
        );

        setMethodCode(codeData.payload);
        setMethodImage(codeData.encodedImage);
      }

      if (option == "boleto") {
        const { data: codeData } = await axios.get<BarCodeCodeResProps>(
          `/api/asaas/payment/${newPayment.id}/barCode`
        );

        setMethodCode(codeData.barCode);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Algo deu errado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[calc(100svh-80px)] flex items-center justify-center flex-col gap-5">
      <div className="border rounded p-5 flex flex-col gap-5">
        <p>{title}</p>

        <div className="flex gap-5">
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
                <SelectItem value="boleto">Boleto</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            className="w-full"
            onClick={handleCreatePayment}
            disabled={loading}
          >
            Gerar
          </Button>
        </div>
        <p className="text-xs">
          O pagamento no valor de R$100,00 expira em 24 horas
        </p>
      </div>
      {methodImage ||
        (methodCode && (
          <div className="flex flex-col gap-5 border p-5">
            {methodImage && (
              <Image
                src={methodImage}
                alt="Imagem do pagamento"
                height={1000}
                width={1000}
                className="w-32 h-32 overflow-hidden rounded"
              />
            )}
            {methodCode && (
              <div className="border p-5 flex gap-5 max-w-[400px] w-full">
                <p>{methodCode}asasasasasasasasasas</p>
                <Button>
                  <Copy />
                </Button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default NewBillCard;
