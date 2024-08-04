import EmptyState from "@/components/common/EmptyState";
import ChatHeader from "@/components/layout/ChatHeader";
import ChatInputBox from "@/components/layout/ChatInputBox";
import DeletedConversation from "@/components/layout/DeletedConversation";
import MessagesBody from "@/components/layout/MessagesBody";
import getConversationById from "@/lib/actions/getConversationById.actions";
import getCurrentUser from "@/lib/actions/getCurrentUser.actions";
import getMessages from "@/lib/actions/getMessages.actions";
import clsx from "clsx";

interface ParamProps {
  conversationId: string;
}

const page = async ({ params }: { params: ParamProps }) => {
  const currentUser = await getCurrentUser();
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return <DeletedConversation conversation={conversation} />;
  }

  return (
    <div className={clsx("lg:pl-80 h-full", conversation?.id && "xl:pr-96")}>
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
