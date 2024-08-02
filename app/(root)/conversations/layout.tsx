import ConversationList from "@/components/layout/ConversationList";
import Sidebar from "@/components/layout/Sidebar";
import getConversations from "@/lib/actions/getConversations.actions";
import getCurrentUser from "@/lib/actions/getCurrentUser.actions";

export default async function ConversationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  const conversations = await getConversations();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} currentUser={currentUser} />
        {children}
      </div>
    </Sidebar>
  );
}
