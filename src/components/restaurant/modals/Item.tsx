"use client";

import { ReactElement, ReactNode, cloneElement, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../ui/sheet";
import { Button } from "../../ui/button";
import { ButtonVariants } from "@/types/button";

interface ItemSheetProps {
  itemForm: ReactElement;
  triggerText: string | ReactNode;
  triggerVariant: ButtonVariants;
  sheetTitle: string | ReactNode;
  sheetDescription?: string;
  triggerStyles?: string;
  triggerSize?: "default" | "sm" | "lg" | "icon" | null | undefined;
}

const ItemSheet = ({
  itemForm,
  triggerText,
  triggerVariant = "default",
  sheetTitle,
  sheetDescription,
  triggerStyles,
  triggerSize = "default",
}: ItemSheetProps) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        variant={triggerVariant}
        onClick={toggleOpen}
        className={triggerStyles}
        size={triggerSize}
      >
        {triggerText}
      </Button>

      <SheetContent className="!h-[100svh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{sheetTitle}</SheetTitle>
          <SheetDescription>{sheetDescription}</SheetDescription>
        </SheetHeader>

        {cloneElement(itemForm, { toggleOpen: toggleOpen })}
      </SheetContent>
    </Sheet>
  );
};

export default ItemSheet;
