"use client";

import ReusableDialog from "@/components/misc/ReusableDialog";
import RegionModalContent from "../modals/content/region";
import { createNewRegion } from "@/actions/region/createNewRegion";
import { useState } from "react";
import { regionValidator } from "@/validators/region";
import { toast } from "sonner";
import { z } from "zod";

const RegionsActionBar = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  );
};

export default RegionsActionBar;
