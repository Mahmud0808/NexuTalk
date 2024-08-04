"use client";

import useRoutes from "@/lib/hooks/useRoutes.hooks";
import { useState } from "react";
import DesktopSidebarItem from "../common/DesktopSidebarItem";
import { User } from "@prisma/client";
import UserAvatar from "../common/UserAvatar";
import SettingsDialog from "./SettingsDialog";
import ThemeSwitch from "./ThemeSwitch";

interface DesktopSidebarProps {
  currentUser: User;
}

const DesktopSidebar = ({ currentUser }: DesktopSidebarProps) => {
  const routes = useRoutes();
  const [isOpen, setOIspen] = useState(false);

  return (
    <>
      <SettingsDialog
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setOIspen(false)}
      />
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-bg lg:border-r-[1px] border-border lg:pb-4 lg:flex lg:flex-col justify-between">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((item) => (
              <DesktopSidebarItem
                key={item.label}
                path={item.path}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col gap-1 justify-between items-center">
          <ThemeSwitch />
          <div
            onClick={() => setOIspen(true)}
            className="cursor-pointer hover:opacity-75 transition"
          >
            <UserAvatar user={currentUser} showActiveStatus={false} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
