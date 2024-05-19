"use client";
import { adValidator } from "@/validators/ad";
import AdForm from "./forms/ad";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { RegionProps } from "@/types/region";
import ReusableModal from "../misc/ReusableModal";
import { createNewAd } from "@/actions/ad/createNewRegion";

const ActionBar = ({ regions }: { regions: RegionProps[] }) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnSubmit = async (data: z.infer<typeof adValidator>) => {
    console.log(data);
    try {
      setLoading(true);

      await createNewAd({ data });

      toast.success("Anúncio criado");

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
      <p className="text-2xl">Anúncios</p>
      <div className="flex gap-4">
        <ReusableModal
          title="Novo Anúncio"
          content={
            <AdForm
              onSubmit={handleOnSubmit}
              regions={regions}
              loading={loading}
            />
          }
          trigger="Novo Anúncio"
          description="Crie um novo anúncio para ser propagado"
          onOpen={setIsModalOpen}
          isOpen={isModalOpen}
        />
      </div>
    </div>
  );
};

export default ActionBar;
