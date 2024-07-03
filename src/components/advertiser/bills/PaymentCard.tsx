"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { copyToClipboard } from "@/tools/copyToClipboard";
import { Copy } from "lucide-react";
import Image from "next/image";

interface PaymentCardProps {
  encodedImage: string;
  payload: string;
}

const PaymentCard = ({ encodedImage, payload }: PaymentCardProps) => {
  return (
    <Card className="max-w-[300px]">
      <CardHeader>
        <p className="text-center">
          Pagamento via <span className="font-semibold text-primary">PIX</span>
        </p>
      </CardHeader>

      <CardContent className="space-y-5">
        {encodedImage && (
          <Image
            src={encodedImage}
            height={500}
            width={500}
            alt="qrcode"
            className="h-40 w-40 rounded mx-auto"
          />
        )}

        <div className="flex flex-col gap-5 items-center justify-center break-all">
          <p className="text xs">{payload}</p>
          <Button
            onClick={() => copyToClipboard(payload, "", "Código Copiado")}
          >
            Copiar código
            <Copy />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentCard;
