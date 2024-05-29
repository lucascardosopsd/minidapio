"use client";

import { SidebarOptionProps } from "@/types/sidebar";
import {
  Grip,
  Handshake,
  MapPinned,
  User,
  UtensilsCrossed,
} from "lucide-react";

export const adminSidebarOptions: SidebarOptionProps[] = [
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
  {
    label: "Afiliados",
    icon: Handshake,
    href: "/admin/dashboard/afiliates?page=1",
  },
];
