"use client";
import ReusableDialog from "@/components/misc/ReusableDialog";
import { useState } from "react";
import { z } from "zod";
import { FaPen, FaTrash } from "react-icons/fa6";
import DeleteModal from "@/components/restaurant/ConfirmModal";

import { toast } from "sonner";

import { revalidateRoute } from "@/actions/revalidateRoute";
import { Badge } from "@/components/ui/badge";

import { TableCell, TableRow } from "@/components/ui/table";
import { Plan } from "@prisma/client";
import { planValidator } from "@/validators/plan";
import { updatePlan } from "@/actions/plan/updatePlan";
import { deletePlan } from "@/actions/plan/deletePlan";
import { formatPrice } from "@/tools/formatPrice";
import PlanForm from "../forms/Plan";

interface PlanRowProps {
  plan: Plan;
}

const PlanRow = ({ plan }: PlanRowProps) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnSubmit = async (data: z.infer<typeof planValidator>) => {
    try {
      setLoading(true);

      await updatePlan({ id: plan.id, data });

      revalidateRoute({ fullPath: "/jsnHktoSE/dashboard" });

      toast.success("Plano atualizado");

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

      await deletePlan({ id: plan.id });

      toast.success("Plano deletado");

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
        <div className="flex items-center">{plan.title}</div>
      </TableCell>

      <TableCell>{plan.alias}</TableCell>

      <TableCell>
        <Badge>{formatPrice(plan.price, "pt-BR", "BRL")}</Badge>
      </TableCell>

      <TableCell>{plan.level}</TableCell>

      <TableCell>
        <ReusableDialog
          title="Editar Plano"
          content={
            <div className="h-[calc(70svh)] overflow-y-auto">
              <PlanForm
                onSubmit={handleOnSubmit}
                defaultValues={plan}
                loading={loading}
              />
            </div>
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
          dialogTitle="Apagar Plano"
          triggerText={<FaTrash />}
          dialogDescription={
            <>
              <p>
                Você está apagando o plano:{" "}
                <span className="text-red-500">{plan.title}</span>
              </p>
              <p>Deseja continuar?</p>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
};

export default PlanRow;
