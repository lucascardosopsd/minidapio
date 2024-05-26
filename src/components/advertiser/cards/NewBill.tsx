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
import { useState } from "react";
import { toast } from "sonner";
import Moment from "moment";
import axios from "axios";
import { AdvertiserAccount, User } from "@prisma/client";
import { copyToClipboard } from "@/tools/copyToClipboard";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
          value: 5,
          dueDate: moment.add(24, "hours"),
        }
      );

      if (option == "pix") {
        const { data: codeData } = await axios.get<PixCodeResProps>(
          `/api/asaas/payment/${newPayment.id}/pixQrCode`
        );

        setMethodCode(codeData.payload);
        setMethodImage(`data:image/png;base64,${codeData.encodedImage}`);
      }

      if (option == "boleto") {
        const { data: codeData } = await axios.get<BarCodeCodeResProps>(
          `/api/asaas/payment/${newPayment.id}/barCode`
        );

        setMethodCode(codeData.barCode);
        setMethodImage("");
      }
    } catch (error) {
      toast.error("Algo deu errado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[calc(100svh-80px)] flex items-center justify-center flex-col gap-5">
      <div className="p-5 flex flex-col gap-5">
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

        <div
          className={cn(
            "flex flex-col items-center gap-5 border rounded p-5 w-full max-w-[500px]",
            !methodImage && "hidden"
          )}
        >
          {methodImage && (
            <Image
              src={methodImage}
              alt="Imagem do pagamento"
              className="w-32 h-32 overflow-hidden rounded"
              height={1000}
              width={1000}
            />
          )}

          {methodCode && (
            <>
              {methodCode && (
                <div className="p-2 flex items-center justify-center gap-5 w-full">
                  <p>{methodCode.slice(0, 20)}...</p>
                  <Button
                    onClick={() =>
                      copyToClipboard(methodCode, "", "Código copiado!")
                    }
                  >
                    <Copy />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewBillCard;
