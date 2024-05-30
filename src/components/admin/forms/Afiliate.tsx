import FieldBuilder from "@/components/builders/FieldBuilder";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAfiliateForm } from "@/hooks/useAfiliateForm";
import { afiliateValidator } from "@/validators/afiliate";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

interface AfiliateFormProps {
  defaultValues?: z.infer<typeof afiliateValidator> | undefined;
  onSubmit: (data: z.infer<typeof afiliateValidator>) => Promise<void>;
  loading: boolean;
}

const AfiliateForm = ({
  defaultValues,
  onSubmit,
  loading,
}: AfiliateFormProps) => {
  const form = useAfiliateForm({ defaultValues });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FieldBuilder
          name="name"
          title="Nome"
          control={form.control}
          fieldElement={<Input />}
        />

        <FieldBuilder
          name="email"
          title="E-mail"
          control={form.control}
          fieldElement={<Input type="email" />}
        />

        <FieldBuilder
          name="phone"
          title="Telefone"
          control={form.control}
          fieldElement={<PatternFormat format="+55(##)#####-####" />}
        />

        <FieldBuilder
          name="pix"
          title="Chave PIX"
          control={form.control}
          fieldElement={<Input />}
        />

        <FieldBuilder
          name="kickback"
          title="Comissão(%)"
          control={form.control}
          fieldElement={<Input type="number" defaultValue={70} />}
        />

        <Button type="submit" disabled={loading} className="w-full">
          Confirmar
        </Button>
      </form>
    </Form>
  );
};

export default AfiliateForm;
