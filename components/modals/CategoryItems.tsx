import { CSSProperties, ReactNode, useState } from "react";
import { ButtonVariants } from "@/types/button";
import { ItemProps } from "@/types/item";
import CategoryItemsContent from "./content/CategoryItems";
import ReusableModal from "../ReusableModal";

interface CategoryItemsSheetProps {
  triggerText: string | ReactNode;
  triggerVariant: ButtonVariants;
  triggerClassname?: string;
  triggerStyle?: CSSProperties;
  themeColor: string;
  items: ItemProps[];
}

const CategoryItemsSheet = ({
  triggerText,
  triggerVariant,
  triggerClassname,
  themeColor,
  triggerStyle,
  items,
}: CategoryItemsSheetProps) => {
  const [open, setOpen] = useState(false);

  const title = (
    <div className="flex">
      <p className="text-muted-foreground text-xs">
        Inicio / Menu / {triggerText}
      </p>
    </div>
  );

  return (
    <ReusableModal
      trigger={triggerText}
      title={title}
      content={<CategoryItemsContent items={items} themeColor={themeColor} />}
      isOpen={open}
      onOpen={setOpen}
      triggerClassName={triggerClassname}
      triggerVariant={triggerVariant}
      triggerStyle={triggerStyle}
    />
  );
};

export default CategoryItemsSheet;
