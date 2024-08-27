"use client";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

import { createNewPlan } from "@/actions/plan/createNewPlan";
import { planValidator } from "@/validators/plan";
import PlanForm from "../forms/Plan";
import { Plan } from "@prisma/client";
import ReusableModal from "@/components/misc/ReusableModal";
import { revalidateRoute } from "@/actions/revalidateRoute";

interface PlansActionBarProps {
  plans: Plan[] | null;
}

const PlansActionBar = ({ plans }: PlansActionBarProps) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnSubmit = async (data: z.infer<typeof planValidator>) => {
    try {
      setLoading(true);

      await createNewPlan({ data });

      toast.success("Plano criado");

      revalidateRoute({ fullPath: "/" });

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
      <p className="text-2xl">Planos</p>

      <div className="flex gap-5">
        <ReusableModal
          title="Novo Plano"
          content={
            <PlanForm
              onSubmit={handleOnSubmit}
              loading={loading}
              defaultValues={null}
            />
          }
          trigger="Novo Plano"
          description="Crie um novo plano"
          onOpen={setIsModalOpen}
          isOpen={isModalOpen}
        />
      </div>
    </div>
  );
};

export default PlansActionBar;
