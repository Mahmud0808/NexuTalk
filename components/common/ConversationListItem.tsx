import { PopulatedConversationType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useCallback, useMemo } from "react";
import useOtherUsers from "@/lib/hooks/useOtherUsers.hooks";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import UserAvatar from "./UserAvatar";

interface ConversationListItemProps {
  data: PopulatedConversationType;
  selected?: boolean;
}

const ConversationListItem = ({
  data,
  selected,
}: ConversationListItemProps) => {
  const router = useRouter();
  const session = useSession();
  const otherUsers = useOtherUsers(data);

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const userEmail = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

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
    if (lastMessageText === "Started a conversation") {
      return true;
    }

    if (!lastMessage || !userEmail) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    return (
      seenArray.filter((user) => user.email === userEmail).length !== 0 ||
      lastMessage.sender.email === userEmail
    );
  }, [userEmail, lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "w-full relative flex items-center space-x-3 p-2 hover:bg-neutral-100 rounded-lg transition cursor-pointer",
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      <UserAvatar user={otherUsers[0]} />
      <div className="min-w-0 flex-1 mb-1">
        <div className="flex justify-between items-center">
          <div className="truncate text-base font-semibold text-gray-900 flex-1">
            {data.name || otherUsers[0].name}
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
            hasSeen ? "text-gray-500" : "text-black font-semibold"
          )}
        >
          {lastMessageText}
        </div>
      </div>
    </div>
  );
};

export default ConversationListItem;
