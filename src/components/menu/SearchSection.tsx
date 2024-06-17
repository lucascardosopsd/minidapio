"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CSSProperties, useState } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import SearchModal from "./SearchModal";
import { FullRestaurantProps } from "@/types/restaurant";
import { Item } from "@prisma/client";
import { fetchItemsByQuery } from "@/actions/item/fetchItemsByQuery";
import { toast } from "sonner";

interface SearchSectionProps {
  triggerClassName?: string;
  triggerStyles?: CSSProperties;
  inputClassName?: string;
  inputStyles?: CSSProperties;
  restaurant: FullRestaurantProps;
}

const SearchSection = ({
  triggerClassName,
  triggerStyles,
  inputClassName,
  inputStyles,
  restaurant,
}: SearchSectionProps) => {
  const [inputTerm, setInputTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Item[]>([] as Item[]);
  const [loading, setLoading] = useState(false);

  const handleToggleOpen = async () => {
    setLoading(true);

    setOpen(true);

    try {
      const items = await fetchItemsByQuery({
        where: {
          AND: [
            { restaurantId: restaurant.id },
            {
              title: {
                contains: inputTerm?.replace(/\s+$/, ""),
                mode: "insensitive",
              },
            },
          ],
        },
      });

      setItems(items);
    } catch (error) {
      toast.error("Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchModal
        isOpen={open}
        setOpen={setOpen}
        items={items}
        restaurant={restaurant}
        loading={loading}
      />

      <div className="p-5 flex flex-col gap-2">
        <div className="flex flex-1 justify-end w-full">
          <Input
            className={cn(
              "w-full placeholder:text-muted-foreground rounded-r-none border-r-0 shadow-md",
              inputClassName
            )}
            style={inputStyles}
            value={inputTerm}
            onChange={(e) => {
              setInputTerm(e.target.value);
            }}
            onKeyDown={(e) => e.key == "Enter" && handleToggleOpen()}
          />
          <Button
            size="icon"
            onClick={() => handleToggleOpen()}
            className={cn(
              "border-l-0 rounded-l-none text-muted-foreground text-lg shadow-md",
              triggerClassName
            )}
            style={triggerStyles}
            variant="outline"
          >
            <Search size={24} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchSection;
