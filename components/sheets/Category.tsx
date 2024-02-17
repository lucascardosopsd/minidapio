import { ReactNode, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Form } from "../ui/form";
import { ButtonVariants } from "@/types/button";
import { useCategoryForm } from "@/hooks/useCategoryForm";
import { CategoryProps } from "@/types/category";
import { z } from "zod";
import { categoryValidator } from "@/validators/category";
import { toast } from "sonner";
import { createNewCategory } from "@/actions/category/createNewCategory";
import { usePathname } from "next/navigation";
import FieldBuilder from "../builders/FieldBuilder";

interface CategorySheetProps {
  defaultValues?: CategoryProps | undefined;
  triggerText: string | ReactNode;
  triggerVariant: ButtonVariants;
  sheetTitle: string | ReactNode;
  sheetDescription?: string;
  triggerClassname?: string;
}

const CategorySheet = ({
  defaultValues,
  triggerText,
  triggerVariant,
  sheetTitle,
  sheetDescription,
  triggerClassname,
}: CategorySheetProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const urlPath = usePathname();

  const toggleOpen = () => {
    setOpen(!open);
  };

  const form = useCategoryForm({ defaultValues });

  const handleNewCategory = async (data: z.infer<typeof categoryValidator>) => {
    setLoading(true);

    try {
      await createNewCategory(data, urlPath);
      toast("Categoria criada!");
    } catch (error) {
      console.log(error);
      toast("Ocorreu um erro.");
      throw new Error("Can't create new category");
    } finally {
      toggleOpen();
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className={triggerClassname}>
        <Button>{triggerText}</Button>
      </SheetTrigger>

      <SheetContent className="w-svw tablet:w-[50svw]">
        <SheetHeader>
          <SheetTitle>{sheetTitle}</SheetTitle>
          <SheetTitle>{sheetDescription}</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleNewCategory)}
            className="space-y-2"
          >
            <FieldBuilder
              control={form.control}
              fieldElement={<Input />}
              name="title"
              title="Nome*"
            />
            <Button
              variant={triggerVariant}
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {defaultValues ? "Atualizar" : "Confirmar"}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default CategorySheet;
