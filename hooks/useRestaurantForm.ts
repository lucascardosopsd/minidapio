import { useForm } from "react-hook-form";
import { RestaurantProps } from "@/types/restaurant";
import { zodResolver } from "@hookform/resolvers/zod";
import { restaurantValidator } from "@/validators/restaurant";

const mockDefault = {
  title: "teste",
  active: true,
  whatsapp: "+55(00)00000-0000",
  landline: "",
  address: "Rua XYZ, 123",
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
        open: "08:00",
        close: "23:00",
      },
    },
  ],
  logo: "https://i.imgur.com/vdz7MQb.png",
  color: "#ffaa00",
  linkMaps: "google.com",
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
