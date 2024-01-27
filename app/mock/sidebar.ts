import { IconType } from "react-icons";
import { IoSettingsOutline } from "react-icons/io5";

interface SidebarItemProps {
  icon: IconType;
  title: string;
  fn?: () => any;
}

export const SidebarLinks: SidebarItemProps[] = [
  {
    icon: IoSettingsOutline,
    title: "Configurações",
  },
];
