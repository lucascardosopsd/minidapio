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
import { AdvertiserAccount, User } from "@prisma/client";
import { useState } from "react";
import { PatternFormat } from "react-number-format";
import { z } from "zod";
import UserCard from "../cards/User";
import { useAdminAdvertiserProfileForm } from "@/hooks/useAdminAdvertiserProfileForm";
import { adminAdvertiserProfile } from "@/validators/adminAdvertiserProfile";
import { fetchUser } from "@/actions/user/fetchUser";

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
  const [afiliate, setAfiliate] = useState<User | null>({} as User);

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
          afiliateId: "",
        },
  });

  const handleFetchUser = async (userId: string) => {
    if (userId) {
      try {
        const user = await fetchUser({ id: userId });

        if (user && user.role == "afiliate") {
          setAfiliate(user);

          return true;
        }

        form.setValue("userId", "");
        form.setError("userId", {
          message: "Digite um afiliado válido!",
        });
      } catch (error) {
        console.log(error);
      }
      return false;
    }
  };

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
            name="afiliateId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Afiliado</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o ID e pressione enter"
                    className="w-full rounded-r-none"
                    onChange={async (e) => {
                      field.onChange(e);
                      if (e.target.value.length >= 24) {
                        await handleFetchUser(
                          form.watch("afiliateId", "") || ""
                        );
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {afiliate?.id && <UserCard user={afiliate!} preview />}
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
