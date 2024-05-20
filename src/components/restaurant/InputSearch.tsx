"use client";
import { Input } from "../ui/input";
import { SelectItem } from "../ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import FieldBuilder from "../builders/FieldBuilder";
import { z } from "zod";
import { useAdminSearchForm } from "@/hooks/useAdminSearchForm";
import { searchValidation } from "@/validators/adminSearch";
import { NumericFormat } from "react-number-format";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Textarea } from "../ui/textarea";
import SelectBuilder from "../builders/SelectBuilder";
import { useState } from "react";
import Fence from "./Fence";
import { Checkbox } from "../ui/checkbox";
import { ImSpinner2 } from "react-icons/im";
import { paramsToObject } from "@/tools/paramsToObject";

interface InputSearchProps {
  restaurantId: string;
  disableParams?: boolean;
}

const InputSearch = ({ restaurantId, disableParams }: InputSearchProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [params, setParams] = useState(
    new URLSearchParams(searchParams.toString())
  );

  const form = useAdminSearchForm({
    defaultValues: disableParams
      ? { filter: {} }
      : {
          filter: paramsToObject(),
        },
  });
  const [loading, setLoading] = useState(false);

  const handleSearch = (data: z.infer<typeof searchValidation>) => {
    setLoading(true);

    setParams(new URLSearchParams());

    // @ts-ignore
    Object.entries(data.filter).map(([key, value]: [string, string]) => {
      if (value) params.set(key, value);
    });

    router.push(`/item/search/${restaurantId}?${params.toString()}`);

    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        className="flex mx-8 w-full gap-2"
        onSubmit={form.handleSubmit(handleSearch)}
      >
        <FieldBuilder
          control={form.control}
          fieldElement={
            <Input
              placeholder="Nome do item"
              onKeyDown={(e) =>
                e.key == "Enter" && form.handleSubmit(handleSearch)
              }
            />
          }
          name="filter.title"
        />

        <Sheet>
          <SheetTrigger>
            <Button type="button">Filtros</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filtros de pesquisa</SheetTitle>
              <SheetDescription>
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="filter.price"
                    render={({ field: { onChange } }) => (
                      <FormItem className="w-full">
                        <FormLabel>Preço</FormLabel>
                        <FormControl>
                          <NumericFormat
                            decimalSeparator=","
                            maxLength={8}
                            prefix="R$"
                            placeholder="R$0,00"
                            onValueChange={(values) =>
                              onChange(values.floatValue)
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <SelectBuilder
                    name="filter.active"
                    title="Status"
                    control={form.control}
                    selectItem={
                      <>
                        <SelectItem value="true">Ativo</SelectItem>
                        <SelectItem value="false">Inativo</SelectItem>
                      </>
                    }
                  />

                  <FieldBuilder
                    name="filter.description"
                    title="Descrição"
                    control={form.control}
                    fieldElement={<Textarea />}
                  />

                  <Fence className="!justify-start">
                    <div>
                      <FieldBuilder
                        control={form.control}
                        fieldElement={<Checkbox />}
                        name="sale"
                        type="checkbox"
                      />
                    </div>
                    <p>Promoção?</p>
                  </Fence>

                  <div className="flex gap-2">
                    <SheetClose className="w-full">
                      <Button className="w-full" type="button">
                        Fechar
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Button type="submit" variant="outline">
          {!loading ? "Buscar" : <ImSpinner2 className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};

export default InputSearch;
