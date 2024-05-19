import {
  Grip,
  LucideIcon,
  MapPinned,
  User,
  UtensilsCrossed,
} from "lucide-react";

interface AdsSidebarProps {
  label: string;
  icon: LucideIcon;
  href: string;
}

export const adminSidebarOptions: AdsSidebarProps[] = [
  {
    label: "Anúncios",
    icon: Grip,
    href: "/admin/dashboard?page=1",
  },
  {
    label: "Regiões",
    icon: MapPinned,
    href: "/admin/dashboard/regions",
  },
  {
    label: "Usuários",
    icon: User,
    href: "/admin/dashboard/users?page=1",
  },
  {
    label: "Restaurantes",
    icon: UtensilsCrossed,
    href: "/admin/dashboard/restaurants?page=1",
  },
];
