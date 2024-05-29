"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { FaPen, FaTrash } from "react-icons/fa6";
import DeleteModal from "@/components/restaurant/DeleteModal";
import { toast } from "sonner";
import { deleteUser } from "@/actions/user/deleteUser";
import { usePathname, useSearchParams } from "next/navigation";
import { revalidateRoute } from "@/actions/revalidateRoute";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/tools/copyToClipboard";
import ReusableModal from "@/components/misc/ReusableModal";
import { z } from "zod";
import { useState } from "react";
import { Afiliate } from "@prisma/client";
import { afiliateValidator } from "@/validators/afiliate";
import { updateAfiliate } from "@/actions/afiliate/updateAfiliate";
import AfiliateForm from "../forms/Afiliate";

interface UserAfiliateProps {
  afiliate: Afiliate;
  preview?: boolean;
}

const AfiliateCard = ({ afiliate, preview = false }: UserAfiliateProps) => {
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

      toast.info("Usuário atualizado");

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
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div className="flex gap-5 flex-1 items-center">
          <div className="flex items-center w-full flex-1">
            {afiliate?.name}
          </div>
        </div>

        {!preview && (
          <div className="flex gap-5">
            <Button
              size="icon"
              onClick={() => copyToClipboard(afiliate?.id!, "", "Id copiado!")}
              className="right-5 top-5"
              variant="secondary"
            >
              ID
            </Button>

            <ReusableModal
              title="Editar usuário"
              trigger={<FaPen />}
              content={
                <AfiliateForm
                  defaultValues={afiliate!}
                  onSubmit={handleUpdateAfiliate}
                />
              }
              isOpen={isModalOpen}
              onOpen={setIsModalOpen}
            />

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
          </div>
        )}
      </CardHeader>
    </Card>
  );
};

export default AfiliateCard;
