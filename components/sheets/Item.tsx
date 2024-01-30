import { ReactNode, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { ButtonVariants } from "@/types/button";

interface ItemSheetProps {
  itemForm: ReactNode;
  triggerText: string | ReactNode;
  triggerVariant: ButtonVariants;
  sheetTitle: string | ReactNode;
  sheetDescription?: string;
  update?: boolean;
}

const ItemSheet = ({
  itemForm,
  triggerText,
  triggerVariant = "default",
  sheetTitle,
  sheetDescription,
  update,
}: ItemSheetProps) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button variant={triggerVariant} onClick={toggleOpen}>
        {triggerText}
      </Button>

      <SheetContent className="min-w-[30svw] h-[100svh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{sheetTitle}</SheetTitle>
          <SheetDescription>{sheetDescription}</SheetDescription>
        </SheetHeader>

        {itemForm}

        <SheetFooter className="h-20 flex flex-col items-center justify-center">
          <SheetClose asChild>
            <Button type="submit" className="w-full" variant="destructive">
              Cancelar
            </Button>
          </SheetClose>

          <SheetClose asChild>
            <Button type="submit" className="w-full">
              {update ? "Atualizar" : "Criar"}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ItemSheet;
