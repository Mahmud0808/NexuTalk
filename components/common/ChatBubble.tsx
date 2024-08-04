"use client";

import { PopulatedMessageType } from "@/lib/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import UserAvatar from "./UserAvatar";
import { format } from "date-fns";
import { User } from "@prisma/client";
import ImageAlertDialog from "../layout/ImageAlertDialog";

interface ChatBubbleProps {
  data: PopulatedMessageType;
  isLast: boolean;
  isGroup: boolean;
  currentUser: User;
}

const ChatBubble = ({
  data,
  isLast,
  isGroup,
  currentUser,
}: ChatBubbleProps) => {
  const senderEmail = data.sender.email;
  const isOwnMessage = currentUser.email === senderEmail;
  const [showTime, setShowTime] = useState(false);
  const [imageModelOpen, setImageModelOpen] = useState(false);
  const seenList = (data.seen || [])
    .filter((user) => user.email !== senderEmail)
    .map((user) => user.name);

  return (
    <div
      className={clsx(
        "flex gap-3",
        isOwnMessage ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={clsx(
          "flex-shrink-0",
          (isOwnMessage || !isGroup) && "hidden"
        )}
      >
        <UserAvatar user={data.sender} size="sm" showActiveStatus={false} />
      </div>
      <div
        className={clsx(
          "flex flex-col gap-1",
          isOwnMessage ? "items-end" : "items-start"
        )}
      >
        <div
          className={clsx(
            "text-sm text-gray-500",
            !isOwnMessage && "pl-2",
            (isOwnMessage || !isGroup) && "hidden"
          )}
        >
          {data.sender.name}
        </div>
        <div
          onClick={() => setShowTime(!showTime)}
          className={clsx(
            "text-sm w-fit max-w-lg overflow-hidden cursor-pointer",
            isOwnMessage ? "bg-sky-500 text-white" : "bg-gray-100",
            data.image
              ? "p-0 rounded-md border border-slate-200"
              : "px-4 py-2 rounded-2xl"
          )}
        >
          {data.image ? (
            <>
              <ImageAlertDialog
                src={data.image}
                isOpen={imageModelOpen}
                onClose={() => setImageModelOpen(false)}
              />
              <Image
                src={data.image}
                onClick={() => setImageModelOpen(true)}
                alt="Image"
                width="0"
                height="0"
                sizes="100vw"
                className="h-auto max-h-[280px] w-auto max-w-[280px] cursor-pointer hover:scale-105 transition-transform"
              />
            </>
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        <div
          className={clsx(
            "flex text-xs text-gray-400",
            isOwnMessage ? "pr-2" : "pl-2"
          )}
        >
          {showTime &&
            isLast &&
            isOwnMessage &&
            seenList.length > 0 &&
            (isGroup
              ? `Seen by ${
                  seenList.length > 2
                    ? `${seenList.slice(0, 2).join(", ")} and ${
                        seenList.length - 2
                      } other${seenList.length - 2 > 1 ? "s" : ""}`
                    : seenList.join(" and ")
                } ∙ `
              : `Seen ∙ `)}
          {showTime && format(new Date(data.createdAt), "p")}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
