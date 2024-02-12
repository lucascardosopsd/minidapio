export interface PaymentMethodProps {
  pix: boolean;
  cash: boolean;
  credit: boolean;
  debit: boolean;
  bankCheck: boolean;
}

export interface RestaurantProps {
  id: number;
  title: string;
  active: boolean;
  landline?: string;
  whatsapp?: string;
  address: string;
  methods: PaymentMethodProps;
  workHours: WorkHours[];
  logo: string;
  color: string;
  linkMaps?: string;
  note?: string;
  activeMenu: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}
