"use client";

import { Conversation, User } from "@prisma/client";
import ChatDrawerBody from "./ChatDrawerBody";
import useOtherUsers from "@/lib/hooks/useOtherUsers.hooks";
import ConfirmDialog from "../common/ConfirmDialog";
import { useState } from "react";

interface DesktopChatSidebarProps {
  currentUser: User;
  conversation: Conversation & {
    users: User[];
  };
}

const DesktopChatSidebar = ({
  currentUser,
  conversation,
}: DesktopChatSidebarProps) => {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const otherUsers = useOtherUsers({
    conversation: conversation,
    excludedUser: currentUser,
  });

  return (
    <>
      {conversation && (
        <ConfirmDialog
          isOpen={isModalOpen}
          onClose={() => setModalIsOpen(false)}
          conversationId={conversation.id}
        />
      )}
      <div className="hidden xl:fixed xl:inset-y-0 xl:right-0 xl:z-40 xl:w-96 xl:overflow-y-auto xl:bg-bg xl:border-l-[1px] border-border xl:flex xl:flex-col">
        <ChatDrawerBody
          data={conversation}
          otherUsers={otherUsers}
          onDelete={() => setModalIsOpen(true)}
        />
      </div>
    </>
  );
};

export default DesktopChatSidebar;
