"use client";
import { useForm } from "react-hook-form";
import FieldBuilder from "../builders/FieldBuilder";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatternFormat } from "react-number-format";
import axios from "axios";
import { User } from "@prisma/client";
import { customerProfileValidator } from "@/validators/customerProfile";
import { SelectItem } from "../ui/select";
import SelectBuilder from "../builders/SelectBuilder";
import { CepPromiseReturnProps } from "@/types/cep";
import { toast } from "sonner";
import { createUpdateStripeCustomer } from "@/actions/paymentProfile/createUpdateStripeCustomer";
import { useState } from "react";
import { revalidateRoute } from "@/actions/revalidateRoute";

interface CheckoutProps {
  customerDefaultValues?: z.infer<typeof customerProfileValidator> | null;
  user: User;
}

const CheckoutProfile = ({ user, customerDefaultValues }: CheckoutProps) => {
  const [customerLoading, setCustomerLoading] = useState(false);

  const customerForm = useForm({
    defaultValues: customerDefaultValues || {
      name: "",
      email: "",
      cpfCnpj: "",
      postalCode: "",
      addressNumber: "",
      addressComplement: null,
      mobilePhone: "", //Só números ex: 1212343434,
      personType: "CPF",
      city: "",
      state: "",
      address: "",
    },
    resolver: zodResolver(customerProfileValidator),
  });

  const handleCreateUpdateCustomer = async (
    data: z.infer<typeof customerProfileValidator>
  ) => {
    setCustomerLoading(true);

    try {
      await createUpdateStripeCustomer({
        user,
        data: {
          name: data.name,
          cpfCnpj: data.cpfCnpj,
          email: data.email,
          mobilePhone: data.mobilePhone,
          address: data.address,
          addressNumber: data.addressNumber,
          postalCode: data.postalCode,
          addressComplement: null,
        },
      });

      toast.success("Conta de pagamento criada/atualizada");

      revalidateRoute({ fullPath: "/dashboard/restaurants" });
    } catch (error) {
      toast.error("Algo deu errado.");
    } finally {
      setCustomerLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-5 justify-center items-center ">
      <div className="flex flex-col">
        <p className="text-2xl text-center font-semibold text-primary">
          Formulário de assinatura
        </p>
        <p className="text-sm text-center">
          Preencha as informações para que possamos dar continuidade ao
          pagamento do seu plano
        </p>
      </div>

      {/* Customer Data */}
      <div className="flex flex-col gap-5 justify-center w-full tablet:max-w-[70svw]">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <p className="mb-4">Sobre você</p>
              <p className="text-sm">
                {user.customerId && "Verifique suas informações"}
              </p>
            </CardTitle>
            <Separator />
          </CardHeader>

          <CardContent>
            <Form {...customerForm}>
              <form
                className="flex flex-col gap-5 w-full"
                onSubmit={customerForm.handleSubmit(handleCreateUpdateCustomer)}
              >
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-center gap-5">
                    <FieldBuilder
                      control={customerForm.control}
                      fieldElement={
                        <Input maxLength={100} placeholder="Nome completo" />
                      }
                      name="name"
                      title="Nome"
                    />

                    <FieldBuilder
                      control={customerForm.control}
                      fieldElement={
                        <Input
                          maxLength={100}
                          type="email"
                          placeholder="exemplo@exemplo.com"
                        />
                      }
                      name="email"
                      title="E-mail"
                    />

                    <FormField
                      control={customerForm.control}
                      name="mobilePhone"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <PatternFormat
                              format="(##)#####-####"
                              placeholder="(00)00000-0000"
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
                  </div>

                  <div className="flex items-center gap-5">
                    <SelectBuilder
                      control={customerForm.control}
                      name="personType"
                      title="Documento"
                      selectItem={
                        <>
                          <SelectItem value="CPF">CPF</SelectItem>
                          <SelectItem value="CNPJ">CNPJ</SelectItem>
                        </>
                      }
                    />

                    <FormField
                      control={customerForm.control}
                      name="cpfCnpj"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Número</FormLabel>
                          <FormControl>
                            <PatternFormat
                              valueIsNumericString
                              format={
                                customerForm.watch("personType") == "CPF"
                                  ? "###.###.###-##"
                                  : "##.###.###/0001-##"
                              }
                              placeholder={
                                customerForm.watch("personType") == "CPF"
                                  ? "000.000.000-00"
                                  : "00.000.000/0001-00"
                              }
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
                  </div>
                  <div className="flex gap-5">
                    <FormField
                      control={customerForm.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Código Postal</FormLabel>
                          <FormControl>
                            <PatternFormat
                              format="#####-###"
                              placeholder="00000-000"
                              onValueChange={(values) => {
                                if (
                                  values.floatValue &&
                                  values.value.length == 8
                                ) {
                                  axios
                                    .get<CepPromiseReturnProps>(
                                      `/api/cep/${values.floatValue}`
                                    )
                                    .then(({ data }) => {
                                      customerForm.setValue(
                                        "state",
                                        data.state
                                      );
                                      customerForm.setValue(
                                        "address",
                                        data.street
                                      );
                                      customerForm.setValue("city", data.city);
                                    });
                                }

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

                    <FieldBuilder
                      control={customerForm.control}
                      fieldElement={<Input maxLength={100} placeholder="000" />}
                      name="addressNumber"
                      title="Número do local"
                    />
                  </div>

                  <div className="flex gap-5">
                    <div className="flex flex-col gap-2 items-center flex-[4]">
                      <p className="w-full">Rua</p>
                      <Input
                        maxLength={100}
                        value={customerForm.watch("address")}
                      />
                    </div>

                    <div className="flex flex-col gap-2 items-center flex-1">
                      <p className="w-full">Cidade</p>
                      <Input
                        maxLength={100}
                        value={customerForm.watch("city")}
                      />
                    </div>

                    <div className="flex flex-col gap-2 items-center flex-1">
                      <p className="w-full">Estado</p>
                      <Input
                        maxLength={100}
                        value={customerForm.watch("state")}
                      />
                    </div>
                  </div>
                </div>
                <Button type="submit" disabled={customerLoading}>
                  Salvar
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CheckoutProfile;
