import { usePathname } from "next/navigation";
import useConversation from "./useConversation.hooks";
import { useMemo } from "react";
import { HiChat } from "react-icons/hi";
import { HiUsers } from "react-icons/hi2";
import { MdSettings } from "react-icons/md";

interface MobileRouteProps {
  onSettingsClick: () => void;
}

const useMobileRoutes = ({ onSettingsClick }: MobileRouteProps) => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        icon: HiChat,
        path: "/conversations",
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        path: "/users",
        icon: HiUsers,
        active: pathname === "/users",
      },
      {
        label: "Settings",
        path: "#",
        icon: MdSettings,
        onClick: () => onSettingsClick(),
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useMobileRoutes;
