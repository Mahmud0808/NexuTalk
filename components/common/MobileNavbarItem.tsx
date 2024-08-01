"use client";

import clsx from "clsx";
import Link from "next/link";

interface MobileNavbarItemProps {
  label: string;
  icon: any;
  path?: string;
  active?: boolean;
  onClick?: () => void;
}

const MobileNavbarItem = ({
  label,
  icon: Icon,
  path,
  active,
  onClick,
}: MobileNavbarItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      href={path || "#"}
      onClick={handleClick}
      className={clsx(
        `group flex gap-x-3 rounded-md p-4 text-sm leading-6 font-semibold w-full justify-center text-gray-500 hover:text-black hover:bg-slate-100`,
        active && "bg-slate-100 text-black"
      )}
    >
      <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </Link>
  );
};

export default MobileNavbarItem;
