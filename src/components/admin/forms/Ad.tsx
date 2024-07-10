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
import { Ad, AdvertiserAccount, User } from "@prisma/client";
import AdvertiserCard from "../cards/Advertiser";
import { getAdvertiserAccountByQuery } from "@/actions/advertiser/getAdvertiserAccountByQuery";
import { fetchUserByQuery } from "@/actions/user/fetchUserByQuery";
import { ImSpinner2 } from "react-icons/im";

interface AdFormProps {
  defaultValues: Ad | null;
  onSubmit: (data: z.infer<typeof adValidator>) => Promise<void>;
  regions: RegionProps[];
  loading: boolean;
}

const AdForm = ({ defaultValues, onSubmit, regions, loading }: AdFormProps) => {
  const [user, setUser] = useState<User | null>({} as User);
  const [fetching, setFetching] = useState(false);
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
      cta: "Saiba mais",
      regionId: regionsOptions[0].value,
      advertiserAccountId: "",
    },
  });

  const handleFetchUser = async () => {
    try {
      setFetching(true);

      const user = await fetchUserByQuery({
        query: {
          where: {
            advertiserAccountId: advertiser?.id,
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
    } finally {
      setFetching(false);
    }
  };

  const handleFetchAdvertiser = async ({
    advertiserName,
    advertiserId,
  }: {
    advertiserName?: string;
    advertiserId?: string;
  }) => {
    try {
      setFetching(true);

      let advertiser;

      if (advertiserName) {
        advertiser = await getAdvertiserAccountByQuery({
          query: {
            where: {
              name: {
                startsWith: advertiserName,
                mode: "insensitive",
              },
            },
          },
        });
      } else {
        advertiser = await getAdvertiserAccountByQuery({
          query: {
            where: {
              id: advertiserId,
            },
          },
        });
      }

      if (advertiser) {
        setAdvertiser(advertiser[0]);
        form.setValue("advertiserAccountId", advertiser[0].id);

        await handleFetchUser();

        return true;
      }

      form.setValue("advertiserAccountId", "");
      form.setError("advertiserAccountId", {
        message: "Digite um anunciante válido!",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
    return false;
  };

  useEffect(() => {
    if (defaultValues?.advertiserAccountId) {
      handleFetchAdvertiser({
        advertiserId: defaultValues?.advertiserAccountId,
      });
    }
  }, []);

  const buttonTitleOptions = [
    {
      label: "Saiba mais",
      value: "Saiba mais",
    },
    {
      label: "Peça agora",
      value: "Peça agora",
    },
    {
      label: "Fale conosco",
      value: "Fale conosco",
    },
    {
      label: "Contato",
      value: "Contato",
    },
  ];

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

        <SelectBuilder
          name="cta"
          title="CTA"
          selectItem={buttonTitleOptions.map((option) => (
            <SelectItem value={option.value}>{option.label}</SelectItem>
          ))}
          control={form.control}
        />

        <div className="flex flex-col space-y-5">
          <div className="space-y-2 flex-1">
            <div className="space-y-2 flex-1 w-full">
              <div className="flex gap-2">
                <p>Anunciante </p>
                {fetching && <ImSpinner2 className="animate-spin" />}
              </div>
              <Input
                onChange={async (e) => {
                  if (e.target.value.length >= 3) {
                    await handleFetchAdvertiser({
                      advertiserName: e.target.value,
                    });
                  }
                }}
              />

              {advertiser && user && (
                <AdvertiserCard advertiser={advertiser!} user={user!} preview />
              )}
            </div>

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
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          Confirmar
        </Button>
      </form>
    </Form>
  );
};

export default AdForm;
