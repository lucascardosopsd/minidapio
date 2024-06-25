import FieldBuilder from "@/components/builders/FieldBuilder";
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
import { useAfiliateForm } from "@/hooks/useAfiliateForm";
import { afiliateValidator } from "@/validators/afiliate";
import { PatternFormat } from "react-number-format";
import { z } from "zod";
import UserCard from "../cards/User";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { ImSpinner2 } from "react-icons/im";
import { fetchUserByQuery } from "@/actions/user/fetchUserByQuery";
import { fetchAfiliatesByQuery } from "@/actions/afiliate/fetchAfiliatesByQuery";
import Fence from "@/components/restaurant/Fence";

interface AfiliateFormProps {
  defaultValues?: z.infer<typeof afiliateValidator> | undefined;
  onSubmit: (data: z.infer<typeof afiliateValidator>) => Promise<void>;
  loading: boolean;
}

const AfiliateForm = ({
  defaultValues,
  onSubmit,
  loading,
}: AfiliateFormProps) => {
  const form = useAfiliateForm({ defaultValues });
  const [user, setUser] = useState<User | null>({} as User);
  const [searching, setSearching] = useState(false);

  const handleFetchUser = async ({
    userName,
    userId,
  }: {
    userName?: string;
    userId?: string;
  }) => {
    setSearching(true);
    try {
      let user;

      if (userName) {
        user = await fetchUserByQuery({
          query: {
            where: {
              name: {
                startsWith: userName,
                mode: "insensitive",
              },
            },
          },
        });
      } else {
        user = await fetchUserByQuery({
          query: {
            where: {
              id: userId,
            },
          },
        });
      }

      if (user) {
        setUser(user[0]);
        form.setValue("userId", user[0].id);

        return true;
      }

      form.setValue("userId", "");
      form.setError("userId", {
        message: "Digite um usuário válido!",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSearching(false);
    }
  };

  const handleGenCode = async () => {
    let generatedCode;
    while (typeof generatedCode === "undefined") {
      const randomCode = Math.floor(Math.random() * 9999) + 1;

      const afiliates = await fetchAfiliatesByQuery({
        query: {
          where: { code: randomCode },
        },
      });

      if (!afiliates.length) {
        generatedCode = randomCode;
        form.setValue("code", randomCode);
      }
    }
  };

  useEffect(() => {
    if (defaultValues) {
      handleFetchUser({ userId: defaultValues?.userId });
    }

    if (!defaultValues) {
      handleGenCode();
    }
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FieldBuilder
          name="name"
          title="Nome"
          control={form.control}
          fieldElement={<Input />}
        />

        <FieldBuilder
          name="email"
          title="E-mail"
          control={form.control}
          fieldElement={<Input type="email" />}
        />

        <FieldBuilder
          name="phone"
          title="Telefone"
          control={form.control}
          fieldElement={<PatternFormat format="+55(##)#####-####" />}
        />

        <FieldBuilder
          name="pix"
          title="Chave PIX"
          control={form.control}
          fieldElement={<Input />}
        />

        <FieldBuilder
          name="kickback"
          title="Comissão(%)"
          control={form.control}
          fieldElement={<Input type="number" defaultValue={70} />}
        />

        <div className="space-y-2 flex-1">
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">
                  Usuário {searching && <ImSpinner2 className="animate-spin" />}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite nome"
                    className="w-full rounded-r-none"
                    onChange={async (e) => {
                      field.onChange(e);
                      if (e.target.value.length >= 3) {
                        handleFetchUser({ userName: e.target.value });
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {user?.id && <UserCard user={user!} preview />}
        </div>

        <Fence>{defaultValues?.code}</Fence>

        <Button type="submit" disabled={loading} className="w-full">
          Confirmar
        </Button>
      </form>
    </Form>
  );
};

export default AfiliateForm;
