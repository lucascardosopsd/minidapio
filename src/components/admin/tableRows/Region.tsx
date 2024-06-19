"use client";
import ReusableDialog from "@/components/misc/ReusableDialog";
import { RegionProps } from "@/types/region";
import { useState } from "react";
import { z } from "zod";
import { regionValidator } from "@/validators/region";
import { toast } from "sonner";
import { FaPen, FaTrash } from "react-icons/fa6";
import { updateRegion } from "@/actions/region/updateRegion";
import DeleteModal from "@/components/restaurant/ConfirmModal";
import { deleteRegion } from "@/actions/region/deleteRegion";
import RegionModalContent from "../forms/Region";
import { TableCell, TableRow } from "@/components/ui/table";

interface RegionRowProps {
  region: RegionProps;
}

const RegionRow = ({ region }: RegionRowProps) => {
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

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteRegion({ id: region.id });

      toast.success("Região deletada");

      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TableRow>
      <TableCell>{region.title}</TableCell>
      <TableCell>{region.state}</TableCell>
      <TableCell>{region.active ? "Ativo" : "Inativo"}</TableCell>

      <TableCell>
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
      </TableCell>

      <TableCell>
        <DeleteModal
          action={handleDelete}
          dialogTitle="Apagar região"
          triggerText={<FaTrash />}
          dialogDescription={
            <>
              <p>
                Você está apagando a região:{" "}
                <span className="text-red-500">{region.title}</span>
              </p>
              <p>Deseja continuar?</p>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
};

export default RegionRow;
