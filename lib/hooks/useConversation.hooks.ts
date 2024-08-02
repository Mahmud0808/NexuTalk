import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  const params = useParams();

  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return;
    }

    return {
      id: params.conversationId as string,
    };
  }, [params?.conversationId]);

  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  return useMemo(() => ({ isOpen, conversationId }), [isOpen, conversationId]);
};

export default useConversation;
