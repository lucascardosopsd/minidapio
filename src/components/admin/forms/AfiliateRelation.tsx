"use client";
import { getAdvertiserAccountByQuery } from "@/actions/advertiser/getAdvertiserAccountByQuery";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAfiliateRelationForm } from "@/hooks/useAfiliateRelation";
import { AdvertiserAccount, AfiliateAdvertiserAccount } from "@prisma/client";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import AdvertiserCard from "../cards/Advertiser";
import { afiliateAdvertiserValidator } from "@/validators/afiliateAdvertiser";
import { z } from "zod";
import { Button } from "@/components/ui/button";

interface AfiliateRelationFormProps {
  defaultValues?: AfiliateAdvertiserAccount;
  loading: boolean;
  onSubmit: (
    data: z.infer<typeof afiliateAdvertiserValidator>
  ) => Promise<void>;
  afiliateId: string;
}

const AfiliateRelationForm = ({
  defaultValues,
  onSubmit,
  afiliateId,
  loading,
}: AfiliateRelationFormProps) => {
  const [advertiser, setAdvertiser] = useState<AdvertiserAccount | null>(
    {} as AdvertiserAccount
  );
  const [fetching, setFetching] = useState(false);

  const form = useAfiliateRelationForm({
    defaultValues: defaultValues || {
      advertiserAccountId: "",
      afiliateId,
    },
  });

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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <p>Anunciante </p>
            {fetching && <ImSpinner2 className="animate-spin" />}
          </div>
          <Input
            placeholder="Digite o nome"
            onChange={async (e) => {
              if (e.target.value.length >= 3) {
                await handleFetchAdvertiser({
                  advertiserName: e.target.value,
                });
              }
            }}
          />

          {advertiser?.id && (
            <AdvertiserCard advertiser={advertiser!} user={null} preview />
          )}
        </div>

        <Button disabled={loading} className="ml-auto" type="submit">
          Confirmar
        </Button>
      </form>
    </Form>
  );
};

export default AfiliateRelationForm;
