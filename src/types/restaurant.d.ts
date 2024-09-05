import { Item } from "@prisma/client";
import { CategoriesWithItemsProps } from "./category";

export interface PaymentMethodProps {
  pix: boolean;
  cash: boolean;
  credit: boolean;
  debit: boolean;
  bankCheck: boolean;
}

export interface timeProps {
  open: string | null;
  close: string | null;
}

export interface WorkHourProps {
  weekDay: number;
  opened: boolean;
  times: timeProps;
}

export interface RestaurantProps {
  id: string;
  title: string;
  active: boolean;
  landline: string | null;
  whatsapp: string | null;
  address: string;
  methods: PaymentMethodProps;
  workHours: WorkHoursProps[];
  logo: string;
  color: string;
  linkMaps: string | null;
  note: string | null;
  activeMenu: boolean;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
  state: string;
  province: string;
}

export interface FullRestaurantProps extends RestaurantProps {
  Items: Item[];
  Categories: CategoriesWithItemsProps[];
}

export interface FullRestaurantNestedProps extends RestaurantProps {
  Categories: CategoriesWithItemsProps[];
}
