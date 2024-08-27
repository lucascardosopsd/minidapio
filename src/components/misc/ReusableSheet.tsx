import { CSSProperties, ReactNode } from "react";
import { Button } from "../ui/button";
import { ButtonVariants } from "@/types/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

interface ReusableSheetProps {
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
  triggerDisabled?: boolean;
}

const ReusableSheet = ({
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
  triggerDisabled,
}: ReusableSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpen}>
      <SheetTrigger asChild>
        <Button
          className={triggerClassName}
          variant={triggerVariant}
          style={triggerStyle}
          onClick={onClick}
          size={triggerSize}
          disabled={triggerDisabled}
        >
          {trigger}
        </Button>
      </SheetTrigger>

      <SheetContent className="h-svh">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between w-full">
            {title}
          </SheetTitle>
          <SheetDescription className="w-full text-end">
            {description}
          </SheetDescription>
        </SheetHeader>

        <div className="px-5 h-[calc(90svh)] overflow-y-auto py-5">
          {content}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ReusableSheet;
