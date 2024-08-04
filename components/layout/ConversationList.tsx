"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationListItem from "../common/ConversationListItem";
import { User } from "@prisma/client";
import NewGroupChatDialog from "./NewGroupChatDialog";
import { pusherClient } from "@/lib/utility/pusher";
import { PopulatedConversationType } from "@/lib/types";
import useConversationStore from "@/lib/store/conversationStore";
import { useRouter } from "next/navigation";
import useConversation from "@/lib/hooks/useConversation.hooks";

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
  const {
    conversations,
    setConversations,
    addConversation,
    updateConversation,
    deleteConversation,
  } = useConversationStore();

  const router = useRouter();
  const { isOpen, conversationId } = useConversation();
  const [isModelOpen, setIsModelOpen] = useState(false);

  useEffect(() => {
    if (
      conversations.length === 0 ||
      initialItems.length > conversations.length
    ) {
      setConversations(initialItems);
    }
  }, [initialItems]);

  useEffect(() => {
    pusherClient.subscribe(currentUser.email!);

    const newConversationHandler = (
      conversation: PopulatedConversationType
    ) => {
      addConversation(conversation);
    };

    const updateConversationHandler = (
      conversation: PopulatedConversationType
    ) => {
      updateConversation(conversation);
    };

    const removeConversationHandler = (
      conversation: PopulatedConversationType
    ) => {
      deleteConversation(conversation);

      if (conversationId?.id === conversation.id) {
        router.push("/conversations");
      }
    };

    pusherClient.bind("conversation:new", newConversationHandler);
    pusherClient.bind("conversation:update", updateConversationHandler);
    pusherClient.bind("conversation:remove", removeConversationHandler);

    return () => {
      pusherClient.unsubscribe(currentUser.email!);
      pusherClient.unbind("conversation:new", newConversationHandler);
      pusherClient.unbind("conversation:update", updateConversationHandler);
      pusherClient.unbind("conversation:remove", removeConversationHandler);
    };
  }, [currentUser?.email, router, conversationId?.id]);

  return (
    <>
      <NewGroupChatDialog
        users={users}
        isOpen={isModelOpen}
        onClose={() => setIsModelOpen(false)}
      />
      <aside
        className={clsx(
          "fixed w-full inset-y-0 pb-20 lg:pb-0 left-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-border bg-bg scrollbar",
          isOpen ? "hidden" : "block"
        )}
      >
        <div className="px-5">
          <div className="flex items-center justify-between">
            <div className="py-4 text-2xl font-bold text-text-large">
              Messages
            </div>
            <div
              onClick={() => setIsModelOpen(true)}
              className="rounded-full p-2 bg-bg-icon-button text-text-icon-button-dim cursor-pointer hover:opacity-75 transition"
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            {(conversations.length === 0 ? initialItems : conversations).map(
              (item) => (
                <ConversationListItem
                  key={item.id}
                  conversation={item}
                  currentUser={currentUser}
                  selected={conversationId?.id === item.id}
                />
              )
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
