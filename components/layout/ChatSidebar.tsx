import getCurrentUser from "@/lib/actions/getCurrentUser.actions";
import DesktopSidebar from "./DesktopSidebar";
import MobileNavbar from "./MobileNavbar";
import DesktopChatSidebar from "./DesktopChatSidebar";
import { Conversation, User } from "@prisma/client";

export default async function ChatSidebar({
  children,
  data: conversation,
}: Readonly<{
  children: React.ReactNode;
  data: Conversation & {
    users: User[];
  };
}>) {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      {conversation?.id && (
        <DesktopChatSidebar
          currentUser={currentUser!}
          conversation={conversation}
        />
      )}
      <MobileNavbar currentUser={currentUser!} />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}
