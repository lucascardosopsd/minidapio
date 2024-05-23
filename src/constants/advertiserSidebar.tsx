"use client";

import { SidebarOptionProps } from "@/types/sidebar";
import { LayoutDashboard, ReceiptText } from "lucide-react";

export const advertiserSidebarOptions: SidebarOptionProps[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/advertiser/dashboard",
  },
  {
    label: "Faturas",
    icon: ReceiptText,
    href: "/advertiser/dashboard/bills?page=1",
  },
];
