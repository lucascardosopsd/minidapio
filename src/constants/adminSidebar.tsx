"use client";

import { SidebarOptionProps } from "@/types/sidebar";
import {
  Grip,
  Image,
  MapPinned,
  Megaphone,
  User,
  UtensilsCrossed,
} from "lucide-react";

export const adminSidebarOptions: SidebarOptionProps[] = [
  {
    label: "Dashboard",
    icon: Grip,
    href: "/jsnHktoSE/dashboard",
  },
  {
    label: "Anúncios",
    icon: Image,
    href: "/jsnHktoSE/dashboard/ads?page=1",
  },
  {
    label: "Regiões",
    icon: MapPinned,
    href: "/jsnHktoSE/dashboard/regions",
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
  // {
  //   label: "Afiliados",
  //   icon: Handshake,
  //   href: "/jsnHktoSE/dashboard/afiliates?page=1",
  // },
  {
    label: "Anunciantes",
    icon: Megaphone,
    href: "/jsnHktoSE/dashboard/advertisers?page=1",
  },
];
