import ConversationList from "@/components/layout/ConversationList";
import Sidebar from "@/components/layout/Sidebar";
import getConversations from "@/lib/actions/getConversations.actions";
import getCurrentUser from "@/lib/actions/getCurrentUser.actions";
import getUsers from "@/lib/actions/getUsers.actions";

export default async function ConversationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList
          users={users}
          initialItems={conversations}
          currentUser={currentUser!}
        />
        {children}
      </div>
    </Sidebar>
  );
}
