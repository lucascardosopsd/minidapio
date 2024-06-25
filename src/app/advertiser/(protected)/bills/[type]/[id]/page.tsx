"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { copyToClipboard } from "@/tools/copyToClipboard";
import { BarCodeCodeResProps, PixCodeResProps } from "@/types/paymentProps";
import axios from "axios";
import { Copy } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";

interface PaymentPageProps {
  params: {
    type: string;
    id: string;
  };
}

const Payment = ({ params }: PaymentPageProps) => {
  if (!params.type || !params.type) {
    throw new Error("Missing params");
  }

  const [methodCode, setMethodCode] = useState("");
  const [methodImage, setMethodImage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPaymentData = async () => {
    try {
      if (params.type == "pix") {
        const { data: codeData } = await axios.get<PixCodeResProps>(
          `/api/asaas/payment/${params.id}/pixQrCode`
        );
        setMethodCode(codeData.payload);

        setMethodImage(`data:image/png;base64,${codeData.encodedImage}`);
      }

      if (params.type == "boleto") {
        const { data: codeData } = await axios.get<BarCodeCodeResProps>(
          `/api/asaas/payment/${params.id}/barCode`
        );

        setMethodCode(codeData.barCode);
      }
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentData();
  }, []);

  return (
    <section className="flex items-center jusitfy-center">
      {loading ? (
        <ImSpinner2 className="animate-spin" size={32} />
      ) : (
        <Card className="max-w-[300px]">
          <CardHeader>
            <p className="text-center">
              Pagamento via{" "}
              <span className="font-semibold text-primary">
                {params.type == "boleto" ? "Boleto" : "PIX"}
              </span>
            </p>
          </CardHeader>

          <CardContent className="space-y-5">
            {methodImage && (
              <Image
                src={methodImage}
                height={500}
                width={500}
                alt="qrcode"
                className="h-40 w-40 rounded mx-auto"
              />
            )}

            <div className="flex flex-col gap-5 items-center justify-center break-all">
              <p className="text xs">{methodCode}</p>
              <Button
                className="w-full gap-2"
                onClick={() =>
                  copyToClipboard(methodCode, "", "Código Copiado")
                }
              >
                Copiar código
                <Copy />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default Payment;
