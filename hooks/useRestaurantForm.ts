import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { restaurantValidator } from "@/validators/restaurant";
import { RestaurantProps } from "@/types/restaurant";

const mockDefault = {
  title: "",
  active: true,
  phone1: "",
  phone2: "",
  address: "",
  methods: ["Dinheiro", "PIX", "Crédito", "Débito"],
  workHours: [
    {
      weekDay: "",
      opened: true,
      times: {
        open: "00:00",
        close: "00:00",
      },
    },
  ],
  logo: "",
  color: "",
  linkMaps: "",
  note: "",
  activeMenu: true,
};

interface UseRestaurantFormProps {
  defaultValues?: Omit<RestaurantProps, "id"> | undefined;
}

export const useRestaurantForm = ({
  defaultValues,
}: UseRestaurantFormProps) => {
  return useForm<RestaurantProps>({
    resolver: zodResolver(restaurantValidator),
    defaultValues: defaultValues ? defaultValues : mockDefault,
  });
};
