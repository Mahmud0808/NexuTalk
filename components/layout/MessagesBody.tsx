"use client";

import React, { useEffect } from "react";
import { PopulatedMessageType } from "@/lib/types";
import { useState } from "react";
import useConversation from "@/lib/hooks/useConversation.hooks";
import ChatBubble from "../common/ChatBubble";
import { User } from "@prisma/client";
import axios from "axios";

interface MessagesBodyProps {
  initialMessages: PopulatedMessageType[];
  isGroup: boolean;
  currentUser: User;
}

const MessagesBody = ({
  initialMessages,
  isGroup,
  currentUser,
}: MessagesBodyProps) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId?.id}/seen`);
  }, []);

  return (
    <div className="flex flex-col flex-1 overflow-y-auto p-4 gap-1 lg:gap-2">
      {messages.map((message, index) => (
        <ChatBubble
          key={message.id}
          data={message}
          currentUser={currentUser}
          isGroup={isGroup}
          isLast={index === messages.length - 1}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default MessagesBody;
