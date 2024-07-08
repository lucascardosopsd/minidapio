"use client";
import Fence from "@/components/restaurant/Fence";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { copyToClipboard } from "@/tools/copyToClipboard";
import { PaymentResProps, PixCodeResProps } from "@/types/paymentProps";
import axios from "axios";
import { Copy } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  const [userOnPage, setUserOnPage] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentResProps | null>(null);
  const router = useRouter();

  useEffect(() => {
    var paymentInterval = setInterval(async () => {
      if (!userOnPage) {
        clearInterval(paymentInterval);

        return;
      }

      try {
        const { data: paymentData } = await axios.get<PaymentResProps>(
          `/api/asaas/payment/${params.id}`
        );

        setPaymentData(paymentData);

        if (paymentData.status == "PENDING") {
          const { data: codeData } = await axios.get<PixCodeResProps>(
            `/api/asaas/payment/${params.id}/pixQrCode`
          );

          setMethodCode(codeData.payload);

          setMethodImage(`data:image/png;base64,${codeData.encodedImage}`);
          return;
        }

        clearInterval(paymentInterval);

        router.push("/advertiser/dashboard");
      } catch (error) {
        console.log(error);
        toast.error("Algo deu errado.");
      } finally {
        setLoading(false);
      }
    }, 20000);
  }, [userOnPage]);

  useEffect(() => {
    document.addEventListener("visibilitychange", (event) => {
      if (document.visibilityState == "visible") {
        setUserOnPage(true);
      } else {
        setUserOnPage(false);
      }
    });
  }, []);

  return (
    <section className="flex flex-col items-center jusitfy-center gap-5">
      {loading ? (
        <ImSpinner2 className="animate-spin" size={32} />
      ) : (
        <>
          <Card className="max-w-[300px]">
            <CardHeader>
              <p className="text-center">
                Pagamento via{" "}
                <span className="font-semibold text-primary">PIX</span>
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
          <Fence>
            <p>Válido até</p>

            <p>{moment(paymentData?.dueDate).format("DD/MM/YYYY")}</p>
          </Fence>
        </>
      )}
    </section>
  );
};

export default Payment;
