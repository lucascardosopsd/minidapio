import { CSSProperties, ReactNode, useState } from "react";
import { ButtonVariants } from "@/types/button";
import { FullRestaurantProps } from "@/types/restaurant";
import ReusableModal from "../ReusableModal";
import CategoriesModalContent from "./content/Categories";

interface CategoriesSheetProps {
  triggerText: string | ReactNode;
  triggerVariant: ButtonVariants;
  triggerClassname?: string;
  triggerStyle?: CSSProperties;
  themeColor: string;
  restaurant: FullRestaurantProps;
}

const CategoriesSheet = ({
  triggerText,
  triggerVariant,
  triggerClassname,
  themeColor,
  restaurant,
  triggerStyle,
}: CategoriesSheetProps) => {
  const [open, setOpen] = useState(false);

  const title = (
    <div className="flex">
      <p className="text-muted-foreground text-xs">Inicio / Menu</p>
    </div>
  );

  return (
    <ReusableModal
      trigger={triggerText}
      title={title}
      content={
        <CategoriesModalContent
          items={restaurant.Items}
          categories={restaurant.Categories}
          themeColor={themeColor}
        />
      }
      isOpen={open}
      onOpen={setOpen}
      triggerClassName={triggerClassname}
      triggerVariant={triggerVariant}
      triggerStyle={triggerStyle}
    />
  );
};

export default CategoriesSheet;
