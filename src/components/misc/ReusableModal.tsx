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
import { FaChevronLeft } from "react-icons/fa6";

interface ReusableModalProps {
  trigger: string | ReactNode;
  title: string | ReactNode;
  content: string | ReactNode;
  description?: string;
  footer?: string | ReactNode;
  isOpen: boolean;
  onOpen: (open: boolean) => void;
  triggerClassName?: string;
  triggerVariant?: ButtonVariants;
  triggerStyle?: CSSProperties;
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
}: ReusableModalProps) => {
  return (
    <Drawer open={isOpen} onOpenChange={onOpen}>
      <DrawerTrigger asChild>
        <Button
          className={triggerClassName}
          variant={triggerVariant}
          style={triggerStyle}
        >
          {trigger}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="h-svh">
        <DrawerHeader>
          <DrawerTitle className="flex items-center justify-between w-full">
            <DrawerClose asChild>
              <FaChevronLeft style={triggerStyle} />
            </DrawerClose>
            {title}
          </DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>

        <div className="px-8 h-svh overflow-y-auto">{content}</div>
      </DrawerContent>
    </Drawer>
  );
};

export default ReusableModal;
