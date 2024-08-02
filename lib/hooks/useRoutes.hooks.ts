import { usePathname } from "next/navigation";
import useConversation from "./useConversation.hooks";
import { useMemo } from "react";
import { HiChat } from "react-icons/hi";
import { HiUsers, HiArrowLeftOnRectangle } from "react-icons/hi2";
import { signOut } from "next-auth/react";

const useRoutes = () => {
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
        label: "Logout",
        path: "#",
        icon: HiArrowLeftOnRectangle,
        onClick: () => signOut(),
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
