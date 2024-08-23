import { useForm } from "react-hook-form";
import { RestaurantProps } from "@/types/restaurant";
import { zodResolver } from "@hookform/resolvers/zod";
import { restaurantValidator } from "@/validators/restaurant";

interface UseRestaurantFormProps {
  defaultValues?: RestaurantProps | undefined;
}

export const useRestaurantForm = ({
  defaultValues,
}: UseRestaurantFormProps) => {
  return useForm<RestaurantProps>({
    resolver: zodResolver(restaurantValidator),
    defaultValues: defaultValues || { state: "SP" },
  });
};
