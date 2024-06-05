"use client";
import { z } from "zod";

import { toast } from "sonner";

import { useState } from "react";
import SearchField from "@/components/misc/SearchField";
import ReusableDialog from "@/components/misc/ReusableDialog";
import { createAfiliateAdvertiserAccount } from "@/actions/AfiliateAdvertiser/createAfiliateAdvertiserAccount";
import { afiliateAdvertiserValidator } from "@/validators/afiliateAdvertiser";
import AfiliateRelationForm from "../../forms/AfiliateRelation";
import { useParams, usePathname } from "next/navigation";
import { revalidateRoute } from "@/actions/revalidateRoute";

const AfiliateRelationsActionBar = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const params: { [key: string]: string } = useParams();

  const pathname = usePathname();

  const handleOnSubmit = async (
    data: z.infer<typeof afiliateAdvertiserValidator>
  ) => {
    console.log(data);
    try {
      setLoading(true);

      await createAfiliateAdvertiserAccount({ data });

      revalidateRoute({ fullPath: pathname });

      toast.success("Relacionamento criado");

      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between w-full gap-5 items-center">
      <p className="text-2xl">Anunciantes Afiliados</p>
      <SearchField
        keyName="name"
        placeholder="Busque um nome"
        inputClassName="w-64"
      />
      <ReusableDialog
        title="Nova Relação"
        trigger="Nova relação"
        content={
          <AfiliateRelationForm
            onSubmit={handleOnSubmit}
            loading={loading}
            afiliateId={params.afiliateId!}
          />
        }
        isOpen={open}
        onOpen={setOpen}
      />
    </div>
  );
};

export default AfiliateRelationsActionBar;
