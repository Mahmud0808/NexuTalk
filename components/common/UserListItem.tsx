"use client";

import { User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import UserAvatar from "./UserAvatar";
import LoadingDialog from "./LoadingDialog";

interface UserListItemProps {
  data: User;
}

const UserListItem = ({ data }: UserListItemProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios.post("/api/conversations", { userId: data.id }).then((data) => {
      router.push(`/conversations/${data.data.id}`);
    });
  }, [data, router]);

  return (
    <>
      {isLoading && <LoadingDialog />}
      <div
        onClick={handleClick}
        className="relative flex items-center space-x-3 rounded-lg p-2 cursor-pointer hover:bg-bg-highlight"
      >
        <UserAvatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="truncate text-base font-semibold dark:font-medium text-text mb-1">
            {data.name}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserListItem;
