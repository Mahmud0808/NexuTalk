"use client";

import { useRouter } from "next/navigation";
import EmptyState from "../common/EmptyState";
import { Conversation, User } from "@prisma/client";

interface DeletedConversationProps {
  conversation:
    | (Conversation & {
        users: User[];
      })
    | null;
}

const DeletedConversation = ({ conversation }: DeletedConversationProps) => {
  const router = useRouter();

  if (!conversation) {
    router.push("/conversations");
  }

  return (
    <div className="hidden lg:block lg:pl-60 h-full w-full">
      <EmptyState />
    </div>
  );
};

export default DeletedConversation;
