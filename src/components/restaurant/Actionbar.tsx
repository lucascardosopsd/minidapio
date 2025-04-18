'use client';

import { createNewCategory } from '@/actions/category/createNewCategory';
import { categoryValidator } from '@/validators/category';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import InputSearch from './InputSearch';
import ReusableSheet from '../misc/ReusableSheet';
import CategoryForm from './forms/Category';
import { revalidateRoute } from '@/actions/revalidateRoute';
import { PlanLimitProps } from '@/constants/planLimits';
import { Plus } from 'lucide-react';

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

      toast.success('Categoria criada');
    } catch (error) {
      toast.error('Ocorreu um erro.');

      throw new Error("Can't create new category");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 py-4 tablet:flex-row tablet:gap-0 tablet:p-0">
      <p>Categorias</p>

      <InputSearch restaurantId={restaurantId} disableParams />

      <div className="flex w-full gap-2 tablet:w-auto">
        <ReusableSheet
          title="Adicionar Categoria"
          trigger={
            <span className="flex items-center gap-2">
              Adicionar <Plus />
            </span>
          }
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
