interface HoursProps {
  open: string;
  close: string;
}

interface WorkHoursProps {
  weekDay: string;
  opened: boolean;
  times: Hours;
}

export interface RestaurantProps {
  id: number;
  title: string;
  active: boolean;
  landline?: string;
  whatsapp?: string;
  address: string;
  methods: string[];
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

export interface SafeRestaurantProps {
  title: string;
  active: boolean;
  landline?: string;
  whatsapp?: string;
  address: string;
  methods: string[];
  workHours: WorkHours[];
  logo: string;
  color: string;
  linkMaps?: string;
  note?: string;
  activeMenu: boolean;
  slug: string;
}
