import { SidebarOptionProps } from "@/types/Sidebar";
import { Grip, LayoutDashboard } from "lucide-react";

export const advertiserSidebarOptions: SidebarOptionProps[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/advertiser/dashboard/ads?page=1",
  },
  {
    label: "Anúncios",
    icon: Grip,
    href: "/advertiser/dashboard?page=1",
  },
];
