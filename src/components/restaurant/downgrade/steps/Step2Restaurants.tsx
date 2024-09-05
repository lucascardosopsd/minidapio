import { Card, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { PlanLimitProps } from "@/constants/planLimits";
import { FullRestaurantNestedProps } from "@/types/restaurant";
import { useState } from "react";

interface Step2RestaurantsProps {
  restaurants: FullRestaurantNestedProps[];
  limits: PlanLimitProps;
  callback?: (ids: string[]) => void;
}

const Step2Restaurants = ({
  restaurants,
  limits,
  callback,
}: Step2RestaurantsProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    if (!selected.some((selected) => selected == id)) {
      setSelected((prev) => [...prev, id]);
      callback && callback(selected);
    }

    if (selected.some((selected) => selected == id)) {
      setSelected((prev) => [...prev.filter((selected) => selected !== id)]);
      callback && callback(selected);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col h-[70svh] overflow-y-auto gap-2">
      <p className="text-2xl text-primary">Restaurantes</p>

      <p className="text-center">
        Seu plano comporta {limits.restaurants} e você tem {restaurants.length},
        portanto selecione {restaurants.length - limits.restaurants} para
        excluir e clique em "Próximo"
      </p>

      {restaurants.map((restaurant) => (
        <Card className="w-full" key={restaurant.id}>
          <label htmlFor={restaurant.id}>
            <CardHeader className="flex-row items-center gap-2">
              <Checkbox
                id={restaurant.id}
                name={restaurant.id}
                onClick={() => handleSelect(restaurant.id)}
                disabled={
                  selected.length >= limits.restaurants &&
                  !selected.some((id) => id == restaurant.id)
                }
              />
              <p className="font-semibold">{restaurant.title}</p>
            </CardHeader>
          </label>
        </Card>
      ))}

      {selected.length <
        restaurants.length - limits.restaurants - selected.length && (
        <p>
          Selecione {restaurants.length - limits.restaurants - selected.length}
        </p>
      )}
    </div>
  );
};

export default Step2Restaurants;
