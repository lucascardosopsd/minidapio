"use client";
import { Input } from "./ui/input";
import { SelectItem } from "./ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import SelectBuilder from "./builders/SelectBuilder";
import { FaFilter } from "react-icons/fa6";
import FieldBuilder from "./builders/FieldBuilder";
import { z } from "zod";
import { useAdminSearchForm } from "@/hooks/useAdminSearchForm";
import { searchValidation } from "@/validators/adminSearch";

const InputSearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  const form = useAdminSearchForm();

  const handleSearch = (data: z.infer<typeof searchValidation>) => {
    Object.entries(data).map(([key, value]: [string, string]) =>
      params.set(key, value)
    );

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleClearParams = () => {
    searchParams.forEach((_, key) => params.delete(key));
    router.replace(`${pathname}?${params.toString()}`);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="flex mx-8 w-full gap-2"
        onSubmit={form.handleSubmit(handleSearch)}
      >
        <SelectBuilder
          control={form.control}
          name="filter"
          defaultValue={searchParams.get("filter"?.toString()) || "name"}
          placeholder={<FaFilter />}
          selectItem={
            <>
              <p className="ml-8 text-primary">Filtro</p>
              <Separator />
              <SelectItem value="title">Nome</SelectItem>
              <SelectItem value="category">Categoria</SelectItem>
              <SelectItem value="price">Preço</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </>
          }
        />
        <FieldBuilder
          control={form.control}
          fieldElement={<Input />}
          name="term"
          defaultValue={searchParams.get("term"?.toString()) || ""}
        />
        <Button
          type={params.size ? "button" : "submit"}
          variant="outline"
          onClick={() => params.size && handleClearParams()}
        >
          {searchParams.get("filter"?.toString()) ? "Limpar" : "Buscar"}
        </Button>
      </form>
    </Form>
  );
};

export default InputSearch;
