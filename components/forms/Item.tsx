"use client";
import { useItemFormHook } from "@/hooks/useItemForm";
import { ItemProps } from "@/types/item";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { NumericFormat } from "react-number-format";
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
import { useState } from "react";
import { usePathname } from "next/navigation";
import { CategoriesWithItemsProps } from "@/types/category";
import { createNewItem } from "@/actions/item/createNewItem";
import { toast } from "sonner";

interface ItemFormProps {
  defaultValues?: Partial<ItemProps>;
  toggleOpen?: () => void;
  categoryId?: string;
  restaurantId: string;
  categories: CategoriesWithItemsProps[];
}

const ItemForm = ({
  defaultValues,
  categoryId,
  toggleOpen = () => {},
  restaurantId,
  categories,
}: ItemFormProps) => {
  const form = useItemFormHook({ defaultValues });
  const [loading, setLoading] = useState(false);
  const path = usePathname();

  const watchSale = useWatch({
    control: form.control,
    name: "sale",
    defaultValue: false,
  });

  const handleNewItem = async (data: z.infer<typeof ItemValidator>) => {
    data.restaurantId = restaurantId;

    setLoading(true);
    try {
      await createNewItem(data, path);
      toast("Item criado!");
      toggleOpen();
    } catch (error) {
      toast("Ocorreu um erro.");
      throw new Error("Error when create new item");
    } finally {
      setLoading(false);
    }
  };

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
          title="Descrição"
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field: { onChange } }) => (
            <FormItem className="w-full">
              <FormLabel>Price*</FormLabel>
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

        <div className="flex flex-col gap-1">
          <SelectBuilder
            control={form.control}
            name="categoryId"
            title="Categoria*"
            defaultValue={categoryId}
            setValue={form.setValue}
            selectItem={categories.map((category) => (
              <SelectItem value={category.id}>{category.title}</SelectItem>
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
