import EmptyState from "@/components/common/EmptyState";
import ChatHeader from "@/components/layout/ChatHeader";
import ChatInputBox from "@/components/layout/ChatInputBox";
import MessagesBody from "@/components/layout/MessagesBody";
import getConversationById from "@/lib/actions/getConversationById.actions";
import getCurrentUser from "@/lib/actions/getCurrentUser.actions";
import getMessages from "@/lib/actions/getMessages.actions";

interface ParamProps {
  conversationId: string;
}

const page = async ({ params }: { params: ParamProps }) => {
  const currentUser = await getCurrentUser();
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full w-full flex justify-center items-center">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <ChatHeader conversation={conversation} currentUser={currentUser!} />
        <MessagesBody
          initialMessages={messages}
          currentUser={currentUser!}
          isGroup={conversation.isGroup ?? false}
        />
        <ChatInputBox />
      </div>
    </div>
  );
};

export default page;
