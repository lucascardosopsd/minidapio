import { ButtonVariants } from "@/types/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { ReactElement, ReactNode, cloneElement, useState } from "react";
import { Button } from "../ui/button";

interface RestaurantSheetProps {
  restaurantForm: ReactElement;
  triggerText: string | ReactNode;
  triggerVariant: ButtonVariants;
  sheetTitle: string | ReactNode;
  sheetDescription?: string;
  triggerClassname?: string;
}

const RestaurantSheet = ({
  restaurantForm,
  sheetTitle,
  triggerText,
  triggerVariant,
  sheetDescription,
  triggerClassname,
}: RestaurantSheetProps) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        className={triggerClassname}
        variant={triggerVariant}
        onClick={toggleOpen}
      >
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

        {cloneElement(restaurantForm, { toggleOpen: toggleOpen })}
      </SheetContent>
    </Sheet>
  );
};

export default RestaurantSheet;
