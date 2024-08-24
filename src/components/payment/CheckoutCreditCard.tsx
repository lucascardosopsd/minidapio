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
import { plans } from "@/constants/plans";
import { Input } from "../ui/input";
import { PatternFormat } from "react-number-format";
import { Button } from "../ui/button";
import { z } from "zod";
import { AsaasCustomerObj } from "@/types/asaasCustomer";
import axios from "axios";
import { toast } from "sonner";
import validator from "card-validator";
import { useRouter } from "next/navigation";
import { updateUser } from "@/actions/user/updateUser";
import { User } from "@prisma/client";
import { useState } from "react";

interface CheckoutCreditCardProps {
  plan: string;
  customer: AsaasCustomerObj;
  user: User;
}

const CheckoutCreditCard = ({
  plan: paramPlan,
  customer,
  user,
}: CheckoutCreditCardProps) => {
  const [loading, setLoading] = useState(false);

  const cardForm = useForm({
    defaultValues: {
      name: "",
      number: "",
      expiry: "",
      cvv: "",
    },
    resolver: zodResolver(checkoutValidator),
  });

  const currentPlan = plans.filter((plan) => plan.alias == paramPlan)[0];
  const router = useRouter();

  const handleSubscription = async (
    data: z.infer<typeof checkoutValidator>
  ) => {
    setLoading(true);

    const card = {
      ...data,
      expiryMonth: data.expiry.split("/")[0],
      expiryYear: data.expiry.split("/")[1],
    };

    const { isValid } = validator.number(card.number);

    if (!isValid) {
      toast.error("Cartão inválido!");
      return;
    }

    const fullData = {
      customer: customer.id,
      billingType: "CREDIT_CARD",
      nextDueDate: new Date().toLocaleDateString().replaceAll("/", "-"), //to pay now
      value: currentPlan.price,
      cycle: "MONTHLY",
      description: "Assinatura Plano Mensal Minidapio",
      creditCard: card,
      creditCardHolderInfo: {
        name: customer.name,
        email: customer.email,
        cpfCnpj: customer.cpfCnpj,
        postalCode: customer.postalCode,
        addressNumber: customer.addressNumber,
        addressComplement: null,
        phone: customer.mobilePhone,
        mobilePhone: customer.mobilePhone,
      },
    };

    await updateUser({
      id: user.id,
      data: {
        plan: currentPlan.alias,
      },
    });

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/asaas/payment/subscrible`,
        fullData
      );

      if (res.status == 400) {
        throw new Error("Error when subscrible");
      }

      toast.success("Inscrição realizada!");

      router.push("/dashboard/restaurants");
    } catch (error) {
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
                className="flex flex-col tablet:flex-row gap-5 "
                onSubmit={cardForm.handleSubmit(handleSubscription)}
              >
                <div className="flex flex-col gap-2 flex-1">
                  <FieldBuilder
                    control={cardForm.control}
                    fieldElement={<Input maxLength={100} />}
                    name="name"
                    title="Nome no cartão"
                  />

                  <FormField
                    control={cardForm.control}
                    name="number"
                    render={({ field }) => (
                      <FormItem className="w-full">
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

                  <div className="flex gap-5 items-center">
                    <FormField
                      control={cardForm.control}
                      name="expiry"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Expiração</FormLabel>
                          <FormControl>
                            <PatternFormat
                              format="##/##"
                              placeholder="00/00"
                              onValueChange={(values) => {
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
                      name="cvv"
                      title="CVV"
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-5">
                  <p className="text-2xl text-primary">Resumo da compra</p>

                  <div className="flex flex-col">
                    <div className="flex justify-between items-center w-full">
                      <p>Plano</p>
                      <p>{currentPlan.title}</p>
                    </div>
                    <p className="text-xs">
                      {currentPlan.features.map(
                        (feature, index) =>
                          `${feature}${
                            currentPlan.features.length - 2 > index ? ", " : ""
                          } ${
                            currentPlan.features.length - 2 == index ? "e " : ""
                          }`
                      )}
                    </p>
                  </div>

                  <div className="flex justify-between items-center w-full">
                    <p>Tipo</p>
                    <p>Recorrente</p>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center w-full  text-xl text-primary">
                    <p>Total</p>
                    <p>
                      {currentPlan.price.toLocaleString("pt-BR", {
                        currency: "BRL",
                        style: "currency",
                      })}
                    </p>
                  </div>

                  <Button type="submit" disabled={loading}>
                    Finalizar
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
