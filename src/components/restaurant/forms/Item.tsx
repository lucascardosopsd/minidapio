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
import { Copy } from "lucide-react";
import { copyToClipboard } from "@/tools/copyToClipboard";
import Image from "next/image";
import { useState } from "react";
import { testImgLoad } from "@/lib/testImgLoad";
import { toast } from "sonner";

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

  const [imgUrl, setImgUrl] = useState("");

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
          fieldElement={<Textarea maxLength={300} />}
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
                  valueIsNumericString
                  decimalScale={2}
                  maxLength={8}
                  prefix="R$"
                  placeholder="R$0,00"
                  onValueChange={(values) => {
                    field.onChange(values.floatValue);
                  }}
                  value={field.value}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!imgUrl && <UploadImage control={form.control} name="image" />}

        {!imgUrl && !form.watch("image") && (
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>URL da Imagem</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ou cole o link da imagem"
                    onChange={(e) => {
                      testImgLoad({
                        url: e.target.value,
                        callback: (url: string, result) => {
                          if (result == "error") {
                            toast.error("Cole uma URL válida");

                            return;
                          }

                          if (result == "timeout") {
                            toast.error("Imagem não pode ser carregada");

                            return;
                          }

                          field.onChange(e.target.value);
                          setImgUrl(e.target.value);
                        },
                      });
                    }}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {imgUrl && (
          <div className="relative">
            <Image
              alt="Imagem do produto"
              src={form.watch("image")}
              height={500}
              width={500}
              className="w-full h-auto rounded"
            />

            <span
              className="flex items-center opacity-0 hover:opacity-100 transition justify-center gap-2 absolute w-full h-full rounded border border-primary border-dashed z-50 top-0 bg-background/50"
              onClick={() => {
                form.resetField("image");
                setImgUrl("");
              }}
            >
              <p className="font-semibold select-none">substituir</p>
            </span>
          </div>
        )}

        {form.watch("image") && defaultValues && (
          <Button
            type="button"
            className="flex gap-2"
            onClick={() =>
              copyToClipboard(form.watch("image"), "", "Link copiado!")
            }
          >
            Link da Imagem <Copy />
          </Button>
        )}

        {form.watch("image") && !imgUrl && (
          <Button
            type="button"
            className="flex gap-2"
            onClick={() => {
              form.resetField("image");
              setImgUrl("");
            }}
          >
            Substituir por URL
          </Button>
        )}

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
