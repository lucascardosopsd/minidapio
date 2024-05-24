"use client";
import FieldBuilder from "@/components/builders/FieldBuilder";
import SelectBuilder from "@/components/builders/SelectBuilder";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SelectItem } from "@/components/ui/select";
import { useAdvertiserProfileForm } from "@/hooks/useAdvertiserProfileForm";
import { advertiserProfile } from "@/validators/advertiserProfile";
import { AdvertiserAccount } from "@prisma/client";
import { useState } from "react";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";
import { UserProps } from "@/types/user";
import axios from "axios";
import { getCostumerProps } from "@/types/asaas";
import { createAdvertiserAccount } from "@/actions/advertiser/createAccount";
import { getAdvertiserAccount } from "@/actions/advertiser/getAdvertiserAccount";
import { updateAdvertiserAccount } from "@/actions/advertiser/updateAdvertiserAccount";

interface AdvertiserProfileFormProps {
  defaultValues?: AdvertiserAccount;
  user: UserProps;
}

const AdvertiserProfileForm = ({
  defaultValues,
  user,
}: AdvertiserProfileFormProps) => {
  const [loading, setLoading] = useState(false);

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
        },
  });

  const handleSubmit = async (data: z.infer<typeof advertiserProfile>) => {
    setLoading(true);

    try {
      const { data: getRes } = await axios.get<getCostumerProps>(
        "/api/asaas/costumer"
      );

      const costumers = getRes.data;

      if (costumers) {
        const checkCostumer = costumers.find(
          (costumer) => costumer.email == user.email
        );

        if (!checkCostumer) {
          await axios.post("/api/asaas/costumer", {
            name: data.name,
            cpfCnpj: data.cpfCnpj,
            mobilePhone: data.phone,
            email: user.email,
          });
        } else {
          await axios.put(`/api/asaas/costumer/${checkCostumer.id}`, {
            name: data.name,
            cpfCnpj: data.cpfCnpj,
            mobilePhone: data.phone,
            email: user.email,
          });
        }
      }

      const checkAccount = await getAdvertiserAccount({ userId: user.id });

      if (!checkAccount) {
        await createAdvertiserAccount({ data });
      } else {
        await updateAdvertiserAccount({ userId: user.id, data });
      }

      toast.success("Salvo com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro");
    } finally {
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
          fieldElement={<PatternFormat format="+55(##)#####-####" />}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          Salvar
        </Button>
      </form>
    </Form>
  );
};

export default AdvertiserProfileForm;
