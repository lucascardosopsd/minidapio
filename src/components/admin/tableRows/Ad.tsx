"use client";
import ReusableDialog from "@/components/misc/ReusableDialog";
import { useState } from "react";
import { z } from "zod";
import { FaPen, FaTrash } from "react-icons/fa6";
import DeleteModal from "@/components/restaurant/ConfirmModal";
import AdForm from "../forms/Ad";
import { adValidator } from "@/validators/ad";
import { RegionProps } from "@/types/region";
import { updateAd } from "@/actions/ad/updateAd";
import { toast } from "sonner";
import { deleteAd } from "@/actions/ad/deleteAd";
import { revalidateRoute } from "@/actions/revalidateRoute";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Ad } from "@prisma/client";
import { TableCell, TableRow } from "@/components/ui/table";

interface AdRowProps {
  ad: Ad;
  regions: RegionProps[];
}

const AdRow = ({ ad, regions }: AdRowProps) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnSubmit = async (data: z.infer<typeof adValidator>) => {
    try {
      setLoading(true);

      await updateAd({ id: ad.id, data });

      revalidateRoute({ fullPath: "/admin/dashboard" });

      toast.success("Anúncio atualizado");

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

      await deleteAd({ id: ad.id });

      toast.success("Anúncio deletado");

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
      <TableCell>
        <Image
          src={ad.image}
          width={300}
          height={300}
          alt={ad.title}
          className="w-[150px] h-[80px] rounded border-2 object-cover"
        />
      </TableCell>

      <TableCell>
        <div className="flex items-center">{ad.title}</div>
      </TableCell>

      <TableCell>
        {regions.filter((region) => region.id == ad.regionId)[0].title}
      </TableCell>

      <TableCell>
        <Badge>{ad.active ? "Ativo" : "Inativo"}</Badge>
      </TableCell>

      <TableCell>
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
      </TableCell>

      <TableCell>
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
      </TableCell>
    </TableRow>
  );
};

export default AdRow;
