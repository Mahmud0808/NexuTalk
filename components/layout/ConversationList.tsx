"use client";

import useConversation from "@/lib/hooks/useConversation.hooks";
import { PopulatedConversationType } from "@/lib/types";
import { MdOutlineGroupAdd } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import ConversationListItem from "../common/ConversationListItem";
import { User } from "@prisma/client";
import AlertDialog from "../common/AlertDialog";
import NewGroupChatDialog from "./NewGroupChatDialog";

interface ConversationListProps {
  initialItems: PopulatedConversationType[];
  currentUser: User;
  users: User[];
}

const ConversationList = ({
  initialItems,
  currentUser,
  users,
}: ConversationListProps) => {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const { isOpen, conversationId } = useConversation();
  const [isModelOpen, setIsModelOpen] = useState(false);

  return (
    <>
      <NewGroupChatDialog
        users={users}
        isOpen={isModelOpen}
        onClose={() => setIsModelOpen(false)}
      />
      <aside
        className={clsx(
          "fixed w-full inset-y-0 pb-20 lg:pb-0 left-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200",
          isOpen ? "hidden" : "block"
        )}
      >
        <div className="px-5">
          <div className="flex items-center justify-between">
            <div className="py-4 text-2xl font-bold text-neutral-800">
              Messages
            </div>
            <div
              onClick={() => setIsModelOpen(true)}
              className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition"
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            {items.map((item) => (
              <ConversationListItem
                key={item.id}
                conversation={item}
                currentUser={currentUser}
                selected={conversationId?.id === item.id}
              />
            ))}
            {items.length === 0 && (
              <div className="w-full h-full">
                <p className="text-center mt-6">No conversations</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
