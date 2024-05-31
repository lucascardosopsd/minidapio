import { Form } from "@/components/ui/form";
import { useUserForm } from "@/hooks/useUserForm";
import { z } from "zod";
import { userValidatorSchema } from "@/validators/user";
import FieldBuilder from "@/components/builders/FieldBuilder";
import { Input } from "@/components/ui/input";
import UploadImage from "@/components/misc/UploadImage";
import SelectBuilder from "@/components/builders/SelectBuilder";
import { SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";

interface UserFormProps {
  defaultValues?: User;
  onSubmit: (data: z.infer<typeof userValidatorSchema>) => Promise<void>;
  loading: boolean;
}

const UserForm = ({ defaultValues, onSubmit, loading }: UserFormProps) => {
  const form = useUserForm({ defaultValues });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md mx-auto flex flex-col gap-5"
      >
        <div className="flex flex-col">
          <p className="text-xs font-semibold">Imagem</p>
          <UploadImage control={form.control} name="image" />
        </div>

        <FieldBuilder
          control={form.control}
          name="name"
          title="Nome"
          fieldElement={<Input />}
        />

        <FieldBuilder
          control={form.control}
          name="email"
          title="Email"
          disabled
          fieldElement={<Input disabled />}
        />

        <SelectBuilder
          control={form.control}
          name="role"
          title="Função"
          selectItem={
            <>
              <SelectItem value="admin">Administrador</SelectItem>
              <SelectItem value="user">Usuário</SelectItem>
              <SelectItem value="advertiser">Anunciante</SelectItem>
              <SelectItem value="afiliate">Afiliado</SelectItem>
            </>
          }
        />

        <Button className="self-end" disabled={loading}>
          Confirmar
        </Button>
      </form>
    </Form>
  );
};

export default UserForm;
