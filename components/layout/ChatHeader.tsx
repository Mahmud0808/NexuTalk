"use client";

import useOtherUsers from "@/lib/hooks/useOtherUsers.hooks";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import UserAvatar from "../common/UserAvatar";
import ChatDrawer from "./ChatDrawer";
import GroupAvatar from "../common/GroupAvatar";
import activeUsersStore from "@/lib/store/activeUsersStore";

interface ChatHeaderProps {
  conversation: Conversation & {
    users: User[];
  };
  currentUser: User;
}

const ChatHeader = ({ conversation, currentUser }: ChatHeaderProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const otherUsers = useOtherUsers({
    conversation: conversation,
    excludedUser: currentUser,
  });

  const { activeUsers } = activeUsersStore();
  const isActive = activeUsers.includes(otherUsers[0]?.email!);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [conversation, isActive]);

  return (
    <>
      <ChatDrawer
        data={conversation}
        isOpen={drawerOpen}
        otherUsers={otherUsers}
        onClose={() => setDrawerOpen(false)}
      />
      <div className="bg-bg w-full flex border-b-[1px] border-border px-4 py-3 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="block lg:hidden text-gray-500 hover:text-gray-700 dark:hover:text-gray-600 transition cursor-pointer"
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <GroupAvatar users={conversation.users} />
          ) : (
            <UserAvatar user={otherUsers[0]} />
          )}
          <div className="flex flex-col mb-1">
            <div className="text-base font-semibold dark:font-medium text-text">
              {conversation?.name || otherUsers[0]?.name}
            </div>
            <div className="text-sm font-light dark:font-normal text-text-secondary">{statusText}</div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-600 transition cursor-pointer xl:hidden"
        />
      </div>
    </>
  );
};

export default ChatHeader;
