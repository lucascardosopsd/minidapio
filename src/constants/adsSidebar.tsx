import { Grip, MapPinned } from "lucide-react";
import { ReactNode } from "react";

interface AdsSidebarProps {
  label: string;
  icon: ReactNode;
  href: string;
}

export const adsSidebarOptions: AdsSidebarProps[] = [
  {
    label: "Anúncios",
    icon: <Grip />,
    href: "/advertiser/dashboard",
  },
  {
    label: "Regiões",
    icon: <MapPinned />,
    href: "/advertiser/dashboard/regions",
  },
];
