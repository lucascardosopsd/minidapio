"use client";
import { useCategoryForm } from "@/hooks/useCategoryForm";
import { Form } from "../../ui/form";
import { z } from "zod";
import { categoryValidator } from "@/validators/category";
import { Button } from "../../ui/button";
import FieldBuilder from "../../builders/FieldBuilder";
import { Input } from "../../ui/input";
import { isEmpty } from "@/tools/isEmpty";
import { Category } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";

interface CategoryFormProps {
  defaultValues?: Category | undefined;
  restaurantId: string;
  onSubmit: (data: z.infer<typeof categoryValidator>) => Promise<void>;
  loading: boolean;
}

const CategoryForm = ({
  defaultValues,
  restaurantId,
  onSubmit,
  loading,
}: CategoryFormProps) => {
  const form = useCategoryForm({
    defaultValues: defaultValues || { title: "", order: 0, restaurantId },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FieldBuilder
          control={form.control}
          fieldElement={<Input />}
          name="title"
          title="Nome*"
        />

        <p>Ordem</p>
        <Input
          type="number"
          {...form.register("order", {
            valueAsNumber: !isEmpty("order"),
          })}
        />

        <div className="flex items-center gap-2">
          <div>
            <FieldBuilder
              control={form.control}
              fieldElement={<Checkbox defaultChecked={true} />}
              name="active"
            />
          </div>
          <p>Ativo?</p>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {defaultValues ? "Atualizar" : "Confirmar"}
        </Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
