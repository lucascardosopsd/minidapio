"use client";;
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Form, FormControl, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutValidator } from "@/validators/checkout";
import FieldBuilder from "../builders/FieldBuilder";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { StripeCustomer } from "@/types/stripe";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Plan, User } from "@prisma/client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutCreditCardProps {
  plan: Plan;
  customer: StripeCustomer | null;
  user: User;
}

const CheckoutCreditCard = ({
  plan,
  customer,
  user,
}: CheckoutCreditCardProps) => {
  const [loading, setLoading] = useState(false);
  const planDescription = { __html: plan.description };
  const stripe = useStripe();
  const elements = useElements();

  const form = useForm<z.infer<typeof checkoutValidator>>({
    resolver: zodResolver(checkoutValidator),
  });

  const router = useRouter();

  const handleSubscription = async (values: z.infer<typeof checkoutValidator>) => {
    try {
      if (!stripe || !elements) {
        throw new Error("Stripe has not loaded");
      }
      
      setLoading(true);

      const { data: subscription } = await axios.post('/api/stripe/subscription', {
        customerId: customer?.id,
        priceId: plan.stripePriceId,
        planId: plan.id,
        userId: user.id,
      });

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card element not found");
      }

      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (paymentMethodError) {
        throw new Error(paymentMethodError.message);
      }

      const { error } = await stripe.confirmCardPayment(subscription.clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success('Inscrição realizada!');
      router.push('/dashboard/restaurants');
    } catch (error) {
      console.error(error);
      toast.error(
        'Ocorreu um erro ao tentar criar a assinatura, verifique as informações preenchidas.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <section className="flex flex-col gap-5 justify-center items-center ">
        <div className="flex flex-col gap-5 justify-center w-full tablet:max-w-[70svw]">
          <Card>
            <CardHeader>
              <CardTitle>
                <p className="mb-4">
                  Pagamento via{" "}
                  <span className="font-semibold text-primary">Cartão</span>
                </p>
              </CardTitle>
              <Separator />
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form
                  className="flex flex-col tablet:flex-row gap-5"
                  onSubmit={form.handleSubmit(handleSubscription)}
                >
                  <div className="flex flex-col gap-2 flex-1">
                    <FieldBuilder
                      control={form.control}
                      fieldElement={<Input maxLength={100} />}
                      name="holderName"
                      title="Nome no cartão"
                    />

                    <div className="grid grid-cols-3 gap-5">
                      <FormItem className="w-full col-span-3">
                        <FormLabel>Dados do cartão</FormLabel>
                        <FormControl>
                          <div className="p-3 border rounded-md">
                            <CardElement options={{
                              style: {
                                base: {
                                  fontSize: '16px',
                                  color: '#424770',
                                  '::placeholder': {
                                    color: '#aab7c4',
                                  },
                                },
                                invalid: {
                                  color: '#9e2146',
                                },
                              },
                            }} />
                          </div>
                        </FormControl>
                      </FormItem>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-5">
                    <p className="text-2xl text-primary">Resumo da compra</p>

                    <div className="flex flex-col">
                      <div className="flex justify-between items-center w-full">
                        <p>Plano</p>
                        <p>{plan.title}</p>
                      </div>
                      <p
                        className="text-xs"
                        dangerouslySetInnerHTML={planDescription}
                      ></p>
                    </div>

                    <div className="flex justify-between items-center w-full">
                      <p>Tipo</p>
                      <p>Recorrente</p>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center w-full  text-xl text-primary">
                      <p>Total</p>
                      <p>
                        {plan.price.toLocaleString("pt-BR", {
                          currency: "BRL",
                          style: "currency",
                        })}
                      </p>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Processando...' : 'Finalizar'}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </Elements>
  );
};

export default CheckoutCreditCard;
