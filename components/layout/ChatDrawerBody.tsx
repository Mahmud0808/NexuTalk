"use client";

import { IoClose, IoTrash } from "react-icons/io5";
import UserAvatar from "../common/UserAvatar";
import useConversation from "@/lib/hooks/useConversation.hooks";
import { Conversation, User } from "@prisma/client";
import { useMemo } from "react";
import { format } from "date-fns/format";

interface ChatDrawerBodyProps {
  otherUsers: User[];
  onClose?: () => void;
  onDelete: () => void;
  data: Conversation & {
    users: User[];
  };
}

const ChatDrawerBody = ({
  data: conversation,
  otherUsers,
  onClose,
  onDelete,
}: ChatDrawerBodyProps) => {
  const joinedDate = useMemo(() => {
    return format(new Date(otherUsers[0].createdAt), "PP");
  }, [otherUsers[0].createdAt]);

  const title = useMemo(() => {
    return conversation.name || otherUsers[0].name;
  }, [conversation.name, otherUsers[0].name]);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active";
  }, [conversation]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="flex h-full flex-col overflow-y-scroll">
      <div className="px-4 sm:px-6">
        <div className="flex items-start justify-end">
          <div className="ml-3 flex h-7 items-center">
            {onClose && (
              <button
                type="button"
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                onClick={handleClose}
              >
                <span className="sr-only">Close panel</span>
                <IoClose size={24} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="relative mt-6 flex-1 px-4 sm:px-6">
        <div className="flex flex-col items-center">
          <div className="mb-2">
            <UserAvatar user={otherUsers[0]} size="lg" />
          </div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-gray-500">{statusText}</div>
          <div className="flex gap-10 my-8">
            <div
              onClick={onDelete}
              className="flex flex-col gap-2 items-center cursor-pointer group"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 group-hover:bg-neutral-200 transition">
                <IoTrash size={20} />
              </div>
              <div className="text-sm font-light text-neutral-600 group-hover:text-neutral-800 transition">
                Delete
              </div>
            </div>
          </div>
          <div className="w-full py-5 sm:px-0">
            <dl className="px-4 sm:px-6 space-y-8 sm:space-y-6">
              {!conversation.isGroup && (
                <div>
                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                    Email
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                    {otherUsers[0].email}
                  </dd>
                </div>
              )}
              {!conversation.isGroup && (
                <>
                  <hr />
                  <div>
                    <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                      Joined
                    </dt>
                    <time
                      dateTime={joinedDate}
                      className="mt-1 text-sm text-gray-900 sm:col-span-2"
                    >
                      {joinedDate}
                    </time>
                  </div>
                </>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDrawerBody;
