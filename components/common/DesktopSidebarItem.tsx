"use client";

import clsx from "clsx";
import Link from "next/link";

interface DesktopSidebarItemProps {
  label: string;
  icon: any;
  path?: string;
  active?: boolean;
  onClick?: () => void;
}

const DesktopSidebarItem = ({
  label,
  icon: Icon,
  path,
  onClick,
  active,
}: DesktopSidebarItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li key={label} onClick={handleClick}>
      <Link
        href={path || "#"}
        className={clsx(
          `group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-text-large hover:bg-bg-highlight`,
          active && "bg-bg-highlight text-text",
          !active && "dark:hover:text-gray-500"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopSidebarItem;
