"use client";
import { FaPen, FaTrash } from "react-icons/fa6";
import DeleteModal from "@/components/restaurant/ConfirmModal";
import { toast } from "sonner";
import { deleteUser } from "@/actions/user/deleteUser";
import { usePathname, useSearchParams } from "next/navigation";
import { revalidateRoute } from "@/actions/revalidateRoute";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/tools/copyToClipboard";
import { z } from "zod";
import { useState } from "react";
import { Afiliate } from "@prisma/client";
import { afiliateValidator } from "@/validators/afiliate";
import { updateAfiliate } from "@/actions/afiliate/updateAfiliate";
import AfiliateForm from "../forms/Afiliate";
import ReusableDialog from "@/components/misc/ReusableDialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ChevronRight, KeyRound } from "lucide-react";
import Link from "next/link";

interface UserAfiliateProps {
  afiliate: Afiliate;
  preview?: boolean;
}

const AfiliateRow = ({ afiliate, preview = false }: UserAfiliateProps) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const params = useSearchParams();

  const handleUpdateAfiliate = async (
    data: z.infer<typeof afiliateValidator>
  ) => {
    setLoading(true);
    try {
      await updateAfiliate({ id: afiliate?.id!, data });

      setIsModalOpen(false);

      toast.info("Afiliado atualizado");

      revalidateRoute({ fullPath: `${pathname}?${params}` });
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);

    try {
      await deleteUser({ id: afiliate?.id! });

      revalidateRoute({ fullPath: `${pathname}?${params}` });

      toast.success("Afiliado deletado");

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
      <TableCell className="w-full">{afiliate?.name}</TableCell>

      <TableCell>
        <Button
          size="icon"
          onClick={() => copyToClipboard(afiliate.pix, "", "Id copiado!")}
          className="right-5 top-5"
          variant="secondary"
        >
          <KeyRound strokeWidth={1} />
        </Button>
      </TableCell>

      <TableCell>
        <Button
          size="icon"
          onClick={() => copyToClipboard(afiliate.userId, "", "Id copiado!")}
          className="right-5 top-5"
          variant="secondary"
        >
          ID
        </Button>
      </TableCell>

      <TableCell>
        <ReusableDialog
          title="Editar usuário"
          trigger={<FaPen />}
          content={
            <AfiliateForm
              defaultValues={afiliate!}
              onSubmit={handleUpdateAfiliate}
              loading={loading}
            />
          }
          isOpen={isModalOpen}
          onOpen={setIsModalOpen}
        />
      </TableCell>

      <TableCell>
        <DeleteModal
          action={handleDelete}
          dialogTitle="Apagar afiliado"
          triggerText={<FaTrash />}
          dialogDescription={
            <>
              <p>
                Você está apagando o usuário:{" "}
                <span className="text-red-500">{afiliate?.name}</span>
              </p>
              <p>Deseja continuar?</p>
            </>
          }
        />
      </TableCell>

      <TableCell>
        <Link
          href={`/jsnHktoSE/dashboard/afiliates/${afiliate.id}/relations?page=1`}
          target="_blank"
          className="w-full"
        >
          <Button className="w-full">
            <ChevronRight />
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default AfiliateRow;
