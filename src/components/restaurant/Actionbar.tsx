"use client";

import { createNewCategory } from "@/actions/category/createNewCategory";
import { categoryValidator } from "@/validators/category";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import InputSearch from "./InputSearch";
import ReusableSheet from "../misc/ReusableSheet";
import CategoryForm from "./forms/Category";
import { revalidateRoute } from "@/actions/revalidateRoute";
import { PlanLimitProps } from "@/constants/planLimits";

interface RestaurantActionBarProps {
  restaurantId: string;
  limits: PlanLimitProps;
  categoriesCount: number;
}

const RestaurantActionbar = ({
  restaurantId,
  limits,
  categoriesCount,
}: RestaurantActionBarProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleNewCategory = async (data: z.infer<typeof categoryValidator>) => {
    setLoading(true);

    try {
      await createNewCategory({ data });

      revalidateRoute({ fullPath: pathname });

      toast.success("Categoria criada");
    } catch (error) {
      toast.error("Ocorreu um erro.");

      throw new Error("Can't create new category");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="flex flex-col tablet:flex-row gap-4 tablet:gap-0 py-4 tablet:p-0 justify-between w-full items-center">
      <p>Categorias</p>

      <InputSearch restaurantId={restaurantId} disableParams />

      <div className="flex gap-2 w-full tablet:w-auto">
        <ReusableSheet
          title="Criar Categoria"
          trigger="Nova Categoria"
          triggerVariant="default"
          triggerClassName="w-full tablet:w-40"
          content={
            <CategoryForm
              restaurantId={restaurantId}
              onSubmit={handleNewCategory}
              loading={loading}
            />
          }
          isOpen={open}
          onOpen={setOpen}
          triggerDisabled={categoriesCount >= limits.categories}
        />
      </div>
    </div>
  );
};

export default RestaurantActionbar;
