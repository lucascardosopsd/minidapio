import { useForm } from "react-hook-form";
import { RestaurantProps } from "@/types/restaurant";
import { zodResolver } from "@hookform/resolvers/zod";
import { restaurantValidator } from "@/validators/restaurant";

const mockDefault = {
  title: "",
  active: true,
  whatsapp: "",
  landline: "",
  address: "",
  methods: {
    pix: true,
    cash: true,
    debit: true,
    credit: true,
    bankCheck: false,
  },
  workHours: [
    {
      weekDay: "1",
      opened: true,
      times: {
        open: "00:00",
        close: "00:00",
      },
    },
  ],
  logo: "",
  color: "#ffaa00",
  linkMaps: "",
  note: "",
  activeMenu: true,
};

interface UseRestaurantFormProps {
  defaultValues?: RestaurantProps | undefined;
}

export const useRestaurantForm = ({
  defaultValues,
}: UseRestaurantFormProps) => {
  return useForm<RestaurantProps>({
    resolver: zodResolver(restaurantValidator),
    defaultValues: defaultValues ? defaultValues : mockDefault,
  });
};
