"use client";
import { useItemFormHook } from "@/hooks/useItemForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { NumericFormat } from "react-number-format";
import { SelectItem } from "../../ui/select";
import { z } from "zod";
import { ItemValidator } from "@/validators/item";
import { Checkbox } from "../../ui/checkbox";
import Fence from "../Fence";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import FieldBuilder from "../../builders/FieldBuilder";
import UploadImage from "../../misc/UploadImage";
import { useWatch } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import SelectBuilder from "../../builders/SelectBuilder";
import { CategoriesWithItemsProps } from "@/types/category";
import { isEmpty } from "@/tools/isEmpty";
import { Item } from "@prisma/client";

interface ItemFormProps {
  defaultValues?: Item;
  categoryId?: string;
  loading: boolean;
  categories: CategoriesWithItemsProps[];
  onSubmit: (data: z.infer<typeof ItemValidator>) => Promise<void>;
  itemId?: string;
}

const ItemForm = ({
  defaultValues = undefined,
  categoryId,
  loading,
  categories,
  onSubmit,
}: ItemFormProps) => {
  const form = useItemFormHook({
    defaultValues: defaultValues || { categoryId, active: true, order: 0 },
  });

  const watchSale = useWatch({
    control: form.control,
    name: "sale",
    defaultValue: false,
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
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
          title="Descrição"
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <NumericFormat
                  decimalSeparator=","
                  maxLength={8}
                  prefix="R$"
                  placeholder="R$0,00"
                  value={field.value}
                  onValueChange={(values) => field.onChange(values.floatValue)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <UploadImage control={form.control} name="image" />

        <div className="flex flex-col gap-2">
          <Fence className="!justify-start">
            <div>
              <FieldBuilder
                control={form.control}
                fieldElement={
                  <Checkbox
                    defaultChecked={
                      defaultValues?.active && defaultValues?.active
                    }
                  />
                }
                name="active"
                type="checkbox"
              />
            </div>
            <p>Ativo?</p>
          </Fence>

          <Fence className="!justify-start">
            <div>
              <FieldBuilder
                control={form.control}
                fieldElement={
                  <Checkbox
                    defaultChecked={
                      defaultValues?.highlight && defaultValues?.highlight
                    }
                  />
                }
                name="highlight"
                type="checkbox"
              />
            </div>
            <p>Destacar?</p>
          </Fence>

          <Fence className="!justify-start">
            <div>
              <FieldBuilder
                control={form.control}
                fieldElement={
                  <Checkbox
                    defaultChecked={defaultValues?.sale && defaultValues?.sale}
                  />
                }
                name="sale"
                type="checkbox"
              />
            </div>
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
              <FormField
                control={form.control}
                name="salePrice"
                render={({ field: { onChange } }) => (
                  <FormItem className="w-full">
                    <FormLabel>Preço Promocional*</FormLabel>
                    <FormControl>
                      <NumericFormat
                        decimalSeparator=","
                        maxLength={8}
                        prefix="R$"
                        placeholder="R$0,00"
                        onValueChange={(values) => onChange(values.floatValue)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <p>Ordem</p>
        <Input
          type="number"
          {...form.register("order", {
            valueAsNumber: !isEmpty("order"),
          })}
        />

        <div className="flex flex-col gap-1">
          <SelectBuilder
            control={form.control}
            name="categoryId"
            title="Categoria*"
            selectItem={categories.map((category) => (
              <SelectItem value={category.id}>{category.title}</SelectItem>
            ))}
            placeholder="Selecione a categoria"
          />
        </div>

        <div className="flex gap-2 items-center">
          <Button
            variant="default"
            className="w-full"
            type="submit"
            disabled={loading}
          >
            {defaultValues ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ItemForm;
