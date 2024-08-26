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
import { Textarea } from "@/components/ui/textarea";
import { planValidator } from "@/validators/plan";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plan } from "@prisma/client";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { z } from "zod";

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
      features: [""],
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

          <FieldBuilder
            control={form.control}
            name="level"
            title="Nível"
            fieldElement={<Input type="number" />}
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
        </div>

        <div className="flex flex-col">
          <p>Funciondalidades</p>
          <Textarea
            onChange={(e) => {
              const features: string[] = e.target.value.split(";");
              form.setValue("features", features);
            }}
          />

          <p className="text-xs">
            Separe cada funciondalidade por ponto e virgula (;)
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
