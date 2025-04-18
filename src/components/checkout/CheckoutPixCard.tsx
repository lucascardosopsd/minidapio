"use client";
import { Plan, User } from "@prisma/client";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import {
    Card,
    CardContent, CardHeader,
    CardTitle
} from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";

interface CheckoutPixCardProps {
  plan: Plan;
  user: User;
}

const CheckoutPixCard = ({ plan, user }: CheckoutPixCardProps) => {
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const router = useRouter();

  const handlePixPayment = async () => {
    try {
      setLoading(true);

      const { data: paymentIntent } = await axios.post('/api/stripe/payment-intent', {
        amount: plan.price * 100, // Stripe expects amounts in cents
        currency: 'brl',
        paymentMethod: 'pix',
        planId: plan.id,
        userId: user.id,
      });

      setQrCode(paymentIntent.qrCode);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao gerar o QR Code do PIX');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>PIX</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          {qrCode ? (
            <>
              <Image
                src={`data:image/png;base64,${qrCode}`}
                alt="QR Code PIX"
                width={200}
                height={200}
              />
              <p className="text-sm text-center">
                Escaneie o QR Code acima com o aplicativo do seu banco para realizar o pagamento
              </p>
            </>
          ) : (
            <Button onClick={handlePixPayment} disabled={loading}>
              {loading ? 'Gerando QR Code...' : 'Pagar com PIX'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckoutPixCard;
