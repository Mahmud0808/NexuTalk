import { PopulatedConversationType } from "../types";

export const sortConversations = (
  conversations: PopulatedConversationType[]
) => {
  try {
    return conversations.sort(
      (a, b) =>
        new Date(b.lastMessageAt).getTime() -
        new Date(a.lastMessageAt).getTime()
    );
  } catch (error) {
    return conversations;
  }
};
