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
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { categories } from "@/mock/categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { z } from "zod";
import { ItemValidator } from "@/validators/item";
import { Checkbox } from "../ui/checkbox";
import Fence from "../Fence";
import { Textarea } from "../ui/textarea";

interface ItemFormProps {
  defaultValues?: Partial<ItemProps>;
}

const ItemForm = ({ defaultValues }: ItemFormProps) => {
  const form = useItemFormHook({ defaultValues });

  const [itemImg, setItemImg] = useState<string>("");

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setItemImg(URL.createObjectURL(file));
    }
  };

  const handleNewItem = async (data: z.infer<typeof ItemValidator>) => {};

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleNewItem)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição*</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço*</FormLabel>
              <FormControl>
                <NumericFormat
                  {...field}
                  decimalSeparator=","
                  maxLength={8}
                  prefix="R$"
                  placeholder="R$0,00"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="relative">
          <Input
            type="file"
            accept="image/*"
            id="logo"
            onChange={handleImageChange}
            className="hidden"
          />

          <label
            htmlFor="logo"
            className={`flex w-full h-80 border border-dashed relative items-center justify-center hover:border-primary transition cursor-pointer rounded ${
              itemImg && "border-primary"
            }`}
          >
            <p className="absolute bg-background z-10 p-2 text-primary rounded">
              {itemImg ? "Substituir imagem" : "Clique para subir a Imagem"}
            </p>
            {(itemImg || defaultValues?.image) && (
              <Image
                height={0}
                width={0}
                src={(itemImg || defaultValues?.image) ?? ""}
                alt="logo"
                sizes="1000px"
                className="h-full w-full absolute left-0 top-0 rounded object-cover"
              />
            )}
          </label>
        </div>

        <div className="flex gap-2">
          <Fence>
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      defaultChecked
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p>Ativo?</p>
          </Fence>

          <Fence>
            <FormField
              control={form.control}
              name="highlight"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      defaultChecked
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p>Destaque?</p>
          </Fence>

          <Fence>
            <FormField
              control={form.control}
              name="sale"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      defaultChecked
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p>Promoção?</p>
          </Fence>
        </div>

        {(defaultValues?.sale || form.getValues("sale")) && (
          <div>
            <p>Promoção</p>
            <FormField
              control={form.control}
              name="salePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço Promocional*</FormLabel>
                  <FormControl>
                    <NumericFormat
                      {...field}
                      defaultValue={
                        !field.value
                          ? (defaultValues?.salePrice &&
                              defaultValues?.salePrice) ||
                            0
                          : field.value || 0
                      }
                      prefix="R$"
                      thousandSeparator="."
                      decimalSeparator=","
                      maxLength={8}
                      placeholder="R$0,00"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <p>Categoria*</p>

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    defaultValue={
                      !field.value
                        ? (defaultValues?.categoryId &&
                            defaultValues?.categoryId.toString()) ||
                          ""
                        : field.value.toString()
                    }
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecionar Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem value={category.id.toString()}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default ItemForm;
