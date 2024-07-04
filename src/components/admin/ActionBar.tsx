"use client";
import { adValidator } from "@/validators/ad";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { RegionProps } from "@/types/region";
import ReusableModal from "../misc/ReusableModal";
import { createNewAd } from "@/actions/ad/createNewAd";
import SearchField from "../misc/SearchField";
import AdForm from "./forms/Ad";
import { AdvertiserAccount } from "@prisma/client";
import ReusableComboSearch from "../misc/ReusableComboSearch";

interface ActionBarProps {
  regions: RegionProps[];
  advertisers: AdvertiserAccount[] | null;
}

const ActionBar = ({ regions, advertisers }: ActionBarProps) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let commandOptions = [];

  commandOptions?.push({
    label: "Limpar",
    value: "",
  });

  advertisers?.forEach((advertiser) => {
    commandOptions.push({
      label: advertiser.name,
      value: advertiser.id,
    });
  });

  const handleOnSubmit = async (data: z.infer<typeof adValidator>) => {
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
    <div className="flex justify-between items-center w-full gap-5">
      <p className="text-2xl">Anúncios</p>

      <div className="flex gap-5">
        {commandOptions && (
          <ReusableComboSearch
            items={commandOptions}
            title="Filtrar anunciante"
            queryTitle="advertiser"
          />
        )}

        <SearchField
          keyName="title"
          placeholder="Busque um anúncio"
          inputClassName="w-64"
        />
      </div>

      <div className="flex gap-5">
        <ReusableModal
          title="Novo Anúncio"
          content={
            <AdForm
              onSubmit={handleOnSubmit}
              regions={regions}
              loading={loading}
              defaultValues={null}
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
