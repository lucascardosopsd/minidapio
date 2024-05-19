"use client";
import ReusableDialog from "@/components/misc/ReusableDialog";
import { Card, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { z } from "zod";
import { FaPen, FaTrash } from "react-icons/fa6";
import DeleteModal from "@/components/restaurant/DeleteModal";
import { AdProps } from "@/types/ad";
import AdForm from "../forms/ad";
import { adValidator } from "@/validators/ad";
import { RegionProps } from "@/types/region";

interface AdCardProps {
  ad: AdProps;
  regions: RegionProps[];
}

const AdCard = ({ ad, regions }: AdCardProps) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnSubmit = async (data: z.infer<typeof adValidator>) => {};

  const handleDelete = async () => {};

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div className="flex items-center">{ad.title}</div>

        <div className="flex gap-5">
          <ReusableDialog
            title="Editar Anúncio"
            content={
              <AdForm
                onSubmit={handleOnSubmit}
                defaultValues={ad}
                regions={regions}
                loading={loading}
              />
            }
            trigger={<FaPen />}
            description="Atualize os dados do anúncio"
            loading={loading}
            onOpen={setIsModalOpen}
            isOpen={isModalOpen}
          />

          <DeleteModal
            action={handleDelete}
            dialogTitle="Apagar Anúncio"
            triggerText={<FaTrash />}
            dialogDescription={
              <>
                <p>
                  Você está apagando o anúncio:{" "}
                  <span className="text-red-500">{ad.title}</span>
                </p>
                <p>Deseja continuar?</p>
              </>
            }
          />
        </div>
      </CardHeader>
    </Card>
  );
};

export default AdCard;
