"use client";

import useConversation from "@/lib/hooks/useConversation.hooks";
import useRoutes from "@/lib/hooks/useRoutes.hooks";
import MobileNavbarItem from "../common/MobileNavbarItem";

const MobileNavbar = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-bg border-t-[1px] border-border lg:hidden">
      {routes.map((item) => (
        <MobileNavbarItem
          key={item.label}
          path={item.path}
          label={item.label}
          icon={item.icon}
          active={item.active}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};

export default MobileNavbar;
