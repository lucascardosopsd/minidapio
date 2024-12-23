"use client";
import { Button } from "@/components/ui/button";
import { variantSchema } from "@/validators/variant";
import { z } from "zod";
import VariantFormModal from "../forms/VariantFormModal";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { createNewVariant } from "@/actions/variant/createVariant";
import { revalidateRoute } from "@/actions/revalidateRoute";
import { ExposedToggleModalProps } from "@/types/common";

const NewVariantButton = () => {
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<ExposedToggleModalProps>(null);

  const handleNewVariant = async (data: z.infer<typeof variantSchema>) => {
    try {
      setLoading(true);

      await createNewVariant({
        data: { title: data.title },
      });

      revalidateRoute({ fullPath: "/variants" });

      modalRef.current?.toggleModal();
    } catch (error) {
      toast.error("Erro ao criar variação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <VariantFormModal
      onSubmit={handleNewVariant}
      trigger={<Button>Nova Variante</Button>}
      loading={loading}
    />
  );
};

export default NewVariantButton;
