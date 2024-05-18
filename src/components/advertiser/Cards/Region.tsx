"use client";
import ReusableDialog from "@/components/misc/ReusableDialog";
import { Card, CardHeader } from "@/components/ui/card";
import { RegionProps } from "@/types/region";
import RegionModalContent from "../modals/content/region";
import { useState } from "react";
import { z } from "zod";
import { regionValidator } from "@/validators/region";
import { toast } from "sonner";
import { FaPen } from "react-icons/fa6";
import { updateRegion } from "@/actions/region/updateRegion";

interface RegionCardProps {
  region: RegionProps;
}

const RegionCard = ({ region }: RegionCardProps) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnSubmit = async (data: z.infer<typeof regionValidator>) => {
    try {
      setLoading(true);

      await updateRegion({ id: region.id, data });

      toast.success("Região atualizada");

      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div className="flex items-center">
          <p>{region.title}</p>
          <p>-</p>
          <p>{region.state}</p>
        </div>

        <ReusableDialog
          title="Editar Região"
          content={
            <RegionModalContent
              onSubmit={handleOnSubmit}
              defaultValues={region}
            />
          }
          trigger={<FaPen />}
          description="Atualize os dados da região"
          loading={loading}
          onOpen={setIsModalOpen}
          isOpen={isModalOpen}
        />
      </CardHeader>
    </Card>
  );
};

export default RegionCard;
