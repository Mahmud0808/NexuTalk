"use client";

import useConversation from "@/lib/hooks/useConversation.hooks";
import { PopulatedConversationType } from "@/lib/types";
import { MdOutlineGroupAdd } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import ConversationListItem from "../common/ConversationListItem";

interface ConversationListProps {
  initialItems: PopulatedConversationType[];
}

const ConversationList = ({ initialItems }: ConversationListProps) => {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const { isOpen, conversationId } = useConversation();

  return (
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
          <div className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition">
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {items.map((item) => (
          <ConversationListItem
            key={item.id}
            data={item}
            selected={conversationId?.id === item.id}
          />
        ))}
      </div>
    </aside>
  );
};

export default ConversationList;
