"use client";
import FieldBuilder from "@/components/builders/FieldBuilder";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useVariantForm } from "@/hooks/useVariantForm";
import { ExposedToggleModalProps } from "@/types/common";
import { VariantProps } from "@/types/variant";
import {
  forwardRef,
  ReactNode,
  Ref,
  useImperativeHandle,
  useState,
} from "react";

type VariantFormProps = {
  onSubmit: (data: VariantProps) => Promise<void>;
  defaultValues?: VariantProps;
  trigger: string | ReactNode;
  loading?: boolean;
};

const VariantForm = (
  { onSubmit, defaultValues, trigger, loading }: VariantFormProps,
  ref: Ref<ExposedToggleModalProps>
) => {
  const [open, setOpen] = useState(false);

  const form = useVariantForm({ defaultValues });

  useImperativeHandle(ref, () => ({
    toggleModal: () => {
      setOpen((prev) => !prev);
    },
  }));

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>

      <SheetContent className="h-svh overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Nova Variação</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              onSubmit(data);
              form.reset();
            })}
            className="flex flex-col gap-5 py-5"
          >
            <FieldBuilder
              title="Nome da variação"
              control={form.control}
              fieldElement={<Input />}
              name="title"
            />

            <Button type="submit" disabled={loading}>
              Confirmar
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default forwardRef<ExposedToggleModalProps, VariantFormProps>(
  VariantForm
);
