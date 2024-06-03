"use client";
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
import { adValidator } from "@/validators/ad";
import { useEffect, useState } from "react";
import { z } from "zod";
import UserCard from "../cards/User";
import { Ad, AdvertiserAccount, User } from "@prisma/client";
import AdvertiserCard from "../cards/Advertiser";
import { getAdvertiserAccountByQuery } from "@/actions/advertiser/getAdvertiserAccountByQuery";
import { fetchUserByQuery } from "@/actions/user/fetchUserByQuery";

interface AdFormProps {
  defaultValues: Ad | null;
  onSubmit: (data: z.infer<typeof adValidator>) => Promise<void>;
  regions: RegionProps[];
  loading: boolean;
}

const AdForm = ({ defaultValues, onSubmit, regions, loading }: AdFormProps) => {
  const [user, setUser] = useState<User | null>({} as User);
  const [advertiser, setAdvertiser] = useState<AdvertiserAccount | null>(
    {} as AdvertiserAccount
  );

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
      userId: "",
      regionId: regionsOptions[0].value,
      advertiserAccountId: "",
    },
  });

  const handleFetchUser = async (userName: string) => {
    if (userName) {
      try {
        const user = await fetchUserByQuery({
          query: {
            where: {
              name: {
                startsWith: userName,
                mode: "insensitive",
              },
            },
          },
        });

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
      }
      return false;
    }
  };

  const handleFetchAdvertiser = async (advertiserName: string) => {
    if (advertiserName) {
      try {
        const advertiser = await getAdvertiserAccountByQuery({
          query: {
            where: {
              name: {
                startsWith: advertiserName,
                mode: "insensitive",
              },
            },
          },
        });

        if (advertiser) {
          setAdvertiser(advertiser[0]);
          form.setValue("advertiserAccountId", advertiser[0].id);

          return true;
        }

        form.setValue("advertiserAccountId", "");
        form.setError("advertiserAccountId", {
          message: "Digite um anunciante válido!",
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

    if (defaultValues?.advertiserAccountId) {
      handleFetchAdvertiser(defaultValues?.advertiserAccountId);
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

        <div className="flex flex-col space-y-5">
          <div className="space-y-2 flex-1">
            <p>Usuário</p>
            <Input
              onChange={async (e) => {
                if (e.target.value.length >= 3) {
                  await handleFetchUser(e.target.value);
                }
              }}
            />

            {user?.id && <UserCard user={user!} preview />}
          </div>

          {user && (
            <div className="space-y-2 flex-1 w-full">
              <p>Anunciante</p>
              <Input
                onChange={async (e) => {
                  if (e.target.value.length >= 3) {
                    await handleFetchAdvertiser(e.target.value);
                  }
                }}
              />

              {advertiser?.id && (
                <AdvertiserCard advertiser={advertiser!} user={user!} preview />
              )}
            </div>
          )}

          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Ativo</FormLabel>
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
