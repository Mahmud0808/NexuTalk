import { PopulatedConversationType } from "../types";
import {
  format,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";

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

export const getTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInDays = differenceInDays(now, date);
  const diffInHours = differenceInHours(now, date);
  const diffInMinutes = differenceInMinutes(now, date);

  if (diffInDays >= 365) {
    return `${Math.floor(diffInDays / 365)} y`;
  } else if (diffInDays >= 7) {
    return `${Math.floor(diffInDays / 7)} w`;
  } else if (diffInDays >= 1) {
    return `${diffInDays} d`;
  } else if (diffInHours >= 1) {
    return `${diffInHours} h`;
  } else if (diffInMinutes >= 1) {
    return `${diffInMinutes} m`;
  } else {
    return "Just now";
  }
};
