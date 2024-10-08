"use client";

import useConversation from "@/lib/hooks/useConversation.hooks";
import MobileNavbarItem from "../common/MobileNavbarItem";
import useMobileRoutes from "@/lib/hooks/useMobileRoutes.hooks";
import SettingsDialog from "./SettingsDialog";
import { useState } from "react";
import { User } from "@prisma/client";

interface MobileNavbarProps {
  currentUser: User;
}

const MobileNavbar = ({ currentUser }: MobileNavbarProps) => {
  const routes = useMobileRoutes({
    onSettingsClick: () => setIsSettingsOpen(true),
  });
  const { isOpen } = useConversation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  console.log("Current User", currentUser);

  if (isOpen) {
    return null;
  }

  return (
    <>
      <SettingsDialog
        currentUser={currentUser}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
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
    </>
  );
};

export default MobileNavbar;
