import prismadb from "../database/prismadb";
import getCurrentUser from "./getCurrentUser.actions";

const getMessages = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return [];
    }

    const messages = await prismadb.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return messages;
  } catch (error) {
    return [];
  }
};

export default getMessages;
