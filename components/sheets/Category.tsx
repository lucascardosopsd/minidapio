import { ReactNode, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ButtonVariants } from "@/types/button";
import { useCategoryForm } from "@/hooks/useCategoryForm";
import { CategoryProps } from "@/types/category";

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

  const toggleOpen = () => {
    setOpen(!open);
  };

  const form = useCategoryForm({ defaultValues });

  const HandleNewCategory = async () => {};

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
          <form onSubmit={form.handleSubmit(HandleNewCategory)}>
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
          </form>
        </Form>

        <SheetFooter className="py-2">
          <Button
            variant={triggerVariant}
            type="submit"
            className="w-full"
            onClick={toggleOpen}
          >
            {defaultValues ? "Atualizar" : "Confirmar"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CategorySheet;
