import { User } from "@prisma/client";
import Image from "next/image";

interface UserAvatarProps {
  user?: User;
}

const UserAvatar = ({ user }: UserAvatarProps) => {
  return (
    <div className="relative">
      <div className="relative inline-block h-9 w-9 md:h-11 md:w-11 overflow-hidden rounded-full">
        <Image
          fill
          alt="Avatar"
          src={user?.image || "/images/placeholder_profile_picture.png"}
        />
      </div>
      <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-[10px] md:w-[10px]" />
    </div>
  );
};

export default UserAvatar;
