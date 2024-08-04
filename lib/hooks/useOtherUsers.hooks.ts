import { User } from "@prisma/client";
import { PopulatedConversationType } from "../types";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

interface UseOtherUsersProps {
  conversation: PopulatedConversationType | { users: User[] };
  excludedUser: User;
}

const useOtherUsers = ({ conversation, excludedUser }: UseOtherUsersProps) => {
  const otherUsers = useMemo(() => {
    const currentUserEmail = excludedUser?.email;

    const otherUsers = conversation?.users.filter(
      (user) => user.email !== currentUserEmail
    );

    return otherUsers;
  }, [excludedUser?.email, conversation?.users]);

  return otherUsers;
};

export default useOtherUsers;
