import FieldBuilder from "@/components/builders/FieldBuilder";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { planValidator } from "@/validators/plan";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plan } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { z } from "zod";
import dynamic from "next/dynamic";
import { Checkbox } from "@/components/ui/checkbox";
const RichTextEditor = dynamic(() => import("@/components/misc/Richtext"), {
  ssr: false,
});

interface PlanFormProps {
  onSubmit: (data: z.infer<typeof planValidator>) => void;
  loading: boolean;
  defaultValues: Plan | null;
}

const PlanForm = ({ onSubmit, loading, defaultValues }: PlanFormProps) => {
  const form = useForm({
    defaultValues: defaultValues || {
      title: "",
      subTitle: "",
      alias: "",
      level: 0,
      price: 0,
      description: "",
      highlighted: false,
      url: "",
    },
    resolver: zodResolver(planValidator),
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5 h-[calc(100svh-20svh)] overflow-y-auto max-w-[500px] mx-auto"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldBuilder
          control={form.control}
          name="title"
          title="Nome"
          fieldElement={<Input />}
        />

        <FieldBuilder
          control={form.control}
          name="subTitle"
          title="Sub Título"
          fieldElement={<Input />}
        />

        <div className="flex gap-5">
          <FieldBuilder
            control={form.control}
            name="alias"
            title="Apelido"
            fieldElement={<Input />}
          />

          <div className="flex flex-col gap-2">
            <p>Nível</p>
            <Input
              {...form.register("level", {
                valueAsNumber: true,
              })}
            />
            {form.formState.errors.level && (
              <span>{form.formState.errors.level.message}</span>
            )}
          </div>

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

          <div className="flex flex-col items-center gap-2">
            <p>Destacar</p>
            <FormField
              control={form.control}
              name="highlighted"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(e) => field.onChange(e)}
                      onBlur={field.onBlur}
                      className="w-10 h-10"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex">
          <FieldBuilder
            name="url"
            title="Rota"
            control={form.control}
            disabled
            fieldElement={
              <Input placeholder={`/payment/${form.watch("alias")}`} />
            }
          />
          <p></p>
        </div>

        <div className="flex flex-col gap-2">
          <p>Funciondalidades</p>
          <Controller
            name="description"
            rules={{ required: true }}
            control={form.control}
            defaultValue=""
            render={({ field }) => (
              <RichTextEditor onChange={field.onChange} value={field.value} />
            )}
          />
          <p className="text-xs">
            {form.formState.errors.description?.message}
          </p>
        </div>

        <Button type="submit" disabled={loading}>
          Salvar
        </Button>
      </form>
    </Form>
  );
};

export default PlanForm;
