"use client";

import { SidebarOptionProps } from "@/types/sidebar";
import { Grip, LayoutDashboard } from "lucide-react";

export const advertiserSidebarOptions: SidebarOptionProps[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/advertiser/dashboard",
  },
  {
    label: "Anúncios",
    icon: Grip,
    href: "/advertiser/dashboard/ads?page=1",
  },
];
