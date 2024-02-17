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
} from "./ui/alert-dialog";
import { ButtonVariants } from "@/types/button";
import { Button } from "./ui/button";

interface DeleteModalProps {
  triggerText: string | ReactNode;
  triggerVariant: ButtonVariants;
  dialogTitle: string;
  dialogDescription?: string | ReactNode;
  action: () => void;
}

const DeleteModal = ({
  triggerText,
  triggerVariant,
  dialogTitle,
  dialogDescription,
  action,
}: DeleteModalProps) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Button variant={triggerVariant} onClick={toggleOpen}>
        {triggerText}
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={action}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
