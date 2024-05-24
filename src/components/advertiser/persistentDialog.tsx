import { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface PersistentDialogProps {
  title: string | ReactNode;
  description: string | ReactNode;
  open?: boolean;
  onOpenChange?: () => void;
}

const PersistentDialog = ({
  title,
  description,
  open,
  onOpenChange,
}: PersistentDialogProps) => {
  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PersistentDialog;
