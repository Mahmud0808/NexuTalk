"use client";

import React, { useEffect } from "react";
import { PopulatedMessageType } from "@/lib/types";
import { useState } from "react";
import useConversation from "@/lib/hooks/useConversation.hooks";
import ChatBubble from "../common/ChatBubble";
import { User } from "@prisma/client";
import axios from "axios";
import { pusherClient } from "@/lib/utility/pusher";
import { find } from "lodash";

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

  useEffect(() => {
    pusherClient.subscribe(conversationId!.id);
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });

    const newMessageHandler = (message: PopulatedMessageType) => {
      axios.post(`/api/conversations/${conversationId?.id}/seen`);

      // check if the message is already in the list
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        // add the new message to the list
        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    };

    const seenMessageHandler = (updatedMessage: PopulatedMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === updatedMessage.id) {
            return updatedMessage;
          }

          return currentMessage;
        })
      );
    };

    pusherClient.bind("messages:new", newMessageHandler);
    pusherClient.bind("messages:update", seenMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId!.id);
      pusherClient.unbind("messages:new", newMessageHandler);
      pusherClient.unbind("messages:update", seenMessageHandler);
    };
  }, [conversationId]);

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
