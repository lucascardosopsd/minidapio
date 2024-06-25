"use client";
import FieldBuilder from "@/components/builders/FieldBuilder";
import SelectBuilder from "@/components/builders/SelectBuilder";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SelectItem } from "@/components/ui/select";
import { useAdvertiserProfileForm } from "@/hooks/useAdvertiserProfileForm";
import { advertiserProfile } from "@/validators/advertiserProfile";
import { AdvertiserAccount, User } from "@prisma/client";
import { useState } from "react";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";
import axios from "axios";
import { createAdvertiserAccount } from "@/actions/advertiser/createAccount";
import { updateAdvertiserAccount } from "@/actions/advertiser/updateAdvertiserAccount";
import { updateUser } from "@/actions/user/updateUser";
import { CustumerProps, CustumersArrayProps } from "@/types/asaas";
import { getAdvertiserAccount } from "@/actions/advertiser/getAdvertiserAccount";
import { redirect } from "next/navigation";

interface AdvertiserProfileFormProps {
  defaultValues?: AdvertiserAccount;
  user: User;
}

const AdvertiserProfileForm = ({
  defaultValues,
  user,
}: AdvertiserProfileFormProps) => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const form = useAdvertiserProfileForm({
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          userId: user.id,
        }
      : {
          name: "",
          personType: "FISICA",
          cpfCnpj: "",
          phone: "",
          userId: user.id,
          customerId: "",
          plan: "basic",
        },
  });

  const createUserAdvertiserAcccount = async ({
    advertiserData,
  }: {
    advertiserData: z.infer<typeof advertiserProfile>;
  }) => {
    try {
      const newAdAccount = await createAdvertiserAccount({
        data: advertiserData,
      });

      await updateUser({
        id: user.id,
        data: {
          advertiserAccountId: newAdAccount.id,
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado");
    } finally {
      revalidatePath && redirect(revalidatePath);
    }
  };

  const handleSubmit = async (data: z.infer<typeof advertiserProfile>) => {
    setLoading(true);

    try {
      const { data: getRes } = await axios.get<CustumersArrayProps>(
        "/api/asaas/customer"
      );

      const customers = getRes.data;

      let checkCostumer = null;

      if (customers) {
        checkCostumer = customers.find(
          (costumer) => costumer.email == user.email
        );
      }

      if (!checkCostumer) {
        const { data: newCustomer } = await axios.post("/api/asaas/customer", {
          name: data.name,
          cpfCnpj: data.cpfCnpj,
          mobilePhone: data.phone,
          email: user.email,
        });

        if (!newCustomer.customer.id) throw new Error("Custumer id not found");

        data.customerId = newCustomer.customer.id;

        const checkAccount = await getAdvertiserAccount({ userId: user.id });

        if (!checkAccount) {
          await createUserAdvertiserAcccount({
            advertiserData: data,
          });
        } else {
          await updateAdvertiserAccount({ userId: user.id, data: data });
        }
      } else {
        await axios.put<CustumerProps>(
          `/api/asaas/customer/${checkCostumer.id}`,
          {
            name: data.name,
            cpfCnpj: data.cpfCnpj,
            mobilePhone: data.phone,
            email: user.email,
          }
        );

        const checkAccount = await getAdvertiserAccount({ userId: user.id });

        if (!checkAccount) {
          await createUserAdvertiserAcccount({
            advertiserData: data,
          });
        } else {
          await updateAdvertiserAccount({ userId: user.id, data: data });
        }
      }

      toast.success("Salvo com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
      toast.error("Ocorreu um erro");
    } finally {
      revalidatePath && redirect(revalidatePath);
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full max-w-md space-y-5"
      >
        <FieldBuilder
          control={form.control}
          name="name"
          title="Nome"
          fieldElement={<Input />}
        />

        <SelectBuilder
          control={form.control}
          name="personType"
          title="Tipo do Documento"
          selectItem={
            <>
              <SelectItem value="FISICA">CPF</SelectItem>
              <SelectItem value="JURIDICA">CNPJ</SelectItem>
            </>
          }
        />

        <FieldBuilder
          control={form.control}
          name="cpfCnpj"
          title="CPF/CNPJ"
          fieldElement={
            <PatternFormat
              format={
                form.watch("personType") == "FISICA"
                  ? "###.###.###-##"
                  : "##.###.###/0001-##"
              }
              placeholder={
                form.watch("personType") == "FISICA"
                  ? "000.000.000-00"
                  : "00.000.000/0001-00"
              }
            />
          }
        />

        <FieldBuilder
          control={form.control}
          name="phone"
          title="Telefone Celular"
          fieldElement={<PatternFormat format="(##)#####-####" />}
        />

        <SelectBuilder
          control={form.control}
          name="plan"
          title="Plano"
          selectItem={
            <>
              <SelectItem value="basic">Básico (R$100,00)</SelectItem>
              <SelectItem value="pro">Profissional (R$150,00)</SelectItem>
              <SelectItem value="ultra">Ultra (R$200,00)</SelectItem>
            </>
          }
        />

        <input value={user.id} {...form.register("userId")} hidden />

        <Button type="submit" className="w-full" disabled={loading}>
          Salvar
        </Button>
      </form>
    </Form>
  );
};

export default AdvertiserProfileForm;
