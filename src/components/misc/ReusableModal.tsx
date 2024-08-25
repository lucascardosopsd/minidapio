import { CSSProperties, ReactNode } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { ButtonVariants } from "@/types/button";
import { X } from "lucide-react";

interface ReusableModalProps {
  trigger: string | ReactNode;
  title: string | ReactNode;
  content: string | ReactNode;
  description?: string;
  footer?: string | ReactNode;
  isOpen?: boolean;
  onOpen?: (open: boolean) => void;
  triggerClassName?: string;
  triggerVariant?: ButtonVariants;
  triggerStyle?: CSSProperties;
  onClick?: () => void;
  triggerSize?: "default" | "sm" | "lg" | "icon" | null | undefined;
}

const ReusableModal = ({
  trigger,
  title,
  content,
  isOpen,
  onOpen,
  description,
  triggerClassName,
  triggerVariant,
  triggerStyle,
  triggerSize,
  onClick,
}: ReusableModalProps) => {
  return (
    <Drawer open={isOpen} onOpenChange={onOpen}>
      <DrawerTrigger asChild>
        <Button
          className={triggerClassName}
          variant={triggerVariant}
          style={triggerStyle}
          onClick={onClick}
          size={triggerSize}
        >
          {trigger}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="h-svh">
        <DrawerHeader>
          <DrawerTitle className="flex items-center justify-between w-full">
            {title}
            <DrawerClose
              asChild
              className="cursor-pointer hover:scale-125 transition"
            >
              <X />
            </DrawerClose>
          </DrawerTitle>
          <DrawerDescription className="w-full text-end">
            {description}
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-8 h-svh overflow-y-auto">{content}</div>
      </DrawerContent>
    </Drawer>
  );
};

export default ReusableModal;
