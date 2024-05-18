import { Grip, MapPinned } from "lucide-react";
import { ReactNode } from "react";

interface AdsSidebarProps {
  label: string;
  icon: ReactNode;
  href: string;
}

const userOptions: AdsSidebarProps[] = [
  {
    label: "Anúncios",
    icon: <Grip />,
    href: "/advertiser/dashboard",
  },
];

const adminOptions: AdsSidebarProps[] = [
  {
    label: "Regiões",
    icon: <MapPinned />,
    href: "/advertiser/dashboard/regions",
  },
];

export const adsSidebarOptions = ({
  userRole,
}: {
  userRole: string;
}): AdsSidebarProps[] => {
  if (userRole !== "admin") {
    return userOptions;
  }

  return [...userOptions, ...adminOptions];
};
