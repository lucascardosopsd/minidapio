import { useForm } from "react-hook-form";
import { RestaurantProps } from "@/types/restaurant";
import { zodResolver } from "@hookform/resolvers/zod";
import { restaurantValidator } from "@/validators/restaurant";

interface UseRestaurantFormProps {
  defaultValues?: Partial<RestaurantProps> | undefined;
}

export const useRestaurantForm = ({
  defaultValues,
}: UseRestaurantFormProps) => {
  return useForm<RestaurantProps>({
    resolver: zodResolver(restaurantValidator),
    defaultValues: defaultValues || {
      state: "SP",
      methods: {
        cash: true,
        credit: true,
        debit: true,
        pix: true,
      },
      workHours: [
        {
          weekday: 1,
          opened: true,
          times: {
            open: "18:00",
            close: "23:00",
          },
        },
      ],
    },
  });
};
