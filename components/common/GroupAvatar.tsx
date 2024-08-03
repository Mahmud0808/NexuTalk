"use client";

import { User } from "@prisma/client";
import clsx from "clsx";
import UserAvatar from "./UserAvatar";

interface GroupAvatarProps {
  users: User[];
  size?: "default" | "lg";
}

const GroupAvatar = ({ users = [], size = "default" }: GroupAvatarProps) => {
  const slicedUsers = users.slice(0, 3);

  const positionMap = {
    0:
      size === "default"
        ? "top-0 left-[calc(50%-0.7rem)]"
        : "top-0 left-[calc(50%-1rem)]",
    1:
      size === "default"
        ? "bottom-[calc(30%-0.5rem)] left-[calc(25%-0.5rem)]"
        : "bottom-[calc(30%-0.5rem)] left-[calc(25%-0.8rem)]",
    2:
      size === "default"
        ? "bottom-[calc(30%-0.5rem)] right-[calc(25%-0.3rem)]"
        : "bottom-[calc(30%-0.5rem)] right-[calc(25%-0.2rem)]",
  };

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-full bg-slate-200",
        size === "default" && "h-9 w-9 md:h-11 md:w-11",
        size === "lg" && "h-16 w-16 md:h-20 md:w-20"
      )}
    >
      {slicedUsers.map((user, index) => (
        <div
          key={user.id}
          className={clsx(
            "absolute inline-block rounded-full",
            size === "default" && "h-4 w-4 md:h-5 md:w-5",
            size === "lg" && "h-6 w-6 md:h-7 md:w-7",
            positionMap[index as keyof typeof positionMap]
          )}
        >
          <UserAvatar
            user={user}
            size={`${size === "lg" ? "group_lg" : "group_sm"}`}
          />
        </div>
      ))}
    </div>
  );
};

export default GroupAvatar;
