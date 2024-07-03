"use client";
import FieldBuilder from "@/components/builders/FieldBuilder";
import SelectBuilder from "@/components/builders/SelectBuilder";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SelectItem } from "@/components/ui/select";
import { AdvertiserAccount, Afiliate, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";
import { z } from "zod";
import UserCard from "../cards/User";
import { useAdminAdvertiserProfileForm } from "@/hooks/useAdminAdvertiserProfileForm";
import { adminAdvertiserProfile } from "@/validators/adminAdvertiserProfile";
import Fence from "@/components/restaurant/Fence";
import { fetchAfiliatesByQuery } from "@/actions/afiliate/fetchAfiliatesByQuery";
import { X } from "lucide-react";

interface AdminAdvertiserProfileFormProps {
  defaultValues?: AdvertiserAccount;
  userData: User;
  loading: boolean;
  onSubmit: (
    data: z.infer<typeof adminAdvertiserProfile>,
    userData: User
  ) => Promise<void>;
}

const AdminAdvertiserProfileForm = ({
  defaultValues,
  userData,
  onSubmit,
  loading,
}: AdminAdvertiserProfileFormProps) => {
  const [afiliate, setAfiliate] = useState<Afiliate | null>({} as Afiliate);

  const form = useAdminAdvertiserProfileForm({
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          userId: userData.id,
        }
      : {
          name: "",
          personType: "FISICA",
          cpfCnpj: "",
          phone: "",
          userId: userData.id,
          customerId: "",
          afiliateCode: 0,
        },
  });

  const handleFetchAfiliate = async (code: number) => {
    if (code) {
      try {
        const afiliate = await fetchAfiliatesByQuery({
          query: {
            where: { code },
          },
        });

        if (afiliate[0]) {
          setAfiliate(afiliate[0]);

          return true;
        }

        form.setValue("afiliateCode", 0);
        form.setError("afiliateCode", {
          message: "Digite um afiliado válido!",
        });
      } catch (error) {
        console.log(error);
      }
      return false;
    }
  };

  useEffect(() => {
    if (defaultValues?.afiliateCode) {
      handleFetchAfiliate(defaultValues.afiliateCode);
    }
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => onSubmit(data, userData))}
        className="w-full max-w-md space-y-5"
      >
        <div className="flex flex-col gap-2 justify-center">
          <p>Usuário</p>
          <UserCard user={userData} preview />
        </div>

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

        <div className="space-y-2 flex-1">
          <FormField
            control={form.control}
            name="afiliateCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Afiliado</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Cole código"
                    className="w-full rounded-r-none"
                    onChange={async (e) => {
                      field.onChange(Number(e.target.value));

                      await handleFetchAfiliate(
                        form.watch("afiliateCode", 0) || 0
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {afiliate?.id && (
            <Fence>
              <p className="flex-1 text-center">{afiliate.name}</p>
              <span
                onClick={() => {
                  form.setValue("afiliateCode", null);
                  setAfiliate(null);
                }}
              >
                <X className="hover:scale-125 transition text-muted hover:text-destructive cursor-pointer" />
              </span>
            </Fence>
          )}
        </div>

        <input value={userData.id} {...form.register("userId")} hidden />

        <Button type="submit" className="w-full" disabled={loading}>
          Salvar
        </Button>
      </form>
    </Form>
  );
};

export default AdminAdvertiserProfileForm;
