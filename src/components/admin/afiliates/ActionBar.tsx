"use client";

import { z } from "zod";
import AfiliateForm from "../forms/Afiliate";
import { afiliateValidator } from "@/validators/afiliate";
import { createNewAfiliate } from "@/actions/afiliate/createNewAfiliate";
import { toast } from "sonner";
import SearchField from "@/components/misc/SearchField";
import ReusableDialog from "@/components/misc/ReusableDialog";
import { useState } from "react";

const AfiliatesActionBar = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOnSubmit = async (data: z.infer<typeof afiliateValidator>) => {
    try {
      setLoading(true);

      await createNewAfiliate({ data });

      toast.success("Afiliado criado");

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
      <p className="text-2xl">Afiliados</p>
      <SearchField
        keyName="name"
        placeholder="Busque um nome"
        inputClassName="w-64"
      />
      <ReusableDialog
        title="Novo Afiliado"
        trigger="Novo afiliado"
        content={<AfiliateForm onSubmit={handleOnSubmit} loading={loading} />}
        isOpen={open}
        onOpen={setOpen}
      />
    </div>
  );
};

export default AfiliatesActionBar;
