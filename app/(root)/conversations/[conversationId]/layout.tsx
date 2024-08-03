import ChatSidebar from "@/components/layout/ChatSidebar";
import ConversationList from "@/components/layout/ConversationList";
import getConversationById from "@/lib/actions/getConversationById.actions";
import getConversations from "@/lib/actions/getConversations.actions";
import getCurrentUser from "@/lib/actions/getCurrentUser.actions";
import getUsers from "@/lib/actions/getUsers.actions";
import { Conversation, User } from "@prisma/client";

export default async function ConversationsLayout({
  params,
  children,
}: Readonly<{
  params: { conversationId: string };
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  const conversations = await getConversations();
  const conversation = await getConversationById(params.conversationId);
  const users = await getUsers();

  return (
    <ChatSidebar
      data={
        conversation as Conversation & {
          users: User[];
        }
      }
    >
      <div className="h-full">
        <ConversationList
          users={users}
          initialItems={conversations}
          currentUser={currentUser!}
        />
        {children}
      </div>
    </ChatSidebar>
  );
}
