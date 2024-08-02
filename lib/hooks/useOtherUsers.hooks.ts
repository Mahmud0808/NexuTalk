import { User } from "@prisma/client";
import { PopulatedConversationType } from "../types";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUsers = (
  conversation: PopulatedConversationType | { users: User[] }
) => {
  const session = useSession();

  const otherUsers = useMemo(() => {
    const currentUserEmail = session.data?.user?.email;

    const otherUsers = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    );

    return otherUsers;
  }, [session.data?.user?.email, conversation.users]);

  return otherUsers;
};

export default useOtherUsers;
