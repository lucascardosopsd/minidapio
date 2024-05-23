"use client";
import { createAdvertiserAccount } from "@/actions/advertiser/createAccount";
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

interface AdvertiserProfileFormProps {
  defaultValues?: AdvertiserAccount;
  userId: string;
}

const AdvertiserProfileForm = ({
  defaultValues,
  userId,
}: AdvertiserProfileFormProps) => {
  const [loading, setLoading] = useState(false);

  const form = useAdvertiserProfileForm({
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          userId,
        }
      : {
          name: "",
          personType: "FISICA",
          cpfCnpj: "",
          phone: "",
          userId: userId,
        },
  });

  const handleSubmit = async (data: z.infer<typeof advertiserProfile>) => {
    setLoading(true);

    try {
      await createAdvertiserAccount({ data });

      toast.success("Salvo com sucesso");
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
