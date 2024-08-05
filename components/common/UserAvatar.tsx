import activeUsersStore from "@/lib/store/activeUsersStore";
import { User } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";

interface UserAvatarProps {
  user?: User;
  size?: "default" | "sm" | "lg" | "group_sm" | "group_lg";
  showActiveStatus?: boolean;
}

const UserAvatar = ({
  user,
  size = "default",
  showActiveStatus = true,
}: UserAvatarProps) => {
  const { activeUsers } = activeUsersStore();
  const isActive = activeUsers.includes(user?.email!);

  return (
    <div className="relative">
      <div
        className={clsx(
          "relative inline-block overflow-hidden rounded-full",
          size === "default" && " h-9 w-9 md:h-11 md:w-11",
          size === "sm" && "h-7 w-7 md:h-9 md:w-9",
          size === "lg" && "h-16 w-16 md:h-20 md:w-20",
          size === "group_sm" && "h-5 w-5 md:h-6 md:w-6",
          size === "group_lg" && "h-8 w-8 md:h-10 md:w-10"
        )}
      >
        <Image
          fill
          alt="Avatar"
          src={user?.image || "/images/placeholder_profile_picture.png"}
        />
      </div>
      {showActiveStatus && isActive && (
        <span
          className={clsx(
            "absolute block rounded-full bg-green-500 ring-2 ring-white",
            size === "default" && "h-[6px] w-[6px] md:h-[9px] md:w-[9px] top-0 right-0",
            size === "sm" && "h-1 w-1 md:h-[6px] md:w-[6px] top-0 right-0",
            size === "lg" &&
              "h-2 w-2 md:h-[10px] md:w-[10px] top-[6px] right-[6px]",
            (size === "group_sm" || size === "group_lg") && "hidden"
          )}
        />
      )}
    </div>
  );
};

export default UserAvatar;
