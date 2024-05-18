"use client";

import { createNewRegion } from "@/actions/region/createNewRegion";
import RegionModalContent from "@/components/advertiser/modals/content/region";
import ReusableDialog from "@/components/misc/ReusableDialog";
import { Separator } from "@/components/ui/separator";
import { useRegionForm } from "@/hooks/useRegionForm";
import { regionValidator } from "@/validators/region";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const RegionsPage = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useRegionForm({});

  const handleOnSubmit = async (data: z.infer<typeof regionValidator>) => {
    try {
      setLoading(true);

      await createNewRegion({ data });

      toast.success("Região criada");

      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-5 w-full">
      <div className="flex justify-between items-center w-full">
        <p className="text-2xl">Regiões</p>
        <div className="flex gap-4">
          <ReusableDialog
            title="Nova Região"
            content={<RegionModalContent onSubmit={handleOnSubmit} />}
            trigger="Nova Região"
            description="Crie uma nova região para servir aos anuncios"
            loading={loading}
            onOpen={setIsModalOpen}
            isOpen={isModalOpen}
          />
        </div>
      </div>

      <Separator />
    </section>
  );
};

export default RegionsPage;
