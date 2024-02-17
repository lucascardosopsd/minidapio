"use client";
import { useItemFormHook } from "@/hooks/useItemForm";
import { ItemProps } from "@/types/item";
import { Form } from "../ui/form";
import { Input } from "../ui/input";

import { NumericFormat } from "react-number-format";
import { categories } from "@/mock/categories";
import { SelectItem } from "../ui/select";
import { z } from "zod";
import { ItemValidator } from "@/validators/item";
import { Checkbox } from "../ui/checkbox";
import Fence from "../Fence";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import FieldBuilder from "../builders/FieldBuilder";
import UploadImage from "../UploadImage";
import { useWatch } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import SelectBuilder from "../builders/SelectBuilder";

interface ItemFormProps {
  defaultValues?: Partial<ItemProps>;
  toggleOpen?: () => void;
  categoryId?: string;
}

const ItemForm = ({
  defaultValues,
  categoryId,
  toggleOpen = () => {},
}: ItemFormProps) => {
  const form = useItemFormHook({ defaultValues });

  const watchSale = useWatch({
    control: form.control,
    name: "sale",
    defaultValue: false,
  });

  const handleNewItem = async (data: z.infer<typeof ItemValidator>) => {};

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleNewItem)}
      >
        <FieldBuilder
          control={form.control}
          fieldElement={<Input />}
          name="title"
          title="Nome*"
        />

        <FieldBuilder
          control={form.control}
          fieldElement={<Textarea />}
          name="description"
          title="Descrição*"
        />

        <FieldBuilder
          control={form.control}
          fieldElement={
            <NumericFormat
              decimalSeparator=","
              maxLength={8}
              prefix="R$"
              placeholder="R$0,00"
            />
          }
          name="price"
          title="Preço*"
        />

        <UploadImage control={form.control} name="image" />

        <div className="flex gap-2">
          <Fence>
            <FieldBuilder
              control={form.control}
              fieldElement={
                <Checkbox defaultChecked={defaultValues?.active ?? true} />
              }
              name="active"
              type="checkbox"
            />
            <p>Ativo?</p>
          </Fence>

          <Fence>
            <FieldBuilder
              control={form.control}
              fieldElement={
                <Checkbox defaultChecked={defaultValues?.highlight ?? false} />
              }
              name="highlight"
              type="checkbox"
            />
            <p>Destacar?</p>
          </Fence>

          <Fence>
            <FieldBuilder
              control={form.control}
              fieldElement={
                <Checkbox defaultChecked={defaultValues?.highlight ?? false} />
              }
              name="sale"
              type="checkbox"
            />
            <p>Promoção?</p>
          </Fence>
        </div>

        <AnimatePresence>
          {(defaultValues?.sale || watchSale) && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <p>Promoção</p>
              <FieldBuilder
                name="salePrice"
                title="Preço Promocional*"
                type="checkbox"
                control={form.control}
                fieldElement={
                  <NumericFormat
                    defaultValue={defaultValues?.salePrice}
                    prefix="R$"
                    thousandSeparator="."
                    decimalSeparator=","
                    maxLength={8}
                    placeholder="R$0,00"
                  />
                }
                fieldClassName="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-1">
          <p>Categoria*</p>

          <SelectBuilder
            control={form.control}
            name="categoryId"
            title="Categoria*"
            defaultValue={defaultValues?.categoryId?.toString() || categoryId}
            selectItem={categories.map((category) => (
              <SelectItem value={category.id.toString()}>
                {category.title}
              </SelectItem>
            ))}
            placeholder="Selecione a categoria"
          />
        </div>

        <div className="flex gap-2 items-center">
          <Button
            variant="destructive"
            className="w-full"
            type="button"
            onClick={toggleOpen}
          >
            Cancelar
          </Button>

          <Button variant="default" className="w-full" type="submit">
            {defaultValues ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ItemForm;
