"use client";

import { SidebarOptionProps } from "@/types/sidebar";
import { DollarSign, Grip, User, UtensilsCrossed } from "lucide-react";

export const adminSidebarOptions: SidebarOptionProps[] = [
  {
    label: "Dashboard",
    icon: Grip,
    href: "/jsnHktoSE/dashboard",
  },
  {
    label: "Usuários",
    icon: User,
    href: "/jsnHktoSE/dashboard/users?page=1",
  },
  {
    label: "Restaurantes",
    icon: UtensilsCrossed,
    href: "/jsnHktoSE/dashboard/restaurants?page=1",
  },
  {
    label: "Pagamentos",
    icon: DollarSign,
    href: "/jsnHktoSE/dashboard/payments?page=1",
  },
];
