"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutValidator } from "@/validators/checkout";
import FieldBuilder from "../builders/FieldBuilder";
import { Input } from "../ui/input";
import { PatternFormat } from "react-number-format";
import { Button } from "../ui/button";
import { z } from "zod";
import { AsaasCustomerObj } from "@/types/asaasCustomer";
import axios from "axios";
import { toast } from "sonner";
import validator from "card-validator";
import { useRouter } from "next/navigation";
import { Plan, User } from "@prisma/client";
import { useState } from "react";
import moment from "moment";
import createSubscription from "@/actions/subscription/createSubscription";
import { AsaasSubscriptionResObj } from "@/types/asaasSubscriptions";
import { revalidateRoute } from "@/actions/revalidateRoute";

interface CheckoutCreditCardProps {
  plan: Plan;
  customer: AsaasCustomerObj | null;
  user: User;
}

const CheckoutCreditCard = ({
  plan,
  customer,
  user,
}: CheckoutCreditCardProps) => {
  const [loading, setLoading] = useState(false);
  const planDescription = { __html: plan.description };

  const cardForm = useForm({
    defaultValues: {
      holderName: "",
      number: "",
      month: "",
      year: "",
      expiry: "",
      expiryMonth: "",
      expiryYear: "",
      ccv: "",
    },
    resolver: zodResolver(checkoutValidator),
  });

  const router = useRouter();

  const handleSubscription = async (
    data: z.infer<typeof checkoutValidator>
  ) => {
    setLoading(true);

    const { isValid } = validator.number(data.number);

    if (!isValid) {
      toast.error("Cartão inválido!");
      setLoading(false);
      return;
    }

    const { expiry, ...rest } = data;

    const fullData = {
      customer: customer?.id,
      billingType: "CREDIT_CARD",
      nextDueDate: moment().format("YYYY-MM-DD"),
      value: plan.price,
      cycle: "MONTHLY",
      description: "Assinatura Plano Mensal Minidapio",
      creditCard: rest,
      creditCardHolderInfo: {
        name: customer?.name,
        email: customer?.email,
        cpfCnpj: customer?.cpfCnpj,
        postalCode: customer?.postalCode,
        addressNumber: customer?.addressNumber,
        addressComplement: null,
        phone: customer?.mobilePhone,
        mobilePhone: customer?.mobilePhone,
      },
    };

    try {
      const { data: asaasRes } = await axios.post<AsaasSubscriptionResObj>(
        `${process.env.NEXT_PUBLIC_HOST}/api/asaas/subscription`,
        fullData
      );

      await createSubscription({
        subscription: {
          asaasId: asaasRes.id,
          billingType: asaasRes.billingType,
          customerId: asaasRes.customer,
          cycle: asaasRes.cycle,
          dateCreated: asaasRes.dateCreated,
          deleted: asaasRes.deleted,
          description: asaasRes.description,
          nextDueDate: asaasRes.nextDueDate,
          object: asaasRes.object,
          status: asaasRes.status,
          value: asaasRes.value,
          userId: user.id,
          planId: plan.id,
        },
      });

      toast.success("Inscrição realizada!");

      revalidateRoute({ fullPath: "/" });

      router.push("/dashboard/restaurants");
    } catch (error) {
      console.log(error);
      toast.error(
        "Ocorreu um erro ao tentar criar a assinatura, verifique as informações preenchidas."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-5 justify-center items-center ">
      <div className="flex flex-col gap-5 justify-center w-full tablet:max-w-[70svw]">
        <Card>
          <CardHeader>
            <CardTitle>
              <p className="mb-4">Sobre o pagamento</p>
            </CardTitle>
            <Separator />
          </CardHeader>

          <CardContent>
            <Form {...cardForm}>
              <form
                className="flex flex-col tablet:flex-row gap-5"
                onSubmit={cardForm.handleSubmit(handleSubscription)}
              >
                <div className="flex flex-col gap-2 flex-1">
                  <FieldBuilder
                    control={cardForm.control}
                    fieldElement={<Input maxLength={100} />}
                    name="holderName"
                    title="Nome no cartão"
                  />

                  <div className="grid grid-cols-3 gap-5">
                    <FormField
                      control={cardForm.control}
                      name="number"
                      render={({ field }) => (
                        <FormItem className="w-full col-span-3">
                          <FormLabel>Número</FormLabel>
                          <FormControl>
                            <PatternFormat
                              format="#### #### #### ####"
                              placeholder="0000 0000 0000 0000"
                              onValueChange={(values) => {
                                field.onChange(values.value);
                              }}
                              value={field.value}
                              onBlur={field.onBlur}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={cardForm.control}
                      name="expiry"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Vencimento</FormLabel>
                          <FormControl>
                            <PatternFormat
                              format="##/##"
                              placeholder="00/00"
                              onValueChange={(values) => {
                                const month =
                                  values.formattedValue.split("/")[0];
                                const year =
                                  values.formattedValue.split("/")[1];

                                cardForm.setValue("expiryMonth", month);
                                cardForm.setValue("expiryYear", year);

                                field.onChange(values.formattedValue);
                              }}
                              value={field.value}
                              onBlur={field.onBlur}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FieldBuilder
                      control={cardForm.control}
                      fieldElement={<Input maxLength={4} placeholder="0000" />}
                      name="ccv"
                      title="CCV"
                    />
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

                  <Button type="submit" disabled={loading || !customer}>
                    {customer
                      ? "Finalizar"
                      : "Salve as informações do primeiro bloco"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}

      <div className="flex items-center gap-5 border-t w-full py-5 justify-center">
        <p className="max-w-96 text-center">
          Esta compra é intermediada e assegurada pelo gateway de pagamentos
          ASAAS
        </p>

        <Image
          alt="logo asaas"
          src="/logo-asaas.png"
          sizes="1000px"
          height={0}
          width={0}
          className="h-20 w-20 rounded-lg"
        />
      </div>
    </section>
  );
};

export default CheckoutCreditCard;
