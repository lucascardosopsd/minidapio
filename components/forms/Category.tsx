"use client";
import { useCategoryForm } from "@/hooks/useCategoryForm";
import { Form } from "../ui/form";
import { z } from "zod";
import { categoryValidator } from "@/validators/category";
import { toast } from "sonner";
import { Button } from "../ui/button";
import FieldBuilder from "../builders/FieldBuilder";
import { usePathname } from "next/navigation";
import { Input } from "../ui/input";
import { useState } from "react";
import { createNewCategory } from "@/actions/category/createNewCategory";
import { updateCategory } from "@/actions/category/updateCategory";
import { CategoryProps } from "@/types/category";

interface CategoryFormProps {
  defaultValues?: Partial<CategoryProps>;
  categoryId?: string;
  restaurantId: string;
  toggleOpen?: () => void;
}

const CategoryForm = ({
  defaultValues = {},
  toggleOpen = () => {},
  restaurantId,
  categoryId = "",
}: CategoryFormProps) => {
  const [loading, setLoading] = useState(false);

  const form = useCategoryForm({
    defaultValues: defaultValues || { restaurantId },
  });
  const pathname = usePathname();

  const handleUpdateCategory = async (
    data: Partial<z.infer<typeof categoryValidator>>
  ) => {
    setLoading(true);

    try {
      await updateCategory(data, categoryId, pathname);
      toast("Categoria atualizada");

      toggleOpen();
    } catch (error) {
      toast("Ocorreu um erro.");
      throw new Error("Can't create new category");
    } finally {
      setLoading(false);
    }
  };

  const handleNewCategory = async (data: z.infer<typeof categoryValidator>) => {
    setLoading(true);

    try {
      await createNewCategory(data, pathname);
      toast("Categoria criada");

      toggleOpen();
    } catch (error) {
      toast("Ocorreu um erro.");
      throw new Error("Can't create new category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={
          !categoryId
            ? form.handleSubmit(handleNewCategory)
            : form.handleSubmit(handleUpdateCategory)
        }
        className="space-y-2"
      >
        <FieldBuilder
          control={form.control}
          fieldElement={<Input />}
          name="title"
          title="Nome*"
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {categoryId ? "Atualizar" : "Confirmar"}
        </Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
