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
  isOpen?: boolean;
  onOpen?: (open: boolean) => void;
  triggerClassName?: string;
  triggerVariant?: ButtonVariants;
  triggerStyle?: CSSProperties;
  closeTriggerClassName?: string;
  closeTriggerStyle?: CSSProperties;
  onClick?: () => void;
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
  closeTriggerClassName,
  closeTriggerStyle,
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
        >
          {trigger}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="h-svh">
        <DrawerHeader>
          <DrawerTitle className="flex items-center justify-between w-full">
            <DrawerClose asChild>
              <FaChevronLeft
                style={closeTriggerStyle}
                className={closeTriggerClassName}
              />
            </DrawerClose>
            {title}
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
