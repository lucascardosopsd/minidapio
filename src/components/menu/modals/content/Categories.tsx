import ReusableModal from "@/components/misc/ReusableModal";
import { CategoriesWithItemsProps } from "@/types/category";
import { ItemProps } from "@/types/item";
import { FullRestaurantProps } from "@/types/restaurant";
import CategoryItemsContent from "./CategoryItems";
import ItemCard from "../../cards/Item";
import { Separator } from "@/components/ui/separator";
import { adStore } from "@/context/ads";
import { pickAd } from "@/actions/pickAd";

interface CategoriesModalContentProps {
  items: ItemProps[];
  categories: CategoriesWithItemsProps[];
  themeColor: string;
  restaurant: FullRestaurantProps;
}

const CategoriesModalContent = ({
  items,
  categories,
  themeColor,
  restaurant,
}: CategoriesModalContentProps) => {
  const { setCurrentAd } = adStore();

  const handlePickAd = async () => {
    const ad = await pickAd({
      regionId: restaurant.regionId!,
    });

    setCurrentAd(ad);
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden flex flex-col mt-5 relative gap-4 ">
      <ReusableModal
        trigger="Ver todos"
        title={<span style={{ color: themeColor }}>Todos</span>}
        triggerClassName="flex justify-center font-bold"
        triggerStyle={{ borderColor: themeColor, background: themeColor }}
        content={
          <div className="max-w-lg mx-auto">
            <CategoryItemsContent
              items={restaurant.Items}
              themeColor={themeColor}
              restaurantId={restaurant.id}
            />
          </div>
        }
      />

      <Separator />

      <p>Destaques</p>
      <div className="flex flex-col items-center gap-5">
        {items?.length &&
          items
            .filter((item: ItemProps) => item.highlight)
            .map((item) => <ItemCard item={item} themeColor={themeColor} />)}
      </div>

      <Separator />

      <p>Categorias</p>
      <div className="flex flex-col gap-5 pb-10">
        {categories &&
          categories.map(
            (category) =>
              !!category.items?.length && (
                <ReusableModal
                  trigger={category.title}
                  title={
                    <span style={{ color: themeColor }}>{category.title}</span>
                  }
                  triggerClassName="flex justify-start"
                  triggerVariant="outline"
                  triggerStyle={{ borderColor: themeColor }}
                  onClick={() => handlePickAd()}
                  content={
                    <div className="max-w-lg mx-auto">
                      <CategoryItemsContent
                        items={category.items!}
                        themeColor={themeColor}
                        restaurantId={restaurant.id}
                      />
                    </div>
                  }
                />
              )
          )}
      </div>
    </div>
  );
};

export default CategoriesModalContent;
