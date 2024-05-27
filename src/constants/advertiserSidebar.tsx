"use client";

import { SidebarOptionProps } from "@/types/sidebar";
import { LayoutDashboard, ReceiptText, Settings } from "lucide-react";

export const advertiserSidebarOptions: SidebarOptionProps[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/advertiser/dashboard",
  },
  {
    label: "Faturas",
    icon: ReceiptText,
    href: "/advertiser/bills?page=1",
  },
  {
    label: "Configurações",
    icon: Settings,
    href: "/advertiser/config",
  },
];
