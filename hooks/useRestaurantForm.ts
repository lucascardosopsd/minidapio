import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { restaurantValidator } from "@/validators/restaurant";
import { RestaurantProps } from "@/types/restaurant";

export const useRestaurantForm = () => {
  return useForm<RestaurantProps>({
    resolver: zodResolver(restaurantValidator),
    defaultValues: {
      title: "",
      active: true,
      phone1: "",
      phone2: "",
      address: "",
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
    },
  });
};
