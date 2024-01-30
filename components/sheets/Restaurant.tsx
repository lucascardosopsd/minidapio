import { ButtonVariants } from "@/types/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { ReactNode, useState } from "react";
import { Button } from "../ui/button";

interface RestaurantSheetProps {
  restaurantForm: ReactNode;
  triggerText: string | ReactNode;
  triggerVariant: ButtonVariants;
  sheetTitle: string | ReactNode;
  sheetDescription?: string;
}

const RestaurantSheet = ({
  restaurantForm,
  sheetTitle,
  triggerText,
  triggerVariant,
  sheetDescription,
}: RestaurantSheetProps) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button className="w-full" variant={triggerVariant} onClick={toggleOpen}>
        {triggerText}
      </Button>

      <SheetContent
        className="flex flex-col items-center gap-2 overflow-y-auto w-full h-[100svh]"
        side="bottom"
      >
        <SheetHeader>
          <SheetTitle>{sheetTitle}</SheetTitle>
          <SheetDescription>{sheetDescription}</SheetDescription>
        </SheetHeader>

        {restaurantForm}
      </SheetContent>
    </Sheet>
  );
};

export default RestaurantSheet;
