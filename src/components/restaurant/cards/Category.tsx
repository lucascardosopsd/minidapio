'use client';
import { CategoriesWithItemsProps } from '@/types/category';
import { AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';
import { FaPen, FaTrash } from 'react-icons/fa6';
import { Badge } from '../../ui/badge';
import DeleteModal from '../ConfirmModal';
import { deleteCategory } from '@/actions/category/deleteCategory';
import { toast } from 'sonner';
import CategoryForm from '../forms/Category';
import { usePathname } from 'next/navigation';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ItemRow from '../tableRows/Item';
import ItemForm from '../forms/Item';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';
import { createNewItem } from '@/actions/item/createNewItem';
import { ItemValidator } from '@/validators/item';
import { revalidateRoute } from '@/actions/revalidateRoute';
import ReusableSheet from '@/components/misc/ReusableSheet';
import { updateCategory } from '@/actions/category/updateCategory';
import { categoryValidator } from '@/validators/category';
import { PlanLimitProps } from '@/constants/planLimits';

interface CategoryCardProps {
  category: CategoriesWithItemsProps;
  restaurantId: string;
  categories: CategoriesWithItemsProps[];
  limits: PlanLimitProps;
}

const CategoryCard = ({ category, restaurantId, categories, limits }: CategoryCardProps) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [openItem, setOpenItem] = useState(false);
  const [openEditCategory, setOpenEditCategory] = useState(false);

  const itemsCount = categories.flatMap(category => category.items && category.items).length;

  const handleNewItem = async (data: z.infer<typeof ItemValidator>) => {
    data.restaurantId = restaurantId;

    setLoading(true);
    try {
      await createNewItem({ data });
      toast.success('Item criado!');
      revalidateRoute({ fullPath: pathname });
    } catch (error) {
      toast.error('Ocorreu um erro.');
      throw new Error('Error when create/update new item');
    } finally {
      setLoading(false);
      setOpenItem(false);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await deleteCategory(category.id, restaurantId, pathname);
      toast('Categoria deletada');
    } catch (error) {
      toast('ocorreu um erro');
      throw new Error('Error when delete category');
    }
  };

  const handleUpdateCategory = async (data: z.infer<typeof categoryValidator>) => {
    setLoading(true);

    try {
      await updateCategory({ data, id: category.id });

      revalidateRoute({ fullPath: pathname });
      toast('Categoria atualizada');
    } catch (error) {
      console.log(error);
      toast('Ocorreu um erro.');
      throw new Error("Can't update category");
    } finally {
      setOpenEditCategory(false);
      setLoading(false);
    }
  };

  return (
    <AccordionItem className="mx-4 flex flex-col border-none bg-background" value={category.id}>
      <AccordionTrigger className="w-full gap-5 rounded-lg border border-border px-5">
        <div className="flex w-full flex-col items-center gap-2 tablet:flex-row">
          <p className="w-full text-center tablet:text-start">{category.title}</p>
          <div className="mx-auto flex w-full justify-center gap-4 tablet:ml-auto tablet:w-auto tablet:justify-end">
            <ReusableSheet
              content={
                <ItemForm
                  categoryId={category.id.toString()}
                  categories={categories}
                  onSubmit={handleNewItem}
                  loading={loading}
                />
              }
              title="Novo Item"
              triggerClassName="p-3"
              trigger={<Plus size={26} />}
              triggerVariant="default"
              isOpen={openItem}
              onOpen={setOpenItem}
              triggerDisabled={itemsCount >= limits.items}
            />

            <ReusableSheet
              title="Editar Categoria"
              trigger={<FaPen />}
              triggerVariant="outline"
              content={
                <CategoryForm
                  defaultValues={category}
                  restaurantId={restaurantId}
                  onSubmit={handleUpdateCategory}
                  loading={loading}
                />
              }
              isOpen={openEditCategory}
              onOpen={setOpenEditCategory}
            />

            <DeleteModal
              action={handleDeleteCategory}
              dialogTitle="Deletar Categoria"
              triggerText={<FaTrash />}
              dialogDescription={
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <p>Você está apagando a categoria</p>
                    <Badge>{category.title}</Badge>
                  </div>
                </div>
              }
              triggerVariant="destructive"
            />
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="w-[calc(100svw-60px)] overflow-x-auto tablet:w-full">
          <div className="w-[250svw] pr-20 tablet:w-full tablet:pr-0">
            <div className="mt-2 flex flex-col space-y-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead></TableHead>
                    <TableHead>Img</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead className="text-center">Descrito</TableHead>
                    <TableHead className="text-center">Preço</TableHead>
                    <TableHead className="text-center">Promoção</TableHead>
                    <TableHead className="text-center">Destaque</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead>Editar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {category.items &&
                    category?.items
                      .sort((a, b) => a.order - b.order)
                      .map(item => <ItemRow categories={categories} item={item} key={item.id} />)}
                </TableBody>
              </Table>
            </div>

            {!category.items?.length && (
              <div className="mt-5 flex w-full flex-col items-center justify-center">
                <p>Esta categoria não possuí itens.</p>
                <div className="flex">
                  <p>👆 Crie itens clicando em </p>
                  <p className="ml-1 text-primary">"+"</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default CategoryCard;
