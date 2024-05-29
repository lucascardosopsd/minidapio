import FieldBuilder from "@/components/builders/FieldBuilder";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAfiliateForm } from "@/hooks/useAfiliateForm";
import { afiliateValidator } from "@/validators/afiliate";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

interface AfiliateFormProps {
  defaultValues?: z.infer<typeof afiliateValidator> | undefined;
  onSubmit: (data: z.infer<typeof afiliateValidator>) => Promise<void>;
}

const AfiliateForm = ({ defaultValues, onSubmit }: AfiliateFormProps) => {
  const form = useAfiliateForm({ defaultValues });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
          name="kickback"
          title="comissão"
          control={form.control}
          fieldElement={<Input type="number" defaultValue={70} />}
        />
      </form>
    </Form>
  );
};

export default AfiliateForm;
