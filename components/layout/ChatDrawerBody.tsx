"use client";

import { IoClose, IoTrash } from "react-icons/io5";
import UserAvatar from "../common/UserAvatar";
import { Conversation, User } from "@prisma/client";
import { useMemo } from "react";
import { format } from "date-fns/format";
import GroupAvatar from "../common/GroupAvatar";
import activeUsersStore from "@/lib/store/activeUsersStore";

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
  const { activeUsers } = activeUsersStore();
  const isActive =
    !conversation.isGroup && activeUsers.includes(otherUsers[0]?.email!);

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

    return isActive ? "Active" : "Offline";
  }, [conversation, isActive]);

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
                className="rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
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
            {conversation.isGroup ? (
              <GroupAvatar users={conversation.users} size="lg" />
            ) : (
              <UserAvatar user={otherUsers[0]} size="lg" />
            )}
          </div>
          <div className="font-semibold dark:font-medium text-text">
            {title}
          </div>
          <div className="text-sm text-text-secondary">{statusText}</div>
          <div className="flex gap-10 my-8">
            <div
              onClick={onDelete}
              className="flex flex-col gap-2 items-center cursor-pointer group"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-bg-highlight group-hover:scale-110 transition">
                <IoTrash size={20} />
              </div>
              <div className="text-sm font-light dark:font-normal text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-500 transition">
                Delete
              </div>
            </div>
          </div>
          <div className="w-full py-5 sm:px-0">
            <dl className="px-4 sm:px-6 space-y-8 sm:space-y-6">
              {/* Group Chat */}
              {conversation.isGroup && (
                <div>
                  <dt className="text-sm font-medium text-text-info-title sm:w-40 sm:flex-shrink-0">
                    Created At
                  </dt>
                  <dd className="mt-1 text-sm text-text sm:col-span-2">
                    {format(new Date(conversation.createdAt), "PP")}
                  </dd>
                </div>
              )}
              {conversation.isGroup && (
                <>
                  <hr className="border-border-secondary" />
                  <div>
                    <dt className="text-sm font-medium text-text-info-title sm:w-40 sm:flex-shrink-0">
                      Members
                    </dt>
                    <dd className="mt-2 text-sm text-text sm:col-span-2 flex flex-col gap-1">
                      {conversation.users.map((user) => {
                        return (
                          <div
                            key={user.id}
                            className="flex gap-2 items-center"
                          >
                            <UserAvatar user={user} size="group_sm" />
                            <span className="text-sm mb-1">{user.name}</span>
                          </div>
                        );
                      })}
                    </dd>
                  </div>
                </>
              )}
              {/* Normal Chat */}
              {!conversation.isGroup && (
                <div>
                  <dt className="text-sm font-medium text-text-info-title sm:w-40 sm:flex-shrink-0">
                    Email
                  </dt>
                  <dd className="mt-1 text-sm text-text sm:col-span-2">
                    {otherUsers[0].email}
                  </dd>
                </div>
              )}
              {!conversation.isGroup && (
                <>
                  <hr className="border-border-secondary" />
                  <div>
                    <dt className="text-sm font-medium text-text-info-title sm:w-40 sm:flex-shrink-0">
                      Joined
                    </dt>
                    <time
                      dateTime={joinedDate}
                      className="mt-1 text-sm text-text sm:col-span-2"
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
