import { PopulatedConversationType } from "@/lib/types";
import { format } from "date-fns";
import { useCallback, useMemo } from "react";
import useOtherUsers from "@/lib/hooks/useOtherUsers.hooks";
import clsx from "clsx";
import UserAvatar from "./UserAvatar";
import { User } from "@prisma/client";
import GroupAvatar from "./GroupAvatar";
import { useRouter } from "next/navigation";

interface ConversationListItemProps {
  conversation: PopulatedConversationType;
  selected?: boolean;
  currentUser: User;
}

const ConversationListItem = ({
  conversation,
  selected,
  currentUser,
}: ConversationListItemProps) => {
  const router = useRouter();
  const otherUsers = useOtherUsers({
    conversation: conversation,
    excludedUser: currentUser,
  });

  const handleClick = useCallback(() => {
    router.push(`/conversations/${conversation.id}`);
  }, [conversation.id, router]);

  const lastMessage = useMemo(() => {
    const messages = conversation.messages || [];

    return messages[messages.length - 1];
  }, [conversation.messages]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started a conversation";
  }, [lastMessage]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return true;
    }

    const seenArray = lastMessage.seen || [];

    return (
      seenArray.filter((user) => user.email === currentUser.email).length !== 0
    );
  }, [currentUser.email, lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "w-full relative flex flex-1 items-center space-x-3 p-2 hover:bg-neutral-100 rounded-lg transition cursor-pointer",
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      {conversation.isGroup ? (
        <GroupAvatar users={conversation.users} />
      ) : (
        <UserAvatar user={otherUsers[0]} />
      )}
      <div className="min-w-0 flex-1 mb-1">
        <div className="flex justify-between items-center">
          <div className="truncate text-base font-semibold text-gray-900 flex-1">
            {conversation.name || otherUsers[0].name}
          </div>
          {lastMessage?.createdAt && (
            <div className="text-xs text-gray-400 font-light">
              {format(new Date(lastMessage.createdAt), "p")}
            </div>
          )}
        </div>
        <div
          className={clsx(
            "truncate text-sm",
            hasSeen || selected ? "text-gray-500" : "text-black font-semibold"
          )}
        >
          {conversation.isGroup &&
            `${
              conversation.messages[conversation.messages.length - 1].sender
                .name
            }: `}
          {lastMessageText}
        </div>
      </div>
    </div>
  );
};

export default ConversationListItem;
