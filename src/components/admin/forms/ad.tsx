"use client";
import { fetchUser } from "@/actions/user/fetchUser";
import FieldBuilder from "@/components/builders/FieldBuilder";
import SelectBuilder from "@/components/builders/SelectBuilder";
import UploadImage from "@/components/misc/UploadImage";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useAdForm } from "@/hooks/useAdForm";
import { RegionProps } from "@/types/region";
import { UserProps } from "@/types/user";
import { adValidator } from "@/validators/ad";
import { useEffect, useState } from "react";
import { z } from "zod";
import UserCard from "../cards/User";

interface AdFormProps {
  defaultValues?: z.infer<typeof adValidator> | undefined;
  onSubmit: (data: z.infer<typeof adValidator>) => Promise<void>;
  regions: RegionProps[];
  loading: boolean;
}

const AdForm = ({ defaultValues, onSubmit, regions, loading }: AdFormProps) => {
  const [user, setUser] = useState<UserProps | null>({} as UserProps);

  const regionsOptions = regions.map((region: RegionProps) => ({
    label: region.title,
    value: region.id,
    state: region.state,
  }));

  const form = useAdForm({
    defaultValues: defaultValues || {
      title: "",
      description: "",
      image: "",
      link: "",
      active: true,
      userId: defaultValues.userId || "",
      regionId: regionsOptions[0].value,
    },
  });

  const handleFetchUser = async (userId: string) => {
    if (userId) {
      try {
        const user = await fetchUser({ id: userId });

        if (user) {
          setUser(user);

          return true;
        }

        form.setValue("userId", "");
        form.setError("userId", {
          message: "Digite um usuário válido!",
        });
      } catch (error) {
        console.log(error);
      }
      return false;
    }
  };

  useEffect(() => {
    if (defaultValues?.userId) {
      handleFetchUser(defaultValues?.userId);
      return;
    }
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 pb-10 max-w-screen-mobile mx-auto"
      >
        <FieldBuilder
          title="Título"
          name="title"
          control={form.control}
          fieldElement={<Input maxLength={40} />}
        />

        <FieldBuilder
          title="Descrição"
          name="description"
          control={form.control}
          fieldElement={<Textarea maxLength={200} />}
        />

        <UploadImage name="image" control={form.control} />

        <FieldBuilder
          title="Link"
          name="link"
          control={form.control}
          fieldElement={<Input placeholder="https://" />}
        />

        <SelectBuilder
          control={form.control}
          name="regionId"
          title="Região"
          selectItem={regionsOptions.map((option) => (
            <SelectItem value={option.value} key={option.label}>
              {option.label} - {option.state}
            </SelectItem>
          ))}
        />

        <div className="flex space-x-5">
          <div className="space-y-2 flex-1">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuário</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o ID e pressione enter"
                      className="w-full rounded-r-none"
                      onChange={async (e) => {
                        field.onChange(e);
                        if (e.target.value.length >= 24) {
                          await handleFetchUser(form.watch("userId", ""));
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {user?.id && <UserCard user={user} preview />}
          </div>

          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="w-full text-center">Ativo</FormLabel>
                <FormControl>
                  <div className="flex items-center h-full">
                    <Switch
                      onCheckedChange={field.onChange}
                      checked={field.value}
                      className="h-8 w-14 mt-2"
                      thumbClassName="data-[state=checked]:translate-x-8"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          Confirmar
        </Button>
      </form>
    </Form>
  );
};

export default AdForm;
