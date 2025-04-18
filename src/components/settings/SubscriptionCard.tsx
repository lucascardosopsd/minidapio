'use client';
import { formatPrice } from '@/tools/formatPrice';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import axios from 'axios';
import { toast } from 'sonner';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useState } from 'react';
import { revalidateRoute } from '@/actions/revalidateRoute';
import { deleteSubscription } from '@/actions/subscription/deleteSubscription';
import { PaymentWithSubscriptionWithPlan } from '@/types/subscription';

interface SubscriptionCardProps {
  isValidSubscription: boolean;
  lastPayment: PaymentWithSubscriptionWithPlan | null | undefined;
}

const SubscriptionCard = ({ lastPayment, isValidSubscription }: SubscriptionCardProps) => {
  const [canceling, setCanceling] = useState(false);

  const handleCancelSubscription = async () => {
    try {
      setCanceling(true);

      await axios.delete(`/api/stripe/subscription/${lastPayment?.Subscription.stripeId}`);

      await deleteSubscription({ id: lastPayment?.Subscription.Plan.id as string });

      toast.success('Assinatura cancelada');

      revalidateRoute({ fullPath: '/dashboard/config' });
    } catch (error) {
      toast.error('Erro ao cancelar assinatura. Contate o suporte.');
      throw new Error('Error when cancel subscription');
    } finally {
      setCanceling(false);
    }
  };

  return (
    <Card className="flex flex-1 flex-col gap-5">
      <CardHeader>
        <CardTitle>Contábil</CardTitle>
        <CardDescription>Informações referentes à sua assinatura</CardDescription>
      </CardHeader>

      <Separator />

      <p className="text-center text-2xl">Plano</p>

      <CardContent className="flex flex-1 flex-col justify-center">
        <Card className="flex flex-col gap-5 border-none">
          {isValidSubscription && (
            <CardHeader className="flex h-60 items-center justify-center rounded-lg bg-primary">
              <p className="text-2xl font-semibold">{lastPayment?.Subscription.Plan.title}</p>
              <p>
                {formatPrice(lastPayment?.Subscription.Plan.price as number, 'pt-BR', 'BRL')}
                /Mês
              </p>
            </CardHeader>
          )}

          {!isValidSubscription && (
            <CardHeader className="flex h-60 items-center justify-center">
              <p className="2xl">Nenhum</p>
              <Link href="/dashboard/plans">
                <Button size="lg" disabled={canceling}>
                  Escolher Plano
                </Button>
              </Link>
            </CardHeader>
          )}

          {isValidSubscription && (
            <Button variant="destructive" className="w-full" onClick={handleCancelSubscription}>
              Cancelar
            </Button>
          )}
        </Card>
      </CardContent>

      <CardFooter>
        <p className="text-center text-sm">
          O último pagamento efetuado continuará a ser valido mesmo diante do cancelamento do plano
          atual.
        </p>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionCard;
