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
  title: string;
  active: boolean;
  phone1: string;
  phone2?: string;
  address: string;
  methods: string[];
  workHours: WorkHours[];
  logo: string;
  color: string;
  linkMaps?: string;
  note?: string;
  activeMenu: boolean;
}
