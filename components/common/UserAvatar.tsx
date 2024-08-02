import { User } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";

interface UserAvatarProps {
  user?: User;
  size?: "default" | "sm" | "lg";
}

const UserAvatar = ({ user, size = "default" }: UserAvatarProps) => {
  return (
    <div className="relative">
      <div
        className={clsx(
          "relative inline-block overflow-hidden rounded-full",
          size === "default" && " h-9 w-9 md:h-11 md:w-11",
          size === "sm" && "h-7 w-7 md:h-9 md:w-9",
          size === "lg" && "h-16 w-16 md:h-20 md:w-20"
        )}
      >
        <Image
          fill
          alt="Avatar"
          src={user?.image || "/images/placeholder_profile_picture.png"}
        />
      </div>
      <span
        className={clsx(
          "absolute block rounded-full bg-green-500 ring-2 ring-white",
          size === "default" && "h-2 w-2 md:h-[9px] md:w-[9px] top-0 right-0",
          size === "sm" && "h-1 w-1 md:h-[6px] md:w-[6px] top-0 right-0",
          size === "lg" &&
            "h-2 w-2 md:h-[10px] md:w-[10px] top-[6px] right-[6px]"
        )}
      />
    </div>
  );
};

export default UserAvatar;
