"use client";

import { ReactNode, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { ButtonVariants } from "@/types/button";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface ConfirmModalProps {
  triggerText: string | ReactNode;
  triggerVariant?: ButtonVariants;
  triggerClassName?: string;
  dialogTitle: string;
  dialogDescription?: string | ReactNode;
  action: () => void;
}

const ConfirmModal = ({
  triggerText,
  triggerVariant = "destructive",
  dialogTitle,
  dialogDescription,
  triggerClassName,
  action,
}: ConfirmModalProps) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Button
        variant={triggerVariant}
        className={cn("bg-red-500", triggerClassName)}
        onClick={toggleOpen}
      >
        {triggerText}
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={action} asChild>
            <Button variant={triggerVariant} className={"bg-red-500"}>
              Confirmar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmModal;
