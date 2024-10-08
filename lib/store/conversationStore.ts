import { create } from "zustand";
import { PopulatedConversationType } from "@/lib/types";
import { sortConversations } from "../utility/methods";

interface ConversationState {
  conversations: PopulatedConversationType[];
  setConversations: (conversations: PopulatedConversationType[]) => void;
  addConversation: (conversation: PopulatedConversationType) => void;
  updateConversation: (conversation: PopulatedConversationType) => void;
  deleteConversation: (conversation: PopulatedConversationType) => void;
}

const useConversationStore = create<ConversationState>((set) => ({
  conversations: [],
  setConversations: (conversations) =>
    set({ conversations: sortConversations(conversations) }),
  addConversation: (conversation) =>
    set((state) => {
      const existing = state.conversations.find(
        (c) => c.id === conversation.id
      );

      if (existing) {
        return {
          conversations: sortConversations(state.conversations),
        };
      }

      const duplicate = state.conversations.find(
        (c) =>
          !c.isGroup &&
          c.users[0] === conversation.users[0] &&
          c.users[1] === conversation.users[1]
      );

      if (duplicate) {
        return {
          conversations: sortConversations([
            ...state.conversations.filter((c) => c.id !== duplicate.id),
            conversation,
          ]),
        };
      }

      return {
        conversations: sortConversations([
          ...state.conversations,
          conversation,
        ]),
      };
    }),
  updateConversation: (conversation) =>
    set((state) => {
      const updated = state.conversations.map((c) =>
        c.id === conversation.id ? { ...c, messages: conversation.messages } : c
      );

      return {
        conversations: sortConversations(updated),
      };
    }),
  deleteConversation: (conversation) =>
    set((state) => {
      const updated = state.conversations.filter(
        (c) => c.id !== conversation.id
      );

      return {
        conversations: sortConversations(updated),
      };
    }),
}));

export default useConversationStore;
