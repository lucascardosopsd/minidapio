import { CSSProperties, ReactNode } from "react";
import { DrawerDescription } from "../ui/drawer";
import { Button } from "../ui/button";
import { ButtonVariants } from "@/types/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface ReusableDialogProps {
  trigger?: string | ReactNode;
  title: string | ReactNode;
  content: string | ReactNode;
  description?: string;
  footer?: string | ReactNode;
  isOpen?: boolean;
  onOpen?: (open: boolean) => void;
  triggerClassName?: string;
  triggerVariant?: ButtonVariants;
  triggerStyle?: CSSProperties;
  onSubmit?: () => void;
  submitTitle?: string;
  submitVariant?: ButtonVariants;
  submitClassName?: string;
  loading?: boolean;
}

const ReusableDialog = ({
  trigger,
  title,
  content,
  isOpen,
  onOpen,
  description,
  triggerClassName,
  triggerVariant,
  triggerStyle,
  onSubmit,
  submitTitle = "Confirmar",
  loading = false,
  submitVariant,
  submitClassName,
}: ReusableDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpen}>
      <DialogTrigger asChild>
        {trigger && (
          <Button
            className={triggerClassName}
            variant={triggerVariant}
            style={triggerStyle}
          >
            {trigger}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between w-full">
            {title}
          </DialogTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DialogHeader>

        <div className="px-8 overflow-y-auto">{content}</div>

        {onSubmit && (
          <DialogFooter>
            <Button
              type="submit"
              onClick={onSubmit}
              disabled={loading}
              variant={submitVariant}
              className={submitClassName}
            >
              {submitTitle}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReusableDialog;
