import { Conversation, Message, User } from "@prisma/client";

/*
 * Get existing "Message" type and extend it with sender and seen types
 * because "Message" type doesn't have populated sender and seen objects
 */
export type PopulatedMessageType = Message & {
  sender: User;
  seen: User[];
};

/*
 * Get existing "Conversation" type and extend it with users and messages
 * because "Conversation" type doesn't have populated users and messages
 */
export type PopulatedConversationType = Conversation & {
  users: User[];
  messages: PopulatedMessageType[];
};
