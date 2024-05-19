import { Grip, MapPinned, User } from "lucide-react";
import { ReactNode } from "react";

interface AdsSidebarProps {
  label: string;
  icon: ReactNode;
  href: string;
}

export const adminSidebarOptions: AdsSidebarProps[] = [
  {
    label: "Anúncios",
    icon: <Grip />,
    href: "/admin/dashboard",
  },
  {
    label: "Regiões",
    icon: <MapPinned />,
    href: "/admin/dashboard/regions",
  },
  {
    label: "Usuários",
    icon: <User />,
    href: "/admin/dashboard/users?page=1",
  },
];
